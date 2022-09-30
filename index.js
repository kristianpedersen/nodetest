const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text-plain" });

    console.clear();
    console.log(req)

    res.end("Det gikk bra")
});

server.listen(process.env.PORT || 8443);