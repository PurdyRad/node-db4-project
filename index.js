const server = require('./server');

const PORT = 8228;

server.listen(PORT, () => {
    console.log(`Yer off to the races on port ${PORT}`);
});
