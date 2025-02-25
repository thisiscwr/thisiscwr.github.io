var AreaSpawnr;
(function (q) {
  var r = (function () {
    function b(a) {
      if (!a) throw Error("No settings given to AreaSpawnr.");
      if (!a.MapsCreator) throw Error("No MapsCreator provided to AreaSpawnr.");
      this.MapsCreator = a.MapsCreator;
      if (!a.MapScreener) throw Error("No MapScreener provided to AreaSpawnr.");
      this.MapScreener = a.MapScreener;
      this.onSpawn = a.onSpawn;
      this.onUnspawn = a.onUnspawn;
      this.screenAttributes = a.screenAttributes || [];
      this.stretchAdd = a.stretchAdd;
      this.afterAdd = a.afterAdd;
      this.commandScope = a.commandScope;
    }
    b.prototype.getMapsCreator = function () {
      return this.MapsCreator;
    };
    b.prototype.getMapScreener = function () {
      return this.MapScreener;
    };
    b.prototype.getScreenAttributes = function () {
      return this.screenAttributes;
    };
    b.prototype.getMapName = function () {
      return this.mapName;
    };
    b.prototype.getMap = function (a) {
      return "undefined" !== typeof a
        ? this.MapsCreator.getMap(a)
        : this.mapCurrent;
    };
    b.prototype.getMaps = function () {
      return this.MapsCreator.getMaps();
    };
    b.prototype.getArea = function () {
      return this.areaCurrent;
    };
    b.prototype.getAreaName = function () {
      return this.areaCurrent.name;
    };
    b.prototype.getLocation = function (a) {
      return this.areaCurrent.map.locations[a];
    };
    b.prototype.getLocationEntered = function () {
      return this.locationEntered;
    };
    b.prototype.getPreThings = function () {
      return this.prethings;
    };
    b.prototype.setMap = function (a, c) {
      this.mapCurrent = this.getMap(a);
      if (!this.mapCurrent) throw Error("Unknown Map in setMap: '" + a + "'.");
      this.mapName = a;
      1 < arguments.length && this.setLocation(c);
      return this.mapCurrent;
    };
    b.prototype.setLocation = function (a) {
      var c, b;
      c = this.mapCurrent.locations[a];
      if (!c) throw Error("Unknown location in setLocation: '" + a + "'.");
      this.locationEntered = c;
      this.areaCurrent = c.area;
      this.areaCurrent.boundaries = { top: 0, right: 0, bottom: 0, left: 0 };
      for (b = 0; b < this.screenAttributes.length; b += 1)
        (a = this.screenAttributes[b]),
          (this.MapScreener[a] = this.areaCurrent[a]);
      this.prethings = this.MapsCreator.getPreThings(c.area);
      this.areaCurrent.stretches &&
        this.setStretches(this.areaCurrent.stretches);
      this.areaCurrent.afters && this.setAfters(this.areaCurrent.afters);
    };
    b.prototype.setStretches = function (a) {
      var c;
      this.stretches = a;
      for (c = 0; c < a.length; c += 1)
        this.stretchAdd.call(this.commandScope || this, a[c], c, a);
    };
    b.prototype.setAfters = function (a) {
      var c;
      this.afters = a;
      for (c = 0; c < a.length; c += 1)
        this.afterAdd.call(this.commandScope || this, a[c], c, a);
    };
    b.prototype.spawnArea = function (a, c, b, d, e) {
      this.onSpawn && this.applySpawnAction(this.onSpawn, !0, a, c, b, d, e);
    };
    b.prototype.unspawnArea = function (a, b, f, d, e) {
      this.onUnspawn &&
        this.applySpawnAction(this.onUnspawn, !1, a, b, f, d, e);
    };
    b.prototype.applySpawnAction = function (a, b, f, d, e, g, h) {
      var p, k, l, m, n;
      for (p in this.prethings)
        if (
          this.prethings.hasOwnProperty(p) &&
          ((k = this.prethings[p][f]), 0 !== k.length)
        )
          for (
            m = (k.length / 2) | 0,
              l = this.findPreThingsSpawnStart(f, k, m, d, e, g, h),
              m = this.findPreThingsSpawnEnd(f, k, m, d, e, g, h),
              n = l;
            n <= m;
            n += 1
          )
            (l = k[n]), l.spawned !== b && ((l.spawned = b), a(l));
    };
    b.prototype.findPreThingsSpawnStart = function (a, c, f, d, e, g, h) {
      a = b.directionKeys[a];
      d = this.getDirectionEnd(a, d, e, g, h);
      for (e = 0; e < c.length && !(c[e][a] >= d); e += 1);
      return e;
    };
    b.prototype.findPreThingsSpawnEnd = function (a, c, f, d, e, g, h) {
      f = b.directionKeys[a];
      a = this.getDirectionEnd(
        b.directionKeys[b.directionOpposites[a]],
        d,
        e,
        g,
        h
      );
      for (d = c.length - 1; 0 <= d && !(c[d][f] <= a); --d);
      return d;
    };
    b.prototype.getDirectionEnd = function (a, b, f, d, e) {
      switch (a) {
        case "top":
          return b;
        case "right":
          return f;
        case "bottom":
          return d;
        case "left":
          return e;
        default:
          throw Error("Unknown directionKey: " + a);
      }
    };
    b.directionKeys = {
      xInc: "left",
      xDec: "right",
      yInc: "top",
      yDec: "bottom",
    };
    b.directionOpposites = {
      xInc: "xDec",
      xDec: "xInc",
      yInc: "yDec",
      yDec: "yInc",
    };
    return b;
  })();
  q.AreaSpawnr = r;
})(AreaSpawnr || (AreaSpawnr = {}));
