var ItemsHoldr;
(function (h) {
  var k = (function () {
    function b(a, g, b) {
      void 0 === b && (b = {});
      this.ItemsHolder = a;
      a.proliferate(this, a.getDefaults());
      a.proliferate(this, b);
      this.key = g;
      this.hasOwnProperty("value") || (this.value = this.valueDefault);
      this.hasElement &&
        ((this.element = a.createElement(this.elementTag || "div", {
          className: a.getPrefix() + "_value " + g,
        })),
        this.element.appendChild(a.createElement("div", { textContent: g })),
        this.element.appendChild(
          a.createElement("div", { textContent: this.value })
        ));
      this.storeLocally &&
        (a.getLocalStorage().hasOwnProperty(a.getPrefix() + g)
          ? ((this.value = this.retrieveLocalStorage()), this.update())
          : this.updateLocalStorage());
    }
    b.prototype.getValue = function () {
      return this.transformGet ? this.transformGet(this.value) : this.value;
    };
    b.prototype.setValue = function (a) {
      this.value = this.transformSet ? this.transformSet(a) : a;
      this.update();
    };
    b.prototype.update = function () {
      this.hasOwnProperty("minimum") &&
      Number(this.value) <= Number(this.minimum)
        ? ((this.value = this.minimum),
          this.onMinimum &&
            this.onMinimum.apply(this, this.ItemsHolder.getCallbackArgs()))
        : this.hasOwnProperty("maximum") &&
          Number(this.value) <= Number(this.maximum) &&
          ((this.value = this.maximum),
          this.onMaximum &&
            this.onMaximum.apply(this, this.ItemsHolder.getCallbackArgs()));
      this.modularity && this.checkModularity();
      this.triggers && this.checkTriggers();
      this.hasElement && this.updateElement();
      this.storeLocally && this.updateLocalStorage();
    };
    b.prototype.updateLocalStorage = function (a) {
      if (a || this.ItemsHolder.getAutoSave())
        this.ItemsHolder.getLocalStorage()[
          this.ItemsHolder.getPrefix() + this.key
        ] = JSON.stringify(this.value);
    };
    b.prototype.checkTriggers = function () {
      this.triggers.hasOwnProperty(this.value) &&
        this.triggers[this.value].apply(
          this,
          this.ItemsHolder.getCallbackArgs()
        );
    };
    b.prototype.checkModularity = function () {
      if (this.value.constructor === Number && this.modularity)
        for (; this.value >= this.modularity; )
          (this.value = Math.max(0, this.value - this.modularity)),
            this.onModular &&
              this.onModular.apply(this, this.ItemsHolder.getCallbackArgs());
    };
    b.prototype.updateElement = function () {
      this.ItemsHolder.hasDisplayChange(this.value)
        ? (this.element.children[1].textContent =
            this.ItemsHolder.getDisplayChange(this.value))
        : (this.element.children[1].textContent = this.value);
    };
    b.prototype.retrieveLocalStorage = function () {
      var a = localStorage.getItem(this.ItemsHolder.getPrefix() + this.key);
      return "undefined" === a
        ? void 0
        : a.constructor !== String
        ? a
        : JSON.parse(a);
    };
    return b;
  })();
  h.ItemValue = k;
  var l = (function () {
    function b(a) {
      void 0 === a && (a = {});
      var b;
      this.prefix = a.prefix || "";
      this.autoSave = a.autoSave;
      this.callbackArgs = a.callbackArgs || [];
      this.allowNewItems = void 0 === a.allowNewItems ? !0 : a.allowNewItems;
      this.localStorage = a.localStorage
        ? a.localStorage
        : "undefined" === typeof localStorage
        ? this.createPlaceholderStorage()
        : localStorage;
      this.defaults = a.defaults || {};
      this.displayChanges = a.displayChanges || {};
      this.items = {};
      if (a.values)
        for (b in ((this.itemKeys = Object.keys(a.values)), a.values))
          a.values.hasOwnProperty(b) && this.addItem(b, a.values[b]);
      else this.itemKeys = [];
      a.doMakeContainer &&
        ((this.containersArguments = a.containersArguments || [
          ["div", { className: this.prefix + "_container" }],
        ]),
        (this.container = this.makeContainer(a.containersArguments)));
    }
    b.prototype.key = function (a) {
      return this.itemKeys[a];
    };
    b.prototype.getValues = function () {
      return this.items;
    };
    b.prototype.getDefaults = function () {
      return this.defaults;
    };
    b.prototype.getLocalStorage = function () {
      return this.localStorage;
    };
    b.prototype.getAutoSave = function () {
      return this.autoSave;
    };
    b.prototype.getPrefix = function () {
      return this.prefix;
    };
    b.prototype.getContainer = function () {
      return this.container;
    };
    b.prototype.getContainersArguments = function () {
      return this.containersArguments;
    };
    b.prototype.getDisplayChanges = function () {
      return this.displayChanges;
    };
    b.prototype.getCallbackArgs = function () {
      return this.callbackArgs;
    };
    b.prototype.getKeys = function () {
      return Object.keys(this.items);
    };
    b.prototype.getItem = function (a) {
      this.checkExistence(a);
      return this.items[a].getValue();
    };
    b.prototype.getObject = function (a) {
      return this.items[a];
    };
    b.prototype.hasKey = function (a) {
      return this.items.hasOwnProperty(a);
    };
    b.prototype.exportItems = function () {
      var a = {},
        b;
      for (b in this.items)
        this.items.hasOwnProperty(b) && (a[b] = this.items[b].getValue());
      return a;
    };
    b.prototype.addItem = function (a, b) {
      void 0 === b && (b = {});
      this.items[a] = new k(this, a, b);
      this.itemKeys.push(a);
      return this.items[a];
    };
    b.prototype.removeItem = function (a) {
      this.items.hasOwnProperty(a) &&
        (this.container &&
          this.items[a].hasElement &&
          this.container.removeChild(this.items[a].element),
        this.itemKeys.splice(this.itemKeys.indexOf(a), 1),
        delete this.items[a]);
    };
    b.prototype.clear = function () {
      var a;
      if (this.container)
        for (a in this.items)
          this.items[a].hasElement &&
            this.container.removeChild(this.items[a].element);
      this.items = {};
      this.itemKeys = [];
    };
    b.prototype.setItem = function (a, b) {
      this.checkExistence(a);
      this.items[a].setValue(b);
    };
    b.prototype.increase = function (a, b) {
      void 0 === b && (b = 1);
      this.checkExistence(a);
      var e = this.items[a].getValue();
      this.items[a].setValue(e + b);
    };
    b.prototype.decrease = function (a, b) {
      void 0 === b && (b = 1);
      this.checkExistence(a);
      var e = this.items[a].getValue();
      this.items[a].setValue(e - b);
    };
    b.prototype.toggle = function (a) {
      this.checkExistence(a);
      var b = this.items[a].getValue();
      this.items[a].setValue(b ? !1 : !0);
    };
    b.prototype.checkExistence = function (a) {
      if (!this.items.hasOwnProperty(a))
        if (this.allowNewItems) this.addItem(a);
        else throw Error("Unknown key given to ItemsHoldr: '" + a + "'.");
    };
    b.prototype.saveItem = function (a) {
      if (!this.items.hasOwnProperty(a))
        throw Error("Unknown key given to ItemsHoldr: '" + a + "'.");
      this.items[a].updateLocalStorage(!0);
    };
    b.prototype.saveAll = function () {
      for (var a in this.items)
        this.items.hasOwnProperty(a) && this.items[a].updateLocalStorage(!0);
    };
    b.prototype.hideContainer = function () {
      this.container.style.visibility = "hidden";
    };
    b.prototype.displayContainer = function () {
      this.container.style.visibility = "visible";
    };
    b.prototype.makeContainer = function (a) {
      var b = this.createElement.apply(this, a[0]),
        e = b,
        c,
        d,
        f;
      for (f = 1; f < a.length; ++f)
        (c = this.createElement.apply(this, a[f])), e.appendChild(c), (e = c);
      for (d in this.items)
        this.items[d].hasElement && c.appendChild(this.items[d].element);
      return b;
    };
    b.prototype.hasDisplayChange = function (a) {
      return this.displayChanges.hasOwnProperty(a);
    };
    b.prototype.getDisplayChange = function (a) {
      return this.displayChanges[a];
    };
    b.prototype.createElement = function (a) {
      void 0 === a && (a = "div");
      for (var b = [], e = 1; e < arguments.length; e++)
        b[e - 1] = arguments[e];
      var e = document.createElement(a),
        c;
      for (c = 0; c < b.length; c += 1) this.proliferateElement(e, b[c]);
      return e;
    };
    b.prototype.proliferate = function (a, b, e) {
      var c, d;
      for (d in b)
        !b.hasOwnProperty(d) ||
          (e && a.hasOwnProperty(d)) ||
          ((c = b[d]),
          "object" === typeof c
            ? (a.hasOwnProperty(d) || (a[d] = new c.constructor()),
              this.proliferate(a[d], c, e))
            : (a[d] = c));
      return a;
    };
    b.prototype.proliferateElement = function (a, b, e) {
      var c, d, f;
      for (d in b)
        if (b.hasOwnProperty(d) && (!e || !a.hasOwnProperty(d)))
          switch (((c = b[d]), d)) {
            case "children":
              if ("undefined" !== typeof c)
                for (f = 0; f < c.length; f += 1) a.appendChild(c[f]);
              break;
            case "style":
              this.proliferate(a[d], c);
              break;
            default:
              "object" === typeof c
                ? (a.hasOwnProperty(d) || (a[d] = new c.constructor()),
                  this.proliferate(a[d], c, e))
                : (a[d] = c);
          }
      return a;
    };
    b.prototype.createPlaceholderStorage = function () {
      var a,
        b = {
          keys: [],
          getItem: function (a) {
            return this.localStorage[a];
          },
          setItem: function (a, b) {
            this.localStorage[a] = b;
          },
          clear: function () {
            for (a in this) this.hasOwnProperty(a) && delete this[a];
          },
          removeItem: function (a) {
            delete this[a];
          },
          key: function (a) {
            return this.keys[a];
          },
        };
      Object.defineProperties(b, {
        length: {
          get: function () {
            return b.keys.length;
          },
        },
        remainingSpace: {
          get: function () {
            return 9001;
          },
        },
      });
      return b;
    };
    return b;
  })();
  h.ItemsHoldr = l;
})(ItemsHoldr || (ItemsHoldr = {}));
