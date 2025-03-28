!(function (a, b) {
   "function" == typeof define && define.amd
      ? define(b)
      : "object" == typeof exports
      ? (module.exports = b())
      : (a.Phaser = b());
})(this, function () {
   function a() {
      return (
         (b.Matrix = "undefined" != typeof Float32Array ? Float32Array : Array),
         b.Matrix
      );
   }
   var b = b || {},
      c = c || {
         VERSION: "1.1.6",
         DEV_VERSION: "1.1.6",
         GAMES: [],
         AUTO: 0,
         CANVAS: 1,
         WEBGL: 2,
         HEADLESS: 3,
         SPRITE: 0,
         BUTTON: 1,
         BULLET: 2,
         GRAPHICS: 3,
         TEXT: 4,
         TILESPRITE: 5,
         BITMAPTEXT: 6,
         GROUP: 7,
         RENDERTEXTURE: 8,
         TILEMAP: 9,
         TILEMAPLAYER: 10,
         EMITTER: 11,
         POLYGON: 12,
         BITMAPDATA: 13,
         CANVAS_FILTER: 14,
         WEBGL_FILTER: 15,
         NONE: 0,
         LEFT: 1,
         RIGHT: 2,
         UP: 3,
         DOWN: 4,
         CANVAS_PX_ROUND: !1,
         CANVAS_CLEAR_RECT: !0,
      };
   (b.InteractionManager = function () {}),
      (c.Utils = {
         shuffle: function (a) {
            for (var b = a.length - 1; b > 0; b--) {
               var c = Math.floor(Math.random() * (b + 1)),
                  d = a[b];
               (a[b] = a[c]), (a[c] = d);
            }
            return a;
         },
         pad: function (a, b, c, d) {
            if ("undefined" == typeof b) var b = 0;
            if ("undefined" == typeof c) var c = " ";
            if ("undefined" == typeof d) var d = 3;
            var e = 0;
            if (b + 1 >= a.length)
               switch (d) {
                  case 1:
                     a = Array(b + 1 - a.length).join(c) + a;
                     break;
                  case 3:
                     var f = Math.ceil((e = b - a.length) / 2),
                        g = e - f;
                     a = Array(g + 1).join(c) + a + Array(f + 1).join(c);
                     break;
                  default:
                     a += Array(b + 1 - a.length).join(c);
               }
            return a;
         },
         isPlainObject: function (a) {
            if ("object" != typeof a || a.nodeType || a === a.window) return !1;
            try {
               if (
                  a.constructor &&
                  !hasOwn.call(a.constructor.prototype, "isPrototypeOf")
               )
                  return !1;
            } catch (b) {
               return !1;
            }
            return !0;
         },
         extend: function () {
            var a,
               b,
               d,
               e,
               f,
               g,
               h = arguments[0] || {},
               i = 1,
               j = arguments.length,
               k = !1;
            for (
               "boolean" == typeof h &&
                  ((k = h), (h = arguments[1] || {}), (i = 2)),
                  j === i && ((h = this), --i);
               j > i;
               i++
            )
               if (null != (a = arguments[i]))
                  for (b in a)
                     (d = h[b]),
                        (e = a[b]),
                        h !== e &&
                           (k &&
                           e &&
                           (c.Utils.isPlainObject(e) || (f = Array.isArray(e)))
                              ? (f
                                   ? ((f = !1),
                                     (g = d && Array.isArray(d) ? d : []))
                                   : (g =
                                        d && c.Utils.isPlainObject(d) ? d : {}),
                                (h[b] = c.Utils.extend(k, g, e)))
                              : void 0 !== e && (h[b] = e));
            return h;
         },
      }),
      (b.hex2rgb = function (a) {
         return [
            (255 & (a >> 16)) / 255,
            (255 & (a >> 8)) / 255,
            (255 & a) / 255,
         ];
      }),
      "function" != typeof Function.prototype.bind &&
         (Function.prototype.bind = (function () {
            var a = Array.prototype.slice;
            return function (b) {
               function c() {
                  var f = e.concat(a.call(arguments));
                  d.apply(this instanceof c ? this : b, f);
               }
               var d = this,
                  e = a.call(arguments, 1);
               if ("function" != typeof d) throw new TypeError();
               return (
                  (c.prototype = (function f(a) {
                     return (
                        a && (f.prototype = a),
                        this instanceof f ? void 0 : new f()
                     );
                  })(d.prototype)),
                  c
               );
            };
         })()),
      Array.isArray ||
         (Array.isArray = function (a) {
            return "[object Array]" == Object.prototype.toString.call(a);
         }),
      a(),
      (b.mat3 = {}),
      (b.mat3.create = function () {
         var a = new b.Matrix(9);
         return (
            (a[0] = 1),
            (a[1] = 0),
            (a[2] = 0),
            (a[3] = 0),
            (a[4] = 1),
            (a[5] = 0),
            (a[6] = 0),
            (a[7] = 0),
            (a[8] = 1),
            a
         );
      }),
      (b.mat3.identity = function (a) {
         return (
            (a[0] = 1),
            (a[1] = 0),
            (a[2] = 0),
            (a[3] = 0),
            (a[4] = 1),
            (a[5] = 0),
            (a[6] = 0),
            (a[7] = 0),
            (a[8] = 1),
            a
         );
      }),
      (b.mat4 = {}),
      (b.mat4.create = function () {
         var a = new b.Matrix(16);
         return (
            (a[0] = 1),
            (a[1] = 0),
            (a[2] = 0),
            (a[3] = 0),
            (a[4] = 0),
            (a[5] = 1),
            (a[6] = 0),
            (a[7] = 0),
            (a[8] = 0),
            (a[9] = 0),
            (a[10] = 1),
            (a[11] = 0),
            (a[12] = 0),
            (a[13] = 0),
            (a[14] = 0),
            (a[15] = 1),
            a
         );
      }),
      (b.mat3.multiply = function (a, b, c) {
         c || (c = a);
         var d = a[0],
            e = a[1],
            f = a[2],
            g = a[3],
            h = a[4],
            i = a[5],
            j = a[6],
            k = a[7],
            l = a[8],
            m = b[0],
            n = b[1],
            o = b[2],
            p = b[3],
            q = b[4],
            r = b[5],
            s = b[6],
            t = b[7],
            u = b[8];
         return (
            (c[0] = m * d + n * g + o * j),
            (c[1] = m * e + n * h + o * k),
            (c[2] = m * f + n * i + o * l),
            (c[3] = p * d + q * g + r * j),
            (c[4] = p * e + q * h + r * k),
            (c[5] = p * f + q * i + r * l),
            (c[6] = s * d + t * g + u * j),
            (c[7] = s * e + t * h + u * k),
            (c[8] = s * f + t * i + u * l),
            c
         );
      }),
      (b.mat3.clone = function (a) {
         var c = new b.Matrix(9);
         return (
            (c[0] = a[0]),
            (c[1] = a[1]),
            (c[2] = a[2]),
            (c[3] = a[3]),
            (c[4] = a[4]),
            (c[5] = a[5]),
            (c[6] = a[6]),
            (c[7] = a[7]),
            (c[8] = a[8]),
            c
         );
      }),
      (b.mat3.transpose = function (a, b) {
         if (!b || a === b) {
            var c = a[1],
               d = a[2],
               e = a[5];
            return (
               (a[1] = a[3]),
               (a[2] = a[6]),
               (a[3] = c),
               (a[5] = a[7]),
               (a[6] = d),
               (a[7] = e),
               a
            );
         }
         return (
            (b[0] = a[0]),
            (b[1] = a[3]),
            (b[2] = a[6]),
            (b[3] = a[1]),
            (b[4] = a[4]),
            (b[5] = a[7]),
            (b[6] = a[2]),
            (b[7] = a[5]),
            (b[8] = a[8]),
            b
         );
      }),
      (b.mat3.toMat4 = function (a, c) {
         return (
            c || (c = b.mat4.create()),
            (c[15] = 1),
            (c[14] = 0),
            (c[13] = 0),
            (c[12] = 0),
            (c[11] = 0),
            (c[10] = a[8]),
            (c[9] = a[7]),
            (c[8] = a[6]),
            (c[7] = 0),
            (c[6] = a[5]),
            (c[5] = a[4]),
            (c[4] = a[3]),
            (c[3] = 0),
            (c[2] = a[2]),
            (c[1] = a[1]),
            (c[0] = a[0]),
            c
         );
      }),
      (b.mat4.create = function () {
         var a = new b.Matrix(16);
         return (
            (a[0] = 1),
            (a[1] = 0),
            (a[2] = 0),
            (a[3] = 0),
            (a[4] = 0),
            (a[5] = 1),
            (a[6] = 0),
            (a[7] = 0),
            (a[8] = 0),
            (a[9] = 0),
            (a[10] = 1),
            (a[11] = 0),
            (a[12] = 0),
            (a[13] = 0),
            (a[14] = 0),
            (a[15] = 1),
            a
         );
      }),
      (b.mat4.transpose = function (a, b) {
         if (!b || a === b) {
            var c = a[1],
               d = a[2],
               e = a[3],
               f = a[6],
               g = a[7],
               h = a[11];
            return (
               (a[1] = a[4]),
               (a[2] = a[8]),
               (a[3] = a[12]),
               (a[4] = c),
               (a[6] = a[9]),
               (a[7] = a[13]),
               (a[8] = d),
               (a[9] = f),
               (a[11] = a[14]),
               (a[12] = e),
               (a[13] = g),
               (a[14] = h),
               a
            );
         }
         return (
            (b[0] = a[0]),
            (b[1] = a[4]),
            (b[2] = a[8]),
            (b[3] = a[12]),
            (b[4] = a[1]),
            (b[5] = a[5]),
            (b[6] = a[9]),
            (b[7] = a[13]),
            (b[8] = a[2]),
            (b[9] = a[6]),
            (b[10] = a[10]),
            (b[11] = a[14]),
            (b[12] = a[3]),
            (b[13] = a[7]),
            (b[14] = a[11]),
            (b[15] = a[15]),
            b
         );
      }),
      (b.mat4.multiply = function (a, b, c) {
         c || (c = a);
         var d = a[0],
            e = a[1],
            f = a[2],
            g = a[3],
            h = a[4],
            i = a[5],
            j = a[6],
            k = a[7],
            l = a[8],
            m = a[9],
            n = a[10],
            o = a[11],
            p = a[12],
            q = a[13],
            r = a[14],
            s = a[15],
            t = b[0],
            u = b[1],
            v = b[2],
            w = b[3];
         return (
            (c[0] = t * d + u * h + v * l + w * p),
            (c[1] = t * e + u * i + v * m + w * q),
            (c[2] = t * f + u * j + v * n + w * r),
            (c[3] = t * g + u * k + v * o + w * s),
            (t = b[4]),
            (u = b[5]),
            (v = b[6]),
            (w = b[7]),
            (c[4] = t * d + u * h + v * l + w * p),
            (c[5] = t * e + u * i + v * m + w * q),
            (c[6] = t * f + u * j + v * n + w * r),
            (c[7] = t * g + u * k + v * o + w * s),
            (t = b[8]),
            (u = b[9]),
            (v = b[10]),
            (w = b[11]),
            (c[8] = t * d + u * h + v * l + w * p),
            (c[9] = t * e + u * i + v * m + w * q),
            (c[10] = t * f + u * j + v * n + w * r),
            (c[11] = t * g + u * k + v * o + w * s),
            (t = b[12]),
            (u = b[13]),
            (v = b[14]),
            (w = b[15]),
            (c[12] = t * d + u * h + v * l + w * p),
            (c[13] = t * e + u * i + v * m + w * q),
            (c[14] = t * f + u * j + v * n + w * r),
            (c[15] = t * g + u * k + v * o + w * s),
            c
         );
      }),
      (b.Point = function (a, b) {
         (this.x = a || 0), (this.y = b || 0);
      }),
      (b.Point.prototype.clone = function () {
         return new b.Point(this.x, this.y);
      }),
      (b.Point.prototype.constructor = b.Point),
      (b.Rectangle = function (a, b, c, d) {
         (this.x = a || 0),
            (this.y = b || 0),
            (this.width = c || 0),
            (this.height = d || 0);
      }),
      (b.Rectangle.prototype.clone = function () {
         return new b.Rectangle(this.x, this.y, this.width, this.height);
      }),
      (b.Rectangle.prototype.contains = function (a, b) {
         if (this.width <= 0 || this.height <= 0) return !1;
         var c = this.x;
         if (a >= c && a <= c + this.width) {
            var d = this.y;
            if (b >= d && b <= d + this.height) return !0;
         }
         return !1;
      }),
      (b.Rectangle.prototype.constructor = b.Rectangle),
      (b.Polygon = function (a) {
         if (
            (a instanceof Array || (a = Array.prototype.slice.call(arguments)),
            "number" == typeof a[0])
         ) {
            for (var c = [], d = 0, e = a.length; e > d; d += 2)
               c.push(new b.Point(a[d], a[d + 1]));
            a = c;
         }
         this.points = a;
      }),
      (b.Polygon.prototype.clone = function () {
         for (var a = [], c = 0; c < this.points.length; c++)
            a.push(this.points[c].clone());
         return new b.Polygon(a);
      }),
      (b.Polygon.prototype.contains = function (a, b) {
         for (
            var c = !1, d = 0, e = this.points.length - 1;
            d < this.points.length;
            e = d++
         ) {
            var f = this.points[d].x,
               g = this.points[d].y,
               h = this.points[e].x,
               i = this.points[e].y,
               j = g > b != i > b && ((h - f) * (b - g)) / (i - g) + f > a;
            j && (c = !c);
         }
         return c;
      }),
      (b.Polygon.prototype.constructor = b.Polygon),
      (b.DisplayObject = function () {
         (this.last = this),
            (this.first = this),
            (this.position = new b.Point()),
            (this.scale = new b.Point(1, 1)),
            (this.pivot = new b.Point(0, 0)),
            (this.rotation = 0),
            (this.alpha = 1),
            (this.visible = !0),
            (this.hitArea = null),
            (this.buttonMode = !1),
            (this.renderable = !1),
            (this.parent = null),
            (this.stage = null),
            (this.worldAlpha = 1),
            (this._interactive = !1),
            (this.defaultCursor = "pointer"),
            (this.worldTransform = b.mat3.create()),
            (this.localTransform = b.mat3.create()),
            (this.color = []),
            (this.dynamic = !0),
            (this._sr = 0),
            (this._cr = 1),
            (this.filterArea = new b.Rectangle(0, 0, 1, 1));
      }),
      (b.DisplayObject.prototype.constructor = b.DisplayObject),
      (b.DisplayObject.prototype.setInteractive = function (a) {
         this.interactive = a;
      }),
      Object.defineProperty(b.DisplayObject.prototype, "interactive", {
         get: function () {
            return this._interactive;
         },
         set: function (a) {
            (this._interactive = a), this.stage && (this.stage.dirty = !0);
         },
      }),
      Object.defineProperty(b.DisplayObject.prototype, "mask", {
         get: function () {
            return this._mask;
         },
         set: function (a) {
            a
               ? this._mask
                  ? ((a.start = this._mask.start), (a.end = this._mask.end))
                  : (this.addFilter(a), (a.renderable = !1))
               : (this.removeFilter(this._mask), (this._mask.renderable = !0)),
               (this._mask = a);
         },
      }),
      Object.defineProperty(b.DisplayObject.prototype, "filters", {
         get: function () {
            return this._filters;
         },
         set: function (a) {
            if (a) {
               this._filters && this.removeFilter(this._filters),
                  this.addFilter(a);
               for (var b = [], c = 0; c < a.length; c++)
                  for (var d = a[c].passes, e = 0; e < d.length; e++)
                     b.push(d[e]);
               a.start.filterPasses = b;
            } else this._filters && this.removeFilter(this._filters);
            this._filters = a;
         },
      }),
      (b.DisplayObject.prototype.addFilter = function (a) {
         var c = new b.FilterBlock(),
            d = new b.FilterBlock();
         (a.start = c),
            (a.end = d),
            (c.data = a),
            (d.data = a),
            (c.first = c.last = this),
            (d.first = d.last = this),
            (c.open = !0),
            (c.target = this);
         var e,
            f,
            g = c,
            h = c;
         (f = this.first._iPrev),
            f ? ((e = f._iNext), (g._iPrev = f), (f._iNext = g)) : (e = this),
            e && ((e._iPrev = h), (h._iNext = e)),
            (g = d),
            (h = d),
            (e = null),
            (f = null),
            (f = this.last),
            (e = f._iNext),
            e && ((e._iPrev = h), (h._iNext = e)),
            (g._iPrev = f),
            (f._iNext = g);
         for (var i = this, j = this.last; i; )
            i.last === j && (i.last = d), (i = i.parent);
         (this.first = c),
            this.__renderGroup && this.__renderGroup.addFilterBlocks(c, d);
      }),
      (b.DisplayObject.prototype.removeFilter = function (a) {
         var b = a.start,
            c = b._iNext,
            d = b._iPrev;
         c && (c._iPrev = d), d && (d._iNext = c), (this.first = b._iNext);
         var e = a.end;
         (c = e._iNext), (d = e._iPrev), c && (c._iPrev = d), (d._iNext = c);
         for (
            var f = e._iPrev, g = this;
            g.last === e && ((g.last = f), (g = g.parent));

         );
         this.__renderGroup && this.__renderGroup.removeFilterBlocks(b, e);
      }),
      (b.DisplayObject.prototype.updateTransform = function () {
         this.rotation !== this.rotationCache &&
            ((this.rotationCache = this.rotation),
            (this._sr = Math.sin(this.rotation)),
            (this._cr = Math.cos(this.rotation)));
         var a = this.localTransform,
            c = this.parent.worldTransform,
            d = this.worldTransform;
         (a[0] = this._cr * this.scale.x),
            (a[1] = -this._sr * this.scale.y),
            (a[3] = this._sr * this.scale.x),
            (a[4] = this._cr * this.scale.y);
         var e = this.pivot.x,
            f = this.pivot.y,
            g = a[0],
            h = a[1],
            i = this.position.x - a[0] * e - f * a[1],
            j = a[3],
            k = a[4],
            l = this.position.y - a[4] * f - e * a[3],
            m = c[0],
            n = c[1],
            o = c[2],
            p = c[3],
            q = c[4],
            r = c[5];
         (a[2] = i),
            (a[5] = l),
            (d[0] = m * g + n * j),
            (d[1] = m * h + n * k),
            (d[2] = m * i + n * l + o),
            (d[3] = p * g + q * j),
            (d[4] = p * h + q * k),
            (d[5] = p * i + q * l + r),
            (this.worldAlpha = this.alpha * this.parent.worldAlpha),
            (this.vcount = b.visibleCount);
      }),
      (b.visibleCount = 0),
      (b.DisplayObjectContainer = function () {
         b.DisplayObject.call(this), (this.children = []);
      }),
      (b.DisplayObjectContainer.prototype = Object.create(
         b.DisplayObject.prototype
      )),
      (b.DisplayObjectContainer.prototype.constructor =
         b.DisplayObjectContainer),
      (b.DisplayObjectContainer.prototype.addChild = function (a) {
         if (
            (a.parent && a.parent !== this && a.parent.removeChild(a),
            (a.parent = this),
            this.children.push(a),
            this.stage)
         ) {
            var b = a;
            do {
               b.interactive && (this.stage.dirty = !0),
                  (b.stage = this.stage),
                  (b = b._iNext);
            } while (b);
         }
         var c,
            d,
            e = a.first,
            f = a.last;
         (d = this._filters || this._mask ? this.last._iPrev : this.last),
            (c = d._iNext);
         for (var g = this, h = d; g; )
            g.last === h && (g.last = a.last), (g = g.parent);
         c && ((c._iPrev = f), (f._iNext = c)),
            (e._iPrev = d),
            (d._iNext = e),
            this.__renderGroup &&
               (a.__renderGroup &&
                  a.__renderGroup.removeDisplayObjectAndChildren(a),
               this.__renderGroup.addDisplayObjectAndChildren(a));
      }),
      (b.DisplayObjectContainer.prototype.addChildAt = function (a, b) {
         if (!(b >= 0 && b <= this.children.length))
            throw new Error(
               a +
                  " The index " +
                  b +
                  " supplied is out of bounds " +
                  this.children.length
            );
         if (
            (void 0 !== a.parent && a.parent.removeChild(a),
            (a.parent = this),
            this.stage)
         ) {
            var c = a;
            do {
               c.interactive && (this.stage.dirty = !0),
                  (c.stage = this.stage),
                  (c = c._iNext);
            } while (c);
         }
         var d,
            e,
            f = a.first,
            g = a.last;
         if (b === this.children.length) {
            e = this.last;
            for (var h = this, i = this.last; h; )
               h.last === i && (h.last = a.last), (h = h.parent);
         } else e = 0 === b ? this : this.children[b - 1].last;
         (d = e._iNext),
            d && ((d._iPrev = g), (g._iNext = d)),
            (f._iPrev = e),
            (e._iNext = f),
            this.children.splice(b, 0, a),
            this.__renderGroup &&
               (a.__renderGroup &&
                  a.__renderGroup.removeDisplayObjectAndChildren(a),
               this.__renderGroup.addDisplayObjectAndChildren(a));
      }),
      (b.DisplayObjectContainer.prototype.swapChildren = function (a, b) {
         if (a !== b) {
            var c = this.children.indexOf(a),
               d = this.children.indexOf(b);
            if (0 > c || 0 > d)
               throw new Error(
                  "swapChildren: Both the supplied DisplayObjects must be a child of the caller."
               );
            this.removeChild(a),
               this.removeChild(b),
               d > c
                  ? (this.addChildAt(b, c), this.addChildAt(a, d))
                  : (this.addChildAt(a, d), this.addChildAt(b, c));
         }
      }),
      (b.DisplayObjectContainer.prototype.getChildAt = function (a) {
         if (a >= 0 && a < this.children.length) return this.children[a];
         throw new Error(
            "Both the supplied DisplayObjects must be a child of the caller " +
               this
         );
      }),
      (b.DisplayObjectContainer.prototype.removeChild = function (a) {
         var b = this.children.indexOf(a);
         if (-1 === b)
            throw new Error(
               a +
                  " The supplied DisplayObject must be a child of the caller " +
                  this
            );
         var c = a.first,
            d = a.last,
            e = d._iNext,
            f = c._iPrev;
         if ((e && (e._iPrev = f), (f._iNext = e), this.last === d))
            for (
               var g = c._iPrev, h = this;
               h.last === d && ((h.last = g), (h = h.parent));

            );
         if (((d._iNext = null), (c._iPrev = null), this.stage)) {
            var i = a;
            do {
               i.interactive && (this.stage.dirty = !0),
                  (i.stage = null),
                  (i = i._iNext);
            } while (i);
         }
         a.__renderGroup && a.__renderGroup.removeDisplayObjectAndChildren(a),
            (a.parent = void 0),
            this.children.splice(b, 1);
      }),
      (b.DisplayObjectContainer.prototype.updateTransform = function () {
         if (this.visible) {
            b.DisplayObject.prototype.updateTransform.call(this);
            for (var a = 0, c = this.children.length; c > a; a++)
               this.children[a].updateTransform();
         }
      }),
      (b.blendModes = {}),
      (b.blendModes.NORMAL = 0),
      (b.blendModes.SCREEN = 1),
      (b.Sprite = function (a) {
         b.DisplayObjectContainer.call(this),
            (this.anchor = new b.Point()),
            (this.texture = a),
            (this.blendMode = b.blendModes.NORMAL),
            (this._width = 0),
            (this._height = 0),
            a.baseTexture.hasLoaded
               ? (this.updateFrame = !0)
               : ((this.onTextureUpdateBind = this.onTextureUpdate.bind(this)),
                 this.texture.addEventListener(
                    "update",
                    this.onTextureUpdateBind
                 )),
            (this.renderable = !0);
      }),
      (b.Sprite.prototype = Object.create(b.DisplayObjectContainer.prototype)),
      (b.Sprite.prototype.constructor = b.Sprite),
      Object.defineProperty(b.Sprite.prototype, "width", {
         get: function () {
            return this.scale.x * this.texture.frame.width;
         },
         set: function (a) {
            (this.scale.x = a / this.texture.frame.width), (this._width = a);
         },
      }),
      Object.defineProperty(b.Sprite.prototype, "height", {
         get: function () {
            return this.scale.y * this.texture.frame.height;
         },
         set: function (a) {
            (this.scale.y = a / this.texture.frame.height), (this._height = a);
         },
      }),
      (b.Sprite.prototype.setTexture = function (a) {
         this.texture.baseTexture !== a.baseTexture
            ? ((this.textureChange = !0),
              (this.texture = a),
              this.__renderGroup && this.__renderGroup.updateTexture(this))
            : (this.texture = a),
            (this.updateFrame = !0);
      }),
      (b.Sprite.prototype.onTextureUpdate = function () {
         this._width && (this.scale.x = this._width / this.texture.frame.width),
            this._height &&
               (this.scale.y = this._height / this.texture.frame.height),
            (this.updateFrame = !0);
      }),
      (b.Sprite.fromFrame = function (a) {
         var c = b.TextureCache[a];
         if (!c)
            throw new Error(
               'The frameId "' +
                  a +
                  '" does not exist in the texture cache' +
                  this
            );
         return new b.Sprite(c);
      }),
      (b.Sprite.fromImage = function (a) {
         var c = b.Texture.fromImage(a);
         return new b.Sprite(c);
      }),
      (b.Stage = function (a) {
         b.DisplayObjectContainer.call(this),
            (this.worldTransform = b.mat3.create()),
            (this.interactive = !0),
            (this.interactionManager = new b.InteractionManager(this)),
            (this.dirty = !0),
            (this.__childrenAdded = []),
            (this.__childrenRemoved = []),
            (this.stage = this),
            (this.stage.hitArea = new b.Rectangle(0, 0, 1e5, 1e5)),
            this.setBackgroundColor(a),
            (this.worldVisible = !0);
      }),
      (b.Stage.prototype = Object.create(b.DisplayObjectContainer.prototype)),
      (b.Stage.prototype.constructor = b.Stage),
      (b.Stage.prototype.setInteractionDelegate = function (a) {
         this.interactionManager.setTargetDomElement(a);
      }),
      (b.Stage.prototype.updateTransform = function () {
         (this.worldAlpha = 1), (this.vcount = b.visibleCount);
         for (var a = 0, c = this.children.length; c > a; a++)
            this.children[a].updateTransform();
         this.dirty &&
            ((this.dirty = !1), (this.interactionManager.dirty = !0)),
            this.interactive && this.interactionManager.update();
      }),
      (b.Stage.prototype.setBackgroundColor = function (a) {
         (this.backgroundColor = a || 0),
            (this.backgroundColorSplit = b.hex2rgb(this.backgroundColor));
         var c = this.backgroundColor.toString(16);
         (c = "000000".substr(0, 6 - c.length) + c),
            (this.backgroundColorString = "#" + c);
      }),
      (b.Stage.prototype.getMousePosition = function () {
         return this.interactionManager.mouse.global;
      }),
      (b.CustomRenderable = function () {
         b.DisplayObject.call(this), (this.renderable = !0);
      }),
      (b.CustomRenderable.prototype = Object.create(b.DisplayObject.prototype)),
      (b.CustomRenderable.prototype.constructor = b.CustomRenderable),
      (b.CustomRenderable.prototype.renderCanvas = function () {}),
      (b.CustomRenderable.prototype.initWebGL = function () {}),
      (b.CustomRenderable.prototype.renderWebGL = function () {}),
      (b.Strip = function (a, c, d) {
         b.DisplayObjectContainer.call(this),
            (this.texture = a),
            (this.blendMode = b.blendModes.NORMAL);
         try {
            (this.uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1])),
               (this.verticies = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0])),
               (this.colors = new Float32Array([1, 1, 1, 1])),
               (this.indices = new Uint16Array([0, 1, 2, 3]));
         } catch (e) {
            (this.uvs = [0, 1, 1, 1, 1, 0, 0, 1]),
               (this.verticies = [0, 0, 0, 0, 0, 0, 0, 0, 0]),
               (this.colors = [1, 1, 1, 1]),
               (this.indices = [0, 1, 2, 3]);
         }
         (this.width = c),
            (this.height = d),
            a.baseTexture.hasLoaded
               ? ((this.width = this.texture.frame.width),
                 (this.height = this.texture.frame.height),
                 (this.updateFrame = !0))
               : ((this.onTextureUpdateBind = this.onTextureUpdate.bind(this)),
                 this.texture.addEventListener(
                    "update",
                    this.onTextureUpdateBind
                 )),
            (this.renderable = !0);
      }),
      (b.Strip.prototype = Object.create(b.DisplayObjectContainer.prototype)),
      (b.Strip.prototype.constructor = b.Strip),
      (b.Strip.prototype.setTexture = function (a) {
         (this.texture = a),
            (this.width = a.frame.width),
            (this.height = a.frame.height),
            (this.updateFrame = !0);
      }),
      (b.Strip.prototype.onTextureUpdate = function () {
         this.updateFrame = !0;
      }),
      (b.Rope = function (a, c) {
         b.Strip.call(this, a), (this.points = c);
         try {
            (this.verticies = new Float32Array(4 * c.length)),
               (this.uvs = new Float32Array(4 * c.length)),
               (this.colors = new Float32Array(2 * c.length)),
               (this.indices = new Uint16Array(2 * c.length));
         } catch (d) {
            (this.verticies = new Array(4 * c.length)),
               (this.uvs = new Array(4 * c.length)),
               (this.colors = new Array(2 * c.length)),
               (this.indices = new Array(2 * c.length));
         }
         this.refresh();
      }),
      (b.Rope.prototype = Object.create(b.Strip.prototype)),
      (b.Rope.prototype.constructor = b.Rope),
      (b.Rope.prototype.refresh = function () {
         var a = this.points;
         if (!(a.length < 1)) {
            var b = this.uvs,
               c = a[0],
               d = this.indices,
               e = this.colors;
            (this.count -= 0.2),
               (b[0] = 0),
               (b[1] = 1),
               (b[2] = 0),
               (b[3] = 1),
               (e[0] = 1),
               (e[1] = 1),
               (d[0] = 0),
               (d[1] = 1);
            for (var f, g, h, i = a.length, j = 1; i > j; j++)
               (f = a[j]),
                  (g = 4 * j),
                  (h = j / (i - 1)),
                  j % 2
                     ? ((b[g] = h),
                       (b[g + 1] = 0),
                       (b[g + 2] = h),
                       (b[g + 3] = 1))
                     : ((b[g] = h),
                       (b[g + 1] = 0),
                       (b[g + 2] = h),
                       (b[g + 3] = 1)),
                  (g = 2 * j),
                  (e[g] = 1),
                  (e[g + 1] = 1),
                  (g = 2 * j),
                  (d[g] = g),
                  (d[g + 1] = g + 1),
                  (c = f);
         }
      }),
      (b.Rope.prototype.updateTransform = function () {
         var a = this.points;
         if (!(a.length < 1)) {
            var c,
               d = a[0],
               e = { x: 0, y: 0 };
            this.count -= 0.2;
            var f = this.verticies;
            (f[0] = d.x + e.x),
               (f[1] = d.y + e.y),
               (f[2] = d.x - e.x),
               (f[3] = d.y - e.y);
            for (var g, h, i, j, k, l = a.length, m = 1; l > m; m++)
               (g = a[m]),
                  (h = 4 * m),
                  (c = m < a.length - 1 ? a[m + 1] : g),
                  (e.y = -(c.x - d.x)),
                  (e.x = c.y - d.y),
                  (i = 10 * (1 - m / (l - 1))),
                  i > 1 && (i = 1),
                  (j = Math.sqrt(e.x * e.x + e.y * e.y)),
                  (k = this.texture.height / 2),
                  (e.x /= j),
                  (e.y /= j),
                  (e.x *= k),
                  (e.y *= k),
                  (f[h] = g.x + e.x),
                  (f[h + 1] = g.y + e.y),
                  (f[h + 2] = g.x - e.x),
                  (f[h + 3] = g.y - e.y),
                  (d = g);
            b.DisplayObjectContainer.prototype.updateTransform.call(this);
         }
      }),
      (b.Rope.prototype.setTexture = function (a) {
         (this.texture = a), (this.updateFrame = !0);
      }),
      (b.TilingSprite = function (a, c, d) {
         b.DisplayObjectContainer.call(this),
            (this.texture = a),
            (this.width = c),
            (this.height = d),
            (this.tileScale = new b.Point(1, 1)),
            (this.tilePosition = new b.Point(0, 0)),
            (this.renderable = !0),
            (this.blendMode = b.blendModes.NORMAL);
      }),
      (b.TilingSprite.prototype = Object.create(
         b.DisplayObjectContainer.prototype
      )),
      (b.TilingSprite.prototype.constructor = b.TilingSprite),
      (b.TilingSprite.prototype.setTexture = function (a) {
         (this.texture = a), (this.updateFrame = !0);
      }),
      (b.TilingSprite.prototype.onTextureUpdate = function () {
         this.updateFrame = !0;
      }),
      (b.AbstractFilter = function (a, b) {
         (this.passes = [this]),
            (this.dirty = !0),
            (this.padding = 0),
            (this.uniforms = b || {}),
            (this.fragmentSrc = a || []);
      }),
      (b.FilterBlock = function () {
         (this.visible = !0), (this.renderable = !0);
      }),
      (b.Graphics = function () {
         b.DisplayObjectContainer.call(this),
            (this.renderable = !0),
            (this.fillAlpha = 1),
            (this.lineWidth = 0),
            (this.lineColor = "black"),
            (this.graphicsData = []),
            (this.currentPath = { points: [] });
      }),
      (b.Graphics.prototype = Object.create(
         b.DisplayObjectContainer.prototype
      )),
      (b.Graphics.prototype.constructor = b.Graphics),
      (b.Graphics.prototype.lineStyle = function (a, c, d) {
         this.currentPath.points.length || this.graphicsData.pop(),
            (this.lineWidth = a || 0),
            (this.lineColor = c || 0),
            (this.lineAlpha = arguments.length < 3 ? 1 : d),
            (this.currentPath = {
               lineWidth: this.lineWidth,
               lineColor: this.lineColor,
               lineAlpha: this.lineAlpha,
               fillColor: this.fillColor,
               fillAlpha: this.fillAlpha,
               fill: this.filling,
               points: [],
               type: b.Graphics.POLY,
            }),
            this.graphicsData.push(this.currentPath);
      }),
      (b.Graphics.prototype.moveTo = function (a, c) {
         this.currentPath.points.length || this.graphicsData.pop(),
            (this.currentPath = this.currentPath =
               {
                  lineWidth: this.lineWidth,
                  lineColor: this.lineColor,
                  lineAlpha: this.lineAlpha,
                  fillColor: this.fillColor,
                  fillAlpha: this.fillAlpha,
                  fill: this.filling,
                  points: [],
                  type: b.Graphics.POLY,
               }),
            this.currentPath.points.push(a, c),
            this.graphicsData.push(this.currentPath);
      }),
      (b.Graphics.prototype.lineTo = function (a, b) {
         this.currentPath.points.push(a, b), (this.dirty = !0);
      }),
      (b.Graphics.prototype.beginFill = function (a, b) {
         (this.filling = !0),
            (this.fillColor = a || 0),
            (this.fillAlpha = arguments.length < 2 ? 1 : b);
      }),
      (b.Graphics.prototype.endFill = function () {
         (this.filling = !1), (this.fillColor = null), (this.fillAlpha = 1);
      }),
      (b.Graphics.prototype.drawRect = function (a, c, d, e) {
         this.currentPath.points.length || this.graphicsData.pop(),
            (this.currentPath = {
               lineWidth: this.lineWidth,
               lineColor: this.lineColor,
               lineAlpha: this.lineAlpha,
               fillColor: this.fillColor,
               fillAlpha: this.fillAlpha,
               fill: this.filling,
               points: [a, c, d, e],
               type: b.Graphics.RECT,
            }),
            this.graphicsData.push(this.currentPath),
            (this.dirty = !0);
      }),
      (b.Graphics.prototype.drawCircle = function (a, c, d) {
         this.currentPath.points.length || this.graphicsData.pop(),
            (this.currentPath = {
               lineWidth: this.lineWidth,
               lineColor: this.lineColor,
               lineAlpha: this.lineAlpha,
               fillColor: this.fillColor,
               fillAlpha: this.fillAlpha,
               fill: this.filling,
               points: [a, c, d, d],
               type: b.Graphics.CIRC,
            }),
            this.graphicsData.push(this.currentPath),
            (this.dirty = !0);
      }),
      (b.Graphics.prototype.drawEllipse = function (a, c, d, e) {
         this.currentPath.points.length || this.graphicsData.pop(),
            (this.currentPath = {
               lineWidth: this.lineWidth,
               lineColor: this.lineColor,
               lineAlpha: this.lineAlpha,
               fillColor: this.fillColor,
               fillAlpha: this.fillAlpha,
               fill: this.filling,
               points: [a, c, d, e],
               type: b.Graphics.ELIP,
            }),
            this.graphicsData.push(this.currentPath),
            (this.dirty = !0);
      }),
      (b.Graphics.prototype.clear = function () {
         (this.lineWidth = 0),
            (this.filling = !1),
            (this.dirty = !0),
            (this.clearDirty = !0),
            (this.graphicsData = []),
            (this.bounds = null);
      }),
      (b.Graphics.prototype.updateFilterBounds = function () {
         if (!this.bounds) {
            for (
               var a, c, d, e = 1 / 0, f = -1 / 0, g = 1 / 0, h = -1 / 0, i = 0;
               i < this.graphicsData.length;
               i++
            ) {
               var j = this.graphicsData[i],
                  k = j.type,
                  l = j.lineWidth;
               if (((a = j.points), k === b.Graphics.RECT)) {
                  (c = a.x - l / 2), (d = a.y - l / 2);
                  var m = a.width + l,
                     n = a.height + l;
                  (e = e > c ? c : e),
                     (f = c + m > f ? c + m : f),
                     (g = g > d ? c : g),
                     (h = d + n > h ? d + n : h);
               } else if (k === b.Graphics.CIRC || k === b.Graphics.ELIP) {
                  (c = a.x), (d = a.y);
                  var o = a.radius + l / 2;
                  (e = e > c - o ? c - o : e),
                     (f = c + o > f ? c + o : f),
                     (g = g > d - o ? d - o : g),
                     (h = d + o > h ? d + o : h);
               } else
                  for (var p = 0; p < a.length; p += 2)
                     (c = a[p]),
                        (d = a[p + 1]),
                        (e = e > c - l ? c - l : e),
                        (f = c + l > f ? c + l : f),
                        (g = g > d - l ? d - l : g),
                        (h = d + l > h ? d + l : h);
            }
            this.bounds = new b.Rectangle(e, g, f - e, h - g);
         }
      }),
      (b.Graphics.POLY = 0),
      (b.Graphics.RECT = 1),
      (b.Graphics.CIRC = 2),
      (b.Graphics.ELIP = 3),
      (b.CanvasGraphics = function () {}),
      (b.CanvasGraphics.renderGraphics = function (a, c) {
         for (
            var d = a.worldAlpha, e = "", f = 0;
            f < a.graphicsData.length;
            f++
         ) {
            var g = a.graphicsData[f],
               h = g.points;
            if (
               ((c.strokeStyle = e =
                  "#" + ("00000" + (0 | g.lineColor).toString(16)).substr(-6)),
               (c.lineWidth = g.lineWidth),
               g.type === b.Graphics.POLY)
            ) {
               c.beginPath(), c.moveTo(h[0], h[1]);
               for (var i = 1; i < h.length / 2; i++)
                  c.lineTo(h[2 * i], h[2 * i + 1]);
               h[0] === h[h.length - 2] &&
                  h[1] === h[h.length - 1] &&
                  c.closePath(),
                  g.fill &&
                     ((c.globalAlpha = g.fillAlpha * d),
                     (c.fillStyle = e =
                        "#" +
                        ("00000" + (0 | g.fillColor).toString(16)).substr(-6)),
                     c.fill()),
                  g.lineWidth &&
                     ((c.globalAlpha = g.lineAlpha * d), c.stroke());
            } else if (g.type === b.Graphics.RECT)
               (g.fillColor || 0 === g.fillColor) &&
                  ((c.globalAlpha = g.fillAlpha * d),
                  (c.fillStyle = e =
                     "#" +
                     ("00000" + (0 | g.fillColor).toString(16)).substr(-6)),
                  c.fillRect(h[0], h[1], h[2], h[3])),
                  g.lineWidth &&
                     ((c.globalAlpha = g.lineAlpha * d),
                     c.strokeRect(h[0], h[1], h[2], h[3]));
            else if (g.type === b.Graphics.CIRC)
               c.beginPath(),
                  c.arc(h[0], h[1], h[2], 0, 2 * Math.PI),
                  c.closePath(),
                  g.fill &&
                     ((c.globalAlpha = g.fillAlpha * d),
                     (c.fillStyle = e =
                        "#" +
                        ("00000" + (0 | g.fillColor).toString(16)).substr(-6)),
                     c.fill()),
                  g.lineWidth &&
                     ((c.globalAlpha = g.lineAlpha * d), c.stroke());
            else if (g.type === b.Graphics.ELIP) {
               var j = g.points,
                  k = 2 * j[2],
                  l = 2 * j[3],
                  m = j[0] - k / 2,
                  n = j[1] - l / 2;
               c.beginPath();
               var o = 0.5522848,
                  p = (k / 2) * o,
                  q = (l / 2) * o,
                  r = m + k,
                  s = n + l,
                  t = m + k / 2,
                  u = n + l / 2;
               c.moveTo(m, u),
                  c.bezierCurveTo(m, u - q, t - p, n, t, n),
                  c.bezierCurveTo(t + p, n, r, u - q, r, u),
                  c.bezierCurveTo(r, u + q, t + p, s, t, s),
                  c.bezierCurveTo(t - p, s, m, u + q, m, u),
                  c.closePath(),
                  g.fill &&
                     ((c.globalAlpha = g.fillAlpha * d),
                     (c.fillStyle = e =
                        "#" +
                        ("00000" + (0 | g.fillColor).toString(16)).substr(-6)),
                     c.fill()),
                  g.lineWidth &&
                     ((c.globalAlpha = g.lineAlpha * d), c.stroke());
            }
         }
      }),
      (b.CanvasGraphics.renderGraphicsMask = function (a, c) {
         var d = a.graphicsData.length;
         if (0 !== d) {
            d > 1 &&
               ((d = 1),
               window.console.log(
                  "Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"
               ));
            for (var e = 0; 1 > e; e++) {
               var f = a.graphicsData[e],
                  g = f.points;
               if (f.type === b.Graphics.POLY) {
                  c.beginPath(), c.moveTo(g[0], g[1]);
                  for (var h = 1; h < g.length / 2; h++)
                     c.lineTo(g[2 * h], g[2 * h + 1]);
                  g[0] === g[g.length - 2] &&
                     g[1] === g[g.length - 1] &&
                     c.closePath();
               } else if (f.type === b.Graphics.RECT)
                  c.beginPath(), c.rect(g[0], g[1], g[2], g[3]), c.closePath();
               else if (f.type === b.Graphics.CIRC)
                  c.beginPath(),
                     c.arc(g[0], g[1], g[2], 0, 2 * Math.PI),
                     c.closePath();
               else if (f.type === b.Graphics.ELIP) {
                  var i = f.points,
                     j = 2 * i[2],
                     k = 2 * i[3],
                     l = i[0] - j / 2,
                     m = i[1] - k / 2;
                  c.beginPath();
                  var n = 0.5522848,
                     o = (j / 2) * n,
                     p = (k / 2) * n,
                     q = l + j,
                     r = m + k,
                     s = l + j / 2,
                     t = m + k / 2;
                  c.moveTo(l, t),
                     c.bezierCurveTo(l, t - p, s - o, m, s, m),
                     c.bezierCurveTo(s + o, m, q, t - p, q, t),
                     c.bezierCurveTo(q, t + p, s + o, r, s, r),
                     c.bezierCurveTo(s - o, r, l, t + p, l, t),
                     c.closePath();
               }
            }
         }
      }),
      (b.CanvasRenderer = function (a, b, c, d) {
         (this.transparent = d),
            (this.width = a || 800),
            (this.height = b || 600),
            (this.view = c || document.createElement("canvas")),
            (this.context = this.view.getContext("2d")),
            (this.smoothProperty = null),
            "imageSmoothingEnabled" in this.context
               ? (this.smoothProperty = "imageSmoothingEnabled")
               : "webkitImageSmoothingEnabled" in this.context
               ? (this.smoothProperty = "webkitImageSmoothingEnabled")
               : "mozImageSmoothingEnabled" in this.context
               ? (this.smoothProperty = "mozImageSmoothingEnabled")
               : "oImageSmoothingEnabled" in this.context &&
                 (this.smoothProperty = "oImageSmoothingEnabled"),
            (this.scaleMode = null),
            (this.refresh = !0),
            (this.view.width = this.width),
            (this.view.height = this.height),
            (this.count = 0);
      }),
      (b.CanvasRenderer.prototype.constructor = b.CanvasRenderer),
      (b.CanvasRenderer.prototype.render = function (a) {
         (b.texturesToUpdate = []),
            (b.texturesToDestroy = []),
            b.visibleCount++,
            a.updateTransform(),
            this.view.style.backgroundColor === a.backgroundColorString ||
               this.transparent ||
               (this.view.style.backgroundColor = a.backgroundColorString),
            this.context.setTransform(1, 0, 0, 1, 0, 0),
            this.context.clearRect(0, 0, this.width, this.height),
            this.renderDisplayObject(a),
            a.interactive &&
               (a._interactiveEventsAdded ||
                  ((a._interactiveEventsAdded = !0),
                  a.interactionManager.setTarget(this))),
            b.Texture.frameUpdates.length > 0 && (b.Texture.frameUpdates = []);
      }),
      (b.CanvasRenderer.prototype.resize = function (a, b) {
         (this.width = a),
            (this.height = b),
            (this.view.width = a),
            (this.view.height = b);
      }),
      (b.CanvasRenderer.prototype.renderDisplayObject = function (a) {
         var c,
            d = this.context;
         d.globalCompositeOperation = "source-over";
         var e = a.last._iNext;
         a = a.first;
         do {
            if (((c = a.worldTransform), a.visible))
               if (a.renderable) {
                  if (a instanceof b.Sprite) {
                     var f = a.texture.frame;
                     f &&
                        f.width &&
                        f.height &&
                        a.texture.baseTexture.source &&
                        ((d.globalAlpha = a.worldAlpha),
                        d.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]),
                        this.smoothProperty &&
                           this.scaleMode !== a.texture.baseTexture.scaleMode &&
                           ((this.scaleMode = a.texture.baseTexture.scaleMode),
                           (d[this.smoothProperty] =
                              this.scaleMode ===
                              b.BaseTexture.SCALE_MODE.LINEAR)),
                        d.drawImage(
                           a.texture.baseTexture.source,
                           f.x,
                           f.y,
                           f.width,
                           f.height,
                           a.anchor.x * -f.width,
                           a.anchor.y * -f.height,
                           f.width,
                           f.height
                        ));
                  } else if (a instanceof b.Strip)
                     d.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]),
                        this.renderStrip(a);
                  else if (a instanceof b.TilingSprite)
                     d.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]),
                        this.renderTilingSprite(a);
                  else if (a instanceof b.CustomRenderable)
                     d.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]),
                        a.renderCanvas(this);
                  else if (a instanceof b.Graphics)
                     d.setTransform(c[0], c[3], c[1], c[4], c[2], c[5]),
                        b.CanvasGraphics.renderGraphics(a, d);
                  else if (
                     a instanceof b.FilterBlock &&
                     a.data instanceof b.Graphics
                  ) {
                     var g = a.data;
                     if (a.open) {
                        d.save();
                        var h = g.alpha,
                           i = g.worldTransform;
                        d.setTransform(i[0], i[3], i[1], i[4], i[2], i[5]),
                           (g.worldAlpha = 0.5),
                           (d.worldAlpha = 0),
                           b.CanvasGraphics.renderGraphicsMask(g, d),
                           d.clip(),
                           (g.worldAlpha = h);
                     } else d.restore();
                  }
                  a = a._iNext;
               } else a = a._iNext;
            else a = a.last._iNext;
         } while (a !== e);
      }),
      (b.CanvasRenderer.prototype.renderStripFlat = function (a) {
         var b = this.context,
            c = a.verticies,
            d = c.length / 2;
         this.count++, b.beginPath();
         for (var e = 1; d - 2 > e; e++) {
            var f = 2 * e,
               g = c[f],
               h = c[f + 2],
               i = c[f + 4],
               j = c[f + 1],
               k = c[f + 3],
               l = c[f + 5];
            b.moveTo(g, j), b.lineTo(h, k), b.lineTo(i, l);
         }
         (b.fillStyle = "#FF0000"), b.fill(), b.closePath();
      }),
      (b.CanvasRenderer.prototype.renderTilingSprite = function (a) {
         var b = this.context;
         (b.globalAlpha = a.worldAlpha),
            a.__tilePattern ||
               (a.__tilePattern = b.createPattern(
                  a.texture.baseTexture.source,
                  "repeat"
               )),
            b.beginPath();
         var c = a.tilePosition,
            d = a.tileScale;
         b.scale(d.x, d.y),
            b.translate(c.x, c.y),
            (b.fillStyle = a.__tilePattern),
            b.fillRect(-c.x, -c.y, a.width / d.x, a.height / d.y),
            b.scale(1 / d.x, 1 / d.y),
            b.translate(-c.x, -c.y),
            b.closePath();
      }),
      (b.CanvasRenderer.prototype.renderStrip = function (a) {
         var b = this.context,
            c = a.verticies,
            d = a.uvs,
            e = c.length / 2;
         this.count++;
         for (var f = 1; e - 2 > f; f++) {
            var g = 2 * f,
               h = c[g],
               i = c[g + 2],
               j = c[g + 4],
               k = c[g + 1],
               l = c[g + 3],
               m = c[g + 5],
               n = d[g] * a.texture.width,
               o = d[g + 2] * a.texture.width,
               p = d[g + 4] * a.texture.width,
               q = d[g + 1] * a.texture.height,
               r = d[g + 3] * a.texture.height,
               s = d[g + 5] * a.texture.height;
            b.save(),
               b.beginPath(),
               b.moveTo(h, k),
               b.lineTo(i, l),
               b.lineTo(j, m),
               b.closePath(),
               b.clip();
            var t = n * r + q * p + o * s - r * p - q * o - n * s,
               u = h * r + q * j + i * s - r * j - q * i - h * s,
               v = n * i + h * p + o * j - i * p - h * o - n * j,
               w =
                  n * r * j +
                  q * i * p +
                  h * o * s -
                  h * r * p -
                  q * o * j -
                  n * i * s,
               x = k * r + q * m + l * s - r * m - q * l - k * s,
               y = n * l + k * p + o * m - l * p - k * o - n * m,
               z =
                  n * r * m +
                  q * l * p +
                  k * o * s -
                  k * r * p -
                  q * o * m -
                  n * l * s;
            b.transform(u / t, x / t, v / t, y / t, w / t, z / t),
               b.drawImage(a.texture.baseTexture.source, 0, 0),
               b.restore();
         }
      }),
      (b.PixiShader = function () {
         (this.program = null),
            (this.fragmentSrc = [
               "precision lowp float;",
               "varying vec2 vTextureCoord;",
               "varying float vColor;",
               "uniform sampler2D uSampler;",
               "void main(void) {",
               "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;",
               "}",
            ]),
            (this.textureCount = 0);
      }),
      (b.PixiShader.prototype.init = function () {
         var a = b.compileProgram(
               this.vertexSrc || b.PixiShader.defaultVertexSrc,
               this.fragmentSrc
            ),
            c = b.gl;
         c.useProgram(a),
            (this.uSampler = c.getUniformLocation(a, "uSampler")),
            (this.projectionVector = c.getUniformLocation(
               a,
               "projectionVector"
            )),
            (this.offsetVector = c.getUniformLocation(a, "offsetVector")),
            (this.dimensions = c.getUniformLocation(a, "dimensions")),
            (this.aVertexPosition = c.getAttribLocation(a, "aVertexPosition")),
            (this.colorAttribute = c.getAttribLocation(a, "aColor")),
            (this.aTextureCoord = c.getAttribLocation(a, "aTextureCoord"));
         for (var d in this.uniforms)
            this.uniforms[d].uniformLocation = c.getUniformLocation(a, d);
         this.initUniforms(), (this.program = a);
      }),
      (b.PixiShader.prototype.initUniforms = function () {
         this.textureCount = 1;
         var a;
         for (var c in this.uniforms) {
            a = this.uniforms[c];
            var d = a.type;
            "sampler2D" === d
               ? ((a._init = !1), null !== a.value && this.initSampler2D(a))
               : "mat2" === d || "mat3" === d || "mat4" === d
               ? ((a.glMatrix = !0),
                 (a.glValueLength = 1),
                 "mat2" === d
                    ? (a.glFunc = b.gl.uniformMatrix2fv)
                    : "mat3" === d
                    ? (a.glFunc = b.gl.uniformMatrix3fv)
                    : "mat4" === d && (a.glFunc = b.gl.uniformMatrix4fv))
               : ((a.glFunc = b.gl["uniform" + d]),
                 (a.glValueLength =
                    "2f" === d || "2i" === d
                       ? 2
                       : "3f" === d || "3i" === d
                       ? 3
                       : "4f" === d || "4i" === d
                       ? 4
                       : 1));
         }
      }),
      (b.PixiShader.prototype.initSampler2D = function (a) {
         if (a.value && a.value.baseTexture && a.value.baseTexture.hasLoaded) {
            if (
               (b.gl.activeTexture(b.gl["TEXTURE" + this.textureCount]),
               b.gl.bindTexture(
                  b.gl.TEXTURE_2D,
                  a.value.baseTexture._glTexture
               ),
               a.textureData)
            ) {
               var c = a.textureData,
                  d = c.magFilter ? c.magFilter : b.gl.LINEAR,
                  e = c.minFilter ? c.minFilter : b.gl.LINEAR,
                  f = c.wrapS ? c.wrapS : b.gl.CLAMP_TO_EDGE,
                  g = c.wrapT ? c.wrapT : b.gl.CLAMP_TO_EDGE,
                  h = c.luminance ? b.gl.LUMINANCE : b.gl.RGBA;
               if (
                  (c.repeat && ((f = b.gl.REPEAT), (g = b.gl.REPEAT)),
                  b.gl.pixelStorei(b.gl.UNPACK_FLIP_Y_WEBGL, !1),
                  c.width)
               ) {
                  var i = c.width ? c.width : 512,
                     j = c.height ? c.height : 2,
                     k = c.border ? c.border : 0;
                  b.gl.texImage2D(
                     b.gl.TEXTURE_2D,
                     0,
                     h,
                     i,
                     j,
                     k,
                     h,
                     b.gl.UNSIGNED_BYTE,
                     null
                  );
               } else
                  b.gl.texImage2D(
                     b.gl.TEXTURE_2D,
                     0,
                     h,
                     b.gl.RGBA,
                     b.gl.UNSIGNED_BYTE,
                     a.value.baseTexture.source
                  );
               b.gl.texParameteri(b.gl.TEXTURE_2D, b.gl.TEXTURE_MAG_FILTER, d),
                  b.gl.texParameteri(
                     b.gl.TEXTURE_2D,
                     b.gl.TEXTURE_MIN_FILTER,
                     e
                  ),
                  b.gl.texParameteri(b.gl.TEXTURE_2D, b.gl.TEXTURE_WRAP_S, f),
                  b.gl.texParameteri(b.gl.TEXTURE_2D, b.gl.TEXTURE_WRAP_T, g);
            }
            b.gl.uniform1i(a.uniformLocation, this.textureCount),
               (a._init = !0),
               this.textureCount++;
         }
      }),
      (b.PixiShader.prototype.syncUniforms = function () {
         this.textureCount = 1;
         var a;
         for (var c in this.uniforms)
            (a = this.uniforms[c]),
               1 === a.glValueLength
                  ? a.glMatrix === !0
                     ? a.glFunc.call(
                          b.gl,
                          a.uniformLocation,
                          a.transpose,
                          a.value
                       )
                     : a.glFunc.call(b.gl, a.uniformLocation, a.value)
                  : 2 === a.glValueLength
                  ? a.glFunc.call(b.gl, a.uniformLocation, a.value.x, a.value.y)
                  : 3 === a.glValueLength
                  ? a.glFunc.call(
                       b.gl,
                       a.uniformLocation,
                       a.value.x,
                       a.value.y,
                       a.value.z
                    )
                  : 4 === a.glValueLength
                  ? a.glFunc.call(
                       b.gl,
                       a.uniformLocation,
                       a.value.x,
                       a.value.y,
                       a.value.z,
                       a.value.w
                    )
                  : "sampler2D" === a.type &&
                    (a._init
                       ? (b.gl.activeTexture(
                            b.gl["TEXTURE" + this.textureCount]
                         ),
                         b.gl.bindTexture(
                            b.gl.TEXTURE_2D,
                            a.value.baseTexture._glTexture
                         ),
                         b.gl.uniform1i(a.uniformLocation, this.textureCount),
                         this.textureCount++)
                       : this.initSampler2D(a));
      }),
      (b.PixiShader.defaultVertexSrc = [
         "attribute vec2 aVertexPosition;",
         "attribute vec2 aTextureCoord;",
         "attribute float aColor;",
         "uniform vec2 projectionVector;",
         "uniform vec2 offsetVector;",
         "varying vec2 vTextureCoord;",
         "varying float vColor;",
         "const vec2 center = vec2(-1.0, 1.0);",
         "void main(void) {",
         "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);",
         "   vTextureCoord = aTextureCoord;",
         "   vColor = aColor;",
         "}",
      ]),
      (b.PrimitiveShader = function () {
         (this.program = null),
            (this.fragmentSrc = [
               "precision mediump float;",
               "varying vec4 vColor;",
               "void main(void) {",
               "   gl_FragColor = vColor;",
               "}",
            ]),
            (this.vertexSrc = [
               "attribute vec2 aVertexPosition;",
               "attribute vec4 aColor;",
               "uniform mat3 translationMatrix;",
               "uniform vec2 projectionVector;",
               "uniform vec2 offsetVector;",
               "uniform float alpha;",
               "varying vec4 vColor;",
               "void main(void) {",
               "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);",
               "   v -= offsetVector.xyx;",
               "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
               "   vColor = aColor  * alpha;",
               "}",
            ]);
      }),
      (b.PrimitiveShader.prototype.init = function () {
         var a = b.compileProgram(this.vertexSrc, this.fragmentSrc),
            c = b.gl;
         c.useProgram(a),
            (this.projectionVector = c.getUniformLocation(
               a,
               "projectionVector"
            )),
            (this.offsetVector = c.getUniformLocation(a, "offsetVector")),
            (this.aVertexPosition = c.getAttribLocation(a, "aVertexPosition")),
            (this.colorAttribute = c.getAttribLocation(a, "aColor")),
            (this.translationMatrix = c.getUniformLocation(
               a,
               "translationMatrix"
            )),
            (this.alpha = c.getUniformLocation(a, "alpha")),
            (this.program = a);
      }),
      (b.StripShader = function () {
         (this.program = null),
            (this.fragmentSrc = [
               "precision mediump float;",
               "varying vec2 vTextureCoord;",
               "varying float vColor;",
               "uniform float alpha;",
               "uniform sampler2D uSampler;",
               "void main(void) {",
               "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
               "   gl_FragColor = gl_FragColor * alpha;",
               "}",
            ]),
            (this.vertexSrc = [
               "attribute vec2 aVertexPosition;",
               "attribute vec2 aTextureCoord;",
               "attribute float aColor;",
               "uniform mat3 translationMatrix;",
               "uniform vec2 projectionVector;",
               "uniform vec2 offsetVector;",
               "varying vec2 vTextureCoord;",
               "varying float vColor;",
               "void main(void) {",
               "   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
               "   v -= offsetVector.xyx;",
               "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);",
               "   vTextureCoord = aTextureCoord;",
               "   vColor = aColor;",
               "}",
            ]);
      }),
      (b.StripShader.prototype.init = function () {
         var a = b.compileProgram(this.vertexSrc, this.fragmentSrc),
            c = b.gl;
         c.useProgram(a),
            (this.uSampler = c.getUniformLocation(a, "uSampler")),
            (this.projectionVector = c.getUniformLocation(
               a,
               "projectionVector"
            )),
            (this.offsetVector = c.getUniformLocation(a, "offsetVector")),
            (this.colorAttribute = c.getAttribLocation(a, "aColor")),
            (this.aVertexPosition = c.getAttribLocation(a, "aVertexPosition")),
            (this.aTextureCoord = c.getAttribLocation(a, "aTextureCoord")),
            (this.translationMatrix = c.getUniformLocation(
               a,
               "translationMatrix"
            )),
            (this.alpha = c.getUniformLocation(a, "alpha")),
            (this.program = a);
      }),
      (b._batchs = []),
      (b._getBatch = function (a) {
         return 0 === b._batchs.length ? new b.WebGLBatch(a) : b._batchs.pop();
      }),
      (b._returnBatch = function (a) {
         a.clean(), b._batchs.push(a);
      }),
      (b._restoreBatchs = function (a) {
         for (var c = 0; c < b._batchs.length; c++)
            b._batchs[c].restoreLostContext(a);
      }),
      (b.WebGLBatch = function (a) {
         (this.gl = a),
            (this.size = 0),
            (this.vertexBuffer = a.createBuffer()),
            (this.indexBuffer = a.createBuffer()),
            (this.uvBuffer = a.createBuffer()),
            (this.colorBuffer = a.createBuffer()),
            (this.blendMode = b.blendModes.NORMAL),
            (this.dynamicSize = 1);
      }),
      (b.WebGLBatch.prototype.constructor = b.WebGLBatch),
      (b.WebGLBatch.prototype.clean = function () {
         (this.verticies = []),
            (this.uvs = []),
            (this.indices = []),
            (this.colors = []),
            (this.dynamicSize = 1),
            (this.texture = null),
            (this.last = null),
            (this.size = 0),
            (this.head = null),
            (this.tail = null);
      }),
      (b.WebGLBatch.prototype.restoreLostContext = function (a) {
         (this.gl = a),
            (this.vertexBuffer = a.createBuffer()),
            (this.indexBuffer = a.createBuffer()),
            (this.uvBuffer = a.createBuffer()),
            (this.colorBuffer = a.createBuffer());
      }),
      (b.WebGLBatch.prototype.init = function (a) {
         (a.batch = this),
            (this.dirty = !0),
            (this.blendMode = a.blendMode),
            (this.texture = a.texture.baseTexture),
            (this.head = a),
            (this.tail = a),
            (this.size = 1),
            this.growBatch();
      }),
      (b.WebGLBatch.prototype.insertBefore = function (a, b) {
         this.size++, (a.batch = this), (this.dirty = !0);
         var c = b.__prev;
         (b.__prev = a),
            (a.__next = b),
            c ? ((a.__prev = c), (c.__next = a)) : (this.head = a);
      }),
      (b.WebGLBatch.prototype.insertAfter = function (a, b) {
         this.size++, (a.batch = this), (this.dirty = !0);
         var c = b.__next;
         (b.__next = a),
            (a.__prev = b),
            c ? ((a.__next = c), (c.__prev = a)) : (this.tail = a);
      }),
      (b.WebGLBatch.prototype.remove = function (a) {
         return (
            this.size--,
            0 === this.size
               ? ((a.batch = null),
                 (a.__prev = null),
                 (a.__next = null),
                 void 0)
               : (a.__prev
                    ? (a.__prev.__next = a.__next)
                    : ((this.head = a.__next), (this.head.__prev = null)),
                 a.__next
                    ? (a.__next.__prev = a.__prev)
                    : ((this.tail = a.__prev), (this.tail.__next = null)),
                 (a.batch = null),
                 (a.__next = null),
                 (a.__prev = null),
                 (this.dirty = !0),
                 void 0)
         );
      }),
      (b.WebGLBatch.prototype.split = function (a) {
         this.dirty = !0;
         var c = new b.WebGLBatch(this.gl);
         c.init(a),
            (c.texture = this.texture),
            (c.tail = this.tail),
            (this.tail = a.__prev),
            (this.tail.__next = null),
            (a.__prev = null);
         for (var d = 0; a; ) d++, (a.batch = c), (a = a.__next);
         return (c.size = d), (this.size -= d), c;
      }),
      (b.WebGLBatch.prototype.merge = function (a) {
         (this.dirty = !0),
            (this.tail.__next = a.head),
            (a.head.__prev = this.tail),
            (this.size += a.size),
            (this.tail = a.tail);
         for (var b = a.head; b; ) (b.batch = this), (b = b.__next);
      }),
      (b.WebGLBatch.prototype.growBatch = function () {
         var a = this.gl;
         (this.dynamicSize = 1 === this.size ? 1 : 1.5 * this.size),
            (this.verticies = new Float32Array(8 * this.dynamicSize)),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.verticies, a.DYNAMIC_DRAW),
            (this.uvs = new Float32Array(8 * this.dynamicSize)),
            a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.uvs, a.DYNAMIC_DRAW),
            (this.dirtyUVS = !0),
            (this.colors = new Float32Array(4 * this.dynamicSize)),
            a.bindBuffer(a.ARRAY_BUFFER, this.colorBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.colors, a.DYNAMIC_DRAW),
            (this.dirtyColors = !0),
            (this.indices = new Uint16Array(6 * this.dynamicSize));
         for (var b = this.indices.length / 6, c = 0; b > c; c++) {
            var d = 6 * c,
               e = 4 * c;
            (this.indices[d + 0] = e + 0),
               (this.indices[d + 1] = e + 1),
               (this.indices[d + 2] = e + 2),
               (this.indices[d + 3] = e + 0),
               (this.indices[d + 4] = e + 2),
               (this.indices[d + 5] = e + 3);
         }
         a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW);
      }),
      (b.WebGLBatch.prototype.refresh = function () {
         this.dynamicSize < this.size && this.growBatch();
         for (var a, b, c = 0, d = this.head; d; ) {
            a = 8 * c;
            var e = d.texture,
               f = e.frame,
               g = e.baseTexture.width,
               h = e.baseTexture.height;
            (this.uvs[a + 0] = f.x / g),
               (this.uvs[a + 1] = f.y / h),
               (this.uvs[a + 2] = (f.x + f.width) / g),
               (this.uvs[a + 3] = f.y / h),
               (this.uvs[a + 4] = (f.x + f.width) / g),
               (this.uvs[a + 5] = (f.y + f.height) / h),
               (this.uvs[a + 6] = f.x / g),
               (this.uvs[a + 7] = (f.y + f.height) / h),
               (d.updateFrame = !1),
               (b = 4 * c),
               (this.colors[b] =
                  this.colors[b + 1] =
                  this.colors[b + 2] =
                  this.colors[b + 3] =
                     d.worldAlpha),
               (d = d.__next),
               c++;
         }
         (this.dirtyUVS = !0), (this.dirtyColors = !0);
      }),
      (b.WebGLBatch.prototype.update = function () {
         for (
            var a,
               c,
               d,
               e,
               f,
               g,
               h,
               i,
               j,
               k,
               l,
               m,
               n,
               o,
               p,
               q,
               r = 0,
               s = this.head,
               t = this.verticies,
               u = this.uvs,
               v = this.colors;
            s;

         ) {
            if (s.vcount === b.visibleCount) {
               if (
                  ((c = s.texture.frame.width),
                  (d = s.texture.frame.height),
                  (e = s.anchor.x),
                  (f = s.anchor.y),
                  (g = c * (1 - e)),
                  (h = c * -e),
                  (i = d * (1 - f)),
                  (j = d * -f),
                  (k = 8 * r),
                  (a = s.worldTransform),
                  (l = a[0]),
                  (m = a[3]),
                  (n = a[1]),
                  (o = a[4]),
                  (p = a[2]),
                  (q = a[5]),
                  (t[k + 0] = l * h + n * j + p),
                  (t[k + 1] = o * j + m * h + q),
                  (t[k + 2] = l * g + n * j + p),
                  (t[k + 3] = o * j + m * g + q),
                  (t[k + 4] = l * g + n * i + p),
                  (t[k + 5] = o * i + m * g + q),
                  (t[k + 6] = l * h + n * i + p),
                  (t[k + 7] = o * i + m * h + q),
                  s.updateFrame || s.texture.updateFrame)
               ) {
                  this.dirtyUVS = !0;
                  var w = s.texture,
                     x = w.frame,
                     y = w.baseTexture.width,
                     z = w.baseTexture.height;
                  (u[k + 0] = x.x / y),
                     (u[k + 1] = x.y / z),
                     (u[k + 2] = (x.x + x.width) / y),
                     (u[k + 3] = x.y / z),
                     (u[k + 4] = (x.x + x.width) / y),
                     (u[k + 5] = (x.y + x.height) / z),
                     (u[k + 6] = x.x / y),
                     (u[k + 7] = (x.y + x.height) / z),
                     (s.updateFrame = !1);
               }
               if (s.cacheAlpha !== s.worldAlpha) {
                  s.cacheAlpha = s.worldAlpha;
                  var A = 4 * r;
                  (v[A] = v[A + 1] = v[A + 2] = v[A + 3] = s.worldAlpha),
                     (this.dirtyColors = !0);
               }
            } else
               (k = 8 * r),
                  (t[k + 0] =
                     t[k + 1] =
                     t[k + 2] =
                     t[k + 3] =
                     t[k + 4] =
                     t[k + 5] =
                     t[k + 6] =
                     t[k + 7] =
                        0);
            r++, (s = s.__next);
         }
      }),
      (b.WebGLBatch.prototype.render = function (a, c) {
         if (
            ((a = a || 0),
            void 0 === c && (c = this.size),
            this.dirty && (this.refresh(), (this.dirty = !1)),
            0 !== this.size)
         ) {
            this.update();
            var d = this.gl,
               e = b.defaultShader;
            d.bindBuffer(d.ARRAY_BUFFER, this.vertexBuffer),
               d.bufferSubData(d.ARRAY_BUFFER, 0, this.verticies),
               d.vertexAttribPointer(e.aVertexPosition, 2, d.FLOAT, !1, 0, 0),
               d.bindBuffer(d.ARRAY_BUFFER, this.uvBuffer),
               this.dirtyUVS &&
                  ((this.dirtyUVS = !1),
                  d.bufferSubData(d.ARRAY_BUFFER, 0, this.uvs)),
               d.vertexAttribPointer(e.aTextureCoord, 2, d.FLOAT, !1, 0, 0),
               d.activeTexture(d.TEXTURE0),
               d.bindTexture(d.TEXTURE_2D, this.texture._glTexture),
               d.bindBuffer(d.ARRAY_BUFFER, this.colorBuffer),
               this.dirtyColors &&
                  ((this.dirtyColors = !1),
                  d.bufferSubData(d.ARRAY_BUFFER, 0, this.colors)),
               d.vertexAttribPointer(e.colorAttribute, 1, d.FLOAT, !1, 0, 0),
               d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var f = c - a;
            d.drawElements(d.TRIANGLES, 6 * f, d.UNSIGNED_SHORT, 6 * 2 * a);
         }
      }),
      (b.WebGLFilterManager = function (a) {
         (this.transparent = a),
            (this.filterStack = []),
            (this.texturePool = []),
            (this.offsetX = 0),
            (this.offsetY = 0),
            this.initShaderBuffers();
      }),
      (b.WebGLFilterManager.prototype.begin = function (a, b) {
         (this.width = 2 * a.x), (this.height = 2 * -a.y), (this.buffer = b);
      }),
      (b.WebGLFilterManager.prototype.pushFilter = function (a) {
         var c = b.gl;
         this.filterStack.push(a);
         var d = a.filterPasses[0];
         (this.offsetX += a.target.filterArea.x),
            (this.offsetY += a.target.filterArea.y);
         var e = this.texturePool.pop();
         e
            ? e.resize(this.width, this.height)
            : (e = new b.FilterTexture(this.width, this.height)),
            c.bindTexture(c.TEXTURE_2D, e.texture),
            this.getBounds(a.target);
         var f = a.target.filterArea,
            g = d.padding;
         (f.x -= g),
            (f.y -= g),
            (f.width += 2 * g),
            (f.height += 2 * g),
            f.x < 0 && (f.x = 0),
            f.width > this.width && (f.width = this.width),
            f.y < 0 && (f.y = 0),
            f.height > this.height && (f.height = this.height),
            c.bindFramebuffer(c.FRAMEBUFFER, e.frameBuffer),
            c.viewport(0, 0, f.width, f.height),
            (b.projection.x = f.width / 2),
            (b.projection.y = -f.height / 2),
            (b.offset.x = -f.x),
            (b.offset.y = -f.y),
            c.uniform2f(
               b.defaultShader.projectionVector,
               f.width / 2,
               -f.height / 2
            ),
            c.uniform2f(b.defaultShader.offsetVector, -f.x, -f.y),
            c.colorMask(!0, !0, !0, !0),
            c.clearColor(0, 0, 0, 0),
            c.clear(c.COLOR_BUFFER_BIT),
            (a._glFilterTexture = e);
      }),
      (b.WebGLFilterManager.prototype.popFilter = function () {
         var a = b.gl,
            c = this.filterStack.pop(),
            d = c.target.filterArea,
            e = c._glFilterTexture;
         if (c.filterPasses.length > 1) {
            a.viewport(0, 0, d.width, d.height),
               a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
               (this.vertexArray[0] = 0),
               (this.vertexArray[1] = d.height),
               (this.vertexArray[2] = d.width),
               (this.vertexArray[3] = d.height),
               (this.vertexArray[4] = 0),
               (this.vertexArray[5] = 0),
               (this.vertexArray[6] = d.width),
               (this.vertexArray[7] = 0),
               a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray),
               a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
               (this.uvArray[2] = d.width / this.width),
               (this.uvArray[5] = d.height / this.height),
               (this.uvArray[6] = d.width / this.width),
               (this.uvArray[7] = d.height / this.height),
               a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray);
            var f = e,
               g = this.texturePool.pop();
            g || (g = new b.FilterTexture(this.width, this.height)),
               a.bindFramebuffer(a.FRAMEBUFFER, g.frameBuffer),
               a.clear(a.COLOR_BUFFER_BIT),
               a.disable(a.BLEND);
            for (var h = 0; h < c.filterPasses.length - 1; h++) {
               var i = c.filterPasses[h];
               a.bindFramebuffer(a.FRAMEBUFFER, g.frameBuffer),
                  a.activeTexture(a.TEXTURE0),
                  a.bindTexture(a.TEXTURE_2D, f.texture),
                  this.applyFilterPass(i, d, d.width, d.height);
               var j = f;
               (f = g), (g = j);
            }
            a.enable(a.BLEND), (e = f), this.texturePool.push(g);
         }
         var k = c.filterPasses[c.filterPasses.length - 1];
         (this.offsetX -= d.x), (this.offsetY -= d.y);
         var l = this.width,
            m = this.height,
            n = 0,
            o = 0,
            p = this.buffer;
         if (0 === this.filterStack.length)
            a.colorMask(!0, !0, !0, this.transparent);
         else {
            var q = this.filterStack[this.filterStack.length - 1];
            (d = q.target.filterArea),
               (l = d.width),
               (m = d.height),
               (n = d.x),
               (o = d.y),
               (p = q._glFilterTexture.frameBuffer);
         }
         (b.projection.x = l / 2),
            (b.projection.y = -m / 2),
            (b.offset.x = n),
            (b.offset.y = o),
            (d = c.target.filterArea);
         var r = d.x - n,
            s = d.y - o;
         a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            (this.vertexArray[0] = r),
            (this.vertexArray[1] = s + d.height),
            (this.vertexArray[2] = r + d.width),
            (this.vertexArray[3] = s + d.height),
            (this.vertexArray[4] = r),
            (this.vertexArray[5] = s),
            (this.vertexArray[6] = r + d.width),
            (this.vertexArray[7] = s),
            a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray),
            a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
            (this.uvArray[2] = d.width / this.width),
            (this.uvArray[5] = d.height / this.height),
            (this.uvArray[6] = d.width / this.width),
            (this.uvArray[7] = d.height / this.height),
            a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray),
            a.viewport(0, 0, l, m),
            a.bindFramebuffer(a.FRAMEBUFFER, p),
            a.activeTexture(a.TEXTURE0),
            a.bindTexture(a.TEXTURE_2D, e.texture),
            this.applyFilterPass(k, d, l, m),
            a.useProgram(b.defaultShader.program),
            a.uniform2f(b.defaultShader.projectionVector, l / 2, -m / 2),
            a.uniform2f(b.defaultShader.offsetVector, -n, -o),
            this.texturePool.push(e),
            (c._glFilterTexture = null);
      }),
      (b.WebGLFilterManager.prototype.applyFilterPass = function (a, c, d, e) {
         var f = b.gl,
            g = a.shader;
         g ||
            ((g = new b.PixiShader()),
            (g.fragmentSrc = a.fragmentSrc),
            (g.uniforms = a.uniforms),
            g.init(),
            (a.shader = g)),
            f.useProgram(g.program),
            f.uniform2f(g.projectionVector, d / 2, -e / 2),
            f.uniform2f(g.offsetVector, 0, 0),
            a.uniforms.dimensions &&
               ((a.uniforms.dimensions.value[0] = this.width),
               (a.uniforms.dimensions.value[1] = this.height),
               (a.uniforms.dimensions.value[2] = this.vertexArray[0]),
               (a.uniforms.dimensions.value[3] = this.vertexArray[5])),
            g.syncUniforms(),
            f.bindBuffer(f.ARRAY_BUFFER, this.vertexBuffer),
            f.vertexAttribPointer(g.aVertexPosition, 2, f.FLOAT, !1, 0, 0),
            f.bindBuffer(f.ARRAY_BUFFER, this.uvBuffer),
            f.vertexAttribPointer(g.aTextureCoord, 2, f.FLOAT, !1, 0, 0),
            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0);
      }),
      (b.WebGLFilterManager.prototype.initShaderBuffers = function () {
         var a = b.gl;
         (this.vertexBuffer = a.createBuffer()),
            (this.uvBuffer = a.createBuffer()),
            (this.indexBuffer = a.createBuffer()),
            (this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.vertexArray, a.STATIC_DRAW),
            (this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
            a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.uvArray, a.STATIC_DRAW),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(
               a.ELEMENT_ARRAY_BUFFER,
               new Uint16Array([0, 1, 2, 1, 3, 2]),
               a.STATIC_DRAW
            );
      }),
      (b.WebGLFilterManager.prototype.getBounds = function (a) {
         var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            A = a.first,
            B = a.last._iNext,
            C = -1 / 0,
            D = -1 / 0,
            E = 1 / 0,
            F = 1 / 0;
         do {
            if (A.visible)
               if (A instanceof b.Sprite)
                  (d = A.texture.frame.width),
                     (e = A.texture.frame.height),
                     (f = A.anchor.x),
                     (g = A.anchor.y),
                     (h = d * (1 - f)),
                     (i = d * -f),
                     (j = e * (1 - g)),
                     (k = e * -g),
                     (l = !0);
               else if (A instanceof b.Graphics) {
                  A.updateFilterBounds();
                  var G = A.bounds;
                  (d = G.width),
                     (e = G.height),
                     (h = G.x),
                     (i = G.x + G.width),
                     (j = G.y),
                     (k = G.y + G.height),
                     (l = !0);
               }
            l &&
               ((c = A.worldTransform),
               (m = c[0]),
               (n = c[3]),
               (o = c[1]),
               (p = c[4]),
               (q = c[2]),
               (r = c[5]),
               (s = m * i + o * k + q),
               (w = p * k + n * i + r),
               (t = m * h + o * k + q),
               (x = p * k + n * h + r),
               (u = m * h + o * j + q),
               (y = p * j + n * h + r),
               (v = m * i + o * j + q),
               (z = p * j + n * i + r),
               (E = E > s ? s : E),
               (E = E > t ? t : E),
               (E = E > u ? u : E),
               (E = E > v ? v : E),
               (F = F > w ? w : F),
               (F = F > x ? x : F),
               (F = F > y ? y : F),
               (F = F > z ? z : F),
               (C = s > C ? s : C),
               (C = t > C ? t : C),
               (C = u > C ? u : C),
               (C = v > C ? v : C),
               (D = w > D ? w : D),
               (D = x > D ? x : D),
               (D = y > D ? y : D),
               (D = z > D ? z : D)),
               (l = !1),
               (A = A._iNext);
         } while (A !== B);
         (a.filterArea.x = E),
            (a.filterArea.y = F),
            (a.filterArea.width = C - E),
            (a.filterArea.height = D - F);
      }),
      (b.FilterTexture = function (a, c) {
         var d = b.gl;
         (this.frameBuffer = d.createFramebuffer()),
            (this.texture = d.createTexture()),
            d.bindTexture(d.TEXTURE_2D, this.texture),
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR),
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR),
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE),
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE),
            d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer),
            d.bindFramebuffer(d.FRAMEBUFFER, this.frameBuffer),
            d.framebufferTexture2D(
               d.FRAMEBUFFER,
               d.COLOR_ATTACHMENT0,
               d.TEXTURE_2D,
               this.texture,
               0
            ),
            this.resize(a, c);
      }),
      (b.FilterTexture.prototype.resize = function (a, c) {
         if (this.width !== a || this.height !== c) {
            (this.width = a), (this.height = c);
            var d = b.gl;
            d.bindTexture(d.TEXTURE_2D, this.texture),
               d.texImage2D(
                  d.TEXTURE_2D,
                  0,
                  d.RGBA,
                  a,
                  c,
                  0,
                  d.RGBA,
                  d.UNSIGNED_BYTE,
                  null
               );
         }
      }),
      (b.WebGLGraphics = function () {}),
      (b.WebGLGraphics.renderGraphics = function (a, c) {
         var d = b.gl;
         a._webGL ||
            (a._webGL = {
               points: [],
               indices: [],
               lastIndex: 0,
               buffer: d.createBuffer(),
               indexBuffer: d.createBuffer(),
            }),
            a.dirty &&
               ((a.dirty = !1),
               a.clearDirty &&
                  ((a.clearDirty = !1),
                  (a._webGL.lastIndex = 0),
                  (a._webGL.points = []),
                  (a._webGL.indices = [])),
               b.WebGLGraphics.updateGraphics(a)),
            b.activatePrimitiveShader();
         var e = b.mat3.clone(a.worldTransform);
         b.mat3.transpose(e),
            d.blendFunc(d.ONE, d.ONE_MINUS_SRC_ALPHA),
            d.uniformMatrix3fv(b.primitiveShader.translationMatrix, !1, e),
            d.uniform2f(b.primitiveShader.projectionVector, c.x, -c.y),
            d.uniform2f(
               b.primitiveShader.offsetVector,
               -b.offset.x,
               -b.offset.y
            ),
            d.uniform1f(b.primitiveShader.alpha, a.worldAlpha),
            d.bindBuffer(d.ARRAY_BUFFER, a._webGL.buffer),
            d.vertexAttribPointer(
               b.primitiveShader.aVertexPosition,
               2,
               d.FLOAT,
               !1,
               24,
               0
            ),
            d.vertexAttribPointer(
               b.primitiveShader.colorAttribute,
               4,
               d.FLOAT,
               !1,
               24,
               8
            ),
            d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, a._webGL.indexBuffer),
            d.drawElements(
               d.TRIANGLE_STRIP,
               a._webGL.indices.length,
               d.UNSIGNED_SHORT,
               0
            ),
            b.deactivatePrimitiveShader();
      }),
      (b.WebGLGraphics.updateGraphics = function (a) {
         for (var c = a._webGL.lastIndex; c < a.graphicsData.length; c++) {
            var d = a.graphicsData[c];
            d.type === b.Graphics.POLY
               ? (d.fill &&
                    d.points.length > 3 &&
                    b.WebGLGraphics.buildPoly(d, a._webGL),
                 d.lineWidth > 0 && b.WebGLGraphics.buildLine(d, a._webGL))
               : d.type === b.Graphics.RECT
               ? b.WebGLGraphics.buildRectangle(d, a._webGL)
               : (d.type === b.Graphics.CIRC || d.type === b.Graphics.ELIP) &&
                 b.WebGLGraphics.buildCircle(d, a._webGL);
         }
         a._webGL.lastIndex = a.graphicsData.length;
         var e = b.gl;
         (a._webGL.glPoints = new Float32Array(a._webGL.points)),
            e.bindBuffer(e.ARRAY_BUFFER, a._webGL.buffer),
            e.bufferData(e.ARRAY_BUFFER, a._webGL.glPoints, e.STATIC_DRAW),
            (a._webGL.glIndicies = new Uint16Array(a._webGL.indices)),
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a._webGL.indexBuffer),
            e.bufferData(
               e.ELEMENT_ARRAY_BUFFER,
               a._webGL.glIndicies,
               e.STATIC_DRAW
            );
      }),
      (b.WebGLGraphics.buildRectangle = function (a, c) {
         var d = a.points,
            e = d[0],
            f = d[1],
            g = d[2],
            h = d[3];
         if (a.fill) {
            var i = b.hex2rgb(a.fillColor),
               j = a.fillAlpha,
               k = i[0] * j,
               l = i[1] * j,
               m = i[2] * j,
               n = c.points,
               o = c.indices,
               p = n.length / 6;
            n.push(e, f),
               n.push(k, l, m, j),
               n.push(e + g, f),
               n.push(k, l, m, j),
               n.push(e, f + h),
               n.push(k, l, m, j),
               n.push(e + g, f + h),
               n.push(k, l, m, j),
               o.push(p, p, p + 1, p + 2, p + 3, p + 3);
         }
         a.lineWidth &&
            ((a.points = [e, f, e + g, f, e + g, f + h, e, f + h, e, f]),
            b.WebGLGraphics.buildLine(a, c));
      }),
      (b.WebGLGraphics.buildCircle = function (a, c) {
         var d = a.points,
            e = d[0],
            f = d[1],
            g = d[2],
            h = d[3],
            i = 40,
            j = (2 * Math.PI) / i,
            k = 0;
         if (a.fill) {
            var l = b.hex2rgb(a.fillColor),
               m = a.fillAlpha,
               n = l[0] * m,
               o = l[1] * m,
               p = l[2] * m,
               q = c.points,
               r = c.indices,
               s = q.length / 6;
            for (r.push(s), k = 0; i + 1 > k; k++)
               q.push(e, f, n, o, p, m),
                  q.push(
                     e + Math.sin(j * k) * g,
                     f + Math.cos(j * k) * h,
                     n,
                     o,
                     p,
                     m
                  ),
                  r.push(s++, s++);
            r.push(s - 1);
         }
         if (a.lineWidth) {
            for (a.points = [], k = 0; i + 1 > k; k++)
               a.points.push(e + Math.sin(j * k) * g, f + Math.cos(j * k) * h);
            b.WebGLGraphics.buildLine(a, c);
         }
      }),
      (b.WebGLGraphics.buildLine = function (a, c) {
         var d = 0,
            e = a.points;
         if (0 !== e.length) {
            if (a.lineWidth % 2) for (d = 0; d < e.length; d++) e[d] += 0.5;
            var f = new b.Point(e[0], e[1]),
               g = new b.Point(e[e.length - 2], e[e.length - 1]);
            if (f.x === g.x && f.y === g.y) {
               e.pop(),
                  e.pop(),
                  (g = new b.Point(e[e.length - 2], e[e.length - 1]));
               var h = g.x + 0.5 * (f.x - g.x),
                  i = g.y + 0.5 * (f.y - g.y);
               e.unshift(h, i), e.push(h, i);
            }
            var j,
               k,
               l,
               m,
               n,
               o,
               p,
               q,
               r,
               s,
               t,
               u,
               v,
               w,
               x,
               y,
               z,
               A,
               B,
               C,
               D,
               E,
               F,
               G = c.points,
               H = c.indices,
               I = e.length / 2,
               J = e.length,
               K = G.length / 6,
               L = a.lineWidth / 2,
               M = b.hex2rgb(a.lineColor),
               N = a.lineAlpha,
               O = M[0] * N,
               P = M[1] * N,
               Q = M[2] * N;
            for (
               l = e[0],
                  m = e[1],
                  n = e[2],
                  o = e[3],
                  r = -(m - o),
                  s = l - n,
                  F = Math.sqrt(r * r + s * s),
                  r /= F,
                  s /= F,
                  r *= L,
                  s *= L,
                  G.push(l - r, m - s, O, P, Q, N),
                  G.push(l + r, m + s, O, P, Q, N),
                  d = 1;
               I - 1 > d;
               d++
            )
               (l = e[2 * (d - 1)]),
                  (m = e[2 * (d - 1) + 1]),
                  (n = e[2 * d]),
                  (o = e[2 * d + 1]),
                  (p = e[2 * (d + 1)]),
                  (q = e[2 * (d + 1) + 1]),
                  (r = -(m - o)),
                  (s = l - n),
                  (F = Math.sqrt(r * r + s * s)),
                  (r /= F),
                  (s /= F),
                  (r *= L),
                  (s *= L),
                  (t = -(o - q)),
                  (u = n - p),
                  (F = Math.sqrt(t * t + u * u)),
                  (t /= F),
                  (u /= F),
                  (t *= L),
                  (u *= L),
                  (x = -s + m - (-s + o)),
                  (y = -r + n - (-r + l)),
                  (z = (-r + l) * (-s + o) - (-r + n) * (-s + m)),
                  (A = -u + q - (-u + o)),
                  (B = -t + n - (-t + p)),
                  (C = (-t + p) * (-u + o) - (-t + n) * (-u + q)),
                  (D = x * B - A * y),
                  Math.abs(D) < 0.1
                     ? ((D += 10.1),
                       G.push(n - r, o - s, O, P, Q, N),
                       G.push(n + r, o + s, O, P, Q, N))
                     : ((j = (y * C - B * z) / D),
                       (k = (A * z - x * C) / D),
                       (E = (j - n) * (j - n) + (k - o) + (k - o)),
                       E > 19600
                          ? ((v = r - t),
                            (w = s - u),
                            (F = Math.sqrt(v * v + w * w)),
                            (v /= F),
                            (w /= F),
                            (v *= L),
                            (w *= L),
                            G.push(n - v, o - w),
                            G.push(O, P, Q, N),
                            G.push(n + v, o + w),
                            G.push(O, P, Q, N),
                            G.push(n - v, o - w),
                            G.push(O, P, Q, N),
                            J++)
                          : (G.push(j, k),
                            G.push(O, P, Q, N),
                            G.push(n - (j - n), o - (k - o)),
                            G.push(O, P, Q, N)));
            for (
               l = e[2 * (I - 2)],
                  m = e[2 * (I - 2) + 1],
                  n = e[2 * (I - 1)],
                  o = e[2 * (I - 1) + 1],
                  r = -(m - o),
                  s = l - n,
                  F = Math.sqrt(r * r + s * s),
                  r /= F,
                  s /= F,
                  r *= L,
                  s *= L,
                  G.push(n - r, o - s),
                  G.push(O, P, Q, N),
                  G.push(n + r, o + s),
                  G.push(O, P, Q, N),
                  H.push(K),
                  d = 0;
               J > d;
               d++
            )
               H.push(K++);
            H.push(K - 1);
         }
      }),
      (b.WebGLGraphics.buildPoly = function (a, c) {
         var d = a.points;
         if (!(d.length < 6)) {
            var e = c.points,
               f = c.indices,
               g = d.length / 2,
               h = b.hex2rgb(a.fillColor),
               i = a.fillAlpha,
               j = h[0] * i,
               k = h[1] * i,
               l = h[2] * i,
               m = b.PolyK.Triangulate(d),
               n = e.length / 6,
               o = 0;
            for (o = 0; o < m.length; o += 3)
               f.push(m[o] + n),
                  f.push(m[o] + n),
                  f.push(m[o + 1] + n),
                  f.push(m[o + 2] + n),
                  f.push(m[o + 2] + n);
            for (o = 0; g > o; o++) e.push(d[2 * o], d[2 * o + 1], j, k, l, i);
         }
      }),
      (b._defaultFrame = new b.Rectangle(0, 0, 1, 1)),
      (b.gl = null),
      (b.WebGLRenderer = function (a, c, d, e, f) {
         (this.transparent = !!e),
            (this.width = a || 800),
            (this.height = c || 600),
            (this.view = d || document.createElement("canvas")),
            (this.view.width = this.width),
            (this.view.height = this.height);
         var g = this;
         this.view.addEventListener(
            "webglcontextlost",
            function (a) {
               g.handleContextLost(a);
            },
            !1
         ),
            this.view.addEventListener(
               "webglcontextrestored",
               function (a) {
                  g.handleContextRestored(a);
               },
               !1
            ),
            (this.batchs = []);
         var h = {
            alpha: this.transparent,
            antialias: !!f,
            premultipliedAlpha: !1,
            stencil: !0,
         };
         try {
            b.gl = this.gl = this.view.getContext("experimental-webgl", h);
         } catch (i) {
            try {
               b.gl = this.gl = this.view.getContext("webgl", h);
            } catch (j) {
               throw new Error(
                  " This browser does not support webGL. Try using the canvas renderer" +
                     this
               );
            }
         }
         b.initDefaultShaders();
         var k = this.gl;
         k.useProgram(b.defaultShader.program),
            (b.WebGLRenderer.gl = k),
            (this.batch = new b.WebGLBatch(k)),
            k.disable(k.DEPTH_TEST),
            k.disable(k.CULL_FACE),
            k.enable(k.BLEND),
            k.colorMask(!0, !0, !0, this.transparent),
            (b.projection = new b.Point(400, 300)),
            (b.offset = new b.Point(0, 0)),
            this.resize(this.width, this.height),
            (this.contextLost = !1),
            (this.stageRenderGroup = new b.WebGLRenderGroup(
               this.gl,
               this.transparent
            ));
      }),
      (b.WebGLRenderer.prototype.constructor = b.WebGLRenderer),
      (b.WebGLRenderer.getBatch = function () {
         return 0 === b._batchs.length
            ? new b.WebGLBatch(b.WebGLRenderer.gl)
            : b._batchs.pop();
      }),
      (b.WebGLRenderer.returnBatch = function (a) {
         a.clean(), b._batchs.push(a);
      }),
      (b.WebGLRenderer.prototype.render = function (a) {
         if (!this.contextLost) {
            this.__stage !== a &&
               ((this.__stage = a), this.stageRenderGroup.setRenderable(a)),
               b.WebGLRenderer.updateTextures(),
               b.visibleCount++,
               a.updateTransform();
            var c = this.gl;
            if (
               (c.colorMask(!0, !0, !0, this.transparent),
               c.viewport(0, 0, this.width, this.height),
               c.bindFramebuffer(c.FRAMEBUFFER, null),
               c.clearColor(
                  a.backgroundColorSplit[0],
                  a.backgroundColorSplit[1],
                  a.backgroundColorSplit[2],
                  !this.transparent
               ),
               c.clear(c.COLOR_BUFFER_BIT),
               (this.stageRenderGroup.backgroundColor = a.backgroundColorSplit),
               (b.projection.x = this.width / 2),
               (b.projection.y = -this.height / 2),
               this.stageRenderGroup.render(b.projection),
               a.interactive &&
                  (a._interactiveEventsAdded ||
                     ((a._interactiveEventsAdded = !0),
                     a.interactionManager.setTarget(this))),
               b.Texture.frameUpdates.length > 0)
            ) {
               for (var d = 0; d < b.Texture.frameUpdates.length; d++)
                  b.Texture.frameUpdates[d].updateFrame = !1;
               b.Texture.frameUpdates = [];
            }
         }
      }),
      (b.WebGLRenderer.updateTextures = function () {
         var a = 0;
         for (a = 0; a < b.texturesToUpdate.length; a++)
            b.WebGLRenderer.updateTexture(b.texturesToUpdate[a]);
         for (a = 0; a < b.texturesToDestroy.length; a++)
            b.WebGLRenderer.destroyTexture(b.texturesToDestroy[a]);
         (b.texturesToUpdate = []), (b.texturesToDestroy = []);
      }),
      (b.WebGLRenderer.updateTexture = function (a) {
         var c = b.gl;
         a._glTexture || (a._glTexture = c.createTexture()),
            a.hasLoaded &&
               (c.bindTexture(c.TEXTURE_2D, a._glTexture),
               c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
               c.texImage2D(
                  c.TEXTURE_2D,
                  0,
                  c.RGBA,
                  c.RGBA,
                  c.UNSIGNED_BYTE,
                  a.source
               ),
               c.texParameteri(
                  c.TEXTURE_2D,
                  c.TEXTURE_MAG_FILTER,
                  a.scaleMode === b.BaseTexture.SCALE_MODE.LINEAR
                     ? c.LINEAR
                     : c.NEAREST
               ),
               c.texParameteri(
                  c.TEXTURE_2D,
                  c.TEXTURE_MIN_FILTER,
                  a.scaleMode === b.BaseTexture.SCALE_MODE.LINEAR
                     ? c.LINEAR
                     : c.NEAREST
               ),
               a._powerOf2
                  ? (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT),
                    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT))
                  : (c.texParameteri(
                       c.TEXTURE_2D,
                       c.TEXTURE_WRAP_S,
                       c.CLAMP_TO_EDGE
                    ),
                    c.texParameteri(
                       c.TEXTURE_2D,
                       c.TEXTURE_WRAP_T,
                       c.CLAMP_TO_EDGE
                    )),
               c.bindTexture(c.TEXTURE_2D, null));
      }),
      (b.WebGLRenderer.destroyTexture = function (a) {
         var c = b.gl;
         a._glTexture &&
            ((a._glTexture = c.createTexture()),
            c.deleteTexture(c.TEXTURE_2D, a._glTexture));
      }),
      (b.WebGLRenderer.prototype.resize = function (a, c) {
         (this.width = a),
            (this.height = c),
            (this.view.width = a),
            (this.view.height = c),
            this.gl.viewport(0, 0, this.width, this.height),
            (b.projection.x = this.width / 2),
            (b.projection.y = -this.height / 2);
      }),
      (b.WebGLRenderer.prototype.handleContextLost = function (a) {
         a.preventDefault(), (this.contextLost = !0);
      }),
      (b.WebGLRenderer.prototype.handleContextRestored = function () {
         (this.gl = this.view.getContext("experimental-webgl", { alpha: !0 })),
            this.initShaders();
         for (var a in b.TextureCache) {
            var c = b.TextureCache[a].baseTexture;
            (c._glTexture = null), b.WebGLRenderer.updateTexture(c);
         }
         for (var d = 0; d < this.batchs.length; d++)
            this.batchs[d].restoreLostContext(this.gl),
               (this.batchs[d].dirty = !0);
         b._restoreBatchs(this.gl), (this.contextLost = !1);
      }),
      (b.WebGLRenderGroup = function (a, c) {
         (this.gl = a),
            this.root,
            this.backgroundColor,
            (this.transparent = void 0 == c ? !0 : c),
            (this.batchs = []),
            (this.toRemove = []),
            (this.filterManager = new b.WebGLFilterManager(this.transparent));
      }),
      (b.WebGLRenderGroup.prototype.constructor = b.WebGLRenderGroup),
      (b.WebGLRenderGroup.prototype.setRenderable = function (a) {
         this.root && this.removeDisplayObjectAndChildren(this.root),
            (a.worldVisible = a.visible),
            (this.root = a),
            this.addDisplayObjectAndChildren(a);
      }),
      (b.WebGLRenderGroup.prototype.render = function (a, c) {
         b.WebGLRenderer.updateTextures();
         var d = this.gl;
         d.uniform2f(b.defaultShader.projectionVector, a.x, a.y),
            this.filterManager.begin(a, c),
            d.blendFunc(d.ONE, d.ONE_MINUS_SRC_ALPHA);
         for (var e, f = 0; f < this.batchs.length; f++)
            (e = this.batchs[f]),
               e instanceof b.WebGLBatch
                  ? this.batchs[f].render()
                  : this.renderSpecial(e, a);
      }),
      (b.WebGLRenderGroup.prototype.renderSpecific = function (a, c, d) {
         b.WebGLRenderer.updateTextures();
         var e = this.gl;
         e.uniform2f(b.defaultShader.projectionVector, c.x, c.y),
            this.filterManager.begin(c, d);
         for (
            var f, g, h, i, j = a.first;
            j._iNext && (!j.renderable || !j.__renderGroup);

         )
            j = j._iNext;
         var k = j.batch;
         if (j instanceof b.Sprite) {
            k = j.batch;
            var l = k.head;
            if (l == j) f = 0;
            else for (f = 1; l.__next != j; ) f++, (l = l.__next);
         } else k = j;
         for (var m = a.last; m._iPrev && (!m.renderable || !m.__renderGroup); )
            m = m._iNext;
         if (m instanceof b.Sprite) {
            endBatch = m.batch;
            var l = endBatch.head;
            if (l == m) h = 0;
            else for (h = 1; l.__next != m; ) h++, (l = l.__next);
         } else endBatch = m;
         if (k == endBatch)
            return (
               k instanceof b.WebGLBatch
                  ? k.render(f, h + 1)
                  : this.renderSpecial(k, c),
               void 0
            );
         (g = this.batchs.indexOf(k)),
            (i = this.batchs.indexOf(endBatch)),
            k instanceof b.WebGLBatch ? k.render(f) : this.renderSpecial(k, c);
         for (var n = g + 1; i > n; n++)
            (renderable = this.batchs[n]),
               renderable instanceof b.WebGLBatch
                  ? this.batchs[n].render()
                  : this.renderSpecial(renderable, c);
         endBatch instanceof b.WebGLBatch
            ? endBatch.render(0, h + 1)
            : this.renderSpecial(endBatch, c);
      }),
      (b.WebGLRenderGroup.prototype.renderSpecial = function (a, c) {
         var d = a.vcount === b.visibleCount;
         a instanceof b.TilingSprite
            ? d && this.renderTilingSprite(a, c)
            : a instanceof b.Strip
            ? d && this.renderStrip(a, c)
            : a instanceof b.CustomRenderable
            ? d && a.renderWebGL(this, c)
            : a instanceof b.Graphics
            ? d && a.renderable && b.WebGLGraphics.renderGraphics(a, c)
            : a instanceof b.FilterBlock && this.handleFilterBlock(a, c);
      }),
      (flip = !1);
   var d = [],
      e = 0;
   (b.WebGLRenderGroup.prototype.handleFilterBlock = function (a, c) {
      var f = b.gl;
      if (a.open)
         a.data instanceof Array
            ? this.filterManager.pushFilter(a)
            : (e++,
              d.push(a),
              f.enable(f.STENCIL_TEST),
              f.colorMask(!1, !1, !1, !1),
              f.stencilFunc(f.ALWAYS, 1, 1),
              f.stencilOp(f.KEEP, f.KEEP, f.INCR),
              b.WebGLGraphics.renderGraphics(a.data, c),
              f.colorMask(!0, !0, !0, !0),
              f.stencilFunc(f.NOTEQUAL, 0, d.length),
              f.stencilOp(f.KEEP, f.KEEP, f.KEEP));
      else if (a.data instanceof Array) this.filterManager.popFilter();
      else {
         var g = d.pop(a);
         g &&
            (f.colorMask(!1, !1, !1, !1),
            f.stencilFunc(f.ALWAYS, 1, 1),
            f.stencilOp(f.KEEP, f.KEEP, f.DECR),
            b.WebGLGraphics.renderGraphics(g.data, c),
            f.colorMask(!0, !0, !0, !0),
            f.stencilFunc(f.NOTEQUAL, 0, d.length),
            f.stencilOp(f.KEEP, f.KEEP, f.KEEP)),
            f.disable(f.STENCIL_TEST);
      }
   }),
      (b.WebGLRenderGroup.prototype.updateTexture = function (a) {
         this.removeObject(a);
         for (
            var b = a.first;
            b != this.root &&
            ((b = b._iPrev), !b.renderable || !b.__renderGroup);

         );
         for (
            var c = a.last;
            c._iNext && ((c = c._iNext), !c.renderable || !c.__renderGroup);

         );
         this.insertObject(a, b, c);
      }),
      (b.WebGLRenderGroup.prototype.addFilterBlocks = function (a, b) {
         (a.__renderGroup = this), (b.__renderGroup = this);
         for (
            var c = a;
            c != this.root.first &&
            ((c = c._iPrev), !c.renderable || !c.__renderGroup);

         );
         this.insertAfter(a, c);
         for (
            var d = b;
            d != this.root.first &&
            ((d = d._iPrev), !d.renderable || !d.__renderGroup);

         );
         this.insertAfter(b, d);
      }),
      (b.WebGLRenderGroup.prototype.removeFilterBlocks = function (a, b) {
         this.removeObject(a), this.removeObject(b);
      }),
      (b.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function (a) {
         a.__renderGroup && a.__renderGroup.removeDisplayObjectAndChildren(a);
         for (
            var b = a.first;
            b != this.root.first &&
            ((b = b._iPrev), !b.renderable || !b.__renderGroup);

         );
         for (
            var c = a.last;
            c._iNext && ((c = c._iNext), !c.renderable || !c.__renderGroup);

         );
         var d = a.first,
            e = a.last._iNext;
         do {
            (d.__renderGroup = this),
               d.renderable && (this.insertObject(d, b, c), (b = d)),
               (d = d._iNext);
         } while (d != e);
      }),
      (b.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function (
         a
      ) {
         if (a.__renderGroup == this) {
            a.last;
            do {
               (a.__renderGroup = null),
                  a.renderable && this.removeObject(a),
                  (a = a._iNext);
            } while (a);
         }
      }),
      (b.WebGLRenderGroup.prototype.insertObject = function (a, c, d) {
         var e = c,
            f = d;
         if (a instanceof b.Sprite) {
            var g, h;
            if (e instanceof b.Sprite) {
               if (
                  ((g = e.batch),
                  g &&
                     g.texture == a.texture.baseTexture &&
                     g.blendMode == a.blendMode)
               )
                  return g.insertAfter(a, e), void 0;
            } else g = e;
            if (f)
               if (f instanceof b.Sprite) {
                  if ((h = f.batch)) {
                     if (
                        h.texture == a.texture.baseTexture &&
                        h.blendMode == a.blendMode
                     )
                        return h.insertBefore(a, f), void 0;
                     if (h == g) {
                        var i = g.split(f),
                           j = b.WebGLRenderer.getBatch(),
                           k = this.batchs.indexOf(g);
                        return (
                           j.init(a), this.batchs.splice(k + 1, 0, j, i), void 0
                        );
                     }
                  }
               } else h = f;
            var j = b.WebGLRenderer.getBatch();
            if ((j.init(a), g)) {
               var k = this.batchs.indexOf(g);
               this.batchs.splice(k + 1, 0, j);
            } else this.batchs.push(j);
         } else
            a instanceof b.TilingSprite
               ? this.initTilingSprite(a)
               : a instanceof b.Strip && this.initStrip(a),
               this.insertAfter(a, e);
      }),
      (b.WebGLRenderGroup.prototype.insertAfter = function (a, c) {
         if (c instanceof b.Sprite) {
            var d = c.batch;
            if (d)
               if (d.tail == c) {
                  var e = this.batchs.indexOf(d);
                  this.batchs.splice(e + 1, 0, a);
               } else {
                  var f = d.split(c.__next),
                     e = this.batchs.indexOf(d);
                  this.batchs.splice(e + 1, 0, a, f);
               }
            else this.batchs.push(a);
         } else {
            var e = this.batchs.indexOf(c);
            this.batchs.splice(e + 1, 0, a);
         }
      }),
      (b.WebGLRenderGroup.prototype.removeObject = function (a) {
         var c;
         if (a instanceof b.Sprite) {
            var d = a.batch;
            if (!d) return;
            d.remove(a), 0 == d.size && (c = d);
         } else c = a;
         if (c) {
            var e = this.batchs.indexOf(c);
            if (-1 == e) return;
            if (0 == e || e == this.batchs.length - 1)
               return (
                  this.batchs.splice(e, 1),
                  c instanceof b.WebGLBatch && b.WebGLRenderer.returnBatch(c),
                  void 0
               );
            if (
               this.batchs[e - 1] instanceof b.WebGLBatch &&
               this.batchs[e + 1] instanceof b.WebGLBatch &&
               this.batchs[e - 1].texture == this.batchs[e + 1].texture &&
               this.batchs[e - 1].blendMode == this.batchs[e + 1].blendMode
            )
               return (
                  this.batchs[e - 1].merge(this.batchs[e + 1]),
                  c instanceof b.WebGLBatch && b.WebGLRenderer.returnBatch(c),
                  b.WebGLRenderer.returnBatch(this.batchs[e + 1]),
                  this.batchs.splice(e, 2),
                  void 0
               );
            this.batchs.splice(e, 1),
               c instanceof b.WebGLBatch && b.WebGLRenderer.returnBatch(c);
         }
      }),
      (b.WebGLRenderGroup.prototype.initTilingSprite = function (a) {
         var b = this.gl;
         (a.verticies = new Float32Array([
            0,
            0,
            a.width,
            0,
            a.width,
            a.height,
            0,
            a.height,
         ])),
            (a.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])),
            (a.colors = new Float32Array([1, 1, 1, 1])),
            (a.indices = new Uint16Array([0, 1, 3, 2])),
            (a._vertexBuffer = b.createBuffer()),
            (a._indexBuffer = b.createBuffer()),
            (a._uvBuffer = b.createBuffer()),
            (a._colorBuffer = b.createBuffer()),
            b.bindBuffer(b.ARRAY_BUFFER, a._vertexBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.verticies, b.STATIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, a._uvBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.uvs, b.DYNAMIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, a._colorBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.colors, b.STATIC_DRAW),
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a._indexBuffer),
            b.bufferData(b.ELEMENT_ARRAY_BUFFER, a.indices, b.STATIC_DRAW),
            a.texture.baseTexture._glTexture
               ? (b.bindTexture(b.TEXTURE_2D, a.texture.baseTexture._glTexture),
                 b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT),
                 b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.REPEAT),
                 (a.texture.baseTexture._powerOf2 = !0))
               : (a.texture.baseTexture._powerOf2 = !0);
      }),
      (b.WebGLRenderGroup.prototype.renderStrip = function (a, c) {
         var d = this.gl;
         b.activateStripShader();
         var e = b.stripShader;
         e.program;
         var f = b.mat3.clone(a.worldTransform);
         b.mat3.transpose(f),
            d.uniformMatrix3fv(e.translationMatrix, !1, f),
            d.uniform2f(e.projectionVector, c.x, c.y),
            d.uniform2f(e.offsetVector, -b.offset.x, -b.offset.y),
            d.uniform1f(e.alpha, a.worldAlpha),
            a.dirty
               ? ((a.dirty = !1),
                 d.bindBuffer(d.ARRAY_BUFFER, a._vertexBuffer),
                 d.bufferData(d.ARRAY_BUFFER, a.verticies, d.STATIC_DRAW),
                 d.vertexAttribPointer(e.aVertexPosition, 2, d.FLOAT, !1, 0, 0),
                 d.bindBuffer(d.ARRAY_BUFFER, a._uvBuffer),
                 d.bufferData(d.ARRAY_BUFFER, a.uvs, d.STATIC_DRAW),
                 d.vertexAttribPointer(e.aTextureCoord, 2, d.FLOAT, !1, 0, 0),
                 d.activeTexture(d.TEXTURE0),
                 d.bindTexture(d.TEXTURE_2D, a.texture.baseTexture._glTexture),
                 d.bindBuffer(d.ARRAY_BUFFER, a._colorBuffer),
                 d.bufferData(d.ARRAY_BUFFER, a.colors, d.STATIC_DRAW),
                 d.vertexAttribPointer(e.colorAttribute, 1, d.FLOAT, !1, 0, 0),
                 d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, a._indexBuffer),
                 d.bufferData(d.ELEMENT_ARRAY_BUFFER, a.indices, d.STATIC_DRAW))
               : (d.bindBuffer(d.ARRAY_BUFFER, a._vertexBuffer),
                 d.bufferSubData(d.ARRAY_BUFFER, 0, a.verticies),
                 d.vertexAttribPointer(e.aVertexPosition, 2, d.FLOAT, !1, 0, 0),
                 d.bindBuffer(d.ARRAY_BUFFER, a._uvBuffer),
                 d.vertexAttribPointer(e.aTextureCoord, 2, d.FLOAT, !1, 0, 0),
                 d.activeTexture(d.TEXTURE0),
                 d.bindTexture(d.TEXTURE_2D, a.texture.baseTexture._glTexture),
                 d.bindBuffer(d.ARRAY_BUFFER, a._colorBuffer),
                 d.vertexAttribPointer(e.colorAttribute, 1, d.FLOAT, !1, 0, 0),
                 d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, a._indexBuffer)),
            d.drawElements(
               d.TRIANGLE_STRIP,
               a.indices.length,
               d.UNSIGNED_SHORT,
               0
            ),
            b.deactivateStripShader();
      }),
      (b.WebGLRenderGroup.prototype.renderTilingSprite = function (a, c) {
         var d = this.gl;
         b.shaderProgram;
         var e = a.tilePosition,
            f = a.tileScale,
            g = e.x / a.texture.baseTexture.width,
            h = e.y / a.texture.baseTexture.height,
            i = a.width / a.texture.baseTexture.width / f.x,
            j = a.height / a.texture.baseTexture.height / f.y;
         (a.uvs[0] = 0 - g),
            (a.uvs[1] = 0 - h),
            (a.uvs[2] = 1 * i - g),
            (a.uvs[3] = 0 - h),
            (a.uvs[4] = 1 * i - g),
            (a.uvs[5] = 1 * j - h),
            (a.uvs[6] = 0 - g),
            (a.uvs[7] = 1 * j - h),
            d.bindBuffer(d.ARRAY_BUFFER, a._uvBuffer),
            d.bufferSubData(d.ARRAY_BUFFER, 0, a.uvs),
            this.renderStrip(a, c);
      }),
      (b.WebGLRenderGroup.prototype.initStrip = function (a) {
         var b = this.gl;
         this.shaderProgram,
            (a._vertexBuffer = b.createBuffer()),
            (a._indexBuffer = b.createBuffer()),
            (a._uvBuffer = b.createBuffer()),
            (a._colorBuffer = b.createBuffer()),
            b.bindBuffer(b.ARRAY_BUFFER, a._vertexBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.verticies, b.DYNAMIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, a._uvBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.uvs, b.STATIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, a._colorBuffer),
            b.bufferData(b.ARRAY_BUFFER, a.colors, b.STATIC_DRAW),
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a._indexBuffer),
            b.bufferData(b.ELEMENT_ARRAY_BUFFER, a.indices, b.STATIC_DRAW);
      }),
      (b.initDefaultShaders = function () {
         (b.primitiveShader = new b.PrimitiveShader()),
            b.primitiveShader.init(),
            (b.stripShader = new b.StripShader()),
            b.stripShader.init(),
            (b.defaultShader = new b.PixiShader()),
            b.defaultShader.init();
         var a = b.gl,
            c = b.defaultShader.program;
         a.useProgram(c),
            a.enableVertexAttribArray(b.defaultShader.aVertexPosition),
            a.enableVertexAttribArray(b.defaultShader.colorAttribute),
            a.enableVertexAttribArray(b.defaultShader.aTextureCoord);
      }),
      (b.activatePrimitiveShader = function () {
         var a = b.gl;
         a.useProgram(b.primitiveShader.program),
            a.disableVertexAttribArray(b.defaultShader.aVertexPosition),
            a.disableVertexAttribArray(b.defaultShader.colorAttribute),
            a.disableVertexAttribArray(b.defaultShader.aTextureCoord),
            a.enableVertexAttribArray(b.primitiveShader.aVertexPosition),
            a.enableVertexAttribArray(b.primitiveShader.colorAttribute);
      }),
      (b.deactivatePrimitiveShader = function () {
         var a = b.gl;
         a.useProgram(b.defaultShader.program),
            a.disableVertexAttribArray(b.primitiveShader.aVertexPosition),
            a.disableVertexAttribArray(b.primitiveShader.colorAttribute),
            a.enableVertexAttribArray(b.defaultShader.aVertexPosition),
            a.enableVertexAttribArray(b.defaultShader.colorAttribute),
            a.enableVertexAttribArray(b.defaultShader.aTextureCoord);
      }),
      (b.activateStripShader = function () {
         var a = b.gl;
         a.useProgram(b.stripShader.program);
      }),
      (b.deactivateStripShader = function () {
         var a = b.gl;
         a.useProgram(b.defaultShader.program);
      }),
      (b.CompileVertexShader = function (a, c) {
         return b._CompileShader(a, c, a.VERTEX_SHADER);
      }),
      (b.CompileFragmentShader = function (a, c) {
         return b._CompileShader(a, c, a.FRAGMENT_SHADER);
      }),
      (b._CompileShader = function (a, b, c) {
         var d = b.join("\n"),
            e = a.createShader(c);
         return (
            a.shaderSource(e, d),
            a.compileShader(e),
            a.getShaderParameter(e, a.COMPILE_STATUS)
               ? e
               : (window.console.log(a.getShaderInfoLog(e)), null)
         );
      }),
      (b.compileProgram = function (a, c) {
         var d = b.gl,
            e = b.CompileFragmentShader(d, c),
            f = b.CompileVertexShader(d, a),
            g = d.createProgram();
         return (
            d.attachShader(g, f),
            d.attachShader(g, e),
            d.linkProgram(g),
            d.getProgramParameter(g, d.LINK_STATUS) ||
               window.console.log("Could not initialise shaders"),
            g
         );
      }),
      (b.BitmapText = function (a, c) {
         b.DisplayObjectContainer.call(this),
            this.setText(a),
            this.setStyle(c),
            this.updateText(),
            (this.dirty = !1);
      }),
      (b.BitmapText.prototype = Object.create(
         b.DisplayObjectContainer.prototype
      )),
      (b.BitmapText.prototype.constructor = b.BitmapText),
      (b.BitmapText.prototype.setText = function (a) {
         (this.text = a || " "), (this.dirty = !0);
      }),
      (b.BitmapText.prototype.setStyle = function (a) {
         (a = a || {}), (a.align = a.align || "left"), (this.style = a);
         var c = a.font.split(" ");
         (this.fontName = c[c.length - 1]),
            (this.fontSize =
               c.length >= 2
                  ? parseInt(c[c.length - 2], 10)
                  : b.BitmapText.fonts[this.fontName].size),
            (this.dirty = !0);
      }),
      (b.BitmapText.prototype.updateText = function () {
         for (
            var a = b.BitmapText.fonts[this.fontName],
               c = new b.Point(),
               d = null,
               e = [],
               f = 0,
               g = [],
               h = 0,
               i = this.fontSize / a.size,
               j = 0;
            j < this.text.length;
            j++
         ) {
            var k = this.text.charCodeAt(j);
            if (/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))
               g.push(c.x),
                  (f = Math.max(f, c.x)),
                  h++,
                  (c.x = 0),
                  (c.y += a.lineHeight),
                  (d = null);
            else {
               var l = a.chars[k];
               l &&
                  (d && l[d] && (c.x += l.kerning[d]),
                  e.push({
                     texture: l.texture,
                     line: h,
                     charCode: k,
                     position: new b.Point(c.x + l.xOffset, c.y + l.yOffset),
                  }),
                  (c.x += l.xAdvance),
                  (d = k));
            }
         }
         g.push(c.x), (f = Math.max(f, c.x));
         var m = [];
         for (j = 0; h >= j; j++) {
            var n = 0;
            "right" === this.style.align
               ? (n = f - g[j])
               : "center" === this.style.align && (n = (f - g[j]) / 2),
               m.push(n);
         }
         for (j = 0; j < e.length; j++) {
            var o = new b.Sprite(e[j].texture);
            (o.position.x = (e[j].position.x + m[e[j].line]) * i),
               (o.position.y = e[j].position.y * i),
               (o.scale.x = o.scale.y = i),
               this.addChild(o);
         }
         (this.width = f * i), (this.height = (c.y + a.lineHeight) * i);
      }),
      (b.BitmapText.prototype.updateTransform = function () {
         if (this.dirty) {
            for (; this.children.length > 0; )
               this.removeChild(this.getChildAt(0));
            this.updateText(), (this.dirty = !1);
         }
         b.DisplayObjectContainer.prototype.updateTransform.call(this);
      }),
      (b.BitmapText.fonts = {}),
      (b.Text = function (a, c) {
         (this.canvas = document.createElement("canvas")),
            (this.context = this.canvas.getContext("2d")),
            b.Sprite.call(this, b.Texture.fromCanvas(this.canvas)),
            this.setText(a),
            this.setStyle(c),
            this.updateText(),
            (this.dirty = !1);
      }),
      (b.Text.prototype = Object.create(b.Sprite.prototype)),
      (b.Text.prototype.constructor = b.Text),
      (b.Text.prototype.setStyle = function (a) {
         (a = a || {}),
            (a.font = a.font || "bold 20pt Arial"),
            (a.fill = a.fill || "black"),
            (a.align = a.align || "left"),
            (a.stroke = a.stroke || "black"),
            (a.strokeThickness = a.strokeThickness || 0),
            (a.wordWrap = a.wordWrap || !1),
            (a.wordWrapWidth = a.wordWrapWidth || 100),
            (this.style = a),
            (this.dirty = !0);
      }),
      (b.Text.prototype.setText = function (a) {
         (this.text = a.toString() || " "), (this.dirty = !0);
      }),
      (b.Text.prototype.updateText = function () {
         this.context.font = this.style.font;
         var a = this.text;
         this.style.wordWrap && (a = this.wordWrap(this.text));
         for (
            var c = a.split(/(?:\r\n|\r|\n)/), d = [], e = 0, f = 0;
            f < c.length;
            f++
         ) {
            var g = this.context.measureText(c[f]).width;
            (d[f] = g), (e = Math.max(e, g));
         }
         this.canvas.width = e + this.style.strokeThickness;
         var h =
            this.determineFontHeight("font: " + this.style.font + ";") +
            this.style.strokeThickness;
         for (
            this.canvas.height = h * c.length,
               this.context.fillStyle = this.style.fill,
               this.context.font = this.style.font,
               this.context.strokeStyle = this.style.stroke,
               this.context.lineWidth = this.style.strokeThickness,
               this.context.textBaseline = "top",
               f = 0;
            f < c.length;
            f++
         ) {
            var i = new b.Point(
               this.style.strokeThickness / 2,
               this.style.strokeThickness / 2 + f * h
            );
            "right" === this.style.align
               ? (i.x += e - d[f])
               : "center" === this.style.align && (i.x += (e - d[f]) / 2),
               this.style.stroke &&
                  this.style.strokeThickness &&
                  this.context.strokeText(c[f], i.x, i.y),
               this.style.fill && this.context.fillText(c[f], i.x, i.y);
         }
         this.updateTexture();
      }),
      (b.Text.prototype.updateTexture = function () {
         (this.texture.baseTexture.width = this.canvas.width),
            (this.texture.baseTexture.height = this.canvas.height),
            (this.texture.frame.width = this.canvas.width),
            (this.texture.frame.height = this.canvas.height),
            (this._width = this.canvas.width),
            (this._height = this.canvas.height),
            b.texturesToUpdate.push(this.texture.baseTexture);
      }),
      (b.Text.prototype.updateTransform = function () {
         this.dirty && (this.updateText(), (this.dirty = !1)),
            b.Sprite.prototype.updateTransform.call(this);
      }),
      (b.Text.prototype.determineFontHeight = function (a) {
         var c = b.Text.heightCache[a];
         if (!c) {
            var d = document.getElementsByTagName("body")[0],
               e = document.createElement("div"),
               f = document.createTextNode("M");
            e.appendChild(f),
               e.setAttribute("style", a + ";position:absolute;top:0;left:0"),
               d.appendChild(e),
               (c = e.offsetHeight),
               (b.Text.heightCache[a] = c),
               d.removeChild(e);
         }
         return c;
      }),
      (b.Text.prototype.wordWrap = function (a) {
         for (var b = "", c = a.split("\n"), d = 0; d < c.length; d++) {
            for (
               var e = this.style.wordWrapWidth, f = c[d].split(" "), g = 0;
               g < f.length;
               g++
            ) {
               var h = this.context.measureText(f[g]).width,
                  i = h + this.context.measureText(" ").width;
               i > e
                  ? (g > 0 && (b += "\n"),
                    (b += f[g] + " "),
                    (e = this.style.wordWrapWidth - h))
                  : ((e -= i), (b += f[g] + " "));
            }
            b += "\n";
         }
         return b;
      }),
      (b.Text.prototype.destroy = function (a) {
         a && this.texture.destroy();
      }),
      (b.Text.heightCache = {}),
      (b.BaseTextureCache = {}),
      (b.texturesToUpdate = []),
      (b.texturesToDestroy = []),
      (b.BaseTexture = function (a, c) {
         if (
            (b.EventTarget.call(this),
            (this.width = 100),
            (this.height = 100),
            (this.scaleMode = c || b.BaseTexture.SCALE_MODE.DEFAULT),
            (this.hasLoaded = !1),
            (this.source = a),
            a)
         ) {
            if (
               this.source instanceof Image ||
               this.source instanceof HTMLImageElement
            )
               if (this.source.complete)
                  (this.hasLoaded = !0),
                     (this.width = this.source.width),
                     (this.height = this.source.height),
                     b.texturesToUpdate.push(this);
               else {
                  var d = this;
                  this.source.onload = function () {
                     (d.hasLoaded = !0),
                        (d.width = d.source.width),
                        (d.height = d.source.height),
                        b.texturesToUpdate.push(d),
                        d.dispatchEvent({ type: "loaded", content: d });
                  };
               }
            else
               (this.hasLoaded = !0),
                  (this.width = this.source.width),
                  (this.height = this.source.height),
                  b.texturesToUpdate.push(this);
            (this.imageUrl = null), (this._powerOf2 = !1);
         }
      }),
      (b.BaseTexture.prototype.constructor = b.BaseTexture),
      (b.BaseTexture.prototype.destroy = function () {
         this.source instanceof Image &&
            (this.imageUrl in b.BaseTextureCache &&
               delete b.BaseTextureCache[this.imageUrl],
            (this.imageUrl = null),
            (this.source.src = null)),
            (this.source = null),
            b.texturesToDestroy.push(this);
      }),
      (b.BaseTexture.prototype.updateSourceImage = function (a) {
         (this.hasLoaded = !1), (this.source.src = null), (this.source.src = a);
      }),
      (b.BaseTexture.fromImage = function (a, c, d) {
         var e = b.BaseTextureCache[a];
         if (!e) {
            var f = new Image();
            c && (f.crossOrigin = ""),
               (f.src = a),
               (e = new b.BaseTexture(f, d)),
               (e.imageUrl = a),
               (b.BaseTextureCache[a] = e);
         }
         return e;
      }),
      (b.BaseTexture.SCALE_MODE = { DEFAULT: 0, LINEAR: 0, NEAREST: 1 }),
      (b.TextureCache = {}),
      (b.FrameCache = {}),
      (b.Texture = function (a, c) {
         if (
            (b.EventTarget.call(this),
            c || ((this.noFrame = !0), (c = new b.Rectangle(0, 0, 1, 1))),
            a instanceof b.Texture && (a = a.baseTexture),
            (this.baseTexture = a),
            (this.frame = c),
            (this.trim = new b.Point()),
            (this.scope = this),
            a.hasLoaded)
         )
            this.noFrame && (c = new b.Rectangle(0, 0, a.width, a.height)),
               this.setFrame(c);
         else {
            var d = this;
            a.addEventListener("loaded", function () {
               d.onBaseTextureLoaded();
            });
         }
      }),
      (b.Texture.prototype.constructor = b.Texture),
      (b.Texture.prototype.onBaseTextureLoaded = function () {
         var a = this.baseTexture;
         a.removeEventListener("loaded", this.onLoaded),
            this.noFrame &&
               (this.frame = new b.Rectangle(0, 0, a.width, a.height)),
            (this.noFrame = !1),
            (this.width = this.frame.width),
            (this.height = this.frame.height),
            this.scope.dispatchEvent({ type: "update", content: this });
      }),
      (b.Texture.prototype.destroy = function (a) {
         a && this.baseTexture.destroy();
      }),
      (b.Texture.prototype.setFrame = function (a) {
         if (
            ((this.frame = a),
            (this.width = a.width),
            (this.height = a.height),
            a.x + a.width > this.baseTexture.width ||
               a.y + a.height > this.baseTexture.height)
         )
            throw new Error(
               "Texture Error: frame does not fit inside the base Texture dimensions " +
                  this
            );
         (this.updateFrame = !0), b.Texture.frameUpdates.push(this);
      }),
      (b.Texture.fromImage = function (a, c, d) {
         var e = b.TextureCache[a];
         return (
            e ||
               ((e = new b.Texture(b.BaseTexture.fromImage(a, c, d))),
               (b.TextureCache[a] = e)),
            e
         );
      }),
      (b.Texture.fromFrame = function (a) {
         var c = b.TextureCache[a];
         if (!c)
            throw new Error(
               'The frameId "' +
                  a +
                  '" does not exist in the texture cache ' +
                  this
            );
         return c;
      }),
      (b.Texture.fromCanvas = function (a, c) {
         var d = new b.BaseTexture(a, c);
         return new b.Texture(d);
      }),
      (b.Texture.addTextureToCache = function (a, c) {
         b.TextureCache[c] = a;
      }),
      (b.Texture.removeTextureFromCache = function (a) {
         var c = b.TextureCache[a];
         return (b.TextureCache[a] = null), c;
      }),
      (b.Texture.frameUpdates = []),
      (b.Texture.SCALE_MODE = b.BaseTexture.SCALE_MODE),
      (b.RenderTexture = function (a, c) {
         b.EventTarget.call(this),
            (this.width = a || 100),
            (this.height = c || 100),
            (this.indetityMatrix = b.mat3.create()),
            (this.frame = new b.Rectangle(0, 0, this.width, this.height)),
            b.gl ? this.initWebGL() : this.initCanvas();
      }),
      (b.RenderTexture.prototype = Object.create(b.Texture.prototype)),
      (b.RenderTexture.prototype.constructor = b.RenderTexture),
      (b.RenderTexture.prototype.initWebGL = function () {
         var a = b.gl;
         (this.glFramebuffer = a.createFramebuffer()),
            a.bindFramebuffer(a.FRAMEBUFFER, this.glFramebuffer),
            (this.glFramebuffer.width = this.width),
            (this.glFramebuffer.height = this.height),
            (this.baseTexture = new b.BaseTexture()),
            (this.baseTexture.width = this.width),
            (this.baseTexture.height = this.height),
            (this.baseTexture._glTexture = a.createTexture()),
            a.bindTexture(a.TEXTURE_2D, this.baseTexture._glTexture),
            a.texImage2D(
               a.TEXTURE_2D,
               0,
               a.RGBA,
               this.width,
               this.height,
               0,
               a.RGBA,
               a.UNSIGNED_BYTE,
               null
            ),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
            (this.baseTexture.isRender = !0),
            a.bindFramebuffer(a.FRAMEBUFFER, this.glFramebuffer),
            a.framebufferTexture2D(
               a.FRAMEBUFFER,
               a.COLOR_ATTACHMENT0,
               a.TEXTURE_2D,
               this.baseTexture._glTexture,
               0
            ),
            (this.projection = new b.Point(this.width / 2, -this.height / 2)),
            (this.render = this.renderWebGL);
      }),
      (b.RenderTexture.prototype.resize = function (a, c) {
         if (((this.width = a), (this.height = c), b.gl)) {
            (this.projection.x = this.width / 2),
               (this.projection.y = -this.height / 2);
            var d = b.gl;
            d.bindTexture(d.TEXTURE_2D, this.baseTexture._glTexture),
               d.texImage2D(
                  d.TEXTURE_2D,
                  0,
                  d.RGBA,
                  this.width,
                  this.height,
                  0,
                  d.RGBA,
                  d.UNSIGNED_BYTE,
                  null
               );
         } else
            (this.frame.width = this.width),
               (this.frame.height = this.height),
               this.renderer.resize(this.width, this.height);
      }),
      (b.RenderTexture.prototype.initCanvas = function () {
         (this.renderer = new b.CanvasRenderer(
            this.width,
            this.height,
            null,
            0
         )),
            (this.baseTexture = new b.BaseTexture(this.renderer.view)),
            (this.frame = new b.Rectangle(0, 0, this.width, this.height)),
            (this.render = this.renderCanvas);
      }),
      (b.RenderTexture.prototype.renderWebGL = function (a, c, d) {
         var e = b.gl;
         e.colorMask(!0, !0, !0, !0),
            e.viewport(0, 0, this.width, this.height),
            e.bindFramebuffer(e.FRAMEBUFFER, this.glFramebuffer),
            d && (e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT));
         var f = a.children,
            g = a.worldTransform;
         (a.worldTransform = b.mat3.create()),
            (a.worldTransform[4] = -1),
            (a.worldTransform[5] = -2 * this.projection.y),
            c && ((a.worldTransform[2] = c.x), (a.worldTransform[5] -= c.y)),
            b.visibleCount++,
            (a.vcount = b.visibleCount);
         for (var h = 0, i = f.length; i > h; h++) f[h].updateTransform();
         var j = a.__renderGroup;
         j
            ? a === j.root
               ? j.render(this.projection, this.glFramebuffer)
               : j.renderSpecific(a, this.projection, this.glFramebuffer)
            : (this.renderGroup ||
                 (this.renderGroup = new b.WebGLRenderGroup(e)),
              this.renderGroup.setRenderable(a),
              this.renderGroup.render(this.projection, this.glFramebuffer)),
            (a.worldTransform = g);
      }),
      (b.RenderTexture.prototype.renderCanvas = function (a, c, d) {
         var e = a.children;
         (a.worldTransform = b.mat3.create()),
            c && ((a.worldTransform[2] = c.x), (a.worldTransform[5] = c.y));
         for (var f = 0, g = e.length; g > f; f++) e[f].updateTransform();
         d && this.renderer.context.clearRect(0, 0, this.width, this.height),
            this.renderer.renderDisplayObject(a),
            this.renderer.context.setTransform(1, 0, 0, 1, 0, 0);
      }),
      (b.EventTarget = function () {
         var a = {};
         (this.addEventListener = this.on =
            function (b, c) {
               void 0 === a[b] && (a[b] = []),
                  -1 === a[b].indexOf(c) && a[b].push(c);
            }),
            (this.dispatchEvent = this.emit =
               function (b) {
                  if (a[b.type] && a[b.type].length)
                     for (var c = 0, d = a[b.type].length; d > c; c++)
                        a[b.type][c](b);
               }),
            (this.removeEventListener = this.off =
               function (b, c) {
                  var d = a[b].indexOf(c);
                  -1 !== d && a[b].splice(d, 1);
               }),
            (this.removeAllEventListeners = function (b) {
               var c = a[b];
               c && (c.length = 0);
            });
      }),
      (b.PolyK = {}),
      (b.PolyK.Triangulate = function (a) {
         var c = !0,
            d = a.length >> 1;
         if (3 > d) return [];
         for (var e = [], f = [], g = 0; d > g; g++) f.push(g);
         g = 0;
         for (var h = d; h > 3; ) {
            var i = f[(g + 0) % h],
               j = f[(g + 1) % h],
               k = f[(g + 2) % h],
               l = a[2 * i],
               m = a[2 * i + 1],
               n = a[2 * j],
               o = a[2 * j + 1],
               p = a[2 * k],
               q = a[2 * k + 1],
               r = !1;
            if (b.PolyK._convex(l, m, n, o, p, q, c)) {
               r = !0;
               for (var s = 0; h > s; s++) {
                  var t = f[s];
                  if (
                     t !== i &&
                     t !== j &&
                     t !== k &&
                     b.PolyK._PointInTriangle(
                        a[2 * t],
                        a[2 * t + 1],
                        l,
                        m,
                        n,
                        o,
                        p,
                        q
                     )
                  ) {
                     r = !1;
                     break;
                  }
               }
            }
            if (r) e.push(i, j, k), f.splice((g + 1) % h, 1), h--, (g = 0);
            else if (g++ > 3 * h) {
               if (!c)
                  return (
                     window.console.log(
                        "PIXI Warning: shape too complex to fill"
                     ),
                     []
                  );
               for (e = [], f = [], g = 0; d > g; g++) f.push(g);
               (g = 0), (h = d), (c = !1);
            }
         }
         return e.push(f[0], f[1], f[2]), e;
      }),
      (b.PolyK._PointInTriangle = function (a, b, c, d, e, f, g, h) {
         var i = g - c,
            j = h - d,
            k = e - c,
            l = f - d,
            m = a - c,
            n = b - d,
            o = i * i + j * j,
            p = i * k + j * l,
            q = i * m + j * n,
            r = k * k + l * l,
            s = k * m + l * n,
            t = 1 / (o * r - p * p),
            u = (r * q - p * s) * t,
            v = (o * s - p * q) * t;
         return u >= 0 && v >= 0 && 1 > u + v;
      }),
      (b.PolyK._convex = function (a, b, c, d, e, f, g) {
         return (b - d) * (e - c) + (c - a) * (f - d) >= 0 === g;
      }),
      (c.Camera = function (a, b, d, e, f, g) {
         (this.game = a),
            (this.world = a.world),
            (this.id = 0),
            (this.view = new c.Rectangle(d, e, f, g)),
            (this.screenView = new c.Rectangle(d, e, f, g)),
            (this.bounds = new c.Rectangle(d, e, f, g)),
            (this.deadzone = null),
            (this.visible = !0),
            (this.atLimit = { x: !1, y: !1 }),
            (this.target = null),
            (this._edge = 0),
            (this.displayObject = null);
      }),
      (c.Camera.FOLLOW_LOCKON = 0),
      (c.Camera.FOLLOW_PLATFORMER = 1),
      (c.Camera.FOLLOW_TOPDOWN = 2),
      (c.Camera.FOLLOW_TOPDOWN_TIGHT = 3),
      (c.Camera.prototype = {
         follow: function (a, b) {
            "undefined" == typeof b && (b = c.Camera.FOLLOW_LOCKON),
               (this.target = a);
            var d;
            switch (b) {
               case c.Camera.FOLLOW_PLATFORMER:
                  var e = this.width / 8,
                     f = this.height / 3;
                  this.deadzone = new c.Rectangle(
                     (this.width - e) / 2,
                     (this.height - f) / 2 - 0.25 * f,
                     e,
                     f
                  );
                  break;
               case c.Camera.FOLLOW_TOPDOWN:
                  (d = Math.max(this.width, this.height) / 4),
                     (this.deadzone = new c.Rectangle(
                        (this.width - d) / 2,
                        (this.height - d) / 2,
                        d,
                        d
                     ));
                  break;
               case c.Camera.FOLLOW_TOPDOWN_TIGHT:
                  (d = Math.max(this.width, this.height) / 8),
                     (this.deadzone = new c.Rectangle(
                        (this.width - d) / 2,
                        (this.height - d) / 2,
                        d,
                        d
                     ));
                  break;
               case c.Camera.FOLLOW_LOCKON:
                  this.deadzone = null;
                  break;
               default:
                  this.deadzone = null;
            }
         },
         focusOn: function (a) {
            this.setPosition(
               Math.round(a.x - this.view.halfWidth),
               Math.round(a.y - this.view.halfHeight)
            );
         },
         focusOnXY: function (a, b) {
            this.setPosition(
               Math.round(a - this.view.halfWidth),
               Math.round(b - this.view.halfHeight)
            );
         },
         update: function () {
            this.target && this.updateTarget(),
               this.bounds && this.checkBounds(),
               (this.displayObject.position.x = -this.view.x),
               (this.displayObject.position.y = -this.view.y);
         },
         updateTarget: function () {
            this.deadzone
               ? ((this._edge = this.target.x - this.deadzone.x),
                 this.view.x > this._edge && (this.view.x = this._edge),
                 (this._edge =
                    this.target.x +
                    this.target.width -
                    this.deadzone.x -
                    this.deadzone.width),
                 this.view.x < this._edge && (this.view.x = this._edge),
                 (this._edge = this.target.y - this.deadzone.y),
                 this.view.y > this._edge && (this.view.y = this._edge),
                 (this._edge =
                    this.target.y +
                    this.target.height -
                    this.deadzone.y -
                    this.deadzone.height),
                 this.view.y < this._edge && (this.view.y = this._edge))
               : this.focusOnXY(this.target.x, this.target.y);
         },
         setBoundsToWorld: function () {
            this.bounds.setTo(
               this.game.world.bounds.x,
               this.game.world.bounds.y,
               this.game.world.bounds.width,
               this.game.world.bounds.height
            );
         },
         checkBounds: function () {
            (this.atLimit.x = !1),
               (this.atLimit.y = !1),
               this.view.x < this.bounds.x &&
                  ((this.atLimit.x = !0), (this.view.x = this.bounds.x)),
               this.view.right > this.bounds.right &&
                  ((this.atLimit.x = !0),
                  (this.view.x = this.bounds.right - this.width)),
               this.view.y < this.bounds.top &&
                  ((this.atLimit.y = !0), (this.view.y = this.bounds.top)),
               this.view.bottom > this.bounds.bottom &&
                  ((this.atLimit.y = !0),
                  (this.view.y = this.bounds.bottom - this.height)),
               this.view.floor();
         },
         setPosition: function (a, b) {
            (this.view.x = a),
               (this.view.y = b),
               this.bounds && this.checkBounds();
         },
         setSize: function (a, b) {
            (this.view.width = a), (this.view.height = b);
         },
      }),
      (c.Camera.prototype.constructor = c.Camera),
      Object.defineProperty(c.Camera.prototype, "x", {
         get: function () {
            return this.view.x;
         },
         set: function (a) {
            (this.view.x = a), this.bounds && this.checkBounds();
         },
      }),
      Object.defineProperty(c.Camera.prototype, "y", {
         get: function () {
            return this.view.y;
         },
         set: function (a) {
            (this.view.y = a), this.bounds && this.checkBounds();
         },
      }),
      Object.defineProperty(c.Camera.prototype, "width", {
         get: function () {
            return this.view.width;
         },
         set: function (a) {
            this.view.width = a;
         },
      }),
      Object.defineProperty(c.Camera.prototype, "height", {
         get: function () {
            return this.view.height;
         },
         set: function (a) {
            this.view.height = a;
         },
      }),
      (c.State = function () {
         (this.game = null),
            (this.add = null),
            (this.camera = null),
            (this.cache = null),
            (this.input = null),
            (this.load = null),
            (this.math = null),
            (this.sound = null),
            (this.stage = null),
            (this.time = null),
            (this.tweens = null),
            (this.world = null),
            (this.particles = null),
            (this.physics = null);
      }),
      (c.State.prototype = {
         preload: function () {},
         loadUpdate: function () {},
         loadRender: function () {},
         create: function () {},
         update: function () {},
         render: function () {},
         paused: function () {},
         destroy: function () {},
      }),
      (c.State.prototype.constructor = c.State),
      (c.StateManager = function (a, b) {
         (this.game = a),
            (this.states = {}),
            (this._pendingState = null),
            "undefined" != typeof b && null !== b && (this._pendingState = b),
            (this._created = !1),
            (this.current = ""),
            (this.onInitCallback = null),
            (this.onPreloadCallback = null),
            (this.onCreateCallback = null),
            (this.onUpdateCallback = null),
            (this.onRenderCallback = null),
            (this.onPreRenderCallback = null),
            (this.onLoadUpdateCallback = null),
            (this.onLoadRenderCallback = null),
            (this.onPausedCallback = null),
            (this.onShutDownCallback = null);
      }),
      (c.StateManager.prototype = {
         boot: function () {
            this.game.onPause.add(this.pause, this),
               this.game.onResume.add(this.resume, this),
               null !== this._pendingState &&
                  ("string" == typeof this._pendingState
                     ? this.start(this._pendingState, !1, !1)
                     : this.add("default", this._pendingState, !0));
         },
         add: function (a, b, d) {
            "undefined" == typeof d && (d = !1);
            var e;
            return (
               b instanceof c.State
                  ? (e = b)
                  : "object" == typeof b
                  ? ((e = b), (e.game = this.game))
                  : "function" == typeof b && (e = new b(this.game)),
               (this.states[a] = e),
               d &&
                  (this.game.isBooted
                     ? this.start(a)
                     : (this._pendingState = a)),
               e
            );
         },
         remove: function (a) {
            this.current == a &&
               ((this.callbackContext = null),
               (this.onInitCallback = null),
               (this.onShutDownCallback = null),
               (this.onPreloadCallback = null),
               (this.onLoadRenderCallback = null),
               (this.onLoadUpdateCallback = null),
               (this.onCreateCallback = null),
               (this.onUpdateCallback = null),
               (this.onRenderCallback = null),
               (this.onPausedCallback = null),
               (this.onDestroyCallback = null)),
               delete this.states[a];
         },
         start: function (a, b, c) {
            return (
               "undefined" == typeof b && (b = !0),
               "undefined" == typeof c && (c = !1),
               this.game.isBooted === !1
                  ? ((this._pendingState = a), void 0)
                  : (this.checkState(a) !== !1 &&
                       (this.current &&
                          this.onShutDownCallback.call(
                             this.callbackContext,
                             this.game
                          ),
                       b &&
                          (this.game.tweens.removeAll(),
                          this.game.world.destroy(),
                          c === !0 && this.game.cache.destroy()),
                       this.setCurrentState(a),
                       this.onPreloadCallback
                          ? (this.game.load.reset(),
                            this.onPreloadCallback.call(
                               this.callbackContext,
                               this.game
                            ),
                            0 === this.game.load.totalQueuedFiles()
                               ? this.game.loadComplete()
                               : this.game.load.start())
                          : this.game.loadComplete()),
                    void 0)
            );
         },
         dummy: function () {},
         checkState: function (a) {
            if (this.states[a]) {
               var b = !1;
               return (
                  this.states[a].preload && (b = !0),
                  b === !1 && this.states[a].loadRender && (b = !0),
                  b === !1 && this.states[a].loadUpdate && (b = !0),
                  b === !1 && this.states[a].create && (b = !0),
                  b === !1 && this.states[a].update && (b = !0),
                  b === !1 && this.states[a].preRender && (b = !0),
                  b === !1 && this.states[a].render && (b = !0),
                  b === !1 && this.states[a].paused && (b = !0),
                  b === !1
                     ? (console.warn(
                          "Invalid Phaser State object given. Must contain at least a one of the required functions."
                       ),
                       !1)
                     : !0
               );
            }
            return (
               console.warn(
                  "Phaser.StateManager - No state found with the key: " + a
               ),
               !1
            );
         },
         link: function (a) {
            (this.states[a].game = this.game),
               (this.states[a].add = this.game.add),
               (this.states[a].camera = this.game.camera),
               (this.states[a].cache = this.game.cache),
               (this.states[a].input = this.game.input),
               (this.states[a].load = this.game.load),
               (this.states[a].math = this.game.math),
               (this.states[a].sound = this.game.sound),
               (this.states[a].stage = this.game.stage),
               (this.states[a].time = this.game.time),
               (this.states[a].tweens = this.game.tweens),
               (this.states[a].world = this.game.world),
               (this.states[a].particles = this.game.particles),
               (this.states[a].physics = this.game.physics),
               (this.states[a].rnd = this.game.rnd);
         },
         setCurrentState: function (a) {
            (this.callbackContext = this.states[a]),
               this.link(a),
               (this.onInitCallback = this.states[a].init || this.dummy),
               (this.onPreloadCallback = this.states[a].preload || null),
               (this.onLoadRenderCallback = this.states[a].loadRender || null),
               (this.onLoadUpdateCallback = this.states[a].loadUpdate || null),
               (this.onCreateCallback = this.states[a].create || null),
               (this.onUpdateCallback = this.states[a].update || null),
               (this.onPreRenderCallback = this.states[a].preRender || null),
               (this.onRenderCallback = this.states[a].render || null),
               (this.onPausedCallback = this.states[a].paused || null),
               (this.onShutDownCallback =
                  this.states[a].shutdown || this.dummy),
               (this.current = a),
               (this._created = !1),
               this.onInitCallback.call(this.callbackContext, this.game);
         },
         getCurrentState: function () {
            return this.states[this.current];
         },
         loadComplete: function () {
            this._created === !1 && this.onCreateCallback
               ? ((this._created = !0),
                 this.onCreateCallback.call(this.callbackContext, this.game))
               : (this._created = !0);
         },
         pause: function () {
            this._created &&
               this.onPausedCallback &&
               this.onPausedCallback.call(this.callbackContext, this.game, !0);
         },
         resume: function () {
            this._created &&
               this.onre &&
               this.onPausedCallback.call(this.callbackContext, this.game, !1);
         },
         update: function () {
            this._created && this.onUpdateCallback
               ? this.onUpdateCallback.call(this.callbackContext, this.game)
               : this.onLoadUpdateCallback &&
                 this.onLoadUpdateCallback.call(
                    this.callbackContext,
                    this.game
                 );
         },
         preRender: function () {
            this.onPreRenderCallback &&
               this.onPreRenderCallback.call(this.callbackContext, this.game);
         },
         render: function () {
            this._created && this.onRenderCallback
               ? (this.game.renderType === c.CANVAS &&
                    (this.game.context.save(),
                    this.game.context.setTransform(1, 0, 0, 1, 0, 0)),
                 this.onRenderCallback.call(this.callbackContext, this.game),
                 this.game.renderType === c.CANVAS &&
                    this.game.context.restore())
               : this.onLoadRenderCallback &&
                 this.onLoadRenderCallback.call(
                    this.callbackContext,
                    this.game
                 );
         },
         destroy: function () {
            (this.callbackContext = null),
               (this.onInitCallback = null),
               (this.onShutDownCallback = null),
               (this.onPreloadCallback = null),
               (this.onLoadRenderCallback = null),
               (this.onLoadUpdateCallback = null),
               (this.onCreateCallback = null),
               (this.onUpdateCallback = null),
               (this.onRenderCallback = null),
               (this.onPausedCallback = null),
               (this.onDestroyCallback = null),
               (this.game = null),
               (this.states = {}),
               (this._pendingState = null);
         },
      }),
      (c.StateManager.prototype.constructor = c.StateManager),
      (c.LinkedList = function () {
         (this.next = null),
            (this.prev = null),
            (this.first = null),
            (this.last = null),
            (this.total = 0);
      }),
      (c.LinkedList.prototype = {
         add: function (a) {
            return 0 === this.total && null == this.first && null == this.last
               ? ((this.first = a),
                 (this.last = a),
                 (this.next = a),
                 (a.prev = this),
                 this.total++,
                 a)
               : ((this.last.next = a),
                 (a.prev = this.last),
                 (this.last = a),
                 this.total++,
                 a);
         },
         remove: function (a) {
            a == this.first
               ? (this.first = this.first.next)
               : a == this.last && (this.last = this.last.prev),
               a.prev && (a.prev.next = a.next),
               a.next && (a.next.prev = a.prev),
               (a.next = a.prev = null),
               null == this.first && (this.last = null),
               this.total--;
         },
         callAll: function (a) {
            if (this.first && this.last) {
               var b = this.first;
               do {
                  b && b[a] && b[a].call(b), (b = b.next);
               } while (b != this.last.next);
            }
         },
      }),
      (c.LinkedList.prototype.constructor = c.LinkedList),
      (c.Signal = function () {
         (this._bindings = []), (this._prevParams = null);
         var a = this;
         this.dispatch = function () {
            c.Signal.prototype.dispatch.apply(a, arguments);
         };
      }),
      (c.Signal.prototype = {
         memorize: !1,
         _shouldPropagate: !0,
         active: !0,
         validateListener: function (a, b) {
            if ("function" != typeof a)
               throw new Error(
                  "listener is a required param of {fn}() and should be a Function.".replace(
                     "{fn}",
                     b
                  )
               );
         },
         _registerListener: function (a, b, d, e) {
            var f,
               g = this._indexOfListener(a, d);
            if (-1 !== g) {
               if (((f = this._bindings[g]), f.isOnce() !== b))
                  throw new Error(
                     "You cannot add" +
                        (b ? "" : "Once") +
                        "() then add" +
                        (b ? "Once" : "") +
                        "() the same listener without removing the relationship first."
                  );
            } else
               (f = new c.SignalBinding(this, a, b, d, e)), this._addBinding(f);
            return (
               this.memorize && this._prevParams && f.execute(this._prevParams),
               f
            );
         },
         _addBinding: function (a) {
            var b = this._bindings.length;
            do {
               --b;
            } while (
               this._bindings[b] &&
               a._priority <= this._bindings[b]._priority
            );
            this._bindings.splice(b + 1, 0, a);
         },
         _indexOfListener: function (a, b) {
            for (var c, d = this._bindings.length; d--; )
               if (
                  ((c = this._bindings[d]),
                  c._listener === a && c.context === b)
               )
                  return d;
            return -1;
         },
         has: function (a, b) {
            return -1 !== this._indexOfListener(a, b);
         },
         add: function (a, b, c) {
            return (
               this.validateListener(a, "add"),
               this._registerListener(a, !1, b, c)
            );
         },
         addOnce: function (a, b, c) {
            return (
               this.validateListener(a, "addOnce"),
               this._registerListener(a, !0, b, c)
            );
         },
         remove: function (a, b) {
            this.validateListener(a, "remove");
            var c = this._indexOfListener(a, b);
            return (
               -1 !== c &&
                  (this._bindings[c]._destroy(), this._bindings.splice(c, 1)),
               a
            );
         },
         removeAll: function () {
            for (var a = this._bindings.length; a--; )
               this._bindings[a]._destroy();
            this._bindings.length = 0;
         },
         getNumListeners: function () {
            return this._bindings.length;
         },
         halt: function () {
            this._shouldPropagate = !1;
         },
         dispatch: function () {
            if (this.active) {
               var a,
                  b = Array.prototype.slice.call(arguments),
                  c = this._bindings.length;
               if ((this.memorize && (this._prevParams = b), c)) {
                  (a = this._bindings.slice()), (this._shouldPropagate = !0);
                  do {
                     c--;
                  } while (
                     a[c] &&
                     this._shouldPropagate &&
                     a[c].execute(b) !== !1
                  );
               }
            }
         },
         forget: function () {
            this._prevParams = null;
         },
         dispose: function () {
            this.removeAll(), delete this._bindings, delete this._prevParams;
         },
         toString: function () {
            return (
               "[Phaser.Signal active:" +
               this.active +
               " numListeners:" +
               this.getNumListeners() +
               "]"
            );
         },
      }),
      (c.Signal.prototype.constructor = c.Signal),
      (c.SignalBinding = function (a, b, c, d, e) {
         (this._listener = b),
            (this._isOnce = c),
            (this.context = d),
            (this._signal = a),
            (this._priority = e || 0);
      }),
      (c.SignalBinding.prototype = {
         active: !0,
         params: null,
         execute: function (a) {
            var b, c;
            return (
               this.active &&
                  this._listener &&
                  ((c = this.params ? this.params.concat(a) : a),
                  (b = this._listener.apply(this.context, c)),
                  this._isOnce && this.detach()),
               b
            );
         },
         detach: function () {
            return this.isBound()
               ? this._signal.remove(this._listener, this.context)
               : null;
         },
         isBound: function () {
            return !!this._signal && !!this._listener;
         },
         isOnce: function () {
            return this._isOnce;
         },
         getListener: function () {
            return this._listener;
         },
         getSignal: function () {
            return this._signal;
         },
         _destroy: function () {
            delete this._signal, delete this._listener, delete this.context;
         },
         toString: function () {
            return (
               "[Phaser.SignalBinding isOnce:" +
               this._isOnce +
               ", isBound:" +
               this.isBound() +
               ", active:" +
               this.active +
               "]"
            );
         },
      }),
      (c.SignalBinding.prototype.constructor = c.SignalBinding),
      (c.Filter = function (a, b, d) {
         (this.game = a),
            (this.type = c.WEBGL_FILTER),
            (this.passes = [this]),
            (this.dirty = !0),
            (this.padding = 0),
            (this.uniforms = {
               time: { type: "1f", value: 0 },
               resolution: { type: "2f", value: { x: 256, y: 256 } },
               mouse: { type: "2f", value: { x: 0, y: 0 } },
            }),
            (this.fragmentSrc = d || []);
      }),
      (c.Filter.prototype = {
         init: function () {},
         setResolution: function (a, b) {
            (this.uniforms.resolution.value.x = a),
               (this.uniforms.resolution.value.y = b);
         },
         update: function (a) {
            "undefined" != typeof a &&
               (a.x > 0 && (this.uniforms.mouse.x = a.x.toFixed(2)),
               a.y > 0 && (this.uniforms.mouse.y = a.y.toFixed(2))),
               (this.uniforms.time.value =
                  this.game.time.totalElapsedSeconds());
         },
         destroy: function () {
            this.game = null;
         },
      }),
      (c.Filter.prototype.constructor = c.Filter),
      Object.defineProperty(c.Filter.prototype, "width", {
         get: function () {
            return this.uniforms.resolution.value.x;
         },
         set: function (a) {
            this.uniforms.resolution.value.x = a;
         },
      }),
      Object.defineProperty(c.Filter.prototype, "height", {
         get: function () {
            return this.uniforms.resolution.value.y;
         },
         set: function (a) {
            this.uniforms.resolution.value.y = a;
         },
      }),
      (c.Plugin = function (a, b) {
         "undefined" == typeof b && (b = null),
            (this.game = a),
            (this.parent = b),
            (this.active = !1),
            (this.visible = !1),
            (this.hasPreUpdate = !1),
            (this.hasUpdate = !1),
            (this.hasPostUpdate = !1),
            (this.hasRender = !1),
            (this.hasPostRender = !1);
      }),
      (c.Plugin.prototype = {
         preUpdate: function () {},
         update: function () {},
         render: function () {},
         postRender: function () {},
         destroy: function () {
            (this.game = null),
               (this.parent = null),
               (this.active = !1),
               (this.visible = !1);
         },
      }),
      (c.Plugin.prototype.constructor = c.Plugin),
      (c.PluginManager = function (a, b) {
         (this.game = a),
            (this._parent = b),
            (this.plugins = []),
            (this._pluginsLength = 0);
      }),
      (c.PluginManager.prototype = {
         add: function (a) {
            var b = !1;
            return (
               "function" == typeof a
                  ? (a = new a(this.game, this._parent))
                  : ((a.game = this.game), (a.parent = this._parent)),
               "function" == typeof a.preUpdate &&
                  ((a.hasPreUpdate = !0), (b = !0)),
               "function" == typeof a.update && ((a.hasUpdate = !0), (b = !0)),
               "function" == typeof a.postUpdate &&
                  ((a.hasPostUpdate = !0), (b = !0)),
               "function" == typeof a.render && ((a.hasRender = !0), (b = !0)),
               "function" == typeof a.postRender &&
                  ((a.hasPostRender = !0), (b = !0)),
               b
                  ? ((a.hasPreUpdate || a.hasUpdate || a.hasPostUpdate) &&
                       (a.active = !0),
                    (a.hasRender || a.hasPostRender) && (a.visible = !0),
                    (this._pluginsLength = this.plugins.push(a)),
                    "function" == typeof a.init && a.init(),
                    a)
                  : null
            );
         },
         remove: function (a) {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  if (this.plugins[this._p] === a)
                     return (
                        a.destroy(),
                        this.plugins.splice(this._p, 1),
                        this._pluginsLength--,
                        void 0
                     );
         },
         removeAll: function () {
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
               this.plugins[this._p].destroy();
            (this.plugins.length = 0), (this._pluginsLength = 0);
         },
         preUpdate: function () {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  this.plugins[this._p].active &&
                     this.plugins[this._p].hasPreUpdate &&
                     this.plugins[this._p].preUpdate();
         },
         update: function () {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  this.plugins[this._p].active &&
                     this.plugins[this._p].hasUpdate &&
                     this.plugins[this._p].update();
         },
         postUpdate: function () {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  this.plugins[this._p].active &&
                     this.plugins[this._p].hasPostUpdate &&
                     this.plugins[this._p].postUpdate();
         },
         render: function () {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  this.plugins[this._p].visible &&
                     this.plugins[this._p].hasRender &&
                     this.plugins[this._p].render();
         },
         postRender: function () {
            if (0 !== this._pluginsLength)
               for (this._p = 0; this._p < this._pluginsLength; this._p++)
                  this.plugins[this._p].visible &&
                     this.plugins[this._p].hasPostRender &&
                     this.plugins[this._p].postRender();
         },
         destroy: function () {
            (this.plugins.length = 0),
               (this._pluginsLength = 0),
               (this.game = null),
               (this._parent = null);
         },
      }),
      (c.PluginManager.prototype.constructor = c.PluginManager),
      (c.Stage = function (a, d, e) {
         (this.game = a),
            (this._backgroundColor = "rgb(0,0,0)"),
            (this.offset = new c.Point()),
            (this.canvas = null),
            (this._stage = new b.Stage(0, !1)),
            (this._stage.name = "_stage_root"),
            (this._stage.interactive = !1),
            (this.display = this._stage),
            (this.scaleMode = c.StageScaleMode.NO_SCALE),
            (this.fullScreenScaleMode = c.StageScaleMode.NO_SCALE),
            (this.scale = new c.StageScaleMode(this.game, d, e)),
            (this.aspectRatio = d / e),
            (this.disableVisibilityChange = !1),
            (this._nextOffsetCheck = 0),
            (this.checkOffsetInterval = 2500),
            a.config
               ? this.parseConfig(a.config)
               : ((this.canvas = c.Canvas.create(d, e)),
                 (this.canvas.style["-webkit-full-screen"] =
                    "width: 100%; height: 100%"));
      }),
      (c.Stage.prototype = {
         parseConfig: function (a) {
            (this.canvas = a.canvasID
               ? c.Canvas.create(this.game.width, this.game.height, a.canvasID)
               : c.Canvas.create(this.game.width, this.game.height)),
               a.canvasStyle
                  ? (this.canvas.stlye = a.canvasStyle)
                  : (this.canvas.style["-webkit-full-screen"] =
                       "width: 100%; height: 100%"),
               a.checkOffsetInterval &&
                  (this.checkOffsetInterval = a.checkOffsetInterval),
               a.disableVisibilityChange &&
                  (this.disableVisibilityChange = a.disableVisibilityChange),
               a.fullScreenScaleMode &&
                  (this.fullScreenScaleMode = a.fullScreenScaleMode),
               a.scaleMode && (this.scaleMode = a.scaleMode),
               a.backgroundColor && (this.backgroundColor = a.backgroundColor);
         },
         boot: function () {
            c.Canvas.getOffset(this.canvas, this.offset),
               (this.bounds = new c.Rectangle(
                  this.offset.x,
                  this.offset.y,
                  this.game.width,
                  this.game.height
               ));
            var a = this;
            (this._onChange = function (b) {
               return a.visibilityChange(b);
            }),
               c.Canvas.setUserSelect(this.canvas, "none"),
               c.Canvas.setTouchAction(this.canvas, "none"),
               (this.backgroundColor = "#000"),
               document.addEventListener(
                  "visibilitychange",
                  this._onChange,
                  !1
               ),
               document.addEventListener(
                  "webkitvisibilitychange",
                  this._onChange,
                  !1
               ),
               document.addEventListener("pagehide", this._onChange, !1),
               document.addEventListener("pageshow", this._onChange, !1),
               (window.onblur = this._onChange),
               (window.onfocus = this._onChange);
         },
         update: function () {
            this.checkOffsetInterval !== !1 &&
               this.game.time.now > this._nextOffsetCheck &&
               (c.Canvas.getOffset(this.canvas, this.offset),
               (this._nextOffsetCheck =
                  this.game.time.now + this.checkOffsetInterval));
         },
         visibilityChange: function (a) {
            this.disableVisibilityChange ||
               (this.game.paused =
                  this.game.paused !== !1 ||
                  ("pagehide" != a.type &&
                     "blur" != a.type &&
                     document.hidden !== !0 &&
                     document.webkitHidden !== !0)
                     ? !1
                     : !0);
         },
      }),
      (c.Stage.prototype.constructor = c.Stage),
      Object.defineProperty(c.Stage.prototype, "backgroundColor", {
         get: function () {
            return this._backgroundColor;
         },
         set: function (a) {
            (this._backgroundColor = a),
               this.game.transparent === !1 &&
                  (this.game.renderType == c.CANVAS
                     ? (this.game.canvas.style.backgroundColor = a)
                     : ("string" == typeof a && (a = c.Color.hexToRGB(a)),
                       this._stage.setBackgroundColor(a)));
         },
      }),
      (c.Group = function (a, d, e, f) {
         (this.game = a),
            "undefined" == typeof d && (d = a.world),
            (this.name = e || "group"),
            "undefined" == typeof f && (f = !1),
            f
               ? (this._container = this.game.stage._stage)
               : ((this._container = new b.DisplayObjectContainer()),
                 (this._container.name = this.name),
                 d
                    ? d instanceof c.Group
                       ? d._container.addChild(this._container)
                       : (d.addChild(this._container), d.updateTransform())
                    : (this.game.stage._stage.addChild(this._container),
                      this.game.stage._stage.updateTransform())),
            (this.type = c.GROUP),
            (this.alive = !0),
            (this.exists = !0),
            (this.group = null),
            (this._container.scale = new c.Point(1, 1)),
            (this.scale = this._container.scale),
            (this.pivot = this._container.pivot),
            (this.cursor = null);
      }),
      (c.Group.RETURN_NONE = 0),
      (c.Group.RETURN_TOTAL = 1),
      (c.Group.RETURN_CHILD = 2),
      (c.Group.SORT_ASCENDING = -1),
      (c.Group.SORT_DESCENDING = 1),
      (c.Group.prototype = {
         add: function (a) {
            return (
               a.group !== this &&
                  (a.type && a.type === c.GROUP
                     ? ((a.group = this),
                       this._container.addChild(a._container),
                       a._container.updateTransform())
                     : ((a.group = this),
                       this._container.addChild(a),
                       a.updateTransform(),
                       a.events && a.events.onAddedToGroup.dispatch(a, this)),
                  null === this.cursor && (this.cursor = a)),
               a
            );
         },
         addAt: function (a, b) {
            return (
               a.group !== this &&
                  (a.type && a.type === c.GROUP
                     ? ((a.group = this),
                       this._container.addChildAt(a._container, b),
                       a._container.updateTransform())
                     : ((a.group = this),
                       this._container.addChildAt(a, b),
                       a.updateTransform(),
                       a.events && a.events.onAddedToGroup.dispatch(a, this)),
                  null === this.cursor && (this.cursor = a)),
               a
            );
         },
         getAt: function (a) {
            return this._container.getChildAt(a);
         },
         create: function (a, b, d, e, f) {
            "undefined" == typeof f && (f = !0);
            var g = new c.Sprite(this.game, a, b, d, e);
            return (
               (g.group = this),
               (g.exists = f),
               (g.visible = f),
               (g.alive = f),
               this._container.addChild(g),
               g.updateTransform(),
               g.events && g.events.onAddedToGroup.dispatch(g, this),
               null === this.cursor && (this.cursor = g),
               g
            );
         },
         createMultiple: function (a, b, d, e) {
            "undefined" == typeof e && (e = !1);
            for (var f = 0; a > f; f++) {
               var g = new c.Sprite(this.game, 0, 0, b, d);
               (g.group = this),
                  (g.exists = e),
                  (g.visible = e),
                  (g.alive = e),
                  this._container.addChild(g),
                  g.updateTransform(),
                  g.events && g.events.onAddedToGroup.dispatch(g, this),
                  null === this.cursor && (this.cursor = g);
            }
         },
         next: function () {
            this.cursor &&
               (this.cursor =
                  this.cursor == this._container.last
                     ? this._container._iNext
                     : this.cursor._iNext);
         },
         previous: function () {
            this.cursor &&
               (this.cursor =
                  this.cursor == this._container._iNext
                     ? this._container.last
                     : this.cursor._iPrev);
         },
         childTest: function (a, b) {
            var c = a + " next: ";
            (c += b._iNext ? b._iNext.name : "-null-"),
               (c = c + " " + a + " prev: "),
               (c += b._iPrev ? b._iPrev.name : "-null-"),
               console.log(c);
         },
         swapIndex: function (a, b) {
            var c = this.getAt(a),
               d = this.getAt(b);
            this.swap(c, d);
         },
         swap: function (a, b) {
            if (
               a === b ||
               !a.parent ||
               !b.parent ||
               a.group !== this ||
               b.group !== this
            )
               return !1;
            var c = a._iPrev,
               d = a._iNext,
               e = b._iPrev,
               f = b._iNext,
               g = this._container.last._iNext,
               h = this.game.stage._stage;
            do {
               h !== a &&
                  h !== b &&
                  (h.first === a
                     ? (h.first = b)
                     : h.first === b && (h.first = a),
                  h.last === a ? (h.last = b) : h.last === b && (h.last = a)),
                  (h = h._iNext);
            } while (h != g);
            return a._iNext == b
               ? ((a._iNext = f),
                 (a._iPrev = b),
                 (b._iNext = a),
                 (b._iPrev = c),
                 c && (c._iNext = b),
                 f && (f._iPrev = a),
                 a.__renderGroup && a.__renderGroup.updateTexture(a),
                 b.__renderGroup && b.__renderGroup.updateTexture(b),
                 !0)
               : b._iNext == a
               ? ((a._iNext = b),
                 (a._iPrev = e),
                 (b._iNext = d),
                 (b._iPrev = a),
                 e && (e._iNext = a),
                 d && (d._iPrev = b),
                 a.__renderGroup && a.__renderGroup.updateTexture(a),
                 b.__renderGroup && b.__renderGroup.updateTexture(b),
                 !0)
               : ((a._iNext = f),
                 (a._iPrev = e),
                 (b._iNext = d),
                 (b._iPrev = c),
                 c && (c._iNext = b),
                 d && (d._iPrev = b),
                 e && (e._iNext = a),
                 f && (f._iPrev = a),
                 a.__renderGroup && a.__renderGroup.updateTexture(a),
                 b.__renderGroup && b.__renderGroup.updateTexture(b),
                 !0);
         },
         bringToTop: function (a) {
            return a.group === this && (this.remove(a), this.add(a)), a;
         },
         getIndex: function (a) {
            return this._container.children.indexOf(a);
         },
         replace: function (a, b) {
            if (this._container.first._iNext) {
               var c = this.getIndex(a);
               -1 != c &&
                  (void 0 !== b.parent &&
                     (b.events.onRemovedFromGroup.dispatch(b, this),
                     b.parent.removeChild(b)),
                  this._container.removeChild(a),
                  this._container.addChildAt(b, c),
                  b.events.onAddedToGroup.dispatch(b, this),
                  b.updateTransform(),
                  this.cursor == a && (this.cursor = this._container._iNext));
            }
         },
         setProperty: function (a, b, c, d) {
            d = d || 0;
            var e = b.length;
            1 == e
               ? 0 === d
                  ? (a[b[0]] = c)
                  : 1 == d
                  ? (a[b[0]] += c)
                  : 2 == d
                  ? (a[b[0]] -= c)
                  : 3 == d
                  ? (a[b[0]] *= c)
                  : 4 == d && (a[b[0]] /= c)
               : 2 == e
               ? 0 === d
                  ? (a[b[0]][b[1]] = c)
                  : 1 == d
                  ? (a[b[0]][b[1]] += c)
                  : 2 == d
                  ? (a[b[0]][b[1]] -= c)
                  : 3 == d
                  ? (a[b[0]][b[1]] *= c)
                  : 4 == d && (a[b[0]][b[1]] /= c)
               : 3 == e
               ? 0 === d
                  ? (a[b[0]][b[1]][b[2]] = c)
                  : 1 == d
                  ? (a[b[0]][b[1]][b[2]] += c)
                  : 2 == d
                  ? (a[b[0]][b[1]][b[2]] -= c)
                  : 3 == d
                  ? (a[b[0]][b[1]][b[2]] *= c)
                  : 4 == d && (a[b[0]][b[1]][b[2]] /= c)
               : 4 == e &&
                 (0 === d
                    ? (a[b[0]][b[1]][b[2]][b[3]] = c)
                    : 1 == d
                    ? (a[b[0]][b[1]][b[2]][b[3]] += c)
                    : 2 == d
                    ? (a[b[0]][b[1]][b[2]][b[3]] -= c)
                    : 3 == d
                    ? (a[b[0]][b[1]][b[2]][b[3]] *= c)
                    : 4 == d && (a[b[0]][b[1]][b[2]][b[3]] /= c));
         },
         set: function (a, b, c, d, e, f) {
            (b = b.split(".")),
               "undefined" == typeof d && (d = !1),
               "undefined" == typeof e && (e = !1),
               (d === !1 || (d && a.alive)) &&
                  (e === !1 || (e && a.visible)) &&
                  this.setProperty(a, b, c, f);
         },
         setAll: function (a, b, c, d, e) {
            if (
               ((a = a.split(".")),
               "undefined" == typeof c && (c = !1),
               "undefined" == typeof d && (d = !1),
               (e = e || 0),
               this._container.children.length > 0 &&
                  this._container.first._iNext)
            ) {
               var f = this._container.first._iNext;
               do {
                  (c === !1 || (c && f.alive)) &&
                     (d === !1 || (d && f.visible)) &&
                     this.setProperty(f, a, b, e),
                     (f = f._iNext);
               } while (f != this._container.last._iNext);
            }
         },
         addAll: function (a, b, c, d) {
            this.setAll(a, b, c, d, 1);
         },
         subAll: function (a, b, c, d) {
            this.setAll(a, b, c, d, 2);
         },
         multiplyAll: function (a, b, c, d) {
            this.setAll(a, b, c, d, 3);
         },
         divideAll: function (a, b, c, d) {
            this.setAll(a, b, c, d, 4);
         },
         callAllExists: function (a, b) {
            var c = Array.prototype.splice.call(arguments, 2);
            if (
               this._container.children.length > 0 &&
               this._container.first._iNext
            ) {
               var d = this._container.first._iNext;
               do {
                  d.exists == b && d[a] && d[a].apply(d, c), (d = d._iNext);
               } while (d != this._container.last._iNext);
            }
         },
         callbackFromArray: function (a, b, c) {
            if (1 == c) {
               if (a[b[0]]) return a[b[0]];
            } else if (2 == c) {
               if (a[b[0]][b[1]]) return a[b[0]][b[1]];
            } else if (3 == c) {
               if (a[b[0]][b[1]][b[2]]) return a[b[0]][b[1]][b[2]];
            } else if (4 == c) {
               if (a[b[0]][b[1]][b[2]][b[3]]) return a[b[0]][b[1]][b[2]][b[3]];
            } else if (a[b]) return a[b];
            return !1;
         },
         callAll: function (a, b) {
            if ("undefined" != typeof a) {
               a = a.split(".");
               var c = a.length;
               if ("undefined" == typeof b) b = null;
               else if ("string" == typeof b) {
                  b = b.split(".");
                  var d = b.length;
               }
               var e = Array.prototype.splice.call(arguments, 2),
                  f = null,
                  g = null;
               if (
                  this._container.children.length > 0 &&
                  this._container.first._iNext
               ) {
                  var h = this._container.first._iNext;
                  do {
                     (f = this.callbackFromArray(h, a, c)),
                        b && f
                           ? ((g = this.callbackFromArray(h, b, d)),
                             f && f.apply(g, e))
                           : f && f.apply(h, e),
                        (h = h._iNext);
                  } while (h != this._container.last._iNext);
               }
            }
         },
         forEach: function (a, b, c) {
            "undefined" == typeof c && (c = !1);
            var d = Array.prototype.splice.call(arguments, 3);
            if (
               (d.unshift(null),
               this._container.children.length > 0 &&
                  this._container.first._iNext)
            ) {
               var e = this._container.first._iNext;
               do {
                  (c === !1 || (c && e.exists)) && ((d[0] = e), a.apply(b, d)),
                     (e = e._iNext);
               } while (e != this._container.last._iNext);
            }
         },
         forEachExists: function (a, b) {
            var d = Array.prototype.splice.call(arguments, 2);
            d.unshift(null),
               this.iterate("exists", !0, c.Group.RETURN_TOTAL, a, b, d);
         },
         forEachAlive: function (a, b) {
            var d = Array.prototype.splice.call(arguments, 2);
            d.unshift(null),
               this.iterate("alive", !0, c.Group.RETURN_TOTAL, a, b, d);
         },
         forEachDead: function (a, b) {
            var d = Array.prototype.splice.call(arguments, 2);
            d.unshift(null),
               this.iterate("alive", !1, c.Group.RETURN_TOTAL, a, b, d);
         },
         sort: function (a, b) {
            "undefined" == typeof a && (a = "y"),
               "undefined" == typeof b && (b = c.Group.SORT_ASCENDING);
            var d, e;
            do {
               d = !1;
               for (
                  var f = 0, g = this._container.children.length - 1;
                  g > f;
                  f++
               )
                  b == c.Group.SORT_ASCENDING
                     ? this._container.children[f][a] >
                          this._container.children[f + 1][a] &&
                       (this.swap(this.getAt(f), this.getAt(f + 1)),
                       (e = this._container.children[f]),
                       (this._container.children[f] =
                          this._container.children[f + 1]),
                       (this._container.children[f + 1] = e),
                       (d = !0))
                     : this._container.children[f][a] <
                          this._container.children[f + 1][a] &&
                       (this.swap(this.getAt(f), this.getAt(f + 1)),
                       (e = this._container.children[f]),
                       (this._container.children[f] =
                          this._container.children[f + 1]),
                       (this._container.children[f + 1] = e),
                       (d = !0));
            } while (d);
         },
         iterate: function (a, b, d, e, f, g) {
            if (
               d === c.Group.RETURN_TOTAL &&
               0 === this._container.children.length
            )
               return 0;
            "undefined" == typeof e && (e = !1);
            var h = 0;
            if (
               this._container.children.length > 0 &&
               this._container.first._iNext
            ) {
               var i = this._container.first._iNext;
               do {
                  if (
                     i[a] === b &&
                     (h++,
                     e && ((g[0] = i), e.apply(f, g)),
                     d === c.Group.RETURN_CHILD)
                  )
                     return i;
                  i = i._iNext;
               } while (i != this._container.last._iNext);
            }
            return d === c.Group.RETURN_TOTAL
               ? h
               : d === c.Group.RETURN_CHILD
               ? null
               : void 0;
         },
         getFirstExists: function (a) {
            return (
               "boolean" != typeof a && (a = !0),
               this.iterate("exists", a, c.Group.RETURN_CHILD)
            );
         },
         getFirstAlive: function () {
            return this.iterate("alive", !0, c.Group.RETURN_CHILD);
         },
         getFirstDead: function () {
            return this.iterate("alive", !1, c.Group.RETURN_CHILD);
         },
         countLiving: function () {
            return this.iterate("alive", !0, c.Group.RETURN_TOTAL);
         },
         countDead: function () {
            return this.iterate("alive", !1, c.Group.RETURN_TOTAL);
         },
         getRandom: function (a, b) {
            return 0 === this._container.children.length
               ? null
               : ((a = a || 0),
                 (b = b || this._container.children.length),
                 this.game.math.getRandom(this._container.children, a, b));
         },
         remove: function (a) {
            return a.group !== this
               ? !1
               : (a.events && a.events.onRemovedFromGroup.dispatch(a, this),
                 a.parent === this._container && this._container.removeChild(a),
                 this.cursor == a &&
                    (this.cursor = this._container._iNext
                       ? this._container._iNext
                       : null),
                 (a.group = null),
                 !0);
         },
         removeAll: function () {
            if (0 !== this._container.children.length) {
               do {
                  this._container.children[0].events &&
                     this._container.children[0].events.onRemovedFromGroup.dispatch(
                        this._container.children[0],
                        this
                     ),
                     this._container.removeChild(this._container.children[0]);
               } while (this._container.children.length > 0);
               this.cursor = null;
            }
         },
         removeBetween: function (a, b) {
            if (0 !== this._container.children.length) {
               if (a > b || 0 > a || b > this._container.children.length)
                  return !1;
               for (var c = a; b > c; c++) {
                  var d = this._container.children[c];
                  d.events.onRemovedFromGroup.dispatch(d, this),
                     this._container.removeChild(d),
                     this.cursor == d &&
                        (this.cursor = this._container._iNext
                           ? this._container._iNext
                           : null);
               }
            }
         },
         destroy: function (a) {
            if (("undefined" == typeof a && (a = !1), a)) {
               if (this._container.children.length > 0)
                  do {
                     this._container.children[0].group &&
                        this._container.children[0].destroy();
                  } while (this._container.children.length > 0);
            } else this.removeAll();
            this._container.parent.removeChild(this._container),
               (this._container = null),
               (this.game = null),
               (this.exists = !1),
               (this.cursor = null);
         },
         validate: function () {
            var a = this.game.stage._stage.last._iNext,
               b = this.game.stage._stage,
               c = null,
               d = null,
               e = 0;
            do {
               if (e > 0) {
                  if (b !== c) return console.log("check next fail"), !1;
                  if (b._iPrev !== d)
                     return console.log("check previous fail"), !1;
               }
               (c = b._iNext), (d = b), (b = b._iNext), e++;
            } while (b != a);
            return !0;
         },
      }),
      (c.Group.prototype.constructor = c.Group),
      Object.defineProperty(c.Group.prototype, "total", {
         get: function () {
            return this._container
               ? this.iterate("exists", !0, c.Group.RETURN_TOTAL)
               : 0;
         },
      }),
      Object.defineProperty(c.Group.prototype, "length", {
         get: function () {
            return this._container ? this._container.children.length : 0;
         },
      }),
      Object.defineProperty(c.Group.prototype, "x", {
         get: function () {
            return this._container.position.x;
         },
         set: function (a) {
            this._container.position.x = a;
         },
      }),
      Object.defineProperty(c.Group.prototype, "y", {
         get: function () {
            return this._container.position.y;
         },
         set: function (a) {
            this._container.position.y = a;
         },
      }),
      Object.defineProperty(c.Group.prototype, "angle", {
         get: function () {
            return c.Math.radToDeg(this._container.rotation);
         },
         set: function (a) {
            this._container.rotation = c.Math.degToRad(a);
         },
      }),
      Object.defineProperty(c.Group.prototype, "rotation", {
         get: function () {
            return this._container.rotation;
         },
         set: function (a) {
            this._container.rotation = a;
         },
      }),
      Object.defineProperty(c.Group.prototype, "visible", {
         get: function () {
            return this._container.visible;
         },
         set: function (a) {
            this._container.visible = a;
         },
      }),
      Object.defineProperty(c.Group.prototype, "alpha", {
         get: function () {
            return this._container.alpha;
         },
         set: function (a) {
            this._container.alpha = a;
         },
      }),
      (c.World = function (a) {
         c.Group.call(this, a, null, "__world", !1),
            (this.bounds = new c.Rectangle(0, 0, a.width, a.height)),
            (this.camera = null),
            (this.currentRenderOrderID = 0);
      }),
      (c.World.prototype = Object.create(c.Group.prototype)),
      (c.World.prototype.constructor = c.World),
      (c.World.prototype.boot = function () {
         (this.camera = new c.Camera(
            this.game,
            0,
            0,
            0,
            this.game.width,
            this.game.height
         )),
            (this.camera.displayObject = this._container),
            (this.game.camera = this.camera);
      }),
      (c.World.prototype.preUpdate = function () {
         if (this.game.stage._stage.first._iNext) {
            var a = this.game.stage._stage.first._iNext;
            do {
               a = a.preUpdate && !a.preUpdate() ? a.last._iNext : a._iNext;
            } while (a != this.game.stage._stage.last._iNext);
         }
      }),
      (c.World.prototype.update = function () {
         if (
            ((this.currentRenderOrderID = 0),
            this.game.stage._stage.first._iNext)
         ) {
            var a = this.game.stage._stage.first._iNext;
            do {
               a = a.update && !a.update() ? a.last._iNext : a._iNext;
            } while (a != this.game.stage._stage.last._iNext);
         }
      }),
      (c.World.prototype.postUpdate = function () {
         if (this.camera.target && this.camera.target.postUpdate) {
            if (
               (this.camera.target.postUpdate(),
               this.camera.update(),
               this.game.stage._stage.first._iNext)
            ) {
               var a = this.game.stage._stage.first._iNext;
               do {
                  a.postUpdate && a !== this.camera.target && a.postUpdate(),
                     (a = a._iNext);
               } while (a != this.game.stage._stage.last._iNext);
            }
         } else if (
            (this.camera.update(), this.game.stage._stage.first._iNext)
         ) {
            var a = this.game.stage._stage.first._iNext;
            do {
               a.postUpdate && a.postUpdate(), (a = a._iNext);
            } while (a != this.game.stage._stage.last._iNext);
         }
      }),
      (c.World.prototype.setBounds = function (a, b, c, d) {
         c < this.game.width && (c = this.game.width),
            d < this.game.height && (d = this.game.height),
            this.bounds.setTo(a, b, c, d),
            this.camera.bounds && this.camera.bounds.setTo(a, b, c, d),
            this.game.physics.setBoundsToWorld();
      }),
      (c.World.prototype.destroy = function () {
         (this.camera.x = 0),
            (this.camera.y = 0),
            this.game.input.reset(!0),
            this.removeAll();
      }),
      Object.defineProperty(c.World.prototype, "width", {
         get: function () {
            return this.bounds.width;
         },
         set: function (a) {
            this.bounds.width = a;
         },
      }),
      Object.defineProperty(c.World.prototype, "height", {
         get: function () {
            return this.bounds.height;
         },
         set: function (a) {
            this.bounds.height = a;
         },
      }),
      Object.defineProperty(c.World.prototype, "centerX", {
         get: function () {
            return this.bounds.halfWidth;
         },
      }),
      Object.defineProperty(c.World.prototype, "centerY", {
         get: function () {
            return this.bounds.halfHeight;
         },
      }),
      Object.defineProperty(c.World.prototype, "randomX", {
         get: function () {
            return this.bounds.x < 0
               ? this.game.rnd.integerInRange(
                    this.bounds.x,
                    this.bounds.width - Math.abs(this.bounds.x)
                 )
               : this.game.rnd.integerInRange(this.bounds.x, this.bounds.width);
         },
      }),
      Object.defineProperty(c.World.prototype, "randomY", {
         get: function () {
            return this.bounds.y < 0
               ? this.game.rnd.integerInRange(
                    this.bounds.y,
                    this.bounds.height - Math.abs(this.bounds.y)
                 )
               : this.game.rnd.integerInRange(
                    this.bounds.y,
                    this.bounds.height
                 );
         },
      }),
      Object.defineProperty(c.World.prototype, "visible", {
         get: function () {
            return this._container.visible;
         },
         set: function (a) {
            this._container.visible = a;
         },
      }),
      (c.Game = function (a, b, d, e, f, g, h) {
         (this.id = c.GAMES.push(this) - 1),
            (this.config = null),
            (this.parent = ""),
            (this.width = 800),
            (this.height = 600),
            (this.transparent = !1),
            (this.antialias = !0),
            (this.renderer = c.AUTO),
            (this.renderType = c.AUTO),
            (this.state = null),
            (this._paused = !1),
            (this._loadComplete = !1),
            (this.isBooted = !1),
            (this.isRunning = !1),
            (this.raf = null),
            (this.add = null),
            (this.cache = null),
            (this.input = null),
            (this.load = null),
            (this.math = null),
            (this.net = null),
            (this.sound = null),
            (this.stage = null),
            (this.time = null),
            (this.tweens = null),
            (this.world = null),
            (this.physics = null),
            (this.rnd = null),
            (this.device = null),
            (this.camera = null),
            (this.canvas = null),
            (this.context = null),
            (this.debug = null),
            (this.particles = null),
            (this.stepping = !1),
            (this.pendingStep = !1),
            (this.stepCount = 0),
            1 === arguments.length && "object" == typeof arguments[0]
               ? this.parseConfig(arguments[0])
               : ("undefined" != typeof a && (this.width = a),
                 "undefined" != typeof b && (this.height = b),
                 "undefined" != typeof d &&
                    ((this.renderer = d), (this.renderType = d)),
                 "undefined" != typeof e && (this.parent = e),
                 "undefined" != typeof g && (this.transparent = g),
                 "undefined" != typeof h && (this.antialias = h),
                 (this.state = new c.StateManager(this, f)));
         var i = this;
         return (
            (this._onBoot = function () {
               return i.boot();
            }),
            "complete" === document.readyState ||
            "interactive" === document.readyState
               ? window.setTimeout(this._onBoot, 0)
               : (document.addEventListener(
                    "DOMContentLoaded",
                    this._onBoot,
                    !1
                 ),
                 window.addEventListener("load", this._onBoot, !1)),
            this
         );
      }),
      (c.Game.prototype = {
         parseConfig: function (a) {
            (this.config = a),
               a.width && (this.width = this.parseDimension(a.width, 0)),
               a.height && (this.height = this.parseDimension(a.height, 1)),
               a.renderer &&
                  ((this.renderer = a.renderer),
                  (this.renderType = a.renderer)),
               a.parent && (this.parent = a.parent),
               a.transparent && (this.transparent = a.transparent),
               a.antialias && (this.antialias = a.antialias);
            var b = null;
            a.state && (b = a.state),
               (this.state = new c.StateManager(this, b));
         },
         parseDimension: function (a, b) {
            var c = 0,
               d = 0;
            return (
               "string" == typeof a
                  ? "%" === a.substr(-1)
                     ? ((c = parseInt(a, 10) / 100),
                       (d =
                          0 === b
                             ? window.innerWidth * c
                             : window.innerHeight * c))
                     : (d = parseInt(a, 10))
                  : (d = a),
               d
            );
         },
         boot: function () {
            this.isBooted ||
               (document.body
                  ? (document.removeEventListener(
                       "DOMContentLoaded",
                       this._onBoot
                    ),
                    window.removeEventListener("load", this._onBoot),
                    (this.onPause = new c.Signal()),
                    (this.onResume = new c.Signal()),
                    (this.isBooted = !0),
                    (this.device = new c.Device()),
                    (this.math = c.Math),
                    (this.rnd = new c.RandomDataGenerator([
                       (Date.now() * Math.random()).toString(),
                    ])),
                    (this.stage = new c.Stage(this, this.width, this.height)),
                    this.setUpRenderer(),
                    (this.world = new c.World(this)),
                    (this.add = new c.GameObjectFactory(this)),
                    (this.cache = new c.Cache(this)),
                    (this.load = new c.Loader(this)),
                    (this.time = new c.Time(this)),
                    (this.tweens = new c.TweenManager(this)),
                    (this.input = new c.Input(this)),
                    (this.sound = new c.SoundManager(this)),
                    (this.physics = new c.Physics.Arcade(this)),
                    (this.particles = new c.Particles(this)),
                    (this.plugins = new c.PluginManager(this, this)),
                    (this.net = new c.Net(this)),
                    (this.debug = new c.Utils.Debug(this)),
                    this.time.boot(),
                    this.stage.boot(),
                    this.world.boot(),
                    this.input.boot(),
                    this.sound.boot(),
                    this.state.boot(),
                    this.load.onLoadComplete.add(this.loadComplete, this),
                    this.showDebugHeader(),
                    (this.isRunning = !0),
                    (this._loadComplete = !1),
                    (this.raf = new c.RequestAnimationFrame(this)),
                    this.raf.start())
                  : window.setTimeout(this._onBoot, 20));
         },
         showDebugHeader: function () {
            var a = c.DEV_VERSION,
               b = "Canvas",
               d = "HTML Audio";
            if (
               (this.renderType == c.WEBGL
                  ? (b = "WebGL")
                  : this.renderType == c.HEADLESS && (b = "Headless"),
               this.device.webAudio && (d = "WebAudio"),
               this.device.chrome)
            ) {
               var e = [
                  "%c %c %c  Phaser v" +
                     a +
                     " - Renderer: " +
                     b +
                     " - Audio: " +
                     d +
                     "  %c %c ",
                  "background: #00bff3",
                  "background: #0072bc",
                  "color: #ffffff; background: #003471",
                  "background: #0072bc",
                  "background: #00bff3",
               ];
               console.log.apply(console, e);
            } else
               console.log(
                  "Phaser v" + a + " - Renderer: " + b + " - Audio: " + d
               );
         },
         setUpRenderer: function () {
            if (
               this.renderType === c.HEADLESS ||
               this.renderType === c.CANVAS ||
               (this.renderType === c.AUTO && this.device.webGL === !1)
            ) {
               if (!this.device.canvas)
                  throw new Error(
                     "Phaser.Game - cannot create Canvas or WebGL context, aborting."
                  );
               this.renderType === c.AUTO && (this.renderType = c.CANVAS),
                  (this.renderer = new b.CanvasRenderer(
                     this.width,
                     this.height,
                     this.stage.canvas,
                     this.transparent
                  )),
                  c.Canvas.setSmoothingEnabled(
                     this.renderer.context,
                     this.antialias
                  ),
                  (this.canvas = this.renderer.view),
                  (this.context = this.renderer.context);
            } else
               (this.renderType = c.WEBGL),
                  (this.renderer = new b.WebGLRenderer(
                     this.width,
                     this.height,
                     this.stage.canvas,
                     this.transparent,
                     this.antialias
                  )),
                  (this.canvas = this.renderer.view),
                  (this.context = null);
            c.Canvas.addToDOM(this.renderer.view, this.parent, !0),
               c.Canvas.setTouchAction(this.renderer.view);
         },
         loadComplete: function () {
            (this._loadComplete = !0), this.state.loadComplete();
         },
         update: function (a) {
            this.time.update(a),
               this._paused
                  ? (this.renderer.render(this.stage._stage),
                    this.plugins.render(),
                    this.state.render())
                  : (this.pendingStep ||
                       (this.stepping && (this.pendingStep = !0),
                       this.plugins.preUpdate(),
                       this.world.preUpdate(),
                       this.stage.update(),
                       this.tweens.update(),
                       this.sound.update(),
                       this.input.update(),
                       this.state.update(),
                       this.world.update(),
                       this.particles.update(),
                       this.plugins.update(),
                       this.world.postUpdate(),
                       this.plugins.postUpdate()),
                    this.renderType !== c.HEADLESS &&
                       (this.renderer.render(this.stage._stage),
                       this.plugins.render(),
                       this.state.render(),
                       this.plugins.postRender()));
         },
         enableStep: function () {
            (this.stepping = !0), (this.pendingStep = !1), (this.stepCount = 0);
         },
         disableStep: function () {
            (this.stepping = !1), (this.pendingStep = !1);
         },
         step: function () {
            (this.pendingStep = !1), this.stepCount++;
         },
         destroy: function () {
            this.raf.stop(),
               this.input.destroy(),
               this.state.destroy(),
               (this.state = null),
               (this.cache = null),
               (this.input = null),
               (this.load = null),
               (this.sound = null),
               (this.stage = null),
               (this.time = null),
               (this.world = null),
               (this.isBooted = !1);
         },
      }),
      (c.Game.prototype.constructor = c.Game),
      Object.defineProperty(c.Game.prototype, "paused", {
         get: function () {
            return this._paused;
         },
         set: function (a) {
            a === !0
               ? this._paused === !1 &&
                 ((this._paused = !0), this.onPause.dispatch(this))
               : this._paused &&
                 ((this._paused = !1), this.onResume.dispatch(this));
         },
      }),
      (c.Input = function (a) {
         (this.game = a),
            (this.hitCanvas = null),
            (this.hitContext = null),
            (this.moveCallback = null),
            (this.moveCallbackContext = this);
      }),
      (c.Input.MOUSE_OVERRIDES_TOUCH = 0),
      (c.Input.TOUCH_OVERRIDES_MOUSE = 1),
      (c.Input.MOUSE_TOUCH_COMBINE = 2),
      (c.Input.prototype = {
         pollRate: 0,
         _pollCounter: 0,
         _oldPosition: null,
         _x: 0,
         _y: 0,
         disabled: !1,
         multiInputOverride: c.Input.MOUSE_TOUCH_COMBINE,
         position: null,
         speed: null,
         circle: null,
         scale: null,
         maxPointers: 10,
         currentPointers: 0,
         tapRate: 200,
         doubleTapRate: 300,
         holdRate: 2e3,
         justPressedRate: 200,
         justReleasedRate: 200,
         recordPointerHistory: !1,
         recordRate: 100,
         recordLimit: 100,
         pointer1: null,
         pointer2: null,
         pointer3: null,
         pointer4: null,
         pointer5: null,
         pointer6: null,
         pointer7: null,
         pointer8: null,
         pointer9: null,
         pointer10: null,
         activePointer: null,
         mousePointer: null,
         mouse: null,
         keyboard: null,
         touch: null,
         mspointer: null,
         gamepad: null,
         onDown: null,
         onUp: null,
         onTap: null,
         onHold: null,
         interactiveItems: new c.LinkedList(),
         boot: function () {
            (this.mousePointer = new c.Pointer(this.game, 0)),
               (this.pointer1 = new c.Pointer(this.game, 1)),
               (this.pointer2 = new c.Pointer(this.game, 2)),
               (this.mouse = new c.Mouse(this.game)),
               (this.keyboard = new c.Keyboard(this.game)),
               (this.touch = new c.Touch(this.game)),
               (this.mspointer = new c.MSPointer(this.game)),
               (this.gamepad = new c.Gamepad(this.game)),
               (this.onDown = new c.Signal()),
               (this.onUp = new c.Signal()),
               (this.onTap = new c.Signal()),
               (this.onHold = new c.Signal()),
               (this.scale = new c.Point(1, 1)),
               (this.speed = new c.Point()),
               (this.position = new c.Point()),
               (this._oldPosition = new c.Point()),
               (this.circle = new c.Circle(0, 0, 44)),
               (this.activePointer = this.mousePointer),
               (this.currentPointers = 0),
               (this.hitCanvas = document.createElement("canvas")),
               (this.hitCanvas.width = 1),
               (this.hitCanvas.height = 1),
               (this.hitContext = this.hitCanvas.getContext("2d")),
               this.mouse.start(),
               this.keyboard.start(),
               this.touch.start(),
               this.mspointer.start(),
               (this.mousePointer.active = !0);
         },
         destroy: function () {
            this.mouse.stop(),
               this.keyboard.stop(),
               this.touch.stop(),
               this.mspointer.stop(),
               this.gamepad.stop(),
               (this.moveCallback = null);
         },
         setMoveCallback: function (a, b) {
            (this.moveCallback = a), (this.moveCallbackContext = b);
         },
         addPointer: function () {
            for (var a = 0, b = 10; b > 0; b--)
               null === this["pointer" + b] && (a = b);
            return 0 === a
               ? (console.warn("You can only have 10 Pointer objects"), null)
               : ((this["pointer" + a] = new c.Pointer(this.game, a)),
                 this["pointer" + a]);
         },
         update: function () {
            return this.pollRate > 0 && this._pollCounter < this.pollRate
               ? (this._pollCounter++, void 0)
               : ((this.speed.x = this.position.x - this._oldPosition.x),
                 (this.speed.y = this.position.y - this._oldPosition.y),
                 this._oldPosition.copyFrom(this.position),
                 this.mousePointer.update(),
                 this.gamepad.active && this.gamepad.update(),
                 this.pointer1.update(),
                 this.pointer2.update(),
                 this.pointer3 && this.pointer3.update(),
                 this.pointer4 && this.pointer4.update(),
                 this.pointer5 && this.pointer5.update(),
                 this.pointer6 && this.pointer6.update(),
                 this.pointer7 && this.pointer7.update(),
                 this.pointer8 && this.pointer8.update(),
                 this.pointer9 && this.pointer9.update(),
                 this.pointer10 && this.pointer10.update(),
                 (this._pollCounter = 0),
                 void 0);
         },
         reset: function (a) {
            if (this.game.isBooted !== !1) {
               "undefined" == typeof a && (a = !1),
                  this.keyboard.reset(),
                  this.mousePointer.reset(),
                  this.gamepad.reset();
               for (var b = 1; 10 >= b; b++)
                  this["pointer" + b] && this["pointer" + b].reset();
               (this.currentPointers = 0),
                  "none" !== this.game.canvas.style.cursor &&
                     (this.game.canvas.style.cursor = "default"),
                  a === !0 &&
                     (this.onDown.dispose(),
                     this.onUp.dispose(),
                     this.onTap.dispose(),
                     this.onHold.dispose(),
                     (this.onDown = new c.Signal()),
                     (this.onUp = new c.Signal()),
                     (this.onTap = new c.Signal()),
                     (this.onHold = new c.Signal()),
                     this.interactiveItems.callAll("reset")),
                  (this._pollCounter = 0);
            }
         },
         resetSpeed: function (a, b) {
            this._oldPosition.setTo(a, b), this.speed.setTo(0, 0);
         },
         startPointer: function (a) {
            if (
               this.maxPointers < 10 &&
               this.totalActivePointers == this.maxPointers
            )
               return null;
            if (this.pointer1.active === !1) return this.pointer1.start(a);
            if (this.pointer2.active === !1) return this.pointer2.start(a);
            for (var b = 3; 10 >= b; b++)
               if (this["pointer" + b] && this["pointer" + b].active === !1)
                  return this["pointer" + b].start(a);
            return null;
         },
         updatePointer: function (a) {
            if (
               this.pointer1.active &&
               this.pointer1.identifier == a.identifier
            )
               return this.pointer1.move(a);
            if (
               this.pointer2.active &&
               this.pointer2.identifier == a.identifier
            )
               return this.pointer2.move(a);
            for (var b = 3; 10 >= b; b++)
               if (
                  this["pointer" + b] &&
                  this["pointer" + b].active &&
                  this["pointer" + b].identifier == a.identifier
               )
                  return this["pointer" + b].move(a);
            return null;
         },
         stopPointer: function (a) {
            if (
               this.pointer1.active &&
               this.pointer1.identifier == a.identifier
            )
               return this.pointer1.stop(a);
            if (
               this.pointer2.active &&
               this.pointer2.identifier == a.identifier
            )
               return this.pointer2.stop(a);
            for (var b = 3; 10 >= b; b++)
               if (
                  this["pointer" + b] &&
                  this["pointer" + b].active &&
                  this["pointer" + b].identifier == a.identifier
               )
                  return this["pointer" + b].stop(a);
            return null;
         },
         getPointer: function (a) {
            if (((a = a || !1), this.pointer1.active == a))
               return this.pointer1;
            if (this.pointer2.active == a) return this.pointer2;
            for (var b = 3; 10 >= b; b++)
               if (this["pointer" + b] && this["pointer" + b].active == a)
                  return this["pointer" + b];
            return null;
         },
         getPointerFromIdentifier: function (a) {
            if (this.pointer1.identifier == a) return this.pointer1;
            if (this.pointer2.identifier == a) return this.pointer2;
            for (var b = 3; 10 >= b; b++)
               if (this["pointer" + b] && this["pointer" + b].identifier == a)
                  return this["pointer" + b];
            return null;
         },
      }),
      (c.Input.prototype.constructor = c.Input),
      Object.defineProperty(c.Input.prototype, "x", {
         get: function () {
            return this._x;
         },
         set: function (a) {
            this._x = Math.floor(a);
         },
      }),
      Object.defineProperty(c.Input.prototype, "y", {
         get: function () {
            return this._y;
         },
         set: function (a) {
            this._y = Math.floor(a);
         },
      }),
      Object.defineProperty(c.Input.prototype, "pollLocked", {
         get: function () {
            return this.pollRate > 0 && this._pollCounter < this.pollRate;
         },
      }),
      Object.defineProperty(c.Input.prototype, "totalInactivePointers", {
         get: function () {
            return 10 - this.currentPointers;
         },
      }),
      Object.defineProperty(c.Input.prototype, "totalActivePointers", {
         get: function () {
            this.currentPointers = 0;
            for (var a = 1; 10 >= a; a++)
               this["pointer" + a] &&
                  this["pointer" + a].active &&
                  this.currentPointers++;
            return this.currentPointers;
         },
      }),
      Object.defineProperty(c.Input.prototype, "worldX", {
         get: function () {
            return this.game.camera.view.x + this.x;
         },
      }),
      Object.defineProperty(c.Input.prototype, "worldY", {
         get: function () {
            return this.game.camera.view.y + this.y;
         },
      }),
      (c.Key = function (a, b) {
         (this.game = a),
            (this.isDown = !1),
            (this.isUp = !1),
            (this.altKey = !1),
            (this.ctrlKey = !1),
            (this.shiftKey = !1),
            (this.timeDown = 0),
            (this.duration = 0),
            (this.timeUp = 0),
            (this.repeats = 0),
            (this.keyCode = b),
            (this.onDown = new c.Signal()),
            (this.onUp = new c.Signal());
      }),
      (c.Key.prototype = {
         processKeyDown: function (a) {
            (this.altKey = a.altKey),
               (this.ctrlKey = a.ctrlKey),
               (this.shiftKey = a.shiftKey),
               this.isDown
                  ? ((this.duration = a.timeStamp - this.timeDown),
                    this.repeats++)
                  : ((this.isDown = !0),
                    (this.isUp = !1),
                    (this.timeDown = a.timeStamp),
                    (this.duration = 0),
                    (this.repeats = 0),
                    this.onDown.dispatch(this));
         },
         processKeyUp: function (a) {
            (this.isDown = !1),
               (this.isUp = !0),
               (this.timeUp = a.timeStamp),
               this.onUp.dispatch(this);
         },
         justPressed: function (a) {
            return (
               "undefined" == typeof a && (a = 250),
               this.isDown && this.duration < a
            );
         },
         justReleased: function (a) {
            return (
               "undefined" == typeof a && (a = 250),
               this.isDown === !1 && this.game.time.now - this.timeUp < a
            );
         },
      }),
      (c.Key.prototype.constructor = c.Key),
      (c.Keyboard = function (a) {
         (this.game = a),
            (this._keys = {}),
            (this._hotkeys = {}),
            (this._capture = {}),
            (this.disabled = !1),
            (this._onKeyDown = null),
            (this._onKeyUp = null),
            (this.callbackContext = this),
            (this.onDownCallback = null),
            (this.onUpCallback = null);
      }),
      (c.Keyboard.prototype = {
         addCallbacks: function (a, b, c) {
            (this.callbackContext = a),
               (this.onDownCallback = b),
               "undefined" != typeof c && (this.onUpCallback = c);
         },
         addKey: function (a) {
            return (
               (this._hotkeys[a] = new c.Key(this.game, a)),
               this.addKeyCapture(a),
               this._hotkeys[a]
            );
         },
         removeKey: function (a) {
            delete this._hotkeys[a];
         },
         createCursorKeys: function () {
            return {
               up: this.addKey(c.Keyboard.UP),
               down: this.addKey(c.Keyboard.DOWN),
               left: this.addKey(c.Keyboard.LEFT),
               right: this.addKey(c.Keyboard.RIGHT),
            };
         },
         start: function () {
            var a = this;
            (this._onKeyDown = function (b) {
               return a.processKeyDown(b);
            }),
               (this._onKeyUp = function (b) {
                  return a.processKeyUp(b);
               }),
               window.addEventListener("keydown", this._onKeyDown, !1),
               window.addEventListener("keyup", this._onKeyUp, !1);
         },
         stop: function () {
            window.removeEventListener("keydown", this._onKeyDown),
               window.removeEventListener("keyup", this._onKeyUp);
         },
         addKeyCapture: function (a) {
            if ("object" == typeof a) for (var b in a) this._capture[a[b]] = !0;
            else this._capture[a] = !0;
         },
         removeKeyCapture: function (a) {
            delete this._capture[a];
         },
         clearCaptures: function () {
            this._capture = {};
         },
         processKeyDown: function (a) {
            this.game.input.disabled ||
               this.disabled ||
               (this._capture[a.keyCode] && a.preventDefault(),
               this.onDownCallback &&
                  this.onDownCallback.call(this.callbackContext, a),
               this._keys[a.keyCode] && this._keys[a.keyCode].isDown
                  ? (this._keys[a.keyCode].duration =
                       this.game.time.now - this._keys[a.keyCode].timeDown)
                  : this._keys[a.keyCode]
                  ? ((this._keys[a.keyCode].isDown = !0),
                    (this._keys[a.keyCode].timeDown = this.game.time.now),
                    (this._keys[a.keyCode].duration = 0))
                  : (this._keys[a.keyCode] = {
                       isDown: !0,
                       timeDown: this.game.time.now,
                       timeUp: 0,
                       duration: 0,
                    }),
               this._hotkeys[a.keyCode] &&
                  this._hotkeys[a.keyCode].processKeyDown(a));
         },
         processKeyUp: function (a) {
            this.game.input.disabled ||
               this.disabled ||
               (this._capture[a.keyCode] && a.preventDefault(),
               this.onUpCallback &&
                  this.onUpCallback.call(this.callbackContext, a),
               this._hotkeys[a.keyCode] &&
                  this._hotkeys[a.keyCode].processKeyUp(a),
               this._keys[a.keyCode]
                  ? ((this._keys[a.keyCode].isDown = !1),
                    (this._keys[a.keyCode].timeUp = this.game.time.now))
                  : (this._keys[a.keyCode] = {
                       isDown: !1,
                       timeDown: this.game.time.now,
                       timeUp: this.game.time.now,
                       duration: 0,
                    }));
         },
         reset: function () {
            for (var a in this._keys) this._keys[a].isDown = !1;
         },
         justPressed: function (a, b) {
            return (
               "undefined" == typeof b && (b = 250),
               this._keys[a] &&
               this._keys[a].isDown &&
               this._keys[a].duration < b
                  ? !0
                  : !1
            );
         },
         justReleased: function (a, b) {
            return (
               "undefined" == typeof b && (b = 250),
               this._keys[a] &&
               this._keys[a].isDown === !1 &&
               this.game.time.now - this._keys[a].timeUp < b
                  ? !0
                  : !1
            );
         },
         isDown: function (a) {
            return this._keys[a] ? this._keys[a].isDown : !1;
         },
      }),
      (c.Keyboard.prototype.constructor = c.Keyboard),
      (c.Keyboard.A = "A".charCodeAt(0)),
      (c.Keyboard.B = "B".charCodeAt(0)),
      (c.Keyboard.C = "C".charCodeAt(0)),
      (c.Keyboard.D = "D".charCodeAt(0)),
      (c.Keyboard.E = "E".charCodeAt(0)),
      (c.Keyboard.F = "F".charCodeAt(0)),
      (c.Keyboard.G = "G".charCodeAt(0)),
      (c.Keyboard.H = "H".charCodeAt(0)),
      (c.Keyboard.I = "I".charCodeAt(0)),
      (c.Keyboard.J = "J".charCodeAt(0)),
      (c.Keyboard.K = "K".charCodeAt(0)),
      (c.Keyboard.L = "L".charCodeAt(0)),
      (c.Keyboard.M = "M".charCodeAt(0)),
      (c.Keyboard.N = "N".charCodeAt(0)),
      (c.Keyboard.O = "O".charCodeAt(0)),
      (c.Keyboard.P = "P".charCodeAt(0)),
      (c.Keyboard.Q = "Q".charCodeAt(0)),
      (c.Keyboard.R = "R".charCodeAt(0)),
      (c.Keyboard.S = "S".charCodeAt(0)),
      (c.Keyboard.T = "T".charCodeAt(0)),
      (c.Keyboard.U = "U".charCodeAt(0)),
      (c.Keyboard.V = "V".charCodeAt(0)),
      (c.Keyboard.W = "W".charCodeAt(0)),
      (c.Keyboard.X = "X".charCodeAt(0)),
      (c.Keyboard.Y = "Y".charCodeAt(0)),
      (c.Keyboard.Z = "Z".charCodeAt(0)),
      (c.Keyboard.ZERO = "0".charCodeAt(0)),
      (c.Keyboard.ONE = "1".charCodeAt(0)),
      (c.Keyboard.TWO = "2".charCodeAt(0)),
      (c.Keyboard.THREE = "3".charCodeAt(0)),
      (c.Keyboard.FOUR = "4".charCodeAt(0)),
      (c.Keyboard.FIVE = "5".charCodeAt(0)),
      (c.Keyboard.SIX = "6".charCodeAt(0)),
      (c.Keyboard.SEVEN = "7".charCodeAt(0)),
      (c.Keyboard.EIGHT = "8".charCodeAt(0)),
      (c.Keyboard.NINE = "9".charCodeAt(0)),
      (c.Keyboard.NUMPAD_0 = 96),
      (c.Keyboard.NUMPAD_1 = 97),
      (c.Keyboard.NUMPAD_2 = 98),
      (c.Keyboard.NUMPAD_3 = 99),
      (c.Keyboard.NUMPAD_4 = 100),
      (c.Keyboard.NUMPAD_5 = 101),
      (c.Keyboard.NUMPAD_6 = 102),
      (c.Keyboard.NUMPAD_7 = 103),
      (c.Keyboard.NUMPAD_8 = 104),
      (c.Keyboard.NUMPAD_9 = 105),
      (c.Keyboard.NUMPAD_MULTIPLY = 106),
      (c.Keyboard.NUMPAD_ADD = 107),
      (c.Keyboard.NUMPAD_ENTER = 108),
      (c.Keyboard.NUMPAD_SUBTRACT = 109),
      (c.Keyboard.NUMPAD_DECIMAL = 110),
      (c.Keyboard.NUMPAD_DIVIDE = 111),
      (c.Keyboard.F1 = 112),
      (c.Keyboard.F2 = 113),
      (c.Keyboard.F3 = 114),
      (c.Keyboard.F4 = 115),
      (c.Keyboard.F5 = 116),
      (c.Keyboard.F6 = 117),
      (c.Keyboard.F7 = 118),
      (c.Keyboard.F8 = 119),
      (c.Keyboard.F9 = 120),
      (c.Keyboard.F10 = 121),
      (c.Keyboard.F11 = 122),
      (c.Keyboard.F12 = 123),
      (c.Keyboard.F13 = 124),
      (c.Keyboard.F14 = 125),
      (c.Keyboard.F15 = 126),
      (c.Keyboard.COLON = 186),
      (c.Keyboard.EQUALS = 187),
      (c.Keyboard.UNDERSCORE = 189),
      (c.Keyboard.QUESTION_MARK = 191),
      (c.Keyboard.TILDE = 192),
      (c.Keyboard.OPEN_BRACKET = 219),
      (c.Keyboard.BACKWARD_SLASH = 220),
      (c.Keyboard.CLOSED_BRACKET = 221),
      (c.Keyboard.QUOTES = 222),
      (c.Keyboard.BACKSPACE = 8),
      (c.Keyboard.TAB = 9),
      (c.Keyboard.CLEAR = 12),
      (c.Keyboard.ENTER = 13),
      (c.Keyboard.SHIFT = 16),
      (c.Keyboard.CONTROL = 17),
      (c.Keyboard.ALT = 18),
      (c.Keyboard.CAPS_LOCK = 20),
      (c.Keyboard.ESC = 27),
      (c.Keyboard.SPACEBAR = 32),
      (c.Keyboard.PAGE_UP = 33),
      (c.Keyboard.PAGE_DOWN = 34),
      (c.Keyboard.END = 35),
      (c.Keyboard.HOME = 36),
      (c.Keyboard.LEFT = 37),
      (c.Keyboard.UP = 38),
      (c.Keyboard.RIGHT = 39),
      (c.Keyboard.DOWN = 40),
      (c.Keyboard.INSERT = 45),
      (c.Keyboard.DELETE = 46),
      (c.Keyboard.HELP = 47),
      (c.Keyboard.NUM_LOCK = 144),
      (c.Mouse = function (a) {
         (this.game = a),
            (this.callbackContext = this.game),
            (this.mouseDownCallback = null),
            (this.mouseMoveCallback = null),
            (this.mouseUpCallback = null),
            (this.capture = !1),
            (this.button = -1),
            (this.disabled = !1),
            (this.locked = !1),
            (this.pointerLock = new c.Signal()),
            (this.event = null),
            (this._onMouseDown = null),
            (this._onMouseMove = null),
            (this._onMouseUp = null);
      }),
      (c.Mouse.NO_BUTTON = -1),
      (c.Mouse.LEFT_BUTTON = 0),
      (c.Mouse.MIDDLE_BUTTON = 1),
      (c.Mouse.RIGHT_BUTTON = 2),
      (c.Mouse.prototype = {
         start: function () {
            var a = this;
            (this.game.device.android && this.game.device.chrome === !1) ||
               ((this._onMouseDown = function (b) {
                  return a.onMouseDown(b);
               }),
               (this._onMouseMove = function (b) {
                  return a.onMouseMove(b);
               }),
               (this._onMouseUp = function (b) {
                  return a.onMouseUp(b);
               }),
               document.addEventListener("mousedown", this._onMouseDown, !0),
               document.addEventListener("mousemove", this._onMouseMove, !0),
               document.addEventListener("mouseup", this._onMouseUp, !0));
         },
         onMouseDown: function (a) {
            (this.event = a),
               this.capture && a.preventDefault(),
               (this.button = a.which),
               this.mouseDownCallback &&
                  this.mouseDownCallback.call(this.callbackContext, a),
               this.game.input.disabled ||
                  this.disabled ||
                  ((a.identifier = 0), this.game.input.mousePointer.start(a));
         },
         onMouseMove: function (a) {
            (this.event = a),
               this.capture && a.preventDefault(),
               this.mouseMoveCallback &&
                  this.mouseMoveCallback.call(this.callbackContext, a),
               this.game.input.disabled ||
                  this.disabled ||
                  ((a.identifier = 0), this.game.input.mousePointer.move(a));
         },
         onMouseUp: function (a) {
            (this.event = a),
               this.capture && a.preventDefault(),
               (this.button = c.Mouse.NO_BUTTON),
               this.mouseUpCallback &&
                  this.mouseUpCallback.call(this.callbackContext, a),
               this.game.input.disabled ||
                  this.disabled ||
                  ((a.identifier = 0), this.game.input.mousePointer.stop(a));
         },
         requestPointerLock: function () {
            if (this.game.device.pointerLock) {
               var a = this.game.stage.canvas;
               (a.requestPointerLock =
                  a.requestPointerLock ||
                  a.mozRequestPointerLock ||
                  a.webkitRequestPointerLock),
                  a.requestPointerLock();
               var b = this;
               (this._pointerLockChange = function (a) {
                  return b.pointerLockChange(a);
               }),
                  document.addEventListener(
                     "pointerlockchange",
                     this._pointerLockChange,
                     !0
                  ),
                  document.addEventListener(
                     "mozpointerlockchange",
                     this._pointerLockChange,
                     !0
                  ),
                  document.addEventListener(
                     "webkitpointerlockchange",
                     this._pointerLockChange,
                     !0
                  );
            }
         },
         pointerLockChange: function (a) {
            var b = this.game.stage.canvas;
            document.pointerLockElement === b ||
            document.mozPointerLockElement === b ||
            document.webkitPointerLockElement === b
               ? ((this.locked = !0), this.pointerLock.dispatch(!0, a))
               : ((this.locked = !1), this.pointerLock.dispatch(!1, a));
         },
         releasePointerLock: function () {
            (document.exitPointerLock =
               document.exitPointerLock ||
               document.mozExitPointerLock ||
               document.webkitExitPointerLock),
               document.exitPointerLock(),
               document.removeEventListener(
                  "pointerlockchange",
                  this._pointerLockChange,
                  !0
               ),
               document.removeEventListener(
                  "mozpointerlockchange",
                  this._pointerLockChange,
                  !0
               ),
               document.removeEventListener(
                  "webkitpointerlockchange",
                  this._pointerLockChange,
                  !0
               );
         },
         stop: function () {
            document.removeEventListener("mousedown", this._onMouseDown, !0),
               document.removeEventListener("mousemove", this._onMouseMove, !0),
               document.removeEventListener("mouseup", this._onMouseUp, !0);
         },
      }),
      (c.Mouse.prototype.constructor = c.Mouse),
      (c.MSPointer = function (a) {
         (this.game = a),
            (this.callbackContext = this.game),
            (this.disabled = !1),
            (this._onMSPointerDown = null),
            (this._onMSPointerMove = null),
            (this._onMSPointerUp = null);
      }),
      (c.MSPointer.prototype = {
         start: function () {
            var a = this;
            this.game.device.mspointer === !0 &&
               ((this._onMSPointerDown = function (b) {
                  return a.onPointerDown(b);
               }),
               (this._onMSPointerMove = function (b) {
                  return a.onPointerMove(b);
               }),
               (this._onMSPointerUp = function (b) {
                  return a.onPointerUp(b);
               }),
               this.game.renderer.view.addEventListener(
                  "MSPointerDown",
                  this._onMSPointerDown,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "MSPointerMove",
                  this._onMSPointerMove,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "MSPointerUp",
                  this._onMSPointerUp,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "pointerDown",
                  this._onMSPointerDown,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "pointerMove",
                  this._onMSPointerMove,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "pointerUp",
                  this._onMSPointerUp,
                  !1
               ),
               (this.game.renderer.view.style["-ms-content-zooming"] = "none"),
               (this.game.renderer.view.style["-ms-touch-action"] = "none"));
         },
         onPointerDown: function (a) {
            this.game.input.disabled ||
               this.disabled ||
               (a.preventDefault(),
               (a.identifier = a.pointerId),
               this.game.input.startPointer(a));
         },
         onPointerMove: function (a) {
            this.game.input.disabled ||
               this.disabled ||
               (a.preventDefault(),
               (a.identifier = a.pointerId),
               this.game.input.updatePointer(a));
         },
         onPointerUp: function (a) {
            this.game.input.disabled ||
               this.disabled ||
               (a.preventDefault(),
               (a.identifier = a.pointerId),
               this.game.input.stopPointer(a));
         },
         stop: function () {
            this.game.stage.canvas.removeEventListener(
               "MSPointerDown",
               this._onMSPointerDown
            ),
               this.game.stage.canvas.removeEventListener(
                  "MSPointerMove",
                  this._onMSPointerMove
               ),
               this.game.stage.canvas.removeEventListener(
                  "MSPointerUp",
                  this._onMSPointerUp
               ),
               this.game.stage.canvas.removeEventListener(
                  "pointerDown",
                  this._onMSPointerDown
               ),
               this.game.stage.canvas.removeEventListener(
                  "pointerMove",
                  this._onMSPointerMove
               ),
               this.game.stage.canvas.removeEventListener(
                  "pointerUp",
                  this._onMSPointerUp
               );
         },
      }),
      (c.MSPointer.prototype.constructor = c.MSPointer),
      (c.Pointer = function (a, b) {
         (this.game = a),
            (this.id = b),
            (this._holdSent = !1),
            (this._history = []),
            (this._nextDrop = 0),
            (this._stateReset = !1),
            (this.withinGame = !1),
            (this.clientX = -1),
            (this.clientY = -1),
            (this.pageX = -1),
            (this.pageY = -1),
            (this.screenX = -1),
            (this.screenY = -1),
            (this.x = -1),
            (this.y = -1),
            (this.isMouse = !1),
            (this.isDown = !1),
            (this.isUp = !0),
            (this.timeDown = 0),
            (this.timeUp = 0),
            (this.previousTapTime = 0),
            (this.totalTouches = 0),
            (this.msSinceLastClick = Number.MAX_VALUE),
            (this.targetObject = null),
            (this.active = !1),
            (this.position = new c.Point()),
            (this.positionDown = new c.Point()),
            (this.circle = new c.Circle(0, 0, 44)),
            0 === b && (this.isMouse = !0);
      }),
      (c.Pointer.prototype = {
         start: function (a) {
            return (
               (this.identifier = a.identifier),
               (this.target = a.target),
               "undefined" != typeof a.button && (this.button = a.button),
               this.game.stage.disableVisibilityChange === !1 &&
               this.game.paused &&
               this.game.stage.scale.incorrectOrientation === !1
                  ? ((this.game.paused = !1), this)
                  : ((this._history.length = 0),
                    (this.active = !0),
                    (this.withinGame = !0),
                    (this.isDown = !0),
                    (this.isUp = !1),
                    (this.msSinceLastClick =
                       this.game.time.now - this.timeDown),
                    (this.timeDown = this.game.time.now),
                    (this._holdSent = !1),
                    this.move(a),
                    this.positionDown.setTo(this.x, this.y),
                    (this.game.input.multiInputOverride ==
                       c.Input.MOUSE_OVERRIDES_TOUCH ||
                       this.game.input.multiInputOverride ==
                          c.Input.MOUSE_TOUCH_COMBINE ||
                       (this.game.input.multiInputOverride ==
                          c.Input.TOUCH_OVERRIDES_MOUSE &&
                          0 === this.game.input.currentPointers)) &&
                       ((this.game.input.x = this.x),
                       (this.game.input.y = this.y),
                       this.game.input.position.setTo(this.x, this.y),
                       this.game.input.onDown.dispatch(this, a),
                       this.game.input.resetSpeed(this.x, this.y)),
                    (this._stateReset = !1),
                    this.totalTouches++,
                    this.isMouse === !1 && this.game.input.currentPointers++,
                    null !== this.targetObject &&
                       this.targetObject._touchedHandler(this),
                    this)
            );
         },
         update: function () {
            this.active &&
               (this._holdSent === !1 &&
                  this.duration >= this.game.input.holdRate &&
                  ((this.game.input.multiInputOverride ==
                     c.Input.MOUSE_OVERRIDES_TOUCH ||
                     this.game.input.multiInputOverride ==
                        c.Input.MOUSE_TOUCH_COMBINE ||
                     (this.game.input.multiInputOverride ==
                        c.Input.TOUCH_OVERRIDES_MOUSE &&
                        0 === this.game.input.currentPointers)) &&
                     this.game.input.onHold.dispatch(this),
                  (this._holdSent = !0)),
               this.game.input.recordPointerHistory &&
                  this.game.time.now >= this._nextDrop &&
                  ((this._nextDrop =
                     this.game.time.now + this.game.input.recordRate),
                  this._history.push({
                     x: this.position.x,
                     y: this.position.y,
                  }),
                  this._history.length > this.game.input.recordLimit &&
                     this._history.shift()));
         },
         move: function (a) {
            if (!this.game.input.pollLocked) {
               if (
                  ("undefined" != typeof a.button && (this.button = a.button),
                  (this.clientX = a.clientX),
                  (this.clientY = a.clientY),
                  (this.pageX = a.pageX),
                  (this.pageY = a.pageY),
                  (this.screenX = a.screenX),
                  (this.screenY = a.screenY),
                  (this.x =
                     (this.pageX - this.game.stage.offset.x) *
                     this.game.input.scale.x),
                  (this.y =
                     (this.pageY - this.game.stage.offset.y) *
                     this.game.input.scale.y),
                  this.position.setTo(this.x, this.y),
                  (this.circle.x = this.x),
                  (this.circle.y = this.y),
                  (this.game.input.multiInputOverride ==
                     c.Input.MOUSE_OVERRIDES_TOUCH ||
                     this.game.input.multiInputOverride ==
                        c.Input.MOUSE_TOUCH_COMBINE ||
                     (this.game.input.multiInputOverride ==
                        c.Input.TOUCH_OVERRIDES_MOUSE &&
                        0 === this.game.input.currentPointers)) &&
                     ((this.game.input.activePointer = this),
                     (this.game.input.x = this.x),
                     (this.game.input.y = this.y),
                     this.game.input.position.setTo(
                        this.game.input.x,
                        this.game.input.y
                     ),
                     (this.game.input.circle.x = this.game.input.x),
                     (this.game.input.circle.y = this.game.input.y)),
                  this.game.paused)
               )
                  return this;
               if (
                  (this.game.input.moveCallback &&
                     this.game.input.moveCallback.call(
                        this.game.input.moveCallbackContext,
                        this,
                        this.x,
                        this.y
                     ),
                  null !== this.targetObject &&
                     this.targetObject.isDragged === !0)
               )
                  return (
                     this.targetObject.update(this) === !1 &&
                        (this.targetObject = null),
                     this
                  );
               if (
                  ((this._highestRenderOrderID = -1),
                  (this._highestRenderObject = null),
                  (this._highestInputPriorityID = -1),
                  this.game.input.interactiveItems.total > 0)
               ) {
                  var b = this.game.input.interactiveItems.next;
                  do {
                     (b.pixelPerfect ||
                        b.priorityID > this._highestInputPriorityID ||
                        (b.priorityID == this._highestInputPriorityID &&
                           b.sprite.renderOrderID >
                              this._highestRenderOrderID)) &&
                        b.checkPointerOver(this) &&
                        ((this._highestRenderOrderID = b.sprite.renderOrderID),
                        (this._highestInputPriorityID = b.priorityID),
                        (this._highestRenderObject = b)),
                        (b = b.next);
                  } while (null != b);
               }
               return (
                  null == this._highestRenderObject
                     ? this.targetObject &&
                       (this.targetObject._pointerOutHandler(this),
                       (this.targetObject = null))
                     : null == this.targetObject
                     ? ((this.targetObject = this._highestRenderObject),
                       this._highestRenderObject._pointerOverHandler(this))
                     : this.targetObject == this._highestRenderObject
                     ? this._highestRenderObject.update(this) === !1 &&
                       (this.targetObject = null)
                     : (this.targetObject._pointerOutHandler(this),
                       (this.targetObject = this._highestRenderObject),
                       this.targetObject._pointerOverHandler(this)),
                  this
               );
            }
         },
         leave: function (a) {
            (this.withinGame = !1), this.move(a);
         },
         stop: function (a) {
            if (this._stateReset) return a.preventDefault(), void 0;
            if (
               ((this.timeUp = this.game.time.now),
               (this.game.input.multiInputOverride ==
                  c.Input.MOUSE_OVERRIDES_TOUCH ||
                  this.game.input.multiInputOverride ==
                     c.Input.MOUSE_TOUCH_COMBINE ||
                  (this.game.input.multiInputOverride ==
                     c.Input.TOUCH_OVERRIDES_MOUSE &&
                     0 === this.game.input.currentPointers)) &&
                  (this.game.input.onUp.dispatch(this, a),
                  this.duration >= 0 &&
                     this.duration <= this.game.input.tapRate &&
                     (this.timeUp - this.previousTapTime <
                     this.game.input.doubleTapRate
                        ? this.game.input.onTap.dispatch(this, !0)
                        : this.game.input.onTap.dispatch(this, !1),
                     (this.previousTapTime = this.timeUp))),
               this.id > 0 && (this.active = !1),
               (this.withinGame = !1),
               (this.isDown = !1),
               (this.isUp = !0),
               this.isMouse === !1 && this.game.input.currentPointers--,
               this.game.input.interactiveItems.total > 0)
            ) {
               var b = this.game.input.interactiveItems.next;
               do {
                  b && b._releasedHandler(this), (b = b.next);
               } while (null != b);
            }
            return (
               this.targetObject && this.targetObject._releasedHandler(this),
               (this.targetObject = null),
               this
            );
         },
         justPressed: function (a) {
            return (
               (a = a || this.game.input.justPressedRate),
               this.isDown === !0 && this.timeDown + a > this.game.time.now
            );
         },
         justReleased: function (a) {
            return (
               (a = a || this.game.input.justReleasedRate),
               this.isUp === !0 && this.timeUp + a > this.game.time.now
            );
         },
         reset: function () {
            this.isMouse === !1 && (this.active = !1),
               (this.identifier = null),
               (this.isDown = !1),
               (this.isUp = !0),
               (this.totalTouches = 0),
               (this._holdSent = !1),
               (this._history.length = 0),
               (this._stateReset = !0),
               this.targetObject && this.targetObject._releasedHandler(this),
               (this.targetObject = null);
         },
      }),
      (c.Pointer.prototype.constructor = c.Pointer),
      Object.defineProperty(c.Pointer.prototype, "duration", {
         get: function () {
            return this.isUp ? -1 : this.game.time.now - this.timeDown;
         },
      }),
      Object.defineProperty(c.Pointer.prototype, "worldX", {
         get: function () {
            return this.game.world.camera.x + this.x;
         },
      }),
      Object.defineProperty(c.Pointer.prototype, "worldY", {
         get: function () {
            return this.game.world.camera.y + this.y;
         },
      }),
      (c.Touch = function (a) {
         (this.game = a),
            (this.disabled = !1),
            (this.callbackContext = this.game),
            (this.touchStartCallback = null),
            (this.touchMoveCallback = null),
            (this.touchEndCallback = null),
            (this.touchEnterCallback = null),
            (this.touchLeaveCallback = null),
            (this.touchCancelCallback = null),
            (this.preventDefault = !0),
            (this.event = null),
            (this._onTouchStart = null),
            (this._onTouchMove = null),
            (this._onTouchEnd = null),
            (this._onTouchEnter = null),
            (this._onTouchLeave = null),
            (this._onTouchCancel = null),
            (this._onTouchMove = null);
      }),
      (c.Touch.prototype = {
         start: function () {
            var a = this;
            this.game.device.touch &&
               ((this._onTouchStart = function (b) {
                  return a.onTouchStart(b);
               }),
               (this._onTouchMove = function (b) {
                  return a.onTouchMove(b);
               }),
               (this._onTouchEnd = function (b) {
                  return a.onTouchEnd(b);
               }),
               (this._onTouchEnter = function (b) {
                  return a.onTouchEnter(b);
               }),
               (this._onTouchLeave = function (b) {
                  return a.onTouchLeave(b);
               }),
               (this._onTouchCancel = function (b) {
                  return a.onTouchCancel(b);
               }),
               this.game.renderer.view.addEventListener(
                  "touchstart",
                  this._onTouchStart,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "touchmove",
                  this._onTouchMove,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "touchend",
                  this._onTouchEnd,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "touchenter",
                  this._onTouchEnter,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "touchleave",
                  this._onTouchLeave,
                  !1
               ),
               this.game.renderer.view.addEventListener(
                  "touchcancel",
                  this._onTouchCancel,
                  !1
               ));
         },
         consumeDocumentTouches: function () {
            (this._documentTouchMove = function (a) {
               a.preventDefault();
            }),
               document.addEventListener(
                  "touchmove",
                  this._documentTouchMove,
                  !1
               );
         },
         onTouchStart: function (a) {
            if (
               ((this.event = a),
               this.touchStartCallback &&
                  this.touchStartCallback.call(this.callbackContext, a),
               !this.game.input.disabled && !this.disabled)
            ) {
               this.preventDefault && a.preventDefault();
               for (var b = 0; b < a.changedTouches.length; b++)
                  this.game.input.startPointer(a.changedTouches[b]);
            }
         },
         onTouchCancel: function (a) {
            if (
               ((this.event = a),
               this.touchCancelCallback &&
                  this.touchCancelCallback.call(this.callbackContext, a),
               !this.game.input.disabled && !this.disabled)
            ) {
               this.preventDefault && a.preventDefault();
               for (var b = 0; b < a.changedTouches.length; b++)
                  this.game.input.stopPointer(a.changedTouches[b]);
            }
         },
         onTouchEnter: function (a) {
            (this.event = a),
               this.touchEnterCallback &&
                  this.touchEnterCallback.call(this.callbackContext, a),
               this.game.input.disabled ||
                  this.disabled ||
                  (this.preventDefault && a.preventDefault());
         },
         onTouchLeave: function (a) {
            (this.event = a),
               this.touchLeaveCallback &&
                  this.touchLeaveCallback.call(this.callbackContext, a),
               this.preventDefault && a.preventDefault();
         },
         onTouchMove: function (a) {
            (this.event = a),
               this.touchMoveCallback &&
                  this.touchMoveCallback.call(this.callbackContext, a),
               this.preventDefault && a.preventDefault();
            for (var b = 0; b < a.changedTouches.length; b++)
               this.game.input.updatePointer(a.changedTouches[b]);
         },
         onTouchEnd: function (a) {
            (this.event = a),
               this.touchEndCallback &&
                  this.touchEndCallback.call(this.callbackContext, a),
               this.preventDefault && a.preventDefault();
            for (var b = 0; b < a.changedTouches.length; b++)
               this.game.input.stopPointer(a.changedTouches[b]);
         },
         stop: function () {
            this.game.device.touch &&
               (this.game.stage.canvas.removeEventListener(
                  "touchstart",
                  this._onTouchStart
               ),
               this.game.stage.canvas.removeEventListener(
                  "touchmove",
                  this._onTouchMove
               ),
               this.game.stage.canvas.removeEventListener(
                  "touchend",
                  this._onTouchEnd
               ),
               this.game.stage.canvas.removeEventListener(
                  "touchenter",
                  this._onTouchEnter
               ),
               this.game.stage.canvas.removeEventListener(
                  "touchleave",
                  this._onTouchLeave
               ),
               this.game.stage.canvas.removeEventListener(
                  "touchcancel",
                  this._onTouchCancel
               ));
         },
      }),
      (c.Touch.prototype.constructor = c.Touch),
      (c.InputHandler = function (a) {
         (this.sprite = a),
            (this.game = a.game),
            (this.enabled = !1),
            (this.priorityID = 0),
            (this.useHandCursor = !1),
            (this.isDragged = !1),
            (this.allowHorizontalDrag = !0),
            (this.allowVerticalDrag = !0),
            (this.bringToTop = !1),
            (this.snapOffset = null),
            (this.snapOnDrag = !1),
            (this.snapOnRelease = !1),
            (this.snapX = 0),
            (this.snapY = 0),
            (this.snapOffsetX = 0),
            (this.snapOffsetY = 0),
            (this.pixelPerfect = !1),
            (this.pixelPerfectAlpha = 255),
            (this.draggable = !1),
            (this.boundsRect = null),
            (this.boundsSprite = null),
            (this.consumePointerEvent = !1),
            (this._tempPoint = new c.Point()),
            (this._pointerData = []),
            this._pointerData.push({
               id: 0,
               x: 0,
               y: 0,
               isDown: !1,
               isUp: !1,
               isOver: !1,
               isOut: !1,
               timeOver: 0,
               timeOut: 0,
               timeDown: 0,
               timeUp: 0,
               downDuration: 0,
               isDragged: !1,
            });
      }),
      (c.InputHandler.prototype = {
         start: function (a, b) {
            if (
               ((a = a || 0),
               "undefined" == typeof b && (b = !1),
               this.enabled === !1)
            ) {
               this.game.input.interactiveItems.add(this),
                  (this.useHandCursor = b),
                  (this.priorityID = a);
               for (var d = 0; 10 > d; d++)
                  this._pointerData[d] = {
                     id: d,
                     x: 0,
                     y: 0,
                     isDown: !1,
                     isUp: !1,
                     isOver: !1,
                     isOut: !1,
                     timeOver: 0,
                     timeOut: 0,
                     timeDown: 0,
                     timeUp: 0,
                     downDuration: 0,
                     isDragged: !1,
                  };
               (this.snapOffset = new c.Point()),
                  (this.enabled = !0),
                  this.sprite.events &&
                     null == this.sprite.events.onInputOver &&
                     ((this.sprite.events.onInputOver = new c.Signal()),
                     (this.sprite.events.onInputOut = new c.Signal()),
                     (this.sprite.events.onInputDown = new c.Signal()),
                     (this.sprite.events.onInputUp = new c.Signal()),
                     (this.sprite.events.onDragStart = new c.Signal()),
                     (this.sprite.events.onDragStop = new c.Signal()));
            }
            return this.sprite;
         },
         reset: function () {
            this.enabled = !1;
            for (var a = 0; 10 > a; a++)
               this._pointerData[a] = {
                  id: a,
                  x: 0,
                  y: 0,
                  isDown: !1,
                  isUp: !1,
                  isOver: !1,
                  isOut: !1,
                  timeOver: 0,
                  timeOut: 0,
                  timeDown: 0,
                  timeUp: 0,
                  downDuration: 0,
                  isDragged: !1,
               };
         },
         stop: function () {
            this.enabled !== !1 &&
               ((this.enabled = !1),
               this.game.input.interactiveItems.remove(this));
         },
         destroy: function () {
            this.enabled &&
               ((this.enabled = !1),
               this.game.input.interactiveItems.remove(this),
               this.stop(),
               (this.sprite = null));
         },
         pointerX: function (a) {
            return (a = a || 0), this._pointerData[a].x;
         },
         pointerY: function (a) {
            return (a = a || 0), this._pointerData[a].y;
         },
         pointerDown: function (a) {
            return (a = a || 0), this._pointerData[a].isDown;
         },
         pointerUp: function (a) {
            return (a = a || 0), this._pointerData[a].isUp;
         },
         pointerTimeDown: function (a) {
            return (a = a || 0), this._pointerData[a].timeDown;
         },
         pointerTimeUp: function (a) {
            return (a = a || 0), this._pointerData[a].timeUp;
         },
         pointerOver: function (a) {
            if (this.enabled) {
               if ("undefined" != typeof a) return this._pointerData[a].isOver;
               for (var b = 0; 10 > b; b++)
                  if (this._pointerData[b].isOver) return !0;
            }
            return !1;
         },
         pointerOut: function (a) {
            if (this.enabled) {
               if ("undefined" != typeof a) return this._pointerData[a].isOut;
               for (var b = 0; 10 > b; b++)
                  if (this._pointerData[b].isOut) return !0;
            }
            return !1;
         },
         pointerTimeOver: function (a) {
            return (a = a || 0), this._pointerData[a].timeOver;
         },
         pointerTimeOut: function (a) {
            return (a = a || 0), this._pointerData[a].timeOut;
         },
         pointerDragged: function (a) {
            return (a = a || 0), this._pointerData[a].isDragged;
         },
         checkPointerOver: function (a) {
            return this.enabled === !1 ||
               this.sprite.visible === !1 ||
               (this.sprite.group && this.sprite.group.visible === !1)
               ? !1
               : (this.sprite.getLocalUnmodifiedPosition(
                    this._tempPoint,
                    a.x,
                    a.y
                 ),
                 this._tempPoint.x >= 0 &&
                 this._tempPoint.x <= this.sprite.currentFrame.width &&
                 this._tempPoint.y >= 0 &&
                 this._tempPoint.y <= this.sprite.currentFrame.height
                    ? this.pixelPerfect
                       ? this.checkPixel(this._tempPoint.x, this._tempPoint.y)
                       : !0
                    : void 0);
         },
         checkPixel: function (a, b) {
            if (this.sprite.texture.baseTexture.source) {
               this.game.input.hitContext.clearRect(0, 0, 1, 1),
                  (a += this.sprite.texture.frame.x),
                  (b += this.sprite.texture.frame.y),
                  this.game.input.hitContext.drawImage(
                     this.sprite.texture.baseTexture.source,
                     a,
                     b,
                     1,
                     1,
                     0,
                     0,
                     1,
                     1
                  );
               var c = this.game.input.hitContext.getImageData(0, 0, 1, 1);
               if (c.data[3] >= this.pixelPerfectAlpha) return !0;
            }
            return !1;
         },
         update: function (a) {
            return this.enabled === !1 ||
               this.sprite.visible === !1 ||
               (this.sprite.group && this.sprite.group.visible === !1)
               ? (this._pointerOutHandler(a), !1)
               : this.draggable && this._draggedPointerID == a.id
               ? this.updateDrag(a)
               : this._pointerData[a.id].isOver === !0
               ? this.checkPointerOver(a)
                  ? ((this._pointerData[a.id].x = a.x - this.sprite.x),
                    (this._pointerData[a.id].y = a.y - this.sprite.y),
                    !0)
                  : (this._pointerOutHandler(a), !1)
               : void 0;
         },
         _pointerOverHandler: function (a) {
            this._pointerData[a.id].isOver === !1 &&
               ((this._pointerData[a.id].isOver = !0),
               (this._pointerData[a.id].isOut = !1),
               (this._pointerData[a.id].timeOver = this.game.time.now),
               (this._pointerData[a.id].x = a.x - this.sprite.x),
               (this._pointerData[a.id].y = a.y - this.sprite.y),
               this.useHandCursor &&
                  this._pointerData[a.id].isDragged === !1 &&
                  (this.game.canvas.style.cursor = "pointer"),
               this.sprite.events.onInputOver.dispatch(this.sprite, a));
         },
         _pointerOutHandler: function (a) {
            (this._pointerData[a.id].isOver = !1),
               (this._pointerData[a.id].isOut = !0),
               (this._pointerData[a.id].timeOut = this.game.time.now),
               this.useHandCursor &&
                  this._pointerData[a.id].isDragged === !1 &&
                  (this.game.canvas.style.cursor = "default"),
               this.sprite &&
                  this.sprite.events &&
                  this.sprite.events.onInputOut.dispatch(this.sprite, a);
         },
         _touchedHandler: function (a) {
            return (
               this._pointerData[a.id].isDown === !1 &&
                  this._pointerData[a.id].isOver === !0 &&
                  ((this._pointerData[a.id].isDown = !0),
                  (this._pointerData[a.id].isUp = !1),
                  (this._pointerData[a.id].timeDown = this.game.time.now),
                  this.sprite.events.onInputDown.dispatch(this.sprite, a),
                  this.draggable && this.isDragged === !1 && this.startDrag(a),
                  this.bringToTop && this.sprite.bringToTop()),
               this.consumePointerEvent
            );
         },
         _releasedHandler: function (a) {
            this._pointerData[a.id].isDown &&
               a.isUp &&
               ((this._pointerData[a.id].isDown = !1),
               (this._pointerData[a.id].isUp = !0),
               (this._pointerData[a.id].timeUp = this.game.time.now),
               (this._pointerData[a.id].downDuration =
                  this._pointerData[a.id].timeUp -
                  this._pointerData[a.id].timeDown),
               this.checkPointerOver(a)
                  ? this.sprite.events.onInputUp.dispatch(this.sprite, a, !0)
                  : (this.sprite.events.onInputUp.dispatch(this.sprite, a, !1),
                    this.useHandCursor &&
                       (this.game.canvas.style.cursor = "default")),
               this.draggable &&
                  this.isDragged &&
                  this._draggedPointerID == a.id &&
                  this.stopDrag(a));
         },
         updateDrag: function (a) {
            return a.isUp
               ? (this.stopDrag(a), !1)
               : (this.sprite.fixedToCamera
                    ? (this.allowHorizontalDrag &&
                         (this.sprite.cameraOffset.x =
                            a.x + this._dragPoint.x + this.dragOffset.x),
                      this.allowVerticalDrag &&
                         (this.sprite.cameraOffset.y =
                            a.y + this._dragPoint.y + this.dragOffset.y),
                      this.boundsRect && this.checkBoundsRect(),
                      this.boundsSprite && this.checkBoundsSprite(),
                      this.snapOnDrag &&
                         ((this.sprite.cameraOffset.x =
                            Math.round(
                               (this.sprite.cameraOffset.x -
                                  (this.snapOffsetX % this.snapX)) /
                                  this.snapX
                            ) *
                               this.snapX +
                            (this.snapOffsetX % this.snapX)),
                         (this.sprite.cameraOffset.y =
                            Math.round(
                               (this.sprite.cameraOffset.y -
                                  (this.snapOffsetY % this.snapY)) /
                                  this.snapY
                            ) *
                               this.snapY +
                            (this.snapOffsetY % this.snapY))))
                    : (this.allowHorizontalDrag &&
                         (this.sprite.x =
                            a.x + this._dragPoint.x + this.dragOffset.x),
                      this.allowVerticalDrag &&
                         (this.sprite.y =
                            a.y + this._dragPoint.y + this.dragOffset.y),
                      this.boundsRect && this.checkBoundsRect(),
                      this.boundsSprite && this.checkBoundsSprite(),
                      this.snapOnDrag &&
                         ((this.sprite.x =
                            Math.round(
                               (this.sprite.x -
                                  (this.snapOffsetX % this.snapX)) /
                                  this.snapX
                            ) *
                               this.snapX +
                            (this.snapOffsetX % this.snapX)),
                         (this.sprite.y =
                            Math.round(
                               (this.sprite.y -
                                  (this.snapOffsetY % this.snapY)) /
                                  this.snapY
                            ) *
                               this.snapY +
                            (this.snapOffsetY % this.snapY)))),
                 !0);
         },
         justOver: function (a, b) {
            return (
               (a = a || 0),
               (b = b || 500),
               this._pointerData[a].isOver && this.overDuration(a) < b
            );
         },
         justOut: function (a, b) {
            return (
               (a = a || 0),
               (b = b || 500),
               this._pointerData[a].isOut &&
                  this.game.time.now - this._pointerData[a].timeOut < b
            );
         },
         justPressed: function (a, b) {
            return (
               (a = a || 0),
               (b = b || 500),
               this._pointerData[a].isDown && this.downDuration(a) < b
            );
         },
         justReleased: function (a, b) {
            return (
               (a = a || 0),
               (b = b || 500),
               this._pointerData[a].isUp &&
                  this.game.time.now - this._pointerData[a].timeUp < b
            );
         },
         overDuration: function (a) {
            return (
               (a = a || 0),
               this._pointerData[a].isOver
                  ? this.game.time.now - this._pointerData[a].timeOver
                  : -1
            );
         },
         downDuration: function (a) {
            return (
               (a = a || 0),
               this._pointerData[a].isDown
                  ? this.game.time.now - this._pointerData[a].timeDown
                  : -1
            );
         },
         enableDrag: function (a, b, d, e, f, g) {
            "undefined" == typeof a && (a = !1),
               "undefined" == typeof b && (b = !1),
               "undefined" == typeof d && (d = !1),
               "undefined" == typeof e && (e = 255),
               "undefined" == typeof f && (f = null),
               "undefined" == typeof g && (g = null),
               (this._dragPoint = new c.Point()),
               (this.draggable = !0),
               (this.bringToTop = b),
               (this.dragOffset = new c.Point()),
               (this.dragFromCenter = a),
               (this.pixelPerfect = d),
               (this.pixelPerfectAlpha = e),
               f && (this.boundsRect = f),
               g && (this.boundsSprite = g);
         },
         disableDrag: function () {
            if (this._pointerData)
               for (var a = 0; 10 > a; a++) this._pointerData[a].isDragged = !1;
            (this.draggable = !1),
               (this.isDragged = !1),
               (this._draggedPointerID = -1);
         },
         startDrag: function (a) {
            (this.isDragged = !0),
               (this._draggedPointerID = a.id),
               (this._pointerData[a.id].isDragged = !0),
               this.sprite.fixedToCamera
                  ? this.dragFromCenter
                     ? (this.sprite.centerOn(a.x, a.y),
                       this._dragPoint.setTo(
                          this.sprite.cameraOffset.x - a.x,
                          this.sprite.cameraOffset.y - a.y
                       ))
                     : this._dragPoint.setTo(
                          this.sprite.cameraOffset.x - a.x,
                          this.sprite.cameraOffset.y - a.y
                       )
                  : this.dragFromCenter
                  ? (this.sprite.centerOn(a.x, a.y),
                    this._dragPoint.setTo(
                       this.sprite.x - a.x,
                       this.sprite.y - a.y
                    ))
                  : this._dragPoint.setTo(
                       this.sprite.x - a.x,
                       this.sprite.y - a.y
                    ),
               this.updateDrag(a),
               this.bringToTop && this.sprite.bringToTop(),
               this.sprite.events.onDragStart.dispatch(this.sprite, a);
         },
         stopDrag: function (a) {
            (this.isDragged = !1),
               (this._draggedPointerID = -1),
               (this._pointerData[a.id].isDragged = !1),
               this.snapOnRelease &&
                  (this.sprite.fixedToCamera
                     ? ((this.sprite.cameraOffset.x =
                          Math.round(
                             (this.sprite.cameraOffset.x -
                                (this.snapOffsetX % this.snapX)) /
                                this.snapX
                          ) *
                             this.snapX +
                          (this.snapOffsetX % this.snapX)),
                       (this.sprite.cameraOffset.y =
                          Math.round(
                             (this.sprite.cameraOffset.y -
                                (this.snapOffsetY % this.snapY)) /
                                this.snapY
                          ) *
                             this.snapY +
                          (this.snapOffsetY % this.snapY)))
                     : ((this.sprite.x =
                          Math.round(
                             (this.sprite.x - (this.snapOffsetX % this.snapX)) /
                                this.snapX
                          ) *
                             this.snapX +
                          (this.snapOffsetX % this.snapX)),
                       (this.sprite.y =
                          Math.round(
                             (this.sprite.y - (this.snapOffsetY % this.snapY)) /
                                this.snapY
                          ) *
                             this.snapY +
                          (this.snapOffsetY % this.snapY)))),
               this.sprite.events.onDragStop.dispatch(this.sprite, a),
               this.sprite.events.onInputUp.dispatch(this.sprite, a),
               this.checkPointerOver(a) === !1 && this._pointerOutHandler(a);
         },
         setDragLock: function (a, b) {
            "undefined" == typeof a && (a = !0),
               "undefined" == typeof b && (b = !0),
               (this.allowHorizontalDrag = a),
               (this.allowVerticalDrag = b);
         },
         enableSnap: function (a, b, c, d) {
            "undefined" == typeof c && (c = !0),
               "undefined" == typeof d && (d = !1),
               "undefined" == typeof snapOffsetX && (snapOffsetX = 0),
               "undefined" == typeof snapOffsetY && (snapOffsetY = 0),
               (this.snapX = a),
               (this.snapY = b),
               (this.snapOffsetX = snapOffsetX),
               (this.snapOffsetY = snapOffsetY),
               (this.snapOnDrag = c),
               (this.snapOnRelease = d);
         },
         disableSnap: function () {
            (this.snapOnDrag = !1), (this.snapOnRelease = !1);
         },
         checkBoundsRect: function () {
            this.sprite.fixedToCamera
               ? (this.sprite.cameraOffset.x < this.boundsRect.left
                    ? (this.sprite.cameraOffset.x =
                         this.boundsRect.cameraOffset.x)
                    : this.sprite.cameraOffset.x + this.sprite.width >
                         this.boundsRect.right &&
                      (this.sprite.cameraOffset.x =
                         this.boundsRect.right - this.sprite.width),
                 this.sprite.cameraOffset.y < this.boundsRect.top
                    ? (this.sprite.cameraOffset.y = this.boundsRect.top)
                    : this.sprite.cameraOffset.y + this.sprite.height >
                         this.boundsRect.bottom &&
                      (this.sprite.cameraOffset.y =
                         this.boundsRect.bottom - this.sprite.height))
               : (this.sprite.x < this.boundsRect.left
                    ? (this.sprite.x = this.boundsRect.x)
                    : this.sprite.x + this.sprite.width >
                         this.boundsRect.right &&
                      (this.sprite.x =
                         this.boundsRect.right - this.sprite.width),
                 this.sprite.y < this.boundsRect.top
                    ? (this.sprite.y = this.boundsRect.top)
                    : this.sprite.y + this.sprite.height >
                         this.boundsRect.bottom &&
                      (this.sprite.y =
                         this.boundsRect.bottom - this.sprite.height));
         },
         checkBoundsSprite: function () {
            this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera
               ? (this.sprite.cameraOffset.x < this.boundsSprite.camerOffset.x
                    ? (this.sprite.cameraOffset.x =
                         this.boundsSprite.camerOffset.x)
                    : this.sprite.cameraOffset.x + this.sprite.width >
                         this.boundsSprite.camerOffset.x +
                            this.boundsSprite.width &&
                      (this.sprite.cameraOffset.x =
                         this.boundsSprite.camerOffset.x +
                         this.boundsSprite.width -
                         this.sprite.width),
                 this.sprite.cameraOffset.y < this.boundsSprite.camerOffset.y
                    ? (this.sprite.cameraOffset.y =
                         this.boundsSprite.camerOffset.y)
                    : this.sprite.cameraOffset.y + this.sprite.height >
                         this.boundsSprite.camerOffset.y +
                            this.boundsSprite.height &&
                      (this.sprite.cameraOffset.y =
                         this.boundsSprite.camerOffset.y +
                         this.boundsSprite.height -
                         this.sprite.height))
               : (this.sprite.x < this.boundsSprite.x
                    ? (this.sprite.x = this.boundsSprite.x)
                    : this.sprite.x + this.sprite.width >
                         this.boundsSprite.x + this.boundsSprite.width &&
                      (this.sprite.x =
                         this.boundsSprite.x +
                         this.boundsSprite.width -
                         this.sprite.width),
                 this.sprite.y < this.boundsSprite.y
                    ? (this.sprite.y = this.boundsSprite.y)
                    : this.sprite.y + this.sprite.height >
                         this.boundsSprite.y + this.boundsSprite.height &&
                      (this.sprite.y =
                         this.boundsSprite.y +
                         this.boundsSprite.height -
                         this.sprite.height));
         },
      }),
      (c.InputHandler.prototype.constructor = c.InputHandler),
      (c.Gamepad = function (a) {
         (this.game = a),
            (this._gamepads = [
               new c.SinglePad(a, this),
               new c.SinglePad(a, this),
               new c.SinglePad(a, this),
               new c.SinglePad(a, this),
            ]),
            (this._gamepadIndexMap = {}),
            (this._rawPads = []),
            (this._active = !1),
            (this.disabled = !1),
            (this._gamepadSupportAvailable =
               !!navigator.webkitGetGamepads ||
               !!navigator.webkitGamepads ||
               -1 != navigator.userAgent.indexOf("Firefox/")),
            (this._prevRawGamepadTypes = []),
            (this._prevTimestamps = []),
            (this.callbackContext = this),
            (this.onConnectCallback = null),
            (this.onDisconnectCallback = null),
            (this.onDownCallback = null),
            (this.onUpCallback = null),
            (this.onAxisCallback = null),
            (this.onFloatCallback = null),
            (this._ongamepadconnected = null),
            (this._gamepaddisconnected = null);
      }),
      (c.Gamepad.prototype = {
         addCallbacks: function (a, b) {
            "undefined" != typeof b &&
               ((this.onConnectCallback =
                  "function" == typeof b.onConnect
                     ? b.onConnect
                     : this.onConnectCallback),
               (this.onDisconnectCallback =
                  "function" == typeof b.onDisconnect
                     ? b.onDisconnect
                     : this.onDisconnectCallback),
               (this.onDownCallback =
                  "function" == typeof b.onDown
                     ? b.onDown
                     : this.onDownCallback),
               (this.onUpCallback =
                  "function" == typeof b.onUp ? b.onUp : this.onUpCallback),
               (this.onAxisCallback =
                  "function" == typeof b.onAxis
                     ? b.onAxis
                     : this.onAxisCallback),
               (this.onFloatCallback =
                  "function" == typeof b.onFloat
                     ? b.onFloat
                     : this.onFloatCallback));
         },
         start: function () {
            this._active = !0;
            var a = this;
            (this._ongamepadconnected = function (b) {
               var c = b.gamepad;
               a._rawPads.push(c), a._gamepads[c.index].connect(c);
            }),
               window.addEventListener(
                  "gamepadconnected",
                  this._ongamepadconnected,
                  !1
               ),
               (this._ongamepaddisconnected = function (b) {
                  var c = b.gamepad;
                  for (var d in a._rawPads)
                     a._rawPads[d].index === c.index && a._rawPads.splice(d, 1);
                  a._gamepads[c.index].disconnect();
               }),
               window.addEventListener(
                  "gamepaddisconnected",
                  this._ongamepaddisconnected,
                  !1
               );
         },
         update: function () {
            this._pollGamepads();
            for (var a = 0; a < this._gamepads.length; a++)
               this._gamepads[a]._connected && this._gamepads[a].pollStatus();
         },
         _pollGamepads: function () {
            var a =
               (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
               navigator.webkitGamepads;
            if (a) {
               this._rawPads = [];
               for (
                  var b = !1, c = 0;
                  c < a.length &&
                  (typeof a[c] !== this._prevRawGamepadTypes[c] &&
                     ((b = !0), (this._prevRawGamepadTypes[c] = typeof a[c])),
                  a[c] && this._rawPads.push(a[c]),
                  3 !== c);
                  c++
               );
               if (b) {
                  for (
                     var d, e = { rawIndices: {}, padIndices: {} }, f = 0;
                     f < this._gamepads.length;
                     f++
                  )
                     if (((d = this._gamepads[f]), d.connected))
                        for (var g = 0; g < this._rawPads.length; g++)
                           this._rawPads[g].index === d.index &&
                              ((e.rawIndices[d.index] = !0),
                              (e.padIndices[f] = !0));
                  for (var h = 0; h < this._gamepads.length; h++)
                     if (((d = this._gamepads[h]), !e.padIndices[h])) {
                        this._rawPads.length < 1 && d.disconnect();
                        for (
                           var i = 0;
                           i < this._rawPads.length && !e.padIndices[h];
                           i++
                        ) {
                           var j = this._rawPads[i];
                           if (j) {
                              if (e.rawIndices[j.index]) {
                                 d.disconnect();
                                 continue;
                              }
                              d.connect(j),
                                 (e.rawIndices[j.index] = !0),
                                 (e.padIndices[h] = !0);
                           } else d.disconnect();
                        }
                     }
               }
            }
         },
         setDeadZones: function (a) {
            for (var b = 0; b < this._gamepads.length; b++)
               this._gamepads[b].deadZone = a;
         },
         stop: function () {
            (this._active = !1),
               window.removeEventListener(
                  "gamepadconnected",
                  this._ongamepadconnected
               ),
               window.removeEventListener(
                  "gamepaddisconnected",
                  this._ongamepaddisconnected
               );
         },
         reset: function () {
            this.update();
            for (var a = 0; a < this._gamepads.length; a++)
               this._gamepads[a].reset();
         },
         justPressed: function (a, b) {
            for (var c = 0; c < this._gamepads.length; c++)
               if (this._gamepads[c].justPressed(a, b) === !0) return !0;
            return !1;
         },
         justReleased: function (a, b) {
            for (var c = 0; c < this._gamepads.length; c++)
               if (this._gamepads[c].justReleased(a, b) === !0) return !0;
            return !1;
         },
         isDown: function (a) {
            for (var b = 0; b < this._gamepads.length; b++)
               if (this._gamepads[b].isDown(a) === !0) return !0;
            return !1;
         },
      }),
      (c.Gamepad.prototype.constructor = c.Gamepad),
      Object.defineProperty(c.Gamepad.prototype, "active", {
         get: function () {
            return this._active;
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "supported", {
         get: function () {
            return this._gamepadSupportAvailable;
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "padsConnected", {
         get: function () {
            return this._rawPads.length;
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "pad1", {
         get: function () {
            return this._gamepads[0];
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "pad2", {
         get: function () {
            return this._gamepads[1];
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "pad3", {
         get: function () {
            return this._gamepads[2];
         },
      }),
      Object.defineProperty(c.Gamepad.prototype, "pad4", {
         get: function () {
            return this._gamepads[3];
         },
      }),
      (c.Gamepad.BUTTON_0 = 0),
      (c.Gamepad.BUTTON_1 = 1),
      (c.Gamepad.BUTTON_2 = 2),
      (c.Gamepad.BUTTON_3 = 3),
      (c.Gamepad.BUTTON_4 = 4),
      (c.Gamepad.BUTTON_5 = 5),
      (c.Gamepad.BUTTON_6 = 6),
      (c.Gamepad.BUTTON_7 = 7),
      (c.Gamepad.BUTTON_8 = 8),
      (c.Gamepad.BUTTON_9 = 9),
      (c.Gamepad.BUTTON_10 = 10),
      (c.Gamepad.BUTTON_11 = 11),
      (c.Gamepad.BUTTON_12 = 12),
      (c.Gamepad.BUTTON_13 = 13),
      (c.Gamepad.BUTTON_14 = 14),
      (c.Gamepad.BUTTON_15 = 15),
      (c.Gamepad.AXIS_0 = 0),
      (c.Gamepad.AXIS_1 = 1),
      (c.Gamepad.AXIS_2 = 2),
      (c.Gamepad.AXIS_3 = 3),
      (c.Gamepad.AXIS_4 = 4),
      (c.Gamepad.AXIS_5 = 5),
      (c.Gamepad.AXIS_6 = 6),
      (c.Gamepad.AXIS_7 = 7),
      (c.Gamepad.AXIS_8 = 8),
      (c.Gamepad.AXIS_9 = 9),
      (c.Gamepad.XBOX360_A = 0),
      (c.Gamepad.XBOX360_B = 1),
      (c.Gamepad.XBOX360_X = 2),
      (c.Gamepad.XBOX360_Y = 3),
      (c.Gamepad.XBOX360_LEFT_BUMPER = 4),
      (c.Gamepad.XBOX360_RIGHT_BUMPER = 5),
      (c.Gamepad.XBOX360_LEFT_TRIGGER = 6),
      (c.Gamepad.XBOX360_RIGHT_TRIGGER = 7),
      (c.Gamepad.XBOX360_BACK = 8),
      (c.Gamepad.XBOX360_START = 9),
      (c.Gamepad.XBOX360_STICK_LEFT_BUTTON = 10),
      (c.Gamepad.XBOX360_STICK_RIGHT_BUTTON = 11),
      (c.Gamepad.XBOX360_DPAD_LEFT = 14),
      (c.Gamepad.XBOX360_DPAD_RIGHT = 15),
      (c.Gamepad.XBOX360_DPAD_UP = 12),
      (c.Gamepad.XBOX360_DPAD_DOWN = 13),
      (c.Gamepad.XBOX360_STICK_LEFT_X = 0),
      (c.Gamepad.XBOX360_STICK_LEFT_Y = 1),
      (c.Gamepad.XBOX360_STICK_RIGHT_X = 2),
      (c.Gamepad.XBOX360_STICK_RIGHT_Y = 3),
      (c.SinglePad = function (a, b) {
         (this.game = a),
            (this._padParent = b),
            (this._index = null),
            (this._rawPad = null),
            (this._connected = !1),
            (this._prevTimestamp = null),
            (this._rawButtons = []),
            (this._buttons = []),
            (this._axes = []),
            (this._hotkeys = []),
            (this.callbackContext = this),
            (this.onConnectCallback = null),
            (this.onDisconnectCallback = null),
            (this.onDownCallback = null),
            (this.onUpCallback = null),
            (this.onAxisCallback = null),
            (this.onFloatCallback = null),
            (this.deadZone = 0.26);
      }),
      (c.SinglePad.prototype = {
         addCallbacks: function (a, b) {
            "undefined" != typeof b &&
               ((this.onConnectCallback =
                  "function" == typeof b.onConnect
                     ? b.onConnect
                     : this.onConnectCallback),
               (this.onDisconnectCallback =
                  "function" == typeof b.onDisconnect
                     ? b.onDisconnect
                     : this.onDisconnectCallback),
               (this.onDownCallback =
                  "function" == typeof b.onDown
                     ? b.onDown
                     : this.onDownCallback),
               (this.onUpCallback =
                  "function" == typeof b.onUp ? b.onUp : this.onUpCallback),
               (this.onAxisCallback =
                  "function" == typeof b.onAxis
                     ? b.onAxis
                     : this.onAxisCallback),
               (this.onFloatCallback =
                  "function" == typeof b.onFloat
                     ? b.onFloat
                     : this.onFloatCallback));
         },
         addButton: function (a) {
            return (
               (this._hotkeys[a] = new c.GamepadButton(this.game, a)),
               this._hotkeys[a]
            );
         },
         pollStatus: function () {
            if (
               !this._rawPad.timestamp ||
               this._rawPad.timestamp != this._prevTimestamp
            ) {
               for (var a = 0; a < this._rawPad.buttons.length; a += 1) {
                  var b = this._rawPad.buttons[a];
                  this._rawButtons[a] !== b &&
                     (1 === b
                        ? this.processButtonDown(a, b)
                        : 0 === b
                        ? this.processButtonUp(a, b)
                        : this.processButtonFloat(a, b),
                     (this._rawButtons[a] = b));
               }
               for (var c = this._rawPad.axes, d = 0; d < c.length; d += 1) {
                  var e = c[d];
                  (e > 0 && e > this.deadZone) || (0 > e && e < -this.deadZone)
                     ? this.processAxisChange({ axis: d, value: e })
                     : this.processAxisChange({ axis: d, value: 0 });
               }
               this._prevTimestamp = this._rawPad.timestamp;
            }
         },
         connect: function (a) {
            var b = !this._connected;
            (this._index = a.index),
               (this._connected = !0),
               (this._rawPad = a),
               (this._rawButtons = a.buttons),
               (this._axes = a.axes),
               b &&
                  this._padParent.onConnectCallback &&
                  this._padParent.onConnectCallback.call(
                     this._padParent.callbackContext,
                     this._index
                  ),
               b &&
                  this.onConnectCallback &&
                  this.onConnectCallback.call(this.callbackContext);
         },
         disconnect: function () {
            var a = this._connected;
            (this._connected = !1),
               (this._rawPad = void 0),
               (this._rawButtons = []),
               (this._buttons = []);
            var b = this._index;
            (this._index = null),
               a &&
                  this._padParent.onDisconnectCallback &&
                  this._padParent.onDisconnectCallback.call(
                     this._padParent.callbackContext,
                     b
                  ),
               a &&
                  this.onDisconnectCallback &&
                  this.onDisconnectCallback.call(this.callbackContext);
         },
         processAxisChange: function (a) {
            this.game.input.disabled ||
               this.game.input.gamepad.disabled ||
               (this._axes[a.axis] !== a.value &&
                  ((this._axes[a.axis] = a.value),
                  this._padParent.onAxisCallback &&
                     this._padParent.onAxisCallback.call(
                        this._padParent.callbackContext,
                        a,
                        this._index
                     ),
                  this.onAxisCallback &&
                     this.onAxisCallback.call(this.callbackContext, a)));
         },
         processButtonDown: function (a, b) {
            this.game.input.disabled ||
               this.game.input.gamepad.disabled ||
               (this._padParent.onDownCallback &&
                  this._padParent.onDownCallback.call(
                     this._padParent.callbackContext,
                     a,
                     b,
                     this._index
                  ),
               this.onDownCallback &&
                  this.onDownCallback.call(this.callbackContext, a, b),
               this._buttons[a] && this._buttons[a].isDown
                  ? (this._buttons[a].duration =
                       this.game.time.now - this._buttons[a].timeDown)
                  : this._buttons[a]
                  ? ((this._buttons[a].isDown = !0),
                    (this._buttons[a].timeDown = this.game.time.now),
                    (this._buttons[a].duration = 0),
                    (this._buttons[a].value = b))
                  : (this._buttons[a] = {
                       isDown: !0,
                       timeDown: this.game.time.now,
                       timeUp: 0,
                       duration: 0,
                       value: b,
                    }),
               this._hotkeys[a] && this._hotkeys[a].processButtonDown(b));
         },
         processButtonUp: function (a, b) {
            this.game.input.disabled ||
               this.game.input.gamepad.disabled ||
               (this._padParent.onUpCallback &&
                  this._padParent.onUpCallback.call(
                     this._padParent.callbackContext,
                     a,
                     b,
                     this._index
                  ),
               this.onUpCallback &&
                  this.onUpCallback.call(this.callbackContext, a, b),
               this._hotkeys[a] && this._hotkeys[a].processButtonUp(b),
               this._buttons[a]
                  ? ((this._buttons[a].isDown = !1),
                    (this._buttons[a].timeUp = this.game.time.now),
                    (this._buttons[a].value = b))
                  : (this._buttons[a] = {
                       isDown: !1,
                       timeDown: this.game.time.now,
                       timeUp: this.game.time.now,
                       duration: 0,
                       value: b,
                    }));
         },
         processButtonFloat: function (a, b) {
            this.game.input.disabled ||
               this.game.input.gamepad.disabled ||
               (this._padParent.onFloatCallback &&
                  this._padParent.onFloatCallback.call(
                     this._padParent.callbackContext,
                     a,
                     b,
                     this._index
                  ),
               this.onFloatCallback &&
                  this.onFloatCallback.call(this.callbackContext, a, b),
               this._buttons[a]
                  ? (this._buttons[a].value = b)
                  : (this._buttons[a] = { value: b }),
               this._hotkeys[a] && this._hotkeys[a].processButtonFloat(b));
         },
         axis: function (a) {
            return this._axes[a] ? this._axes[a] : !1;
         },
         isDown: function (a) {
            return this._buttons[a] ? this._buttons[a].isDown : !1;
         },
         justReleased: function (a, b) {
            return (
               "undefined" == typeof b && (b = 250),
               this._buttons[a] &&
                  this._buttons[a].isDown === !1 &&
                  this.game.time.now - this._buttons[a].timeUp < b
            );
         },
         justPressed: function (a, b) {
            return (
               "undefined" == typeof b && (b = 250),
               this._buttons[a] &&
                  this._buttons[a].isDown &&
                  this._buttons[a].duration < b
            );
         },
         buttonValue: function (a) {
            return this._buttons[a] ? this._buttons[a].value : !1;
         },
         reset: function () {
            for (var a = 0; a < this._buttons.length; a++) this._buttons[a] = 0;
            for (var b = 0; b < this._axes.length; b++) this._axes[b] = 0;
         },
      }),
      (c.SinglePad.prototype.constructor = c.SinglePad),
      Object.defineProperty(c.SinglePad.prototype, "connected", {
         get: function () {
            return this._connected;
         },
      }),
      Object.defineProperty(c.SinglePad.prototype, "index", {
         get: function () {
            return this._index;
         },
      }),
      (c.GamepadButton = function (a, b) {
         (this.game = a),
            (this.isDown = !1),
            (this.isUp = !1),
            (this.timeDown = 0),
            (this.duration = 0),
            (this.timeUp = 0),
            (this.repeats = 0),
            (this.value = 0),
            (this.buttonCode = b),
            (this.onDown = new c.Signal()),
            (this.onUp = new c.Signal()),
            (this.onFloat = new c.Signal());
      }),
      (c.GamepadButton.prototype = {
         processButtonDown: function (a) {
            this.isDown
               ? ((this.duration = this.game.time.now - this.timeDown),
                 this.repeats++)
               : ((this.isDown = !0),
                 (this.isUp = !1),
                 (this.timeDown = this.game.time.now),
                 (this.duration = 0),
                 (this.repeats = 0),
                 (this.value = a),
                 this.onDown.dispatch(this, a));
         },
         processButtonUp: function (a) {
            (this.isDown = !1),
               (this.isUp = !0),
               (this.timeUp = this.game.time.now),
               (this.value = a),
               this.onUp.dispatch(this, a);
         },
         processButtonFloat: function (a) {
            (this.value = a), this.onFloat.dispatch(this, a);
         },
         justPressed: function (a) {
            return (
               "undefined" == typeof a && (a = 250),
               this.isDown && this.duration < a
            );
         },
         justReleased: function (a) {
            return (
               "undefined" == typeof a && (a = 250),
               this.isDown === !1 && this.game.time.now - this.timeUp < a
            );
         },
      }),
      (c.GamepadButton.prototype.constructor = c.GamepadButton),
      (c.Events = function (a) {
         (this.parent = a),
            (this.onAddedToGroup = new c.Signal()),
            (this.onRemovedFromGroup = new c.Signal()),
            (this.onKilled = new c.Signal()),
            (this.onRevived = new c.Signal()),
            (this.onOutOfBounds = new c.Signal()),
            (this.onInputOver = null),
            (this.onInputOut = null),
            (this.onInputDown = null),
            (this.onInputUp = null),
            (this.onDragStart = null),
            (this.onDragStop = null),
            (this.onAnimationStart = null),
            (this.onAnimationComplete = null),
            (this.onAnimationLoop = null),
            (this.onBeginContact = null),
            (this.onEndContact = null);
      }),
      (c.Events.prototype = {
         destroy: function () {
            (this.parent = null),
               this.onAddedToGroup.dispose(),
               this.onRemovedFromGroup.dispose(),
               this.onKilled.dispose(),
               this.onRevived.dispose(),
               this.onOutOfBounds.dispose(),
               this.onInputOver &&
                  (this.onInputOver.dispose(),
                  this.onInputOut.dispose(),
                  this.onInputDown.dispose(),
                  this.onInputUp.dispose(),
                  this.onDragStart.dispose(),
                  this.onDragStop.dispose()),
               this.onAnimationStart &&
                  (this.onAnimationStart.dispose(),
                  this.onAnimationComplete.dispose(),
                  this.onAnimationLoop.dispose());
         },
      }),
      (c.Events.prototype.constructor = c.Events),
      (c.GameObjectFactory = function (a) {
         (this.game = a), (this.world = this.game.world);
      }),
      (c.GameObjectFactory.prototype = {
         existing: function (a) {
            return this.world.add(a);
         },
         sprite: function (a, b, c, d, e) {
            return (
               "undefined" == typeof e && (e = this.world), e.create(a, b, c, d)
            );
         },
         child: function (a, b, c, d, e) {
            return a.create(b, c, d, e);
         },
         tween: function (a) {
            return this.game.tweens.create(a);
         },
         group: function (a, b) {
            return new c.Group(this.game, a, b);
         },
         audio: function (a, b, c, d) {
            return this.game.sound.add(a, b, c, d);
         },
         sound: function (a, b, c, d) {
            return this.game.sound.add(a, b, c, d);
         },
         tileSprite: function (a, b, d, e, f, g) {
            return (
               "undefined" == typeof g && (g = this.world),
               g.add(new c.TileSprite(this.game, a, b, d, e, f))
            );
         },
         text: function (a, b, d, e, f) {
            return (
               "undefined" == typeof f && (f = this.world),
               f.add(new c.Text(this.game, a, b, d, e))
            );
         },
         button: function (a, b, d, e, f, g, h, i, j, k) {
            return (
               "undefined" == typeof k && (k = this.world),
               k.add(new c.Button(this.game, a, b, d, e, f, g, h, i, j))
            );
         },
         graphics: function (a, b, d) {
            return (
               "undefined" == typeof d && (d = this.world),
               d.add(new c.Graphics(this.game, a, b))
            );
         },
         emitter: function (a, b, d) {
            return this.game.particles.add(
               new c.Particles.Arcade.Emitter(this.game, a, b, d)
            );
         },
         bitmapText: function (a, b, d, e, f) {
            return (
               "undefined" == typeof f && (f = this.world),
               this.world.add(new c.BitmapText(this.game, a, b, d, e))
            );
         },
         tilemap: function (a, b) {
            return new c.Tilemap(this.game, a, b);
         },
         renderTexture: function (a, b, d) {
            var e = new c.RenderTexture(this.game, a, b, d);
            return this.game.cache.addRenderTexture(a, e), e;
         },
         bitmapData: function (a, b) {
            return new c.BitmapData(this.game, a, b);
         },
         filter: function (a) {
            var b = Array.prototype.splice.call(arguments, 1),
               a = new c.Filter[a](this.game);
            return a.init.apply(a, b), a;
         },
      }),
      (c.GameObjectFactory.prototype.constructor = c.GameObjectFactory),
      (c.BitmapData = function (a, d, e) {
         "undefined" == typeof d && (d = 256),
            "undefined" == typeof e && (e = 256),
            (this.game = a),
            (this.name = ""),
            (this.width = d),
            (this.height = e),
            (this.canvas = c.Canvas.create(d, e)),
            (this.context = this.canvas.getContext("2d")),
            (this.imageData = this.context.getImageData(0, 0, d, e)),
            (this.pixels = this.imageData.data.buffer
               ? this.imageData.data.buffer
               : this.imageData.data),
            (this.baseTexture = new b.BaseTexture(this.canvas)),
            (this.texture = new b.Texture(this.baseTexture)),
            (this.textureFrame = new c.Frame(
               0,
               0,
               0,
               d,
               e,
               "bitmapData",
               a.rnd.uuid()
            )),
            (this.type = c.BITMAPDATA),
            (this._dirty = !1);
      }),
      (c.BitmapData.prototype = {
         add: function (a) {
            a.loadTexture(this);
         },
         addTo: function (a) {
            for (var b = 0; b < a.length; b++)
               a[b].texture && a[b].loadTexture(this);
         },
         clear: function () {
            this.context.clearRect(0, 0, this.width, this.height),
               (this._dirty = !0);
         },
         refreshBuffer: function () {
            (this.imageData = this.context.getImageData(
               0,
               0,
               this.width,
               this.height
            )),
               (this.pixels = new Int32Array(this.imageData.data.buffer));
         },
         setPixel32: function (a, b, c, d, e, f) {
            a >= 0 &&
               a <= this.width &&
               b >= 0 &&
               b <= this.height &&
               ((this.pixels[b * this.width + a] =
                  (f << 24) | (e << 16) | (d << 8) | c),
               this.context.putImageData(this.imageData, 0, 0),
               (this._dirty = !0));
         },
         setPixel: function (a, b, c, d, e) {
            this.setPixel32(a, b, c, d, e, 255);
         },
         getPixel: function (a, b) {
            return a >= 0 && a <= this.width && b >= 0 && b <= this.height
               ? this.data32[b * this.width + a]
               : void 0;
         },
         getPixel32: function (a, b) {
            return a >= 0 && a <= this.width && b >= 0 && b <= this.height
               ? this.data32[b * this.width + a]
               : void 0;
         },
         getPixels: function (a) {
            return this.context.getImageData(a.x, a.y, a.width, a.height);
         },
         arc: function (a, b, c, d, e, f) {
            return (
               "undefined" == typeof f && (f = !1),
               (this._dirty = !0),
               this.context.arc(a, b, c, d, e, f),
               this
            );
         },
         arcTo: function (a, b, c, d, e) {
            return (this._dirty = !0), this.context.arcTo(a, b, c, d, e), this;
         },
         beginFill: function (a) {
            return this.fillStyle(a), this;
         },
         beginLinearGradientFill: function (a, b, c, d, e, f) {
            for (
               var g = this.createLinearGradient(c, d, e, f),
                  h = 0,
                  i = a.length;
               i > h;
               h++
            )
               g.addColorStop(b[h], a[h]);
            return this.fillStyle(g), this;
         },
         beginLinearGradientStroke: function (a, b, c, d, e, f) {
            for (
               var g = this.createLinearGradient(c, d, e, f),
                  h = 0,
                  i = a.length;
               i > h;
               h++
            )
               g.addColorStop(b[h], a[h]);
            return this.strokeStyle(g), this;
         },
         beginRadialGradientStroke: function (a, b, c, d, e, f, g, h) {
            for (
               var i = this.createRadialGradient(c, d, e, f, g, h),
                  j = 0,
                  k = a.length;
               k > j;
               j++
            )
               i.addColorStop(b[j], a[j]);
            return this.strokeStyle(i), this;
         },
         beginPath: function () {
            return this.context.beginPath(), this;
         },
         beginStroke: function (a) {
            return this.strokeStyle(a), this;
         },
         bezierCurveTo: function (a, b, c, d, e, f) {
            return (
               (this._dirty = !0),
               this.context.bezierCurveTo(a, b, c, d, e, f),
               this
            );
         },
         circle: function (a, b, c) {
            return this.arc(a, b, c, 0, 2 * Math.PI), this;
         },
         clearRect: function (a, b, c, d) {
            return (this._dirty = !0), this.context.clearRect(a, b, c, d), this;
         },
         clip: function () {
            return (this._dirty = !0), this.context.clip(), this;
         },
         closePath: function () {
            return (this._dirty = !0), this.context.closePath(), this;
         },
         createLinearGradient: function (a, b, c, d) {
            return this.context.createLinearGradient(a, b, c, d);
         },
         createRadialGradient: function (a, b, c, d, e, f) {
            return this.context.createRadialGradient(a, b, c, d, e, f);
         },
         ellipse: function (a, b, c, d) {
            var e = 0.5522848,
               f = (c / 2) * e,
               g = (d / 2) * e,
               h = a + c,
               i = b + d,
               j = a + c / 2,
               k = b + d / 2;
            return (
               this.moveTo(a, k),
               this.bezierCurveTo(a, k - g, j - f, b, j, b),
               this.bezierCurveTo(j + f, b, h, k - g, h, k),
               this.bezierCurveTo(h, k + g, j + f, i, j, i),
               this.bezierCurveTo(j - f, i, a, k + g, a, k),
               this
            );
         },
         fill: function () {
            return (this._dirty = !0), this.context.fill(), this;
         },
         fillRect: function (a, b, c, d) {
            return (this._dirty = !0), this.context.fillRect(a, b, c, d), this;
         },
         fillStyle: function (a) {
            return (this.context.fillStyle = a), this;
         },
         font: function (a) {
            return (this.context.font = a), this;
         },
         globalAlpha: function (a) {
            return (this.context.globalAlpha = a), this;
         },
         globalCompositeOperation: function (a) {
            return (this.context.globalCompositeOperation = a), this;
         },
         lineCap: function (a) {
            return (this.context.lineCap = a), this;
         },
         lineDashOffset: function (a) {
            return (this.context.lineDashOffset = a), this;
         },
         lineJoin: function (a) {
            return (this.context.lineJoin = a), this;
         },
         lineWidth: function (a) {
            return (this.context.lineWidth = a), this;
         },
         miterLimit: function (a) {
            return (this.context.miterLimit = a), this;
         },
         lineTo: function (a, b) {
            return (this._dirty = !0), this.context.lineTo(a, b), this;
         },
         moveTo: function (a, b) {
            return this.context.moveTo(a, b), this;
         },
         quadraticCurveTo: function (a, b, c, d) {
            return (
               (this._dirty = !0),
               this.context.quadraticCurveTo(a, b, c, d),
               this
            );
         },
         rect: function (a, b, c, d) {
            return (this._dirty = !0), this.context.rect(a, b, c, d), this;
         },
         restore: function () {
            return (this._dirty = !0), this.context.restore(), this;
         },
         rotate: function (a) {
            return (this._dirty = !0), this.context.rotate(a), this;
         },
         setStrokeStyle: function (a, b, c, d, e) {
            return (
               "undefined" == typeof a && (a = 1),
               "undefined" == typeof b && (b = "butt"),
               "undefined" == typeof c && (c = "miter"),
               "undefined" == typeof d && (d = 10),
               (e = !1),
               this.lineWidth(a),
               this.lineCap(b),
               this.lineJoin(c),
               this.miterLimit(d),
               this
            );
         },
         save: function () {
            return (this._dirty = !0), this.context.save(), this;
         },
         scale: function (a, b) {
            return (this._dirty = !0), this.context.scale(a, b), this;
         },
         scrollPathIntoView: function () {
            return (this._dirty = !0), this.context.scrollPathIntoView(), this;
         },
         stroke: function () {
            return (this._dirty = !0), this.context.stroke(), this;
         },
         strokeRect: function (a, b, c, d) {
            return (
               (this._dirty = !0), this.context.strokeRect(a, b, c, d), this
            );
         },
         strokeStyle: function (a) {
            return (this.context.strokeStyle = a), this;
         },
         render: function () {
            this._dirty &&
               (this.game.renderType == c.WEBGL &&
                  b.texturesToUpdate.push(this.baseTexture),
               (this._dirty = !1));
         },
      }),
      (c.BitmapData.prototype.constructor = c.BitmapData),
      (c.BitmapData.prototype.mt = c.BitmapData.prototype.moveTo),
      (c.BitmapData.prototype.lt = c.BitmapData.prototype.lineTo),
      (c.BitmapData.prototype.at = c.BitmapData.prototype.arcTo),
      (c.BitmapData.prototype.bt = c.BitmapData.prototype.bezierCurveTo),
      (c.BitmapData.prototype.qt = c.BitmapData.prototype.quadraticCurveTo),
      (c.BitmapData.prototype.a = c.BitmapData.prototype.arc),
      (c.BitmapData.prototype.r = c.BitmapData.prototype.rect),
      (c.BitmapData.prototype.cp = c.BitmapData.prototype.closePath),
      (c.BitmapData.prototype.c = c.BitmapData.prototype.clear),
      (c.BitmapData.prototype.f = c.BitmapData.prototype.beginFill),
      (c.BitmapData.prototype.lf =
         c.BitmapData.prototype.beginLinearGradientFill),
      (c.BitmapData.prototype.rf =
         c.BitmapData.prototype.beginRadialGradientFill),
      (c.BitmapData.prototype.ef = c.BitmapData.prototype.endFill),
      (c.BitmapData.prototype.ss = c.BitmapData.prototype.setStrokeStyle),
      (c.BitmapData.prototype.s = c.BitmapData.prototype.beginStroke),
      (c.BitmapData.prototype.ls =
         c.BitmapData.prototype.beginLinearGradientStroke),
      (c.BitmapData.prototype.rs =
         c.BitmapData.prototype.beginRadialGradientStroke),
      (c.BitmapData.prototype.dr = c.BitmapData.prototype.rect),
      (c.BitmapData.prototype.dc = c.BitmapData.prototype.circle),
      (c.BitmapData.prototype.de = c.BitmapData.prototype.ellipse),
      (c.Sprite = function (a, d, e, f, g) {
         (d = d || 0),
            (e = e || 0),
            (f = f || null),
            (g = g || null),
            (this.game = a),
            (this.exists = !0),
            (this.alive = !0),
            (this.group = null),
            (this.name = ""),
            (this.type = c.SPRITE),
            (this.renderOrderID = -1),
            (this.lifespan = 0),
            (this.events = new c.Events(this)),
            (this.animations = new c.AnimationManager(this)),
            (this.input = new c.InputHandler(this)),
            (this.key = f),
            (this.currentFrame = null),
            f instanceof c.RenderTexture
               ? (b.Sprite.call(this, f),
                 (this.currentFrame = this.game.cache.getTextureFrame(f.name)))
               : f instanceof c.BitmapData
               ? (b.Sprite.call(this, f.texture, f.textureFrame),
                 (this.currentFrame = f.textureFrame))
               : f instanceof b.Texture
               ? (b.Sprite.call(this, f), (this.currentFrame = g))
               : (null === f || "undefined" == typeof f
                    ? ((f = "__default"), (this.key = f))
                    : "string" == typeof f &&
                      this.game.cache.checkImageKey(f) === !1 &&
                      ((f = "__missing"), (this.key = f)),
                 b.Sprite.call(this, b.TextureCache[f]),
                 this.game.cache.isSpriteSheet(f)
                    ? (this.animations.loadFrameData(
                         this.game.cache.getFrameData(f)
                      ),
                      null !== g &&
                         ("string" == typeof g
                            ? (this.frameName = g)
                            : (this.frame = g)))
                    : (this.currentFrame = this.game.cache.getFrame(f))),
            (this.textureRegion = new c.Rectangle(
               this.texture.frame.x,
               this.texture.frame.y,
               this.texture.frame.width,
               this.texture.frame.height
            )),
            (this.anchor = new c.Point()),
            (this.x = d),
            (this.y = e),
            (this.position.x = d),
            (this.position.y = e),
            (this.world = new c.Point(d, e)),
            (this.autoCull = !1),
            (this.scale = new c.Point(1, 1)),
            (this._cache = {
               fresh: !0,
               dirty: !1,
               a00: -1,
               a01: -1,
               a02: -1,
               a10: -1,
               a11: -1,
               a12: -1,
               id: -1,
               i01: -1,
               i10: -1,
               idi: -1,
               left: null,
               right: null,
               top: null,
               bottom: null,
               prevX: d,
               prevY: e,
               x: -1,
               y: -1,
               scaleX: 1,
               scaleY: 1,
               width: this.currentFrame.sourceSizeW,
               height: this.currentFrame.sourceSizeH,
               halfWidth: Math.floor(this.currentFrame.sourceSizeW / 2),
               halfHeight: Math.floor(this.currentFrame.sourceSizeH / 2),
               calcWidth: -1,
               calcHeight: -1,
               frameID: -1,
               frameWidth: this.currentFrame.width,
               frameHeight: this.currentFrame.height,
               cameraVisible: !0,
               cropX: 0,
               cropY: 0,
               cropWidth: this.currentFrame.sourceSizeW,
               cropHeight: this.currentFrame.sourceSizeH,
            }),
            (this.offset = new c.Point()),
            (this.center = new c.Point(
               d + Math.floor(this._cache.width / 2),
               e + Math.floor(this._cache.height / 2)
            )),
            (this.topLeft = new c.Point(d, e)),
            (this.topRight = new c.Point(d + this._cache.width, e)),
            (this.bottomRight = new c.Point(
               d + this._cache.width,
               e + this._cache.height
            )),
            (this.bottomLeft = new c.Point(d, e + this._cache.height)),
            (this.bounds = new c.Rectangle(
               d,
               e,
               this._cache.width,
               this._cache.height
            )),
            (this.body = new c.Physics.Arcade.Body(this)),
            (this.health = 1),
            (this.inWorld = c.Rectangle.intersects(
               this.bounds,
               this.game.world.bounds
            )),
            (this.inWorldThreshold = 0),
            (this.outOfBoundsKill = !1),
            (this._outOfBoundsFired = !1),
            (this.fixedToCamera = !1),
            (this.cameraOffset = new c.Point(d, e)),
            (this.crop = new c.Rectangle(
               0,
               0,
               this._cache.width,
               this._cache.height
            )),
            (this.cropEnabled = !1),
            (this.debug = !1),
            this.updateCache(),
            this.updateBounds();
      }),
      (c.Sprite.prototype = Object.create(b.Sprite.prototype)),
      (c.Sprite.prototype.constructor = c.Sprite),
      (c.Sprite.prototype.preUpdate = function () {
         return this._cache.fresh
            ? (this.world.setTo(
                 this.parent.position.x + this.x,
                 this.parent.position.y + this.y
              ),
              (this.worldTransform[2] = this.world.x),
              (this.worldTransform[5] = this.world.y),
              (this._cache.fresh = !1),
              this.body &&
                 ((this.body.x =
                    this.world.x -
                    this.anchor.x * this.width +
                    this.body.offset.x),
                 (this.body.y =
                    this.world.y -
                    this.anchor.y * this.height +
                    this.body.offset.y),
                 (this.body.preX = this.body.x),
                 (this.body.preY = this.body.y)),
              void 0)
            : !this.exists || (this.group && !this.group.exists)
            ? ((this.renderOrderID = -1), !1)
            : this.lifespan > 0 &&
              ((this.lifespan -= this.game.time.elapsed), this.lifespan <= 0)
            ? (this.kill(), !1)
            : ((this._cache.dirty = !1),
              this.visible &&
                 (this.renderOrderID = this.game.world.currentRenderOrderID++),
              this.updateCache(),
              this.updateAnimation(),
              this.updateCrop(),
              (this._cache.dirty ||
                 this.world.x !== this._cache.prevX ||
                 this.world.y !== this._cache.prevY) &&
                 this.updateBounds(),
              this.body && this.body.preUpdate(),
              !0);
      }),
      (c.Sprite.prototype.updateCache = function () {
         (this._cache.prevX = this.world.x),
            (this._cache.prevY = this.world.y),
            this.fixedToCamera &&
               ((this.x = this.game.camera.view.x + this.cameraOffset.x),
               (this.y = this.game.camera.view.y + this.cameraOffset.y)),
            this.world.setTo(
               this.game.camera.x + this.worldTransform[2],
               this.game.camera.y + this.worldTransform[5]
            ),
            (this.worldTransform[1] != this._cache.i01 ||
               this.worldTransform[3] != this._cache.i10 ||
               this.worldTransform[0] != this._cache.a00 ||
               this.worldTransform[41] != this._cache.a11) &&
               ((this._cache.a00 = this.worldTransform[0]),
               (this._cache.a01 = this.worldTransform[1]),
               (this._cache.a10 = this.worldTransform[3]),
               (this._cache.a11 = this.worldTransform[4]),
               (this._cache.i01 = this.worldTransform[1]),
               (this._cache.i10 = this.worldTransform[3]),
               (this._cache.scaleX = Math.sqrt(
                  this._cache.a00 * this._cache.a00 +
                     this._cache.a01 * this._cache.a01
               )),
               (this._cache.scaleY = Math.sqrt(
                  this._cache.a10 * this._cache.a10 +
                     this._cache.a11 * this._cache.a11
               )),
               (this._cache.a01 *= -1),
               (this._cache.a10 *= -1),
               (this._cache.id =
                  1 /
                  (this._cache.a00 * this._cache.a11 +
                     this._cache.a01 * -this._cache.a10)),
               (this._cache.idi =
                  1 /
                  (this._cache.a00 * this._cache.a11 +
                     this._cache.i01 * -this._cache.i10)),
               (this._cache.dirty = !0)),
            (this._cache.a02 = this.worldTransform[2]),
            (this._cache.a12 = this.worldTransform[5]);
      }),
      (c.Sprite.prototype.updateAnimation = function () {
         (this.animations.update() ||
            (this.currentFrame &&
               this.currentFrame.uuid != this._cache.frameID)) &&
            ((this._cache.frameID = this.currentFrame.uuid),
            (this._cache.frameWidth = this.texture.frame.width),
            (this._cache.frameHeight = this.texture.frame.height),
            (this._cache.width = this.currentFrame.width),
            (this._cache.height = this.currentFrame.height),
            (this._cache.halfWidth = Math.floor(this._cache.width / 2)),
            (this._cache.halfHeight = Math.floor(this._cache.height / 2)),
            (this._cache.dirty = !0));
      }),
      (c.Sprite.prototype.updateCrop = function () {
         !this.cropEnabled ||
            (this.crop.width == this._cache.cropWidth &&
               this.crop.height == this._cache.cropHeight &&
               this.crop.x == this._cache.cropX &&
               this.crop.y == this._cache.cropY) ||
            (this.crop.floorAll(),
            (this._cache.cropX = this.crop.x),
            (this._cache.cropY = this.crop.y),
            (this._cache.cropWidth = this.crop.width),
            (this._cache.cropHeight = this.crop.height),
            (this.texture.frame = this.crop),
            (this.texture.width = this.crop.width),
            (this.texture.height = this.crop.height),
            (this.texture.updateFrame = !0),
            b.Texture.frameUpdates.push(this.texture));
      }),
      (c.Sprite.prototype.updateBounds = function () {
         this.offset.setTo(
            this._cache.a02 - this.anchor.x * this.width,
            this._cache.a12 - this.anchor.y * this.height
         ),
            this.getLocalPosition(
               this.center,
               this.offset.x + this.width / 2,
               this.offset.y + this.height / 2
            ),
            this.getLocalPosition(this.topLeft, this.offset.x, this.offset.y),
            this.getLocalPosition(
               this.topRight,
               this.offset.x + this.width,
               this.offset.y
            ),
            this.getLocalPosition(
               this.bottomLeft,
               this.offset.x,
               this.offset.y + this.height
            ),
            this.getLocalPosition(
               this.bottomRight,
               this.offset.x + this.width,
               this.offset.y + this.height
            ),
            (this._cache.left = c.Math.min(
               this.topLeft.x,
               this.topRight.x,
               this.bottomLeft.x,
               this.bottomRight.x
            )),
            (this._cache.right = c.Math.max(
               this.topLeft.x,
               this.topRight.x,
               this.bottomLeft.x,
               this.bottomRight.x
            )),
            (this._cache.top = c.Math.min(
               this.topLeft.y,
               this.topRight.y,
               this.bottomLeft.y,
               this.bottomRight.y
            )),
            (this._cache.bottom = c.Math.max(
               this.topLeft.y,
               this.topRight.y,
               this.bottomLeft.y,
               this.bottomRight.y
            )),
            this.bounds.setTo(
               this._cache.left,
               this._cache.top,
               this._cache.right - this._cache.left,
               this._cache.bottom - this._cache.top
            ),
            (this.updateFrame = !0),
            this.inWorld === !1
               ? ((this.inWorld = c.Rectangle.intersects(
                    this.bounds,
                    this.game.world.bounds,
                    this.inWorldThreshold
                 )),
                 this.inWorld && (this._outOfBoundsFired = !1))
               : ((this.inWorld = c.Rectangle.intersects(
                    this.bounds,
                    this.game.world.bounds,
                    this.inWorldThreshold
                 )),
                 this.inWorld === !1 &&
                    (this.events.onOutOfBounds.dispatch(this),
                    (this._outOfBoundsFired = !0),
                    this.outOfBoundsKill && this.kill())),
            (this._cache.cameraVisible = c.Rectangle.intersects(
               this.game.world.camera.screenView,
               this.bounds,
               0
            )),
            this.autoCull && (this.renderable = this._cache.cameraVisible);
      }),
      (c.Sprite.prototype.getLocalPosition = function (a, b, c) {
         return (
            (a.x =
               (this._cache.a11 * this._cache.id * b +
                  -this._cache.a01 * this._cache.id * c +
                  (this._cache.a12 * this._cache.a01 -
                     this._cache.a02 * this._cache.a11) *
                     this._cache.id) *
                  this.scale.x +
               this._cache.a02),
            (a.y =
               (this._cache.a00 * this._cache.id * c +
                  -this._cache.a10 * this._cache.id * b +
                  (-this._cache.a12 * this._cache.a00 +
                     this._cache.a02 * this._cache.a10) *
                     this._cache.id) *
                  this.scale.y +
               this._cache.a12),
            a
         );
      }),
      (c.Sprite.prototype.getLocalUnmodifiedPosition = function (a, b, c) {
         return (
            (a.x =
               this._cache.a11 * this._cache.idi * b +
               -this._cache.i01 * this._cache.idi * c +
               (this._cache.a12 * this._cache.i01 -
                  this._cache.a02 * this._cache.a11) *
                  this._cache.idi +
               this.anchor.x * this._cache.width),
            (a.y =
               this._cache.a00 * this._cache.idi * c +
               -this._cache.i10 * this._cache.idi * b +
               (-this._cache.a12 * this._cache.a00 +
                  this._cache.a02 * this._cache.i10) *
                  this._cache.idi +
               this.anchor.y * this._cache.height),
            a
         );
      }),
      (c.Sprite.prototype.resetCrop = function () {
         (this.crop = new c.Rectangle(
            0,
            0,
            this._cache.width,
            this._cache.height
         )),
            this.texture.setFrame(this.crop),
            (this.cropEnabled = !1);
      }),
      (c.Sprite.prototype.postUpdate = function () {
         this.key instanceof c.BitmapData &&
            this.key._dirty &&
            this.key.render(),
            this.exists &&
               (this.body && this.body.postUpdate(),
               this.fixedToCamera
                  ? ((this._cache.x =
                       this.game.camera.view.x + this.cameraOffset.x),
                    (this._cache.y =
                       this.game.camera.view.y + this.cameraOffset.y))
                  : ((this._cache.x = this.x), (this._cache.y = this.y)),
               (this.position.x = this._cache.x),
               (this.position.y = this._cache.y));
      }),
      (c.Sprite.prototype.loadTexture = function (a, d) {
         (this.key = a),
            a instanceof c.RenderTexture
               ? (this.currentFrame = this.game.cache.getTextureFrame(a.name))
               : a instanceof c.BitmapData
               ? (this.setTexture(a.texture),
                 (this.currentFrame = a.textureFrame))
               : a instanceof b.Texture
               ? (this.currentFrame = d)
               : (("undefined" == typeof a ||
                    this.game.cache.checkImageKey(a) === !1) &&
                    ((a = "__default"), (this.key = a)),
                 this.game.cache.isSpriteSheet(a)
                    ? (this.animations.loadFrameData(
                         this.game.cache.getFrameData(a)
                      ),
                      "undefined" != typeof d &&
                         ("string" == typeof d
                            ? (this.frameName = d)
                            : (this.frame = d)))
                    : ((this.currentFrame = this.game.cache.getFrame(a)),
                      this.setTexture(b.TextureCache[a])));
      }),
      (c.Sprite.prototype.centerOn = function (a, b) {
         return (
            this.fixedToCamera
               ? ((this.cameraOffset.x =
                    a + (this.cameraOffset.x - this.center.x)),
                 (this.cameraOffset.y =
                    b + (this.cameraOffset.y - this.center.y)))
               : ((this.x = a + (this.x - this.center.x)),
                 (this.y = b + (this.y - this.center.y))),
            this
         );
      }),
      (c.Sprite.prototype.revive = function (a) {
         return (
            "undefined" == typeof a && (a = 1),
            (this.alive = !0),
            (this.exists = !0),
            (this.visible = !0),
            (this.health = a),
            this.events && this.events.onRevived.dispatch(this),
            this
         );
      }),
      (c.Sprite.prototype.kill = function () {
         return (
            (this.alive = !1),
            (this.exists = !1),
            (this.visible = !1),
            this.events && this.events.onKilled.dispatch(this),
            this
         );
      }),
      (c.Sprite.prototype.destroy = function () {
         this.filters && (this.filters = null),
            this.group && this.group.remove(this),
            this.input && this.input.destroy(),
            this.events && this.events.destroy(),
            this.animations && this.animations.destroy(),
            this.body && this.body.destroy(),
            (this.alive = !1),
            (this.exists = !1),
            (this.visible = !1),
            (this.game = null);
      }),
      (c.Sprite.prototype.damage = function (a) {
         return (
            this.alive && ((this.health -= a), this.health < 0 && this.kill()),
            this
         );
      }),
      (c.Sprite.prototype.reset = function (a, b, c) {
         return (
            "undefined" == typeof c && (c = 1),
            (this.x = a),
            (this.y = b),
            this.world.setTo(a, b),
            (this.position.x = this.x),
            (this.position.y = this.y),
            (this.alive = !0),
            (this.exists = !0),
            (this.visible = !0),
            (this.renderable = !0),
            (this._outOfBoundsFired = !1),
            (this.health = c),
            this.body && this.body.reset(!1),
            this
         );
      }),
      (c.Sprite.prototype.bringToTop = function () {
         return (
            this.group
               ? this.group.bringToTop(this)
               : this.game.world.bringToTop(this),
            this
         );
      }),
      (c.Sprite.prototype.play = function (a, b, c, d) {
         return this.animations ? this.animations.play(a, b, c, d) : void 0;
      }),
      Object.defineProperty(c.Sprite.prototype, "deltaX", {
         get: function () {
            return this.world.x - this._cache.prevX;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "deltaY", {
         get: function () {
            return this.world.y - this._cache.prevY;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "angle", {
         get: function () {
            return c.Math.wrapAngle(c.Math.radToDeg(this.rotation));
         },
         set: function (a) {
            this.rotation = c.Math.degToRad(c.Math.wrapAngle(a));
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "frame", {
         get: function () {
            return this.animations.frame;
         },
         set: function (a) {
            this.animations.frame = a;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "frameName", {
         get: function () {
            return this.animations.frameName;
         },
         set: function (a) {
            this.animations.frameName = a;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "inCamera", {
         get: function () {
            return this._cache.cameraVisible;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "worldCenterX", {
         get: function () {
            return this.game.camera.x + this.center.x;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "worldCenterY", {
         get: function () {
            return this.game.camera.y + this.center.y;
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "width", {
         get: function () {
            return this.scale.x * this.currentFrame.width;
         },
         set: function (a) {
            (this.scale.x = a / this.currentFrame.width),
               (this._cache.scaleX = a / this.currentFrame.width),
               (this._width = a);
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "height", {
         get: function () {
            return this.scale.y * this.currentFrame.height;
         },
         set: function (a) {
            (this.scale.y = a / this.currentFrame.height),
               (this._cache.scaleY = a / this.currentFrame.height),
               (this._height = a);
         },
      }),
      Object.defineProperty(c.Sprite.prototype, "inputEnabled", {
         get: function () {
            return this.input.enabled;
         },
         set: function (a) {
            a
               ? this.input.enabled === !1 && this.input.start()
               : this.input.enabled && this.input.stop();
         },
      }),
      (c.TileSprite = function (a, d, e, f, g, h) {
         (d = d || 0),
            (e = e || 0),
            (f = f || 256),
            (g = g || 256),
            (h = h || null),
            c.Sprite.call(this, a, d, e, h),
            (this.texture = b.TextureCache[h]),
            b.TilingSprite.call(this, this.texture, f, g),
            (this.type = c.TILESPRITE),
            (this.tileScale = new c.Point(1, 1)),
            (this.tilePosition = new c.Point(0, 0)),
            (this.body.width = f),
            (this.body.height = g);
      }),
      (c.TileSprite.prototype = c.Utils.extend(
         !0,
         b.TilingSprite.prototype,
         c.Sprite.prototype
      )),
      (c.TileSprite.prototype.constructor = c.TileSprite),
      Object.defineProperty(c.TileSprite.prototype, "angle", {
         get: function () {
            return c.Math.wrapAngle(c.Math.radToDeg(this.rotation));
         },
         set: function (a) {
            this.rotation = c.Math.degToRad(c.Math.wrapAngle(a));
         },
      }),
      Object.defineProperty(c.TileSprite.prototype, "frame", {
         get: function () {
            return this.animations.frame;
         },
         set: function (a) {
            this.animations.frame = a;
         },
      }),
      Object.defineProperty(c.TileSprite.prototype, "frameName", {
         get: function () {
            return this.animations.frameName;
         },
         set: function (a) {
            this.animations.frameName = a;
         },
      }),
      Object.defineProperty(c.TileSprite.prototype, "inCamera", {
         get: function () {
            return this._cache.cameraVisible;
         },
      }),
      Object.defineProperty(c.TileSprite.prototype, "inputEnabled", {
         get: function () {
            return this.input.enabled;
         },
         set: function (a) {
            a
               ? this.input.enabled === !1 && this.input.start()
               : this.input.enabled && this.input.stop();
         },
      }),
      (c.Text = function (a, d, e, f, g) {
         (d = d || 0),
            (e = e || 0),
            (f = f || ""),
            (g = g || ""),
            (this.game = a),
            (this.exists = !0),
            (this.alive = !0),
            (this.group = null),
            (this.name = ""),
            (this.type = c.TEXT),
            (this._text = f),
            (this._style = g),
            b.Text.call(this, f, g),
            (this.position.x = this.x = d),
            (this.position.y = this.y = e),
            (this.anchor = new c.Point()),
            (this.scale = new c.Point(1, 1)),
            (this.fixedToCamera = !1),
            (this.cameraOffset = new c.Point(d, e)),
            (this._cache = {
               dirty: !1,
               a00: 1,
               a01: 0,
               a02: d,
               a10: 0,
               a11: 1,
               a12: e,
               id: 1,
               x: -1,
               y: -1,
               scaleX: 1,
               scaleY: 1,
            }),
            (this._cache.x = this.x),
            (this._cache.y = this.y),
            (this.renderable = !0);
      }),
      (c.Text.prototype = Object.create(b.Text.prototype)),
      (c.Text.prototype.constructor = c.Text),
      (c.Text.prototype.update = function () {
         this.exists &&
            (this.fixedToCamera &&
               ((this.x = this.game.camera.view.x + this.cameraOffset.x),
               (this.y = this.game.camera.view.y + this.cameraOffset.y)),
            (this._cache.dirty = !1),
            (this._cache.x = this.x),
            (this._cache.y = this.y),
            (this.position.x != this._cache.x ||
               this.position.y != this._cache.y) &&
               ((this.position.x = this._cache.x),
               (this.position.y = this._cache.y),
               (this._cache.dirty = !0)));
      }),
      (c.Text.prototype.destroy = function () {
         this.group && this.group.remove(this),
            this.canvas.parentNode
               ? this.canvas.parentNode.removeChild(this.canvas)
               : ((this.canvas = null), (this.context = null)),
            (this.exists = !1),
            (this.group = null);
      }),
      Object.defineProperty(c.Text.prototype, "angle", {
         get: function () {
            return c.Math.radToDeg(this.rotation);
         },
         set: function (a) {
            this.rotation = c.Math.degToRad(a);
         },
      }),
      Object.defineProperty(c.Text.prototype, "x", {
         get: function () {
            return this.position.x;
         },
         set: function (a) {
            this.position.x = a;
         },
      }),
      Object.defineProperty(c.Text.prototype, "y", {
         get: function () {
            return this.position.y;
         },
         set: function (a) {
            this.position.y = a;
         },
      }),
      Object.defineProperty(c.Text.prototype, "content", {
         get: function () {
            return this._text;
         },
         set: function (a) {
            a !== this._text && ((this._text = a), this.setText(a));
         },
      }),
      Object.defineProperty(c.Text.prototype, "font", {
         get: function () {
            return this._style;
         },
         set: function (a) {
            a !== this._style && ((this._style = a), this.setStyle(a));
         },
      }),
      (c.BitmapText = function (a, d, e, f, g) {
         (d = d || 0),
            (e = e || 0),
            (f = f || ""),
            (g = g || ""),
            (this.game = a),
            (this.exists = !0),
            (this.alive = !0),
            (this.group = null),
            (this.name = ""),
            (this.type = c.BITMAPTEXT),
            b.BitmapText.call(this, f, g),
            (this.position.x = d),
            (this.position.y = e),
            (this.anchor = new c.Point()),
            (this.scale = new c.Point(1, 1)),
            (this._cache = {
               dirty: !1,
               a00: 1,
               a01: 0,
               a02: d,
               a10: 0,
               a11: 1,
               a12: e,
               id: 1,
               x: -1,
               y: -1,
               scaleX: 1,
               scaleY: 1,
            }),
            (this._cache.x = this.x),
            (this._cache.y = this.y);
      }),
      (c.BitmapText.prototype = Object.create(b.BitmapText.prototype)),
      (c.BitmapText.prototype.constructor = c.BitmapText),
      (c.BitmapText.prototype.update = function () {
         this.exists &&
            ((this._cache.dirty = !1),
            (this._cache.x = this.x),
            (this._cache.y = this.y),
            (this.position.x != this._cache.x ||
               this.position.y != this._cache.y) &&
               ((this.position.x = this._cache.x),
               (this.position.y = this._cache.y),
               (this._cache.dirty = !0)),
            (this.pivot.x = this.anchor.x * this.width),
            (this.pivot.y = this.anchor.y * this.height));
      }),
      (c.BitmapText.prototype.destroy = function () {
         this.group && this.group.remove(this),
            this.canvas && this.canvas.parentNode
               ? this.canvas.parentNode.removeChild(this.canvas)
               : ((this.canvas = null), (this.context = null)),
            (this.exists = !1),
            (this.group = null);
      }),
      Object.defineProperty(c.BitmapText.prototype, "angle", {
         get: function () {
            return c.Math.radToDeg(this.rotation);
         },
         set: function (a) {
            this.rotation = c.Math.degToRad(a);
         },
      }),
      Object.defineProperty(c.BitmapText.prototype, "x", {
         get: function () {
            return this.position.x;
         },
         set: function (a) {
            this.position.x = a;
         },
      }),
      Object.defineProperty(c.BitmapText.prototype, "y", {
         get: function () {
            return this.position.y;
         },
         set: function (a) {
            this.position.y = a;
         },
      }),
      (c.Button = function (a, b, d, e, f, g, h, i, j, k) {
         (b = b || 0),
            (d = d || 0),
            (e = e || null),
            (f = f || null),
            (g = g || this),
            c.Sprite.call(this, a, b, d, e, i),
            (this.type = c.BUTTON),
            (this._onOverFrameName = null),
            (this._onOutFrameName = null),
            (this._onDownFrameName = null),
            (this._onUpFrameName = null),
            (this._onOverFrameID = null),
            (this._onOutFrameID = null),
            (this._onDownFrameID = null),
            (this._onUpFrameID = null),
            (this.onOverSound = null),
            (this.onOutSound = null),
            (this.onDownSound = null),
            (this.onUpSound = null),
            (this.onOverSoundMarker = ""),
            (this.onOutSoundMarker = ""),
            (this.onDownSoundMarker = ""),
            (this.onUpSoundMarker = ""),
            (this.onInputOver = new c.Signal()),
            (this.onInputOut = new c.Signal()),
            (this.onInputDown = new c.Signal()),
            (this.onInputUp = new c.Signal()),
            (this.freezeFrames = !1),
            (this.forceOut = !1),
            this.setFrames(h, i, j, k),
            null !== f && this.onInputUp.add(f, g),
            this.input.start(0, !0),
            this.events.onInputOver.add(this.onInputOverHandler, this),
            this.events.onInputOut.add(this.onInputOutHandler, this),
            this.events.onInputDown.add(this.onInputDownHandler, this),
            this.events.onInputUp.add(this.onInputUpHandler, this);
      }),
      (c.Button.prototype = Object.create(c.Sprite.prototype)),
      (c.Button.prototype = c.Utils.extend(
         !0,
         c.Button.prototype,
         c.Sprite.prototype,
         b.Sprite.prototype
      )),
      (c.Button.prototype.constructor = c.Button),
      (c.Button.prototype.clearFrames = function () {
         (this._onOverFrameName = null),
            (this._onOverFrameID = null),
            (this._onOutFrameName = null),
            (this._onOutFrameID = null),
            (this._onDownFrameName = null),
            (this._onDownFrameID = null),
            (this._onUpFrameName = null),
            (this._onUpFrameID = null);
      }),
      (c.Button.prototype.setFrames = function (a, b, c, d) {
         this.clearFrames(),
            null !== a &&
               ("string" == typeof a
                  ? ((this._onOverFrameName = a),
                    this.input.pointerOver() && (this.frameName = a))
                  : ((this._onOverFrameID = a),
                    this.input.pointerOver() && (this.frame = a))),
            null !== b &&
               ("string" == typeof b
                  ? ((this._onOutFrameName = b),
                    this.input.pointerOver() === !1 && (this.frameName = b))
                  : ((this._onOutFrameID = b),
                    this.input.pointerOver() === !1 && (this.frame = b))),
            null !== c &&
               ("string" == typeof c
                  ? ((this._onDownFrameName = c),
                    this.input.pointerDown() && (this.frameName = c))
                  : ((this._onDownFrameID = c),
                    this.input.pointerDown() && (this.frame = c))),
            null !== d &&
               ("string" == typeof d
                  ? ((this._onUpFrameName = d),
                    this.input.pointerUp() && (this.frameName = d))
                  : ((this._onUpFrameID = d),
                    this.input.pointerUp() && (this.frame = d)));
      }),
      (c.Button.prototype.setSounds = function (a, b, c, d, e, f, g, h) {
         this.setOverSound(a, b),
            this.setOutSound(e, f),
            this.setDownSound(c, d),
            this.setUpSound(g, h);
      }),
      (c.Button.prototype.setOverSound = function (a, b) {
         (this.onOverSound = null),
            (this.onOverSoundMarker = ""),
            a instanceof c.Sound && (this.onOverSound = a),
            "string" == typeof b && (this.onOverSoundMarker = b);
      }),
      (c.Button.prototype.setOutSound = function (a, b) {
         (this.onOutSound = null),
            (this.onOutSoundMarker = ""),
            a instanceof c.Sound && (this.onOutSound = a),
            "string" == typeof b && (this.onOutSoundMarker = b);
      }),
      (c.Button.prototype.setDownSound = function (a, b) {
         (this.onDownSound = null),
            (this.onDownSoundMarker = ""),
            a instanceof c.Sound && (this.onDownSound = a),
            "string" == typeof b && (this.onDownSoundMarker = b);
      }),
      (c.Button.prototype.setUpSound = function (a, b) {
         (this.onUpSound = null),
            (this.onUpSoundMarker = ""),
            a instanceof c.Sound && (this.onUpSound = a),
            "string" == typeof b && (this.onUpSoundMarker = b);
      }),
      (c.Button.prototype.onInputOverHandler = function (a, b) {
         this.freezeFrames === !1 && this.setState(1),
            this.onOverSound && this.onOverSound.play(this.onOverSoundMarker),
            this.onInputOver && this.onInputOver.dispatch(this, b);
      }),
      (c.Button.prototype.onInputOutHandler = function (a, b) {
         this.freezeFrames === !1 && this.setState(2),
            this.onOutSound && this.onOutSound.play(this.onOutSoundMarker),
            this.onInputOut && this.onInputOut.dispatch(this, b);
      }),
      (c.Button.prototype.onInputDownHandler = function (a, b) {
         this.freezeFrames === !1 && this.setState(3),
            this.onDownSound && this.onDownSound.play(this.onDownSoundMarker),
            this.onInputDown && this.onInputDown.dispatch(this, b);
      }),
      (c.Button.prototype.onInputUpHandler = function (a, b, c) {
         this.onUpSound && this.onUpSound.play(this.onUpSoundMarker),
            this.onInputUp && this.onInputUp.dispatch(this, b, c),
            this.freezeFrames ||
               (this.forceOut
                  ? this.setState(2)
                  : this._onUpFrameName || this._onUpFrameID
                  ? this.setState(4)
                  : c
                  ? this.setState(1)
                  : this.setState(2));
      }),
      (c.Button.prototype.setState = function (a) {
         1 === a
            ? null != this._onOverFrameName
               ? (this.frameName = this._onOverFrameName)
               : null != this._onOverFrameID &&
                 (this.frame = this._onOverFrameID)
            : 2 === a
            ? null != this._onOutFrameName
               ? (this.frameName = this._onOutFrameName)
               : null != this._onOutFrameID && (this.frame = this._onOutFrameID)
            : 3 === a
            ? null != this._onDownFrameName
               ? (this.frameName = this._onDownFrameName)
               : null != this._onDownFrameID &&
                 (this.frame = this._onDownFrameID)
            : 4 === a &&
              (null != this._onUpFrameName
                 ? (this.frameName = this._onUpFrameName)
                 : null != this._onUpFrameID &&
                   (this.frame = this._onUpFrameID));
      }),
      (c.Graphics = function (a, d, e) {
         (this.game = a),
            b.Graphics.call(this),
            (this.type = c.GRAPHICS),
            (this.position.x = d),
            (this.position.y = e);
      }),
      (c.Graphics.prototype = Object.create(b.Graphics.prototype)),
      (c.Graphics.prototype.constructor = c.Graphics),
      (c.Graphics.prototype.destroy = function () {
         this.clear(),
            this.group && this.group.remove(this),
            (this.game = null);
      }),
      (c.Graphics.prototype.drawPolygon = function (a) {
         this.moveTo(a.points[0].x, a.points[0].y);
         for (var b = 1; b < a.points.length; b += 1)
            this.lineTo(a.points[b].x, a.points[b].y);
         this.lineTo(a.points[0].x, a.points[0].y);
      }),
      Object.defineProperty(c.Graphics.prototype, "angle", {
         get: function () {
            return c.Math.wrapAngle(c.Math.radToDeg(this.rotation));
         },
         set: function (a) {
            this.rotation = c.Math.degToRad(c.Math.wrapAngle(a));
         },
      }),
      Object.defineProperty(c.Graphics.prototype, "x", {
         get: function () {
            return this.position.x;
         },
         set: function (a) {
            this.position.x = a;
         },
      }),
      Object.defineProperty(c.Graphics.prototype, "y", {
         get: function () {
            return this.position.y;
         },
         set: function (a) {
            this.position.y = a;
         },
      }),
      (c.RenderTexture = function (a, d, e, f) {
         (this.game = a),
            (this.name = d),
            b.EventTarget.call(this),
            (this.width = e || 100),
            (this.height = f || 100),
            (this.indetityMatrix = b.mat3.create()),
            (this.frame = new b.Rectangle(0, 0, this.width, this.height)),
            (this.type = c.RENDERTEXTURE),
            (this._tempPoint = { x: 0, y: 0 }),
            b.gl ? this.initWebGL() : this.initCanvas();
      }),
      (c.RenderTexture.prototype = Object.create(b.Texture.prototype)),
      (c.RenderTexture.prototype.constructor = b.RenderTexture),
      (c.RenderTexture.prototype.render = function (a, d, e, f) {
         "undefined" == typeof d && (d = !1),
            "undefined" == typeof e && (e = !1),
            "undefined" == typeof f && (f = !1),
            a instanceof c.Group && (a = a._container),
            b.gl ? this.renderWebGL(a, d, e, f) : this.renderCanvas(a, d, e, f);
      }),
      (c.RenderTexture.prototype.renderXY = function (a, b, c, d, e) {
         (this._tempPoint.x = b),
            (this._tempPoint.y = c),
            this.render(a, this._tempPoint, d, e);
      }),
      (c.RenderTexture.prototype.initWebGL = function () {
         var a = b.gl;
         (this.glFramebuffer = a.createFramebuffer()),
            a.bindFramebuffer(a.FRAMEBUFFER, this.glFramebuffer),
            (this.glFramebuffer.width = this.width),
            (this.glFramebuffer.height = this.height),
            (this.baseTexture = new b.BaseTexture()),
            (this.baseTexture.width = this.width),
            (this.baseTexture.height = this.height),
            (this.baseTexture._glTexture = a.createTexture()),
            a.bindTexture(a.TEXTURE_2D, this.baseTexture._glTexture),
            a.texImage2D(
               a.TEXTURE_2D,
               0,
               a.RGBA,
               this.width,
               this.height,
               0,
               a.RGBA,
               a.UNSIGNED_BYTE,
               null
            ),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
            (this.baseTexture.isRender = !0),
            a.bindFramebuffer(a.FRAMEBUFFER, this.glFramebuffer),
            a.framebufferTexture2D(
               a.FRAMEBUFFER,
               a.COLOR_ATTACHMENT0,
               a.TEXTURE_2D,
               this.baseTexture._glTexture,
               0
            ),
            (this.projection = new b.Point(this.width / 2, -this.height / 2));
      }),
      (c.RenderTexture.prototype.resize = function (a, c) {
         if (((this.width = a), (this.height = c), b.gl)) {
            (this.projection.x = this.width / 2),
               (this.projection.y = -this.height / 2);
            var d = b.gl;
            d.bindTexture(d.TEXTURE_2D, this.baseTexture._glTexture),
               d.texImage2D(
                  d.TEXTURE_2D,
                  0,
                  d.RGBA,
                  this.width,
                  this.height,
                  0,
                  d.RGBA,
                  d.UNSIGNED_BYTE,
                  null
               );
         } else
            (this.frame.width = this.width),
               (this.frame.height = this.height),
               this.renderer.resize(this.width, this.height);
      }),
      (c.RenderTexture.prototype.initCanvas = function () {
         (this.renderer = new b.CanvasRenderer(
            this.width,
            this.height,
            null,
            0
         )),
            (this.baseTexture = new b.BaseTexture(this.renderer.view)),
            (this.frame = new b.Rectangle(0, 0, this.width, this.height));
      }),
      (c.RenderTexture.prototype.renderWebGL = function (a, c, d) {
         var e = b.gl;
         e.colorMask(!0, !0, !0, !0),
            e.viewport(0, 0, this.width, this.height),
            e.bindFramebuffer(e.FRAMEBUFFER, this.glFramebuffer),
            d && (e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT));
         var f = a.children,
            g = a.worldTransform;
         (a.worldTransform = b.mat3.create()),
            (a.worldTransform[4] = -1),
            (a.worldTransform[5] = -2 * this.projection.y),
            c && ((a.worldTransform[2] = c.x), (a.worldTransform[5] -= c.y)),
            b.visibleCount++,
            (a.vcount = b.visibleCount);
         for (var h = 0, i = f.length; i > h; h++) f[h].updateTransform();
         var j = a.__renderGroup;
         j
            ? a == j.root
               ? j.render(this.projection, this.glFramebuffer)
               : j.renderSpecific(a, this.projection, this.glFramebuffer)
            : (this.renderGroup ||
                 (this.renderGroup = new b.WebGLRenderGroup(e)),
              this.renderGroup.setRenderable(a),
              this.renderGroup.render(this.projection, this.glFramebuffer)),
            (a.worldTransform = g);
      }),
      (c.RenderTexture.prototype.renderCanvas = function (a, c, d, e) {
         var f = a.children;
         (a.worldTransform = b.mat3.create()),
            c && ((a.worldTransform[2] = c.x), (a.worldTransform[5] = c.y));
         for (var g = 0, h = f.length; h > g; g++) f[g].updateTransform();
         d && this.renderer.context.clearRect(0, 0, this.width, this.height),
            this.renderer.renderDisplayObject(a, e),
            this.renderer.context.setTransform(1, 0, 0, 1, 0, 0);
      }),
      (c.Canvas = {
         create: function (a, b, c) {
            (a = a || 256), (b = b || 256);
            var d = document.createElement("canvas");
            return (
               "string" == typeof c && (d.id = c),
               (d.width = a),
               (d.height = b),
               (d.style.display = "block"),
               d
            );
         },
         getOffset: function (a, b) {
            b = b || new c.Point();
            var d = a.getBoundingClientRect(),
               e = a.clientTop || document.body.clientTop || 0,
               f = a.clientLeft || document.body.clientLeft || 0,
               g = 0,
               h = 0;
            return (
               "CSS1Compat" === document.compatMode
                  ? ((g =
                       window.pageYOffset ||
                       document.documentElement.scrollTop ||
                       a.scrollTop ||
                       0),
                    (h =
                       window.pageXOffset ||
                       document.documentElement.scrollLeft ||
                       a.scrollLeft ||
                       0))
                  : ((g =
                       window.pageYOffset ||
                       document.body.scrollTop ||
                       a.scrollTop ||
                       0),
                    (h =
                       window.pageXOffset ||
                       document.body.scrollLeft ||
                       a.scrollLeft ||
                       0)),
               (b.x = d.left + h - f),
               (b.y = d.top + g - e),
               b
            );
         },
         getAspectRatio: function (a) {
            return a.width / a.height;
         },
         setBackgroundColor: function (a, b) {
            return (b = b || "rgb(0,0,0)"), (a.style.backgroundColor = b), a;
         },
         setTouchAction: function (a, b) {
            return (
               (b = b || "none"),
               (a.style.msTouchAction = b),
               (a.style["ms-touch-action"] = b),
               (a.style["touch-action"] = b),
               a
            );
         },
         setUserSelect: function (a, b) {
            return (
               (b = b || "none"),
               (a.style["-webkit-touch-callout"] = b),
               (a.style["-webkit-user-select"] = b),
               (a.style["-khtml-user-select"] = b),
               (a.style["-moz-user-select"] = b),
               (a.style["-ms-user-select"] = b),
               (a.style["user-select"] = b),
               (a.style["-webkit-tap-highlight-color"] = "rgba(0, 0, 0, 0)"),
               a
            );
         },
         addToDOM: function (a, b, c) {
            var d;
            return (
               "undefined" == typeof c && (c = !0),
               b &&
                  ("string" == typeof b
                     ? (d = document.getElementById(b))
                     : "object" == typeof b && 1 === b.nodeType && (d = b)),
               d || (d = document.body),
               c && d.style && (d.style.overflow = "hidden"),
               d.appendChild(a),
               a
            );
         },
         setTransform: function (a, b, c, d, e, f, g) {
            return a.setTransform(d, f, g, e, b, c), a;
         },
         setSmoothingEnabled: function (a, b) {
            return (
               (a.imageSmoothingEnabled = b),
               (a.mozImageSmoothingEnabled = b),
               (a.oImageSmoothingEnabled = b),
               (a.webkitImageSmoothingEnabled = b),
               (a.msImageSmoothingEnabled = b),
               a
            );
         },
         setImageRenderingCrisp: function (a) {
            return (
               (a.style["image-rendering"] = "optimizeSpeed"),
               (a.style["image-rendering"] = "crisp-edges"),
               (a.style["image-rendering"] = "-moz-crisp-edges"),
               (a.style["image-rendering"] = "-webkit-optimize-contrast"),
               (a.style["image-rendering"] = "optimize-contrast"),
               (a.style.msInterpolationMode = "nearest-neighbor"),
               a
            );
         },
         setImageRenderingBicubic: function (a) {
            return (
               (a.style["image-rendering"] = "auto"),
               (a.style.msInterpolationMode = "bicubic"),
               a
            );
         },
      }),
      (c.StageScaleMode = function (a, b, d) {
         (this.game = a),
            (this.width = b),
            (this.height = d),
            (this.minWidth = null),
            (this.maxWidth = null),
            (this.minHeight = null),
            (this.maxHeight = null),
            (this._startHeight = 0),
            (this.forceLandscape = !1),
            (this.forcePortrait = !1),
            (this.incorrectOrientation = !1),
            (this.pageAlignHorizontally = !1),
            (this.pageAlignVertically = !1),
            (this._width = 0),
            (this._height = 0),
            (this.maxIterations = 5),
            (this.orientationSprite = null),
            (this.enterLandscape = new c.Signal()),
            (this.enterPortrait = new c.Signal()),
            (this.enterIncorrectOrientation = new c.Signal()),
            (this.leaveIncorrectOrientation = new c.Signal()),
            (this.hasResized = new c.Signal()),
            (this.orientation = window.orientation
               ? window.orientation
               : window.outerWidth > window.outerHeight
               ? 90
               : 0),
            (this.scaleFactor = new c.Point(1, 1)),
            (this.scaleFactorInversed = new c.Point(1, 1)),
            (this.margin = new c.Point(0, 0)),
            (this.aspectRatio = 0),
            (this.event = null);
         var e = this;
         window.addEventListener(
            "orientationchange",
            function (a) {
               return e.checkOrientation(a);
            },
            !1
         ),
            window.addEventListener(
               "resize",
               function (a) {
                  return e.checkResize(a);
               },
               !1
            ),
            document.addEventListener(
               "webkitfullscreenchange",
               function (a) {
                  return e.fullScreenChange(a);
               },
               !1
            ),
            document.addEventListener(
               "mozfullscreenchange",
               function (a) {
                  return e.fullScreenChange(a);
               },
               !1
            ),
            document.addEventListener(
               "fullscreenchange",
               function (a) {
                  return e.fullScreenChange(a);
               },
               !1
            );
      }),
      (c.StageScaleMode.EXACT_FIT = 0),
      (c.StageScaleMode.NO_SCALE = 1),
      (c.StageScaleMode.SHOW_ALL = 2),
      (c.StageScaleMode.prototype = {
         startFullScreen: function (a) {
            if (!this.isFullScreen) {
               "undefined" != typeof a &&
                  c.Canvas.setSmoothingEnabled(this.game.context, a);
               var b = this.game.canvas;
               (this._width = this.width),
                  (this._height = this.height),
                  b.requestFullScreen
                     ? b.requestFullScreen()
                     : b.mozRequestFullScreen
                     ? b.parentNode.mozRequestFullScreen()
                     : b.webkitRequestFullScreen &&
                       b.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
         },
         stopFullScreen: function () {
            document.cancelFullScreen
               ? document.cancelFullScreen()
               : document.mozCancelFullScreen
               ? document.mozCancelFullScreen()
               : document.webkitCancelFullScreen &&
                 document.webkitCancelFullScreen();
         },
         fullScreenChange: function (a) {
            (this.event = a),
               this.isFullScreen
                  ? this.game.stage.fullScreenScaleMode ===
                    c.StageScaleMode.EXACT_FIT
                     ? ((this.game.stage.canvas.style.width = "100%"),
                       (this.game.stage.canvas.style.height = "100%"),
                       this.setMaximum(),
                       this.game.input.scale.setTo(
                          this.game.width / this.width,
                          this.game.height / this.height
                       ),
                       (this.aspectRatio = this.width / this.height),
                       (this.scaleFactor.x = this.game.width / this.width),
                       (this.scaleFactor.y = this.game.height / this.height))
                     : this.game.stage.fullScreenScaleMode ===
                          c.StageScaleMode.SHOW_ALL &&
                       (this.game.stage.scale.setShowAll(),
                       this.game.stage.scale.refresh())
                  : ((this.game.stage.canvas.style.width =
                       this.game.width + "px"),
                    (this.game.stage.canvas.style.height =
                       this.game.height + "px"),
                    (this.width = this._width),
                    (this.height = this._height),
                    this.game.input.scale.setTo(
                       this.game.width / this.width,
                       this.game.height / this.height
                    ),
                    (this.aspectRatio = this.width / this.height),
                    (this.scaleFactor.x = this.game.width / this.width),
                    (this.scaleFactor.y = this.game.height / this.height));
         },
         forceOrientation: function (a, c, d) {
            "undefined" == typeof c && (c = !1),
               (this.forceLandscape = a),
               (this.forcePortrait = c),
               "undefined" != typeof d &&
                  ((null == d || this.game.cache.checkImageKey(d) === !1) &&
                     (d = "__default"),
                  (this.orientationSprite = new b.Sprite(b.TextureCache[d])),
                  (this.orientationSprite.anchor.x = 0.5),
                  (this.orientationSprite.anchor.y = 0.5),
                  (this.orientationSprite.position.x = this.game.width / 2),
                  (this.orientationSprite.position.y = this.game.height / 2),
                  this.checkOrientationState(),
                  this.incorrectOrientation
                     ? ((this.orientationSprite.visible = !0),
                       (this.game.world.visible = !1))
                     : ((this.orientationSprite.visible = !1),
                       (this.game.world.visible = !0)),
                  this.game.stage._stage.addChild(this.orientationSprite));
         },
         checkOrientationState: function () {
            this.incorrectOrientation
               ? ((this.forceLandscape &&
                    window.innerWidth > window.innerHeight) ||
                    (this.forcePortrait &&
                       window.innerHeight > window.innerWidth)) &&
                 ((this.game.paused = !1),
                 (this.incorrectOrientation = !1),
                 this.leaveIncorrectOrientation.dispatch(),
                 this.orientationSprite &&
                    ((this.orientationSprite.visible = !1),
                    (this.game.world.visible = !0)),
                 this.refresh())
               : ((this.forceLandscape &&
                    window.innerWidth < window.innerHeight) ||
                    (this.forcePortrait &&
                       window.innerHeight < window.innerWidth)) &&
                 ((this.game.paused = !0),
                 (this.incorrectOrientation = !0),
                 this.enterIncorrectOrientation.dispatch(),
                 this.orientationSprite &&
                    this.orientationSprite.visible === !1 &&
                    ((this.orientationSprite.visible = !0),
                    (this.game.world.visible = !1)),
                 this.refresh());
         },
         checkOrientation: function (a) {
            (this.event = a),
               (this.orientation = window.orientation),
               this.isLandscape
                  ? this.enterLandscape.dispatch(this.orientation, !0, !1)
                  : this.enterPortrait.dispatch(this.orientation, !1, !0),
               this.game.stage.scaleMode !== c.StageScaleMode.NO_SCALE &&
                  this.refresh();
         },
         checkResize: function (a) {
            (this.event = a),
               (this.orientation =
                  window.outerWidth > window.outerHeight ? 90 : 0),
               this.isLandscape
                  ? this.enterLandscape.dispatch(this.orientation, !0, !1)
                  : this.enterPortrait.dispatch(this.orientation, !1, !0),
               this.game.stage.scaleMode !== c.StageScaleMode.NO_SCALE &&
                  this.refresh(),
               this.checkOrientationState();
         },
         refresh: function () {
            if (
               (this.game.device.iPad === !1 &&
                  this.game.device.webApp === !1 &&
                  this.game.device.desktop === !1 &&
                  (this.game.device.android && this.game.device.chrome === !1
                     ? window.scrollTo(0, 1)
                     : window.scrollTo(0, 0)),
               null == this._check && this.maxIterations > 0)
            ) {
               this._iterations = this.maxIterations;
               var a = this;
               (this._check = window.setInterval(function () {
                  return a.setScreenSize();
               }, 10)),
                  this.setScreenSize();
            }
         },
         setScreenSize: function (a) {
            "undefined" == typeof a && (a = !1),
               this.game.device.iPad === !1 &&
                  this.game.device.webApp === !1 &&
                  this.game.device.desktop === !1 &&
                  (this.game.device.android && this.game.device.chrome === !1
                     ? window.scrollTo(0, 1)
                     : window.scrollTo(0, 0)),
               this._iterations--,
               (a ||
                  window.innerHeight > this._startHeight ||
                  this._iterations < 0) &&
                  ((document.documentElement.style.minHeight =
                     window.innerHeight + "px"),
                  this.incorrectOrientation === !0
                     ? this.setMaximum()
                     : this.isFullScreen
                     ? this.game.stage.fullScreenScaleMode ==
                       c.StageScaleMode.EXACT_FIT
                        ? this.setExactFit()
                        : this.game.stage.fullScreenScaleMode ==
                             c.StageScaleMode.SHOW_ALL && this.setShowAll()
                     : this.game.stage.scaleMode == c.StageScaleMode.EXACT_FIT
                     ? this.setExactFit()
                     : this.game.stage.scaleMode == c.StageScaleMode.SHOW_ALL &&
                       this.setShowAll(),
                  this.setSize(),
                  clearInterval(this._check),
                  (this._check = null));
         },
         setSize: function () {
            this.incorrectOrientation === !1 &&
               (this.maxWidth &&
                  this.width > this.maxWidth &&
                  (this.width = this.maxWidth),
               this.maxHeight &&
                  this.height > this.maxHeight &&
                  (this.height = this.maxHeight),
               this.minWidth &&
                  this.width < this.minWidth &&
                  (this.width = this.minWidth),
               this.minHeight &&
                  this.height < this.minHeight &&
                  (this.height = this.minHeight)),
               (this.game.canvas.style.width = this.width + "px"),
               (this.game.canvas.style.height = this.height + "px"),
               this.game.input.scale.setTo(
                  this.game.width / this.width,
                  this.game.height / this.height
               ),
               this.pageAlignHorizontally &&
                  (this.width < window.innerWidth &&
                  this.incorrectOrientation === !1
                     ? ((this.margin.x = Math.round(
                          (window.innerWidth - this.width) / 2
                       )),
                       (this.game.canvas.style.marginLeft =
                          this.margin.x + "px"))
                     : ((this.margin.x = 0),
                       (this.game.canvas.style.marginLeft = "0px"))),
               this.pageAlignVertically &&
                  (this.height < window.innerHeight &&
                  this.incorrectOrientation === !1
                     ? ((this.margin.y = Math.round(
                          (window.innerHeight - this.height) / 2
                       )),
                       (this.game.canvas.style.marginTop =
                          this.margin.y + "px"))
                     : ((this.margin.y = 0),
                       (this.game.canvas.style.marginTop = "0px"))),
               c.Canvas.getOffset(this.game.canvas, this.game.stage.offset),
               (this.aspectRatio = this.width / this.height),
               (this.scaleFactor.x = this.game.width / this.width),
               (this.scaleFactor.y = this.game.height / this.height),
               (this.scaleFactorInversed.x = this.width / this.game.width),
               (this.scaleFactorInversed.y = this.height / this.game.height),
               this.hasResized.dispatch(this.width, this.height),
               this.checkOrientationState();
         },
         setMaximum: function () {
            (this.width = window.innerWidth),
               (this.height = window.innerHeight);
         },
         setShowAll: function () {
            var a = Math.min(
               window.innerHeight / this.game.height,
               window.innerWidth / this.game.width
            );
            (this.width = Math.round(this.game.width * a)),
               (this.height = Math.round(this.game.height * a));
         },
         setExactFit: function () {
            var a = window.innerWidth,
               b = window.innerHeight;
            (this.width =
               this.maxWidth && a > this.maxWidth ? this.maxWidth : a),
               (this.height =
                  this.maxHeight && b > this.maxHeight ? this.maxHeight : b);
         },
      }),
      (c.StageScaleMode.prototype.constructor = c.StageScaleMode),
      Object.defineProperty(c.StageScaleMode.prototype, "isFullScreen", {
         get: function () {
            return (
               document.fullscreenElement ||
               document.mozFullScreenElement ||
               document.webkitFullscreenElement
            );
         },
      }),
      Object.defineProperty(c.StageScaleMode.prototype, "isPortrait", {
         get: function () {
            return 0 === this.orientation || 180 == this.orientation;
         },
      }),
      Object.defineProperty(c.StageScaleMode.prototype, "isLandscape", {
         get: function () {
            return 90 === this.orientation || -90 === this.orientation;
         },
      }),
      (c.Device = function () {
         (this.patchAndroidClearRectBug = !1),
            (this.desktop = !1),
            (this.iOS = !1),
            (this.cocoonJS = !1),
            (this.ejecta = !1),
            (this.android = !1),
            (this.chromeOS = !1),
            (this.linux = !1),
            (this.macOS = !1),
            (this.windows = !1),
            (this.canvas = !1),
            (this.file = !1),
            (this.fileSystem = !1),
            (this.localStorage = !1),
            (this.webGL = !1),
            (this.worker = !1),
            (this.touch = !1),
            (this.mspointer = !1),
            (this.css3D = !1),
            (this.pointerLock = !1),
            (this.typedArray = !1),
            (this.vibration = !1),
            (this.quirksMode = !1),
            (this.arora = !1),
            (this.chrome = !1),
            (this.epiphany = !1),
            (this.firefox = !1),
            (this.ie = !1),
            (this.ieVersion = 0),
            (this.trident = !1),
            (this.tridentVersion = 0),
            (this.mobileSafari = !1),
            (this.midori = !1),
            (this.opera = !1),
            (this.safari = !1),
            (this.webApp = !1),
            (this.silk = !1),
            (this.audioData = !1),
            (this.webAudio = !1),
            (this.ogg = !1),
            (this.opus = !1),
            (this.mp3 = !1),
            (this.wav = !1),
            (this.m4a = !1),
            (this.webm = !1),
            (this.iPhone = !1),
            (this.iPhone4 = !1),
            (this.iPad = !1),
            (this.pixelRatio = 0),
            (this.littleEndian = !1),
            this._checkAudio(),
            this._checkBrowser(),
            this._checkCSS3D(),
            this._checkDevice(),
            this._checkFeatures(),
            this._checkOS();
      }),
      (c.Device.prototype = {
         _checkOS: function () {
            var a = navigator.userAgent;
            /Android/.test(a)
               ? (this.android = !0)
               : /CrOS/.test(a)
               ? (this.chromeOS = !0)
               : /iP[ao]d|iPhone/i.test(a)
               ? (this.iOS = !0)
               : /Linux/.test(a)
               ? (this.linux = !0)
               : /Mac OS/.test(a)
               ? (this.macOS = !0)
               : /Windows/.test(a) && (this.windows = !0),
               (this.windows ||
                  this.macOS ||
                  (this.linux && this.silk === !1)) &&
                  (this.desktop = !0);
         },
         _checkFeatures: function () {
            this.canvas = !!window.CanvasRenderingContext2D;
            try {
               this.localStorage = !!localStorage.getItem;
            } catch (a) {
               this.localStorage = !1;
            }
            (this.file = !!(
               window.File &&
               window.FileReader &&
               window.FileList &&
               window.Blob
            )),
               (this.fileSystem = !!window.requestFileSystem),
               (this.webGL = (function () {
                  try {
                     var a = document.createElement("canvas");
                     return (
                        !!window.WebGLRenderingContext &&
                        (a.getContext("webgl") ||
                           a.getContext("experimental-webgl"))
                     );
                  } catch (b) {
                     return !1;
                  }
               })()),
               (this.webGL =
                  null === this.webGL || this.webGL === !1 ? !1 : !0),
               (this.worker = !!window.Worker),
               ("ontouchstart" in document.documentElement ||
                  (window.navigator.maxTouchPoints &&
                     window.navigator.maxTouchPoints > 1)) &&
                  (this.touch = !0),
               (window.navigator.msPointerEnabled ||
                  window.navigator.pointerEnabled) &&
                  (this.mspointer = !0),
               (this.pointerLock =
                  "pointerLockElement" in document ||
                  "mozPointerLockElement" in document ||
                  "webkitPointerLockElement" in document),
               (this.quirksMode =
                  "CSS1Compat" === document.compatMode ? !1 : !0);
         },
         _checkBrowser: function () {
            var a = navigator.userAgent;
            /Arora/.test(a)
               ? (this.arora = !0)
               : /Chrome/.test(a)
               ? (this.chrome = !0)
               : /Epiphany/.test(a)
               ? (this.epiphany = !0)
               : /Firefox/.test(a)
               ? (this.firefox = !0)
               : /Mobile Safari/.test(a)
               ? (this.mobileSafari = !0)
               : /MSIE (\d+\.\d+);/.test(a)
               ? ((this.ie = !0), (this.ieVersion = parseInt(RegExp.$1, 10)))
               : /Midori/.test(a)
               ? (this.midori = !0)
               : /Opera/.test(a)
               ? (this.opera = !0)
               : /Safari/.test(a)
               ? (this.safari = !0)
               : /Silk/.test(a)
               ? (this.silk = !0)
               : /Trident\/(\d+\.\d+);/.test(a) &&
                 ((this.ie = !0),
                 (this.trident = !0),
                 (this.tridentVersion = parseInt(RegExp.$1, 10))),
               navigator.standalone && (this.webApp = !0),
               navigator.isCocoonJS && (this.cocoonJS = !0),
               "undefined" != typeof window.ejecta && (this.ejecta = !0);
         },
         _checkAudio: function () {
            (this.audioData = !!window.Audio),
               (this.webAudio = !(
                  !window.webkitAudioContext && !window.AudioContext
               ));
            var a = document.createElement("audio"),
               b = !1;
            try {
               (b = !!a.canPlayType) &&
                  (a
                     .canPlayType('audio/ogg; codecs="vorbis"')
                     .replace(/^no$/, "") && (this.ogg = !0),
                  a
                     .canPlayType('audio/ogg; codecs="opus"')
                     .replace(/^no$/, "") && (this.opus = !0),
                  a.canPlayType("audio/mpeg;").replace(/^no$/, "") &&
                     (this.mp3 = !0),
                  a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "") &&
                     (this.wav = !0),
                  (a.canPlayType("audio/x-m4a;") ||
                     a.canPlayType("audio/aac;").replace(/^no$/, "")) &&
                     (this.m4a = !0),
                  a
                     .canPlayType('audio/webm; codecs="vorbis"')
                     .replace(/^no$/, "") && (this.webm = !0));
            } catch (c) {}
         },
         _checkDevice: function () {
            (this.pixelRatio = window.devicePixelRatio || 1),
               (this.iPhone =
                  -1 != navigator.userAgent.toLowerCase().indexOf("iphone")),
               (this.iPhone4 = 2 == this.pixelRatio && this.iPhone),
               (this.iPad =
                  -1 != navigator.userAgent.toLowerCase().indexOf("ipad")),
               "undefined" != typeof Int8Array
                  ? ((this.littleEndian =
                       new Int8Array(new Int16Array([1]).buffer)[0] > 0),
                    (this.typedArray = !0))
                  : ((this.littleEndian = !1), (this.typedArray = !1)),
               (navigator.vibrate =
                  navigator.vibrate ||
                  navigator.webkitVibrate ||
                  navigator.mozVibrate ||
                  navigator.msVibrate),
               navigator.vibrate && (this.vibration = !0);
         },
         _checkCSS3D: function () {
            var a,
               b = document.createElement("p"),
               c = {
                  webkitTransform: "-webkit-transform",
                  OTransform: "-o-transform",
                  msTransform: "-ms-transform",
                  MozTransform: "-moz-transform",
                  transform: "transform",
               };
            document.body.insertBefore(b, null);
            for (var d in c)
               void 0 !== b.style[d] &&
                  ((b.style[d] = "translate3d(1px,1px,1px)"),
                  (a = window.getComputedStyle(b).getPropertyValue(c[d])));
            document.body.removeChild(b),
               (this.css3D = void 0 !== a && a.length > 0 && "none" !== a);
         },
         canPlayAudio: function (a) {
            return "mp3" == a && this.mp3
               ? !0
               : "ogg" == a && (this.ogg || this.opus)
               ? !0
               : "m4a" == a && this.m4a
               ? !0
               : "wav" == a && this.wav
               ? !0
               : "webm" == a && this.webm
               ? !0
               : !1;
         },
         isConsoleOpen: function () {
            return window.console && window.console.firebug
               ? !0
               : window.console
               ? (console.profile(),
                 console.profileEnd(),
                 console.clear && console.clear(),
                 console.profiles.length > 0)
               : !1;
         },
      }),
      (c.Device.prototype.constructor = c.Device),
      (c.RequestAnimationFrame = function (a) {
         (this.game = a), (this.isRunning = !1);
         for (
            var b = ["ms", "moz", "webkit", "o"], c = 0;
            c < b.length && !window.requestAnimationFrame;
            c++
         )
            (window.requestAnimationFrame =
               window[b[c] + "RequestAnimationFrame"]),
               (window.cancelAnimationFrame =
                  window[b[c] + "CancelAnimationFrame"]);
         (this._isSetTimeOut = !1),
            (this._onLoop = null),
            (this._timeOutID = null);
      }),
      (c.RequestAnimationFrame.prototype = {
         start: function () {
            this.isRunning = !0;
            var a = this;
            window.requestAnimationFrame
               ? ((this._isSetTimeOut = !1),
                 (this._onLoop = function (b) {
                    return a.updateRAF(b);
                 }),
                 (this._timeOutID = window.requestAnimationFrame(this._onLoop)))
               : ((this._isSetTimeOut = !0),
                 (this._onLoop = function () {
                    return a.updateSetTimeout();
                 }),
                 (this._timeOutID = window.setTimeout(this._onLoop, 0)));
         },
         updateRAF: function (a) {
            this.game.update(a),
               (this._timeOutID = window.requestAnimationFrame(this._onLoop));
         },
         updateSetTimeout: function () {
            this.game.update(Date.now()),
               (this._timeOutID = window.setTimeout(
                  this._onLoop,
                  this.game.time.timeToCall
               ));
         },
         stop: function () {
            this._isSetTimeOut
               ? clearTimeout(this._timeOutID)
               : window.cancelAnimationFrame(this._timeOutID),
               (this.isRunning = !1);
         },
         isSetTimeOut: function () {
            return this._isSetTimeOut;
         },
         isRAF: function () {
            return this._isSetTimeOut === !1;
         },
      }),
      (c.RequestAnimationFrame.prototype.constructor = c.RequestAnimationFrame),
      (c.RandomDataGenerator = function (a) {
         "undefined" == typeof a && (a = []),
            (this.c = 1),
            (this.s0 = 0),
            (this.s1 = 0),
            (this.s2 = 0),
            this.sow(a);
      }),
      (c.RandomDataGenerator.prototype = {
         rnd: function () {
            var a = 2091639 * this.s0 + 2.3283064365386963e-10 * this.c;
            return (
               (this.c = 0 | a),
               (this.s0 = this.s1),
               (this.s1 = this.s2),
               (this.s2 = a - this.c),
               this.s2
            );
         },
         sow: function (a) {
            "undefined" == typeof a && (a = []),
               (this.s0 = this.hash(" ")),
               (this.s1 = this.hash(this.s0)),
               (this.s2 = this.hash(this.s1)),
               (this.c = 1);
            for (var b, c = 0; (b = a[c++]); )
               (this.s0 -= this.hash(b)),
                  (this.s0 += ~~(this.s0 < 0)),
                  (this.s1 -= this.hash(b)),
                  (this.s1 += ~~(this.s1 < 0)),
                  (this.s2 -= this.hash(b)),
                  (this.s2 += ~~(this.s2 < 0));
         },
         hash: function (a) {
            var b, c, d;
            for (d = 4022871197, a = a.toString(), c = 0; c < a.length; c++)
               (d += a.charCodeAt(c)),
                  (b = 0.02519603282416938 * d),
                  (d = b >>> 0),
                  (b -= d),
                  (b *= d),
                  (d = b >>> 0),
                  (b -= d),
                  (d += 4294967296 * b);
            return 2.3283064365386963e-10 * (d >>> 0);
         },
         integer: function () {
            return 4294967296 * this.rnd.apply(this);
         },
         frac: function () {
            return (
               this.rnd.apply(this) +
               1.1102230246251565e-16 * (0 | (2097152 * this.rnd.apply(this)))
            );
         },
         real: function () {
            return this.integer() + this.frac();
         },
         integerInRange: function (a, b) {
            return Math.floor(this.realInRange(a, b));
         },
         realInRange: function (a, b) {
            return this.frac() * (b - a) + a;
         },
         normal: function () {
            return 1 - 2 * this.frac();
         },
         uuid: function () {
            var a = "",
               b = "";
            for (
               b = a = "";
               a++ < 36;
               b +=
                  ~a % 5 | (4 & (3 * a))
                     ? (15 ^ a
                          ? 8 ^ (this.frac() * (20 ^ a ? 16 : 4))
                          : 4
                       ).toString(16)
                     : "-"
            );
            return b;
         },
         pick: function (a) {
            return a[this.integerInRange(0, a.length)];
         },
         weightedPick: function (a) {
            return a[~~(Math.pow(this.frac(), 2) * a.length)];
         },
         timestamp: function (a, b) {
            return this.realInRange(a || 9466848e5, b || 1577862e6);
         },
         angle: function () {
            return this.integerInRange(-180, 180);
         },
      }),
      (c.RandomDataGenerator.prototype.constructor = c.RandomDataGenerator),
      (c.Math = {
         PI2: 2 * Math.PI,
         fuzzyEqual: function (a, b, c) {
            return "undefined" == typeof c && (c = 1e-4), Math.abs(a - b) < c;
         },
         fuzzyLessThan: function (a, b, c) {
            return "undefined" == typeof c && (c = 1e-4), b + c > a;
         },
         fuzzyGreaterThan: function (a, b, c) {
            return "undefined" == typeof c && (c = 1e-4), a > b - c;
         },
         fuzzyCeil: function (a, b) {
            return "undefined" == typeof b && (b = 1e-4), Math.ceil(a - b);
         },
         fuzzyFloor: function (a, b) {
            return "undefined" == typeof b && (b = 1e-4), Math.floor(a + b);
         },
         average: function () {
            for (var a = [], b = 0; b < arguments.length - 0; b++)
               a[b] = arguments[b + 0];
            for (var c = 0, d = 0; d < a.length; d++) c += a[d];
            return c / a.length;
         },
         truncate: function (a) {
            return a > 0 ? Math.floor(a) : Math.ceil(a);
         },
         shear: function (a) {
            return a % 1;
         },
         snapTo: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = 0),
               0 === b ? a : ((a -= c), (a = b * Math.round(a / b)), c + a)
            );
         },
         snapToFloor: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = 0),
               0 === b ? a : ((a -= c), (a = b * Math.floor(a / b)), c + a)
            );
         },
         snapToCeil: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = 0),
               0 === b ? a : ((a -= c), (a = b * Math.ceil(a / b)), c + a)
            );
         },
         snapToInArray: function (a, b, c) {
            if (("undefined" == typeof c && (c = !0), c && b.sort(), a < b[0]))
               return b[0];
            for (var d = 1; b[d] < a; ) d++;
            var e = b[d - 1],
               f = d < b.length ? b[d] : Number.POSITIVE_INFINITY;
            return a - e >= f - a ? f : e;
         },
         roundTo: function (a, b, c) {
            "undefined" == typeof b && (b = 0),
               "undefined" == typeof c && (c = 10);
            var d = Math.pow(c, -b);
            return Math.round(a * d) / d;
         },
         floorTo: function (a, b, c) {
            "undefined" == typeof b && (b = 0),
               "undefined" == typeof c && (c = 10);
            var d = Math.pow(c, -b);
            return Math.floor(a * d) / d;
         },
         ceilTo: function (a, b, c) {
            "undefined" == typeof b && (b = 0),
               "undefined" == typeof c && (c = 10);
            var d = Math.pow(c, -b);
            return Math.ceil(a * d) / d;
         },
         interpolateFloat: function (a, b, c) {
            return (b - a) * c + a;
         },
         angleBetween: function (a, b, c, d) {
            return Math.atan2(d - b, c - a);
         },
         reverseAngle: function (a) {
            return this.normalizeAngle(a + Math.PI, !0);
         },
         normalizeAngle: function (a) {
            return (a %= 2 * Math.PI), a >= 0 ? a : a + 2 * Math.PI;
         },
         normalizeLatitude: function (a) {
            return Math.max(-90, Math.min(90, a));
         },
         normalizeLongitude: function (a) {
            return 180 == a % 360
               ? 180
               : ((a %= 360), -180 > a ? a + 360 : a > 180 ? a - 360 : a);
         },
         nearestAngleBetween: function (a, b, c) {
            "undefined" == typeof c && (c = !0);
            var d = c ? Math.PI : 180;
            return (
               (a = this.normalizeAngle(a, c)),
               (b = this.normalizeAngle(b, c)),
               -d / 2 > a && b > d / 2 && (a += 2 * d),
               -d / 2 > b && a > d / 2 && (b += 2 * d),
               b - a
            );
         },
         interpolateAngles: function (a, b, c, d, e) {
            return (
               "undefined" == typeof d && (d = !0),
               "undefined" == typeof e && (e = null),
               (a = this.normalizeAngle(a, d)),
               (b = this.normalizeAngleToAnother(b, a, d)),
               "function" == typeof e
                  ? e(c, a, b - a, 1)
                  : this.interpolateFloat(a, b, c)
            );
         },
         chanceRoll: function (a) {
            return (
               "undefined" == typeof a && (a = 50),
               0 >= a ? !1 : a >= 100 ? !0 : 100 * Math.random() >= a ? !1 : !0
            );
         },
         numberArray: function (a, b) {
            for (var c = [], d = a; b >= d; d++) c.push(d);
            return c;
         },
         maxAdd: function (a, b, c) {
            return (a += b), a > c && (a = c), a;
         },
         minSub: function (a, b, c) {
            return (a -= b), c > a && (a = c), a;
         },
         wrap: function (a, b, c) {
            var d = c - b;
            if (0 >= d) return 0;
            var e = (a - b) % d;
            return 0 > e && (e += d), e + b;
         },
         wrapValue: function (a, b, c) {
            var d;
            return (
               (a = Math.abs(a)),
               (b = Math.abs(b)),
               (c = Math.abs(c)),
               (d = (a + b) % c)
            );
         },
         randomSign: function () {
            return Math.random() > 0.5 ? 1 : -1;
         },
         isOdd: function (a) {
            return 1 & a;
         },
         isEven: function (a) {
            return 1 & a ? !1 : !0;
         },
         max: function () {
            for (var a = 1, b = 0, c = arguments.length; c > a; a++)
               arguments[b] < arguments[a] && (b = a);
            return arguments[b];
         },
         min: function () {
            if (1 === arguments.length && "object" == typeof arguments[0])
               var a = arguments[0];
            else var a = arguments;
            for (var b = 1, c = 0, d = a.length; d > b; b++)
               a[b] < a[c] && (c = b);
            return a[c];
         },
         max: function () {
            if (1 === arguments.length && "object" == typeof arguments[0])
               var a = arguments[0];
            else var a = arguments;
            for (var b = 1, c = 0, d = a.length; d > b; b++)
               a[b] > a[c] && (c = b);
            return a[c];
         },
         minProperty: function (a) {
            if (2 === arguments.length && "object" == typeof arguments[1])
               var b = arguments[1];
            else var b = arguments.slice(1);
            for (var c = 1, d = 0, e = b.length; e > c; c++)
               b[c][a] < b[d][a] && (d = c);
            return b[d][a];
         },
         maxProperty: function (a) {
            if (2 === arguments.length && "object" == typeof arguments[1])
               var b = arguments[1];
            else var b = arguments.slice(1);
            for (var c = 1, d = 0, e = b.length; e > c; c++)
               b[c][a] > b[d][a] && (d = c);
            return b[d][a];
         },
         wrapAngle: function (a) {
            return this.wrap(a, -180, 180);
         },
         angleLimit: function (a, b, c) {
            var d = a;
            return a > c ? (d = c) : b > a && (d = b), d;
         },
         linearInterpolation: function (a, b) {
            var c = a.length - 1,
               d = c * b,
               e = Math.floor(d);
            return 0 > b
               ? this.linear(a[0], a[1], d)
               : b > 1
               ? this.linear(a[c], a[c - 1], c - d)
               : this.linear(a[e], a[e + 1 > c ? c : e + 1], d - e);
         },
         bezierInterpolation: function (a, b) {
            for (var c = 0, d = a.length - 1, e = 0; d >= e; e++)
               c +=
                  Math.pow(1 - b, d - e) *
                  Math.pow(b, e) *
                  a[e] *
                  this.bernstein(d, e);
            return c;
         },
         catmullRomInterpolation: function (a, b) {
            var c = a.length - 1,
               d = c * b,
               e = Math.floor(d);
            return a[0] === a[c]
               ? (0 > b && (e = Math.floor((d = c * (1 + b)))),
                 this.catmullRom(
                    a[(e - 1 + c) % c],
                    a[e],
                    a[(e + 1) % c],
                    a[(e + 2) % c],
                    d - e
                 ))
               : 0 > b
               ? a[0] - (this.catmullRom(a[0], a[0], a[1], a[1], -d) - a[0])
               : b > 1
               ? a[c] -
                 (this.catmullRom(a[c], a[c], a[c - 1], a[c - 1], d - c) - a[c])
               : this.catmullRom(
                    a[e ? e - 1 : 0],
                    a[e],
                    a[e + 1 > c ? c : e + 1],
                    a[e + 2 > c ? c : e + 2],
                    d - e
                 );
         },
         linear: function (a, b, c) {
            return (b - a) * c + a;
         },
         bernstein: function (a, b) {
            return (
               this.factorial(a) / this.factorial(b) / this.factorial(a - b)
            );
         },
         catmullRom: function (a, b, c, d, e) {
            var f = 0.5 * (c - a),
               g = 0.5 * (d - b),
               h = e * e,
               i = e * h;
            return (
               (2 * b - 2 * c + f + g) * i +
               (-3 * b + 3 * c - 2 * f - g) * h +
               f * e +
               b
            );
         },
         difference: function (a, b) {
            return Math.abs(a - b);
         },
         getRandom: function (a, b, c) {
            if (
               ("undefined" == typeof b && (b = 0),
               "undefined" == typeof c && (c = 0),
               null != a)
            ) {
               var d = c;
               if (((0 === d || d > a.length - b) && (d = a.length - b), d > 0))
                  return a[b + Math.floor(Math.random() * d)];
            }
            return null;
         },
         floor: function (a) {
            var b = 0 | a;
            return a > 0 ? b : b != a ? b - 1 : b;
         },
         ceil: function (a) {
            var b = 0 | a;
            return a > 0 ? (b != a ? b + 1 : b) : b;
         },
         sinCosGenerator: function (a, b, c, d) {
            "undefined" == typeof b && (b = 1),
               "undefined" == typeof c && (c = 1),
               "undefined" == typeof d && (d = 1);
            for (
               var e = b, f = c, g = (d * Math.PI) / a, h = [], i = [], j = 0;
               a > j;
               j++
            )
               (f -= e * g), (e += f * g), (h[j] = f), (i[j] = e);
            return { sin: i, cos: h, length: a };
         },
         shift: function (a) {
            var b = a.shift();
            return a.push(b), b;
         },
         shuffleArray: function (a) {
            for (var b = a.length - 1; b > 0; b--) {
               var c = Math.floor(Math.random() * (b + 1)),
                  d = a[b];
               (a[b] = a[c]), (a[c] = d);
            }
            return a;
         },
         distance: function (a, b, c, d) {
            var e = a - c,
               f = b - d;
            return Math.sqrt(e * e + f * f);
         },
         distancePow: function (a, b, c, d, e) {
            return (
               "undefined" == typeof e && (e = 2),
               Math.sqrt(Math.pow(c - a, e) + Math.pow(d - b, e))
            );
         },
         distanceRounded: function (a, b, d, e) {
            return Math.round(c.Math.distance(a, b, d, e));
         },
         clamp: function (a, b, c) {
            return b > a ? b : a > c ? c : a;
         },
         clampBottom: function (a, b) {
            return b > a ? b : a;
         },
         within: function (a, b, c) {
            return Math.abs(a - b) <= c;
         },
         mapLinear: function (a, b, c, d, e) {
            return d + ((a - b) * (e - d)) / (c - b);
         },
         smoothstep: function (a, b, c) {
            return b >= a
               ? 0
               : a >= c
               ? 1
               : ((a = (a - b) / (c - b)), a * a * (3 - 2 * a));
         },
         smootherstep: function (a, b, c) {
            return b >= a
               ? 0
               : a >= c
               ? 1
               : ((a = (a - b) / (c - b)), a * a * a * (a * (6 * a - 15) + 10));
         },
         sign: function (a) {
            return 0 > a ? -1 : a > 0 ? 1 : 0;
         },
         degToRad: (function () {
            var a = Math.PI / 180;
            return function (b) {
               return b * a;
            };
         })(),
         radToDeg: (function () {
            var a = 180 / Math.PI;
            return function (b) {
               return b * a;
            };
         })(),
      }),
      (c.QuadTree = function (a, b, c, d, e, f, g) {
         (this.maxObjects = e || 10),
            (this.maxLevels = f || 4),
            (this.level = g || 0),
            (this.bounds = {
               x: Math.round(a),
               y: Math.round(b),
               width: c,
               height: d,
               subWidth: Math.floor(c / 2),
               subHeight: Math.floor(d / 2),
               right: Math.round(a) + Math.floor(c / 2),
               bottom: Math.round(b) + Math.floor(d / 2),
            }),
            (this.objects = []),
            (this.nodes = []);
      }),
      (c.QuadTree.prototype = {
         populate: function (a) {
            a.forEach(this.populateHandler, this, !0);
         },
         populateHandler: function (a) {
            a.body &&
               a.body.checkCollision.none === !1 &&
               a.alive &&
               this.insert(a.body);
         },
         split: function () {
            this.level++,
               (this.nodes[0] = new c.QuadTree(
                  this.bounds.right,
                  this.bounds.y,
                  this.bounds.subWidth,
                  this.bounds.subHeight,
                  this.maxObjects,
                  this.maxLevels,
                  this.level
               )),
               (this.nodes[1] = new c.QuadTree(
                  this.bounds.x,
                  this.bounds.y,
                  this.bounds.subWidth,
                  this.bounds.subHeight,
                  this.maxObjects,
                  this.maxLevels,
                  this.level
               )),
               (this.nodes[2] = new c.QuadTree(
                  this.bounds.x,
                  this.bounds.bottom,
                  this.bounds.subWidth,
                  this.bounds.subHeight,
                  this.maxObjects,
                  this.maxLevels,
                  this.level
               )),
               (this.nodes[3] = new c.QuadTree(
                  this.bounds.right,
                  this.bounds.bottom,
                  this.bounds.subWidth,
                  this.bounds.subHeight,
                  this.maxObjects,
                  this.maxLevels,
                  this.level
               ));
         },
         insert: function (a) {
            var b,
               c = 0;
            if (null != this.nodes[0] && ((b = this.getIndex(a)), -1 !== b))
               return this.nodes[b].insert(a), void 0;
            if (
               (this.objects.push(a),
               this.objects.length > this.maxObjects &&
                  this.level < this.maxLevels)
            )
               for (
                  null == this.nodes[0] && this.split();
                  c < this.objects.length;

               )
                  (b = this.getIndex(this.objects[c])),
                     -1 !== b
                        ? this.nodes[b].insert(this.objects.splice(c, 1)[0])
                        : c++;
         },
         getIndex: function (a) {
            var b = -1;
            return (
               a.x < this.bounds.right && a.right < this.bounds.right
                  ? a.y < this.bounds.bottom && a.bottom < this.bounds.bottom
                     ? (b = 1)
                     : a.y > this.bounds.bottom && (b = 2)
                  : a.x > this.bounds.right &&
                    (a.y < this.bounds.bottom && a.bottom < this.bounds.bottom
                       ? (b = 0)
                       : a.y > this.bounds.bottom && (b = 3)),
               b
            );
         },
         retrieve: function (a) {
            var b = this.objects;
            return (
               (a.body.quadTreeIndex = this.getIndex(a.body)),
               this.nodes[0] &&
                  (-1 !== a.body.quadTreeIndex
                     ? (b = b.concat(
                          this.nodes[a.body.quadTreeIndex].retrieve(a)
                       ))
                     : ((b = b.concat(this.nodes[0].retrieve(a))),
                       (b = b.concat(this.nodes[1].retrieve(a))),
                       (b = b.concat(this.nodes[2].retrieve(a))),
                       (b = b.concat(this.nodes[3].retrieve(a))))),
               b
            );
         },
         clear: function () {
            this.objects = [];
            for (var a = 0, b = this.nodes.length; b > a; a++)
               this.nodes[a] && (this.nodes[a].clear(), delete this.nodes[a]);
         },
      }),
      (c.QuadTree.prototype.constructor = c.QuadTree),
      (c.Circle = function (a, b, c) {
         (a = a || 0),
            (b = b || 0),
            (c = c || 0),
            (this.x = a),
            (this.y = b),
            (this._diameter = c),
            (this._radius = c > 0 ? 0.5 * c : 0);
      }),
      (c.Circle.prototype = {
         circumference: function () {
            return 2 * Math.PI * this._radius;
         },
         setTo: function (a, b, c) {
            return (
               (this.x = a),
               (this.y = b),
               (this._diameter = c),
               (this._radius = 0.5 * c),
               this
            );
         },
         copyFrom: function (a) {
            return this.setTo(a.x, a.y, a.diameter);
         },
         copyTo: function (a) {
            return (
               (a.x = this.x), (a.y = this.y), (a.diameter = this._diameter), a
            );
         },
         distance: function (a, b) {
            return (
               "undefined" == typeof b && (b = !1),
               b
                  ? c.Math.distanceRound(this.x, this.y, a.x, a.y)
                  : c.Math.distance(this.x, this.y, a.x, a.y)
            );
         },
         clone: function (a) {
            return (
               "undefined" == typeof a && (a = new c.Circle()),
               a.setTo(this.x, this.y, this.diameter)
            );
         },
         contains: function (a, b) {
            return c.Circle.contains(this, a, b);
         },
         circumferencePoint: function (a, b, d) {
            return c.Circle.circumferencePoint(this, a, b, d);
         },
         offset: function (a, b) {
            return (this.x += a), (this.y += b), this;
         },
         offsetPoint: function (a) {
            return this.offset(a.x, a.y);
         },
         toString: function () {
            return (
               "[{Phaser.Circle (x=" +
               this.x +
               " y=" +
               this.y +
               " diameter=" +
               this.diameter +
               " radius=" +
               this.radius +
               ")}]"
            );
         },
      }),
      (c.Circle.prototype.constructor = c.Circle),
      Object.defineProperty(c.Circle.prototype, "diameter", {
         get: function () {
            return this._diameter;
         },
         set: function (a) {
            a > 0 && ((this._diameter = a), (this._radius = 0.5 * a));
         },
      }),
      Object.defineProperty(c.Circle.prototype, "radius", {
         get: function () {
            return this._radius;
         },
         set: function (a) {
            a > 0 && ((this._radius = a), (this._diameter = 2 * a));
         },
      }),
      Object.defineProperty(c.Circle.prototype, "left", {
         get: function () {
            return this.x - this._radius;
         },
         set: function (a) {
            a > this.x
               ? ((this._radius = 0), (this._diameter = 0))
               : (this.radius = this.x - a);
         },
      }),
      Object.defineProperty(c.Circle.prototype, "right", {
         get: function () {
            return this.x + this._radius;
         },
         set: function (a) {
            a < this.x
               ? ((this._radius = 0), (this._diameter = 0))
               : (this.radius = a - this.x);
         },
      }),
      Object.defineProperty(c.Circle.prototype, "top", {
         get: function () {
            return this.y - this._radius;
         },
         set: function (a) {
            a > this.y
               ? ((this._radius = 0), (this._diameter = 0))
               : (this.radius = this.y - a);
         },
      }),
      Object.defineProperty(c.Circle.prototype, "bottom", {
         get: function () {
            return this.y + this._radius;
         },
         set: function (a) {
            a < this.y
               ? ((this._radius = 0), (this._diameter = 0))
               : (this.radius = a - this.y);
         },
      }),
      Object.defineProperty(c.Circle.prototype, "area", {
         get: function () {
            return this._radius > 0 ? Math.PI * this._radius * this._radius : 0;
         },
      }),
      Object.defineProperty(c.Circle.prototype, "empty", {
         get: function () {
            return 0 === this._diameter;
         },
         set: function (a) {
            a === !0 && this.setTo(0, 0, 0);
         },
      }),
      (c.Circle.contains = function (a, b, c) {
         if (b >= a.left && b <= a.right && c >= a.top && c <= a.bottom) {
            var d = (a.x - b) * (a.x - b),
               e = (a.y - c) * (a.y - c);
            return d + e <= a.radius * a.radius;
         }
         return !1;
      }),
      (c.Circle.equals = function (a, b) {
         return a.x == b.x && a.y == b.y && a.diameter == b.diameter;
      }),
      (c.Circle.intersects = function (a, b) {
         return c.Math.distance(a.x, a.y, b.x, b.y) <= a.radius + b.radius;
      }),
      (c.Circle.circumferencePoint = function (a, b, d, e) {
         return (
            "undefined" == typeof d && (d = !1),
            "undefined" == typeof e && (e = new c.Point()),
            d === !0 && (b = c.Math.radToDeg(b)),
            (e.x = a.x + a.radius * Math.cos(b)),
            (e.y = a.y + a.radius * Math.sin(b)),
            e
         );
      }),
      (c.Circle.intersectsRectangle = function (a, b) {
         var c = Math.abs(a.x - b.x - b.halfWidth),
            d = b.halfWidth + a.radius;
         if (c > d) return !1;
         var e = Math.abs(a.y - b.y - b.halfHeight),
            f = b.halfHeight + a.radius;
         if (e > f) return !1;
         if (c <= b.halfWidth || e <= b.halfHeight) return !0;
         var g = c - b.halfWidth,
            h = e - b.halfHeight,
            i = g * g,
            j = h * h,
            k = a.radius * a.radius;
         return k >= i + j;
      }),
      (c.Point = function (a, b) {
         (a = a || 0), (b = b || 0), (this.x = a), (this.y = b);
      }),
      (c.Point.prototype = {
         copyFrom: function (a) {
            return this.setTo(a.x, a.y);
         },
         invert: function () {
            return this.setTo(this.y, this.x);
         },
         setTo: function (a, b) {
            return (this.x = a), (this.y = b), this;
         },
         add: function (a, b) {
            return (this.x += a), (this.y += b), this;
         },
         subtract: function (a, b) {
            return (this.x -= a), (this.y -= b), this;
         },
         multiply: function (a, b) {
            return (this.x *= a), (this.y *= b), this;
         },
         divide: function (a, b) {
            return (this.x /= a), (this.y /= b), this;
         },
         clampX: function (a, b) {
            return (this.x = c.Math.clamp(this.x, a, b)), this;
         },
         clampY: function (a, b) {
            return (this.y = c.Math.clamp(this.y, a, b)), this;
         },
         clamp: function (a, b) {
            return (
               (this.x = c.Math.clamp(this.x, a, b)),
               (this.y = c.Math.clamp(this.y, a, b)),
               this
            );
         },
         clone: function (a) {
            return (
               "undefined" == typeof a && (a = new c.Point()),
               a.setTo(this.x, this.y)
            );
         },
         copyTo: function (a) {
            return (a.x = this.x), (a.y = this.y), a;
         },
         distance: function (a, b) {
            return c.Point.distance(this, a, b);
         },
         equals: function (a) {
            return a.x == this.x && a.y == this.y;
         },
         rotate: function (a, b, d, e, f) {
            return c.Point.rotate(this, a, b, d, e, f);
         },
         getMagnitude: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
         },
         setMagnitude: function (a) {
            return this.normalize().multiply(a, a);
         },
         normalize: function () {
            if (!this.isZero()) {
               var a = this.getMagnitude();
               (this.x /= a), (this.y /= a);
            }
            return this;
         },
         isZero: function () {
            return 0 === this.x && 0 === this.y;
         },
         toString: function () {
            return "[{Point (x=" + this.x + " y=" + this.y + ")}]";
         },
      }),
      (c.Point.prototype.constructor = c.Point),
      (c.Point.add = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = new c.Point()),
            (d.x = a.x + b.x),
            (d.y = a.y + b.y),
            d
         );
      }),
      (c.Point.subtract = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = new c.Point()),
            (d.x = a.x - b.x),
            (d.y = a.y - b.y),
            d
         );
      }),
      (c.Point.multiply = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = new c.Point()),
            (d.x = a.x * b.x),
            (d.y = a.y * b.y),
            d
         );
      }),
      (c.Point.divide = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = new c.Point()),
            (d.x = a.x / b.x),
            (d.y = a.y / b.y),
            d
         );
      }),
      (c.Point.equals = function (a, b) {
         return a.x == b.x && a.y == b.y;
      }),
      (c.Point.distance = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = !1),
            d
               ? c.Math.distanceRound(a.x, a.y, b.x, b.y)
               : c.Math.distance(a.x, a.y, b.x, b.y)
         );
      }),
      (c.Point.rotate = function (a, b, d, e, f, g) {
         return (
            (f = f || !1),
            (g = g || null),
            f && (e = c.Math.degToRad(e)),
            null === g &&
               (g = Math.sqrt((b - a.x) * (b - a.x) + (d - a.y) * (d - a.y))),
            a.setTo(b + g * Math.cos(e), d + g * Math.sin(e))
         );
      }),
      (c.Rectangle = function (a, b, c, d) {
         (a = a || 0),
            (b = b || 0),
            (c = c || 0),
            (d = d || 0),
            (this.x = a),
            (this.y = b),
            (this.width = c),
            (this.height = d);
      }),
      (c.Rectangle.prototype = {
         offset: function (a, b) {
            return (this.x += a), (this.y += b), this;
         },
         offsetPoint: function (a) {
            return this.offset(a.x, a.y);
         },
         setTo: function (a, b, c, d) {
            return (
               (this.x = a),
               (this.y = b),
               (this.width = c),
               (this.height = d),
               this
            );
         },
         floor: function () {
            (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y));
         },
         floorAll: function () {
            (this.x = Math.floor(this.x)),
               (this.y = Math.floor(this.y)),
               (this.width = Math.floor(this.width)),
               (this.height = Math.floor(this.height));
         },
         copyFrom: function (a) {
            return this.setTo(a.x, a.y, a.width, a.height);
         },
         copyTo: function (a) {
            return (
               (a.x = this.x),
               (a.y = this.y),
               (a.width = this.width),
               (a.height = this.height),
               a
            );
         },
         inflate: function (a, b) {
            return c.Rectangle.inflate(this, a, b);
         },
         size: function (a) {
            return c.Rectangle.size(this, a);
         },
         clone: function (a) {
            return c.Rectangle.clone(this, a);
         },
         contains: function (a, b) {
            return c.Rectangle.contains(this, a, b);
         },
         containsRect: function (a) {
            return c.Rectangle.containsRect(this, a);
         },
         equals: function (a) {
            return c.Rectangle.equals(this, a);
         },
         intersection: function (a, b) {
            return c.Rectangle.intersection(this, a, b);
         },
         intersects: function (a, b) {
            return c.Rectangle.intersects(this, a, b);
         },
         intersectsRaw: function (a, b, d, e, f) {
            return c.Rectangle.intersectsRaw(this, a, b, d, e, f);
         },
         union: function (a, b) {
            return c.Rectangle.union(this, a, b);
         },
         toString: function () {
            return (
               "[{Rectangle (x=" +
               this.x +
               " y=" +
               this.y +
               " width=" +
               this.width +
               " height=" +
               this.height +
               " empty=" +
               this.empty +
               ")}]"
            );
         },
      }),
      (c.Rectangle.prototype.constructor = c.Rectangle),
      Object.defineProperty(c.Rectangle.prototype, "halfWidth", {
         get: function () {
            return Math.round(this.width / 2);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "halfHeight", {
         get: function () {
            return Math.round(this.height / 2);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "bottom", {
         get: function () {
            return this.y + this.height;
         },
         set: function (a) {
            this.height = a <= this.y ? 0 : this.y - a;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "bottomRight", {
         get: function () {
            return new c.Point(this.right, this.bottom);
         },
         set: function (a) {
            (this.right = a.x), (this.bottom = a.y);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "left", {
         get: function () {
            return this.x;
         },
         set: function (a) {
            (this.width = a >= this.right ? 0 : this.right - a), (this.x = a);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "right", {
         get: function () {
            return this.x + this.width;
         },
         set: function (a) {
            this.width = a <= this.x ? 0 : this.x + a;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "volume", {
         get: function () {
            return this.width * this.height;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "perimeter", {
         get: function () {
            return 2 * this.width + 2 * this.height;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "centerX", {
         get: function () {
            return this.x + this.halfWidth;
         },
         set: function (a) {
            this.x = a - this.halfWidth;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "centerY", {
         get: function () {
            return this.y + this.halfHeight;
         },
         set: function (a) {
            this.y = a - this.halfHeight;
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "top", {
         get: function () {
            return this.y;
         },
         set: function (a) {
            a >= this.bottom
               ? ((this.height = 0), (this.y = a))
               : (this.height = this.bottom - a);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "topLeft", {
         get: function () {
            return new c.Point(this.x, this.y);
         },
         set: function (a) {
            (this.x = a.x), (this.y = a.y);
         },
      }),
      Object.defineProperty(c.Rectangle.prototype, "empty", {
         get: function () {
            return !this.width || !this.height;
         },
         set: function (a) {
            a === !0 && this.setTo(0, 0, 0, 0);
         },
      }),
      (c.Rectangle.inflate = function (a, b, c) {
         return (
            (a.x -= b), (a.width += 2 * b), (a.y -= c), (a.height += 2 * c), a
         );
      }),
      (c.Rectangle.inflatePoint = function (a, b) {
         return c.Rectangle.inflate(a, b.x, b.y);
      }),
      (c.Rectangle.size = function (a, b) {
         return (
            "undefined" == typeof b && (b = new c.Point()),
            b.setTo(a.width, a.height)
         );
      }),
      (c.Rectangle.clone = function (a, b) {
         return (
            "undefined" == typeof b && (b = new c.Rectangle()),
            b.setTo(a.x, a.y, a.width, a.height)
         );
      }),
      (c.Rectangle.contains = function (a, b, c) {
         return b >= a.x && b <= a.right && c >= a.y && c <= a.bottom;
      }),
      (c.Rectangle.containsRaw = function (a, b, c, d, e, f) {
         return e >= a && a + c >= e && f >= b && b + d >= f;
      }),
      (c.Rectangle.containsPoint = function (a, b) {
         return c.Rectangle.contains(a, b.x, b.y);
      }),
      (c.Rectangle.containsRect = function (a, b) {
         return a.volume > b.volume
            ? !1
            : a.x >= b.x &&
                 a.y >= b.y &&
                 a.right <= b.right &&
                 a.bottom <= b.bottom;
      }),
      (c.Rectangle.equals = function (a, b) {
         return (
            a.x == b.x &&
            a.y == b.y &&
            a.width == b.width &&
            a.height == b.height
         );
      }),
      (c.Rectangle.intersection = function (a, b, d) {
         return (
            (d = d || new c.Rectangle()),
            c.Rectangle.intersects(a, b) &&
               ((d.x = Math.max(a.x, b.x)),
               (d.y = Math.max(a.y, b.y)),
               (d.width = Math.min(a.right, b.right) - d.x),
               (d.height = Math.min(a.bottom, b.bottom) - d.y)),
            d
         );
      }),
      (c.Rectangle.intersects = function (a, b) {
         return a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0
            ? !1
            : !(
                 a.right < b.x ||
                 a.bottom < b.y ||
                 a.x > b.right ||
                 a.y > b.bottom
              );
      }),
      (c.Rectangle.intersectsRaw = function (a, b, c, d, e, f) {
         return (
            "undefined" == typeof f && (f = 0),
            !(
               b > a.right + f ||
               c < a.left - f ||
               d > a.bottom + f ||
               e < a.top - f
            )
         );
      }),
      (c.Rectangle.union = function (a, b, d) {
         return (
            "undefined" == typeof d && (d = new c.Rectangle()),
            d.setTo(
               Math.min(a.x, b.x),
               Math.min(a.y, b.y),
               Math.max(a.right, b.right) - Math.min(a.left, b.left),
               Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top)
            )
         );
      }),
      (c.Polygon = function (a) {
         b.Polygon.call(this, a), (this.type = c.POLYGON);
      }),
      (c.Polygon.prototype = Object.create(b.Polygon.prototype)),
      (c.Polygon.prototype.constructor = c.Polygon),
      (c.Line = function (a, b, d, e) {
         (a = a || 0),
            (b = b || 0),
            (d = d || 0),
            (e = e || 0),
            (this.start = new c.Point(a, b)),
            (this.end = new c.Point(d, e));
      }),
      (c.Line.prototype = {
         setTo: function (a, b, c, d) {
            return this.start.setTo(a, b), this.end.setTo(c, d), this;
         },
         fromSprite: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = !0),
               c
                  ? this.setTo(a.center.x, a.center.y, b.center.x, b.center.y)
                  : this.setTo(a.x, a.y, b.x, b.y)
            );
         },
         intersects: function (a, b, d) {
            return c.Line.intersectsPoints(
               this.start,
               this.end,
               a.start,
               a.end,
               b,
               d
            );
         },
         pointOnLine: function (a, b) {
            return (
               (a - this.start.x) * (this.end.y - this.end.y) ===
               (this.end.x - this.start.x) * (b - this.end.y)
            );
         },
         pointOnSegment: function (a, b) {
            var c = Math.min(this.start.x, this.end.x),
               d = Math.max(this.start.x, this.end.x),
               e = Math.min(this.start.y, this.end.y),
               f = Math.max(this.start.y, this.end.y);
            return (
               this.pointOnLine(a, b) && a >= c && d >= a && b >= e && f >= b
            );
         },
      }),
      Object.defineProperty(c.Line.prototype, "length", {
         get: function () {
            return Math.sqrt(
               (this.end.x - this.start.x) * (this.end.x - this.start.x) +
                  (this.end.y - this.start.y) * (this.end.y - this.start.y)
            );
         },
      }),
      Object.defineProperty(c.Line.prototype, "angle", {
         get: function () {
            return Math.atan2(
               this.end.x - this.start.x,
               this.end.y - this.start.y
            );
         },
      }),
      Object.defineProperty(c.Line.prototype, "slope", {
         get: function () {
            return (this.end.y - this.start.y) / (this.end.x - this.start.x);
         },
      }),
      Object.defineProperty(c.Line.prototype, "perpSlope", {
         get: function () {
            return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
         },
      }),
      (c.Line.intersectsPoints = function (a, b, d, e, f, g) {
         "undefined" == typeof f && (f = !0),
            "undefined" == typeof g && (g = new c.Point());
         var h = b.y - a.y,
            i = e.y - d.y,
            j = a.x - b.x,
            k = d.x - e.x,
            l = b.x * a.y - a.x * b.y,
            m = e.x * d.y - d.x * e.y,
            n = h * k - i * j;
         if (0 === n) return null;
         if (((g.x = (j * m - k * l) / n), (g.y = (i * l - h * m) / n), f)) {
            if (
               Math.pow(g.x - b.x + (g.y - b.y), 2) >
               Math.pow(a.x - b.x + (a.y - b.y), 2)
            )
               return null;
            if (
               Math.pow(g.x - a.x + (g.y - a.y), 2) >
               Math.pow(a.x - b.x + (a.y - b.y), 2)
            )
               return null;
            if (
               Math.pow(g.x - e.x + (g.y - e.y), 2) >
               Math.pow(d.x - e.x + (d.y - e.y), 2)
            )
               return null;
            if (
               Math.pow(g.x - d.x + (g.y - d.y), 2) >
               Math.pow(d.x - e.x + (d.y - e.y), 2)
            )
               return null;
         }
         return g;
      }),
      (c.Line.intersects = function (a, b, d, e) {
         return c.Line.intersectsPoints(a.start, a.end, b.start, b.end, d, e);
      }),
      (c.Net = function (a) {
         this.game = a;
      }),
      (c.Net.prototype = {
         getHostName: function () {
            return window.location && window.location.hostname
               ? window.location.hostname
               : null;
         },
         checkDomainName: function (a) {
            return -1 !== window.location.hostname.indexOf(a);
         },
         updateQueryString: function (a, b, c, d) {
            "undefined" == typeof c && (c = !1),
               ("undefined" == typeof d || "" === d) &&
                  (d = window.location.href);
            var e = "",
               f = new RegExp("([?|&])" + a + "=.*?(&|#|$)(.*)", "gi");
            if (f.test(d))
               e =
                  "undefined" != typeof b && null !== b
                     ? d.replace(f, "$1" + a + "=" + b + "$2$3")
                     : d.replace(f, "$1$3").replace(/(&|\?)$/, "");
            else if ("undefined" != typeof b && null !== b) {
               var g = -1 !== d.indexOf("?") ? "&" : "?",
                  h = d.split("#");
               (d = h[0] + g + a + "=" + b), h[1] && (d += "#" + h[1]), (e = d);
            } else e = d;
            return c ? ((window.location.href = e), void 0) : e;
         },
         getQueryString: function (a) {
            "undefined" == typeof a && (a = "");
            var b = {},
               c = location.search.substring(1).split("&");
            for (var d in c) {
               var e = c[d].split("=");
               if (e.length > 1) {
                  if (a && a == this.decodeURI(e[0]))
                     return this.decodeURI(e[1]);
                  b[this.decodeURI(e[0])] = this.decodeURI(e[1]);
               }
            }
            return b;
         },
         decodeURI: function (a) {
            return decodeURIComponent(a.replace(/\+/g, " "));
         },
      }),
      (c.Net.prototype.constructor = c.Net),
      (c.TweenManager = function (a) {
         (this.game = a),
            (this._tweens = []),
            (this._add = []),
            this.game.onPause.add(this.pauseAll, this),
            this.game.onResume.add(this.resumeAll, this);
      }),
      (c.TweenManager.prototype = {
         getAll: function () {
            return this._tweens;
         },
         removeAll: function () {
            for (var a = 0; a < this._tweens.length; a++)
               this._tweens[a].pendingDelete = !0;
            this._add = [];
         },
         add: function (a) {
            this._add.push(a);
         },
         create: function (a) {
            return new c.Tween(a, this.game);
         },
         remove: function (a) {
            var b = this._tweens.indexOf(a);
            -1 !== b && (this._tweens[b].pendingDelete = !0);
         },
         update: function () {
            if (0 === this._tweens.length && 0 === this._add.length) return !1;
            for (var a = 0, b = this._tweens.length; b > a; )
               this._tweens[a].update(this.game.time.now)
                  ? a++
                  : (this._tweens.splice(a, 1), b--);
            return (
               this._add.length > 0 &&
                  ((this._tweens = this._tweens.concat(this._add)),
                  (this._add.length = 0)),
               !0
            );
         },
         isTweening: function (a) {
            return this._tweens.some(function (b) {
               return b._object === a;
            });
         },
         pauseAll: function () {
            for (var a = this._tweens.length - 1; a >= 0; a--)
               this._tweens[a].pause();
         },
         resumeAll: function () {
            for (var a = this._tweens.length - 1; a >= 0; a--)
               this._tweens[a].resume();
         },
      }),
      (c.TweenManager.prototype.constructor = c.TweenManager),
      (c.Tween = function (a, b) {
         (this._object = a),
            (this.game = b),
            (this._manager = this.game.tweens),
            (this._valuesStart = {}),
            (this._valuesEnd = {}),
            (this._valuesStartRepeat = {}),
            (this._duration = 1e3),
            (this._repeat = 0),
            (this._yoyo = !1),
            (this._reversed = !1),
            (this._delayTime = 0),
            (this._startTime = null),
            (this._easingFunction = c.Easing.Linear.None),
            (this._interpolationFunction = c.Math.linearInterpolation),
            (this._chainedTweens = []),
            (this._onStartCallbackFired = !1),
            (this._onUpdateCallback = null),
            (this._onUpdateCallbackContext = null),
            (this._pausedTime = 0),
            (this.pendingDelete = !1);
         for (var d in a) this._valuesStart[d] = parseFloat(a[d], 10);
         (this.onStart = new c.Signal()),
            (this.onLoop = new c.Signal()),
            (this.onComplete = new c.Signal()),
            (this.isRunning = !1);
      }),
      (c.Tween.prototype = {
         to: function (a, b, c, d, e, f, g) {
            (b = b || 1e3),
               (c = c || null),
               (d = d || !1),
               (e = e || 0),
               (f = f || 0),
               (g = g || !1);
            var h;
            return (
               this._parent
                  ? ((h = this._manager.create(this._object)),
                    this._lastChild.chain(h),
                    (this._lastChild = h))
                  : ((h = this),
                    (this._parent = this),
                    (this._lastChild = this)),
               (h._repeat = f),
               (h._duration = b),
               (h._valuesEnd = a),
               null !== c && (h._easingFunction = c),
               e > 0 && (h._delayTime = e),
               (h._yoyo = g),
               d ? this.start() : this
            );
         },
         start: function () {
            if (null !== this.game && null !== this._object) {
               this._manager.add(this),
                  (this.isRunning = !0),
                  (this._onStartCallbackFired = !1),
                  (this._startTime = this.game.time.now + this._delayTime);
               for (var a in this._valuesEnd) {
                  if (this._valuesEnd[a] instanceof Array) {
                     if (0 === this._valuesEnd[a].length) continue;
                     this._valuesEnd[a] = [this._object[a]].concat(
                        this._valuesEnd[a]
                     );
                  }
                  (this._valuesStart[a] = this._object[a]),
                     this._valuesStart[a] instanceof Array == !1 &&
                        (this._valuesStart[a] *= 1),
                     (this._valuesStartRepeat[a] = this._valuesStart[a] || 0);
               }
               return this;
            }
         },
         stop: function () {
            return (
               (this.isRunning = !1),
               (this._onUpdateCallback = null),
               this._manager.remove(this),
               this
            );
         },
         delay: function (a) {
            return (this._delayTime = a), this;
         },
         repeat: function (a) {
            return (this._repeat = a), this;
         },
         yoyo: function (a) {
            return (this._yoyo = a), this;
         },
         easing: function (a) {
            return (this._easingFunction = a), this;
         },
         interpolation: function (a) {
            return (this._interpolationFunction = a), this;
         },
         chain: function () {
            return (this._chainedTweens = arguments), this;
         },
         loop: function () {
            return this._lastChild.chain(this), this;
         },
         onUpdateCallback: function (a, b) {
            return (
               (this._onUpdateCallback = a),
               (this._onUpdateCallbackContext = b),
               this
            );
         },
         pause: function () {
            (this._paused = !0), (this._pausedTime = this.game.time.now);
         },
         resume: function () {
            (this._paused = !1),
               (this._startTime += this.game.time.now - this._pausedTime);
         },
         update: function (a) {
            if (this.pendingDelete) return !1;
            if (this._paused || a < this._startTime) return !0;
            var b;
            if (a < this._startTime) return !0;
            this._onStartCallbackFired === !1 &&
               (this.onStart.dispatch(this._object),
               (this._onStartCallbackFired = !0));
            var c = (a - this._startTime) / this._duration;
            c = c > 1 ? 1 : c;
            var d = this._easingFunction(c);
            for (b in this._valuesEnd) {
               var e = this._valuesStart[b] || 0,
                  f = this._valuesEnd[b];
               f instanceof Array
                  ? (this._object[b] = this._interpolationFunction(f, d))
                  : ("string" == typeof f && (f = e + parseFloat(f, 10)),
                    "number" == typeof f &&
                       (this._object[b] = e + (f - e) * d));
            }
            if (
               (null !== this._onUpdateCallback &&
                  this._onUpdateCallback.call(
                     this._onUpdateCallbackContext,
                     this,
                     d
                  ),
               1 == c)
            ) {
               if (this._repeat > 0) {
                  isFinite(this._repeat) && this._repeat--;
                  for (b in this._valuesStartRepeat) {
                     if (
                        ("string" == typeof this._valuesEnd[b] &&
                           (this._valuesStartRepeat[b] =
                              this._valuesStartRepeat[b] +
                              parseFloat(this._valuesEnd[b], 10)),
                        this._yoyo)
                     ) {
                        var g = this._valuesStartRepeat[b];
                        (this._valuesStartRepeat[b] = this._valuesEnd[b]),
                           (this._valuesEnd[b] = g),
                           (this._reversed = !this._reversed);
                     }
                     this._valuesStart[b] = this._valuesStartRepeat[b];
                  }
                  return (
                     (this._startTime = a + this._delayTime),
                     this.onLoop.dispatch(this._object),
                     !0
                  );
               }
               (this.isRunning = !1), this.onComplete.dispatch(this._object);
               for (var h = 0, i = this._chainedTweens.length; i > h; h++)
                  this._chainedTweens[h].start(a);
               return !1;
            }
            return !0;
         },
      }),
      (c.Tween.prototype.constructor = c.Tween),
      (c.Easing = {
         Linear: {
            None: function (a) {
               return a;
            },
         },
         Quadratic: {
            In: function (a) {
               return a * a;
            },
            Out: function (a) {
               return a * (2 - a);
            },
            InOut: function (a) {
               return (a *= 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
            },
         },
         Cubic: {
            In: function (a) {
               return a * a * a;
            },
            Out: function (a) {
               return --a * a * a + 1;
            },
            InOut: function (a) {
               return (a *= 2) < 1
                  ? 0.5 * a * a * a
                  : 0.5 * ((a -= 2) * a * a + 2);
            },
         },
         Quartic: {
            In: function (a) {
               return a * a * a * a;
            },
            Out: function (a) {
               return 1 - --a * a * a * a;
            },
            InOut: function (a) {
               return (a *= 2) < 1
                  ? 0.5 * a * a * a * a
                  : -0.5 * ((a -= 2) * a * a * a - 2);
            },
         },
         Quintic: {
            In: function (a) {
               return a * a * a * a * a;
            },
            Out: function (a) {
               return --a * a * a * a * a + 1;
            },
            InOut: function (a) {
               return (a *= 2) < 1
                  ? 0.5 * a * a * a * a * a
                  : 0.5 * ((a -= 2) * a * a * a * a + 2);
            },
         },
         Sinusoidal: {
            In: function (a) {
               return 1 - Math.cos((a * Math.PI) / 2);
            },
            Out: function (a) {
               return Math.sin((a * Math.PI) / 2);
            },
            InOut: function (a) {
               return 0.5 * (1 - Math.cos(Math.PI * a));
            },
         },
         Exponential: {
            In: function (a) {
               return 0 === a ? 0 : Math.pow(1024, a - 1);
            },
            Out: function (a) {
               return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
            },
            InOut: function (a) {
               return 0 === a
                  ? 0
                  : 1 === a
                  ? 1
                  : (a *= 2) < 1
                  ? 0.5 * Math.pow(1024, a - 1)
                  : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
            },
         },
         Circular: {
            In: function (a) {
               return 1 - Math.sqrt(1 - a * a);
            },
            Out: function (a) {
               return Math.sqrt(1 - --a * a);
            },
            InOut: function (a) {
               return (a *= 2) < 1
                  ? -0.5 * (Math.sqrt(1 - a * a) - 1)
                  : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            },
         },
         Elastic: {
            In: function (a) {
               var b,
                  c = 0.1,
                  d = 0.4;
               return 0 === a
                  ? 0
                  : 1 === a
                  ? 1
                  : (!c || 1 > c
                       ? ((c = 1), (b = d / 4))
                       : (b = (d * Math.asin(1 / c)) / (2 * Math.PI)),
                    -(
                       c *
                       Math.pow(2, 10 * (a -= 1)) *
                       Math.sin(((a - b) * 2 * Math.PI) / d)
                    ));
            },
            Out: function (a) {
               var b,
                  c = 0.1,
                  d = 0.4;
               return 0 === a
                  ? 0
                  : 1 === a
                  ? 1
                  : (!c || 1 > c
                       ? ((c = 1), (b = d / 4))
                       : (b = (d * Math.asin(1 / c)) / (2 * Math.PI)),
                    c *
                       Math.pow(2, -10 * a) *
                       Math.sin(((a - b) * 2 * Math.PI) / d) +
                       1);
            },
            InOut: function (a) {
               var b,
                  c = 0.1,
                  d = 0.4;
               return 0 === a
                  ? 0
                  : 1 === a
                  ? 1
                  : (!c || 1 > c
                       ? ((c = 1), (b = d / 4))
                       : (b = (d * Math.asin(1 / c)) / (2 * Math.PI)),
                    (a *= 2) < 1
                       ? -0.5 *
                         c *
                         Math.pow(2, 10 * (a -= 1)) *
                         Math.sin(((a - b) * 2 * Math.PI) / d)
                       : 0.5 *
                            c *
                            Math.pow(2, -10 * (a -= 1)) *
                            Math.sin(((a - b) * 2 * Math.PI) / d) +
                         1);
            },
         },
         Back: {
            In: function (a) {
               var b = 1.70158;
               return a * a * ((b + 1) * a - b);
            },
            Out: function (a) {
               var b = 1.70158;
               return --a * a * ((b + 1) * a + b) + 1;
            },
            InOut: function (a) {
               var b = 2.5949095;
               return (a *= 2) < 1
                  ? 0.5 * a * a * ((b + 1) * a - b)
                  : 0.5 * ((a -= 2) * a * ((b + 1) * a + b) + 2);
            },
         },
         Bounce: {
            In: function (a) {
               return 1 - c.Easing.Bounce.Out(1 - a);
            },
            Out: function (a) {
               return 1 / 2.75 > a
                  ? 7.5625 * a * a
                  : 2 / 2.75 > a
                  ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                  : 2.5 / 2.75 > a
                  ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                  : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            },
            InOut: function (a) {
               return 0.5 > a
                  ? 0.5 * c.Easing.Bounce.In(2 * a)
                  : 0.5 * c.Easing.Bounce.Out(2 * a - 1) + 0.5;
            },
         },
      }),
      (c.Time = function (a) {
         (this.game = a),
            (this.time = 0),
            (this.now = 0),
            (this.elapsed = 0),
            (this.pausedTime = 0),
            (this.fps = 0),
            (this.fpsMin = 1e3),
            (this.fpsMax = 0),
            (this.msMin = 1e3),
            (this.msMax = 0),
            (this.physicsElapsed = 0),
            (this.frames = 0),
            (this.pauseDuration = 0),
            (this.timeToCall = 0),
            (this.lastTime = 0),
            (this.events = new c.Timer(this.game, !1)),
            (this._started = 0),
            (this._timeLastSecond = 0),
            (this._pauseStarted = 0),
            (this._justResumed = !1),
            (this._timers = []),
            (this._len = 0),
            (this._i = 0),
            this.game.onPause.add(this.gamePaused, this),
            this.game.onResume.add(this.gameResumed, this);
      }),
      (c.Time.prototype = {
         boot: function () {
            this.events.start();
         },
         create: function (a) {
            "undefined" == typeof a && (a = !0);
            var b = new c.Timer(this.game, a);
            return this._timers.push(b), b;
         },
         removeAll: function () {
            for (var a = 0; a < this._timers.length; a++)
               this._timers[a].destroy();
            this._timers = [];
         },
         update: function (a) {
            if (((this.now = a), this._justResumed)) {
               (this.time = this.now),
                  (this._justResumed = !1),
                  this.events.resume();
               for (var b = 0; b < this._timers.length; b++)
                  this._timers[b].resume();
            }
            if (
               ((this.timeToCall = this.game.math.max(
                  0,
                  16 - (a - this.lastTime)
               )),
               (this.elapsed = this.now - this.time),
               (this.msMin = this.game.math.min(this.msMin, this.elapsed)),
               (this.msMax = this.game.math.max(this.msMax, this.elapsed)),
               this.frames++,
               this.now > this._timeLastSecond + 1e3 &&
                  ((this.fps = Math.round(
                     (1e3 * this.frames) / (this.now - this._timeLastSecond)
                  )),
                  (this.fpsMin = this.game.math.min(this.fpsMin, this.fps)),
                  (this.fpsMax = this.game.math.max(this.fpsMax, this.fps)),
                  (this._timeLastSecond = this.now),
                  (this.frames = 0)),
               (this.time = this.now),
               (this.lastTime = a + this.timeToCall),
               (this.physicsElapsed = 1 * (this.elapsed / 1e3)),
               this.physicsElapsed > 0.05 && (this.physicsElapsed = 0.05),
               this.game.paused)
            )
               this.pausedTime = this.now - this._pauseStarted;
            else
               for (
                  this.events.update(this.now),
                     this._i = 0,
                     this._len = this._timers.length;
                  this._i < this._len;

               )
                  this._timers[this._i].update(this.now)
                     ? this._i++
                     : (this._timers.splice(this._i, 1), this._len--);
         },
         gamePaused: function () {
            (this._pauseStarted = this.now), this.events.pause();
            for (var a = 0; a < this._timers.length; a++)
               this._timers[a].pause();
         },
         gameResumed: function () {
            (this.time = Date.now()),
               (this.pauseDuration = this.pausedTime),
               (this._justResumed = !0);
         },
         totalElapsedSeconds: function () {
            return 0.001 * (this.now - this._started);
         },
         elapsedSince: function (a) {
            return this.now - a;
         },
         elapsedSecondsSince: function (a) {
            return 0.001 * (this.now - a);
         },
         reset: function () {
            this._started = this.now;
         },
      }),
      (c.Time.prototype.constructor = c.Time),
      (c.Timer = function (a, b) {
         "undefined" == typeof b && (b = !0),
            (this.game = a),
            (this.running = !1),
            (this.autoDestroy = b),
            (this.expired = !1),
            (this.events = []),
            (this.onComplete = new c.Signal()),
            (this.nextTick = 0),
            (this.paused = !1),
            (this._started = 0),
            (this._pauseStarted = 0),
            (this._now = 0),
            (this._len = 0),
            (this._i = 0);
      }),
      (c.Timer.MINUTE = 6e4),
      (c.Timer.SECOND = 1e3),
      (c.Timer.HALF = 500),
      (c.Timer.QUARTER = 250),
      (c.Timer.prototype = {
         create: function (a, b, d, e, f, g) {
            var h = a;
            this.running && (h += this._now);
            var i = new c.TimerEvent(this, a, h, d, b, e, f, g);
            return this.events.push(i), this.order(), (this.expired = !1), i;
         },
         add: function (a, b, c) {
            return this.create(
               a,
               !1,
               0,
               b,
               c,
               Array.prototype.splice.call(arguments, 3)
            );
         },
         repeat: function (a, b, c, d) {
            return this.create(
               a,
               !1,
               b,
               c,
               d,
               Array.prototype.splice.call(arguments, 4)
            );
         },
         loop: function (a, b, c) {
            return this.create(
               a,
               !0,
               0,
               b,
               c,
               Array.prototype.splice.call(arguments, 3)
            );
         },
         start: function () {
            (this._started = this.game.time.now), (this.running = !0);
         },
         stop: function () {
            (this.running = !1), (this.events.length = 0);
         },
         remove: function (a) {
            for (var b = 0; b < this.events.length; b++)
               if (this.events[b] === a)
                  return (this.events[b].pendingDelete = !0), !0;
            return !1;
         },
         order: function () {
            this.events.length > 0 &&
               (this.events.sort(this.sortHandler),
               (this.nextTick = this.events[0].tick));
         },
         sortHandler: function (a, b) {
            return a.tick < b.tick ? -1 : a.tick > b.tick ? 1 : 0;
         },
         update: function (a) {
            if (this.paused) return !0;
            for (
               this._now = a - this._started,
                  this._len = this.events.length,
                  this._i = 0;
               this._i < this._len;

            )
               this.events[this._i].pendingDelete &&
                  (this.events.splice(this._i, 1), this._len--),
                  this._i++;
            if (
               ((this._len = this.events.length),
               this.running && this._now >= this.nextTick && this._len > 0)
            ) {
               for (
                  this._i = 0;
                  this._i < this._len && this._now >= this.events[this._i].tick;

               )
                  this.events[this._i].loop === !0
                     ? ((this.events[this._i].tick +=
                          this.events[this._i].delay -
                          (this._now - this.events[this._i].tick)),
                       this.events[this._i].callback.apply(
                          this.events[this._i].callbackContext,
                          this.events[this._i].args
                       ))
                     : this.events[this._i].repeatCount > 0
                     ? (this.events[this._i].repeatCount--,
                       (this.events[this._i].tick +=
                          this.events[this._i].delay -
                          (this._now - this.events[this._i].tick)),
                       this.events[this._i].callback.apply(
                          this.events[this._i].callbackContext,
                          this.events[this._i].args
                       ))
                     : (this.events[this._i].callback.apply(
                          this.events[this._i].callbackContext,
                          this.events[this._i].args
                       ),
                       this.events.splice(this._i, 1),
                       this._len--),
                     this._i++;
               this.events.length > 0
                  ? this.order()
                  : ((this.expired = !0), this.onComplete.dispatch(this));
            }
            return this.expired && this.autoDestroy ? !1 : !0;
         },
         pause: function () {
            this.running &&
               !this.expired &&
               ((this._pauseStarted = this.game.time.now), (this.paused = !0));
         },
         resume: function () {
            if (this.running && !this.expired) {
               for (
                  var a = this.game.time.now - this._pauseStarted, b = 0;
                  b < this.events.length;
                  b++
               )
                  this.events[b].tick += a;
               (this.nextTick += a), (this.paused = !1);
            }
         },
         destroy: function () {
            this.onComplete.removeAll(),
               (this.running = !1),
               (this.events = []),
               (this._i = this._len);
         },
      }),
      Object.defineProperty(c.Timer.prototype, "next", {
         get: function () {
            return this.nextTick;
         },
      }),
      Object.defineProperty(c.Timer.prototype, "duration", {
         get: function () {
            return this.running && this.nextTick > this._now
               ? this.nextTick - this._now
               : 0;
         },
      }),
      Object.defineProperty(c.Timer.prototype, "length", {
         get: function () {
            return this.events.length;
         },
      }),
      Object.defineProperty(c.Timer.prototype, "ms", {
         get: function () {
            return this._now;
         },
      }),
      Object.defineProperty(c.Timer.prototype, "seconds", {
         get: function () {
            return 0.001 * this._now;
         },
      }),
      (c.Timer.prototype.constructor = c.Timer),
      (c.TimerEvent = function (a, b, c, d, e, f, g, h) {
         (this.timer = a),
            (this.delay = b),
            (this.tick = c),
            (this.repeatCount = d - 1),
            (this.loop = e),
            (this.callback = f),
            (this.callbackContext = g),
            (this.args = h),
            (this.pendingDelete = !1);
      }),
      (c.TimerEvent.prototype.constructor = c.TimerEvent),
      (c.AnimationManager = function (a) {
         (this.sprite = a),
            (this.game = a.game),
            (this.currentFrame = null),
            (this.updateIfVisible = !0),
            (this.isLoaded = !1),
            (this._frameData = null),
            (this._anims = {}),
            (this._outputFrames = []);
      }),
      (c.AnimationManager.prototype = {
         loadFrameData: function (a) {
            (this._frameData = a), (this.frame = 0), (this.isLoaded = !0);
         },
         add: function (a, d, e, f, g) {
            return null == this._frameData
               ? (console.warn(
                    "No FrameData available for Phaser.Animation " + a
                 ),
                 void 0)
               : ((e = e || 60),
                 "undefined" == typeof f && (f = !1),
                 "undefined" == typeof g &&
                    (g = d && "number" == typeof d[0] ? !0 : !1),
                 null == this.sprite.events.onAnimationStart &&
                    ((this.sprite.events.onAnimationStart = new c.Signal()),
                    (this.sprite.events.onAnimationComplete = new c.Signal()),
                    (this.sprite.events.onAnimationLoop = new c.Signal())),
                 (this._outputFrames.length = 0),
                 this._frameData.getFrameIndexes(d, g, this._outputFrames),
                 (this._anims[a] = new c.Animation(
                    this.game,
                    this.sprite,
                    a,
                    this._frameData,
                    this._outputFrames,
                    e,
                    f
                 )),
                 (this.currentAnim = this._anims[a]),
                 (this.currentFrame = this.currentAnim.currentFrame),
                 this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]),
                 this._anims[a]);
         },
         validateFrames: function (a, b) {
            "undefined" == typeof b && (b = !0);
            for (var c = 0; c < a.length; c++)
               if (b === !0) {
                  if (a[c] > this._frameData.total) return !1;
               } else if (this._frameData.checkFrameName(a[c]) === !1)
                  return !1;
            return !0;
         },
         play: function (a, b, c, d) {
            if (this._anims[a]) {
               if (this.currentAnim != this._anims[a])
                  return (
                     (this.currentAnim = this._anims[a]),
                     (this.currentAnim.paused = !1),
                     this.currentAnim.play(b, c, d)
                  );
               if (this.currentAnim.isPlaying === !1)
                  return (
                     (this.currentAnim.paused = !1),
                     this.currentAnim.play(b, c, d)
                  );
            }
         },
         stop: function (a, b) {
            "undefined" == typeof b && (b = !1),
               "string" == typeof a
                  ? this._anims[a] &&
                    ((this.currentAnim = this._anims[a]),
                    this.currentAnim.stop(b))
                  : this.currentAnim && this.currentAnim.stop(b);
         },
         update: function () {
            return this.updateIfVisible && this.sprite.visible === !1
               ? !1
               : this.currentAnim && this.currentAnim.update() === !0
               ? ((this.currentFrame = this.currentAnim.currentFrame),
                 (this.sprite.currentFrame = this.currentFrame),
                 !0)
               : !1;
         },
         getAnimation: function (a) {
            return "string" == typeof a && this._anims[a]
               ? this._anims[a]
               : null;
         },
         refreshFrame: function () {
            (this.sprite.currentFrame = this.currentFrame),
               this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]);
         },
         destroy: function () {
            (this._anims = {}),
               (this._frameData = null),
               (this._frameIndex = 0),
               (this.currentAnim = null),
               (this.currentFrame = null);
         },
      }),
      (c.AnimationManager.prototype.constructor = c.AnimationManager),
      Object.defineProperty(c.AnimationManager.prototype, "frameData", {
         get: function () {
            return this._frameData;
         },
      }),
      Object.defineProperty(c.AnimationManager.prototype, "frameTotal", {
         get: function () {
            return this._frameData ? this._frameData.total : -1;
         },
      }),
      Object.defineProperty(c.AnimationManager.prototype, "paused", {
         get: function () {
            return this.currentAnim.isPaused;
         },
         set: function (a) {
            this.currentAnim.paused = a;
         },
      }),
      Object.defineProperty(c.AnimationManager.prototype, "frame", {
         get: function () {
            return this.currentFrame ? this._frameIndex : void 0;
         },
         set: function (a) {
            "number" == typeof a &&
               this._frameData &&
               null !== this._frameData.getFrame(a) &&
               ((this.currentFrame = this._frameData.getFrame(a)),
               (this._frameIndex = a),
               (this.sprite.currentFrame = this.currentFrame),
               this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]));
         },
      }),
      Object.defineProperty(c.AnimationManager.prototype, "frameName", {
         get: function () {
            return this.currentFrame ? this.currentFrame.name : void 0;
         },
         set: function (a) {
            "string" == typeof a &&
            this._frameData &&
            null !== this._frameData.getFrameByName(a)
               ? ((this.currentFrame = this._frameData.getFrameByName(a)),
                 (this._frameIndex = this.currentFrame.index),
                 (this.sprite.currentFrame = this.currentFrame),
                 this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]))
               : console.warn("Cannot set frameName: " + a);
         },
      }),
      (c.Animation = function (a, b, c, d, e, f, g) {
         (this.game = a),
            (this._parent = b),
            (this._frameData = d),
            (this.name = c),
            (this._frames = []),
            (this._frames = this._frames.concat(e)),
            (this.delay = 1e3 / f),
            (this.looped = g),
            (this.killOnComplete = !1),
            (this.isFinished = !1),
            (this.isPlaying = !1),
            (this.isPaused = !1),
            (this._pauseStartTime = 0),
            (this._frameIndex = 0),
            (this._frameDiff = 0),
            (this._frameSkip = 1),
            (this.currentFrame = this._frameData.getFrame(
               this._frames[this._frameIndex]
            ));
      }),
      (c.Animation.prototype = {
         play: function (a, c, d) {
            return (
               "number" == typeof a && (this.delay = 1e3 / a),
               "boolean" == typeof c && (this.looped = c),
               "undefined" != typeof d && (this.killOnComplete = d),
               (this.isPlaying = !0),
               (this.isFinished = !1),
               (this.paused = !1),
               (this._timeLastFrame = this.game.time.now),
               (this._timeNextFrame = this.game.time.now + this.delay),
               (this._frameIndex = 0),
               (this.currentFrame = this._frameData.getFrame(
                  this._frames[this._frameIndex]
               )),
               this._parent.setTexture(b.TextureCache[this.currentFrame.uuid]),
               this._parent.events &&
                  this._parent.events.onAnimationStart.dispatch(
                     this._parent,
                     this
                  ),
               this
            );
         },
         restart: function () {
            (this.isPlaying = !0),
               (this.isFinished = !1),
               (this.paused = !1),
               (this._timeLastFrame = this.game.time.now),
               (this._timeNextFrame = this.game.time.now + this.delay),
               (this._frameIndex = 0),
               (this.currentFrame = this._frameData.getFrame(
                  this._frames[this._frameIndex]
               ));
         },
         stop: function (a) {
            "undefined" == typeof a && (a = !1),
               (this.isPlaying = !1),
               (this.isFinished = !0),
               (this.paused = !1),
               a &&
                  (this.currentFrame = this._frameData.getFrame(
                     this._frames[0]
                  ));
         },
         update: function () {
            return this.isPaused
               ? !1
               : this.isPlaying === !0 &&
                 this.game.time.now >= this._timeNextFrame
               ? ((this._frameSkip = 1),
                 (this._frameDiff = this.game.time.now - this._timeNextFrame),
                 (this._timeLastFrame = this.game.time.now),
                 this._frameDiff > this.delay &&
                    ((this._frameSkip = Math.floor(
                       this._frameDiff / this.delay
                    )),
                    (this._frameDiff -= this._frameSkip * this.delay)),
                 (this._timeNextFrame =
                    this.game.time.now + (this.delay - this._frameDiff)),
                 (this._frameIndex += this._frameSkip),
                 this._frameIndex >= this._frames.length
                    ? this.looped
                       ? ((this._frameIndex %= this._frames.length),
                         (this.currentFrame = this._frameData.getFrame(
                            this._frames[this._frameIndex]
                         )),
                         this.currentFrame &&
                            this._parent.setTexture(
                               b.TextureCache[this.currentFrame.uuid]
                            ),
                         this._parent.events.onAnimationLoop.dispatch(
                            this._parent,
                            this
                         ))
                       : this.onComplete()
                    : ((this.currentFrame = this._frameData.getFrame(
                         this._frames[this._frameIndex]
                      )),
                      this.currentFrame &&
                         this._parent.setTexture(
                            b.TextureCache[this.currentFrame.uuid]
                         )),
                 !0)
               : !1;
         },
         destroy: function () {
            (this.game = null),
               (this._parent = null),
               (this._frames = null),
               (this._frameData = null),
               (this.currentFrame = null),
               (this.isPlaying = !1);
         },
         onComplete: function () {
            (this.isPlaying = !1),
               (this.isFinished = !0),
               (this.paused = !1),
               this._parent.events &&
                  this._parent.events.onAnimationComplete.dispatch(
                     this._parent,
                     this
                  ),
               this.killOnComplete && this._parent.kill();
         },
      }),
      (c.Animation.prototype.constructor = c.Animation),
      Object.defineProperty(c.Animation.prototype, "paused", {
         get: function () {
            return this.isPaused;
         },
         set: function (a) {
            (this.isPaused = a),
               a
                  ? (this._pauseStartTime = this.game.time.now)
                  : this.isPlaying &&
                    (this._timeNextFrame = this.game.time.now + this.delay);
         },
      }),
      Object.defineProperty(c.Animation.prototype, "frameTotal", {
         get: function () {
            return this._frames.length;
         },
      }),
      Object.defineProperty(c.Animation.prototype, "frame", {
         get: function () {
            return null !== this.currentFrame
               ? this.currentFrame.index
               : this._frameIndex;
         },
         set: function (a) {
            (this.currentFrame = this._frameData.getFrame(a)),
               null !== this.currentFrame &&
                  ((this._frameIndex = a),
                  this._parent.setTexture(
                     b.TextureCache[this.currentFrame.uuid]
                  ));
         },
      }),
      (c.Animation.generateFrameNames = function (a, b, d, e, f) {
         "undefined" == typeof e && (e = "");
         var g = [],
            h = "";
         if (d > b)
            for (var i = b; d >= i; i++)
               (h =
                  "number" == typeof f
                     ? c.Utils.pad(i.toString(), f, "0", 1)
                     : i.toString()),
                  (h = a + h + e),
                  g.push(h);
         else
            for (var i = b; i >= d; i--)
               (h =
                  "number" == typeof f
                     ? c.Utils.pad(i.toString(), f, "0", 1)
                     : i.toString()),
                  (h = a + h + e),
                  g.push(h);
         return g;
      }),
      (c.Frame = function (a, b, d, e, f, g, h) {
         (this.index = a),
            (this.x = b),
            (this.y = d),
            (this.width = e),
            (this.height = f),
            (this.name = g),
            (this.uuid = h),
            (this.centerX = Math.floor(e / 2)),
            (this.centerY = Math.floor(f / 2)),
            (this.distance = c.Math.distance(0, 0, e, f)),
            (this.rotated = !1),
            (this.rotationDirection = "cw"),
            (this.trimmed = !1),
            (this.sourceSizeW = e),
            (this.sourceSizeH = f),
            (this.spriteSourceSizeX = 0),
            (this.spriteSourceSizeY = 0),
            (this.spriteSourceSizeW = 0),
            (this.spriteSourceSizeH = 0);
      }),
      (c.Frame.prototype = {
         setTrim: function (a, b, c, d, e, f, g) {
            (this.trimmed = a),
               a &&
                  ((this.width = b),
                  (this.height = c),
                  (this.sourceSizeW = b),
                  (this.sourceSizeH = c),
                  (this.centerX = Math.floor(b / 2)),
                  (this.centerY = Math.floor(c / 2)),
                  (this.spriteSourceSizeX = d),
                  (this.spriteSourceSizeY = e),
                  (this.spriteSourceSizeW = f),
                  (this.spriteSourceSizeH = g));
         },
      }),
      (c.Frame.prototype.constructor = c.Frame),
      (c.FrameData = function () {
         (this._frames = []), (this._frameNames = []);
      }),
      (c.FrameData.prototype = {
         addFrame: function (a) {
            return (
               (a.index = this._frames.length),
               this._frames.push(a),
               "" !== a.name && (this._frameNames[a.name] = a.index),
               a
            );
         },
         getFrame: function (a) {
            return this._frames.length > a ? this._frames[a] : null;
         },
         getFrameByName: function (a) {
            return "number" == typeof this._frameNames[a]
               ? this._frames[this._frameNames[a]]
               : null;
         },
         checkFrameName: function (a) {
            return null == this._frameNames[a] ? !1 : !0;
         },
         getFrameRange: function (a, b, c) {
            "undefined" == typeof c && (c = []);
            for (var d = a; b >= d; d++) c.push(this._frames[d]);
            return c;
         },
         getFrames: function (a, b, c) {
            if (
               ("undefined" == typeof b && (b = !0),
               "undefined" == typeof c && (c = []),
               "undefined" == typeof a || 0 === a.length)
            )
               for (var d = 0; d < this._frames.length; d++)
                  c.push(this._frames[d]);
            else
               for (var d = 0, e = a.length; e > d; d++)
                  b
                     ? c.push(this.getFrame(a[d]))
                     : c.push(this.getFrameByName(a[d]));
            return c;
         },
         getFrameIndexes: function (a, b, c) {
            if (
               ("undefined" == typeof b && (b = !0),
               "undefined" == typeof c && (c = []),
               "undefined" == typeof a || 0 === a.length)
            )
               for (var d = 0, e = this._frames.length; e > d; d++)
                  c.push(this._frames[d].index);
            else
               for (var d = 0, e = a.length; e > d; d++)
                  b
                     ? c.push(a[d])
                     : this.getFrameByName(a[d]) &&
                       c.push(this.getFrameByName(a[d]).index);
            return c;
         },
      }),
      (c.FrameData.prototype.constructor = c.FrameData),
      Object.defineProperty(c.FrameData.prototype, "total", {
         get: function () {
            return this._frames.length;
         },
      }),
      (c.AnimationParser = {
         spriteSheet: function (a, d, e, f, g, h, i) {
            var j = a.cache.getImage(d);
            if (null == j) return null;
            var k = j.width,
               l = j.height;
            0 >= e && (e = Math.floor(-k / Math.min(-1, e))),
               0 >= f && (f = Math.floor(-l / Math.min(-1, f)));
            var m = Math.round(k / e),
               n = Math.round(l / f),
               o = m * n;
            if (
               (-1 !== g && (o = g),
               0 === k || 0 === l || e > k || f > l || 0 === o)
            )
               return (
                  console.warn(
                     "Phaser.AnimationParser.spriteSheet: width/height zero or width/height < given frameWidth/frameHeight"
                  ),
                  null
               );
            for (var p = new c.FrameData(), q = h, r = h, s = 0; o > s; s++) {
               var t = a.rnd.uuid();
               p.addFrame(new c.Frame(s, q, r, e, f, "", t)),
                  (b.TextureCache[t] = new b.Texture(b.BaseTextureCache[d], {
                     x: q,
                     y: r,
                     width: e,
                     height: f,
                  })),
                  (q += e + i),
                  q === k && ((q = h), (r += f + i));
            }
            return p;
         },
         JSONData: function (a, d, e) {
            if (!d.frames)
               return (
                  console.warn(
                     "Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array"
                  ),
                  console.log(d),
                  void 0
               );
            for (
               var f, g = new c.FrameData(), h = d.frames, i = 0;
               i < h.length;
               i++
            ) {
               var j = a.rnd.uuid();
               (f = g.addFrame(
                  new c.Frame(
                     i,
                     h[i].frame.x,
                     h[i].frame.y,
                     h[i].frame.w,
                     h[i].frame.h,
                     h[i].filename,
                     j
                  )
               )),
                  (b.TextureCache[j] = new b.Texture(b.BaseTextureCache[e], {
                     x: h[i].frame.x,
                     y: h[i].frame.y,
                     width: h[i].frame.w,
                     height: h[i].frame.h,
                  })),
                  h[i].trimmed &&
                     (f.setTrim(
                        h[i].trimmed,
                        h[i].sourceSize.w,
                        h[i].sourceSize.h,
                        h[i].spriteSourceSize.x,
                        h[i].spriteSourceSize.y,
                        h[i].spriteSourceSize.w,
                        h[i].spriteSourceSize.h
                     ),
                     (b.TextureCache[j].trimmed = !0),
                     (b.TextureCache[j].trim.x = h[i].spriteSourceSize.x),
                     (b.TextureCache[j].trim.y = h[i].spriteSourceSize.y));
            }
            return g;
         },
         JSONDataHash: function (a, d, e) {
            if (!d.frames)
               return (
                  console.warn(
                     "Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object"
                  ),
                  console.log(d),
                  void 0
               );
            var f,
               g = new c.FrameData(),
               h = d.frames,
               i = 0;
            for (var j in h) {
               var k = a.rnd.uuid();
               (f = g.addFrame(
                  new c.Frame(
                     i,
                     h[j].frame.x,
                     h[j].frame.y,
                     h[j].frame.w,
                     h[j].frame.h,
                     j,
                     k
                  )
               )),
                  (b.TextureCache[k] = new b.Texture(b.BaseTextureCache[e], {
                     x: h[j].frame.x,
                     y: h[j].frame.y,
                     width: h[j].frame.w,
                     height: h[j].frame.h,
                  })),
                  h[j].trimmed &&
                     (f.setTrim(
                        h[j].trimmed,
                        h[j].sourceSize.w,
                        h[j].sourceSize.h,
                        h[j].spriteSourceSize.x,
                        h[j].spriteSourceSize.y,
                        h[j].spriteSourceSize.w,
                        h[j].spriteSourceSize.h
                     ),
                     (b.TextureCache[k].trimmed = !0),
                     (b.TextureCache[k].trim.x = h[j].spriteSourceSize.x),
                     (b.TextureCache[k].trim.y = h[j].spriteSourceSize.y)),
                  i++;
            }
            return g;
         },
         XMLData: function (a, d, e) {
            if (!d.getElementsByTagName("TextureAtlas"))
               return (
                  console.warn(
                     "Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag"
                  ),
                  void 0
               );
            for (
               var f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  n,
                  o,
                  p,
                  q,
                  r = new c.FrameData(),
                  s = d.getElementsByTagName("SubTexture"),
                  t = 0;
               t < s.length;
               t++
            )
               (g = a.rnd.uuid()),
                  (i = s[t].attributes),
                  (h = i.name.nodeValue),
                  (j = parseInt(i.x.nodeValue, 10)),
                  (k = parseInt(i.y.nodeValue, 10)),
                  (l = parseInt(i.width.nodeValue, 10)),
                  (m = parseInt(i.height.nodeValue, 10)),
                  (n = null),
                  (o = null),
                  i.frameX &&
                     ((n = Math.abs(parseInt(i.frameX.nodeValue, 10))),
                     (o = Math.abs(parseInt(i.frameY.nodeValue, 10))),
                     (p = parseInt(i.frameWidth.nodeValue, 10)),
                     (q = parseInt(i.frameHeight.nodeValue, 10))),
                  (f = r.addFrame(new c.Frame(t, j, k, l, m, h, g))),
                  (b.TextureCache[g] = new b.Texture(b.BaseTextureCache[e], {
                     x: j,
                     y: k,
                     width: l,
                     height: m,
                  })),
                  (null !== n || null !== o) &&
                     (f.setTrim(!0, l, m, n, o, p, q),
                     (b.TextureCache[g].realSize = { x: n, y: o, w: p, h: q }),
                     (b.TextureCache[g].trimmed = !0),
                     (b.TextureCache[g].trim.x = n),
                     (b.TextureCache[g].trim.y = o));
            return r;
         },
      }),
      (c.Cache = function (a) {
         (this.game = a),
            (this._canvases = {}),
            (this._images = {}),
            (this._textures = {}),
            (this._sounds = {}),
            (this._text = {}),
            (this._tilemaps = {}),
            (this._binary = {}),
            (this._bitmapDatas = {}),
            this.addDefaultImage(),
            this.addMissingImage(),
            (this.onSoundUnlock = new c.Signal());
      }),
      (c.Cache.prototype = {
         addCanvas: function (a, b, c) {
            this._canvases[a] = { canvas: b, context: c };
         },
         addBinary: function (a, b) {
            this._binary[a] = b;
         },
         addBitmapData: function (a, b) {
            return (this._bitmapDatas[a] = b), b;
         },
         addRenderTexture: function (a, b) {
            var d = new c.Frame(0, 0, 0, b.width, b.height, "", "");
            this._textures[a] = { texture: b, frame: d };
         },
         addSpriteSheet: function (a, d, e, f, g, h, i, j) {
            (this._images[a] = {
               url: d,
               data: e,
               spriteSheet: !0,
               frameWidth: f,
               frameHeight: g,
               margin: i,
               spacing: j,
            }),
               (b.BaseTextureCache[a] = new b.BaseTexture(e)),
               (b.TextureCache[a] = new b.Texture(b.BaseTextureCache[a])),
               (this._images[a].frameData = c.AnimationParser.spriteSheet(
                  this.game,
                  a,
                  f,
                  g,
                  h,
                  i,
                  j
               ));
         },
         addTilemap: function (a, b, c, d) {
            this._tilemaps[a] = { url: b, data: c, format: d };
         },
         addTextureAtlas: function (a, d, e, f, g) {
            (this._images[a] = { url: d, data: e, spriteSheet: !0 }),
               (b.BaseTextureCache[a] = new b.BaseTexture(e)),
               (b.TextureCache[a] = new b.Texture(b.BaseTextureCache[a])),
               g == c.Loader.TEXTURE_ATLAS_JSON_ARRAY
                  ? (this._images[a].frameData = c.AnimationParser.JSONData(
                       this.game,
                       f,
                       a
                    ))
                  : g == c.Loader.TEXTURE_ATLAS_JSON_HASH
                  ? (this._images[a].frameData = c.AnimationParser.JSONDataHash(
                       this.game,
                       f,
                       a
                    ))
                  : g == c.Loader.TEXTURE_ATLAS_XML_STARLING &&
                    (this._images[a].frameData = c.AnimationParser.XMLData(
                       this.game,
                       f,
                       a
                    ));
         },
         addBitmapFont: function (a, d, e, f) {
            (this._images[a] = { url: d, data: e, spriteSheet: !0 }),
               (b.BaseTextureCache[a] = new b.BaseTexture(e)),
               (b.TextureCache[a] = new b.Texture(b.BaseTextureCache[a])),
               c.LoaderParser.bitmapFont(this.game, f, a);
         },
         addDefaultImage: function () {
            var a = new Image();
            (a.src =
               "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg=="),
               (this._images.__default = {
                  url: null,
                  data: a,
                  spriteSheet: !1,
               }),
               (this._images.__default.frame = new c.Frame(
                  0,
                  0,
                  0,
                  32,
                  32,
                  "",
                  ""
               )),
               (b.BaseTextureCache.__default = new b.BaseTexture(a)),
               (b.TextureCache.__default = new b.Texture(
                  b.BaseTextureCache.__default
               ));
         },
         addMissingImage: function () {
            var a = new Image();
            (a.src =
               "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg=="),
               (this._images.__missing = {
                  url: null,
                  data: a,
                  spriteSheet: !1,
               }),
               (this._images.__missing.frame = new c.Frame(
                  0,
                  0,
                  0,
                  32,
                  32,
                  "",
                  ""
               )),
               (b.BaseTextureCache.__missing = new b.BaseTexture(a)),
               (b.TextureCache.__missing = new b.Texture(
                  b.BaseTextureCache.__missing
               ));
         },
         addText: function (a, b, c) {
            this._text[a] = { url: b, data: c };
         },
         addImage: function (a, d, e) {
            (this._images[a] = { url: d, data: e, spriteSheet: !1 }),
               (this._images[a].frame = new c.Frame(
                  0,
                  0,
                  0,
                  e.width,
                  e.height,
                  a,
                  this.game.rnd.uuid()
               )),
               (b.BaseTextureCache[a] = new b.BaseTexture(e)),
               (b.TextureCache[a] = new b.Texture(b.BaseTextureCache[a]));
         },
         addSound: function (a, b, c, d, e) {
            (d = d || !0), (e = e || !1);
            var f = !1;
            e && (f = !0),
               (this._sounds[a] = {
                  url: b,
                  data: c,
                  isDecoding: !1,
                  decoded: f,
                  webAudio: d,
                  audioTag: e,
                  locked: this.game.sound.touchLocked,
               });
         },
         reloadSound: function (a) {
            var b = this;
            this._sounds[a] &&
               ((this._sounds[a].data.src = this._sounds[a].url),
               this._sounds[a].data.addEventListener(
                  "canplaythrough",
                  function () {
                     return b.reloadSoundComplete(a);
                  },
                  !1
               ),
               this._sounds[a].data.load());
         },
         reloadSoundComplete: function (a) {
            this._sounds[a] &&
               ((this._sounds[a].locked = !1), this.onSoundUnlock.dispatch(a));
         },
         updateSound: function (a, b, c) {
            this._sounds[a] && (this._sounds[a][b] = c);
         },
         decodedSound: function (a, b) {
            (this._sounds[a].data = b),
               (this._sounds[a].decoded = !0),
               (this._sounds[a].isDecoding = !1);
         },
         getCanvas: function (a) {
            return this._canvases[a]
               ? this._canvases[a].canvas
               : (console.warn(
                    'Phaser.Cache.getCanvas: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getBitmapData: function (a) {
            return this._bitmapDatas[a]
               ? this._bitmapDatas[a]
               : (console.warn(
                    'Phaser.Cache.getBitmapData: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         checkImageKey: function (a) {
            return this._images[a] ? !0 : !1;
         },
         getImage: function (a) {
            return this._images[a]
               ? this._images[a].data
               : (console.warn(
                    'Phaser.Cache.getImage: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getTilemapData: function (a) {
            return this._tilemaps[a]
               ? this._tilemaps[a]
               : (console.warn(
                    'Phaser.Cache.getTilemapData: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getFrameData: function (a) {
            return this._images[a] && this._images[a].frameData
               ? this._images[a].frameData
               : null;
         },
         getFrameByIndex: function (a, b) {
            return this._images[a] && this._images[a].frameData
               ? this._images[a].frameData.getFrame(b)
               : null;
         },
         getFrameByName: function (a, b) {
            return this._images[a] && this._images[a].frameData
               ? this._images[a].frameData.getFrameByName(b)
               : null;
         },
         getFrame: function (a) {
            return this._images[a] && this._images[a].spriteSheet === !1
               ? this._images[a].frame
               : null;
         },
         getTextureFrame: function (a) {
            return this._textures[a] ? this._textures[a].frame : null;
         },
         getTexture: function (a) {
            return this._textures[a]
               ? this._textures[a]
               : (console.warn(
                    'Phaser.Cache.getTexture: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getSound: function (a) {
            return this._sounds[a]
               ? this._sounds[a]
               : (console.warn(
                    'Phaser.Cache.getSound: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getSoundData: function (a) {
            return this._sounds[a]
               ? this._sounds[a].data
               : (console.warn(
                    'Phaser.Cache.getSoundData: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         isSoundDecoded: function (a) {
            return this._sounds[a] ? this._sounds[a].decoded : void 0;
         },
         isSoundReady: function (a) {
            return (
               this._sounds[a] &&
               this._sounds[a].decoded &&
               this.game.sound.touchLocked === !1
            );
         },
         isSpriteSheet: function (a) {
            return this._images[a] ? this._images[a].spriteSheet : !1;
         },
         getText: function (a) {
            return this._text[a]
               ? this._text[a].data
               : (console.warn(
                    'Phaser.Cache.getText: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getBinary: function (a) {
            return this._binary[a]
               ? this._binary[a]
               : (console.warn(
                    'Phaser.Cache.getBinary: Invalid key: "' + a + '"'
                 ),
                 void 0);
         },
         getKeys: function (a) {
            var b = [];
            for (var c in a)
               "__default" !== c && "__missing" !== c && b.push(c);
            return b;
         },
         getImageKeys: function () {
            return this.getKeys(this._images);
         },
         getSoundKeys: function () {
            return this.getKeys(this._sounds);
         },
         getTextKeys: function () {
            return this.getKeys(this._text);
         },
         removeCanvas: function (a) {
            delete this._canvases[a];
         },
         removeImage: function (a) {
            delete this._images[a];
         },
         removeSound: function (a) {
            delete this._sounds[a];
         },
         removeText: function (a) {
            delete this._text[a];
         },
         destroy: function () {
            for (var a in this._canvases) delete this._canvases[a.key];
            for (var a in this._images) delete this._images[a.key];
            for (var a in this._sounds) delete this._sounds[a.key];
            for (var a in this._text) delete this._text[a.key];
         },
      }),
      (c.Cache.prototype.constructor = c.Cache),
      (c.Loader = function (a) {
         (this.game = a),
            (this._fileList = []),
            (this._fileIndex = 0),
            (this._progressChunk = 0),
            (this._xhr = new XMLHttpRequest()),
            (this.isLoading = !1),
            (this.hasLoaded = !1),
            (this.progress = 0),
            (this.progressFloat = 0),
            (this.preloadSprite = null),
            (this.crossOrigin = ""),
            (this.baseURL = ""),
            (this.onFileComplete = new c.Signal()),
            (this.onFileError = new c.Signal()),
            (this.onLoadStart = new c.Signal()),
            (this.onLoadComplete = new c.Signal());
      }),
      (c.Loader.TEXTURE_ATLAS_JSON_ARRAY = 0),
      (c.Loader.TEXTURE_ATLAS_JSON_HASH = 1),
      (c.Loader.TEXTURE_ATLAS_XML_STARLING = 2),
      (c.Loader.prototype = {
         setPreloadSprite: function (a, b) {
            (b = b || 0),
               (this.preloadSprite = {
                  sprite: a,
                  direction: b,
                  width: a.width,
                  height: a.height,
                  crop: null,
               }),
               (this.preloadSprite.crop =
                  0 === b
                     ? new c.Rectangle(0, 0, 1, a.height)
                     : new c.Rectangle(0, 0, a.width, 1)),
               (a.crop = this.preloadSprite.crop),
               (a.cropEnabled = !0);
         },
         checkKeyExists: function (a, b) {
            if (this._fileList.length > 0)
               for (var c = 0; c < this._fileList.length; c++)
                  if (
                     this._fileList[c].type === a &&
                     this._fileList[c].key === b
                  )
                     return !0;
            return !1;
         },
         getAsset: function (a, b) {
            if (this._fileList.length > 0)
               for (var c = 0; c < this._fileList.length; c++)
                  if (
                     this._fileList[c].type === a &&
                     this._fileList[c].key === b
                  )
                     return { index: c, file: this._fileList[c] };
            return !1;
         },
         reset: function () {
            (this.preloadSprite = null),
               (this.isLoading = !1),
               (this._fileList.length = 0),
               (this._fileIndex = 0);
         },
         addToFileList: function (a, b, c, d) {
            var e = {
               type: a,
               key: b,
               url: c,
               data: null,
               error: !1,
               loaded: !1,
            };
            if ("undefined" != typeof d) for (var f in d) e[f] = d[f];
            this.checkKeyExists(a, b) === !1 && this._fileList.push(e);
         },
         replaceInFileList: function (a, b, c, d) {
            var e = {
               type: a,
               key: b,
               url: c,
               data: null,
               error: !1,
               loaded: !1,
            };
            if ("undefined" != typeof d) for (var f in d) e[f] = d[f];
            this.checkKeyExists(a, b) === !1 && this._fileList.push(e);
         },
         image: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = !1),
               c
                  ? this.replaceInFileList("image", a, b)
                  : this.addToFileList("image", a, b),
               this
            );
         },
         text: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = !1),
               c
                  ? this.replaceInFileList("text", a, b)
                  : this.addToFileList("text", a, b),
               this
            );
         },
         script: function (a, b) {
            return this.addToFileList("script", a, b), this;
         },
         json: function (a, b) {
            return this.addToFileList("json", a, b), this;
         },
         binary: function (a, b, c, d) {
            return (
               "undefined" == typeof c && (c = !1),
               c !== !1 && "undefined" == typeof d && (d = c),
               this.addToFileList("binary", a, b, {
                  callback: c,
                  callbackContext: d,
               }),
               this
            );
         },
         spritesheet: function (a, b, c, d, e, f, g) {
            return (
               "undefined" == typeof e && (e = -1),
               "undefined" == typeof f && (f = 0),
               "undefined" == typeof g && (g = 0),
               this.addToFileList("spritesheet", a, b, {
                  frameWidth: c,
                  frameHeight: d,
                  frameMax: e,
                  margin: f,
                  spacing: g,
               }),
               this
            );
         },
         audio: function (a, b, c) {
            return (
               "undefined" == typeof c && (c = !0),
               this.addToFileList("audio", a, b, {
                  buffer: null,
                  autoDecode: c,
               }),
               this
            );
         },
         tilemap: function (a, b, d, e) {
            if (
               ("undefined" == typeof b && (b = null),
               "undefined" == typeof d && (d = null),
               "undefined" == typeof e && (e = c.Tilemap.CSV),
               null == b && null == d)
            )
               return (
                  console.warn(
                     "Phaser.Loader.tilemap - Both mapDataURL and mapData are null. One must be set."
                  ),
                  this
               );
            if (d) {
               switch (e) {
                  case c.Tilemap.CSV:
                     break;
                  case c.Tilemap.TILED_JSON:
                     "string" == typeof d && (d = JSON.parse(d));
               }
               this.game.cache.addTilemap(a, null, d, e);
            } else this.addToFileList("tilemap", a, b, { format: e });
            return this;
         },
         bitmapFont: function (a, b, c, d) {
            if (
               ("undefined" == typeof c && (c = null),
               "undefined" == typeof d && (d = null),
               c)
            )
               this.addToFileList("bitmapfont", a, b, { xmlURL: c });
            else if ("string" == typeof d) {
               var e;
               try {
                  if (window.DOMParser) {
                     var f = new DOMParser();
                     e = f.parseFromString(d, "text/xml");
                  } else
                     (e = new ActiveXObject("Microsoft.XMLDOM")),
                        (e.async = "false"),
                        e.loadXML(d);
               } catch (g) {
                  e = void 0;
               }
               if (
                  !e ||
                  !e.documentElement ||
                  e.getElementsByTagName("parsererror").length
               )
                  throw new Error(
                     "Phaser.Loader. Invalid Bitmap Font XML given"
                  );
               this.addToFileList("bitmapfont", a, b, {
                  xmlURL: null,
                  xmlData: e,
               });
            }
            return this;
         },
         atlasJSONArray: function (a, b, d, e) {
            return this.atlas(a, b, d, e, c.Loader.TEXTURE_ATLAS_JSON_ARRAY);
         },
         atlasJSONHash: function (a, b, d, e) {
            return this.atlas(a, b, d, e, c.Loader.TEXTURE_ATLAS_JSON_HASH);
         },
         atlasXML: function (a, b, d, e) {
            return this.atlas(a, b, d, e, c.Loader.TEXTURE_ATLAS_XML_STARLING);
         },
         atlas: function (a, b, d, e, f) {
            if (
               ("undefined" == typeof d && (d = null),
               "undefined" == typeof e && (e = null),
               "undefined" == typeof f &&
                  (f = c.Loader.TEXTURE_ATLAS_JSON_ARRAY),
               d)
            )
               this.addToFileList("textureatlas", a, b, {
                  atlasURL: d,
                  format: f,
               });
            else {
               switch (f) {
                  case c.Loader.TEXTURE_ATLAS_JSON_ARRAY:
                     "string" == typeof e && (e = JSON.parse(e));
                     break;
                  case c.Loader.TEXTURE_ATLAS_XML_STARLING:
                     if ("string" == typeof e) {
                        var g;
                        try {
                           if (window.DOMParser) {
                              var h = new DOMParser();
                              g = h.parseFromString(e, "text/xml");
                           } else
                              (g = new ActiveXObject("Microsoft.XMLDOM")),
                                 (g.async = "false"),
                                 g.loadXML(e);
                        } catch (i) {
                           g = void 0;
                        }
                        if (
                           !g ||
                           !g.documentElement ||
                           g.getElementsByTagName("parsererror").length
                        )
                           throw new Error(
                              "Phaser.Loader. Invalid Texture Atlas XML given"
                           );
                        e = g;
                     }
               }
               this.addToFileList("textureatlas", a, b, {
                  atlasURL: null,
                  atlasData: e,
                  format: f,
               });
            }
            return this;
         },
         removeFile: function (a, b) {
            var c = this.getAsset(a, b);
            c !== !1 && this._fileList.splice(c.index, 1);
         },
         removeAll: function () {
            this._fileList.length = 0;
         },
         start: function () {
            this.isLoading ||
               ((this.progress = 0),
               (this.progressFloat = 0),
               (this.hasLoaded = !1),
               (this.isLoading = !0),
               this.onLoadStart.dispatch(this._fileList.length),
               this._fileList.length > 0
                  ? ((this._fileIndex = 0),
                    (this._progressChunk = 100 / this._fileList.length),
                    this.loadFile())
                  : ((this.progress = 100),
                    (this.progressFloat = 100),
                    (this.hasLoaded = !0),
                    this.onLoadComplete.dispatch()));
         },
         loadFile: function () {
            if (!this._fileList[this._fileIndex])
               return (
                  console.warn(
                     "Phaser.Loader loadFile invalid index " + this._fileIndex
                  ),
                  void 0
               );
            var a = this._fileList[this._fileIndex],
               b = this;
            switch (a.type) {
               case "image":
               case "spritesheet":
               case "textureatlas":
               case "bitmapfont":
                  (a.data = new Image()),
                     (a.data.name = a.key),
                     (a.data.onload = function () {
                        return b.fileComplete(b._fileIndex);
                     }),
                     (a.data.onerror = function () {
                        return b.fileError(b._fileIndex);
                     }),
                     (a.data.crossOrigin = this.crossOrigin),
                     (a.data.src = this.baseURL + a.url);
                  break;
               case "audio":
                  (a.url = this.getAudioURL(a.url)),
                     null !== a.url
                        ? this.game.sound.usingWebAudio
                           ? (this._xhr.open("GET", this.baseURL + a.url, !0),
                             (this._xhr.responseType = "arraybuffer"),
                             (this._xhr.onload = function () {
                                return b.fileComplete(b._fileIndex);
                             }),
                             (this._xhr.onerror = function () {
                                return b.fileError(b._fileIndex);
                             }),
                             this._xhr.send())
                           : this.game.sound.usingAudioTag &&
                             (this.game.sound.touchLocked
                                ? ((a.data = new Audio()),
                                  (a.data.name = a.key),
                                  (a.data.preload = "auto"),
                                  (a.data.src = this.baseURL + a.url),
                                  this.fileComplete(this._fileIndex))
                                : ((a.data = new Audio()),
                                  (a.data.name = a.key),
                                  (a.data.onerror = function () {
                                     return b.fileError(b._fileIndex);
                                  }),
                                  (a.data.preload = "auto"),
                                  (a.data.src = this.baseURL + a.url),
                                  a.data.addEventListener(
                                     "canplaythrough",
                                     c.GAMES[this.game.id].load.fileComplete(
                                        this._fileIndex
                                     ),
                                     !1
                                  ),
                                  a.data.load()))
                        : this.fileError(this._fileIndex);
                  break;
               case "tilemap":
               case "json":
                  if (
                     (this._xhr.open("GET", this.baseURL + a.url, !0),
                     (this._xhr.responseType = "text"),
                     a.format && a.format !== c.Tilemap.TILED_JSON)
                  ) {
                     if (a.format !== c.Tilemap.CSV)
                        throw new Error(
                           "Phaser.Loader. Invalid Tilemap format: " + a.format
                        );
                     this._xhr.onload = function () {
                        return b.csvLoadComplete(b._fileIndex);
                     };
                  } else
                     this._xhr.onload = function () {
                        return b.jsonLoadComplete(b._fileIndex);
                     };
                  (this._xhr.onerror = function () {
                     return b.dataLoadError(b._fileIndex);
                  }),
                     this._xhr.send();
                  break;
               case "text":
               case "script":
                  this._xhr.open("GET", this.baseURL + a.url, !0),
                     (this._xhr.responseType = "text"),
                     (this._xhr.onload = function () {
                        return b.fileComplete(b._fileIndex);
                     }),
                     (this._xhr.onerror = function () {
                        return b.fileError(b._fileIndex);
                     }),
                     this._xhr.send();
                  break;
               case "binary":
                  this._xhr.open("GET", this.baseURL + a.url, !0),
                     (this._xhr.responseType = "arraybuffer"),
                     (this._xhr.onload = function () {
                        return b.fileComplete(b._fileIndex);
                     }),
                     (this._xhr.onerror = function () {
                        return b.fileError(b._fileIndex);
                     }),
                     this._xhr.send();
            }
         },
         getAudioURL: function (a) {
            var b;
            "string" == typeof a && (a = [a]);
            for (var c = 0; c < a.length; c++)
               if (
                  ((b = a[c].toLowerCase()),
                  (b = b.substr(
                     (Math.max(0, b.lastIndexOf(".")) || 1 / 0) + 1
                  )),
                  this.game.device.canPlayAudio(b))
               )
                  return a[c];
            return null;
         },
         fileError: function (a) {
            (this._fileList[a].loaded = !0),
               (this._fileList[a].error = !0),
               this.onFileError.dispatch(
                  this._fileList[a].key,
                  this._fileList[a]
               ),
               console.warn(
                  "Phaser.Loader error loading file: " +
                     this._fileList[a].key +
                     " from URL " +
                     this._fileList[a].url
               ),
               this.nextFile(a, !1);
         },
         fileComplete: function (a) {
            if (!this._fileList[a])
               return (
                  console.warn("Phaser.Loader fileComplete invalid index " + a),
                  void 0
               );
            var b = this._fileList[a];
            b.loaded = !0;
            var d = !0,
               e = this;
            switch (b.type) {
               case "image":
                  this.game.cache.addImage(b.key, b.url, b.data);
                  break;
               case "spritesheet":
                  this.game.cache.addSpriteSheet(
                     b.key,
                     b.url,
                     b.data,
                     b.frameWidth,
                     b.frameHeight,
                     b.frameMax,
                     b.margin,
                     b.spacing
                  );
                  break;
               case "textureatlas":
                  if (null == b.atlasURL)
                     this.game.cache.addTextureAtlas(
                        b.key,
                        b.url,
                        b.data,
                        b.atlasData,
                        b.format
                     );
                  else {
                     if (
                        ((d = !1),
                        this._xhr.open("GET", this.baseURL + b.atlasURL, !0),
                        (this._xhr.responseType = "text"),
                        b.format == c.Loader.TEXTURE_ATLAS_JSON_ARRAY ||
                           b.format == c.Loader.TEXTURE_ATLAS_JSON_HASH)
                     )
                        this._xhr.onload = function () {
                           return e.jsonLoadComplete(a);
                        };
                     else {
                        if (b.format != c.Loader.TEXTURE_ATLAS_XML_STARLING)
                           throw new Error(
                              "Phaser.Loader. Invalid Texture Atlas format: " +
                                 b.format
                           );
                        this._xhr.onload = function () {
                           return e.xmlLoadComplete(a);
                        };
                     }
                     (this._xhr.onerror = function () {
                        return e.dataLoadError(a);
                     }),
                        this._xhr.send();
                  }
                  break;
               case "bitmapfont":
                  null == b.xmlURL
                     ? this.game.cache.addBitmapFont(
                          b.key,
                          b.url,
                          b.data,
                          b.xmlData
                       )
                     : ((d = !1),
                       this._xhr.open("GET", this.baseURL + b.xmlURL, !0),
                       (this._xhr.responseType = "text"),
                       (this._xhr.onload = function () {
                          return e.xmlLoadComplete(a);
                       }),
                       (this._xhr.onerror = function () {
                          return e.dataLoadError(a);
                       }),
                       this._xhr.send());
                  break;
               case "audio":
                  if (this.game.sound.usingWebAudio) {
                     if (
                        ((b.data = this._xhr.response),
                        this.game.cache.addSound(b.key, b.url, b.data, !0, !1),
                        b.autoDecode)
                     ) {
                        this.game.cache.updateSound(g, "isDecoding", !0);
                        var f = this,
                           g = b.key;
                        this.game.sound.context.decodeAudioData(
                           b.data,
                           function (a) {
                              a &&
                                 (f.game.cache.decodedSound(g, a),
                                 f.game.sound.onSoundDecode.dispatch(
                                    g,
                                    f.game.cache.getSound(g)
                                 ));
                           }
                        );
                     }
                  } else
                     b.data.removeEventListener(
                        "canplaythrough",
                        c.GAMES[this.game.id].load.fileComplete
                     ),
                        this.game.cache.addSound(b.key, b.url, b.data, !1, !0);
                  break;
               case "text":
                  (b.data = this._xhr.responseText),
                     this.game.cache.addText(b.key, b.url, b.data);
                  break;
               case "script":
                  (b.data = document.createElement("script")),
                     (b.data.language = "javascript"),
                     (b.data.type = "text/javascript"),
                     (b.data.defer = !1),
                     (b.data.text = this._xhr.responseText),
                     document.head.appendChild(b.data);
                  break;
               case "binary":
                  (b.data = b.callback
                     ? b.callback.call(
                          b.callbackContext,
                          b.key,
                          this._xhr.response
                       )
                     : this._xhr.response),
                     this.game.cache.addBinary(b.key, b.data);
            }
            d && this.nextFile(a, !0);
         },
         jsonLoadComplete: function (a) {
            if (!this._fileList[a])
               return (
                  console.warn(
                     "Phaser.Loader jsonLoadComplete invalid index " + a
                  ),
                  void 0
               );
            var b = this._fileList[a],
               c = JSON.parse(this._xhr.responseText);
            (b.loaded = !0),
               "tilemap" === b.type
                  ? this.game.cache.addTilemap(b.key, b.url, c, b.format)
                  : "json" === b.type
                  ? this.game.cache.addText(b.key, b.url, c)
                  : this.game.cache.addTextureAtlas(
                       b.key,
                       b.url,
                       b.data,
                       c,
                       b.format
                    ),
               this.nextFile(a, !0);
         },
         csvLoadComplete: function (a) {
            if (!this._fileList[a])
               return (
                  console.warn(
                     "Phaser.Loader csvLoadComplete invalid index " + a
                  ),
                  void 0
               );
            var b = this._fileList[a],
               c = this._xhr.responseText;
            (b.loaded = !0),
               this.game.cache.addTilemap(b.key, b.url, c, b.format),
               this.nextFile(a, !0);
         },
         dataLoadError: function (a) {
            var b = this._fileList[a];
            (b.loaded = !0),
               (b.error = !0),
               console.warn("Phaser.Loader dataLoadError: " + b.key),
               this.nextFile(a, !0);
         },
         xmlLoadComplete: function (a) {
            var b,
               c = this._xhr.responseText;
            try {
               if (window.DOMParser) {
                  var d = new DOMParser();
                  b = d.parseFromString(c, "text/xml");
               } else
                  (b = new ActiveXObject("Microsoft.XMLDOM")),
                     (b.async = "false"),
                     b.loadXML(c);
            } catch (e) {
               b = void 0;
            }
            if (
               !b ||
               !b.documentElement ||
               b.getElementsByTagName("parsererror").length
            )
               throw new Error("Phaser.Loader. Invalid XML given");
            var f = this._fileList[a];
            (f.loaded = !0),
               "bitmapfont" == f.type
                  ? this.game.cache.addBitmapFont(f.key, f.url, f.data, b)
                  : "textureatlas" == f.type &&
                    this.game.cache.addTextureAtlas(
                       f.key,
                       f.url,
                       f.data,
                       b,
                       f.format
                    ),
               this.nextFile(a, !0);
         },
         nextFile: function (a, b) {
            (this.progressFloat += this._progressChunk),
               (this.progress = Math.round(this.progressFloat)),
               this.progress > 100 && (this.progress = 100),
               null !== this.preloadSprite &&
                  (0 === this.preloadSprite.direction
                     ? (this.preloadSprite.crop.width = Math.floor(
                          (this.preloadSprite.width / 100) * this.progress
                       ))
                     : (this.preloadSprite.crop.height = Math.floor(
                          (this.preloadSprite.height / 100) * this.progress
                       )),
                  (this.preloadSprite.sprite.crop = this.preloadSprite.crop)),
               this.onFileComplete.dispatch(
                  this.progress,
                  this._fileList[a].key,
                  b,
                  this.totalLoadedFiles(),
                  this._fileList.length
               ),
               this.totalQueuedFiles() > 0
                  ? (this._fileIndex++, this.loadFile())
                  : ((this.hasLoaded = !0),
                    (this.isLoading = !1),
                    this.removeAll(),
                    this.onLoadComplete.dispatch());
         },
         totalLoadedFiles: function () {
            for (var a = 0, b = 0; b < this._fileList.length; b++)
               this._fileList[b].loaded && a++;
            return a;
         },
         totalQueuedFiles: function () {
            for (var a = 0, b = 0; b < this._fileList.length; b++)
               this._fileList[b].loaded === !1 && a++;
            return a;
         },
      }),
      (c.Loader.prototype.constructor = c.Loader),
      (c.LoaderParser = {
         bitmapFont: function (a, c, d) {
            if (!c.getElementsByTagName("font"))
               return (
                  console.warn(
                     "Phaser.LoaderParser.bitmapFont: Invalid XML given, missing <font> tag"
                  ),
                  void 0
               );
            var e = b.TextureCache[d],
               f = {},
               g = c.getElementsByTagName("info")[0],
               h = c.getElementsByTagName("common")[0];
            (f.font = g.attributes.getNamedItem("face").nodeValue),
               (f.size = parseInt(
                  g.attributes.getNamedItem("size").nodeValue,
                  10
               )),
               (f.lineHeight = parseInt(
                  h.attributes.getNamedItem("lineHeight").nodeValue,
                  10
               )),
               (f.chars = {});
            for (
               var i = c.getElementsByTagName("char"), j = 0;
               j < i.length;
               j++
            ) {
               var k = parseInt(
                     i[j].attributes.getNamedItem("id").nodeValue,
                     10
                  ),
                  l = {
                     x: parseInt(
                        i[j].attributes.getNamedItem("x").nodeValue,
                        10
                     ),
                     y: parseInt(
                        i[j].attributes.getNamedItem("y").nodeValue,
                        10
                     ),
                     width: parseInt(
                        i[j].attributes.getNamedItem("width").nodeValue,
                        10
                     ),
                     height: parseInt(
                        i[j].attributes.getNamedItem("height").nodeValue,
                        10
                     ),
                  };
               (b.TextureCache[k] = new b.Texture(e, l)),
                  (f.chars[k] = {
                     xOffset: parseInt(
                        i[j].attributes.getNamedItem("xoffset").nodeValue,
                        10
                     ),
                     yOffset: parseInt(
                        i[j].attributes.getNamedItem("yoffset").nodeValue,
                        10
                     ),
                     xAdvance: parseInt(
                        i[j].attributes.getNamedItem("xadvance").nodeValue,
                        10
                     ),
                     kerning: {},
                     texture: new b.Texture(e, l),
                  });
            }
            var m = c.getElementsByTagName("kerning");
            for (j = 0; j < m.length; j++) {
               var n = parseInt(
                     m[j].attributes.getNamedItem("first").nodeValue,
                     10
                  ),
                  o = parseInt(
                     m[j].attributes.getNamedItem("second").nodeValue,
                     10
                  ),
                  p = parseInt(
                     m[j].attributes.getNamedItem("amount").nodeValue,
                     10
                  );
               f.chars[o].kerning[n] = p;
            }
            b.BitmapText.fonts[f.font] = f;
         },
      }),
      (c.Sound = function (a, b, d, e, f) {
         "undefined" == typeof d && (d = 1),
            "undefined" == typeof e && (e = !1),
            "undefined" == typeof f && (f = a.sound.connectToMaster),
            (this.game = a),
            (this.name = b),
            (this.key = b),
            (this.loop = e),
            (this._volume = d),
            (this.markers = {}),
            (this.context = null),
            (this._buffer = null),
            (this._muted = !1),
            (this.autoplay = !1),
            (this.totalDuration = 0),
            (this.startTime = 0),
            (this.currentTime = 0),
            (this.duration = 0),
            (this.stopTime = 0),
            (this.paused = !1),
            (this.pausedPosition = 0),
            (this.pausedTime = 0),
            (this.isPlaying = !1),
            (this.currentMarker = ""),
            (this.pendingPlayback = !1),
            (this.override = !1),
            (this.usingWebAudio = this.game.sound.usingWebAudio),
            (this.usingAudioTag = this.game.sound.usingAudioTag),
            (this.externalNode = null),
            this.usingWebAudio
               ? ((this.context = this.game.sound.context),
                 (this.masterGainNode = this.game.sound.masterGain),
                 (this.gainNode =
                    "undefined" == typeof this.context.createGain
                       ? this.context.createGainNode()
                       : this.context.createGain()),
                 (this.gainNode.gain.value = d * this.game.sound.volume),
                 f && this.gainNode.connect(this.masterGainNode))
               : this.game.cache.getSound(b) && this.game.cache.isSoundReady(b)
               ? ((this._sound = this.game.cache.getSoundData(b)),
                 (this.totalDuration = 0),
                 this._sound.duration &&
                    (this.totalDuration = this._sound.duration))
               : this.game.cache.onSoundUnlock.add(this.soundHasUnlocked, this),
            (this.onDecoded = new c.Signal()),
            (this.onPlay = new c.Signal()),
            (this.onPause = new c.Signal()),
            (this.onResume = new c.Signal()),
            (this.onLoop = new c.Signal()),
            (this.onStop = new c.Signal()),
            (this.onMute = new c.Signal()),
            (this.onMarkerComplete = new c.Signal());
      }),
      (c.Sound.prototype = {
         soundHasUnlocked: function (a) {
            a == this.key &&
               ((this._sound = this.game.cache.getSoundData(this.key)),
               (this.totalDuration = this._sound.duration));
         },
         addMarker: function (a, b, c, d, e) {
            (d = d || 1),
               "undefined" == typeof e && (e = !1),
               (this.markers[a] = {
                  name: a,
                  start: b,
                  stop: b + c,
                  volume: d,
                  duration: c,
                  durationMS: 1e3 * c,
                  loop: e,
               });
         },
         removeMarker: function (a) {
            delete this.markers[a];
         },
         update: function () {
            this.pendingPlayback &&
               this.game.cache.isSoundReady(this.key) &&
               ((this.pendingPlayback = !1),
               this.play(
                  this._tempMarker,
                  this._tempPosition,
                  this._tempVolume,
                  this._tempLoop
               )),
               this.isPlaying &&
                  ((this.currentTime = this.game.time.now - this.startTime),
                  this.currentTime >= this.durationMS &&
                     (this.usingWebAudio
                        ? this.loop
                           ? (this.onLoop.dispatch(this),
                             "" === this.currentMarker
                                ? ((this.currentTime = 0),
                                  (this.startTime = this.game.time.now))
                                : this.play(
                                     this.currentMarker,
                                     0,
                                     this.volume,
                                     !0,
                                     !0
                                  ))
                           : this.stop()
                        : this.loop
                        ? (this.onLoop.dispatch(this),
                          this.play(this.currentMarker, 0, this.volume, !0, !0))
                        : this.stop()));
         },
         play: function (a, b, c, d, e) {
            if (
               ((a = a || ""),
               (b = b || 0),
               "undefined" == typeof c && (c = this._volume),
               "undefined" == typeof d && (d = !1),
               "undefined" == typeof e && (e = !0),
               this.isPlaying !== !0 || e !== !1 || this.override !== !1)
            ) {
               if (
                  (this.isPlaying &&
                     this.override &&
                     (this.usingWebAudio
                        ? "undefined" == typeof this._sound.stop
                           ? this._sound.noteOff(0)
                           : this._sound.stop(0)
                        : this.usingAudioTag &&
                          (this._sound.pause(), (this._sound.currentTime = 0))),
                  (this.currentMarker = a),
                  "" !== a)
               ) {
                  if (!this.markers[a])
                     return (
                        console.warn(
                           "Phaser.Sound.play: audio marker " +
                              a +
                              " doesn't exist"
                        ),
                        void 0
                     );
                  (this.position = this.markers[a].start),
                     (this.volume = this.markers[a].volume),
                     (this.loop = this.markers[a].loop),
                     (this.duration = this.markers[a].duration),
                     (this.durationMS = this.markers[a].durationMS),
                     (this._tempMarker = a),
                     (this._tempPosition = this.position),
                     (this._tempVolume = this.volume),
                     (this._tempLoop = this.loop);
               } else
                  (this.position = b),
                     (this.volume = c),
                     (this.loop = d),
                     (this.duration = 0),
                     (this.durationMS = 0),
                     (this._tempMarker = a),
                     (this._tempPosition = b),
                     (this._tempVolume = c),
                     (this._tempLoop = d);
               this.usingWebAudio
                  ? this.game.cache.isSoundDecoded(this.key)
                     ? (null == this._buffer &&
                          (this._buffer = this.game.cache.getSoundData(
                             this.key
                          )),
                       (this._sound = this.context.createBufferSource()),
                       (this._sound.buffer = this._buffer),
                       this.externalNode
                          ? this._sound.connect(this.externalNode.input)
                          : this._sound.connect(this.gainNode),
                       (this.totalDuration = this._sound.buffer.duration),
                       0 === this.duration &&
                          ((this.duration = this.totalDuration),
                          (this.durationMS = 1e3 * this.totalDuration)),
                       this.loop && "" === a && (this._sound.loop = !0),
                       "undefined" == typeof this._sound.start
                          ? this._sound.noteGrainOn(
                               0,
                               this.position,
                               this.duration
                            )
                          : this._sound.start(0, this.position, this.duration),
                       (this.isPlaying = !0),
                       (this.startTime = this.game.time.now),
                       (this.currentTime = 0),
                       (this.stopTime = this.startTime + this.durationMS),
                       this.onPlay.dispatch(this))
                     : ((this.pendingPlayback = !0),
                       this.game.cache.getSound(this.key) &&
                          this.game.cache.getSound(this.key).isDecoding ===
                             !1 &&
                          this.game.sound.decode(this.key, this))
                  : this.game.cache.getSound(this.key) &&
                    this.game.cache.getSound(this.key).locked
                  ? (this.game.cache.reloadSound(this.key),
                    (this.pendingPlayback = !0))
                  : this._sound &&
                    (this.game.device.cocoonJS || 4 === this._sound.readyState)
                  ? (this._sound.play(),
                    (this.totalDuration = this._sound.duration),
                    0 === this.duration &&
                       ((this.duration = this.totalDuration),
                       (this.durationMS = 1e3 * this.totalDuration)),
                    (this._sound.currentTime = this.position),
                    (this._sound.muted = this._muted),
                    (this._sound.volume = this._muted ? 0 : this._volume),
                    (this.isPlaying = !0),
                    (this.startTime = this.game.time.now),
                    (this.currentTime = 0),
                    (this.stopTime = this.startTime + this.durationMS),
                    this.onPlay.dispatch(this))
                  : (this.pendingPlayback = !0);
            }
         },
         restart: function (a, b, c, d) {
            (a = a || ""),
               (b = b || 0),
               (c = c || 1),
               "undefined" == typeof d && (d = !1),
               this.play(a, b, c, d, !0);
         },
         pause: function () {
            this.isPlaying &&
               this._sound &&
               (this.stop(),
               (this.isPlaying = !1),
               (this.paused = !0),
               (this.pausedPosition = this.currentTime),
               (this.pausedTime = this.game.time.now),
               this.onPause.dispatch(this));
         },
         resume: function () {
            if (this.paused && this._sound) {
               if (this.usingWebAudio) {
                  var a = this.position + this.pausedPosition / 1e3;
                  (this._sound = this.context.createBufferSource()),
                     (this._sound.buffer = this._buffer),
                     this.externalNode
                        ? this._sound.connect(this.externalNode.input)
                        : this._sound.connect(this.gainNode),
                     this.loop && (this._sound.loop = !0),
                     "undefined" == typeof this._sound.start
                        ? this._sound.noteGrainOn(0, a, this.duration)
                        : this._sound.start(0, a, this.duration);
               } else this._sound.play();
               (this.isPlaying = !0),
                  (this.paused = !1),
                  (this.startTime += this.game.time.now - this.pausedTime),
                  this.onResume.dispatch(this);
            }
         },
         stop: function () {
            this.isPlaying &&
               this._sound &&
               (this.usingWebAudio
                  ? "undefined" == typeof this._sound.stop
                     ? this._sound.noteOff(0)
                     : this._sound.stop(0)
                  : this.usingAudioTag &&
                    (this._sound.pause(), (this._sound.currentTime = 0))),
               (this.isPlaying = !1);
            var a = this.currentMarker;
            (this.currentMarker = ""), this.onStop.dispatch(this, a);
         },
      }),
      (c.Sound.prototype.constructor = c.Sound),
      Object.defineProperty(c.Sound.prototype, "isDecoding", {
         get: function () {
            return this.game.cache.getSound(this.key).isDecoding;
         },
      }),
      Object.defineProperty(c.Sound.prototype, "isDecoded", {
         get: function () {
            return this.game.cache.isSoundDecoded(this.key);
         },
      }),
      Object.defineProperty(c.Sound.prototype, "mute", {
         get: function () {
            return this._muted;
         },
         set: function (a) {
            (a = a || null),
               a
                  ? ((this._muted = !0),
                    this.usingWebAudio
                       ? ((this._muteVolume = this.gainNode.gain.value),
                         (this.gainNode.gain.value = 0))
                       : this.usingAudioTag &&
                         this._sound &&
                         ((this._muteVolume = this._sound.volume),
                         (this._sound.volume = 0)))
                  : ((this._muted = !1),
                    this.usingWebAudio
                       ? (this.gainNode.gain.value = this._muteVolume)
                       : this.usingAudioTag &&
                         this._sound &&
                         (this._sound.volume = this._muteVolume)),
               this.onMute.dispatch(this);
         },
      }),
      Object.defineProperty(c.Sound.prototype, "volume", {
         get: function () {
            return this._volume;
         },
         set: function (a) {
            this.usingWebAudio
               ? ((this._volume = a), (this.gainNode.gain.value = a))
               : this.usingAudioTag &&
                 this._sound &&
                 a >= 0 &&
                 1 >= a &&
                 ((this._volume = a), (this._sound.volume = a));
         },
      }),
      (c.SoundManager = function (a) {
         (this.game = a),
            (this.onSoundDecode = new c.Signal()),
            (this._muted = !1),
            (this._unlockSource = null),
            (this._volume = 1),
            (this._sounds = []),
            (this.context = null),
            (this.usingWebAudio = !0),
            (this.usingAudioTag = !1),
            (this.noAudio = !1),
            (this.connectToMaster = !0),
            (this.touchLocked = !1),
            (this.channels = 32);
      }),
      (c.SoundManager.prototype = {
         boot: function () {
            if (
               (this.game.device.iOS &&
                  this.game.device.webAudio === !1 &&
                  (this.channels = 1),
               this.game.device.iOS ||
               (window.PhaserGlobal && window.PhaserGlobal.fakeiOSTouchLock)
                  ? ((this.game.input.touch.callbackContext = this),
                    (this.game.input.touch.touchStartCallback = this.unlock),
                    (this.game.input.mouse.callbackContext = this),
                    (this.game.input.mouse.mouseDownCallback = this.unlock),
                    (this.touchLocked = !0))
                  : (this.touchLocked = !1),
               window.PhaserGlobal)
            ) {
               if (window.PhaserGlobal.disableAudio === !0)
                  return (this.usingWebAudio = !1), (this.noAudio = !0), void 0;
               if (window.PhaserGlobal.disableWebAudio === !0)
                  return (
                     (this.usingWebAudio = !1),
                     (this.usingAudioTag = !0),
                     (this.noAudio = !1),
                     void 0
                  );
            }
            window.AudioContext
               ? (this.context = new window.AudioContext())
               : window.webkitAudioContext
               ? (this.context = new window.webkitAudioContext())
               : window.Audio
               ? ((this.usingWebAudio = !1), (this.usingAudioTag = !0))
               : ((this.usingWebAudio = !1), (this.noAudio = !0)),
               null !== this.context &&
                  ((this.masterGain =
                     "undefined" == typeof this.context.createGain
                        ? this.context.createGainNode()
                        : this.context.createGain()),
                  (this.masterGain.gain.value = 1),
                  this.masterGain.connect(this.context.destination));
         },
         unlock: function () {
            if (this.touchLocked !== !1)
               if (
                  this.game.device.webAudio === !1 ||
                  (window.PhaserGlobal &&
                     window.PhaserGlobal.disableWebAudio === !0)
               )
                  (this.touchLocked = !1),
                     (this._unlockSource = null),
                     (this.game.input.touch.callbackContext = null),
                     (this.game.input.touch.touchStartCallback = null),
                     (this.game.input.mouse.callbackContext = null),
                     (this.game.input.mouse.mouseDownCallback = null);
               else {
                  var a = this.context.createBuffer(1, 1, 22050);
                  (this._unlockSource = this.context.createBufferSource()),
                     (this._unlockSource.buffer = a),
                     this._unlockSource.connect(this.context.destination),
                     this._unlockSource.noteOn(0);
               }
         },
         stopAll: function () {
            for (var a = 0; a < this._sounds.length; a++)
               this._sounds[a] && this._sounds[a].stop();
         },
         pauseAll: function () {
            for (var a = 0; a < this._sounds.length; a++)
               this._sounds[a] && this._sounds[a].pause();
         },
         resumeAll: function () {
            for (var a = 0; a < this._sounds.length; a++)
               this._sounds[a] && this._sounds[a].resume();
         },
         decode: function (a, b) {
            b = b || null;
            var c = this.game.cache.getSoundData(a);
            if (c && this.game.cache.isSoundDecoded(a) === !1) {
               this.game.cache.updateSound(a, "isDecoding", !0);
               var d = this;
               this.context.decodeAudioData(c, function (c) {
                  d.game.cache.decodedSound(a, c),
                     b && d.onSoundDecode.dispatch(a, b);
               });
            }
         },
         update: function () {
            this.touchLocked &&
               this.game.device.webAudio &&
               null !== this._unlockSource &&
               (this._unlockSource.playbackState ===
                  this._unlockSource.PLAYING_STATE ||
                  this._unlockSource.playbackState ===
                     this._unlockSource.FINISHED_STATE) &&
               ((this.touchLocked = !1),
               (this._unlockSource = null),
               (this.game.input.touch.callbackContext = null),
               (this.game.input.touch.touchStartCallback = null));
            for (var a = 0; a < this._sounds.length; a++)
               this._sounds[a].update();
         },
         add: function (a, b, d, e) {
            "undefined" == typeof b && (b = 1),
               "undefined" == typeof d && (d = !1),
               "undefined" == typeof e && (e = this.connectToMaster);
            var f = new c.Sound(this.game, a, b, d, e);
            return this._sounds.push(f), f;
         },
         play: function (a, b, c, d) {
            "undefined" == typeof d && (d = !1);
            var e = this.add(a, b, c);
            return e.play(), e;
         },
      }),
      (c.SoundManager.prototype.constructor = c.SoundManager),
      Object.defineProperty(c.SoundManager.prototype, "mute", {
         get: function () {
            return this._muted;
         },
         set: function (a) {
            if ((a = a || null)) {
               if (this._muted) return;
               (this._muted = !0),
                  this.usingWebAudio &&
                     ((this._muteVolume = this.masterGain.gain.value),
                     (this.masterGain.gain.value = 0));
               for (var b = 0; b < this._sounds.length; b++)
                  this._sounds[b].usingAudioTag && (this._sounds[b].mute = !0);
            } else {
               if (this._muted === !1) return;
               (this._muted = !1),
                  this.usingWebAudio &&
                     (this.masterGain.gain.value = this._muteVolume);
               for (var b = 0; b < this._sounds.length; b++)
                  this._sounds[b].usingAudioTag && (this._sounds[b].mute = !1);
            }
         },
      }),
      Object.defineProperty(c.SoundManager.prototype, "volume", {
         get: function () {
            return this.usingWebAudio
               ? this.masterGain.gain.value
               : this._volume;
         },
         set: function (a) {
            (a = this.game.math.clamp(a, 1, 0)),
               (this._volume = a),
               this.usingWebAudio && (this.masterGain.gain.value = a);
            for (var b = 0; b < this._sounds.length; b++)
               this._sounds[b].usingAudioTag &&
                  (this._sounds[b].volume = this._sounds[b].volume * a);
         },
      }),
      (c.Utils.Debug = function (a) {
         (this.game = a),
            (this.context = a.context),
            (this.font = "14px Courier"),
            (this.columnWidth = 100),
            (this.lineHeight = 16),
            (this.renderShadow = !0),
            (this.currentX = 0),
            (this.currentY = 0),
            (this.currentAlpha = 1);
      }),
      (c.Utils.Debug.prototype = {
         start: function (a, b, c, d) {
            null != this.context &&
               ("number" != typeof a && (a = 0),
               "number" != typeof b && (b = 0),
               (c = c || "rgb(255,255,255)"),
               "undefined" == typeof d && (d = 0),
               (this.currentX = a),
               (this.currentY = b),
               (this.currentColor = c),
               (this.currentAlpha = this.context.globalAlpha),
               (this.columnWidth = d),
               this.context.save(),
               this.context.setTransform(1, 0, 0, 1, 0, 0),
               (this.context.strokeStyle = c),
               (this.context.fillStyle = c),
               (this.context.font = this.font),
               (this.context.globalAlpha = 1));
         },
         stop: function () {
            this.context.restore(),
               (this.context.globalAlpha = this.currentAlpha);
         },
         line: function (a, b, c) {
            null != this.context &&
               ("undefined" != typeof b && (this.currentX = b),
               "undefined" != typeof c && (this.currentY = c),
               this.renderShadow &&
                  ((this.context.fillStyle = "rgb(0,0,0)"),
                  this.context.fillText(
                     a,
                     this.currentX + 1,
                     this.currentY + 1
                  ),
                  (this.context.fillStyle = this.currentColor)),
               this.context.fillText(a, this.currentX, this.currentY),
               (this.currentY += this.lineHeight));
         },
         splitline: function () {
            if (null != this.context) {
               for (var a = this.currentX, b = 0; b < arguments.length; b++)
                  this.renderShadow &&
                     ((this.context.fillStyle = "rgb(0,0,0)"),
                     this.context.fillText(
                        arguments[b],
                        a + 1,
                        this.currentY + 1
                     ),
                     (this.context.fillStyle = this.currentColor)),
                     this.context.fillText(arguments[b], a, this.currentY),
                     (a += this.columnWidth);
               this.currentY += this.lineHeight;
            }
         },
         renderQuadTree: function (a, b) {
            (b = b || "rgba(255,0,0,0.3)"), this.start();
            var c = a.bounds;
            if (0 === a.nodes.length) {
               (this.context.strokeStyle = b),
                  this.context.strokeRect(c.x, c.y, c.width, c.height),
                  this.renderText(
                     a.ID + " / " + a.objects.length,
                     c.x + 4,
                     c.y + 16,
                     "rgb(0,200,0)",
                     "12px Courier"
                  ),
                  (this.context.strokeStyle = "rgb(0,255,0)");
               for (var d = 0; d < a.objects.length; d++)
                  this.context.strokeRect(
                     a.objects[d].x,
                     a.objects[d].y,
                     a.objects[d].width,
                     a.objects[d].height
                  );
            } else
               for (var d = 0; d < a.nodes.length; d++)
                  this.renderQuadTree(a.nodes[d]);
            this.stop();
         },
         renderSpriteCorners: function (a, b, c, d) {
            null != this.context &&
               ((b = b || !1),
               (c = c || !1),
               (d = d || "rgb(255,255,255)"),
               this.start(0, 0, d),
               c &&
                  (this.context.beginPath(),
                  (this.context.strokeStyle = "rgba(0, 255, 0, 0.7)"),
                  this.context.strokeRect(
                     a.bounds.x,
                     a.bounds.y,
                     a.bounds.width,
                     a.bounds.height
                  ),
                  this.context.closePath(),
                  this.context.stroke()),
               this.context.beginPath(),
               this.context.moveTo(a.topLeft.x, a.topLeft.y),
               this.context.lineTo(a.topRight.x, a.topRight.y),
               this.context.lineTo(a.bottomRight.x, a.bottomRight.y),
               this.context.lineTo(a.bottomLeft.x, a.bottomLeft.y),
               this.context.closePath(),
               (this.context.strokeStyle = "rgba(255, 0, 255, 0.7)"),
               this.context.stroke(),
               this.renderPoint(a.offset),
               this.renderPoint(a.center),
               this.renderPoint(a.topLeft),
               this.renderPoint(a.topRight),
               this.renderPoint(a.bottomLeft),
               this.renderPoint(a.bottomRight),
               b &&
                  ((this.currentColor = d),
                  this.line(
                     "x: " +
                        Math.floor(a.topLeft.x) +
                        " y: " +
                        Math.floor(a.topLeft.y),
                     a.topLeft.x,
                     a.topLeft.y
                  ),
                  this.line(
                     "x: " +
                        Math.floor(a.topRight.x) +
                        " y: " +
                        Math.floor(a.topRight.y),
                     a.topRight.x,
                     a.topRight.y
                  ),
                  this.line(
                     "x: " +
                        Math.floor(a.bottomLeft.x) +
                        " y: " +
                        Math.floor(a.bottomLeft.y),
                     a.bottomLeft.x,
                     a.bottomLeft.y
                  ),
                  this.line(
                     "x: " +
                        Math.floor(a.bottomRight.x) +
                        " y: " +
                        Math.floor(a.bottomRight.y),
                     a.bottomRight.x,
                     a.bottomRight.y
                  )),
               this.stop());
         },
         renderSoundInfo: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255,255,255)"),
               this.start(b, c, d),
               this.line(
                  "Sound: " + a.key + " Locked: " + a.game.sound.touchLocked
               ),
               this.line(
                  "Is Ready?: " +
                     this.game.cache.isSoundReady(a.key) +
                     " Pending Playback: " +
                     a.pendingPlayback
               ),
               this.line(
                  "Decoded: " + a.isDecoded + " Decoding: " + a.isDecoding
               ),
               this.line(
                  "Total Duration: " +
                     a.totalDuration +
                     " Playing: " +
                     a.isPlaying
               ),
               this.line("Time: " + a.currentTime),
               this.line("Volume: " + a.volume + " Muted: " + a.mute),
               this.line(
                  "WebAudio: " + a.usingWebAudio + " Audio: " + a.usingAudioTag
               ),
               "" !== a.currentMarker &&
                  (this.line(
                     "Marker: " + a.currentMarker + " Duration: " + a.duration
                  ),
                  this.line(
                     "Start: " +
                        a.markers[a.currentMarker].start +
                        " Stop: " +
                        a.markers[a.currentMarker].stop
                  ),
                  this.line("Position: " + a.position)),
               this.stop());
         },
         renderCameraInfo: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255,255,255)"),
               this.start(b, c, d),
               this.line("Camera (" + a.width + " x " + a.height + ")"),
               this.line("X: " + a.x + " Y: " + a.y),
               this.line(
                  "Bounds x: " +
                     a.bounds.x +
                     " Y: " +
                     a.bounds.y +
                     " w: " +
                     a.bounds.width +
                     " h: " +
                     a.bounds.height
               ),
               this.line(
                  "View x: " +
                     a.view.x +
                     " Y: " +
                     a.view.y +
                     " w: " +
                     a.view.width +
                     " h: " +
                     a.view.height
               ),
               this.stop());
         },
         renderPointer: function (a, b, c, d, e) {
            null != this.context &&
               null != a &&
               ("undefined" == typeof b && (b = !1),
               (c = c || "rgba(0,255,0,0.5)"),
               (d = d || "rgba(255,0,0,0.5)"),
               (e = e || "rgb(255,255,255)"),
               (b !== !0 || a.isUp !== !0) &&
                  (this.start(a.x, a.y - 100, e),
                  this.context.beginPath(),
                  this.context.arc(a.x, a.y, a.circle.radius, 0, 2 * Math.PI),
                  (this.context.fillStyle = a.active ? c : d),
                  this.context.fill(),
                  this.context.closePath(),
                  this.context.beginPath(),
                  this.context.moveTo(a.positionDown.x, a.positionDown.y),
                  this.context.lineTo(a.position.x, a.position.y),
                  (this.context.lineWidth = 2),
                  this.context.stroke(),
                  this.context.closePath(),
                  this.line("ID: " + a.id + " Active: " + a.active),
                  this.line("World X: " + a.worldX + " World Y: " + a.worldY),
                  this.line("Screen X: " + a.x + " Screen Y: " + a.y),
                  this.line("Duration: " + a.duration + " ms"),
                  this.stop()));
         },
         renderSpriteInputInfo: function (a, b, c, d) {
            (d = d || "rgb(255,255,255)"),
               this.start(b, c, d),
               this.line("Sprite Input: (" + a.width + " x " + a.height + ")"),
               this.line(
                  "x: " +
                     a.input.pointerX().toFixed(1) +
                     " y: " +
                     a.input.pointerY().toFixed(1)
               ),
               this.line(
                  "over: " +
                     a.input.pointerOver() +
                     " duration: " +
                     a.input.overDuration().toFixed(0)
               ),
               this.line(
                  "down: " +
                     a.input.pointerDown() +
                     " duration: " +
                     a.input.downDuration().toFixed(0)
               ),
               this.line(
                  "just over: " +
                     a.input.justOver() +
                     " just out: " +
                     a.input.justOut()
               ),
               this.stop();
         },
         renderBodyInfo: function (a, b, c, d) {
            (d = d || "rgb(255,255,255)"),
               this.start(b, c, d, 210),
               this.splitline(
                  "x: " + a.body.x.toFixed(2),
                  "y: " + a.body.y.toFixed(2),
                  "width: " + a.width,
                  "height: " + a.height
               ),
               this.splitline(
                  "speed: " + a.body.speed.toFixed(2),
                  "angle: " + a.body.angle.toFixed(2),
                  "linear damping: " + a.body.linearDamping
               ),
               this.splitline(
                  "blocked left: " + a.body.blocked.left,
                  "right: " + a.body.blocked.right,
                  "up: " + a.body.blocked.up,
                  "down: " + a.body.blocked.down
               ),
               this.splitline(
                  "touching left: " + a.body.touching.left,
                  "right: " + a.body.touching.right,
                  "up: " + a.body.touching.up,
                  "down: " + a.body.touching.down
               ),
               this.splitline(
                  "gravity x: " + a.body.gravity.x,
                  "y: " + a.body.gravity.y,
                  "world gravity x: " + this.game.physics.gravity.x,
                  "y: " + this.game.physics.gravity.y
               ),
               this.splitline(
                  "acceleration x: " + a.body.acceleration.x.toFixed(2),
                  "y: " + a.body.acceleration.y.toFixed(2)
               ),
               this.splitline(
                  "velocity x: " + a.body.velocity.x.toFixed(2),
                  "y: " + a.body.velocity.y.toFixed(2),
                  "deltaX: " + a.body.deltaX().toFixed(2),
                  "deltaY: " + a.body.deltaY().toFixed(2)
               ),
               this.splitline(
                  "bounce x: " + a.body.bounce.x.toFixed(2),
                  "y: " + a.body.bounce.y.toFixed(2)
               ),
               this.stop();
         },
         renderInputInfo: function (a, b, c) {
            null != this.context &&
               ((c = c || "rgb(255,255,0)"),
               this.start(a, b, c),
               this.line("Input"),
               this.line(
                  "X: " + this.game.input.x + " Y: " + this.game.input.y
               ),
               this.line(
                  "World X: " +
                     this.game.input.worldX +
                     " World Y: " +
                     this.game.input.worldY
               ),
               this.line(
                  "Scale X: " +
                     this.game.input.scale.x.toFixed(1) +
                     " Scale Y: " +
                     this.game.input.scale.x.toFixed(1)
               ),
               this.line(
                  "Screen X: " +
                     this.game.input.activePointer.screenX +
                     " Screen Y: " +
                     this.game.input.activePointer.screenY
               ),
               this.stop());
         },
         renderSpriteInfo: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255, 255, 255)"),
               this.start(b, c, d),
               this.line(
                  "Sprite:  (" +
                     a.width +
                     " x " +
                     a.height +
                     ") anchor: " +
                     a.anchor.x +
                     " x " +
                     a.anchor.y
               ),
               this.line("x: " + a.x.toFixed(1) + " y: " + a.y.toFixed(1)),
               this.line(
                  "angle: " +
                     a.angle.toFixed(1) +
                     " rotation: " +
                     a.rotation.toFixed(1)
               ),
               this.line("visible: " + a.visible + " in camera: " + a.inCamera),
               this.line(
                  "body x: " +
                     a.body.x.toFixed(1) +
                     " y: " +
                     a.body.y.toFixed(1)
               ),
               this.line("id: " + a._id),
               this.line("scale x: " + a.worldTransform[0]),
               this.line("scale y: " + a.worldTransform[4]),
               this.line("tx: " + a.worldTransform[2]),
               this.line("ty: " + a.worldTransform[5]),
               this.line("skew x: " + a.worldTransform[3]),
               this.line("skew y: " + a.worldTransform[1]),
               this.line("sdx: " + a.deltaX),
               this.line("sdy: " + a.deltaY),
               this.stop());
         },
         renderSpriteCoords: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255, 255, 255)"),
               this.start(b, c, d, 100),
               a.name && this.line(a.name),
               this.splitline("x:", a.x.toFixed(2), "y:", a.y.toFixed(2)),
               this.splitline(
                  "pos x:",
                  a.position.x.toFixed(2),
                  "pos y:",
                  a.position.y.toFixed(2)
               ),
               this.splitline(
                  "world x:",
                  a.world.x.toFixed(2),
                  "world y:",
                  a.world.y.toFixed(2)
               ),
               this.stop());
         },
         renderLine: function (a, b) {
            null != this.context &&
               ((b = b || "rgb(255, 255, 255)"),
               this.start(0, 0, b),
               (this.context.lineWidth = 1),
               this.context.beginPath(),
               this.context.moveTo(a.start.x + 0.5, a.start.y + 0.5),
               this.context.lineTo(a.end.x + 0.5, a.end.y + 0.5),
               this.context.closePath(),
               this.context.stroke(),
               this.stop());
         },
         renderLineInfo: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255, 255, 255)"),
               this.start(b, c, d, 80),
               this.splitline(
                  "start.x:",
                  a.start.x.toFixed(2),
                  "start.y:",
                  a.start.y.toFixed(2)
               ),
               this.splitline(
                  "end.x:",
                  a.end.x.toFixed(2),
                  "end.y:",
                  a.end.y.toFixed(2)
               ),
               this.splitline(
                  "length:",
                  a.length.toFixed(2),
                  "angle:",
                  a.angle
               ),
               this.stop());
         },
         renderPointInfo: function (a, b, c, d) {
            null != this.context &&
               ((d = d || "rgb(255, 255, 255)"),
               this.start(b, c, d),
               this.line("px: " + a.x.toFixed(1) + " py: " + a.y.toFixed(1)),
               this.stop());
         },
         renderSpriteBody: function (a, b, c) {
            null != this.context &&
               ((b = b || "rgb(255,0,255)"),
               "undefined" == typeof c && (c = !1),
               this.start(0, 0, b),
               c
                  ? ((this.context.fillStyle = b),
                    this.context.fillRect(
                       a.body.left,
                       a.body.top,
                       a.body.width,
                       a.body.height
                    ))
                  : ((this.context.strokeStyle = b),
                    this.context.strokeRect(
                       a.body.left,
                       a.body.top,
                       a.body.width,
                       a.body.height
                    ),
                    this.context.stroke()),
               this.stop());
         },
         renderSpriteBounds: function (a, b, c) {
            null != this.context &&
               ((b = b || "rgb(255,0,255)"),
               "undefined" == typeof c && (c = !1),
               this.start(0, 0, b),
               c
                  ? ((this.context.fillStyle = b),
                    this.context.fillRect(
                       a.bounds.x,
                       a.bounds.y,
                       a.bounds.width,
                       a.bounds.height
                    ))
                  : ((this.context.strokeStyle = b),
                    this.context.strokeRect(
                       a.bounds.x,
                       a.bounds.y,
                       a.bounds.width,
                       a.bounds.height
                    ),
                    this.context.stroke()),
               this.stop());
         },
         renderPixel: function (a, b, c) {
            null != this.context &&
               ((c = c || "rgba(0,255,0,1)"),
               this.start(),
               (this.context.fillStyle = c),
               this.context.fillRect(a, b, 2, 2),
               this.stop());
         },
         renderPoint: function (a, b) {
            null != this.context &&
               ((b = b || "rgba(0,255,0,1)"),
               this.start(),
               (this.context.fillStyle = b),
               this.context.fillRect(a.x, a.y, 4, 4),
               this.stop());
         },
         renderRectangle: function (a, b) {
            null != this.context &&
               ((b = b || "rgba(0,255,0,0.3)"),
               this.start(),
               (this.context.fillStyle = b),
               this.context.fillRect(a.x, a.y, a.width, a.height),
               this.stop());
         },
         renderCircle: function (a, b) {
            null != this.context &&
               ((b = b || "rgba(0,255,0,0.3)"),
               this.start(),
               this.context.beginPath(),
               (this.context.fillStyle = b),
               this.context.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !1),
               this.context.fill(),
               this.context.closePath(),
               this.stop());
         },
         renderText: function (a, b, c, d, e) {
            null != this.context &&
               ((d = d || "rgb(255,255,255)"),
               (e = e || "16px Courier"),
               this.start(),
               (this.context.font = e),
               (this.context.fillStyle = d),
               this.context.fillText(a, b, c),
               this.stop());
         },
         renderPhysicsBody: function (a, b, d) {
            if (null !== this.context || null !== d) {
               b = b || "rgb(255,255,255)";
               var e = a.x - this.game.camera.x,
                  f = a.y - this.game.camera.y;
               if (a.type === c.Physics.Arcade.CIRCLE)
                  this.start(0, 0, b),
                     this.context.beginPath(),
                     (this.context.strokeStyle = b),
                     this.context.arc(e, f, a.shape.r, 0, 2 * Math.PI, !1),
                     this.context.stroke(),
                     this.context.closePath(),
                     this.stop();
               else {
                  var g = a.polygon.points;
                  this.start(0, 0, b),
                     this.context.beginPath(),
                     this.context.moveTo(e + g[0].x, f + g[0].y);
                  for (var h = 1; h < g.length; h++)
                     this.context.lineTo(e + g[h].x, f + g[h].y);
                  this.context.closePath(),
                     (this.context.strokeStyle = b),
                     this.context.stroke(),
                     (this.context.fillStyle = "rgb(255,0,0)"),
                     this.context.fillRect(
                        e + g[0].x - 2,
                        f + g[0].y - 2,
                        5,
                        5
                     );
                  for (var h = 1; h < g.length; h++)
                     (this.context.fillStyle = "rgb(255," + 40 * h + ",0)"),
                        this.context.fillRect(
                           e + g[h].x - 2,
                           f + g[h].y - 2,
                           5,
                           5
                        );
                  this.stop();
               }
            }
         },
         renderPolygon: function (a, b, c) {
            if (null !== this.context || null !== c) {
               b = b || "rgb(255,255,255)";
               var d = a.points,
                  e = a.pos.x,
                  f = a.pos.y;
               this.start(0, 0, b),
                  this.context.beginPath(),
                  this.context.moveTo(e + d[0].x, f + d[0].y);
               for (var g = 1; g < d.length; g++)
                  this.context.lineTo(e + d[g].x, f + d[g].y);
               this.context.closePath(),
                  (this.context.strokeStyle = b),
                  this.context.stroke(),
                  this.stop();
            }
         },
      }),
      (c.Utils.Debug.prototype.constructor = c.Utils.Debug),
      (c.Color = {
         getColor32: function (a, b, c, d) {
            return (a << 24) | (b << 16) | (c << 8) | d;
         },
         getColor: function (a, b, c) {
            return (a << 16) | (b << 8) | c;
         },
         hexToRGB: function (a) {
            var b = "#" == a.charAt(0) ? a.substring(1, 7) : a;
            3 == b.length &&
               (b =
                  b.charAt(0) +
                  b.charAt(0) +
                  b.charAt(1) +
                  b.charAt(1) +
                  b.charAt(2) +
                  b.charAt(2));
            var c = parseInt(b.substring(0, 2), 16),
               d = parseInt(b.substring(2, 4), 16),
               e = parseInt(b.substring(4, 6), 16);
            return (c << 16) | (d << 8) | e;
         },
         getColorInfo: function (a) {
            var b = c.Color.getRGB(a),
               d = c.Color.RGBtoHSV(a),
               e = c.Color.RGBtoHexstring(a) + "\n";
            return (
               (e =
                  e.concat(
                     "Alpha: " +
                        b.alpha +
                        " Red: " +
                        b.red +
                        " Green: " +
                        b.green +
                        " Blue: " +
                        b.blue
                  ) + "\n"),
               (e = e.concat(
                  "Hue: " +
                     d.hue +
                     " Saturation: " +
                     d.saturation +
                     " Lightnes: " +
                     d.lightness
               ))
            );
         },
         RGBtoHexstring: function (a) {
            var b = c.Color.getRGB(a);
            return (
               "0x" +
               c.Color.colorToHexstring(b.alpha) +
               c.Color.colorToHexstring(b.red) +
               c.Color.colorToHexstring(b.green) +
               c.Color.colorToHexstring(b.blue)
            );
         },
         RGBtoWebstring: function (a) {
            var b = c.Color.getRGB(a);
            return (
               "#" +
               c.Color.colorToHexstring(b.red) +
               c.Color.colorToHexstring(b.green) +
               c.Color.colorToHexstring(b.blue)
            );
         },
         colorToHexstring: function (a) {
            var b = "0123456789ABCDEF",
               c = a % 16,
               d = (a - c) / 16,
               e = b.charAt(d) + b.charAt(c);
            return e;
         },
         interpolateColor: function (a, b, d, e, f) {
            "undefined" == typeof f && (f = 255);
            var g = c.Color.getRGB(a),
               h = c.Color.getRGB(b),
               i = ((h.red - g.red) * e) / d + g.red,
               j = ((h.green - g.green) * e) / d + g.green,
               k = ((h.blue - g.blue) * e) / d + g.blue;
            return c.Color.getColor32(f, i, j, k);
         },
         interpolateColorWithRGB: function (a, b, d, e, f, g) {
            var h = c.Color.getRGB(a),
               i = ((b - h.red) * g) / f + h.red,
               j = ((d - h.green) * g) / f + h.green,
               k = ((e - h.blue) * g) / f + h.blue;
            return c.Color.getColor(i, j, k);
         },
         interpolateRGB: function (a, b, d, e, f, g, h, i) {
            var j = ((e - a) * i) / h + a,
               k = ((f - b) * i) / h + b,
               l = ((g - d) * i) / h + d;
            return c.Color.getColor(j, k, l);
         },
         getRandomColor: function (a, b, d) {
            if (
               ("undefined" == typeof a && (a = 0),
               "undefined" == typeof b && (b = 255),
               "undefined" == typeof d && (d = 255),
               b > 255)
            )
               return c.Color.getColor(255, 255, 255);
            if (a > b) return c.Color.getColor(255, 255, 255);
            var e = a + Math.round(Math.random() * (b - a)),
               f = a + Math.round(Math.random() * (b - a)),
               g = a + Math.round(Math.random() * (b - a));
            return c.Color.getColor32(d, e, f, g);
         },
         getRGB: function (a) {
            return {
               alpha: a >>> 24,
               red: 255 & (a >> 16),
               green: 255 & (a >> 8),
               blue: 255 & a,
            };
         },
         getWebRGB: function (a) {
            var b = (a >>> 24) / 255,
               c = 255 & (a >> 16),
               d = 255 & (a >> 8),
               e = 255 & a;
            return (
               "rgba(" +
               c.toString() +
               "," +
               d.toString() +
               "," +
               e.toString() +
               "," +
               b.toString() +
               ")"
            );
         },
         getAlpha: function (a) {
            return a >>> 24;
         },
         getAlphaFloat: function (a) {
            return (a >>> 24) / 255;
         },
         getRed: function (a) {
            return 255 & (a >> 16);
         },
         getGreen: function (a) {
            return 255 & (a >> 8);
         },
         getBlue: function (a) {
            return 255 & a;
         },
      });
   var f = (function () {
      "use strict";
      function a(a, b) {
         (this.x = a || 0), (this.y = b || 0);
      }
      function b(b, c) {
         (this.pos = b || new a()), (this.r = c || 0);
      }
      function c(b, c) {
         (this.pos = b || new a()), (this.points = c || []), this.recalc();
      }
      function d(b, c, d) {
         (this.pos = b || new a()), (this.w = c || 0), (this.h = d || 0);
      }
      function e() {
         (this.a = null),
            (this.b = null),
            (this.overlapN = new a()),
            (this.overlapV = new a()),
            this.clear();
      }
      function f(a, b, c) {
         for (
            var d = Number.MAX_VALUE,
               e = -Number.MAX_VALUE,
               f = a.length,
               g = 0;
            f > g;
            g++
         ) {
            var h = a[g].dot(b);
            d > h && (d = h), h > e && (e = h);
         }
         (c[0] = d), (c[1] = e);
      }
      function g(a, b, c, d, e, g) {
         var h = p.pop(),
            i = p.pop(),
            j = n.pop().copy(b).sub(a),
            k = j.dot(e);
         if (
            (f(c, e, h),
            f(d, e, i),
            (i[0] += k),
            (i[1] += k),
            h[0] > i[1] || i[0] > h[1])
         )
            return n.push(j), p.push(h), p.push(i), !0;
         if (g) {
            var l = 0;
            if (h[0] < i[0])
               if (((g.aInB = !1), h[1] < i[1]))
                  (l = h[1] - i[0]), (g.bInA = !1);
               else {
                  var m = h[1] - i[0],
                     o = i[1] - h[0];
                  l = o > m ? m : -o;
               }
            else if (((g.bInA = !1), h[1] > i[1]))
               (l = h[0] - i[1]), (g.aInB = !1);
            else {
               var m = h[1] - i[0],
                  o = i[1] - h[0];
               l = o > m ? m : -o;
            }
            var q = Math.abs(l);
            q < g.overlap &&
               ((g.overlap = q),
               g.overlapN.copy(e),
               0 > l && g.overlapN.reverse());
         }
         return n.push(j), p.push(h), p.push(i), !1;
      }
      function h(a, b) {
         var c = a.len2(),
            d = b.dot(a);
         return 0 > d ? q : d > c ? s : r;
      }
      function i(a, b, c) {
         var d = n.pop().copy(b.pos).sub(a.pos),
            e = a.r + b.r,
            f = e * e,
            g = d.len2();
         if (g > f) return n.push(d), !1;
         if (c) {
            var h = Math.sqrt(g);
            (c.a = a),
               (c.b = b),
               (c.overlap = e - h),
               c.overlapN.copy(d.normalize()),
               c.overlapV.copy(d).scale(c.overlap),
               (c.aInB = a.r <= b.r && h <= b.r - a.r),
               (c.bInA = b.r <= a.r && h <= a.r - b.r);
         }
         return n.push(d), !0;
      }
      function j(a, b, c) {
         for (
            var d = n.pop().copy(b.pos).sub(a.pos),
               e = b.r,
               f = e * e,
               g = a.points,
               i = g.length,
               j = n.pop(),
               k = n.pop(),
               l = 0;
            i > l;
            l++
         ) {
            var m = l === i - 1 ? 0 : l + 1,
               o = 0 === l ? i - 1 : l - 1,
               p = 0,
               r = null;
            j.copy(a.edges[l]),
               k.copy(d).sub(g[l]),
               c && k.len2() > f && (c.aInB = !1);
            var t = h(j, k);
            if (t === q) {
               j.copy(a.edges[o]);
               var u = n.pop().copy(d).sub(g[o]);
               if (((t = h(j, u)), t === s)) {
                  var v = k.len();
                  if (v > e)
                     return n.push(d), n.push(j), n.push(k), n.push(u), !1;
                  c && ((c.bInA = !1), (r = k.normalize()), (p = e - v));
               }
               n.push(u);
            } else if (t === s) {
               if (
                  (j.copy(a.edges[m]),
                  k.copy(d).sub(g[m]),
                  (t = h(j, k)),
                  t === q)
               ) {
                  var v = k.len();
                  if (v > e) return n.push(d), n.push(j), n.push(k), !1;
                  c && ((c.bInA = !1), (r = k.normalize()), (p = e - v));
               }
            } else {
               var w = j.perp().normalize(),
                  v = k.dot(w),
                  x = Math.abs(v);
               if (v > 0 && x > e) return n.push(d), n.push(w), n.push(k), !1;
               c &&
                  ((r = w),
                  (p = e - v),
                  (v >= 0 || 2 * e > p) && (c.bInA = !1));
            }
            r &&
               c &&
               Math.abs(p) < Math.abs(c.overlap) &&
               ((c.overlap = p), c.overlapN.copy(r));
         }
         return (
            c &&
               ((c.a = a),
               (c.b = b),
               c.overlapV.copy(c.overlapN).scale(c.overlap)),
            n.push(d),
            n.push(j),
            n.push(k),
            !0
         );
      }
      function k(a, b, c) {
         var d = j(b, a, c);
         if (d && c) {
            var e = c.a,
               f = c.aInB;
            c.overlapN.reverse(),
               c.overlapV.reverse(),
               (c.a = c.b),
               (c.b = e),
               (c.aInB = c.bInA),
               (c.bInA = f);
         }
         return d;
      }
      function l(a, b, c) {
         for (
            var d = a.points, e = d.length, f = b.points, h = f.length, i = 0;
            e > i;
            i++
         )
            if (g(a.pos, b.pos, d, f, a.normals[i], c)) return !1;
         for (var i = 0; h > i; i++)
            if (g(a.pos, b.pos, d, f, b.normals[i], c)) return !1;
         return (
            c &&
               ((c.a = a),
               (c.b = b),
               c.overlapV.copy(c.overlapN).scale(c.overlap)),
            !0
         );
      }
      var m = {};
      (m.Vector = a),
         (m.V = a),
         (a.prototype.copy = a.prototype.copy =
            function (a) {
               return (this.x = a.x), (this.y = a.y), this;
            }),
         (a.prototype.perp = a.prototype.perp =
            function () {
               var a = this.x;
               return (this.x = this.y), (this.y = -a), this;
            }),
         (a.prototype.rotate = a.prototype.rotate =
            function (a) {
               var b = this.x,
                  c = this.y;
               return (
                  (this.x = b * Math.cos(a) - c * Math.sin(a)),
                  (this.y = b * Math.sin(a) + c * Math.cos(a)),
                  this
               );
            }),
         (a.prototype.rotatePrecalc = a.prototype.rotatePrecalc =
            function (a, b) {
               var c = this.x,
                  d = this.y;
               return (this.x = c * b - d * a), (this.y = c * a + d * b), this;
            }),
         (a.prototype.reverse = a.prototype.reverse =
            function () {
               return (this.x = -this.x), (this.y = -this.y), this;
            }),
         (a.prototype.normalize = a.prototype.normalize =
            function () {
               var a = this.len();
               return (
                  a > 0 && ((this.x = this.x / a), (this.y = this.y / a)), this
               );
            }),
         (a.prototype.add = a.prototype.add =
            function (a) {
               return (this.x += a.x), (this.y += a.y), this;
            }),
         (a.prototype.sub = a.prototype.sub =
            function (a) {
               return (this.x -= a.x), (this.y -= a.y), this;
            }),
         (a.prototype.scale = a.prototype.scale =
            function (a, b) {
               return (this.x *= a), (this.y *= b || a), this;
            }),
         (a.prototype.project = a.prototype.project =
            function (a) {
               var b = this.dot(a) / a.len2();
               return (this.x = b * a.x), (this.y = b * a.y), this;
            }),
         (a.prototype.projectN = a.prototype.projectN =
            function (a) {
               var b = this.dot(a);
               return (this.x = b * a.x), (this.y = b * a.y), this;
            }),
         (a.prototype.reflect = a.prototype.reflect =
            function (a) {
               var b = this.x,
                  c = this.y;
               return (
                  this.project(a).scale(2), (this.x -= b), (this.y -= c), this
               );
            }),
         (a.prototype.reflectN = a.prototype.reflectN =
            function (a) {
               var b = this.x,
                  c = this.y;
               return (
                  this.projectN(a).scale(2), (this.x -= b), (this.y -= c), this
               );
            }),
         (a.prototype.dot = a.prototype.dot =
            function (a) {
               return this.x * a.x + this.y * a.y;
            }),
         (a.prototype.len2 = a.prototype.len2 =
            function () {
               return this.dot(this);
            }),
         (a.prototype.len = a.prototype.len =
            function () {
               return Math.sqrt(this.len2());
            }),
         (m.Circle = b),
         (m.Polygon = c),
         (c.prototype.recalc = c.prototype.recalc =
            function () {
               (this.edges = []), (this.normals = []);
               for (var b = this.points, c = b.length, d = 0; c > d; d++) {
                  var e = b[d],
                     f = c - 1 > d ? b[d + 1] : b[0],
                     g = new a().copy(f).sub(e),
                     h = new a().copy(g).perp().normalize();
                  this.edges.push(g), this.normals.push(h);
               }
               return this;
            }),
         (c.prototype.rotate = c.prototype.rotate =
            function (a) {
               var b,
                  c = this.points,
                  d = this.edges,
                  e = this.normals,
                  f = c.length,
                  g = Math.cos(a),
                  h = Math.sin(a);
               for (b = 0; f > b; b++)
                  c[b].rotatePrecalc(h, g),
                     d[b].rotatePrecalc(h, g),
                     e[b].rotatePrecalc(h, g);
               return this;
            }),
         (c.prototype.scale = c.prototype.scale =
            function (a, b) {
               var c,
                  d = this.points,
                  e = this.edges,
                  f = this.normals,
                  g = d.length;
               for (c = 0; g > c; c++)
                  d[c].scale(a, b), e[c].scale(a, b), f[c].scale(a, b);
               return this;
            }),
         (c.prototype.translate = c.prototype.translate =
            function (a, b) {
               var c,
                  d = this.points,
                  e = d.length;
               for (c = 0; e > c; c++) (d[c].x += a), (d[c].y += b);
               return this;
            }),
         (m.Box = d),
         (d.prototype.toPolygon = d.prototype.toPolygon =
            function () {
               var b = this.pos,
                  d = this.w,
                  e = this.h;
               return new c(new a(b.x, b.y), [
                  new a(),
                  new a(d, 0),
                  new a(d, e),
                  new a(0, e),
               ]);
            }),
         (m.Response = e),
         (e.prototype.clear = e.prototype.clear =
            function () {
               return (
                  (this.aInB = !0),
                  (this.bInA = !0),
                  (this.overlap = Number.MAX_VALUE),
                  this
               );
            });
      for (var n = [], o = 0; 10 > o; o++) n.push(new a());
      for (var p = [], o = 0; 5 > o; o++) p.push([]);
      var q = -1,
         r = 0,
         s = 1;
      return (
         (m.testCircleCircle = i),
         (m.testPolygonCircle = j),
         (m.testCirclePolygon = k),
         (m.testPolygonPolygon = l),
         m
      );
   })();
   return (
      (c.Physics = {}),
      (c.Physics.Arcade = function (a) {
         (this.game = a),
            (this.gravity = new c.Point()),
            (this.worldLeft = null),
            (this.worldRight = null),
            (this.worldTop = null),
            (this.worldBottom = null),
            (this.worldPolys = [null, null, null, null]),
            (this.quadTree = new c.QuadTree(
               this.game.world.bounds.x,
               this.game.world.bounds.y,
               this.game.world.bounds.width,
               this.game.world.bounds.height,
               this.maxObjects,
               this.maxLevels
            )),
            (this.maxObjects = 10),
            (this.maxLevels = 4),
            (this._mapData = []),
            (this._mapTiles = 0),
            (this._result = !1),
            (this._total = 0),
            (this._angle = 0),
            (this._drag = 0),
            (this._dx = 0),
            (this._dy = 0),
            (this._p = new c.Point(0, 0)),
            (this._intersection = [0, 0, 0, 0]),
            (this._gravityX = 0),
            (this._gravityY = 0),
            (this._response = new f.Response()),
            this.setBoundsToWorld(!0, !0, !0, !0);
      }),
      (c.Physics.Arcade.RECT = 0),
      (c.Physics.Arcade.CIRCLE = 1),
      (c.Physics.Arcade.POLYGON = 2),
      (c.Physics.Arcade.prototype = {
         checkBounds: function (a) {
            if (
               !a.collideWorldBounds ||
               (!this.worldLeft &&
                  !this.worldRight &&
                  !this.worldTop &&
                  !this.worldBottom)
            )
               return !1;
            this._response.clear();
            var b = f.testPolygonPolygon,
               d = a.polygon,
               e = !1;
            return (
               a.type === c.Physics.Arcade.CIRCLE &&
                  ((b = f.testPolygonCircle), (d = a.shape)),
               this.worldLeft && b(this.worldPolys[0], d, this._response)
                  ? ((a.blocked.left = !0),
                    d.pos.add(this._response.overlapV),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (e = !0))
                  : this.worldRight &&
                    b(this.worldPolys[1], d, this._response) &&
                    ((a.blocked.right = !0),
                    d.pos.add(this._response.overlapV),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (e = !0)),
               this._response.clear(),
               this.worldTop && b(this.worldPolys[2], d, this._response)
                  ? ((a.blocked.up = !0),
                    d.pos.add(this._response.overlapV),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (e = !0))
                  : this.worldBottom &&
                    b(this.worldPolys[3], d, this._response) &&
                    ((a.blocked.down = !0),
                    d.pos.add(this._response.overlapV),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (e = !0)),
               e
            );
         },
         setBoundsToWorld: function (a, b, c, d) {
            this.setBounds(
               this.game.world.bounds.x,
               this.game.world.bounds.y,
               this.game.world.bounds.width,
               this.game.world.bounds.height,
               a,
               b,
               c,
               d
            );
         },
         setBounds: function (a, b, c, d, e, g, h, i) {
            "undefined" == typeof e && (e = !0),
               "undefined" == typeof g && (g = !0),
               "undefined" == typeof h && (h = !0),
               "undefined" == typeof i && (i = !0);
            var j = 100;
            e
               ? ((this.worldLeft = new f.Box(new f.Vector(a - j, b), j, d)),
                 (this.worldPolys[0] = this.worldLeft.toPolygon()))
               : ((this.worldLeft = null), (this.worldPolys[0] = null)),
               g
                  ? ((this.worldRight = new f.Box(
                       new f.Vector(a + c, b),
                       j,
                       d
                    )),
                    (this.worldPolys[1] = this.worldRight.toPolygon()))
                  : ((this.worldRight = null), (this.worldPolys[1] = null)),
               h
                  ? ((this.worldTop = new f.Box(new f.Vector(a, b - j), c, j)),
                    (this.worldPolys[2] = this.worldTop.toPolygon()))
                  : ((this.worldTop = null), (this.worldPolys[2] = null)),
               i
                  ? ((this.worldBottom = new f.Box(
                       new f.Vector(a, b + d),
                       c,
                       j
                    )),
                    (this.worldPolys[3] = this.worldBottom.toPolygon()))
                  : ((this.worldBottom = null), (this.worldPolys[3] = null));
         },
         updateMotion: function (a) {
            return (
               a.allowGravity
                  ? ((this._gravityX = this.gravity.x + a.gravity.x),
                    (this._gravityY = this.gravity.y + a.gravity.y))
                  : ((this._gravityX = a.gravity.x),
                    (this._gravityY = a.gravity.y)),
               ((this._gravityX < 0 && a.blocked.left) ||
                  (this._gravityX > 0 && a.blocked.right)) &&
                  (this._gravityX = 0),
               ((this._gravityY < 0 && a.blocked.up) ||
                  (this._gravityY > 0 && a.blocked.down)) &&
                  (this._gravityY = 0),
               a.allowRotation &&
                  ((this._velocityDelta =
                     a.angularAcceleration * this.game.time.physicsElapsed),
                  0 !== a.angularDrag &&
                     0 === a.angularAcceleration &&
                     ((this._drag =
                        a.angularDrag * this.game.time.physicsElapsed),
                     a.angularVelocity > 0
                        ? (a.angularVelocity -= this._drag)
                        : a.angularVelocity < 0 &&
                          (a.angularVelocity += this._drag)),
                  (a.rotation +=
                     this.game.time.physicsElapsed *
                     (a.angularVelocity + this._velocityDelta / 2)),
                  (a.angularVelocity += this._velocityDelta),
                  a.angularVelocity > a.maxAngular
                     ? (a.angularVelocity = a.maxAngular)
                     : a.angularVelocity < -a.maxAngular &&
                       (a.angularVelocity = -a.maxAngular)),
               this._p.setTo(
                  (a.acceleration.x + this._gravityX) *
                     this.game.time.physicsElapsed,
                  (a.acceleration.y + this._gravityY) *
                     this.game.time.physicsElapsed
               ),
               this._p
            );
         },
         overlap: function (a, b, c, d, e) {
            if (
               ((c = c || null),
               (d = d || null),
               (e = e || c),
               (this._result = !1),
               (this._total = 0),
               Array.isArray(b))
            )
               for (var f = 0, g = b.length; g > f; f++)
                  this.collideHandler(a, b[f], c, d, e, !0);
            else this.collideHandler(a, b, c, d, e, !0);
            return this._total > 0;
         },
         collide: function (a, b, c, d, e) {
            if (
               ((c = c || null),
               (d = d || null),
               (e = e || c),
               (this._result = !1),
               (this._total = 0),
               Array.isArray(b))
            )
               for (var f = 0, g = b.length; g > f; f++)
                  this.collideHandler(a, b[f], c, d, e, !1);
            else this.collideHandler(a, b, c, d, e, !1);
            return this._total > 0;
         },
         collideHandler: function (a, b, d, e, f, g) {
            return "undefined" != typeof b ||
               (a.type !== c.GROUP && a.type !== c.EMITTER)
               ? (a &&
                    b &&
                    a.exists &&
                    b.exists &&
                    (a.type == c.SPRITE || a.type == c.TILESPRITE
                       ? b.type == c.SPRITE || b.type == c.TILESPRITE
                          ? this.collideSpriteVsSprite(a, b, d, e, f, g)
                          : b.type == c.GROUP || b.type == c.EMITTER
                          ? this.collideSpriteVsGroup(a, b, d, e, f, g)
                          : b.type == c.TILEMAPLAYER &&
                            this.collideSpriteVsTilemapLayer(a, b, d, e, f)
                       : a.type == c.GROUP
                       ? b.type == c.SPRITE || b.type == c.TILESPRITE
                          ? this.collideSpriteVsGroup(b, a, d, e, f, g)
                          : b.type == c.GROUP || b.type == c.EMITTER
                          ? this.collideGroupVsGroup(a, b, d, e, f, g)
                          : b.type == c.TILEMAPLAYER &&
                            this.collideGroupVsTilemapLayer(a, b, d, e, f)
                       : a.type == c.TILEMAPLAYER
                       ? b.type == c.SPRITE || b.type == c.TILESPRITE
                          ? this.collideSpriteVsTilemapLayer(b, a, d, e, f)
                          : (b.type == c.GROUP || b.type == c.EMITTER) &&
                            this.collideGroupVsTilemapLayer(b, a, d, e, f)
                       : a.type == c.EMITTER &&
                         (b.type == c.SPRITE || b.type == c.TILESPRITE
                            ? this.collideSpriteVsGroup(b, a, d, e, f, g)
                            : b.type == c.GROUP || b.type == c.EMITTER
                            ? this.collideGroupVsGroup(a, b, d, e, f, g)
                            : b.type == c.TILEMAPLAYER &&
                              this.collideGroupVsTilemapLayer(a, b, d, e, f))),
                 void 0)
               : (this.collideGroupVsSelf(a, d, e, f, g), void 0);
         },
         collideSpriteVsSprite: function (a, b, c, d, e, f) {
            this.separate(a.body, b.body, d, e, f) &&
               (c && c.call(e, a, b), this._total++);
         },
         collideSpriteVsGroup: function (a, b, d, e, f, g) {
            if (0 !== b.length) {
               this.quadTree.clear(),
                  (this.quadTree = new c.QuadTree(
                     this.game.world.bounds.x,
                     this.game.world.bounds.y,
                     this.game.world.bounds.width,
                     this.game.world.bounds.height,
                     this.maxObjects,
                     this.maxLevels
                  )),
                  this.quadTree.populate(b),
                  (this._potentials = this.quadTree.retrieve(a));
               for (var h = 0, i = this._potentials.length; i > h; h++)
                  this.separate(a.body, this._potentials[h], e, f, g) &&
                     (d && d.call(f, a, this._potentials[h].sprite),
                     this._total++);
            }
         },
         collideGroupVsSelf: function (a, b, c, d, e) {
            if (0 !== a.length)
               for (var f = a._container.children.length, g = 0; f > g; g++)
                  for (var h = g + 1; f >= h; h++)
                     a._container.children[g] &&
                        a._container.children[h] &&
                        a._container.children[g].exists &&
                        a._container.children[h].exists &&
                        this.collideSpriteVsSprite(
                           a._container.children[g],
                           a._container.children[h],
                           b,
                           c,
                           d,
                           e
                        );
         },
         collideGroupVsGroup: function (a, b, c, d, e, f) {
            if (0 !== a.length && 0 !== b.length && a._container.first._iNext) {
               var g = a._container.first._iNext;
               do {
                  g.exists && this.collideSpriteVsGroup(g, b, c, d, e, f),
                     (g = g._iNext);
               } while (g != a._container.last._iNext);
            }
         },
         collideSpriteVsTilemapLayer: function (a, b, c, d, e) {
            if (
               ((this._mapData = b.getTiles(
                  a.body.left,
                  a.body.top,
                  a.body.width,
                  a.body.height,
                  !0
               )),
               0 !== this._mapData.length)
            ) {
               for (var f = 0; f < this._mapData.length; f++)
                  this.separateTile(a.body, this._mapData[f]) &&
                     (d
                        ? d.call(e, a, this._mapData[f]) &&
                          (this._total++, c && c.call(e, a, this._mapData[f]))
                        : (this._total++, c && c.call(e, a, this._mapData[f])));
               return !0;
            }
         },
         collideGroupVsTilemapLayer: function (a, b, c, d, e) {
            if (0 !== a.length && a._container.first._iNext) {
               var f = a._container.first._iNext;
               do {
                  f.exists && this.collideSpriteVsTilemapLayer(f, b, c, d, e),
                     (f = f._iNext);
               } while (f != a._container.last._iNext);
            }
         },
         separate: function (a, b, c, d, e) {
            return a === b || this.intersects(a, b) === !1
               ? !1
               : c && c.call(d, a.sprite, b.sprite) === !1
               ? !1
               : (this._response.clear(),
                 e
                    ? a.overlap(b, this._response)
                    : a.overlap(b, this._response)
                    ? a.separate(b, this._response)
                    : !1);
         },
         intersects: function (a, b) {
            var c = !1;
            return a.width <= 0 ||
               a.height <= 0 ||
               b.width <= 0 ||
               b.height <= 0
               ? !1
               : ((c = !(
                    a.right < b.left ||
                    a.bottom < b.top ||
                    a.left > b.right ||
                    a.top > b.bottom
                 )),
                 !c && a.inContact(b) && a.removeContact(b),
                 c);
         },
         tileIntersects: function (a, b) {
            return a.width <= 0 ||
               a.height <= 0 ||
               b.width <= 0 ||
               b.height <= 0
               ? ((this._intersection[4] = 0), this._intersection)
               : a.right < b.x ||
                 a.bottom < b.y ||
                 a.left > b.right ||
                 a.top > b.bottom
               ? ((this._intersection[4] = 0), this._intersection)
               : ((this._intersection[0] = Math.max(a.left, b.x)),
                 (this._intersection[1] = Math.max(a.top, b.y)),
                 (this._intersection[2] =
                    Math.min(a.right, b.right) - this._intersection[0]),
                 (this._intersection[3] =
                    Math.min(a.bottom, b.bottom) - this._intersection[1]),
                 (this._intersection[4] = 1),
                 this._intersection);
         },
         separateTile: function (a, b) {
            if (
               ((this._intersection = this.tileIntersects(a, b)),
               0 === this._intersection[4] ||
                  0 === this._intersection[2] ||
                  0 === this._intersection[3])
            )
               return !1;
            if (b.tile.callback || b.layer.callbacks[b.tile.index]) {
               if (
                  b.tile.callback &&
                  b.tile.callback.call(b.tile.callbackContext, a.sprite, b) ===
                     !1
               )
                  return !1;
               if (
                  b.layer.callbacks[b.tile.index] &&
                  b.layer.callbacks[b.tile.index].callback.call(
                     b.layer.callbacks[b.tile.index].callbackContext,
                     a.sprite,
                     b
                  ) === !1
               )
                  return !1;
            }
            (a.overlapX = 0), (a.overlapY = 0);
            var c = !1;
            return (
               a.deltaX() < 0 &&
               a.checkCollision.left &&
               b.tile.faceRight &&
               !a.blocked.left
                  ? ((a.overlapX = a.left - b.right),
                    a.overlapX < 0 ? (c = !0) : (a.overlapX = 0))
                  : a.deltaX() > 0 &&
                    a.checkCollision.right &&
                    b.tile.faceLeft &&
                    !a.blocked.right &&
                    ((a.overlapX = a.right - b.x),
                    a.overlapX > 0 ? (c = !0) : (a.overlapX = 0)),
               a.deltaY() < 0 &&
               a.checkCollision.up &&
               b.tile.faceBottom &&
               !a.blocked.up
                  ? ((a.overlapY = a.top - b.bottom),
                    a.overlapY < 0 ? (c = !0) : (a.overlapY = 0))
                  : a.deltaY() > 0 &&
                    a.checkCollision.down &&
                    b.tile.faceTop &&
                    !a.blocked.down &&
                    ((a.overlapY = a.bottom - b.y),
                    a.overlapY > 0 ? (c = !0) : (a.overlapY = 0)),
               0 !== a.overlapX &&
                  0 !== a.overlapY &&
                  (Math.abs(a.overlapX) > Math.abs(a.overlapY)
                     ? (a.overlapX = 0)
                     : (a.overlapY = 0)),
               c ? this.processTileSeparation(a) : !1
            );
         },
         processTileSeparation: function (a) {
            return (
               a.overlapX < 0
                  ? ((a.x -= a.overlapX),
                    (a.left -= a.overlapX),
                    (a.right -= a.overlapX),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (a.blocked.left = !0))
                  : a.overlapX > 0 &&
                    ((a.x -= a.overlapX),
                    (a.left -= a.overlapX),
                    (a.right -= a.overlapX),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (a.blocked.right = !0)),
               a.overlapY < 0
                  ? ((a.y -= a.overlapY),
                    (a.top -= a.overlapY),
                    (a.bottom -= a.overlapY),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (a.blocked.up = !0))
                  : a.overlapY > 0 &&
                    ((a.y -= a.overlapY),
                    (a.top -= a.overlapY),
                    (a.bottom -= a.overlapY),
                    (a.blocked.x = Math.floor(a.x)),
                    (a.blocked.y = Math.floor(a.y)),
                    (a.blocked.down = !0)),
               a.reboundCheck(a.overlapX, a.overlapY, !0),
               !0
            );
         },
         moveToObject: function (a, b, c, d) {
            return (
               "undefined" == typeof c && (c = 60),
               "undefined" == typeof d && (d = 0),
               (this._angle = Math.atan2(b.y - a.y, b.x - a.x)),
               d > 0 && (c = this.distanceBetween(a, b) / (d / 1e3)),
               (a.body.velocity.x = Math.cos(this._angle) * c),
               (a.body.velocity.y = Math.sin(this._angle) * c),
               this._angle
            );
         },
         moveToPointer: function (a, b, c, d) {
            return (
               "undefined" == typeof b && (b = 60),
               (c = c || this.game.input.activePointer),
               "undefined" == typeof d && (d = 0),
               (this._angle = this.angleToPointer(a, c)),
               d > 0 && (b = this.distanceToPointer(a, c) / (d / 1e3)),
               (a.body.velocity.x = Math.cos(this._angle) * b),
               (a.body.velocity.y = Math.sin(this._angle) * b),
               this._angle
            );
         },
         moveToXY: function (a, b, c, d, e) {
            return (
               "undefined" == typeof d && (d = 60),
               "undefined" == typeof e && (e = 0),
               (this._angle = Math.atan2(c - a.y, b - a.x)),
               e > 0 && (d = this.distanceToXY(a, b, c) / (e / 1e3)),
               (a.body.velocity.x = Math.cos(this._angle) * d),
               (a.body.velocity.y = Math.sin(this._angle) * d),
               this._angle
            );
         },
         velocityFromAngle: function (a, b, d) {
            return (
               "undefined" == typeof b && (b = 60),
               (d = d || new c.Point()),
               d.setTo(
                  Math.cos(this.game.math.degToRad(a)) * b,
                  Math.sin(this.game.math.degToRad(a)) * b
               )
            );
         },
         velocityFromRotation: function (a, b, d) {
            return (
               "undefined" == typeof b && (b = 60),
               (d = d || new c.Point()),
               d.setTo(Math.cos(a) * b, Math.sin(a) * b)
            );
         },
         accelerationFromRotation: function (a, b, d) {
            return (
               "undefined" == typeof b && (b = 60),
               (d = d || new c.Point()),
               d.setTo(Math.cos(a) * b, Math.sin(a) * b)
            );
         },
         accelerateToObject: function (a, b, c, d, e) {
            return (
               "undefined" == typeof c && (c = 60),
               "undefined" == typeof d && (d = 1e3),
               "undefined" == typeof e && (e = 1e3),
               (this._angle = this.angleBetween(a, b)),
               a.body.acceleration.setTo(
                  Math.cos(this._angle) * c,
                  Math.sin(this._angle) * c
               ),
               a.body.maxVelocity.setTo(d, e),
               this._angle
            );
         },
         accelerateToPointer: function (a, b, c, d, e) {
            return (
               "undefined" == typeof c && (c = 60),
               "undefined" == typeof b && (b = this.game.input.activePointer),
               "undefined" == typeof d && (d = 1e3),
               "undefined" == typeof e && (e = 1e3),
               (this._angle = this.angleToPointer(a, b)),
               a.body.acceleration.setTo(
                  Math.cos(this._angle) * c,
                  Math.sin(this._angle) * c
               ),
               a.body.maxVelocity.setTo(d, e),
               this._angle
            );
         },
         accelerateToXY: function (a, b, c, d, e, f) {
            return (
               "undefined" == typeof d && (d = 60),
               "undefined" == typeof e && (e = 1e3),
               "undefined" == typeof f && (f = 1e3),
               (this._angle = this.angleToXY(a, b, c)),
               a.body.acceleration.setTo(
                  Math.cos(this._angle) * d,
                  Math.sin(this._angle) * d
               ),
               a.body.maxVelocity.setTo(e, f),
               this._angle
            );
         },
         distanceBetween: function (a, b) {
            return (
               (this._dx = a.x - b.x),
               (this._dy = a.y - b.y),
               Math.sqrt(this._dx * this._dx + this._dy * this._dy)
            );
         },
         distanceToXY: function (a, b, c) {
            return (
               (this._dx = a.x - b),
               (this._dy = a.y - c),
               Math.sqrt(this._dx * this._dx + this._dy * this._dy)
            );
         },
         distanceToPointer: function (a, b) {
            return (
               (b = b || this.game.input.activePointer),
               (this._dx = a.x - b.x),
               (this._dy = a.y - b.y),
               Math.sqrt(this._dx * this._dx + this._dy * this._dy)
            );
         },
         angleBetween: function (a, b) {
            return (
               (this._dx = b.x - a.x),
               (this._dy = b.y - a.y),
               Math.atan2(this._dy, this._dx)
            );
         },
         angleToXY: function (a, b, c) {
            return (
               (this._dx = b - a.x),
               (this._dy = c - a.y),
               Math.atan2(this._dy, this._dx)
            );
         },
         angleToPointer: function (a, b) {
            return (
               (b = b || this.game.input.activePointer),
               (this._dx = b.worldX - a.x),
               (this._dy = b.worldY - a.y),
               Math.atan2(this._dy, this._dx)
            );
         },
      }),
      (c.Physics.Arcade.prototype.constructor = c.Physics.Arcade),
      (c.Physics.Arcade.Body = function (a) {
         (this.sprite = a),
            (this.game = a.game),
            (this.offset = new c.Point()),
            (this.preX = a.world.x),
            (this.preY = a.world.y),
            (this.preRotation = a.angle),
            (this.velocity = new c.Point()),
            (this.acceleration = new c.Point()),
            (this.speed = 0),
            (this.angle = 0),
            (this.gravity = new c.Point()),
            (this.bounce = new c.Point()),
            (this.minVelocity = new c.Point()),
            (this.maxVelocity = new c.Point(1e3, 1e3)),
            (this.angularVelocity = 0),
            (this.angularAcceleration = 0),
            (this.angularDrag = 0),
            (this.maxAngular = 1e3),
            (this.mass = 1),
            (this.linearDamping = 0),
            (this.checkCollision = {
               none: !1,
               any: !0,
               up: !0,
               down: !0,
               left: !0,
               right: !0,
            }),
            (this.touching = {
               none: !0,
               up: !1,
               down: !1,
               left: !1,
               right: !1,
            }),
            (this.blocked = {
               x: 0,
               y: 0,
               up: !1,
               down: !1,
               left: !1,
               right: !1,
            }),
            (this.facing = c.NONE),
            (this.rebound = !0),
            (this.immovable = !1),
            (this.moves = !0),
            (this.rotation = 0),
            (this.allowRotation = !0),
            (this.allowGravity = !0),
            (this.customSeparateCallback = null),
            (this.customSeparateContext = null),
            (this.collideCallback = null),
            (this.collideCallbackContext = null),
            (this.collideWorldBounds = !1),
            (this.type = c.Physics.Arcade.RECT),
            (this.shape = null),
            (this.polygon = null),
            (this.left = 0),
            (this.right = 0),
            (this.top = 0),
            (this.bottom = 0),
            (this.width = 0),
            (this.height = 0),
            (this.contacts = []),
            (this.overlapX = 0),
            (this.overlapY = 0),
            (this._temp = null),
            (this._dx = 0),
            (this._dy = 0),
            (this._sx = a.scale.x),
            (this._sy = a.scale.y),
            (this._distances = [0, 0, 0, 0]),
            (this._vx = 0),
            (this._vy = 0),
            this.setRectangle(a.width, a.height, 0, 0),
            (this.sprite.events.onBeginContact = new c.Signal()),
            (this.sprite.events.onEndContact = new c.Signal());
      }),
      (c.Physics.Arcade.Body.prototype = {
         updateScale: function () {
            this.polygon
               ? this.polygon.scale(
                    this.sprite.scale.x / this._sx,
                    this.sprite.scale.y / this._sy
                 )
               : (this.shape.r *= Math.max(
                    this.sprite.scale.x,
                    this.sprite.scale.y
                 )),
               (this._sx = this.sprite.scale.x),
               (this._sy = this.sprite.scale.y);
         },
         preUpdate: function () {
            (this.x =
               this.sprite.world.x -
               this.sprite.anchor.x * this.sprite.width +
               this.offset.x),
               (this.y =
                  this.sprite.world.y -
                  this.sprite.anchor.y * this.sprite.height +
                  this.offset.y),
               (this.preX = this.x),
               (this.preY = this.y),
               (this.preRotation = this.sprite.angle),
               (this.rotation = this.preRotation),
               (this.sprite.scale.x !== this._sx ||
                  this.sprite.scale.y !== this._sy) &&
                  this.updateScale(),
               this.checkBlocked(),
               (this.touching.none = !0),
               (this.touching.up = !1),
               (this.touching.down = !1),
               (this.touching.left = !1),
               (this.touching.right = !1),
               this.moves
                  ? ((this._vx !== this.velocity.x ||
                       this._vy !== this.velocity.y) &&
                       ((this._vx = this.velocity.x),
                       (this._vy = this.velocity.y),
                       (this.speed = Math.sqrt(
                          this.velocity.x * this.velocity.x +
                             this.velocity.y * this.velocity.y
                       )),
                       (this.angle = Math.atan2(
                          this.velocity.y,
                          this.velocity.x
                       ))),
                    this.game.physics.checkBounds(this) &&
                       this.reboundCheck(!0, !0, !0),
                    this.applyDamping(),
                    this.integrateVelocity(),
                    this.updateBounds(),
                    this.checkBlocked())
                  : this.updateBounds();
         },
         checkBlocked: function () {
            (!this.blocked.left && !this.blocked.right) ||
               (Math.floor(this.x) === this.blocked.x &&
                  Math.floor(this.y) === this.blocked.y) ||
               ((this.blocked.left = !1), (this.blocked.right = !1)),
               (!this.blocked.up && !this.blocked.down) ||
                  (Math.floor(this.x) === this.blocked.x &&
                     Math.floor(this.y) === this.blocked.y) ||
                  ((this.blocked.up = !1), (this.blocked.down = !1));
         },
         updateBounds: function () {
            this.type === c.Physics.Arcade.CIRCLE
               ? ((this.left = this.shape.pos.x - this.shape.r),
                 (this.right = this.shape.pos.x + this.shape.r),
                 (this.top = this.shape.pos.y - this.shape.r),
                 (this.bottom = this.shape.pos.y + this.shape.r))
               : ((this.left =
                    c.Math.minProperty("x", this.polygon.points) +
                    this.polygon.pos.x),
                 (this.right =
                    c.Math.maxProperty("x", this.polygon.points) +
                    this.polygon.pos.x),
                 (this.top =
                    c.Math.minProperty("y", this.polygon.points) +
                    this.polygon.pos.y),
                 (this.bottom =
                    c.Math.maxProperty("y", this.polygon.points) +
                    this.polygon.pos.y)),
               (this.width = this.right - this.left),
               (this.height = this.bottom - this.top);
         },
         applyDamping: function () {
            this.linearDamping > 0 &&
               this.acceleration.isZero() &&
               (this.speed > this.linearDamping
                  ? (this.speed -= this.linearDamping)
                  : (this.speed = 0),
               (this.speed > 0 || !this.velocity.isZero()) &&
                  ((this.velocity.x = Math.cos(this.angle) * this.speed),
                  (this.velocity.y = Math.sin(this.angle) * this.speed),
                  (this.speed = Math.sqrt(
                     this.velocity.x * this.velocity.x +
                        this.velocity.y * this.velocity.y
                  )),
                  (this.angle = Math.atan2(this.velocity.y, this.velocity.x))));
         },
         reboundCheck: function (a, b, c) {
            if (
               a &&
               (c &&
                  0 !== this.bounce.x &&
                  (this.blocked.left ||
                     this.blocked.right ||
                     this.touching.left ||
                     this.touching.right) &&
                  ((this._vx <= 0 && this.velocity.x > 0) ||
                     (this._vx >= 0 && this.velocity.x < 0) ||
                     ((this.velocity.x *= -this.bounce.x),
                     (this.angle = Math.atan2(
                        this.velocity.y,
                        this.velocity.x
                     )))),
               0 === this.bounce.x ||
                  Math.abs(this.velocity.x) < this.minVelocity.x)
            ) {
               var d = this.getUpwardForce();
               (((this.blocked.left || this.touching.left) &&
                  (0 > d || this.velocity.x < 0)) ||
                  ((this.blocked.right || this.touching.right) &&
                     (d > 0 || this.velocity.x > 0))) &&
                  (this.velocity.x = 0);
            }
            if (
               b &&
               (c &&
                  0 !== this.bounce.y &&
                  (this.blocked.up ||
                     this.blocked.down ||
                     this.touching.up ||
                     this.touching.down) &&
                  ((this._vy <= 0 && this.velocity.y > 0) ||
                     (this._vy >= 0 && this.velocity.y < 0) ||
                     ((this.velocity.y *= -this.bounce.y),
                     (this.angle = Math.atan2(
                        this.velocity.y,
                        this.velocity.x
                     )))),
               0 === this.bounce.y ||
                  Math.abs(this.velocity.y) < this.minVelocity.y)
            ) {
               var e = this.getDownwardForce();
               (((this.blocked.up || this.touching.up) &&
                  (0 > e || this.velocity.y < 0)) ||
                  ((this.blocked.down || this.touching.down) &&
                     (e > 0 || this.velocity.y > 0))) &&
                  (this.velocity.y = 0);
            }
         },
         getUpwardForce: function () {
            return this.allowGravity
               ? this.gravity.x + this.game.physics.gravity.x + this.velocity.x
               : this.gravity.x + this.velocity.x;
         },
         getDownwardForce: function () {
            return this.allowGravity
               ? this.gravity.y + this.game.physics.gravity.y + this.velocity.y
               : this.gravity.y + this.velocity.y;
         },
         sub: function (a) {
            (this.x -= a.x), (this.y -= a.y);
         },
         add: function (a) {
            (this.x += a.x), (this.y += a.y);
         },
         give: function (a, b) {
            this.add(b.overlapV),
               this.rebound &&
                  (this.processRebound(a, b.overlapN),
                  this.reboundCheck(!0, !0, !1),
                  a.reboundCheck(!0, !0, !1));
         },
         take: function (a, b) {
            this.sub(b.overlapV),
               this.rebound &&
                  (this.processRebound(a, b.overlapN),
                  this.reboundCheck(!0, !0, !1),
                  a.reboundCheck(!0, !0, !1));
         },
         split: function (a, b) {
            b.overlapV.scale(0.5),
               this.sub(b.overlapV),
               a.add(b.overlapV),
               this.rebound &&
                  (this.exchange(a),
                  this.reboundCheck(!0, !0, !1),
                  a.reboundCheck(!0, !0, !1));
         },
         exchange: function (a) {
            if (this.mass === a.mass && this.speed > 0 && a.speed > 0)
               (this._dx = a.velocity.x),
                  (this._dy = a.velocity.y),
                  (a.velocity.x = this.velocity.x * a.bounce.x),
                  (a.velocity.y = this.velocity.y * a.bounce.x),
                  (this.velocity.x = this._dx * this.bounce.x),
                  (this.velocity.y = this._dy * this.bounce.y);
            else {
               var b =
                     Math.sqrt(
                        (a.velocity.x * a.velocity.x * a.mass) / this.mass
                     ) * (a.velocity.x > 0 ? 1 : -1),
                  c =
                     Math.sqrt(
                        (this.velocity.x * this.velocity.x * this.mass) / a.mass
                     ) * (this.velocity.x > 0 ? 1 : -1),
                  d = 0.5 * (b + c);
               (b -= d),
                  (c -= d),
                  (this.velocity.x = b),
                  (a.velocity.x = c),
                  (b =
                     Math.sqrt(
                        (a.velocity.y * a.velocity.y * a.mass) / this.mass
                     ) * (a.velocity.y > 0 ? 1 : -1)),
                  (c =
                     Math.sqrt(
                        (this.velocity.y * this.velocity.y * this.mass) / a.mass
                     ) * (this.velocity.y > 0 ? 1 : -1)),
                  (d = 0.5 * (b + c)),
                  (b -= d),
                  (c -= d),
                  (this.velocity.y = b),
                  (a.velocity.y = c);
            }
         },
         processRebound: function (a, b) {
            (this._vx <= 0 && this.velocity.x > 0) ||
               (this._vx >= 0 && this.velocity.x < 0) ||
               (0 != b.x &&
                  (this.velocity.x =
                     a.velocity.x - this.velocity.x * this.bounce.x)),
               (this._vy <= 0 && this.velocity.y > 0) ||
                  (this._vy >= 0 && this.velocity.y < 0) ||
                  (0 != b.y &&
                     (this.velocity.y =
                        a.velocity.y - this.velocity.y * this.bounce.y)),
               (this.angle = Math.atan2(this.velocity.y, this.velocity.x)),
               this.reboundCheck(!0, !0, !1);
         },
         overlap: function (a, b) {
            var d = !1;
            return (
               (this.type !== c.Physics.Arcade.RECT &&
                  this.type !== c.Physics.Arcade.POLYGON) ||
               (a.type !== c.Physics.Arcade.RECT &&
                  a.type !== c.Physics.Arcade.POLYGON)
                  ? this.type === c.Physics.Arcade.CIRCLE &&
                    a.type === c.Physics.Arcade.CIRCLE
                     ? (d = f.testCircleCircle(this.shape, a.shape, b))
                     : (this.type !== c.Physics.Arcade.RECT &&
                          this.type !== c.Physics.Arcade.POLYGON) ||
                       a.type !== c.Physics.Arcade.CIRCLE
                     ? this.type !== c.Physics.Arcade.CIRCLE ||
                       (a.type !== c.Physics.Arcade.RECT &&
                          a.type !== c.Physics.Arcade.POLYGON) ||
                       (d = f.testCirclePolygon(this.shape, a.polygon, b))
                     : (d = f.testPolygonCircle(this.polygon, a.shape, b))
                  : (d = f.testPolygonPolygon(this.polygon, a.polygon, b)),
               d || this.removeContact(a),
               d
            );
         },
         inContact: function (a) {
            return -1 != this.contacts.indexOf(a);
         },
         addContact: function (a) {
            return this.inContact(a)
               ? !1
               : (this.contacts.push(a),
                 this.sprite.events.onBeginContact.dispatch(
                    this.sprite,
                    a.sprite,
                    this,
                    a
                 ),
                 a.addContact(this),
                 !0);
         },
         removeContact: function (a) {
            return this.inContact(a)
               ? (this.contacts.splice(this.contacts.indexOf(a), 1),
                 this.sprite.events.onEndContact.dispatch(
                    this.sprite,
                    a.sprite,
                    this,
                    a
                 ),
                 a.removeContact(this),
                 !0)
               : !1;
         },
         separate: function (a, b) {
            if (
               ((this._distances[0] = a.right - this.x),
               (this._distances[1] = this.right - a.x),
               (this._distances[2] = a.bottom - this.y),
               (this._distances[3] = this.bottom - a.y),
               !b.overlapN.x ||
               (0 !== this._distances[0] && 0 !== this._distances[1])
                  ? !b.overlapN.y ||
                    (0 !== this._distances[2] && 0 !== this._distances[3]) ||
                    ((b.overlapN.x = !0), (b.overlapN.y = !1))
                  : ((b.overlapN.x = !1), (b.overlapN.y = !0)),
               this.customSeparateCallback)
            )
               return this.customSeparateCallback.call(
                  this.customSeparateContext,
                  this,
                  b,
                  this._distances
               );
            var c = !1;
            return (
               b.overlapN.x
                  ? this._distances[0] < this._distances[1]
                     ? (c = this.hitLeft(a, b))
                     : this._distances[1] < this._distances[0] &&
                       (c = this.hitRight(a, b))
                  : b.overlapN.y &&
                    (this._distances[2] < this._distances[3]
                       ? (c = this.hitTop(a, b))
                       : this._distances[3] < this._distances[2] &&
                         (c = this.hitBottom(a, b))),
               c
                  ? (this.game.physics.checkBounds(this),
                    this.game.physics.checkBounds(a))
                  : (this.checkCollision.up &&
                       this.checkCollision.down &&
                       this.checkCollision.left &&
                       this.checkCollision.right &&
                       a.checkCollision.up &&
                       a.checkCollision.down &&
                       a.checkCollision.left &&
                       a.checkCollision.right) ||
                    this.addContact(a),
               c
            );
         },
         hitLeft: function (a, b) {
            return this.checkCollision.left && a.checkCollision.right
               ? this.collideCallback &&
                 !this.collideCallback.call(
                    this.collideCallbackContext,
                    c.LEFT,
                    this,
                    a,
                    b
                 )
                  ? !1
                  : (!this.moves ||
                    this.immovable ||
                    this.blocked.right ||
                    this.touching.right
                       ? a.give(this, b)
                       : a.immovable || a.blocked.left || a.touching.left
                       ? this.take(a, b)
                       : this.split(a, b),
                    (this.touching.left = !0),
                    (a.touching.right = !0),
                    !0)
               : !1;
         },
         hitRight: function (a, b) {
            return this.checkCollision.right && a.checkCollision.left
               ? this.collideCallback &&
                 !this.collideCallback.call(
                    this.collideCallbackContext,
                    c.RIGHT,
                    this,
                    a
                 )
                  ? !1
                  : (!this.moves ||
                    this.immovable ||
                    this.blocked.left ||
                    this.touching.left
                       ? a.give(this, b)
                       : a.immovable || a.blocked.right || a.touching.right
                       ? this.take(a, b)
                       : this.split(a, b),
                    (this.touching.right = !0),
                    (a.touching.left = !0),
                    !0)
               : !1;
         },
         hitTop: function (a, b) {
            return this.checkCollision.up && a.checkCollision.down
               ? this.collideCallback &&
                 !this.collideCallback.call(
                    this.collideCallbackContext,
                    c.UP,
                    this,
                    a
                 )
                  ? !1
                  : (!this.moves ||
                    this.immovable ||
                    this.blocked.down ||
                    this.touching.down
                       ? a.give(this, b)
                       : a.immovable || a.blocked.up || a.touching.up
                       ? this.take(a, b)
                       : this.split(a, b),
                    (this.touching.up = !0),
                    (a.touching.down = !0),
                    !0)
               : !1;
         },
         hitBottom: function (a, b) {
            return this.checkCollision.down && a.checkCollision.up
               ? this.collideCallback &&
                 !this.collideCallback.call(
                    this.collideCallbackContext,
                    c.DOWN,
                    this,
                    a
                 )
                  ? !1
                  : (!this.moves ||
                    this.immovable ||
                    this.blocked.up ||
                    this.touching.up
                       ? a.give(this, b)
                       : a.immovable || a.blocked.down || a.touching.down
                       ? this.take(a, b)
                       : this.split(a, b),
                    (this.touching.down = !0),
                    (a.touching.up = !0),
                    !0)
               : !1;
         },
         integrateVelocity: function () {
            (this._temp = this.game.physics.updateMotion(this)),
               (this._dx =
                  this.game.time.physicsElapsed *
                  (this.velocity.x + this._temp.x / 2)),
               (this._dy =
                  this.game.time.physicsElapsed *
                  (this.velocity.y + this._temp.y / 2)),
               ((this._dx < 0 && !this.blocked.left && !this.touching.left) ||
                  (this._dx > 0 &&
                     !this.blocked.right &&
                     !this.touching.right)) &&
                  ((this.x += this._dx), (this.velocity.x += this._temp.x)),
               ((this._dy < 0 && !this.blocked.up && !this.touching.up) ||
                  (this._dy > 0 &&
                     !this.blocked.down &&
                     !this.touching.down)) &&
                  ((this.y += this._dy), (this.velocity.y += this._temp.y)),
               this.velocity.x > this.maxVelocity.x
                  ? (this.velocity.x = this.maxVelocity.x)
                  : this.velocity.x < -this.maxVelocity.x &&
                    (this.velocity.x = -this.maxVelocity.x),
               this.velocity.y > this.maxVelocity.y
                  ? (this.velocity.y = this.maxVelocity.y)
                  : this.velocity.y < -this.maxVelocity.y &&
                    (this.velocity.y = -this.maxVelocity.y);
         },
         postUpdate: function () {
            this.moves &&
               (this.game.physics.checkBounds(this),
               this.reboundCheck(!0, !0, !0),
               (this._dx = this.deltaX()),
               (this._dy = this.deltaY()),
               this._dx < 0
                  ? (this.facing = c.LEFT)
                  : this._dx > 0 && (this.facing = c.RIGHT),
               this._dy < 0
                  ? (this.facing = c.UP)
                  : this._dy > 0 && (this.facing = c.DOWN),
               (0 !== this._dx || 0 !== this._dy) &&
                  ((this.sprite.x += this._dx), (this.sprite.y += this._dy)),
               this.allowRotation &&
                  0 !== this.deltaZ() &&
                  (this.sprite.angle += this.deltaZ()),
               (this.sprite.scale.x !== this._sx ||
                  this.sprite.scale.y !== this._sy) &&
                  this.updateScale());
         },
         reset: function (a) {
            "undefined" == typeof a && (a = !1),
               a &&
                  (this.gravity.setTo(0, 0),
                  this.bounce.setTo(0, 0),
                  this.minVelocity.setTo(5, 5),
                  this.maxVelocity.setTo(1e3, 1e3),
                  (this.angularDrag = 0),
                  (this.maxAngular = 1e3),
                  (this.mass = 1),
                  (this.friction = 0),
                  (this.checkCollision = {
                     none: !1,
                     any: !0,
                     up: !0,
                     down: !0,
                     left: !0,
                     right: !0,
                  })),
               this.velocity.setTo(0, 0),
               this.acceleration.setTo(0, 0),
               (this.angularVelocity = 0),
               (this.angularAcceleration = 0),
               (this.blocked = {
                  x: 0,
                  y: 0,
                  up: !1,
                  down: !1,
                  left: !1,
                  right: !1,
               }),
               (this.x =
                  this.sprite.world.x -
                  this.sprite.anchor.x * this.sprite.width +
                  this.offset.x),
               (this.y =
                  this.sprite.world.y -
                  this.sprite.anchor.y * this.sprite.height +
                  this.offset.y),
               (this.preX = this.x),
               (this.preY = this.y),
               this.updateBounds(),
               (this.contacts.length = 0);
         },
         destroy: function () {
            (this.sprite = null),
               (this.collideCallback = null),
               (this.collideCallbackContext = null),
               (this.customSeparateCallback = null),
               (this.customSeparateContext = null),
               (this.contacts.length = 0);
         },
         setCircle: function (a, b, d) {
            "undefined" == typeof b && (b = this.sprite._cache.halfWidth),
               "undefined" == typeof d && (d = this.sprite._cache.halfHeight),
               (this.type = c.Physics.Arcade.CIRCLE),
               (this.shape = new f.Circle(
                  new f.Vector(this.sprite.x, this.sprite.y),
                  a
               )),
               (this.polygon = null),
               this.offset.setTo(b, d);
         },
         setRectangle: function (a, b, d, e) {
            "undefined" == typeof a && (a = this.sprite.width),
               "undefined" == typeof b && (b = this.sprite.height),
               "undefined" == typeof d && (d = -this.sprite._cache.halfWidth),
               "undefined" == typeof e && (e = -this.sprite._cache.halfHeight),
               (this.type = c.Physics.Arcade.RECT),
               (this.shape = new f.Box(
                  new f.Vector(this.sprite.world.x, this.sprite.world.y),
                  a,
                  b
               )),
               (this.polygon = this.shape.toPolygon()),
               this.polygon.translate(d, e),
               this.offset.setTo(0, 0);
         },
         setPolygon: function (a) {
            if (
               ((this.type = c.Physics.Arcade.POLYGON),
               (this.shape = null),
               Array.isArray(a) || (a = Array.prototype.slice.call(arguments)),
               "number" == typeof a[0])
            ) {
               for (var b = [], d = 0, e = a.length; e > d; d += 2)
                  b.push(new f.Vector(a[d], a[d + 1]));
               a = b;
            }
            (this.polygon = new f.Polygon(
               new f.Vector(this.sprite.center.x, this.sprite.center.y),
               a
            )),
               this.offset.setTo(0, 0);
         },
         translate: function (a, b) {
            this.polygon && this.polygon.translate(a, b);
         },
         onFloor: function () {
            return this.blocked.down;
         },
         onWall: function () {
            return (
               !this.blocked.down && (this.blocked.left || this.blocked.right)
            );
         },
         deltaX: function () {
            return this.x - this.preX;
         },
         deltaY: function () {
            return this.y - this.preY;
         },
         deltaZ: function () {
            return this.rotation - this.preRotation;
         },
      }),
      (c.Physics.Arcade.Body.prototype.constructor = c.Physics.Arcade.Body),
      Object.defineProperty(c.Physics.Arcade.Body.prototype, "x", {
         get: function () {
            return this.type === c.Physics.Arcade.CIRCLE
               ? this.shape.pos.x
               : this.polygon.pos.x;
         },
         set: function (a) {
            this.type === c.Physics.Arcade.CIRCLE
               ? (this.shape.pos.x = a)
               : (this.polygon.pos.x = a);
         },
      }),
      Object.defineProperty(c.Physics.Arcade.Body.prototype, "y", {
         get: function () {
            return this.type === c.Physics.Arcade.CIRCLE
               ? this.shape.pos.y
               : this.polygon.pos.y;
         },
         set: function (a) {
            this.type === c.Physics.Arcade.CIRCLE
               ? (this.shape.pos.y = a)
               : (this.polygon.pos.y = a);
         },
      }),
      (c.Particles = function (a) {
         (this.game = a), (this.emitters = {}), (this.ID = 0);
      }),
      (c.Particles.prototype = {
         add: function (a) {
            return (this.emitters[a.name] = a), a;
         },
         remove: function (a) {
            delete this.emitters[a.name];
         },
         update: function () {
            for (var a in this.emitters)
               this.emitters[a].exists && this.emitters[a].update();
         },
      }),
      (c.Particles.prototype.constructor = c.Particles),
      (c.Particles.Arcade = {}),
      (c.Particles.Arcade.Emitter = function (a, b, d, e) {
         (this.maxParticles = e || 50),
            c.Group.call(this, a),
            (this.name = "emitter" + this.game.particles.ID++),
            (this.type = c.EMITTER),
            (this.x = 0),
            (this.y = 0),
            (this.width = 1),
            (this.height = 1),
            (this.minParticleSpeed = new c.Point(-100, -100)),
            (this.maxParticleSpeed = new c.Point(100, 100)),
            (this.minParticleScale = 1),
            (this.maxParticleScale = 1),
            (this.minRotation = -360),
            (this.maxRotation = 360),
            (this.gravity = 100),
            (this.particleClass = null),
            (this.particleFriction = 0),
            (this.angularDrag = 0),
            (this.frequency = 100),
            (this.lifespan = 2e3),
            (this.bounce = new c.Point()),
            (this._quantity = 0),
            (this._timer = 0),
            (this._counter = 0),
            (this._explode = !0),
            (this.on = !1),
            (this.exists = !0),
            (this.emitX = b),
            (this.emitY = d);
      }),
      (c.Particles.Arcade.Emitter.prototype = Object.create(c.Group.prototype)),
      (c.Particles.Arcade.Emitter.prototype.constructor =
         c.Particles.Arcade.Emitter),
      (c.Particles.Arcade.Emitter.prototype.update = function () {
         if (this.on)
            if (this._explode) {
               this._counter = 0;
               do {
                  this.emitParticle(), this._counter++;
               } while (this._counter < this._quantity);
               this.on = !1;
            } else
               this.game.time.now >= this._timer &&
                  (this.emitParticle(),
                  this._counter++,
                  this._quantity > 0 &&
                     this._counter >= this._quantity &&
                     (this.on = !1),
                  (this._timer = this.game.time.now + this.frequency));
      }),
      (c.Particles.Arcade.Emitter.prototype.makeParticles = function (
         a,
         b,
         d,
         e,
         f
      ) {
         "undefined" == typeof b && (b = 0),
            "undefined" == typeof d && (d = this.maxParticles),
            "undefined" == typeof e && (e = !1),
            "undefined" == typeof f && (f = !1);
         for (var g, h = 0, i = a, j = b; d > h; )
            null === this.particleClass &&
               ("object" == typeof a && (i = this.game.rnd.pick(a)),
               "object" == typeof b && (j = this.game.rnd.pick(b)),
               (g = new c.Sprite(this.game, 0, 0, i, j))),
               e
                  ? ((g.body.checkCollision.any = !0),
                    (g.body.checkCollision.none = !1))
                  : (g.body.checkCollision.none = !0),
               (g.body.collideWorldBounds = f),
               (g.exists = !1),
               (g.visible = !1),
               g.anchor.setTo(0.5, 0.5),
               this.add(g),
               h++;
         return this;
      }),
      (c.Particles.Arcade.Emitter.prototype.kill = function () {
         (this.on = !1), (this.alive = !1), (this.exists = !1);
      }),
      (c.Particles.Arcade.Emitter.prototype.revive = function () {
         (this.alive = !0), (this.exists = !0);
      }),
      (c.Particles.Arcade.Emitter.prototype.start = function (a, b, c, d) {
         "undefined" == typeof a && (a = !0),
            "undefined" == typeof b && (b = 0),
            "undefined" == typeof c && (c = 250),
            "undefined" == typeof d && (d = 0),
            this.revive(),
            (this.visible = !0),
            (this.on = !0),
            (this._explode = a),
            (this.lifespan = b),
            (this.frequency = c),
            a ? (this._quantity = d) : (this._quantity += d),
            (this._counter = 0),
            (this._timer = this.game.time.now + c);
      }),
      (c.Particles.Arcade.Emitter.prototype.emitParticle = function () {
         var a = this.getFirstExists(!1);
         if (null != a) {
            if (
               (this.width > 1 || this.height > 1
                  ? a.reset(
                       this.game.rnd.integerInRange(this.left, this.right),
                       this.game.rnd.integerInRange(this.top, this.bottom)
                    )
                  : a.reset(this.emitX, this.emitY),
               (a.lifespan = this.lifespan),
               a.body.bounce.setTo(this.bounce.x, this.bounce.y),
               (a.body.velocity.x =
                  this.minParticleSpeed.x != this.maxParticleSpeed.x
                     ? this.game.rnd.integerInRange(
                          this.minParticleSpeed.x,
                          this.maxParticleSpeed.x
                       )
                     : this.minParticleSpeed.x),
               (a.body.velocity.y =
                  this.minParticleSpeed.y != this.maxParticleSpeed.y
                     ? this.game.rnd.integerInRange(
                          this.minParticleSpeed.y,
                          this.maxParticleSpeed.y
                       )
                     : this.minParticleSpeed.y),
               (a.body.gravity.y = this.gravity),
               (a.body.angularVelocity =
                  this.minRotation != this.maxRotation
                     ? this.game.rnd.integerInRange(
                          this.minRotation,
                          this.maxRotation
                       )
                     : this.minRotation),
               1 !== this.minParticleScale || 1 !== this.maxParticleScale)
            ) {
               var b = this.game.rnd.realInRange(
                  this.minParticleScale,
                  this.maxParticleScale
               );
               a.scale.setTo(b, b);
            }
            (a.body.friction = this.particleFriction),
               (a.body.angularDrag = this.angularDrag);
         }
      }),
      (c.Particles.Arcade.Emitter.prototype.setSize = function (a, b) {
         (this.width = a), (this.height = b);
      }),
      (c.Particles.Arcade.Emitter.prototype.setXSpeed = function (a, b) {
         (a = a || 0),
            (b = b || 0),
            (this.minParticleSpeed.x = a),
            (this.maxParticleSpeed.x = b);
      }),
      (c.Particles.Arcade.Emitter.prototype.setYSpeed = function (a, b) {
         (a = a || 0),
            (b = b || 0),
            (this.minParticleSpeed.y = a),
            (this.maxParticleSpeed.y = b);
      }),
      (c.Particles.Arcade.Emitter.prototype.setRotation = function (a, b) {
         (a = a || 0),
            (b = b || 0),
            (this.minRotation = a),
            (this.maxRotation = b);
      }),
      (c.Particles.Arcade.Emitter.prototype.at = function (a) {
         a.center && ((this.emitX = a.center.x), (this.emitY = a.center.y));
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "alpha", {
         get: function () {
            return this._container.alpha;
         },
         set: function (a) {
            this._container.alpha = a;
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "visible", {
         get: function () {
            return this._container.visible;
         },
         set: function (a) {
            this._container.visible = a;
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "x", {
         get: function () {
            return this.emitX;
         },
         set: function (a) {
            this.emitX = a;
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "y", {
         get: function () {
            return this.emitY;
         },
         set: function (a) {
            this.emitY = a;
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "left", {
         get: function () {
            return Math.floor(this.x - this.width / 2);
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "right", {
         get: function () {
            return Math.floor(this.x + this.width / 2);
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "top", {
         get: function () {
            return Math.floor(this.y - this.height / 2);
         },
      }),
      Object.defineProperty(c.Particles.Arcade.Emitter.prototype, "bottom", {
         get: function () {
            return Math.floor(this.y + this.height / 2);
         },
      }),
      (c.Tile = function (a, b, c, d, e, f) {
         (this.layer = a),
            (this.index = b),
            (this.x = c),
            (this.y = d),
            (this.width = e),
            (this.height = f),
            (this.alpha = 1),
            (this.properties = {}),
            (this.scanned = !1),
            (this.faceTop = !1),
            (this.faceBottom = !1),
            (this.faceLeft = !1),
            (this.faceRight = !1),
            (this.collides = !1),
            (this.collideNone = !0),
            (this.collideLeft = !1),
            (this.collideRight = !1),
            (this.collideUp = !1),
            (this.collideDown = !1),
            (this.callback = null),
            (this.callbackContext = this);
      }),
      (c.Tile.prototype = {
         setCollisionCallback: function (a, b) {
            (this.collisionCallbackContext = b), (this.collisionCallback = a);
         },
         destroy: function () {
            (this.collisionCallback = null),
               (this.collisionCallbackContext = null),
               (this.properties = null);
         },
         setCollision: function (a, b, c, d) {
            (this.collideLeft = a),
               (this.collideRight = b),
               (this.collideUp = c),
               (this.collideDown = d),
               (this.collideNone = a || b || c || d ? !1 : !0);
         },
         resetCollision: function () {
            (this.collideNone = !0),
               (this.collideLeft = !1),
               (this.collideRight = !1),
               (this.collideUp = !1),
               (this.collideDown = !1);
         },
         copy: function (a) {
            (this.index = a.index),
               (this.alpha = a.alpha),
               (this.properties = a.properties),
               (this.collides = a.collides),
               (this.collideNone = a.collideNone),
               (this.collideUp = a.collideUp),
               (this.collideDown = a.collideDown),
               (this.collideLeft = a.collideLeft),
               (this.collideRight = a.collideRight),
               (this.collisionCallback = a.collisionCallback),
               (this.collisionCallbackContext = a.collisionCallbackContext);
         },
      }),
      (c.Tile.prototype.constructor = c.Tile),
      Object.defineProperty(c.Tile.prototype, "canCollide", {
         get: function () {
            return (
               this.collides ||
               this.collisionCallback ||
               this.layer.callbacks[this.index]
            );
         },
      }),
      Object.defineProperty(c.Tile.prototype, "left", {
         get: function () {
            return this.x;
         },
      }),
      Object.defineProperty(c.Tile.prototype, "right", {
         get: function () {
            return this.x + this.width;
         },
      }),
      Object.defineProperty(c.Tile.prototype, "top", {
         get: function () {
            return this.y;
         },
      }),
      Object.defineProperty(c.Tile.prototype, "bottom", {
         get: function () {
            return this.y + this.height;
         },
      }),
      (c.Tilemap = function (a, b) {
         (this.game = a), (this.key = b);
         var d = c.TilemapParser.parse(this.game, b);
         null !== d &&
            ((this.width = d.width),
            (this.height = d.height),
            (this.tileWidth = d.tileWidth),
            (this.tileHeight = d.tileHeight),
            (this.orientation = d.orientation),
            (this.version = d.version),
            (this.properties = d.properties),
            (this.widthInPixels = d.widthInPixels),
            (this.heightInPixels = d.heightInPixels),
            (this.layers = d.layers),
            (this.tilesets = d.tilesets),
            (this.tiles = d.tiles),
            (this.objects = d.objects),
            (this.images = d.images),
            (this.currentLayer = 0),
            (this.debugMap = []),
            (this._results = []),
            (this._tempA = 0),
            (this._tempB = 0));
      }),
      (c.Tilemap.CSV = 0),
      (c.Tilemap.TILED_JSON = 1),
      (c.Tilemap.prototype = {
         create: function (a, b, d) {
            for (var e = [], f = 0; d > f; f++) {
               e[f] = [];
               for (var g = 0; b > g; g++) e[f][g] = 0;
            }
            this.layers.push({
               name: a,
               width: b,
               height: d,
               alpha: 1,
               visible: !0,
               tileMargin: 0,
               tileSpacing: 0,
               format: c.Tilemap.CSV,
               data: e,
               indexes: [],
               dirty: !0,
            }),
               (this.currentLayer = this.layers.length - 1);
         },
         addTilesetImage: function (a, b) {
            if ("undefined" == typeof b) {
               if ("string" != typeof a) return !1;
               b = a;
            }
            return (
               "string" == typeof a && (a = this.getTilesetIndex(a)),
               this.tilesets[a]
                  ? ((this.tilesets[a].image = this.game.cache.getImage(b)), !0)
                  : !1
            );
         },
         createFromObjects: function (a, b, c, d, e, f, g) {
            if (
               ("undefined" == typeof e && (e = !0),
               "undefined" == typeof f && (f = !0),
               "undefined" == typeof g && (g = this.game.world),
               !this.objects[a])
            )
               return (
                  console.warn(
                     "Tilemap.createFromObjects: Invalid objectgroup name given: " +
                        a
                  ),
                  void 0
               );
            for (var h, i = 0, j = this.objects[a].length; j > i; i++)
               if (this.objects[a][i].gid === b) {
                  (h = g.create(
                     this.objects[a][i].x,
                     this.objects[a][i].y,
                     c,
                     d,
                     e
                  )),
                     h.anchor.setTo(0, 1),
                     (h.name = this.objects[a][i].name),
                     (h.visible = this.objects[a][i].visible),
                     (h.autoCull = f);
                  for (property in this.objects[a][i].properties)
                     g.set(
                        h,
                        property,
                        this.objects[a][i].properties[property],
                        !1,
                        !1,
                        0
                     );
               }
         },
         createLayer: function (a, b, d, e) {
            "undefined" == typeof b && (b = this.game.width),
               "undefined" == typeof d && (d = this.game.height),
               "undefined" == typeof e && (e = this.game.world);
            var f = a;
            return (
               "string" == typeof a && (f = this.getLayerIndex(a)),
               null === f || f > this.layers.length
                  ? (console.warn(
                       "Tilemap.createLayer: Invalid layer ID given: " + f
                    ),
                    void 0)
                  : e.add(new c.TilemapLayer(this.game, this, f, b, d))
            );
         },
         getIndex: function (a, b) {
            for (var c = 0; c < a.length; c++) if (a[c].name === b) return c;
            return null;
         },
         getLayerIndex: function (a) {
            return this.getIndex(this.layers, a);
         },
         getTilesetIndex: function (a) {
            return this.getIndex(this.tilesets, a);
         },
         getImageIndex: function (a) {
            return this.getIndex(this.images, a);
         },
         getObjectIndex: function (a) {
            return this.getIndex(this.objects, a);
         },
         setTileIndexCallback: function (a, b, c, d) {
            if (((d = this.getLayer(d)), "number" == typeof a))
               this.layers[d].callbacks[a] = {
                  callback: b,
                  callbackContext: c,
               };
            else
               for (var e = 0, f = a.length; f > e; e++)
                  this.layers[d].callbacks[a[e]] = {
                     callback: b,
                     callbackContext: c,
                  };
         },
         setTileLocationCallback: function (a, b, c, d, e, f, g) {
            if (
               ((g = this.getLayer(g)),
               this.copy(a, b, c, d, g),
               !(this._results.length < 2))
            )
               for (var h = 1; h < this._results.length; h++)
                  this._results[h].setCollisionCallback(e, f);
         },
         setCollision: function (a, b, c) {
            if (
               ("undefined" == typeof b && (b = !0),
               (c = this.getLayer(c)),
               "number" == typeof a)
            )
               return this.setCollisionByIndex(a, b, c, !0);
            for (var d = 0, e = a.length; e > d; d++)
               this.setCollisionByIndex(a[d], b, c, !1);
            this.calculateFaces(c);
         },
         setCollisionBetween: function (a, b, c, d) {
            if (
               ("undefined" == typeof c && (c = !0),
               (d = this.getLayer(d)),
               !(a > b))
            ) {
               for (var e = a; b >= e; e++)
                  this.setCollisionByIndex(e, c, d, !1);
               this.calculateFaces(d);
            }
         },
         setCollisionByExclusion: function (a, b, c) {
            "undefined" == typeof b && (b = !0), (c = this.getLayer(c));
            for (var d = 0, e = this.tiles.length; e > d; d++)
               -1 === a.indexOf(d) && this.setCollisionByIndex(d, b, c, !1);
            this.calculateFaces(c);
         },
         setCollisionByIndex: function (a, b, c, d) {
            "undefined" == typeof b && (b = !0),
               "undefined" == typeof c && (c = this.currentLayer),
               "undefined" == typeof d && (d = !0);
            for (var e = 0; e < this.layers[c].height; e++)
               for (var f = 0; f < this.layers[c].width; f++) {
                  var g = this.layers[c].data[e][f];
                  g &&
                     g.index === a &&
                     ((g.collides = b),
                     (g.faceTop = b),
                     (g.faceBottom = b),
                     (g.faceLeft = b),
                     (g.faceRight = b));
               }
            return d && this.calculateFaces(c), c;
         },
         getLayer: function (a) {
            return (
               "undefined" == typeof a
                  ? (a = this.currentLayer)
                  : "string" == typeof a
                  ? (a = this.getLayerIndex(a))
                  : a instanceof c.TilemapLayer && (a = a.index),
               a
            );
         },
         calculateFaces: function (a) {
            for (
               var b = null,
                  c = null,
                  d = null,
                  e = null,
                  f = 0,
                  g = this.layers[a].height;
               g > f;
               f++
            )
               for (var h = 0, i = this.layers[a].width; i > h; h++) {
                  var j = this.layers[a].data[f][h];
                  j &&
                     ((b = this.getTileAbove(a, h, f)),
                     (c = this.getTileBelow(a, h, f)),
                     (d = this.getTileLeft(a, h, f)),
                     (e = this.getTileRight(a, h, f)),
                     b && b.collides && (j.faceTop = !1),
                     c && c.collides && (j.faceBottom = !1),
                     d && d.collides && (j.faceLeft = !1),
                     e && e.collides && (j.faceRight = !1));
               }
         },
         getTileAbove: function (a, b, c) {
            return c > 0 ? this.layers[a].data[c - 1][b] : null;
         },
         getTileBelow: function (a, b, c) {
            return c < this.layers[a].height - 1
               ? this.layers[a].data[c + 1][b]
               : null;
         },
         getTileLeft: function (a, b, c) {
            return b > 0 ? this.layers[a].data[c][b - 1] : null;
         },
         getTileRight: function (a, b, c) {
            return b < this.layers[a].width - 1
               ? this.layers[a].data[c][b + 1]
               : null;
         },
         setLayer: function (a) {
            (a = this.getLayer(a)), this.layers[a] && (this.currentLayer = a);
         },
         putTile: function (a, b, d, e) {
            (e = this.getLayer(e)),
               b >= 0 &&
                  b < this.layers[e].width &&
                  d >= 0 &&
                  d < this.layers[e].height &&
                  (a instanceof c.Tile
                     ? this.layers[e].data[d][b].copy(a)
                     : (this.layers[e].data[d][b].index = a),
                  (this.layers[e].dirty = !0),
                  this.calculateFaces(e));
         },
         putTileWorldXY: function (a, b, c, d, e, f) {
            (f = this.getLayer(f)),
               (b = this.game.math.snapToFloor(b, d) / d),
               (c = this.game.math.snapToFloor(c, e) / e),
               this.putTile(a, b, c, f);
         },
         getTile: function (a, b, c) {
            return (
               (c = this.getLayer(c)),
               a >= 0 &&
               a < this.layers[c].width &&
               b >= 0 &&
               b < this.layers[c].height
                  ? this.layers[c].data[b][a]
                  : void 0
            );
         },
         getTileWorldXY: function (a, b, c, d, e) {
            return (
               (e = this.getLayer(e)),
               (a = this.game.math.snapToFloor(a, c) / c),
               (b = this.game.math.snapToFloor(b, d) / d),
               this.getTile(a, b, e)
            );
         },
         copy: function (a, b, c, d, e) {
            if (((e = this.getLayer(e)), !this.layers[e]))
               return (this._results.length = 0), void 0;
            "undefined" == typeof a && (a = 0),
               "undefined" == typeof b && (b = 0),
               "undefined" == typeof c && (c = this.layers[e].width),
               "undefined" == typeof d && (d = this.layers[e].height),
               0 > a && (a = 0),
               0 > b && (b = 0),
               c > this.layers[e].width && (c = this.layers[e].width),
               d > this.layers[e].height && (d = this.layers[e].height),
               (this._results.length = 0),
               this._results.push({
                  x: a,
                  y: b,
                  width: c,
                  height: d,
                  layer: e,
               });
            for (var f = b; b + d > f; f++)
               for (var g = a; a + c > g; g++)
                  this._results.push(this.layers[e].data[f][g]);
            return this._results;
         },
         paste: function (a, b, c, d) {
            if (
               ("undefined" == typeof a && (a = 0),
               "undefined" == typeof b && (b = 0),
               (d = this.getLayer(d)),
               c && !(c.length < 2))
            ) {
               for (
                  var e = a - c[1].x, f = b - c[1].y, g = 1;
                  g < c.length;
                  g++
               )
                  this.layers[d].data[f + c[g].y][e + c[g].x].copy(c[g]);
               (this.layers[d].dirty = !0), this.calculateFaces(d);
            }
         },
         swap: function (a, b, c, d, e, f, g) {
            (g = this.getLayer(g)),
               this.copy(c, d, e, f, g),
               this._results.length < 2 ||
                  ((this._tempA = a),
                  (this._tempB = b),
                  this._results.forEach(this.swapHandler, this),
                  this.paste(c, d, this._results, g));
         },
         swapHandler: function (a, b) {
            a.index === this._tempA
               ? (this._results[b].index = this._tempB)
               : a.index === this._tempB &&
                 (this._results[b].index = this._tempA);
         },
         forEach: function (a, b, c, d, e, f, g) {
            (g = this.getLayer(g)),
               this.copy(c, d, e, f, g),
               this._results.length < 2 ||
                  (this._results.forEach(a, b),
                  this.paste(c, d, this._results, g));
         },
         replace: function (a, b, c, d, e, f, g) {
            if (
               ((g = this.getLayer(g)),
               this.copy(c, d, e, f, g),
               !(this._results.length < 2))
            ) {
               for (var h = 1; h < this._results.length; h++)
                  this._results[h].index === a && (this._results[h].index = b);
               this.paste(c, d, this._results, g);
            }
         },
         random: function (a, b, c, d, e) {
            if (
               ((e = this.getLayer(e)),
               this.copy(a, b, c, d, e),
               !(this._results.length < 2))
            ) {
               for (var f = [], g = 1; g < this._results.length; g++)
                  if (this._results[g].index) {
                     var h = this._results[g].index;
                     -1 === f.indexOf(h) && f.push(h);
                  }
               for (var i = 1; i < this._results.length; i++)
                  this._results[i].index = this.game.rnd.pick(f);
               this.paste(a, b, this._results, e);
            }
         },
         shuffle: function (a, b, d, e, f) {
            if (
               ((f = this.getLayer(f)),
               this.copy(a, b, d, e, f),
               !(this._results.length < 2))
            ) {
               for (var g = [], h = 1; h < this._results.length; h++)
                  this._results[h].index && g.push(this._results[h].index);
               c.Utils.shuffle(g);
               for (var i = 1; i < this._results.length; i++)
                  this._results[i].index = g[i - 1];
               this.paste(a, b, this._results, f);
            }
         },
         fill: function (a, b, c, d, e, f) {
            if (
               ((f = this.getLayer(f)),
               this.copy(b, c, d, e, f),
               !(this._results.length < 2))
            ) {
               for (var g = 1; g < this._results.length; g++)
                  this._results[g].index = a;
               this.paste(b, c, this._results, f);
            }
         },
         removeAllLayers: function () {
            (this.layers.length = 0), (this.currentLayer = 0);
         },
         dump: function () {
            for (
               var a = "", b = [""], c = 0;
               c < this.layers[this.currentLayer].height;
               c++
            ) {
               for (var d = 0; d < this.layers[this.currentLayer].width; d++)
                  (a += "%c  "),
                     this.layers[this.currentLayer].data[c][d] > 1
                        ? this.debugMap[
                             this.layers[this.currentLayer].data[c][d]
                          ]
                           ? b.push(
                                "background: " +
                                   this.debugMap[
                                      this.layers[this.currentLayer].data[c][d]
                                   ]
                             )
                           : b.push("background: #ffffff")
                        : b.push("background: rgb(0, 0, 0)");
               a += "\n";
            }
            (b[0] = a), console.log.apply(console, b);
         },
         destroy: function () {
            this.removeAllLayers(), (this.data = []), (this.game = null);
         },
      }),
      (c.Tilemap.prototype.constructor = c.Tilemap),
      (c.TilemapLayer = function (a, d, e, f, g) {
         (this.game = a),
            (this.map = d),
            (this.index = e),
            (this.layer = d.layers[e]),
            (this.canvas = c.Canvas.create(f, g)),
            (this.context = this.canvas.getContext("2d")),
            (this.baseTexture = new b.BaseTexture(this.canvas)),
            (this.texture = new b.Texture(this.baseTexture)),
            (this.textureFrame = new c.Frame(
               0,
               0,
               0,
               f,
               g,
               "tilemapLayer",
               a.rnd.uuid()
            )),
            c.Sprite.call(
               this,
               this.game,
               0,
               0,
               this.texture,
               this.textureFrame
            ),
            (this.name = ""),
            (this.type = c.TILEMAPLAYER),
            (this.fixedToCamera = !0),
            (this.cameraOffset = new c.Point(0, 0)),
            (this.tileColor = "rgb(255, 255, 255)"),
            (this.debug = !1),
            (this.debugAlpha = 0.5),
            (this.debugColor = "rgba(0, 255, 0, 1)"),
            (this.debugFill = !1),
            (this.debugFillColor = "rgba(0, 255, 0, 0.2)"),
            (this.debugCallbackColor = "rgba(255, 0, 0, 1)"),
            (this.scrollFactorX = 1),
            (this.scrollFactorY = 1),
            (this.dirty = !0),
            (this._cw = d.tileWidth),
            (this._ch = d.tileHeight),
            (this._ga = 1),
            (this._dx = 0),
            (this._dy = 0),
            (this._dw = 0),
            (this._dh = 0),
            (this._tx = 0),
            (this._ty = 0),
            (this._tw = 0),
            (this._th = 0),
            (this._tl = 0),
            (this._maxX = 0),
            (this._maxY = 0),
            (this._startX = 0),
            (this._startY = 0),
            (this._results = []),
            (this._x = 0),
            (this._y = 0),
            (this._prevX = 0),
            (this._prevY = 0),
            this.updateMax();
      }),
      (c.TilemapLayer.prototype = Object.create(c.Sprite.prototype)),
      (c.TilemapLayer.prototype = c.Utils.extend(
         !0,
         c.TilemapLayer.prototype,
         c.Sprite.prototype,
         b.Sprite.prototype
      )),
      (c.TilemapLayer.prototype.constructor = c.TilemapLayer),
      (c.TilemapLayer.prototype.postUpdate = function () {
         c.Sprite.prototype.postUpdate.call(this),
            (this.scrollX = this.game.camera.x * this.scrollFactorX),
            (this.scrollY = this.game.camera.y * this.scrollFactorY),
            this.render();
      }),
      (c.TilemapLayer.prototype.resizeWorld = function () {
         this.game.world.setBounds(
            0,
            0,
            this.layer.widthInPixels,
            this.layer.heightInPixels
         );
      }),
      (c.TilemapLayer.prototype._fixX = function (a) {
         return (
            0 > a && (a = 0),
            1 === this.scrollFactorX
               ? a
               : this._x + (a - this._x / this.scrollFactorX)
         );
      }),
      (c.TilemapLayer.prototype._unfixX = function (a) {
         return 1 === this.scrollFactorX
            ? a
            : this._x / this.scrollFactorX + (a - this._x);
      }),
      (c.TilemapLayer.prototype._fixY = function (a) {
         return (
            0 > a && (a = 0),
            1 === this.scrollFactorY
               ? a
               : this._y + (a - this._y / this.scrollFactorY)
         );
      }),
      (c.TilemapLayer.prototype._unfixY = function (a) {
         return 1 === this.scrollFactorY
            ? a
            : this._y / this.scrollFactorY + (a - this._y);
      }),
      (c.TilemapLayer.prototype.getTileX = function (a) {
         return (
            this.game.math.snapToFloor(this._fixX(a), this.map.tileWidth) /
            this.map.tileWidth
         );
      }),
      (c.TilemapLayer.prototype.getTileY = function (a) {
         return (
            this.game.math.snapToFloor(this._fixY(a), this.map.tileHeight) /
            this.map.tileHeight
         );
      }),
      (c.TilemapLayer.prototype.getTileXY = function (a, b, c) {
         return (c.x = this.getTileX(a)), (c.y = this.getTileY(b)), c;
      }),
      (c.TilemapLayer.prototype.getTiles = function (a, b, c, d, e) {
         "undefined" == typeof e && (e = !1),
            (a = this._fixX(a)),
            (b = this._fixY(b)),
            c > this.layer.widthInPixels && (c = this.layer.widthInPixels),
            d > this.layer.heightInPixels && (d = this.layer.heightInPixels),
            (this._tx = this.game.math.snapToFloor(a, this._cw) / this._cw),
            (this._ty = this.game.math.snapToFloor(b, this._ch) / this._ch),
            (this._tw =
               (this.game.math.snapToCeil(c, this._cw) + this._cw) / this._cw),
            (this._th =
               (this.game.math.snapToCeil(d, this._ch) + this._ch) / this._ch),
            (this._results.length = 0);
         for (var f = this._ty; f < this._ty + this._th; f++)
            for (var g = this._tx; g < this._tx + this._tw; g++)
               if (
                  this.layer.data[f] &&
                  this.layer.data[f][g] &&
                  (e === !1 || (e && this.layer.data[f][g].canCollide))
               ) {
                  var h = this._unfixX(g * this._cw) / this._cw,
                     i = this._unfixY(f * this._ch) / this._ch;
                  this._results.push({
                     x: h * this._cw,
                     y: i * this._ch,
                     right: h * this._cw + this._cw,
                     bottom: i * this._ch + this._ch,
                     tile: this.layer.data[f][g],
                     layer: this.layer.data[f][g].layer,
                  });
               }
         return this._results;
      }),
      (c.TilemapLayer.prototype.updateMax = function () {
         (this._maxX =
            this.game.math.ceil(this.canvas.width / this.map.tileWidth) + 1),
            (this._maxY =
               this.game.math.ceil(this.canvas.height / this.map.tileHeight) +
               1),
            this.layer &&
               (this._maxX > this.layer.width &&
                  (this._maxX = this.layer.width),
               this._maxY > this.layer.height &&
                  (this._maxY = this.layer.height)),
            (this.dirty = !0);
      }),
      (c.TilemapLayer.prototype.render = function () {
         if (
            (this.layer.dirty && (this.dirty = !0), this.dirty && this.visible)
         ) {
            (this._prevX = this._dx),
               (this._prevY = this._dy),
               (this._dx = -(this._x - this._startX * this.map.tileWidth)),
               (this._dy = -(this._y - this._startY * this.map.tileHeight)),
               (this._tx = this._dx),
               (this._ty = this._dy),
               this.context.clearRect(
                  0,
                  0,
                  this.canvas.width,
                  this.canvas.height
               ),
               (this.context.fillStyle = this.tileColor);
            var a, d;
            this.debug && (this.context.globalAlpha = this.debugAlpha);
            for (
               var e = this._startY, f = this._startY + this._maxY;
               f > e;
               e++
            ) {
               this._column = this.layer.data[e];
               for (
                  var g = this._startX, h = this._startX + this._maxX;
                  h > g;
                  g++
               )
                  this._column[g] &&
                     ((a = this._column[g]),
                     this.map.tiles[a.index] &&
                        ((d = this.map.tilesets[this.map.tiles[a.index][2]]),
                        d.image
                           ? (this.debug === !1 &&
                                a.alpha !== this.context.globalAlpha &&
                                (this.context.globalAlpha = a.alpha),
                             d.tileWidth !== this.map.tileWidth ||
                             d.tileHeight !== this.map.tileHeight
                                ? this.context.drawImage(
                                     this.map.tilesets[
                                        this.map.tiles[a.index][2]
                                     ].image,
                                     this.map.tiles[a.index][0],
                                     this.map.tiles[a.index][1],
                                     d.tileWidth,
                                     d.tileHeight,
                                     Math.floor(this._tx),
                                     Math.floor(this._ty) -
                                        (d.tileHeight - this.map.tileHeight),
                                     d.tileWidth,
                                     d.tileHeight
                                  )
                                : this.context.drawImage(
                                     this.map.tilesets[
                                        this.map.tiles[a.index][2]
                                     ].image,
                                     this.map.tiles[a.index][0],
                                     this.map.tiles[a.index][1],
                                     this.map.tileWidth,
                                     this.map.tileHeight,
                                     Math.floor(this._tx),
                                     Math.floor(this._ty),
                                     this.map.tileWidth,
                                     this.map.tileHeight
                                  ),
                             a.debug &&
                                ((this.context.fillStyle =
                                   "rgba(0, 255, 0, 0.4)"),
                                this.context.fillRect(
                                   Math.floor(this._tx),
                                   Math.floor(this._ty),
                                   this.map.tileWidth,
                                   this.map.tileHeight
                                )))
                           : this.context.fillRect(
                                Math.floor(this._tx),
                                Math.floor(this._ty),
                                this.map.tileWidth,
                                this.map.tileHeight
                             ))),
                     (this._tx += this.map.tileWidth);
               (this._tx = this._dx), (this._ty += this.map.tileHeight);
            }
            return (
               this.debug &&
                  ((this.context.globalAlpha = 1), this.renderDebug()),
               this.game.renderType === c.WEBGL &&
                  b.texturesToUpdate.push(this.baseTexture),
               (this.dirty = !1),
               (this.layer.dirty = !1),
               !0
            );
         }
      }),
      (c.TilemapLayer.prototype.renderDebug = function () {
         (this._tx = this._dx),
            (this._ty = this._dy),
            (this.context.strokeStyle = this.debugColor),
            (this.context.fillStyle = this.debugFillColor);
         for (var a = this._startY, b = this._startY + this._maxY; b > a; a++) {
            this._column = this.layer.data[a];
            for (
               var c = this._startX, d = this._startX + this._maxX;
               d > c;
               c++
            ) {
               var e = this._column[c];
               e &&
                  (e.faceTop || e.faceBottom || e.faceLeft || e.faceRight) &&
                  ((this._tx = Math.floor(this._tx)),
                  this.debugFill &&
                     this.context.fillRect(
                        this._tx,
                        this._ty,
                        this._cw,
                        this._ch
                     ),
                  this.context.beginPath(),
                  e.faceTop &&
                     (this.context.moveTo(this._tx, this._ty),
                     this.context.lineTo(this._tx + this._cw, this._ty)),
                  e.faceBottom &&
                     (this.context.moveTo(this._tx, this._ty + this._ch),
                     this.context.lineTo(
                        this._tx + this._cw,
                        this._ty + this._ch
                     )),
                  e.faceLeft &&
                     (this.context.moveTo(this._tx, this._ty),
                     this.context.lineTo(this._tx, this._ty + this._ch)),
                  e.faceRight &&
                     (this.context.moveTo(this._tx + this._cw, this._ty),
                     this.context.lineTo(
                        this._tx + this._cw,
                        this._ty + this._ch
                     )),
                  this.context.stroke()),
                  e &&
                     (e.collisionCallback || e.layer.callbacks[e.index]) &&
                     ((this.context.fillStyle = this.debugCallbackColor),
                     this.context.fillRect(
                        this._tx,
                        this._ty,
                        this._cw,
                        this._ch
                     ),
                     (this.context.fillStyle = this.debugFillColor)),
                  (this._tx += this.map.tileWidth);
            }
            (this._tx = this._dx), (this._ty += this.map.tileHeight);
         }
      }),
      Object.defineProperty(c.TilemapLayer.prototype, "scrollX", {
         get: function () {
            return this._x;
         },
         set: function (a) {
            a !== this._x &&
               a >= 0 &&
               this.layer.widthInPixels > this.width &&
               ((this._x = a),
               this._x > this.layer.widthInPixels - this.width &&
                  (this._x = this.layer.widthInPixels - this.width),
               (this._startX = this.game.math.floor(
                  this._x / this.map.tileWidth
               )),
               this._startX < 0 && (this._startX = 0),
               this._startX + this._maxX > this.layer.width &&
                  (this._startX = this.layer.width - this._maxX),
               (this.dirty = !0));
         },
      }),
      Object.defineProperty(c.TilemapLayer.prototype, "scrollY", {
         get: function () {
            return this._y;
         },
         set: function (a) {
            a !== this._y &&
               a >= 0 &&
               this.layer.heightInPixels > this.height &&
               ((this._y = a),
               this._y > this.layer.heightInPixels - this.height &&
                  (this._y = this.layer.heightInPixels - this.height),
               (this._startY = this.game.math.floor(
                  this._y / this.map.tileHeight
               )),
               this._startY < 0 && (this._startY = 0),
               this._startY + this._maxY > this.layer.height &&
                  (this._startY = this.layer.height - this._maxY),
               (this.dirty = !0));
         },
      }),
      Object.defineProperty(c.TilemapLayer.prototype, "collisionWidth", {
         get: function () {
            return this._cw;
         },
         set: function (a) {
            (this._cw = a), (this.dirty = !0);
         },
      }),
      Object.defineProperty(c.TilemapLayer.prototype, "collisionHeight", {
         get: function () {
            return this._ch;
         },
         set: function (a) {
            (this._ch = a), (this.dirty = !0);
         },
      }),
      (c.TilemapParser = {
         tileset: function (a, b, d, e, f, g, h, i, j) {
            var k = a.cache.getTilesetImage(b);
            if (null === k)
               return (
                  console.warn(
                     "Phaser.TilemapParser.tileSet: Invalid image key given"
                  ),
                  null
               );
            var l = k.width,
               m = k.height;
            return (
               -1 === h && (h = Math.round(l / d)),
               -1 === i && (i = Math.round(m / e)),
               -1 === j && (j = h * i),
               0 === l || 0 === m || d > l || e > m || 0 === j
                  ? (console.warn(
                       "Phaser.TilemapParser.tileSet: width/height zero or width/height < given tileWidth/tileHeight"
                    ),
                    null)
                  : new c.Tileset(k, b, d, e, f, g, h, i, j)
            );
         },
         parse: function (a, b) {
            var d = a.cache.getTilemapData(b);
            return d
               ? d.format === c.Tilemap.CSV
                  ? this.parseCSV(d.data)
                  : d.format === c.Tilemap.TILED_JSON
                  ? this.parseTiledJSON(d.data)
                  : void 0
               : { layers: [], objects: [], images: [], tilesets: [] };
         },
         parseCSV: function (a) {
            a = a.trim();
            for (
               var b = [], c = a.split("\n"), d = c.length, e = 0, f = 0;
               f < c.length;
               f++
            ) {
               b[f] = [];
               for (var g = c[f].split(","), h = 0; h < g.length; h++)
                  b[f][h] = parseInt(g[h], 10);
               0 === e && (e = g.length);
            }
            return [
               {
                  name: "csv",
                  width: e,
                  height: d,
                  alpha: 1,
                  visible: !0,
                  indexes: [],
                  tileMargin: 0,
                  tileSpacing: 0,
                  data: b,
               },
            ];
         },
         parseTiledJSON: function (a) {
            if ("orthogonal" !== a.orientation)
               return (
                  console.warn(
                     "TilemapParser.parseTiledJSON: Only orthogonal map types are supported in this version of Phaser"
                  ),
                  null
               );
            var b = {};
            (b.width = a.width),
               (b.height = a.height),
               (b.tileWidth = a.tilewidth),
               (b.tileHeight = a.tileheight),
               (b.orientation = a.orientation),
               (b.version = a.version),
               (b.properties = a.properties),
               (b.widthInPixels = b.width * b.tileWidth),
               (b.heightInPixels = b.height * b.tileHeight);
            for (var d = [], e = 0; e < a.layers.length; e++)
               if ("tilelayer" === a.layers[e].type) {
                  var f = {
                     name: a.layers[e].name,
                     x: a.layers[e].x,
                     y: a.layers[e].y,
                     width: a.layers[e].width,
                     height: a.layers[e].height,
                     widthInPixels: a.layers[e].width * a.tilewidth,
                     heightInPixels: a.layers[e].height * a.tileheight,
                     alpha: a.layers[e].opacity,
                     visible: a.layers[e].visible,
                     properties: {},
                     indexes: [],
                     callbacks: [],
                  };
                  a.layers[e].properties &&
                     (f.properties = a.layers[e].properties);
                  for (
                     var g = 0,
                        h = [],
                        i = [],
                        j = 0,
                        k = a.layers[e].data.length;
                     k > j;
                     j++
                  )
                     a.layers[e].data[j] > 0
                        ? h.push(
                             new c.Tile(
                                f,
                                a.layers[e].data[j],
                                g,
                                i.length,
                                a.tilewidth,
                                a.tileheight
                             )
                          )
                        : h.push(null),
                        g++,
                        g === a.layers[e].width &&
                           (i.push(h), (g = 0), (h = []));
                  (f.data = i), d.push(f);
               }
            b.layers = d;
            for (var l = [], e = 0; e < a.layers.length; e++)
               if ("imagelayer" === a.layers[e].type) {
                  var m = {
                     name: a.layers[e].name,
                     image: a.layers[e].image,
                     x: a.layers[e].x,
                     y: a.layers[e].y,
                     alpha: a.layers[e].opacity,
                     visible: a.layers[e].visible,
                     properties: {},
                  };
                  a.layers[e].properties &&
                     (m.properties = a.layers[e].properties),
                     l.push(m);
               }
            b.images = l;
            for (var n = {}, e = 0; e < a.layers.length; e++)
               if ("objectgroup" === a.layers[e].type) {
                  n[a.layers[e].name] = [];
                  for (var o = 0, k = a.layers[e].objects.length; k > o; o++)
                     if (a.layers[e].objects[o].gid) {
                        var p = {
                           gid: a.layers[e].objects[o].gid,
                           name: a.layers[e].objects[o].name,
                           x: a.layers[e].objects[o].x,
                           y: a.layers[e].objects[o].y,
                           visible: a.layers[e].objects[o].visible,
                           properties: a.layers[e].objects[o].properties,
                        };
                        n[a.layers[e].name].push(p);
                     }
               }
            b.objects = n;
            for (var q = [], e = 0; e < a.tilesets.length; e++) {
               var r = a.tilesets[e],
                  s = new c.Tileset(
                     r.name,
                     r.firstgid,
                     r.tilewidth,
                     r.tileheight,
                     r.margin,
                     r.spacing,
                     r.properties
                  );
               r.tileproperties && (s.tileProperties = r.tileproperties),
                  (s.rows =
                     (r.imageheight - r.margin) / (r.tileheight + r.spacing)),
                  (s.columns =
                     (r.imagewidth - r.margin) / (r.tilewidth + r.spacing)),
                  (s.total = s.rows * s.columns),
                  (0 !== s.rows % 1 || 0 !== s.columns % 1) &&
                     console.warn(
                        "TileSet image dimensions do not match expected dimensions."
                     ),
                  q.push(s);
            }
            (b.tilesets = q), (b.tiles = []);
            for (var e = 0; e < b.tilesets.length; e++)
               for (
                  var r = b.tilesets[e],
                     g = r.tileMargin,
                     t = r.tileMargin,
                     u = 0,
                     v = 0,
                     w = 0,
                     j = r.firstgid;
                  j < r.firstgid + r.total &&
                  ((b.tiles[j] = [g, t, e]),
                  (g += r.tileWidth + r.tileSpacing),
                  u++,
                  u !== r.total) &&
                  (v++,
                  v !== r.columns ||
                     ((g = r.tileMargin),
                     (t += r.tileHeight + r.tileSpacing),
                     (v = 0),
                     w++,
                     w !== r.rows));
                  j++
               );
            return b;
         },
      }),
      (c.Tileset = function (a, b, c, d, e, f, g) {
         (this.name = a),
            (this.firstgid = b),
            (this.tileWidth = c),
            (this.tileHeight = d),
            (this.tileMargin = e),
            (this.tileSpacing = f),
            (this.properties = g),
            (this.image = null),
            (this.rows = 0),
            (this.columns = 0),
            (this.total = 0);
      }),
      (c.Tileset.prototype = {
         setSpacing: function (a, b) {
            (this.tileMargin = a), (this.tileSpacing = b);
         },
      }),
      (c.Tileset.prototype.constructor = c.Tileset),
      (b.CanvasRenderer.prototype.render = function (a) {
         (b.texturesToUpdate.length = 0),
            (b.texturesToDestroy.length = 0),
            b.visibleCount++,
            a.updateTransform(),
            this.context.setTransform(1, 0, 0, 1, 0, 0),
            c.CANVAS_CLEAR_RECT &&
               this.context.clearRect(0, 0, this.width, this.height),
            this.renderDisplayObject(a, !1),
            b.Texture.frameUpdates.length > 0 &&
               (b.Texture.frameUpdates.length = 0);
      }),
      (b.CanvasRenderer.prototype.renderDisplayObject = function (a, d) {
         var e = a.last._iNext;
         a = a.first;
         do {
            if (a.visible || d)
               if (a.renderable && 0 !== a.alpha) {
                  if (a instanceof b.Sprite)
                     a.texture.frame &&
                        ((this.context.globalAlpha = a.worldAlpha),
                        c.CANVAS_PX_ROUND
                           ? this.context.setTransform(
                                a.worldTransform[0],
                                a.worldTransform[3],
                                a.worldTransform[1],
                                a.worldTransform[4],
                                Math.floor(a.worldTransform[2]),
                                Math.floor(a.worldTransform[5])
                             )
                           : this.context.setTransform(
                                a.worldTransform[0],
                                a.worldTransform[3],
                                a.worldTransform[1],
                                a.worldTransform[4],
                                a.worldTransform[2],
                                a.worldTransform[5]
                             ),
                        a.texture.trimmed &&
                           this.context.transform(
                              1,
                              0,
                              0,
                              1,
                              a.texture.trim.x,
                              a.texture.trim.y
                           ),
                        this.smoothProperty &&
                           this.scaleMode !== a.texture.baseTexture.scaleMode &&
                           ((this.scaleMode = a.texture.baseTexture.scaleMode),
                           (this.context[this.smoothProperty] =
                              this.scaleMode ===
                              b.BaseTexture.SCALE_MODE.LINEAR)),
                        this.context.drawImage(
                           a.texture.baseTexture.source,
                           a.texture.frame.x,
                           a.texture.frame.y,
                           a.texture.frame.width,
                           a.texture.frame.height,
                           Math.floor(a.anchor.x * -a.texture.frame.width),
                           Math.floor(a.anchor.y * -a.texture.frame.height),
                           a.texture.frame.width,
                           a.texture.frame.height
                        ));
                  else if (a instanceof b.Strip)
                     this.context.setTransform(
                        a.worldTransform[0],
                        a.worldTransform[3],
                        a.worldTransform[1],
                        a.worldTransform[4],
                        a.worldTransform[2],
                        a.worldTransform[5]
                     ),
                        this.renderStrip(a);
                  else if (a instanceof b.TilingSprite)
                     this.context.setTransform(
                        a.worldTransform[0],
                        a.worldTransform[3],
                        a.worldTransform[1],
                        a.worldTransform[4],
                        a.worldTransform[2],
                        a.worldTransform[5]
                     ),
                        this.renderTilingSprite(a);
                  else if (a instanceof b.CustomRenderable)
                     a.renderCanvas(this);
                  else if (a instanceof b.Graphics)
                     this.context.setTransform(
                        a.worldTransform[0],
                        a.worldTransform[3],
                        a.worldTransform[1],
                        a.worldTransform[4],
                        a.worldTransform[2],
                        a.worldTransform[5]
                     ),
                        b.CanvasGraphics.renderGraphics(a, this.context);
                  else if (
                     a instanceof b.FilterBlock &&
                     a.data instanceof b.Graphics
                  ) {
                     var f = a.data;
                     if (a.open) {
                        this.context.save();
                        var g = f.alpha,
                           h = f.worldTransform;
                        this.context.setTransform(
                           h[0],
                           h[3],
                           h[1],
                           h[4],
                           h[2],
                           h[5]
                        ),
                           (f.worldAlpha = 0.5),
                           (this.context.worldAlpha = 0),
                           b.CanvasGraphics.renderGraphicsMask(f, this.context),
                           this.context.clip(),
                           (f.worldAlpha = g);
                     } else this.context.restore();
                  }
                  a = a._iNext;
               } else a = a._iNext;
            else a = a.last._iNext;
         } while (a != e);
      }),
      (b.WebGLBatch.prototype.update = function () {
         for (
            var a,
               c,
               d,
               e,
               f,
               g,
               h,
               i,
               j,
               k,
               l,
               m,
               n,
               o,
               p,
               q,
               r = 0,
               s = this.head;
            s;

         ) {
            if (s.vcount === b.visibleCount) {
               if (
                  ((c = s.texture.frame.width),
                  (d = s.texture.frame.height),
                  (e = s.anchor.x),
                  (f = s.anchor.y),
                  (g = c * (1 - e)),
                  (h = c * -e),
                  (i = d * (1 - f)),
                  (j = d * -f),
                  (k = 8 * r),
                  (a = s.worldTransform),
                  (l = a[0]),
                  (m = a[3]),
                  (n = a[1]),
                  (o = a[4]),
                  (p = a[2]),
                  (q = a[5]),
                  s.texture.trimmed &&
                     ((p += s.texture.trim.x), (q += s.texture.trim.y)),
                  (this.verticies[k + 0] = l * h + n * j + p),
                  (this.verticies[k + 1] = o * j + m * h + q),
                  (this.verticies[k + 2] = l * g + n * j + p),
                  (this.verticies[k + 3] = o * j + m * g + q),
                  (this.verticies[k + 4] = l * g + n * i + p),
                  (this.verticies[k + 5] = o * i + m * g + q),
                  (this.verticies[k + 6] = l * h + n * i + p),
                  (this.verticies[k + 7] = o * i + m * h + q),
                  s.updateFrame || s.texture.updateFrame)
               ) {
                  this.dirtyUVS = !0;
                  var t = s.texture,
                     u = t.frame,
                     v = t.baseTexture.width,
                     w = t.baseTexture.height;
                  (this.uvs[k + 0] = u.x / v),
                     (this.uvs[k + 1] = u.y / w),
                     (this.uvs[k + 2] = (u.x + u.width) / v),
                     (this.uvs[k + 3] = u.y / w),
                     (this.uvs[k + 4] = (u.x + u.width) / v),
                     (this.uvs[k + 5] = (u.y + u.height) / w),
                     (this.uvs[k + 6] = u.x / v),
                     (this.uvs[k + 7] = (u.y + u.height) / w),
                     (s.updateFrame = !1);
               }
               if (s.cacheAlpha != s.worldAlpha) {
                  s.cacheAlpha = s.worldAlpha;
                  var x = 4 * r;
                  (this.colors[x] =
                     this.colors[x + 1] =
                     this.colors[x + 2] =
                     this.colors[x + 3] =
                        s.worldAlpha),
                     (this.dirtyColors = !0);
               }
            } else
               (k = 8 * r),
                  (this.verticies[k + 0] = 0),
                  (this.verticies[k + 1] = 0),
                  (this.verticies[k + 2] = 0),
                  (this.verticies[k + 3] = 0),
                  (this.verticies[k + 4] = 0),
                  (this.verticies[k + 5] = 0),
                  (this.verticies[k + 6] = 0),
                  (this.verticies[k + 7] = 0);
            r++, (s = s.__next);
         }
      }),
      c
   );
});
Game = {};
var w = 600;
var h = 400;
var sound = true;
var dead = 0;
function rand(num) {
   return Math.floor(Math.random() * num);
}
Game.Boot = function (game) {};
Game.Boot.prototype = {
   preload: function () {
      game.stage.backgroundColor = "#00a2ff";
      game.load.image("loading", "images/loading.png");
      game.load.image("loading2", "images/loading2.png");
   },
   create: function () {
      this.game.state.start("Load");
   },
};
Game.Load = function (game) {};
Game.Load.prototype = {
   preload: function () {
      label2 = game.add.text(
         Math.floor(w / 2) + 0.5,
         Math.floor(h / 2) - 15 + 0.5,
         "loading...",
         { font: "30px Arial", fill: "#fff" }
      );
      label2.anchor.setTo(0.5, 0.5);
      preloading2 = game.add.sprite(w / 2, h / 2 + 15, "loading2");
      preloading2.x -= preloading2.width / 2;
      preloading = game.add.sprite(w / 2, h / 2 + 19, "loading");
      preloading.x -= preloading.width / 2;
      game.load.setPreloadSprite(preloading);
      game.load.spritesheet("player", "images/player3.png", 24, 30);
      game.load.image("logo", "images/logo2.png");
      game.load.image("success", "images/success2.png");
      game.load.image("coin", "images/coin.png");
      game.load.image("enemy", "images/enemy.png");
      game.load.spritesheet("sound", "images/sound4.png", 28, 22);
      game.load.audio("coin", "sounds/coin.wav");
      game.load.audio("dead", "sounds/dead.wav");
      game.load.audio("yeah", "sounds/yeah.mp3");
      game.load.audio("jump", "sounds/jump.wav");
      game.load.audio("music", "sounds/music.wav");
      this.game.load.tilemap(
         "map1",
         "levels/1.json",
         null,
         Phaser.Tilemap.TILED_JSON
      );
      this.game.load.tilemap(
         "map2",
         "levels/2.json",
         null,
         Phaser.Tilemap.TILED_JSON
      );
      this.game.load.tilemap(
         "map3",
         "levels/3.json",
         null,
         Phaser.Tilemap.TILED_JSON
      );
      this.game.load.tilemap(
         "map4",
         "levels/4.json",
         null,
         Phaser.Tilemap.TILED_JSON
      );
      this.game.load.tilemap(
         "map5",
         "levels/5.json",
         null,
         Phaser.Tilemap.TILED_JSON
      );
      this.game.load.image("tiles", "images/tiles.png");
   },
   create: function () {
      game.state.start("Menu");
   },
};
Game.Menu = function (game) {};
Game.Menu.prototype = {
   create: function () {
      this.cursor = this.game.input.keyboard.createCursorKeys();
      var logo = game.add.sprite(w / 2, -150, "logo");
      logo.anchor.setTo(0.5, 0.5);
      game.add
         .tween(logo)
         .to({ y: 150 }, 1e3, Phaser.Easing.Bounce.Out)
         .start();
      var label = game.add.text(
         w / 2,
         h - 50,
         "press the UP arrow key to start",
         { font: "25px Arial", fill: "#fff" }
      );
      label.anchor.setTo(0.5, 0.5);
      label.alpha = 0;
      game.add.tween(label).delay(500).to({ alpha: 1 }, 500).start();
      this.sound_toggle = this.game.add.button(
         w - 70,
         50,
         "sound",
         this.toggle_sound,
         this
      );
      this.sound_toggle.alpha = 0;
      game.add
         .tween(this.sound_toggle)
         .delay(500)
         .to({ alpha: 1 }, 500)
         .start();
      game.add
         .tween(label)
         .to({ angle: 1 }, 500)
         .to({ angle: -1 }, 500)
         .loop()
         .start();
   },
   update: function () {
      if (this.cursor.up.isDown) this.game.state.start("Play");
   },
   toggle_sound: function () {
      if (this.sound_toggle.frame == 0) {
         this.sound_toggle.frame = 1;
         sound = false;
      } else {
         this.sound_toggle.frame = 0;
         sound = true;
      }
   },
};
Game.Play = function (game) {};
Game.Play.prototype = {
   create: function () {
      this.cursor = this.game.input.keyboard.createCursorKeys();
      this.player = this.game.add.sprite(w / 2 - 50, h / 2, "player");
      this.player.body.collideWorldBounds = true;
      game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      this.player.anchor.setTo(0.5, 0.5);
      this.coins_taken = 0;
      this.level = 1;
      dead = 0;
      this.playerJumpCount = 0;
      this.coins = game.add.group();
      this.enemies = game.add.group();
      this.labels = game.add.group();
      this.coin_s = game.add.sound("coin");
      this.coin_s.volume = 0.2;
      this.dead_s = game.add.sound("dead");
      this.dead_s.volume = 0.3;
      this.yeah_s = game.add.sound("yeah");
      this.yeah_s.volume = 0.3;
      this.jump_s = game.add.sound("jump");
      this.jump_s.volume = 0.2;
      this.music = game.add.sound("music");
      if (sound) this.music.play("", 0, 0.2, true);
      this.next_level();
   },
   update: function () {
      this.game.physics.collide(this.layer, this.player);
      this.game.physics.overlap(
         this.player,
         this.coins,
         this.take_coin,
         null,
         this
      );
      this.game.physics.overlap(
         this.enemies,
         this.layer,
         this.enemy_collide,
         null,
         this
      );
      this.game.physics.overlap(
         this.enemies,
         this.player,
         this.player_dead,
         null,
         this
      );
      this.player_movements();
      if (this.player.y < -30) this.player_dead();
      if (this.total_coins == this.coins_taken) this.next_level();
   },
   enemy_collide: function (e, layer) {
      if (e.move == 1) {
         if (e.direction < 0) e.body.velocity.x = 100;
         else e.body.velocity.x = -100;
      } else if (e.move == 2) {
         if (e.direction < 0) e.body.velocity.y = 100;
         else e.body.velocity.y = -100;
      }
      e.direction = e.direction * -1;
   },
   take_coin: function (player, coin) {
      if (!coin.alive) return;
      coin.alive = false;
      var t = this.game.add.tween(coin.scale).to({ x: 0, y: 0 }, 200).start();
      t.onComplete.add(function () {
         this.kill();
      }, coin);
      this.coins_taken += 1;
      if (sound) this.coin_s.play();
   },
   player_dead: function (sprite, tile) {
      dead += 1;
      if (sound) this.dead_s.play();
      if (this.level == 6) this.player.reset(w / 2 - 50, h / 2 - 100);
      else this.player.reset(w / 2 - 50, h / 2);
      this.player.body.gravity.y = 0;
      this.coins.callAll("kill");
      this.coins_taken = 0;
      this.map.createFromObjects(
         "objects",
         2,
         "coin",
         0,
         true,
         false,
         this.coins
      );
      this.coins.forEachAlive(function (c) {
         c.anchor.setTo(0.5, 0.5);
         c.x += c.width / 2;
         c.y -= c.width / 2;
         var t = game.add.tween(c).to({ y: "-5" }, 300).to({ y: "+5" }, 300);
         t.loop(true).start();
      }, this);
   },
   next_level: function () {
      if (!this.player.alive) return;
      this.player.alive = false;
      if (this.level == 1) this.load_map();
      else {
         if (sound) this.yeah_s.play();
         var t = game.add.tween(this.player).to({ angle: 360 }, 600).start();
         this.player.body.gravity.y = 0;
         this.player.body.velocity.x = 0;
         this.player.body.velocity.y = 0;
         if (this.level == 6) {
            this.music.stop();
            t.onComplete.add(function () {
               this.game.state.start("Endd");
            }, this);
         } else t.onComplete.add(this.load_map, this);
      }
   },
   load_map: function () {
      this.clear_map();
      this.map = game.add.tilemap("map" + this.level);
      this.map.addTilesetImage("tiles_name", "tiles");
      this.map.setCollisionBetween(0, 1);
      this.map.setTileIndexCallback(3, this.player_dead, this);
      this.layer = this.map.createLayer("layer");
      this.map.createFromObjects(
         "objects",
         2,
         "coin",
         0,
         true,
         false,
         this.coins
      );
      this.map.createFromObjects(
         "objects",
         4,
         "enemy",
         0,
         true,
         false,
         this.enemies
      );
      this.map.createFromObjects(
         "objects",
         5,
         "enemy",
         0,
         true,
         false,
         this.enemies
      );
      this.map.createFromObjects("objects", 7, "", 0, true, false, this.labels);
      this.layer.resizeWorld();
      this.player.reset(w / 2 - 50, h / 2);
      if (this.level == 5) this.player.y -= 100;
      this.level += 1;
      this.player.alive = true;
      this.total_coins = 0;
      this.coins_taken = 0;
      this.add_objects();
   },
   add_objects: function () {
      this.coins.forEachAlive(function (c) {
         this.total_coins += 1;
         c.anchor.setTo(0.5, 0.5);
         c.x += c.width / 2;
         c.y -= c.width / 2;
         var t = game.add.tween(c).to({ y: "-5" }, 300).to({ y: "+5" }, 300);
         t.loop(true).start();
      }, this);
      this.enemies.forEachAlive(function (e) {
         if (e.move == 1) {
            e.body.velocity.x = 100;
            e.direction = 1;
         } else if (e.move == 2) {
            e.body.velocity.y = 100;
            e.direction = 1;
         }
      }, this);
      this.labels.forEachAlive(function (l) {
         l.label = game.add.text(l.x, l.y, l.text, {
            font: "22px Arial",
            fill: "#fff",
         });
         l.label.anchor.setTo(0.5, 1);
         l.label.x += 10;
      }, this);
   },
   clear_map: function () {
      if (this.layer) this.layer.destroy();
      this.coins.callAll("kill");
      this.enemies.callAll("kill");
      this.labels.forEachAlive(function (l) {
         l.label.destroy();
         l.kill();
      }, this);
   },
   player_movements: function () {
      this.player.body.velocity.x = 0;
      if (!this.player.alive) return;
      if (this.cursor.left.isDown) {
         if (this.player.scale.x == 1 || this.player.frame == 0) {
            this.player.scale.setTo(-1, 1);
            this.player.frame = 1;
         }
         if (this.player.body.blocked.down) this.player.body.velocity.x = -250;
         else this.player.body.velocity.x = -200;
      } else if (this.cursor.right.isDown) {
         if (this.player.scale.x == -1 || this.player.frame == 0) {
            this.player.scale.setTo(1, 1);
            this.player.frame = 1;
         }
         if (this.player.body.blocked.down) this.player.body.velocity.x = 250;
         else this.player.body.velocity.x = 200;
      } else this.player.frame = 0;
      if (this.player.body.blocked.down) this.player.body.gravity.y = 200;
      else this.player.body.gravity.y = 500;
      if (this.cursor.up.isDown && this.player.body.blocked.down) {
         this.player.body.velocity.y = -200;
         if (sound) this.jump_s.play();
         this.playerJumpCount = 1;
      } else if (
         this.cursor.up.isDown &&
         this.playerJumpCount < 12 &&
         this.playerJumpCount != 0
      ) {
         this.playerJumpCount += 1;
         this.player.body.velocity.y = -250;
      } else this.playerJumpCount = 0;
   },
};
Game.Endd = function (game) {};
Game.Endd.prototype = {
   create: function () {
      game.camera.follow(null);
      game.camera.setPosition(0, 0);
      this.cursor = this.game.input.keyboard.createCursorKeys();
      var logo = game.add.sprite(w / 2, 150, "success");
      logo.anchor.setTo(0.5, 0.5);
      logo.scale.setTo(0, 0);
      game.add
         .tween(logo.scale)
         .to({ x: 1, y: 1 }, 1e3, Phaser.Easing.Bounce.Out)
         .start();
      var label = game.add.text(
         w / 2,
         h - 100,
         "you died " + dead + " times\n\npress the UP arrow key to restart",
         { font: "25px Arial", fill: "#fff", align: "center" }
      );
      label.anchor.setTo(0.5, 0.5);
      label.alpha = 0;
      game.add.tween(label).delay(500).to({ alpha: 1 }, 500).start();
      game.add
         .tween(label)
         .to({ angle: 1 }, 500)
         .to({ angle: -1 }, 500)
         .loop()
         .start();
      this.time = this.game.time.now + 500;
   },
   update: function () {
      if (this.cursor.up.isDown && this.time < this.game.time.now)
         game.state.start("Play");
   },
};
var game = new Phaser.Game(w, h, Phaser.AUTO, "game");
game.state.add("Boot", Game.Boot);
game.state.add("Load", Game.Load);
game.state.add("Menu", Game.Menu);
game.state.add("Endd", Game.Endd);
game.state.add("Play", Game.Play);
game.state.start("Boot");
