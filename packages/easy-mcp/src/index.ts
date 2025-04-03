import _logger from "./core/logger";

_logger.info("Hello, world!");

// src/index.ts
export function greet(name: string): string {
  _logger.info(`Hello, ${name}!`);
  return `Hello, ${name}!`;
}
