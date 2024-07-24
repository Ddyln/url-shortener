# URL Shortener

## Description

A website to shorten URL using ***Node.js*** v18.14.0. For back-end, ***Express.js*** is used and the database is ***MongoDB*** .

## Installation

Clone the repository to your local machine.

Initialize ***package.json*** with:

```bash
npm init -y
```

Use the Node.js package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all the needed package.

```bash
npm install express, mongoose, dotenv, path, nanoid@3
```

Create a ***.env*** file, then add these values:

### .env
```bash
DB_URL = <mongodb-server-address>
SERVER_IP = <IP-to-the-server>
PORT = <port>
```

And you are good to go.

## Authors
[Me](https://github.com/Ddyln) and [Nagnie](https://github.com/nagnie).

## License

[MIT](https://choosealicense.com/licenses/mit/)