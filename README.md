# CloudAWS-Backend

1. Create project folder
```
mkdir movie_manager
cd movie_manager
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

```

5. Create `Dockerfile`
```
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]

```
6. Build docker image
```
docker build -t mi_web_api .
```

---------------------

Run docker container
```
docker run -p 3000:3000 mi_web_api
```

Run in terminal
```
node index.js
```





 
