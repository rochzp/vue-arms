/*!
  * vue-arms v1.0.0
  * (c) 2019 Roc
  * @license MIT
  */

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

Date.now = Date.now || function() {
    return new Date().getTime();
};

var SEQUENCE = Date.now(), noop = function() {}, getCwarn = function() {
    var t = "object" == typeof console ? console.warn : noop;
    try {
        var e = {
            warn: t
        };
        e.warn.call(e);
    } catch (n) {
        return noop;
    }
    return t;
}, util = {
    noop: noop,
    warn: getCwarn(),
    key: "__bl",
    win: "object" == typeof window && window.document ? window : undefined,
    regionMap: {
        cn: "https://arms-retcode.aliyuncs.com/r.png?",
        sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
        sg_2: "https://retcode-sg-lazada.arms.aliyuncs.com/r.png?",
        daily: "http://arms-retcode-daily.alibaba.net/r.png?",
        daily_2: "https://arms-retcode-daily.alibaba.net/r.png?",
        us: "https://retcode-us-west-1.arms.aliyuncs.com/r.png?"
    },
    defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    createObject: function(t) {
        if (Object.create) { return Object.create(t); }
        var e = function() {};
        return e.prototype = t, new e();
    },
    each: function(t, e) {
        var n = 0, r = t.length;
        if (this.T(t, "Array")) { for (;n < r && !1 !== e.call(t[n], t[n], n); n++) { } } else { for (n in t) { if (!1 === e.call(t[n], t[n], n)) { break; } } }
        return t;
    },
    safetyCall: function(t, e, n) {
        if ("function" != typeof t) { return n; }
        try {
            return t.apply(this, e);
        } catch (r) {
            return n;
        }
    },
    T: function(t, e) {
        var n = Object.prototype.toString.call(t).substring(8).replace("]", "");
        return e ? n === e : n;
    },
    filterByRule: function(t, e) {
        if (!t) { return ""; }
        if (!e) { return t; }
        var n = this, r = n.T(e);
        return "Function" === r ? n.safetyCall(e, [ t ], t) : "Array" === r ? (this.each(e, function(e) {
            t = n.filterByRule(t, e);
        }), t) : "Object" === r ? t.replace(e.rule, e.target || "") : t.replace(e, "");
    },
    ignoreByRule: function(t, e) {
        if (!t || !e) { return !1; }
        if ((this.isString(e) || e.source || "Function" === this.T(e)) && (e = [ e ]), !this.isArray(e)) { return util.warn("[arms] invalid rules of ignore config, (list of) String/RegExp/Funcitons are available"), 
        !1; }
        for (var n, r = [], o = 0, i = e.length; o < i; o++) { if (n = e[o], this.isString(n)) { r.push(n.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")); } else if (n && n.source) { r.push(n.source); } else if (n && "Function" === this.T(n) && !0 === this.safetyCall(n, [ t ], !1)) { return !0; } }
        var a = new RegExp(r.join("|"), "i");
        return !!(r.length && a.test && a.test(t));
    },
    J: function(t) {
        if (!t || "string" != typeof t) { return t; }
        var e = null;
        try {
            e = JSON.parse(t);
        } catch (n) {}
        return e;
    },
    pick: function(t) {
        return 1 === t || 1 === Math.ceil(Math.random() * t);
    },
    verifyConfig: function(t) {
        if ("sample" in t) {
            var e = t.sample, n = e;
            e && /^\d+(\.\d+)?%$/.test(e) && (n = parseInt(100 / parseFloat(e))), 0 < n && 1 > n && (n = parseInt(1 / n)), 
            n >= 1 && n <= 100 ? t.sample = n : delete t.sample;
        }
        return t;
    },
    on: function(t, e, n, r) {
        return t.addEventListener ? t.addEventListener(e, function o(i) {
            r && t.removeEventListener(e, o, !1), n.call(this, i);
        }, !1) : t.attachEvent && t.attachEvent("on" + e, function i(o) {
            r && t.detachEvent("on" + e, i), n.call(this, o);
        }), this;
    },
    off: function(t, e, n) {
        return n ? (t.removeEventListener ? t.removeEventListener(e, n) : t.detachEvent && t.detachEvent(e, n), 
        this) : this;
    },
    delay: function(t, e) {
        return -1 === e ? (t(), null) : setTimeout(t, e || 0);
    },
    ext: function(t) {
        var arguments$1 = arguments;

        for (var e = 1, n = arguments.length; e < n; e++) {
            var r = arguments$1[e];
            for (var o in r) { Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]); }
        }
        return t;
    },
    sub: function(t, e) {
        var n = {};
        return this.each(t, function(t, r) {
            -1 !== e.indexOf(r) && (n[r] = t);
        }), n;
    },
    uu: function() {
        for (var t, e, n = 20, r = new Array(n), o = Date.now().toString(36).split(""); n-- > 0; ) { e = (t = 36 * Math.random() | 0).toString(36), 
        r[n] = t % 3 ? e : e.toUpperCase(); }
        for (var i = 0; i < 8; i++) { r.splice(3 * i + 2, 0, o[i]); }
        return r.join("");
    },
    seq: function() {
        return (SEQUENCE++).toString(36);
    },
    decode: function(t) {
        try {
            t = decodeURIComponent(t);
        } catch (e) {}
        return t;
    },
    encode: function(t, e) {
        try {
            t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(t);
        } catch (n) {}
        return t;
    },
    serialize: function(t) {
        t = t || {};
        var e = [];
        for (var n in t) { Object.prototype.hasOwnProperty.call(t, n) && t[n] !== undefined && e.push(n + "=" + this.encode(t[n], "msg" === n)); }
        return e.join("&");
    },
    checkAPI: function(t, e) {
        if (!t || "string" != typeof t) { return !1; }
        var n = /arms-retcode[\w-]*\.aliyuncs/.test(t);
        return !n && e && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(t)), !n;
    },
    checkAutoError: function(t) {
        return !(!t || !t.message) && !/failed[\w\s]+fetch/i.test(t.message);
    },
    cutUrlSearch: function(t) {
        return t && "string" == typeof t ? t.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : "";
    },
    createFakeToString: function(t) {
        return function() {
            return t + "() { [native code] }";
        };
    },
    checkSameOrigin: function(t, e) {
        if (!e || !t) { return !1; }
        var n = "//" + e.split("/")[2];
        return t === e || t.slice(0, e.length + 1) === e + "/" || t === n || t.slice(0, n.length + 1) === n + "/" || !/^(\/\/|http:|https:).*/.test(t);
    },
    getRandIP: function() {
        for (var t = [], e = 0; e < 4; e++) {
            var n = Math.floor(256 * Math.random());
            t[e] = (n > 15 ? "" : "0") + n.toString(16);
        }
        return t.join("");
    },
    getSortNum: function(t) {
        return t ? (t += 1) >= 1e3 && t <= 9999 ? t : t < 1e3 ? t + 1e3 : t % 1e4 + 1e3 : 1e3;
    },
    getRandNum: function(t) {
        return t && "string" == typeof t ? t.length < 5 ? this.getNum(5) : t.substring(t.length - 5) : this.getNum(5);
    },
    getNum: function(t) {
        for (var e = [], n = 0; n < t; n++) {
            var r = Math.floor(16 * Math.random());
            e[n] = r.toString(16);
        }
        return e.join("");
    },
    isFunction: function(t) {
        return "function" == typeof t;
    },
    isPlainObject: function(t) {
        return "[object Object]" === Object.prototype.toString.call(t);
    },
    isString: function(t) {
        return "[object String]" === Object.prototype.toString.call(t);
    },
    isArray: function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    },
    joinRegExp: function(t) {
        for (var e, n = [], r = 0, o = t.length; r < o; r++) { e = t[r], this.isString(e) ? n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && n.push(e.source); }
        return new RegExp(n.join("|"), "i");
    }
};

