// โหลดข้อมูลจากไฟล์ JSON และแสดงผล
document.addEventListener("DOMContentLoaded", () => {
  // โหลดข้อมูลแมว
  fetch('data/cats.json')
    .then(response => response.json())
    .then(data => {
      const catsInfo = document.getElementById('cats-info');
      data.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.classList.add('card', 'mb-4');
        catCard.innerHTML = `
          <img src="${cat.image}" class="card-img-top" alt="${cat.name}">
          <div class="card-body">
            <h5 class="card-title">${cat.name}</h5>
            <p class="card-text">${cat.description}</p>
          </div>
        `;
        catsInfo.appendChild(catCard);
      });
    })
    .catch(error => console.log(error));

  // โหลดข้อมูลสินค้า
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      const productContainer = document.getElementById('products');
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4');
        productCard.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>ราคา: ฿${product.price}</strong></p>
              <button class="btn btn-primary">ซื้อสินค้า</button>
            </div>
          </div>
        `;
        productContainer.appendChild(productCard);
      });
    })
    .catch(error => console.log(error));

  // การบริจาค
  const donateForm = document.getElementById('donate-form');
  donateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('donation-amount').value;
    const message = document.getElementById('donation-message').value;

    // เพิ่มการบริจาคลงในประวัติ
    fetch('data/donations.json')
      .then(response => response.json())
      .then(data => {
        data.total_donations += parseInt(amount);
        data.donation_history.push({
          name: 'ผู้บริจาคใหม่',
          amount: parseInt(amount),
          message: message
        });

        // อัปเดตข้อมูล JSON ในระบบ (การอัปเดตจริงๆ ต้องทำที่เซิร์ฟเวอร์ แต่ในที่นี้จะอัปเดตแค่บนหน้าเว็บ)
        console.log(data);
      })
      .catch(error => console.log(error));
  });
});
