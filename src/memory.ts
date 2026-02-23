class SimpleMemory {
  private history: string[] = [];

  addUserMessage(message: string) {
    this.history.push(`User: ${message}`);
  }

  addAIMessage(message: string) {
    this.history.push(`Assistant: ${message}`);
  }

  getHistory() {
    return this.history.join("\n");
  }
}

export const memory = new SimpleMemory();
