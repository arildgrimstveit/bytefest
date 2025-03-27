import Ar from "react";
import _r from "react-dom";
var xe = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt = Ar, Or = _r;
function g(n) {
  var l = "https://react.dev/errors/" + n;
  if (1 < arguments.length) {
    l += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var e = 2; e < arguments.length; e++)
      l += "&args[]=" + encodeURIComponent(arguments[e]);
  }
  return "Minified React error #" + n + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var mt = Symbol.for("react.transitional.element"), qt = Symbol.for("react.portal"), pt = Symbol.for("react.fragment"), jt = Symbol.for("react.strict_mode"), $t = Symbol.for("react.profiler"), kr = Symbol.for("react.provider"), nr = Symbol.for("react.consumer"), Ul = Symbol.for("react.context"), Ce = Symbol.for("react.forward_ref"), Yl = Symbol.for("react.suspense"), Fe = Symbol.for("react.suspense_list"), Pe = Symbol.for("react.memo"), Gl = Symbol.for("react.lazy"), Mr = Symbol.for("react.scope"), Sr = Symbol.for("react.debug_trace_mode"), Ir = Symbol.for("react.offscreen"), Dr = Symbol.for("react.legacy_hidden"), Lr = Symbol.for("react.memo_cache_sentinel"), Tt = Symbol.iterator, se = Array.isArray;
