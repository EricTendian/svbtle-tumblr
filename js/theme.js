function updateKudos() {
    $("figure.kudo").each(function () {
        var t = $(this).closest("article").attr("id"),
            e = $.jStorage.get(String(t));
        e && $(this).removeClass("able").addClass("complete")
    })
}

function getKudos() {
    var t = $("article").first().attr("id"),
        e = parseInt($("span.page.current").text());
    if (1 == $("article").length) var a = "/" + t + "/kudos";
    else var a = "/page/" + e + "/kudos";
    /*return t && $.get(a, function (t, e, a) {
        var n = a.getResponseHeader("X-SvbKey-r");
        $('meta[name="csrf-token"]').attr("content", n), $.each(t, function (t, e) {
            var a = $("#" + e.external_id).find("div.num"),
                n = a.text().replace(/,/g, ""),
                r = e.kudos;
            isNaN(n) && (n = 0), isNaN(r) && (r = 9e6), r - n >= 0 && (r = r.toString(), r = r.replace(/\B(?=(\d{3})+(?!\d))/g, ","), a.html(r))
        })
    }), !0*/
    return !0;
}

function makeBigParagraph() {
    $("article").each(function () {
        paragraph = $(this).children("p").first(), "" == $.trim(paragraph.text()) && paragraph.next("p").addClass("bigtext")
    })
}

function checkMessages() {
    var t = window.location.search;
    t.indexOf("not_found") >= 0 && (history.pushState(null, null, "/"), $('<div id ="notice"><span>:(</span><br/><br/>Not found.</div>').insertBefore("header#begin")), t.indexOf("udate") >= 0 && ($("article").css({
        opacity: .1
    }), setTimeout(function () {
        history.pushState(null, null, window.location.pathname), window.location.reload(!0)
    }, 700))
}

function bleedImages() {
    $("article img").each(function () {
        image = this, width = getImageWidth(image), width > 550 && ($(this).addClass("bleed"), paragraph = $(this).closest("p"), paragraph.addClass("bleed_image"))
    })
}

