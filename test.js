`use strict`;

function tryFn(expFn, errFn) {
    try {
        expFn();
    } catch (e) {
        console.error(errFn(e) || e);
    }
}

var Bullet = require('./index')

if (!Bullet) {
    console.log(`import bullet-tool failed!`)
    return;
}
console.log(`imported bullet-tool...\n${JSON.stringify(Bullet)}`)

console.log(`\n\n===prepare test cookie module===`)
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

console.log(`\n\n===prepare test dom module===`)
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
