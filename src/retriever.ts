import vectorStore from "./db";

export async function retrieveDocuments(query: string, k: number = 5) {
  const results = await vectorStore.similaritySearch(query, k);

  return results;
}
