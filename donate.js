const API_URL = "http://localhost:3000/generate-qr"; // URL เซิร์ฟเวอร์ของคุณ

document.getElementById("donate-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const donorName = document.getElementById("donor-name").value.trim();
    const amount = parseFloat(document.getElementById("donation-amount").value);

    if (!donorName || amount <= 0) {
        alert("กรุณากรอกชื่อและจำนวนเงินให้ถูกต้อง");
        return;
    }

    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "<p>⏳ กำลังสร้าง QR Code...</p>";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ donorName, amount })
        });

        const data = await response.json();
        if (data.qrCode) {
            qrContainer.innerHTML = `<img src="${data.qrCode}" alt="QR Code พร้อมเพย์">`;
            saveDonation(donorName, amount);
        } else {
            alert("เกิดข้อผิดพลาด: " + data.error);
        }
    } catch (error) {
        alert("เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    }
});

// บันทึกรายการบริจาคใน Local Storage
function saveDonation(name, amount) {
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push({ name, amount, date: new Date().toLocaleString() });
    localStorage.setItem("donations", JSON.stringify(donations));
    loadDonations();
}

// โหลดรายการบริจาค
function loadDonations() {
    const donationList = document.getElementById("donation-list");
    donationList.innerHTML = "";

    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.forEach((donation, index) => {
        donationList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${donation.name}</td>
                <td>${donation.amount} บาท</td>
                <td>${donation.date}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeDonation(${index})">ลบ</button></td>
            </tr>
        `;
    });
}

// ลบรายการบริจาค
function removeDonation(index) {
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.splice(index, 1);
    localStorage.setItem("donations", JSON.stringify(donations));
    loadDonations();
}

// โหลดรายการเมื่อเปิดหน้า
loadDonations();
