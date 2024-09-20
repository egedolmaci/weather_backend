import express from "express";
import weatherRoute from "./routes/weather.js";
import weather from "./controllers/weather.js";

const app = express();

app.use(express.json());
app.use("/weather", weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}...`);
});
