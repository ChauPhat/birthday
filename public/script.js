document.addEventListener('DOMContentLoaded', () => {
  const birthdayPage = document.getElementById('birthday-page');
  const giftPage = document.getElementById('gift-page');
  const nextButton = document.getElementById('next-button');
  const sendEmailButton = document.getElementById('send-email');
  const giftContainer = document.getElementById('gift-list');
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");

  // Hiển thị trang đầu
  birthdayPage.classList.remove('d-none');

  nextButton.addEventListener('click', () => {
    birthdayPage.classList.add('d-none');
    giftPage.classList.remove('d-none');
  });

  const giftList = [
    "Lược", "Gương", "Tẩy trang", "Sữa rửa mặt", "Toner", "Serum",
    "Kem chống nắng (mặt)", "Mặt nạ", "Tẩy tế bào chết", "Kem mắt", "Xịt khoáng",
    "Kem nền / Cushion", "Kem che khuyết điểm", "Phấn phủ / phấn nén", "Má hồng",
    "Tạo khối / Highlight", "Chì kẻ mày", "Mascara", "Eyeliner", "Phấn mắt", "Son môi",
    "Xịt cố định makeup", "Dầu gội", "Dầu xả", "Kem ủ tóc", "Tinh dầu dưỡng tóc",
    "Xịt dưỡng tóc", "Máy sấy", "Máy uốn / duỗi", "Kẹp tóc", "Dây buộc tóc",
    "Sữa tắm", "Tẩy tế bào chết body", "Sữa dưỡng thể", "Kem chống nắng body",
    "Nước hoa", "Lăn / xịt khử mùi", "Kem dưỡng tay – chân", "Ví tiền", "Son môi",
    "Kẹp tóc", "Túi xách", "Giày dép", "Nhẫn", "Vòng tay", "Dây chuyền", "Bông tai", "Kính mát","Khác"
  ];

  // Lấy dữ liệu đã lưu
  const savedGifts = JSON.parse(localStorage.getItem('gifts')) || {};

  // Render danh sách quà
  giftList.forEach((gift, index) => {
    const giftItem = document.createElement('div');
    giftItem.className = 'col-12 col-md-6 col-lg-4';

    const card = document.createElement('div');
    const checkbox = document.createElement('input');
    card.className = 'card shadow-sm h-100';

    // Click toàn bộ card để toggle checkbox
    card.addEventListener('click', (e) => {
      if (
        e.target === checkbox ||
        e.target === textInput ||
        e.target.tagName === 'LABEL'
      ) return;

      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    });



    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    // Checkbox

    checkbox.type = 'checkbox';
    checkbox.id = `gift${index}`;
    checkbox.className = 'form-check-input me-2';

    // Label
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = gift;
    label.className = 'form-check-label fw-bold';

    // Input nhãn hiệu
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Nhập nhãn hiệu...';
    textInput.className = 'form-control mt-3';
    textInput.disabled = true;

    // 🔁 RESTORE dữ liệu đã lưu
    if (savedGifts[index]) {
      checkbox.checked = true;
      textInput.disabled = false;
      textInput.value = savedGifts[index].brand || '';
    }

    // Event checkbox
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        textInput.disabled = false;
        textInput.focus();
      } else {
        textInput.disabled = true;
        textInput.value = '';
      }
      saveGiftSelection(index, gift, textInput.value, checkbox.checked);
      updateProgress();
    });

    // Event input
    textInput.addEventListener('input', () => {
      saveGiftSelection(index, gift, textInput.value, checkbox.checked);
    });

    const formCheck = document.createElement('div');
    formCheck.className = 'form-check d-flex align-items-center';
    formCheck.appendChild(checkbox);
    formCheck.appendChild(label);

    cardBody.appendChild(formCheck);
    cardBody.appendChild(textInput);
    card.appendChild(cardBody);
    giftItem.appendChild(card);
    giftContainer.appendChild(giftItem);
  });

  updateProgress();

  // Lưu localStorage
  function saveGiftSelection(id, label, brand, checked) {
    const data = JSON.parse(localStorage.getItem('gifts')) || {};
    if (checked) {
      data[id] = { label, brand };
    } else {
      delete data[id];
    }
    localStorage.setItem('gifts', JSON.stringify(data));
  }

  // Gửi dữ liệu (Formspree)
  sendEmailButton.addEventListener('click', () => {
    const selectedGifts = [];

    giftList.forEach((gift, index) => {
      const checkbox = document.getElementById(`gift${index}`);
      const textInput = checkbox.closest('.card-body').querySelector('input[type="text"]');

      if (checkbox.checked) {
        selectedGifts.push(`- ${gift}: ${textInput.value || 'Không có nhãn hiệu'}`);
      }
    });


    if (selectedGifts.length === 0) {
      alert('Bạn chưa chọn món quà nào 😅');
      return;
    }

    const message = `🎂 Checklist quà sinh nhật\n\n${selectedGifts.join('\n')}`;

    fetch('https://formspree.io/f/xanrknyl', { // 👈 THAY FORM ID
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then(() => {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        alert("🎉 Gửi wishlist thành công!");
      })

      .catch(() => alert('❌ Gửi thất bại, thử lại nhé!'));
  });

  function createSnow() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";

    document.body.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 10000);
  }

  setTimeout(() => {
    setInterval(createSnow, 450);
  }, 1200);




  function updateProgress() {
    const total = giftList.length;
    const checked = document.querySelectorAll('.form-check-input:checked').length;

    progressText.textContent = `Đã chọn ${checked} / ${total} món`;
    progressBar.style.width = `${(checked / total) * 100}%`;

    if (checked > total * 0.6) {
      progressBar.classList.remove('bg-info');
      progressBar.classList.add('bg-success');
    } else {
      progressBar.classList.remove('bg-success');
      progressBar.classList.add('bg-info');
    }
  }


});

