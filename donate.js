document.getElementById("donate-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const amount = parseFloat(document.getElementById("donation-amount").value.trim());
    const proofFile = document.getElementById("proof-upload").files[0];

    if (!name || amount <= 0 || !proofFile) {
        alert("กรุณากรอกชื่อ, จำนวนเงิน และอัปโหลดหลักฐาน");
        return;
    }

    const formData = new FormData();
    formData.append("donorName", name);
    formData.append("amount", amount);
    formData.append("proof", proofFile);

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
