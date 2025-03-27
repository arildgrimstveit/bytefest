var u = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var E = Symbol.for("react.transitional.element"), $ = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), U = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), d = Symbol.iterator;
function b(t) {
  return t === null || typeof t != "object" ? null : (t = d && t[d] || t["@@iterator"], typeof t == "function" ? t : null);
}
var O = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, g = Object.assign, P = {};
function v(t, e, r) {
  this.props = t, this.context = e, this.refs = P, this.updater = r || O;
}
v.prototype.isReactComponent = {};
v.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
v.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function H() {
}
H.prototype = v.prototype;
function y(t, e, r) {
  this.props = t, this.context = e, this.refs = P, this.updater = r || O;
}
var R = y.prototype = new H();
R.constructor = y;
g(R, v.prototype);
R.isPureReactComponent = !0;
var C = Array.isArray, i = { H: null, A: null, T: null, S: null }, N = Object.prototype.hasOwnProperty;
function m(t, e, r, n, s, f) {
  return r = f.ref, {
    $$typeof: E,
    type: t,
    key: e,
    ref: r !== void 0 ? r : null,
    props: f
  };
}
function q(t, e) {
  return m(
    t.type,
    e,
    void 0,
    void 0,
    void 0,
    t.props
  );
}
function T(t) {
  return typeof t == "object" && t !== null && t.$$typeof === E;
}
function z(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(r) {
    return e[r];
  });
}
var S = /\/+/g;
function _(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? z("" + t.key) : e.toString(36);
}
function A() {
}
function G(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (typeof t.status == "string" ? t.then(A, A) : (t.status = "pending", t.then(
        function(e) {
          t.status === "pending" && (t.status = "fulfilled", t.value = e);
        },
        function(e) {
          t.status === "pending" && (t.status = "rejected", t.reason = e);
        }
      )), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function p(t, e, r, n, s) {
  var f = typeof t;
  (f === "undefined" || f === "boolean") && (t = null);
  var o = !1;
  if (t === null) o = !0;
  else
    switch (f) {
      case "bigint":
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case E:
          case $:
            o = !0;
            break;
          case h:
            return o = t._init, p(
              o(t._payload),
              e,
              r,
              n,
              s
            );
        }
    }
  if (o)
    return s = s(t), o = n === "" ? "." + _(t, 0) : n, C(s) ? (r = "", o != null && (r = o.replace(S, "$&/") + "/"), p(s, e, r, "", function(j) {
      return j;
    })) : s != null && (T(s) && (s = q(
      s,
      r + (s.key == null || t && t.key === s.key ? "" : ("" + s.key).replace(
        S,
        "$&/"
      ) + "/") + o
    )), e.push(s)), 1;
  o = 0;
  var a = n === "" ? "." : n + ":";
  if (C(t))
    for (var c = 0; c < t.length; c++)
      n = t[c], f = a + _(n, c), o += p(
        n,
        e,
        r,
        f,
        s
      );
  else if (c = b(t), typeof c == "function")
    for (t = c.call(t), c = 0; !(n = t.next()).done; )
      n = n.value, f = a + _(n, c++), o += p(
        n,
        e,
        r,
        f,
        s
      );
  else if (f === "object") {
    if (typeof t.then == "function")
      return p(
        G(t),
        e,
        r,
        n,
        s
      );
    throw e = String(t), Error(
      "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return o;
}
function l(t, e, r) {
  if (t == null) return t;
  var n = [], s = 0;
  return p(t, n, "", "", function(f) {
    return e.call(r, f, s++);
  }), n;
}
function K(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(
      function(r) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = r);
      },
      function(r) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = r);
      }
    ), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var w = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var e = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
      error: t
    });
    if (!window.dispatchEvent(e)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
};
function W() {
}
var B = u.Children = {
  map: l,
  forEach: function(t, e, r) {
    l(
      t,
      function() {
        e.apply(this, arguments);
      },
      r
    );
  },
  count: function(t) {
    var e = 0;
    return l(t, function() {
      e++;
    }), e;
  },
  toArray: function(t) {
    return l(t, function(e) {
      return e;
    }) || [];
  },
  only: function(t) {
    if (!T(t))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return t;
  }
}, Q = u.Component = v, X = u.Fragment = I, Z = u.Profiler = L, J = u.PureComponent = y, V = u.StrictMode = Y, F = u.Suspense = x, tt = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, et = u.act = function() {
  throw Error("act(...) is not supported in production builds of React.");
}, rt = u.cache = function(t) {
  return function() {
    return t.apply(null, arguments);
  };
}, nt = u.cloneElement = function(t, e, r) {
  if (t == null)
    throw Error(
      "The argument must be a React element, but you passed " + t + "."
    );
  var n = g({}, t.props), s = t.key, f = void 0;
  if (e != null)
    for (o in e.ref !== void 0 && (f = void 0), e.key !== void 0 && (s = "" + e.key), e)
      !N.call(e, o) || o === "key" || o === "__self" || o === "__source" || o === "ref" && e.ref === void 0 || (n[o] = e[o]);
  var o = arguments.length - 2;
  if (o === 1) n.children = r;
  else if (1 < o) {
    for (var a = Array(o), c = 0; c < o; c++)
      a[c] = arguments[c + 2];
    n.children = a;
  }
  return m(t.type, s, void 0, void 0, f, n);
}, ut = u.createContext = function(t) {
  return t = {
    $$typeof: U,
    _currentValue: t,
    _currentValue2: t,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, t.Provider = t, t.Consumer = {
    $$typeof: M,
    _context: t
  }, t;
}, ot = u.createElement = function(t, e, r) {
  var n, s = {}, f = null;
  if (e != null)
    for (n in e.key !== void 0 && (f = "" + e.key), e)
      N.call(e, n) && n !== "key" && n !== "__self" && n !== "__source" && (s[n] = e[n]);
  var o = arguments.length - 2;
  if (o === 1) s.children = r;
  else if (1 < o) {
    for (var a = Array(o), c = 0; c < o; c++)
      a[c] = arguments[c + 2];
    s.children = a;
  }
  if (t && t.defaultProps)
    for (n in o = t.defaultProps, o)
      s[n] === void 0 && (s[n] = o[n]);
  return m(t, f, void 0, void 0, null, s);
}, st = u.createRef = function() {
  return { current: null };
}, it = u.forwardRef = function(t) {
  return { $$typeof: k, render: t };
}, ft = u.isValidElement = T, ct = u.lazy = function(t) {
  return {
    $$typeof: h,
    _payload: { _status: -1, _result: t },
    _init: K
  };
}, at = u.memo = function(t, e) {
  return {
    $$typeof: D,
    type: t,
    compare: e === void 0 ? null : e
  };
}, pt = u.startTransition = function(t) {
  var e = i.T, r = {};
  i.T = r;
  try {
    var n = t(), s = i.S;
    s !== null && s(r, n), typeof n == "object" && n !== null && typeof n.then == "function" && n.then(W, w);
  } catch (f) {
    w(f);
  } finally {
    i.T = e;
  }
}, vt = u.unstable_useCacheRefresh = function() {
  return i.H.useCacheRefresh();
}, lt = u.use = function(t) {
  return i.H.use(t);
}, _t = u.useActionState = function(t, e, r) {
  return i.H.useActionState(t, e, r);
}, Et = u.useCallback = function(t, e) {
  return i.H.useCallback(t, e);
}, yt = u.useContext = function(t) {
  return i.H.useContext(t);
}, Rt = u.useDebugValue = function() {
}, mt = u.useDeferredValue = function(t, e) {
  return i.H.useDeferredValue(t, e);
}, Tt = u.useEffect = function(t, e) {
  return i.H.useEffect(t, e);
}, dt = u.useId = function() {
  return i.H.useId();
}, Ct = u.useImperativeHandle = function(t, e, r) {
  return i.H.useImperativeHandle(t, e, r);
}, St = u.useInsertionEffect = function(t, e) {
  return i.H.useInsertionEffect(t, e);
}, At = u.useLayoutEffect = function(t, e) {
  return i.H.useLayoutEffect(t, e);
}, wt = u.useMemo = function(t, e) {
  return i.H.useMemo(t, e);
}, ht = u.useOptimistic = function(t, e) {
  return i.H.useOptimistic(t, e);
}, Ot = u.useReducer = function(t, e, r) {
  return i.H.useReducer(t, e, r);
}, gt = u.useRef = function(t) {
  return i.H.useRef(t);
}, Pt = u.useState = function(t) {
  return i.H.useState(t);
}, Ht = u.useSyncExternalStore = function(t, e, r) {
  return i.H.useSyncExternalStore(
    t,
    e,
    r
  );
}, Nt = u.useTransition = function() {
  return i.H.useTransition();
}, jt = u.version = "19.0.0";
export {
  B as Children,
  Q as Component,
  X as Fragment,
  Z as Profiler,
  J as PureComponent,
  V as StrictMode,
  F as Suspense,
  tt as __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  et as act,
  rt as cache,
  nt as cloneElement,
  ut as createContext,
  ot as createElement,
  st as createRef,
  u as default,
  it as forwardRef,
  ft as isValidElement,
  ct as lazy,
  at as memo,
  pt as startTransition,
  vt as unstable_useCacheRefresh,
  lt as use,
  _t as useActionState,
  Et as useCallback,
  yt as useContext,
  Rt as useDebugValue,
  mt as useDeferredValue,
  Tt as useEffect,
  dt as useId,
  Ct as useImperativeHandle,
  St as useInsertionEffect,
  At as useLayoutEffect,
  wt as useMemo,
  ht as useOptimistic,
  Ot as useReducer,
  gt as useRef,
  Pt as useState,
  Ht as useSyncExternalStore,
  Nt as useTransition,
  jt as version
};
