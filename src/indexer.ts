import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import vectorStore from "./db";
import { generateHash, readFile } from "./utils";

export async function indexFile(filePath: string) {
  const content = readFile(filePath);
  const fileHash = generateHash(content);
  console.log("Checking if already indexed...");

  const existing = await vectorStore.similaritySearch("dummy", 1, {
    fileHash,
  });

  if (existing.length > 0) {
    console.log("File already indexed. Skipping...");
    return;
  }

  console.log("Splitting file into chunks...");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.createDocuments([content]);

  const documentsWithMetaData = docs.map((doc, index) => {
    return {
      pageContent: doc.pageContent,
      metadata: { source: filePath, fileHash, chunkIndex: index },
    };
  });
  console.log(`Embedding ${documentsWithMetaData.length} chunks...`);

  await vectorStore.addDocuments(documentsWithMetaData);
  console.log("Indexing complete.");
}

export async function deleteFile(filePath: string) {
  const content = readFile(filePath);
  const fileHash = generateHash(content);

  console.log("Deleting file from vector DB...");
  await vectorStore.delete({ filter: { fileHash } });
  console.log("Deletion complete.");
}

export async function listFiles() {
  const results = await vectorStore.similaritySearch("dummy", 100);

  const files = new Set<string>();

  results.forEach((doc) => {
    if (doc.metadata?.source) {
      files.add(doc.metadata.source);
    }
  });

  console.log("Indexed Files:");
  files.forEach((file) => console.log(file));
}
