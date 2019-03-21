import '../typings/HttpRequest';

export class HttpRequest {

    private xmlhttp: XMLHttpRequest;
    private opts: HttpRequestOption;

    constructor(opts: HttpRequestOption) {
        this.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        if (window['XMLHttpRequest']) this.xmlhttp = new XMLHttpRequest();
        this.opts = opts;
    }

    /**
     * 请求主体
     *
     * @returns
     * @memberof HttpRequest
     */
    request() {
        let type = this.opts.type.toString().toUpperCase() || 'GET';
        let url = this.opts.url;
        let dataType = this.opts.dataType ? this.opts.dataType.toString().toUpperCase() : 'JSON';
        let data = this.opts.data || {};
        let header = this.opts.header || {};

        return new Promise((resolve, reject) => {
            this.xmlhttp.open(type, (type === 'GET' ? url + "?" + this.obj2url(data) + "&_r=" + Math.random() : url), true);
            if (JSON.stringify(header).indexOf(':') >= 0) {
                let h = JSON.stringify(header).substr(1, JSON.stringify(header).length - 2);
                for (let a of h.split(',')) {
                    this.xmlhttp.setRequestHeader(a.split(':')[0].replace(/\"|\'/g, ''), a.split(':')[1].replace(/\"|\'/g, ''))
                }
            }
            type === 'POST' ? this.xmlhttp.send(this.obj2url(data)) : this.xmlhttp.send();
            this.xmlhttp.onreadystatechange = () => {
                if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
                    resolve({
                        data: this.typeTrans(dataType, this.xmlhttp),
                        status: this.xmlhttp.status,
                        readyState: this.xmlhttp.readyState
                    });
                } else {
                    reject({
                        status: this.xmlhttp.status,
                        readyState: this.xmlhttp.readyState
                    });
                }
            }
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
        if (!obj) return "";
        let url = "";
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
        type = type.toUpperCase() || "TEXT";
        switch (type) {
            case "TEXT": this.typeText(xmlhttp); break;
            case "JSON": this.typeJson(xmlhttp); break;
            case "XML": this.typeXml(xmlhttp); break;
            case "BLOB": this.typeBlob(xmlhttp); break;
            case "ARRAYBUFFER": this.typeArraybuffer(xmlhttp); break;

            default: this.typeText(xmlhttp); break;
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
        return xmlhttp.responseText.toString();
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
        return JSON.parse(xmlhttp.responseText);
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
        return xmlhttp.responseXML;
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
        if (xmlhttp.responseText.indexOf('[') === 0 && xmlhttp.responseText.indexOf(']') === xmlhttp.responseText.length - 1) {

            return new Blob(JSON.parse(xmlhttp.responseText), { type: 'text/plain' });
        } else return new Blob([xmlhttp.responseText], { type: 'text/plain' });
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
        return new ArrayBuffer(xmlhttp.responseText.length);
    }

}