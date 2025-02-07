document.getElementById("donate-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const amount = parseFloat(document.getElementById("donation-amount").value.trim());

    if (!name || amount <= 0) {
        alert("กรุณากรอกชื่อและจำนวนเงินให้ถูกต้อง");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/generate-qr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ donorName: name, amount })
        });

        const data = await response.json();

        if (data.qrCode) {
            document.getElementById("qrcode").innerHTML = `<img src="${data.qrCode}" alt="QR Code พร้อมเพย์">`;
        } else {
            alert("เกิดข้อผิดพลาด: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่!");
    }
});
