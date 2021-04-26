(function(w, l, a) {
	w.XenoUrlOpenLink = function(url) {
		return url.replace(/^(?:https?:\/\/)?((?:[a-z\d_\-=]+\.)+[a-z\d]+(\/[a-z\d_\-=\+\.\/:]*)?)(?:\?(.*))?$/i, function ($0, u, d, q) {
			let qs, i, kv, k, v, j;
			if(!d) u += '/';
			if (q) {
				qs = q.replace(/(?:%[A-F\d]{2})+/g, function (enc) {
					return decodeURIComponent(enc);
				}).split('&');
				for(i = 0; i < qs.length; i ++) {
					kv = qs[i].split('=');
					k = kv.shift();
					v = kv.join('=');
					if(/[^a-z\d_\-\.]/i.test(k)) return false;
					for(j = 0; j < v.length; j ++) {
						if(v.charCodeAt(j) < 256 && /[^a-z\d_\-=\+\.\/]/i.test(v[j])) return false;
						if(v.charCodeAt(j) > 256 && encodeURIComponent(v[j]).length < 9) return false;
					}
				}
				u += '?' + q;
			}
			return 'https://urlopen.link/' + u;
		});
	}

	w.XenoUrlOpenLinkDo = function(url) {
		if (!/mobile/i.test(a) || !/inapp|KAKAOTALK|Line\/|FB_IAB\/FB4A|FBAN\/FBIOS|Instagram|DaumDevice\/mobile|SamsungBrowser\/[^1]/i.test(a)) {
			return true;
		}
		let res = XenoUrlOpenLink(url);
		if(!res || res == url) return true;
		l.href = res;
		return false;
	}
})(window, location, navigator.userAgent);
