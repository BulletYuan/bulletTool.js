interface HttpRequestOption {
    url: string,            // 请求地址
    type?: string,          // 请求类型
    dataType?: string,      // 返回数据类型
    data?: any,             // 请求数据对象
    header?: any,           // 请求头对象
}