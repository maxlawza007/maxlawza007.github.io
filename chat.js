document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // ฟังก์ชันส่งข้อความ
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== "") {
      // สร้าง div ข้อความ
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("chat-message", "user");
      messageDiv.innerText = message;
      
      // เพิ่มเข้าไปในกล่องแชท
      chatBox.appendChild(messageDiv);
      
      // ล้างข้อความที่พิมพ์
      chatInput.value = "";
      
      // เลื่อนลงให้เห็นข้อความล่าสุด
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // กดปุ่มส่ง
  sendBtn.addEventListener("click", sendMessage);

  // กด Enter เพื่อส่ง
  chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
