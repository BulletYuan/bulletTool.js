# bulletTool

> created at 2017.11.6
整理的一些前端经常用的功能。含有时间戳、URL参数、cookie操作、AJAX、scrollPage、图片压缩、base64转换file/blob对象、灰度图转彩色、Dom对象操作。持续更新....

******

## lastest - 2019.3.17 - bulletTool-1.2.2

    对项目进行更新，修复Dom、Url组件的BUG，并且将HttpRequest组件改成了Promise的方式进行状态返回。

    并使用mocha和chai组件编写组件的测试方案。

 > 使用：

 > 说明：

 > 参考：
    
*   [正则表达式学习](http://www.runoob.com/regexp/regexp-syntax.html "正则表达式 - 语法 - 菜鸟教程")


## release-1.2.1 - 2018.9.23 - bulletTool-1.2.1

  对项目进行重构，使用webpack构建和管理项目，将各功能插件化，主入口js统一调用。使用方法有些发生变化。

  新增功能：dom结构与json序列化相互转换，Dom类。

 > 使用：

    ```javascript
    const time = new bullet.Time('2018-4-30');
    time.timestamp(); //获取十三位时间戳，精确到毫秒
    time.timestamp_10();  //获取十位时间戳，精确到秒
    time.timeFormat(timestamp?,'yyyy mm dd HH:MM:SS'); //将时间戳转化为格式化字符串，y:年;m:月;d:日;H:时;M:分;S:秒;

    const url = new bullet.Url();
    url.getParams("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=25017023_10_pg");  //将URL地址转换为对象
    url.toUrl({
        k:"value1",
        k2:"value2",
        // ... more params
    }); //将对象参数转换为URL参数，不含'?'

    const cookie = new bullet.Cookie();
    cookie.getCookies(); //获取当前页面的所有cookie，以对象形式返回
    cookie.getCookie('key'); //获取当前页面的键名为'key'的cookie，返回值内容
    cookie.setCookie('key','value',exdays);  //为当前页面添加键值分别为'key','value'的cookie条目，并设置有效时间为exdays（数字），返回新的页面cookie对象形式
    cookie.deleteCookie('key');  //删除当前页面的键名为'key'的cookie，返回新的页面cookie对象形式

    const request = new bullet.HttpRequest({
        type:'GET',                                                                     //请求类型：GET,POST,PUT,DELETE
        url:'https://github.com/BulletYuan/',                                           //请求地址
        dataType:'JSON',                                                                //返回值类型：JSON,XML
        data:{a:'a1'},                                                                  //请求数据，对象形式
        header:{'Content-Type':'application/json;charset=UTF-8'},                       //请求header自定义，对象形式
    }); // 返回Promise
    request
        .then(res=>{console.log(res)})      // 请求成功
        .catch(err=>{console.err(err)});    // 发生异常

    const scroll = new bullet.ScrollPage();
    scroll({
        el:document.getElementsByTagName('body').item(0),     //需要监听下滑或上拉事件的元素不传该值，则默认为监听"body"
        scorllUp:function(e){},                               //页面上拉加载更多事件
        scorllDown:function(e){},                 //页面下滑刷新数据事件
        scorlling:function(e){}                   //页面下滑过程事件
    });

    const image = new bullet.ImageTool();
    image.zipImage({											//图片压缩
        imgSrc:"",												//图片地址或base64码（必填参数）
        width:200,												//图片压缩宽度，优先高度，按照宽高比缩放高度
        height:200,												//图片压缩高度，按照高宽比缩放宽度
        quality:0.7,											//图片压缩质量，0-1数字，默认为0.7
        fileType:"jpeg",										//图片文件类型，默认为jpeg
        done:(base64)=>{										//压缩成功回调方法，传入压缩图片base64码
            console.log(base64);
        }
    });
    image.toFileBlob(base64,0)     //base64码转换成file对象或blob对象，方便上传 0 转换为blob对象		1 转换为file对象
    image.Gray2ColorImage({          //灰度图转彩色
        imageSrc:"",                        //图像资源url
        colorMap:"",                        //灰度图对应彩色的色标图
    });

    const dom = new bullet.Dom();
    dom.toJson(document.querySelector('body'))  // 将dom对象转换成object
        .then(json=>{
            console.log(json);
        })
        .catch(err=>{
            console.err(err);
        });
    dom.toHtml(json)                    // 通过object转译为html代码
        .then(html=>{
            console.log(html);
        })
        .catch(err=>{
            console.err(err);
        });
    dom.createDom(json,parentDom)       // 通过object创建新的Dom对象
        .then(()=>{
            // finished JsonToDom
        })
        .then(()=>{
            // finished parentDom append Dom
        })
        .catch(err=>{
            console.err(err);
        });
    ```

 > 说明:

    

  > 参考:

  *   [js时间格式化正则表达](https://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html "javascript Date format(js日期格式化)")

******

## pro-release - 2018.9.14 - bulletTool-1.1.4

 > 使用:
   
    ```
    timestamp() //获取十三位时间戳，精确到毫秒
    timestamp_10()  //获取十位时间戳，精确到秒
    timeFormat({ts:timestamp,format:'yyyy mm dd HH:MM:SS'}) //将时间戳转化为格式化字符串，y:年;m:月;d:日;H:时;M:分;S:秒;
    ```

    ```
    url.getParams({url:'https://github.com/BulletYuan/?a=a1'})  //将URL参数（若没有则获取当前页面的网址）后的search部分，转换为对象
    url.toUrl({a:a1})   //将对象参数（若没有则获取上一次网址转化为对象的结果）转换为URL参数，不含'?'
    ```

    ```
    cookie.getCookies() //获取当前页面的所有cookie，以对象形式返回
    cookie.getCookie('key') //获取当前页面的键名为'key'的cookie，返回值内容
    cookie.setCookie('key','value',exdays)  //为当前页面添加键值分别为'key','value'的cookie条目，并设置有效时间为exdays（数字），返回新的页面cookie对象形式
    cookie.deleteCookie('key')  //删除当前页面的键名为'key'的cookie，返回新的页面cookie对象形式
    ```

    ```
    ajax({
        type:'GET',                                                                     //请求类型：GET,POST,PUT,DELETE
        url:'https://github.com/BulletYuan/',                                           //请求地址
        dataType:'JSON',                                                                //返回值类型：JSON,XML
        async:true,                                                                     //请求异步标识：true,false
        data:{a:'a1'},                                                                  //请求数据，对象形式
        header:{Content-Type:'application/json;charset=UTF-8'},                         //请求header自定义，对象形式
        success:(res,status,readyState)=>{ console.log(res,status,readyState) },        //请求成功回调函数，res:返回内容;
                                                                                        //status:(200: "OK"
                                                                                        //404: 未找到页面
                                                                                        //500：服务器内部错误
                                                                                        //(其余对应服务器状态码));
                                                                                        //readyState:(0: 请求未初始化
                                                                                        //1: 服务器连接已建立
                                                                                        //2: 请求已接收
                                                                                        //3: 请求处理中
                                                                                        //4: 请求已完成，且响应已就绪);
        error:(status,readyState)=>{ console.log(status,readyState) }                   //请求失败回调函数，
                                                                                        //status:(200: "OK"
                                                                                        //404: 未找到页面
                                                                                        //500：服务器内部错误
                                                                                        //(其余对应服务器状态码));
                                                                                        //readyState:(0: 请求未初始化
                                                                                        //1: 服务器连接已建立
                                                                                        //2: 请求已接收
                                                                                        //3: 请求处理中
                                                                                        //4: 请求已完成，且响应已就绪);
    })
    ```

    ```
    scrollPage({
        el:document.getElementsByTagName('body').item(0),		  //需要监听下滑或上拉事件的元素不传该值，则默认为监听"body"
        scorllUp:function(e){},						  //页面上拉加载更多事件
        scorllDown:function(e){},					  //页面下滑刷新数据事件
        scorlling:function(e){}						  //页面下滑过程事件
    })
    ```

    ```
    bullet.zipImage({											//图片压缩
        imgSrc:"",												//图片地址或base64码（必填参数）
        width:200,												//图片压缩宽度，优先高度，按照宽高比缩放高度
        height:200,												//图片压缩高度，按照高宽比缩放宽度
        quality:0.7,											//图片压缩质量，0-1数字，默认为0.7
        fileType:"jpeg",										//图片文件类型，默认为jpeg
        done:(base64)=>{										//压缩成功回调方法，传入压缩图片base64码
            console.log(base64);
        }
    })
    ```

    ```
    bullet.toFileBlob(base64,0)     //base64码转换成file对象或blob对象，方便上传 0 转换为blob对象		1 转换为file对象
    ```

    ```
    new bullet.Gray2ColorImage({          //灰度图转彩色
        imageSrc:"",                        //图像资源url
        colorMap:"",                        //灰度图对应彩色的色标图
    })
    ```

  > 参考:

  *   [js实现ajax](https://juejin.im/entry/589921640ce46300560ef894 "原生 JavaScript 实现 AJAX、JSONP")

