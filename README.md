# bulletTool

> created at 2017.11.6

整理的一些前端经常用的功能。含有时间戳、URL参数、cookie操作、AJAX、scrollPage、图片压缩、base64转换file/blob对象、灰度图转彩色、Dom对象操作。持续更新....

******

## latest - 2019.8.2 - bulletTool-3.0.1

    对项目进行重构, 对npm项目更为合理. HTTPRequest支持node终端请求, Time增加了时间值格式化.

    使用单独的test.js进行测试. `npm test` 即可进行测试.

> 使用:

* 引入

``` javascript
const Bullet = require('bullettool')

// import Bullet from 'bullettool'
```

* Cookie

``` typescript
declare class Cookie {
    public toCookieString(): string;    // 获取当前页面cookie字符串
    public getCookies(): any;   // 获取当前页面cookie并转化为对象
    public getCookie(name: string): string | any;   // 获取指定键名的cookie值
    public setCookie(key: string, value: any, exdays?: number): any; // 设置新的cookie键名及值
    public deleteCookie(name: string): boolean | any;   // 删除指定键名的cookie值
}
```

* Dom

``` typescript
interface BulletDOMAttribute {
    name: string,   // Dom属性名称
    value: string | boolean | number | object | function | any, // Dom属性值
}

interface BulletDOMObject {
    tagName?: string,   // html标签
    attr?: BulletDOMAttribute[],    // html标签属性
    html?: string,  // html标签文字内容
    children?: BulletDOMObject[],   // 子html标签
}

declare class Dom {
    public async toJson(el: HTMLElement | any): BulletDOMObject;    // 将对应html元素转换为对象
    public async toHtml(obj: BulletDOMObject | any): HTMLElement;   // 将对应对象转换为html元素
    public async createDom(obj: BulletDOMObject | any, el?: HTMLElement): void; // 创建DOM元素
}
```

* HttpRequest

``` typescript
interface HttpRequestOptions {
    url?: string,   // 请求地址
    type?: string,  // 请求类型[get|post|put|delete]
    dataType?: string,  // 数据类型[json|text|blob|arraybuffer]
    data?: object,  // 请求数据
    headers?: object,   // 请求头
    protocol?: string,  // 请求协议[http|https]
    hostname?: string,  // 请求主机地址
    port?: number,  // 请求主机端口
    path?: string,  // 请求文件路径
    method?: string,    // 请求方式[get|post|put|delete]
}

declare class HttpRequest {
    public request(opts: HttpRequestOptions): Promise<string | Blob | ArrayBuffer | object | any>;  // 请求指定主机 并返回promise结果
}
```

* Time

``` typescript
declare class DateUtil {
    timestamp(...dateArgs?: []): number;    // 获取当前或者指定date时间戳(毫秒)
    timestamp10(...dateArgs?: []): number;  // 获取当前或者指定date时间戳(秒)
    dateFormat(...dateArgs?: [], format?: string): string;  // 转换当前或指定date时间为指定格式化字符串
    timeFormat(timestamp?: number): string;     // 转化指定毫秒或秒时间值为格式化字符串
}
```

* Image

``` typescript
interface ImageZipOptions {
    imgSrc: string,     // 图片地址或base64地址
    width?: number,     // 指定压缩宽度
    height?: number,    // 指定压缩高度
    quality?: number,   // 指定压缩等级[0-1]
    fileType?: string,  // 指定文件格式[jpeg|png|bmp]
    done?: (base64: string) => {},  // 事件完成回调函数
}
interface ImageGrayOptions {
    imgSrc: string,     // 图片地址或base64地址
    done?: (base64: string) => {},  // 事件完成回调函数
}

declare class Image {
    zipImage(opt: ImageZipOptions): void;   // 压缩图片
    toFileBlob(dataURI: string, type?: number): File | Blob;   // 转化图片为blob格式或者file格式
    Gray2ColorImage(opt: ImageGrayOptions): void;   // 转化图片为灰色
}
```

* Url

