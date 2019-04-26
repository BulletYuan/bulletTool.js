import { Observable } from 'rxjs';
import '../typings/HttpRequest';

export class HttpRequest {

    private xmlhttp: XMLHttpRequest;
    private opts: HttpRequestOption;

    constructor() {
        if (window['ActiveXObject']) {
            this.xmlhttp = new window['ActiveXObject']('Microsoft.XMLHTTP');
        } else if (window['XMLHttpRequest']) {
            this.xmlhttp = new XMLHttpRequest();
        } else {
            throw (new Error('not http request object can use at current browser.'));
        }
    }

    /**
     * 请求主体
     *
     * @returns
     * @memberof HttpRequest
     */
    request(opts: HttpRequestOption): Observable<any> {
        this.opts = opts;
        const type = this.opts.type.toString().toUpperCase() || 'GET';
        const url = this.opts.url;
        const dataType = this.opts.dataType ? this.opts.dataType.toString().toUpperCase() : 'JSON';
        const data = this.opts.data || {};
        const header = this.opts.header || {};
        const self = this;

        return new Observable(observe => {
            self.xmlhttp.open(type, url, true);
            if (header) {
                const hkarr = Object.keys(header);
                for (let i = 0; i < hkarr.length; i++) {
                    const hk = hkarr[i];
                    self.xmlhttp.setRequestHeader(hk, header[hk]);
                }
            }
            type === 'POST' ? self.xmlhttp.send(self.obj2url(data)) : self.xmlhttp.send();
            self.xmlhttp.onreadystatechange = () => {
                if (self.xmlhttp.status === 200) {
                    if (self.xmlhttp.readyState === 4) {
                        observe.next({
                            data: self.typeTrans(dataType, self.xmlhttp),
                            status: self.xmlhttp.status,
                            readyState: self.xmlhttp.readyState
                        });
                    }
                } else {
                    observe.error({
                        error: self.xmlhttp.statusText,
                        status: self.xmlhttp.status,
                        readyState: self.xmlhttp.readyState
                    });
                }
            };
        });
    }

    /**
     * 将传入的对象参数转化为url格式字符串
     *
     * @private
     * @param {*} obj
     * @returns
     * @memberof HttpRequest
     */
    private obj2url(obj: any) {
        if (!obj) { return ''; }
        let url = '';
        Object.keys(obj).forEach(u => {
            url += `${u}=${obj[u]}&`;
        });
        url = url.substring(0, url.length - 2);
        return url;
    }
    /**
     * 匹配当前xmlhttp返回内容的类型，并对应输出内容，默认为text
     *
     * @private
     * @param {string} type
     * @param {XMLHttpRequest} xmlhttp
     * @memberof HttpRequest
     */
    private typeTrans(type: string, xmlhttp: XMLHttpRequest) {
        type = type.toUpperCase() || 'TEXT';
        switch (type) {
            case 'TEXT': return this.typeText(xmlhttp); break;
            case 'JSON': return this.typeJson(xmlhttp); break;
            case 'XML': return this.typeXml(xmlhttp); break;
            case 'BLOB': return this.typeBlob(xmlhttp); break;
            case 'ARRAYBUFFER': return this.typeArraybuffer(xmlhttp); break;

            default: return this.typeText(xmlhttp); break;
        }
    }
    /**
     * 将返回文字转换为字符串类型
     *
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @returns
     * @memberof HttpRequest
     */
    private typeText(xmlhttp: XMLHttpRequest) {
        return xmlhttp.responseText ? xmlhttp.responseText.toString() : '';
    }
    /**
     * 将返回文字转换为JSON类型
     *
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @returns
     * @memberof HttpRequest
     */
    private typeJson(xmlhttp: XMLHttpRequest) {
        return xmlhttp.response ? JSON.parse(xmlhttp.response) : {};
    }
    /**
     * 将返回文字转换为XML类型
     *
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @returns
     * @memberof HttpRequest
     */
    private typeXml(xmlhttp: XMLHttpRequest) {
        return xmlhttp.responseXML ? xmlhttp.responseXML : '';
    }
    /**
     * 将返回文字转换为Blob类型
     *
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @returns
     * @memberof HttpRequest
     */
    private typeBlob(xmlhttp: XMLHttpRequest) {
        if (xmlhttp.responseText &&
            xmlhttp.responseText.indexOf('[') === 0 &&
            xmlhttp.responseText.indexOf(']') === xmlhttp.responseText.length - 1) {
            return new Blob([xmlhttp.responseText], { type: 'text/plain' });
        } else { return new Blob([xmlhttp.responseText], { type: 'text/plain' }); }
    }
    /**
     * 将返回文字转换为ArrayBuffer类型
     *
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @returns
     * @memberof HttpRequest
     */
    private typeArraybuffer(xmlhttp: XMLHttpRequest) {
        return xmlhttp.responseText.length > 0 ? new ArrayBuffer(xmlhttp.responseText.length) : new ArrayBuffer(0);
    }

}
