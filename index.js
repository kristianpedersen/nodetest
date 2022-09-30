const http = require("http");

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "text-plain" });

    console.clear();

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    const { challenge } = JSON.parse(data);

    console.log({ challenge })

    res.end(challenge)
});

server.listen(process.env.PORT || 8443);