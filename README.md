# 🕵️‍♂️ Epstein Agent

A powerful RAG (Retrieval-Augmented Generation) based agent designed for intelligent document processing and interactive chatting. Built with **Bun**, **Ollama**, and **ChromaDB**.

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed.
- [Ollama](https://ollama.com/) running locally for embeddings and LLM.

### Installation

Clone the repository and install dependencies:

```bash
bun install
```

---

## 📁 Document Management

To make the agent "aware" of specific information, you should store your text documents in the `assets` folder.

1.  **Prepare your file**: Create or move your text file (e.g., `eps.txt`) into `src/assets/`.
2.  **Indexing**: Use the CLI to index the document into the vector database.

> **Note**: The default configuration and CLI scripts are pre-mapped to `src/assets/eps.txt`.

---

## 🛠 CLI Commands

The project provides several CLI commands for managing your knowledge base and interacting with the agent via `package.json` scripts:

| Command          | Script                         | Description                                                   |
| :--------------- | :----------------------------- | :------------------------------------------------------------ |
| **Index File**   | `bun run cr-f`                 | Indexes the `src/assets/eps.txt` file into ChromaDB.          |
| **Delete File**  | `bun run del-f`                | Removes the `src/assets/eps.txt` indexed content.             |
| **Vector Count** | `bun run count-v`              | Displays the total number of vectors stored in the database.  |
| **Ask Question** | `bun run askq "Your Question"` | Asks a single question and returns the answer with citations. |
| **Chat Mode**    | `bun run chm`                  | Starts an interactive chat session with the agent.            |
| **List Files**   | `bun run li-f`                 | Lists the files current processed (internally calls list).    |

---

## 🧠 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Orchestration**: [LangChain](https://js.langchain.com/)
- **Vector Database**: [ChromaDB](https://www.trychroma.com/)
- **Embeddings**: [Ollama](https://ollama.com/) (`nomic-embed-text`)
- **LLM**: [Ollama](https://ollama.com/) (`llama3.1`)
- **Language**: TypeScript
