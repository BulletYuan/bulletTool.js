/**
 * Name:            ScrollPage.js
 * Desc:            对容器的滚动监听，默认监听Body元素
 * Author:          BulletYuan
 * Create-Time:     2018.09.23
 * Last-Time:       
 */
const
BulletTool_ScrollPage = (function(){
    function A(opts){
        if(!opts||typeof opts !== "object") return;
        let dom = document.getElementsByTagName('body').item(0),
        scrollUpFunc = function(){ console.log('bottom of scroll-up for load') },
        scrollDownFunc = function(){ console.log('top of scroll-down for refresh') },
        scrollingFunc = function(){};
        
        if(opts.el && typeof opts.el === 'object')
            dom = opts.el;
        if(opts.scrollUp && typeof opts.scrollUp === 'function')
            scrollUpFunc=opts.scrollUp;
        if(opts.scrollDown && typeof opts.scrollDown === 'function')
            scrollDownFunc=opts.scrollDown;
        if(opts.scrolling && typeof opts.scrolling === 'function')
            scrollingFunc=opts.scrolling;
            
        dom.onscroll=function(event){
            if(!event) throw new Error("此容器没有滑动事件！");
            let e=event;
            e.preventDefault();
            if(dom.scrollHeight-dom.clientHeight===dom.scrollTop){
                scrollUpFunc(e);
            }
            else if(dom.scrollTop===0){
                scrollDownFunc(e);
            }
            else{
                scrollingFunc(e);
            }
        }
    }
    
    return A;
})();

module.exports = BulletTool_ScrollPage;