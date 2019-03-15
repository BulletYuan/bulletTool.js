/**
 * Name:            Dom.js
 * Desc:            DOM模型操作类，Html结构与json序列化相互转换
 * Author:          BulletYuan
 * Create-Time:     2018.09.23
 * Last-Time:       attr:{"class":[],""}
 */
const
BulletTool_Dom = (function(){
    //将dom模型转换为json
    function Dom2Json(el){
        let obj={};
        obj['tagName'] = el.tagName;
        if(el.attributes.length>0){
            obj['attr'] = {};
            for(let ai=0;ai<el.attributes.length;ai++){
                let attr=el.attributes[ai];
                obj['attr'][attr.name] = attr.value;
            };
        }
        if(el.children.length === 0){
            if(el.innerHTML) obj['html'] = el.innerHTML;
        }
        if(el.children.length>0){
            obj['children'] = [];
            for(let ei=0;ei<el.children.length;ei++){
                let chd=el.children[ei];
                obj['children'].push(Dom2Json(chd));
            }
        }
        return obj;
    }
    //将json转换为dom模型
    function Json2Dom(par,obj){
        if(!obj["tagName"]) return;
        let el = par.createElement(obj["tagName"]);
        Object.keys(obj).forEach((dom)=>{
            if(dom === "attr"){
                Object.keys(dom).forEach(attr=>{
                    el.setAttribute(attr,dom[attr]);
                });
            }
            if(dom === "html"){
                el.innerHTML = dom;
            }
            if(dom === "children"){
                el.appendChild(Json2Dom(el,dom));
            }
        });
        return el;
    }

    function A(){}
    A.prototype.toJson = async function(dom){
        dom=dom||document.body;
        return await Dom2Json(dom);
    };
    A.prototype.toHtml = async function(obj){
        obj=obj||{};
        return await Json2Dom(document,obj).outerHTML;
    }
    A.prototype.createDom = async function(obj,el,_callback){
        obj=obj||{};
        let chd=await Json2Dom(el,obj);
        el.appendChild(chd);
        _callback&&_callback(chd);
    }
    
    return A;
})();

module.exports = BulletTool_Dom;