/**
	Author:BulletYuan
	UpdateTime:2018.09.14
	Version:1.1.4
	
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
	bullet.zipImage({
		imgSrc:"",
		width:200,
		height:200,
		quality:0.7,
		fileType:"jpeg",
		done:(base64)=>{
			console.log(base64);
		}
	})
	bullet.toFileBlob(base64,0)
	new bullet.Gray2ColorImage({
		imageSrc:"",
		colorMap:"",
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
	if(Number(ts)<=9999999999)	ts=Number(ts)*1000;
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
	return this;
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
	return this;
}

let zipImage=function(obj){
	if(!obj||!obj.imgSrc)	return false;
	let img=new Image();
	img.src=obj.imgSrc;
	img.onload=()=>{
		let w=img.width,
			h=img.height,
			scale=w/h;
		obj.width=w>800?(w>1200?800:(w/2)):400;
		obj.height=w / scale;
		if(Number(obj.width)&&Number(obj.width)==Number(obj.width)){
			obj.height=w / scale;
		}
		if(Number(obj.height)&&Number(obj.height)==Number(obj.height)){
			scale=h/w;
			obj.width=h / scale;
		}
		if(!obj.quality || obj.quality > 1 || obj.quality <= 0)	obj.quality = 0.7;
		obj.fileType=obj.fileType||"jpeg"
		obj.done=obj.done||function(base64){};
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		// 创建属性节点
		let anw = document.createAttribute("width");
		anw.nodeValue = w;
		let anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh); 
		ctx.drawImage(img, 0, 0, w, h);
		let base64 = canvas.toDataURL('image/'+obj.fileType, obj.quality);
		obj.done(base64);
	};
	return this;
}

let toFileBlob=function(dataURI,type){
	if(dataURI){
		type=type||0;
		let arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
			  bstr = atob(arr[1]),fileExt = mime.split('/')[1], n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		if(type<=0){
			return new Blob([u8arr], {type:mime});
		}else{
			return new File([u8arr],"file_"+Date.parse(new Date())+fileExt,{type:mime});
		}
	}
	return this;
}

let Gray2ColorImage=(()=>{
	function A(opt){
		opt=opt||{}
		this.image=null;
		this.imageSrc=opt['imageSrc'];
		this.colorMap=opt['colorMap'];
		this.width=0;
		this.height=0;
		if(!this.imageSrc) throw new Error(`image or colorMap didn't inputted!`);

		this.init();
	};
	A.prototype.init=function(){                            //初始化图像
		let self=this;
		if(!self.imageSrc) throw new Error(`image or colorMap didn't inputted!`);
		self.image=new Image();
		self.image.src=self.imageSrc;
		self.image.onload=async ()=>{
			self.width=self.image.width;
			self.height=self.image.height;
			let can = await self.initImage(self.image);
			await self.drawImage(can.ctx,self.image);
			let imgData = await self.getImageData(can.ctx,self.image);
			let uint8 = await self.resetPixel(imgData.data);
			await self.updateImageData(can.ctx,uint8);
			document.body.appendChild(can.canvas);
		}
	};
	A.prototype.initImage=function(img){                      //初始化canvas画布
		if(!img) throw new Error(`something has wroung where initImage(img)!`);
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let anw = document.createAttribute("width");
		anw.nodeValue = img.width;
		let anh = document.createAttribute("height");
		anh.nodeValue = img.height;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		return {canvas,ctx};
	};
	A.prototype.drawImage=function(ctx,img){                  //绘制图像
		if(!ctx||!img) throw new Error(`something has wroung where drawImage(ctx,img)!`);
		ctx.drawImage(img, 0, 0, img.width, img.height);
	};
	A.prototype.getImageData=function(ctx,img){               //获取图像ImageData数据
		if(!ctx||!img) throw new Error(`something has wroung where getImageData(ctx,img)!`);
		return ctx.getImageData(0,0,img.width, img.height);
	};
	A.prototype.resetPixel=function(data){                    //重设像素rgb值
		if(!data) throw new Error(`something has wroung where getPixel(data)!`);
		let uint8=new Uint8ClampedArray(data);
		
		for(let i=0;i<uint8.length;i++){
			if(uint8[i]!==0 &&((i+1)%4 === 2 || (i+1)%4 === 3)){
				uint8[i]=0;
			}
		};
		return uint8;
	};
	A.prototype.updateImageData=function(ctx,px){             //根据图像像素的uint8数组生成ImageData，然后重绘图像
		let self=this;
		if(!ctx||!px) throw new Error(`something has wroung where updateImage(ctx,px)!`);
		ctx.clearRect(0,0, self.width, self.height);
		let imgData=new ImageData(px,self.width,self.height);
		ctx.putImageData(imgData,0,0);
	};
	return A;
})();


let bullet=(function(){
	return {
		timestamp,
		timestamp_10,
		timeFormat,
		
		urlParams,
		
		cookie,
		
		ajax,
		
		scrollPage,
		
		zipImage,
		toFileBlob,
		Gray2ColorImage,
	};
})();
window.bullet=bullet;