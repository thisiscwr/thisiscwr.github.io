var FPSAnalyzr;
(function (e) {
  var f = (function () {
    function c(a) {
      void 0 === a && (a = {});
      this.maxKept = a.maxKept || 35;
      this.numRecorded = 0;
      this.ticker = -1;
      this.measurements = isFinite(this.maxKept) ? Array(this.maxKept) : {};
      this.getTimestamp =
        "undefined" === typeof a.getTimestamp
          ? "undefined" === typeof performance
            ? function () {
                return Date.now();
              }
            : (
                performance.now ||
                performance.webkitNow ||
                performance.mozNow ||
                performance.msNow ||
                performance.oNow
              ).bind(performance)
          : a.getTimestamp;
    }
    c.prototype.measure = function (a) {
      void 0 === a && (a = this.getTimestamp());
      this.timeCurrent && this.addFPS(1e3 / (a - this.timeCurrent));
      this.timeCurrent = a;
    };
    c.prototype.addFPS = function (a) {
      this.ticker = (this.ticker += 1) % this.maxKept;
      this.measurements[this.ticker] = a;
      this.numRecorded += 1;
    };
    c.prototype.getMaxKept = function () {
      return this.maxKept;
    };
    c.prototype.getNumRecorded = function () {
      return this.numRecorded;
    };
    c.prototype.getTimeCurrent = function () {
      return this.timeCurrent;
    };
    c.prototype.getTicker = function () {
      return this.ticker;
    };
    c.prototype.getMeasurements = function () {
      var a = Math.min(this.maxKept, this.numRecorded),
        b;
      isFinite(this.maxKept) ? (b = Array(a)) : ((b = {}), (b.length = a));
      for (--a; 0 <= a; --a) b[a] = this.measurements[a];
      return b;
    };
    c.prototype.getDifferences = function () {
      var a = this.getMeasurements(),
        b;
      for (b = a.length - 1; 0 <= b; --b) a[b] = 1e3 / a[b];
      return a;
    };
    c.prototype.getAverage = function () {
      var a = 0,
        b = Math.min(this.maxKept, this.numRecorded),
        c;
      for (c = b - 1; 0 <= c; --c) a += this.measurements[c];
      return a / b;
    };
    c.prototype.getMedian = function () {
      var a = this.getMeasurementsSorted(),
        b = Math.floor(a.length / 2);
      return 0 === a.length % 2 ? a[b] : (a[b - 2] + a[b]) / 2;
    };
    c.prototype.getExtremes = function () {
      var a = this.measurements[0],
        b = a,
        c,
        d;
      for (d = Math.min(this.maxKept, this.numRecorded) - 1; 0 <= d; --d)
        (c = this.measurements[d]), c > b ? (b = c) : c < a && (a = c);
      return [a, b];
    };
    c.prototype.getRange = function () {
      var a = this.getExtremes();
      return a[1] - a[0];
    };
    c.prototype.getMeasurementsSorted = function () {
      var a, b;
      if (this.measurements.constructor === Array)
        a = [].slice.call(this.measurements).sort();
      else {
        a = [];
        for (b in this.measurements)
          this.measurements.hasOwnProperty(b) &&
            "undefined" !== typeof this.measurements[b] &&
            (a[b] = this.measurements[b]);
        a.sort();
      }
      this.numRecorded < this.maxKept && (a.length = this.numRecorded);
      return a.sort();
    };
    return c;
  })();
  e.FPSAnalyzr = f;
})(FPSAnalyzr || (FPSAnalyzr = {}));
