class DailyModel {
  constructor(data) {
    this.address = data.address;
    this.timezone = data.timezone;
    this.days = data.days.map((day) => ({
      datetime: day.datetime,
      temp: day.temp,
      conditions: day.conditions,
      description: day.description,
    }));
  }
}

export default DailyModel;
