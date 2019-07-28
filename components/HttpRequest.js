/**
 * Name:            HttpRequest.js
 * Desc:            基于xmlhttprequest技术的http请求，默认是get方式
 * Author:          BulletYuan
 * Create-Time:     2018.09.22
 * Lastset-Time:    2019.07.28
 */
const HttpRequest = (function () {
	const common = {
		nodeEnv: false,
	}
	function requestOptionsAdapter(opts) {
		var nOpts = {};
		if (common.nodeEnv) {
			nOpts = {
				protocol: '',
				hostname: '',
				port: 80,
				path: '',
				method: 'GET',
				headers: {
					'Accept': '*/*;',
					'Accept-Encoding': 'gzip,deflate,compress',
				},
			};
			var data = opts.data || null;
			nOpts.method = opts.type;
			nOpts.headers = Object.assign({}, nOpts.headers, opts.header);
			nOpts.headers.Host = nOpts.hostname;
			data && data.length > 0 ? nOpts.headers['Content-Length'] = Buffer.byteLength(data) : '';
			var _url = new URL(opts.url || '');
			nOpts.protocol = _url.protocol;
			nOpts.hostname = _url.hostname;
			nOpts.port = _url.port;
			nOpts.path = _url.pathname;
		} else {
			nOpts = {
				url: '',            // 请求地址
				type: 'GET',        // 请求类型 [get|post|put|delete]
				dataType: 'json',   // 请求数据类型 [arraybuffer|blob|json|text]
				data: {},           // 请求数据
				header: {},         // 请求头数据
			};
			nOpts = Object.assign({}, nOpts, opts);
		}
		return nOpts;
	}
	function A() {
		this.req = null;

		var http = null;
		if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
			http = require("http");
		}

		common.nodeEnv = false;
		if (typeof ActiveXObject !== 'undefined') {
			this.req = new ActiveXObject('Microsoft.XMLHTTP');
		} else if (typeof XMLHttpRequest !== 'undefined') {
			this.req = new XMLHttpRequest();
		} else if (http && typeof http !== 'undefined') {
			common.nodeEnv = true;
			this.req = http;
		} else {
			throw (new Error('not http request object can use at current environment.'));
		}
	}
	A.prototype.request = function (opts) {
		opts = requestOptionsAdapter(opts);
		if (common.nodeEnv) {
			return new Promise((res, rej) => {
				let _data = '',
					_req = this.req.request(opts, _obj => {
						_obj.setEncoding('utf8');
						_obj.on('data', chunk => {
							_data += chunk;
						});
						_obj.on('end', () => {
							try {
								_data = JSON.parse(_data);
								res(_data);
							} catch (e) {
								res(_data);
							}
						});
					});
				_req.on('error', err => {
					rej(err.Error);
				});
				data ? _req.write(JSON.stringify(data)) : '';
				_req.end();
			});
		}
	}
})();

module.exports = HttpRequest;