var util_1 = util;

var sendBeacon = function(n, o) {
    "object" == typeof n && (n = util_1.serialize(n));
    var i = o + n;
    window && window.navigator && "function" == typeof window.navigator.sendBeacon ? window.navigator.sendBeacon(i, {}) : util_1.warn("[arms] navigator.sendBeacon not surported");
};

var base = createCommonjsModule(function (module) {
var pushToQueue = function(e, t) {
    var i;
    {
        if ("error" !== t.t || !(i = e.requestQueue[0]) || "error" !== i.t || t.msg !== i.msg) {
            if ("behavior" === t.t) {
                var n = e.requestQueue && e.requestQueue.length;
                if (n > 0 && "behavior" === e.requestQueue[n - 1].t) {
                    var r = t.behavior || [];
                    e.requestQueue[n - 1].behavior.concat(r);
                } else { e.requestQueue.push(t); }
            } else { e.requestQueue.unshift(t); }
            return e.onReady(function() {
                e.requestTimmer = util_1.delay(function() {
                    e.clear();
                }, e.requestQueue[0] && "error" === e.requestQueue[0].t ? 3e3 : -1);
            }), !0;
        }
        i.times++;
    }
}, Base = function(e) {
    return this.ver = "1.6.7", this._conf = util_1.ext({}, Base.dftCon), this.sampleCache = {}, 
    this.requestQueue = [], this.hash = util_1.seq(), this.resetSession(), this.setConfig(e), 
    this.rip = util_1.getRandIP(), this.record = 999, this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"], 
    this._common = {}, this;
};

Base.dftCon = {
    sample: 1,
    tag: "",
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    region: null,
    ignore: {
        ignoreUrls: [],
        ignoreApis: [],
        ignoreErrors: []
    },
    release: undefined,
    environment: "production"
}, Base.prototype = {
    constructor: Base,
    onReady: function(e) {
        return e();
    },
    getPage: function() {
        var e = this._conf.page;
        return util_1.safetyCall(e, [], e + "");
    },
    setPage: function() {},
    setConfig: function(e) {
        e && "object" == typeof e && (util_1.verifyConfig(e), e = this.setImgUrl(e), this._conf = util_1.ext({}, this._conf, e));
    },
    setImgUrl: function(e) {
        var t = e.region, i = e.imgUrl;
        if (t) {
            var n = util_1.regionMap[t];
            return e.imgUrl = n || util_1.defaultImgUrl, e;
        }
        return i && (e.imgUrl = i), e;
    },
    checkImgUrl: function(e) {
        if (this.getConfig("debug")) { return !0; }
        var t = util_1.regionMap, i = !1;
        for (var n in t) { if (t[n] === e) {
            i = !0;
            break;
        } }
        return !i && util_1.warn("[retcode] invalid url: " + e), i;
    },
    sendRequest: function() {},
    sendBeacon: function(e) {
        sendBeacon(e, this.getConfig("imgUrl"));
    },
    postData: function() {},
    commonInfo: function() {
        return {};
    },
    setCommonInfo: function(e) {
        e && "object" == typeof e && (this._common = util_1.ext({}, this._common, e));
    },
    resetSession: function() {
        this.session = util_1.uu(), this.sBegin = Date.now();
    },
    getTraceId: function() {
        var e = this.rip, t = Date.now(), i = util_1.getSortNum(this.record), n = e + t + i + util_1.getRandNum(this._conf.pid);
        return this["EagleEye-TraceID"] = n, this.record = i, {
            "EagleEye-TraceID": n
        };
    },
    getSessionId: function() {
        return {
            "EagleEye-SessionID": this.session
        };
    },
    getConfig: function(e) {
        return e ? this._conf[e] : util_1.ext({}, this._conf);
    },
    sampling: function(e) {
        return 1 === e || ("boolean" == typeof this.sampleCache[e] ? this.sampleCache[e] : (this.sampleCache[e] = util_1.pick(e), 
        this.sampleCache[e]));
    },
    clear: function() {
        var e;
        clearTimeout(this.requestTimmer), this.requestTimmer = null;
        for (var t = this._conf && "function" == typeof this._conf.sendRequest; e = this.requestQueue.pop(); ) { "res" === e.t ? this.postData(e, "res") : "error" === e.t ? this.postData(e, "err") : "behavior" === e.t ? this.postData(e, "behavior") : "health" === e.t && !t && window && window.navigator && "function" == typeof window.navigator.sendBeacon ? this.sendBeacon(e) : this.sendRequest(e); }
        return this;
    },
    _lg: function(e, t, i) {
        var n = this._conf, r = this.getPage(), s = n.ignore || {}, o = s.ignoreErrors, u = s.ignoreUrls, a = s.ignoreApis;
        return util_1.ignoreByRule(r, u) || util_1.ignoreByRule(util_1.decode(r), u) ? this : "error" === e && (util_1.ignoreByRule(t.msg, o) || util_1.ignoreByRule(util_1.decode(t.msg), o)) ? this : "api" === e && (util_1.ignoreByRule(t.api, a) || util_1.ignoreByRule(util_1.decode(t.api), a)) ? this : this.checkImgUrl(n.imgUrl) && t && !n.disabled && n.pid ? i && !this.sampling(i) ? this : (t = util_1.ext({
            t: e,
            times: 1,
            page: r,
            tag: n.tag || "",
            release: n.release || "",
            environment: n.environment,
            begin: Date.now()
        }, t, this.commonInfo(), this._common, {
            pid: n.pid,
            _v: this.ver,
            sid: this.session,
            sampling: i || 1,
            z: util_1.seq(),
            c1: n.c1,
            c2: n.c2,
            c3: n.c3
        }), pushToQueue(this, t)) : this;
    },
    custom: function(e, t) {
        if (!e || "object" != typeof e) { return this; }
        var i = !1, n = {
            begin: Date.now()
        };
        return util_1.each(e, function(e, t) {
            return !(i = t && t.length <= 20) && util_1.warn("[retcode] invalid key: " + t), n["x-" + t] = e, 
            i;
        }), i ? this._lg("custom", n, t || 1) : this;
    }
}, module.exports = Base;
});

