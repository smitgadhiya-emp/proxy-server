export const queueMessage = [];
export const deadLetterQueue = [];

export const publishToQueue = (message) => {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2);

  const payload = {
    id: message.id || id,
    key: message.key,
    message: message.message,
    status: message.status || "pending",
    maxRetry: message.maxRetry || 3,
    attempts: message.attempts || 0,
  };

  queueMessage.push(payload);
  return true;
};

export const removeMessageFromQueue = (message) => {
  const index = queueMessage.indexOf(message);

  if (index > -1) {
    queueMessage.splice(index, 1);
    console.log(`Message removed from queue: ${JSON.stringify(message)}`);
  } else {
    console.warn(`Message not found in queue: ${JSON.stringify(message)}`);
  }
};

// Function to publish message to dead letter queue

export const publishToDeadLetterQueue = (message) => {
  deadLetterQueue.push(message);

  console.log(`Dead letter queue messages: ${JSON.stringify(deadLetterQueue)}`);

  return true;
};

export const removeMessageFromDeadLetterQueue = (message) => {
  const index = deadLetterQueue.indexOf(message);

  if (index > -1) {
    deadLetterQueue.splice(index, 1);
    console.log(
      `Message removed from dead letter queue: ${JSON.stringify(message)}`,
    );
  } else {
    console.warn(
      `Message not found in dead letter queue: ${JSON.stringify(message)}`,
    );
  }
};
