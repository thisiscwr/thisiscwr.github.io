var GamesRunnr;
(function (c) {
  var d = (function () {
    function b(a) {
      if ("undefined" === typeof a)
        throw Error("No settings object given GamesRunnr.");
      if ("undefined" === typeof a.games)
        throw Error("No games given to GamesRunnr.");
      this.games = a.games;
      this.interval = a.interval || 1e3 / 60;
      this.speed = a.speed || 1;
      this.onPause = a.onPause;
      this.onPlay = a.onPlay;
      this.callbackArguments = a.callbackArguments || [this];
      this.adjustFramerate = a.adjustFramerate;
      this.FPSAnalyzer =
        a.FPSAnalyzer || new FPSAnalyzr.FPSAnalyzr(a.FPSAnalyzerSettings);
      this.scope = a.scope || this;
      this.paused = !0;
      this.upkeepScheduler =
        a.upkeepScheduler ||
        function (a, b) {
          return setTimeout(a, b);
        };
      this.upkeepCanceller =
        a.upkeepCanceller ||
        function (a) {
          clearTimeout(a);
        };
      this.upkeepBound = this.upkeep.bind(this);
      for (a = 0; a < this.games.length; a += 1)
        this.games[a] = this.games[a].bind(this.scope);
      this.setIntervalReal();
    }
    b.prototype.getFPSAnalyzer = function () {
      return this.FPSAnalyzer;
    };
    b.prototype.getPaused = function () {
      return this.paused;
    };
    b.prototype.getGames = function () {
      return this.games;
    };
    b.prototype.getInterval = function () {
      return this.interval;
    };
    b.prototype.getSpeed = function () {
      return this.speed;
    };
    b.prototype.getOnPause = function () {
      return this.onPause;
    };
    b.prototype.getOnPlay = function () {
      return this.onPlay;
    };
    b.prototype.getCallbackArguments = function () {
      return this.callbackArguments;
    };
    b.prototype.getUpkeepScheduler = function () {
      return this.upkeepScheduler;
    };
    b.prototype.getUpkeepCanceller = function () {
      return this.upkeepCanceller;
    };
    b.prototype.upkeep = function () {
      this.paused ||
        (this.upkeepCanceller(this.upkeepNext),
        this.adjustFramerate
          ? (this.upkeepNext = this.upkeepScheduler(
              this.upkeepBound,
              this.intervalReal - (this.upkeepTimed() | 0)
            ))
          : ((this.upkeepNext = this.upkeepScheduler(
              this.upkeepBound,
              this.intervalReal
            )),
            this.runAllGames()),
        this.FPSAnalyzer && this.FPSAnalyzer.measure());
    };
    b.prototype.upkeepTimed = function () {
      if (!this.FPSAnalyzer)
        throw Error("An internal FPSAnalyzr is required for upkeepTimed.");
      var a = this.FPSAnalyzer.getTimestamp();
      this.runAllGames();
      return this.FPSAnalyzer.getTimestamp() - a;
    };
    b.prototype.play = function () {
      this.paused &&
        ((this.paused = !1),
        this.onPlay && this.onPlay.apply(this, this.callbackArguments),
        this.upkeep());
    };
    b.prototype.pause = function () {
      this.paused ||
        ((this.paused = !0),
        this.onPause && this.onPause.apply(this, this.callbackArguments),
        this.upkeepCanceller(this.upkeepNext));
    };
    b.prototype.step = function (a) {
      void 0 === a && (a = 1);
      this.play();
      this.pause();
      0 < a && this.step(a - 1);
    };
    b.prototype.togglePause = function () {
      this.paused ? this.play() : this.pause();
    };
    b.prototype.setInterval = function (a) {
      var b = Number(a);
      if (isNaN(b)) throw Error("Invalid interval given to setInterval: " + a);
      this.interval = b;
      this.setIntervalReal();
    };
    b.prototype.setSpeed = function (a) {
      var b = Number(a);
      if (isNaN(b)) throw Error("Invalid speed given to setSpeed: " + a);
      this.speed = b;
      this.setIntervalReal();
    };
    b.prototype.setIntervalReal = function () {
      this.intervalReal = (1 / this.speed) * this.interval;
    };
    b.prototype.runAllGames = function () {
      for (var a = 0; a < this.games.length; a += 1) this.games[a]();
    };
    return b;
  })();
  c.GamesRunnr = d;
})(GamesRunnr || (GamesRunnr = {}));
