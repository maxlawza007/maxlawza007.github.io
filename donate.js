document.getElementById("donate-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const amount = parseFloat(document.getElementById("donation-amount").value.trim());
    // อัปเดต: ไม่ต้องตรวจสอบไฟล์
    const proofFile = document.getElementById("proof-upload") ? document.getElementById("proof-upload").files[0] : null;

    // ตรวจสอบแค่ชื่อและจำนวนเงิน
    if (!name || amount <= 0) {
        alert("กรุณากรอกชื่อ และจำนวนเงินที่บริจาค");
        return;
    }

    const formData = new FormData();
    formData.append("donorName", name);
    formData.append("amount", amount);
    
    // ถ้ามีไฟล์ proof ก็จะเพิ่มไฟล์นั้นไปด้วย
    if (proofFile) {
        formData.append("proof", proofFile);
    }

    try {
        const response = await fetch("http://localhost:3000/upload-proof", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert("🎉 ส่งข้อมูลสำเร็จ! รอการตรวจสอบ");
        } else {
            alert("เกิดข้อผิดพลาด: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่!");
    }
});