var reporter = createCommonjsModule(function (module) {
var validApiKeys = [ "api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq" ], parseStatData = function(e, t) {
    var r = e.split("::");
    return r.length > 1 ? util_1.ext({
        group: r[0],
        key: r[1]
    }, t) : util_1.ext({
        group: "default_group",
        key: r[0]
    }, t);
}, Reporter = function(e) {
    base.call(this, e);
    var t;
    try {
        t = "object" == typeof performance ? performance.timing.fetchStart : Date.now();
    } catch (r) {
        t = Date.now();
    }
    return this._startTime = t, this;
};

Reporter.prototype = util_1.createObject(base.prototype), util_1.ext(base.dftCon, {
    startTime: null
}), util_1.ext(Reporter.prototype, {
    constructor: Reporter,
    _super: base,
    sum: function(e, t, r) {
        try {
            return this._lg("sum", parseStatData(e, {
                val: t || 1,
                begin: Date.now()
            }), r);
        } catch (i) {
            util_1.warn("[retcode] can not get parseStatData: " + i);
        }
    },
    avg: function(e, t, r) {
        try {
            return this._lg("avg", parseStatData(e, {
                val: t || 0,
                begin: Date.now()
            }), r);
        } catch (i) {
            util_1.warn("[retcode] can not get parseStatData: " + i);
        }
    },
    percent: function(e, t, r, i) {
        try {
            return this._lg("percent", parseStatData(e, {
                subkey: t,
                val: r || 0,
                begin: Date.now()
            }), i);
        } catch (a) {
            util_1.warn("[retcode] can not get parseStatData: " + a);
        }
    },
    msg: function(e, t) {
        if (e && !(e.length > 180)) { return this.custom({
            msg: e
        }, t); }
    },
    error: function(e, t) {
        if (!e) { return util_1.warn("[retcode] invalid param e: " + e), this; }
        1 === arguments.length ? ("string" == typeof e && (e = {
            message: e
        }, t = {}), "object" == typeof e && (t = e = e.error || e)) : ("string" == typeof e && (e = {
            message: e
        }), "object" != typeof t && (t = {}));
        var r = e.name || "CustomError", i = util_1.encode(e.message), a = util_1.encode(e.stack || "");
        t = t || {};
        var s = {
            begin: Date.now(),
            cate: r,
            msg: i.substring(0, 1e3),
            stack: a && a.substring(0, 1e3),
            file: t.filename || "",
            line: t.lineno || "",
            col: t.colno || "",
            err: {
                msg_raw: i,
                stack_raw: a
            }
        }, n = (this.getConfig("ignore") || {}).ignoreErrors;
        return util_1.ignoreByRule(s.msg, n) || util_1.ignoreByRule(util_1.decode(s.msg), n) ? this : (this.beforeSend && this.beforeSend("error", s), 
        this._lg("error", s, 1));
    },
    behavior: function(e) {
        if (e) {
            var t = "object" == typeof e && e.behavior ? e : {
                behavior: e
            };
            return this.beforeSend && this.beforeSend("behavior", t), this._lg("behavior", t, 1);
        }
    },
    api: function(e, t, r, i, a, s, n, o) {
        if (!e) { return util_1.warn("[retcode] api is null"), this; }
        if (e = "string" == typeof e ? {
            api: e,
            success: t,
            time: r,
            code: i,
            msg: a,
            begin: s,
            traceId: n,
            sid: o
        } : util_1.sub(e, validApiKeys), !util_1.checkAPI(e.api)) { return this; }
        if (e.code = e.code || "", e.msg = e.msg || "", e.success = e.success ? 1 : 0, e.time = +e.time, 
        e.begin = e.begin, e.traceId = e.traceId || "", e.sid = e.sid || "", !e.api || isNaN(e.time)) { return util_1.warn("[retcode] invalid time or api"), 
        this; }
        var c = (this.getConfig("ignore") || {}).ignoreApis;
        if (util_1.ignoreByRule(e.api, c) || util_1.ignoreByRule(util_1.decode(e.api), c)) { return this; }
        this.beforeSend && this.beforeSend("api", e);
        var u = {
            type: "api",
            data: {
                message: a,
                url: e.api,
                status: i || ""
            },
            timestamp: s
        };
        try {
            this.getConfig("behavior") && this.addBehavior && this.addBehavior(u);
        } catch (l) {}
        return this._lg("api", e, e.success && this.getConfig("sample"));
    },
    speed: function(e, t, r) {
        var i = this, a = this.getConfig("startTime") || this._startTime;
        return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - a : t >= a ? t - a : t, 
        i.speedCache = i.speedCache || {}, i.speedCache[e] = t, i.speedCache.begin = a, 
        clearTimeout(i.speedTimmer), i.speedTimmer = setTimeout(function() {
            r || (i.speedCache.page = i.getPage(!0)), i._lg("speed", i.speedCache), i.speedCache = null;
        }, 5e3), i) : (util_1.warn("[retcode] invalid point: " + e), i);
    },
    performance: function(e) {
        if (e) {
            var t = {};
            for (var r in e) { (/^t([1-9]|1[0])$/.test(r) || "ctti" === r || "cfpt" === r) && (t[r] = e[r]); }
            "{}" !== JSON.stringify(t) && (this.cPerfData = t);
        }
    },
    resource: function(e, t) {
        if (!e || !util_1.isPlainObject(e)) { return util_1.warn("[arms] invalid param data: " + e), 
        this; }
        var r = Object.keys(e), i = [ "begin", "dom", "load", "res", "dl" ], a = !1;
        for (var s in i) {
            if (r.indexOf(i[s]) < 0) {
                a = !0;
                break;
            }
        }
        if (a) { return util_1.warn("[arms] lack param data: " + e), this; }
        var n = {
            begin: e.begin || Date.now(),
            dom: e.dom || "",
            load: e.load || "",
            res: util_1.isArray(e.res) ? JSON.stringify(e.res) : JSON.stringify([]),
            dl: e.dl || ""
        };
        return this._lg("res", n, t);
    }
}), Reporter._super = base, Reporter._root = base, base.Reporter = Reporter, module.exports = Reporter;
});

var sender = createCommonjsModule(function (module) {
var win = "object" == typeof window ? window : {}, _catch = "catch", oFetch = win.__oFetch_ || win.fetch;

oFetch = "function" == typeof oFetch ? oFetch : undefined, module.exports = function(e, o) {
    var t = -1;
    "object" == typeof e && (t = e.z, e = util_1.serialize(e));
    var n = o + e;
    if (oFetch) { return oFetch(n, {
        method: "HEAD",
        mode: "no-cors"
    })[_catch](util_1.noop); }
    if (win.document && win.document.createElement) {
        var c = "__request_hold_" + t, i = win[c] = new Image();
        i.onload = i.onerror = function() {
            win[c] = undefined;
        }, i.src = n, i = null;
    }
};
});

