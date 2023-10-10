# CloudAWS-Backend

1. Create project folder
```
mkdir movie_manager_worker
cd movie_manager_worker
```

2. Init NodeJS project.

```
npm init -y
```
3. Install Express framework
```
npm install express
```

4. Create `index.js`
```
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, esta es mi Web API!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

3. Install modules
```
npm install aws-sdk
npm install uuid
npm install winston
```

```
Run in terminal with env

```
SQS_QUEUE_URL='https://sqs.us-east-1.amazonaws.com/055794092478/movie-manager-test' DYNAMODB_TABLE_NAME='movie-manager-test' REGION='us-east-1'  node index.js
```

-------------------

Run with docker

```
docker build -t my_worker .

docker run -d -p 3000:3000 --name my_worker \
-e SQS_QUEUE_URL='https://sqs.us-east-1.amazonaws.com/055794092478/movie-manager-test' \
-e DYNAMODB_TABLE_NAME='movie-manager-test' REGION='us-east-1' \
-e REGION='us-east-1' \
my_worker

```

