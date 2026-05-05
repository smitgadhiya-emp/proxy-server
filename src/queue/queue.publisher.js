export const queueMessage = [];
export const deadLetterQueue = [];

export const publishToQueue = (message) => {
  queueMessage.push(message);

  console.log(`Queue messages: ${JSON.stringify(queueMessage)}`);

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
}

export const publishToDeadLetterQueue = (message) => {
  deadLetterQueue.push(message);

  console.log(`Dead letter queue messages: ${JSON.stringify(deadLetterQueue)}`);

  return true;
};


export const removeMessageFromDeadLetterQueue = (message) => {
  const index = deadLetterQueue.indexOf(message);

  if (index > -1) {
    deadLetterQueue.splice(index, 1);
    console.log(`Message removed from dead letter queue: ${JSON.stringify(message)}`);
  } else {
    console.warn(`Message not found in dead letter queue: ${JSON.stringify(message)}`);
  }
}