interface UrlParamData {
  protocol?: string,        // 请求协议
  host?: string,            // 请求主机
  port?: string | number,   // 请求端口
  path?: string,            // 请求目录
  search?: string,          // search参数
  hash?: string,            // hash参数
  searchParams?: any        // search参数对象
}