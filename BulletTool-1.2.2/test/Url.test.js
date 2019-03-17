const Url = require('./components/Url');

describe("component test : Url module\nset default url is 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1'", () => {
    const url = new Url();
    console.log(JSON.stringify(url.getParams("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1")));
    console.log(url.toUrl({ ie: 'utf-8', f: '8', rsv_bp: '1' }));
});