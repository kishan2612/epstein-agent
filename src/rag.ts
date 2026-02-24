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
Source: ${doc.metadata.source}

${doc.pageContent}
  `,
    )
    .join("\n\n");

  const chatHistory = memory.getHistory();

  const prompt = `
You are a factual research assistant.

Use ONLY the documents provided.
If answer not found, say "Not found in indexed documents."

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
      source: d.metadata.source,
    })),
  };
}
