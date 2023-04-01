const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    clients.forEach((client) => {
      if (client !== socket) {
        if (!socket.name) return;
        client.write(`[${socket.name}]: ${data.toString()}\n`);
      }
    });
  });

  socket.on("end", () => {
    console.log("\x1b[31m%s\x1b[0m", `${socket.name} disconnected\n`);
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`${socket.name} disconnected\n`);
      }
    });
    clients.delete(socket);
  });

  socket.once("data", (data) => {
    socket.name = data.toString().trim();
    clients.add(socket);
    console.log("\x1b[32m%s\x1b[0m", `${socket.name} connected\n`);

    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`${socket.name} connected\n`);
      }
    });

    socket.write(`Welcome to the chat, ${socket.name}!\n`);
    socket.write("================ Chat =================\n");
  });
});

const PORT = process.argv[2];
const clients = new Set();

server.listen(PORT, () => {
  console.log("\x1b[36m%s\x1b[0m", `Server listening on port ${PORT}\n`);
});
