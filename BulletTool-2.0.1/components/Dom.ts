import '../typings/Dom';

export class Dom {
    constructor() { }
    /**
     * 将dom模型转换为json
     *
     * @private
     * @param {(Element | HTMLElement)} el
     * @returns {DomJson}
     * @memberof Dom
     */
    private Dom2Json(el: Element | HTMLElement): DomJson {
        let obj: DomJson = {};
        obj.tagName = el.tagName;
        if (el.attributes.length > 0) {
            obj.attr = {};
            for (let ai = 0; ai < el.attributes.length; ai++) {
                let attr = el.attributes[ai];
                obj.attr[attr.name] = attr.value;
            };
        }
        if (el.children.length === 0) {
            if (el.textContent) obj.html = el.textContent;
        }
        if (el.children.length > 0) {
            obj.children = [];
            for (let ei = 0; ei < el.children.length; ei++) {
                let chd = el.children[ei];
                obj.children.push(this.Dom2Json(chd));
            }
        }
        return obj;
    }
    /**
     * 将json转换为dom模型
     *
     * @private
     * @param {DomJson} obj
     * @returns
     * @memberof Dom
     */
    private Json2Dom(obj: DomJson) {
        if (!obj.tagName) return;
        let el = document.createElement(obj.tagName);
        Object.keys(obj).forEach((dom) => {
            if (dom === "attr") {
                Object.keys(obj[dom]).forEach(attr => {
                    el.setAttribute(attr, obj[dom][attr]);
                });
            }
            if (dom === "html") {
                el.innerText = obj[dom];
            }
            if (dom === "children") {
                if (obj[dom].length > 0) {
                    obj[dom].forEach(chd => {
                        el.appendChild(this.Json2Dom(chd));
                    });
                }
            }
        });
        return el;
    }
    /**
     * 将html转换为DomJson
     *
     * @param {(Element | HTMLElement)} dom
     * @returns
     * @memberof Dom
     */
    async toJson(dom: Element | HTMLElement) {
        dom = dom || document.body;
        return await this.Dom2Json(dom);
    };
    /**
     * 将DomJson转换为html
     *
     * @param {DomJson} obj
     * @returns
     * @memberof Dom
     */
    async toHtml(obj: DomJson) {
        obj = obj || {};
        return await this.Json2Dom(obj).outerHTML;
    }
    /**
     * 通过DomJson创建html元素
     *
     * @param {DomJson} obj
     * @param {(Element | HTMLElement)} el
     * @memberof Dom
     */
    async createDom(obj: DomJson, el: Element | HTMLElement) {
        obj = obj || {};
        let chd = await this.Json2Dom(obj);
        await el.appendChild(chd);
    }
}