import { CookieTypeEnum } from "../typings/Cookie";

export class Cookie {
    private type: number = CookieTypeEnum.cookie;
    private Cookie: any;

    constructor(type?: number) {
        if (type) { this.type = type; }
        if (this.type === CookieTypeEnum.cookie && !document.cookie) {
            throw new Error(`浏览器不支持Cookie功能！`);
        }
        if (this.type === CookieTypeEnum.storage && !window.localStorage) {
            throw new Error(`浏览器不支持LocalStorage功能！`);
        }
    }

    /**
     * 获取本页面Cookie或者本地Storage
     *
     * @returns
     * @memberof Cookie
     */
    getCookies() {
        if (this.type === CookieTypeEnum.cookie) {
            if (!document.cookie)
                throw new Error(`浏览器不支持Cookie功能！`);
            const b = document.cookie.split(';');
            this.Cookie = {};
            for (let i = 0; i < document.cookie.split(';').length; i++) {
                this.Cookie[b[i].split('=')[0]] = b[i].split('=')[1];
            }
            return this.Cookie;
        } else {
            if (!window.localStorage)
                throw new Error(`浏览器不支持LocalStorage功能！`);
            this.Cookie = {};
            this.Cookie = window.localStorage
            return this.Cookie;
        }
    }
    /**
     * 获取本页面指定某条Cookie或者某项Storage
     *
     * @param {string} name
     * @returns
     * @memberof Cookie
     */
    getCookie(name: string) {
        if (this.type === CookieTypeEnum.cookie) {
            if (!document.cookie)
                throw new Error(`浏览器不支持Cookie功能！`);
            let c = this.Cookie || this.getCookies();
            return c[name] || "";
        } else {
            if (!window.localStorage)
                throw new Error(`浏览器不支持LocalStorage功能！`);
            let c = this.Cookie || this.getCookies();
            return JSON.parse(c[name]) || {};
        }
    }
    /**
     * 设置本页面一条Cookie或者一项Storage
     *
     * @param {string} k
     * @param {*} v
     * @param {number} [exdays]
     * @returns
     * @memberof Cookie
     */
    setCookie(k: string, v: any, exdays?: number) {
        if (this.type === CookieTypeEnum.cookie) {
            if (!document.cookie)
                throw new Error(`浏览器不支持Cookie功能！`);
            let d = new Date();
            d.setTime(d.getTime() + ((exdays || 1) * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = k + '=' + escape(v) + ';' + expires;
            return this.getCookies();
        } else {
            if (!window.localStorage)
                throw new Error(`浏览器不支持LocalStorage功能！`);
            let c = this.Cookie || this.getCookies();
            c[k] = JSON.stringify(v);
            return this.getCookies();
        }
    }
    /**
     * 删除本页面一条Cookie或者一项Storage
     *
     * @memberof Cookie
     */
    deleteCookie = function (name: string) {
        if (this.type === CookieTypeEnum.cookie) {
            if (!document.cookie)
                throw new Error(`浏览器不支持Cookie功能！`);
            return name ? this.setCookie(name, '', -1) : false;
        } else {
            if (!window.localStorage)
                throw new Error(`浏览器不支持LocalStorage功能！`);
            return window.localStorage.removeItem(name);
        }
    }
    /**
     * 转换本页面cookie或本地storage为文字格式
     *
     * @returns
     * @memberof Cookie
     */
    toCookieString() {
        if (this.type === CookieTypeEnum.cookie) {
            if (!document.cookie)
                throw new Error(`浏览器不支持Cookie功能！`);
            let c = this.Cookie || this.getCookies();
            c = JSON.stringify(c).replace(/:/g, '=').replace(/,/g, ';')
            c = c.substring(1, c.length - 1).toString();
            let b = "";
            for (let a of c.split(';')) {
                b += a.substring(1, a.indexOf('=') - 1) + "=" + a.substring(a.indexOf('=') + 2, a.length - 1) + "; ";
            }
            b = b.substr(0, b.length - 2);
            return b;
        } else {
            if (!window.localStorage)
                throw new Error(`浏览器不支持LocalStorage功能！`);
            return JSON.stringify(window.localStorage);
        }
    }
}