document.getElementById("donate-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const amount = parseFloat(document.getElementById("donation-amount").value.trim());

    if (!name || amount <= 0) {
        alert("กรุณากรอกชื่อและจำนวนเงิน");
        return;
    }

    // สร้าง FormData สำหรับส่งข้อมูล
    const formData = new FormData();
    formData.append("donorName", name);
    formData.append("amount", amount);

    try {
        // ส่งข้อมูลไปที่เซิร์ฟเวอร์
        const response = await fetch("http://localhost:3000/generate-qr", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // ตรวจสอบผลลัพธ์ที่ได้จากเซิร์ฟเวอร์
        if (data.qrCode) {
            document.getElementById("qrcode").innerHTML = `<img src="${data.qrCode}" alt="QR Code">`;
            alert("🎉 ข้อมูลการบริจาคได้รับการบันทึกแล้ว! กรุณาสแกน QR Code เพื่อทำการบริจาค");
        } else {
            alert("เกิดข้อผิดพลาด: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่!");
    }
});
