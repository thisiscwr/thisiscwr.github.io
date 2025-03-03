var LevelEditr;
(function (q) {
  var r = (function () {
    function b(a) {
      if ("undefined" === typeof a)
        throw Error("No settings object given to LevelEditr.");
      if ("undefined" === typeof a.prethings)
        throw Error("No prethings given to LevelEditr.");
      if ("undefined" === typeof a.thingGroups)
        throw Error("No thingGroups given to LevelEditr.");
      if ("undefined" === typeof a.things)
        throw Error("No things given to LevelEditr.");
      if ("undefined" === typeof a.macros)
        throw Error("No macros given to LevelEditr.");
      if ("undefined" === typeof a.beautifier)
        throw Error("No beautifier given to LevelEditr.");
      this.enabled = !1;
      this.GameStarter = a.GameStarter;
      this.prethings = a.prethings;
      this.thingGroups = a.thingGroups;
      this.things = a.things;
      this.macros = a.macros;
      this.beautifier = a.beautifier;
      this.mapNameDefault = a.mapNameDefault || "New Map";
      this.mapTimeDefault = a.mapTimeDefault || Infinity;
      this.mapSettingDefault = a.mapSettingDefault || "";
      this.mapEntrances = a.mapEntrances || [];
      this.mapDefault = a.mapDefault;
      this.blocksize = a.blocksize || 1;
      this.keyUndefined = a.keyUndefined || "-none-";
      this.currentPreThings = [];
      this.currentMode = "Build";
      this.currentClickMode = "Thing";
      this.canClick = !0;
    }
    b.prototype.getEnabled = function () {
      return this.enabled;
    };
    b.prototype.getGameStarter = function () {
      return this.GameStarter;
    };
    b.prototype.getOldInformation = function () {
      return this.oldInformation;
    };
    b.prototype.getPreThings = function () {
      return this.prethings;
    };
    b.prototype.getThingGroups = function () {
      return this.thingGroups;
    };
    b.prototype.getThings = function () {
      return this.things;
    };
    b.prototype.getMacros = function () {
      return this.macros;
    };
    b.prototype.getMapNameDefault = function () {
      return this.mapNameDefault;
    };
    b.prototype.getMapTimeDefault = function () {
      return this.mapTimeDefault;
    };
    b.prototype.getMapDefault = function () {
      return this.mapDefault;
    };
    b.prototype.getDisplay = function () {
      return this.display;
    };
    b.prototype.getCurrentMode = function () {
      return this.currentMode;
    };
    b.prototype.getBlockSize = function () {
      return this.blocksize;
    };
    b.prototype.getBeautifier = function () {
      return this.beautifier;
    };
    b.prototype.getCurrentPreThings = function () {
      return this.currentPreThings;
    };
    b.prototype.getCurrentTitle = function () {
      return this.currentTitle;
    };
    b.prototype.getCurrentArgs = function () {
      return this.currentArgs;
    };
    b.prototype.getPageStylesAdded = function () {
      return this.pageStylesAdded;
    };
    b.prototype.getKeyUndefined = function () {
      return this.keyUndefined;
    };
    b.prototype.getCanClick = function () {
      return this.canClick;
    };
    b.prototype.enable = function () {
      this.enabled ||
        ((this.enabled = !0),
        (this.oldInformation = {
          map: this.GameStarter.AreaSpawner.getMapName(),
        }),
        this.clearAllThings(),
        this.resetDisplay(),
        this.setCurrentMode("Build"),
        (this.GameStarter.MapScreener.nokeys = !0),
        this.setTextareaValue(this.stringifySmart(this.mapDefault), !0),
        this.resetDisplayMap(),
        this.disableAllThings(),
        this.GameStarter.ItemsHolder.setItem("lives", Infinity),
        this.pageStylesAdded ||
          (this.GameStarter.addPageStyles(this.createPageStyles()),
          (this.pageStylesAdded = !0)),
        this.GameStarter.container.insertBefore(
          this.display.container,
          this.GameStarter.container.children[0]
        ));
    };
    b.prototype.disable = function () {
      this.display &&
        this.enabled &&
        (this.GameStarter.container.removeChild(this.display.container),
        (this.display = void 0),
        this.GameStarter.setMap(this.oldInformation.map),
        this.GameStarter.ItemsHolder.setItem(
          "lives",
          this.GameStarter.settings.statistics.values.lives.valueDefault
        ),
        (this.enabled = !1));
    };
    b.prototype.minimize = function () {
      this.display.minimizer.innerText = "+";
      this.display.minimizer.onclick = this.maximize.bind(this);
      this.display.container.className += " minimized";
      this.display.scrollers.container.style.opacity = "0";
    };
    b.prototype.maximize = function () {
      this.display.minimizer.innerText = "-";
      this.display.minimizer.onclick = this.minimize.bind(this);
      -1 !== this.display.container.className.indexOf("minimized") &&
        (this.display.container.className =
          this.display.container.className.replace(/ minimized/g, ""));
      "Thing" === this.currentClickMode
        ? this.setSectionClickToPlaceThings()
        : "Macro" === this.currentClickMode &&
          this.setSectionClickToPlaceMacros();
      this.display.scrollers.container.style.opacity = "1";
    };
    b.prototype.startBuilding = function () {
      this.setCurrentMode("Build");
      this.beautifyTextareaValue();
      this.setDisplayMap(!0);
      this.maximize();
    };
    b.prototype.startPlaying = function () {
      this.setCurrentMode("Play");
      this.beautifyTextareaValue();
      this.setDisplayMap();
      this.minimize();
    };
    b.prototype.downloadCurrentJSON = function () {
      var a = this.downloadFile(
        this.getMapName() + ".json",
        this.display.stringer.textarea.value || ""
      );
      window.open(a.href);
    };
    b.prototype.setCurrentJSON = function (a) {
      this.startBuilding();
      this.setTextareaValue(a, !0);
      this.getMapObjectAndTry();
    };
    b.prototype.loadCurrentJSON = function () {
      this.display.inputDummy.click();
    };
    b.prototype.beautify = function (a) {
      return this.beautifier(a);
    };
    b.prototype.handleUploadCompletion = function (a) {
      this.enable();
      this.setCurrentJSON(a.currentTarget.result);
      this.setSectionJSON();
    };
    b.prototype.setCurrentMode = function (a) {
      this.currentMode = a;
    };
    b.prototype.setCurrentClickMode = function (a, d) {
      this.currentClickMode = a;
      this.cancelEvent(d);
    };
    b.prototype.setCurrentThing = function (a, d, c) {
      void 0 === d && (d = 0);
      void 0 === c && (c = 0);
      var b = this.generateCurrentArgs(),
        f = this.things[a],
        g = this.GameStarter.proliferate(
          { outerok: 2 },
          this.getNormalizedThingArguments(b)
        ),
        h = this.GameStarter.ObjectMaker.make(this.currentTitle, g);
      this.clearCurrentThings();
      this.currentTitle = a;
      this.currentArgs = b;
      this.currentPreThings = [
        {
          xloc: 0,
          yloc: 0,
          top: -f.offsetTop || 0,
          right: f.offsetLeft + h.width * this.GameStarter.unitsize,
          bottom: (-f.offsetTop || 0) + h.height * this.GameStarter.unitsize,
          left: f.offsetLeft || 0,
          title: this.currentTitle,
          reference: g,
          thing: h,
          spawned: !0,
        },
      ];
      this.addThingAndDisableEvents(this.currentPreThings[0].thing, d, c);
    };
    b.prototype.resetCurrentThings = function (a) {
      var d, c;
      for (c = 0; c < this.currentPreThings.length; c += 1)
        (d = this.currentPreThings[c]),
          (d.thing.outerok = 2),
          this.GameStarter.addThing(d.thing, d.xloc || 0, d.yloc || 0),
          this.disableThing(d.thing);
      this.onMouseMoveEditing(a);
      this.GameStarter.TimeHandler.cancelAllEvents();
    };
    b.prototype.clearCurrentThings = function () {
      if (this.currentPreThings) {
        for (var a = 0; a < this.currentPreThings.length; a += 1)
          this.GameStarter.killNormal(this.currentPreThings[a].thing);
        this.currentPreThings = [];
      }
    };
    b.prototype.setCurrentArgs = function (a) {
      if ("Thing" === this.currentClickMode)
        this.setCurrentThing(this.currentTitle);
      else if ("Macro" === this.currentClickMode)
        this.onMacroIconClick(
          this.currentTitle,
          void 0,
          this.generateCurrentArgs(),
          a
        );
      a && a.stopPropagation();
    };
    b.prototype.onMouseDownScrolling = function (a, d) {
      var c = d.target,
        b = this;
      c.setAttribute("scrolling", "1");
      this.GameStarter.TimeHandler.addEventInterval(
        function () {
          if ("1" !== c.getAttribute("scrolling")) return !0;
          if (0 > a && 0 >= b.GameStarter.MapScreener.left)
            b.display.scrollers.left.style.opacity = ".14";
          else {
            for (var d = 0; d < b.currentPreThings.length; d += 1)
              b.GameStarter.shiftHoriz(b.currentPreThings[d].thing, a);
            b.GameStarter.scrollWindow(a);
            b.display.scrollers.left.style.opacity = "1";
          }
        },
        1,
        Infinity
      );
    };
    b.prototype.onMouseUpScrolling = function (a) {
      a.target.setAttribute("scrolling", "0");
    };
    b.prototype.onMouseMoveEditing = function (a) {
      var d = a.x || a.clientX || 0;
      a = a.y || a.clientY || 0;
      var c, b, f, g;
      for (g = 0; g < this.currentPreThings.length; g += 1)
        (c = this.currentPreThings[g]),
          (b = this.roundTo(
            d - this.GameStarter.container.offsetLeft,
            this.blocksize
          )),
          (f = this.roundTo(
            a - this.GameStarter.container.offsetTop,
            this.blocksize
          )),
          c.left && (b += c.left * this.GameStarter.unitsize),
          c.top && (f -= c.top * this.GameStarter.unitsize),
          this.GameStarter.setLeft(c.thing, b),
          this.GameStarter.setTop(c.thing, f);
    };
    b.prototype.afterClick = function () {
      this.canClick = !1;
      setTimeout(
        function () {
          this.canClick = !0;
        }.bind(this),
        70
      );
    };
    b.prototype.onClickEditingThing = function (a) {
      if (
        this.canClick &&
        "Build" === this.currentMode &&
        this.currentPreThings.length
      ) {
        var d = this.getNormalizedMouseEventCoordinates(a, !0);
        a = d[0];
        d = d[1];
        this.addMapCreationThing(a, d) &&
          (this.onClickEditingGenericAdd(
            a,
            d,
            this.currentTitle,
            this.currentArgs
          ),
          this.afterClick());
      }
    };
    b.prototype.onClickEditingMacro = function (a) {
      if (
        this.canClick &&
        "Build" === this.currentMode &&
        this.currentPreThings.length
      ) {
        var d = this.getNormalizedMouseEventCoordinates(a);
        a = d[0];
        var d = d[1],
          b,
          e;
        if (this.addMapCreationMacro(a, d)) {
          for (e = 0; e < this.currentPreThings.length; e += 1)
            (b = this.currentPreThings[e]),
              this.onClickEditingGenericAdd(
                a + (b.left || 0) * this.GameStarter.unitsize,
                d - (b.top || 0) * this.GameStarter.unitsize,
                b.thing.title || b.title,
                b.reference
              );
          this.afterClick();
        }
      }
    };
    b.prototype.onClickEditingGenericAdd = function (a, d, b, e) {
      b = this.GameStarter.ObjectMaker.make(
        b,
        this.GameStarter.proliferate(
          {
            onThingMake: void 0,
            onThingAdd: void 0,
            onThingAdded: void 0,
            movement: void 0,
          },
          this.getNormalizedThingArguments(e)
        )
      );
      a -= this.GameStarter.container.offsetLeft;
      d -= this.GameStarter.container.offsetTop;
      "Build" === this.currentMode && this.disableThing(b);
      this.addThingAndDisableEvents(b, a, d);
    };
    b.prototype.onThingIconClick = function (a, d) {
      var b = d.x || d.clientX || 0,
        e = d.y || d.clientY || 0,
        f = "DIV" === d.target.nodeName ? d.target : d.target.parentNode;
      this.cancelEvent(d);
      this.killCurrentPreThings();
      this.setVisualOptions(f.getAttribute("name"), void 0, f.options);
      this.generateCurrentArgs();
      this.setCurrentThing(a, b, e);
    };
    b.prototype.onMacroIconClick = function (a, d, b, e) {
      d && this.setVisualOptions(a, d, b);
      if ((d = this.getMapObject()))
        this.clearCurrentThings(),
          this.GameStarter.MapsCreator.analyzePreMacro(
            this.GameStarter.proliferate(
              { macro: a, x: 0, y: 0 },
              this.generateCurrentArgs()
            ),
            this.createPrethingsHolder(this.currentPreThings),
            this.getCurrentAreaObject(d),
            d
          ),
          (this.currentTitle = a),
          this.resetCurrentThings(e);
    };
    b.prototype.createPrethingsHolder = function (a) {
      var d = {};
      this.thingGroups.forEach(function (b) {
        d[b] = a;
      });
      return d;
    };
    b.prototype.generateCurrentArgs = function () {
      var a = {},
        d =
          this.display.sections.ClickToPlace.VisualOptions.getElementsByClassName(
            "VisualOptionsList"
          ),
        b,
        e,
        f;
      this.currentArgs = a;
      if (0 === d.length) return a;
      d = d[0].childNodes;
      for (f = 0; f < d.length; f += 1) {
        b = d[f];
        e = b.querySelector(".VisualOptionLabel");
        b = b.querySelector(".VisualOptionValue");
        switch ((b.getAttribute("data:type") || b.type).toLowerCase()) {
          case "boolean":
            b = "true" === b.value;
            break;
          case "number":
            b =
              (Number(b.value) || 0) *
              (Number(b.getAttribute("data:mod")) || 1);
            break;
          default:
            b =
              "Number" === b.getAttribute("typeReal")
                ? Number(b.value)
                : b.value;
        }
        b !== this.keyUndefined && (a[e.textContent] = b);
      }
      return a;
    };
    b.prototype.setMapName = function () {
      var a = this.getMapName(),
        d = this.getMapObject();
      d &&
        d.name !== a &&
        ((d.name = a),
        (this.display.namer.value = a),
        this.setTextareaValue(this.stringifySmart(d), !0),
        this.GameStarter.ItemsHolder.setItem("world", a));
    };
    b.prototype.setMapTime = function (a) {
      var d = this.getMapObject();
      d &&
        (a
          ? ((a = Number(this.display.sections.MapSettings.Time.value)),
            (d.time = a))
          : ((a = d.time),
            (this.display.sections.MapSettings.Time.value = a.toString())),
        this.setTextareaValue(this.stringifySmart(d), !0),
        this.GameStarter.ItemsHolder.setItem("time", a),
        this.GameStarter.TimeHandler.cancelAllEvents());
    };
    b.prototype.setMapSetting = function (a, d) {
      var b = this.getMapObject(),
        e,
        f;
      b &&
        ((e = this.getCurrentAreaObject(b)),
        a
          ? ((f = this.display.sections.MapSettings.Setting.Primary.value),
            this.display.sections.MapSettings.Setting.Secondary.value &&
              (f +=
                " " +
                this.display.sections.MapSettings.Setting.Secondary.value),
            this.display.sections.MapSettings.Setting.Tertiary.value &&
              (f +=
                " " + this.display.sections.MapSettings.Setting.Tertiary.value),
            (e.setting = f))
          : ((f = e.setting.split(" ")),
            (this.display.sections.MapSettings.Setting.Primary.value = f[0]),
            (this.display.sections.MapSettings.Setting.Secondary.value = f[1]),
            (this.display.sections.MapSettings.Setting.Tertiary.value = f[2])),
        this.setTextareaValue(this.stringifySmart(b), !0),
        this.setDisplayMap(!0),
        this.resetCurrentThings(d));
    };
    b.prototype.setLocationArea = function () {
      var a = this.getMapObject(),
        d;
      a &&
        ((d = this.getCurrentLocationObject(a)),
        (d.area = this.getCurrentArea()),
        this.setTextareaValue(this.stringifySmart(a), !0),
        this.setDisplayMap(!0));
    };
    b.prototype.setMapEntry = function (a) {
      var d = this.getMapObject(),
        b,
        e;
      d &&
        ((b = this.getCurrentLocationObject(d)),
        a
          ? ((e = this.display.sections.MapSettings.Entry.value), (b.entry = e))
          : (this.display.sections.MapSettings.Entry.value = e),
        this.setTextareaValue(this.stringifySmart(d), !0),
        this.setDisplayMap(!0));
    };
    b.prototype.setCurrentLocation = function () {
      var a = this.getMapObject(),
        b;
      a &&
        ((b = this.getCurrentLocationObject(a)),
        (this.display.sections.MapSettings.Area.value = b.area
          ? b.area.toString()
          : "0"),
        this.setTextareaValue(this.stringifySmart(a), !0),
        this.setDisplayMap(!0));
    };
    b.prototype.addLocationToMap = function () {
      var a =
          this.display.sections.MapSettings.Location.options.length.toString(),
        b = this.getMapObject();
      b &&
        ((b.locations[a] = { entry: this.mapEntrances[0] }),
        this.resetAllVisualOptionSelects(
          "VisualOptionLocation",
          Object.keys(b.locations)
        ),
        this.setTextareaValue(this.stringifySmart(b), !0),
        this.setDisplayMap(!0));
    };
    b.prototype.addAreaToMap = function () {
      var a = this.display.sections.MapSettings.Area.options.length.toString(),
        b = this.getMapObject();
      b &&
        ((b.areas[a] = { setting: this.mapSettingDefault, creation: [] }),
        this.resetAllVisualOptionSelects(
          "VisualOptionArea",
          Object.keys(b.areas)
        ),
        this.setTextareaValue(this.stringifySmart(b), !0),
        this.setDisplayMap(!0));
    };
    b.prototype.resetAllVisualOptionSelects = function (a, b) {
      var c = this.getMapObject(),
        e = this.display.container.getElementsByClassName(a),
        f = {
          children: b.map(function (a) {
            return new Option(a, a);
          }),
        },
        g,
        h;
      if (c)
        for (h = 0; h < e.length; h += 1)
          (c = e[h]),
            (g = c.value),
            (c.textContent = ""),
            this.GameStarter.proliferateElement(c, f),
            (c.value = g);
    };
    b.prototype.getMapObject = function () {
      var a;
      try {
        (a = this.parseSmart(this.display.stringer.textarea.value)),
          (this.display.stringer.messenger.textContent = ""),
          (this.display.namer.value = a.name || this.mapNameDefault);
      } catch (b) {
        this.setSectionJSON(),
          (this.display.stringer.messenger.textContent = b.message);
      }
      return a;
    };
    b.prototype.getMapObjectAndTry = function (a) {
      var b = this.getMapName() + "::Temporary",
        c = this.getMapObject();
      if (c) {
        try {
          this.GameStarter.MapsCreator.storeMap(b, c),
            this.GameStarter.MapsCreator.getMap(b),
            this.setDisplayMap(!0);
        } catch (e) {
          this.display.stringer.messenger.textContent = e.message;
        }
        a && a.stopPropagation();
      }
    };
    b.prototype.getCurrentArea = function () {
      return this.display.sections.MapSettings.Area.value;
    };
    b.prototype.getCurrentAreaObject = function (a) {
      void 0 === a && (a = this.getMapObject());
      var b = a.locations[this.getCurrentLocation()].area;
      return a.areas[b ? b.toString() : "0"];
    };
    b.prototype.getCurrentLocation = function () {
      return this.display.sections.MapSettings.Location.value;
    };
    b.prototype.getCurrentLocationObject = function (a) {
      return a.locations[this.getCurrentLocation()];
    };
    b.prototype.addMapCreationThing = function (a, b) {
      var c = this.getMapObject(),
        e = this.GameStarter.proliferate(
          {
            thing: this.currentTitle,
            x:
              this.getNormalizedX(a) +
              this.GameStarter.MapScreener.left / this.GameStarter.unitsize,
            y: this.getNormalizedY(b),
          },
          this.currentArgs
        );
      if (!c) return !1;
      c.areas[this.getCurrentArea()].creation.push(e);
      this.setTextareaValue(this.stringifySmart(c), !0);
      return !0;
    };
    b.prototype.addMapCreationMacro = function (a, b) {
      var c = this.getMapObject(),
        e = this.GameStarter.proliferate(
          {
            macro: this.currentTitle,
            x:
              this.getNormalizedX(a) +
              this.GameStarter.MapScreener.left / this.GameStarter.unitsize,
            y: this.getNormalizedY(b),
          },
          this.generateCurrentArgs()
        );
      if (!c) return !1;
      c.areas[this.getCurrentArea()].creation.push(e);
      this.setTextareaValue(this.stringifySmart(c), !0);
      return !0;
    };
    b.prototype.resetDisplay = function () {
      this.display = {
        container: this.GameStarter.createElement("div", {
          className: "LevelEditor",
          onclick: this.cancelEvent.bind(this),
          ondragenter: this.handleDragEnter.bind(this),
          ondragover: this.handleDragOver.bind(this),
          ondrop: this.handleDragDrop.bind(this),
        }),
        scrollers: {},
        stringer: {},
        sections: {
          ClickToPlace: {},
          MapSettings: { Setting: {} },
          buttons: { ClickToPlace: {} },
        },
      };
      this.resetDisplayScrollers();
      this.resetDisplayGui();
      this.resetDisplayHead();
      this.resetDisplaySectionChoosers();
      this.resetDisplayOptionsList();
      this.resetDisplayMapSettings();
      setTimeout(this.resetDisplayThinCheck.bind(this));
    };
    b.prototype.resetDisplayThinCheck = function () {
      var a = this.display.gui.clientWidth;
      385 >= a
        ? (this.display.container.className += " thin")
        : 560 <= a && (this.display.container.className += " thick");
    };
    b.prototype.resetDisplayGui = function () {
      this.display.gui = this.GameStarter.createElement("div", {
        className: "EditorGui",
      });
      this.display.container.appendChild(this.display.gui);
    };
    b.prototype.resetDisplayScrollers = function () {
      this.display.scrollers = {
        left: this.GameStarter.createElement("div", {
          className: "EditorScroller EditorScrollerLeft",
          onmousedown: this.onMouseDownScrolling.bind(
            this,
            2 * -this.GameStarter.unitsize
          ),
          onmouseup: this.onMouseUpScrolling.bind(this),
          onmouseout: this.onMouseUpScrolling.bind(this),
          onclick: this.cancelEvent.bind(this),
          innerText: "<",
          style: { opacity: 0.14 },
        }),
        right: this.GameStarter.createElement("div", {
          className: "EditorScroller EditorScrollerRight",
          onmousedown: this.onMouseDownScrolling.bind(
            this,
            2 * this.GameStarter.unitsize
          ),
          onmouseup: this.onMouseUpScrolling.bind(this),
          onmouseout: this.onMouseUpScrolling.bind(this),
          onclick: this.cancelEvent.bind(this),
          innerText: ">",
        }),
        container: this.GameStarter.createElement("div", {
          className: "EditorScrollers",
          onmousemove: this.onMouseMoveEditing.bind(this),
          onclick: this.onClickEditingThing.bind(this),
        }),
      };
      this.display.scrollers.container.appendChild(this.display.scrollers.left);
      this.display.scrollers.container.appendChild(
        this.display.scrollers.right
      );
      this.display.container.appendChild(this.display.scrollers.container);
    };
    b.prototype.resetDisplayHead = function () {
      this.display.minimizer = this.GameStarter.createElement("div", {
        className: "EditorHeadButton EditorMinimizer",
        onclick: this.minimize.bind(this),
        textContent: "-",
      });
      this.display.head = this.GameStarter.createElement("div", {
        className: "EditorHead",
        children: [
          this.GameStarter.createElement("div", {
            className: "EditorNameContainer",
            children: [
              (this.display.namer = this.GameStarter.createElement("input", {
                className: "EditorNameInput",
                type: "text",
                placeholder: this.mapNameDefault,
                value: this.mapNameDefault,
                onkeyup: this.setMapName.bind(this),
                onchange: this.setMapName.bind(this),
              })),
            ],
          }),
          this.display.minimizer,
          this.GameStarter.createElement("div", {
            className: "EditorHeadButton EditorCloser",
            textContent: "X",
            onclick: this.disable.bind(this),
          }),
        ],
      });
      this.display.gui.appendChild(this.display.head);
    };
    b.prototype.resetDisplaySectionChoosers = function () {
      var a = this.GameStarter.createElement("div", {
        className: "EditorSectionChoosers",
        onclick: this.cancelEvent.bind(this),
        children: [
          (this.display.sections.buttons.ClickToPlace.container =
            this.GameStarter.createElement("div", {
              className:
                "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
              style: { background: "white" },
              textContent: "Visual",
              onclick: this.setSectionClickToPlace.bind(this),
            })),
          (this.display.sections.buttons.MapSettings =
            this.GameStarter.createElement("div", {
              className:
                "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
              style: { background: "gray" },
              textContent: "Map",
              onclick: this.setSectionMapSettings.bind(this),
            })),
          (this.display.sections.buttons.JSON = this.GameStarter.createElement(
            "div",
            {
              className:
                "EditorMenuOption EditorSectionChooser EditorMenuOptionThird",
              style: { background: "gray" },
              textContent: "JSON",
              onclick: this.setSectionJSON.bind(this),
            }
          )),
        ],
      });
      this.display.gui.appendChild(a);
    };
    b.prototype.resetDisplayOptionsList = function () {
      this.display.sections.ClickToPlace.container =
        this.GameStarter.createElement("div", {
          className: "EditorOptionsList EditorSectionMain",
          onclick: this.cancelEvent.bind(this),
        });
      this.resetDisplayOptionsListSubOptionsMenu();
      this.resetDisplayOptionsListSubOptions();
      this.display.gui.appendChild(
        this.display.sections.ClickToPlace.container
      );
    };
    b.prototype.resetDisplayOptionsListSubOptionsMenu = function () {
      var a = this.GameStarter.createElement("div", {
        className: "EditorSubOptionsListsMenu",
      });
      this.display.sections.buttons.ClickToPlace.Things =
        this.GameStarter.createElement("div", {
          className:
            "EditorMenuOption EditorSubOptionsListChooser EditorMenuOptionHalf",
          textContent: "Things",
          onclick: this.setSectionClickToPlaceThings.bind(this),
          style: { background: "#CCC" },
        });
      this.display.sections.buttons.ClickToPlace.Macros =
        this.GameStarter.createElement("div", {
          className:
            "EditorMenuOption EditorSubOptionsListChooser EditorMenuOptionHalf",
          textContent: "Macros",
          onclick: this.setSectionClickToPlaceMacros.bind(this),
          style: { background: "#777" },
        });
      a.appendChild(this.display.sections.buttons.ClickToPlace.Things);
      a.appendChild(this.display.sections.buttons.ClickToPlace.Macros);
      this.display.sections.ClickToPlace.container.appendChild(a);
    };
    b.prototype.resetDisplayMapSettings = function () {
      this.display.sections.MapSettings.container =
        this.GameStarter.createElement("div", {
          className: "EditorMapSettings EditorSectionMain",
          onclick: this.cancelEvent.bind(this),
          style: { display: "none" },
          children: [
            this.GameStarter.createElement("div", {
              className: "EditorMenuOption",
              textContent: "+ Add Area",
              onclick: this.addAreaToMap.bind(this),
            }),
            this.GameStarter.createElement("div", {
              className: "EditorMenuOption",
              textContent: "+ Add Location",
              onclick: this.addLocationToMap.bind(this),
            }),
          ],
        });
      this.resetDisplayMapSettingsCurrent();
      this.resetDisplayMapSettingsMap();
      this.resetDisplayMapSettingsArea();
      this.resetDisplayMapSettingsLocation();
      this.resetDisplayJSON();
      this.resetDisplayVisualContainers();
      this.resetDisplayButtons();
      this.display.gui.appendChild(this.display.sections.MapSettings.container);
    };
    b.prototype.resetDisplayMapSettingsCurrent = function () {
      this.display.sections.MapSettings.container.appendChild(
        this.GameStarter.createElement("div", {
          className: "EditorMapSettingsSubGroup",
          children: [
            this.GameStarter.createElement("label", {
              textContent: "Current Location",
            }),
            (this.display.sections.MapSettings.Location = this.createSelect(
              ["0"],
              {
                className: "VisualOptionLocation",
                onchange: this.setCurrentLocation.bind(this),
              }
            )),
          ],
        })
      );
    };
    b.prototype.resetDisplayMapSettingsMap = function () {
      this.display.sections.MapSettings.container.appendChild(
        this.GameStarter.createElement("div", {
          className: "EditorMapSettingsGroup",
          children: [
            this.GameStarter.createElement("h4", { textContent: "Map" }),
            this.GameStarter.createElement("div", {
              className: "EditorMapSettingsSubGroup",
              children: [
                this.GameStarter.createElement("label", {
                  className: "EditorMapSettingsLabel",
                  textContent: "Time",
                }),
                (this.display.sections.MapSettings.Time = this.createSelect(
                  "100 200 300 400 500 1000 Infinity".split(" "),
                  {
                    value: this.mapTimeDefault.toString(),
                    onchange: this.setMapTime.bind(this, !0),
                  }
                )),
              ],
            }),
          ],
        })
      );
    };
    b.prototype.resetDisplayMapSettingsArea = function () {
      this.display.sections.MapSettings.container.appendChild(
        this.GameStarter.createElement("div", {
          className: "EditorMapSettingsGroup",
          children: [
            this.GameStarter.createElement("h4", { textContent: "Area" }),
            this.GameStarter.createElement("div", {
              className: "EditorMapSettingsSubGroup",
              children: [
                this.GameStarter.createElement("label", {
                  textContent: "Setting",
                }),
                (this.display.sections.MapSettings.Setting.Primary =
                  this.createSelect(
                    ["Overworld", "Underworld", "Underwater", "Castle"],
                    { onchange: this.setMapSetting.bind(this, !0) }
                  )),
                (this.display.sections.MapSettings.Setting.Secondary =
                  this.createSelect(["", "Night", "Underwater", "Alt"], {
                    onchange: this.setMapSetting.bind(this, !0),
                  })),
                (this.display.sections.MapSettings.Setting.Tertiary =
                  this.createSelect(["", "Night", "Underwater", "Alt"], {
                    onchange: this.setMapSetting.bind(this, !0),
                  })),
              ],
            }),
          ],
        })
      );
    };
    b.prototype.resetDisplayMapSettingsLocation = function () {
      this.display.sections.MapSettings.container.appendChild(
        this.GameStarter.createElement("div", {
          className: "EditorMapSettingsGroup",
          children: [
            this.GameStarter.createElement("h4", { textContent: "Location" }),
            this.GameStarter.createElement("div", {
              className: "EditorMapSettingsSubGroup",
              children: [
                this.GameStarter.createElement("label", {
                  textContent: "Area",
                }),
                (this.display.sections.MapSettings.Area = this.createSelect(
                  ["0"],
                  {
                    className: "VisualOptionArea",
                    onchange: this.setLocationArea.bind(this, !0),
                  }
                )),
              ],
            }),
            this.GameStarter.createElement("div", {
              className: "EditorMapSettingsSubGroup",
              children: [
                this.GameStarter.createElement("label", {
                  textContent: "Entrance",
                }),
                (this.display.sections.MapSettings.Entry = this.createSelect(
                  this.mapEntrances,
                  { onchange: this.setMapEntry.bind(this, !0) }
                )),
              ],
            }),
          ],
        })
      );
    };
    b.prototype.resetDisplayJSON = function () {
      this.display.sections.JSON = this.GameStarter.createElement("div", {
        className: "EditorJSON EditorSectionMain",
        onclick: this.cancelEvent.bind(this),
        style: { display: "none" },
        children: [
          (this.display.stringer.textarea = this.GameStarter.createElement(
            "textarea",
            {
              className: "EditorJSONInput",
              spellcheck: !1,
              onkeyup: this.getMapObjectAndTry.bind(this),
              onchange: this.getMapObjectAndTry.bind(this),
              onkeydown: function (a) {
                a.stopPropagation();
              },
            }
          )),
          (this.display.stringer.messenger = this.GameStarter.createElement(
            "div",
            { className: "EditorJSONInfo" }
          )),
        ],
      });
      this.display.gui.appendChild(this.display.sections.JSON);
    };
    b.prototype.resetDisplayVisualContainers = function () {
      this.display.sections.ClickToPlace.VisualOptions =
        this.GameStarter.createElement("div", {
          textContent: "Click an icon to view options.",
          className: "EditorVisualOptions",
          onclick: this.cancelEvent.bind(this),
        });
      this.display.gui.appendChild(
        this.display.sections.ClickToPlace.VisualOptions
      );
    };
    b.prototype.resetDisplayButtons = function () {
      var a = this;
      this.display.gui.appendChild(
        this.GameStarter.createElement("div", {
          className: "EditorMenu",
          onclick: this.cancelEvent.bind(this),
          children: (function (b) {
            return Object.keys(b).map(function (c) {
              return a.GameStarter.createElement("div", {
                className:
                  "EditorMenuOption EditorMenuOptionFifth EditorMenuOption-" +
                  c,
                textContent: c,
                onclick: b[c][0].bind(a),
                children: b[c][1],
              });
            });
          })({
            Build: [this.startBuilding.bind(this)],
            Play: [this.startPlaying.bind(this)],
            Save: [this.downloadCurrentJSON.bind(this)],
            Load: [
              this.loadCurrentJSON.bind(this),
              (this.display.inputDummy = this.GameStarter.createElement(
                "input",
                {
                  type: "file",
                  style: { display: "none" },
                  onchange: this.handleUploadStart.bind(this),
                }
              )),
            ],
            Reset: [this.resetDisplayMap.bind(this)],
          }),
        })
      );
    };
    b.prototype.resetDisplayOptionsListSubOptions = function () {
      this.resetDisplayOptionsListSubOptionsThings();
      this.resetDisplayOptionsListSubOptionsMacros();
    };
    b.prototype.resetDisplayOptionsListSubOptionsThings = function () {
      var a = this,
        b = this.getPrethingSizeArguments.bind(this),
        c = this.onThingIconClick;
      this.display.sections.ClickToPlace.Things &&
        this.display.sections.ClickToPlace.container.removeChild(
          this.display.sections.ClickToPlace.Things
        );
      this.display.sections.ClickToPlace.Things =
        this.GameStarter.createElement("div", {
          className:
            "EditorSectionSecondary EditorOptions EditorOptions-Things",
          style: { display: "block" },
          children: (function () {
            var e = 0,
              f = Object.keys(a.prethings).map(function (e) {
                var f = a.prethings[e],
                  g = Object.keys(f).map(function (g) {
                    var k = a.GameStarter.ObjectMaker.make(g, b(f[g])),
                      m = a.GameStarter.createElement("div", {
                        className: "EditorListOption",
                        options: a.prethings[e][g].options,
                        children: [k.canvas],
                        onclick: c.bind(a, g),
                      }),
                      n = (70 - k.width * a.GameStarter.unitsize) / 2,
                      p = (70 - k.height * a.GameStarter.unitsize) / 2;
                    m.setAttribute("name", g);
                    k.canvas.style.top = p + "px";
                    k.canvas.style.right = n + "px";
                    k.canvas.style.bottom = p + "px";
                    k.canvas.style.left = n + "px";
                    a.GameStarter.PixelDrawer.setThingSprite(k);
                    return m;
                  });
                return a.GameStarter.createElement("div", {
                  className: "EditorOptionContainer",
                  style: { display: "none" },
                  children: g,
                });
              }),
              g = a.createSelect(Object.keys(a.prethings), {
                className: "EditorOptionContainerSwitchers",
                onchange: function () {
                  f[e + 1].style.display = "none";
                  f[g.selectedIndex + 1].style.display = "block";
                  e = g.selectedIndex;
                },
              });
            f[0].style.display = "block";
            f.unshift(g);
            return f;
          })(),
        });
      this.display.sections.ClickToPlace.container.appendChild(
        this.display.sections.ClickToPlace.Things
      );
    };
    b.prototype.resetDisplayOptionsListSubOptionsMacros = function () {
      var a = this;
      this.display.sections.ClickToPlace.Macros &&
        this.display.sections.ClickToPlace.container.removeChild(
          this.display.sections.ClickToPlace.Macros
        );
      a.display.sections.ClickToPlace.Macros = a.GameStarter.createElement(
        "div",
        {
          className:
            "EditorSectionSecondary EditorOptions EditorOptions-Macros",
          style: { display: "none" },
          children: Object.keys(a.macros).map(function (b) {
            var c = a.macros[b];
            return a.GameStarter.createElement("div", {
              className: "EditorOptionContainer",
              children: [
                a.GameStarter.createElement("div", {
                  className: "EditorOptionTitle EditorMenuOption",
                  textContent: b,
                  onclick: a.onMacroIconClick.bind(
                    a,
                    b,
                    c.description,
                    c.options
                  ),
                }),
              ],
            });
          }),
        }
      );
      this.display.sections.ClickToPlace.container.appendChild(
        this.display.sections.ClickToPlace.Macros
      );
    };
    b.prototype.setSectionClickToPlace = function () {
      this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
      this.display.sections.ClickToPlace.container.style.display = "block";
      this.display.sections.MapSettings.container.style.display = "none";
      this.display.sections.JSON.style.display = "none";
      this.display.sections.buttons.ClickToPlace.container.style.backgroundColor =
        "white";
      this.display.sections.buttons.MapSettings.style.background = "gray";
      this.display.sections.buttons.JSON.style.background = "gray";
      "Thing" !== this.currentClickMode &&
        "Macro" !== this.currentClickMode &&
        this.display.sections.buttons.ClickToPlace.Things.click();
    };
    b.prototype.setSectionMapSettings = function (a) {
      this.setCurrentClickMode("Map", a);
      this.display.sections.ClickToPlace.VisualOptions.style.display = "none";
      this.display.sections.ClickToPlace.container.style.display = "none";
      this.display.sections.MapSettings.container.style.display = "block";
      this.display.sections.JSON.style.display = "none";
      this.display.sections.buttons.ClickToPlace.container.style.background =
        "gray";
      this.display.sections.buttons.MapSettings.style.background = "white";
      this.display.sections.buttons.JSON.style.background = "gray";
    };
    b.prototype.setSectionJSON = function (a) {
      this.setCurrentClickMode("JSON", a);
      this.display.sections.ClickToPlace.VisualOptions.style.display = "none";
      this.display.sections.ClickToPlace.container.style.display = "none";
      this.display.sections.MapSettings.container.style.display = "none";
      this.display.sections.JSON.style.display = "block";
      this.display.sections.buttons.ClickToPlace.container.style.background =
        "gray";
      this.display.sections.buttons.MapSettings.style.background = "gray";
      this.display.sections.buttons.JSON.style.background = "white";
    };
    b.prototype.setSectionClickToPlaceThings = function (a) {
      this.setCurrentClickMode("Thing", a);
      this.display.container.onclick = this.onClickEditingThing.bind(this);
      this.display.scrollers.container.onclick =
        this.onClickEditingThing.bind(this);
      this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
      this.display.sections.ClickToPlace.Things.style.display = "block";
      this.display.sections.ClickToPlace.Macros.style.display = "none";
      this.display.sections.buttons.ClickToPlace.Things.style.background =
        "#CCC";
      this.display.sections.buttons.ClickToPlace.Macros.style.background =
        "#777";
    };
    b.prototype.setSectionClickToPlaceMacros = function (a) {
      this.setCurrentClickMode("Macro", a);
      this.display.container.onclick = this.onClickEditingMacro.bind(this);
      this.display.scrollers.container.onclick =
        this.onClickEditingMacro.bind(this);
      this.display.sections.ClickToPlace.VisualOptions.style.display = "block";
      this.display.sections.ClickToPlace.Things.style.display = "none";
      this.display.sections.ClickToPlace.Macros.style.display = "block";
      this.display.sections.buttons.ClickToPlace.Things.style.background =
        "#777";
      this.display.sections.buttons.ClickToPlace.Macros.style.background =
        "#CCC";
    };
    b.prototype.setTextareaValue = function (a, b) {
      void 0 === b && (b = !1);
      this.display.stringer.textarea.value = b ? this.beautifier(a) : a;
    };
    b.prototype.beautifyTextareaValue = function () {
      this.display.stringer.textarea.value = this.beautifier(
        this.display.stringer.textarea.value
      );
    };
    b.prototype.setVisualOptions = function (a, b, c) {
      var e = this.display.sections.ClickToPlace.VisualOptions,
        f = this.createVisualOption.bind(this),
        g = this;
      e.textContent = "";
      e.appendChild(
        this.GameStarter.createElement("h3", {
          className: "VisualOptionName",
          textContent: a.replace(/([A-Z][a-z])/g, " $1"),
        })
      );
      b &&
        e.appendChild(
          this.GameStarter.createElement("div", {
            className: "VisualOptionDescription",
            textContent: b,
          })
        );
      c &&
        e.appendChild(
          g.GameStarter.createElement("div", {
            className: "VisualOptionsList",
            children: Object.keys(c).map(function (a) {
              return g.GameStarter.createElement("div", {
                className: "VisualOption",
                children: [
                  g.GameStarter.createElement("div", {
                    className: "VisualOptionLabel",
                    textContent: a,
                  }),
                  f(c[a]),
                ],
              });
            }),
          })
        );
    };
    b.prototype.createVisualOption = function (a) {
      a = this.createVisualOptionObject(a);
      switch (a.type) {
        case "Boolean":
          return this.createVisualOptionBoolean();
        case "Number":
          return this.createVisualOptionNumber(a);
        case "Select":
          return this.createVisualOptionSelect(a);
        case "String":
          return this.createVisualOptionString(a);
        case "Location":
          return this.createVisualOptionLocation(a);
        case "Area":
          return this.createVisualOptionArea(a);
        case "Everything":
          return this.createVisualOptionEverything(a);
        default:
          throw Error("Unknown type requested: '" + a.type + "'.");
      }
    };
    b.prototype.createVisualOptionObject = function (a) {
      switch (a.constructor) {
        case Number:
          a = { type: "Number", mod: a };
          break;
        case String:
          a = { type: a };
          break;
        case Array:
          a = { type: "Select", options: a };
          break;
      }
      return a;
    };
    b.prototype.createVisualOptionBoolean = function () {
      var a = this.createSelect(["false", "true"], {
        className: "VisualOptionValue",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data:type", "Boolean");
      return a;
    };
    b.prototype.createVisualOptionNumber = function (a) {
      var b = this;
      return this.GameStarter.createElement("div", {
        className: "VisualOptionHolder",
        children: (function () {
          var c = a.mod || 1,
            e = b.GameStarter.createElement("input", {
              type: "Number",
              "data:type": "Number",
              value: void 0 === a.value ? 1 : a.value,
              className: "VisualOptionValue modReal" + c,
              onkeyup: b.setCurrentArgs.bind(b),
              onchange: b.setCurrentArgs.bind(b),
            }),
            f =
              1 < c &&
              b.GameStarter.createElement("div", {
                className: "VisualOptionRecommendation",
                textContent: "x" + a.mod,
              }),
            g = [e];
          e.setAttribute("data:mod", c.toString());
          e.setAttribute("data:type", "Number");
          e.setAttribute("typeReal", "Number");
          if (a.Infinite) {
            var h = void 0,
              l = b.createSelect(["Number", "Infinite"], {
                className: "VisualOptionInfiniter",
                onchange: function (a) {
                  "Number" === l.value
                    ? ((e.type = "Number"),
                      (e.disabled = !1),
                      (e.style.display = ""),
                      f && (f.style.display = ""),
                      (e.value = h))
                    : ((e.type = "Text"),
                      (e.disabled = !0),
                      (e.style.display = "none"),
                      f && (f.style.display = "none"),
                      (h = e.value),
                      (e.value = "Infinity"));
                  e.onchange(a);
                },
              });
            Infinity === a.value &&
              ((l.value = "Infinite"), l.onchange(void 0));
            g.push(l);
          }
          f && g.push(f);
          return g;
        })(),
      });
    };
    b.prototype.createVisualOptionSelect = function (a) {
      a = this.createSelect(a.options, {
        className: "VisualOptionValue",
        "data:type": "Select",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data:type", "Select");
      return a;
    };
    b.prototype.createVisualOptionString = function (a) {
      a = this.createSelect(a.options, {
        className: "VisualOptionValue",
        "data:type": "String",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data:type", "String");
      return a;
    };
    b.prototype.createVisualOptionLocation = function (a) {
      a = this.getMapObject();
      if (!a)
        return this.GameStarter.createElement("div", {
          className: "VisualOptionValue VisualOptionLocation EditorComplaint",
          text: "Fix map compilation to get locations!",
        });
      a = Object.keys(a.locations);
      a.unshift(this.keyUndefined);
      a = this.createSelect(a, {
        className: "VisualOptionValue VisualOptionLocation",
        "data-type": "String",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data-type", "String");
      return a;
    };
    b.prototype.createVisualOptionArea = function (a) {
      a = this.getMapObject();
      if (!a)
        return this.GameStarter.createElement("div", {
          className: "VisualOptionValue VisualOptionArea EditorComplaint",
          text: "Fix map compilation to get areas!",
        });
      a = Object.keys(a.areas);
      a.unshift(this.keyUndefined);
      a = this.createSelect(a, {
        className: "VisualOptionValue VisualOptionArea",
        "data-type": "String",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data-type", "String");
      return a;
    };
    b.prototype.createVisualOptionEverything = function (a) {
      a = this.createSelect(Object.keys(this.things), {
        className: "VisualOptionValue VisualOptionEverything",
        "data-type": "String",
        onkeyup: this.setCurrentArgs.bind(this),
        onchange: this.setCurrentArgs.bind(this),
      });
      a.setAttribute("data-type", "String");
      return a;
    };
    b.prototype.resetDisplayMap = function () {
      this.setTextareaValue(this.stringifySmart(this.mapDefault), !0);
      this.setDisplayMap(!0);
    };
    b.prototype.setDisplayMap = function (a) {
      var b = this.display.stringer.textarea.value,
        c = this.getMapName(),
        e;
      try {
        (e = this.parseSmart(b)),
          this.setTextareaValue(this.display.stringer.textarea.value);
      } catch (f) {
        this.setSectionJSON();
        this.display.stringer.messenger.textContent = f.message;
        return;
      }
      try {
        this.GameStarter.MapsCreator.storeMap(c, e),
          this.GameStarter.MapsCreator.getMap(c);
      } catch (f) {
        this.setSectionJSON();
        this.display.stringer.messenger.textContent = f.message;
        return;
      }
      this.display.stringer.messenger.textContent = "";
      this.setTextareaValue(this.display.stringer.textarea.value);
      this.GameStarter.setMap(c, this.getCurrentLocation());
      this.resetDisplayOptionsListSubOptionsThings();
      a && this.disableAllThings();
    };
    b.prototype.getMapName = function () {
      return this.display.namer.value || this.mapNameDefault;
    };
    b.prototype.roundTo = function (a, b) {
      return Math.round(a / b) * b;
    };
    b.prototype.stringifySmart = function (a) {
      void 0 === a && (a = {});
      return JSON.stringify(a, this.jsonReplacerSmart);
    };
    b.prototype.parseSmart = function (a) {
      a = JSON.parse(a, this.jsonReplacerSmart);
      var b = a.areas,
        c;
      for (c in b) b.hasOwnProperty(c) && (b[c].editor = !0);
      return a;
    };
    b.prototype.jsonReplacerSmart = function (a, b) {
      return b !== b
        ? "NaN"
        : Infinity === b
        ? "Infinity"
        : -Infinity === b
        ? "-Infinity"
        : b;
    };
    b.prototype.disableThing = function (a, b) {
      void 0 === b && (b = 1);
      a.movement = void 0;
      a.nofall = !0;
      a.nocollide = !0;
      a.outerok = 2;
      a.xvel = 0;
      a.yvel = 0;
      a.opacity = b;
    };
    b.prototype.disableAllThings = function () {
      var a = this,
        b = this.GameStarter.GroupHolder.getGroups(),
        c;
      for (c in b)
        b.hasOwnProperty(c) &&
          b[c].forEach(function (b) {
            a.disableThing(b);
          });
      this.GameStarter.TimeHandler.cancelAllEvents();
    };
    b.prototype.addThingAndDisableEvents = function (a, b, c) {
      b = this.roundTo(b, this.GameStarter.scale);
      c = this.roundTo(c, this.GameStarter.scale);
      this.GameStarter.addThing(a, b, c);
      this.disableThing(a);
      this.GameStarter.TimeHandler.cancelAllEvents();
      if ((a.hasOwnProperty("hidden") && a.hidden) || 0 === a.opacity)
        (a.hidden = !1), (a.opacity = 0.35);
    };
    b.prototype.clearAllThings = function () {
      var a = this,
        b = this.GameStarter.GroupHolder.getGroups(),
        c;
      for (c in b)
        b.hasOwnProperty(c) &&
          b[c].forEach(function (b) {
            a.GameStarter.killNormal(b);
          });
    };
    b.prototype.getNormalizedX = function (a) {
      return a / this.GameStarter.unitsize;
    };
    b.prototype.getNormalizedY = function (a) {
      return (
        this.GameStarter.MapScreener.floor -
        a / this.GameStarter.unitsize +
        3 * this.GameStarter.unitsize
      );
    };
    b.prototype.getNormalizedThingArguments = function (a) {
      a = this.GameStarter.proliferate({}, a);
      Infinity === a.height && (a.height = this.GameStarter.MapScreener.height);
      Infinity === a.width && (a.width = this.GameStarter.MapScreener.width);
      return a;
    };
    b.prototype.getNormalizedMouseEventCoordinates = function (a, b) {
      var c = this.roundTo(a.x || a.clientX || 0, this.blocksize),
        e = this.roundTo(a.y || a.clientY || 0, this.blocksize),
        f;
      b &&
        ((f = this.things[this.currentTitle]),
        f.offsetLeft && (c += f.offsetLeft * this.GameStarter.unitsize),
        f.offsetTop && (e += f.offsetTop * this.GameStarter.unitsize));
      return [c, e];
    };
    b.prototype.getPrethingSizeArguments = function (a) {
      var b = {},
        c = this.getPrethingSizeArgument(a.width);
      a = this.getPrethingSizeArgument(a.height);
      c && (b.width = c);
      a && (b.height = a);
      return b;
    };
    b.prototype.getPrethingSizeArgument = function (a) {
      if (a) {
        if (a.real) return a.real;
        var b = a.value || 1;
        a = a.mod || 1;
        return isFinite(b) ? b * a : a || 8;
      }
    };
    b.prototype.createSelect = function (a, b) {
      var c = this.GameStarter.createElement("select", b),
        e;
      for (e = 0; e < a.length; e += 1)
        c.appendChild(
          this.GameStarter.createElement("option", {
            value: a[e],
            textContent: a[e],
          })
        );
      "undefined" !== typeof b.value && (c.value = b.value);
      this.applyElementAttributes(c, b);
      return c;
    };
    b.prototype.applyElementAttributes = function (a, b) {
      for (var c in b)
        b.hasOwnProperty(c) &&
          0 === c.indexOf("data:") &&
          a.setAttribute(c, b[c]);
    };
    b.prototype.downloadFile = function (a, b) {
      var c = this.GameStarter.createElement("a", {
        download: a,
        href: "data:text/json;charset=utf-8," + encodeURIComponent(b),
      });
      this.display.container.appendChild(c);
      c.click();
      this.display.container.removeChild(c);
      return c;
    };
    b.prototype.killCurrentPreThings = function () {
      for (var a = 0; a < this.currentPreThings.length - 1; a += 1)
        this.GameStarter.killNormal(this.currentPreThings[a].thing);
    };
    b.prototype.handleUploadStart = function (a) {
      var b;
      this.cancelEvent(a);
      a && a.dataTransfer
        ? (a = a.dataTransfer.files[0])
        : ((a = this.display.inputDummy.files[0]), new FileReader());
      a &&
        ((b = new FileReader()),
        (b.onloadend = this.handleUploadCompletion.bind(this)),
        b.readAsText(a));
    };
    b.prototype.handleDragEnter = function (a) {
      this.setSectionJSON();
    };
    b.prototype.handleDragOver = function (a) {
      this.cancelEvent(a);
    };
    b.prototype.handleDragDrop = function (a) {
      this.handleUploadStart(a);
    };
    b.prototype.cancelEvent = function (a) {
      a &&
        ("function" === typeof a.preventDefault && a.preventDefault(),
        "function" === typeof a.stopPropagation && a.stopPropagation(),
        (a.cancelBubble = !0));
    };
    b.prototype.createPageStyles = function () {
      return {
        ".LevelEditor": {
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        ".LevelEditor h4": { margin: "14px 0 7px 0" },
        ".LevelEditor select, .LevelEditor input": {
          margin: "7px",
          padding: "3px 7px",
          "font-size": "1.17em",
        },
        ".LevelEditor .EditorGui": {
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          width: "50%",
          background: "rgba(0, 7, 14, .84)",
          overflow: "hidden",
          "user-select": "none",
          "box-sizing": "border-box",
          "z-index": "70",
          transition: "117ms all",
        },
        ".LevelEditor .EditorMenuContainer": {
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          width: "50%",
          background: "rgba(0, 7, 14, .84)",
          overflow: "hidden",
          "user-select": "none",
          "box-sizing": "border-box",
          "z-index": "70",
          transition: "117ms all",
        },
        ".LevelEditor .EditorScrollers": {
          position: "absolute",
          top: "0",
          right: "50%",
          bottom: "0",
          left: "0",
          transition: "117ms all",
        },
        ".EditorScroller": {
          position: "absolute",
          top: "50%",
          "margin-top": "-35px",
          width: "70px",
          cursor: "pointer",
          "box-sizing": "border-box",
          "font-size": "70px",
          "text-align": "center",
          transition: "280ms all",
        },
        ".EditorScrollerRight": { right: "0", "padding-left": ".084em" },
        ".EditorScrollerLeft": { left: "0" },
        ".LevelEditor.minimized .EditorGui": { width: "117px" },
        ".LevelEditor.minimized .EditorMenuContainer": { width: "117px" },
        ".LevelEditor.minimized .EditorScrollers": {
          right: "117px",
          "padding-right": "117px",
        },
        ".LevelEditor .EditorHead": { position: "relative", height: "35px" },
        ".LevelEditor .EditorHead .EditorNameContainer": {
          position: "absolute",
          top: "1px",
          right: "73px",
          left: "2px",
          height: "35px",
        },
        ".LevelEditor .EditorHead .EditorNameInput": {
          display: "block",
          margin: "0",
          padding: "3px 7px",
          width: "100%",
          background: "white",
          border: "1px solid black",
          "font-size": "1.4em",
          "box-sizing": "border-box",
        },
        ".LevelEditor .EditorHead .EditorHeadButton": {
          position: "absolute",
          top: "2px",
          width: "32px",
          height: "32px",
          background: "rgb(35,35,35)",
          border: "1px solid silver",
          "box-sizing": "border-box",
          "text-align": "center",
          "padding-top": "7px",
          cursor: "pointer",
        },
        ".LevelEditor .EditorHead .EditorMinimizer": { right: "38px" },
        ".LevelEditor .EditorHead .EditorCloser": { right: "3px" },
        ".LevelEditor .EditorSectionChooser": {
          width: "50%",
          "box-sizing": "border-box",
          height: "35px",
          background: "white",
          border: "3px solid black",
          color: "black",
          cursor: "pointer",
        },
        ".LevelEditor .EditorSectionChooser.Inactive": { background: "gray" },
        ".LevelEditor.minimized .EditorSectionChoosers": { opacity: "0" },
        ".LevelEditor .EditorSectionMain": {
          position: "absolute",
          top: "70px",
          right: "0",
          bottom: "35px",
          left: "0",
          "overflow-y": "auto",
        },
        ".LevelEditor.minimized .EditorSectionMain": { display: "none" },
        ".LevelEditor .EditorSectionSecondary": {
          position: "absolute",
          top: "35px",
          right: "203px",
          bottom: "0px",
          left: "0",
          "min-width": "182px",
          "overflow-y": "auto",
          "overflow-x": "hidden",
        },
        ".LevelEditor .EditorJSON": { "font-family": "Courier" },
        ".LevelEditor .EditorJSONInput": {
          display: "block",
          width: "100%",
          height: "84%",
          background: "rgba(0, 3, 7, .91)",
          color: "rgba(255, 245, 245, .91)",
          "box-sizing": "border-box",
          "overflow-y": "auto",
          resize: "none",
        },
        ".LevelEditor .EditorJSONInfo": {
          height: "1.75em",
          padding: "3px 7px",
        },
        ".LevelEditor.minimized .EditorJSON": { opacity: "0" },
        ".LevelEditor .EditorOptions, .LevelEditor .EditorOptionContainer": {
          "padding-left": "3px",
          clear: "both",
        },
        ".LevelEditor.minimized .EditorOptionsList": { opacity: "0" },
        ".LevelEditor .EditorListOption": {
          position: "relative",
          float: "left",
          margin: "0 7px 7px 0",
          width: "70px",
          height: "70px",
          background: "rgba(77, 77, 77, .7)",
          border: "2px solid black",
          overflow: "hidden",
          cursor: "pointer",
        },
        ".LevelEditor .EditorListOption canvas": { position: "absolute" },
        ".LevelEditor .EditorVisualOptions": {
          position: "absolute",
          top: "105px",
          right: "0",
          bottom: "35px",
          padding: "7px 11px",
          width: "203px",
          "border-left": "1px solid silver",
          background: "rgba(0, 7, 14, .84)",
          "overflow-x": "visible",
          "overflow-y": "auto",
          "line-height": "140%",
          opacity: "1",
          "box-sizing": "border-box",
          transition: "117ms opacity, 70ms left",
        },
        ".LevelEditor.thin .EditorVisualOptions": { left: "185px" },
        ".LevelEditor.thin .EditorVisualOptions:hover": {
          left: "70px",
          right: "0",
          width: "auto",
          "overflow-x": "hidden",
        },
        ".LevelEditor.thick .EditorVisualOptions": { width: "350px" },
        ".LevelEditor.thick .EditorSectionSecondary": { right: "350px" },
        ".LevelEditor.minimized .EditorVisualOptions": { left: "100%" },
        ".LevelEditor .EditorVisualOptions .VisualOption": {
          padding: "14px 0",
        },
        ".LevelEditor .EditorVisualOptions .VisualOptionName": {
          margin: "3px 0 7px 0",
        },
        ".LevelEditor .EditorVisualOptions .VisualOptionDescription": {
          "padding-bottom": "14px",
        },
        ".LevelEditor .EditorVisualOptions .VisualOptionValue": {
          "max-width": "117px",
        },
        ".LevelEditor .EditorVisualOptions select.VisualOptionValue": {
          "max-width": "156px",
        },
        ".LevelEditor .EditorVisualOptions .VisualOptionInfiniter, .LevelEditor .EditorVisualOptions .VisualOptionRecommendation":
          { display: "inline" },
        ".LevelEditor .EditorMenu": {
          position: "absolute",
          right: "0",
          bottom: "0",
          left: "0",
        },
        ".LevelEditor .EditorMenuOption": {
          display: "inline-block",
          padding: "7px 14px",
          background: "white",
          border: "3px solid black",
          "box-sizing": "border-box",
          color: "black",
          "text-align": "center",
          overflow: "hidden",
          cursor: "pointer",
        },
        ".LevelEditor.minimized .EditorMenuOption:not(:first-of-type)": {
          display: "none",
        },
        ".LevelEditor.minimized .EditorMenuOption:first-of-type": {
          width: "auto",
        },
        ".LevelEditor .EditorMenuOption:hover": { opacity: ".91" },
        ".LevelEditor .EditorMenuOption.EditorMenuOptionHalf": { width: "50%" },
        ".LevelEditor .EditorMenuOption.EditorMenuOptionThird": {
          width: "33%",
        },
        ".LevelEditor .EditorMenuOption.EditorMenuOptionFifth": {
          width: "20%",
        },
        ".LevelEditor .EditorMapSettingsGroup": { "padding-left": "7px" },
        ".LevelEditor .EditorMapSettingsSubGroup": { "padding-left": "14px" },
        ".LevelEditor.minimized .EditorMapSettings": { opacity: "0" },
      };
    };
    return b;
  })();
  q.LevelEditr = r;
})(LevelEditr || (LevelEditr = {}));
