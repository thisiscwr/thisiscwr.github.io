var TimeHandlr;
(function (f) {
  var g = (function () {
    function c(a, b, d, h, e) {
      this.count = 0;
      this.callback = a;
      this.repeat = b;
      this.timeRepeat = h;
      this.time = d + c.runCalculator(h, this);
      this.args = e;
    }
    c.runCalculator = function (a) {
      for (var b = [], d = 1; d < arguments.length; d++)
        b[d - 1] = arguments[d];
      return a.constructor === Number ? a : a.apply(void 0, b);
    };
    c.prototype.scheduleNextRepeat = function () {
      return (this.time += c.runCalculator(this.timeRepeat));
    };
    return c;
  })();
  f.TimeEvent = g;
})(TimeHandlr || (TimeHandlr = {}));
(function (f) {
  var g = (function () {
    function c(a) {
      void 0 === a && (a = {});
      this.time = 0;
      this.events = {};
      this.timingDefault = a.timingDefault || 1;
      this.keyCycles = a.keyCycles || "cycles";
      this.keyClassName = a.keyClassName || "className";
      this.keyOnClassCycleStart = a.keyOnClassCycleStart || "onClassCycleStart";
      this.keyDoClassCycleStart = a.keyDoClassCycleStart || "doClassCycleStart";
      this.keyCycleCheckValidity = a.keyCycleCheckValidity;
      this.copyCycleSettings =
        "undefined" === typeof a.copyCycleSettings ? !0 : a.copyCycleSettings;
      this.classAdd = a.classAdd || this.classAddGeneric;
      this.classRemove = a.classRemove || this.classRemoveGeneric;
    }
    c.prototype.getTime = function () {
      return this.time;
    };
    c.prototype.getEvents = function () {
      return this.events;
    };
    c.prototype.addEvent = function (a, b) {
      for (var d = [], c = 2; c < arguments.length; c++)
        d[c - 2] = arguments[c];
      d = new f.TimeEvent(a, 1, this.time, b || 1, d);
      this.insertEvent(d);
      return d;
    };
    c.prototype.addEventInterval = function (a, b, d) {
      for (var c = [], e = 3; e < arguments.length; e++)
        c[e - 3] = arguments[e];
      c = new f.TimeEvent(a, d || 1, this.time, b || 1, c);
      this.insertEvent(c);
      return c;
    };
    c.prototype.addEventIntervalSynched = function (a, b, d) {
      for (var c = [], e = 3; e < arguments.length; e++)
        c[e - 3] = arguments[e];
      b = b || 1;
      d = d || 1;
      e = f.TimeEvent.runCalculator(b || this.timingDefault);
      e *= Math.ceil(this.time / e);
      return e === this.time
        ? this.addEventInterval.apply(this, [a, b, d].concat(c))
        : this.addEvent.apply(
            this,
            [this.addEventInterval, e - this.time, a, b, d].concat(c)
          );
    };
    c.prototype.addClassCycle = function (a, b, d, c) {
      a[this.keyCycles] || (a[this.keyCycles] = {});
      this.cancelClassCycle(a, d);
      b = a[this.keyCycles][d || "0"] = this.setClassCycle(a, b, c);
      this.cycleClass(a, b);
      return b;
    };
    c.prototype.addClassCycleSynched = function (a, b, d, c) {
      a[this.keyCycles] || (a[this.keyCycles] = {});
      this.cancelClassCycle(a, d);
      b = a[this.keyCycles][d || "0"] = this.setClassCycle(a, b, c, !0);
      this.cycleClass(a, b);
      return b;
    };
    c.prototype.handleEvents = function () {
      var a, b;
      this.time += 1;
      if ((a = this.events[this.time])) {
        for (b = 0; b < a.length; b += 1) this.handleEvent(a[b]);
        delete this.events[this.time];
      }
    };
    c.prototype.handleEvent = function (a) {
      if (!(0 >= a.repeat || a.callback.apply(this, a.args))) {
        if ("function" === typeof a.repeat) {
          if (!a.repeat.apply(this, a.args)) return;
        } else {
          if (!a.repeat) return;
          --a.repeat;
          if (0 >= a.repeat) return;
        }
        a.scheduleNextRepeat();
        this.insertEvent(a);
        return a.time;
      }
    };
    c.prototype.cancelEvent = function (a) {
      a.repeat = 0;
    };
    c.prototype.cancelAllEvents = function () {
      this.events = {};
    };
    c.prototype.cancelClassCycle = function (a, b) {
      var d;
      a[this.keyCycles] &&
        a[this.keyCycles][b] &&
        ((d = a[this.keyCycles][b]),
        (d.event.repeat = 0),
        delete a[this.keyCycles][b]);
    };
    c.prototype.cancelAllCycles = function (a) {
      a = a[this.keyCycles];
      var b, d;
      for (d in a)
        a.hasOwnProperty(d) &&
          ((b = a[d]), (b.length = 1), (b[0] = !1), delete a[d]);
    };
    c.prototype.setClassCycle = function (a, b, d, c) {
      var e = this;
      d = f.TimeEvent.runCalculator(d || this.timingDefault);
      this.copyCycleSettings && (b = this.makeSettingsCopy(b));
      b.location = b.oldclass = -1;
      a[this.keyOnClassCycleStart] = c
        ? function () {
            var c = b.length * d,
              c = Math.ceil(e.time / c) * c - e.time,
              c =
                0 === c
                  ? e.addEventInterval(e.cycleClass, d, Infinity, a, b)
                  : e.addEvent(
                      e.addEventInterval,
                      c,
                      e.cycleClass,
                      d,
                      Infinity,
                      a,
                      b
                    );
            b.event = c;
          }
        : function () {
            b.event = e.addEventInterval(e.cycleClass, d, Infinity, a, b);
          };
      if (a[this.keyDoClassCycleStart]) a[this.keyOnClassCycleStart]();
      return b;
    };
    c.prototype.cycleClass = function (a, b) {
      if (
        !a ||
        !b ||
        !b.length ||
        (this.keyCycleCheckValidity && !a[this.keyCycleCheckValidity])
      )
        return !0;
      var c;
      -1 !== b.oldclass &&
        "string" === typeof b[b.oldclass] &&
        this.classRemove(a, b[b.oldclass]);
      b.location = (b.location += 1) % b.length;
      c = b[b.location];
      if (!c) return !1;
      c = c.constructor === Function ? c(a, b) : c;
      b.oldclass = b.location;
      return "string" === typeof c ? (this.classAdd(a, c), !1) : !!c;
    };
    c.prototype.insertEvent = function (a) {
      this.events[a.time]
        ? this.events[a.time].push(a)
        : (this.events[a.time] = [a]);
    };
    c.prototype.makeSettingsCopy = function (a) {
      var b = new a.constructor(),
        c;
      for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
      return b;
    };
    c.prototype.classAddGeneric = function (a, b) {
      a[this.keyClassName] += " " + b;
    };
    c.prototype.classRemoveGeneric = function (a, b) {
      a[this.keyClassName] = a[this.keyClassName].replace(b, "");
    };
    return c;
  })();
  f.TimeHandlr = g;
})(TimeHandlr || (TimeHandlr = {}));
