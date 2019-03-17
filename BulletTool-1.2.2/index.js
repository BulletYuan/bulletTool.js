/**
	Author:BulletYuan
	UpdateTime:2019.03.15
	Version:1.2.2
	
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
import Time from './components/Time';
import Url from './components/Url';
import Cookie from './components/Cookie';
import HttpRequest from './components/HttpRequest';
import ScrollPage from './components/ScrollPage';
import ImageTool from './components/Image';
import Dom from './components/Dom';

let bullet=(function(){
	return {
		Time,
		Url,
		Cookie,
		HttpRequest,
		ScrollPage,
		ImageTool,
		Dom,
	};
})();
window.bullet=bullet;