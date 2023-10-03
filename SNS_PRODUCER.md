Install AWS SDK

```
npm install aws-sdk

"dependencies": {
    "aws-sdk": "^2.1468.0",
    "express": "^4.18.2",
    "mysql": "^2.18.1"
 }

```

Import AWS SDK

```
const aws = require('aws-sdk');
```

Configure AWS SDK

```

aws.config.update({
  region: 'us-east-1'
});

const sns = new aws.SNS();
```

Add function to send message to SNS

```
function publishToSNS(message) {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: 'SNS_ARN'
  };

  sns.publish(params, (err, data) => {
    if (err) console.error('Error when publish to SNS:', err);
    else console.log('Message sended to SNS:', data.MessageId);
  });
}
```
Run in terminal with env

```
SNS_ARN='arn:aws:sns:us-east-1:520076894043:test2' REGION='us-east-1' MYSQL_HOST='movie-manager.c2cpwilhheqc.us-east-1.rds.amazonaws.com' MYSQL_USER='root' MYSQL_PW='rootroot' MYSQL_DB='movie-manager' node index.js
```

-------------------

Run with docker

```
docker build -t mi_web_api .

docker run -d -p 3000:3000 --name mi-contenedor \
-e SNS_ARN='arn:aws:sns:us-east-1:520076894043:test2' \
-e REGION='us-east-1' \
-e MYSQL_HOST='movie-manager.c2cpwilhheqc.us-east-1.rds.amazonaws.com' \
-e MYSQL_USER='root' \
-e MYSQL_PW='rootroot' \
-e MYSQL_DB='movie-manager' \
mi_web_api

```

