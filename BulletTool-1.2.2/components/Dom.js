/**
 * Name:            Dom.js
 * Desc:            DOM模型操作类，Html结构与json序列化相互转换
 * Author:          BulletYuan
 * Create-Time:     2018.09.23
 * Last-Time:       2019.03.17
 */
const
    BulletTool_Dom = (function () {
        //将dom模型转换为json
        function Dom2Json(el) {
            let obj = {};
            obj['tagName'] = el.tagName;
            if (el.attributes.length > 0) {
                obj['attr'] = {};
                for (let ai = 0; ai < el.attributes.length; ai++) {
                    let attr = el.attributes[ai];
                    obj['attr'][attr.name] = attr.value;
                };
            }
            if (el.children.length === 0) {
                if (el.innerText) obj['html'] = el.innerText;
            }
            if (el.children.length > 0) {
                obj['children'] = [];
                for (let ei = 0; ei < el.children.length; ei++) {
                    let chd = el.children[ei];
                    obj['children'].push(Dom2Json(chd));
                }
            }
            return obj;
        }
        //将json转换为dom模型
        function Json2Dom(obj) {
            if (!obj["tagName"]) return;
            let el = document.createElement(obj["tagName"]);
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
                            el.appendChild(Json2Dom(el, chd));
                        });
                    }
                }
            });
            return el;
        }

        function A() { }
        A.prototype.toJson = async function (dom) {
            dom = dom || document.body;
            return await Dom2Json(dom);
        };
        A.prototype.toHtml = async function (obj) {
            obj = obj || {};
            return await Json2Dom(obj).outerHTML;
        }
        A.prototype.createDom = async function (obj, el) {
            obj = obj || {};
            let chd = await Json2Dom(obj);
            await el.appendChild(chd);
        }

        return A;
    })();

module.exports = BulletTool_Dom;