``` typescript
declare class UrlUtil {
    getParams(path?: string): any;  // 获取传入地址的queryParams
    toUrl(KVobject?: any): string;  // 将key-value对象转化成地址
}
```

* ScrollPage

``` typescript
interface ScrollPageOptions {
    el: HTMLElement | any,  // 传入的html元素
    scrollUp?: Function,    // 上滑事件回调
    scrollDown?: Function,  // 下滑事件回调
    scrolling?: Function,   // 滑动过程回调
}

declare class ScrollPage {
    constructor(opts: ScrollPageOptions);
}
```

> 说明:

> 参考:

## release-1.2.2 - 2019.3.17 - bulletTool-1.2.2

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

    

``` javascript
    const time = new bullet.Time('2018-4-30');
    time.timestamp(); //获取十三位时间戳，精确到毫秒
    time.timestamp_10(); //获取十位时间戳，精确到秒
    time.timeFormat(timestamp, 'yyyy mm dd HH:MM:SS'); //将时间戳转化为格式化字符串，y:年;m:月;d:日;H:时;M:分;S:秒;

    const url = new bullet.Url();
    url.getParams("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=25017023_10_pg"); //将URL地址转换为对象
    url.toUrl({
        k: "value1",
        k2: "value2",
        // ... more params
    }); //将对象参数转换为URL参数，不含'?'

    const cookie = new bullet.Cookie();
    cookie.getCookies(); //获取当前页面的所有cookie，以对象形式返回
    cookie.getCookie('key'); //获取当前页面的键名为'key'的cookie，返回值内容
    cookie.setCookie('key', 'value', exdays); //为当前页面添加键值分别为'key','value'的cookie条目，并设置有效时间为exdays（数字），返回新的页面cookie对象形式
    cookie.deleteCookie('key'); //删除当前页面的键名为'key'的cookie，返回新的页面cookie对象形式

    const request = new bullet.HttpRequest({
        type: 'GET', //请求类型：GET,POST,PUT,DELETE
        url: 'https://github.com/BulletYuan/', //请求地址
        dataType: 'JSON', //返回值类型：JSON,XML
        data: {
            a: 'a1'
        }, //请求数据，对象形式
        header: {
            'Content-Type': 'application/json;charset=UTF-8'
        }, //请求header自定义，对象形式
    }); // 返回Promise
    request
        .then(res => {
            console.log(res)
        }) // 请求成功
        .catch(err => {
            console.err(err)
        }); // 发生异常

    const scroll = new bullet.ScrollPage();
    scroll({
        el: document.getElementsByTagName('body').item(0), //需要监听下滑或上拉事件的元素不传该值，则默认为监听"body"
        scorllUp: function(e) {}, //页面上拉加载更多事件
        scorllDown: function(e) {}, //页面下滑刷新数据事件
        scorlling: function(e) {} //页面下滑过程事件
    });

    const image = new bullet.ImageTool();
    image.zipImage({ //图片压缩
        imgSrc: "", //图片地址或base64码（必填参数）
        width: 200, //图片压缩宽度，优先高度，按照宽高比缩放高度
        height: 200, //图片压缩高度，按照高宽比缩放宽度
        quality: 0.7, //图片压缩质量，0-1数字，默认为0.7
        fileType: "jpeg", //图片文件类型，默认为jpeg
        done: (base64) => { //压缩成功回调方法，传入压缩图片base64码
            console.log(base64);
        }
    });
    image.toFileBlob(base64, 0) //base64码转换成file对象或blob对象，方便上传 0 转换为blob对象		1 转换为file对象
    image.Gray2ColorImage({ //灰度图转彩色
        imageSrc: "", //图像资源url
        colorMap: "", //灰度图对应彩色的色标图
    });

    const dom = new bullet.Dom();
    dom.toJson(document.querySelector('body')) // 将dom对象转换成object
        .then(json => {
            console.log(json);
        })
        .catch(err => {
            console.err(err);
        });
    dom.toHtml(json) // 通过object转译为html代码
        .then(html => {
            console.log(html);
        })
        .catch(err => {
            console.err(err);
        });
    dom.createDom(json, parentDom) // 通过object创建新的Dom对象
        .then(() => {
            // finished JsonToDom
        })
        .then(() => {
            // finished parentDom append Dom
        })
        .catch(err => {
            console.err(err);
        });
```

 > 说明:

    

  > 参考:

  +   [js时间格式化正则表达](https://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html "javascript Date format(js日期格式化)")

******

## pro-release - 2018.9.14 - bulletTool-1.1.4

 > 使用:
   
    

``` 
    timestamp() //获取十三位时间戳，精确到毫秒
    timestamp_10() //获取十位时间戳，精确到秒
    timeFormat({
        ts: timestamp,
        format: 'yyyy mm dd HH:MM:SS'
    }) //将时间戳转化为格式化字符串，y:年;m:月;d:日;H:时;M:分;S:秒;
```

    

``` 
    url.getParams({
        url: 'https://github.com/BulletYuan/?a=a1'
    }) //将URL参数（若没有则获取当前页面的网址）后的search部分，转换为对象
    url.toUrl({
        a: a1
    }) //将对象参数（若没有则获取上一次网址转化为对象的结果）转换为URL参数，不含'?'
```

    

``` 
    cookie.getCookies() //获取当前页面的所有cookie，以对象形式返回
    cookie.getCookie('key') //获取当前页面的键名为'key'的cookie，返回值内容
    cookie.setCookie('key', 'value', exdays) //为当前页面添加键值分别为'key','value'的cookie条目，并设置有效时间为exdays（数字），返回新的页面cookie对象形式
    cookie.deleteCookie('key') //删除当前页面的键名为'key'的cookie，返回新的页面cookie对象形式
```

    

``` 
    ajax({
        type: 'GET', //请求类型：GET,POST,PUT,DELETE
        url: 'https://github.com/BulletYuan/', //请求地址
        dataType: 'JSON', //返回值类型：JSON,XML
        async: true, //请求异步标识：true,false
        data: {
            a: 'a1'
        }, //请求数据，对象形式
        header: {
            Content - Type: 'application/json;charset=UTF-8'
        }, //请求header自定义，对象形式
        success: (res, status, readyState) => {
            console.log(res, status, readyState)
        }, //请求成功回调函数，res:返回内容;
        //status:(200: "OK"
        //404: 未找到页面
        //500：服务器内部错误
        //(其余对应服务器状态码));
        //readyState:(0: 请求未初始化
        //1: 服务器连接已建立
        //2: 请求已接收
        //3: 请求处理中
        //4: 请求已完成，且响应已就绪);
        error: (status, readyState) => {
            console.log(status, readyState)
        } //请求失败回调函数，
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
        el: document.getElementsByTagName('body').item(0), //需要监听下滑或上拉事件的元素不传该值，则默认为监听"body"
        scorllUp: function(e) {}, //页面上拉加载更多事件
        scorllDown: function(e) {}, //页面下滑刷新数据事件
        scorlling: function(e) {} //页面下滑过程事件
    })
```

    

``` 
    bullet.zipImage({ //图片压缩
        imgSrc: "", //图片地址或base64码（必填参数）
        width: 200, //图片压缩宽度，优先高度，按照宽高比缩放高度
        height: 200, //图片压缩高度，按照高宽比缩放宽度
        quality: 0.7, //图片压缩质量，0-1数字，默认为0.7
        fileType: "jpeg", //图片文件类型，默认为jpeg
        done: (base64) => { //压缩成功回调方法，传入压缩图片base64码
            console.log(base64);
        }
    })
```

    

``` 
    bullet.toFileBlob(base64, 0) //base64码转换成file对象或blob对象，方便上传 0 转换为blob对象		1 转换为file对象
```

    

``` 
    new bullet.Gray2ColorImage({ //灰度图转彩色
        imageSrc: "", //图像资源url
        colorMap: "", //灰度图对应彩色的色标图
    })
```

  > 参考:

  +   [js实现ajax](https://juejin.im/entry/589921640ce46300560ef894 "原生 JavaScript 实现 AJAX、JSONP")

