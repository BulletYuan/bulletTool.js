/**
 * Name:            Url.js
 * Desc:            url路径操作类，对url的get参数进行json序列化与字符串转换
 * Author:          BulletYuan
 * Create-Time:     2018.09.22
 * Last-Time:       
 */
const
BulletTool_Url = (function(){
    function A(){
        this.Params={};
    }
    A.prototype.getParams = function(path){
			if((path?path:window.location.search).indexOf('?')>=0){
				let a=(path?path:window.location.search).split('?')[1].toString().replace(/=/g,':').replace(/&/g,',').toString();
				let b="";
				for(let c of a.split(',')){
					b+="\""+c.split(':')[0]+"\":\""+c.split(':')[1]+"\",";
				}
				this.Params=JSON.parse('{'+b.substr(0,b.length-1)+'}');
				return this.Params;
			}else return {};
    };
    A.prototype.toUrl = function(obj){
			let a=(obj||JSON.stringify(this.Params)).replace(/{/g,'').replace(/}/g,'').replace(/:/g,'=').replace(/,/g,'&').replace(/\"|\'/g,'');
			return a;
    }
    
    return A;
})();

module.exports = BulletTool_Url;