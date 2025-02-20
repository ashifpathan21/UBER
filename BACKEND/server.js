require('dotenv').config();

const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const { initializeSocket } = require('./socket');  // adjust path accordingly
initializeSocket(server);

server.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`);
});
