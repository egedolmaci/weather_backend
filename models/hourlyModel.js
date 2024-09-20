class HourlyModel {
  constructor(data) {
    this.address = data.address;
    this.timezone = data.timezone;
    this.datetime = data.days[0].datetime;
    this.hours = data.days[0].hours.map((hour) => ({
      datetime: hour.datetime,
      temp: hour.temp,
      conditions: hour.conditions,
    }));
  }
}

export default HourlyModel;
