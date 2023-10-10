const express = require('express');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');
const PORT = process.env.PORT || 80;

const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [ new winston.transports.Console() ],
});
const sqs = new aws.SQS({ region: process.env.REGION });
const dynamoDB = new aws.DynamoDB.DocumentClient({
    region: process.env.REGION,
});

app.use(express.json());

aws.config.update({
    region: process.env.REGION
});

app.get('/', (req, res) => {
    res.send('¡Hola, este es mi Worker!');
});

app.post('/process-message', async (req, res) => {
    const data = req.body;
    logger.info('Endpoint call by EB worker');
    logger.info(JSON.stringify(data));
    try {
        const uid = uuidv4();
        const movieItem = {
            'key': uid,
            ...data,
        };

        const putParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: movieItem,
        };
        await dynamoDB.put(putParams).promise();

        logger.info('Message success write to DynamoDb');
        res.status(200).json({ message: 'Message success write to DynamoDb' });
    } catch (error) {
        logger.error('Error processing messages', { error })
        res.status(500).json({ message: 'Error processing messages' });
    }
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    //Polling option
    //processSQSMessages();
});

async function processSQSMessages() {
    logger.info('Start polling');
    const queueUrl = process.env.SQS_QUEUE_URL;

    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
    };

    try {
        const data = await sqs.receiveMessage(params).promise();
        if (data.Messages) {
            for (const message of data.Messages) {
                console.log('Message received', message);
                const movieData = JSON.parse(message.Body);
                const uid = uuidv4();
                const movieItem = {
                    'key': uid,
                    ...movieData,
                };

                const putParams = {
                    TableName: process.env.DYNAMODB_TABLE_NAME,
                    Item: movieItem,
                };
                await dynamoDB.put(putParams).promise();

                await sqs.deleteMessage({
                    QueueUrl: queueUrl,
                    ReceiptHandle: message.ReceiptHandle,
                }).promise();

                logger.info('Message success write to DynamoDb');
            }
        }
    } catch (error) {
        logger.error('Error processing SQS messages', { error })
    }

    setTimeout(processSQSMessages, 1000);
}

