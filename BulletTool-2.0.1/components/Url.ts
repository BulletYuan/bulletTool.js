import '../typings/Url';

export class Url {
  private Params: UrlParamData = {
    protocol: "",
    host: "",
    port: "",
    path: "",
    search: "",
    hash: "",
    searchParams: null,
  };

  constructor() { }

  getParams(path?: string): UrlParamData {
    path = path || window.location.href;
    const match = /(\w+):\/\/([^/:]+)(:\d*)?(.*)+/g;
    if (path) {
      const arr = match.exec(path);
      this.Params = {
        protocol: arr[0] || "",
        host: arr[1] || "",
        port: arr[2] ? arr[2].split(":")[1] : "",
        path: "",
        search: "",
        hash: "",
        searchParams: {},
      };
      const param = arr[3];
      const search = /(\/.*)+?(\?.*)+?/g.exec(param);
      const hash = /(\/.*)+?(\?.*)+?/g.exec(param);
      if (search) {
        this.Params['path'] = search[0] || "";
        this.Params['search'] = search[1] || "";
        if (this.Params['search'].split('?')) {
          this.Params['search'].split('?')[1].split('&').forEach(el => {
            this.Params['searchParams'][el.split('=')[0]] = el.split('=')[1];
          });
        }
      } else {
        this.Params['path'] = hash[0] || "";
        this.Params['hash'] = hash[1] || "";
      }
    }
    return this.Params;
  }

  toUrl(obj: UrlParamData): string {
    let a = "";
    Object.keys(obj).forEach((el, i) => {
      a += `${el}=${obj[el]}`;
      if (i < Object.keys(obj).length) {
        a += "&";
      }
    });
    return a;
  }
}