import { retrieveDocuments } from "./retriever";
import { memory } from "./memory";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.1",
  temperature: 0.3,
});

export async function askQuestion(question: string) {
  const docs = await retrieveDocuments(question, 5);

  const context = docs
    .map(
      (doc, i) => `
Document ${i + 1}
Sender: ${doc.metadata.sender}
Date: ${doc.metadata.date}
Subject: ${doc.metadata.subject}

${doc.pageContent}
  `,
    )
    .join("\n\n");

  const chatHistory = memory.getHistory();

  const prompt = `
You are a factual research assistant.

Use ONLY the documents provided.
If answer not found, say "Not found in indexed emails."

Conversation History:
${chatHistory}

Documents:
${context}

Question:
${question}
`;

  const response = await model.invoke(prompt);

  memory.addUserMessage(question);
  memory.addAIMessage(response.content as string);

  return {
    answer: response.content,
    citations: docs.map((d, i) => ({
      docNumber: i + 1,
      sender: d.metadata.sender,
      date: d.metadata.date,
      subject: d.metadata.subject,
    })),
  };
}
