/**
	Author:BulletYuan
	UpdateTime:2017.11.26
	Version:1.1.1
	
	用法：
	在页面上使用bullet或window.bullet即可调用相关的方法。示例如下：
	
	bullet.timestamp()
	bullet.timestamp_10()
	bullet.timeFormat({ts:timestamp,format:'yyyy mm dd HH:MM:SS'})
	bullet.getParams({url:'https://github.com/BulletYuan/?a=a1'})
	bullet.toUrl({a:a1})
	bullet.cookie.getCookies()
	bullet.cookie.getCookie('key')
	bullet.cookie.setCookie('key','value',exdays)
	bullet.cookie.deleteCookie('key')
	bullet.ajax({
	  type:'GET',
	  url:'https://github.com/BulletYuan/',
	  dataType:'JSON',
	  async:true,
	  data:{a:'a1'},
	  header:{Content-Type:'application/json;charset=UTF-8'},
	  success:(res,status,readyState)=>{ console.log(res,status,readyState) },
	  error:(status,readyState)=>{ console.log(status,readyState) }
	})
	bullet.scrollPage({
		el:document.getElementsByTagName('body').item(0),
		scorllUp:function(e){},
		scorllDown:function(e){},
		scorlling:function(e){}
	})
	
**/
'use strict';
let timestamp=()=>{
	return new Date().getTime();
};

let timestamp_10=()=>{
	return Math.floor(Number(timestamp())/1000);
};

let timeFormat=function(){
	let ts=arguments[0]?arguments[0].timestamp:timestamp();
	let format=arguments[0]?arguments[0].format:"yyyy-mm-dd HH:MM:SS";
	let now=new Date(Number(ts));
	let year=now.getFullYear();
	let month=(format.indexOf('mm')>=0&&(now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1));
	let date=(format.indexOf('dd')>=0&&now.getDate()<10?"0"+now.getDate():now.getDate());
	let hour=(format.indexOf('HH')>=0&&now.getHours()<10?"0"+now.getHours():now.getHours());
	let minute=(format.indexOf('MM')>=0&&now.getMinutes()<10?"0"+now.getMinutes():now.getMinutes());
	let second=(format.indexOf('SS')>=0&&now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds());
	if(format.indexOf("yyyy")>=0)  format=format.replace("yyyy",year);
	if(format.indexOf("mm")>=0)  format=format.replace("mm",month); else  format=format.replace("m",month);
	if(format.indexOf("dd")>=0)  format=format.replace("dd",date); else  format=format.replace("d",date);
	if(format.indexOf("HH")>=0)  format=format.replace("HH",hour); else  format=format.replace("H",hour);
	if(format.indexOf("MM")>=0)  format=format.replace("MM",minute); else  format=format.replace("M",minute);
	if(format.indexOf("SS")>=0)  format=format.replace("SS",second); else  format=format.replace("S",second);
	return format;
};

