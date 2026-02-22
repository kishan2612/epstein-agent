import { Chroma } from "@langchain/community/vectorstores/chroma";
import embeddings from "./embeddings";

const vectorStore = new Chroma(embeddings, {
  collectionName: "eps-collection",
  clientParams: {
    port: 8000,
    host: "localhost",
  },
});

export default vectorStore;
