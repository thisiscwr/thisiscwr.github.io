var __extends =
    (this && this.__extends) ||
    function (k, g) {
      function m() {
        this.constructor = k;
      }
      for (var b in g) g.hasOwnProperty(b) && (k[b] = g[b]);
      k.prototype =
        null === g ? Object.create(g) : ((m.prototype = g.prototype), new m());
    },
  GameStartr;
(function (k) {
  var g = (function (g) {
    function b(a) {
      void 0 === a && (a = {});
      g.call(this, {
        unitsize: a.unitsize,
        constantsSource: a.constantsSource,
        constants: a.constants,
      });
      this.resets =
        "resetUsageHelper resetObjectMaker resetPixelRender resetTimeHandler resetItemsHolder resetAudioPlayer resetQuadsKeeper resetGamesRunner resetGroupHolder resetThingHitter resetMapScreener resetPixelDrawer resetNumberMaker resetMapsCreator resetAreaSpawner resetInputWriter resetDeviceLayer resetTouchPasser resetLevelEditor resetWorldSeeder resetScenePlayer resetMathDecider resetModAttacher startModAttacher resetContainer".split(
          " "
        );
      a.extraResets && this.resets.push.apply(this.resets, a.extraResets);
      a.resetTimed ? this.resetTimed(this, a) : this.reset(this, a);
    }
    __extends(b, g);
    b.prototype.reset = function (a, c) {
      g.prototype.reset.call(this, a, a.resets, c);
    };
    b.prototype.resetTimed = function (a, c) {
      g.prototype.resetTimed.call(this, a, a.resets, c);
    };
    b.prototype.resetUsageHelper = function (a, c) {
      a.UsageHelper = new UsageHelpr.UsageHelpr(a.settings.help);
    };
    b.prototype.resetObjectMaker = function (a, c) {
      a.ObjectMaker = new ObjectMakr.ObjectMakr(
        a.proliferate(
          {
            properties: {
              Quadrant: { EightBitter: a, GameStarter: a },
              Thing: { EightBitter: a, GameStarter: a },
            },
          },
          a.settings.objects
        )
      );
    };
    b.prototype.resetQuadsKeeper = function (a, c) {
      var d = c.width / (a.settings.quadrants.numCols - 3),
        b = c.height / (a.settings.quadrants.numRows - 2);
      a.QuadsKeeper = new QuadsKeepr.QuadsKeepr(
        a.proliferate(
          {
            ObjectMaker: a.ObjectMaker,
            createCanvas: a.createCanvas,
            quadrantWidth: d,
            quadrantHeight: b,
            startLeft: -d,
            startHeight: -b,
            onAdd: a.onAreaSpawn.bind(a, a),
            onRemove: a.onAreaUnspawn.bind(a, a),
          },
          a.settings.quadrants
        )
      );
    };
    b.prototype.resetPixelRender = function (a, c) {
      a.PixelRender = new PixelRendr.PixelRendr(
        a.proliferate(
          { scale: a.scale, QuadsKeeper: a.QuadsKeeper, unitsize: a.unitsize },
          a.settings.sprites
        )
      );
    };
    b.prototype.resetPixelDrawer = function (a, c) {
      a.PixelDrawer = new PixelDrawr.PixelDrawr(
        a.proliferate(
          {
            PixelRender: a.PixelRender,
            MapScreener: a.MapScreener,
            createCanvas: a.createCanvas,
            unitsize: a.unitsize,
            generateObjectKey: a.generateThingKey,
          },
          a.settings.renderer
        )
      );
    };
    b.prototype.resetTimeHandler = function (a, c) {
      a.TimeHandler = new TimeHandlr.TimeHandlr(
        a.proliferate(
          { classAdd: a.addClass, classRemove: a.removeClass },
          a.settings.events
        )
      );
    };
    b.prototype.resetAudioPlayer = function (a, c) {
      a.AudioPlayer = new AudioPlayr.AudioPlayr(
        a.proliferate({ ItemsHolder: a.ItemsHolder }, a.settings.audio)
      );
    };
    b.prototype.resetGamesRunner = function (a, c) {
      a.GamesRunner = new GamesRunnr.GamesRunnr(
        a.proliferate(
          {
            adjustFramerate: !0,
            scope: a,
            onPlay: a.onGamePlay.bind(a, a),
            onPause: a.onGamePause.bind(a, a),
            FPSAnalyzer: new FPSAnalyzr.FPSAnalyzr(),
          },
          a.settings.runner
        )
      );
      a.FPSAnalyzer = a.GamesRunner.getFPSAnalyzer();
    };
    b.prototype.resetItemsHolder = function (a, c) {
      a.ItemsHolder = new ItemsHoldr.ItemsHoldr(
        a.proliferate({ callbackArgs: [a] }, a.settings.items)
      );
    };
    b.prototype.resetGroupHolder = function (a, c) {
      a.GroupHolder = new GroupHoldr.GroupHoldr(a.settings.groups);
    };
    b.prototype.resetThingHitter = function (a, c) {
      a.ThingHitter = new ThingHittr.ThingHittr(
        a.proliferate({ scope: a }, a.settings.collisions)
      );
    };
    b.prototype.resetMapScreener = function (a, c) {
      a.MapScreener = new MapScreenr.MapScreenr({
        EightBitter: a,
        unitsize: a.unitsize,
        width: c.width,
        height: c.height,
        variableArgs: [a],
        variables: a.settings.maps.screenVariables,
      });
    };
    b.prototype.resetNumberMaker = function (a, c) {
      a.NumberMaker = new NumberMakr.NumberMakr();
    };
    b.prototype.resetMapsCreator = function (a, c) {
      a.MapsCreator = new MapsCreatr.MapsCreatr({
        ObjectMaker: a.ObjectMaker,
        groupTypes: a.settings.maps.groupTypes,
        macros: a.settings.maps.macros,
        entrances: a.settings.maps.entrances,
        maps: a.settings.maps.library,
        scope: a,
      });
    };
    b.prototype.resetAreaSpawner = function (a, c) {
      a.AreaSpawner = new AreaSpawnr.AreaSpawnr({
        MapsCreator: a.MapsCreator,
        MapScreener: a.MapScreener,
        screenAttributes: a.settings.maps.screenAttributes,
        onSpawn: a.settings.maps.onSpawn,
        onUnspawn: a.settings.maps.onUnspawn,
        stretchAdd: a.settings.maps.stretchAdd,
        afterAdd: a.settings.maps.afterAdd,
        commandScope: a,
      });
    };
    b.prototype.resetInputWriter = function (a, c) {
      a.InputWriter = new InputWritr.InputWritr(
        a.proliferate(
          { canTrigger: a.canInputsTrigger.bind(a, a), eventInformation: a },
          a.settings.input.InputWritrArgs
        )
      );
    };
    b.prototype.resetDeviceLayer = function (a, c) {
      a.DeviceLayer = new DeviceLayr.DeviceLayr(
        a.proliferate({ InputWriter: a.InputWriter }, a.settings.devices)
      );
    };
    b.prototype.resetTouchPasser = function (a, c) {
      a.TouchPasser = new TouchPassr.TouchPassr(
        a.proliferate({ InputWriter: a.InputWriter }, a.settings.touch)
      );
    };
    b.prototype.resetLevelEditor = function (a, c) {
      a.LevelEditor = new LevelEditr.LevelEditr(
        a.proliferate(
          { GameStarter: a, beautifier: js_beautify },
          a.settings.editor
        )
      );
    };
    b.prototype.resetWorldSeeder = function (a, c) {
      a.WorldSeeder = new WorldSeedr.WorldSeedr(
        a.proliferate(
          {
            random: a.NumberMaker.random.bind(a.NumberMaker),
            onPlacement: a.mapPlaceRandomCommands.bind(a, a),
          },
          a.settings.generator
        )
      );
    };
    b.prototype.resetScenePlayer = function (a, c) {
      a.ScenePlayer = new ScenePlayr.ScenePlayr(
        a.proliferate({ cutsceneArguments: [a] }, a.settings.scenes)
      );
    };
    b.prototype.resetMathDecider = function (a, c) {
      a.MathDecider = new MathDecidr.MathDecidr(a.settings.math);
    };
    b.prototype.resetModAttacher = function (a, c) {
      a.ModAttacher = new ModAttachr.ModAttachr(
        a.proliferate(
          { scopeDefault: a, ItemsHoldr: a.ItemsHolder },
          a.settings.mods
        )
      );
    };
    b.prototype.startModAttacher = function (a, c) {
      var d = c.mods,
        b;
      if (d)
        for (b in d) d.hasOwnProperty(b) && d[b] && a.ModAttacher.enableMod(b);
      a.ModAttacher.fireEvent("onReady", a, a);
    };
    b.prototype.resetContainer = function (a, c) {
      a.container = a.createElement("div", {
        className: "EightBitter",
        style: a.proliferate(
          {
            position: "relative",
            width: c.width + "px",
            height: c.height + "px",
          },
          c.style
        ),
      });
      a.canvas = a.createCanvas(c.width, c.height);
      a.PixelDrawer.setCanvas(a.canvas);
      a.container.appendChild(a.canvas);
      a.TouchPasser.setParentContainer(a.container);
    };
    b.prototype.scrollWindow = function (a, c) {
      var d = b.prototype.ensureCorrectCaller(this);
      a |= 0;
      c |= 0;
      if (a || c)
        d.MapScreener.shift(a, c),
          d.shiftAll(-a, -c),
          d.QuadsKeeper.shiftQuadrants(-a, -c);
    };
    b.prototype.scrollThing = function (a, c, d) {
      var b = a.left,
        f = a.top;
      a.GameStarter.scrollWindow(c, d);
      a.GameStarter.setLeft(a, b);
      a.GameStarter.setTop(a, f);
    };
    b.prototype.onAreaSpawn = function (a, c, d, b, f, g) {
      a.AreaSpawner.spawnArea(
        c,
        (d + a.MapScreener.top) / a.unitsize,
        (b + a.MapScreener.left) / a.unitsize,
        (f + a.MapScreener.top) / a.unitsize,
        (g + a.MapScreener.left) / a.unitsize
      );
    };
    b.prototype.onAreaUnspawn = function (a, c, d, b, f, g) {
      a.AreaSpawner.unspawnArea(
        c,
        (d + a.MapScreener.top) / a.unitsize,
        (b + a.MapScreener.left) / a.unitsize,
        (f + a.MapScreener.top) / a.unitsize,
        (g + a.MapScreener.left) / a.unitsize
      );
    };
    b.prototype.addThing = function (a, c, d) {
      void 0 === c && (c = 0);
      void 0 === d && (d = 0);
      var b;
      b =
        "string" === typeof a || a instanceof String
          ? this.ObjectMaker.make(a)
          : a.constructor === Array
          ? this.ObjectMaker.make.apply(this.ObjectMaker, a)
          : a;
      2 < arguments.length
        ? (b.GameStarter.setLeft(b, c), b.GameStarter.setTop(b, d))
        : 1 < arguments.length && b.GameStarter.setLeft(b, c);
      b.GameStarter.updateSize(b);
      b.GameStarter.GroupHolder.getFunctions().add[b.groupType](b);
      b.placed = !0;
      if (b.onThingAdd) b.onThingAdd(b);
      b.GameStarter.PixelDrawer.setThingSprite(b);
      if (b.onThingAdded) b.onThingAdded(b);
      b.GameStarter.ModAttacher.fireEvent("onAddThing", b, c, d);
      return b;
    };
    b.prototype.thingProcess = function (a, c, b, e) {
      var f = 4,
        g,
        h;
      a.title = a.title || c;
      a.width && !a.spritewidth && (a.spritewidth = e.spritewidth || e.width);
      a.height &&
        !a.spriteheight &&
        (a.spriteheight = e.spriteheight || e.height);
      g = Math.floor(
        a.width *
          (a.GameStarter.unitsize /
            a.GameStarter.QuadsKeeper.getQuadrantWidth())
      );
      0 < g && (f += ((g + 1) * f) / 2);
      g = Math.floor(
        (a.height * a.GameStarter.unitsize) /
          a.GameStarter.QuadsKeeper.getQuadrantHeight()
      );
      0 < g && (f += ((g + 1) * f) / 2);
      a.maxquads = f;
      a.quadrants = Array(f);
      a.spritewidth = a.spritewidth || a.width;
      a.spriteheight = a.spriteheight || a.height;
      a.spritewidthpixels = a.spritewidth * a.GameStarter.unitsize;
      a.spriteheightpixels = a.spriteheight * a.GameStarter.unitsize;
      a.canvas = a.GameStarter.createCanvas(
        a.spritewidthpixels,
        a.spriteheightpixels
      );
      a.context = a.canvas.getContext("2d");
      1 !== a.opacity && a.GameStarter.setOpacity(a, a.opacity);
      a.attributes && a.GameStarter.thingProcessAttributes(a, a.attributes);
      if (a.onThingMake) a.onThingMake(a, b);
      a.GameStarter.setSize(a, a.width, a.height);
      a.GameStarter.setClassInitial(a, a.name || a.title);
      (h = a.spriteCycle) &&
        a.GameStarter.TimeHandler.addClassCycle(
          a,
          h[0],
          h[1] || null,
          h[2] || null
        );
      (h = a.spriteCycleSynched) &&
        a.GameStarter.TimeHandler.addClassCycleSynched(
          a,
          h[0],
          h[1] || null,
          h[2] || null
        );
      a.flipHoriz && a.GameStarter.flipHoriz(a);
      a.flipVert && a.GameStarter.flipVert(a);
      a.GameStarter.ModAttacher.fireEvent(
        "onThingMake",
        a.GameStarter,
        a,
        c,
        b,
        e
      );
    };
    b.prototype.thingProcessAttributes = function (a, c) {
      for (var b in c)
        a[b] &&
          (a.GameStarter.proliferate(a, c[b]),
          (a.name = a.name ? a.name + (" " + b) : a.title + " " + b));
    };
    b.prototype.mapPlaceRandomCommands = function (a, c) {
      var b = a.MapsCreator,
        e = a.AreaSpawner,
        f = e.getPreThings(),
        g = e.getArea(),
        e = e.getMap(),
        h,
        k,
        l;
      for (l = 0; l < c.length; l += 1)
        (h = c[l]),
          (k = { thing: h.title, x: h.left, y: h.top }),
          h.arguments && a.proliferateHard(k, h.arguments, !0),
          b.analyzePreSwitch(k, f, g, e);
    };
    b.prototype.onGamePlay = function (a) {
      a.AudioPlayer.resumeAll();
      a.ModAttacher.fireEvent("onGamePlay");
    };
    b.prototype.onGamePause = function (a) {
      a.AudioPlayer.pauseAll();
      a.ModAttacher.fireEvent("onGamePause");
    };
    b.prototype.canInputsTrigger = function (a) {
      return !0;
    };
    b.prototype.gameStart = function () {
      this.ModAttacher.fireEvent("onGameStart");
    };
    b.prototype.killNormal = function (a) {
      a && ((a.alive = !1), (a.hidden = !0), (a.movement = void 0));
    };
    b.prototype.markChanged = function (a) {
      a.changed = !0;
    };
    b.prototype.shiftVert = function (a, c, b) {
      EightBittr.EightBittr.prototype.shiftVert(a, c);
      b || a.GameStarter.markChanged(a);
    };
    b.prototype.shiftHoriz = function (a, c, b) {
      EightBittr.EightBittr.prototype.shiftHoriz(a, c);
      b || a.GameStarter.markChanged(a);
    };
    b.prototype.setTop = function (a, c) {
      EightBittr.EightBittr.prototype.setTop(a, c);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setRight = function (a, c) {
      EightBittr.EightBittr.prototype.setRight(a, c);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setBottom = function (a, c) {
      EightBittr.EightBittr.prototype.setBottom(a, c);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setLeft = function (a, c) {
      EightBittr.EightBittr.prototype.setLeft(a, c);
      a.GameStarter.markChanged(a);
    };
    b.prototype.shiftBoth = function (a, c, b, e) {
      c = c || 0;
      b = b || 0;
      a.noshiftx ||
        (a.parallaxHoriz
          ? a.GameStarter.shiftHoriz(a, a.parallaxHoriz * c, e)
          : a.GameStarter.shiftHoriz(a, c, e));
      a.noshifty ||
        (a.parallaxVert
          ? a.GameStarter.shiftVert(a, a.parallaxVert * b, e)
          : a.GameStarter.shiftVert(a, b, e));
    };
    b.prototype.shiftThings = function (a, c, b, e) {
      for (var f = a.length - 1; 0 <= f; --f)
        a[f].GameStarter.shiftBoth(a[f], c, b, e);
    };
    b.prototype.shiftAll = function (a, c) {
      var d = b.prototype.ensureCorrectCaller(this);
      d.GroupHolder.callAll(d, d.shiftThings, a, c, !0);
    };
    b.prototype.setWidth = function (a, c, b, e) {
      a.width = c;
      a.unitwidth = c * a.GameStarter.unitsize;
      b &&
        ((a.spritewidth = c),
        (a.spritewidthpixels = c * a.GameStarter.unitsize));
      e && a.GameStarter.updateSize(a);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setHeight = function (a, b, d, e) {
      a.height = b;
      a.unitheight = b * a.GameStarter.unitsize;
      d &&
        ((a.spriteheight = b),
        (a.spriteheightpixels = b * a.GameStarter.unitsize));
      e && a.GameStarter.updateSize(a);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setSize = function (a, b, d, e, f) {
      a.GameStarter.setWidth(a, b, e, f);
      a.GameStarter.setHeight(a, d, e, f);
    };
    b.prototype.updatePosition = function (a) {
      a.GameStarter.shiftHoriz(a, a.xvel);
      a.GameStarter.shiftVert(a, a.yvel);
    };
    b.prototype.updateSize = function (a) {
      a.unitwidth = a.width * a.GameStarter.unitsize;
      a.unitheight = a.height * a.GameStarter.unitsize;
      a.spritewidthpixels = a.spritewidth * a.GameStarter.unitsize;
      a.spriteheightpixels = a.spriteheight * a.GameStarter.unitsize;
      a.canvas.width = a.spritewidthpixels;
      a.canvas.height = a.spriteheightpixels;
      a.GameStarter.PixelDrawer.setThingSprite(a);
      a.GameStarter.markChanged(a);
    };
    b.prototype.reduceWidth = function (a, b, d) {
      a.right -= b;
      a.width -= b / a.GameStarter.unitsize;
      d ? a.GameStarter.updateSize(a) : a.GameStarter.markChanged(a);
    };
    b.prototype.reduceHeight = function (a, b, d) {
      a.top += b;
      a.height -= b / a.GameStarter.unitsize;
      d ? a.GameStarter.updateSize(a) : a.GameStarter.markChanged(a);
    };
    b.prototype.increaseWidth = function (a, b, d) {
      a.right += b;
      a.width += b / a.GameStarter.unitsize;
      a.unitwidth = a.width * a.GameStarter.unitsize;
      d ? a.GameStarter.updateSize(a) : a.GameStarter.markChanged(a);
    };
    b.prototype.increaseHeight = function (a, b, d) {
      a.top -= b;
      a.height += b / a.GameStarter.unitsize;
      a.unitheight = a.height * a.GameStarter.unitsize;
      d ? a.GameStarter.updateSize(a) : a.GameStarter.markChanged(a);
    };
    b.prototype.generateThingKey = function (a) {
      return a.groupType + " " + a.title + " " + a.className;
    };
    b.prototype.setClass = function (a, b) {
      a.className = b;
      a.GameStarter.PixelDrawer.setThingSprite(a);
      a.GameStarter.markChanged(a);
    };
    b.prototype.setClassInitial = function (a, b) {
      a.className = b;
    };
    b.prototype.addClass = function (a, b) {
      a.className += " " + b;
      a.GameStarter.PixelDrawer.setThingSprite(a);
      a.GameStarter.markChanged(a);
    };
    b.prototype.addClasses = function (a) {
      for (var b = [], d = 1; d < arguments.length; d++)
        b[d - 1] = arguments[d];
      var e, f;
      for (e = 0; e < b.length; e += 1) {
        d = b[e];
        if (d.constructor === String || "string" === typeof d) d = d.split(" ");
        for (f = d.length - 1; 0 <= f; --f) a.GameStarter.addClass(a, d[f]);
      }
    };
    b.prototype.removeClass = function (a, b) {
      b &&
        (-1 !== b.indexOf(" ") && a.GameStarter.removeClasses(a, b),
        (a.className = a.className.replace(new RegExp(" " + b, "gm"), "")),
        a.GameStarter.PixelDrawer.setThingSprite(a));
    };
    b.prototype.removeClasses = function (a) {
      for (var b = [], d = 1; d < arguments.length; d++)
        b[d - 1] = arguments[d];
      var e, f;
      for (e = 0; e < b.length; e += 1) {
        d = b[e];
        if (d.constructor === String || "string" === typeof d) d = d.split(" ");
        for (f = d.length - 1; 0 <= f; --f) a.GameStarter.removeClass(a, d[f]);
      }
    };
    b.prototype.hasClass = function (a, b) {
      return -1 !== a.className.indexOf(b);
    };
    b.prototype.switchClass = function (a, b, d) {
      a.GameStarter.removeClass(a, b);
      a.GameStarter.addClass(a, d);
    };
    b.prototype.flipHoriz = function (a) {
      a.flipHoriz = !0;
      a.GameStarter.addClass(a, "flipped");
    };
    b.prototype.flipVert = function (a) {
      a.flipVert = !0;
      a.GameStarter.addClass(a, "flip-vert");
    };
    b.prototype.unflipHoriz = function (a) {
      a.flipHoriz = !1;
      a.GameStarter.removeClass(a, "flipped");
    };
    b.prototype.unflipVert = function (a) {
      a.flipVert = !1;
      a.GameStarter.removeClass(a, "flip-vert");
    };
    b.prototype.setOpacity = function (a, b) {
      a.opacity = b;
      a.GameStarter.markChanged(a);
    };
    b.prototype.ensureCorrectCaller = function (a) {
      if (!(a instanceof b))
        throw Error(
          "A function requires the scope ('this') to be the manipulated GameStartr object. Unfortunately, 'this' is a " +
            typeof this +
            "."
        );
      return a;
    };
    b.prototype.arrayDeleteThing = function (a, b, d) {
      void 0 === d && (d = b.indexOf(a));
      if (-1 !== d && (b.splice(d, 1), "function" === typeof a.onDelete))
        a.onDelete(a);
    };
    b.prototype.takeScreenshot = function (a, c) {
      void 0 === c && (c = "image/png");
      var d = b.prototype.ensureCorrectCaller(this);
      d.createElement("a", {
        download: a + "." + c.split("/")[1],
        href: d.canvas.toDataURL(c).replace(c, "image/octet-stream"),
      }).click();
    };
    b.prototype.addPageStyles = function (a) {
      var c = b.prototype
          .ensureCorrectCaller(this)
          .createElement("style", { type: "text/css" }),
        d = "",
        e,
        f;
      for (e in a)
        if (a.hasOwnProperty(e)) {
          d += e + " { \r\n";
          for (f in a[e])
            a[e].hasOwnProperty(f) &&
              (d += "  " + f + ": " + a[e][f] + ";\r\n");
          d += "}\r\n";
        }
      c.styleSheet
        ? (c.style.cssText = d)
        : c.appendChild(document.createTextNode(d));
      document.querySelector("head").appendChild(c);
    };
    return b;
  })(EightBittr.EightBittr);
  k.GameStartr = g;
})(GameStartr || (GameStartr = {}));
