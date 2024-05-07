const Queue = require("bull");
const { sendReminder, sendReminderReview } = require("./sendEmail");

const redisConfig = {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
};

const reminderQueue = new Queue("reminder", redisConfig);
const reviewQueue = new Queue("review", redisConfig);

reminderQueue.process(async (job) => {
    const { email, cancelLink, reviewLink } = job.data
    sendReminder(email, cancelLink)
    reviewQueue.add({ email, reviewLink }, { delay: 2 * 60 * 60 * 1000})
});

reviewQueue.process(async (job) => {
    const { email, reviewLink } = job.data;
    sendReminderReview(email, reviewLink)
});

module.exports = { reminderQueue };