var post = createCommonjsModule(function (module) {
var win = "object" == typeof window ? window : {}, xmlHttp = win.__oXMLHttpRequest_ || win.XMLHttpRequest;

xmlHttp = "function" == typeof xmlHttp ? xmlHttp : undefined, module.exports = function(t, e) {
    try {
        var n = new xmlHttp();
        n.open("POST", e, !0), n.setRequestHeader("Content-Type", "text/plain"), n.send(JSON.stringify(t));
    } catch (i) {
        util_1.warn("[retcode] Failed to log, exception is :\n" + i);
    }
};
});

var behavior = function(e, t) {
    var n = [], r = null, a = t && t.location && t.location.href, o = 0, i = undefined, u = null, c = function(e, t, n) {
        if (null !== e) {
            var r = e[t];
            e[t] = n(r);
        }
    }, s = function(e) {
        var t, n, r, a, o, i = [];
        if (!e || !e.tagName) { return ""; }
        if (i.push(e.tagName.toLowerCase()), e.id && i.push("#".concat(e.id)), (t = e.className) && "[object String]" === Object.prototype.toString.call(t)) { for (n = t.split(/\s+/), 
        o = 0; o < n.length; o++) { i.push(".".concat(n[o])); } }
        var u = [ "type", "name", "title", "alt" ];
        for (o = 0; o < u.length; o++) { r = u[o], (a = e.getAttribute(r)) && i.push("[".concat(r, '="').concat(a, '"]')); }
        return i.join("");
    }, l = function(e, t) {
        return function(n) {
            if (n && n !== u) {
                u = n;
                var a;
                try {
                    a = n.target;
                } catch (l) {
                    a = "<unknown>";
                }
                if (0 !== a.length) {
                    var c = {
                        type: "ui.".concat(e),
                        data: {
                            message: function(e) {
                                if (!e || 1 !== e.nodeType) { return ""; }
                                for (var t = e || null, n = [], r = 0, a = 0, o = " > ".length, i = ""; t && r++ < 5 && !("html" === (i = s(t)) || r > 1 && a + n.length * o + i.length >= 80); ) { n.push(i), 
                                a += i.length, t = t.parentNode; }
                                return n.reverse().join(" > ");
                            }(a)
                        },
                        timestamp: Date.now()
                    };
                    "click" === e ? (o && clearTimeout(o), t ? o = setTimeout(function() {
                        r && r.addBehavior(c);
                    }, 0) : r && r.addBehavior(c)) : "keypress" === e && (i || r && r.addBehavior(c), 
                    clearTimeout(i), i = setTimeout(function() {
                        i = undefined;
                    }, 100));
                }
            }
        };
    }, h = function() {
        if (function() {
            var e = t && t.chrome, n = e && e.app && e.app.runtime, r = "history" in t && !!t.history.pushState && !!t.history.replaceState;
            return !n && r;
        }()) {
            var e = function(e, t) {
                var n = {
                    type: "navigation",
                    data: {
                        from: e,
                        to: t
                    }
                };
                r && r.addBehavior(n), a = t;
            }, n = t.onpopstate;
            t.onpopstate = function() {
                var arguments$1 = arguments;

                for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) { o[i] = arguments$1[i]; }
                var u = t.location.href;
                if (e(a, u), n) { return n.apply(this, o); }
            };
            var o = function(t) {
                return function() {
                    var arguments$1 = arguments;

                    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) { r[o] = arguments$1[o]; }
                    var i = r.length > 2 ? r[2] : undefined;
                    return i && e(a, String(i)), t.apply(this, r);
                };
            };
            c(t.history, "pushState", o), c(t.history, "replaceState", o);
        }
    };
    util_1.ext(e.prototype, {
        addBehavior: function() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : undefined;
            if (this.getConfig("behavior")) {
                var a = r && r > 0 ? min(r, 100) : 100;
                return (e = util_1.ext({}, {
                    type: "default",
                    data: {},
                    timestamp: Date.now(),
                    page: t && t.location && t.location.pathname
                }, e)).data && e.data.message && (e.data.message = util_1.encode(e.data.message)), 
                n.push(e), n = n.slice(-a);
            }
        },
        getBehavior: function() {
            return n || [];
        },
        setBehavior: function(e) {
            return e && (n = e), n;
        },
        reportBehavior: function(e) {
            var t = this;
            t.getConfig("behavior") && (t.sendBhTimer = setTimeout(function() {
                n && n.length > 0 && (t.behavior(n), n = [], t.sendBhTimer = undefined, e && e());
            }, 0));
        },
        initBehavior: function() {
            return this.hasInitBehavior || r || (!function() {
                if (document && document.referrer && document.location) {
                    var e = document.referrer, t = document.location.href;
                    if ("" !== e) {
                        var n = {
                            type: "navigation",
                            data: {
                                from: e,
                                to: t
                            }
                        };
                        a = t, r && r.addBehavior(n);
                    }
                }
            }(), function() {
                if (t && t.console) { for (var e = [ "debug", "info", "warn", "log", "error", "assert" ], n = 0; e.length; n++) {
                    var a = e[n];
                    if (!t.console[a]) { return; }
                    c(t.console, a, function(e) {
                        var n = a;
                        return function() {
                            var arguments$1 = arguments;

                            for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++) { o[i] = arguments$1[i]; }
                            var u = {
                                type: "console",
                                data: {
                                    level: n,
                                    message: o
                                }
                            };
                            if (r && r.addBehavior(u), "error" === n) { for (var c = 0; c < o.length; c++) {
                                var s = o[c];
                                s && s.message && s.stack && r && r.errorHandler(new ErrorEvent("error", {
                                    error: s,
                                    message: s.message
                                }));
                            } }
                            e && Function.prototype.apply.call(e, t.console, o);
                        };
                    });
                } }
            }(), t && t.document && t.document.addEventListener && (t.document.addEventListener("click", l("click"), !1), 
            t.document.addEventListener("keypress", l("keypress"), !1)), h(), r = this, this.hasInitBehavior = !0), 
            this;
        }
    });
};

var TIMING_KEYS = [ "", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "", "domInteractive", "", "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart" ];

var constants = {
	TIMING_KEYS: TIMING_KEYS
};

var TIMING_KEYS$1 = constants.TIMING_KEYS;

