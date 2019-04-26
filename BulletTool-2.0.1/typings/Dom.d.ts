interface DomJson {
    tagName?: string,           // html标签名称
    attr?: any,                 // html标签属性对象
    html?: string,              // html文本内容
    children?: DomJson[],       // html子对象
}