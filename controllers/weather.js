import DailyModel from "../models/dailyModel.js";
import HourlyModel from "../models/hourlyModel.js";
import "dotenv/config";
import redisClient from "../index.js";

const getDaily = async (req, res, next) => {
  let url = process.env.URL_DAILY;
  const searchQuery = req.query.q;
  url = url.replace("turkey", searchQuery);

  try {
    let data = null;
    const key = "search:" + searchQuery.toLowerCase();
    const value = await redisClient.get(key);

    if (value) {
      console.log("Cache hit!");
      data = JSON.parse(value);
    } else {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      data = await response.json();

      await redisClient.set(key, JSON.stringify(data), {
        EX: 300,
      });

      console.log("Cache miss!");
    }

    const dataModel = new DailyModel(data);
    res.json(dataModel);
  } catch (error) {
    next(error);
  }
};

const getHourly = async (req, res, next) => {
  let url = process.env.URL_HOURLY;
  const searchQuery = req.query.q;
  url = url.replace("turkey", searchQuery);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    const dataModel = new HourlyModel(data);
    res.json(dataModel);
  } catch (error) {
    next(error);
  }
};

export default { getDaily, getHourly };
