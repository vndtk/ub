import { WebSocketServer } from "ws";
import { createClient } from "redis";

const WINNING_COMBINATION = new Array(5)
  .fill(0)
  .map(() => Math.floor(Math.random() * 70) + 1);

const rc = createClient();
rc.on("error", (err) => console.log("Redis connection error:", err));
rc.connect().then(() => console.log("Connected to Redis!"));

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", async (message) => {
    const parsed = JSON.parse(message);
    switch (parsed.action) {
      case "register":
        const exists = await rc.exists(parsed.id);
        if (!exists) {
          await rc.hSet(parsed.id, {
            bank: 0,
            plays: 0,
          });
        }

        const data = await rc.hGetAll(parsed.id);

        ws.send(
          JSON.stringify({
            action: "register",
            data,
          })
        );
        break;
      default:
        console.log("Uknown action.");
        break;
    }
  });
});