var perf = function() {
    var t = util_1.win || {}, n = t.performance;
    if (!n || "object" != typeof n) { return null; }
    var e = {}, i = n.timing || {}, a = Date.now(), r = 1;
    if ("function" == typeof t.PerformanceNavigationTiming) {
        var o = n.getEntriesByType("navigation")[0];
        o && (i = o, r = 2);
    }
    util_1.each({
        dns: [ 3, 2 ],
        tcp: [ 5, 4 ],
        ssl: [ 5, 17 ],
        ttfb: [ 7, 6 ],
        trans: [ 8, 7 ],
        dom: [ 10, 8 ],
        res: [ 14, 12 ],
        firstbyte: [ 7, 2 ],
        fpt: [ 8, 1 ],
        tti: [ 10, 1 ],
        ready: [ 12, 1 ],
        load: [ 14, 1 ]
    }, function(t, n) {
        var a = i[TIMING_KEYS$1[t[1]]], o = i[TIMING_KEYS$1[t[0]]];
        if (2 === r || a > 0 && o > 0) {
            var I = Math.round(o - a);
            I >= 0 && I < 36e5 && (e[n] = I);
        }
    });
    var I = t.navigator.connection, f = n.navigation || {};
    e.ct = I ? I.effectiveType || I.type : "";
    var c = I ? I.downlinkMax || I.bandwidth || -1 : -1;
    if (c = c > 999 ? 999 : c, e.bandwidth = c, e.navtype = 1 === f.type ? "Reload" : "Other", 
    1 === r && i[TIMING_KEYS$1[16]] > 0 && i[TIMING_KEYS$1[1]] > 0) {
        var v = i[TIMING_KEYS$1[16]] - i[TIMING_KEYS$1[1]];
        v >= 0 && v < 36e5 && (e.fpt = v);
    }
    return 1 === r && i[TIMING_KEYS$1[1]] > 0 ? e.begin = i[TIMING_KEYS$1[1]] : 2 === r && e.load > 0 ? e.begin = a - e.load : e.begin = a, 
    e;
};

var TIMING_KEYS$2 = constants.TIMING_KEYS;

var res = function() {
    var t = util_1.win || {}, e = t.performance;
    if (!e || "object" != typeof e || "function" != typeof e.getEntriesByType) { return null; }
    var n = {}, i = e.timing || {}, r = e.getEntriesByType("resource") || [];
    if (n.begin = i[TIMING_KEYS$2[1]] || Date.now(), "function" == typeof t.PerformanceNavigationTiming) {
        var o = e.getEntriesByType("navigation")[0];
        o && (i = o);
    }
    return util_1.each({
        dom: [ 10, 8 ],
        load: [ 14, 1 ]
    }, function(t, e) {
        var r = i[TIMING_KEYS$2[t[1]]], o = i[TIMING_KEYS$2[t[0]]];
        if (r > 0 && o > 0) {
            var a = Math.round(o - r);
            a >= 0 && a < 36e5 && (n[e] = a);
        }
    }), n.res = JSON.stringify(r), n;
};

var handler = function(e, n, r) {
    var t = util_1, a = perf, i = res, o = null, h = r.documentElement, s = n.innerWidth || h.clientWidth || r.body.clientWidth, c = n.innerHeight || h.clientHeight || r.body.clientHeight, d = n.navigator.connection, l = {
        sr: screen.width + "x" + screen.height,
        vp: s + "x" + c,
        ct: d ? d.effectiveType || d.type : ""
    }, u = {}, f = function(e, n, a, i, o) {
        if (n === undefined) {
            var h, s;
            if (!u[e]) {
                h = new RegExp(e + "=([^;]+)");
                try {
                    s = h.exec(r.cookie);
                } catch (d) {
                    return t.warn("[retcode] can not get cookie:", d), null;
                }
                s && (u[e] = s[1]);
            }
            return u[e];
        }
        var c = e + "=" + n;
        i && (c += "; domain=" + i), c += "; path=" + (o || "/"), a && (c += "; max-age=" + a);
        try {
            return r.cookie = c, !!r.cookie;
        } catch (d) {
            return t.warn("[retcode] can not set cookie: ", d), !1;
        }
    }, g = function(e) {
        var n = e._conf.uid || f("_nk_") || f("_bl_uid");
        if (!n) {
            n = t.uu();
            if (!f("_bl_uid", n, 15552e3)) { return null; }
        }
        return n;
    };
    return t.ext(e.prototype, {
        activeErrHandler: function(e) {
            return o && !e ? this : (o = this, this);
        },
        errorHandler: function(e) {
            if (!e) { return this; }
            var n = e.type;
            "error" === n ? this.error(e.error || {
                message: e.message
            }, e) : "unhandledrejection" === n && t.T(e.reason, "Error") && t.checkAutoError(e.reason) && this.error(e.reason);
            try {
                this.getConfig("behavior") && this.reportBehavior && this.reportBehavior();
            } catch (e) {}
            return this;
        },
        sendPerformance: function(e) {
            var n = this;
            n.onReady(function() {
                var r = a();
                r && (r.page = n.getPage(!0), e && (r = t.ext(r, e)), n.cPerfData && (r = t.ext(r, n.cPerfData)), 
                n._lg("perf", r, n.getConfig("sample")));
            });
        },
        sendResources: function(e) {
            var n = this;
            n.onReady(function() {
                var r = i();
                r && (r.load && r.load <= 2e3 || r.load && r.load <= 8e3 && Math.random() > .05 || (r.page = n.getPage(!0), 
                r.dl = location.href, e && (r = t.ext(r, e)), n._lg("res", r, n.getConfig("sample"))));
            });
        },
        sendPV: function() {
            var e = this;
            e.onReady(function() {
                var t = function(e) {
                    var t = g(e), a = n.devicePixelRatio || 1;
                    return {
                        uid: t,
                        dt: r.title,
                        dl: location.href,
                        dr: r.referrer,
                        dpr: a.toFixed(2),
                        de: (r.characterSet || r.defaultCharset || "").toLowerCase(),
                        ul: h.lang,
                        begin: Date.now()
                    };
                }(e);
                t && t.uid && e._lg("pv", t);
            });
        },
        commonInfo: function() {
            return l.uid = g(this), l;
        },
        handleUnload: function(e) {
            var n = Date.now();
            if (n - this._lastUnload < 200) { return this; }
            this._lastUnload = n, this.sendHealth(e), this.speedCache && (this._lg("speed", this.speedCache), 
            this.speedCache = null, clearTimeout(this.speedTimmer)), this.clear();
        },
        bindHashChange: function(e) {
            var r = this;
            if (!e ^ r.hashChangeHandler) { return r; }
            e ? (r.hackHistoryState(), r.hashChangeHandler = function(e) {
                var n = r._conf.parseHash(location.hash);
                n && r.setPage(n, !1 !== e);
            }, r.stateChangeHandler = function(e) {
                var n = r._conf.parseHash(e.detail);
                n && r.setPage(n);
            }, t.on(n, "hashchange", r.hashChangeHandler), t.on(n, "historystatechange", r.stateChangeHandler), 
            r.hashChangeHandler(!1)) : (t.off(n, "hashchange", r.hashChangeHandler), t.off(n, "historystatechange", r.stateChangeHandler), 
            r.hashChangeHandler = null, r.stateChangeHandler = null);
        },
        initHandler: function() {
            var e = this;
            if (e.hasInitHandler) { return e; }
            var r = e._conf;
            return t.on(n, "beforeunload", function() {
                e.handleUnload(0);
            }), e.bindHashChange(r.enableSPA), e.activeErrHandler(!1), e.hasInitHandler = !0, 
            e;
        }
    }), t.on(n, "error", function(e) {
        o && o.errorHandler(e);
    }).on(n, "unhandledrejection", function(e) {
        o && o.errorHandler(e);
    }), e;
};

