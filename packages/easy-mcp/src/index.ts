console.log("Hello via Bun!");

// src/index.ts
export function greet(name: string): string {
  console.log("Hello,", name, "!");
  return `Hello, ${name}!`;
}
