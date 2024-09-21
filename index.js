import express from "express";
import weatherRoute from "./routes/weather.js";
import redis from "redis";

const redisClient = redis.createClient();

(async () => {
  redisClient.on("error", (err) => {
    console.error("Redis client error", err);
  });

  redisClient.on("ready", () => {
    console.log("Redis client started");
  });

  await redisClient.connect();

  await redisClient.ping();
})();

const app = express();

app.use(express.json());
app.use("/weather", weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}...`);
});

export default redisClient;
