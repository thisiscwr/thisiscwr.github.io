var EightBittr;
(function (h) {
  var k = (function () {
    function e(a) {
      void 0 === a && (a = {});
      var b = e.prototype.ensureCorrectCaller(this),
        c = a.constants,
        d = a.constantsSource || b;
      b.unitsize = a.unitsize || 1;
      if ((b.constants = c))
        for (a = 0; a < c.length; a += 1) b[c[a]] = d[c[a]];
    }
    e.prototype.reset = function (a, b, c) {
      var d, f;
      a.customs = c;
      for (f = 0; f < b.length; f += 1) {
        d = b[f];
        if (!a[d]) throw Error(d + " is missing on a resetting EightBittr.");
        a[d](a, c);
      }
    };
    e.prototype.resetTimed = function (a, b, c) {
      var d = performance.now(),
        f,
        e,
        g;
      this.resetTimes = { order: b, times: [] };
      for (g = 0; g < b.length; g += 1)
        (f = performance.now()),
          a[b[g]](a, c),
          (e = performance.now()),
          this.resetTimes.times.push({
            name: b[g],
            timeStart: f,
            timeEnd: e,
            timeTaken: e - f,
          });
      a = performance.now();
      this.resetTimes.total = {
        name: "resetTimed",
        timeStart: d,
        timeEnd: a,
        timeTaken: a - d,
      };
    };
    e.prototype.createCanvas = function (a, b) {
      var c = document.createElement("canvas"),
        d = c.getContext("2d");
      c.width = a;
      c.height = b;
      "undefined" !== typeof d.imageSmoothingEnabled
        ? (d.imageSmoothingEnabled = !1)
        : "undefined" !== typeof d.webkitImageSmoothingEnabled
        ? (d.webkitImageSmoothingEnabled = !1)
        : "undefined" !== typeof d.mozImageSmoothingEnabled
        ? (d.mozImageSmoothingEnabled = !1)
        : "undefined" !== typeof d.msImageSmoothingEnabled
        ? (d.msImageSmoothingEnabled = !1)
        : "undefined" !== typeof d.oImageSmoothingEnabled &&
          (d.oImageSmoothingEnabled = !1);
      return c;
    };
    e.prototype.shiftVert = function (a, b) {
      a.top += b;
      a.bottom += b;
    };
    e.prototype.shiftHoriz = function (a, b) {
      a.left += b;
      a.right += b;
    };
    e.prototype.setTop = function (a, b) {
      a.top = b;
      a.bottom = a.top + a.height * a.EightBitter.unitsize;
    };
    e.prototype.setRight = function (a, b) {
      a.right = b;
      a.left = a.right - a.width * a.EightBitter.unitsize;
    };
    e.prototype.setBottom = function (a, b) {
      a.bottom = b;
      a.top = a.bottom - a.height * a.EightBitter.unitsize;
    };
    e.prototype.setLeft = function (a, b) {
      a.left = b;
      a.right = a.left + a.width * a.EightBitter.unitsize;
    };
    e.prototype.setMidX = function (a, b) {
      a.EightBitter.setLeft(a, b - (a.width * a.EightBitter.unitsize) / 2);
    };
    e.prototype.setMidY = function (a, b) {
      a.EightBitter.setTop(a, b - (a.height * a.EightBitter.unitsize) / 2);
    };
    e.prototype.setMid = function (a, b, c) {
      a.EightBitter.setMidX(a, b);
      a.EightBitter.setMidY(a, c);
    };
    e.prototype.getMidX = function (a) {
      return a.left + (a.width * a.EightBitter.unitsize) / 2;
    };
    e.prototype.getMidY = function (a) {
      return a.top + (a.height * a.EightBitter.unitsize) / 2;
    };
    e.prototype.setMidObj = function (a, b) {
      a.EightBitter.setMidXObj(a, b);
      a.EightBitter.setMidYObj(a, b);
    };
    e.prototype.setMidXObj = function (a, b) {
      a.EightBitter.setLeft(
        a,
        a.EightBitter.getMidX(b) - (a.width * a.EightBitter.unitsize) / 2
      );
    };
    e.prototype.setMidYObj = function (a, b) {
      a.EightBitter.setTop(
        a,
        a.EightBitter.getMidY(b) - (a.height * a.EightBitter.unitsize) / 2
      );
    };
    e.prototype.objectToLeft = function (a, b) {
      return a.EightBitter.getMidX(a) < a.EightBitter.getMidX(b);
    };
    e.prototype.updateTop = function (a, b) {
      a.top += b || 0;
      a.bottom = a.top + a.height * a.EightBitter.unitsize;
    };
    e.prototype.updateRight = function (a, b) {
      a.right += b || 0;
      a.left = a.right - a.width * a.EightBitter.unitsize;
    };
    e.prototype.updateBottom = function (a, b) {
      a.bottom += b || 0;
      a.top = a.bottom - a.height * a.EightBitter.unitsize;
    };
    e.prototype.updateLeft = function (a, b) {
      a.left += b || 0;
      a.right = a.left + a.width * a.EightBitter.unitsize;
    };
    e.prototype.slideToX = function (a, b, c) {
      var d = a.EightBitter.getMidX(a);
      c = c || Infinity;
      d < b
        ? a.EightBitter.shiftHoriz(a, Math.min(c, b - d))
        : a.EightBitter.shiftHoriz(a, Math.max(-c, b - d));
    };
    e.prototype.slideToY = function (a, b, c) {
      var d = a.EightBitter.getMidY(a);
      c = c || Infinity;
      d < b
        ? a.EightBitter.shiftVert(a, Math.min(c, b - d))
        : a.EightBitter.shiftVert(a, Math.max(-c, b - d));
    };
    e.prototype.ensureCorrectCaller = function (a) {
      if (!(a instanceof e))
        throw Error(
          "A function requires the caller ('this') to be the manipulated EightBittr object. Unfortunately, 'this' is a " +
            typeof this +
            "."
        );
      return a;
    };
    e.prototype.proliferate = function (a, b, c) {
      void 0 === c && (c = !1);
      var d, f;
      for (f in b)
        !b.hasOwnProperty(f) ||
          (c && a.hasOwnProperty(f)) ||
          ((d = b[f]),
          "object" === typeof d
            ? (a.hasOwnProperty(f) || (a[f] = new d.constructor()),
              this.proliferate(a[f], d, c))
            : (a[f] = d));
      return a;
    };
    e.prototype.proliferateHard = function (a, b, c) {
      var d, f;
      for (f in b)
        !b.hasOwnProperty(f) ||
          (c && a[f]) ||
          ((d = b[f]),
          "object" === typeof d
            ? (a[f] || (a[f] = new d.constructor()),
              this.proliferate(a[f], d, c))
            : (a[f] = d));
      return a;
    };
    e.prototype.proliferateElement = function (a, b, c) {
      void 0 === c && (c = !1);
      var d, f, e;
      for (f in b)
        if (b.hasOwnProperty(f) && (!c || !a.hasOwnProperty(f)))
          switch (((d = b[f]), f)) {
            case "children":
            case "children":
              if ("undefined" !== typeof d)
                for (e = 0; e < d.length; e += 1) a.appendChild(d[e]);
              break;
            case "style":
              this.proliferate(a[f], d);
              break;
            default:
              null === d
                ? (a[f] = null)
                : "object" === typeof d
                ? (a.hasOwnProperty(f) || (a[f] = new d.constructor()),
                  this.proliferate(a[f], d, c))
                : (a[f] = d);
          }
      return a;
    };
    e.prototype.createElement = function (a) {
      for (var b = [], c = 1; c < arguments.length; c++)
        b[c - 1] = arguments[c];
      var c = e.prototype.ensureCorrectCaller(this),
        d = document.createElement(a || "div"),
        f;
      for (f = 0; f < b.length; f += 1) c.proliferateElement(d, b[f]);
      return d;
    };
    e.prototype.followPathHard = function (a, b, c) {
      for (void 0 === c && (c = 0); c < b.length; c += 1) {
        if ("undefined" === typeof a[b[c]]) return;
        a = a[b[c]];
      }
      return a;
    };
    e.prototype.arraySwitch = function (a, b, c) {
      b.splice(b.indexOf(a), 1);
      c.push(a);
    };
    e.prototype.arrayToBeginning = function (a, b) {
      b.splice(b.indexOf(a), 1);
      b.unshift(a);
    };
    e.prototype.arrayToEnd = function (a, b) {
      b.splice(b.indexOf(a), 1);
      b.push(a);
    };
    e.prototype.arrayToIndex = function (a, b, c) {
      b.splice(b.indexOf(a), 1);
      b.splice(c, 0, a);
    };
    return e;
  })();
  h.EightBittr = k;
})(EightBittr || (EightBittr = {}));
