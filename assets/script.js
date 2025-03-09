// Hiệu ứng cánh hoa rơi
function createPetal() {
  const petalEl = document.createElement("div");
  petalEl.classList.add("petal");
  petalEl.style.left = Math.random() * 100 + "vw";
  petalEl.style.animationDuration = Math.random() * 3 + 2 + "s";
  petalEl.style.opacity = Math.random() * 0.6 + 0.4;
  petalEl.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  // Tạo hình dạng cánh hoa
  petalEl.style.width = Math.random() * 15 + 10 + "px";
  petalEl.style.height = Math.random() * 10 + 8 + "px";
  petalEl.style.background = 
    `radial-gradient(circle at 50% 50%, 
    ${Math.random() > 0.5 ? '#ffcad4' : '#f3b0c3'}, 
    ${Math.random() > 0.5 ? '#f3b0c3' : '#d8697e'})`;
  petalEl.style.borderRadius = "50% 50% 50% 0";
  
  document.querySelector(".falling-petals").appendChild(petalEl);
  
  // Xóa cánh hoa sau khi animation kết thúc
  setTimeout(() => {
    petalEl.remove();
  }, 5000);
}

// Tạo cánh hoa mỗi 300ms
setInterval(createPetal, 300);

// Thêm CSS cho cánh hoa
const style = document.createElement("style");
style.innerHTML = `
  .petal {
    position: absolute;
    top: -20px;
    animation: fall linear forwards;
    z-index: -1;
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Cập nhật năm hiện tại cho footer
document.getElementById("year").textContent = new Date().getFullYear();

// Hiệu ứng hiện dần khi scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Thêm CSS cho hiệu ứng hiện dần
const fadeStyle = document.createElement("style");
fadeStyle.innerHTML = `
  .gallery-item, .wish-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .gallery-item.visible, .wish-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(fadeStyle);

// Xử lý Gallery Lightbox
document.addEventListener('DOMContentLoaded', function() {
  // Quan sát các phần tử cần hiệu ứng
  document.querySelectorAll('.gallery-item, .wish-card').forEach(item => {
    observer.observe(item);
  });
  
  // Thêm hiệu ứng nhịp đập cho icon trái tim
  const heartbeatStyle = document.createElement("style");
  heartbeatStyle.innerHTML = `
    @keyframes heartbeat {
      0% { transform: scale(1); }
      25% { transform: scale(1.1); }
      50% { transform: scale(1); }
      75% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .fa-heart {
      color: #fff;
      animation: heartbeat 1.5s infinite;
    }
  `;
  document.head.appendChild(heartbeatStyle);
  
  // Xử lý Gallery Modal
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Nếu không có modal (trang wishes.html), thoát khỏi hàm
  if (!modal) return;
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  
  // Mở modal khi click vào ảnh
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentIndex = index;
      const imgSrc = this.querySelector('img').src;
      const imgTitle = this.getAttribute('data-title');
      
      modalImg.src = imgSrc;
      modalCaption.textContent = imgTitle;
      modal.style.display = 'block';
      
      // Vô hiệu hóa scroll khi modal mở
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Đóng modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Đóng modal khi click bên ngoài ảnh
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Xử lý nút Previous
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModal();
  });
  
  // Xử lý nút Next
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateModal();
  });
  
  // Xử lý phím mũi tên
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModal();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModal();
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
  
  // Cập nhật nội dung modal
  function updateModal() {
    const currentItem = galleryItems[currentIndex];
    const imgSrc = currentItem.querySelector('img').src;
    const imgTitle = currentItem.getAttribute('data-title');
    
    modalImg.src = imgSrc;
    modalCaption.textContent = imgTitle;
  }
});
