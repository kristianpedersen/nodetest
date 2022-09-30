const greier = {
    data: {
        merData: {
            endaMer: Math.floor(Math.random() * 100)
        }
    }
}

const http = require("http");
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text-plain" });
        res.end(greier)
    } else {
        res.writeHead(405, { "Content-Type": "text-plain" });
        res.end("Ikkje bra\n")
    }
});

server.listen(process.env.PORT || 8443);
console.log("Hei fra serveren")