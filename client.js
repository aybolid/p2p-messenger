const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.connect({ port: process.argv[3] });

rl.question("Enter your name: ", (name) => {
  client.write(name);

  rl.prompt();
});

client.on("data", (data) => {
  process.stdout.write(data);
});

rl.on("line", (line) => {
  client.write(line);

  rl.prompt();
});

rl.on("close", () => {
  client.end();
});
