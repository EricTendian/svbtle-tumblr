var x;

! function (t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, r = t(document);
    t.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function (e) {
            var n = t('meta[name="csrf-token"]').attr("content");
            n && e.setRequestHeader("X-CSRF-Token", n)
        },
        fire: function (e, n, r) {
            var o = t.Event(n);
            return e.trigger(o, r), o.result !== !1
        },
        confirm: function (t) {
            return confirm(t)
        },
        ajax: function (e) {
            return t.ajax(e)
        },
        href: function (t) {
            return t.attr("href")
        },
        handleRemote: function (r) {
            var o, a, i, u, s, l, c, d;
            if (n.fire(r, "ajax:before")) {
                if (u = r.data("cross-domain"), s = u === e ? null : u, l = r.data("with-credentials") || null, c = r.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, r.is("form")) {
                    o = r.attr("method"), a = r.attr("action"), i = r.serializeArray();
                    var f = r.data("ujs:submit-button");
                    f && (i.push(f), r.data("ujs:submit-button", null))
                } else r.is(n.inputChangeSelector) ? (o = r.data("method"), a = r.data("url"), i = r.serialize(), r.data("params") && (i = i + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (o = r.data("method") || "get", a = r.data("url"), i = r.serialize(), r.data("params") && (i = i + "&" + r.data("params"))) : (o = r.data("method"), a = n.href(r), i = r.data("params") || null);
                d = {
                    type: o || "GET",
                    data: i,
                    dataType: c,
                    beforeSend: function (t, o) {
                        return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), n.fire(r, "ajax:beforeSend", [t, o])
                    },
                    success: function (t, e, n) {
                        r.trigger("ajax:success", [t, e, n])
                    },
                    complete: function (t, e) {
                        r.trigger("ajax:complete", [t, e])
                    },
                    error: function (t, e, n) {
                        r.trigger("ajax:error", [t, e, n])
                    },
                    crossDomain: s
                }, l && (d.xhrFields = {
                    withCredentials: l
                }), a && (d.url = a);
                var m = n.ajax(d);
                return r.trigger("ajax:send", m), m
            }
            return !1
        },
        handleMethod: function (r) {
            var o = n.href(r),
                a = r.data("method"),
                i = r.attr("target"),
                u = t("meta[name=csrf-token]").attr("content"),
                s = t("meta[name=csrf-param]").attr("content"),
                l = t('<form method="post" action="' + o + '"></form>'),
                c = '<input name="_method" value="' + a + '" type="hidden" />';
            s !== e && u !== e && (c += '<input name="' + s + '" value="' + u + '" type="hidden" />'), i && l.attr("target", i), l.hide().append(c).appendTo("body"), l.submit()
        },
        disableFormElements: function (e) {
            e.find(n.disableSelector).each(function () {
                var e = t(this),
                    n = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with", e[n]()), e[n](e.data("disable-with")), e.prop("disabled", !0)
            })
        },
        enableFormElements: function (e) {
            e.find(n.enableSelector).each(function () {
                var e = t(this),
                    n = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") && e[n](e.data("ujs:enable-with")), e.prop("disabled", !1)
            })
        },
        allowAction: function (t) {
            var e, r = t.data("confirm"),
                o = !1;
            return r ? (n.fire(t, "confirm") && (o = n.confirm(r), e = n.fire(t, "confirm:complete", [o])), o && e) : !0
        },
        blankInputs: function (e, n, r) {
            var o, a, i = t(),
                u = n || "input,textarea",
                s = e.find(u);
            return s.each(function () {
                if (o = t(this), a = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !a == !r) {
                    if (o.is("input[type=radio]") && s.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
                    i = i.add(o)
                }
            }), i.length ? i : !1
        },
        nonBlankInputs: function (t, e) {
            return n.blankInputs(t, e, !0)
        },
        stopEverything: function (e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (t) {
            t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function (t) {
                return n.stopEverything(t)
            })
        },
        enableElement: function (t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, n.fire(r, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, r) {
        t.crossDomain || n.CSRFProtection(r)
    }), r.delegate(n.linkDisableSelector, "ajax:complete", function () {
        n.enableElement(t(this))
    }), r.delegate(n.linkClickSelector, "click.rails", function (r) {
        var o = t(this),
            a = o.data("method"),
            i = o.data("params");
        if (!n.allowAction(o)) return n.stopEverything(r);
        if (o.is(n.linkDisableSelector) && n.disableElement(o), o.data("remote") !== e) {
            if (!(!r.metaKey && !r.ctrlKey || a && "GET" !== a || i)) return !0;
            var u = n.handleRemote(o);
            return u === !1 ? n.enableElement(o) : u.error(function () {
                n.enableElement(o)
            }), !1
        }
        return o.data("method") ? (n.handleMethod(o), !1) : void 0
    }), r.delegate(n.buttonClickSelector, "click.rails", function (e) {
        var r = t(this);
        return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(e)
    }), r.delegate(n.inputChangeSelector, "change.rails", function (e) {
        var r = t(this);
        return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(e)
    }), r.delegate(n.formSubmitSelector, "submit.rails", function (r) {
        var o = t(this),
            a = o.data("remote") !== e,
            i = n.blankInputs(o, n.requiredInputSelector),
            u = n.nonBlankInputs(o, n.fileInputSelector);
        if (!n.allowAction(o)) return n.stopEverything(r);
        if (i && o.attr("novalidate") == e && n.fire(o, "ajax:aborted:required", [i])) return n.stopEverything(r);
        if (a) {
            if (u) {
                setTimeout(function () {
                    n.disableFormElements(o)
                }, 13);
                var s = n.fire(o, "ajax:aborted:file", [u]);
                return s || setTimeout(function () {
                    n.enableFormElements(o)
                }, 13), s
            }
            return n.handleRemote(o), !1
        }
        setTimeout(function () {
            n.disableFormElements(o)
        }, 13)
    }), r.delegate(n.formInputClickSelector, "click.rails", function (e) {
        var r = t(this);
        if (!n.allowAction(r)) return n.stopEverything(e);
        var o = r.attr("name"),
            a = o ? {
                name: o,
                value: r.val()
            } : null;
        r.closest("form").data("ujs:submit-button", a)
    }), r.delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function (e) {
        this == e.target && n.disableFormElements(t(this))
    }), r.delegate(n.formSubmitSelector, "ajax:complete.rails", function (e) {
        this == e.target && n.enableFormElements(t(this))
    }), t(function () {
        var e = t("meta[name=csrf-token]").attr("content"),
            n = t("meta[name=csrf-param]").attr("content");
        t('form input[name="' + n + '"]').val(e)
    }))
}(jQuery),
function () {
    function t() {
        var t = !1;
        if ("localStorage" in window) try {
            window.localStorage.setItem("_tmptest", "tmpval"), t = !0, window.localStorage.removeItem("_tmptest")
        } catch (e) {}
        if (t) try {
            window.localStorage && (S = window.localStorage, $ = "localStorage", k = S.jStorage_update)
        } catch (o) {} else if ("globalStorage" in window) try {
            window.globalStorage && (S = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], $ = "globalStorage", k = S.jStorage_update)
        } catch (a) {} else {
            if (y = document.createElement("link"), !y.addBehavior) return y = null, void 0;
            y.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(y);
            try {
                y.load("jStorage")
            } catch (i) {
                y.setAttribute("jStorage", "{}"), y.save("jStorage"), y.load("jStorage")
            }
            var s = "{}";
            try {
                s = y.getAttribute("jStorage")
            } catch (l) {}
            try {
                k = y.getAttribute("jStorage_update")
            } catch (f) {}
            S.jStorage = s, $ = "userDataBehavior"
        }
        u(), c(), n(), d(), "addEventListener" in window && window.addEventListener("pageshow", function (t) {
            t.persisted && r()
        }, !1)
    }

    function e() {
        var t = "{}";
        if ("userDataBehavior" == $) {
            y.load("jStorage");
            try {
                t = y.getAttribute("jStorage")
            } catch (e) {}
            try {
                k = y.getAttribute("jStorage_update")
            } catch (n) {}
            S.jStorage = t
        }
        u(), c(), d()
    }

    function n() {
        "localStorage" == $ || "globalStorage" == $ ? "addEventListener" in window ? window.addEventListener("storage", r, !1) : document.attachEvent("onstorage", r) : "userDataBehavior" == $ && setInterval(r, 1e3)
    }

    function r() {
        var t;
        clearTimeout(C), C = setTimeout(function () {
            if ("localStorage" == $ || "globalStorage" == $) t = S.jStorage_update;
            else if ("userDataBehavior" == $) {
                y.load("jStorage");
                try {
                    t = y.getAttribute("jStorage_update")
                } catch (e) {}
            }
            t && t != k && (k = t, o())
        }, 25)
    }

    function o() {
        var t, n = v.parse(v.stringify(_.__jstorage_meta.CRC32));
        e(), t = v.parse(v.stringify(_.__jstorage_meta.CRC32));
        var r, o = [],
            i = [];
        for (r in n)
            if (n.hasOwnProperty(r)) {
                if (!t[r]) {
                    i.push(r);
                    continue
                }
                n[r] != t[r] && "2." == String(n[r]).substr(0, 2) && o.push(r)
            }
        for (r in t) t.hasOwnProperty(r) && (n[r] || o.push(r));
        a(o, "updated"), a(i, "deleted")
    }

    function a(t, e) {
        if (t = [].concat(t || []), "flushed" == e) {
            t = [];
            for (var n in T) T.hasOwnProperty(n) && t.push(n);
            e = "deleted"
        }
        for (var r = 0, o = t.length; o > r; r++) {
            if (T[t[r]])
                for (var a = 0, i = T[t[r]].length; i > a; a++) T[t[r]][a](t[r], e);
            if (T["*"])
                for (var a = 0, i = T["*"].length; i > a; a++) T["*"][a](t[r], e)
        }
    }

    function i() {
        var t = (+new Date).toString();
        "localStorage" == $ || "globalStorage" == $ ? S.jStorage_update = t : "userDataBehavior" == $ && (y.setAttribute("jStorage_update", t), y.save("jStorage")), r()
    }

    function u() {
        if (S.jStorage) try {
            _ = v.parse(String(S.jStorage))
        } catch (t) {
            S.jStorage = "{}"
        } else S.jStorage = "{}";
        j = S.jStorage ? String(S.jStorage).length : 0, _.__jstorage_meta || (_.__jstorage_meta = {}), _.__jstorage_meta.CRC32 || (_.__jstorage_meta.CRC32 = {})
    }

    function s() {
        m();
        try {
            S.jStorage = v.stringify(_), y && (y.setAttribute("jStorage", S.jStorage), y.save("jStorage")), j = S.jStorage ? String(S.jStorage).length : 0
        } catch (t) {}
    }

    function l(t) {
        if (!t || "string" != typeof t && "number" != typeof t) throw new TypeError("Key name must be string or numeric");
        if ("__jstorage_meta" == t) throw new TypeError("Reserved key name");
        return !0
    }

    function c() {
        var t, e, n, r, o = 1 / 0,
            u = !1,
            l = [];
        if (clearTimeout(b), _.__jstorage_meta && "object" == typeof _.__jstorage_meta.TTL) {
            t = +new Date, n = _.__jstorage_meta.TTL, r = _.__jstorage_meta.CRC32;
            for (e in n) n.hasOwnProperty(e) && (n[e] <= t ? (delete n[e], delete r[e], delete _[e], u = !0, l.push(e)) : n[e] < o && (o = n[e]));
            1 / 0 != o && (b = setTimeout(c, o - t)), u && (s(), i(), a(l, "deleted"))
        }
    }

    function d() {
        var t, e;
        if (_.__jstorage_meta.PubSub) {
            var n, r = E;
            for (t = e = _.__jstorage_meta.PubSub.length - 1; t >= 0; t--) n = _.__jstorage_meta.PubSub[t], n[0] > E && (r = n[0], f(n[1], n[2]));
            E = r
        }
    }

    function f(t, e) {
        if (x[t])
            for (var n = 0, r = x[t].length; r > n; n++) x[t][n](t, v.parse(v.stringify(e)))
    }

    function m() {
        if (_.__jstorage_meta.PubSub) {
            for (var t = +new Date - 2e3, e = 0, n = _.__jstorage_meta.PubSub.length; n > e; e++)
                if (_.__jstorage_meta.PubSub[e][0] <= t) {
                    _.__jstorage_meta.PubSub.splice(e, _.__jstorage_meta.PubSub.length - e);
                    break
                }
            _.__jstorage_meta.PubSub.length || delete _.__jstorage_meta.PubSub
        }
    }

    function h(t, e) {
        _.__jstorage_meta || (_.__jstorage_meta = {}), _.__jstorage_meta.PubSub || (_.__jstorage_meta.PubSub = []), _.__jstorage_meta.PubSub.unshift([+new Date, t, e]), s(), i()
    }

    function p(t, e) {
        for (var n, r = t.length, o = e ^ r, a = 0; r >= 4;) n = 255 & t.charCodeAt(a) | (255 & t.charCodeAt(++a)) << 8 | (255 & t.charCodeAt(++a)) << 16 | (255 & t.charCodeAt(++a)) << 24, n = 1540483477 * (65535 & n) + ((65535 & 1540483477 * (n >>> 16)) << 16), n ^= n >>> 24, n = 1540483477 * (65535 & n) + ((65535 & 1540483477 * (n >>> 16)) << 16), o = 1540483477 * (65535 & o) + ((65535 & 1540483477 * (o >>> 16)) << 16) ^ n, r -= 4, ++a;
        switch (r) {
        case 3:
            o ^= (255 & t.charCodeAt(a + 2)) << 16;
        case 2:
            o ^= (255 & t.charCodeAt(a + 1)) << 8;
        case 1:
            o ^= 255 & t.charCodeAt(a), o = 1540483477 * (65535 & o) + ((65535 & 1540483477 * (o >>> 16)) << 16)
        }
        return o ^= o >>> 13, o = 1540483477 * (65535 & o) + ((65535 & 1540483477 * (o >>> 16)) << 16), o ^= o >>> 15, o >>> 0
    }
    var g = "0.4.3",
        w = window.jQuery || window.$ || (window.$ = {}),
        v = {
            parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (t) {
                return String(t).evalJSON()
            } || w.parseJSON || w.evalJSON,
            stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || w.toJSON
        };
    if (!v.parse || !v.stringify) throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var b, _ = {
            __jstorage_meta: {
                CRC32: {}
            }
        }, S = {
            jStorage: "{}"
        }, y = null,
        j = 0,
        $ = !1,
        T = {}, C = !1,
        k = 0,
        x = {}, E = +new Date,
        A = {
            isXML: function (t) {
                var e = (t ? t.ownerDocument || t : 0).documentElement;
                return e ? "HTML" !== e.nodeName : !1
            },
            encode: function (t) {
                if (!this.isXML(t)) return !1;
                try {
                    return (new XMLSerializer).serializeToString(t)
                } catch (e) {
                    try {
                        return t.xml
                    } catch (n) {}
                }
                return !1
            },
            decode: function (t) {
                var e, n = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (t) {
                        var e = new ActiveXObject("Microsoft.XMLDOM");
                        return e.async = "false", e.loadXML(t), e
                    };
                return n ? (e = n.call("DOMParser" in window && new DOMParser || window, t, "text/xml"), this.isXML(e) ? e : !1) : !1
            }
        };
    w.jStorage = {
        version: g,
        set: function (t, e, n) {
            if (l(t), n = n || {}, "undefined" == typeof e) return this.deleteKey(t), e;
            if (A.isXML(e)) e = {
                _is_xml: !0,
                xml: A.encode(e)
            };
            else {
                if ("function" == typeof e) return void 0;
                e && "object" == typeof e && (e = v.parse(v.stringify(e)))
            }
            return _[t] = e, _.__jstorage_meta.CRC32[t] = "2." + p(v.stringify(e), 2538058380), this.setTTL(t, n.TTL || 0), a(t, "updated"), e
        },
        get: function (t, e) {
            return l(t), t in _ ? _[t] && "object" == typeof _[t] && _[t]._is_xml ? A.decode(_[t].xml) : _[t] : "undefined" == typeof e ? null : e
        },
        deleteKey: function (t) {
            return l(t), t in _ ? (delete _[t], "object" == typeof _.__jstorage_meta.TTL && t in _.__jstorage_meta.TTL && delete _.__jstorage_meta.TTL[t], delete _.__jstorage_meta.CRC32[t], s(), i(), a(t, "deleted"), !0) : !1
        },
        setTTL: function (t, e) {
            var n = +new Date;
            return l(t), e = Number(e) || 0, t in _ ? (_.__jstorage_meta.TTL || (_.__jstorage_meta.TTL = {}), e > 0 ? _.__jstorage_meta.TTL[t] = n + e : delete _.__jstorage_meta.TTL[t], s(), c(), i(), !0) : !1
        },
        getTTL: function (t) {
            var e, n = +new Date;
            return l(t), t in _ && _.__jstorage_meta.TTL && _.__jstorage_meta.TTL[t] ? (e = _.__jstorage_meta.TTL[t] - n, e || 0) : 0
        },
        flush: function () {
            return _ = {
                __jstorage_meta: {
                    CRC32: {}
                }
            }, s(), i(), a(null, "flushed"), !0
        },
        storageObj: function () {
            function t() {}
            return t.prototype = _, new t
        },
        index: function () {
            var t, e = [];
            for (t in _) _.hasOwnProperty(t) && "__jstorage_meta" != t && e.push(t);
            return e
        },
        storageSize: function () {
            return j
        },
        currentBackend: function () {
            return $
        },
        storageAvailable: function () {
            return !!$
        },
        listenKeyChange: function (t, e) {
            l(t), T[t] || (T[t] = []), T[t].push(e)
        },
        stopListening: function (t, e) {
            if (l(t), T[t]) {
                if (!e) return delete T[t], void 0;
                for (var n = T[t].length - 1; n >= 0; n--) T[t][n] == e && T[t].splice(n, 1)
            }
        },
        subscribe: function (t, e) {
            if (t = (t || "").toString(), !t) throw new TypeError("Channel not defined");
            x[t] || (x[t] = []), x[t].push(e)
        },
        publish: function (t, e) {
            if (t = (t || "").toString(), !t) throw new TypeError("Channel not defined");
            h(t, e)
        },
        reInit: function () {
            e()
        }
    }, t()
}(),
function () {
    window.delay = function (t, e) {
        return setTimeout(e, t)
    }, window.startApplication = function () {
        var t, e, n, r, o, a;
        return n || (n = null), a || (a = null), t = function () {
            return clearTimeout(a), n = setTimeout(function () {
                return $("body").removeClass("menu_active"), $("#master").removeClass("active"), $(".kudo.side").removeClass("pushover"), $("nav#master").scrollTop(0)
            }, 600)
        }, e = function () {
            return clearTimeout(a), $("body").removeClass("menu_active"), $("#master").removeClass("active"), $(".kudo.side").removeClass("pushover"), $("nav#master").scrollTop(0)
        }, r = function () {
            return clearTimeout(n), a = setTimeout(function () {
                return $("body").addClass("menu_active"), $("#master").addClass("active"), $(".kudo.side").addClass("pushover")
            }, 300)
        }, o = function () {
            return clearTimeout(n), $("body").addClass("menu_active"), $("#master").addClass("active"), $(".kudo.side").addClass("pushover")
        }, $("div#touch_close").on("touchend", function () {
            return e(), !1
        }), $("div#touch_close").on("click", function () {
            return e(), !1
        }), $("#master_indicator, #master_indicator a").on("click", function () {
            return !1
        }), $("div#touch_menu").on("touchend", function () {
            return $("#master").hasClass("active") ? e() : o(), !1
        }), $("div#touch_menu").on("click", function () {
            return $("#master").hasClass("active") ? e() : o(), !1
        }), $("#master, div#touch_menu").on("mouseenter", function () {
            return r()
        }).on("mouseleave", function () {
            return t()
        }), !1
    }
}.call(this),
function () {
    var t, e, n, r, o, a;
    t || (t = null), n || (n = null), o || (o = null), r || (r = null), a || (a = null), e || (e = null), window.startCode = function () {
        return $("code").addClass("prettyprint"), $.getScript("/javascripts/prettify.js").done(function () {
            var t;
            return t = "/stylesheets/prettify.css", $.get(t, function (t) {
                return $('<style type="text/css"></style>').html(t).appendTo("head")
            }), prettyPrint()
        })
    }, window.startTweets = function () {
        return $.getScript("//platform.twitter.com/widgets.js").done(function () {
            return setTimeout(function () {
                return $("article iframe.twitter-tweet").css({
                    "max-width": "650px",
                    margin: "0 auto"
                })
            }, 2e3)
        })
    }, window.updateKudos = function () {
        return $("figure.kudo").each(function () {
            var t, e;
            return t = $(this).closest("article").attr("id"), e = $.jStorage.get(String(t)), e ? $("#" + t + " figure.kudo").removeClass("able").addClass("complete") : void 0
        })
    }, window.getKudos = function () {
        /*var t, e, n;
        return t = $("article").first().attr("id"), n = parseInt($("span.page.current").text()), isNaN(n) && (n = 1), e = 1 === $("article").length ? "/" + t + "/kudos" : "/page/" + n + "/kudos", t && $.get(e, function (t, e, n) {
            var r;
            return r = n.getResponseHeader("X-SvbKey-r"), $('meta[name="csrf-token"]').attr("content", r), $.each(t, function (t, e) {
                var n, r, o;
                return n = $("#" + e.extid).find("div.num"), o = n.text().replace(/,/g, ""), r = e.kudos, isNaN(o) && (o = 0), isNaN(r) && (r = 9e6), r - o >= 0 ? (r = r.toString(), r = r.replace(/\B(?=(\d{3})+(?!\d))/g, ","), n.html(r)) : void 0
            })
        }), !0*/
        x.transaction(function(current_value) {
            return current_value + 0;
        });
    }, window.makeBigParagraph = function () {
        return $("article").each(function () {
            var t;
            return t = $(this).children("p").first(), "" === $.trim(t.text()) ? t.next("p").addClass("bigtext") : void 0
        })
    }, window.checkMessages = function () {
        var t;
        return t = window.location.search, t.indexOf("not_found") >= 0 && (history.pushState(null, null, "/"), $('<div id ="notice"><span>:(</span><br/><br/>Not found.</div>').insertBefore("header#begin")), t.indexOf("udate") >= 0 ? ($("article").css({
            opacity: .1
        }), setTimeout(function () {
            return history.pushState(null, null, window.location.pathname), window.location.reload(!0)
        }, 700)) : void 0
    }, window.bleedImages = function () {
        return $("article img").not(".no-resize").each(function () {
            var t, e, n;
            return t = this, n = getImageWidth(t), n > 550 ? ($(this).not(".no-resize").addClass("bleed"), e = $(this).not(".no-resize").closest("p"), e.addClass("bleed_image")) : void 0
        })
    }, window.getImageWidth = function (t) {
        var e;
        return e = new Image, e.src = (t.getAttribute ? t.getAttribute("src") : !1) || t.src, e.width
    }, window.bootstrapKudo = function (e) {
        return e.addClass("activated"), e.find(".num").hide(), e.find(".txt").html("Don&rsquo;t move"), t = setTimeout(function () {
            return clearTimeout(t), fireKudo(e), e.find(".txt").fadeOut(), e.addClass("complete"), e.siblings("figure.kudo").addClass("complete").removeClass("able"), setTimeout(function () {
                return e.removeClass("activated").removeClass("able"), e.find(".num").fadeIn(), e.find(".txt").html("Kudos").fadeIn()
            }, 600)
        }, 1e3)
    }, window.fireKudo = function (t) {
        var e, n, r;
        return e = t.closest("article").attr("id"), r = t.closest("article").find("a.title").text(), x.transaction(function(current_value) {
            return current_value + 1;
        }, function () {
            return $.jStorage.set(String(e), !0), ga("userTracker.send", "event", "Articles", "Kudos", window.location.pathname, {
                page: window.location.pathname,
                title: window.document.title
            }), ga("send", "event", "Articles", "Kudos", window.location.pathname, {
                page: window.location.pathname,
                title: window.document.title
            }), null != window._gaq ? _gaq.push(["_trackEvent", "Articles", "Kudos", r]) : void 0
        }), n = parseInt(t.find("div.num").text().replace(/,/g, "")), t.find("div.num").text(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), t.siblings("figure.kudo").find("div.num").text(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }, window.sizeUp = function () {
        return a = $(window).width(), $("article img").not(".no-resize").each(function () {
            return 650 >= a && a > 530 ? ($(this).not(".no-resize").removeAttr("height"), $(this).not(".no-resize").css("width", $(window).width() + "px"), $(this).not(".no-resize").css("margin-left", "-" + ($(window).width() - 550) / 2 + "px")) : 530 > a ? ($(this).not(".no-resize").removeAttr("height"), $(this).not(".no-resize").css("width", $(window).width() + "px"), $(this).not(".no-resize").css("margin-left", "-10px")) : ($(this).not(".no-resize").removeAttr("height"), $(this).not(".no-resize").css("width", ""), $(this).not(".no-resize").css("margin-left", ""))
        })
    }, window.checkImages = function () {
        return a = $(window).width(), $("article img").each(function () {
            var t, e;
            return t = new Image, t.src = $(this).attr("src"), e = $(this), t.onload = function () {
                return t.width < 400 ? e.addClass("no-resize") : void 0
            }
        })
    }, window.startBlog = function () {
        var e;
        x = new Firebase('https://'+$('meta[name="firebase-name"]').attr("content")+'.firebaseio.com/'+$('article').first().attr("id").replace('eid','')+'/kudos');
        x.on('value', function f(s) {
            $('article').first().find("div.num").text(parseInt(s.val() + 0).toLocaleString());
        });
        return $("article.post").height() < 700 && $("figure.kudo.side").hide(), e = $(window).scrollTop(), $("article iframe").each(function () {
            return $(this).css("width", ""), $(this).wrap('<p class="objected"></p>')
        }), $("h1.article_title").on({
            mouseenter: function () {
                return clearTimeout(r), $(".article_time").addClass("active")
            },
            mouseleave: function () {
                return r = setTimeout(function () {
                    return $(".article_time").removeClass("active")
                }, 200)
            }
        }), $("h2#page_title, h3#page_subtitle").on({
            mouseenter: function () {
                return clearTimeout(o), $("header#page_header").addClass("active")
            },
            mouseleave: function () {
                return o = setTimeout(function () {
                    return $("header#page_header").removeClass("active")
                }, 200)
            }
        }), $(window).scroll(function () {
            return $(window).scrollTop() + $(window).height() > $(document).height() - 450 ? $("nav#lightning").addClass("bottom") : $("nav#lightning").removeClass("bottom"), $(window).scrollTop() + $(window).height() > $(document).height() - 450 ? $("figure.kudo.side").addClass("bottom") : $("figure.kudo.side").removeClass("bottom"), e = $(window).scrollTop(), e > 150 ? $("nav#master").addClass("scrolled") : $("nav#master").removeClass("scrolled")
        }), sizeUp(), $(window).load(function () {
            return checkImages()
        }), $(document).on("page:change", function () {
            return checkImages()
        }), $(window).resize(function () {
            return sizeUp()
        }), checkMessages(), getKudos(), updateKudos(), makeBigParagraph(), $("code, pre").length > 0 && startCode(), $(".twitter-tweet").length > 0 && startTweets(), $("figure.kudo a").on({
            click: function (t) {
                return t.preventDefault(), !1
            },
            mouseenter: function () {
                var t;
                return t = $(this).parent(), t.is(".able") ? bootstrapKudo(t) : void 0
            },
            mouseleave: function () {
                var e;
                return e = $(this).parent(), e.find(".num").show(), e.find(".txt").html("Kudos"), e.removeClass("activated"), clearTimeout(t)
            }
        }), $("figure.kudo a").on("touchstart", function (t) {
            var e;
            return e = $(this).parent(), e.is(".able") && bootstrapKudo(e), t.preventDefault(), !1
        }), $("figure.kudo a").on("touchend", function (e) {
            var n;
            return clearTimeout(t), n = $(this).parent(), n.find(".num").show(), n.find(".txt").html("Kudos"), n.removeClass("activated"), e.preventDefault()
        })
    }
}.call(this),
function () {
    function t() {}

    function e(t) {
        this.path = t, this.at_2x_path = t.replace("_small", function (t) {
            return t ? "_retina" : t
        })
    }

    function n(t) {
        this.el = t, this.path = new e(this.el.getAttribute("src"));
        var n = this;
        this.path.check_2x_variant(function (t) {
            t && n.swap()
        })
    }
    var r = "undefined" == typeof exports ? window : exports;
    r.Retina = t, t.init = function (t) {
        null == t && (t = r);
        var e = t.onload || new Function;
        t.onload = function () {
            var t, r, o = $("article img"),
                a = [];
            for (t = 0; t < o.length; t++) r = o[t], a.push(new n(r));
            e()
        }
    }, t.isRetina = function () {
        var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
        return r.devicePixelRatio > 1 ? !0 : r.matchMedia && r.matchMedia(t).matches ? !0 : !1
    }, r.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.at_2x_path_loads = function (t) {
        var e = new Image;
        e.onload = function () {
            return t(!0)
        }, e.onerror = function () {
            return t(!1)
        }, e.src = this.at_2x_path
    }, e.prototype.check_2x_variant = function (t) {
        var n = this;
        return -1 != e.confirmed_paths.indexOf(this.at_2x_path) ? t(!0) : (this.at_2x_path_loads(function (r) {
            return r && e.confirmed_paths.push(n.at_2x_path), t(r)
        }), void 0)
    }, r.RetinaImage = n, n.prototype.swap = function (t) {
        function e() {
            n.el.complete ? n.el.setAttribute("src", t) : setTimeout(e, 5)
        }
        "undefined" == typeof t && (t = this.path.at_2x_path);
        var n = this;
        e()
    }, t.isRetina() && t.init(r)
}(),
function () {
    var t, e, n, r, o, a, i, u, s, l, c, d, f, m, h, p, g, w, v, b, _, S, y, j, $, T, C, k, x, E, A, P, L, O, R, D, N, I, M, z, K, q, B, X, F, H = {}.hasOwnProperty,
        J = [].indexOf || function (t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    i = 10, d = null, A = null, S = null, T = {}, l = null, I = (null != (F = document.cookie.match(/request_method=(\w+)/)) ? F[1].toUpperCase() : void 0) || "", X = null, g = function (t) {
        var e;
        return q("page:fetch"), e = D(t), null != X && X.abort(), X = new XMLHttpRequest, X.open("GET", e, !0), X.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"), X.setRequestHeader("X-XHR-Referer", A), X.onload = function () {
            var e;
            return q("page:receive"), (e = x()) ? (P(t), u.apply(null, h(e)), L(), document.location.hash ? document.location.href = document.location.href : z(), q("page:load")) : document.location.href = t
        }, X.onloadend = function () {
            return X = null
        }, X.onabort = function () {
            return R()
        }, X.onerror = function () {
            return document.location.href = t
        }, X.send()
    }, p = function (t) {
        var e;
        return a(), e = T[t], null != X && X.abort(), u(e.title, e.body), E(e), q("page:restore")
    }, a = function () {
        return T[d.position] = {
            url: document.location.href,
            body: document.body,
            title: document.title,
            positionY: window.pageYOffset,
            positionX: window.pageXOffset
        }, s(i)
    }, k = function (t) {
        return null == t && (t = i), /^[\d]+$/.test(t) ? i = parseInt(t) : void 0
    }, s = function (t) {
        var e, n;
        for (e in T) H.call(T, e) && (n = T[e], e <= d.position - t && (T[e] = null))
    }, u = function (e, n, r, o) {
        return document.title = e, document.documentElement.replaceChild(n, document.body), null != r && t.update(r), N(), o && f(), d = window.history.state, q("page:change")
    }, f = function () {
        var t, e, n, r, o, a, i, u, s, l, c, d;
        for (a = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')), i = 0, s = a.length; s > i; i++)
            if (o = a[i], "" === (c = o.type) || "text/javascript" === c) {
                for (e = document.createElement("script"), d = o.attributes, u = 0, l = d.length; l > u; u++) t = d[u], e.setAttribute(t.name, t.value);
                e.appendChild(document.createTextNode(o.innerHTML)), r = o.parentNode, n = o.nextSibling, r.removeChild(o), r.insertBefore(e, n)
            }
    }, N = function () {
        var t, e, n, r;
        for (e = Array.prototype.slice.call(document.body.getElementsByTagName("noscript")), n = 0, r = e.length; r > n; n++) t = e[n], t.parentNode.removeChild(t)
    }, P = function (t) {
        return t !== A ? window.history.pushState({
            turbolinks: !0,
            position: d.position + 1
        }, "", t) : void 0
    }, L = function () {
        var t, e;
        return (t = X.getResponseHeader("X-XHR-Redirected-To")) ? (e = D(t) === t ? document.location.hash : "", window.history.replaceState(d, "", t + e)) : void 0
    }, R = function () {
        return window.history.replaceState({
            turbolinks: !0,
            position: Date.now()
        }, "", document.location.href)
    }, O = function () {
        return d = window.history.state
    }, E = function (t) {
        return window.scrollTo(t.positionX, t.positionY)
    }, z = function () {
        return window.scrollTo(0, 0)
    }, D = function (t) {
        var e;
        return e = t, null == t.href && (e = document.createElement("A"), e.href = t), e.href.replace(e.hash, "")
    }, q = function (t) {
        var e;
        return e = document.createEvent("Events"), e.initEvent(t, !0, !0), document.dispatchEvent(e)
    }, C = function () {
        return !q("page:before-change")
    }, x = function () {
        var t, e, n, r, o, a;
        return e = function () {
            var t;
            return 400 <= (t = X.status) && 600 > t
        }, a = function () {
            return X.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
        }, r = function (t) {
            var e, n, r, o, a;
            for (o = t.head.childNodes, a = [], n = 0, r = o.length; r > n; n++) e = o[n], null != ("function" == typeof e.getAttribute ? e.getAttribute("data-turbolinks-track") : void 0) && a.push(e.src || e.href);
            return a
        }, t = function (t) {
            var e;
            return S || (S = r(document)), e = r(t), e.length !== S.length || o(e, S).length !== S.length
        }, o = function (t, e) {
            var n, r, o, a, i;
            for (t.length > e.length && (a = [e, t], t = a[0], e = a[1]), i = [], r = 0, o = t.length; o > r; r++) n = t[r], J.call(e, n) >= 0 && i.push(n);
            return i
        }, !e() && a() && (n = l(X.responseText), n && !t(n)) ? n : void 0
    }, h = function (e) {
        var n;
        return n = e.querySelector("title"), [null != n ? n.textContent : void 0, e.body, t.get(e).token, "runScripts"]
    }, t = {
        get: function (t) {
            var e;
            return null == t && (t = document), {
                node: e = t.querySelector('meta[name="csrf-token"]'),
                token: null != e ? "function" == typeof e.getAttribute ? e.getAttribute("content") : void 0 : void 0
            }
        },
        update: function (t) {
            var e;
            return e = this.get(), null != e.token && null != t && e.token !== t ? e.node.setAttribute("content", t) : void 0
        }
    }, n = function () {
        var t, e, n, r, o, a;
        e = function (t) {
            return (new DOMParser).parseFromString(t, "text/html")
        }, t = function (t) {
            var e;
            return e = document.implementation.createHTMLDocument(""), e.documentElement.innerHTML = t, e
        }, n = function (t) {
            var e;
            return e = document.implementation.createHTMLDocument(""), e.open("replace"), e.write(t), e.close(), e
        };
        try {
            if (window.DOMParser) return o = e("<html><body><p>test"), e
        } catch (i) {
            return r = i, o = t("<html><body><p>test"), t
        } finally {
            if (1 !== (null != o ? null != (a = o.body) ? a.childNodes.length : void 0 : void 0)) return n
        }
    }, _ = function (t) {
        return t.defaultPrevented ? void 0 : (document.removeEventListener("click", w, !1), document.addEventListener("click", w, !1))
    }, w = function (t) {
        var e;
        return t.defaultPrevented || (e = m(t), "A" !== e.nodeName || v(t, e)) ? void 0 : (C() || B(e.href), t.preventDefault())
    }, m = function (t) {
        var e;
        for (e = t.target; e.parentNode && "A" !== e.nodeName;) e = e.parentNode;
        return e
    }, c = function (t) {
        return location.protocol !== t.protocol || location.host !== t.host
    }, e = function (t) {
        return (t.hash && D(t)) === D(location) || t.href === location.href + "#"
    }, j = function (t) {
        var e;
        return e = D(t), e.match(/\.[a-z]+(\?.*)?$/g) && !e.match(/\.html?(\?.*)?$/g)
    }, y = function (t) {
        for (var e; !e && t !== document;) e = null != t.getAttribute("data-no-turbolink"), t = t.parentNode;
        return e
    }, K = function (t) {
        return 0 !== t.target.length
    }, $ = function (t) {
        return t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
    }, v = function (t, n) {
        return c(n) || e(n) || j(n) || y(n) || K(n) || $(t)
    }, b = function () {
        return R(), O(), l = n(), document.addEventListener("click", _, !0), window.addEventListener("popstate", function (t) {
            var e;
            return e = t.state, (null != e ? e.turbolinks : void 0) ? T[e.position] ? p(e.position) : B(t.target.location.href) : void 0
        }, !1)
    }, o = window.history && window.history.pushState && window.history.replaceState && void 0 !== window.history.state, r = !navigator.userAgent.match(/CriOS\//), M = "GET" === I || "" === I, o && r && M ? (B = function (t) {
        return A = document.location.href, a(), g(t)
    }, b()) : B = function (t) {
        return document.location.href = t
    }, this.Turbolinks = {
        visit: B,
        pagesCached: k
    }
}.call(this),
function () {
    window.analytics = function () {
        var t, e, n;
        return t = window.location.protocol + "//" + window.location.hostname + window.location.pathname + window.location.search, e = window.location.pathname, n = window.document.title, ga("send", "pageview", {
            page: e,
            title: n,
            location: t
        }), ga("userTracker.send", "pageview", {
            page: e,
            title: n,
            location: t
        }), null != window._gaq ? (_gaq.push(["_trackPageview"]), _gaq.push(["b._trackPageview"])) : null != window.pageTracker && pageTracker._trackPageview(), window.pSUPERFLY ? window.pSUPERFLY.virtualPage(window.location.pathname, window.document.title) : void 0
    }, window.rebind = function () {
        return startBlog(), startApplication()
    }, $(function () {
        return rebind()
    }), $(window).on("load", function () {}), $(document).on("page:change", function () {
        return rebind(), analytics()
    })
}.call(this);