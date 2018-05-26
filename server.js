// Server, https & Proxy
const express = require('express');
const greenlock = require('greenlock-express');
const proxy = require('http-proxy-middleware');

// OS
const path = require('path');

// Config
const cfg = require('./config/server');
const { key, certificate, port, host } = cfg;

// Server static dist
const static_dist_path = path.join(__dirname, 'dist');
const server = express();

// Server proxy
const server_proxy = proxy('/api', cfg.proxy);

server.use(express.static(static_dist_path));
server.use((req, res) => res.sendFile(static_dist_path, '/index.html'));
server.use(server_proxy);

greenlock
    .create({
        server: 'staging',
        version: 'draft-11',
        email: 'audren.naruto@gmail.com',
        agreeTos: true,
        approuvedDomains: ['example.com'],
        app: server.use('/', (req, res) => res.end())
    })
.listen(8080, 4430);

// const https = require('https');
// const http = require('http');

/* Https */
// if (key && certificate) {
//     const credentials = { key: key, certificate: certificate };

//     https.createServer(credentials, server)
//         .listen(cfg.port || 443, () => console.log(`Server is runnnig on ${port || 443} port`))

//     // dev: 8080 - prod: 80
//     http.createServer((req, res) => {
//         res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
//         res.end();
//     }).listen(8080)

// } //
// else
//     server.listen(port || 8080, () => console.log(`Server is runnnig on ${port || 80} port`))