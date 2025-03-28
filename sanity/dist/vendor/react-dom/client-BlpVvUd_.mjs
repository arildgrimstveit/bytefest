import Xv from "react";
import Qv from "react-dom";
var Jn = {}, a0 = { exports: {} }, u0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function a(E, B) {
    var q = E.length;
    E.push(B);
    l: for (; 0 < q; ) {
      var $ = q - 1 >>> 1, tl = E[$];
      if (0 < e(tl, B))
        E[$] = B, E[q] = tl, q = $;
      else break l;
    }
  }
  function u(E) {
    return E.length === 0 ? null : E[0];
  }
  function t(E) {
    if (E.length === 0) return null;
    var B = E[0], q = E.pop();
    if (q !== B) {
      E[0] = q;
      l: for (var $ = 0, tl = E.length, $t = tl >>> 1; $ < $t; ) {
        var kt = 2 * ($ + 1) - 1, bf = E[kt], ja = kt + 1, Ft = E[ja];
        if (0 > e(bf, q))
          ja < tl && 0 > e(Ft, bf) ? (E[$] = Ft, E[ja] = q, $ = ja) : (E[$] = bf, E[kt] = q, $ = kt);
        else if (ja < tl && 0 > e(Ft, q))
          E[$] = Ft, E[ja] = q, $ = ja;
        else break l;
      }
    }
    return B;
  }
  function e(E, B) {
    var q = E.sortIndex - B.sortIndex;
    return q !== 0 ? q : E.id - B.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var f = performance;
    l.unstable_now = function() {
      return f.now();
    };
  } else {
    var n = Date, c = n.now();
    l.unstable_now = function() {
      return n.now() - c;
    };
  }
  var i = [], v = [], S = 1, b = null, d = 3, m = !1, T = !1, U = !1, C = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  function s(E) {
    for (var B = u(v); B !== null; ) {
      if (B.callback === null) t(v);
      else if (B.startTime <= E)
        t(v), B.sortIndex = B.expirationTime, a(i, B);
      else break;
      B = u(v);
    }
  }
  function g(E) {
    if (U = !1, s(E), !T)
      if (u(i) !== null)
        T = !0, mf();
      else {
        var B = u(v);
        B !== null && Sf(g, B.startTime - E);
      }
  }
  var A = !1, O = -1, M = 5, D = -1;
  function W() {
    return !(l.unstable_now() - D < M);
  }
  function _() {
    if (A) {
      var E = l.unstable_now();
      D = E;
      var B = !0;
      try {
        l: {
          T = !1, U && (U = !1, y(O), O = -1), m = !0;
          var q = d;
          try {
            a: {
              for (s(E), b = u(i); b !== null && !(b.expirationTime > E && W()); ) {
                var $ = b.callback;
                if (typeof $ == "function") {
                  b.callback = null, d = b.priorityLevel;
                  var tl = $(
                    b.expirationTime <= E
                  );
                  if (E = l.unstable_now(), typeof tl == "function") {
                    b.callback = tl, s(E), B = !0;
                    break a;
                  }
                  b === u(i) && t(i), s(E);
                } else t(i);
                b = u(i);
              }
              if (b !== null) B = !0;
              else {
                var $t = u(v);
                $t !== null && Sf(
                  g,
                  $t.startTime - E
                ), B = !1;
              }
            }
            break l;
          } finally {
            b = null, d = q, m = !1;
          }
          B = void 0;
        }
      } finally {
        B ? Sl() : A = !1;
      }
    }
  }
  var Sl;
  if (typeof h == "function")
    Sl = function() {
      h(_);
    };
  else if (typeof MessageChannel < "u") {
    var Wt = new MessageChannel(), Rv = Wt.port2;
    Wt.port1.onmessage = _, Sl = function() {
      Rv.postMessage(null);
    };
  } else
    Sl = function() {
      C(_, 0);
    };
  function mf() {
    A || (A = !0, Sl());
  }
  function Sf(E, B) {
    O = C(function() {
      E(l.unstable_now());
    }, B);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, l.unstable_continueExecution = function() {
    T || m || (T = !0, mf());
  }, l.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : M = 0 < E ? Math.floor(1e3 / E) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, l.unstable_getFirstCallbackNode = function() {
    return u(i);
  }, l.unstable_next = function(E) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var B = 3;
        break;
      default:
        B = d;
    }
    var q = d;
    d = B;
    try {
      return E();
    } finally {
      d = q;
    }
  }, l.unstable_pauseExecution = function() {
  }, l.unstable_requestPaint = function() {
  }, l.unstable_runWithPriority = function(E, B) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var q = d;
    d = E;
    try {
      return B();
    } finally {
      d = q;
    }
  }, l.unstable_scheduleCallback = function(E, B, q) {
    var $ = l.unstable_now();
    switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? $ + q : $) : q = $, E) {
      case 1:
        var tl = -1;
        break;
      case 2:
        tl = 250;
        break;
      case 5:
        tl = 1073741823;
        break;
      case 4:
        tl = 1e4;
        break;
      default:
        tl = 5e3;
    }
    return tl = q + tl, E = {
      id: S++,
      callback: B,
      priorityLevel: E,
      startTime: q,
      expirationTime: tl,
      sortIndex: -1
    }, q > $ ? (E.sortIndex = q, a(v, E), u(i) === null && E === u(v) && (U ? (y(O), O = -1) : U = !0, Sf(g, q - $))) : (E.sortIndex = tl, a(i, E), T || m || (T = !0, mf())), E;
  }, l.unstable_shouldYield = W, l.unstable_wrapCallback = function(E) {
    var B = d;
    return function() {
      var q = d;
      d = B;
      try {
        return E.apply(this, arguments);
      } finally {
        d = q;
      }
    };
  };
})(u0);
a0.exports = u0;
var Gv = a0.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ul = Gv, t0 = Xv, Zv = Qv;
function z(l) {
  var a = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    a += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      a += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function e0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
var jv = Symbol.for("react.element"), Pt = Symbol.for("react.transitional.element"), at = Symbol.for("react.portal"), su = Symbol.for("react.fragment"), f0 = Symbol.for("react.strict_mode"), Ff = Symbol.for("react.profiler"), Vv = Symbol.for("react.provider"), n0 = Symbol.for("react.consumer"), ta = Symbol.for("react.context"), rn = Symbol.for("react.forward_ref"), Pf = Symbol.for("react.suspense"), If = Symbol.for("react.suspense_list"), wn = Symbol.for("react.memo"), ba = Symbol.for("react.lazy"), c0 = Symbol.for("react.offscreen"), Cv = Symbol.for("react.memo_cache_sentinel"), jc = Symbol.iterator;
function wu(l) {
  return l === null || typeof l != "object" ? null : (l = jc && l[jc] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Kv = Symbol.for("react.client.reference");
function ln(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === Kv ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case su:
      return "Fragment";
    case at:
      return "Portal";
    case Ff:
      return "Profiler";
    case f0:
      return "StrictMode";
    case Pf:
      return "Suspense";
    case If:
      return "SuspenseList";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case ta:
        return (l.displayName || "Context") + ".Provider";
      case n0:
        return (l._context.displayName || "Context") + ".Consumer";
      case rn:
        var a = l.render;
        return l = l.displayName, l || (l = a.displayName || a.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case wn:
        return a = l.displayName || null, a !== null ? a : ln(l.type) || "Memo";
      case ba:
        a = l._payload, l = l._init;
        try {
          return ln(l(a));
        } catch {
        }
    }
  return null;
}
var H = t0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, x = Object.assign, gf, Vc;
function ut(l) {
  if (gf === void 0)
    try {
      throw Error();
    } catch (u) {
      var a = u.stack.trim().match(/\n( *(at )?)/);
      gf = a && a[1] || "", Vc = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + gf + l + Vc;
}
var zf = !1;
function Af(l, a) {
  if (!l || zf) return "";
  zf = !0;
  var u = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var t = {
      DetermineComponentFrameRoot: function() {
        try {
          if (a) {
            var b = function() {
              throw Error();
            };
            if (Object.defineProperty(b.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (m) {
                var d = m;
              }
              Reflect.construct(l, [], b);
            } else {
              try {
                b.call();
              } catch (m) {
                d = m;
              }
              l.call(b.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (m) {
              d = m;
            }
            (b = l()) && typeof b.catch == "function" && b.catch(function() {
            });
          }
        } catch (m) {
          if (m && d && typeof m.stack == "string")
            return [m.stack, d.stack];
        }
        return [null, null];
      }
    };
    t.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      t.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      t.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var f = t.DetermineComponentFrameRoot(), n = f[0], c = f[1];
    if (n && c) {
      var i = n.split(`
`), v = c.split(`
`);
      for (e = t = 0; t < i.length && !i[t].includes("DetermineComponentFrameRoot"); )
        t++;
      for (; e < v.length && !v[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (t === i.length || e === v.length)
        for (t = i.length - 1, e = v.length - 1; 1 <= t && 0 <= e && i[t] !== v[e]; )
          e--;
      for (; 1 <= t && 0 <= e; t--, e--)
        if (i[t] !== v[e]) {
          if (t !== 1 || e !== 1)
            do
              if (t--, e--, 0 > e || i[t] !== v[e]) {
                var S = `
` + i[t].replace(" at new ", " at ");
                return l.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", l.displayName)), S;
              }
            while (1 <= t && 0 <= e);
          break;
        }
    }
  } finally {
    zf = !1, Error.prepareStackTrace = u;
  }
  return (u = l ? l.displayName || l.name : "") ? ut(u) : "";
}
function xv(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return ut(l.type);
    case 16:
      return ut("Lazy");
    case 13:
      return ut("Suspense");
    case 19:
      return ut("SuspenseList");
    case 0:
    case 15:
      return l = Af(l.type, !1), l;
    case 11:
      return l = Af(l.type.render, !1), l;
    case 1:
      return l = Af(l.type, !0), l;
    default:
      return "";
  }
}
function Cc(l) {
  try {
    var a = "";
    do
      a += xv(l), l = l.return;
    while (l);
    return a;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
function Ku(l) {
  var a = l, u = l;
  if (l.alternate) for (; a.return; ) a = a.return;
  else {
    l = a;
    do
      a = l, (a.flags & 4098) !== 0 && (u = a.return), l = a.return;
    while (l);
  }
  return a.tag === 3 ? u : null;
}
function i0(l) {
  if (l.tag === 13) {
    var a = l.memoizedState;
    if (a === null && (l = l.alternate, l !== null && (a = l.memoizedState)), a !== null) return a.dehydrated;
  }
  return null;
}
function Kc(l) {
  if (Ku(l) !== l)
    throw Error(z(188));
}
function Lv(l) {
  var a = l.alternate;
  if (!a) {
    if (a = Ku(l), a === null) throw Error(z(188));
    return a !== l ? null : l;
  }
  for (var u = l, t = a; ; ) {
    var e = u.return;
    if (e === null) break;
    var f = e.alternate;
    if (f === null) {
      if (t = e.return, t !== null) {
        u = t;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f; ) {
        if (f === u) return Kc(e), l;
        if (f === t) return Kc(e), a;
        f = f.sibling;
      }
      throw Error(z(188));
    }
    if (u.return !== t.return) u = e, t = f;
    else {
      for (var n = !1, c = e.child; c; ) {
        if (c === u) {
          n = !0, u = e, t = f;
          break;
        }
        if (c === t) {
          n = !0, t = e, u = f;
          break;
        }
        c = c.sibling;
      }
      if (!n) {
        for (c = f.child; c; ) {
          if (c === u) {
            n = !0, u = f, t = e;
            break;
          }
          if (c === t) {
            n = !0, t = f, u = e;
            break;
          }
          c = c.sibling;
        }
        if (!n) throw Error(z(189));
      }
    }
    if (u.alternate !== t) throw Error(z(190));
  }
  if (u.tag !== 3) throw Error(z(188));
  return u.stateNode.current === u ? l : a;
}
function v0(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l;
  for (l = l.child; l !== null; ) {
    if (a = v0(l), a !== null) return a;
    l = l.sibling;
  }
  return null;
}
var tt = Array.isArray, K = Zv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ja = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, an = [], mu = -1;
function Wl(l) {
  return { current: l };
}
function cl(l) {
  0 > mu || (l.current = an[mu], an[mu] = null, mu--);
}
function L(l, a) {
  mu++, an[mu] = l.current, l.current = a;
}
var pl = Wl(null), Et = Wl(null), Ua = Wl(null), Oe = Wl(null);
function He(l, a) {
  switch (L(Ua, a), L(Et, l), L(pl, null), l = a.nodeType, l) {
    case 9:
    case 11:
      a = (a = a.documentElement) && (a = a.namespaceURI) ? xi(a) : 0;
      break;
    default:
      if (l = l === 8 ? a.parentNode : a, a = l.tagName, l = l.namespaceURI)
        l = xi(l), a = Ev(l, a);
      else
        switch (a) {
          case "svg":
            a = 1;
            break;
          case "math":
            a = 2;
            break;
          default:
            a = 0;
        }
  }
  cl(pl), L(pl, a);
}
function Yu() {
  cl(pl), cl(Et), cl(Ua);
}
function un(l) {
  l.memoizedState !== null && L(Oe, l);
  var a = pl.current, u = Ev(a, l.type);
  a !== u && (L(Et, l), L(pl, u));
}
function oe(l) {
  Et.current === l && (cl(pl), cl(Et)), Oe.current === l && (cl(Oe), Yt._currentValue = Ja);
}
var tn = Object.prototype.hasOwnProperty, Wn = ul.unstable_scheduleCallback, Tf = ul.unstable_cancelCallback, pv = ul.unstable_shouldYield, Jv = ul.unstable_requestPaint, Jl = ul.unstable_now, rv = ul.unstable_getCurrentPriorityLevel, h0 = ul.unstable_ImmediatePriority, y0 = ul.unstable_UserBlockingPriority, qe = ul.unstable_NormalPriority, wv = ul.unstable_LowPriority, d0 = ul.unstable_IdlePriority, Wv = ul.log, $v = ul.unstable_setDisableYieldValue, Gt = null, Ml = null;
function kv(l) {
  if (Ml && typeof Ml.onCommitFiberRoot == "function")
    try {
      Ml.onCommitFiberRoot(
        Gt,
        l,
        void 0,
        (l.current.flags & 128) === 128
      );
    } catch {
    }
}
function Ma(l) {
  if (typeof Wv == "function" && $v(l), Ml && typeof Ml.setStrictMode == "function")
    try {
      Ml.setStrictMode(Gt, l);
    } catch {
    }
}
var Dl = Math.clz32 ? Math.clz32 : Iv, Fv = Math.log, Pv = Math.LN2;
function Iv(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (Fv(l) / Pv | 0) | 0;
}
var It = 128, le = 4194304;
function Ca(l) {
  var a = l & 42;
  if (a !== 0) return a;
  switch (l & -l) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return l;
  }
}
function Ie(l, a) {
  var u = l.pendingLanes;
  if (u === 0) return 0;
  var t = 0, e = l.suspendedLanes, f = l.pingedLanes, n = l.warmLanes;
  l = l.finishedLanes !== 0;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~e, u !== 0 ? t = Ca(u) : (f &= c, f !== 0 ? t = Ca(f) : l || (n = c & ~n, n !== 0 && (t = Ca(n))))) : (c = u & ~e, c !== 0 ? t = Ca(c) : f !== 0 ? t = Ca(f) : l || (n = u & ~n, n !== 0 && (t = Ca(n)))), t === 0 ? 0 : a !== 0 && a !== t && (a & e) === 0 && (e = t & -t, n = a & -a, e >= n || e === 32 && (n & 4194176) !== 0) ? a : t;
}
function Zt(l, a) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & a) === 0;
}
function lh(l, a) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
      return a + 250;
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function s0() {
  var l = It;
  return It <<= 1, (It & 4194176) === 0 && (It = 128), l;
}
function m0() {
  var l = le;
  return le <<= 1, (le & 62914560) === 0 && (le = 4194304), l;
}
function Ef(l) {
  for (var a = [], u = 0; 31 > u; u++) a.push(l);
  return a;
}
function jt(l, a) {
  l.pendingLanes |= a, a !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function ah(l, a, u, t, e, f) {
  var n = l.pendingLanes;
  l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, v = l.hiddenUpdates;
  for (u = n & ~u; 0 < u; ) {
    var S = 31 - Dl(u), b = 1 << S;
    c[S] = 0, i[S] = -1;
    var d = v[S];
    if (d !== null)
      for (v[S] = null, S = 0; S < d.length; S++) {
        var m = d[S];
        m !== null && (m.lane &= -536870913);
      }
    u &= ~b;
  }
  t !== 0 && S0(l, t, 0), f !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= f & ~(n & ~a));
}
function S0(l, a, u) {
  l.pendingLanes |= a, l.suspendedLanes &= ~a;
  var t = 31 - Dl(a);
  l.entangledLanes |= a, l.entanglements[t] = l.entanglements[t] | 1073741824 | u & 4194218;
}
function b0(l, a) {
  var u = l.entangledLanes |= a;
  for (l = l.entanglements; u; ) {
    var t = 31 - Dl(u), e = 1 << t;
    e & a | l[t] & a && (l[t] |= a), u &= ~e;
  }
}
function g0(l) {
  return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
}
function z0() {
  var l = K.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : _v(l.type));
}
function uh(l, a) {
  var u = K.p;
  try {
    return K.p = l, a();
  } finally {
    K.p = u;
  }
}
var Ga = Math.random().toString(36).slice(2), yl = "__reactFiber$" + Ga, gl = "__reactProps$" + Ga, xu = "__reactContainer$" + Ga, en = "__reactEvents$" + Ga, th = "__reactListeners$" + Ga, eh = "__reactHandles$" + Ga, xc = "__reactResources$" + Ga, Mt = "__reactMarker$" + Ga;
function $n(l) {
  delete l[yl], delete l[gl], delete l[en], delete l[th], delete l[eh];
}
function La(l) {
  var a = l[yl];
  if (a) return a;
  for (var u = l.parentNode; u; ) {
    if (a = u[xu] || u[yl]) {
      if (u = a.alternate, a.child !== null || u !== null && u.child !== null)
        for (l = pi(l); l !== null; ) {
          if (u = l[yl]) return u;
          l = pi(l);
        }
      return a;
    }
    l = u, u = l.parentNode;
  }
  return null;
}
function Lu(l) {
  if (l = l[yl] || l[xu]) {
    var a = l.tag;
    if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
      return l;
  }
  return null;
}
function et(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l.stateNode;
  throw Error(z(33));
}
function Uu(l) {
  var a = l[xc];
  return a || (a = l[xc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
}
function fl(l) {
  l[Mt] = !0;
}
var A0 = /* @__PURE__ */ new Set(), T0 = {};
function uu(l, a) {
  Ru(l, a), Ru(l + "Capture", a);
}
function Ru(l, a) {
  for (T0[l] = a, l = 0; l < a.length; l++)
    A0.add(a[l]);
}
var va = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), fh = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Lc = {}, pc = {};
function nh(l) {
  return tn.call(pc, l) ? !0 : tn.call(Lc, l) ? !1 : fh.test(l) ? pc[l] = !0 : (Lc[l] = !0, !1);
}
function se(l, a, u) {
  if (nh(a))
    if (u === null) l.removeAttribute(a);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(a);
          return;
        case "boolean":
          var t = a.toLowerCase().slice(0, 5);
          if (t !== "data-" && t !== "aria-") {
            l.removeAttribute(a);
            return;
          }
      }
      l.setAttribute(a, "" + u);
    }
}
function ae(l, a, u) {
  if (u === null) l.removeAttribute(a);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(a);
        return;
    }
    l.setAttribute(a, "" + u);
  }
}
function kl(l, a, u, t) {
  if (t === null) l.removeAttribute(u);
  else {
    switch (typeof t) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(u);
        return;
    }
    l.setAttributeNS(a, u, "" + t);
  }
}
function Bl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function E0(l) {
  var a = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
}
function ch(l) {
  var a = E0(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    a
  ), t = "" + l[a];
  if (!l.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
    var e = u.get, f = u.set;
    return Object.defineProperty(l, a, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(n) {
        t = "" + n, f.call(this, n);
      }
    }), Object.defineProperty(l, a, {
      enumerable: u.enumerable
    }), {
      getValue: function() {
        return t;
      },
      setValue: function(n) {
        t = "" + n;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[a];
      }
    };
  }
}
function Be(l) {
  l._valueTracker || (l._valueTracker = ch(l));
}
function M0(l) {
  if (!l) return !1;
  var a = l._valueTracker;
  if (!a) return !0;
  var u = a.getValue(), t = "";
  return l && (t = E0(l) ? l.checked ? "true" : "false" : l.value), l = t, l !== u ? (a.setValue(l), !0) : !1;
}
function Ne(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var ih = /[\n"\\]/g;
function Yl(l) {
  return l.replace(
    ih,
    function(a) {
      return "\\" + a.charCodeAt(0).toString(16) + " ";
    }
  );
}
function fn(l, a, u, t, e, f, n, c) {
  l.name = "", n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" ? l.type = n : l.removeAttribute("type"), a != null ? n === "number" ? (a === 0 && l.value === "" || l.value != a) && (l.value = "" + Bl(a)) : l.value !== "" + Bl(a) && (l.value = "" + Bl(a)) : n !== "submit" && n !== "reset" || l.removeAttribute("value"), a != null ? nn(l, n, Bl(a)) : u != null ? nn(l, n, Bl(u)) : t != null && l.removeAttribute("value"), e == null && f != null && (l.defaultChecked = !!f), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Bl(c) : l.removeAttribute("name");
}
function D0(l, a, u, t, e, f, n, c) {
  if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.type = f), a != null || u != null) {
    if (!(f !== "submit" && f !== "reset" || a != null))
      return;
    u = u != null ? "" + Bl(u) : "", a = a != null ? "" + Bl(a) : u, c || a === l.value || (l.value = a), l.defaultValue = a;
  }
  t = t ?? e, t = typeof t != "function" && typeof t != "symbol" && !!t, l.checked = c ? l.checked : !!t, l.defaultChecked = !!t, n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.name = n);
}
function nn(l, a, u) {
  a === "number" && Ne(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
}
function Ou(l, a, u, t) {
  if (l = l.options, a) {
    a = {};
    for (var e = 0; e < u.length; e++)
      a["$" + u[e]] = !0;
    for (u = 0; u < l.length; u++)
      e = a.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && t && (l[u].defaultSelected = !0);
  } else {
    for (u = "" + Bl(u), a = null, e = 0; e < l.length; e++) {
      if (l[e].value === u) {
        l[e].selected = !0, t && (l[e].defaultSelected = !0);
        return;
      }
      a !== null || l[e].disabled || (a = l[e]);
    }
    a !== null && (a.selected = !0);
  }
}
function U0(l, a, u) {
  if (a != null && (a = "" + Bl(a), a !== l.value && (l.value = a), u == null)) {
    l.defaultValue !== a && (l.defaultValue = a);
    return;
  }
  l.defaultValue = u != null ? "" + Bl(u) : "";
}
function O0(l, a, u, t) {
  if (a == null) {
    if (t != null) {
      if (u != null) throw Error(z(92));
      if (tt(t)) {
        if (1 < t.length) throw Error(z(93));
        t = t[0];
      }
      u = t;
    }
    u == null && (u = ""), a = u;
  }
  u = Bl(a), l.defaultValue = u, t = l.textContent, t === u && t !== "" && t !== null && (l.value = t);
}
function Xu(l, a) {
  if (a) {
    var u = l.firstChild;
    if (u && u === l.lastChild && u.nodeType === 3) {
      u.nodeValue = a;
      return;
    }
  }
  l.textContent = a;
}
var vh = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Jc(l, a, u) {
  var t = a.indexOf("--") === 0;
  u == null || typeof u == "boolean" || u === "" ? t ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "" : t ? l.setProperty(a, u) : typeof u != "number" || u === 0 || vh.has(a) ? a === "float" ? l.cssFloat = u : l[a] = ("" + u).trim() : l[a] = u + "px";
}
function H0(l, a, u) {
  if (a != null && typeof a != "object")
    throw Error(z(62));
  if (l = l.style, u != null) {
    for (var t in u)
      !u.hasOwnProperty(t) || a != null && a.hasOwnProperty(t) || (t.indexOf("--") === 0 ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "");
    for (var e in a)
      t = a[e], a.hasOwnProperty(e) && u[e] !== t && Jc(l, e, t);
  } else
    for (var f in a)
      a.hasOwnProperty(f) && Jc(l, f, a[f]);
}
function kn(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var hh = /* @__PURE__ */ new Map([
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
]), yh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function me(l) {
  return yh.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var cn = null;
function Fn(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var Su = null, Hu = null;
function rc(l) {
  var a = Lu(l);
  if (a && (l = a.stateNode)) {
    var u = l[gl] || null;
    l: switch (l = a.stateNode, a.type) {
      case "input":
        if (fn(
          l,
          u.value,
          u.defaultValue,
          u.defaultValue,
          u.checked,
          u.defaultChecked,
          u.type,
          u.name
        ), a = u.name, u.type === "radio" && a != null) {
          for (u = l; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll(
            'input[name="' + Yl(
              "" + a
            ) + '"][type="radio"]'
          ), a = 0; a < u.length; a++) {
            var t = u[a];
            if (t !== l && t.form === l.form) {
              var e = t[gl] || null;
              if (!e) throw Error(z(90));
              fn(
                t,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              );
            }
          }
          for (a = 0; a < u.length; a++)
            t = u[a], t.form === l.form && M0(t);
        }
        break l;
      case "textarea":
        U0(l, u.value, u.defaultValue);
        break l;
      case "select":
        a = u.value, a != null && Ou(l, !!u.multiple, a, !1);
    }
  }
}
var Mf = !1;
function o0(l, a, u) {
  if (Mf) return l(a, u);
  Mf = !0;
  try {
    var t = l(a);
    return t;
  } finally {
    if (Mf = !1, (Su !== null || Hu !== null) && (hf(), Su && (a = Su, l = Hu, Hu = Su = null, rc(a), l)))
      for (a = 0; a < l.length; a++) rc(l[a]);
  }
}
function Dt(l, a) {
  var u = l.stateNode;
  if (u === null) return null;
  var t = u[gl] || null;
  if (t === null) return null;
  u = t[a];
  l: switch (a) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (t = !t.disabled) || (l = l.type, t = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !t;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (u && typeof u != "function")
    throw Error(
      z(231, a, typeof u)
    );
  return u;
}
var vn = !1;
if (va)
  try {
    var Wu = {};
    Object.defineProperty(Wu, "passive", {
      get: function() {
        vn = !0;
      }
    }), window.addEventListener("test", Wu, Wu), window.removeEventListener("test", Wu, Wu);
  } catch {
    vn = !1;
  }
var Da = null, Pn = null, Se = null;
function q0() {
  if (Se) return Se;
  var l, a = Pn, u = a.length, t, e = "value" in Da ? Da.value : Da.textContent, f = e.length;
  for (l = 0; l < u && a[l] === e[l]; l++) ;
  var n = u - l;
  for (t = 1; t <= n && a[u - t] === e[f - t]; t++) ;
  return Se = e.slice(l, 1 < t ? 1 - t : void 0);
}
function be(l) {
  var a = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && a === 13 && (l = 13)) : l = a, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function ue() {
  return !0;
}
function wc() {
  return !1;
}
function zl(l) {
  function a(u, t, e, f, n) {
    this._reactName = u, this._targetInst = e, this.type = t, this.nativeEvent = f, this.target = n, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(f) : f[c]);
    return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? ue : wc, this.isPropagationStopped = wc, this;
  }
  return x(a.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = ue);
    },
    stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = ue);
    },
    persist: function() {
    },
    isPersistent: ue
  }), a;
}
var tu = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, lf = zl(tu), Vt = x({}, tu, { view: 0, detail: 0 }), dh = zl(Vt), Df, Uf, $u, af = x({}, Vt, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: In,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== $u && ($u && l.type === "mousemove" ? (Df = l.screenX - $u.screenX, Uf = l.screenY - $u.screenY) : Uf = Df = 0, $u = l), Df);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Uf;
  }
}), Wc = zl(af), sh = x({}, af, { dataTransfer: 0 }), mh = zl(sh), Sh = x({}, Vt, { relatedTarget: 0 }), Of = zl(Sh), bh = x({}, tu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), gh = zl(bh), zh = x({}, tu, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Ah = zl(zh), Th = x({}, tu, { data: 0 }), $c = zl(Th), Eh = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Mh = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Dh = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Uh(l) {
  var a = this.nativeEvent;
  return a.getModifierState ? a.getModifierState(l) : (l = Dh[l]) ? !!a[l] : !1;
}
function In() {
  return Uh;
}
var Oh = x({}, Vt, {
  key: function(l) {
    if (l.key) {
      var a = Eh[l.key] || l.key;
      if (a !== "Unidentified") return a;
    }
    return l.type === "keypress" ? (l = be(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Mh[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: In,
  charCode: function(l) {
    return l.type === "keypress" ? be(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? be(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), Hh = zl(Oh), oh = x({}, af, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), kc = zl(oh), qh = x({}, Vt, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: In
}), Bh = zl(qh), Nh = x({}, tu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), _h = zl(Nh), Yh = x({}, af, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Rh = zl(Yh), Xh = x({}, tu, {
  newState: 0,
  oldState: 0
}), Qh = zl(Xh), Gh = [9, 13, 27, 32], lc = va && "CompositionEvent" in window, nt = null;
va && "documentMode" in document && (nt = document.documentMode);
var Zh = va && "TextEvent" in window && !nt, B0 = va && (!lc || nt && 8 < nt && 11 >= nt), Fc = " ", Pc = !1;
function N0(l, a) {
  switch (l) {
    case "keyup":
      return Gh.indexOf(a.keyCode) !== -1;
    case "keydown":
      return a.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function _0(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var bu = !1;
function jh(l, a) {
  switch (l) {
    case "compositionend":
      return _0(a);
    case "keypress":
      return a.which !== 32 ? null : (Pc = !0, Fc);
    case "textInput":
      return l = a.data, l === Fc && Pc ? null : l;
    default:
      return null;
  }
}
function Vh(l, a) {
  if (bu)
    return l === "compositionend" || !lc && N0(l, a) ? (l = q0(), Se = Pn = Da = null, bu = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
        if (a.char && 1 < a.char.length)
          return a.char;
        if (a.which) return String.fromCharCode(a.which);
      }
      return null;
    case "compositionend":
      return B0 && a.locale !== "ko" ? null : a.data;
    default:
      return null;
  }
}
var Ch = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function Ic(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a === "input" ? !!Ch[l.type] : a === "textarea";
}
function Y0(l, a, u, t) {
  Su ? Hu ? Hu.push(t) : Hu = [t] : Su = t, a = re(a, "onChange"), 0 < a.length && (u = new lf(
    "onChange",
    "change",
    null,
    u,
    t
  ), l.push({ event: u, listeners: a }));
}
var ct = null, Ut = null;
function Kh(l) {
  zv(l, 0);
}
function uf(l) {
  var a = et(l);
  if (M0(a)) return l;
}
function li(l, a) {
  if (l === "change") return a;
}
var R0 = !1;
if (va) {
  var Hf;
  if (va) {
    var of = "oninput" in document;
    if (!of) {
      var ai = document.createElement("div");
      ai.setAttribute("oninput", "return;"), of = typeof ai.oninput == "function";
    }
    Hf = of;
  } else Hf = !1;
  R0 = Hf && (!document.documentMode || 9 < document.documentMode);
}
function ui() {
  ct && (ct.detachEvent("onpropertychange", X0), Ut = ct = null);
}
function X0(l) {
  if (l.propertyName === "value" && uf(Ut)) {
    var a = [];
    Y0(
      a,
      Ut,
      l,
      Fn(l)
    ), o0(Kh, a);
  }
}
function xh(l, a, u) {
  l === "focusin" ? (ui(), ct = a, Ut = u, ct.attachEvent("onpropertychange", X0)) : l === "focusout" && ui();
}
function Lh(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return uf(Ut);
}
function ph(l, a) {
  if (l === "click") return uf(a);
}
function Jh(l, a) {
  if (l === "input" || l === "change")
    return uf(a);
}
function rh(l, a) {
  return l === a && (l !== 0 || 1 / l === 1 / a) || l !== l && a !== a;
}
var Ol = typeof Object.is == "function" ? Object.is : rh;
function Ot(l, a) {
  if (Ol(l, a)) return !0;
  if (typeof l != "object" || l === null || typeof a != "object" || a === null)
    return !1;
  var u = Object.keys(l), t = Object.keys(a);
  if (u.length !== t.length) return !1;
  for (t = 0; t < u.length; t++) {
    var e = u[t];
    if (!tn.call(a, e) || !Ol(l[e], a[e]))
      return !1;
  }
  return !0;
}
function ti(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function ei(l, a) {
  var u = ti(l);
  l = 0;
  for (var t; u; ) {
    if (u.nodeType === 3) {
      if (t = l + u.textContent.length, l <= a && t >= a)
        return { node: u, offset: a - l };
      l = t;
    }
    l: {
      for (; u; ) {
        if (u.nextSibling) {
          u = u.nextSibling;
          break l;
        }
        u = u.parentNode;
      }
      u = void 0;
    }
    u = ti(u);
  }
}
function Q0(l, a) {
  return l && a ? l === a ? !0 : l && l.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Q0(l, a.parentNode) : "contains" in l ? l.contains(a) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(a) & 16) : !1 : !1;
}
function G0(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var a = Ne(l.document); a instanceof l.HTMLIFrameElement; ) {
    try {
      var u = typeof a.contentWindow.location.href == "string";
    } catch {
      u = !1;
    }
    if (u) l = a.contentWindow;
    else break;
    a = Ne(l.document);
  }
  return a;
}
function ac(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a && (a === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || a === "textarea" || l.contentEditable === "true");
}
function wh(l, a) {
  var u = G0(a);
  a = l.focusedElem;
  var t = l.selectionRange;
  if (u !== a && a && a.ownerDocument && Q0(a.ownerDocument.documentElement, a)) {
    if (t !== null && ac(a)) {
      if (l = t.start, u = t.end, u === void 0 && (u = l), "selectionStart" in a)
        a.selectionStart = l, a.selectionEnd = Math.min(
          u,
          a.value.length
        );
      else if (u = (l = a.ownerDocument || document) && l.defaultView || window, u.getSelection) {
        u = u.getSelection();
        var e = a.textContent.length, f = Math.min(t.start, e);
        t = t.end === void 0 ? f : Math.min(t.end, e), !u.extend && f > t && (e = t, t = f, f = e), e = ei(a, f);
        var n = ei(
          a,
          t
        );
        e && n && (u.rangeCount !== 1 || u.anchorNode !== e.node || u.anchorOffset !== e.offset || u.focusNode !== n.node || u.focusOffset !== n.offset) && (l = l.createRange(), l.setStart(e.node, e.offset), u.removeAllRanges(), f > t ? (u.addRange(l), u.extend(n.node, n.offset)) : (l.setEnd(
          n.node,
          n.offset
        ), u.addRange(l)));
      }
    }
    for (l = [], u = a; u = u.parentNode; )
      u.nodeType === 1 && l.push({
        element: u,
        left: u.scrollLeft,
        top: u.scrollTop
      });
    for (typeof a.focus == "function" && a.focus(), a = 0; a < l.length; a++)
      u = l[a], u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
  }
}
var Wh = va && "documentMode" in document && 11 >= document.documentMode, gu = null, hn = null, it = null, yn = !1;
function fi(l, a, u) {
  var t = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
  yn || gu == null || gu !== Ne(t) || (t = gu, "selectionStart" in t && ac(t) ? t = { start: t.selectionStart, end: t.selectionEnd } : (t = (t.ownerDocument && t.ownerDocument.defaultView || window).getSelection(), t = {
    anchorNode: t.anchorNode,
    anchorOffset: t.anchorOffset,
    focusNode: t.focusNode,
    focusOffset: t.focusOffset
  }), it && Ot(it, t) || (it = t, t = re(hn, "onSelect"), 0 < t.length && (a = new lf(
    "onSelect",
    "select",
    null,
    a,
    u
  ), l.push({ event: a, listeners: t }), a.target = gu)));
}
function Va(l, a) {
  var u = {};
  return u[l.toLowerCase()] = a.toLowerCase(), u["Webkit" + l] = "webkit" + a, u["Moz" + l] = "moz" + a, u;
}
var zu = {
  animationend: Va("Animation", "AnimationEnd"),
  animationiteration: Va("Animation", "AnimationIteration"),
  animationstart: Va("Animation", "AnimationStart"),
  transitionrun: Va("Transition", "TransitionRun"),
  transitionstart: Va("Transition", "TransitionStart"),
  transitioncancel: Va("Transition", "TransitionCancel"),
  transitionend: Va("Transition", "TransitionEnd")
}, qf = {}, Z0 = {};
va && (Z0 = document.createElement("div").style, "AnimationEvent" in window || (delete zu.animationend.animation, delete zu.animationiteration.animation, delete zu.animationstart.animation), "TransitionEvent" in window || delete zu.transitionend.transition);
function eu(l) {
  if (qf[l]) return qf[l];
  if (!zu[l]) return l;
  var a = zu[l], u;
  for (u in a)
    if (a.hasOwnProperty(u) && u in Z0)
      return qf[l] = a[u];
  return l;
}
var j0 = eu("animationend"), V0 = eu("animationiteration"), C0 = eu("animationstart"), $h = eu("transitionrun"), kh = eu("transitionstart"), Fh = eu("transitioncancel"), K0 = eu("transitionend"), x0 = /* @__PURE__ */ new Map(), ni = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
  " "
);
function Kl(l, a) {
  x0.set(l, a), uu(a, [l]);
}
var ql = [], Au = 0, uc = 0;
function tf() {
  for (var l = Au, a = uc = Au = 0; a < l; ) {
    var u = ql[a];
    ql[a++] = null;
    var t = ql[a];
    ql[a++] = null;
    var e = ql[a];
    ql[a++] = null;
    var f = ql[a];
    if (ql[a++] = null, t !== null && e !== null) {
      var n = t.pending;
      n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
    }
    f !== 0 && L0(u, e, f);
  }
}
function ef(l, a, u, t) {
  ql[Au++] = l, ql[Au++] = a, ql[Au++] = u, ql[Au++] = t, uc |= t, l.lanes |= t, l = l.alternate, l !== null && (l.lanes |= t);
}
function tc(l, a, u, t) {
  return ef(l, a, u, t), _e(l);
}
function Ya(l, a) {
  return ef(l, null, null, a), _e(l);
}
function L0(l, a, u) {
  l.lanes |= u;
  var t = l.alternate;
  t !== null && (t.lanes |= u);
  for (var e = !1, f = l.return; f !== null; )
    f.childLanes |= u, t = f.alternate, t !== null && (t.childLanes |= u), f.tag === 22 && (l = f.stateNode, l === null || l._visibility & 1 || (e = !0)), l = f, f = f.return;
  e && a !== null && l.tag === 3 && (f = l.stateNode, e = 31 - Dl(u), f = f.hiddenUpdates, l = f[e], l === null ? f[e] = [a] : l.push(a), a.lane = u | 536870912);
}
function _e(l) {
  if (50 < Tt)
    throw Tt = 0, Rn = null, Error(z(185));
  for (var a = l.return; a !== null; )
    l = a, a = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Tu = {}, ci = /* @__PURE__ */ new WeakMap();
function Rl(l, a) {
  if (typeof l == "object" && l !== null) {
    var u = ci.get(l);
    return u !== void 0 ? u : (a = {
      value: l,
      source: a,
      stack: Cc(a)
    }, ci.set(l, a), a);
  }
  return {
    value: l,
    source: a,
    stack: Cc(a)
  };
}
var Eu = [], Mu = 0, Ye = null, Re = 0, Nl = [], _l = 0, ra = null, ea = 1, fa = "";
function Ka(l, a) {
  Eu[Mu++] = Re, Eu[Mu++] = Ye, Ye = l, Re = a;
}
function p0(l, a, u) {
  Nl[_l++] = ea, Nl[_l++] = fa, Nl[_l++] = ra, ra = l;
  var t = ea;
  l = fa;
  var e = 32 - Dl(t) - 1;
  t &= ~(1 << e), u += 1;
  var f = 32 - Dl(a) + e;
  if (30 < f) {
    var n = e - e % 5;
    f = (t & (1 << n) - 1).toString(32), t >>= n, e -= n, ea = 1 << 32 - Dl(a) + e | u << e | t, fa = f + l;
  } else
    ea = 1 << f | u << e | t, fa = l;
}
function ec(l) {
  l.return !== null && (Ka(l, 1), p0(l, 1, 0));
}
function fc(l) {
  for (; l === Ye; )
    Ye = Eu[--Mu], Eu[Mu] = null, Re = Eu[--Mu], Eu[Mu] = null;
  for (; l === ra; )
    ra = Nl[--_l], Nl[_l] = null, fa = Nl[--_l], Nl[_l] = null, ea = Nl[--_l], Nl[_l] = null;
}
var sl = null, vl = null, X = !1, Vl = null, xl = !1, dn = Error(z(519));
function Fa(l) {
  var a = Error(z(418, ""));
  throw Ht(Rl(a, l)), dn;
}
function ii(l) {
  var a = l.stateNode, u = l.type, t = l.memoizedProps;
  switch (a[yl] = l, a[gl] = t, u) {
    case "dialog":
      Y("cancel", a), Y("close", a);
      break;
    case "iframe":
    case "object":
    case "embed":
      Y("load", a);
      break;
    case "video":
    case "audio":
      for (u = 0; u < Bt.length; u++)
        Y(Bt[u], a);
      break;
    case "source":
      Y("error", a);
      break;
    case "img":
    case "image":
    case "link":
      Y("error", a), Y("load", a);
      break;
    case "details":
      Y("toggle", a);
      break;
    case "input":
      Y("invalid", a), D0(
        a,
        t.value,
        t.defaultValue,
        t.checked,
        t.defaultChecked,
        t.type,
        t.name,
        !0
      ), Be(a);
      break;
    case "select":
      Y("invalid", a);
      break;
    case "textarea":
      Y("invalid", a), O0(a, t.value, t.defaultValue, t.children), Be(a);
  }
  u = t.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || a.textContent === "" + u || t.suppressHydrationWarning === !0 || Tv(a.textContent, u) ? (t.popover != null && (Y("beforetoggle", a), Y("toggle", a)), t.onScroll != null && Y("scroll", a), t.onScrollEnd != null && Y("scrollend", a), t.onClick != null && (a.onclick = df), a = !0) : a = !1, a || Fa(l);
}
function vi(l) {
  for (sl = l.return; sl; )
    switch (sl.tag) {
      case 3:
      case 27:
        xl = !0;
        return;
      case 5:
      case 13:
        xl = !1;
        return;
      default:
        sl = sl.return;
    }
}
function ku(l) {
  if (l !== sl) return !1;
  if (!X) return vi(l), X = !0, !1;
  var a = !1, u;
  if ((u = l.tag !== 3 && l.tag !== 27) && ((u = l.tag === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Cn(l.type, l.memoizedProps)), u = !u), u && (a = !0), a && vl && Fa(l), vi(l), l.tag === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(z(317));
    l: {
      for (l = l.nextSibling, a = 0; l; ) {
        if (l.nodeType === 8)
          if (u = l.data, u === "/$") {
            if (a === 0) {
              vl = Cl(l.nextSibling);
              break l;
            }
            a--;
          } else
            u !== "$" && u !== "$!" && u !== "$?" || a++;
        l = l.nextSibling;
      }
      vl = null;
    }
  } else
    vl = sl ? Cl(l.stateNode.nextSibling) : null;
  return !0;
}
function Ct() {
  vl = sl = null, X = !1;
}
function Ht(l) {
  Vl === null ? Vl = [l] : Vl.push(l);
}
var vt = Error(z(460)), J0 = Error(z(474)), sn = { then: function() {
} };
function hi(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function te() {
}
function r0(l, a, u) {
  switch (u = l[u], u === void 0 ? l.push(a) : u !== a && (a.then(te, te), a = u), a.status) {
    case "fulfilled":
      return a.value;
    case "rejected":
      throw l = a.reason, l === vt ? Error(z(483)) : l;
    default:
      if (typeof a.status == "string") a.then(te, te);
      else {
        if (l = V, l !== null && 100 < l.shellSuspendCounter)
          throw Error(z(482));
        l = a, l.status = "pending", l.then(
          function(t) {
            if (a.status === "pending") {
              var e = a;
              e.status = "fulfilled", e.value = t;
            }
          },
          function(t) {
            if (a.status === "pending") {
              var e = a;
              e.status = "rejected", e.reason = t;
            }
          }
        );
      }
      switch (a.status) {
        case "fulfilled":
          return a.value;
        case "rejected":
          throw l = a.reason, l === vt ? Error(z(483)) : l;
      }
      throw ht = a, vt;
  }
}
var ht = null;
function yi() {
  if (ht === null) throw Error(z(459));
  var l = ht;
  return ht = null, l;
}
var ou = null, ot = 0;
function ee(l) {
  var a = ot;
  return ot += 1, ou === null && (ou = []), r0(ou, l, a);
}
function Fu(l, a) {
  a = a.props.ref, l.ref = a !== void 0 ? a : null;
}
function fe(l, a) {
  throw a.$$typeof === jv ? Error(z(525)) : (l = Object.prototype.toString.call(a), Error(
    z(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : l
    )
  ));
}
function di(l) {
  var a = l._init;
  return a(l._payload);
}
function w0(l) {
  function a(y, h) {
    if (l) {
      var s = y.deletions;
      s === null ? (y.deletions = [h], y.flags |= 16) : s.push(h);
    }
  }
  function u(y, h) {
    if (!l) return null;
    for (; h !== null; )
      a(y, h), h = h.sibling;
    return null;
  }
  function t(y) {
    for (var h = /* @__PURE__ */ new Map(); y !== null; )
      y.key !== null ? h.set(y.key, y) : h.set(y.index, y), y = y.sibling;
    return h;
  }
  function e(y, h) {
    return y = oa(y, h), y.index = 0, y.sibling = null, y;
  }
  function f(y, h, s) {
    return y.index = s, l ? (s = y.alternate, s !== null ? (s = s.index, s < h ? (y.flags |= 33554434, h) : s) : (y.flags |= 33554434, h)) : (y.flags |= 1048576, h);
  }
  function n(y) {
    return l && y.alternate === null && (y.flags |= 33554434), y;
  }
  function c(y, h, s, g) {
    return h === null || h.tag !== 6 ? (h = Cf(s, y.mode, g), h.return = y, h) : (h = e(h, s), h.return = y, h);
  }
  function i(y, h, s, g) {
    var A = s.type;
    return A === su ? S(
      y,
      h,
      s.props.children,
      g,
      s.key
    ) : h !== null && (h.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ba && di(A) === h.type) ? (h = e(h, s.props), Fu(h, s), h.return = y, h) : (h = Ee(
      s.type,
      s.key,
      s.props,
      null,
      y.mode,
      g
    ), Fu(h, s), h.return = y, h);
  }
  function v(y, h, s, g) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== s.containerInfo || h.stateNode.implementation !== s.implementation ? (h = Kf(s, y.mode, g), h.return = y, h) : (h = e(h, s.children || []), h.return = y, h);
  }
  function S(y, h, s, g, A) {
    return h === null || h.tag !== 7 ? (h = Wa(
      s,
      y.mode,
      g,
      A
    ), h.return = y, h) : (h = e(h, s), h.return = y, h);
  }
  function b(y, h, s) {
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return h = Cf(
        "" + h,
        y.mode,
        s
      ), h.return = y, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Pt:
          return s = Ee(
            h.type,
            h.key,
            h.props,
            null,
            y.mode,
            s
          ), Fu(s, h), s.return = y, s;
        case at:
          return h = Kf(
            h,
            y.mode,
            s
          ), h.return = y, h;
        case ba:
          var g = h._init;
          return h = g(h._payload), b(y, h, s);
      }
      if (tt(h) || wu(h))
        return h = Wa(
          h,
          y.mode,
          s,
          null
        ), h.return = y, h;
      if (typeof h.then == "function")
        return b(y, ee(h), s);
      if (h.$$typeof === ta)
        return b(
          y,
          ne(y, h),
          s
        );
      fe(y, h);
    }
    return null;
  }
  function d(y, h, s, g) {
    var A = h !== null ? h.key : null;
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return A !== null ? null : c(y, h, "" + s, g);
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case Pt:
          return s.key === A ? i(y, h, s, g) : null;
        case at:
          return s.key === A ? v(y, h, s, g) : null;
        case ba:
          return A = s._init, s = A(s._payload), d(y, h, s, g);
      }
      if (tt(s) || wu(s))
        return A !== null ? null : S(y, h, s, g, null);
      if (typeof s.then == "function")
        return d(
          y,
          h,
          ee(s),
          g
        );
      if (s.$$typeof === ta)
        return d(
          y,
          h,
          ne(y, s),
          g
        );
      fe(y, s);
    }
    return null;
  }
  function m(y, h, s, g, A) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return y = y.get(s) || null, c(h, y, "" + g, A);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Pt:
          return y = y.get(
            g.key === null ? s : g.key
          ) || null, i(h, y, g, A);
        case at:
          return y = y.get(
            g.key === null ? s : g.key
          ) || null, v(h, y, g, A);
        case ba:
          var O = g._init;
          return g = O(g._payload), m(
            y,
            h,
            s,
            g,
            A
          );
      }
      if (tt(g) || wu(g))
        return y = y.get(s) || null, S(h, y, g, A, null);
      if (typeof g.then == "function")
        return m(
          y,
          h,
          s,
          ee(g),
          A
        );
      if (g.$$typeof === ta)
        return m(
          y,
          h,
          s,
          ne(h, g),
          A
        );
      fe(h, g);
    }
    return null;
  }
  function T(y, h, s, g) {
    for (var A = null, O = null, M = h, D = h = 0, W = null; M !== null && D < s.length; D++) {
      M.index > D ? (W = M, M = null) : W = M.sibling;
      var _ = d(
        y,
        M,
        s[D],
        g
      );
      if (_ === null) {
        M === null && (M = W);
        break;
      }
      l && M && _.alternate === null && a(y, M), h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _, M = W;
    }
    if (D === s.length)
      return u(y, M), X && Ka(y, D), A;
    if (M === null) {
      for (; D < s.length; D++)
        M = b(y, s[D], g), M !== null && (h = f(
          M,
          h,
          D
        ), O === null ? A = M : O.sibling = M, O = M);
      return X && Ka(y, D), A;
    }
    for (M = t(M); D < s.length; D++)
      W = m(
        M,
        y,
        D,
        s[D],
        g
      ), W !== null && (l && W.alternate !== null && M.delete(
        W.key === null ? D : W.key
      ), h = f(
        W,
        h,
        D
      ), O === null ? A = W : O.sibling = W, O = W);
    return l && M.forEach(function(Sl) {
      return a(y, Sl);
    }), X && Ka(y, D), A;
  }
  function U(y, h, s, g) {
    if (s == null) throw Error(z(151));
    for (var A = null, O = null, M = h, D = h = 0, W = null, _ = s.next(); M !== null && !_.done; D++, _ = s.next()) {
      M.index > D ? (W = M, M = null) : W = M.sibling;
      var Sl = d(y, M, _.value, g);
      if (Sl === null) {
        M === null && (M = W);
        break;
      }
      l && M && Sl.alternate === null && a(y, M), h = f(Sl, h, D), O === null ? A = Sl : O.sibling = Sl, O = Sl, M = W;
    }
    if (_.done)
      return u(y, M), X && Ka(y, D), A;
    if (M === null) {
      for (; !_.done; D++, _ = s.next())
        _ = b(y, _.value, g), _ !== null && (h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _);
      return X && Ka(y, D), A;
    }
    for (M = t(M); !_.done; D++, _ = s.next())
      _ = m(M, y, D, _.value, g), _ !== null && (l && _.alternate !== null && M.delete(_.key === null ? D : _.key), h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _);
    return l && M.forEach(function(Wt) {
      return a(y, Wt);
    }), X && Ka(y, D), A;
  }
  function C(y, h, s, g) {
    if (typeof s == "object" && s !== null && s.type === su && s.key === null && (s = s.props.children), typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case Pt:
          l: {
            for (var A = s.key; h !== null; ) {
              if (h.key === A) {
                if (A = s.type, A === su) {
                  if (h.tag === 7) {
                    u(
                      y,
                      h.sibling
                    ), g = e(
                      h,
                      s.props.children
                    ), g.return = y, y = g;
                    break l;
                  }
                } else if (h.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ba && di(A) === h.type) {
                  u(
                    y,
                    h.sibling
                  ), g = e(h, s.props), Fu(g, s), g.return = y, y = g;
                  break l;
                }
                u(y, h);
                break;
              } else a(y, h);
              h = h.sibling;
            }
            s.type === su ? (g = Wa(
              s.props.children,
              y.mode,
              g,
              s.key
            ), g.return = y, y = g) : (g = Ee(
              s.type,
              s.key,
              s.props,
              null,
              y.mode,
              g
            ), Fu(g, s), g.return = y, y = g);
          }
          return n(y);
        case at:
          l: {
            for (A = s.key; h !== null; ) {
              if (h.key === A)
                if (h.tag === 4 && h.stateNode.containerInfo === s.containerInfo && h.stateNode.implementation === s.implementation) {
                  u(
                    y,
                    h.sibling
                  ), g = e(h, s.children || []), g.return = y, y = g;
                  break l;
                } else {
                  u(y, h);
                  break;
                }
              else a(y, h);
              h = h.sibling;
            }
            g = Kf(s, y.mode, g), g.return = y, y = g;
          }
          return n(y);
        case ba:
          return A = s._init, s = A(s._payload), C(
            y,
            h,
            s,
            g
          );
      }
      if (tt(s))
        return T(
          y,
          h,
          s,
          g
        );
      if (wu(s)) {
        if (A = wu(s), typeof A != "function") throw Error(z(150));
        return s = A.call(s), U(
          y,
          h,
          s,
          g
        );
      }
      if (typeof s.then == "function")
        return C(
          y,
          h,
          ee(s),
          g
        );
      if (s.$$typeof === ta)
        return C(
          y,
          h,
          ne(y, s),
          g
        );
      fe(y, s);
    }
    return typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint" ? (s = "" + s, h !== null && h.tag === 6 ? (u(y, h.sibling), g = e(h, s), g.return = y, y = g) : (u(y, h), g = Cf(s, y.mode, g), g.return = y, y = g), n(y)) : u(y, h);
  }
  return function(y, h, s, g) {
    try {
      ot = 0;
      var A = C(
        y,
        h,
        s,
        g
      );
      return ou = null, A;
    } catch (M) {
      if (M === vt) throw M;
      var O = Xl(29, M, null, y.mode);
      return O.lanes = g, O.return = y, O;
    } finally {
    }
  };
}
var Pa = w0(!0), W0 = w0(!1), Qu = Wl(null), Xe = Wl(0);
function si(l, a) {
  l = da, L(Xe, l), L(Qu, a), da = l | a.baseLanes;
}
function mn() {
  L(Xe, da), L(Qu, Qu.current);
}
function nc() {
  da = Xe.current, cl(Qu), cl(Xe);
}
var Gl = Wl(null), rl = null;
function za(l) {
  var a = l.alternate;
  L(al, al.current & 1), L(Gl, l), rl === null && (a === null || Qu.current !== null || a.memoizedState !== null) && (rl = l);
}
function $0(l) {
  if (l.tag === 22) {
    if (L(al, al.current), L(Gl, l), rl === null) {
      var a = l.alternate;
      a !== null && a.memoizedState !== null && (rl = l);
    }
  } else Aa();
}
function Aa() {
  L(al, al.current), L(Gl, Gl.current);
}
function na(l) {
  cl(Gl), rl === l && (rl = null), cl(al);
}
var al = Wl(0);
function Qe(l) {
  for (var a = l; a !== null; ) {
    if (a.tag === 13) {
      var u = a.memoizedState;
      if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!"))
        return a;
    } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
      if ((a.flags & 128) !== 0) return a;
    } else if (a.child !== null) {
      a.child.return = a, a = a.child;
      continue;
    }
    if (a === l) break;
    for (; a.sibling === null; ) {
      if (a.return === null || a.return === l) return null;
      a = a.return;
    }
    a.sibling.return = a.return, a = a.sibling;
  }
  return null;
}
var Ph = typeof AbortController < "u" ? AbortController : function() {
  var l = [], a = this.signal = {
    aborted: !1,
    addEventListener: function(u, t) {
      l.push(t);
    }
  };
  this.abort = function() {
    a.aborted = !0, l.forEach(function(u) {
      return u();
    });
  };
}, Ih = ul.unstable_scheduleCallback, ly = ul.unstable_NormalPriority, ll = {
  $$typeof: ta,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function cc() {
  return {
    controller: new Ph(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Kt(l) {
  l.refCount--, l.refCount === 0 && Ih(ly, function() {
    l.controller.abort();
  });
}
var yt = null, Sn = 0, Gu = 0, qu = null;
function ay(l, a) {
  if (yt === null) {
    var u = yt = [];
    Sn = 0, Gu = Nc(), qu = {
      status: "pending",
      value: void 0,
      then: function(t) {
        u.push(t);
      }
    };
  }
  return Sn++, a.then(mi, mi), a;
}
function mi() {
  if (--Sn === 0 && yt !== null) {
    qu !== null && (qu.status = "fulfilled");
    var l = yt;
    yt = null, Gu = 0, qu = null;
    for (var a = 0; a < l.length; a++) (0, l[a])();
  }
}
function uy(l, a) {
  var u = [], t = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      u.push(e);
    }
  };
  return l.then(
    function() {
      t.status = "fulfilled", t.value = a;
      for (var e = 0; e < u.length; e++) (0, u[e])(a);
    },
    function(e) {
      for (t.status = "rejected", t.reason = e, e = 0; e < u.length; e++)
        (0, u[e])(void 0);
    }
  ), t;
}
var Si = H.S;
H.S = function(l, a) {
  typeof a == "object" && a !== null && typeof a.then == "function" && ay(l, a), Si !== null && Si(l, a);
};
var wa = Wl(null);
function ic() {
  var l = wa.current;
  return l !== null ? l : V.pooledCache;
}
function ge(l, a) {
  a === null ? L(wa, wa.current) : L(wa, a.pool);
}
function k0() {
  var l = ic();
  return l === null ? null : { parent: ll._currentValue, pool: l };
}
var Ra = 0, o = null, G = null, P = null, Ge = !1, Bu = !1, Ia = !1, Ze = 0, qt = 0, Nu = null, ty = 0;
function k() {
  throw Error(z(321));
}
function vc(l, a) {
  if (a === null) return !1;
  for (var u = 0; u < a.length && u < l.length; u++)
    if (!Ol(l[u], a[u])) return !1;
  return !0;
}
function hc(l, a, u, t, e, f) {
  return Ra = f, o = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, H.H = l === null || l.memoizedState === null ? fu : Za, Ia = !1, f = u(t, e), Ia = !1, Bu && (f = P0(
    a,
    u,
    t,
    e
  )), F0(l), f;
}
function F0(l) {
  H.H = wl;
  var a = G !== null && G.next !== null;
  if (Ra = 0, P = G = o = null, Ge = !1, qt = 0, Nu = null, a) throw Error(z(300));
  l === null || nl || (l = l.dependencies, l !== null && Ce(l) && (nl = !0));
}
function P0(l, a, u, t) {
  o = l;
  var e = 0;
  do {
    if (Bu && (Nu = null), qt = 0, Bu = !1, 25 <= e) throw Error(z(301));
    if (e += 1, P = G = null, l.updateQueue != null) {
      var f = l.updateQueue;
      f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
    }
    H.H = nu, f = a(u, t);
  } while (Bu);
  return f;
}
function ey() {
  var l = H.H, a = l.useState()[0];
  return a = typeof a.then == "function" ? xt(a) : a, l = l.useState()[0], (G !== null ? G.memoizedState : null) !== l && (o.flags |= 1024), a;
}
function yc() {
  var l = Ze !== 0;
  return Ze = 0, l;
}
function dc(l, a, u) {
  a.updateQueue = l.updateQueue, a.flags &= -2053, l.lanes &= ~u;
}
function sc(l) {
  if (Ge) {
    for (l = l.memoizedState; l !== null; ) {
      var a = l.queue;
      a !== null && (a.pending = null), l = l.next;
    }
    Ge = !1;
  }
  Ra = 0, P = G = o = null, Bu = !1, qt = Ze = 0, Nu = null;
}
function bl() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return P === null ? o.memoizedState = P = l : P = P.next = l, P;
}
function I() {
  if (G === null) {
    var l = o.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = G.next;
  var a = P === null ? o.memoizedState : P.next;
  if (a !== null)
    P = a, G = l;
  else {
    if (l === null)
      throw o.alternate === null ? Error(z(467)) : Error(z(310));
    G = l, l = {
      memoizedState: G.memoizedState,
      baseState: G.baseState,
      baseQueue: G.baseQueue,
      queue: G.queue,
      next: null
    }, P === null ? o.memoizedState = P = l : P = P.next = l;
  }
  return P;
}
var ff;
ff = function() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
};
function xt(l) {
  var a = qt;
  return qt += 1, Nu === null && (Nu = []), l = r0(Nu, l, a), a = o, (P === null ? a.memoizedState : P.next) === null && (a = a.alternate, H.H = a === null || a.memoizedState === null ? fu : Za), l;
}
function nf(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return xt(l);
    if (l.$$typeof === ta) return dl(l);
  }
  throw Error(z(438, String(l)));
}
function mc(l) {
  var a = null, u = o.updateQueue;
  if (u !== null && (a = u.memoCache), a == null) {
    var t = o.alternate;
    t !== null && (t = t.updateQueue, t !== null && (t = t.memoCache, t != null && (a = {
      data: t.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (a == null && (a = { data: [], index: 0 }), u === null && (u = ff(), o.updateQueue = u), u.memoCache = a, u = a.data[a.index], u === void 0)
    for (u = a.data[a.index] = Array(l), t = 0; t < l; t++)
      u[t] = Cv;
  return a.index++, u;
}
function ha(l, a) {
  return typeof a == "function" ? a(l) : a;
}
function ze(l) {
  var a = I();
  return Sc(a, G, l);
}
function Sc(l, a, u) {
  var t = l.queue;
  if (t === null) throw Error(z(311));
  t.lastRenderedReducer = u;
  var e = l.baseQueue, f = t.pending;
  if (f !== null) {
    if (e !== null) {
      var n = e.next;
      e.next = f.next, f.next = n;
    }
    a.baseQueue = e = f, t.pending = null;
  }
  if (f = l.baseState, e === null) l.memoizedState = f;
  else {
    a = e.next;
    var c = n = null, i = null, v = a, S = !1;
    do {
      var b = v.lane & -536870913;
      if (b !== v.lane ? (R & b) === b : (Ra & b) === b) {
        var d = v.revertLane;
        if (d === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }), b === Gu && (S = !0);
        else if ((Ra & d) === d) {
          v = v.next, d === Gu && (S = !0);
          continue;
        } else
          b = {
            lane: 0,
            revertLane: v.revertLane,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, i === null ? (c = i = b, n = f) : i = i.next = b, o.lanes |= d, Qa |= d;
        b = v.action, Ia && u(f, b), f = v.hasEagerState ? v.eagerState : u(f, b);
      } else
        d = {
          lane: b,
          revertLane: v.revertLane,
          action: v.action,
          hasEagerState: v.hasEagerState,
          eagerState: v.eagerState,
          next: null
        }, i === null ? (c = i = d, n = f) : i = i.next = d, o.lanes |= b, Qa |= b;
      v = v.next;
    } while (v !== null && v !== a);
    if (i === null ? n = f : i.next = c, !Ol(f, l.memoizedState) && (nl = !0, S && (u = qu, u !== null)))
      throw u;
    l.memoizedState = f, l.baseState = n, l.baseQueue = i, t.lastRenderedState = f;
  }
  return e === null && (t.lanes = 0), [l.memoizedState, t.dispatch];
}
function Bf(l) {
  var a = I(), u = a.queue;
  if (u === null) throw Error(z(311));
  u.lastRenderedReducer = l;
  var t = u.dispatch, e = u.pending, f = a.memoizedState;
  if (e !== null) {
    u.pending = null;
    var n = e = e.next;
    do
      f = l(f, n.action), n = n.next;
    while (n !== e);
    Ol(f, a.memoizedState) || (nl = !0), a.memoizedState = f, a.baseQueue === null && (a.baseState = f), u.lastRenderedState = f;
  }
  return [f, t];
}
function I0(l, a, u) {
  var t = o, e = I(), f = X;
  if (f) {
    if (u === void 0) throw Error(z(407));
    u = u();
  } else u = a();
  var n = !Ol(
    (G || e).memoizedState,
    u
  );
  if (n && (e.memoizedState = u, nl = !0), e = e.queue, bc(u1.bind(null, t, e, l), [
    l
  ]), e.getSnapshot !== a || n || P !== null && P.memoizedState.tag & 1) {
    if (t.flags |= 2048, Zu(
      9,
      a1.bind(
        null,
        t,
        e,
        u,
        a
      ),
      { destroy: void 0 },
      null
    ), V === null) throw Error(z(349));
    f || (Ra & 60) !== 0 || l1(t, a, u);
  }
  return u;
}
function l1(l, a, u) {
  l.flags |= 16384, l = { getSnapshot: a, value: u }, a = o.updateQueue, a === null ? (a = ff(), o.updateQueue = a, a.stores = [l]) : (u = a.stores, u === null ? a.stores = [l] : u.push(l));
}
function a1(l, a, u, t) {
  a.value = u, a.getSnapshot = t, t1(a) && e1(l);
}
function u1(l, a, u) {
  return u(function() {
    t1(a) && e1(l);
  });
}
function t1(l) {
  var a = l.getSnapshot;
  l = l.value;
  try {
    var u = a();
    return !Ol(l, u);
  } catch {
    return !0;
  }
}
function e1(l) {
  var a = Ya(l, 2);
  a !== null && ml(a, l, 2);
}
function bn(l) {
  var a = bl();
  if (typeof l == "function") {
    var u = l;
    if (l = u(), Ia) {
      Ma(!0);
      try {
        u();
      } finally {
        Ma(!1);
      }
    }
  }
  return a.memoizedState = a.baseState = l, a.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: ha,
    lastRenderedState: l
  }, a;
}
function f1(l, a, u, t) {
  return l.baseState = u, Sc(
    l,
    G,
    typeof t == "function" ? t : ha
  );
}
function fy(l, a, u, t, e) {
  if (vf(l)) throw Error(z(485));
  if (l = a.action, l !== null) {
    var f = {
      payload: e,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(n) {
        f.listeners.push(n);
      }
    };
    H.T !== null ? u(!0) : f.isTransition = !1, t(f), u = a.pending, u === null ? (f.next = a.pending = f, n1(a, f)) : (f.next = u.next, a.pending = u.next = f);
  }
}
function n1(l, a) {
  var u = a.action, t = a.payload, e = l.state;
  if (a.isTransition) {
    var f = H.T, n = {};
    H.T = n;
    try {
      var c = u(e, t), i = H.S;
      i !== null && i(n, c), bi(l, a, c);
    } catch (v) {
      gn(l, a, v);
    } finally {
      H.T = f;
    }
  } else
    try {
      f = u(e, t), bi(l, a, f);
    } catch (v) {
      gn(l, a, v);
    }
}
function bi(l, a, u) {
  u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
    function(t) {
      gi(l, a, t);
    },
    function(t) {
      return gn(l, a, t);
    }
  ) : gi(l, a, u);
}
function gi(l, a, u) {
  a.status = "fulfilled", a.value = u, c1(a), l.state = u, a = l.pending, a !== null && (u = a.next, u === a ? l.pending = null : (u = u.next, a.next = u, n1(l, u)));
}
function gn(l, a, u) {
  var t = l.pending;
  if (l.pending = null, t !== null) {
    t = t.next;
    do
      a.status = "rejected", a.reason = u, c1(a), a = a.next;
    while (a !== t);
  }
  l.action = null;
}
function c1(l) {
  l = l.listeners;
  for (var a = 0; a < l.length; a++) (0, l[a])();
}
function i1(l, a) {
  return a;
}
function v1(l, a) {
  if (X) {
    var u = V.formState;
    if (u !== null) {
      l: {
        var t = o;
        if (X) {
          if (vl) {
            a: {
              for (var e = vl, f = xl; e.nodeType !== 8; ) {
                if (!f) {
                  e = null;
                  break a;
                }
                if (e = Cl(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break a;
                }
              }
              f = e.data, e = f === "F!" || f === "F" ? e : null;
            }
            if (e) {
              vl = Cl(
                e.nextSibling
              ), t = e.data === "F!";
              break l;
            }
          }
          Fa(t);
        }
        t = !1;
      }
      t && (a = u[0]);
    }
  }
  return u = bl(), u.memoizedState = u.baseState = a, t = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: i1,
    lastRenderedState: a
  }, u.queue = t, u = H1.bind(
    null,
    o,
    t
  ), t.dispatch = u, t = bn(!1), f = Tc.bind(
    null,
    o,
    !1,
    t.queue
  ), t = bl(), e = {
    state: a,
    dispatch: null,
    action: l,
    pending: null
  }, t.queue = e, u = fy.bind(
    null,
    o,
    e,
    f,
    u
  ), e.dispatch = u, t.memoizedState = l, [a, u, !1];
}
function h1(l) {
  var a = I();
  return y1(a, G, l);
}
function y1(l, a, u) {
  a = Sc(
    l,
    a,
    i1
  )[0], l = ze(ha)[0], a = typeof a == "object" && a !== null && typeof a.then == "function" ? xt(a) : a;
  var t = I(), e = t.queue, f = e.dispatch;
  return u !== t.memoizedState && (o.flags |= 2048, Zu(
    9,
    ny.bind(null, e, u),
    { destroy: void 0 },
    null
  )), [a, f, l];
}
function ny(l, a) {
  l.action = a;
}
function d1(l) {
  var a = I(), u = G;
  if (u !== null)
    return y1(a, u, l);
  I(), a = a.memoizedState, u = I();
  var t = u.queue.dispatch;
  return u.memoizedState = l, [a, t, !1];
}
function Zu(l, a, u, t) {
  return l = { tag: l, create: a, inst: u, deps: t, next: null }, a = o.updateQueue, a === null && (a = ff(), o.updateQueue = a), u = a.lastEffect, u === null ? a.lastEffect = l.next = l : (t = u.next, u.next = l, l.next = t, a.lastEffect = l), l;
}
function s1() {
  return I().memoizedState;
}
function Ae(l, a, u, t) {
  var e = bl();
  o.flags |= l, e.memoizedState = Zu(
    1 | a,
    u,
    { destroy: void 0 },
    t === void 0 ? null : t
  );
}
function cf(l, a, u, t) {
  var e = I();
  t = t === void 0 ? null : t;
  var f = e.memoizedState.inst;
  G !== null && t !== null && vc(t, G.memoizedState.deps) ? e.memoizedState = Zu(a, u, f, t) : (o.flags |= l, e.memoizedState = Zu(1 | a, u, f, t));
}
function zi(l, a) {
  Ae(8390656, 8, l, a);
}
function bc(l, a) {
  cf(2048, 8, l, a);
}
function m1(l, a) {
  return cf(4, 2, l, a);
}
function S1(l, a) {
  return cf(4, 4, l, a);
}
function b1(l, a) {
  if (typeof a == "function") {
    l = l();
    var u = a(l);
    return function() {
      typeof u == "function" ? u() : a(null);
    };
  }
  if (a != null)
    return l = l(), a.current = l, function() {
      a.current = null;
    };
}
function g1(l, a, u) {
  u = u != null ? u.concat([l]) : null, cf(4, 4, b1.bind(null, a, l), u);
}
function gc() {
}
function z1(l, a) {
  var u = I();
  a = a === void 0 ? null : a;
  var t = u.memoizedState;
  return a !== null && vc(a, t[1]) ? t[0] : (u.memoizedState = [l, a], l);
}
function A1(l, a) {
  var u = I();
  a = a === void 0 ? null : a;
  var t = u.memoizedState;
  if (a !== null && vc(a, t[1]))
    return t[0];
  if (t = l(), Ia) {
    Ma(!0);
    try {
      l();
    } finally {
      Ma(!1);
    }
  }
  return u.memoizedState = [t, a], t;
}
function zc(l, a, u) {
  return u === void 0 || (Ra & 1073741824) !== 0 ? l.memoizedState = a : (l.memoizedState = u, l = cv(), o.lanes |= l, Qa |= l, u);
}
function T1(l, a, u, t) {
  return Ol(u, a) ? u : Qu.current !== null ? (l = zc(l, u, t), Ol(l, a) || (nl = !0), l) : (Ra & 42) === 0 ? (nl = !0, l.memoizedState = u) : (l = cv(), o.lanes |= l, Qa |= l, a);
}
function E1(l, a, u, t, e) {
  var f = K.p;
  K.p = f !== 0 && 8 > f ? f : 8;
  var n = H.T, c = {};
  H.T = c, Tc(l, !1, a, u);
  try {
    var i = e(), v = H.S;
    if (v !== null && v(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var S = uy(
        i,
        t
      );
      dt(
        l,
        a,
        S,
        Ul(l)
      );
    } else
      dt(
        l,
        a,
        t,
        Ul(l)
      );
  } catch (b) {
    dt(
      l,
      a,
      { then: function() {
      }, status: "rejected", reason: b },
      Ul()
    );
  } finally {
    K.p = f, H.T = n;
  }
}
function cy() {
}
function zn(l, a, u, t) {
  if (l.tag !== 5) throw Error(z(476));
  var e = M1(l).queue;
  E1(
    l,
    e,
    a,
    Ja,
    u === null ? cy : function() {
      return D1(l), u(t);
    }
  );
}
function M1(l) {
  var a = l.memoizedState;
  if (a !== null) return a;
  a = {
    memoizedState: Ja,
    baseState: Ja,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ha,
      lastRenderedState: Ja
    },
    next: null
  };
  var u = {};
  return a.next = {
    memoizedState: u,
    baseState: u,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ha,
      lastRenderedState: u
    },
    next: null
  }, l.memoizedState = a, l = l.alternate, l !== null && (l.memoizedState = a), a;
}
function D1(l) {
  var a = M1(l).next.queue;
  dt(l, a, {}, Ul());
}
function Ac() {
  return dl(Yt);
}
function U1() {
  return I().memoizedState;
}
function O1() {
  return I().memoizedState;
}
function iy(l) {
  for (var a = l.return; a !== null; ) {
    switch (a.tag) {
      case 24:
      case 3:
        var u = Ul();
        l = Oa(u);
        var t = Ha(a, l, u);
        t !== null && (ml(t, a, u), mt(t, a, u)), a = { cache: cc() }, l.payload = a;
        return;
    }
    a = a.return;
  }
}
function vy(l, a, u) {
  var t = Ul();
  u = {
    lane: t,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, vf(l) ? o1(a, u) : (u = tc(l, a, u, t), u !== null && (ml(u, l, t), q1(u, a, t)));
}
function H1(l, a, u) {
  var t = Ul();
  dt(l, a, u, t);
}
function dt(l, a, u, t) {
  var e = {
    lane: t,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (vf(l)) o1(a, e);
  else {
    var f = l.alternate;
    if (l.lanes === 0 && (f === null || f.lanes === 0) && (f = a.lastRenderedReducer, f !== null))
      try {
        var n = a.lastRenderedState, c = f(n, u);
        if (e.hasEagerState = !0, e.eagerState = c, Ol(c, n))
          return ef(l, a, e, 0), V === null && tf(), !1;
      } catch {
      } finally {
      }
    if (u = tc(l, a, e, t), u !== null)
      return ml(u, l, t), q1(u, a, t), !0;
  }
  return !1;
}
function Tc(l, a, u, t) {
  if (t = {
    lane: 2,
    revertLane: Nc(),
    action: t,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, vf(l)) {
    if (a) throw Error(z(479));
  } else
    a = tc(
      l,
      u,
      t,
      2
    ), a !== null && ml(a, l, 2);
}
function vf(l) {
  var a = l.alternate;
  return l === o || a !== null && a === o;
}
function o1(l, a) {
  Bu = Ge = !0;
  var u = l.pending;
  u === null ? a.next = a : (a.next = u.next, u.next = a), l.pending = a;
}
function q1(l, a, u) {
  if ((u & 4194176) !== 0) {
    var t = a.lanes;
    t &= l.pendingLanes, u |= t, a.lanes = u, b0(l, u);
  }
}
var wl = {
  readContext: dl,
  use: nf,
  useCallback: k,
  useContext: k,
  useEffect: k,
  useImperativeHandle: k,
  useLayoutEffect: k,
  useInsertionEffect: k,
  useMemo: k,
  useReducer: k,
  useRef: k,
  useState: k,
  useDebugValue: k,
  useDeferredValue: k,
  useTransition: k,
  useSyncExternalStore: k,
  useId: k
};
wl.useCacheRefresh = k;
wl.useMemoCache = k;
wl.useHostTransitionStatus = k;
wl.useFormState = k;
wl.useActionState = k;
wl.useOptimistic = k;
var fu = {
  readContext: dl,
  use: nf,
  useCallback: function(l, a) {
    return bl().memoizedState = [
      l,
      a === void 0 ? null : a
    ], l;
  },
  useContext: dl,
  useEffect: zi,
  useImperativeHandle: function(l, a, u) {
    u = u != null ? u.concat([l]) : null, Ae(
      4194308,
      4,
      b1.bind(null, a, l),
      u
    );
  },
  useLayoutEffect: function(l, a) {
    return Ae(4194308, 4, l, a);
  },
  useInsertionEffect: function(l, a) {
    Ae(4, 2, l, a);
  },
  useMemo: function(l, a) {
    var u = bl();
    a = a === void 0 ? null : a;
    var t = l();
    if (Ia) {
      Ma(!0);
      try {
        l();
      } finally {
        Ma(!1);
      }
    }
    return u.memoizedState = [t, a], t;
  },
  useReducer: function(l, a, u) {
    var t = bl();
    if (u !== void 0) {
      var e = u(a);
      if (Ia) {
        Ma(!0);
        try {
          u(a);
        } finally {
          Ma(!1);
        }
      }
    } else e = a;
    return t.memoizedState = t.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, t.queue = l, l = l.dispatch = vy.bind(
      null,
      o,
      l
    ), [t.memoizedState, l];
  },
  useRef: function(l) {
    var a = bl();
    return l = { current: l }, a.memoizedState = l;
  },
  useState: function(l) {
    l = bn(l);
    var a = l.queue, u = H1.bind(null, o, a);
    return a.dispatch = u, [l.memoizedState, u];
  },
  useDebugValue: gc,
  useDeferredValue: function(l, a) {
    var u = bl();
    return zc(u, l, a);
  },
  useTransition: function() {
    var l = bn(!1);
    return l = E1.bind(
      null,
      o,
      l.queue,
      !0,
      !1
    ), bl().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, a, u) {
    var t = o, e = bl();
    if (X) {
      if (u === void 0)
        throw Error(z(407));
      u = u();
    } else {
      if (u = a(), V === null) throw Error(z(349));
      (R & 60) !== 0 || l1(t, a, u);
    }
    e.memoizedState = u;
    var f = { value: u, getSnapshot: a };
    return e.queue = f, zi(u1.bind(null, t, f, l), [
      l
    ]), t.flags |= 2048, Zu(
      9,
      a1.bind(
        null,
        t,
        f,
        u,
        a
      ),
      { destroy: void 0 },
      null
    ), u;
  },
  useId: function() {
    var l = bl(), a = V.identifierPrefix;
    if (X) {
      var u = fa, t = ea;
      u = (t & ~(1 << 32 - Dl(t) - 1)).toString(32) + u, a = ":" + a + "R" + u, u = Ze++, 0 < u && (a += "H" + u.toString(32)), a += ":";
    } else
      u = ty++, a = ":" + a + "r" + u.toString(32) + ":";
    return l.memoizedState = a;
  },
  useCacheRefresh: function() {
    return bl().memoizedState = iy.bind(
      null,
      o
    );
  }
};
fu.useMemoCache = mc;
fu.useHostTransitionStatus = Ac;
fu.useFormState = v1;
fu.useActionState = v1;
fu.useOptimistic = function(l) {
  var a = bl();
  a.memoizedState = a.baseState = l;
  var u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: null,
    lastRenderedState: null
  };
  return a.queue = u, a = Tc.bind(
    null,
    o,
    !0,
    u
  ), u.dispatch = a, [l, a];
};
var Za = {
  readContext: dl,
  use: nf,
  useCallback: z1,
  useContext: dl,
  useEffect: bc,
  useImperativeHandle: g1,
  useInsertionEffect: m1,
  useLayoutEffect: S1,
  useMemo: A1,
  useReducer: ze,
  useRef: s1,
  useState: function() {
    return ze(ha);
  },
  useDebugValue: gc,
  useDeferredValue: function(l, a) {
    var u = I();
    return T1(
      u,
      G.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = ze(ha)[0], a = I().memoizedState;
    return [
      typeof l == "boolean" ? l : xt(l),
      a
    ];
  },
  useSyncExternalStore: I0,
  useId: U1
};
Za.useCacheRefresh = O1;
Za.useMemoCache = mc;
Za.useHostTransitionStatus = Ac;
Za.useFormState = h1;
Za.useActionState = h1;
Za.useOptimistic = function(l, a) {
  var u = I();
  return f1(u, G, l, a);
};
var nu = {
  readContext: dl,
  use: nf,
  useCallback: z1,
  useContext: dl,
  useEffect: bc,
  useImperativeHandle: g1,
  useInsertionEffect: m1,
  useLayoutEffect: S1,
  useMemo: A1,
  useReducer: Bf,
  useRef: s1,
  useState: function() {
    return Bf(ha);
  },
  useDebugValue: gc,
  useDeferredValue: function(l, a) {
    var u = I();
    return G === null ? zc(u, l, a) : T1(
      u,
      G.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = Bf(ha)[0], a = I().memoizedState;
    return [
      typeof l == "boolean" ? l : xt(l),
      a
    ];
  },
  useSyncExternalStore: I0,
  useId: U1
};
nu.useCacheRefresh = O1;
nu.useMemoCache = mc;
nu.useHostTransitionStatus = Ac;
nu.useFormState = d1;
nu.useActionState = d1;
nu.useOptimistic = function(l, a) {
  var u = I();
  return G !== null ? f1(u, G, l, a) : (u.baseState = l, [l, u.queue.dispatch]);
};
function Nf(l, a, u, t) {
  a = l.memoizedState, u = u(t, a), u = u == null ? a : x({}, a, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
}
var An = {
  isMounted: function(l) {
    return (l = l._reactInternals) ? Ku(l) === l : !1;
  },
  enqueueSetState: function(l, a, u) {
    l = l._reactInternals;
    var t = Ul(), e = Oa(t);
    e.payload = a, u != null && (e.callback = u), a = Ha(l, e, t), a !== null && (ml(a, l, t), mt(a, l, t));
  },
  enqueueReplaceState: function(l, a, u) {
    l = l._reactInternals;
    var t = Ul(), e = Oa(t);
    e.tag = 1, e.payload = a, u != null && (e.callback = u), a = Ha(l, e, t), a !== null && (ml(a, l, t), mt(a, l, t));
  },
  enqueueForceUpdate: function(l, a) {
    l = l._reactInternals;
    var u = Ul(), t = Oa(u);
    t.tag = 2, a != null && (t.callback = a), a = Ha(l, t, u), a !== null && (ml(a, l, u), mt(a, l, u));
  }
};
function Ai(l, a, u, t, e, f, n) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(t, f, n) : a.prototype && a.prototype.isPureReactComponent ? !Ot(u, t) || !Ot(e, f) : !0;
}
function Ti(l, a, u, t) {
  l = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, t), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, t), a.state !== l && An.enqueueReplaceState(a, a.state, null);
}
function lu(l, a) {
  var u = a;
  if ("ref" in a) {
    u = {};
    for (var t in a)
      t !== "ref" && (u[t] = a[t]);
  }
  if (l = l.defaultProps) {
    u === a && (u = x({}, u));
    for (var e in l)
      u[e] === void 0 && (u[e] = l[e]);
  }
  return u;
}
var je = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var a = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(a)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function B1(l) {
  je(l);
}
function N1(l) {
  console.error(l);
}
function _1(l) {
  je(l);
}
function Ve(l, a) {
  try {
    var u = l.onUncaughtError;
    u(a.value, { componentStack: a.stack });
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
function Ei(l, a, u) {
  try {
    var t = l.onCaughtError;
    t(u.value, {
      componentStack: u.stack,
      errorBoundary: a.tag === 1 ? a.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function Tn(l, a, u) {
  return u = Oa(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
    Ve(l, a);
  }, u;
}
function Y1(l) {
  return l = Oa(l), l.tag = 3, l;
}
function R1(l, a, u, t) {
  var e = u.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var f = t.value;
    l.payload = function() {
      return e(f);
    }, l.callback = function() {
      Ei(a, u, t);
    };
  }
  var n = u.stateNode;
  n !== null && typeof n.componentDidCatch == "function" && (l.callback = function() {
    Ei(a, u, t), typeof e != "function" && (qa === null ? qa = /* @__PURE__ */ new Set([this]) : qa.add(this));
    var c = t.stack;
    this.componentDidCatch(t.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function hy(l, a, u, t, e) {
  if (u.flags |= 32768, t !== null && typeof t == "object" && typeof t.then == "function") {
    if (a = u.alternate, a !== null && Lt(
      a,
      u,
      e,
      !0
    ), u = Gl.current, u !== null) {
      switch (u.tag) {
        case 13:
          return rl === null ? Qn() : u.alternate === null && w === 0 && (w = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, t === sn ? u.flags |= 16384 : (a = u.updateQueue, a === null ? u.updateQueue = /* @__PURE__ */ new Set([t]) : a.add(t), Lf(l, t, e)), !1;
        case 22:
          return u.flags |= 65536, t === sn ? u.flags |= 16384 : (a = u.updateQueue, a === null ? (a = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([t])
          }, u.updateQueue = a) : (u = a.retryQueue, u === null ? a.retryQueue = /* @__PURE__ */ new Set([t]) : u.add(t)), Lf(l, t, e)), !1;
      }
      throw Error(z(435, u.tag));
    }
    return Lf(l, t, e), Qn(), !1;
  }
  if (X)
    return a = Gl.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = e, t !== dn && (l = Error(z(422), { cause: t }), Ht(Rl(l, u)))) : (t !== dn && (a = Error(z(423), {
      cause: t
    }), Ht(
      Rl(a, u)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, t = Rl(t, u), e = Tn(
      l.stateNode,
      t,
      e
    ), Gf(l, e), w !== 4 && (w = 2)), !1;
  var f = Error(z(520), { cause: t });
  if (f = Rl(f, u), zt === null ? zt = [f] : zt.push(f), w !== 4 && (w = 2), a === null) return !0;
  t = Rl(t, u), u = a;
  do {
    switch (u.tag) {
      case 3:
        return u.flags |= 65536, l = e & -e, u.lanes |= l, l = Tn(u.stateNode, t, l), Gf(u, l), !1;
      case 1:
        if (a = u.type, f = u.stateNode, (u.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (qa === null || !qa.has(f))))
          return u.flags |= 65536, e &= -e, u.lanes |= e, e = Y1(e), R1(
            e,
            l,
            u,
            t
          ), Gf(u, e), !1;
    }
    u = u.return;
  } while (u !== null);
  return !1;
}
var X1 = Error(z(461)), nl = !1;
function il(l, a, u, t) {
  a.child = l === null ? W0(a, null, u, t) : Pa(
    a,
    l.child,
    u,
    t
  );
}
function Mi(l, a, u, t, e) {
  u = u.render;
  var f = a.ref;
  if ("ref" in t) {
    var n = {};
    for (var c in t)
      c !== "ref" && (n[c] = t[c]);
  } else n = t;
  return au(a), t = hc(
    l,
    a,
    u,
    n,
    f,
    e
  ), c = yc(), l !== null && !nl ? (dc(l, a, e), ya(l, a, e)) : (X && c && ec(a), a.flags |= 1, il(l, a, t, e), a.child);
}
function Di(l, a, u, t, e) {
  if (l === null) {
    var f = u.type;
    return typeof f == "function" && !Oc(f) && f.defaultProps === void 0 && u.compare === null ? (a.tag = 15, a.type = f, Q1(
      l,
      a,
      f,
      t,
      e
    )) : (l = Ee(
      u.type,
      null,
      t,
      a,
      a.mode,
      e
    ), l.ref = a.ref, l.return = a, a.child = l);
  }
  if (f = l.child, !Ec(l, e)) {
    var n = f.memoizedProps;
    if (u = u.compare, u = u !== null ? u : Ot, u(n, t) && l.ref === a.ref)
      return ya(l, a, e);
  }
  return a.flags |= 1, l = oa(f, t), l.ref = a.ref, l.return = a, a.child = l;
}
function Q1(l, a, u, t, e) {
  if (l !== null) {
    var f = l.memoizedProps;
    if (Ot(f, t) && l.ref === a.ref)
      if (nl = !1, a.pendingProps = t = f, Ec(l, e))
        (l.flags & 131072) !== 0 && (nl = !0);
      else
        return a.lanes = l.lanes, ya(l, a, e);
  }
  return En(
    l,
    a,
    u,
    t,
    e
  );
}
function G1(l, a, u) {
  var t = a.pendingProps, e = t.children, f = (a.stateNode._pendingVisibility & 2) !== 0, n = l !== null ? l.memoizedState : null;
  if (st(l, a), t.mode === "hidden" || f) {
    if ((a.flags & 128) !== 0) {
      if (t = n !== null ? n.baseLanes | u : u, l !== null) {
        for (e = a.child = l.child, f = 0; e !== null; )
          f = f | e.lanes | e.childLanes, e = e.sibling;
        a.childLanes = f & ~t;
      } else a.childLanes = 0, a.child = null;
      return Ui(
        l,
        a,
        t,
        u
      );
    }
    if ((u & 536870912) !== 0)
      a.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && ge(
        a,
        n !== null ? n.cachePool : null
      ), n !== null ? si(a, n) : mn(), $0(a);
    else
      return a.lanes = a.childLanes = 536870912, Ui(
        l,
        a,
        n !== null ? n.baseLanes | u : u,
        u
      );
  } else
    n !== null ? (ge(a, n.cachePool), si(a, n), Aa(), a.memoizedState = null) : (l !== null && ge(a, null), mn(), Aa());
  return il(l, a, e, u), a.child;
}
function Ui(l, a, u, t) {
  var e = ic();
  return e = e === null ? null : { parent: ll._currentValue, pool: e }, a.memoizedState = {
    baseLanes: u,
    cachePool: e
  }, l !== null && ge(a, null), mn(), $0(a), l !== null && Lt(l, a, t, !0), null;
}
function st(l, a) {
  var u = a.ref;
  if (u === null)
    l !== null && l.ref !== null && (a.flags |= 2097664);
  else {
    if (typeof u != "function" && typeof u != "object")
      throw Error(z(284));
    (l === null || l.ref !== u) && (a.flags |= 2097664);
  }
}
function En(l, a, u, t, e) {
  return au(a), u = hc(
    l,
    a,
    u,
    t,
    void 0,
    e
  ), t = yc(), l !== null && !nl ? (dc(l, a, e), ya(l, a, e)) : (X && t && ec(a), a.flags |= 1, il(l, a, u, e), a.child);
}
function Oi(l, a, u, t, e, f) {
  return au(a), a.updateQueue = null, u = P0(
    a,
    t,
    u,
    e
  ), F0(l), t = yc(), l !== null && !nl ? (dc(l, a, f), ya(l, a, f)) : (X && t && ec(a), a.flags |= 1, il(l, a, u, f), a.child);
}
function Hi(l, a, u, t, e) {
  if (au(a), a.stateNode === null) {
    var f = Tu, n = u.contextType;
    typeof n == "object" && n !== null && (f = dl(n)), f = new u(t, f), a.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = An, a.stateNode = f, f._reactInternals = a, f = a.stateNode, f.props = t, f.state = a.memoizedState, f.refs = {}, Mc(a), n = u.contextType, f.context = typeof n == "object" && n !== null ? dl(n) : Tu, f.state = a.memoizedState, n = u.getDerivedStateFromProps, typeof n == "function" && (Nf(
      a,
      u,
      n,
      t
    ), f.state = a.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (n = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), n !== f.state && An.enqueueReplaceState(f, f.state, null), bt(a, t, f, e), St(), f.state = a.memoizedState), typeof f.componentDidMount == "function" && (a.flags |= 4194308), t = !0;
  } else if (l === null) {
    f = a.stateNode;
    var c = a.memoizedProps, i = lu(u, c);
    f.props = i;
    var v = f.context, S = u.contextType;
    n = Tu, typeof S == "object" && S !== null && (n = dl(S));
    var b = u.getDerivedStateFromProps;
    S = typeof b == "function" || typeof f.getSnapshotBeforeUpdate == "function", c = a.pendingProps !== c, S || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (c || v !== n) && Ti(
      a,
      f,
      t,
      n
    ), ga = !1;
    var d = a.memoizedState;
    f.state = d, bt(a, t, f, e), St(), v = a.memoizedState, c || d !== v || ga ? (typeof b == "function" && (Nf(
      a,
      u,
      b,
      t
    ), v = a.memoizedState), (i = ga || Ai(
      a,
      u,
      i,
      t,
      d,
      v,
      n
    )) ? (S || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = t, a.memoizedState = v), f.props = t, f.state = v, f.context = n, t = i) : (typeof f.componentDidMount == "function" && (a.flags |= 4194308), t = !1);
  } else {
    f = a.stateNode, on(l, a), n = a.memoizedProps, S = lu(u, n), f.props = S, b = a.pendingProps, d = f.context, v = u.contextType, i = Tu, typeof v == "object" && v !== null && (i = dl(v)), c = u.getDerivedStateFromProps, (v = typeof c == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (n !== b || d !== i) && Ti(
      a,
      f,
      t,
      i
    ), ga = !1, d = a.memoizedState, f.state = d, bt(a, t, f, e), St();
    var m = a.memoizedState;
    n !== b || d !== m || ga || l !== null && l.dependencies !== null && Ce(l.dependencies) ? (typeof c == "function" && (Nf(
      a,
      u,
      c,
      t
    ), m = a.memoizedState), (S = ga || Ai(
      a,
      u,
      S,
      t,
      d,
      m,
      i
    ) || l !== null && l.dependencies !== null && Ce(l.dependencies)) ? (v || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(t, m, i), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
      t,
      m,
      i
    )), typeof f.componentDidUpdate == "function" && (a.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || n === l.memoizedProps && d === l.memoizedState || (a.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || n === l.memoizedProps && d === l.memoizedState || (a.flags |= 1024), a.memoizedProps = t, a.memoizedState = m), f.props = t, f.state = m, f.context = i, t = S) : (typeof f.componentDidUpdate != "function" || n === l.memoizedProps && d === l.memoizedState || (a.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || n === l.memoizedProps && d === l.memoizedState || (a.flags |= 1024), t = !1);
  }
  return f = t, st(l, a), t = (a.flags & 128) !== 0, f || t ? (f = a.stateNode, u = t && typeof u.getDerivedStateFromError != "function" ? null : f.render(), a.flags |= 1, l !== null && t ? (a.child = Pa(
    a,
    l.child,
    null,
    e
  ), a.child = Pa(
    a,
    null,
    u,
    e
  )) : il(l, a, u, e), a.memoizedState = f.state, l = a.child) : l = ya(
    l,
    a,
    e
  ), l;
}
function oi(l, a, u, t) {
  return Ct(), a.flags |= 256, il(l, a, u, t), a.child;
}
var _f = { dehydrated: null, treeContext: null, retryLane: 0 };
function Yf(l) {
  return { baseLanes: l, cachePool: k0() };
}
function Rf(l, a, u) {
  return l = l !== null ? l.childLanes & ~u : 0, a && (l |= Ql), l;
}
function Z1(l, a, u) {
  var t = a.pendingProps, e = !1, f = (a.flags & 128) !== 0, n;
  if ((n = f) || (n = l !== null && l.memoizedState === null ? !1 : (al.current & 2) !== 0), n && (e = !0, a.flags &= -129), n = (a.flags & 32) !== 0, a.flags &= -33, l === null) {
    if (X) {
      if (e ? za(a) : Aa(), X) {
        var c = vl, i;
        if (i = c) {
          l: {
            for (i = c, c = xl; i.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break l;
              }
              if (i = Cl(
                i.nextSibling
              ), i === null) {
                c = null;
                break l;
              }
            }
            c = i;
          }
          c !== null ? (a.memoizedState = {
            dehydrated: c,
            treeContext: ra !== null ? { id: ea, overflow: fa } : null,
            retryLane: 536870912
          }, i = Xl(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = a, a.child = i, sl = a, vl = null, i = !0) : i = !1;
        }
        i || Fa(a);
      }
      if (c = a.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return c.data === "$!" ? a.lanes = 16 : a.lanes = 536870912, null;
      na(a);
    }
    return c = t.children, t = t.fallback, e ? (Aa(), e = a.mode, c = Dn(
      { mode: "hidden", children: c },
      e
    ), t = Wa(
      t,
      e,
      u,
      null
    ), c.return = a, t.return = a, c.sibling = t, a.child = c, e = a.child, e.memoizedState = Yf(u), e.childLanes = Rf(
      l,
      n,
      u
    ), a.memoizedState = _f, t) : (za(a), Mn(a, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (f)
      a.flags & 256 ? (za(a), a.flags &= -257, a = Xf(
        l,
        a,
        u
      )) : a.memoizedState !== null ? (Aa(), a.child = l.child, a.flags |= 128, a = null) : (Aa(), e = t.fallback, c = a.mode, t = Dn(
        { mode: "visible", children: t.children },
        c
      ), e = Wa(
        e,
        c,
        u,
        null
      ), e.flags |= 2, t.return = a, e.return = a, t.sibling = e, a.child = t, Pa(
        a,
        l.child,
        null,
        u
      ), t = a.child, t.memoizedState = Yf(u), t.childLanes = Rf(
        l,
        n,
        u
      ), a.memoizedState = _f, a = e);
    else if (za(a), c.data === "$!") {
      if (n = c.nextSibling && c.nextSibling.dataset, n) var v = n.dgst;
      n = v, t = Error(z(419)), t.stack = "", t.digest = n, Ht({ value: t, source: null, stack: null }), a = Xf(
        l,
        a,
        u
      );
    } else if (nl || Lt(l, a, u, !1), n = (u & l.childLanes) !== 0, nl || n) {
      if (n = V, n !== null) {
        if (t = u & -u, (t & 42) !== 0) t = 1;
        else
          switch (t) {
            case 2:
              t = 1;
              break;
            case 8:
              t = 4;
              break;
            case 32:
              t = 16;
              break;
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              t = 64;
              break;
            case 268435456:
              t = 134217728;
              break;
            default:
              t = 0;
          }
        if (t = (t & (n.suspendedLanes | u)) !== 0 ? 0 : t, t !== 0 && t !== i.retryLane)
          throw i.retryLane = t, Ya(l, t), ml(n, l, t), X1;
      }
      c.data === "$?" || Qn(), a = Xf(
        l,
        a,
        u
      );
    } else
      c.data === "$?" ? (a.flags |= 128, a.child = l.child, a = Oy.bind(
        null,
        l
      ), c._reactRetry = a, a = null) : (l = i.treeContext, vl = Cl(
        c.nextSibling
      ), sl = a, X = !0, Vl = null, xl = !1, l !== null && (Nl[_l++] = ea, Nl[_l++] = fa, Nl[_l++] = ra, ea = l.id, fa = l.overflow, ra = a), a = Mn(
        a,
        t.children
      ), a.flags |= 4096);
    return a;
  }
  return e ? (Aa(), e = t.fallback, c = a.mode, i = l.child, v = i.sibling, t = oa(i, {
    mode: "hidden",
    children: t.children
  }), t.subtreeFlags = i.subtreeFlags & 31457280, v !== null ? e = oa(v, e) : (e = Wa(
    e,
    c,
    u,
    null
  ), e.flags |= 2), e.return = a, t.return = a, t.sibling = e, a.child = t, t = e, e = a.child, c = l.child.memoizedState, c === null ? c = Yf(u) : (i = c.cachePool, i !== null ? (v = ll._currentValue, i = i.parent !== v ? { parent: v, pool: v } : i) : i = k0(), c = {
    baseLanes: c.baseLanes | u,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = Rf(
    l,
    n,
    u
  ), a.memoizedState = _f, t) : (za(a), u = l.child, l = u.sibling, u = oa(u, {
    mode: "visible",
    children: t.children
  }), u.return = a, u.sibling = null, l !== null && (n = a.deletions, n === null ? (a.deletions = [l], a.flags |= 16) : n.push(l)), a.child = u, a.memoizedState = null, u);
}
function Mn(l, a) {
  return a = Dn(
    { mode: "visible", children: a },
    l.mode
  ), a.return = l, l.child = a;
}
function Dn(l, a) {
  return fv(l, a, 0, null);
}
function Xf(l, a, u) {
  return Pa(a, l.child, null, u), l = Mn(
    a,
    a.pendingProps.children
  ), l.flags |= 2, a.memoizedState = null, l;
}
function qi(l, a, u) {
  l.lanes |= a;
  var t = l.alternate;
  t !== null && (t.lanes |= a), On(l.return, a, u);
}
function Qf(l, a, u, t, e) {
  var f = l.memoizedState;
  f === null ? l.memoizedState = {
    isBackwards: a,
    rendering: null,
    renderingStartTime: 0,
    last: t,
    tail: u,
    tailMode: e
  } : (f.isBackwards = a, f.rendering = null, f.renderingStartTime = 0, f.last = t, f.tail = u, f.tailMode = e);
}
function j1(l, a, u) {
  var t = a.pendingProps, e = t.revealOrder, f = t.tail;
  if (il(l, a, t.children, u), t = al.current, (t & 2) !== 0)
    t = t & 1 | 2, a.flags |= 128;
  else {
    if (l !== null && (l.flags & 128) !== 0)
      l: for (l = a.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && qi(l, u, a);
        else if (l.tag === 19)
          qi(l, u, a);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === a) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === a)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    t &= 1;
  }
  switch (L(al, t), e) {
    case "forwards":
      for (u = a.child, e = null; u !== null; )
        l = u.alternate, l !== null && Qe(l) === null && (e = u), u = u.sibling;
      u = e, u === null ? (e = a.child, a.child = null) : (e = u.sibling, u.sibling = null), Qf(
        a,
        !1,
        e,
        u,
        f
      );
      break;
    case "backwards":
      for (u = null, e = a.child, a.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && Qe(l) === null) {
          a.child = e;
          break;
        }
        l = e.sibling, e.sibling = u, u = e, e = l;
      }
      Qf(
        a,
        !0,
        u,
        null,
        f
      );
      break;
    case "together":
      Qf(a, !1, null, null, void 0);
      break;
    default:
      a.memoizedState = null;
  }
  return a.child;
}
function ya(l, a, u) {
  if (l !== null && (a.dependencies = l.dependencies), Qa |= a.lanes, (u & a.childLanes) === 0)
    if (l !== null) {
      if (Lt(
        l,
        a,
        u,
        !1
      ), (u & a.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && a.child !== l.child)
    throw Error(z(153));
  if (a.child !== null) {
    for (l = a.child, u = oa(l, l.pendingProps), a.child = u, u.return = a; l.sibling !== null; )
      l = l.sibling, u = u.sibling = oa(l, l.pendingProps), u.return = a;
    u.sibling = null;
  }
  return a.child;
}
function Ec(l, a) {
  return (l.lanes & a) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Ce(l)));
}
function yy(l, a, u) {
  switch (a.tag) {
    case 3:
      He(a, a.stateNode.containerInfo), Ta(a, ll, l.memoizedState.cache), Ct();
      break;
    case 27:
    case 5:
      un(a);
      break;
    case 4:
      He(a, a.stateNode.containerInfo);
      break;
    case 10:
      Ta(
        a,
        a.type,
        a.memoizedProps.value
      );
      break;
    case 13:
      var t = a.memoizedState;
      if (t !== null)
        return t.dehydrated !== null ? (za(a), a.flags |= 128, null) : (u & a.child.childLanes) !== 0 ? Z1(l, a, u) : (za(a), l = ya(
          l,
          a,
          u
        ), l !== null ? l.sibling : null);
      za(a);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (t = (u & a.childLanes) !== 0, t || (Lt(
        l,
        a,
        u,
        !1
      ), t = (u & a.childLanes) !== 0), e) {
        if (t)
          return j1(
            l,
            a,
            u
          );
        a.flags |= 128;
      }
      if (e = a.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), L(al, al.current), t) break;
      return null;
    case 22:
    case 23:
      return a.lanes = 0, G1(l, a, u);
    case 24:
      Ta(a, ll, l.memoizedState.cache);
  }
  return ya(l, a, u);
}
function V1(l, a, u) {
  if (l !== null)
    if (l.memoizedProps !== a.pendingProps)
      nl = !0;
    else {
      if (!Ec(l, u) && (a.flags & 128) === 0)
        return nl = !1, yy(
          l,
          a,
          u
        );
      nl = (l.flags & 131072) !== 0;
    }
  else
    nl = !1, X && (a.flags & 1048576) !== 0 && p0(a, Re, a.index);
  switch (a.lanes = 0, a.tag) {
    case 16:
      l: {
        l = a.pendingProps;
        var t = a.elementType, e = t._init;
        if (t = e(t._payload), a.type = t, typeof t == "function")
          Oc(t) ? (l = lu(t, l), a.tag = 1, a = Hi(
            null,
            a,
            t,
            l,
            u
          )) : (a.tag = 0, a = En(
            null,
            a,
            t,
            l,
            u
          ));
        else {
          if (t != null) {
            if (e = t.$$typeof, e === rn) {
              a.tag = 11, a = Mi(
                null,
                a,
                t,
                l,
                u
              );
              break l;
            } else if (e === wn) {
              a.tag = 14, a = Di(
                null,
                a,
                t,
                l,
                u
              );
              break l;
            }
          }
          throw a = ln(t) || t, Error(z(306, a, ""));
        }
      }
      return a;
    case 0:
      return En(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 1:
      return t = a.type, e = lu(
        t,
        a.pendingProps
      ), Hi(
        l,
        a,
        t,
        e,
        u
      );
    case 3:
      l: {
        if (He(
          a,
          a.stateNode.containerInfo
        ), l === null) throw Error(z(387));
        var f = a.pendingProps;
        e = a.memoizedState, t = e.element, on(l, a), bt(a, f, null, u);
        var n = a.memoizedState;
        if (f = n.cache, Ta(a, ll, f), f !== e.cache && Hn(
          a,
          [ll],
          u,
          !0
        ), St(), f = n.element, e.isDehydrated)
          if (e = {
            element: f,
            isDehydrated: !1,
            cache: n.cache
          }, a.updateQueue.baseState = e, a.memoizedState = e, a.flags & 256) {
            a = oi(
              l,
              a,
              f,
              u
            );
            break l;
          } else if (f !== t) {
            t = Rl(
              Error(z(424)),
              a
            ), Ht(t), a = oi(
              l,
              a,
              f,
              u
            );
            break l;
          } else
            for (vl = Cl(
              a.stateNode.containerInfo.firstChild
            ), sl = a, X = !0, Vl = null, xl = !0, u = W0(
              a,
              null,
              f,
              u
            ), a.child = u; u; )
              u.flags = u.flags & -3 | 4096, u = u.sibling;
        else {
          if (Ct(), f === t) {
            a = ya(
              l,
              a,
              u
            );
            break l;
          }
          il(l, a, f, u);
        }
        a = a.child;
      }
      return a;
    case 26:
      return st(l, a), l === null ? (u = ri(
        a.type,
        null,
        a.pendingProps,
        null
      )) ? a.memoizedState = u : X || (u = a.type, l = a.pendingProps, t = we(
        Ua.current
      ).createElement(u), t[yl] = a, t[gl] = l, hl(t, u, l), fl(t), a.stateNode = t) : a.memoizedState = ri(
        a.type,
        l.memoizedProps,
        a.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return un(a), l === null && X && (t = a.stateNode = Dv(
        a.type,
        a.pendingProps,
        Ua.current
      ), sl = a, xl = !0, vl = Cl(
        t.firstChild
      )), t = a.pendingProps.children, l !== null || X ? il(
        l,
        a,
        t,
        u
      ) : a.child = Pa(
        a,
        null,
        t,
        u
      ), st(l, a), a.child;
    case 5:
      return l === null && X && ((e = t = vl) && (t = Ky(
        t,
        a.type,
        a.pendingProps,
        xl
      ), t !== null ? (a.stateNode = t, sl = a, vl = Cl(
        t.firstChild
      ), xl = !1, e = !0) : e = !1), e || Fa(a)), un(a), e = a.type, f = a.pendingProps, n = l !== null ? l.memoizedProps : null, t = f.children, Cn(e, f) ? t = null : n !== null && Cn(e, n) && (a.flags |= 32), a.memoizedState !== null && (e = hc(
        l,
        a,
        ey,
        null,
        null,
        u
      ), Yt._currentValue = e), st(l, a), il(l, a, t, u), a.child;
    case 6:
      return l === null && X && ((l = u = vl) && (u = xy(
        u,
        a.pendingProps,
        xl
      ), u !== null ? (a.stateNode = u, sl = a, vl = null, l = !0) : l = !1), l || Fa(a)), null;
    case 13:
      return Z1(l, a, u);
    case 4:
      return He(
        a,
        a.stateNode.containerInfo
      ), t = a.pendingProps, l === null ? a.child = Pa(
        a,
        null,
        t,
        u
      ) : il(
        l,
        a,
        t,
        u
      ), a.child;
    case 11:
      return Mi(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 7:
      return il(
        l,
        a,
        a.pendingProps,
        u
      ), a.child;
    case 8:
      return il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 12:
      return il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 10:
      return t = a.pendingProps, Ta(a, a.type, t.value), il(
        l,
        a,
        t.children,
        u
      ), a.child;
    case 9:
      return e = a.type._context, t = a.pendingProps.children, au(a), e = dl(e), t = t(e), a.flags |= 1, il(l, a, t, u), a.child;
    case 14:
      return Di(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 15:
      return Q1(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 19:
      return j1(l, a, u);
    case 22:
      return G1(l, a, u);
    case 24:
      return au(a), t = dl(ll), l === null ? (e = ic(), e === null && (e = V, f = cc(), e.pooledCache = f, f.refCount++, f !== null && (e.pooledCacheLanes |= u), e = f), a.memoizedState = {
        parent: t,
        cache: e
      }, Mc(a), Ta(a, ll, e)) : ((l.lanes & u) !== 0 && (on(l, a), bt(a, null, null, u), St()), e = l.memoizedState, f = a.memoizedState, e.parent !== t ? (e = { parent: t, cache: t }, a.memoizedState = e, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = e), Ta(a, ll, t)) : (t = f.cache, Ta(a, ll, t), t !== e.cache && Hn(
        a,
        [ll],
        u,
        !0
      ))), il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 29:
      throw a.pendingProps;
  }
  throw Error(z(156, a.tag));
}
var Un = Wl(null), cu = null, ca = null;
function Ta(l, a, u) {
  L(Un, a._currentValue), a._currentValue = u;
}
function ia(l) {
  l._currentValue = Un.current, cl(Un);
}
function On(l, a, u) {
  for (; l !== null; ) {
    var t = l.alternate;
    if ((l.childLanes & a) !== a ? (l.childLanes |= a, t !== null && (t.childLanes |= a)) : t !== null && (t.childLanes & a) !== a && (t.childLanes |= a), l === u) break;
    l = l.return;
  }
}
function Hn(l, a, u, t) {
  var e = l.child;
  for (e !== null && (e.return = l); e !== null; ) {
    var f = e.dependencies;
    if (f !== null) {
      var n = e.child;
      f = f.firstContext;
      l: for (; f !== null; ) {
        var c = f;
        f = e;
        for (var i = 0; i < a.length; i++)
          if (c.context === a[i]) {
            f.lanes |= u, c = f.alternate, c !== null && (c.lanes |= u), On(
              f.return,
              u,
              l
            ), t || (n = null);
            break l;
          }
        f = c.next;
      }
    } else if (e.tag === 18) {
      if (n = e.return, n === null) throw Error(z(341));
      n.lanes |= u, f = n.alternate, f !== null && (f.lanes |= u), On(n, u, l), n = null;
    } else n = e.child;
    if (n !== null) n.return = e;
    else
      for (n = e; n !== null; ) {
        if (n === l) {
          n = null;
          break;
        }
        if (e = n.sibling, e !== null) {
          e.return = n.return, n = e;
          break;
        }
        n = n.return;
      }
    e = n;
  }
}
function Lt(l, a, u, t) {
  l = null;
  for (var e = a, f = !1; e !== null; ) {
    if (!f) {
      if ((e.flags & 524288) !== 0) f = !0;
      else if ((e.flags & 262144) !== 0) break;
    }
    if (e.tag === 10) {
      var n = e.alternate;
      if (n === null) throw Error(z(387));
      if (n = n.memoizedProps, n !== null) {
        var c = e.type;
        Ol(e.pendingProps.value, n.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === Oe.current) {
      if (n = e.alternate, n === null) throw Error(z(387));
      n.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Yt) : l = [Yt]);
    }
    e = e.return;
  }
  l !== null && Hn(
    a,
    l,
    u,
    t
  ), a.flags |= 262144;
}
function Ce(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!Ol(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function au(l) {
  cu = l, ca = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function dl(l) {
  return C1(cu, l);
}
function ne(l, a) {
  return cu === null && au(l), C1(l, a);
}
function C1(l, a) {
  var u = a._currentValue;
  if (a = { context: a, memoizedValue: u, next: null }, ca === null) {
    if (l === null) throw Error(z(308));
    ca = a, l.dependencies = { lanes: 0, firstContext: a }, l.flags |= 524288;
  } else ca = ca.next = a;
  return u;
}
var ga = !1;
function Mc(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function on(l, a) {
  l = l.updateQueue, a.updateQueue === l && (a.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function Oa(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Ha(l, a, u) {
  var t = l.updateQueue;
  if (t === null) return null;
  if (t = t.shared, (J & 2) !== 0) {
    var e = t.pending;
    return e === null ? a.next = a : (a.next = e.next, e.next = a), t.pending = a, a = _e(l), L0(l, null, u), a;
  }
  return ef(l, t, a, u), _e(l);
}
function mt(l, a, u) {
  if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194176) !== 0)) {
    var t = a.lanes;
    t &= l.pendingLanes, u |= t, a.lanes = u, b0(l, u);
  }
}
function Gf(l, a) {
  var u = l.updateQueue, t = l.alternate;
  if (t !== null && (t = t.updateQueue, u === t)) {
    var e = null, f = null;
    if (u = u.firstBaseUpdate, u !== null) {
      do {
        var n = {
          lane: u.lane,
          tag: u.tag,
          payload: u.payload,
          callback: null,
          next: null
        };
        f === null ? e = f = n : f = f.next = n, u = u.next;
      } while (u !== null);
      f === null ? e = f = a : f = f.next = a;
    } else e = f = a;
    u = {
      baseState: t.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: f,
      shared: t.shared,
      callbacks: t.callbacks
    }, l.updateQueue = u;
    return;
  }
  l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = a : l.next = a, u.lastBaseUpdate = a;
}
var qn = !1;
function St() {
  if (qn) {
    var l = qu;
    if (l !== null) throw l;
  }
}
function bt(l, a, u, t) {
  qn = !1;
  var e = l.updateQueue;
  ga = !1;
  var f = e.firstBaseUpdate, n = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, v = i.next;
    i.next = null, n === null ? f = v : n.next = v, n = i;
    var S = l.alternate;
    S !== null && (S = S.updateQueue, c = S.lastBaseUpdate, c !== n && (c === null ? S.firstBaseUpdate = v : c.next = v, S.lastBaseUpdate = i));
  }
  if (f !== null) {
    var b = e.baseState;
    n = 0, S = v = i = null, c = f;
    do {
      var d = c.lane & -536870913, m = d !== c.lane;
      if (m ? (R & d) === d : (t & d) === d) {
        d !== 0 && d === Gu && (qn = !0), S !== null && (S = S.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var T = l, U = c;
          d = a;
          var C = u;
          switch (U.tag) {
            case 1:
              if (T = U.payload, typeof T == "function") {
                b = T.call(C, b, d);
                break l;
              }
              b = T;
              break l;
            case 3:
              T.flags = T.flags & -65537 | 128;
            case 0:
              if (T = U.payload, d = typeof T == "function" ? T.call(C, b, d) : T, d == null) break l;
              b = x({}, b, d);
              break l;
            case 2:
              ga = !0;
          }
        }
        d = c.callback, d !== null && (l.flags |= 64, m && (l.flags |= 8192), m = e.callbacks, m === null ? e.callbacks = [d] : m.push(d));
      } else
        m = {
          lane: d,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, S === null ? (v = S = m, i = b) : S = S.next = m, n |= d;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        m = c, c = m.next, m.next = null, e.lastBaseUpdate = m, e.shared.pending = null;
      }
    } while (!0);
    S === null && (i = b), e.baseState = i, e.firstBaseUpdate = v, e.lastBaseUpdate = S, f === null && (e.shared.lanes = 0), Qa |= n, l.lanes = n, l.memoizedState = b;
  }
}
function K1(l, a) {
  if (typeof l != "function")
    throw Error(z(191, l));
  l.call(a);
}
function x1(l, a) {
  var u = l.callbacks;
  if (u !== null)
    for (l.callbacks = null, l = 0; l < u.length; l++)
      K1(u[l], a);
}
function pt(l, a) {
  try {
    var u = a.updateQueue, t = u !== null ? u.lastEffect : null;
    if (t !== null) {
      var e = t.next;
      u = e;
      do {
        if ((u.tag & l) === l) {
          t = void 0;
          var f = u.create, n = u.inst;
          t = f(), n.destroy = t;
        }
        u = u.next;
      } while (u !== e);
    }
  } catch (c) {
    Z(a, a.return, c);
  }
}
function Xa(l, a, u) {
  try {
    var t = a.updateQueue, e = t !== null ? t.lastEffect : null;
    if (e !== null) {
      var f = e.next;
      t = f;
      do {
        if ((t.tag & l) === l) {
          var n = t.inst, c = n.destroy;
          if (c !== void 0) {
            n.destroy = void 0, e = a;
            var i = u;
            try {
              c();
            } catch (v) {
              Z(
                e,
                i,
                v
              );
            }
          }
        }
        t = t.next;
      } while (t !== f);
    }
  } catch (v) {
    Z(a, a.return, v);
  }
}
function L1(l) {
  var a = l.updateQueue;
  if (a !== null) {
    var u = l.stateNode;
    try {
      x1(a, u);
    } catch (t) {
      Z(l, l.return, t);
    }
  }
}
function p1(l, a, u) {
  u.props = lu(
    l.type,
    l.memoizedProps
  ), u.state = l.memoizedState;
  try {
    u.componentWillUnmount();
  } catch (t) {
    Z(l, a, t);
  }
}
function pa(l, a) {
  try {
    var u = l.ref;
    if (u !== null) {
      var t = l.stateNode;
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var e = t;
          break;
        default:
          e = t;
      }
      typeof u == "function" ? l.refCleanup = u(e) : u.current = e;
    }
  } catch (f) {
    Z(l, a, f);
  }
}
function El(l, a) {
  var u = l.ref, t = l.refCleanup;
  if (u !== null)
    if (typeof t == "function")
      try {
        t();
      } catch (e) {
        Z(l, a, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof u == "function")
      try {
        u(null);
      } catch (e) {
        Z(l, a, e);
      }
    else u.current = null;
}
function J1(l) {
  var a = l.type, u = l.memoizedProps, t = l.stateNode;
  try {
    l: switch (a) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        u.autoFocus && t.focus();
        break l;
      case "img":
        u.src ? t.src = u.src : u.srcSet && (t.srcset = u.srcSet);
    }
  } catch (e) {
    Z(l, l.return, e);
  }
}
function Bi(l, a, u) {
  try {
    var t = l.stateNode;
    Gy(t, l.type, u, a), t[gl] = a;
  } catch (e) {
    Z(l, l.return, e);
  }
}
function r1(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 || l.tag === 4;
}
function Zf(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || r1(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 27 && l.tag !== 18; ) {
      if (l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function Bn(l, a, u) {
  var t = l.tag;
  if (t === 5 || t === 6)
    l = l.stateNode, a ? u.nodeType === 8 ? u.parentNode.insertBefore(l, a) : u.insertBefore(l, a) : (u.nodeType === 8 ? (a = u.parentNode, a.insertBefore(l, u)) : (a = u, a.appendChild(l)), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = df));
  else if (t !== 4 && t !== 27 && (l = l.child, l !== null))
    for (Bn(l, a, u), l = l.sibling; l !== null; )
      Bn(l, a, u), l = l.sibling;
}
function Ke(l, a, u) {
  var t = l.tag;
  if (t === 5 || t === 6)
    l = l.stateNode, a ? u.insertBefore(l, a) : u.appendChild(l);
  else if (t !== 4 && t !== 27 && (l = l.child, l !== null))
    for (Ke(l, a, u), l = l.sibling; l !== null; )
      Ke(l, a, u), l = l.sibling;
}
var la = !1, r = !1, jf = !1, Ni = typeof WeakSet == "function" ? WeakSet : Set, el = null, _i = !1;
function dy(l, a) {
  if (l = l.containerInfo, jn = Fe, l = G0(l), ac(l)) {
    if ("selectionStart" in l)
      var u = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        u = (u = l.ownerDocument) && u.defaultView || window;
        var t = u.getSelection && u.getSelection();
        if (t && t.rangeCount !== 0) {
          u = t.anchorNode;
          var e = t.anchorOffset, f = t.focusNode;
          t = t.focusOffset;
          try {
            u.nodeType, f.nodeType;
          } catch {
            u = null;
            break l;
          }
          var n = 0, c = -1, i = -1, v = 0, S = 0, b = l, d = null;
          a: for (; ; ) {
            for (var m; b !== u || e !== 0 && b.nodeType !== 3 || (c = n + e), b !== f || t !== 0 && b.nodeType !== 3 || (i = n + t), b.nodeType === 3 && (n += b.nodeValue.length), (m = b.firstChild) !== null; )
              d = b, b = m;
            for (; ; ) {
              if (b === l) break a;
              if (d === u && ++v === e && (c = n), d === f && ++S === t && (i = n), (m = b.nextSibling) !== null) break;
              b = d, d = b.parentNode;
            }
            b = m;
          }
          u = c === -1 || i === -1 ? null : { start: c, end: i };
        } else u = null;
      }
    u = u || { start: 0, end: 0 };
  } else u = null;
  for (Vn = { focusedElem: l, selectionRange: u }, Fe = !1, el = a; el !== null; )
    if (a = el, l = a.child, (a.subtreeFlags & 1028) !== 0 && l !== null)
      l.return = a, el = l;
    else
      for (; el !== null; ) {
        switch (a = el, f = a.alternate, l = a.flags, a.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((l & 1024) !== 0 && f !== null) {
              l = void 0, u = a, e = f.memoizedProps, f = f.memoizedState, t = u.stateNode;
              try {
                var T = lu(
                  u.type,
                  e,
                  u.elementType === u.type
                );
                l = t.getSnapshotBeforeUpdate(
                  T,
                  f
                ), t.__reactInternalSnapshotBeforeUpdate = l;
              } catch (U) {
                Z(
                  u,
                  u.return,
                  U
                );
              }
            }
            break;
          case 3:
            if ((l & 1024) !== 0) {
              if (l = a.stateNode.containerInfo, u = l.nodeType, u === 9)
                Kn(l);
              else if (u === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Kn(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if ((l & 1024) !== 0) throw Error(z(163));
        }
        if (l = a.sibling, l !== null) {
          l.return = a.return, el = l;
          break;
        }
        el = a.return;
      }
  return T = _i, _i = !1, T;
}
function w1(l, a, u) {
  var t = u.flags;
  switch (u.tag) {
    case 0:
    case 11:
    case 15:
      Pl(l, u), t & 4 && pt(5, u);
      break;
    case 1:
      if (Pl(l, u), t & 4)
        if (l = u.stateNode, a === null)
          try {
            l.componentDidMount();
          } catch (c) {
            Z(u, u.return, c);
          }
        else {
          var e = lu(
            u.type,
            a.memoizedProps
          );
          a = a.memoizedState;
          try {
            l.componentDidUpdate(
              e,
              a,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (c) {
            Z(
              u,
              u.return,
              c
            );
          }
        }
      t & 64 && L1(u), t & 512 && pa(u, u.return);
      break;
    case 3:
      if (Pl(l, u), t & 64 && (t = u.updateQueue, t !== null)) {
        if (l = null, u.child !== null)
          switch (u.child.tag) {
            case 27:
            case 5:
              l = u.child.stateNode;
              break;
            case 1:
              l = u.child.stateNode;
          }
        try {
          x1(t, l);
        } catch (c) {
          Z(u, u.return, c);
        }
      }
      break;
    case 26:
      Pl(l, u), t & 512 && pa(u, u.return);
      break;
    case 27:
    case 5:
      Pl(l, u), a === null && t & 4 && J1(u), t & 512 && pa(u, u.return);
      break;
    case 12:
      Pl(l, u);
      break;
    case 13:
      Pl(l, u), t & 4 && k1(l, u);
      break;
    case 22:
      if (e = u.memoizedState !== null || la, !e) {
        a = a !== null && a.memoizedState !== null || r;
        var f = la, n = r;
        la = e, (r = a) && !n ? Sa(
          l,
          u,
          (u.subtreeFlags & 8772) !== 0
        ) : Pl(l, u), la = f, r = n;
      }
      t & 512 && (u.memoizedProps.mode === "manual" ? pa(u, u.return) : El(u, u.return));
      break;
    default:
      Pl(l, u);
  }
}
function W1(l) {
  var a = l.alternate;
  a !== null && (l.alternate = null, W1(a)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (a = l.stateNode, a !== null && $n(a)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var F = null, Al = !1;
function Fl(l, a, u) {
  for (u = u.child; u !== null; )
    $1(l, a, u), u = u.sibling;
}
function $1(l, a, u) {
  if (Ml && typeof Ml.onCommitFiberUnmount == "function")
    try {
      Ml.onCommitFiberUnmount(Gt, u);
    } catch {
    }
  switch (u.tag) {
    case 26:
      r || El(u, a), Fl(
        l,
        a,
        u
      ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
      break;
    case 27:
      r || El(u, a);
      var t = F, e = Al;
      for (F = u.stateNode, Fl(
        l,
        a,
        u
      ), u = u.stateNode, a = u.attributes; a.length; )
        u.removeAttributeNode(a[0]);
      $n(u), F = t, Al = e;
      break;
    case 5:
      r || El(u, a);
    case 6:
      e = F;
      var f = Al;
      if (F = null, Fl(
        l,
        a,
        u
      ), F = e, Al = f, F !== null)
        if (Al)
          try {
            l = F, t = u.stateNode, l.nodeType === 8 ? l.parentNode.removeChild(t) : l.removeChild(t);
          } catch (n) {
            Z(
              u,
              a,
              n
            );
          }
        else
          try {
            F.removeChild(u.stateNode);
          } catch (n) {
            Z(
              u,
              a,
              n
            );
          }
      break;
    case 18:
      F !== null && (Al ? (a = F, u = u.stateNode, a.nodeType === 8 ? kf(
        a.parentNode,
        u
      ) : a.nodeType === 1 && kf(a, u), Qt(a)) : kf(F, u.stateNode));
      break;
    case 4:
      t = F, e = Al, F = u.stateNode.containerInfo, Al = !0, Fl(
        l,
        a,
        u
      ), F = t, Al = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      r || Xa(2, u, a), r || Xa(4, u, a), Fl(
        l,
        a,
        u
      );
      break;
    case 1:
      r || (El(u, a), t = u.stateNode, typeof t.componentWillUnmount == "function" && p1(
        u,
        a,
        t
      )), Fl(
        l,
        a,
        u
      );
      break;
    case 21:
      Fl(
        l,
        a,
        u
      );
      break;
    case 22:
      r || El(u, a), r = (t = r) || u.memoizedState !== null, Fl(
        l,
        a,
        u
      ), r = t;
      break;
    default:
      Fl(
        l,
        a,
        u
      );
  }
}
function k1(l, a) {
  if (a.memoizedState === null && (l = a.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      Qt(l);
    } catch (u) {
      Z(a, a.return, u);
    }
}
function sy(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var a = l.stateNode;
      return a === null && (a = l.stateNode = new Ni()), a;
    case 22:
      return l = l.stateNode, a = l._retryCache, a === null && (a = l._retryCache = new Ni()), a;
    default:
      throw Error(z(435, l.tag));
  }
}
function Vf(l, a) {
  var u = sy(l);
  a.forEach(function(t) {
    var e = Hy.bind(null, l, t);
    u.has(t) || (u.add(t), t.then(e, e));
  });
}
function Hl(l, a) {
  var u = a.deletions;
  if (u !== null)
    for (var t = 0; t < u.length; t++) {
      var e = u[t], f = l, n = a, c = n;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
          case 5:
            F = c.stateNode, Al = !1;
            break l;
          case 3:
            F = c.stateNode.containerInfo, Al = !0;
            break l;
          case 4:
            F = c.stateNode.containerInfo, Al = !0;
            break l;
        }
        c = c.return;
      }
      if (F === null) throw Error(z(160));
      $1(f, n, e), F = null, Al = !1, f = e.alternate, f !== null && (f.return = null), e.return = null;
    }
  if (a.subtreeFlags & 13878)
    for (a = a.child; a !== null; )
      F1(a, l), a = a.sibling;
}
var jl = null;
function F1(l, a) {
  var u = l.alternate, t = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Hl(a, l), ol(l), t & 4 && (Xa(3, l, l.return), pt(3, l), Xa(5, l, l.return));
      break;
    case 1:
      Hl(a, l), ol(l), t & 512 && (r || u === null || El(u, u.return)), t & 64 && la && (l = l.updateQueue, l !== null && (t = l.callbacks, t !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? t : u.concat(t))));
      break;
    case 26:
      var e = jl;
      if (Hl(a, l), ol(l), t & 512 && (r || u === null || El(u, u.return)), t & 4) {
        var f = u !== null ? u.memoizedState : null;
        if (t = l.memoizedState, u === null)
          if (t === null)
            if (l.stateNode === null) {
              l: {
                t = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                a: switch (t) {
                  case "title":
                    f = e.getElementsByTagName("title")[0], (!f || f[Mt] || f[yl] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = e.createElement(t), e.head.insertBefore(
                      f,
                      e.querySelector("head > title")
                    )), hl(f, t, u), f[yl] = l, fl(f), t = f;
                    break l;
                  case "link":
                    var n = Wi(
                      "link",
                      "href",
                      e
                    ).get(t + (u.href || ""));
                    if (n) {
                      for (var c = 0; c < n.length; c++)
                        if (f = n[c], f.getAttribute("href") === (u.href == null ? null : u.href) && f.getAttribute("rel") === (u.rel == null ? null : u.rel) && f.getAttribute("title") === (u.title == null ? null : u.title) && f.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                          n.splice(c, 1);
                          break a;
                        }
                    }
                    f = e.createElement(t), hl(f, t, u), e.head.appendChild(f);
                    break;
                  case "meta":
                    if (n = Wi(
                      "meta",
                      "content",
                      e
                    ).get(t + (u.content || ""))) {
                      for (c = 0; c < n.length; c++)
                        if (f = n[c], f.getAttribute("content") === (u.content == null ? null : "" + u.content) && f.getAttribute("name") === (u.name == null ? null : u.name) && f.getAttribute("property") === (u.property == null ? null : u.property) && f.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && f.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                          n.splice(c, 1);
                          break a;
                        }
                    }
                    f = e.createElement(t), hl(f, t, u), e.head.appendChild(f);
                    break;
                  default:
                    throw Error(z(468, t));
                }
                f[yl] = l, fl(f), t = f;
              }
              l.stateNode = t;
            } else
              $i(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = wi(
              e,
              t,
              l.memoizedProps
            );
        else
          f !== t ? (f === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : f.count--, t === null ? $i(
            e,
            l.type,
            l.stateNode
          ) : wi(
            e,
            t,
            l.memoizedProps
          )) : t === null && l.stateNode !== null && Bi(
            l,
            l.memoizedProps,
            u.memoizedProps
          );
      }
      break;
    case 27:
      if (t & 4 && l.alternate === null) {
        e = l.stateNode, f = l.memoizedProps;
        try {
          for (var i = e.firstChild; i; ) {
            var v = i.nextSibling, S = i.nodeName;
            i[Mt] || S === "HEAD" || S === "BODY" || S === "SCRIPT" || S === "STYLE" || S === "LINK" && i.rel.toLowerCase() === "stylesheet" || e.removeChild(i), i = v;
          }
          for (var b = l.type, d = e.attributes; d.length; )
            e.removeAttributeNode(d[0]);
          hl(e, b, f), e[yl] = l, e[gl] = f;
        } catch (T) {
          Z(l, l.return, T);
        }
      }
    case 5:
      if (Hl(a, l), ol(l), t & 512 && (r || u === null || El(u, u.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Xu(e, "");
        } catch (T) {
          Z(l, l.return, T);
        }
      }
      t & 4 && l.stateNode != null && (e = l.memoizedProps, Bi(
        l,
        e,
        u !== null ? u.memoizedProps : e
      )), t & 1024 && (jf = !0);
      break;
    case 6:
      if (Hl(a, l), ol(l), t & 4) {
        if (l.stateNode === null)
          throw Error(z(162));
        t = l.memoizedProps, u = l.stateNode;
        try {
          u.nodeValue = t;
        } catch (T) {
          Z(l, l.return, T);
        }
      }
      break;
    case 3:
      if (De = null, e = jl, jl = We(a.containerInfo), Hl(a, l), jl = e, ol(l), t & 4 && u !== null && u.memoizedState.isDehydrated)
        try {
          Qt(a.containerInfo);
        } catch (T) {
          Z(l, l.return, T);
        }
      jf && (jf = !1, P1(l));
      break;
    case 4:
      t = jl, jl = We(
        l.stateNode.containerInfo
      ), Hl(a, l), ol(l), jl = t;
      break;
    case 12:
      Hl(a, l), ol(l);
      break;
    case 13:
      Hl(a, l), ol(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (qc = Jl()), t & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, Vf(l, t)));
      break;
    case 22:
      if (t & 512 && (r || u === null || El(u, u.return)), i = l.memoizedState !== null, v = u !== null && u.memoizedState !== null, S = la, b = r, la = S || i, r = b || v, Hl(a, l), r = b, la = S, ol(l), a = l.stateNode, a._current = l, a._visibility &= -3, a._visibility |= a._pendingVisibility & 2, t & 8192 && (a._visibility = i ? a._visibility & -2 : a._visibility | 1, i && (a = la || r, u === null || v || a || hu(l)), l.memoizedProps === null || l.memoizedProps.mode !== "manual"))
        l: for (u = null, a = l; ; ) {
          if (a.tag === 5 || a.tag === 26 || a.tag === 27) {
            if (u === null) {
              v = u = a;
              try {
                if (e = v.stateNode, i)
                  f = e.style, typeof f.setProperty == "function" ? f.setProperty(
                    "display",
                    "none",
                    "important"
                  ) : f.display = "none";
                else {
                  n = v.stateNode, c = v.memoizedProps.style;
                  var m = c != null && c.hasOwnProperty("display") ? c.display : null;
                  n.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
                }
              } catch (T) {
                Z(v, v.return, T);
              }
            }
          } else if (a.tag === 6) {
            if (u === null) {
              v = a;
              try {
                v.stateNode.nodeValue = i ? "" : v.memoizedProps;
              } catch (T) {
                Z(v, v.return, T);
              }
            }
          } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === l) && a.child !== null) {
            a.child.return = a, a = a.child;
            continue;
          }
          if (a === l) break l;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === l) break l;
            u === a && (u = null), a = a.return;
          }
          u === a && (u = null), a.sibling.return = a.return, a = a.sibling;
        }
      t & 4 && (t = l.updateQueue, t !== null && (u = t.retryQueue, u !== null && (t.retryQueue = null, Vf(l, u))));
      break;
    case 19:
      Hl(a, l), ol(l), t & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, Vf(l, t)));
      break;
    case 21:
      break;
    default:
      Hl(a, l), ol(l);
  }
}
function ol(l) {
  var a = l.flags;
  if (a & 2) {
    try {
      if (l.tag !== 27) {
        l: {
          for (var u = l.return; u !== null; ) {
            if (r1(u)) {
              var t = u;
              break l;
            }
            u = u.return;
          }
          throw Error(z(160));
        }
        switch (t.tag) {
          case 27:
            var e = t.stateNode, f = Zf(l);
            Ke(l, f, e);
            break;
          case 5:
            var n = t.stateNode;
            t.flags & 32 && (Xu(n, ""), t.flags &= -33);
            var c = Zf(l);
            Ke(l, c, n);
            break;
          case 3:
          case 4:
            var i = t.stateNode.containerInfo, v = Zf(l);
            Bn(
              l,
              v,
              i
            );
            break;
          default:
            throw Error(z(161));
        }
      }
    } catch (S) {
      Z(l, l.return, S);
    }
    l.flags &= -3;
  }
  a & 4096 && (l.flags &= -4097);
}
function P1(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var a = l;
      P1(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), l = l.sibling;
    }
}
function Pl(l, a) {
  if (a.subtreeFlags & 8772)
    for (a = a.child; a !== null; )
      w1(l, a.alternate, a), a = a.sibling;
}
function hu(l) {
  for (l = l.child; l !== null; ) {
    var a = l;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xa(4, a, a.return), hu(a);
        break;
      case 1:
        El(a, a.return);
        var u = a.stateNode;
        typeof u.componentWillUnmount == "function" && p1(
          a,
          a.return,
          u
        ), hu(a);
        break;
      case 26:
      case 27:
      case 5:
        El(a, a.return), hu(a);
        break;
      case 22:
        El(a, a.return), a.memoizedState === null && hu(a);
        break;
      default:
        hu(a);
    }
    l = l.sibling;
  }
}
function Sa(l, a, u) {
  for (u = u && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
    var t = a.alternate, e = l, f = a, n = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        Sa(
          e,
          f,
          u
        ), pt(4, f);
        break;
      case 1:
        if (Sa(
          e,
          f,
          u
        ), t = f, e = t.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (v) {
            Z(t, t.return, v);
          }
        if (t = f, e = t.updateQueue, e !== null) {
          var c = t.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                K1(i[e], c);
          } catch (v) {
            Z(t, t.return, v);
          }
        }
        u && n & 64 && L1(f), pa(f, f.return);
        break;
      case 26:
      case 27:
      case 5:
        Sa(
          e,
          f,
          u
        ), u && t === null && n & 4 && J1(f), pa(f, f.return);
        break;
      case 12:
        Sa(
          e,
          f,
          u
        );
        break;
      case 13:
        Sa(
          e,
          f,
          u
        ), u && n & 4 && k1(e, f);
        break;
      case 22:
        f.memoizedState === null && Sa(
          e,
          f,
          u
        ), pa(f, f.return);
        break;
      default:
        Sa(
          e,
          f,
          u
        );
    }
    a = a.sibling;
  }
}
function Dc(l, a) {
  var u = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Kt(u));
}
function Uc(l, a) {
  l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Kt(l));
}
function ma(l, a, u, t) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; )
      I1(
        l,
        a,
        u,
        t
      ), a = a.sibling;
}
function I1(l, a, u, t) {
  var e = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      ma(
        l,
        a,
        u,
        t
      ), e & 2048 && pt(9, a);
      break;
    case 3:
      ma(
        l,
        a,
        u,
        t
      ), e & 2048 && (l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Kt(l)));
      break;
    case 12:
      if (e & 2048) {
        ma(
          l,
          a,
          u,
          t
        ), l = a.stateNode;
        try {
          var f = a.memoizedProps, n = f.id, c = f.onPostCommit;
          typeof c == "function" && c(
            n,
            a.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          Z(a, a.return, i);
        }
      } else
        ma(
          l,
          a,
          u,
          t
        );
      break;
    case 23:
      break;
    case 22:
      f = a.stateNode, a.memoizedState !== null ? f._visibility & 4 ? ma(
        l,
        a,
        u,
        t
      ) : gt(l, a) : f._visibility & 4 ? ma(
        l,
        a,
        u,
        t
      ) : (f._visibility |= 4, yu(
        l,
        a,
        u,
        t,
        (a.subtreeFlags & 10256) !== 0
      )), e & 2048 && Dc(
        a.alternate,
        a
      );
      break;
    case 24:
      ma(
        l,
        a,
        u,
        t
      ), e & 2048 && Uc(a.alternate, a);
      break;
    default:
      ma(
        l,
        a,
        u,
        t
      );
  }
}
function yu(l, a, u, t, e) {
  for (e = e && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
    var f = l, n = a, c = u, i = t, v = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        yu(
          f,
          n,
          c,
          i,
          e
        ), pt(8, n);
        break;
      case 23:
        break;
      case 22:
        var S = n.stateNode;
        n.memoizedState !== null ? S._visibility & 4 ? yu(
          f,
          n,
          c,
          i,
          e
        ) : gt(
          f,
          n
        ) : (S._visibility |= 4, yu(
          f,
          n,
          c,
          i,
          e
        )), e && v & 2048 && Dc(
          n.alternate,
          n
        );
        break;
      case 24:
        yu(
          f,
          n,
          c,
          i,
          e
        ), e && v & 2048 && Uc(n.alternate, n);
        break;
      default:
        yu(
          f,
          n,
          c,
          i,
          e
        );
    }
    a = a.sibling;
  }
}
function gt(l, a) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; ) {
      var u = l, t = a, e = t.flags;
      switch (t.tag) {
        case 22:
          gt(u, t), e & 2048 && Dc(
            t.alternate,
            t
          );
          break;
        case 24:
          gt(u, t), e & 2048 && Uc(t.alternate, t);
          break;
        default:
          gt(u, t);
      }
      a = a.sibling;
    }
}
var ft = 8192;
function iu(l) {
  if (l.subtreeFlags & ft)
    for (l = l.child; l !== null; )
      lv(l), l = l.sibling;
}
function lv(l) {
  switch (l.tag) {
    case 26:
      iu(l), l.flags & ft && l.memoizedState !== null && ad(
        jl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      iu(l);
      break;
    case 3:
    case 4:
      var a = jl;
      jl = We(l.stateNode.containerInfo), iu(l), jl = a;
      break;
    case 22:
      l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ft, ft = 16777216, iu(l), ft = a) : iu(l));
      break;
    default:
      iu(l);
  }
}
function av(l) {
  var a = l.alternate;
  if (a !== null && (l = a.child, l !== null)) {
    a.child = null;
    do
      a = l.sibling, l.sibling = null, l = a;
    while (l !== null);
  }
}
function Pu(l) {
  var a = l.deletions;
  if ((l.flags & 16) !== 0) {
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var t = a[u];
        el = t, tv(
          t,
          l
        );
      }
    av(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      uv(l), l = l.sibling;
}
function uv(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      Pu(l), l.flags & 2048 && Xa(9, l, l.return);
      break;
    case 3:
      Pu(l);
      break;
    case 12:
      Pu(l);
      break;
    case 22:
      var a = l.stateNode;
      l.memoizedState !== null && a._visibility & 4 && (l.return === null || l.return.tag !== 13) ? (a._visibility &= -5, Te(l)) : Pu(l);
      break;
    default:
      Pu(l);
  }
}
function Te(l) {
  var a = l.deletions;
  if ((l.flags & 16) !== 0) {
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var t = a[u];
        el = t, tv(
          t,
          l
        );
      }
    av(l);
  }
  for (l = l.child; l !== null; ) {
    switch (a = l, a.tag) {
      case 0:
      case 11:
      case 15:
        Xa(8, a, a.return), Te(a);
        break;
      case 22:
        u = a.stateNode, u._visibility & 4 && (u._visibility &= -5, Te(a));
        break;
      default:
        Te(a);
    }
    l = l.sibling;
  }
}
function tv(l, a) {
  for (; el !== null; ) {
    var u = el;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Xa(8, u, a);
        break;
      case 23:
      case 22:
        if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
          var t = u.memoizedState.cachePool.pool;
          t != null && t.refCount++;
        }
        break;
      case 24:
        Kt(u.memoizedState.cache);
    }
    if (t = u.child, t !== null) t.return = u, el = t;
    else
      l: for (u = l; el !== null; ) {
        t = el;
        var e = t.sibling, f = t.return;
        if (W1(t), t === u) {
          el = null;
          break l;
        }
        if (e !== null) {
          e.return = f, el = e;
          break l;
        }
        el = f;
      }
  }
}
function my(l, a, u, t) {
  this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = t, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Xl(l, a, u, t) {
  return new my(l, a, u, t);
}
function Oc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function oa(l, a) {
  var u = l.alternate;
  return u === null ? (u = Xl(
    l.tag,
    a,
    l.key,
    l.mode
  ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = a, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 31457280, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, a = l.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
}
function ev(l, a) {
  l.flags &= 31457282;
  var u = l.alternate;
  return u === null ? (l.childLanes = 0, l.lanes = a, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, a = u.dependencies, l.dependencies = a === null ? null : {
    lanes: a.lanes,
    firstContext: a.firstContext
  }), l;
}
function Ee(l, a, u, t, e, f) {
  var n = 0;
  if (t = l, typeof l == "function") Oc(l) && (n = 1);
  else if (typeof l == "string")
    n = Iy(
      l,
      u,
      pl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case su:
        return Wa(u.children, e, f, a);
      case f0:
        n = 8, e |= 24;
        break;
      case Ff:
        return l = Xl(12, u, a, e | 2), l.elementType = Ff, l.lanes = f, l;
      case Pf:
        return l = Xl(13, u, a, e), l.elementType = Pf, l.lanes = f, l;
      case If:
        return l = Xl(19, u, a, e), l.elementType = If, l.lanes = f, l;
      case c0:
        return fv(u, e, f, a);
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case Vv:
            case ta:
              n = 10;
              break l;
            case n0:
              n = 9;
              break l;
            case rn:
              n = 11;
              break l;
            case wn:
              n = 14;
              break l;
            case ba:
              n = 16, t = null;
              break l;
          }
        n = 29, u = Error(
          z(130, l === null ? "null" : typeof l, "")
        ), t = null;
    }
  return a = Xl(n, u, a, e), a.elementType = l, a.type = t, a.lanes = f, a;
}
function Wa(l, a, u, t) {
  return l = Xl(7, l, t, a), l.lanes = u, l;
}
function fv(l, a, u, t) {
  l = Xl(22, l, t, a), l.elementType = c0, l.lanes = u;
  var e = {
    _visibility: 1,
    _pendingVisibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function() {
      var f = e._current;
      if (f === null) throw Error(z(456));
      if ((e._pendingVisibility & 2) === 0) {
        var n = Ya(f, 2);
        n !== null && (e._pendingVisibility |= 2, ml(n, f, 2));
      }
    },
    attach: function() {
      var f = e._current;
      if (f === null) throw Error(z(456));
      if ((e._pendingVisibility & 2) !== 0) {
        var n = Ya(f, 2);
        n !== null && (e._pendingVisibility &= -3, ml(n, f, 2));
      }
    }
  };
  return l.stateNode = e, l;
}
function Cf(l, a, u) {
  return l = Xl(6, l, null, a), l.lanes = u, l;
}
function Kf(l, a, u) {
  return a = Xl(
    4,
    l.children !== null ? l.children : [],
    l.key,
    a
  ), a.lanes = u, a.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, a;
}
function Il(l) {
  l.flags |= 4;
}
function Yi(l, a) {
  if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Hv(a)) {
    if (a = Gl.current, a !== null && ((R & 4194176) === R ? rl !== null : (R & 62914560) !== R && (R & 536870912) === 0 || a !== rl))
      throw ht = sn, J0;
    l.flags |= 8192;
  }
}
function ce(l, a) {
  a !== null && (l.flags |= 4), l.flags & 16384 && (a = l.tag !== 22 ? m0() : 536870912, l.lanes |= a, ju |= a);
}
function Iu(l, a) {
  if (!X)
    switch (l.tailMode) {
      case "hidden":
        a = l.tail;
        for (var u = null; a !== null; )
          a.alternate !== null && (u = a), a = a.sibling;
        u === null ? l.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = l.tail;
        for (var t = null; u !== null; )
          u.alternate !== null && (t = u), u = u.sibling;
        t === null ? a || l.tail === null ? l.tail = null : l.tail.sibling = null : t.sibling = null;
    }
}
function p(l) {
  var a = l.alternate !== null && l.alternate.child === l.child, u = 0, t = 0;
  if (a)
    for (var e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, t |= e.subtreeFlags & 31457280, t |= e.flags & 31457280, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, t |= e.subtreeFlags, t |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= t, l.childLanes = u, a;
}
function Sy(l, a, u) {
  var t = a.pendingProps;
  switch (fc(a), a.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return p(a), null;
    case 1:
      return p(a), null;
    case 3:
      return u = a.stateNode, t = null, l !== null && (t = l.memoizedState.cache), a.memoizedState.cache !== t && (a.flags |= 2048), ia(ll), Yu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ku(a) ? Il(a) : l === null || l.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Vl !== null && (Xn(Vl), Vl = null))), p(a), null;
    case 26:
      return u = a.memoizedState, l === null ? (Il(a), u !== null ? (p(a), Yi(a, u)) : (p(a), a.flags &= -16777217)) : u ? u !== l.memoizedState ? (Il(a), p(a), Yi(a, u)) : (p(a), a.flags &= -16777217) : (l.memoizedProps !== t && Il(a), p(a), a.flags &= -16777217), null;
    case 27:
      oe(a), u = Ua.current;
      var e = a.type;
      if (l !== null && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (!t) {
          if (a.stateNode === null)
            throw Error(z(166));
          return p(a), null;
        }
        l = pl.current, ku(a) ? ii(a) : (l = Dv(e, t, u), a.stateNode = l, Il(a));
      }
      return p(a), null;
    case 5:
      if (oe(a), u = a.type, l !== null && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (!t) {
          if (a.stateNode === null)
            throw Error(z(166));
          return p(a), null;
        }
        if (l = pl.current, ku(a))
          ii(a);
        else {
          switch (e = we(
            Ua.current
          ), l) {
            case 1:
              l = e.createElementNS(
                "http://www.w3.org/2000/svg",
                u
              );
              break;
            case 2:
              l = e.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                u
              );
              break;
            default:
              switch (u) {
                case "svg":
                  l = e.createElementNS(
                    "http://www.w3.org/2000/svg",
                    u
                  );
                  break;
                case "math":
                  l = e.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    u
                  );
                  break;
                case "script":
                  l = e.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof t.is == "string" ? e.createElement("select", { is: t.is }) : e.createElement("select"), t.multiple ? l.multiple = !0 : t.size && (l.size = t.size);
                  break;
                default:
                  l = typeof t.is == "string" ? e.createElement(u, { is: t.is }) : e.createElement(u);
              }
          }
          l[yl] = a, l[gl] = t;
          l: for (e = a.child; e !== null; ) {
            if (e.tag === 5 || e.tag === 6)
              l.appendChild(e.stateNode);
            else if (e.tag !== 4 && e.tag !== 27 && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === a) break l;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === a)
                break l;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
          a.stateNode = l;
          l: switch (hl(l, u, t), u) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!t.autoFocus;
              break l;
            case "img":
              l = !0;
              break l;
            default:
              l = !1;
          }
          l && Il(a);
        }
      }
      return p(a), a.flags &= -16777217, null;
    case 6:
      if (l && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (typeof t != "string" && a.stateNode === null)
          throw Error(z(166));
        if (l = Ua.current, ku(a)) {
          if (l = a.stateNode, u = a.memoizedProps, t = null, e = sl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                t = e.memoizedProps;
            }
          l[yl] = a, l = !!(l.nodeValue === u || t !== null && t.suppressHydrationWarning === !0 || Tv(l.nodeValue, u)), l || Fa(a);
        } else
          l = we(l).createTextNode(
            t
          ), l[yl] = a, a.stateNode = l;
      }
      return p(a), null;
    case 13:
      if (t = a.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = ku(a), t !== null && t.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(z(318));
            if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(z(317));
            e[yl] = a;
          } else
            Ct(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
          p(a), e = !1;
        } else
          Vl !== null && (Xn(Vl), Vl = null), e = !0;
        if (!e)
          return a.flags & 256 ? (na(a), a) : (na(a), null);
      }
      if (na(a), (a.flags & 128) !== 0)
        return a.lanes = u, a;
      if (u = t !== null, l = l !== null && l.memoizedState !== null, u) {
        t = a.child, e = null, t.alternate !== null && t.alternate.memoizedState !== null && t.alternate.memoizedState.cachePool !== null && (e = t.alternate.memoizedState.cachePool.pool);
        var f = null;
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (f = t.memoizedState.cachePool.pool), f !== e && (t.flags |= 2048);
      }
      return u !== l && u && (a.child.flags |= 8192), ce(a, a.updateQueue), p(a), null;
    case 4:
      return Yu(), l === null && _c(a.stateNode.containerInfo), p(a), null;
    case 10:
      return ia(a.type), p(a), null;
    case 19:
      if (cl(al), e = a.memoizedState, e === null) return p(a), null;
      if (t = (a.flags & 128) !== 0, f = e.rendering, f === null)
        if (t) Iu(e, !1);
        else {
          if (w !== 0 || l !== null && (l.flags & 128) !== 0)
            for (l = a.child; l !== null; ) {
              if (f = Qe(l), f !== null) {
                for (a.flags |= 128, Iu(e, !1), l = f.updateQueue, a.updateQueue = l, ce(a, l), a.subtreeFlags = 0, l = u, u = a.child; u !== null; )
                  ev(u, l), u = u.sibling;
                return L(
                  al,
                  al.current & 1 | 2
                ), a.child;
              }
              l = l.sibling;
            }
          e.tail !== null && Jl() > xe && (a.flags |= 128, t = !0, Iu(e, !1), a.lanes = 4194304);
        }
      else {
        if (!t)
          if (l = Qe(f), l !== null) {
            if (a.flags |= 128, t = !0, l = l.updateQueue, a.updateQueue = l, ce(a, l), Iu(e, !0), e.tail === null && e.tailMode === "hidden" && !f.alternate && !X)
              return p(a), null;
          } else
            2 * Jl() - e.renderingStartTime > xe && u !== 536870912 && (a.flags |= 128, t = !0, Iu(e, !1), a.lanes = 4194304);
        e.isBackwards ? (f.sibling = a.child, a.child = f) : (l = e.last, l !== null ? l.sibling = f : a.child = f, e.last = f);
      }
      return e.tail !== null ? (a = e.tail, e.rendering = a, e.tail = a.sibling, e.renderingStartTime = Jl(), a.sibling = null, l = al.current, L(al, t ? l & 1 | 2 : l & 1), a) : (p(a), null);
    case 22:
    case 23:
      return na(a), nc(), t = a.memoizedState !== null, l !== null ? l.memoizedState !== null !== t && (a.flags |= 8192) : t && (a.flags |= 8192), t ? (u & 536870912) !== 0 && (a.flags & 128) === 0 && (p(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : p(a), u = a.updateQueue, u !== null && ce(a, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), t = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (t = a.memoizedState.cachePool.pool), t !== u && (a.flags |= 2048), l !== null && cl(wa), null;
    case 24:
      return u = null, l !== null && (u = l.memoizedState.cache), a.memoizedState.cache !== u && (a.flags |= 2048), ia(ll), p(a), null;
    case 25:
      return null;
  }
  throw Error(z(156, a.tag));
}
function by(l, a) {
  switch (fc(a), a.tag) {
    case 1:
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 3:
      return ia(ll), Yu(), l = a.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (a.flags = l & -65537 | 128, a) : null;
    case 26:
    case 27:
    case 5:
      return oe(a), null;
    case 13:
      if (na(a), l = a.memoizedState, l !== null && l.dehydrated !== null) {
        if (a.alternate === null)
          throw Error(z(340));
        Ct();
      }
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 19:
      return cl(al), null;
    case 4:
      return Yu(), null;
    case 10:
      return ia(a.type), null;
    case 22:
    case 23:
      return na(a), nc(), l !== null && cl(wa), l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 24:
      return ia(ll), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function nv(l, a) {
  switch (fc(a), a.tag) {
    case 3:
      ia(ll), Yu();
      break;
    case 26:
    case 27:
    case 5:
      oe(a);
      break;
    case 4:
      Yu();
      break;
    case 13:
      na(a);
      break;
    case 19:
      cl(al);
      break;
    case 10:
      ia(a.type);
      break;
    case 22:
    case 23:
      na(a), nc(), l !== null && cl(wa);
      break;
    case 24:
      ia(ll);
  }
}
var gy = {
  getCacheForType: function(l) {
    var a = dl(ll), u = a.data.get(l);
    return u === void 0 && (u = l(), a.data.set(l, u)), u;
  }
}, zy = typeof WeakMap == "function" ? WeakMap : Map, J = 0, V = null, N = null, R = 0, j = 0, Tl = null, aa = !1, pu = !1, Hc = !1, da = 0, w = 0, Qa = 0, $a = 0, oc = 0, Ql = 0, ju = 0, zt = null, Ll = null, Nn = !1, qc = 0, xe = 1 / 0, Le = null, qa = null, ie = !1, xa = null, At = 0, _n = 0, Yn = null, Tt = 0, Rn = null;
function Ul() {
  if ((J & 2) !== 0 && R !== 0)
    return R & -R;
  if (H.T !== null) {
    var l = Gu;
    return l !== 0 ? l : Nc();
  }
  return z0();
}
function cv() {
  Ql === 0 && (Ql = (R & 536870912) === 0 || X ? s0() : 536870912);
  var l = Gl.current;
  return l !== null && (l.flags |= 32), Ql;
}
function ml(l, a, u) {
  (l === V && j === 2 || l.cancelPendingCommit !== null) && (Vu(l, 0), ua(
    l,
    R,
    Ql,
    !1
  )), jt(l, u), ((J & 2) === 0 || l !== V) && (l === V && ((J & 2) === 0 && ($a |= u), w === 4 && ua(
    l,
    R,
    Ql,
    !1
  )), $l(l));
}
function iv(l, a, u) {
  if ((J & 6) !== 0) throw Error(z(327));
  var t = !u && (a & 60) === 0 && (a & l.expiredLanes) === 0 || Zt(l, a), e = t ? Ey(l, a) : xf(l, a, !0), f = t;
  do {
    if (e === 0) {
      pu && !t && ua(l, a, 0, !1);
      break;
    } else if (e === 6)
      ua(
        l,
        a,
        0,
        !aa
      );
    else {
      if (u = l.current.alternate, f && !Ay(u)) {
        e = xf(l, a, !1), f = !1;
        continue;
      }
      if (e === 2) {
        if (f = a, l.errorRecoveryDisabledLanes & f)
          var n = 0;
        else
          n = l.pendingLanes & -536870913, n = n !== 0 ? n : n & 536870912 ? 536870912 : 0;
        if (n !== 0) {
          a = n;
          l: {
            var c = l;
            e = zt;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (Vu(c, n).flags |= 256), n = xf(
              c,
              n,
              !1
            ), n !== 2) {
              if (Hc && !i) {
                c.errorRecoveryDisabledLanes |= f, $a |= f, e = 4;
                break l;
              }
              f = Ll, Ll = e, f !== null && Xn(f);
            }
            e = n;
          }
          if (f = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        Vu(l, 0), ua(l, a, 0, !0);
        break;
      }
      l: {
        switch (t = l, e) {
          case 0:
          case 1:
            throw Error(z(345));
          case 4:
            if ((a & 4194176) === a) {
              ua(
                t,
                a,
                Ql,
                !aa
              );
              break l;
            }
            break;
          case 2:
            Ll = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(z(329));
        }
        if (t.finishedWork = u, t.finishedLanes = a, (a & 62914560) === a && (f = qc + 300 - Jl(), 10 < f)) {
          if (ua(
            t,
            a,
            Ql,
            !aa
          ), Ie(t, 0) !== 0) break l;
          t.timeoutHandle = Mv(
            Ri.bind(
              null,
              t,
              u,
              Ll,
              Le,
              Nn,
              a,
              Ql,
              $a,
              ju,
              aa,
              2,
              -0,
              0
            ),
            f
          );
          break l;
        }
        Ri(
          t,
          u,
          Ll,
          Le,
          Nn,
          a,
          Ql,
          $a,
          ju,
          aa,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  $l(l);
}
function Xn(l) {
  Ll === null ? Ll = l : Ll.push.apply(
    Ll,
    l
  );
}
function Ri(l, a, u, t, e, f, n, c, i, v, S, b, d) {
  var m = a.subtreeFlags;
  if ((m & 8192 || (m & 16785408) === 16785408) && (_t = { stylesheets: null, count: 0, unsuspend: ld }, lv(a), a = ud(), a !== null)) {
    l.cancelPendingCommit = a(
      Qi.bind(
        null,
        l,
        u,
        t,
        e,
        n,
        c,
        i,
        1,
        b,
        d
      )
    ), ua(l, f, n, !v);
    return;
  }
  Qi(
    l,
    u,
    t,
    e,
    n,
    c,
    i,
    S,
    b,
    d
  );
}
function Ay(l) {
  for (var a = l; ; ) {
    var u = a.tag;
    if ((u === 0 || u === 11 || u === 15) && a.flags & 16384 && (u = a.updateQueue, u !== null && (u = u.stores, u !== null)))
      for (var t = 0; t < u.length; t++) {
        var e = u[t], f = e.getSnapshot;
        e = e.value;
        try {
          if (!Ol(f(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (u = a.child, a.subtreeFlags & 16384 && u !== null)
      u.return = a, a = u;
    else {
      if (a === l) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === l) return !0;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  return !0;
}
function ua(l, a, u, t) {
  a &= ~oc, a &= ~$a, l.suspendedLanes |= a, l.pingedLanes &= ~a, t && (l.warmLanes |= a), t = l.expirationTimes;
  for (var e = a; 0 < e; ) {
    var f = 31 - Dl(e), n = 1 << f;
    t[f] = -1, e &= ~n;
  }
  u !== 0 && S0(l, u, a);
}
function hf() {
  return (J & 6) === 0 ? (Jt(0), !1) : !0;
}
function Bc() {
  if (N !== null) {
    if (j === 0)
      var l = N.return;
    else
      l = N, ca = cu = null, sc(l), ou = null, ot = 0, l = N;
    for (; l !== null; )
      nv(l.alternate, l), l = l.return;
    N = null;
  }
}
function Vu(l, a) {
  l.finishedWork = null, l.finishedLanes = 0;
  var u = l.timeoutHandle;
  u !== -1 && (l.timeoutHandle = -1, jy(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Bc(), V = l, N = u = oa(l.current, null), R = a, j = 0, Tl = null, aa = !1, pu = Zt(l, a), Hc = !1, ju = Ql = oc = $a = Qa = w = 0, Ll = zt = null, Nn = !1, (a & 8) !== 0 && (a |= a & 32);
  var t = l.entangledLanes;
  if (t !== 0)
    for (l = l.entanglements, t &= a; 0 < t; ) {
      var e = 31 - Dl(t), f = 1 << e;
      a |= l[e], t &= ~f;
    }
  return da = a, tf(), u;
}
function vv(l, a) {
  o = null, H.H = wl, a === vt ? (a = yi(), j = 3) : a === J0 ? (a = yi(), j = 4) : j = a === X1 ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, Tl = a, N === null && (w = 1, Ve(
    l,
    Rl(a, l.current)
  ));
}
function hv() {
  var l = H.H;
  return H.H = wl, l === null ? wl : l;
}
function yv() {
  var l = H.A;
  return H.A = gy, l;
}
function Qn() {
  w = 4, aa || (R & 4194176) !== R && Gl.current !== null || (pu = !0), (Qa & 134217727) === 0 && ($a & 134217727) === 0 || V === null || ua(
    V,
    R,
    Ql,
    !1
  );
}
function xf(l, a, u) {
  var t = J;
  J |= 2;
  var e = hv(), f = yv();
  (V !== l || R !== a) && (Le = null, Vu(l, a)), a = !1;
  var n = w;
  l: do
    try {
      if (j !== 0 && N !== null) {
        var c = N, i = Tl;
        switch (j) {
          case 8:
            Bc(), n = 6;
            break l;
          case 3:
          case 2:
          case 6:
            Gl.current === null && (a = !0);
            var v = j;
            if (j = 0, Tl = null, Du(l, c, i, v), u && pu) {
              n = 0;
              break l;
            }
            break;
          default:
            v = j, j = 0, Tl = null, Du(l, c, i, v);
        }
      }
      Ty(), n = w;
      break;
    } catch (S) {
      vv(l, S);
    }
  while (!0);
  return a && l.shellSuspendCounter++, ca = cu = null, J = t, H.H = e, H.A = f, N === null && (V = null, R = 0, tf()), n;
}
function Ty() {
  for (; N !== null; ) dv(N);
}
function Ey(l, a) {
  var u = J;
  J |= 2;
  var t = hv(), e = yv();
  V !== l || R !== a ? (Le = null, xe = Jl() + 500, Vu(l, a)) : pu = Zt(
    l,
    a
  );
  l: do
    try {
      if (j !== 0 && N !== null) {
        a = N;
        var f = Tl;
        a: switch (j) {
          case 1:
            j = 0, Tl = null, Du(l, a, f, 1);
            break;
          case 2:
            if (hi(f)) {
              j = 0, Tl = null, Xi(a);
              break;
            }
            a = function() {
              j === 2 && V === l && (j = 7), $l(l);
            }, f.then(a, a);
            break l;
          case 3:
            j = 7;
            break l;
          case 4:
            j = 5;
            break l;
          case 7:
            hi(f) ? (j = 0, Tl = null, Xi(a)) : (j = 0, Tl = null, Du(l, a, f, 7));
            break;
          case 5:
            var n = null;
            switch (N.tag) {
              case 26:
                n = N.memoizedState;
              case 5:
              case 27:
                var c = N;
                if (!n || Hv(n)) {
                  j = 0, Tl = null;
                  var i = c.sibling;
                  if (i !== null) N = i;
                  else {
                    var v = c.return;
                    v !== null ? (N = v, yf(v)) : N = null;
                  }
                  break a;
                }
            }
            j = 0, Tl = null, Du(l, a, f, 5);
            break;
          case 6:
            j = 0, Tl = null, Du(l, a, f, 6);
            break;
          case 8:
            Bc(), w = 6;
            break l;
          default:
            throw Error(z(462));
        }
      }
      My();
      break;
    } catch (S) {
      vv(l, S);
    }
  while (!0);
  return ca = cu = null, H.H = t, H.A = e, J = u, N !== null ? 0 : (V = null, R = 0, tf(), w);
}
function My() {
  for (; N !== null && !pv(); )
    dv(N);
}
function dv(l) {
  var a = V1(l.alternate, l, da);
  l.memoizedProps = l.pendingProps, a === null ? yf(l) : N = a;
}
function Xi(l) {
  var a = l, u = a.alternate;
  switch (a.tag) {
    case 15:
    case 0:
      a = Oi(
        u,
        a,
        a.pendingProps,
        a.type,
        void 0,
        R
      );
      break;
    case 11:
      a = Oi(
        u,
        a,
        a.pendingProps,
        a.type.render,
        a.ref,
        R
      );
      break;
    case 5:
      sc(a);
    default:
      nv(u, a), a = N = ev(a, da), a = V1(u, a, da);
  }
  l.memoizedProps = l.pendingProps, a === null ? yf(l) : N = a;
}
function Du(l, a, u, t) {
  ca = cu = null, sc(a), ou = null, ot = 0;
  var e = a.return;
  try {
    if (hy(
      l,
      e,
      a,
      u,
      R
    )) {
      w = 1, Ve(
        l,
        Rl(u, l.current)
      ), N = null;
      return;
    }
  } catch (f) {
    if (e !== null) throw N = e, f;
    w = 1, Ve(
      l,
      Rl(u, l.current)
    ), N = null;
    return;
  }
  a.flags & 32768 ? (X || t === 1 ? l = !0 : pu || (R & 536870912) !== 0 ? l = !1 : (aa = l = !0, (t === 2 || t === 3 || t === 6) && (t = Gl.current, t !== null && t.tag === 13 && (t.flags |= 16384))), sv(a, l)) : yf(a);
}
function yf(l) {
  var a = l;
  do {
    if ((a.flags & 32768) !== 0) {
      sv(
        a,
        aa
      );
      return;
    }
    l = a.return;
    var u = Sy(
      a.alternate,
      a,
      da
    );
    if (u !== null) {
      N = u;
      return;
    }
    if (a = a.sibling, a !== null) {
      N = a;
      return;
    }
    N = a = l;
  } while (a !== null);
  w === 0 && (w = 5);
}
function sv(l, a) {
  do {
    var u = by(l.alternate, l);
    if (u !== null) {
      u.flags &= 32767, N = u;
      return;
    }
    if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !a && (l = l.sibling, l !== null)) {
      N = l;
      return;
    }
    N = l = u;
  } while (l !== null);
  w = 6, N = null;
}
function Qi(l, a, u, t, e, f, n, c, i, v) {
  var S = H.T, b = K.p;
  try {
    K.p = 2, H.T = null, Dy(
      l,
      a,
      u,
      t,
      b,
      e,
      f,
      n,
      c,
      i,
      v
    );
  } finally {
    H.T = S, K.p = b;
  }
}
function Dy(l, a, u, t, e, f, n, c) {
  do
    _u();
  while (xa !== null);
  if ((J & 6) !== 0) throw Error(z(327));
  var i = l.finishedWork;
  if (t = l.finishedLanes, i === null) return null;
  if (l.finishedWork = null, l.finishedLanes = 0, i === l.current) throw Error(z(177));
  l.callbackNode = null, l.callbackPriority = 0, l.cancelPendingCommit = null;
  var v = i.lanes | i.childLanes;
  if (v |= uc, ah(
    l,
    t,
    v,
    f,
    n,
    c
  ), l === V && (N = V = null, R = 0), (i.subtreeFlags & 10256) === 0 && (i.flags & 10256) === 0 || ie || (ie = !0, _n = v, Yn = u, oy(qe, function() {
    return _u(), null;
  })), u = (i.flags & 15990) !== 0, (i.subtreeFlags & 15990) !== 0 || u ? (u = H.T, H.T = null, f = K.p, K.p = 2, n = J, J |= 4, dy(l, i), F1(i, l), wh(Vn, l.containerInfo), Fe = !!jn, Vn = jn = null, l.current = i, w1(l, i.alternate, i), Jv(), J = n, K.p = f, H.T = u) : l.current = i, ie ? (ie = !1, xa = l, At = t) : mv(l, v), v = l.pendingLanes, v === 0 && (qa = null), kv(i.stateNode), $l(l), a !== null)
    for (e = l.onRecoverableError, i = 0; i < a.length; i++)
      v = a[i], e(v.value, {
        componentStack: v.stack
      });
  return (At & 3) !== 0 && _u(), v = l.pendingLanes, (t & 4194218) !== 0 && (v & 42) !== 0 ? l === Rn ? Tt++ : (Tt = 0, Rn = l) : Tt = 0, Jt(0), null;
}
function mv(l, a) {
  (l.pooledCacheLanes &= a) === 0 && (a = l.pooledCache, a != null && (l.pooledCache = null, Kt(a)));
}
function _u() {
  if (xa !== null) {
    var l = xa, a = _n;
    _n = 0;
    var u = g0(At), t = H.T, e = K.p;
    try {
      if (K.p = 32 > u ? 32 : u, H.T = null, xa === null)
        var f = !1;
      else {
        u = Yn, Yn = null;
        var n = xa, c = At;
        if (xa = null, At = 0, (J & 6) !== 0)
          throw Error(z(331));
        var i = J;
        if (J |= 4, uv(n.current), I1(n, n.current, c, u), J = i, Jt(0, !1), Ml && typeof Ml.onPostCommitFiberRoot == "function")
          try {
            Ml.onPostCommitFiberRoot(Gt, n);
          } catch {
          }
        f = !0;
      }
      return f;
    } finally {
      K.p = e, H.T = t, mv(l, a);
    }
  }
  return !1;
}
function Gi(l, a, u) {
  a = Rl(u, a), a = Tn(l.stateNode, a, 2), l = Ha(l, a, 2), l !== null && (jt(l, 2), $l(l));
}
function Z(l, a, u) {
  if (l.tag === 3)
    Gi(l, l, u);
  else
    for (; a !== null; ) {
      if (a.tag === 3) {
        Gi(
          a,
          l,
          u
        );
        break;
      } else if (a.tag === 1) {
        var t = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof t.componentDidCatch == "function" && (qa === null || !qa.has(t))) {
          l = Rl(u, l), u = Y1(2), t = Ha(a, u, 2), t !== null && (R1(
            u,
            t,
            a,
            l
          ), jt(t, 2), $l(t));
          break;
        }
      }
      a = a.return;
    }
}
function Lf(l, a, u) {
  var t = l.pingCache;
  if (t === null) {
    t = l.pingCache = new zy();
    var e = /* @__PURE__ */ new Set();
    t.set(a, e);
  } else
    e = t.get(a), e === void 0 && (e = /* @__PURE__ */ new Set(), t.set(a, e));
  e.has(u) || (Hc = !0, e.add(u), l = Uy.bind(null, l, a, u), a.then(l, l));
}
function Uy(l, a, u) {
  var t = l.pingCache;
  t !== null && t.delete(a), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, V === l && (R & u) === u && (w === 4 || w === 3 && (R & 62914560) === R && 300 > Jl() - qc ? (J & 2) === 0 && Vu(l, 0) : oc |= u, ju === R && (ju = 0)), $l(l);
}
function Sv(l, a) {
  a === 0 && (a = m0()), l = Ya(l, a), l !== null && (jt(l, a), $l(l));
}
function Oy(l) {
  var a = l.memoizedState, u = 0;
  a !== null && (u = a.retryLane), Sv(l, u);
}
function Hy(l, a) {
  var u = 0;
  switch (l.tag) {
    case 13:
      var t = l.stateNode, e = l.memoizedState;
      e !== null && (u = e.retryLane);
      break;
    case 19:
      t = l.stateNode;
      break;
    case 22:
      t = l.stateNode._retryCache;
      break;
    default:
      throw Error(z(314));
  }
  t !== null && t.delete(a), Sv(l, u);
}
function oy(l, a) {
  return Wn(l, a);
}
var pe = null, du = null, Gn = !1, Je = !1, pf = !1, ka = 0;
function $l(l) {
  l !== du && l.next === null && (du === null ? pe = du = l : du = du.next = l), Je = !0, Gn || (Gn = !0, By(qy));
}
function Jt(l, a) {
  if (!pf && Je) {
    pf = !0;
    do
      for (var u = !1, t = pe; t !== null; ) {
        if (l !== 0) {
          var e = t.pendingLanes;
          if (e === 0) var f = 0;
          else {
            var n = t.suspendedLanes, c = t.pingedLanes;
            f = (1 << 31 - Dl(42 | l) + 1) - 1, f &= e & ~(n & ~c), f = f & 201326677 ? f & 201326677 | 1 : f ? f | 2 : 0;
          }
          f !== 0 && (u = !0, Zi(t, f));
        } else
          f = R, f = Ie(
            t,
            t === V ? f : 0
          ), (f & 3) === 0 || Zt(t, f) || (u = !0, Zi(t, f));
        t = t.next;
      }
    while (u);
    pf = !1;
  }
}
function qy() {
  Je = Gn = !1;
  var l = 0;
  ka !== 0 && (Zy() && (l = ka), ka = 0);
  for (var a = Jl(), u = null, t = pe; t !== null; ) {
    var e = t.next, f = bv(t, a);
    f === 0 ? (t.next = null, u === null ? pe = e : u.next = e, e === null && (du = u)) : (u = t, (l !== 0 || (f & 3) !== 0) && (Je = !0)), t = e;
  }
  Jt(l);
}
function bv(l, a) {
  for (var u = l.suspendedLanes, t = l.pingedLanes, e = l.expirationTimes, f = l.pendingLanes & -62914561; 0 < f; ) {
    var n = 31 - Dl(f), c = 1 << n, i = e[n];
    i === -1 ? ((c & u) === 0 || (c & t) !== 0) && (e[n] = lh(c, a)) : i <= a && (l.expiredLanes |= c), f &= ~c;
  }
  if (a = V, u = R, u = Ie(
    l,
    l === a ? u : 0
  ), t = l.callbackNode, u === 0 || l === a && j === 2 || l.cancelPendingCommit !== null)
    return t !== null && t !== null && Tf(t), l.callbackNode = null, l.callbackPriority = 0;
  if ((u & 3) === 0 || Zt(l, u)) {
    if (a = u & -u, a === l.callbackPriority) return a;
    switch (t !== null && Tf(t), g0(u)) {
      case 2:
      case 8:
        u = y0;
        break;
      case 32:
        u = qe;
        break;
      case 268435456:
        u = d0;
        break;
      default:
        u = qe;
    }
    return t = gv.bind(null, l), u = Wn(u, t), l.callbackPriority = a, l.callbackNode = u, a;
  }
  return t !== null && t !== null && Tf(t), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function gv(l, a) {
  var u = l.callbackNode;
  if (_u() && l.callbackNode !== u)
    return null;
  var t = R;
  return t = Ie(
    l,
    l === V ? t : 0
  ), t === 0 ? null : (iv(l, t, a), bv(l, Jl()), l.callbackNode != null && l.callbackNode === u ? gv.bind(null, l) : null);
}
function Zi(l, a) {
  if (_u()) return null;
  iv(l, a, !0);
}
function By(l) {
  Vy(function() {
    (J & 6) !== 0 ? Wn(h0, l) : l();
  });
}
function Nc() {
  return ka === 0 && (ka = s0()), ka;
}
function ji(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : me("" + l);
}
function Vi(l, a) {
  var u = a.ownerDocument.createElement("input");
  return u.name = a.name, u.value = a.value, l.id && u.setAttribute("form", l.id), a.parentNode.insertBefore(u, a), l = new FormData(l), u.parentNode.removeChild(u), l;
}
function Ny(l, a, u, t, e) {
  if (a === "submit" && u && u.stateNode === e) {
    var f = ji(
      (e[gl] || null).action
    ), n = t.submitter;
    n && (a = (a = n[gl] || null) ? ji(a.formAction) : n.getAttribute("formAction"), a !== null && (f = a, n = null));
    var c = new lf(
      "action",
      "action",
      null,
      t,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (t.defaultPrevented) {
              if (ka !== 0) {
                var i = n ? Vi(e, n) : new FormData(e);
                zn(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: f
                  },
                  null,
                  i
                );
              }
            } else
              typeof f == "function" && (c.preventDefault(), i = n ? Vi(e, n) : new FormData(e), zn(
                u,
                {
                  pending: !0,
                  data: i,
                  method: e.method,
                  action: f
                },
                f,
                i
              ));
          },
          currentTarget: e
        }
      ]
    });
  }
}
for (var Jf = 0; Jf < ni.length; Jf++) {
  var rf = ni[Jf], _y = rf.toLowerCase(), Yy = rf[0].toUpperCase() + rf.slice(1);
  Kl(
    _y,
    "on" + Yy
  );
}
Kl(j0, "onAnimationEnd");
Kl(V0, "onAnimationIteration");
Kl(C0, "onAnimationStart");
Kl("dblclick", "onDoubleClick");
Kl("focusin", "onFocus");
Kl("focusout", "onBlur");
Kl($h, "onTransitionRun");
Kl(kh, "onTransitionStart");
Kl(Fh, "onTransitionCancel");
Kl(K0, "onTransitionEnd");
Ru("onMouseEnter", ["mouseout", "mouseover"]);
Ru("onMouseLeave", ["mouseout", "mouseover"]);
Ru("onPointerEnter", ["pointerout", "pointerover"]);
Ru("onPointerLeave", ["pointerout", "pointerover"]);
uu(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
uu(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
uu("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
uu(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
uu(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
uu(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Bt = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), Ry = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bt)
);
function zv(l, a) {
  a = (a & 4) !== 0;
  for (var u = 0; u < l.length; u++) {
    var t = l[u], e = t.event;
    t = t.listeners;
    l: {
      var f = void 0;
      if (a)
        for (var n = t.length - 1; 0 <= n; n--) {
          var c = t[n], i = c.instance, v = c.currentTarget;
          if (c = c.listener, i !== f && e.isPropagationStopped())
            break l;
          f = c, e.currentTarget = v;
          try {
            f(e);
          } catch (S) {
            je(S);
          }
          e.currentTarget = null, f = i;
        }
      else
        for (n = 0; n < t.length; n++) {
          if (c = t[n], i = c.instance, v = c.currentTarget, c = c.listener, i !== f && e.isPropagationStopped())
            break l;
          f = c, e.currentTarget = v;
          try {
            f(e);
          } catch (S) {
            je(S);
          }
          e.currentTarget = null, f = i;
        }
    }
  }
}
function Y(l, a) {
  var u = a[en];
  u === void 0 && (u = a[en] = /* @__PURE__ */ new Set());
  var t = l + "__bubble";
  u.has(t) || (Av(a, l, 2, !1), u.add(t));
}
function wf(l, a, u) {
  var t = 0;
  a && (t |= 4), Av(
    u,
    l,
    t,
    a
  );
}
var ve = "_reactListening" + Math.random().toString(36).slice(2);
function _c(l) {
  if (!l[ve]) {
    l[ve] = !0, A0.forEach(function(u) {
      u !== "selectionchange" && (Ry.has(u) || wf(u, !1, l), wf(u, !0, l));
    });
    var a = l.nodeType === 9 ? l : l.ownerDocument;
    a === null || a[ve] || (a[ve] = !0, wf("selectionchange", !1, a));
  }
}
function Av(l, a, u, t) {
  switch (_v(a)) {
    case 2:
      var e = fd;
      break;
    case 8:
      e = nd;
      break;
    default:
      e = Qc;
  }
  u = e.bind(
    null,
    a,
    u,
    l
  ), e = void 0, !vn || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (e = !0), t ? e !== void 0 ? l.addEventListener(a, u, {
    capture: !0,
    passive: e
  }) : l.addEventListener(a, u, !0) : e !== void 0 ? l.addEventListener(a, u, {
    passive: e
  }) : l.addEventListener(a, u, !1);
}
function Wf(l, a, u, t, e) {
  var f = t;
  if ((a & 1) === 0 && (a & 2) === 0 && t !== null)
    l: for (; ; ) {
      if (t === null) return;
      var n = t.tag;
      if (n === 3 || n === 4) {
        var c = t.stateNode.containerInfo;
        if (c === e || c.nodeType === 8 && c.parentNode === e)
          break;
        if (n === 4)
          for (n = t.return; n !== null; ) {
            var i = n.tag;
            if ((i === 3 || i === 4) && (i = n.stateNode.containerInfo, i === e || i.nodeType === 8 && i.parentNode === e))
              return;
            n = n.return;
          }
        for (; c !== null; ) {
          if (n = La(c), n === null) return;
          if (i = n.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            t = f = n;
            continue l;
          }
          c = c.parentNode;
        }
      }
      t = t.return;
    }
  o0(function() {
    var v = f, S = Fn(u), b = [];
    l: {
      var d = x0.get(l);
      if (d !== void 0) {
        var m = lf, T = l;
        switch (l) {
          case "keypress":
            if (be(u) === 0) break l;
          case "keydown":
          case "keyup":
            m = Hh;
            break;
          case "focusin":
            T = "focus", m = Of;
            break;
          case "focusout":
            T = "blur", m = Of;
            break;
          case "beforeblur":
          case "afterblur":
            m = Of;
            break;
          case "click":
            if (u.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = Wc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = mh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Bh;
            break;
          case j0:
          case V0:
          case C0:
            m = gh;
            break;
          case K0:
            m = _h;
            break;
          case "scroll":
          case "scrollend":
            m = dh;
            break;
          case "wheel":
            m = Rh;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Ah;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = kc;
            break;
          case "toggle":
          case "beforetoggle":
            m = Qh;
        }
        var U = (a & 4) !== 0, C = !U && (l === "scroll" || l === "scrollend"), y = U ? d !== null ? d + "Capture" : null : d;
        U = [];
        for (var h = v, s; h !== null; ) {
          var g = h;
          if (s = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || s === null || y === null || (g = Dt(h, y), g != null && U.push(
            Nt(h, g, s)
          )), C) break;
          h = h.return;
        }
        0 < U.length && (d = new m(
          d,
          T,
          null,
          u,
          S
        ), b.push({ event: d, listeners: U }));
      }
    }
    if ((a & 7) === 0) {
      l: {
        if (d = l === "mouseover" || l === "pointerover", m = l === "mouseout" || l === "pointerout", d && u !== cn && (T = u.relatedTarget || u.fromElement) && (La(T) || T[xu]))
          break l;
        if ((m || d) && (d = S.window === S ? S : (d = S.ownerDocument) ? d.defaultView || d.parentWindow : window, m ? (T = u.relatedTarget || u.toElement, m = v, T = T ? La(T) : null, T !== null && (C = Ku(T), U = T.tag, T !== C || U !== 5 && U !== 27 && U !== 6) && (T = null)) : (m = null, T = v), m !== T)) {
          if (U = Wc, g = "onMouseLeave", y = "onMouseEnter", h = "mouse", (l === "pointerout" || l === "pointerover") && (U = kc, g = "onPointerLeave", y = "onPointerEnter", h = "pointer"), C = m == null ? d : et(m), s = T == null ? d : et(T), d = new U(
            g,
            h + "leave",
            m,
            u,
            S
          ), d.target = C, d.relatedTarget = s, g = null, La(S) === v && (U = new U(
            y,
            h + "enter",
            T,
            u,
            S
          ), U.target = s, U.relatedTarget = C, g = U), C = g, m && T)
            a: {
              for (U = m, y = T, h = 0, s = U; s; s = vu(s))
                h++;
              for (s = 0, g = y; g; g = vu(g))
                s++;
              for (; 0 < h - s; )
                U = vu(U), h--;
              for (; 0 < s - h; )
                y = vu(y), s--;
              for (; h--; ) {
                if (U === y || y !== null && U === y.alternate)
                  break a;
                U = vu(U), y = vu(y);
              }
              U = null;
            }
          else U = null;
          m !== null && Ci(
            b,
            d,
            m,
            U,
            !1
          ), T !== null && C !== null && Ci(
            b,
            C,
            T,
            U,
            !0
          );
        }
      }
      l: {
        if (d = v ? et(v) : window, m = d.nodeName && d.nodeName.toLowerCase(), m === "select" || m === "input" && d.type === "file")
          var A = li;
        else if (Ic(d))
          if (R0)
            A = Jh;
          else {
            A = Lh;
            var O = xh;
          }
        else
          m = d.nodeName, !m || m.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? v && kn(v.elementType) && (A = li) : A = ph;
        if (A && (A = A(l, v))) {
          Y0(
            b,
            A,
            u,
            S
          );
          break l;
        }
        O && O(l, d, v), l === "focusout" && v && d.type === "number" && v.memoizedProps.value != null && nn(d, "number", d.value);
      }
      switch (O = v ? et(v) : window, l) {
        case "focusin":
          (Ic(O) || O.contentEditable === "true") && (gu = O, hn = v, it = null);
          break;
        case "focusout":
          it = hn = gu = null;
          break;
        case "mousedown":
          yn = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          yn = !1, fi(b, u, S);
          break;
        case "selectionchange":
          if (Wh) break;
        case "keydown":
        case "keyup":
          fi(b, u, S);
      }
      var M;
      if (lc)
        l: {
          switch (l) {
            case "compositionstart":
              var D = "onCompositionStart";
              break l;
            case "compositionend":
              D = "onCompositionEnd";
              break l;
            case "compositionupdate":
              D = "onCompositionUpdate";
              break l;
          }
          D = void 0;
        }
      else
        bu ? N0(l, u) && (D = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (D = "onCompositionStart");
      D && (B0 && u.locale !== "ko" && (bu || D !== "onCompositionStart" ? D === "onCompositionEnd" && bu && (M = q0()) : (Da = S, Pn = "value" in Da ? Da.value : Da.textContent, bu = !0)), O = re(v, D), 0 < O.length && (D = new $c(
        D,
        l,
        null,
        u,
        S
      ), b.push({ event: D, listeners: O }), M ? D.data = M : (M = _0(u), M !== null && (D.data = M)))), (M = Zh ? jh(l, u) : Vh(l, u)) && (D = re(v, "onBeforeInput"), 0 < D.length && (O = new $c(
        "onBeforeInput",
        "beforeinput",
        null,
        u,
        S
      ), b.push({
        event: O,
        listeners: D
      }), O.data = M)), Ny(
        b,
        l,
        v,
        u,
        S
      );
    }
    zv(b, a);
  });
}
function Nt(l, a, u) {
  return {
    instance: l,
    listener: a,
    currentTarget: u
  };
}
function re(l, a) {
  for (var u = a + "Capture", t = []; l !== null; ) {
    var e = l, f = e.stateNode;
    e = e.tag, e !== 5 && e !== 26 && e !== 27 || f === null || (e = Dt(l, u), e != null && t.unshift(
      Nt(l, e, f)
    ), e = Dt(l, a), e != null && t.push(
      Nt(l, e, f)
    )), l = l.return;
  }
  return t;
}
function vu(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function Ci(l, a, u, t, e) {
  for (var f = a._reactName, n = []; u !== null && u !== t; ) {
    var c = u, i = c.alternate, v = c.stateNode;
    if (c = c.tag, i !== null && i === t) break;
    c !== 5 && c !== 26 && c !== 27 || v === null || (i = v, e ? (v = Dt(u, f), v != null && n.unshift(
      Nt(u, v, i)
    )) : e || (v = Dt(u, f), v != null && n.push(
      Nt(u, v, i)
    ))), u = u.return;
  }
  n.length !== 0 && l.push({ event: a, listeners: n });
}
var Xy = /\r\n?/g, Qy = /\u0000|\uFFFD/g;
function Ki(l) {
  return (typeof l == "string" ? l : "" + l).replace(Xy, `
`).replace(Qy, "");
}
function Tv(l, a) {
  return a = Ki(a), Ki(l) === a;
}
function df() {
}
function Q(l, a, u, t, e, f) {
  switch (u) {
    case "children":
      typeof t == "string" ? a === "body" || a === "textarea" && t === "" || Xu(l, t) : (typeof t == "number" || typeof t == "bigint") && a !== "body" && Xu(l, "" + t);
      break;
    case "className":
      ae(l, "class", t);
      break;
    case "tabIndex":
      ae(l, "tabindex", t);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ae(l, u, t);
      break;
    case "style":
      H0(l, t, f);
      break;
    case "data":
      if (a !== "object") {
        ae(l, "data", t);
        break;
      }
    case "src":
    case "href":
      if (t === "" && (a !== "a" || u !== "href")) {
        l.removeAttribute(u);
        break;
      }
      if (t == null || typeof t == "function" || typeof t == "symbol" || typeof t == "boolean") {
        l.removeAttribute(u);
        break;
      }
      t = me("" + t), l.setAttribute(u, t);
      break;
    case "action":
    case "formAction":
      if (typeof t == "function") {
        l.setAttribute(
          u,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof f == "function" && (u === "formAction" ? (a !== "input" && Q(l, a, "name", e.name, e, null), Q(
          l,
          a,
          "formEncType",
          e.formEncType,
          e,
          null
        ), Q(
          l,
          a,
          "formMethod",
          e.formMethod,
          e,
          null
        ), Q(
          l,
          a,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (Q(l, a, "encType", e.encType, e, null), Q(l, a, "method", e.method, e, null), Q(l, a, "target", e.target, e, null)));
      if (t == null || typeof t == "symbol" || typeof t == "boolean") {
        l.removeAttribute(u);
        break;
      }
      t = me("" + t), l.setAttribute(u, t);
      break;
    case "onClick":
      t != null && (l.onclick = df);
      break;
    case "onScroll":
      t != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      t != null && Y("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (t != null) {
        if (typeof t != "object" || !("__html" in t))
          throw Error(z(61));
        if (u = t.__html, u != null) {
          if (e.children != null) throw Error(z(60));
          l.innerHTML = u;
        }
      }
      break;
    case "multiple":
      l.multiple = t && typeof t != "function" && typeof t != "symbol";
      break;
    case "muted":
      l.muted = t && typeof t != "function" && typeof t != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (t == null || typeof t == "function" || typeof t == "boolean" || typeof t == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      u = me("" + t), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        u
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      t != null && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, "" + t) : l.removeAttribute(u);
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
      t && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
      break;
    case "capture":
    case "download":
      t === !0 ? l.setAttribute(u, "") : t !== !1 && t != null && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, t) : l.removeAttribute(u);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      t != null && typeof t != "function" && typeof t != "symbol" && !isNaN(t) && 1 <= t ? l.setAttribute(u, t) : l.removeAttribute(u);
      break;
    case "rowSpan":
    case "start":
      t == null || typeof t == "function" || typeof t == "symbol" || isNaN(t) ? l.removeAttribute(u) : l.setAttribute(u, t);
      break;
    case "popover":
      Y("beforetoggle", l), Y("toggle", l), se(l, "popover", t);
      break;
    case "xlinkActuate":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        t
      );
      break;
    case "xlinkArcrole":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        t
      );
      break;
    case "xlinkRole":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        t
      );
      break;
    case "xlinkShow":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        t
      );
      break;
    case "xlinkTitle":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        t
      );
      break;
    case "xlinkType":
      kl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        t
      );
      break;
    case "xmlBase":
      kl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        t
      );
      break;
    case "xmlLang":
      kl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        t
      );
      break;
    case "xmlSpace":
      kl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        t
      );
      break;
    case "is":
      se(l, "is", t);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = hh.get(u) || u, se(l, u, t));
  }
}
function Zn(l, a, u, t, e, f) {
  switch (u) {
    case "style":
      H0(l, t, f);
      break;
    case "dangerouslySetInnerHTML":
      if (t != null) {
        if (typeof t != "object" || !("__html" in t))
          throw Error(z(61));
        if (u = t.__html, u != null) {
          if (e.children != null) throw Error(z(60));
          l.innerHTML = u;
        }
      }
      break;
    case "children":
      typeof t == "string" ? Xu(l, t) : (typeof t == "number" || typeof t == "bigint") && Xu(l, "" + t);
      break;
    case "onScroll":
      t != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      t != null && Y("scrollend", l);
      break;
    case "onClick":
      t != null && (l.onclick = df);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!T0.hasOwnProperty(u))
        l: {
          if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), a = u.slice(2, e ? u.length - 7 : void 0), f = l[gl] || null, f = f != null ? f[u] : null, typeof f == "function" && l.removeEventListener(a, f, e), typeof t == "function")) {
            typeof f != "function" && f !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(a, t, e);
            break l;
          }
          u in l ? l[u] = t : t === !0 ? l.setAttribute(u, "") : se(l, u, t);
        }
  }
}
function hl(l, a, u) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      Y("error", l), Y("load", l);
      var t = !1, e = !1, f;
      for (f in u)
        if (u.hasOwnProperty(f)) {
          var n = u[f];
          if (n != null)
            switch (f) {
              case "src":
                t = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(z(137, a));
              default:
                Q(l, a, f, n, u, null);
            }
        }
      e && Q(l, a, "srcSet", u.srcSet, u, null), t && Q(l, a, "src", u.src, u, null);
      return;
    case "input":
      Y("invalid", l);
      var c = f = n = e = null, i = null, v = null;
      for (t in u)
        if (u.hasOwnProperty(t)) {
          var S = u[t];
          if (S != null)
            switch (t) {
              case "name":
                e = S;
                break;
              case "type":
                n = S;
                break;
              case "checked":
                i = S;
                break;
              case "defaultChecked":
                v = S;
                break;
              case "value":
                f = S;
                break;
              case "defaultValue":
                c = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(z(137, a));
                break;
              default:
                Q(l, a, t, S, u, null);
            }
        }
      D0(
        l,
        f,
        c,
        i,
        v,
        n,
        e,
        !1
      ), Be(l);
      return;
    case "select":
      Y("invalid", l), t = n = f = null;
      for (e in u)
        if (u.hasOwnProperty(e) && (c = u[e], c != null))
          switch (e) {
            case "value":
              f = c;
              break;
            case "defaultValue":
              n = c;
              break;
            case "multiple":
              t = c;
            default:
              Q(l, a, e, c, u, null);
          }
      a = f, u = n, l.multiple = !!t, a != null ? Ou(l, !!t, a, !1) : u != null && Ou(l, !!t, u, !0);
      return;
    case "textarea":
      Y("invalid", l), f = e = t = null;
      for (n in u)
        if (u.hasOwnProperty(n) && (c = u[n], c != null))
          switch (n) {
            case "value":
              t = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              f = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(z(91));
              break;
            default:
              Q(l, a, n, c, u, null);
          }
      O0(l, t, e, f), Be(l);
      return;
    case "option":
      for (i in u)
        if (u.hasOwnProperty(i) && (t = u[i], t != null))
          switch (i) {
            case "selected":
              l.selected = t && typeof t != "function" && typeof t != "symbol";
              break;
            default:
              Q(l, a, i, t, u, null);
          }
      return;
    case "dialog":
      Y("cancel", l), Y("close", l);
      break;
    case "iframe":
    case "object":
      Y("load", l);
      break;
    case "video":
    case "audio":
      for (t = 0; t < Bt.length; t++)
        Y(Bt[t], l);
      break;
    case "image":
      Y("error", l), Y("load", l);
      break;
    case "details":
      Y("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      Y("error", l), Y("load", l);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (v in u)
        if (u.hasOwnProperty(v) && (t = u[v], t != null))
          switch (v) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(z(137, a));
            default:
              Q(l, a, v, t, u, null);
          }
      return;
    default:
      if (kn(a)) {
        for (S in u)
          u.hasOwnProperty(S) && (t = u[S], t !== void 0 && Zn(
            l,
            a,
            S,
            t,
            u,
            void 0
          ));
        return;
      }
  }
  for (c in u)
    u.hasOwnProperty(c) && (t = u[c], t != null && Q(l, a, c, t, u, null));
}
function Gy(l, a, u, t) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var e = null, f = null, n = null, c = null, i = null, v = null, S = null;
      for (m in u) {
        var b = u[m];
        if (u.hasOwnProperty(m) && b != null)
          switch (m) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = b;
            default:
              t.hasOwnProperty(m) || Q(l, a, m, null, t, b);
          }
      }
      for (var d in t) {
        var m = t[d];
        if (b = u[d], t.hasOwnProperty(d) && (m != null || b != null))
          switch (d) {
            case "type":
              f = m;
              break;
            case "name":
              e = m;
              break;
            case "checked":
              v = m;
              break;
            case "defaultChecked":
              S = m;
              break;
            case "value":
              n = m;
              break;
            case "defaultValue":
              c = m;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (m != null)
                throw Error(z(137, a));
              break;
            default:
              m !== b && Q(
                l,
                a,
                d,
                m,
                t,
                b
              );
          }
      }
      fn(
        l,
        n,
        c,
        i,
        v,
        S,
        f,
        e
      );
      return;
    case "select":
      m = n = c = d = null;
      for (f in u)
        if (i = u[f], u.hasOwnProperty(f) && i != null)
          switch (f) {
            case "value":
              break;
            case "multiple":
              m = i;
            default:
              t.hasOwnProperty(f) || Q(
                l,
                a,
                f,
                null,
                t,
                i
              );
          }
      for (e in t)
        if (f = t[e], i = u[e], t.hasOwnProperty(e) && (f != null || i != null))
          switch (e) {
            case "value":
              d = f;
              break;
            case "defaultValue":
              c = f;
              break;
            case "multiple":
              n = f;
            default:
              f !== i && Q(
                l,
                a,
                e,
                f,
                t,
                i
              );
          }
      a = c, u = n, t = m, d != null ? Ou(l, !!u, d, !1) : !!t != !!u && (a != null ? Ou(l, !!u, a, !0) : Ou(l, !!u, u ? [] : "", !1));
      return;
    case "textarea":
      m = d = null;
      for (c in u)
        if (e = u[c], u.hasOwnProperty(c) && e != null && !t.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              Q(l, a, c, null, t, e);
          }
      for (n in t)
        if (e = t[n], f = u[n], t.hasOwnProperty(n) && (e != null || f != null))
          switch (n) {
            case "value":
              d = e;
              break;
            case "defaultValue":
              m = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(z(91));
              break;
            default:
              e !== f && Q(l, a, n, e, t, f);
          }
      U0(l, d, m);
      return;
    case "option":
      for (var T in u)
        if (d = u[T], u.hasOwnProperty(T) && d != null && !t.hasOwnProperty(T))
          switch (T) {
            case "selected":
              l.selected = !1;
              break;
            default:
              Q(
                l,
                a,
                T,
                null,
                t,
                d
              );
          }
      for (i in t)
        if (d = t[i], m = u[i], t.hasOwnProperty(i) && d !== m && (d != null || m != null))
          switch (i) {
            case "selected":
              l.selected = d && typeof d != "function" && typeof d != "symbol";
              break;
            default:
              Q(
                l,
                a,
                i,
                d,
                t,
                m
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var U in u)
        d = u[U], u.hasOwnProperty(U) && d != null && !t.hasOwnProperty(U) && Q(l, a, U, null, t, d);
      for (v in t)
        if (d = t[v], m = u[v], t.hasOwnProperty(v) && d !== m && (d != null || m != null))
          switch (v) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null)
                throw Error(z(137, a));
              break;
            default:
              Q(
                l,
                a,
                v,
                d,
                t,
                m
              );
          }
      return;
    default:
      if (kn(a)) {
        for (var C in u)
          d = u[C], u.hasOwnProperty(C) && d !== void 0 && !t.hasOwnProperty(C) && Zn(
            l,
            a,
            C,
            void 0,
            t,
            d
          );
        for (S in t)
          d = t[S], m = u[S], !t.hasOwnProperty(S) || d === m || d === void 0 && m === void 0 || Zn(
            l,
            a,
            S,
            d,
            t,
            m
          );
        return;
      }
  }
  for (var y in u)
    d = u[y], u.hasOwnProperty(y) && d != null && !t.hasOwnProperty(y) && Q(l, a, y, null, t, d);
  for (b in t)
    d = t[b], m = u[b], !t.hasOwnProperty(b) || d === m || d == null && m == null || Q(l, a, b, d, t, m);
}
var jn = null, Vn = null;
function we(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function xi(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Ev(l, a) {
  if (l === 0)
    switch (a) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && a === "foreignObject" ? 0 : l;
}
function Cn(l, a) {
  return l === "textarea" || l === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
}
var $f = null;
function Zy() {
  var l = window.event;
  return l && l.type === "popstate" ? l === $f ? !1 : ($f = l, !0) : ($f = null, !1);
}
var Mv = typeof setTimeout == "function" ? setTimeout : void 0, jy = typeof clearTimeout == "function" ? clearTimeout : void 0, Li = typeof Promise == "function" ? Promise : void 0, Vy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Li < "u" ? function(l) {
  return Li.resolve(null).then(l).catch(Cy);
} : Mv;
function Cy(l) {
  setTimeout(function() {
    throw l;
  });
}
function kf(l, a) {
  var u = a, t = 0;
  do {
    var e = u.nextSibling;
    if (l.removeChild(u), e && e.nodeType === 8)
      if (u = e.data, u === "/$") {
        if (t === 0) {
          l.removeChild(e), Qt(a);
          return;
        }
        t--;
      } else u !== "$" && u !== "$?" && u !== "$!" || t++;
    u = e;
  } while (u);
  Qt(a);
}
function Kn(l) {
  var a = l.firstChild;
  for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
    var u = a;
    switch (a = a.nextSibling, u.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Kn(u), $n(u);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (u.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(u);
  }
}
function Ky(l, a, u, t) {
  for (; l.nodeType === 1; ) {
    var e = u;
    if (l.nodeName.toLowerCase() !== a.toLowerCase()) {
      if (!t && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (t) {
      if (!l[Mt])
        switch (a) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (f = l.getAttribute("rel"), f === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (f !== e.rel || l.getAttribute("href") !== (e.href == null ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (f = l.getAttribute("src"), (f !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && f && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (a === "input" && l.type === "hidden") {
      var f = e.name == null ? null : "" + e.name;
      if (e.type === "hidden" && l.getAttribute("name") === f)
        return l;
    } else return l;
    if (l = Cl(l.nextSibling), l === null) break;
  }
  return null;
}
function xy(l, a, u) {
  if (a === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Cl(l.nextSibling), l === null)) return null;
  return l;
}
function Cl(l) {
  for (; l != null; l = l.nextSibling) {
    var a = l.nodeType;
    if (a === 1 || a === 3) break;
    if (a === 8) {
      if (a = l.data, a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
        break;
      if (a === "/$") return null;
    }
  }
  return l;
}
function pi(l) {
  l = l.previousSibling;
  for (var a = 0; l; ) {
    if (l.nodeType === 8) {
      var u = l.data;
      if (u === "$" || u === "$!" || u === "$?") {
        if (a === 0) return l;
        a--;
      } else u === "/$" && a++;
    }
    l = l.previousSibling;
  }
  return null;
}
function Dv(l, a, u) {
  switch (a = we(u), l) {
    case "html":
      if (l = a.documentElement, !l) throw Error(z(452));
      return l;
    case "head":
      if (l = a.head, !l) throw Error(z(453));
      return l;
    case "body":
      if (l = a.body, !l) throw Error(z(454));
      return l;
    default:
      throw Error(z(451));
  }
}
var Zl = /* @__PURE__ */ new Map(), Ji = /* @__PURE__ */ new Set();
function We(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.ownerDocument;
}
var sa = K.d;
K.d = {
  f: Ly,
  r: py,
  D: Jy,
  C: ry,
  L: wy,
  m: Wy,
  X: ky,
  S: $y,
  M: Fy
};
function Ly() {
  var l = sa.f(), a = hf();
  return l || a;
}
function py(l) {
  var a = Lu(l);
  a !== null && a.tag === 5 && a.type === "form" ? D1(a) : sa.r(l);
}
var Ju = typeof document > "u" ? null : document;
function Uv(l, a, u) {
  var t = Ju;
  if (t && typeof a == "string" && a) {
    var e = Yl(a);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), Ji.has(e) || (Ji.add(e), l = { rel: l, crossOrigin: u, href: a }, t.querySelector(e) === null && (a = t.createElement("link"), hl(a, "link", l), fl(a), t.head.appendChild(a)));
  }
}
function Jy(l) {
  sa.D(l), Uv("dns-prefetch", l, null);
}
function ry(l, a) {
  sa.C(l, a), Uv("preconnect", l, a);
}
function wy(l, a, u) {
  sa.L(l, a, u);
  var t = Ju;
  if (t && l && a) {
    var e = 'link[rel="preload"][as="' + Yl(a) + '"]';
    a === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + Yl(
      u.imageSrcSet
    ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + Yl(
      u.imageSizes
    ) + '"]')) : e += '[href="' + Yl(l) + '"]';
    var f = e;
    switch (a) {
      case "style":
        f = Cu(l);
        break;
      case "script":
        f = ru(l);
    }
    Zl.has(f) || (l = x(
      {
        rel: "preload",
        href: a === "image" && u && u.imageSrcSet ? void 0 : l,
        as: a
      },
      u
    ), Zl.set(f, l), t.querySelector(e) !== null || a === "style" && t.querySelector(rt(f)) || a === "script" && t.querySelector(wt(f)) || (a = t.createElement("link"), hl(a, "link", l), fl(a), t.head.appendChild(a)));
  }
}
function Wy(l, a) {
  sa.m(l, a);
  var u = Ju;
  if (u && l) {
    var t = a && typeof a.as == "string" ? a.as : "script", e = 'link[rel="modulepreload"][as="' + Yl(t) + '"][href="' + Yl(l) + '"]', f = e;
    switch (t) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        f = ru(l);
    }
    if (!Zl.has(f) && (l = x({ rel: "modulepreload", href: l }, a), Zl.set(f, l), u.querySelector(e) === null)) {
      switch (t) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (u.querySelector(wt(f)))
            return;
      }
      t = u.createElement("link"), hl(t, "link", l), fl(t), u.head.appendChild(t);
    }
  }
}
function $y(l, a, u) {
  sa.S(l, a, u);
  var t = Ju;
  if (t && l) {
    var e = Uu(t).hoistableStyles, f = Cu(l);
    a = a || "default";
    var n = e.get(f);
    if (!n) {
      var c = { loading: 0, preload: null };
      if (n = t.querySelector(
        rt(f)
      ))
        c.loading = 5;
      else {
        l = x(
          { rel: "stylesheet", href: l, "data-precedence": a },
          u
        ), (u = Zl.get(f)) && Yc(l, u);
        var i = n = t.createElement("link");
        fl(i), hl(i, "link", l), i._p = new Promise(function(v, S) {
          i.onload = v, i.onerror = S;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Me(n, a, t);
      }
      n = {
        type: "stylesheet",
        instance: n,
        count: 1,
        state: c
      }, e.set(f, n);
    }
  }
}
function ky(l, a) {
  sa.X(l, a);
  var u = Ju;
  if (u && l) {
    var t = Uu(u).hoistableScripts, e = ru(l), f = t.get(e);
    f || (f = u.querySelector(wt(e)), f || (l = x({ src: l, async: !0 }, a), (a = Zl.get(e)) && Rc(l, a), f = u.createElement("script"), fl(f), hl(f, "link", l), u.head.appendChild(f)), f = {
      type: "script",
      instance: f,
      count: 1,
      state: null
    }, t.set(e, f));
  }
}
function Fy(l, a) {
  sa.M(l, a);
  var u = Ju;
  if (u && l) {
    var t = Uu(u).hoistableScripts, e = ru(l), f = t.get(e);
    f || (f = u.querySelector(wt(e)), f || (l = x({ src: l, async: !0, type: "module" }, a), (a = Zl.get(e)) && Rc(l, a), f = u.createElement("script"), fl(f), hl(f, "link", l), u.head.appendChild(f)), f = {
      type: "script",
      instance: f,
      count: 1,
      state: null
    }, t.set(e, f));
  }
}
function ri(l, a, u, t) {
  var e = (e = Ua.current) ? We(e) : null;
  if (!e) throw Error(z(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof u.precedence == "string" && typeof u.href == "string" ? (a = Cu(u.href), u = Uu(
        e
      ).hoistableStyles, t = u.get(a), t || (t = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, u.set(a, t)), t) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
        l = Cu(u.href);
        var f = Uu(
          e
        ).hoistableStyles, n = f.get(l);
        if (n || (e = e.ownerDocument || e, n = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, f.set(l, n), (f = e.querySelector(
          rt(l)
        )) && !f._p && (n.instance = f, n.state.loading = 5), Zl.has(l) || (u = {
          rel: "preload",
          as: "style",
          href: u.href,
          crossOrigin: u.crossOrigin,
          integrity: u.integrity,
          media: u.media,
          hrefLang: u.hrefLang,
          referrerPolicy: u.referrerPolicy
        }, Zl.set(l, u), f || Py(
          e,
          l,
          u,
          n.state
        ))), a && t === null)
          throw Error(z(528, ""));
        return n;
      }
      if (a && t !== null)
        throw Error(z(529, ""));
      return null;
    case "script":
      return a = u.async, u = u.src, typeof u == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = ru(u), u = Uu(
        e
      ).hoistableScripts, t = u.get(a), t || (t = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, u.set(a, t)), t) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(z(444, l));
  }
}
function Cu(l) {
  return 'href="' + Yl(l) + '"';
}
function rt(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function Ov(l) {
  return x({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function Py(l, a, u, t) {
  l.querySelector('link[rel="preload"][as="style"][' + a + "]") ? t.loading = 1 : (a = l.createElement("link"), t.preload = a, a.addEventListener("load", function() {
    return t.loading |= 1;
  }), a.addEventListener("error", function() {
    return t.loading |= 2;
  }), hl(a, "link", u), fl(a), l.head.appendChild(a));
}
function ru(l) {
  return '[src="' + Yl(l) + '"]';
}
function wt(l) {
  return "script[async]" + l;
}
function wi(l, a, u) {
  if (a.count++, a.instance === null)
    switch (a.type) {
      case "style":
        var t = l.querySelector(
          'style[data-href~="' + Yl(u.href) + '"]'
        );
        if (t)
          return a.instance = t, fl(t), t;
        var e = x({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return t = (l.ownerDocument || l).createElement(
          "style"
        ), fl(t), hl(t, "style", e), Me(t, u.precedence, l), a.instance = t;
      case "stylesheet":
        e = Cu(u.href);
        var f = l.querySelector(
          rt(e)
        );
        if (f)
          return a.state.loading |= 4, a.instance = f, fl(f), f;
        t = Ov(u), (e = Zl.get(e)) && Yc(t, e), f = (l.ownerDocument || l).createElement("link"), fl(f);
        var n = f;
        return n._p = new Promise(function(c, i) {
          n.onload = c, n.onerror = i;
        }), hl(f, "link", t), a.state.loading |= 4, Me(f, u.precedence, l), a.instance = f;
      case "script":
        return f = ru(u.src), (e = l.querySelector(
          wt(f)
        )) ? (a.instance = e, fl(e), e) : (t = u, (e = Zl.get(f)) && (t = x({}, u), Rc(t, e)), l = l.ownerDocument || l, e = l.createElement("script"), fl(e), hl(e, "link", t), l.head.appendChild(e), a.instance = e);
      case "void":
        return null;
      default:
        throw Error(z(443, a.type));
    }
  else
    a.type === "stylesheet" && (a.state.loading & 4) === 0 && (t = a.instance, a.state.loading |= 4, Me(t, u.precedence, l));
  return a.instance;
}
function Me(l, a, u) {
  for (var t = u.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = t.length ? t[t.length - 1] : null, f = e, n = 0; n < t.length; n++) {
    var c = t[n];
    if (c.dataset.precedence === a) f = c;
    else if (f !== e) break;
  }
  f ? f.parentNode.insertBefore(l, f.nextSibling) : (a = u.nodeType === 9 ? u.head : u, a.insertBefore(l, a.firstChild));
}
function Yc(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.title == null && (l.title = a.title);
}
function Rc(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.integrity == null && (l.integrity = a.integrity);
}
var De = null;
function Wi(l, a, u) {
  if (De === null) {
    var t = /* @__PURE__ */ new Map(), e = De = /* @__PURE__ */ new Map();
    e.set(u, t);
  } else
    e = De, t = e.get(u), t || (t = /* @__PURE__ */ new Map(), e.set(u, t));
  if (t.has(l)) return t;
  for (t.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
    var f = u[e];
    if (!(f[Mt] || f[yl] || l === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
      var n = f.getAttribute(a) || "";
      n = l + n;
      var c = t.get(n);
      c ? c.push(f) : t.set(n, [f]);
    }
  }
  return t;
}
function $i(l, a, u) {
  l = l.ownerDocument || l, l.head.insertBefore(
    u,
    a === "title" ? l.querySelector("head > title") : null
  );
}
function Iy(l, a, u) {
  if (u === 1 || a.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
        break;
      return !0;
    case "link":
      if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
        break;
      switch (a.rel) {
        case "stylesheet":
          return l = a.disabled, typeof a.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
        return !0;
  }
  return !1;
}
function Hv(l) {
  return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
}
var _t = null;
function ld() {
}
function ad(l, a, u) {
  if (_t === null) throw Error(z(475));
  var t = _t;
  if (a.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (a.state.loading & 4) === 0) {
    if (a.instance === null) {
      var e = Cu(u.href), f = l.querySelector(
        rt(e)
      );
      if (f) {
        l = f._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = $e.bind(t), l.then(t, t)), a.state.loading |= 4, a.instance = f, fl(f);
        return;
      }
      f = l.ownerDocument || l, u = Ov(u), (e = Zl.get(e)) && Yc(u, e), f = f.createElement("link"), fl(f);
      var n = f;
      n._p = new Promise(function(c, i) {
        n.onload = c, n.onerror = i;
      }), hl(f, "link", u), a.instance = f;
    }
    t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, l), (l = a.state.preload) && (a.state.loading & 3) === 0 && (t.count++, a = $e.bind(t), l.addEventListener("load", a), l.addEventListener("error", a));
  }
}
function ud() {
  if (_t === null) throw Error(z(475));
  var l = _t;
  return l.stylesheets && l.count === 0 && xn(l, l.stylesheets), 0 < l.count ? function(a) {
    var u = setTimeout(function() {
      if (l.stylesheets && xn(l, l.stylesheets), l.unsuspend) {
        var t = l.unsuspend;
        l.unsuspend = null, t();
      }
    }, 6e4);
    return l.unsuspend = a, function() {
      l.unsuspend = null, clearTimeout(u);
    };
  } : null;
}
function $e() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) xn(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var ke = null;
function xn(l, a) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, ke = /* @__PURE__ */ new Map(), a.forEach(td, l), ke = null, $e.call(l));
}
function td(l, a) {
  if (!(a.state.loading & 4)) {
    var u = ke.get(l);
    if (u) var t = u.get(null);
    else {
      u = /* @__PURE__ */ new Map(), ke.set(l, u);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), f = 0; f < e.length; f++) {
        var n = e[f];
        (n.nodeName === "LINK" || n.getAttribute("media") !== "not all") && (u.set(n.dataset.precedence, n), t = n);
      }
      t && u.set(null, t);
    }
    e = a.instance, n = e.getAttribute("data-precedence"), f = u.get(n) || t, f === t && u.set(null, e), u.set(n, e), this.count++, t = $e.bind(this), e.addEventListener("load", t), e.addEventListener("error", t), f ? f.parentNode.insertBefore(e, f.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), a.state.loading |= 4;
  }
}
var Yt = {
  $$typeof: ta,
  Provider: null,
  Consumer: null,
  _currentValue: Ja,
  _currentValue2: Ja,
  _threadCount: 0
};
function ed(l, a, u, t, e, f, n, c) {
  this.tag = 1, this.containerInfo = l, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ef(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ef(0), this.hiddenUpdates = Ef(null), this.identifierPrefix = t, this.onUncaughtError = e, this.onCaughtError = f, this.onRecoverableError = n, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function ov(l, a, u, t, e, f, n, c, i, v, S, b) {
  return l = new ed(
    l,
    a,
    u,
    n,
    c,
    i,
    v,
    b
  ), a = 1, f === !0 && (a |= 24), f = Xl(3, null, null, a), l.current = f, f.stateNode = l, a = cc(), a.refCount++, l.pooledCache = a, a.refCount++, f.memoizedState = {
    element: t,
    isDehydrated: u,
    cache: a
  }, Mc(f), l;
}
function qv(l) {
  return l ? (l = Tu, l) : Tu;
}
function Bv(l, a, u, t, e, f) {
  e = qv(e), t.context === null ? t.context = e : t.pendingContext = e, t = Oa(a), t.payload = { element: u }, f = f === void 0 ? null : f, f !== null && (t.callback = f), u = Ha(l, t, a), u !== null && (ml(u, l, a), mt(u, l, a));
}
function ki(l, a) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var u = l.retryLane;
    l.retryLane = u !== 0 && u < a ? u : a;
  }
}
function Xc(l, a) {
  ki(l, a), (l = l.alternate) && ki(l, a);
}
function Nv(l) {
  if (l.tag === 13) {
    var a = Ya(l, 67108864);
    a !== null && ml(a, l, 67108864), Xc(l, 67108864);
  }
}
var Fe = !0;
function fd(l, a, u, t) {
  var e = H.T;
  H.T = null;
  var f = K.p;
  try {
    K.p = 2, Qc(l, a, u, t);
  } finally {
    K.p = f, H.T = e;
  }
}
function nd(l, a, u, t) {
  var e = H.T;
  H.T = null;
  var f = K.p;
  try {
    K.p = 8, Qc(l, a, u, t);
  } finally {
    K.p = f, H.T = e;
  }
}
function Qc(l, a, u, t) {
  if (Fe) {
    var e = Ln(t);
    if (e === null)
      Wf(
        l,
        a,
        t,
        Pe,
        u
      ), Fi(l, t);
    else if (id(
      e,
      l,
      a,
      u,
      t
    ))
      t.stopPropagation();
    else if (Fi(l, t), a & 4 && -1 < cd.indexOf(l)) {
      for (; e !== null; ) {
        var f = Lu(e);
        if (f !== null)
          switch (f.tag) {
            case 3:
              if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                var n = Ca(f.pendingLanes);
                if (n !== 0) {
                  var c = f;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; n; ) {
                    var i = 1 << 31 - Dl(n);
                    c.entanglements[1] |= i, n &= ~i;
                  }
                  $l(f), (J & 6) === 0 && (xe = Jl() + 500, Jt(0));
                }
              }
              break;
            case 13:
              c = Ya(f, 2), c !== null && ml(c, f, 2), hf(), Xc(f, 2);
          }
        if (f = Ln(t), f === null && Wf(
          l,
          a,
          t,
          Pe,
          u
        ), f === e) break;
        e = f;
      }
      e !== null && t.stopPropagation();
    } else
      Wf(
        l,
        a,
        t,
        null,
        u
      );
  }
}
function Ln(l) {
  return l = Fn(l), Gc(l);
}
var Pe = null;
function Gc(l) {
  if (Pe = null, l = La(l), l !== null) {
    var a = Ku(l);
    if (a === null) l = null;
    else {
      var u = a.tag;
      if (u === 13) {
        if (l = i0(a), l !== null) return l;
        l = null;
      } else if (u === 3) {
        if (a.stateNode.current.memoizedState.isDehydrated)
          return a.tag === 3 ? a.stateNode.containerInfo : null;
        l = null;
      } else a !== l && (l = null);
    }
  }
  return Pe = l, null;
}
function _v(l) {
  switch (l) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (rv()) {
        case h0:
          return 2;
        case y0:
          return 8;
        case qe:
        case wv:
          return 32;
        case d0:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var pn = !1, Ba = null, Na = null, _a = null, Rt = /* @__PURE__ */ new Map(), Xt = /* @__PURE__ */ new Map(), Ea = [], cd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function Fi(l, a) {
  switch (l) {
    case "focusin":
    case "focusout":
      Ba = null;
      break;
    case "dragenter":
    case "dragleave":
      Na = null;
      break;
    case "mouseover":
    case "mouseout":
      _a = null;
      break;
    case "pointerover":
    case "pointerout":
      Rt.delete(a.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xt.delete(a.pointerId);
  }
}
function lt(l, a, u, t, e, f) {
  return l === null || l.nativeEvent !== f ? (l = {
    blockedOn: a,
    domEventName: u,
    eventSystemFlags: t,
    nativeEvent: f,
    targetContainers: [e]
  }, a !== null && (a = Lu(a), a !== null && Nv(a)), l) : (l.eventSystemFlags |= t, a = l.targetContainers, e !== null && a.indexOf(e) === -1 && a.push(e), l);
}
function id(l, a, u, t, e) {
  switch (a) {
    case "focusin":
      return Ba = lt(
        Ba,
        l,
        a,
        u,
        t,
        e
      ), !0;
    case "dragenter":
      return Na = lt(
        Na,
        l,
        a,
        u,
        t,
        e
      ), !0;
    case "mouseover":
      return _a = lt(
        _a,
        l,
        a,
        u,
        t,
        e
      ), !0;
    case "pointerover":
      var f = e.pointerId;
      return Rt.set(
        f,
        lt(
          Rt.get(f) || null,
          l,
          a,
          u,
          t,
          e
        )
      ), !0;
    case "gotpointercapture":
      return f = e.pointerId, Xt.set(
        f,
        lt(
          Xt.get(f) || null,
          l,
          a,
          u,
          t,
          e
        )
      ), !0;
  }
  return !1;
}
function Yv(l) {
  var a = La(l.target);
  if (a !== null) {
    var u = Ku(a);
    if (u !== null) {
      if (a = u.tag, a === 13) {
        if (a = i0(u), a !== null) {
          l.blockedOn = a, uh(l.priority, function() {
            if (u.tag === 13) {
              var t = Ul(), e = Ya(u, t);
              e !== null && ml(e, u, t), Xc(u, t);
            }
          });
          return;
        }
      } else if (a === 3 && u.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function Ue(l) {
  if (l.blockedOn !== null) return !1;
  for (var a = l.targetContainers; 0 < a.length; ) {
    var u = Ln(l.nativeEvent);
    if (u === null) {
      u = l.nativeEvent;
      var t = new u.constructor(
        u.type,
        u
      );
      cn = t, u.target.dispatchEvent(t), cn = null;
    } else
      return a = Lu(u), a !== null && Nv(a), l.blockedOn = u, !1;
    a.shift();
  }
  return !0;
}
function Pi(l, a, u) {
  Ue(l) && u.delete(a);
}
function vd() {
  pn = !1, Ba !== null && Ue(Ba) && (Ba = null), Na !== null && Ue(Na) && (Na = null), _a !== null && Ue(_a) && (_a = null), Rt.forEach(Pi), Xt.forEach(Pi);
}
function he(l, a) {
  l.blockedOn === a && (l.blockedOn = null, pn || (pn = !0, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    vd
  )));
}
var ye = null;
function Ii(l) {
  ye !== l && (ye = l, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    function() {
      ye === l && (ye = null);
      for (var a = 0; a < l.length; a += 3) {
        var u = l[a], t = l[a + 1], e = l[a + 2];
        if (typeof t != "function") {
          if (Gc(t || u) === null)
            continue;
          break;
        }
        var f = Lu(u);
        f !== null && (l.splice(a, 3), a -= 3, zn(
          f,
          {
            pending: !0,
            data: e,
            method: u.method,
            action: t
          },
          t,
          e
        ));
      }
    }
  ));
}
function Qt(l) {
  function a(i) {
    return he(i, l);
  }
  Ba !== null && he(Ba, l), Na !== null && he(Na, l), _a !== null && he(_a, l), Rt.forEach(a), Xt.forEach(a);
  for (var u = 0; u < Ea.length; u++) {
    var t = Ea[u];
    t.blockedOn === l && (t.blockedOn = null);
  }
  for (; 0 < Ea.length && (u = Ea[0], u.blockedOn === null); )
    Yv(u), u.blockedOn === null && Ea.shift();
  if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
    for (t = 0; t < u.length; t += 3) {
      var e = u[t], f = u[t + 1], n = e[gl] || null;
      if (typeof f == "function")
        n || Ii(u);
      else if (n) {
        var c = null;
        if (f && f.hasAttribute("formAction")) {
          if (e = f, n = f[gl] || null)
            c = n.formAction;
          else if (Gc(e) !== null) continue;
        } else c = n.action;
        typeof c == "function" ? u[t + 1] = c : (u.splice(t, 3), t -= 3), Ii(u);
      }
    }
}
function Zc(l) {
  this._internalRoot = l;
}
sf.prototype.render = Zc.prototype.render = function(l) {
  var a = this._internalRoot;
  if (a === null) throw Error(z(409));
  var u = a.current, t = Ul();
  Bv(u, t, l, a, null, null);
};
sf.prototype.unmount = Zc.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var a = l.containerInfo;
    l.tag === 0 && _u(), Bv(l.current, 2, null, l, null, null), hf(), a[xu] = null;
  }
};
function sf(l) {
  this._internalRoot = l;
}
sf.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var a = z0();
    l = { blockedOn: null, target: l, priority: a };
    for (var u = 0; u < Ea.length && a !== 0 && a < Ea[u].priority; u++) ;
    Ea.splice(u, 0, l), u === 0 && Yv(l);
  }
};
var l0 = t0.version;
if (l0 !== "19.0.0")
  throw Error(
    z(
      527,
      l0,
      "19.0.0"
    )
  );
K.findDOMNode = function(l) {
  var a = l._reactInternals;
  if (a === void 0)
    throw typeof l.render == "function" ? Error(z(188)) : (l = Object.keys(l).join(","), Error(z(268, l)));
  return l = Lv(a), l = l !== null ? v0(l) : null, l = l === null ? null : l.stateNode, l;
};
var hd = {
  bundleType: 0,
  version: "19.0.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: H,
  findFiberByHostInstance: La,
  reconcilerVersion: "19.0.0"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var de = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!de.isDisabled && de.supportsFiber)
    try {
      Gt = de.inject(
        hd
      ), Ml = de;
    } catch {
    }
}
var sd = Jn.createRoot = function(l, a) {
  if (!e0(l)) throw Error(z(299));
  var u = !1, t = "", e = B1, f = N1, n = _1, c = null;
  return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (t = a.identifierPrefix), a.onUncaughtError !== void 0 && (e = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (n = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (c = a.unstable_transitionCallbacks)), a = ov(
    l,
    1,
    !1,
    null,
    null,
    u,
    t,
    e,
    f,
    n,
    c,
    null
  ), l[xu] = a.current, _c(
    l.nodeType === 8 ? l.parentNode : l
  ), new Zc(a);
}, md = Jn.hydrateRoot = function(l, a, u) {
  if (!e0(l)) throw Error(z(299));
  var t = !1, e = "", f = B1, n = N1, c = _1, i = null, v = null;
  return u != null && (u.unstable_strictMode === !0 && (t = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (f = u.onUncaughtError), u.onCaughtError !== void 0 && (n = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (i = u.unstable_transitionCallbacks), u.formState !== void 0 && (v = u.formState)), a = ov(
    l,
    1,
    !0,
    a,
    u ?? null,
    t,
    e,
    f,
    n,
    c,
    i,
    v
  ), a.context = qv(null), u = a.current, t = Ul(), e = Oa(t), e.callback = null, Ha(u, e, t), a.current.lanes = t, jt(a, t), $l(a), l[xu] = a.current, _c(l), new sf(a);
}, Sd = Jn.version = "19.0.0";
export {
  sd as createRoot,
  Jn as default,
  md as hydrateRoot,
  Sd as version
};
