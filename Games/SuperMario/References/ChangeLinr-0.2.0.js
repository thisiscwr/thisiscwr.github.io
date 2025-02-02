var ChangeLinr;
(function (e) {
  var f = (function () {
    function b(a) {
      if ("undefined" === typeof a)
        throw Error("No settings object given to ChangeLinr.");
      if ("undefined" === typeof a.pipeline)
        throw Error("No pipeline given to ChangeLinr.");
      if ("undefined" === typeof a.transforms)
        throw Error("No transforms given to ChangeLinr.");
      this.pipeline = a.pipeline || [];
      this.transforms = a.transforms || {};
      this.doMakeCache =
        "undefined" === typeof a.doMakeCache ? !0 : a.doMakeCache;
      this.doUseCache = "undefined" === typeof a.doUseCache ? !0 : a.doUseCache;
      this.cache = {};
      this.cacheFull = {};
      for (a = 0; a < this.pipeline.length; a += 1) {
        if (!this.pipeline[a]) throw Error("Pipe[" + a + "] is invalid.");
        if (!this.transforms.hasOwnProperty(this.pipeline[a]))
          throw Error(
            "Pipe[" +
              a +
              "] ('" +
              this.pipeline[a] +
              "') not found in transforms."
          );
        if (!(this.transforms[this.pipeline[a]] instanceof Function))
          throw Error(
            "Pipe[" +
              a +
              "] ('" +
              this.pipeline[a] +
              "') is not a valid Function from transforms."
          );
        this.cacheFull[a] = this.cacheFull[this.pipeline[a]] = {};
      }
    }
    b.prototype.getCache = function () {
      return this.cache;
    };
    b.prototype.getCached = function (a) {
      return this.cache[a];
    };
    b.prototype.getCacheFull = function () {
      return this.cacheFull;
    };
    b.prototype.getDoMakeCache = function () {
      return this.doMakeCache;
    };
    b.prototype.getDoUseCache = function () {
      return this.doUseCache;
    };
    b.prototype.process = function (a, d, b) {
      var c;
      "undefined" === typeof d &&
        (this.doMakeCache || this.doUseCache) &&
        (d = a);
      if (this.doUseCache && this.cache.hasOwnProperty(d)) return this.cache[d];
      for (c = 0; c < this.pipeline.length; c += 1)
        (a = this.transforms[this.pipeline[c]](a, d, b, this)),
          this.doMakeCache && (this.cacheFull[this.pipeline[c]][d] = a);
      this.doMakeCache && (this.cache[d] = a);
      return a;
    };
    b.prototype.processFull = function (a, b, e) {
      var c = {};
      this.process(a, b, e);
      for (a = 0; a < this.pipeline.length; a += 1)
        c[a] = c[this.pipeline[a]] = this.cacheFull[this.pipeline[a]][b];
      return c;
    };
    return b;
  })();
  e.ChangeLinr = f;
})(ChangeLinr || (ChangeLinr = {}));
