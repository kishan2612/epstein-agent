import { Chroma } from "@langchain/community/vectorstores/chroma";
import embeddings from "./embeddings";

const vectorStore = new Chroma(embeddings, {
  collectionName: "eps-collection",
  url: "http://localhost:8000",

  // clientParams: {
  //   port: 8000,
  //   host: "localhost",
  // },
});

export default vectorStore;

export async function getVectorCount() {
  const docs = await vectorStore.similaritySearch("test", 10000);
  return docs.length;
}
