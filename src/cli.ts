import { indexFile, deleteFile, listFiles } from "./indexer";

const args = process.argv.slice(2);

async function main() {
  const command = args[0];
  const filePath = args[1];

  switch (command) {
    case "index":
      if (!filePath) {
        console.log("Provide file path.");
        return;
      }
      await indexFile(filePath);
      break;

    case "delete":
      if (!filePath) {
        console.log("Provide file path.");
        return;
      }
      await deleteFile(filePath);
      break;

    case "list":
      await listFiles();
      break;

    default:
      console.log("Commands:");
      console.log("  bun run cli.ts index <filePath>");
      console.log("  bun run cli.ts delete <filePath>");
      console.log("  bun run cli.ts list");
  }
}

main();
