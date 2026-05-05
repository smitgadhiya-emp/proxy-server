import { CronJob, validateCronExpression } from "cron";
import {
  deadLetterQueue,
  publishToDeadLetterQueue,
  publishToQueue,
  queueMessage,
  removeMessageFromDeadLetterQueue,
  removeMessageFromQueue,
} from "../queue/queue.publisher.js";
import { consumeQueue } from "../queue/queue.consumer.js";

const DEFAULT_CRON_SCHEDULE = "*/10 * * * * *"; // every 10 seconds
const DEFAULT_CRON_SCHEDULE_DEAD_LETTER = "*/1 * * * * "; // every 1 minute
const DEFAULT_TIME_ZONE = "Asia/Kolkata";

const cronSchedule = process.env.QUEUE_CRON_SCHEDULE || DEFAULT_CRON_SCHEDULE;
const cronScheduleDeadLetter =
  process.env.QUEUE_CRON_SCHEDULE_DEAD_LETTER ||
  DEFAULT_CRON_SCHEDULE_DEAD_LETTER;
const timeZone = process.env.QUEUE_CRON_TIME_ZONE || DEFAULT_TIME_ZONE;

export function startCronJobs() {
  const validation = validateCronExpression(cronSchedule);

  if (!validation.valid) {
    throw new Error(`Invalid QUEUE_CRON_SCHEDULE: ${cronSchedule}`);
  }

  const queueJob = CronJob.from({
    cronTime: cronSchedule,
    onTick: () => {
      const hasMessagesInQueue = queueMessage.length;

      if (hasMessagesInQueue > 0) {
        const processedMessage = queueMessage.map((message) => {
          try {
            consumeQueue(message);
            removeMessageFromQueue(message);
          } catch (error) {
            try {
              removeMessageFromQueue(message);
              publishToDeadLetterQueue(message);
              removeMessageFromDeadLetterQueue(message);
              console.error(
                `Error processing message: ${error.message}. Message moved to dead letter queue.`,
              );
            } catch (logError) {
              console.error(
                `Failed to log error for message: ${JSON.stringify(message)}. Original error: ${error.message}. Logging error: ${logError.message}`,
              );
            }

            console.error(`Error processing queue messages: ${error.message}`);
          }
        });
        console.log(`Processing cron job with message`);
      } else {
        console.log("no pending messages in queue");
      }
    },
    start: true,
    timeZone,
  });

  console.log(`Queue cron job started with schedule "${cronSchedule}"`);

  return {
    queueJob,
  };
}

export function startCronJobsDeadLetter() {
  const validation = validateCronExpression(cronScheduleDeadLetter);

  if (!validation.valid) {
    throw new Error(
      `Invalid QUEUE_CRON_SCHEDULE_DEAD_LETTER: ${cronScheduleDeadLetter}`,
    );
  }

  const queueJob = CronJob.from({
    cronTime: cronScheduleDeadLetter,
    onTick: () => {
      const hasMessagesInDeadLetterQueue = deadLetterQueue.length;

      if (hasMessagesInDeadLetterQueue > 0) {
        const processedMessage = deadLetterQueue.map((message) => {
          try {
            consumeQueue(message);
            removeMessageFromQueue(message);
            removeMessageFromDeadLetterQueue(message);
          } catch (error) {
            throw new Error(
              `Error processing message in dead letter queue: ${error.message}. Message: ${JSON.stringify(message)}`,
            );
          }
        });
        console.log(`Processing Dead Letter Queue cron job with message`);
      } else {
        console.log("no pending messages in dead letter queue");
      }
    },
    start: true,
    timeZone,
  });

  console.log(
    `Queue cron job started with schedule "${cronScheduleDeadLetter}"`,
  );

  return {
    queueJob,
  };
}
