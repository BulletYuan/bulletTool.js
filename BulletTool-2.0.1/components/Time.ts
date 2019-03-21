export class Time {
  private DateObj: Date;

  constructor(date?: Date) {
    this.DateObj = this.initDate(date || new Date());
  }

  /**
   * 初始化时间，将传入的参数解构赋值给new Date()，并返回一个Date对象
   *
   * @private
   * @param {Date} date
   * @returns
   * @memberof Time
   */
  private initDate(date: Date) {
    this.DateObj = date;
    return this.DateObj;
  }
  /**
   * 格式化时间，传入时间字符串或Date对象和格式化字符串，并对其进行正则匹配，格式化默认为 yyyy-MM-dd hh:mm:ss
  //格式化字符  y：年份 ， M：月份 ， q：季度 ， d：日 ， h：小时 ， m：分钟 ， s：秒钟 ， S：毫秒
   *
   * @private
   * @param {Date} timeStr
   * @param {string} formatStr
   * @returns
   * @memberof Time
   */
  private formatDate(timeStr: Date, formatStr: string) {
    let format = {
      "y+": timeStr.getFullYear(), //年份 
      "q+": Math.floor((timeStr.getMonth() + 3) / 3), //季度 
      "M+": timeStr.getMonth() + 1, //月份 
      "d+": timeStr.getDate(), //日 
      "h+": timeStr.getHours(), //小时 
      "m+": timeStr.getMinutes(), //分 
      "s+": timeStr.getSeconds(), //秒 
      "S": timeStr.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(formatStr)) formatStr = formatStr.replace(RegExp.$1, (format['y+'] + "").substr(4 - RegExp.$1.length));
    for (var k in format)
      if (new RegExp("(" + k + ")").test(formatStr)) formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (format[k]) : (("00" + format[k]).substr(("" + format[k]).length)));
    return formatStr;
  }

  /**
   * 通过Date对象获取毫秒时间戳
   *
   * @param {Date} [date]
   * @returns
   * @memberof Time
   */
  timestamp(date?: Date) {
    if (date) return this.DateObj.getTime();
    else return this.initDate(date).getTime();
  }
  /**
   * 通过Date对象获取秒时间戳
   *
   * @param {Date} [date]
   * @returns
   * @memberof Time
   */
  timestamp_10(date?: Date) {
    if (date) return Math.floor(this.DateObj.getTime() / 1000);
    else return Math.floor(this.initDate(date).getTime() / 1000);
  }
  /**
   * 通过Date对象和格式化字符串对时间进行格式化
   *
   * @param {Date} [date]
   * @param {string} [format]
   * @returns
   * @memberof Time
   */
  timeFormat(date?: Date, format?: string) {
    let timeStr = this.DateObj,
      formatStr = "yyyy-MM-dd hh:mm:ss";
    if (date) {
      timeStr = date;
      formatStr = format;
    }
    return this.formatDate(timeStr, formatStr);
  }
}