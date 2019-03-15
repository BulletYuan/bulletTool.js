/**
 * Name:            Time.js
 * Desc:            时间操作类，实例化一个Date类，并对此进行操作
 * Author:          BulletYuan
 * Create-Time:     2018.09.21
 * Last-Time:       
 */
const
BulletTool_Date = (function(){
    //初始化时间，将传入的参数解构赋值给new Date()，并返回一个Date对象
    function initDate(...args){
        let DateObj = null;
        if(args&&args.length > 0) DateObj = new Date(...args);
        else DateObj = new Date();
        return DateObj;
    };
    //格式化时间，传入时间字符串或Date对象和格式化字符串，并对其进行正则匹配，格式化默认为 yyyy-MM-dd hh:mm:ss
    //格式化字符  y：年份 ， M：月份 ， q：季度 ， d：日 ， h：小时 ， m：分钟 ， s：秒钟 ， S：毫秒
    function formatDate(timeStr,formatStr){
        let format={
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

    function A(...args){
        this.DateObj = initDate(...args);
    }
    A.prototype.timestamp = function(...args){
        if(args&&args.length>0) return initDate(...args).getTime();
        return this.DateObj.getTime();
    };
    A.prototype.timestamp_10 = function(...args){
        if(args&&args.length>0) return Math.floor(initDate(...args).getTime()/1000);
        return Math.floor(this.DateObj.getTime()/1000);
    };
    A.prototype.timeFormat = function(...args){
        let timeStr=this.DateObj,
        formatStr="yyyy-MM-dd hh:mm:ss";
        if(args&&args.length>0){
            if(args.length === 1){
                if(args[0].indexOf("-")>0||args[0].indexOf(":")>0){
                    formatStr=args[0];
                }else{
                    timeStr=initDate(args[0]);
                }
            }else{
                timeStr=initDate(args[0]);
                formatStr=args[1];
            }

            return formatDate(timeStr,formatStr);
        }else{
            return formatDate(timeStr,formatStr);
        }
    };

    return A;
})();

module.exports = BulletTool_Date;