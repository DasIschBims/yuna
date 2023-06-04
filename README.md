## yuna bot

### About  <img src="./img/yuna.png" height="128" width="128" align="right">
This is just another one of my random side projects that I started because I was bored.<br>
Feel free to check out my messy piece of code, you've been warned.<br>
<br>
I don't really have a goal for this project, I'm just doing it for fun.<br>

### Dependencies
- [Node.js](https://nodejs.org/en/) (I'm using v18.16.x)
- [mysql like database](https://www.mysql.com/) (I'm using [MariaDB](https://mariadb.org/))
- [Docker](https://www.docker.com/) (in case you want to run it in a container)

### Running

1. #### Install dependencies
```bash
npm install
```

2. #### Running the bot
    1. Set up the environment variables in the `.env` file. You can use the provided `.env.example` file as a template.
    2. Configure your mysql database of choice and run the following command to migrate and/or create the tables.
    ```bash
    npm run prisma:prod
    ```
    3. If you prefer Docker for running the bot, you can use the provided `docker-compose.yml` file to run it.
    ```bash
    docker-compose up -d
    ```
   
   > Note: You have to set up all the environment variables in the `.env` file before running the bot with docker, or it will fail to start.

    4. Running and building without docker can be achieved by running
    ```bash
    npm run build:start:prod
    ```
    or with separate commands
    ```bash
    npm run build
    npm run start:prod
    ```
   
    > Note: You can also use `npm run start:dev` to run it in development mode and enable a few debug logs by setting `NODE_ENV` to `dev` instead of `prod`.

### Contributing
If you want to contribute to this project, feel free to open a pull request or an issue.<br>
I'm open to any suggestions and/or improvements.
   
