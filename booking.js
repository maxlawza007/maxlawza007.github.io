document.addEventListener("DOMContentLoaded", () => {
    const bookBtn = document.getElementById("book-btn");
    const bookingTime = document.getElementById("booking-time");
  
    // ฟังก์ชันบันทึกข้อมูลการจอง
    function bookTime() {
      const selectedTime = bookingTime.value;
      if (!selectedTime) {
        alert("⚠️ กรุณาเลือกเวลาที่ต้องการจอง!");
        return;
      }
  
      // ดึงข้อมูลจองเก่าจาก Local Storage
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
      // เพิ่มข้อมูลจองใหม่
      const newBooking = {
        time: selectedTime,
        bookedAt: new Date().toLocaleString(),
      };
      bookings.push(newBooking);
  
      // บันทึกกลับไปที่ Local Storage
      localStorage.setItem("bookings", JSON.stringify(bookings));
  
      // แจ้งเตือนผู้ใช้
      alert(`🎉 คุณได้จองเวลาเล่นกับแมวเรียบร้อยแล้ว!\n📅 วันที่: ${selectedTime}`);
  
      // อัปเดตตารางจอง
      displayBookings();
    }
  
    // ฟังก์ชันแสดงข้อมูลการจอง
    function displayBookings() {
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const bookingList = document.getElementById("booking-list");
  
      bookingList.innerHTML = ""; // ล้างข้อมูลเดิม
  
      if (bookings.length === 0) {
        bookingList.innerHTML = "<p class='text-center'>❌ ยังไม่มีการจอง</p>";
        return;
      }
  
      bookings.forEach((booking, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${booking.time}</td>
          <td>${booking.bookedAt}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteBooking(${index})">ลบ</button></td>
        `;
        bookingList.appendChild(row);
      });
    }
  
    // ฟังก์ชันลบการจอง
    window.deleteBooking = function (index) {
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.splice(index, 1);
      localStorage.setItem("bookings", JSON.stringify(bookings));
      displayBookings();
    };
  
    // โหลดข้อมูลการจองเมื่อเปิดหน้า
    displayBookings();
  
    // Event กดปุ่มจอง
    bookBtn.addEventListener("click", bookTime);
  });
  