var checkInterval = 500;

var fmp = function(e, n, t) {
    function r(e, n, t) {
        var i = 0, u = e.tagName;
        if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
            var c = e.children ? e.children.length : 0;
            if (c > 0) { for (var a = e.children, l = c - 1; l >= 0; l--) { i += r(a[l], n + 1, i > 0); } }
            if (i <= 0 && !t) {
                if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < o)) { return 0; }
            }
            i += 1 + .5 * n;
        }
        return i;
    }
    function i(e) {
        for (var n = 1; n < e.length; n++) { if (e[n].score < e[n - 1].score) { return e.splice(n, 1), 
        i(e); } }
        return e;
    }
    var o = n.innerHeight || 0, u = [], c = null, a = 0;
    util_1.ext(e.prototype, {
        initFmpObserver: function(e) {
            var i = this;
            if (!i._conf || !i._conf.useFmp) { return null; }
            if (!n.MutationObserver) { return util_1.warn("[retcode] first meaningful paint can not be retrieved"), 
            i.sendPerformance(), null; }
            util_1.on(n, "beforeunload", function() {
                i.endObserving(0, !0);
            });
            var o = n.MutationObserver;
            return (c = new o(function() {
                !function(e) {
                    var n = Date.now() - e, i = t.querySelector("body");
                    if (i) {
                        var o = 0;
                        o += r(i, 1, !1), u.push({
                            score: o,
                            t: n
                        });
                    } else { u.push({
                        score: 0,
                        t: n
                    }); }
                }(i._startTime);
            })).observe(document, {
                childList: !0,
                subtree: !0
            }), a = 1, i.onReady(function() {
                i.endObserving(e);
            }), c;
        },
        endObserving: function(e, n) {
            var t = this;
            if (c && a) { if (n || !function(e, n) {
                var t = Date.now() - e;
                return !(t > n || t - (u && u.length && u[u.length - 1].t || 0) > 2 * checkInterval);
            }(t._startTime, e)) {
                c.disconnect(), a = 0, u = i(u);
                for (var r = null, o = 1; o < u.length; o++) { if (u[o].t >= u[o - 1].t) {
                    var l = u[o].score - u[o - 1].score;
                    (!r || r.rate <= l) && (r = {
                        t: u[o].t,
                        rate: l
                    });
                } }
                r && r.t > 0 && r.t < 36e5 ? t.sendPerformance({
                    fmp: r.t
                }) : t.sendPerformance();
            } else { util_1.delay(function() {
                t.endObserving(e);
            }, checkInterval); } }
        }
    });
};

var hook = function(e, t) {
    var a = util_1, n = null, r = function(e, t, n, r, o, i, s, p, l, c) {
        var g = a.J(o) || null, u = a.safetyCall(t, [ g, r ], null);
        if (!u) { return !1; }
        var f = u.code || i, h = !("success" in u) || u.success;
        e.api(n, h, s, f, u.msg, p, l, c);
    }, o = "fetch", i = "__oFetch_", s = "__oXMLHttpRequest_", p = "XMLHttpRequest";
    return a.ext(e.prototype, {
        removeHook: function(e, a) {
            return n && (a || this === n) ? (t[i] && (t[o] = t[i], delete t[i]), t[s] && (t[p] = t[s], 
            delete t[s]), n = null, this) : this;
        },
        addHook: function(e) {
            return !e && n ? this : (n || (function() {
                if ("function" == typeof t[o]) {
                    var e = t[o];
                    t[i] = e, t[o] = function(o, i) {
                        var s = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), p = n;
                        if (!p || !p.api) { return e.apply(t, s); }
                        if (i && ("HEAD" === i.method || "no-cors" === i.mode)) { return e.apply(t, s); }
                        var l = Date.now(), c = p._conf, g = (o && "string" != typeof o ? o.url : o) || "", u = g;
                        if (g = a.cutUrlSearch(g), !a.checkAPI(g, !0)) { return e.apply(t, s); }
                        g = a.filterByRule(g, c.ignoreApiPath ? c.ignoreApiPath : c.apiHelper);
                        var f = c.enableLinkTrace, h = "", y = "", d = p.getConfig("pid");
                        if (f) {
                            var E = "";
                            try {
                                E = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                            } catch (T) {
                                E = "";
                            }
                            if (a.checkSameOrigin(u, E)) {
                                if (o && "string" != typeof o) { try {
                                    if (s[0].headers && "function" == typeof s[0].headers.get && "function" == typeof s[0].headers.append) {
                                        var I = s[0].headers.get("EagleEye-TraceID"), D = s[0].headers.get("EagleEye-SessionID"), v = s[0].headers.get("EagleEye-pAppName");
                                        I ? h = I : (h = p.getTraceId()["EagleEye-TraceID"], s[0].headers.append("EagleEye-TraceID", h)), 
                                        D ? y = D : (y = p.getSessionId()["EagleEye-SessionID"], s[0].headers.append("EagleEye-SessionID", y)), 
                                        v || s[0].headers.append("EagleEye-pAppName", d);
                                    }
                                } catch (S) {
                                    a.warn("[retcode] fetch failed to set header, exception is :\n" + S);
                                } }
                                i && (i.headers = i.headers ? i.headers : {}, i.headers["EagleEye-TraceID"] ? h = i.headers["EagleEye-TraceID"] : (h = p.getTraceId()["EagleEye-TraceID"], 
                                i.headers["EagleEye-TraceID"] = h), i.headers["EagleEye-SessionID"] ? y = i.headers["EagleEye-SessionID"] : (y = p.getSessionId()["EagleEye-SessionID"], 
                                i.headers["EagleEye-SessionID"] = y), i.headers["EagleEye-pAppName"] || (i.headers["EagleEye-pAppName"] = d));
                            }
                        }
                        return e.apply(t, s).then(function(e) {
                            if (!p || !p.api) { return e; }
                            var t = e.clone(), a = t.headers;
                            if (a && "function" == typeof a.get) {
                                var n = a.get("content-type");
                                if (n && !/(text)|(json)/.test(n)) { return e; }
                            }
                            var o = Date.now() - l;
                            return t.ok ? t.text().then(function(e) {
                                r(p, c.parseResponse, g, u, e, t.status || 200, o, l, h, y);
                            }) : p.api(g, !1, o, t.status || 404, t.statusText, l, h, y), e;
                        })["catch"](function(e) {
                            if (!p || !p.api) { throw e; }
                            var t = Date.now() - l;
                            throw p.api(g, !1, t, e.name || "Error", e.message, l, h, y), e;
                        });
                    }, t[o].toString = a.createFakeToString(o);
                }
            }(), function() {
                if ("function" == typeof t[p]) {
                    var e = t[p];
                    t[s] = e, t[p] = function(t) {
                        var o = new e(t), i = n;
                        if (!i || !i.api || !o.addEventListener) { return o; }
                        var s, p, l, c = o.send, g = o.open, u = o.setRequestHeader, f = i._conf, h = i.getConfig("enableLinkTrace"), y = "", d = "", E = "";
                        return o.open = function(e, t) {
                            var n = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments);
                            if (g.apply(o, n), l = t || "", p = a.cutUrlSearch(l), p = p ? a.filterByRule(p, f.ignoreApiPath ? f.ignoreApiPath : f.apiHelper) : "", 
                            h) {
                                var r = "";
                                try {
                                    r = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                                } catch (s) {
                                    r = "";
                                }
                                a.checkSameOrigin(l, r) && u && "function" == typeof u && (y = i.getTraceId()["EagleEye-TraceID"], 
                                u.apply(o, [ "EagleEye-TraceID", y ]), d = i.getSessionId()["EagleEye-SessionID"], 
                                u.apply(o, [ "EagleEye-SessionID", d ]), E = i.getConfig("pid"), u.apply(o, [ "EagleEye-pAppName", E ]));
                            }
                        }, o.send = function() {
                            s = Date.now();
                            var e = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments);
                            c.apply(o, e);
                        }, a.on(o, "readystatechange", function() {
                            if (p && 4 === o.readyState) {
                                var e = Date.now() - s;
                                if (o.status >= 200 && o.status <= 299) {
                                    var t = o.status || 200;
                                    if ("function" == typeof o.getResponseHeader) {
                                        var a = o.getResponseHeader("Content-Type");
                                        if (a && !/(text)|(json)/.test(a)) { return; }
                                    }
                                    o.responseType && "text" !== o.responseType ? i.api(p, !0, e, t, "", s, y, d) : r(i, f.parseResponse, p, l, o.responseText, t, e, s, y, d);
                                } else { i.api(p, !1, e, o.status || "FAILED", o.statusText, s, y, d); }
                            }
                        }), o;
                    }, t[p].toString = a.createFakeToString(p);
                }
            }()), n = this, this);
        },
        initHook: function() {
            return this.hasInitHook ? this : (this.getConfig("disableHook") || this.addHook(), 
            this.hasInitHook = !0, this);
        }
    }), e;
};

