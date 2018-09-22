/**
 * Name:            HttpRequest.js
 * Desc:            基于xmlhttprequest技术的http请求，默认是get方式
 * Author:          BulletYuan
 * Create-Time:     2018.09.22
 * Last-Time:       
 */
const
BulletTool_HttpRequest = (function(){
	//将传入的对象参数转化为url格式字符串
	function obj2url(obj){
		if(!obj) return "";
		return JSON.stringify(obj).substr(1,JSON.stringify(obj).length-2).replace(/:/g,'=').replace(/,/g,'&').replace(/\"|\'/g,'');
	}
	//匹配当前xmlhttp返回内容的类型，并对应输出内容，默认为text
	function typeTrans(type,xmlhttp){
		type=type.toUpperCase()||"TEXT";
		switch(type){
			case "TEXT": typeText(xmlhttp); break;
			case "JSON": typeJson(xmlhttp); break;
			case "XML": typeXml(xmlhttp); break;
			case "BLOB": typeBlob(xmlhttp); break;
			case "ARRAYBUFFER": typeArraybuffer(xmlhttp); break;

			default: typeText(xmlhttp); break;
		}
	}
	function typeText(xmlhttp){
		return xmlhttp.responseText;
	}
	function typeJson(xmlhttp){
		return JSON.parse(xmlhttp.responseText);
	}
	function typeXml(xmlhttp){
		return xmlhttp.responseXML;
	}
	function typeBlob(xmlhttp){
		if(xmlhttp.responseText.indexOf('[')===0&&xmlhttp.responseText.indexOf(']')===xmlhttp.responseText.length-1) return new Blob(xmlhttp.responseText, {type : 'text/plain'});
		else return new Blob([xmlhttp.responseText], {type : 'text/plain'});
	}
	function typeArraybuffer(xmlhttp){
		return new ArrayBuffer(xmlhttp.responseText.length);
	}

	function A(opts){
		opts=opts||{};
		if(opts.url&&typeof opts.url === 'string'){
			let xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
			if(window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
			
			let type=opts.type.toString().toUpperCase()||'GET';
			let url=opts.url;
			let dataType=opts.dataType?opts.dataType.toString().toUpperCase():'JSON';
			let async=opts.async||true;
			let data=opts.data||{};
			let header=opts.header||{};
			let success=opts.success||function(){};
			let error=opts.error||function(){};
			
			if(async){
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState===4&&xmlhttp.status===200){
						success(typeTrans(dataType,xmlhttp),xmlhttp.status,xmlhttp.readyState);
					}else{
						error(xmlhttp.status,xmlhttp.readyState);
					}
				}
			}
			xmlhttp.open(type,(type==='GET'?url+"?"+obj2url(data)+"&_RandomMark="+Math.random():url),async);
			if(JSON.stringify(header).indexOf(':')>=0){
				let h=JSON.stringify(header).substr(1,JSON.stringify(header).length-2)
				for(let a of h.split(',')){
					xmlhttp.setRequestHeader(a.split(':')[0].replace(/\"|\'/g,''),a.split(':')[1].replace(/\"|\'/g,''))
				}
			}
			type==='POST'?xmlhttp.send(obj2url(data)):xmlhttp.send();
			if(!async){
				if(xmlhttp.readyState===4&&xmlhttp.status===200){
					success(typeTrans(dataType,xmlhttp),xmlhttp.status,xmlhttp.readyState);
				}else{
					error(xmlhttp.status,xmlhttp.readyState);
				}
			}
		}else throw new Error("没有请求地址！");
	}
	
	return A;
})();

module.exports = BulletTool_HttpRequest;