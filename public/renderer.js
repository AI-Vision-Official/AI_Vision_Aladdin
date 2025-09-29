const fs = require("fs");
const path = require("path");
const moduleContainer = document.getElementById("module-container");
const notepadTile = document.getElementById("tile-notepad");
const chatTile = document.getElementById("tile-chat");

// Pad voor lokaal bestand
const noteFile = path.join(process.cwd(), "userdata", "note.txt");

// Zorg dat userdata map bestaat
const userdataPath = path.join(process.cwd(), "userdata");
if (!fs.existsSync(userdataPath)) {
  fs.mkdirSync(userdataPath);
}

// --- Helper: functie om LLaMA offline aan te roepen ---
async function getAssistantResponse(userMsg) {
  try {
    // Importeer de LLaMA-module
    const llamacpp = require("J:\\GIT\\AI Models\\extensions\\@janhq\\llamacpp-extension\\dist\\index.js");
    
    // Maak een prompt voor Jan
    const prompt = `User: ${userMsg}\nJan:`;

    // Stuur het naar LLaMA
    const response = await llamacpp.query(prompt); // dit hangt af van jouw module, check documentatie
    return response || "🤖 Jan: Geen antwoord ontvangen.";
  } catch (err) {
    console.error("Error calling LLaMA:", err);
    return "🤖 Jan: Er ging iets mis bij het offline AI-model.";
  }
}

// --- Chat Tile ---
chatTile.addEventListener("click", () => {
  moduleContainer.innerHTML = `
    <div class="chat-window">
      <div class="chat-messages" id="chat-messages"></div>
      <input type="text" id="chat-input" class="chat-input" placeholder="Type your message..." />
      <button id="send-btn">Send</button>
    </div>
  `;

  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendBtn.addEventListener("click", async () => {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    addMessage("You", userMsg);
    chatInput.value = "";

    // --- Vervang dummy door echte LLaMA response ---
    const assistantResponse = await getAssistantResponse(userMsg);
    addMessage("🤖 Jan", assistantResponse);
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
});

// --- Notepad Tile blijft hetzelfde ---
notepadTile.addEventListener("click", () => {
  moduleContainer.innerHTML = `
    <textarea class="notepad" id="notepad">${fs.existsSync(noteFile) ? fs.readFileSync(noteFile, "utf8") : ""}</textarea>
    <br>
    <button id="save-note">💾 Save</button>
  `;
  const saveBtn = document.getElementById("save-note");
  const textarea = document.getElementById("notepad");
  saveBtn.addEventListener("click", () => {
    fs.writeFileSync(noteFile, textarea.value, "utf8");
    alert("Saved locally!");
  });
});
