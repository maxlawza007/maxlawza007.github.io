document.addEventListener("DOMContentLoaded", () => {
    const donateForm = document.getElementById("donate-form");
    const donorName = document.getElementById("donor-name");
    const donationAmount = document.getElementById("donation-amount");
    const donationList = document.getElementById("donation-list");
  
    // ฟังก์ชันบันทึกข้อมูลการบริจาค
    function saveDonation(event) {
      event.preventDefault();
      const name = donorName.value.trim();
      const amount = donationAmount.value.trim();
  
      if (!name || !amount || amount <= 0) {
        alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน และระบุจำนวนเงินที่ถูกต้อง!");
        return;
      }
  
      // ดึงข้อมูลเก่าจาก Local Storage
      let donations = JSON.parse(localStorage.getItem("donations")) || [];
  
      // เพิ่มข้อมูลใหม่
      const newDonation = {
        name,
        amount,
        date: new Date().toLocaleString(),
      };
      donations.push(newDonation);
  
      // บันทึกลง Local Storage
      localStorage.setItem("donations", JSON.stringify(donations));
  
      // ล้างค่าอินพุต
      donorName.value = "";
      donationAmount.value = "";
  
      // อัปเดตรายการบริจาค
      displayDonations();
    }
  
    // ฟังก์ชันแสดงรายการบริจาค
    function displayDonations() {
      const donations = JSON.parse(localStorage.getItem("donations")) || [];
      donationList.innerHTML = "";
  
      if (donations.length === 0) {
        donationList.innerHTML = "<tr><td colspan='5' class='text-center'>❌ ยังไม่มีการบริจาค</td></tr>";
        return;
      }
  
      donations.forEach((donation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donation.name}</td>
          <td>${donation.amount} บาท</td>
          <td>${donation.date}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteDonation(${index})">ลบ</button></td>
        `;
        donationList.appendChild(row);
      });
    }
  
    // ฟังก์ชันลบข้อมูลการบริจาค
    window.deleteDonation = function (index) {
      let donations = JSON.parse(localStorage.getItem("donations")) || [];
      donations.splice(index, 1);
      localStorage.setItem("donations", JSON.stringify(donations));
      displayDonations();
    };
  
    // ฟังก์ชันสร้าง QR Code
    function generateQRCode() {
      const qrcodeContainer = document.getElementById("qrcode");
      qrcodeContainer.innerHTML = ""; // เคลียร์ QR Code เก่า
      new QRCode(qrcodeContainer, {
        text: "https://www.example.com/donate", // แก้ไขลิงก์เป็นช่องทางรับบริจาคของคุณ
        width: 200,
        height: 200,
      });
    }
  
    // โหลดข้อมูลบริจาคเมื่อเปิดหน้า
    displayDonations();
    generateQRCode();
  
    // Event กดปุ่มบริจาค
    donateForm.addEventListener("submit", saveDonation);
  });
  