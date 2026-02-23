export interface ParsedEmail {
  sender: string;
  date: string;
  subject: string;
  body: string;
}

export function parseEmails(rawText: string): ParsedEmail[] {
  const emailBlocks = rawText.split(/\n(?=From: )/g);

  return emailBlocks.map((block) => {
    const senderMatch = block.match(/From:\s*(.*)/);
    const dateMatch = block.match(/Sent:\s*(.*)/);
    const subjectMatch = block.match(/Subject:\s*(.*)/);

    return {
      sender: senderMatch?.[1]?.trim() || "Unknown",
      date: dateMatch?.[1]?.trim() || "Unknown",
      subject: subjectMatch?.[1]?.trim() || "No Subject",
      body: block,
    };
  });
}
