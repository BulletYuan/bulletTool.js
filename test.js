`use strict`;

function tryFn(expFn, errFn) {
    try {
        expFn();
    } catch (e) {
        console.error(errFn ? errFn(e) : e);
    }
}

var Bullet = require('./index')

if (!Bullet) {
    console.log(`import bullet-tool failed!`)
    return;
}
console.log(`imported bullet-tool...\n${JSON.stringify(Bullet)}`)

console.log(`===prepare test cookie module===`)
if (!Bullet.Cookie) {
    console.log(`import cookie module failed`)
} else {
    var cookie = new Bullet.Cookie();
    console.log(`imported cookie module...\n${JSON.stringify(cookie)}`)
    tryFn(() => {
        var cks = cookie.getCookies();
        console.info(`function getCookies(): ${cks}`);
    }, e => {
        return `function getCookies() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test cookie module===\n\n`)

console.log(`===prepare test dom module===`)
if (!Bullet.Dom) {
    console.log(`import dom module failed`)
} else {
    var dom = new Bullet.Dom();
    console.log(`imported dom module...\n${JSON.stringify(dom)}`)
    tryFn(() => {
        var dhtml = dom.toHtml({
            tagName: 'p',
            html: 'hello world!',
        });
        console.info(`function toHtml(): ${dhtml}`);
    }, e => {
        return `function toHtml() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test dom module===\n\n`)

console.log(`===prepare test http-request module===`)
if (!Bullet.HttpRequest) {
    console.log(`import http-request module failed`)
} else {
    var http = new Bullet.HttpRequest();
    console.log(`imported http-request module...\n${JSON.stringify(http)}`)
    tryFn(() => {
        http.request({
            url: 'https://restapi.amap.com/v3/ip?key=2cdbcd76e596d7b9891769c4ade8e979&ip=47.244.37.206',
            dataType: 'json',
        }).then(res => {
            console.info(`function request(): \n${JSON.stringify(res)}\n\n`);
        }).catch(err => {
            console.error(`function request() has error: \n${err}`);
        });
    }, e => {
        return `function request() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test http-request module===\n\n`)

console.log(`===prepare test image module===`)
if (!Bullet.Dom) {
    console.log(`import image module failed`)
} else {
    var image = new Bullet.Image();
    console.log(`imported image module...\n${JSON.stringify(dom)}`)
    tryFn(() => {
        image.zipImage({
            imgSrc: '',
        });
    }, e => {
        return `function zipImage() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test image module===\n\n`)

console.log(`===prepare test scroll module===`)
if (!Bullet.ScrollPage) {
    console.log(`import scroll module failed`)
} else {
    console.log(`imported scroll module...\n${JSON.stringify(dom)}`)
    tryFn(() => {
        new Bullet.ScrollPage({
            el: null
        });
    }, e => {
        return `function ScrollPage() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test scroll module===\n\n`)

console.log(`===prepare test time module===`)
if (!Bullet.Time) {
    console.log(`import time module failed`)
} else {
    var time = new Bullet.Time();
    console.log(`imported time module...\n${JSON.stringify(dom)}`)
    tryFn(() => {
        console.log(`timestamp():\n${time.timestamp()}`);
        console.log(`timestamp10():\n${time.timestamp10()}`);
        console.log(`dateFormat():\n${time.dateFormat()}`);
        console.log(`timeFormat(1232221):\n${time.timeFormat(1232221)}`);
    }, e => {
        return `function Time() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test time module===\n\n`)

console.log(`===prepare test url module===`)
if (!Bullet.Time) {
    console.log(`import time module failed`)
} else {
    var url = new Bullet.Url();
    console.log(`imported url module...\n${JSON.stringify(dom)}`)
    tryFn(() => {
        console.log(`getParams():\n${JSON.stringify(url.getParams())}`);
        console.log(`toUrl():\n${url.toUrl()}`);
    }, e => {
        return `function Url() excuted faild!\n cause : ${e}`;
    });
}
console.log(`===finished test url module===\n\n`)
