import { publishToQueue } from "./queue.publisher.js";

export function sendToQueue(keyandmessage) {
  const result = publishToQueue(keyandmessage);

  return result;
}
