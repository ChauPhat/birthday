document.addEventListener('DOMContentLoaded', () => {
  const birthdayPage = document.getElementById('birthday-page');
  const giftPage = document.getElementById('gift-page');
  const nextButton = document.getElementById('next-button');

  // Hiển thị trang chúc mừng sinh nhật
  birthdayPage.classList.remove('d-none');

  // Chuyển sang trang danh sách quà khi nhấn nút Next
  nextButton.addEventListener('click', () => {
    birthdayPage.classList.add('d-none');
    giftPage.classList.remove('d-none');
  });

  const giftList = [
    "Lược", "Gương", "Bông tẩy trang", "Tẩy trang", "Sữa rửa mặt", "Toner", "Serum", "Kem chống nắng (mặt)",
    "Mặt nạ", "Tẩy tế bào chết", "Kem mắt", "Xịt khoáng", "Kem nền / Cushion", "Kem che khuyết điểm", "Phấn phủ / phấn nén",
    "Má hồng", "Tạo khối / Highlight", "Chì kẻ mày", "Mascara", "Eyeliner", "Phấn mắt", "Son môi", "Xịt cố định makeup",
    "Dầu gội", "Dầu xả", "Kem ủ tóc", "Tinh dầu dưỡng tóc", "Xịt dưỡng tóc", "Máy sấy", "Máy uốn / duỗi", "Kẹp tóc",
    "Dây buộc tóc", "Sữa tắm", "Tẩy tế bào chết body", "Sữa dưỡng thể", "Kem chống nắng body", "Nước hoa", "Lăn / xịt khử mùi",
    "Kem dưỡng tay – chân", "Ví tiền", "Son môi", "Kẹp tóc", "Túi xách", "Giày dép", "Nhẫn", "Vòng tay", "Dây chuyền",
    "Bông tai", "Kính mát"
  ];

  const giftContainer = document.getElementById('gift-list');

  giftList.forEach((gift, index) => {
    const giftItem = document.createElement('div');
    giftItem.classList.add('col-12', 'col-md-6', 'col-lg-4');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm', 'h-100');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `gift${index}`;
    checkbox.classList.add('form-check-input', 'me-2');

    const label = document.createElement('label');
    label.htmlFor = `gift${index}`;
    label.textContent = gift;
    label.classList.add('form-check-label', 'fw-bold');

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Nhập nhãn hiệu...';
    textInput.disabled = true;
    textInput.classList.add('form-control', 'mt-3');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        textInput.disabled = false;
        textInput.focus();
      } else {
        textInput.disabled = true;
        textInput.value = '';
      }
      saveGiftSelection(index, gift, textInput.value, checkbox.checked);
    });

    textInput.addEventListener('input', () => {
      saveGiftSelection(index, gift, textInput.value, checkbox.checked);
    });

    const formCheck = document.createElement('div');
    formCheck.classList.add('form-check', 'd-flex', 'align-items-center');
    formCheck.appendChild(checkbox);
    formCheck.appendChild(label);

    cardBody.appendChild(formCheck);
    cardBody.appendChild(textInput);
    card.appendChild(cardBody);
    giftItem.appendChild(card);
    giftContainer.appendChild(giftItem);
  });

  function saveGiftSelection(id, label, brand, checked) {
    fetch('/gifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, label, brand: checked ? brand : '' })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
});