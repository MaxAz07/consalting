import fs from "fs";
import path from "path";
import express from "express";
import fetch from "node-fetch";
import mammoth from "mammoth";

const API_KEY = "io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6ImU5YjIxNDcyLTczZGQtNDM1NC04OGE0LTM4MTIxYjViYTQ0ZCIsImV4cCI6NDkyNDUwOTQzOH0.Yqj9X3TTot_ZR7lm4M8JGukHV6_LBA_mp31AAQHPllwefR6E3nbHl1n6gsG5k2LnfUKOubmHGDoWuhpWj04ZdA";
const CHAT_URL = "https://api.intelligence.io.solutions/api/v1/chat/completions";

const app = express();
app.use(express.json());
app.use(express.static("."));

let ALL_TEXT = "";

// Извлекаем текст из docx
async function docxToText(filePath) {
  try {
    const { value: text } = await mammoth.extractRawText({ path: filePath });
    return text;
  } catch (e) {
    console.error("Ошибка чтения", filePath, e);
    return "";
  }
}

// Загружаем все docx
async function loadAllDocs() {
  const docsPath = "./docs";
  if (!fs.existsSync(docsPath)) {
    console.warn("Папка docs не найдена, создайте её и добавьте Word файлы");
    return;
  }

  const files = fs.readdirSync(docsPath).filter(f => f.endsWith(".docx"));

  for (const file of files) {
    const filePath = path.join(docsPath, file);
    const text = await docxToText(filePath);
    ALL_TEXT += `\n\n=== ${file} ===\n\n`;
    ALL_TEXT += text;
    console.log(`📄 ${file} загружен`);
  }

  console.log("✅ Все DOCX загружены в память");
}

// Поиск релевантного текста
function extractRelevantText(query, text, limit = 6000) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const blocks = text.split("\n\n");

  const scored = blocks
    .map(b => {
      const score = words.reduce((acc, w) => acc + (b.toLowerCase().includes(w) ? 1 : 0), 0);
      return { score, text: b };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(x => x.text)
    .join("\n\n");

  return scored.slice(0, limit);
}

// API для фронта
app.post("/api/chat", async (req, res) => {
  const userText = req.body.message;
  if (!userText) return res.status(400).json({ error: "No message" });

  const context = extractRelevantText(userText, ALL_TEXT);

  const systemPrompt = `
Ты AI-ассистент юридического консалтинга университета.
Отвечай строго на том же языке, что и вопрос.
Используй только контекст ниже.
Если ответа нет в контексте — скажи, что информации нет.

Контекст:
${context}
`;

  try {
    const r = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.3-70B-Instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText },
        ],
        temperature: 0.2,
        max_completion_tokens: 700,
      }),
    });

    const data = await r.json();
    res.json({ answer: data?.choices?.[0]?.message?.content || "Ошибка ответа" });
  } catch (e) {
    console.error("Ошибка API:", e);
    res.status(500).json({ error: "API error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

// Запуск
loadAllDocs().then(() => {
  app.listen(3000, () => console.log("🚀 Сервер работает на http://localhost:3000"));
});
