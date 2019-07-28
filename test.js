`use strict`;

function tryFn(expFn, errFn) {
    try {
        expFn();
    } catch (e) {
        console.error(errFn(e) || e);
    }
}

var bullet = require('./index')
console.log(`imported bullet-tool...\n${JSON.stringify(bullet)}`)

if (!bullet) {
    console.log(`import bullet-tool failed!`)
    return;
}

if (!bullet.Cookie) {
    console.log(`import cookie module failed`)
} else {
    console.log(`prepare test cookie module`)
    var cookie = new bullet.Cookie();
    console.log(`imported cookie module...\n${JSON.stringify(cookie)}`)
    tryFn(() => {
        var cks = cookie.getCookies();
        console.info(`function getCookies(): ${cks}`);
    }, e => {
        return `function getCookies() excuted faild!\n cause : ${e}`;
    })
}