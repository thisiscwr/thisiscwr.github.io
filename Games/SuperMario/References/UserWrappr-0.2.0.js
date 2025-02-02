var __extends =
    (this && this.__extends) ||
    function (d, h) {
      function c() {
        this.constructor = d;
      }
      for (var a in h) h.hasOwnProperty(a) && (d[a] = h[a]);
      d.prototype =
        null === h ? Object.create(h) : ((c.prototype = h.prototype), new c());
    },
  UserWrappr;
(function (d) {
  (function (d) {
    var c = (function () {
      function a(a) {
        this.UserWrapper = a;
        this.GameStarter = this.UserWrapper.getGameStarter();
      }
      a.prototype.getParentControlElement = function (a) {
        return "control" !== a.className && a.parentNode
          ? this.getParentControlElement(a.parentElement)
          : a;
      };
      return a;
    })();
    d.OptionsGenerator = c;
  })(d.UISchemas || (d.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
(function (d) {
  (function (d) {
    var c = (function (a) {
      function b() {
        a.apply(this, arguments);
      }
      __extends(b, a);
      b.prototype.generate = function (f) {
        var g = document.createElement("div"),
          a =
            f.options instanceof Function
              ? f.options.call(self, this.GameStarter)
              : f.options,
          e = this,
          k,
          b,
          c;
        g.className = "select-options select-options-buttons";
        for (c = 0; c < a.length; c += 1)
          (k = a[c]),
            (b = document.createElement("div")),
            (b.className = "select-option options-button-option"),
            (b.textContent = k.title),
            (b.onclick = function (g, f) {
              "on" === e.getParentControlElement(f).getAttribute("active") &&
                (g.callback.call(e, e.GameStarter, g, f),
                "true" === f.getAttribute("option-enabled")
                  ? (f.setAttribute("option-enabled", "false"),
                    (f.className =
                      "select-option options-button-option option-disabled"))
                  : (f.setAttribute("option-enabled", "true"),
                    (f.className =
                      "select-option options-button-option option-enabled")));
            }.bind(this, f, b)),
            this.ensureLocalStorageButtonValue(b, k, f),
            k[f.keyActive || "active"]
              ? ((b.className += " option-enabled"),
                b.setAttribute("option-enabled", "true"))
              : f.assumeInactive
              ? ((b.className += " option-disabled"),
                b.setAttribute("option-enabled", "false"))
              : b.setAttribute("option-enabled", "true"),
            g.appendChild(b);
        return g;
      };
      b.prototype.ensureLocalStorageButtonValue = function (f, g, a) {
        var e = a.title + "::" + g.title,
          b = g.source.call(this, this.GameStarter).toString();
        f.setAttribute("localStorageKey", e);
        this.GameStarter.ItemsHolder.addItem(e, {
          storeLocally: !0,
          valueDefault: b,
        });
        "true" ===
          this.GameStarter.ItemsHolder.getItem(e).toString().toLowerCase() &&
          ((g[a.keyActive || "active"] = !0),
          a.callback.call(this, this.GameStarter, a, f));
      };
      return b;
    })(d.OptionsGenerator);
    d.ButtonsGenerator = c;
  })(d.UISchemas || (d.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
(function (d) {
  (function (d) {
    var c = (function (a) {
      function b() {
        a.apply(this, arguments);
      }
      __extends(b, a);
      b.prototype.generate = function (f) {
        var g = document.createElement("div"),
          a = document.createElement("div"),
          e = document.createElement("div"),
          b = document.createElement("div"),
          c = this.createUploaderDiv();
        f = this.createMapSelectorDiv(f);
        var d = this;
        g.className = "select-options select-options-level-editor";
        a.className = "select-option select-option-large options-button-option";
        a.innerHTML = "Start the <br /> Level Editor!";
        a.onclick = function () {
          d.GameStarter.LevelEditor.enable();
        };
        e.className = b.className = "select-option-title";
        e.innerHTML = b.innerHTML = "<em>- or -</em><br />";
        g.appendChild(a);
        g.appendChild(e);
        g.appendChild(c);
        g.appendChild(b);
        g.appendChild(f);
        return g;
      };
      b.prototype.createUploaderDiv = function () {
        var f = document.createElement("div"),
          g = document.createElement("input");
        f.className = "select-option select-option-large options-button-option";
        f.innerHTML = "Continue an<br />editor file!";
        f.setAttribute("textOld", f.textContent);
        g.type = "file";
        g.className = "select-upload-input";
        g.onchange = this.handleFileDrop.bind(this, g, f);
        f.ondragenter = this.handleFileDragEnter.bind(this, f);
        f.ondragover = this.handleFileDragOver.bind(this, f);
        f.ondragleave = g.ondragend = this.handleFileDragLeave.bind(this, f);
        f.ondrop = this.handleFileDrop.bind(this, g, f);
        f.onclick = g.click.bind(g);
        f.appendChild(g);
        return f;
      };
      b.prototype.createMapSelectorDiv = function (f) {
        var g = !0,
          a = this.GameStarter.createElement("div", {
            className:
              "select-options-group select-options-editor-maps-selector",
          }),
          b = this.GameStarter.createElement("div", {
            className:
              "select-option select-option-large options-button-option",
          }),
          k = this.GameStarter.createElement("div", {
            className:
              "select-options-holder select-options-editor-maps-holder",
          }),
          c = this.UserWrapper.getGenerators().MapsGrid.generate(
            this.GameStarter.proliferate({ callback: f.callback }, f.maps)
          );
        b.onclick = function (f) {
          (g = !g)
            ? ((b.textContent = "(cancel)"),
              (k.style.position = ""),
              (c.style.height = ""))
            : ((b.innerHTML = "Edit a <br />built-in map!"),
              (k.style.position = "absolute"),
              (c.style.height = "0"));
          a.parentElement &&
            [].slice.call(a.parentElement.children).forEach(function (f) {
              f !== a && (f.style.display = g ? "none" : "block");
            });
        };
        b.onclick(null);
        k.appendChild(c);
        a.appendChild(b);
        a.appendChild(k);
        return a;
      };
      b.prototype.handleFileDragEnter = function (f, g) {
        g.dataTransfer && (g.dataTransfer.dropEffect = "copy");
        f.className += " hovering";
      };
      b.prototype.handleFileDragOver = function (f, g) {
        g.preventDefault();
        return !1;
      };
      b.prototype.handleFileDragLeave = function (f, g) {
        g.dataTransfer && (g.dataTransfer.dropEffect = "none");
        f.className = f.className.replace(" hovering", "");
      };
      b.prototype.handleFileDrop = function (f, g, a) {
        var b = (f.files || a.dataTransfer.files)[0],
          k = new FileReader();
        this.handleFileDragLeave(f, a);
        a.preventDefault();
        a.stopPropagation();
        k.onprogress = this.handleFileUploadProgress.bind(this, b, g);
        k.onloadend = this.handleFileUploadCompletion.bind(this, b, g);
        k.readAsText(b);
      };
      b.prototype.handleFileUploadProgress = function (f, g, a) {
        a.lengthComputable &&
          ((a = Math.round((a.loaded / a.total) * 100)),
          100 < a && (a = 100),
          (g.innerText = "Uploading '" + f.name + "' (" + a + "%)..."));
      };
      b.prototype.handleFileUploadCompletion = function (f, g, a) {
        this.GameStarter.LevelEditor.handleUploadCompletion(a);
        g.innerText = g.getAttribute("textOld");
      };
      return b;
    })(d.OptionsGenerator);
    d.LevelEditorGenerator = c;
  })(d.UISchemas || (d.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
(function (d) {
  (function (d) {
    var c = (function (a) {
      function b() {
        a.apply(this, arguments);
      }
      __extends(b, a);
      b.prototype.generate = function (f) {
        var a = document.createElement("div");
        a.className = "select-options select-options-maps-grid";
        f.rangeX && f.rangeY && a.appendChild(this.generateRangedTable(f));
        f.extras && this.appendExtras(a, f);
        return a;
      };
      b.prototype.generateRangedTable = function (f) {
        var a = this,
          b = document.createElement("table"),
          e = f.rangeX,
          k = f.rangeY,
          c,
          d,
          l,
          h;
        for (l = k[0]; l <= k[1]; l += 1) {
          c = document.createElement("tr");
          c.className = "maps-grid-row";
          for (h = e[0]; h <= e[1]; h += 1)
            (d = document.createElement("td")),
              (d.className =
                "select-option maps-grid-option maps-grid-option-range"),
              (d.textContent = l + "-" + h),
              (d.onclick = function (f) {
                "on" === a.getParentControlElement(d).getAttribute("active") &&
                  f();
              }.bind(a, f.callback.bind(a, a.GameStarter, f, d))),
              c.appendChild(d);
          b.appendChild(c);
        }
        return b;
      };
      b.prototype.appendExtras = function (a, g) {
        var b, e, k;
        for (k = 0; k < g.extras.length; k += 1)
          if (
            ((e = g.extras[k]),
            (b = document.createElement("div")),
            (b.className =
              "select-option maps-grid-option maps-grid-option-extra"),
            (b.textContent = e.title),
            b.setAttribute("value", e.title),
            (b.onclick = e.callback.bind(this, this.GameStarter, g, b)),
            a.appendChild(b),
            e.extraElements)
          )
            for (b = 0; b < e.extraElements.length; b += 1)
              a.appendChild(
                this.GameStarter.createElement(
                  e.extraElements[b].tag,
                  e.extraElements[b].options
                )
              );
      };
      return b;
    })(d.OptionsGenerator);
    d.MapsGridGenerator = c;
  })(d.UISchemas || (d.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
(function (d) {
  (function (d) {
    var c = (function (a) {
      function b() {
        a.apply(this, arguments);
      }
      __extends(b, a);
      b.prototype.generate = function (a) {
        var g = document.createElement("div"),
          c = document.createElement("table"),
          e,
          k,
          d,
          h,
          l;
        g.className = "select-options select-options-table";
        if (a.options)
          for (l = 0; l < a.options.length; l += 1)
            (k = document.createElement("tr")),
              (d = document.createElement("td")),
              (h = document.createElement("td")),
              (e = a.options[l]),
              (d.className = "options-label-" + e.type),
              (d.textContent = e.title),
              (h.className = "options-cell-" + e.type),
              k.appendChild(d),
              k.appendChild(h),
              (d = b.optionTypes[a.options[l].type].call(this, h, e, a)),
              e.storeLocally && this.ensureLocalStorageInputValue(d, e, a),
              c.appendChild(k);
        g.appendChild(c);
        if (a.actions)
          for (l = 0; l < a.actions.length; l += 1)
            (k = document.createElement("div")),
              (c = a.actions[l]),
              (k.className = "select-option options-button-option"),
              (k.textContent = c.title),
              (k.onclick = c.action.bind(this, this.GameStarter)),
              g.appendChild(k);
        return g;
      };
      b.prototype.setBooleanInput = function (a, b, c) {
        c = b.source.call(this, this.GameStarter);
        var e = this;
        a.className =
          "select-option options-button-option option-" +
          (c ? "enabled" : "disabled");
        a.textContent = c ? "on" : "off";
        a.onclick = function () {
          a.setValue("off" === a.textContent);
        };
        a.setValue = function (c) {
          if (c.constructor === String)
            if ("false" === c || "off" === c) c = !1;
            else if ("true" === c || "on" === c) c = !0;
          c
            ? (b.enable.call(e, e.GameStarter),
              (a.textContent = "on"),
              (a.className = a.className.replace("disabled", "enabled")))
            : (b.disable.call(e, e.GameStarter),
              (a.textContent = "off"),
              (a.className = a.className.replace("enabled", "disabled")));
          b.storeLocally && e.storeLocalStorageValue(a, c.toString());
        };
        return a;
      };
      b.prototype.setKeyInput = function (a, b, c) {
        c = b.source.call(this, this.GameStarter);
        var e = this.UserWrapper.getAllPossibleKeys(),
          k = [],
          d,
          h = this,
          l,
          n,
          m;
        for (n = 0; n < c.length; n += 1) {
          l = c[n].toLowerCase();
          d = document.createElement("select");
          d.className = "options-key-option";
          d.value = d.valueOld = l;
          for (m = 0; m < e.length; m += 1)
            d.appendChild(new Option(e[m])),
              e[m] === l && (d.selectedIndex = m);
          d.onchange = function (a) {
            b.callback.call(h, h.GameStarter, a.valueOld, a.value);
            b.storeLocally && h.storeLocalStorageValue(a, a.value);
          }.bind(void 0, d);
          k.push(d);
          a.appendChild(d);
        }
        return k;
      };
      b.prototype.setNumberInput = function (a, b, c) {
        var e = document.createElement("input"),
          d = this;
        e.type = "number";
        e.value = Number(b.source.call(d, d.GameStarter)).toString();
        e.min = (b.minimum || 0).toString();
        e.max = (b.maximum || Math.max(b.minimum + 10, 10)).toString();
        e.onchange = e.oninput = function () {
          e.checkValidity() && b.update.call(d, d.GameStarter, e.value);
          b.storeLocally && d.storeLocalStorageValue(e, e.value);
        };
        a.appendChild(e);
        return e;
      };
      b.prototype.setSelectInput = function (a, b, c) {
        var e = document.createElement("select");
        c = b.options(this.GameStarter);
        var d = this,
          h;
        for (h = 0; h < c.length; h += 1) e.appendChild(new Option(c[h]));
        e.value = b.source.call(d, d.GameStarter);
        e.onchange = function () {
          b.update.call(d, d.GameStarter, e.value);
          e.blur();
          b.storeLocally && d.storeLocalStorageValue(e, e.value);
        };
        a.appendChild(e);
        return e;
      };
      b.prototype.setScreenSizeInput = function (a, b, c) {
        var e = this;
        b.options = function () {
          return Object.keys(e.UserWrapper.getSizes());
        };
        b.source = function () {
          return e.UserWrapper.getCurrentSize().name;
        };
        b.update = function (a, b) {
          b !== e.UserWrapper.getCurrentSize() &&
            e.UserWrapper.setCurrentSize(b);
        };
        return e.setSelectInput(a, b, c);
      };
      b.prototype.ensureLocalStorageInputValue = function (a, b, c) {
        if (a.constructor === Array) this.ensureLocalStorageValues(a, b, c);
        else if (
          ((c = c.title + "::" + b.title),
          (b = b.source.call(this, this.GameStarter).toString()),
          a.setAttribute("localStorageKey", c),
          this.GameStarter.ItemsHolder.addItem(c, {
            storeLocally: !0,
            valueDefault: b,
          }),
          (b = this.GameStarter.ItemsHolder.getItem(c)),
          "" !== b && b !== a.value)
        )
          if (((a.value = b), a.setValue)) a.setValue(b);
          else if (a.onchange) a.onchange(void 0);
          else if (a.onclick) a.onclick(void 0);
      };
      b.prototype.ensureLocalStorageValues = function (a, b, c) {
        c = c.title + "::" + b.title;
        b = b.source.call(this, this.GameStarter);
        var e, d, h;
        for (h = 0; h < a.length; h += 1)
          if (
            ((e = c + "::" + h),
            (d = a[h]),
            d.setAttribute("localStorageKey", e),
            this.GameStarter.ItemsHolder.addItem(e, {
              storeLocally: !0,
              valueDefault: b[h],
            }),
            (e = this.GameStarter.ItemsHolder.getItem(e)),
            "" !== e && e !== d.value)
          )
            if (((d.value = e), d.onchange)) d.onchange(void 0);
            else if (d.onclick) d.onclick(void 0);
      };
      b.prototype.storeLocalStorageValue = function (a, b) {
        var c = a.getAttribute("localStorageKey");
        c &&
          (this.GameStarter.ItemsHolder.setItem(c, b),
          this.GameStarter.ItemsHolder.saveItem(c));
      };
      b.optionTypes = {
        Boolean: b.prototype.setBooleanInput,
        Keys: b.prototype.setKeyInput,
        Number: b.prototype.setNumberInput,
        Select: b.prototype.setSelectInput,
        ScreenSize: b.prototype.setScreenSizeInput,
      };
      return b;
    })(d.OptionsGenerator);
    d.TableGenerator = c;
  })(d.UISchemas || (d.UISchemas = {}));
})(UserWrappr || (UserWrappr = {}));
(function (d) {
  var h = (function () {
    function c(a) {
      this.documentElement = document.documentElement;
      this.requestFullScreen = (
        this.documentElement.requestFullScreen ||
        this.documentElement.webkitRequestFullScreen ||
        this.documentElement.mozRequestFullScreen ||
        this.documentElement.msRequestFullscreen ||
        function () {
          alert("Not able to request full screen...");
        }
      ).bind(this.documentElement);
      this.cancelFullScreen = (
        this.documentElement.cancelFullScreen ||
        this.documentElement.webkitCancelFullScreen ||
        this.documentElement.mozCancelFullScreen ||
        this.documentElement.msCancelFullScreen ||
        function () {
          alert("Not able to cancel full screen...");
        }
      ).bind(document);
      if ("undefined" === typeof a)
        throw Error("No settings object given to UserWrappr.");
      if ("undefined" === typeof a.GameStartrConstructor)
        throw Error("No GameStartrConstructor given to UserWrappr.");
      if ("undefined" === typeof a.globalName)
        throw Error("No globalName given to UserWrappr.");
      if ("undefined" === typeof a.sizes)
        throw Error("No sizes given to UserWrappr.");
      if ("undefined" === typeof a.sizeDefault)
        throw Error("No sizeDefault given to UserWrappr.");
      if ("undefined" === typeof a.schemas)
        throw Error("No schemas given to UserWrappr.");
      this.settings = a;
      this.GameStartrConstructor = a.GameStartrConstructor;
      this.globalName = a.globalName;
      this.sizes = this.importSizes(a.sizes);
      this.customs = a.customs || {};
      this.gameElementSelector = a.gameElementSelector || "#game";
      this.gameControlsSelector = a.gameControlsSelector || "#controls";
      this.logger = a.logger || console.log.bind(console);
      this.isFullScreen = !1;
      this.setCurrentSize(this.sizes[a.sizeDefault]);
      this.allPossibleKeys = a.allPossibleKeys || c.allPossibleKeys;
      this.GameStartrConstructor.prototype.proliferate(
        this.customs,
        this.currentSize,
        !0
      );
      this.resetGameStarter(a, this.customs);
    }
    c.prototype.resetGameStarter = function (a, b) {
      void 0 === b && (b = {});
      this.loadGameStarter(this.fixCustoms(b));
      window[a.globalName] = this.GameStarter;
      this.GameStarter.UserWrapper = this;
      this.loadGenerators();
      this.loadControls(a.schemas);
      a.styleSheet && this.GameStarter.addPageStyles(a.styleSheet);
      this.resetPageVisibilityHandlers();
      this.GameStarter.gameStart();
      this.startCheckingDevices();
    };
    c.prototype.getGameStartrConstructor = function () {
      return this.GameStartrConstructor;
    };
    c.prototype.getGameStarter = function () {
      return this.GameStarter;
    };
    c.prototype.getItemsHolder = function () {
      return this.ItemsHolder;
    };
    c.prototype.getSettings = function () {
      return this.settings;
    };
    c.prototype.getCustoms = function () {
      return this.customs;
    };
    c.prototype.getAllPossibleKeys = function () {
      return this.allPossibleKeys;
    };
    c.prototype.getSizes = function () {
      return this.sizes;
    };
    c.prototype.getCurrentSize = function () {
      return this.currentSize;
    };
    c.prototype.getIsFullScreen = function () {
      return this.isFullScreen;
    };
    c.prototype.getIsPageHidden = function () {
      return this.isPageHidden;
    };
    c.prototype.getLogger = function () {
      return this.logger;
    };
    c.prototype.getGenerators = function () {
      return this.generators;
    };
    c.prototype.getDocumentElement = function () {
      return this.documentElement;
    };
    c.prototype.getRequestFullScreen = function () {
      return this.requestFullScreen;
    };
    c.prototype.getCancelFullScreen = function () {
      return this.cancelFullScreen;
    };
    c.prototype.getDeviceChecker = function () {
      return this.deviceChecker;
    };
    c.prototype.setCurrentSize = function (a) {
      if ("string" === typeof a || a.constructor === String) {
        if (!this.sizes.hasOwnProperty(a))
          throw Error("Size " + a + " does not exist on the UserWrappr.");
        a = this.sizes[a];
      }
      this.customs = this.fixCustoms(this.customs);
      a.full
        ? (this.requestFullScreen(), (this.isFullScreen = !0))
        : this.isFullScreen &&
          (this.cancelFullScreen(), (this.isFullScreen = !1));
      this.currentSize = a;
      this.GameStarter &&
        (this.GameStarter.container.parentNode.removeChild(
          this.GameStarter.container
        ),
        this.resetGameStarter(this.settings, this.customs));
    };
    c.prototype.startCheckingDevices = function () {
      this.checkDevices();
    };
    c.prototype.checkDevices = function () {
      this.deviceChecker = setTimeout(
        this.checkDevices.bind(this),
        this.GameStarter.GamesRunner.getPaused()
          ? 117
          : this.GameStarter.GamesRunner.getInterval() /
              this.GameStarter.GamesRunner.getSpeed()
      );
      this.GameStarter.DeviceLayer.checkNavigatorGamepads();
      this.GameStarter.DeviceLayer.activateAllGamepadTriggers();
    };
    c.prototype.importSizes = function (a) {
      a = this.GameStartrConstructor.prototype.proliferate({}, a);
      for (var b in a) a.hasOwnProperty(b) && (a[b].name = a[b].name || b);
      return a;
    };
    c.prototype.fixCustoms = function (a) {
      a = this.GameStartrConstructor.prototype.proliferate({}, a);
      this.GameStartrConstructor.prototype.proliferate(a, this.currentSize);
      isFinite(a.width) || (a.width = document.body.clientWidth);
      isFinite(a.height) ||
        ((a.height = a.full
          ? screen.height
          : this.isFullScreen
          ? window.innerHeight - 140
          : window.innerHeight),
        (a.height -= 126));
      return a;
    };
    c.prototype.resetPageVisibilityHandlers = function () {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange.bind(this)
      );
    };
    c.prototype.handleVisibilityChange = function () {
      switch (document.visibilityState) {
        case "hidden":
          this.onPageHidden();
          break;
        case "visible":
          this.onPageVisible();
      }
    };
    c.prototype.onPageHidden = function () {
      this.GameStarter.GamesRunner.getPaused() ||
        ((this.isPageHidden = !0), this.GameStarter.GamesRunner.pause());
    };
    c.prototype.onPageVisible = function () {
      this.isPageHidden &&
        ((this.isPageHidden = !1), this.GameStarter.GamesRunner.play());
    };
    c.prototype.loadGameStarter = function (a) {
      var b = document.querySelector(this.gameElementSelector);
      this.GameStarter && this.GameStarter.GamesRunner.pause();
      this.GameStarter = new this.GameStartrConstructor(a);
      b.textContent = "";
      b.appendChild(this.GameStarter.container);
      this.GameStarter.proliferate(document.body, {
        onkeydown: this.GameStarter.InputWriter.makePipe(
          "onkeydown",
          "keyCode"
        ),
        onkeyup: this.GameStarter.InputWriter.makePipe("onkeyup", "keyCode"),
      });
      this.GameStarter.proliferate(b, {
        onmousedown: this.GameStarter.InputWriter.makePipe(
          "onmousedown",
          "which"
        ),
        oncontextmenu: this.GameStarter.InputWriter.makePipe(
          "oncontextmenu",
          null,
          !0
        ),
      });
    };
    c.prototype.loadGenerators = function () {
      this.generators = {
        OptionsButtons: new d.UISchemas.ButtonsGenerator(this),
        OptionsTable: new d.UISchemas.TableGenerator(this),
        LevelEditor: new d.UISchemas.LevelEditorGenerator(this),
        MapsGrid: new d.UISchemas.MapsGridGenerator(this),
      };
    };
    c.prototype.loadControls = function (a) {
      var b = document.querySelector(this.gameControlsSelector),
        c = a.length,
        d;
      this.ItemsHolder = new ItemsHoldr.ItemsHoldr({
        prefix: this.globalName + "::UserWrapper::ItemsHolder",
      });
      b.textContent = "";
      b.className = "length-" + c;
      for (d = 0; d < c; d += 1) b.appendChild(this.loadControlDiv(a[d]));
    };
    c.prototype.loadControlDiv = function (a) {
      var b = document.createElement("div"),
        c = document.createElement("h4"),
        d = document.createElement("div");
      b.className = "control";
      b.id = "control-" + a.title;
      c.textContent = a.title;
      d.className = "control-inner";
      d.appendChild(this.generators[a.generator].generate(a));
      b.appendChild(c);
      b.appendChild(d);
      b.onmouseover = function () {
        setTimeout(function () {
          b.setAttribute("active", "on");
        }, 35);
      };
      b.onmouseout = function () {
        b.setAttribute("active", "off");
      };
      return b;
    };
    c.allPossibleKeys =
      "a b c d e f g h i j k l m n o p q r s t u v w x y z up right down left space shift ctrl".split(
        " "
      );
    return c;
  })();
  d.UserWrappr = h;
})(UserWrappr || (UserWrappr = {}));
