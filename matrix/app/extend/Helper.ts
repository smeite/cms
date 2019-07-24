import * as dayjs from "dayjs";

/**
 * dayjs Service
 */
export default {
  year(datetime) {
    dayjs(datetime).year();
  },

  month(datetime) {
    dayjs(datetime).month();
  },

  date(datetime) {
    dayjs(datetime).date();
  },
  YYYYMMDD(datetime) {
    //  console.log("datetime", datetime, datetime.toString().split("T"));
    return datetime.split(" ")[0];
  }
};