var hack = function(t, e) {
    var r = util_1, a = e.history || {}, n = e.document, i = function(t, r) {
        var a;
        e.CustomEvent ? a = new CustomEvent(t, {
            detail: r
        }) : ((a = n.createEvent("HTMLEvents")).initEvent(t, !1, !0), a.detail = r), e.dispatchEvent(a);
    }, o = function(t) {
        var e = a[t];
        "function" == typeof e && (a[t] = function(n, o, c) {
            var s = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), u = location.href, h = e.apply(a, s);
            if (!c || "string" != typeof c) { return h; }
            if (c === u) { return h; }
            try {
                var l = u.split("#"), p = c.split("#"), y = r.cutUrlSearch(l[0]), f = r.cutUrlSearch(p[0]), v = l[1] && l[1].replace(/^\/?(.*)/, "$1"), S = p[1] && p[1].replace(/^\/?(.*)/, "$1");
                y !== f ? i("historystatechange", f) : v !== S && i("historystatechange", S);
            } catch (d) {
                r.warn("[retcode] error in " + t + ": " + d);
            }
            return h;
        }, a[t].toString = r.createFakeToString(t));
    };
    r.ext(t.prototype, {
        hackHistoryState: function() {
            return this.hasHackedHistoryState ? this : (o("pushState"), o("replaceState"), this.hasHackedHistoryState = !0, 
            this);
        }
    });
};

