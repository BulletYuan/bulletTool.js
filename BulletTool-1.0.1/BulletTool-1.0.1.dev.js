
let timestamp=()={
	return new Date().getTime();
};

let timestamp_10=()={
	return Number(timestamp())/1000;
};

let format=(opts)=>{
	let ts=opts.timestamp||timestamp();
	let format=opts.format||"yyyy-mm-dd HH:MM:SS";
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

let url={
	params:{},
	getParams:(opts)=>{
		let a=opts.url||window.location.search.split('?')[1].toString().replace(/=/g,':').replace(/&/g,',').toString()
		let b="";
		for(let c of a.split(',')){
		  b+="\""+c.split(':')[0]+"\":\""+c.split(':')[1]+"\","
		}
		let o=JSON.parse('{'+b.substr(0,b.length-1)+'}')
		return o;
	},
	toUrl:(opts)=>{
		let a=opts||JSON.stringify(params).replace(/{/g,'').replace(/}/g,'').replace(/:/g,'=').replace(/,/g,'&');
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
		let cstr=document.cookie.replace(/=/g,':').replace(/;/g,',').toString();
		let b="";
		for(let c of cstr.split(',')){
		  b+="\""+c.split(':')[0].trim()+"\":\""+c.split(':')[1].trim()+"\",";
		}
		cookie.cookies=JSON.parse('{'+b.substr(0,b.length-1)+'}')
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
		const xmlhttp;
		if(window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		
		let type=opts.type.toUpperString()||'GET';
		let url=opts.url||'';
		let dataType=opts.dataType.toUpperString()||'JSON';
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
		if(header){
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


(function(){
	
})();