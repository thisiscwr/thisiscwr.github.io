var InputWritr;
(function (k) {
  var l = (function () {
    function b(a) {
      if ("undefined" === typeof a)
        throw Error("No settings object given to InputWritr.");
      if ("undefined" === typeof a.triggers)
        throw Error("No triggers given to InputWritr.");
      this.triggers = a.triggers;
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
      this.eventInformation = a.eventInformation;
      this.canTrigger = a.hasOwnProperty("canTrigger")
        ? a.canTrigger
        : function () {
            return !0;
          };
      this.isRecording = a.hasOwnProperty("isRecording")
        ? a.isRecording
        : function () {
            return !0;
          };
      this.currentHistory = {};
      this.histories = {};
      this.aliases = {};
      this.addAliases(a.aliases || {});
      this.keyAliasesToCodes = a.keyAliasesToCodes || {
        shift: 16,
        ctrl: 17,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
      };
      this.keyCodesToAliases = a.keyCodesToAliases || {
        16: "shift",
        17: "ctrl",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
      };
    }
    b.prototype.getAliases = function () {
      return this.aliases;
    };
    b.prototype.getAliasesAsKeyStrings = function () {
      var a = {},
        c;
      for (c in this.aliases)
        this.aliases.hasOwnProperty(c) && (a[c] = this.getAliasAsKeyStrings(c));
      return a;
    };
    b.prototype.getAliasAsKeyStrings = function (a) {
      return this.aliases[a].map(this.convertAliasToKeyString.bind(this));
    };
    b.prototype.convertAliasToKeyString = function (a) {
      return a.constructor === String
        ? a
        : 96 < a && 105 > a
        ? String.fromCharCode(a - 48)
        : 64 < a && 97 > a
        ? String.fromCharCode(a)
        : "undefined" !== typeof this.keyCodesToAliases[a]
        ? this.keyCodesToAliases[a]
        : "?";
    };
    b.prototype.convertKeyStringToAlias = function (a) {
      return a.constructor === Number
        ? a
        : 1 === a.length
        ? a.charCodeAt(0) - 32
        : "undefined" !== typeof this.keyAliasesToCodes[a]
        ? this.keyAliasesToCodes[a]
        : -1;
    };
    b.prototype.getCurrentHistory = function () {
      return this.currentHistory;
    };
    b.prototype.getHistory = function (a) {
      return this.histories[a];
    };
    b.prototype.getHistories = function () {
      return this.histories;
    };
    b.prototype.getCanTrigger = function () {
      return this.canTrigger;
    };
    b.prototype.getIsRecording = function () {
      return this.isRecording;
    };
    b.prototype.setCanTrigger = function (a) {
      this.canTrigger =
        a.constructor === Boolean
          ? function () {
              return a;
            }
          : a;
    };
    b.prototype.setIsRecording = function (a) {
      this.isRecording =
        a.constructor === Boolean
          ? function () {
              return a;
            }
          : a;
    };
    b.prototype.setEventInformation = function (a) {
      this.eventInformation = a;
    };
    b.prototype.addAliasValues = function (a, c) {
      var b, e, d;
      this.aliases.hasOwnProperty(a)
        ? this.aliases[a].push.apply(this.aliases[a], c)
        : (this.aliases[a] = c);
      for (b in this.triggers)
        if (
          this.triggers.hasOwnProperty(b) &&
          ((e = this.triggers[b]), e.hasOwnProperty(a))
        )
          for (d = 0; d < c.length; d += 1) e[c[d]] = e[a];
    };
    b.prototype.removeAliasValues = function (a, c) {
      var b, e, d;
      if (this.aliases.hasOwnProperty(a)) {
        for (d = 0; d < c.length; d += 1)
          this.aliases[a].splice(this.aliases[a].indexOf(c[d], 1));
        for (b in this.triggers)
          if (
            this.triggers.hasOwnProperty(b) &&
            ((e = this.triggers[b]), e.hasOwnProperty(a))
          )
            for (d = 0; d < c.length; d += 1)
              e.hasOwnProperty(c[d]) && delete e[c[d]];
      }
    };
    b.prototype.switchAliasValues = function (a, c, b) {
      this.removeAliasValues(a, c);
      this.addAliasValues(a, b);
    };
    b.prototype.addAliases = function (a) {
      for (var c in a) a.hasOwnProperty(c) && this.addAliasValues(c, a[c]);
    };
    b.prototype.addEvent = function (a, c, b) {
      var e;
      if (!this.triggers.hasOwnProperty(a))
        throw Error("Unknown trigger requested: '" + a + "'.");
      this.triggers[a][c] = b;
      if (this.aliases.hasOwnProperty(c))
        for (e = 0; e < this.aliases[c].length; e += 1)
          this.triggers[a][this.aliases[c][e]] = b;
    };
    b.prototype.removeEvent = function (a, c) {
      var b;
      if (!this.triggers.hasOwnProperty(a))
        throw Error("Unknown trigger requested: '" + a + "'.");
      delete this.triggers[a][c];
      if (this.aliases.hasOwnProperty(c))
        for (b = 0; b < this.aliases[c].length; b += 1)
          this.triggers[a][this.aliases[c][b]] &&
            delete this.triggers[a][this.aliases[c][b]];
    };
    b.prototype.saveHistory = function (a) {
      void 0 === a && (a = Object.keys(this.histories).length.toString());
      this.histories[a] = this.currentHistory;
    };
    b.prototype.restartHistory = function (a) {
      void 0 === a && (a = !0);
      a && this.saveHistory();
      this.currentHistory = {};
      this.startingTime = this.getTimestamp();
    };
    b.prototype.playHistory = function (a) {
      for (var b in a)
        a.hasOwnProperty(b) &&
          setTimeout(
            this.makeEventCall(a[b]),
            (Number(b) - this.startingTime) | 0
          );
    };
    b.prototype.callEvent = function (a, b, f) {
      if (!a) throw Error("Blank event given to InputWritr.");
      if (this.canTrigger(a, b, f))
        return (
          a.constructor === String && (a = this.triggers[a][b]),
          a(this.eventInformation, f)
        );
    };
    b.prototype.makePipe = function (a, b, f) {
      var e = this,
        d = this.triggers[a];
      if (!d) throw Error("No trigger of label '" + a + "' defined.");
      return function (g) {
        var h = g[b];
        f && g.preventDefault instanceof Function && g.preventDefault();
        d.hasOwnProperty(h) &&
          (e.isRecording() && e.saveEventInformation([a, h]),
          e.callEvent(d[h], h, g));
      };
    };
    b.prototype.makeEventCall = function (a) {
      var b = this;
      return function () {
        b.callEvent(a[0], a[1]);
        b.isRecording() && b.saveEventInformation(a);
      };
    };
    b.prototype.saveEventInformation = function (a) {
      this.currentHistory[this.getTimestamp() | 0] = a;
    };
    return b;
  })();
  k.InputWritr = l;
})(InputWritr || (InputWritr = {}));