var clazz = createCommonjsModule(function (module) {
var win = util_1.win, doc = win.document, validFn = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig|behavior|performance)$/, Browser = function(e) {
    var r = this;
    return reporter.call(r, e), r._initialPage = e.page && util_1.safetyCall(e.page, [], e.page + "") || null, 
    r._health = {
        errcount: 0,
        apisucc: 0,
        apifail: 0
    }, r.beforeSend = function(e, t) {
        "error" === e ? r._health.errcount++ : "api" === e && r._health[t.success ? "apisucc" : "apifail"]++;
    }, !1 !== e.enableInstanceAutoSend && (r.initHandler(), r.initHook(), r.initFmpObserver(1e4), 
    r._conf && r._conf.behavior && r.initBehavior()), Object.defineProperty && win.addEventListener && Object.defineProperty(r, "pipe", {
        set: r.sendPipe
    }), r;
};

Browser.prototype = util_1.createObject(reporter.prototype), util_1.ext(reporter._root.dftCon, {
    uid: null,
    ignoreUrlPath: null,
    ignoreApiPath: null,
    urlHelper: [ {
        rule: /\/([a-z\-_]+)?\d{2,20}/g,
        target: "/$1**"
    }, /\/$/ ],
    apiHelper: {
        rule: /(\w+)\/\d{2,}/g,
        target: "$1"
    },
    ignoreUrlCase: !0,
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    disableHook: !1,
    autoSendPv: !0,
    enableSPA: !1,
    enableLinkTrace: !1,
    sendResource: !0,
    behavior: !0,
    parseHash: function(e) {
        return (e ? util_1.cutUrlSearch(e.replace(/^#\/?/, "")) : "") || "[index]";
    },
    parseResponse: function(e) {
        if (!e || "object" != typeof e) { return {}; }
        var r = e.code, t = e.msg || e.message || e.subMsg || e.errorMsg || e.ret || e.errorResponse || "";
        return "object" == typeof t && (r = r || t.code, t = t.msg || t.message || t.info || t.ret || JSON.stringify(t)), 
        {
            msg: t,
            code: r,
            success: !0
        };
    }
}), util_1.ext(Browser.prototype, {
    constructor: Browser,
    _super: reporter,
    onReady: function(e) {
        var r = this;
        if (r.hasReady) { return e(); }
        "complete" === doc.readyState ? (r.hasReady = !0, e()) : util_1.on(win, "load", function() {
            r.hasReady = !0, e();
        }, !0);
    },
    getPage: function(e) {
        var r = this._conf, t = r.page, i = location, o = i.host + i.pathname;
        return t && !e ? util_1.safetyCall(t, [], t + "") : this._initialPage || util_1.filterByRule(r.ignoreUrlCase ? o.toLowerCase() : o, r.ignoreUrlPath ? r.ignoreUrlPath : r.urlHelper);
    },
    setPage: function(e, r) {
        var t = this, i = t.prevPage;
        if (!1 !== r) {
            if (!e || e === i) { return t; }
            t.prevPage = e, clearTimeout(t.sendPVTimmer), t.handleUnload(1), t.resetSession(), 
            t.sendPVTimmer = setTimeout(function() {
                t.sendPV();
            }, 10);
        } else { t.prevPage = e; }
        return t._conf.page = e, t;
    },
    setConfig: function(e, r) {
        if (e && "object" == typeof e) {
            util_1.verifyConfig(e), e = this.setImgUrl(e);
            var t = this._conf;
            if (this._conf = util_1.ext({}, t, e), !r) {
                var i = "disableHook";
                i in e && t[i] !== e[i] && (e[i] ? this.removeHook() : this.addHook()), (i = "enableSPA") in e && t[i] !== e[i] && this.bindHashChange(e[i]);
            }
        }
    },
    sendRequest: function(e) {
        sender(e, this.getConfig("imgUrl"));
    },
    postData: function(e, r) {
        var t = {};
        t[r] = e[r], delete e[r];
        var i = "";
        "object" == typeof e && (i = util_1.serialize(e)), post(t, this.getConfig("imgUrl") + i + "&post_res=");
    },
    sendPipe: function(e) {
        var r = this;
        if (!e || !e.length) { return r; }
        try {
            if ("Array" === util_1.T(e[0])) { return util_1.each(e, function(e) {
                return r.sendPipe(e);
            }); }
            if ("Array" !== util_1.T(e)) { return r; }
            var t = e.shift();
            if (!validFn.test(t)) { return r; }
            r[t].apply(r, e);
        } catch (i) {
            return util_1.warn("[retcode] error in sendPipe", i), r;
        }
    },
    sendHealth: function() {
        var e = util_1.ext({}, this._health);
        e.healthy = e.errcount > 0 ? 0 : 1, e.begin = Date.now();
        var r = e.begin - this.sBegin;
        e.stay = r, this._lg("health", e, 1), this._health = {
            errcount: 0,
            apisucc: 0,
            apifail: 0
        };
    },
    createInstance: function(e) {
        e = util_1.ext({
            pid: this._conf.pid
        }, e);
        var r = this.__proto__.constructor(e);
        return e.page && r.sendPV(), r;
    }
}), behavior(Browser, win), handler(Browser, win, doc), 
fmp(Browser, win, doc), hook(Browser, win), hack(Browser, win), 
Browser._super = reporter, Browser._root = reporter._root, reporter.Browser = Browser, 
module.exports = Browser;
});

var lib = createCommonjsModule(function (module) {

function initSDK(e, n) {
    var r = win[key] = new BrowserLogger(e);
    r.sendPipe(n);
    var i = r._conf;
    return !1 !== i.autoSendPv && r.sendPV(), i && i.useFmp || r.sendPerformance(), 
    i && i.sendResource && r.sendResources(), win[initFlag] = !0, r;
}

function initCdnBlSDK() {
    if (win[initFlag]) { return win[key]; }
    var e = {}, n = [];
    return key in win && (e = win[key].config || {}, n = win[key].pipe || []), initSDK(e, n);
}

var win = window, BrowserLogger = win.BrowserLogger = clazz, key = util_1.key, initFlag = "__hasInitBlSdk";

BrowserLogger.singleton = function(e, n) {
    return win[initFlag] ? win[key] : initSDK(e, n);
}, BrowserLogger.createExtraInstance = function(e) {
    e && "object" == typeof e && !0 !== e.enableInstanceAutoSend && (e.enableInstanceAutoSend = !1);
    var n = new BrowserLogger(e), r = n._conf;
    return r.enableInstanceAutoSend && (!1 !== r.autoSendPv && n.sendPV(), r && r.useFmp || n.sendPerformance(), 
    r && r.sendResource && n.sendResources()), n;
};

var isBrowser = "object" == typeof window && !!window.navigator;

isBrowser && win[key] && (BrowserLogger.bl = initCdnBlSDK(win.__hasInitBlSdk)), 
module.exports = BrowserLogger;
});

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var classifyRE = /(?:^|[-_])(\w)/g;
var classify = function (str) { return str.replace(classifyRE, function (c) { return c.toUpperCase(); }).replace(/[-_]/g, ''); };

/**
 * 格式化组件名称
 * @param {Object} vm 组件实例
 * @param {Boolean} includeFile 是否包括文件
 */
var formatComponentName = function (vm, includeFile) {
  if (vm.$root === vm) {
    return '<Root>';
  }
  var options = typeof vm === 'function' && vm.cid != null
    ? vm.options
    : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm;
  var name = options.name || options._componentTag;
  var file = options.__file;
  if (!name && file) {
    var match = file.match(/([^/\\]+)\.vue$/);
    name = match && match[1];
  }

  return (
    (name ? ("<" + (classify(name)) + ">") : '<Anonymous>')
    + (file && includeFile !== false ? (" at " + file) : '')
  );
};

var repeat = function (str, n) {
  var res = '';
  while (n) {
    if (n % 2 === 1) { res += str; }
    if (n > 1) { str += str; }
    n >>= 1;
  }
  return res;
};

/**
 * 生产组件追踪
 * @param {Object} vm 组件实例
 */
var generateComponentTrace = function (vm) {
  if (vm._isVue && vm.$parent) {
    var tree = [];
    var currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        var last = tree[tree.length - 1];
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent;
    }
    return (
      ("\n\nfound in\n\n" + (tree
          .map(
            function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
                ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
                : formatComponentName(vm))); }
          )
          .join('\n')))
    );
  }
  return ("\n\n(found in " + (formatComponentName(vm)) + ")");
};

var VueArams = function VueArams(ref, useArmsEnvs) {
  var pipe = ref.pipe;
  var rest = objectWithoutProperties( ref, ["pipe"] );
  var config = rest;

  this.config = config || {};
  this.pipe = pipe;
  this.useArmsEnvs = useArmsEnvs;
  if (
    !useArmsEnvs
    || (useArmsEnvs && useArmsEnvs.includes(process.env.NODE_ENV))
  ) {
    var copyConfig = Object.assign({}, config);
    try {
      if (copyConfig.pid) {
        this.logger = lib.singleton(copyConfig, pipe);
        this.logger.install = this.install;
        return this.logger;
      }
      throw new Error('cannot find pid');
    } catch (error) {
      throw error;
    }
  }
};

VueArams.prototype.install = function install (Vue, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

  var useArmsEnvs = options.useArmsEnvs; if ( useArmsEnvs === void 0 ) useArmsEnvs = this.useArmsEnvs;
  if (
    !useArmsEnvs
    || (useArmsEnvs && useArmsEnvs.includes(process.env.NODE_ENV))
  ) {
    var prevErrorHander = Vue.config.errorHandler;
    var errorHandler = function (err, vm, info) {
      this$1.error(err, {
        filename: ((vm.$vnode.tag) + ", " + info),
      });
      if (
        typeof console !== 'undefined'
        && typeof console.error === 'function'
        && process.env.NODE_ENV !== 'production'
      ) {
        var trace = vm ? generateComponentTrace(vm) : '';
        var msg = "Error in " + info + ": \"" + (err.toString()) + "\"";
        console.error(("[Vue warn]: " + msg + trace));
      }
      if (typeof prevErrorHander === 'function') {
        prevErrorHander.call(this$1, err, vm, info);
      }
    };
    Vue.config.errorHandler = errorHandler;
    window.addEventListener('error', function (e) {
      this$1.error(e.error, e);
    });
    window.addEventListener('unhandledrejection', function (e) {
      this$1.error(e.error, e);
    });
    Vue.prototype.$logger = this;
  }
};

export default VueArams;
