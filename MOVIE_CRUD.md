```
CREATE DATABASE IF NOT EXISTS movie_manager;


CREATE TABLE `movie` (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    genre VARCHAR(100),
    director VARCHAR(255)
);

```

Run in terminal with env

```
MYSQL_HOST='movie-manager.c2cpwilhheqc.us-east-1.rds.amazonaws.com' MYSQL_USER='root' MYSQL_PW='rootroot' MYSQL_DB='movie-manager' node app.js
```


