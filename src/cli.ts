import { indexFile, deleteFile } from "./indexer";
import { askQuestion } from "./rag";
import { getVectorCount } from "./db";
import readline from "readline";

const args = process.argv.slice(2);
const command = args[0];

async function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n🤖 Agent Chat Mode Started");
  console.log("Type 'exit' to quit.\n");

  rl.on("line", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      const result = await askQuestion(input);

      console.log("\n🤖 Answer:\n");
      console.log(result.answer);

      console.log("\n--------------------------------\n");
    } catch (err) {
      console.error("Error:", err);
    }
  });
}

async function main() {
  switch (command) {
    case "index":
      if (!args[1]) {
        console.log("Provide file path.");
        return;
      }
      await indexFile(args[1]);
      break;

    case "delete":
      if (!args[1]) {
        console.log("Provide file path.");
        return;
      }
      await deleteFile(args[1]);
      break;

    case "ask":
      const question = args.slice(1).join(" ");
      if (!question) {
        console.log("Provide a question.");
        return;
      }

      const result = await askQuestion(question);

      console.log("\n🤖 Answer:\n");
      console.log(result.answer);

      console.log("\n📚 Citations:");
      result.citations.forEach((c: any) => {
        console.log(`- Source: ${c.source}`);
      });

      break;

    case "chat":
      await startChat();
      break;

    case "count":
      const count = await getVectorCount();
      console.log("Total vectors stored:", count);
      break;

    default:
      console.log("\nAvailable Commands:");
      console.log("  bun run src/cli.ts index <filePath>");
      console.log("  bun run src/cli.ts delete <filePath>");
      console.log('  bun run src/cli.ts ask "your question"');
      console.log("  bun run src/cli.ts chat");
      console.log("  bun run src/cli.ts count");
  }
}

main();