let urlParams={
	params:{},
	getParams:function(){
		if((arguments[0]?arguments[0].url:window.location.search).indexOf('?')>=0){
			let a=(arguments[0]?arguments[0].url:window.location.search).split('?')[1].toString().replace(/=/g,':').replace(/&/g,',').toString();
			let b="";
			for(let c of a.split(',')){
			  b+="\""+c.split(':')[0]+"\":\""+c.split(':')[1]+"\",";
			}
			this.params=JSON.parse('{'+b.substr(0,b.length-1)+'}');
			return this.params;
		}else return {};
	},
	toUrl:function(){
		let a=(arguments[0]||JSON.stringify(this.params)).replace(/{/g,'').replace(/}/g,'').replace(/:/g,'=').replace(/,/g,'&').replace(/\"|\'/g,'');
		return a;
	}
}

let cookie={
	cookies:{},
	toCookieString:function(){		
		let c=cookie.cookies||cookie.getCookies();
		c=JSON.stringify(c).replace(/:/g,'=').replace(/,/g,';')
		c=c.substring(1,c.length-1).toString();
		let b="";
		for(let a of c.split(';')){
			b+=a.substring(1,a.indexOf('=')-1)+"="+a.substring(a.indexOf('=')+2,a.length-1)+";";
		}
		b=b.substr(0,b.length-1);
		return b;
	},
	getCookies:function(){
		let cstr=document.cookie.replace(/=/g,'@@@@').replace(/;/g,'~~~~').toString();
		let b="";
		for(let c of cstr.split('~~~~')){
			if(c&&c.indexOf('@@@@')>=0) b+="\""+c.split('@@@@')[0].trim()+"\":\""+c.split('@@@@')[1].trim()+"\",";
		}
		cookie.cookies=JSON.parse('{'+b.substr(0,b.length-1).replace(/@@@@/g,':').replace(/~~~~/g,',')+'}')
		return cookie.cookies;
	},
	getCookie:function(name){
		let c=cookie.cookies||cookie.getCookies();
		return c[name];
	},
	setCookie:function(k,v,exdays){
		let d = new Date();  
		d.setTime(d.getTime() + ((exdays||1)*24*60*60*1000));  
		let expires = "expires="+d.toUTCString();
		document.cookie=k+'='+escape(v)+';'+expires;
		let c=cookie.getCookies();
		return c;
	},
	deleteCookie:function(name){
		return cookie.setCookie(name,'',-1);
	}
}

let ajax=function(opts){
	opts=opts||{};
	if(opts.url){
		let xmlhttp;
		if(window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		
		let type=opts.type.toString().toUpperCase()||'GET';
		let url=opts.url||'';
		let dataType=opts.dataType?opts.dataType.toString().toUpperCase():'JSON';
		let async=opts.async||true;
		let data=opts.data||{};
		let header=opts.header||{};
		let success=opts.success||function(){};
		let error=opts.error||function(){};
		
		if(async){
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState===4&&xmlhttp.status===200){
					success((dataType==='JSON'?JSON.parse(xml.responseText):(dataType==='XML'?xmlhttp.responseXML:xmlhttp.responseText)),xmlhttp.status,xmlhttp.readyState);
				}else{
					error(xmlhttp.status,xmlhttp.readyState);
				}
			}
		}
		xmlhttp.open(type,(type==='GET'?url+"?"+ajax_obj2url(data)+"&_RandomMark="+Math.random():url),async);
		if(JSON.stringify(header).indexOf(':')>=0){
			let h=JSON.stringify(header).substr(1,JSON.stringify(header).length-2)
			for(let a of h.split(',')){
				xmlhttp.setRequestHeader(a.split(':')[0].replace(/\"|\'/g,''),a.split(':')[1].replace(/\"|\'/g,''))
			}
		}
		type==='POST'?xmlhttp.send(ajax_obj2url(data)):xmlhttp.send();
		if(!async){
			if(xmlhttp.readyState===4&&xmlhttp.status===200){
				success((dataType==='JSON'?JSON.parse(xml.responseText):(dataType==='XML'?xmlhttp.responseXML:xmlhttp.responseText)),xmlhttp.status,xmlhttp.readyState);
			}else{
				error(xmlhttp.status,xmlhttp.readyState);
			}
		}
	}
}
let ajax_obj2url=function(obj){
	if(obj) return JSON.stringify(obj).substr(1,JSON.stringify(obj).length-2).replace(/:/g,'=').replace(/,/g,'&').replace(/\"|\'/g,'');
	else return "";
}

let scrollPage=function(){
	let dom,scorllUpFunc,scrollDownFunc;
	dom=document.getElementsByTagName('body').item(0);
	scorllUpFunc=function(){ console.log('bottom of scroll-up for load') }
	scrollDownFunc=function(){ console.log('top of scorll-down for refresh') }
	scrollingFunc=function(){ console.log('scrolling the page') }
	
	if(arguments[0] && typeof arguments[0] === 'object' && typeof arguments[0].el === 'object')
		dom = arguments[0].el;
	if(arguments[0] && arguments[0].scorllUp && typeof arguments[0].scorllUp === 'function')
		scorllUpFunc=arguments[0].scorllUp;
	if(arguments[0] && arguments[0].scrollDown && typeof arguments[0].scrollDown === 'function')
		scrollDownFunc=arguments[0].scrollDown;
	if(arguments[0] && arguments[0].scrolling && typeof arguments[0].scrolling === 'function')
		scrollingFunc=arguments[0].scrolling;
		
	dom.onscroll=function(event){
		let e=event||window.event;
		if(dom.scrollHeight-dom.clientHeight===dom.scrollTop){
			scorllUpFunc(e);
		}
		else if(dom.scrollTop===0){
			scrollDownFunc(e);
		}
		else{
			scrollingFunc(e);
		}
	}
}


let bullet=(function(){
	return {
		timestamp,
		timestamp_10,
		timeFormat,
		
		urlParams,
		
		cookie,
		
		ajax,
		
		scrollPage
	};
})();
window.bullet=bullet;