function Rt(n, l) {
  var e = n.length & 3, t = n.length - e, r = l;
  for (l = 0; l < t; ) {
    var i = n.charCodeAt(l) & 255 | (n.charCodeAt(++l) & 255) << 8 | (n.charCodeAt(++l) & 255) << 16 | (n.charCodeAt(++l) & 255) << 24;
    ++l, i = 3432918353 * (i & 65535) + ((3432918353 * (i >>> 16) & 65535) << 16) & 4294967295, i = i << 15 | i >>> 17, i = 461845907 * (i & 65535) + ((461845907 * (i >>> 16) & 65535) << 16) & 4294967295, r ^= i, r = r << 13 | r >>> 19, r = 5 * (r & 65535) + ((5 * (r >>> 16) & 65535) << 16) & 4294967295, r = (r & 65535) + 27492 + (((r >>> 16) + 58964 & 65535) << 16);
  }
  switch (i = 0, e) {
    case 3:
      i ^= (n.charCodeAt(l + 2) & 255) << 16;
    case 2:
      i ^= (n.charCodeAt(l + 1) & 255) << 8;
    case 1:
      i ^= n.charCodeAt(l) & 255, i = 3432918353 * (i & 65535) + ((3432918353 * (i >>> 16) & 65535) << 16) & 4294967295, i = i << 15 | i >>> 17, r ^= 461845907 * (i & 65535) + ((461845907 * (i >>> 16) & 65535) << 16) & 4294967295;
  }
  return r ^= n.length, r ^= r >>> 16, r = 2246822507 * (r & 65535) + ((2246822507 * (r >>> 16) & 65535) << 16) & 4294967295, r ^= r >>> 13, r = 3266489909 * (r & 65535) + ((3266489909 * (r >>> 16) & 65535) << 16) & 4294967295, (r ^ r >>> 16) >>> 0;
}
var N = Object.assign, A = Object.prototype.hasOwnProperty, zr = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), xt = {}, Ct = {};
function Ae(n) {
  return A.call(Ct, n) ? !0 : A.call(xt, n) ? !1 : zr.test(n) ? Ct[n] = !0 : (xt[n] = !0, !1);
}
var Br = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
), Hr = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), Nr = /["'&<>]/;
function y(n) {
  if (typeof n == "boolean" || typeof n == "number" || typeof n == "bigint")
    return "" + n;
  n = "" + n;
  var l = Nr.exec(n);
  if (l) {
    var e = "", t, r = 0;
    for (t = l.index; t < n.length; t++) {
      switch (n.charCodeAt(t)) {
        case 34:
          l = "&quot;";
          break;
        case 38:
          l = "&amp;";
          break;
        case 39:
          l = "&#x27;";
          break;
        case 60:
          l = "&lt;";
          break;
        case 62:
          l = "&gt;";
          break;
        default:
          continue;
      }
      r !== t && (e += n.slice(r, t)), r = t + 1, e += l;
    }
    n = r !== t ? e + n.slice(r, t) : e;
  }
  return n;
}
var Wr = /([A-Z])/g, Ur = /^ms-/, Yr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function nl(n) {
  return Yr.test("" + n) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : n;
}
var An = Vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, lr = Or.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Gr = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, $ = lr.d;
lr.d = {
  f: $.f,
  r: $.r,
  D: ai,
  C: ui,
  L: fi,
  m: ci,
  X: oi,
  S: hi,
  M: si
};
var Y = [], er = /(<\/|<)(s)(cript)/gi;
function tr(n, l, e, t) {
  return "" + l + (e === "s" ? "\\u0073" : "\\u0053") + t;
}
function Xr(n, l, e, t, r) {
  return {
    idPrefix: n === void 0 ? "" : n,
    nextFormID: 0,
    streamingFormat: 0,
    bootstrapScriptContent: e,
    bootstrapScripts: t,
    bootstrapModules: r,
    instructions: 0,
    hasBody: !1,
    hasHtml: !1,
    unknownResources: {},
    dnsResources: {},
    connectResources: { default: {}, anonymous: {}, credentials: {} },
    imageResources: {},
    styleResources: {},
    scriptResources: {},
    moduleUnknownResources: {},
    moduleScriptResources: {}
  };
}
function H(n, l, e) {
  return {
    insertionMode: n,
    selectedValue: l,
    tagScope: e
  };
}
function Ft(n, l, e) {
  switch (l) {
    case "noscript":
      return H(2, null, n.tagScope | 1);
    case "select":
      return H(
        2,
        e.value != null ? e.value : e.defaultValue,
        n.tagScope
      );
    case "svg":
      return H(3, null, n.tagScope);
    case "picture":
      return H(2, null, n.tagScope | 2);
    case "math":
      return H(4, null, n.tagScope);
    case "foreignObject":
      return H(2, null, n.tagScope);
    case "table":
      return H(5, null, n.tagScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return H(6, null, n.tagScope);
    case "colgroup":
      return H(8, null, n.tagScope);
    case "tr":
      return H(7, null, n.tagScope);
  }
  return 5 <= n.insertionMode ? H(2, null, n.tagScope) : n.insertionMode === 0 ? H(l === "html" ? 1 : 2, null, n.tagScope) : n.insertionMode === 1 ? H(2, null, n.tagScope) : n;
}
var Pt = /* @__PURE__ */ new Map();
function rr(n, l) {
  if (typeof l != "object") throw Error(g(62));
  var e = !0, t;
  for (t in l)
    if (A.call(l, t)) {
      var r = l[t];
      if (r != null && typeof r != "boolean" && r !== "") {
        if (t.indexOf("--") === 0) {
          var i = y(t);
          r = y(("" + r).trim());
        } else
          i = Pt.get(t), i === void 0 && (i = y(
            t.replace(Wr, "-$1").toLowerCase().replace(Ur, "-ms-")
          ), Pt.set(t, i)), r = typeof r == "number" ? r === 0 || Br.has(t) ? "" + r : r + "px" : y(("" + r).trim());
        e ? (e = !1, n.push(' style="', i, ":", r)) : n.push(";", i, ":", r);
      }
    }
  e || n.push('"');
}
function de(n, l, e) {
  e && typeof e != "function" && typeof e != "symbol" && n.push(" ", l, '=""');
}
function L(n, l, e) {
  typeof e != "function" && typeof e != "symbol" && typeof e != "boolean" && n.push(" ", l, '="', y(e), '"');
}
var ir = y(
  "javascript:throw new Error('React form unexpectedly submitted.')"
);
function fe(n, l) {
  this.push('<input type="hidden"'), ar(n), L(this, "name", l), L(this, "value", n), this.push("/>");
}
function ar(n) {
  if (typeof n != "string") throw Error(g(480));
}
function ur(n, l) {
  if (typeof l.$$FORM_ACTION == "function") {
    var e = n.nextFormID++;
    n = n.idPrefix + e;
    try {
      var t = l.$$FORM_ACTION(n);
      if (t) {
        var r = t.data;
        r != null && r.forEach(ar);
      }
      return t;
    } catch (i) {
      if (typeof i == "object" && i !== null && typeof i.then == "function")
        throw i;
    }
  }
  return null;
}
function At(n, l, e, t, r, i, a, u) {
  var f = null;
  if (typeof t == "function") {
    var c = ur(l, t);
    c !== null ? (u = c.name, t = c.action || "", r = c.encType, i = c.method, a = c.target, f = c.data) : (n.push(" ", "formAction", '="', ir, '"'), a = i = r = t = u = null, fr(l, e));
  }
  return u != null && T(n, "name", u), t != null && T(n, "formAction", t), r != null && T(n, "formEncType", r), i != null && T(n, "formMethod", i), a != null && T(n, "formTarget", a), f;
}
function T(n, l, e) {
  switch (l) {
    case "className":
      L(n, "class", e);
      break;
    case "tabIndex":
      L(n, "tabindex", e);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      L(n, l, e);
      break;
    case "style":
      rr(n, e);
      break;
    case "src":
    case "href":
      if (e === "") break;
    case "action":
    case "formAction":
      if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean")
        break;
      e = nl("" + e), n.push(" ", l, '="', y(e), '"');
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "ref":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      de(n, l.toLowerCase(), e);
      break;
    case "xlinkHref":
      if (typeof e == "function" || typeof e == "symbol" || typeof e == "boolean")
        break;
      e = nl("" + e), n.push(" ", "xlink:href", '="', y(e), '"');
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      typeof e != "function" && typeof e != "symbol" && n.push(" ", l, '="', y(e), '"');
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      e && typeof e != "function" && typeof e != "symbol" && n.push(" ", l, '=""');
      break;
    case "capture":
    case "download":
      e === !0 ? n.push(" ", l, '=""') : e !== !1 && typeof e != "function" && typeof e != "symbol" && n.push(" ", l, '="', y(e), '"');
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e && n.push(" ", l, '="', y(e), '"');
      break;
    case "rowSpan":
    case "start":
      typeof e == "function" || typeof e == "symbol" || isNaN(e) || n.push(" ", l, '="', y(e), '"');
      break;
    case "xlinkActuate":
      L(n, "xlink:actuate", e);
      break;
    case "xlinkArcrole":
      L(n, "xlink:arcrole", e);
      break;
    case "xlinkRole":
      L(n, "xlink:role", e);
      break;
    case "xlinkShow":
      L(n, "xlink:show", e);
      break;
    case "xlinkTitle":
      L(n, "xlink:title", e);
      break;
    case "xlinkType":
      L(n, "xlink:type", e);
      break;
    case "xmlBase":
      L(n, "xml:base", e);
      break;
    case "xmlLang":
      L(n, "xml:lang", e);
      break;
    case "xmlSpace":
      L(n, "xml:space", e);
      break;
    default:
      if ((!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Hr.get(l) || l, Ae(l))) {
        switch (typeof e) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            var t = l.toLowerCase().slice(0, 5);
            if (t !== "data-" && t !== "aria-") return;
        }
        n.push(" ", l, '="', y(e), '"');
      }
  }
}
function U(n, l, e) {
  if (l != null) {
    if (e != null) throw Error(g(60));
    if (typeof l != "object" || !("__html" in l))
      throw Error(g(61));
    l = l.__html, l != null && n.push("" + l);
  }
}
function Zr(n) {
  var l = "";
  return Vt.Children.forEach(n, function(e) {
    e != null && (l += e);
  }), l;
}
function fr(n, l) {
  (n.instructions & 16) === 0 && (n.instructions |= 16, l.bootstrapChunks.unshift(
    l.startInlineScript,
    `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
    "<\/script>"
  ));
}
function z(n, l) {
  n.push(O("link"));
  for (var e in l)
    if (A.call(l, e)) {
      var t = l[e];
      if (t != null)
        switch (e) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(g(399, "link"));
          default:
            T(n, e, t);
        }
    }
  return n.push("/>"), null;
}
var _t = /(<\/|<)(s)(tyle)/gi;
function Ot(n, l, e, t) {
  return "" + l + (e === "s" ? "\\73 " : "\\53 ") + t;
}
function _n(n, l, e) {
  n.push(O(e));
  for (var t in l)
    if (A.call(l, t)) {
      var r = l[t];
      if (r != null)
        switch (t) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(g(399, e));
          default:
            T(n, t, r);
        }
    }
  return n.push("/>"), null;
}
function kt(n, l) {
  n.push(O("title"));
  var e = null, t = null, r;
  for (r in l)
    if (A.call(l, r)) {
      var i = l[r];
      if (i != null)
        switch (r) {
          case "children":
            e = i;
            break;
          case "dangerouslySetInnerHTML":
            t = i;
            break;
          default:
            T(n, r, i);
        }
    }
  return n.push(">"), l = Array.isArray(e) ? 2 > e.length ? e[0] : null : e, typeof l != "function" && typeof l != "symbol" && l !== null && l !== void 0 && n.push(y("" + l)), U(n, t, e), n.push(yn("title")), null;
}
function kl(n, l) {
  n.push(O("script"));
  var e = null, t = null, r;
  for (r in l)
    if (A.call(l, r)) {
      var i = l[r];
      if (i != null)
        switch (r) {
          case "children":
            e = i;
            break;
          case "dangerouslySetInnerHTML":
            t = i;
            break;
          default:
            T(n, r, i);
        }
    }
  return n.push(">"), U(n, t, e), typeof e == "string" && n.push(("" + e).replace(er, tr)), n.push(yn("script")), null;
}
function qn(n, l, e) {
  n.push(O(e));
  var t = e = null, r;
  for (r in l)
    if (A.call(l, r)) {
      var i = l[r];
      if (i != null)
        switch (r) {
          case "children":
            e = i;
            break;
          case "dangerouslySetInnerHTML":
            t = i;
            break;
          default:
            T(n, r, i);
        }
    }
  return n.push(">"), U(n, t, e), typeof e == "string" ? (n.push(y(e)), null) : e;
}
var Jr = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Mt = /* @__PURE__ */ new Map();
function O(n) {
  var l = Mt.get(n);
  if (l === void 0) {
    if (!Jr.test(n))
      throw Error(g(65, n));
    l = "<" + n, Mt.set(n, l);
  }
  return l;
}
function Qr(n, l, e, t, r, i, a, u, f) {
  switch (l) {
    case "div":
    case "span":
    case "svg":
    case "path":
      break;
    case "a":
      n.push(O("a"));
      var c = null, o = null, h;
      for (h in e)
        if (A.call(e, h)) {
          var s = e[h];
          if (s != null)
            switch (h) {
              case "children":
                c = s;
                break;
              case "dangerouslySetInnerHTML":
                o = s;
                break;
              case "href":
                s === "" ? L(n, "href", "") : T(n, h, s);
                break;
              default:
                T(n, h, s);
            }
        }
      if (n.push(">"), U(n, o, c), typeof c == "string") {
        n.push(y(c));
        var b = null;
      } else b = c;
      return b;
    case "g":
    case "p":
    case "li":
      break;
    case "select":
      n.push(O("select"));
      var d = null, v = null, F;
      for (F in e)
        if (A.call(e, F)) {
          var E = e[F];
          if (E != null)
            switch (F) {
              case "children":
                d = E;
                break;
              case "dangerouslySetInnerHTML":
                v = E;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                T(
                  n,
                  F,
                  E
                );
            }
        }
      return n.push(">"), U(n, v, d), d;
    case "option":
      var P = a.selectedValue;
      n.push(O("option"));
      var w = null, R = null, x = null, B = null, V;
      for (V in e)
        if (A.call(e, V)) {
          var m = e[V];
          if (m != null)
            switch (V) {
              case "children":
                w = m;
                break;
              case "selected":
                x = m;
                break;
              case "dangerouslySetInnerHTML":
                B = m;
                break;
              case "value":
                R = m;
              default:
                T(
                  n,
                  V,
                  m
                );
            }
        }
      if (P != null) {
        var _ = R !== null ? "" + R : Zr(w);
        if (se(P)) {
          for (var k = 0; k < P.length; k++)
            if ("" + P[k] === _) {
              n.push(' selected=""');
              break;
            }
        } else
          "" + P === _ && n.push(' selected=""');
      } else x && n.push(' selected=""');
      return n.push(">"), U(n, B, w), w;
    case "textarea":
      n.push(O("textarea"));
      var M = null, fn = null, X = null, ln;
      for (ln in e)
        if (A.call(e, ln)) {
          var q = e[ln];
          if (q != null)
            switch (ln) {
              case "children":
                X = q;
                break;
              case "value":
                M = q;
                break;
              case "defaultValue":
                fn = q;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(g(91));
              default:
                T(
                  n,
                  ln,
                  q
                );
            }
        }
      if (M === null && fn !== null && (M = fn), n.push(">"), X != null) {
        if (M != null) throw Error(g(92));
        if (se(X)) {
          if (1 < X.length)
            throw Error(g(93));
          M = "" + X[0];
        }
        M = "" + X;
      }
      return typeof M == "string" && M[0] === `
` && n.push(`
`), M !== null && n.push(y("" + M)), null;
    case "input":
      n.push(O("input"));
      var Ne = null, We = null, Ue = null, Ye = null, Ge = null, Kl = null, Vl = null, ml = null, ql = null, In;
      for (In in e)
        if (A.call(e, In)) {
          var Z = e[In];
          if (Z != null)
            switch (In) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(399, "input"));
              case "name":
                Ne = Z;
                break;
              case "formAction":
                We = Z;
                break;
              case "formEncType":
                Ue = Z;
                break;
              case "formMethod":
                Ye = Z;
                break;
              case "formTarget":
                Ge = Z;
                break;
              case "defaultChecked":
                ql = Z;
                break;
              case "defaultValue":
                Vl = Z;
                break;
              case "checked":
                ml = Z;
                break;
              case "value":
                Kl = Z;
                break;
              default:
                T(
                  n,
                  In,
                  Z
                );
            }
        }
      var Xe = At(
        n,
        t,
        r,
        We,
        Ue,
        Ye,
        Ge,
        Ne
      );
      return ml !== null ? de(n, "checked", ml) : ql !== null && de(n, "checked", ql), Kl !== null ? T(n, "value", Kl) : Vl !== null && T(n, "value", Vl), n.push("/>"), Xe != null && Xe.forEach(fe, n), null;
    case "button":
      n.push(O("button"));
      var Dn = null, Ze = null, Je = null, Qe = null, Ke = null, Ve = null, me = null, Ln;
      for (Ln in e)
        if (A.call(e, Ln)) {
          var p = e[Ln];
          if (p != null)
            switch (Ln) {
              case "children":
                Dn = p;
                break;
              case "dangerouslySetInnerHTML":
                Ze = p;
                break;
              case "name":
                Je = p;
                break;
              case "formAction":
                Qe = p;
                break;
              case "formEncType":
                Ke = p;
                break;
              case "formMethod":
                Ve = p;
                break;
              case "formTarget":
                me = p;
                break;
              default:
                T(
                  n,
                  Ln,
                  p
                );
            }
        }
      var qe = At(
        n,
        t,
        r,
        Qe,
        Ke,
        Ve,
        me,
        Je
      );
      if (n.push(">"), qe != null && qe.forEach(fe, n), U(n, Ze, Dn), typeof Dn == "string") {
        n.push(y(Dn));
        var pe = null;
      } else pe = Dn;
      return pe;
    case "form":
      n.push(O("form"));
      var zn = null, je = null, cn = null, Bn = null, Hn = null, Nn = null, Wn;
      for (Wn in e)
        if (A.call(e, Wn)) {
          var en = e[Wn];
          if (en != null)
            switch (Wn) {
              case "children":
                zn = en;
                break;
              case "dangerouslySetInnerHTML":
                je = en;
                break;
              case "action":
                cn = en;
                break;
              case "encType":
                Bn = en;
                break;
              case "method":
                Hn = en;
                break;
              case "target":
                Nn = en;
                break;
              default:
                T(
                  n,
                  Wn,
                  en
                );
            }
        }
      var pl = null, jl = null;
      if (typeof cn == "function") {
        var hn = ur(
          t,
          cn
        );
        hn !== null ? (cn = hn.action || "", Bn = hn.encType, Hn = hn.method, Nn = hn.target, pl = hn.data, jl = hn.name) : (n.push(
          " ",
          "action",
          '="',
          ir,
          '"'
        ), Nn = Hn = Bn = cn = null, fr(t, r));
      }
      if (cn != null && T(n, "action", cn), Bn != null && T(n, "encType", Bn), Hn != null && T(n, "method", Hn), Nn != null && T(n, "target", Nn), n.push(">"), jl !== null && (n.push('<input type="hidden"'), L(n, "name", jl), n.push("/>"), pl != null && pl.forEach(fe, n)), U(n, je, zn), typeof zn == "string") {
        n.push(y(zn));
        var $e = null;
      } else $e = zn;
      return $e;
    case "menuitem":
      n.push(O("menuitem"));
      for (var ol in e)
        if (A.call(e, ol)) {
          var nt = e[ol];
          if (nt != null)
            switch (ol) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(400));
              default:
                T(
                  n,
                  ol,
                  nt
                );
            }
        }
      return n.push(">"), null;
    case "object":
      n.push(O("object"));
      var Un = null, lt = null, Yn;
      for (Yn in e)
        if (A.call(e, Yn)) {
          var Gn = e[Yn];
          if (Gn != null)
            switch (Yn) {
              case "children":
                Un = Gn;
                break;
              case "dangerouslySetInnerHTML":
                lt = Gn;
                break;
              case "data":
                var et = nl("" + Gn);
                if (et === "") break;
                n.push(
                  " ",
                  "data",
                  '="',
                  y(et),
                  '"'
                );
                break;
              default:
                T(
                  n,
                  Yn,
                  Gn
                );
            }
        }
      if (n.push(">"), U(n, lt, Un), typeof Un == "string") {
        n.push(y(Un));
        var tt = null;
      } else tt = Un;
      return tt;
    case "title":
      if (a.insertionMode === 3 || a.tagScope & 1 || e.itemProp != null)
        var $l = kt(
          n,
          e
        );
      else
        f ? $l = null : (kt(r.hoistableChunks, e), $l = void 0);
      return $l;
    case "link":
      var Pr = e.rel, tn = e.href, sl = e.precedence;
      if (a.insertionMode === 3 || a.tagScope & 1 || e.itemProp != null || typeof Pr != "string" || typeof tn != "string" || tn === "") {
        z(n, e);
        var Xn = null;
      } else if (e.rel === "stylesheet")
        if (typeof sl != "string" || e.disabled != null || e.onLoad || e.onError)
          Xn = z(
            n,
            e
          );
        else {
          var Rn = r.styles.get(sl), dl = t.styleResources.hasOwnProperty(tn) ? t.styleResources[tn] : void 0;
          if (dl !== null) {
            t.styleResources[tn] = null, Rn || (Rn = {
              precedence: y(sl),
              rules: [],
              hrefs: [],
              sheets: /* @__PURE__ */ new Map()
            }, r.styles.set(sl, Rn));
            var gl = {
              state: 0,
              props: N({}, e, {
                "data-precedence": e.precedence,
                precedence: null
              })
            };
            if (dl) {
              dl.length === 2 && ll(gl.props, dl);
              var ne = r.preloads.stylesheets.get(tn);
              ne && 0 < ne.length ? ne.length = 0 : gl.state = 1;
            }
            Rn.sheets.set(tn, gl), i && i.stylesheets.add(gl);
          } else if (Rn) {
            var rt = Rn.sheets.get(tn);
            rt && i && i.stylesheets.add(rt);
          }
          u && n.push("<!-- -->"), Xn = null;
        }
      else
        e.onLoad || e.onError ? Xn = z(
          n,
          e
        ) : (u && n.push("<!-- -->"), Xn = f ? null : z(r.hoistableChunks, e));
      return Xn;
    case "script":
      var le = e.async;
      if (typeof e.src != "string" || !e.src || !le || typeof le == "function" || typeof le == "symbol" || e.onLoad || e.onError || a.insertionMode === 3 || a.tagScope & 1 || e.itemProp != null)
        var it = kl(
          n,
          e
        );
      else {
        var vl = e.src;
        if (e.type === "module")
          var bl = t.moduleScriptResources, at = r.preloads.moduleScripts;
        else
          bl = t.scriptResources, at = r.preloads.scripts;
        var yl = bl.hasOwnProperty(vl) ? bl[vl] : void 0;
        if (yl !== null) {
          bl[vl] = null;
          var ee = e;
          if (yl) {
            yl.length === 2 && (ee = N({}, e), ll(ee, yl));
            var ut = at.get(vl);
            ut && (ut.length = 0);
          }
          var ft = [];
          r.scripts.add(ft), kl(ft, ee);
        }
        u && n.push("<!-- -->"), it = null;
      }
      return it;
    case "style":
      var El = e.precedence, on = e.href;
      if (a.insertionMode === 3 || a.tagScope & 1 || e.itemProp != null || typeof El != "string" || typeof on != "string" || on === "") {
        n.push(O("style"));
        var xn = null, ct = null, Zn;
        for (Zn in e)
          if (A.call(e, Zn)) {
            var wl = e[Zn];
            if (wl != null)
              switch (Zn) {
                case "children":
                  xn = wl;
                  break;
                case "dangerouslySetInnerHTML":
                  ct = wl;
                  break;
                default:
                  T(
                    n,
                    Zn,
                    wl
                  );
              }
          }
        n.push(">");
        var Jn = Array.isArray(xn) ? 2 > xn.length ? xn[0] : null : xn;
        typeof Jn != "function" && typeof Jn != "symbol" && Jn !== null && Jn !== void 0 && n.push(("" + Jn).replace(_t, Ot)), U(n, ct, xn), n.push(yn("style"));
        var ht = null;
      } else {
        var sn = r.styles.get(El);
        if ((t.styleResources.hasOwnProperty(on) ? t.styleResources[on] : void 0) !== null) {
          t.styleResources[on] = null, sn ? sn.hrefs.push(
            y(on)
          ) : (sn = {
            precedence: y(El),
            rules: [],
            hrefs: [y(on)],
            sheets: /* @__PURE__ */ new Map()
          }, r.styles.set(El, sn));
          var ot = sn.rules, Cn = null, st = null, Tl;
          for (Tl in e)
            if (A.call(e, Tl)) {
              var te = e[Tl];
              if (te != null)
                switch (Tl) {
                  case "children":
                    Cn = te;
                    break;
                  case "dangerouslySetInnerHTML":
                    st = te;
                }
            }
          var Qn = Array.isArray(Cn) ? 2 > Cn.length ? Cn[0] : null : Cn;
          typeof Qn != "function" && typeof Qn != "symbol" && Qn !== null && Qn !== void 0 && ot.push(
            ("" + Qn).replace(_t, Ot)
          ), U(ot, st, Cn);
        }
        sn && i && i.styles.add(sn), u && n.push("<!-- -->"), ht = void 0;
      }
      return ht;
    case "meta":
      if (a.insertionMode === 3 || a.tagScope & 1 || e.itemProp != null)
        var dt = _n(
          n,
          e,
          "meta"
        );
      else
        u && n.push("<!-- -->"), dt = f ? null : typeof e.charSet == "string" ? _n(r.charsetChunks, e, "meta") : e.name === "viewport" ? _n(r.viewportChunks, e, "meta") : _n(r.hoistableChunks, e, "meta");
      return dt;
    case "listing":
    case "pre":
      n.push(O(l));
      var Kn = null, Vn = null, mn;
      for (mn in e)
        if (A.call(e, mn)) {
          var Rl = e[mn];
          if (Rl != null)
            switch (mn) {
              case "children":
                Kn = Rl;
                break;
              case "dangerouslySetInnerHTML":
                Vn = Rl;
                break;
              default:
                T(
                  n,
                  mn,
                  Rl
                );
            }
        }
      if (n.push(">"), Vn != null) {
        if (Kn != null) throw Error(g(60));
        if (typeof Vn != "object" || !("__html" in Vn))
          throw Error(g(61));
        var dn = Vn.__html;
        dn != null && (typeof dn == "string" && 0 < dn.length && dn[0] === `
` ? n.push(`
`, dn) : n.push("" + dn));
      }
      return typeof Kn == "string" && Kn[0] === `
` && n.push(`
`), Kn;
    case "img":
      var D = e.src, S = e.srcSet;
      if (!(e.loading === "lazy" || !D && !S || typeof D != "string" && D != null || typeof S != "string" && S != null) && e.fetchPriority !== "low" && !(a.tagScope & 3) && (typeof D != "string" || D[4] !== ":" || D[0] !== "d" && D[0] !== "D" || D[1] !== "a" && D[1] !== "A" || D[2] !== "t" && D[2] !== "T" || D[3] !== "a" && D[3] !== "A") && (typeof S != "string" || S[4] !== ":" || S[0] !== "d" && S[0] !== "D" || S[1] !== "a" && S[1] !== "A" || S[2] !== "t" && S[2] !== "T" || S[3] !== "a" && S[3] !== "A")) {
        var gt = typeof e.sizes == "string" ? e.sizes : void 0, Fn = S ? S + `
` + (gt || "") : D, re = r.preloads.images, gn = re.get(Fn);
        if (gn)
          (e.fetchPriority === "high" || 10 > r.highImagePreloads.size) && (re.delete(Fn), r.highImagePreloads.add(gn));
        else if (!t.imageResources.hasOwnProperty(Fn)) {
          t.imageResources[Fn] = Y;
          var ie = e.crossOrigin, vt = typeof ie == "string" ? ie === "use-credentials" ? ie : "" : void 0, vn = r.headers, ae;
          vn && 0 < vn.remainingCapacity && (e.fetchPriority === "high" || 500 > vn.highImagePreloads.length) && (ae = Sl(D, "image", {
            imageSrcSet: e.srcSet,
            imageSizes: e.sizes,
            crossOrigin: vt,
            integrity: e.integrity,
            nonce: e.nonce,
            type: e.type,
            fetchPriority: e.fetchPriority,
            referrerPolicy: e.refererPolicy
          }), 0 <= (vn.remainingCapacity -= ae.length + 2)) ? (r.resets.image[Fn] = Y, vn.highImagePreloads && (vn.highImagePreloads += ", "), vn.highImagePreloads += ae) : (gn = [], z(gn, {
            rel: "preload",
            as: "image",
            href: S ? void 0 : D,
            imageSrcSet: S,
            imageSizes: gt,
            crossOrigin: vt,
            integrity: e.integrity,
            type: e.type,
            fetchPriority: e.fetchPriority,
            referrerPolicy: e.referrerPolicy
          }), e.fetchPriority === "high" || 10 > r.highImagePreloads.size ? r.highImagePreloads.add(gn) : (r.bulkPreloads.add(gn), re.set(Fn, gn)));
        }
      }
      return _n(n, e, "img");
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return _n(n, e, l);
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "head":
      if (2 > a.insertionMode && r.headChunks === null) {
        r.headChunks = [];
        var bt = qn(
          r.headChunks,
          e,
          "head"
        );
      } else
        bt = qn(
          n,
          e,
          "head"
        );
      return bt;
    case "html":
      if (a.insertionMode === 0 && r.htmlChunks === null) {
        r.htmlChunks = [""];
        var yt = qn(
          r.htmlChunks,
          e,
          "html"
        );
      } else
        yt = qn(
          n,
          e,
          "html"
        );
      return yt;
    default:
      if (l.indexOf("-") !== -1) {
        n.push(O(l));
        var ue = null, Et = null, Pn;
        for (Pn in e)
          if (A.call(e, Pn)) {
            var J = e[Pn];
            if (J != null) {
              var wt = Pn;
              switch (Pn) {
                case "children":
                  ue = J;
                  break;
                case "dangerouslySetInnerHTML":
                  Et = J;
                  break;
                case "style":
                  rr(n, J);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  wt = "class";
                default:
                  if (Ae(Pn) && typeof J != "function" && typeof J != "symbol" && J !== !1) {
                    if (J === !0) J = "";
                    else if (typeof J == "object") continue;
                    n.push(
                      " ",
                      wt,
                      '="',
                      y(J),
                      '"'
                    );
                  }
              }
            }
          }
        return n.push(">"), U(n, Et, ue), ue;
      }
  }
  return qn(n, e, l);
}
var St = /* @__PURE__ */ new Map();
function yn(n) {
  var l = St.get(n);
  return l === void 0 && (l = "</" + n + ">", St.set(n, l)), l;
}
function cr(n, l) {
  l = l.bootstrapChunks;
  for (var e = 0; e < l.length - 1; e++)
    n.push(l[e]);
  return e < l.length ? (e = l[e], l.length = 0, n.push(e)) : !0;
}
function It(n, l, e) {
  if (n.push('<!--$?--><template id="'), e === null) throw Error(g(395));
  return n.push(l.boundaryPrefix), l = e.toString(16), n.push(l), n.push('"></template>');
}
function Kr(n, l, e, t) {
  switch (e.insertionMode) {
    case 0:
    case 1:
    case 2:
      return n.push('<div hidden id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 3:
      return n.push('<svg aria-hidden="true" style="display:none" id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 4:
      return n.push('<math aria-hidden="true" style="display:none" id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 5:
      return n.push('<table hidden id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 6:
      return n.push('<table hidden><tbody id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 7:
      return n.push('<table hidden><tr id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    case 8:
      return n.push('<table hidden><colgroup id="'), n.push(l.segmentPrefix), l = t.toString(16), n.push(l), n.push('">');
    default:
      throw Error(g(397));
  }
}
function Vr(n, l) {
  switch (l.insertionMode) {
    case 0:
    case 1:
    case 2:
      return n.push("</div>");
    case 3:
      return n.push("</svg>");
    case 4:
      return n.push("</math>");
    case 5:
      return n.push("</table>");
    case 6:
      return n.push("</tbody></table>");
    case 7:
      return n.push("</tr></table>");
    case 8:
      return n.push("</colgroup></table>");
    default:
      throw Error(g(397));
  }
}
var mr = /[<\u2028\u2029]/g;
function qr(n) {
  return JSON.stringify(n).replace(
    mr,
    function(l) {
      switch (l) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var pr = /[&><\u2028\u2029]/g;
function $n(n) {
  return JSON.stringify(n).replace(
    pr,
    function(l) {
      switch (l) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var Ml = !1, ge = !0;
function jr(n) {
  var l = n.rules, e = n.hrefs, t = 0;
  if (e.length) {
    for (this.push('<style media="not all" data-precedence="'), this.push(n.precedence), this.push('" data-href="'); t < e.length - 1; t++)
      this.push(e[t]), this.push(" ");
    for (this.push(e[t]), this.push('">'), t = 0; t < l.length; t++) this.push(l[t]);
    ge = this.push("</style>"), Ml = !0, l.length = 0, e.length = 0;
  }
}
function $r(n) {
  return n.state !== 2 ? Ml = !0 : !1;
}
function hr(n, l, e) {
  return Ml = !1, ge = !0, l.styles.forEach(jr, n), l.stylesheets.forEach($r), Ml && (e.stylesToHoist = !0), ge;
}
function Q(n) {
  for (var l = 0; l < n.length; l++) this.push(n[l]);
  n.length = 0;
}
var an = [];
function ni(n) {
  z(an, n.props);
  for (var l = 0; l < an.length; l++)
    this.push(an[l]);
  an.length = 0, n.state = 2;
}
function li(n) {
  var l = 0 < n.sheets.size;
  n.sheets.forEach(ni, this), n.sheets.clear();
  var e = n.rules, t = n.hrefs;
  if (!l || t.length) {
    if (this.push('<style data-precedence="'), this.push(n.precedence), n = 0, t.length) {
      for (this.push('" data-href="'); n < t.length - 1; n++)
        this.push(t[n]), this.push(" ");
      this.push(t[n]);
    }
    for (this.push('">'), n = 0; n < e.length; n++)
      this.push(e[n]);
    this.push("</style>"), e.length = 0, t.length = 0;
  }
}
function ei(n) {
  if (n.state === 0) {
    n.state = 1;
    var l = n.props;
    for (z(an, {
      rel: "preload",
      as: "style",
      href: n.props.href,
      crossOrigin: l.crossOrigin,
      fetchPriority: l.fetchPriority,
      integrity: l.integrity,
      media: l.media,
      hrefLang: l.hrefLang,
      referrerPolicy: l.referrerPolicy
    }), n = 0; n < an.length; n++)
      this.push(an[n]);
    an.length = 0;
  }
}
function ti(n) {
  n.sheets.forEach(ei, this), n.sheets.clear();
}
function ri(n, l) {
  n.push("[");
  var e = "[";
  l.stylesheets.forEach(function(t) {
    if (t.state !== 2)
      if (t.state === 3)
        n.push(e), t = $n(
          "" + t.props.href
        ), n.push(t), n.push("]"), e = ",[";
      else {
        n.push(e);
        var r = t.props["data-precedence"], i = t.props, a = nl("" + t.props.href);
        a = $n(a), n.push(a), r = "" + r, n.push(","), r = $n(r), n.push(r);
        for (var u in i)
          if (A.call(i, u) && (r = i[u], r != null))
            switch (u) {
              case "href":
              case "rel":
              case "precedence":
              case "data-precedence":
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(399, "link"));
              default:
                ii(
                  n,
                  u,
                  r
                );
            }
        n.push("]"), e = ",[", t.state = 3;
      }
  }), n.push("]");
}
function ii(n, l, e) {
  var t = l.toLowerCase();
  switch (typeof e) {
    case "function":
    case "symbol":
      return;
  }
  switch (l) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
    case "ref":
      return;
    case "className":
      t = "class", l = "" + e;
      break;
    case "hidden":
      if (e === !1) return;
      l = "";
      break;
    case "src":
    case "href":
      e = nl(e), l = "" + e;
      break;
    default:
      if (2 < l.length && (l[0] === "o" || l[0] === "O") && (l[1] === "n" || l[1] === "N") || !Ae(l))
        return;
      l = "" + e;
  }
  n.push(","), t = $n(t), n.push(t), n.push(","), t = $n(l), n.push(t);
}
function Dt() {
  return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
}
function ai(n) {
  var l = I || null;
  if (l) {
    var e = l.resumableState, t = l.renderState;
    if (typeof n == "string" && n) {
      if (!e.dnsResources.hasOwnProperty(n)) {
        e.dnsResources[n] = null, e = t.headers;
        var r, i;
        (i = e && 0 < e.remainingCapacity) && (i = (r = "<" + ("" + n).replace(
          _e,
          Oe
        ) + ">; rel=dns-prefetch", 0 <= (e.remainingCapacity -= r.length + 2))), i ? (t.resets.dns[n] = null, e.preconnects && (e.preconnects += ", "), e.preconnects += r) : (r = [], z(r, { href: n, rel: "dns-prefetch" }), t.preconnects.add(r));
      }
      Tn(l);
    }
  } else $.D(n);
}
function ui(n, l) {
  var e = I || null;
  if (e) {
    var t = e.resumableState, r = e.renderState;
    if (typeof n == "string" && n) {
      var i = l === "use-credentials" ? "credentials" : typeof l == "string" ? "anonymous" : "default";
      if (!t.connectResources[i].hasOwnProperty(n)) {
        t.connectResources[i][n] = null, t = r.headers;
        var a, u;
        if (u = t && 0 < t.remainingCapacity) {
          if (u = "<" + ("" + n).replace(
            _e,
            Oe
          ) + ">; rel=preconnect", typeof l == "string") {
            var f = ("" + l).replace(
              ve,
              be
            );
            u += '; crossorigin="' + f + '"';
          }
          u = (a = u, 0 <= (t.remainingCapacity -= a.length + 2));
        }
        u ? (r.resets.connect[i][n] = null, t.preconnects && (t.preconnects += ", "), t.preconnects += a) : (i = [], z(i, {
          rel: "preconnect",
          href: n,
          crossOrigin: l
        }), r.preconnects.add(i));
      }
      Tn(e);
    }
  } else $.C(n, l);
}
function fi(n, l, e) {
  var t = I || null;
  if (t) {
    var r = t.resumableState, i = t.renderState;
    if (l && n) {
      switch (l) {
        case "image":
          if (e)
            var a = e.imageSrcSet, u = e.imageSizes, f = e.fetchPriority;
          var c = a ? a + `
` + (u || "") : n;
          if (r.imageResources.hasOwnProperty(c)) return;
          r.imageResources[c] = Y, r = i.headers;
          var o;
          r && 0 < r.remainingCapacity && f === "high" && (o = Sl(n, l, e), 0 <= (r.remainingCapacity -= o.length + 2)) ? (i.resets.image[c] = Y, r.highImagePreloads && (r.highImagePreloads += ", "), r.highImagePreloads += o) : (r = [], z(
            r,
            N(
              { rel: "preload", href: a ? void 0 : n, as: l },
              e
            )
          ), f === "high" ? i.highImagePreloads.add(r) : (i.bulkPreloads.add(r), i.preloads.images.set(c, r)));
          break;
        case "style":
          if (r.styleResources.hasOwnProperty(n)) return;
          a = [], z(
            a,
            N({ rel: "preload", href: n, as: l }, e)
          ), r.styleResources[n] = !e || typeof e.crossOrigin != "string" && typeof e.integrity != "string" ? Y : [e.crossOrigin, e.integrity], i.preloads.stylesheets.set(n, a), i.bulkPreloads.add(a);
          break;
        case "script":
          if (r.scriptResources.hasOwnProperty(n)) return;
          a = [], i.preloads.scripts.set(n, a), i.bulkPreloads.add(a), z(
            a,
            N({ rel: "preload", href: n, as: l }, e)
          ), r.scriptResources[n] = !e || typeof e.crossOrigin != "string" && typeof e.integrity != "string" ? Y : [e.crossOrigin, e.integrity];
          break;
        default:
          if (r.unknownResources.hasOwnProperty(l)) {
            if (a = r.unknownResources[l], a.hasOwnProperty(n))
              return;
          } else
            a = {}, r.unknownResources[l] = a;
          if (a[n] = Y, (r = i.headers) && 0 < r.remainingCapacity && l === "font" && (c = Sl(n, l, e), 0 <= (r.remainingCapacity -= c.length + 2)))
            i.resets.font[n] = Y, r.fontPreloads && (r.fontPreloads += ", "), r.fontPreloads += c;
          else
            switch (r = [], n = N({ rel: "preload", href: n, as: l }, e), z(r, n), l) {
              case "font":
                i.fontPreloads.add(r);
                break;
              default:
                i.bulkPreloads.add(r);
            }
      }
      Tn(t);
    }
  } else $.L(n, l, e);
}
function ci(n, l) {
  var e = I || null;
  if (e) {
    var t = e.resumableState, r = e.renderState;
    if (n) {
      var i = l && typeof l.as == "string" ? l.as : "script";
      switch (i) {
        case "script":
          if (t.moduleScriptResources.hasOwnProperty(n)) return;
          i = [], t.moduleScriptResources[n] = !l || typeof l.crossOrigin != "string" && typeof l.integrity != "string" ? Y : [l.crossOrigin, l.integrity], r.preloads.moduleScripts.set(n, i);
          break;
        default:
          if (t.moduleUnknownResources.hasOwnProperty(i)) {
            var a = t.unknownResources[i];
            if (a.hasOwnProperty(n)) return;
          } else
            a = {}, t.moduleUnknownResources[i] = a;
          i = [], a[n] = Y;
      }
      z(i, N({ rel: "modulepreload", href: n }, l)), r.bulkPreloads.add(i), Tn(e);
    }
  } else $.m(n, l);
}
function hi(n, l, e) {
  var t = I || null;
  if (t) {
    var r = t.resumableState, i = t.renderState;
    if (n) {
      l = l || "default";
      var a = i.styles.get(l), u = r.styleResources.hasOwnProperty(n) ? r.styleResources[n] : void 0;
      u !== null && (r.styleResources[n] = null, a || (a = {
        precedence: y(l),
        rules: [],
        hrefs: [],
        sheets: /* @__PURE__ */ new Map()
      }, i.styles.set(l, a)), l = {
        state: 0,
        props: N(
          { rel: "stylesheet", href: n, "data-precedence": l },
          e
        )
      }, u && (u.length === 2 && ll(l.props, u), (i = i.preloads.stylesheets.get(n)) && 0 < i.length ? i.length = 0 : l.state = 1), a.sheets.set(n, l), Tn(t));
    }
  } else $.S(n, l, e);
}
function oi(n, l) {
  var e = I || null;
  if (e) {
    var t = e.resumableState, r = e.renderState;
    if (n) {
      var i = t.scriptResources.hasOwnProperty(n) ? t.scriptResources[n] : void 0;
      i !== null && (t.scriptResources[n] = null, l = N({ src: n, async: !0 }, l), i && (i.length === 2 && ll(l, i), n = r.preloads.scripts.get(n)) && (n.length = 0), n = [], r.scripts.add(n), kl(n, l), Tn(e));
    }
  } else $.X(n, l);
}
function si(n, l) {
  var e = I || null;
  if (e) {
    var t = e.resumableState, r = e.renderState;
    if (n) {
      var i = t.moduleScriptResources.hasOwnProperty(
        n
      ) ? t.moduleScriptResources[n] : void 0;
      i !== null && (t.moduleScriptResources[n] = null, l = N({ src: n, type: "module", async: !0 }, l), i && (i.length === 2 && ll(l, i), n = r.preloads.moduleScripts.get(n)) && (n.length = 0), n = [], r.scripts.add(n), kl(n, l), Tn(e));
    }
  } else $.M(n, l);
}
function ll(n, l) {
  n.crossOrigin == null && (n.crossOrigin = l[0]), n.integrity == null && (n.integrity = l[1]);
}
function Sl(n, l, e) {
  n = ("" + n).replace(
    _e,
    Oe
  ), l = ("" + l).replace(
    ve,
    be
  ), l = "<" + n + '>; rel=preload; as="' + l + '"';
  for (var t in e)
    A.call(e, t) && (n = e[t], typeof n == "string" && (l += "; " + t.toLowerCase() + '="' + ("" + n).replace(
      ve,
      be
    ) + '"'));
  return l;
}
var _e = /[<>\r\n]/g;
function Oe(n) {
  switch (n) {
    case "<":
      return "%3C";
    case ">":
      return "%3E";
    case `
`:
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
var ve = /["';,\r\n]/g;
function be(n) {
  switch (n) {
    case '"':
      return "%22";
    case "'":
      return "%27";
    case ";":
      return "%3B";
    case ",":
      return "%2C";
    case `
`:
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
function Lt(n) {
  this.styles.add(n);
}
function zt(n) {
  this.stylesheets.add(n);
}
function di(n, l) {
  var e = n.idPrefix, t = [], r = n.bootstrapScriptContent, i = n.bootstrapScripts, a = n.bootstrapModules;
  r !== void 0 && t.push(
    "<script>",
    ("" + r).replace(er, tr),
    "<\/script>"
  ), r = e + "P:";
  var u = e + "S:";
  e += "B:";
  var f = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), v = {
    images: /* @__PURE__ */ new Map(),
    stylesheets: /* @__PURE__ */ new Map(),
    scripts: /* @__PURE__ */ new Map(),
    moduleScripts: /* @__PURE__ */ new Map()
  };
  if (i !== void 0)
    for (var F = 0; F < i.length; F++) {
      var E = i[F], P, w = void 0, R = void 0, x = {
        rel: "preload",
        as: "script",
        fetchPriority: "low",
        nonce: void 0
      };
      typeof E == "string" ? x.href = P = E : (x.href = P = E.src, x.integrity = R = typeof E.integrity == "string" ? E.integrity : void 0, x.crossOrigin = w = typeof E == "string" || E.crossOrigin == null ? void 0 : E.crossOrigin === "use-credentials" ? "use-credentials" : ""), E = n;
      var B = P;
      E.scriptResources[B] = null, E.moduleScriptResources[B] = null, E = [], z(E, x), s.add(E), t.push('<script src="', y(P)), typeof R == "string" && t.push('" integrity="', y(R)), typeof w == "string" && t.push(
        '" crossorigin="',
        y(w)
      ), t.push('" async=""><\/script>');
    }
  if (a !== void 0)
    for (i = 0; i < a.length; i++)
      x = a[i], w = P = void 0, R = {
        rel: "modulepreload",
        fetchPriority: "low",
        nonce: void 0
      }, typeof x == "string" ? R.href = F = x : (R.href = F = x.src, R.integrity = w = typeof x.integrity == "string" ? x.integrity : void 0, R.crossOrigin = P = typeof x == "string" || x.crossOrigin == null ? void 0 : x.crossOrigin === "use-credentials" ? "use-credentials" : ""), x = n, E = F, x.scriptResources[E] = null, x.moduleScriptResources[E] = null, x = [], z(x, R), s.add(x), t.push(
        '<script type="module" src="',
        y(F)
      ), typeof w == "string" && t.push(
        '" integrity="',
        y(w)
      ), typeof P == "string" && t.push('" crossorigin="', y(P)), t.push('" async=""><\/script>');
  return {
    placeholderPrefix: r,
    segmentPrefix: u,
    boundaryPrefix: e,
    startInlineScript: "<script>",
    htmlChunks: null,
    headChunks: null,
    externalRuntimeScript: null,
    bootstrapChunks: t,
    importMapChunks: [],
    onHeaders: void 0,
    headers: null,
    resets: {
      font: {},
      dns: {},
      connect: { default: {}, anonymous: {}, credentials: {} },
      image: {},
      style: {}
    },
    charsetChunks: [],
    viewportChunks: [],
    hoistableChunks: [],
    preconnects: f,
    fontPreloads: c,
    highImagePreloads: o,
    styles: h,
    bootstrapScripts: s,
    scripts: b,
    bulkPreloads: d,
    preloads: v,
    stylesToHoist: !1,
    generateStaticMarkup: l
  };
}
function Bt(n, l, e, t) {
  return e.generateStaticMarkup ? (n.push(y(l)), !1) : (l === "" ? n = t : (t && n.push("<!-- -->"), n.push(y(l)), n = !0), n);
}
function ye(n, l, e, t) {
  l.generateStaticMarkup || e && t && n.push("<!-- -->");
}
var gi = Function.prototype.bind, vi = Symbol.for("react.client.reference");
function Il(n) {
  if (n == null) return null;
  if (typeof n == "function")
    return n.$$typeof === vi ? null : n.displayName || n.name || null;
  if (typeof n == "string") return n;
  switch (n) {
    case pt:
      return "Fragment";
    case qt:
      return "Portal";
    case $t:
      return "Profiler";
    case jt:
      return "StrictMode";
    case Yl:
      return "Suspense";
    case Fe:
      return "SuspenseList";
  }
  if (typeof n == "object")
    switch (n.$$typeof) {
      case Ul:
        return (n.displayName || "Context") + ".Provider";
      case nr:
        return (n._context.displayName || "Context") + ".Consumer";
      case Ce:
        var l = n.render;
        return n = n.displayName, n || (n = l.displayName || l.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Pe:
        return l = n.displayName || null, l !== null ? l : Il(n.type) || "Memo";
      case Gl:
        l = n._payload, n = n._init;
        try {
          return Il(n(l));
        } catch {
        }
    }
  return null;
}
var Ht = {}, bn = null;
function Xl(n, l) {
  if (n !== l) {
    n.context._currentValue2 = n.parentValue, n = n.parent;
    var e = l.parent;
    if (n === null) {
      if (e !== null) throw Error(g(401));
    } else {
      if (e === null) throw Error(g(401));
      Xl(n, e);
    }
    l.context._currentValue2 = l.value;
  }
}
function or(n) {
  n.context._currentValue2 = n.parentValue, n = n.parent, n !== null && or(n);
}
function sr(n) {
  var l = n.parent;
  l !== null && sr(l), n.context._currentValue2 = n.value;
}
function dr(n, l) {
  if (n.context._currentValue2 = n.parentValue, n = n.parent, n === null) throw Error(g(402));
  n.depth === l.depth ? Xl(n, l) : dr(n, l);
}
function gr(n, l) {
  var e = l.parent;
  if (e === null) throw Error(g(402));
  n.depth === e.depth ? Xl(n, e) : gr(n, e), l.context._currentValue2 = l.value;
}
function rn(n) {
  var l = bn;
  l !== n && (l === null ? sr(n) : n === null ? or(l) : l.depth === n.depth ? Xl(l, n) : l.depth > n.depth ? dr(l, n) : gr(l, n), bn = n);
}
var Nt = {
  isMounted: function() {
    return !1;
  },
  enqueueSetState: function(n, l) {
    n = n._reactInternals, n.queue !== null && n.queue.push(l);
  },
  enqueueReplaceState: function(n, l) {
    n = n._reactInternals, n.replace = !0, n.queue = [l];
  },
  enqueueForceUpdate: function() {
  }
}, bi = { id: 1, overflow: "" };
function Ee(n, l, e) {
  var t = n.id;
  n = n.overflow;
  var r = 32 - Pl(t) - 1;
  t &= ~(1 << r), e += 1;
  var i = 32 - Pl(l) + r;
  if (30 < i) {
    var a = r - r % 5;
    return i = (t & (1 << a) - 1).toString(32), t >>= a, r -= a, {
      id: 1 << 32 - Pl(l) + r | e << r | t,
      overflow: i + n
    };
  }
  return {
    id: 1 << i | e << r | t,
    overflow: n
  };
}
var Pl = Math.clz32 ? Math.clz32 : wi, yi = Math.log, Ei = Math.LN2;
function wi(n) {
  return n >>>= 0, n === 0 ? 32 : 31 - (yi(n) / Ei | 0) | 0;
}
var En = Error(g(460));
function xl() {
}
function Ti(n, l, e) {
  switch (e = n[e], e === void 0 ? n.push(l) : e !== l && (l.then(xl, xl), l = e), l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      switch (typeof l.status == "string" ? l.then(xl, xl) : (n = l, n.status = "pending", n.then(
        function(t) {
          if (l.status === "pending") {
            var r = l;
            r.status = "fulfilled", r.value = t;
          }
        },
        function(t) {
          if (l.status === "pending") {
            var r = l;
            r.status = "rejected", r.reason = t;
          }
        }
      )), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
      }
      throw Al = l, En;
  }
}
var Al = null;
function Dl() {
  if (Al === null) throw Error(g(459));
  var n = Al;
  return Al = null, n;
}
function Ri(n, l) {
  return n === l && (n !== 0 || 1 / n === 1 / l) || n !== n && l !== l;
}
var xi = typeof Object.is == "function" ? Object.is : Ri, nn = null, ke = null, Me = null, Se = null, _l = null, C = null, jn = !1, Ll = !1, el = 0, tl = 0, rl = -1, zl = 0, Sn = null, un = null, Zl = 0;
function j() {
  if (nn === null)
    throw Error(g(321));
  return nn;
}
function Wt() {
  if (0 < Zl) throw Error(g(312));
  return { memoizedState: null, queue: null, next: null };
}
function Ie() {
  return C === null ? _l === null ? (jn = !1, _l = C = Wt()) : (jn = !0, C = _l) : C.next === null ? (jn = !1, C = C.next = Wt()) : (jn = !0, C = C.next), C;
}
function Mn() {
  var n = Sn;
  return Sn = null, n;
}
function il() {
  Se = Me = ke = nn = null, Ll = !1, _l = null, Zl = 0, C = un = null;
}
function vr(n, l) {
  return typeof l == "function" ? l(n) : l;
}
function Ut(n, l, e) {
  if (nn = j(), C = Ie(), jn) {
    var t = C.queue;
    if (l = t.dispatch, un !== null && (e = un.get(t), e !== void 0)) {
      un.delete(t), t = C.memoizedState;
      do
        t = n(t, e.action), e = e.next;
      while (e !== null);
      return C.memoizedState = t, [t, l];
    }
    return [C.memoizedState, l];
  }
  return n = n === vr ? typeof l == "function" ? l() : l : e !== void 0 ? e(l) : l, C.memoizedState = n, n = C.queue = { last: null, dispatch: null }, n = n.dispatch = Ci.bind(
    null,
    nn,
    n
  ), [C.memoizedState, n];
}
function Yt(n, l) {
  if (nn = j(), C = Ie(), l = l === void 0 ? null : l, C !== null) {
    var e = C.memoizedState;
    if (e !== null && l !== null) {
      var t = e[1];
      n: if (t === null) t = !1;
      else {
        for (var r = 0; r < t.length && r < l.length; r++)
          if (!xi(l[r], t[r])) {
            t = !1;
            break n;
          }
        t = !0;
      }
      if (t) return e[0];
    }
  }
  return n = n(), C.memoizedState = [n, l], n;
}
function Ci(n, l, e) {
  if (25 <= Zl) throw Error(g(301));
  if (n === nn)
    if (Ll = !0, n = { action: e, next: null }, un === null && (un = /* @__PURE__ */ new Map()), e = un.get(l), e === void 0)
      un.set(l, n);
    else {
      for (l = e; l.next !== null; ) l = l.next;
      l.next = n;
    }
}
function Fi() {
  throw Error(g(394));
}
function Pi() {
  throw Error(g(479));
}
function br(n, l, e) {
  j();
  var t = tl++, r = Me;
  if (typeof n.$$FORM_ACTION == "function") {
    var i = null, a = Se;
    r = r.formState;
    var u = n.$$IS_SIGNATURE_EQUAL;
    if (r !== null && typeof u == "function") {
      var f = r[1];
      u.call(n, r[2], r[3]) && (i = e !== void 0 ? "p" + e : "k" + Rt(
        JSON.stringify([a, null, t]),
        0
      ), f === i && (rl = t, l = r[0]));
    }
    var c = n.bind(null, l);
    return n = function(h) {
      c(h);
    }, typeof c.$$FORM_ACTION == "function" && (n.$$FORM_ACTION = function(h) {
      h = c.$$FORM_ACTION(h), e !== void 0 && (e += "", h.action = e);
      var s = h.data;
      return s && (i === null && (i = e !== void 0 ? "p" + e : "k" + Rt(
        JSON.stringify([
          a,
          null,
          t
        ]),
        0
      )), s.append("$ACTION_KEY", i)), h;
    }), [l, n, !1];
  }
  var o = n.bind(null, l);
  return [
    l,
    function(h) {
      o(h);
    },
    !1
  ];
}
function yr(n) {
  var l = zl;
  return zl += 1, Sn === null && (Sn = []), Ti(Sn, n, l);
}
function Ai() {
  throw Error(g(393));
}
function pn() {
}
var Bl = {
  readContext: function(n) {
    return n._currentValue2;
  },
  use: function(n) {
    if (n !== null && typeof n == "object") {
      if (typeof n.then == "function") return yr(n);
      if (n.$$typeof === Ul) return n._currentValue2;
    }
    throw Error(g(438, String(n)));
  },
  useContext: function(n) {
    return j(), n._currentValue2;
  },
  useMemo: Yt,
  useReducer: Ut,
  useRef: function(n) {
    nn = j(), C = Ie();
    var l = C.memoizedState;
    return l === null ? (n = { current: n }, C.memoizedState = n) : l;
  },
  useState: function(n) {
    return Ut(vr, n);
  },
  useInsertionEffect: pn,
  useLayoutEffect: pn,
  useCallback: function(n, l) {
    return Yt(function() {
      return n;
    }, l);
  },
  useImperativeHandle: pn,
  useEffect: pn,
  useDebugValue: pn,
  useDeferredValue: function(n, l) {
    return j(), l !== void 0 ? l : n;
  },
  useTransition: function() {
    return j(), [!1, Fi];
  },
  useId: function() {
    var n = ke.treeContext, l = n.overflow;
    n = n.id, n = (n & ~(1 << 32 - Pl(n) - 1)).toString(32) + l;
    var e = Ol;
    if (e === null) throw Error(g(404));
    return l = el++, n = ":" + e.idPrefix + "R" + n, 0 < l && (n += "H" + l.toString(32)), n + ":";
  },
  useSyncExternalStore: function(n, l, e) {
    if (e === void 0) throw Error(g(407));
    return e();
  },
  useCacheRefresh: function() {
    return Ai;
  },
  useMemoCache: function(n) {
    for (var l = Array(n), e = 0; e < n; e++)
      l[e] = Lr;
    return l;
  },
  useHostTransitionStatus: function() {
    return j(), Gr;
  },
  useOptimistic: function(n) {
    return j(), [n, Pi];
  }
};
Bl.useFormState = br;
Bl.useActionState = br;
var Ol = null, _i = {
  getCacheForType: function() {
    throw Error(g(248));
  }
}, ce, Gt;
function On(n) {
  if (ce === void 0)
    try {
      throw Error();
    } catch (e) {
      var l = e.stack.trim().match(/\n( *(at )?)/);
      ce = l && l[1] || "", Gt = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + ce + n + Gt;
}
var he = !1;
function Cl(n, l) {
  if (!n || he) return "";
  he = !0;
  var e = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var t = {
      DetermineComponentFrameRoot: function() {
        try {
          if (l) {
            var h = function() {
              throw Error();
            };
            if (Object.defineProperty(h.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(h, []);
              } catch (b) {
                var s = b;
              }
              Reflect.construct(n, [], h);
            } else {
              try {
                h.call();
              } catch (b) {
                s = b;
              }
              n.call(h.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (b) {
              s = b;
            }
            (h = n()) && typeof h.catch == "function" && h.catch(function() {
            });
          }
        } catch (b) {
          if (b && s && typeof b.stack == "string")
            return [b.stack, s.stack];
        }
        return [null, null];
      }
    };
    t.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var r = Object.getOwnPropertyDescriptor(
      t.DetermineComponentFrameRoot,
      "name"
    );
    r && r.configurable && Object.defineProperty(
      t.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var i = t.DetermineComponentFrameRoot(), a = i[0], u = i[1];
    if (a && u) {
      var f = a.split(`
`), c = u.split(`
`);
      for (r = t = 0; t < f.length && !f[t].includes("DetermineComponentFrameRoot"); )
        t++;
      for (; r < c.length && !c[r].includes(
        "DetermineComponentFrameRoot"
      ); )
        r++;
      if (t === f.length || r === c.length)
        for (t = f.length - 1, r = c.length - 1; 1 <= t && 0 <= r && f[t] !== c[r]; )
          r--;
      for (; 1 <= t && 0 <= r; t--, r--)
        if (f[t] !== c[r]) {
          if (t !== 1 || r !== 1)
            do
              if (t--, r--, 0 > r || f[t] !== c[r]) {
                var o = `
` + f[t].replace(" at new ", " at ");
                return n.displayName && o.includes("<anonymous>") && (o = o.replace("<anonymous>", n.displayName)), o;
              }
            while (1 <= t && 0 <= r);
          break;
        }
    }
  } finally {
    he = !1, Error.prepareStackTrace = e;
  }
  return (e = n ? n.displayName || n.name : "") ? On(e) : "";
}
function Er(n) {
  if (typeof n == "string") return On(n);
  if (typeof n == "function")
    return n.prototype && n.prototype.isReactComponent ? (n = Cl(n, !0), n) : Cl(n, !1);
  if (typeof n == "object" && n !== null) {
    switch (n.$$typeof) {
      case Ce:
        return Cl(n.render, !1);
      case Pe:
        return Cl(n.type, !1);
      case Gl:
        var l = n, e = l._payload;
        l = l._init;
        try {
          n = l(e);
        } catch {
          return On("Lazy");
        }
        return Er(n);
    }
    if (typeof n.name == "string")
      return e = n.env, On(
        n.name + (e ? " [" + e + "]" : "")
      );
  }
  switch (n) {
    case Fe:
      return On("SuspenseList");
    case Yl:
      return On("Suspense");
  }
  return "";
}
function Oi(n) {
  if (typeof n == "object" && n !== null && typeof n.environmentName == "string") {
    var l = n.environmentName;
    n = [n].slice(0), typeof n[0] == "string" ? n.splice(
      0,
      1,
      "[%s] " + n[0],
      " " + l + " "
    ) : n.splice(0, 0, "[%s] ", " " + l + " "), n.unshift(console), l = gi.apply(console.error, n), l();
  } else console.error(n);
  return null;
}
function kn() {
}
function ki(n, l, e, t, r, i, a, u, f, c, o) {
  var h = /* @__PURE__ */ new Set();
  this.destination = null, this.flushScheduled = !1, this.resumableState = n, this.renderState = l, this.rootFormatContext = e, this.progressiveChunkSize = t === void 0 ? 12800 : t, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedRootSegment = null, this.abortableTasks = h, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = r === void 0 ? Oi : r, this.onPostpone = c === void 0 ? kn : c, this.onAllReady = i === void 0 ? kn : i, this.onShellReady = a === void 0 ? kn : a, this.onShellError = u === void 0 ? kn : u, this.onFatalError = f === void 0 ? kn : f, this.formState = o === void 0 ? null : o;
}
function Mi(n, l, e, t, r, i, a, u, f, c, o, h) {
  return l = new ki(
    l,
    e,
    t,
    r,
    i,
    a,
    u,
    f,
    c,
    o,
    h
  ), e = al(
    l,
    0,
    null,
    t,
    !1,
    !1
  ), e.parentFlushed = !0, n = Hl(
    l,
    null,
    n,
    -1,
    null,
    e,
    null,
    l.abortableTasks,
    null,
    t,
    null,
    bi,
    null,
    !1
  ), ul(n), l.pingedTasks.push(n), l;
}
var I = null;
function wr(n, l) {
  n.pingedTasks.push(l), n.pingedTasks.length === 1 && (n.flushScheduled = n.destination !== null, xr(n));
}
function De(n, l) {
  return {
    status: 0,
    rootSegmentID: -1,
    parentFlushed: !1,
    pendingTasks: 0,
    completedSegments: [],
    byteSize: 0,
    fallbackAbortableTasks: l,
    errorDigest: null,
    contentState: Dt(),
    fallbackState: Dt(),
    trackedContentKeyPath: null,
    trackedFallbackNode: null
  };
}
function Hl(n, l, e, t, r, i, a, u, f, c, o, h, s, b) {
  n.allPendingTasks++, r === null ? n.pendingRootTasks++ : r.pendingTasks++;
  var d = {
    replay: null,
    node: e,
    childIndex: t,
    ping: function() {
      return wr(n, d);
    },
    blockedBoundary: r,
    blockedSegment: i,
    hoistableState: a,
    abortSet: u,
    keyPath: f,
    formatContext: c,
    context: o,
    treeContext: h,
    componentStack: s,
    thenableState: l,
    isFallback: b
  };
  return u.add(d), d;
}
function Tr(n, l, e, t, r, i, a, u, f, c, o, h, s, b) {
  n.allPendingTasks++, i === null ? n.pendingRootTasks++ : i.pendingTasks++, e.pendingTasks++;
  var d = {
    replay: e,
    node: t,
    childIndex: r,
    ping: function() {
      return wr(n, d);
    },
    blockedBoundary: i,
    blockedSegment: null,
    hoistableState: a,
    abortSet: u,
    keyPath: f,
    formatContext: c,
    context: o,
    treeContext: h,
    componentStack: s,
    thenableState: l,
    isFallback: b
  };
  return u.add(d), d;
}
function al(n, l, e, t, r, i) {
  return {
    status: 0,
    id: -1,
    index: l,
    parentFlushed: !1,
    chunks: [],
    children: [],
    parentFormatContext: t,
    boundary: e,
    lastPushedText: r,
    textEmbedded: i
  };
}
function ul(n) {
  var l = n.node;
  if (typeof l == "object" && l !== null)
    switch (l.$$typeof) {
      case mt:
        n.componentStack = { parent: n.componentStack, type: l.type };
    }
}
function wn(n) {
  var l = {};
  return n && Object.defineProperty(l, "componentStack", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      try {
        var e = "", t = n;
        do
          e += Er(t.type), t = t.parent;
        while (t);
        var r = e;
      } catch (i) {
        r = `
Error generating stack: ` + i.message + `
` + i.stack;
      }
      return Object.defineProperty(l, "componentStack", {
        value: r
      }), r;
    }
  }), l;
}
function W(n, l, e) {
  if (n = n.onError, l = n(l, e), l == null || typeof l == "string") return l;
}
function fl(n, l) {
  var e = n.onShellError, t = n.onFatalError;
  e(l), t(l), n.destination !== null ? (n.status = 14, n.destination.destroy(l)) : (n.status = 13, n.fatalError = l);
}
function Xt(n, l, e, t, r, i) {
  var a = l.thenableState;
  for (l.thenableState = null, nn = {}, ke = l, Me = n, Se = e, tl = el = 0, rl = -1, zl = 0, Sn = a, n = t(r, i); Ll; )
    Ll = !1, tl = el = 0, rl = -1, zl = 0, Zl += 1, C = null, n = t(r, i);
  return il(), n;
}
function Zt(n, l, e, t, r, i, a) {
  var u = !1;
  if (i !== 0 && n.formState !== null) {
    var f = l.blockedSegment;
    if (f !== null) {
      u = !0, f = f.chunks;
      for (var c = 0; c < i; c++)
        c === a ? f.push("<!--F!-->") : f.push("<!--F-->");
    }
  }
  i = l.keyPath, l.keyPath = e, r ? (e = l.treeContext, l.treeContext = Ee(e, 1, 0), K(n, l, t, -1), l.treeContext = e) : u ? K(n, l, t, -1) : G(n, l, t, -1), l.keyPath = i;
}
function Nl(n, l, e, t, r, i) {
  if (typeof t == "function")
    if (t.prototype && t.prototype.isReactComponent) {
      var a = r;
      if ("ref" in r) {
        a = {};
        for (var u in r)
          u !== "ref" && (a[u] = r[u]);
      }
      var f = t.defaultProps;
      if (f) {
        a === r && (a = N({}, a, r));
        for (var c in f)
          a[c] === void 0 && (a[c] = f[c]);
      }
      r = a, a = Ht, f = t.contextType, typeof f == "object" && f !== null && (a = f._currentValue2), a = new t(r, a);
      var o = a.state !== void 0 ? a.state : null;
      if (a.updater = Nt, a.props = r, a.state = o, f = { queue: [], replace: !1 }, a._reactInternals = f, i = t.contextType, a.context = typeof i == "object" && i !== null ? i._currentValue2 : Ht, i = t.getDerivedStateFromProps, typeof i == "function" && (i = i(r, o), o = i == null ? o : N({}, o, i), a.state = o), typeof t.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function"))
        if (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && Nt.enqueueReplaceState(
          a,
          a.state,
          null
        ), f.queue !== null && 0 < f.queue.length)
          if (t = f.queue, i = f.replace, f.queue = null, f.replace = !1, i && t.length === 1)
            a.state = t[0];
          else {
            for (f = i ? t[0] : a.state, o = !0, i = i ? 1 : 0; i < t.length; i++)
              c = t[i], c = typeof c == "function" ? c.call(a, f, r, void 0) : c, c != null && (o ? (o = !1, f = N({}, f, c)) : N(f, c));
            a.state = f;
          }
        else f.queue = null;
      if (t = a.render(), n.status === 12) throw null;
      r = l.keyPath, l.keyPath = e, G(n, l, t, -1), l.keyPath = r;
    } else {
      if (t = Xt(n, l, e, t, r, void 0), n.status === 12) throw null;
      Zt(
        n,
        l,
        e,
        t,
        el !== 0,
        tl,
        rl
      );
    }
  else if (typeof t == "string")
    if (a = l.blockedSegment, a === null)
      a = r.children, f = l.formatContext, o = l.keyPath, l.formatContext = Ft(f, t, r), l.keyPath = e, K(n, l, a, -1), l.formatContext = f, l.keyPath = o;
    else {
      o = Qr(
        a.chunks,
        t,
        r,
        n.resumableState,
        n.renderState,
        l.hoistableState,
        l.formatContext,
        a.lastPushedText,
        l.isFallback
      ), a.lastPushedText = !1, f = l.formatContext, i = l.keyPath, l.formatContext = Ft(f, t, r), l.keyPath = e, K(n, l, o, -1), l.formatContext = f, l.keyPath = i;
      n: {
        switch (l = a.chunks, n = n.resumableState, t) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break n;
          case "body":
            if (1 >= f.insertionMode) {
              n.hasBody = !0;
              break n;
            }
            break;
          case "html":
            if (f.insertionMode === 0) {
              n.hasHtml = !0;
              break n;
            }
        }
        l.push(yn(t));
      }
      a.lastPushedText = !1;
    }
  else {
    switch (t) {
      case Dr:
      case Sr:
      case jt:
      case $t:
      case pt:
        t = l.keyPath, l.keyPath = e, G(n, l, r.children, -1), l.keyPath = t;
        return;
      case Ir:
        r.mode !== "hidden" && (t = l.keyPath, l.keyPath = e, G(n, l, r.children, -1), l.keyPath = t);
        return;
      case Fe:
        t = l.keyPath, l.keyPath = e, G(n, l, r.children, -1), l.keyPath = t;
        return;
      case Mr:
        throw Error(g(343));
      case Yl:
        n: if (l.replay !== null) {
          t = l.keyPath, l.keyPath = e, e = r.children;
          try {
            K(n, l, e, -1);
          } finally {
            l.keyPath = t;
          }
        } else {
          t = l.keyPath;
          var h = l.blockedBoundary, s = l.hoistableState;
          i = l.blockedSegment, c = r.fallback, r = r.children;
          var b = /* @__PURE__ */ new Set();
          u = De(n, b), n.trackedPostpones !== null && (u.trackedContentKeyPath = e);
          var d = al(
            n,
            i.chunks.length,
            u,
            l.formatContext,
            !1,
            !1
          );
          i.children.push(d), i.lastPushedText = !1;
          var v = al(
            n,
            0,
            null,
            l.formatContext,
            !1,
            !1
          );
          if (v.parentFlushed = !0, n.trackedPostpones !== null) {
            a = [e[0], "Suspense Fallback", e[2]], f = [a[1], a[2], [], null], n.trackedPostpones.workingMap.set(a, f), u.trackedFallbackNode = f, l.blockedSegment = d, l.keyPath = a, d.status = 6;
            try {
              K(n, l, c, -1), ye(
                d.chunks,
                n.renderState,
                d.lastPushedText,
                d.textEmbedded
              ), d.status = 1;
            } catch (F) {
              throw d.status = n.status === 12 ? 3 : 4, F;
            } finally {
              l.blockedSegment = i, l.keyPath = t;
            }
            l = Hl(
              n,
              null,
              r,
              -1,
              u,
              v,
              u.contentState,
              l.abortSet,
              e,
              l.formatContext,
              l.context,
              l.treeContext,
              l.componentStack,
              l.isFallback
            ), ul(l), n.pingedTasks.push(l);
          } else {
            l.blockedBoundary = u, l.hoistableState = u.contentState, l.blockedSegment = v, l.keyPath = e, v.status = 6;
            try {
              if (K(n, l, r, -1), ye(
                v.chunks,
                n.renderState,
                v.lastPushedText,
                v.textEmbedded
              ), v.status = 1, cl(u, v), u.pendingTasks === 0 && u.status === 0) {
                u.status = 1;
                break n;
              }
            } catch (F) {
              u.status = 4, n.status === 12 ? (v.status = 3, a = n.fatalError) : (v.status = 4, a = F), f = wn(l.componentStack), o = W(
                n,
                a,
                f
              ), u.errorDigest = o, ze(n, u);
            } finally {
              l.blockedBoundary = h, l.hoistableState = s, l.blockedSegment = i, l.keyPath = t;
            }
            l = Hl(
              n,
              null,
              c,
              -1,
              h,
              d,
              u.fallbackState,
              b,
              [e[0], "Suspense Fallback", e[2]],
              l.formatContext,
              l.context,
              l.treeContext,
              l.componentStack,
              !0
            ), ul(l), n.pingedTasks.push(l);
          }
        }
        return;
    }
    if (typeof t == "object" && t !== null)
      switch (t.$$typeof) {
        case Ce:
          if ("ref" in r)
            for (d in a = {}, r)
              d !== "ref" && (a[d] = r[d]);
          else a = r;
          t = Xt(
            n,
            l,
            e,
            t.render,
            a,
            i
          ), Zt(
            n,
            l,
            e,
            t,
            el !== 0,
            tl,
            rl
          );
          return;
        case Pe:
          Nl(n, l, e, t.type, r, i);
          return;
        case kr:
        case Ul:
          if (f = r.children, a = l.keyPath, r = r.value, o = t._currentValue2, t._currentValue2 = r, i = bn, bn = t = {
            parent: i,
            depth: i === null ? 0 : i.depth + 1,
            context: t,
            parentValue: o,
            value: r
          }, l.context = t, l.keyPath = e, G(n, l, f, -1), n = bn, n === null) throw Error(g(403));
          n.context._currentValue2 = n.parentValue, n = bn = n.parent, l.context = n, l.keyPath = a;
          return;
        case nr:
          r = r.children, t = r(t._context._currentValue2), r = l.keyPath, l.keyPath = e, G(n, l, t, -1), l.keyPath = r;
          return;
        case Gl:
          if (a = t._init, t = a(t._payload), n.status === 12) throw null;
          Nl(n, l, e, t, r, i);
          return;
      }
    throw Error(
      g(130, t == null ? t : typeof t, "")
    );
  }
}
function Le(n, l, e, t, r) {
  var i = l.replay, a = l.blockedBoundary, u = al(
    n,
    0,
    null,
    l.formatContext,
    !1,
    !1
  );
  u.id = e, u.parentFlushed = !0;
  try {
    l.replay = null, l.blockedSegment = u, K(n, l, t, r), u.status = 1, a === null ? n.completedRootSegment = u : (cl(a, u), a.parentFlushed && n.partialBoundaries.push(a));
  } finally {
    l.replay = i, l.blockedSegment = null;
  }
}
function G(n, l, e, t) {
  l.replay !== null && typeof l.replay.slots == "number" ? Le(n, l, l.replay.slots, e, t) : (l.node = e, l.childIndex = t, e = l.componentStack, ul(l), we(n, l), l.componentStack = e);
}
function we(n, l) {
  var e = l.node, t = l.childIndex;
  if (e !== null) {
    if (typeof e == "object") {
      switch (e.$$typeof) {
        case mt:
          var r = e.type, i = e.key, a = e.props;
          e = a.ref;
          var u = e !== void 0 ? e : null, f = Il(r), c = i ?? (t === -1 ? 0 : t);
          if (i = [l.keyPath, f, c], l.replay !== null)
            n: {
              var o = l.replay;
              for (t = o.nodes, e = 0; e < t.length; e++) {
                var h = t[e];
                if (c === h[1]) {
                  if (h.length === 4) {
                    if (f !== null && f !== h[0])
                      throw Error(
                        g(490, h[0], f)
                      );
                    var s = h[2];
                    f = h[3], c = l.node, l.replay = {
                      nodes: s,
                      slots: f,
                      pendingTasks: 1
                    };
                    try {
                      if (Nl(n, l, i, r, a, u), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                        throw Error(g(488));
                      l.replay.pendingTasks--;
                    } catch (R) {
                      if (typeof R == "object" && R !== null && (R === En || typeof R.then == "function"))
                        throw l.node === c && (l.replay = o), R;
                      l.replay.pendingTasks--, a = wn(l.componentStack), i = l.blockedBoundary, r = R, a = W(n, r, a), hl(
                        n,
                        i,
                        s,
                        f,
                        r,
                        a
                      );
                    }
                    l.replay = o;
                  } else {
                    if (r !== Yl)
                      throw Error(
                        g(
                          490,
                          "Suspense",
                          Il(r) || "Unknown"
                        )
                      );
                    l: {
                      o = void 0, r = h[5], u = h[2], f = h[3], c = h[4] === null ? [] : h[4][2], h = h[4] === null ? null : h[4][3];
                      var b = l.keyPath, d = l.replay, v = l.blockedBoundary, F = l.hoistableState, E = a.children;
                      a = a.fallback;
                      var P = /* @__PURE__ */ new Set(), w = De(
                        n,
                        P
                      );
                      w.parentFlushed = !0, w.rootSegmentID = r, l.blockedBoundary = w, l.hoistableState = w.contentState, l.keyPath = i, l.replay = {
                        nodes: u,
                        slots: f,
                        pendingTasks: 1
                      };
                      try {
                        if (K(n, l, E, -1), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                          throw Error(g(488));
                        if (l.replay.pendingTasks--, w.pendingTasks === 0 && w.status === 0) {
                          w.status = 1, n.completedBoundaries.push(w);
                          break l;
                        }
                      } catch (R) {
                        w.status = 4, s = wn(l.componentStack), o = W(
                          n,
                          R,
                          s
                        ), w.errorDigest = o, l.replay.pendingTasks--, n.clientRenderedBoundaries.push(
                          w
                        );
                      } finally {
                        l.blockedBoundary = v, l.hoistableState = F, l.replay = d, l.keyPath = b;
                      }
                      l = Tr(
                        n,
                        null,
                        {
                          nodes: c,
                          slots: h,
                          pendingTasks: 0
                        },
                        a,
                        -1,
                        v,
                        w.fallbackState,
                        P,
                        [i[0], "Suspense Fallback", i[2]],
                        l.formatContext,
                        l.context,
                        l.treeContext,
                        l.componentStack,
                        !0
                      ), ul(l), n.pingedTasks.push(l);
                    }
                  }
                  t.splice(e, 1);
                  break n;
                }
              }
            }
          else Nl(n, l, i, r, a, u);
          return;
        case qt:
          throw Error(g(257));
        case Gl:
          if (s = e._init, e = s(e._payload), n.status === 12) throw null;
          G(n, l, e, t);
          return;
      }
      if (se(e)) {
        Te(n, l, e, t);
        return;
      }
      if (e === null || typeof e != "object" ? s = null : (s = Tt && e[Tt] || e["@@iterator"], s = typeof s == "function" ? s : null), s && (s = s.call(e))) {
        if (e = s.next(), !e.done) {
          a = [];
          do
            a.push(e.value), e = s.next();
          while (!e.done);
          Te(n, l, a, t);
        }
        return;
      }
      if (typeof e.then == "function")
        return l.thenableState = null, G(n, l, yr(e), t);
      if (e.$$typeof === Ul)
        return G(
          n,
          l,
          e._currentValue2,
          t
        );
      throw t = Object.prototype.toString.call(e), Error(
        g(
          31,
          t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
        )
      );
    }
    typeof e == "string" ? (t = l.blockedSegment, t !== null && (t.lastPushedText = Bt(
      t.chunks,
      e,
      n.renderState,
      t.lastPushedText
    ))) : (typeof e == "number" || typeof e == "bigint") && (t = l.blockedSegment, t !== null && (t.lastPushedText = Bt(
      t.chunks,
      "" + e,
      n.renderState,
      t.lastPushedText
    )));
  }
}
function Te(n, l, e, t) {
  var r = l.keyPath;
  if (t !== -1 && (l.keyPath = [l.keyPath, "Fragment", t], l.replay !== null)) {
    for (var i = l.replay, a = i.nodes, u = 0; u < a.length; u++) {
      var f = a[u];
      if (f[1] === t) {
        t = f[2], f = f[3], l.replay = { nodes: t, slots: f, pendingTasks: 1 };
        try {
          if (Te(n, l, e, -1), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
            throw Error(g(488));
          l.replay.pendingTasks--;
        } catch (h) {
          if (typeof h == "object" && h !== null && (h === En || typeof h.then == "function"))
            throw h;
          l.replay.pendingTasks--, e = wn(l.componentStack);
          var c = l.blockedBoundary, o = h;
          e = W(n, o, e), hl(
            n,
            c,
            t,
            f,
            o,
            e
          );
        }
        l.replay = i, a.splice(u, 1);
        break;
      }
    }
    l.keyPath = r;
    return;
  }
  if (i = l.treeContext, a = e.length, l.replay !== null && (u = l.replay.slots, u !== null && typeof u == "object")) {
    for (t = 0; t < a; t++)
      f = e[t], l.treeContext = Ee(i, a, t), c = u[t], typeof c == "number" ? (Le(n, l, c, f, t), delete u[t]) : K(n, l, f, t);
    l.treeContext = i, l.keyPath = r;
    return;
  }
  for (u = 0; u < a; u++)
    t = e[u], l.treeContext = Ee(i, a, u), K(n, l, t, u);
  l.treeContext = i, l.keyPath = r;
}
function ze(n, l) {
  n = n.trackedPostpones, n !== null && (l = l.trackedContentKeyPath, l !== null && (l = n.workingMap.get(l), l !== void 0 && (l.length = 4, l[2] = [], l[3] = null)));
}
function Jt(n, l, e) {
  return Tr(
    n,
    e,
    l.replay,
    l.node,
    l.childIndex,
    l.blockedBoundary,
    l.hoistableState,
    l.abortSet,
    l.keyPath,
    l.formatContext,
    l.context,
    l.treeContext,
    l.componentStack,
    l.isFallback
  );
}
function Qt(n, l, e) {
  var t = l.blockedSegment, r = al(
    n,
    t.chunks.length,
    null,
    l.formatContext,
    t.lastPushedText,
    !0
  );
  return t.children.push(r), t.lastPushedText = !1, Hl(
    n,
    e,
    l.node,
    l.childIndex,
    l.blockedBoundary,
    r,
    l.hoistableState,
    l.abortSet,
    l.keyPath,
    l.formatContext,
    l.context,
    l.treeContext,
    l.componentStack,
    l.isFallback
  );
}
function K(n, l, e, t) {
  var r = l.formatContext, i = l.context, a = l.keyPath, u = l.treeContext, f = l.componentStack, c = l.blockedSegment;
  if (c === null)
    try {
      return G(n, l, e, t);
    } catch (s) {
      if (il(), e = s === En ? Dl() : s, typeof e == "object" && e !== null) {
        if (typeof e.then == "function") {
          t = Mn(), n = Jt(n, l, t).ping, e.then(n, n), l.formatContext = r, l.context = i, l.keyPath = a, l.treeContext = u, l.componentStack = f, rn(i);
          return;
        }
        if (e.message === "Maximum call stack size exceeded") {
          e = Mn(), e = Jt(n, l, e), n.pingedTasks.push(e), l.formatContext = r, l.context = i, l.keyPath = a, l.treeContext = u, l.componentStack = f, rn(i);
          return;
        }
      }
    }
  else {
    var o = c.children.length, h = c.chunks.length;
    try {
      return G(n, l, e, t);
    } catch (s) {
      if (il(), c.children.length = o, c.chunks.length = h, e = s === En ? Dl() : s, typeof e == "object" && e !== null) {
        if (typeof e.then == "function") {
          t = Mn(), n = Qt(n, l, t).ping, e.then(n, n), l.formatContext = r, l.context = i, l.keyPath = a, l.treeContext = u, l.componentStack = f, rn(i);
          return;
        }
        if (e.message === "Maximum call stack size exceeded") {
          e = Mn(), e = Qt(n, l, e), n.pingedTasks.push(e), l.formatContext = r, l.context = i, l.keyPath = a, l.treeContext = u, l.componentStack = f, rn(i);
          return;
        }
      }
    }
  }
  throw l.formatContext = r, l.context = i, l.keyPath = a, l.treeContext = u, rn(i), e;
}
function Si(n) {
  var l = n.blockedBoundary;
  n = n.blockedSegment, n !== null && (n.status = 3, Re(this, l, n));
}
function hl(n, l, e, t, r, i) {
  for (var a = 0; a < e.length; a++) {
    var u = e[a];
    if (u.length === 4)
      hl(
        n,
        l,
        u[2],
        u[3],
        r,
        i
      );
    else {
      u = u[5];
      var f = n, c = i, o = De(f, /* @__PURE__ */ new Set());
      o.parentFlushed = !0, o.rootSegmentID = u, o.status = 4, o.errorDigest = c, o.parentFlushed && f.clientRenderedBoundaries.push(o);
    }
  }
  if (e.length = 0, t !== null) {
    if (l === null) throw Error(g(487));
    if (l.status !== 4 && (l.status = 4, l.errorDigest = i, l.parentFlushed && n.clientRenderedBoundaries.push(l)), typeof t == "object") for (var h in t) delete t[h];
  }
}
function Rr(n, l, e) {
  var t = n.blockedBoundary, r = n.blockedSegment;
  if (r !== null) {
    if (r.status === 6) return;
    r.status = 3;
  }
  if (r = wn(n.componentStack), t === null) {
    if (l.status !== 13 && l.status !== 14) {
      if (t = n.replay, t === null) {
        W(l, e, r), fl(l, e);
        return;
      }
      t.pendingTasks--, t.pendingTasks === 0 && 0 < t.nodes.length && (n = W(l, e, r), hl(
        l,
        null,
        t.nodes,
        t.slots,
        e,
        n
      )), l.pendingRootTasks--, l.pendingRootTasks === 0 && He(l);
    }
  } else
    t.pendingTasks--, t.status !== 4 && (t.status = 4, n = W(l, e, r), t.status = 4, t.errorDigest = n, ze(l, t), t.parentFlushed && l.clientRenderedBoundaries.push(t)), t.fallbackAbortableTasks.forEach(function(i) {
      return Rr(i, l, e);
    }), t.fallbackAbortableTasks.clear();
  l.allPendingTasks--, l.allPendingTasks === 0 && Wl(l);
}
function Be(n, l) {
  try {
    var e = n.renderState, t = e.onHeaders;
    if (t) {
      var r = e.headers;
      if (r) {
        e.headers = null;
        var i = r.preconnects;
        if (r.fontPreloads && (i && (i += ", "), i += r.fontPreloads), r.highImagePreloads && (i && (i += ", "), i += r.highImagePreloads), !l) {
          var a = e.styles.values(), u = a.next();
          n: for (; 0 < r.remainingCapacity && !u.done; u = a.next())
            for (var f = u.value.sheets.values(), c = f.next(); 0 < r.remainingCapacity && !c.done; c = f.next()) {
              var o = c.value, h = o.props, s = h.href, b = o.props, d = Sl(b.href, "style", {
                crossOrigin: b.crossOrigin,
                integrity: b.integrity,
                nonce: b.nonce,
                type: b.type,
                fetchPriority: b.fetchPriority,
                referrerPolicy: b.referrerPolicy,
                media: b.media
              });
              if (0 <= (r.remainingCapacity -= d.length + 2))
                e.resets.style[s] = Y, i && (i += ", "), i += d, e.resets.style[s] = typeof h.crossOrigin == "string" || typeof h.integrity == "string" ? [h.crossOrigin, h.integrity] : Y;
              else break n;
            }
        }
        t(i ? { Link: i } : {});
      }
    }
  } catch (v) {
    W(n, v, {});
  }
}
function He(n) {
  n.trackedPostpones === null && Be(n, !0), n.onShellError = kn, n = n.onShellReady, n();
}
function Wl(n) {
  Be(
    n,
    n.trackedPostpones === null ? !0 : n.completedRootSegment === null || n.completedRootSegment.status !== 5
  ), n = n.onAllReady, n();
}
function cl(n, l) {
  if (l.chunks.length === 0 && l.children.length === 1 && l.children[0].boundary === null && l.children[0].id === -1) {
    var e = l.children[0];
    e.id = l.id, e.parentFlushed = !0, e.status === 1 && cl(n, e);
  } else n.completedSegments.push(l);
}
function Re(n, l, e) {
  if (l === null) {
    if (e !== null && e.parentFlushed) {
      if (n.completedRootSegment !== null)
        throw Error(g(389));
      n.completedRootSegment = e;
    }
    n.pendingRootTasks--, n.pendingRootTasks === 0 && He(n);
  } else
    l.pendingTasks--, l.status !== 4 && (l.pendingTasks === 0 ? (l.status === 0 && (l.status = 1), e !== null && e.parentFlushed && e.status === 1 && cl(l, e), l.parentFlushed && n.completedBoundaries.push(l), l.status === 1 && (l.fallbackAbortableTasks.forEach(Si, n), l.fallbackAbortableTasks.clear())) : e !== null && e.parentFlushed && e.status === 1 && (cl(l, e), l.completedSegments.length === 1 && l.parentFlushed && n.partialBoundaries.push(l)));
  n.allPendingTasks--, n.allPendingTasks === 0 && Wl(n);
}
function xr(n) {
  if (n.status !== 14 && n.status !== 13) {
    var l = bn, e = An.H;
    An.H = Bl;
    var t = An.A;
    An.A = _i;
    var r = I;
    I = n;
    var i = Ol;
    Ol = n.resumableState;
    try {
      var a = n.pingedTasks, u;
      for (u = 0; u < a.length; u++) {
        var f = a[u], c = n, o = f.blockedSegment;
        if (o === null) {
          var h = c;
          if (f.replay.pendingTasks !== 0) {
            rn(f.context);
            try {
              if (typeof f.replay.slots == "number" ? Le(
                h,
                f,
                f.replay.slots,
                f.node,
                f.childIndex
              ) : we(h, f), f.replay.pendingTasks === 1 && 0 < f.replay.nodes.length)
                throw Error(g(488));
              f.replay.pendingTasks--, f.abortSet.delete(f), Re(h, f.blockedBoundary, null);
            } catch (k) {
              il();
              var s = k === En ? Dl() : k;
              if (typeof s == "object" && s !== null && typeof s.then == "function") {
                var b = f.ping;
                s.then(b, b), f.thenableState = Mn();
              } else {
                f.replay.pendingTasks--, f.abortSet.delete(f);
                var d = wn(f.componentStack);
                c = void 0;
                var v = h, F = f.blockedBoundary, E = h.status === 12 ? h.fatalError : s, P = f.replay.nodes, w = f.replay.slots;
                c = W(
                  v,
                  E,
                  d
                ), hl(
                  v,
                  F,
                  P,
                  w,
                  E,
                  c
                ), h.pendingRootTasks--, h.pendingRootTasks === 0 && He(h), h.allPendingTasks--, h.allPendingTasks === 0 && Wl(h);
              }
            } finally {
            }
          }
        } else if (h = void 0, v = o, v.status === 0) {
          v.status = 6, rn(f.context);
          var R = v.children.length, x = v.chunks.length;
          try {
            we(c, f), ye(
              v.chunks,
              c.renderState,
              v.lastPushedText,
              v.textEmbedded
            ), f.abortSet.delete(f), v.status = 1, Re(c, f.blockedBoundary, v);
          } catch (k) {
            il(), v.children.length = R, v.chunks.length = x;
            var B = k === En ? Dl() : c.status === 12 ? c.fatalError : k;
            if (typeof B == "object" && B !== null && typeof B.then == "function") {
              v.status = 0, f.thenableState = Mn();
              var V = f.ping;
              B.then(V, V);
            } else {
              var m = wn(f.componentStack);
              f.abortSet.delete(f), v.status = 4;
              var _ = f.blockedBoundary;
              h = W(
                c,
                B,
                m
              ), _ === null ? fl(c, B) : (_.pendingTasks--, _.status !== 4 && (_.status = 4, _.errorDigest = h, ze(c, _), _.parentFlushed && c.clientRenderedBoundaries.push(
                _
              ))), c.allPendingTasks--, c.allPendingTasks === 0 && Wl(c);
            }
          } finally {
          }
        }
      }
      a.splice(0, u), n.destination !== null && Ql(n, n.destination);
    } catch (k) {
      W(n, k, {}), fl(n, k);
    } finally {
      Ol = i, An.H = e, An.A = t, e === Bl && rn(l), I = r;
    }
  }
}
function Fl(n, l, e, t) {
  switch (e.parentFlushed = !0, e.status) {
    case 0:
      e.id = n.nextSegmentId++;
    case 5:
      return t = e.id, e.lastPushedText = !1, e.textEmbedded = !1, n = n.renderState, l.push('<template id="'), l.push(n.placeholderPrefix), n = t.toString(16), l.push(n), l.push('"></template>');
    case 1:
      e.status = 2;
      var r = !0, i = e.chunks, a = 0;
      e = e.children;
      for (var u = 0; u < e.length; u++) {
        for (r = e[u]; a < r.index; a++)
          l.push(i[a]);
        r = Jl(n, l, r, t);
      }
      for (; a < i.length - 1; a++)
        l.push(i[a]);
      return a < i.length && (r = l.push(i[a])), r;
    default:
      throw Error(g(390));
  }
}
function Jl(n, l, e, t) {
  var r = e.boundary;
  if (r === null)
    return Fl(n, l, e, t);
  if (r.parentFlushed = !0, r.status === 4)
    return n.renderState.generateStaticMarkup || (r = r.errorDigest, l.push("<!--$!-->"), l.push("<template"), r && (l.push(' data-dgst="'), r = y(r), l.push(r), l.push('"')), l.push("></template>")), Fl(n, l, e, t), n = n.renderState.generateStaticMarkup ? !0 : l.push("<!--/$-->"), n;
  if (r.status !== 1)
    return r.status === 0 && (r.rootSegmentID = n.nextSegmentId++), 0 < r.completedSegments.length && n.partialBoundaries.push(r), It(
      l,
      n.renderState,
      r.rootSegmentID
    ), t && (r = r.fallbackState, r.styles.forEach(Lt, t), r.stylesheets.forEach(
      zt,
      t
    )), Fl(n, l, e, t), l.push("<!--/$-->");
  if (r.byteSize > n.progressiveChunkSize)
    return r.rootSegmentID = n.nextSegmentId++, n.completedBoundaries.push(r), It(
      l,
      n.renderState,
      r.rootSegmentID
    ), Fl(n, l, e, t), l.push("<!--/$-->");
  if (t && (e = r.contentState, e.styles.forEach(Lt, t), e.stylesheets.forEach(zt, t)), n.renderState.generateStaticMarkup || l.push("<!--$-->"), e = r.completedSegments, e.length !== 1) throw Error(g(391));
  return Jl(n, l, e[0], t), n = n.renderState.generateStaticMarkup ? !0 : l.push("<!--/$-->"), n;
}
function oe(n, l, e, t) {
  return Kr(
    l,
    n.renderState,
    e.parentFormatContext,
    e.id
  ), Jl(n, l, e, t), Vr(l, e.parentFormatContext);
}
function Kt(n, l, e) {
  for (var t = e.completedSegments, r = 0; r < t.length; r++)
    Cr(
      n,
      l,
      e,
      t[r]
    );
  t.length = 0, hr(
    l,
    e.contentState,
    n.renderState
  ), t = n.resumableState, n = n.renderState, r = e.rootSegmentID, e = e.contentState;
  var i = n.stylesToHoist;
  return n.stylesToHoist = !1, l.push(n.startInlineScript), i ? (t.instructions & 2) === 0 ? (t.instructions |= 10, l.push(
    `$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;
$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=
d;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,
t,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("`
  )) : (t.instructions & 8) === 0 ? (t.instructions |= 8, l.push(
    `$RM=new Map;
$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=
d;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,
t,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("`
  )) : l.push('$RR("') : (t.instructions & 2) === 0 ? (t.instructions |= 2, l.push(
    '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
  )) : l.push('$RC("'), t = r.toString(16), l.push(n.boundaryPrefix), l.push(t), l.push('","'), l.push(n.segmentPrefix), l.push(t), i ? (l.push('",'), ri(l, e)) : l.push('"'), e = l.push(")<\/script>"), cr(l, n) && e;
}
function Cr(n, l, e, t) {
  if (t.status === 2) return !0;
  var r = e.contentState, i = t.id;
  if (i === -1) {
    if ((t.id = e.rootSegmentID) === -1)
      throw Error(g(392));
    return oe(n, l, t, r);
  }
  return i === e.rootSegmentID ? oe(n, l, t, r) : (oe(n, l, t, r), e = n.resumableState, n = n.renderState, l.push(n.startInlineScript), (e.instructions & 1) === 0 ? (e.instructions |= 1, l.push(
    '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
  )) : l.push('$RS("'), l.push(n.segmentPrefix), i = i.toString(16), l.push(i), l.push('","'), l.push(n.placeholderPrefix), l.push(i), l = l.push('")<\/script>'), l);
}
function Ql(n, l) {
  try {
    if (!(0 < n.pendingRootTasks)) {
      var e, t = n.completedRootSegment;
      if (t !== null) {
        if (t.status === 5) return;
        var r = n.renderState, i = r.htmlChunks, a = r.headChunks, u;
        if (i) {
          for (u = 0; u < i.length; u++)
            l.push(i[u]);
          if (a)
            for (u = 0; u < a.length; u++)
              l.push(a[u]);
          else {
            var f = O("head");
            l.push(f), l.push(">");
          }
        } else if (a)
          for (u = 0; u < a.length; u++)
            l.push(a[u]);
        var c = r.charsetChunks;
        for (u = 0; u < c.length; u++)
          l.push(c[u]);
        c.length = 0, r.preconnects.forEach(Q, l), r.preconnects.clear();
        var o = r.viewportChunks;
        for (u = 0; u < o.length; u++)
          l.push(o[u]);
        o.length = 0, r.fontPreloads.forEach(Q, l), r.fontPreloads.clear(), r.highImagePreloads.forEach(Q, l), r.highImagePreloads.clear(), r.styles.forEach(li, l);
        var h = r.importMapChunks;
        for (u = 0; u < h.length; u++)
          l.push(h[u]);
        h.length = 0, r.bootstrapScripts.forEach(Q, l), r.scripts.forEach(Q, l), r.scripts.clear(), r.bulkPreloads.forEach(Q, l), r.bulkPreloads.clear();
        var s = r.hoistableChunks;
        for (u = 0; u < s.length; u++)
          l.push(s[u]);
        if (s.length = 0, i && a === null) {
          var b = yn("head");
          l.push(b);
        }
        Jl(n, l, t, null), n.completedRootSegment = null, cr(l, n.renderState);
      }
      var d = n.renderState;
      t = 0;
      var v = d.viewportChunks;
      for (t = 0; t < v.length; t++)
        l.push(v[t]);
      v.length = 0, d.preconnects.forEach(Q, l), d.preconnects.clear(), d.fontPreloads.forEach(Q, l), d.fontPreloads.clear(), d.highImagePreloads.forEach(
        Q,
        l
      ), d.highImagePreloads.clear(), d.styles.forEach(ti, l), d.scripts.forEach(Q, l), d.scripts.clear(), d.bulkPreloads.forEach(Q, l), d.bulkPreloads.clear();
      var F = d.hoistableChunks;
      for (t = 0; t < F.length; t++)
        l.push(F[t]);
      F.length = 0;
      var E = n.clientRenderedBoundaries;
      for (e = 0; e < E.length; e++) {
        var P = E[e];
        d = l;
        var w = n.resumableState, R = n.renderState, x = P.rootSegmentID, B = P.errorDigest;
        d.push(R.startInlineScript), (w.instructions & 4) === 0 ? (w.instructions |= 4, d.push(
          '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
        )) : d.push('$RX("'), d.push(R.boundaryPrefix);
        var V = x.toString(16);
        if (d.push(V), d.push('"'), B) {
          d.push(",");
          var m = qr(
            B || ""
          );
          d.push(m);
        }
        var _ = d.push(")<\/script>");
        if (!_) {
          n.destination = null, e++, E.splice(0, e);
          return;
        }
      }
      E.splice(0, e);
      var k = n.completedBoundaries;
      for (e = 0; e < k.length; e++)
        if (!Kt(n, l, k[e])) {
          n.destination = null, e++, k.splice(0, e);
          return;
        }
      k.splice(0, e);
      var M = n.partialBoundaries;
      for (e = 0; e < M.length; e++) {
        var fn = M[e];
        n: {
          E = n, P = l;
          var X = fn.completedSegments;
          for (_ = 0; _ < X.length; _++)
            if (!Cr(
              E,
              P,
              fn,
              X[_]
            )) {
              _++, X.splice(0, _);
              var ln = !1;
              break n;
            }
          X.splice(0, _), ln = hr(
            P,
            fn.contentState,
            E.renderState
          );
        }
        if (!ln) {
          n.destination = null, e++, M.splice(0, e);
          return;
        }
      }
      M.splice(0, e);
      var q = n.completedBoundaries;
      for (e = 0; e < q.length; e++)
        if (!Kt(n, l, q[e])) {
          n.destination = null, e++, q.splice(0, e);
          return;
        }
      q.splice(0, e);
    }
  } finally {
    n.allPendingTasks === 0 && n.pingedTasks.length === 0 && n.clientRenderedBoundaries.length === 0 && n.completedBoundaries.length === 0 && (n.flushScheduled = !1, e = n.resumableState, e.hasBody && (M = yn("body"), l.push(M)), e.hasHtml && (e = yn("html"), l.push(e)), n.status = 14, l.push(null), n.destination = null);
  }
}
function Tn(n) {
  if (n.flushScheduled === !1 && n.pingedTasks.length === 0 && n.destination !== null) {
    n.flushScheduled = !0;
    var l = n.destination;
    l ? Ql(n, l) : n.flushScheduled = !1;
  }
}
function Ii(n, l) {
  if (n.status === 13)
    n.status = 14, l.destroy(n.fatalError);
  else if (n.status !== 14 && n.destination === null) {
    n.destination = l;
    try {
      Ql(n, l);
    } catch (e) {
      W(n, e, {}), fl(n, e);
    }
  }
}
function Di(n, l) {
  (n.status === 11 || n.status === 10) && (n.status = 12);
  try {
    var e = n.abortableTasks;
    if (0 < e.size) {
      var t = l === void 0 ? Error(g(432)) : typeof l == "object" && l !== null && typeof l.then == "function" ? Error(g(530)) : l;
      n.fatalError = t, e.forEach(function(r) {
        return Rr(r, n, t);
      }), e.clear();
    }
    n.destination !== null && Ql(n, n.destination);
  } catch (r) {
    W(n, r, {}), fl(n, r);
  }
}
function Li() {
}
function Fr(n, l, e, t) {
  var r = !1, i = null, a = "", u = !1;
  if (l = Xr(l ? l.identifierPrefix : void 0), n = Mi(
    n,
    l,
    di(l, e),
    H(0, null, 0),
    1 / 0,
    Li,
    void 0,
    function() {
      u = !0;
    },
    void 0,
    void 0,
    void 0
  ), n.flushScheduled = n.destination !== null, xr(n), n.status === 10 && (n.status = 11), n.trackedPostpones === null && Be(n, n.pendingRootTasks === 0), Di(n, t), Ii(n, {
    push: function(f) {
      return f !== null && (a += f), !0;
    },
    destroy: function(f) {
      r = !0, i = f;
    }
  }), r && i !== t) throw i;
  if (!u) throw Error(g(426));
  return a;
}
var Hi = xe.renderToStaticMarkup = function(n, l) {
  return Fr(
    n,
    l,
    !0,
    'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
  );
}, Ni = xe.renderToString = function(n, l) {
  return Fr(
    n,
    l,
    !1,
    'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
  );
}, Wi = xe.version = "19.0.0";
export {
  xe as default,
  Hi as renderToStaticMarkup,
  Ni as renderToString,
  Wi as version
};