function getImageWidth(t) {
    var e = new Image;
    return e.src = (t.getAttribute ? t.getAttribute("src") : !1) || t.src, e.width
}
if (function (t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var a;
    t.rails = a = {
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
            var a = t('meta[name="csrf-token"]').attr("content");
            a && e.setRequestHeader("X-CSRF-Token", a)
        },
        fire: function (e, a, n) {
            var r = t.Event(a);
            return e.trigger(r, n), r.result !== !1
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
        handleRemote: function (n) {
            var r, i, o, s, u, l, c, d;
            if (a.fire(n, "ajax:before")) {
                if (s = n.data("cross-domain"), u = s === e ? null : s, l = n.data("with-credentials") || null, c = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    r = n.attr("method"), i = n.attr("action"), o = n.serializeArray();
                    var m = n.data("ujs:submit-button");
                    m && (o.push(m), n.data("ujs:submit-button", null))
                } else n.is(a.inputChangeSelector) ? (r = n.data("method"), i = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : n.is(a.buttonClickSelector) ? (r = n.data("method") || "get", i = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : (r = n.data("method"), i = a.href(n), o = n.data("params") || null);
                d = {
                    type: r || "GET",
                    data: o,
                    dataType: c,
                    beforeSend: function (t, r) {
                        return r.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), a.fire(n, "ajax:beforeSend", [t, r])
                    },
                    success: function (t, e, a) {
                        n.trigger("ajax:success", [t, e, a])
                    },
                    complete: function (t, e) {
                        n.trigger("ajax:complete", [t, e])
                    },
                    error: function (t, e, a) {
                        n.trigger("ajax:error", [t, e, a])
                    },
                    crossDomain: u
                }, l && (d.xhrFields = {
                    withCredentials: l
                }), i && (d.url = i);
                var f = a.ajax(d);
                return n.trigger("ajax:send", f), f
            }
            return !1
        },
        handleMethod: function (n) {
            var r = a.href(n),
                i = n.data("method"),
                o = n.attr("target"),
                s = t("meta[name=csrf-token]").attr("content"),
                u = t("meta[name=csrf-param]").attr("content"),
                l = t('<form method="post" action="' + r + '"></form>'),
                c = '<input name="_method" value="' + i + '" type="hidden" />';
            u !== e && s !== e && (c += '<input name="' + u + '" value="' + s + '" type="hidden" />'), o && l.attr("target", o), l.hide().append(c).appendTo("body"), l.submit()
        },
        disableFormElements: function (e) {
            e.find(a.disableSelector).each(function () {
                var e = t(this),
                    a = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with", e[a]()), e[a](e.data("disable-with")), e.prop("disabled", !0)
            })
        },
        enableFormElements: function (e) {
            e.find(a.enableSelector).each(function () {
                var e = t(this),
                    a = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") && e[a](e.data("ujs:enable-with")), e.prop("disabled", !1)
            })
        },
        allowAction: function (t) {
            var e, n = t.data("confirm"),
                r = !1;
            return n ? (a.fire(t, "confirm") && (r = a.confirm(n), e = a.fire(t, "confirm:complete", [r])), r && e) : !0
        },
        blankInputs: function (e, a, n) {
            var r, i, o = t(),
                s = a || "input,textarea",
                u = e.find(s);
            return u.each(function () {
                if (r = t(this), i = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !i == !n) {
                    if (r.is("input[type=radio]") && u.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
                    o = o.add(r)
                }
            }), o.length ? o : !1
        },
        nonBlankInputs: function (t, e) {
            return a.blankInputs(t, e, !0)
        },
        stopEverything: function (e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (t) {
            t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function (t) {
                return a.stopEverything(t)
            })
        },
        enableElement: function (t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, a.fire(t(document), "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, n) {
        t.crossDomain || a.CSRFProtection(n)
    }), t(document).delegate(a.linkDisableSelector, "ajax:complete", function () {
        a.enableElement(t(this))
    }), t(document).delegate(a.linkClickSelector, "click.rails", function (n) {
        var r = t(this),
            i = r.data("method"),
            o = r.data("params");
        if (!a.allowAction(r)) return a.stopEverything(n);
        if (r.is(a.linkDisableSelector) && a.disableElement(r), r.data("remote") !== e) {
            if (!(!n.metaKey && !n.ctrlKey || i && "GET" !== i || o)) return !0;
            var s = a.handleRemote(r);
            return s === !1 ? a.enableElement(r) : s.error(function () {
                a.enableElement(r)
            }), !1
        }
        return r.data("method") ? (a.handleMethod(r), !1) : void 0
    }), t(document).delegate(a.buttonClickSelector, "click.rails", function (e) {
        var n = t(this);
        return a.allowAction(n) ? (a.handleRemote(n), !1) : a.stopEverything(e)
    }), t(document).delegate(a.inputChangeSelector, "change.rails", function (e) {
        var n = t(this);
        return a.allowAction(n) ? (a.handleRemote(n), !1) : a.stopEverything(e)
    }), t(document).delegate(a.formSubmitSelector, "submit.rails", function (n) {
        var r = t(this),
            i = r.data("remote") !== e,
            o = a.blankInputs(r, a.requiredInputSelector),
            s = a.nonBlankInputs(r, a.fileInputSelector);
        if (!a.allowAction(r)) return a.stopEverything(n);
        if (o && r.attr("novalidate") == e && a.fire(r, "ajax:aborted:required", [o])) return a.stopEverything(n);
        if (i) {
            if (s) {
                setTimeout(function () {
                    a.disableFormElements(r)
                }, 13);
                var u = a.fire(r, "ajax:aborted:file", [s]);
                return u || setTimeout(function () {
                    a.enableFormElements(r)
                }, 13), u
            }
            return a.handleRemote(r), !1
        }
        setTimeout(function () {
            a.disableFormElements(r)
        }, 13)
    }), t(document).delegate(a.formInputClickSelector, "click.rails", function (e) {
        var n = t(this);
        if (!a.allowAction(n)) return a.stopEverything(e);
        var r = n.attr("name"),
            i = r ? {
                name: r,
                value: n.val()
            } : null;
        n.closest("form").data("ujs:submit-button", i)
    }), t(document).delegate(a.formSubmitSelector, "ajax:beforeSend.rails", function (e) {
        this == e.target && a.disableFormElements(t(this))
    }), t(document).delegate(a.formSubmitSelector, "ajax:complete.rails", function (e) {
        this == e.target && a.enableFormElements(t(this))
    }), t(function () {
        var e = t("meta[name=csrf-token]").attr("content"),
            a = t("meta[name=csrf-param]").attr("content");
        t('form input[name="' + a + '"]').val(e)
    }))
}(jQuery), function (t) {
    function e() {
        if (s.jStorage) try {
            o = d("" + s.jStorage)
        } catch (t) {
            s.jStorage = "{}"
        } else s.jStorage = "{}";
        l = s.jStorage ? ("" + s.jStorage).length : 0
    }

    function a() {
        try {
            s.jStorage = c(o), u && (u.setAttribute("jStorage", s.jStorage), u.save("jStorage")), l = s.jStorage ? ("" + s.jStorage).length : 0
        } catch (t) {}
    }

    function n(t) {
        if (!t || "string" != typeof t && "number" != typeof t) throw new TypeError("Key name must be string or numeric");
        if ("__jstorage_meta" == t) throw new TypeError("Reserved key name");
        return !0
    }

    function r() {
        var t, e, n, s = 1 / 0,
            u = !1;
        if (clearTimeout(i), o.__jstorage_meta && "object" == typeof o.__jstorage_meta.TTL) {
            t = +new Date, n = o.__jstorage_meta.TTL;
            for (e in n) n.hasOwnProperty(e) && (n[e] <= t ? (delete n[e], delete o[e], u = !0) : n[e] < s && (s = n[e]));
            1 / 0 != s && (i = setTimeout(r, s - t)), u && a()
        }
    }
    if (!t || !t.toJSON && !Object.toJSON && !window.JSON) throw Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    var i, o = {}, s = {
            jStorage: "{}"
        }, u = null,
        l = 0,
        c = t.toJSON || Object.toJSON || window.JSON && (JSON.encode || JSON.stringify),
        d = t.evalJSON || window.JSON && (JSON.decode || JSON.parse) || function (t) {
            return ("" + t).evalJSON()
        }, m = !1,
        f = {
            isXML: function (t) {
                return (t = (t ? t.ownerDocument || t : 0).documentElement) ? "HTML" !== t.nodeName : !1
            },
            encode: function (t) {
                if (!this.isXML(t)) return !1;
                try {
                    return (new XMLSerializer).serializeToString(t)
                } catch (e) {
                    try {
                        return t.xml
                    } catch (a) {}
                }
                return !1
            },
            decode: function (t) {
                var e = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (t) {
                        var e = new ActiveXObject("Microsoft.XMLDOM");
                        return e.async = "false", e.loadXML(t), e
                    };
                return e ? (t = e.call("DOMParser" in window && new DOMParser || window, t, "text/xml"), this.isXML(t) ? t : !1) : !1
            }
        };
    t.jStorage = {
        version: "0.1.7.0",
        set: function (t, e, r) {
            return n(t), r = r || {}, f.isXML(e) ? e = {
                _is_xml: !0,
                xml: f.encode(e)
            } : "function" == typeof e ? e = null : e && "object" == typeof e && (e = d(c(e))), o[t] = e, isNaN(r.TTL) ? a() : this.setTTL(t, r.TTL), e
        },
        get: function (t, e) {
            return n(t), t in o ? o[t] && "object" == typeof o[t] && o[t]._is_xml && o[t]._is_xml ? f.decode(o[t].xml) : o[t] : "undefined" == typeof e ? null : e
        },
        deleteKey: function (t) {
            return n(t), t in o ? (delete o[t], o.__jstorage_meta && "object" == typeof o.__jstorage_meta.TTL && t in o.__jstorage_meta.TTL && delete o.__jstorage_meta.TTL[t], a(), !0) : !1
        },
        setTTL: function (t, e) {
            var i = +new Date;
            return n(t), e = Number(e) || 0, t in o ? (o.__jstorage_meta || (o.__jstorage_meta = {}), o.__jstorage_meta.TTL || (o.__jstorage_meta.TTL = {}), e > 0 ? o.__jstorage_meta.TTL[t] = i + e : delete o.__jstorage_meta.TTL[t], a(), r(), !0) : !1
        },
        flush: function () {
            return o = {}, a(), !0
        },
        storageObj: function () {
            function t() {}
            return t.prototype = o, new t
        },
        index: function () {
            var t, e = [];
            for (t in o) o.hasOwnProperty(t) && "__jstorage_meta" != t && e.push(t);
            return e
        },
        storageSize: function () {
            return l
        },
        currentBackend: function () {
            return m
        },
        storageAvailable: function () {
            return !!m
        },
        reInit: function () {
            var t;
            if (u && u.addBehavior) {
                t = document.createElement("link"), u.parentNode.replaceChild(t, u), u = t, u.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(u), u.load("jStorage"), t = "{}";
                try {
                    t = u.getAttribute("jStorage")
                } catch (a) {}
                s.jStorage = t, m = "userDataBehavior"
            }
            e()
        }
    },
    function () {
        var t = !1;
        if ("localStorage" in window) try {
            window.localStorage.setItem("_tmptest", "tmpval"), t = !0, window.localStorage.removeItem("_tmptest")
        } catch (a) {}
        if (t) try {
            window.localStorage && (s = window.localStorage, m = "localStorage")
        } catch (n) {} else if ("globalStorage" in window) try {
            window.globalStorage && (s = window.globalStorage[window.location.hostname], m = "globalStorage")
        } catch (i) {} else {
            if (u = document.createElement("link"), !u.addBehavior) return u = null, void 0;
            u.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(u), u.load("jStorage"), t = "{}";
            try {
                t = u.getAttribute("jStorage")
            } catch (o) {}
            s.jStorage = t, m = "userDataBehavior"
        }
        e(), r()
    }()
}(window.$ || window.jQuery), jQuery(window).load(function () {
    bleedImages()
}), $(function () {
    function t() {
        postop = $(window).scrollTop(), postop > 280 ? $("figure.kudo").addClass("bottom") : $("figure.kudo").removeClass("bottom")
    }

    function e() {
        /*$("code").addClass("prettyprint"), $.getScript("http://static.tumblr.com/rb82j8l/TYkmow1oc/prettify.js").done(function () {
            var t = "http://static.tumblr.com/rb82j8l/u6Ymow1nt/prettify.css";
            $.get(t, function (t) {
                $('<style type="text/css"></style>').html(t).appendTo("head")
            }), prettyPrint()
        })*/
    }

    function a() {
        $.getScript("//platform.twitter.com/widgets.js")
    }

    function n(t) {
        t.addClass("activated"), t.find(".num").hide(), t.find(".txt").html("Click circle");
    }

    function r(t) {
        var e = t.closest("article").attr("data-id"),
            a = t.closest("article").attr("data-reblog").slice(-8);
        $("#kudos").attr('src', "http://www.tumblr.com/like/" + a + "?id=" + e);
        $.jStorage.set(String(e), !0);
        var n = parseInt(t.find("div.num").text().replace(/,/g, "")) + 1;
        t.find("div.num").text(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
    var i;
    if (checkMessages(), updateKudos(), t(), makeBigParagraph(), $("section.post_single").length > 0) {
        var o = !1;
        $(window).scroll(function () {
            o && clearTimeout(o), o = setTimeout(t, 100)
        })
    }
    $("code, pre").length > 0 && e(), $(".twitter-tweet").length > 0 && a(), $("figure.kudo a").on({
        click: function (t) {
            return t.preventDefault(), !1
        },
        mouseenter: function () {
            kudo = $(this).parent();
            if (kudo.find(".like_button").is(".liked")) {
                kudo.removeClass("able").addClass("complete");
                kudo.find("div.liked").remove();
            } else kudo.is(".able") && n(kudo);
        },
        mouseleave: function () {
            kudo = $(this).parent();
            if (kudo.find(".like_button").is(".liked")) {
                var n = parseInt(kudo.find("div.num").text().replace(/,/g, "")) + 1;
                kudo.find("div.num").text(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                kudo.find("div.liked").remove();
                kudo.find(".txt").fadeOut(), kudo.addClass("complete"), setTimeout(function () {
                    kudo.removeClass("activated").removeClass("able"), kudo.find(".num").fadeIn(), kudo.find(".txt").html("Notes").fadeIn()
                }, 600)
            } else {
                kudo.find(".num").show(), kudo.find(".txt").html("Notes"), kudo.removeClass("activated"), clearTimeout(i)
            }
        }
    }), $("figure.kudo a").on("touchstart", function (t) {
        kudo = $(this).parent();
        if (kudo.find(".like_button").is(".liked")) {
            kudo.removeClass("able").addClass("complete");
            kudo.find("div.liked").remove();
        } else kudo.is(".able") && n(kudo);
        t.preventDefault();
        return !1;
    }), $("figure.kudo a").on("touchend", function (t) {
        kudo = $(this).parent();
        if (kudo.find(".like_button").is(".liked")) {
            var n = parseInt(kudo.find("div.num").text().replace(/,/g, "")) + 1;
            kudo.find("div.num").text(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            kudo.find("div.liked").remove();
            kudo.find(".txt").fadeOut(), kudo.addClass("complete"), setTimeout(function () {
                kudo.removeClass("activated").removeClass("able"), kudo.find(".num").fadeIn(), kudo.find(".txt").html("Notes").fadeIn()
            }, 600)
        } else {
            kudo.find(".num").show(), kudo.find(".txt").html("Notes"), kudo.removeClass("activated"), clearTimeout(i)
        }
        t.preventDefault();
        return !1;
    })
}), function () {
    function t() {}

    function e(t) {
        this.path = t, this.at_2x_path = t.replace("_small", function (t) {
            return t ? "_retina" : t
        })
    }

    function a(t) {
        this.el = t, this.path = new e(this.el.getAttribute("src"));
        var a = this;
        this.path.check_2x_variant(function (t) {
            t && a.swap()
        })
    }
    var n = "undefined" == typeof exports ? window : exports;
    n.Retina = t, t.init = function (t) {
        null == t && (t = n);
        var e = t.onload || new Function;
        t.onload = function () {
            var t, n, r = $("article img"),
                i = [];
            for (t = 0; t < r.length; t++) n = r[t], i.push(new a(n));
            e()
        }
    }, t.isRetina = function () {
        var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
        return n.devicePixelRatio > 1 ? !0 : n.matchMedia && n.matchMedia(t).matches ? !0 : !1
    }, n.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.at_2x_path_loads = function (t) {
        var e = new Image;
        e.onload = function () {
            return t(!0)
        }, e.onerror = function () {
            return t(!1)
        }, e.src = this.at_2x_path
    }, e.prototype.check_2x_variant = function (t) {
        var a = this;
        return -1 != e.confirmed_paths.indexOf(this.at_2x_path) ? t(!0) : (this.at_2x_path_loads(function (n) {
            return n && e.confirmed_paths.push(a.at_2x_path), t(n)
        }), void 0)
    }, n.RetinaImage = a, a.prototype.swap = function (t) {
        function e() {
            a.el.complete ? a.el.setAttribute("src", t) : setTimeout(e, 5)
        }
        "undefined" == typeof t && (t = this.path.at_2x_path);
        var a = this;
        e()
    }, t.isRetina() && t.init(n)
}(), $.ajaxSetup({
    beforeSend: function (t) {
        t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
    }
}), navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta && (viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0", document.body.addEventListener("touchstart", function () {
        viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
    }, !1))
}