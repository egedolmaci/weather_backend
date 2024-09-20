import DailyModel from "../models/dailyModel.js";
import HourlyModel from "../models/hourlyModel.js";
import "dotenv/config";

const getDaily = async (req, res, next) => {
  const url = process.env.URL_DAILY;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    const dataModel = new DailyModel(data);
    res.json(dataModel);
  } catch (error) {
    next(error);
  }
};

const getHourly = async (req, res, next) => {
  const url = process.env.URL_HOURLY;
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
