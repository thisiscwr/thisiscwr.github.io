var __extends =
    (this && this.__extends) ||
    function (e, g) {
      function b() {
        this.constructor = e;
      }
      for (var a in g) g.hasOwnProperty(a) && (e[a] = g[a]);
      e.prototype =
        null === g ? Object.create(g) : ((b.prototype = g.prototype), new b());
    },
  TouchPassr;
(function (e) {
  var g = (function () {
    function b(a, f, d) {
      this.InputWriter = a;
      this.schema = f;
      this.resetElement(d);
    }
    b.prototype.getElement = function () {
      return this.element;
    };
    b.prototype.getElementInner = function () {
      return this.elementInner;
    };
    b.prototype.createElement = function (a) {
      for (var f = [], d = 1; d < arguments.length; d++)
        f[d - 1] = arguments[d];
      var d = document.createElement(a || "div"),
        c;
      for (c = 0; c < f.length; c += 1) this.proliferateElement(d, f[c]);
      return d;
    };
    b.prototype.proliferateElement = function (a, f, d) {
      void 0 === d && (d = !1);
      var c, h, b;
      for (h in f)
        if (f.hasOwnProperty(h) && (!d || !a.hasOwnProperty(h)))
          switch (((c = f[h]), h)) {
            case "children":
            case "children":
              if ("undefined" !== typeof c)
                for (b = 0; b < c.length; b += 1) a.appendChild(c[b]);
              break;
            case "style":
              this.proliferateElement(a[h], c);
              break;
            default:
              null === c
                ? (a[h] = null)
                : "object" === typeof c
                ? (a.hasOwnProperty(h) || (a[h] = new c.constructor()),
                  this.proliferateElement(a[h], c, d))
                : (a[h] = c);
          }
      return a;
    };
    b.prototype.resetElement = function (a, f) {
      var d = this,
        c = this.schema.position,
        b = c.offset;
      this.element = this.createElement("div", {
        className: "control",
        style: {
          position: "absolute",
          width: 0,
          height: 0,
          boxSizing: "border-box",
          opacity: ".84",
        },
      });
      this.elementInner = this.createElement("div", {
        className: "control-inner",
        textContent: this.schema.label || "",
        style: {
          position: "absolute",
          boxSizing: "border-box",
          textAlign: "center",
        },
      });
      this.element.appendChild(this.elementInner);
      "left" === c.horizontal
        ? (this.element.style.left = "0")
        : "right" === c.horizontal
        ? (this.element.style.right = "0")
        : "center" === c.horizontal && (this.element.style.left = "50%");
      "top" === c.vertical
        ? (this.element.style.top = "0")
        : "bottom" === c.vertical
        ? (this.element.style.bottom = "0")
        : "center" === c.vertical && (this.element.style.top = "50%");
      this.passElementStyles(a.global);
      this.passElementStyles(a[f]);
      this.passElementStyles(this.schema.styles);
      b.left &&
        (this.elementInner.style.marginLeft = this.createPixelMeasurement(
          b.left
        ));
      b.top &&
        (this.elementInner.style.marginTop = this.createPixelMeasurement(
          b.top
        ));
      setTimeout(function () {
        "center" === c.horizontal &&
          (d.elementInner.style.left = d.createHalfSizeMeasurement(
            d.elementInner,
            "width",
            "offsetWidth"
          ));
        "center" === c.vertical &&
          (d.elementInner.style.top = d.createHalfSizeMeasurement(
            d.elementInner,
            "height",
            "offsetHeight"
          ));
      });
    };
    b.prototype.createPixelMeasurement = function (a) {
      return a
        ? "number" === typeof a || a.constructor === Number
          ? a + "px"
          : a
        : "0";
    };
    b.prototype.createHalfSizeMeasurement = function (a, f, d) {
      f = a.style[f] || (d && a[d]);
      if (!f) return "0px";
      a = Number(f.replace(/[^\d]/g, "")) || 0;
      f = f.replace(/[\d]/g, "") || "px";
      return Math.round(a / -2) + f;
    };
    b.prototype.passElementStyles = function (a) {
      a &&
        (a.element && this.proliferateElement(this.element, a.element),
        a.elementInner &&
          this.proliferateElement(this.elementInner, a.elementInner));
    };
    b.prototype.setRotation = function (a, f) {
      a.style.transform = "rotate(" + f + "deg)";
    };
    b.prototype.getOffsets = function (a) {
      var f;
      a.offsetParent && a !== a.offsetParent
        ? ((f = this.getOffsets(a.offsetParent)),
          (f[0] += a.offsetLeft),
          (f[1] += a.offsetTop))
        : (f = [a.offsetLeft, a.offsetTop]);
      return f;
    };
    return b;
  })();
  e.Control = g;
})(TouchPassr || (TouchPassr = {}));
(function (e) {
  var g = (function (b) {
    function a() {
      b.apply(this, arguments);
    }
    __extends(a, b);
    a.prototype.resetElement = function (a) {
      var d = this.onEvent.bind(this, "activated"),
        c = this.onEvent.bind(this, "deactivated");
      b.prototype.resetElement.call(this, a, "Button");
      this.element.addEventListener("mousedown", d);
      this.element.addEventListener("touchstart", d);
      this.element.addEventListener("mouseup", c);
      this.element.addEventListener("touchend", c);
    };
    a.prototype.onEvent = function (a, d) {
      var c = this.schema.pipes[a],
        b,
        l;
      if (c)
        for (b in c)
          if (c.hasOwnProperty(b))
            for (l = 0; l < c[b].length; l += 1)
              this.InputWriter.callEvent(b, c[b][l], d);
    };
    return a;
  })(e.Control);
  e.ButtonControl = g;
})(TouchPassr || (TouchPassr = {}));
(function (e) {
  var g = (function (b) {
    function a() {
      b.apply(this, arguments);
    }
    __extends(a, b);
    a.prototype.resetElement = function (a) {
      b.prototype.resetElement.call(this, a, "Joystick");
      var d = this.schema.directions,
        c,
        h,
        l,
        e,
        g,
        k;
      this.proliferateElement(this.elementInner, {
        style: { "border-radius": "100%" },
      });
      this.elementCircle = this.createElement("div", {
        className: "control-inner control-joystick-circle",
        style: {
          position: "absolute",
          background: "red",
          borderRadius: "100%",
        },
      });
      this.proliferateElement(this.elementCircle, a.Joystick.circle);
      for (k = 0; k < d.length; k += 1)
        (h = d[k].degrees),
          (c = Math.sin((h * Math.PI) / 180)),
          (l = Math.cos((h * Math.PI) / 180)),
          (e = 50 * l + 50),
          (g = 50 * c + 50),
          (c = this.createElement("div", {
            className: "control-joystick-tick",
            style: {
              position: "absolute",
              left: e + "%",
              top: g + "%",
              marginLeft: 5 * -l - 5 + "px",
              marginTop: 2 * -c - 1 + "px",
            },
          })),
          this.proliferateElement(c, a.Joystick.tick),
          this.setRotation(c, h),
          this.elementCircle.appendChild(c);
      this.elementDragLine = this.createElement("div", {
        className: "control-joystick-drag-line",
        style: {
          position: "absolute",
          opacity: "0",
          top: ".77cm",
          left: ".77cm",
        },
      });
      this.proliferateElement(this.elementDragLine, a.Joystick.dragLine);
      this.elementCircle.appendChild(this.elementDragLine);
      this.elementDragShadow = this.createElement("div", {
        className: "control-joystick-drag-shadow",
        style: {
          position: "absolute",
          opacity: "1",
          top: "14%",
          right: "14%",
          bottom: "14%",
          left: "14%",
          marginLeft: "0",
          marginTop: "0",
          borderRadius: "100%",
        },
      });
      this.proliferateElement(this.elementDragShadow, a.Joystick.dragShadow);
      this.elementCircle.appendChild(this.elementDragShadow);
      this.elementInner.appendChild(this.elementCircle);
      this.elementInner.addEventListener(
        "click",
        this.triggerDragger.bind(this)
      );
      this.elementInner.addEventListener(
        "touchmove",
        this.triggerDragger.bind(this)
      );
      this.elementInner.addEventListener(
        "mousemove",
        this.triggerDragger.bind(this)
      );
      this.elementInner.addEventListener(
        "mouseover",
        this.positionDraggerEnable.bind(this)
      );
      this.elementInner.addEventListener(
        "touchstart",
        this.positionDraggerEnable.bind(this)
      );
      this.elementInner.addEventListener(
        "mouseout",
        this.positionDraggerDisable.bind(this)
      );
      this.elementInner.addEventListener(
        "touchend",
        this.positionDraggerDisable.bind(this)
      );
    };
    a.prototype.positionDraggerEnable = function () {
      this.dragEnabled = !0;
      this.elementDragLine.style.opacity = "1";
    };
    a.prototype.positionDraggerDisable = function () {
      this.dragEnabled = !1;
      this.elementDragLine.style.opacity = "0";
      this.elementDragShadow.style.top = "14%";
      this.elementDragShadow.style.right = "14%";
      this.elementDragShadow.style.bottom = "14%";
      this.elementDragShadow.style.left = "14%";
      if (this.currentDirection) {
        if (
          this.currentDirection.pipes &&
          this.currentDirection.pipes.deactivated
        )
          this.onEvent(this.currentDirection.pipes.deactivated, event);
        this.currentDirection = void 0;
      }
    };
    a.prototype.triggerDragger = function (a) {
      a.preventDefault();
      if (this.dragEnabled) {
        var d = this.getEventCoordinates(a),
          c = d[0],
          d = d[1],
          b = this.getOffsets(this.elementInner),
          c = this.getThetaRaw(
            (c - (b[0] + this.elementInner.offsetWidth / 2)) | 0,
            (b[1] + this.elementInner.offsetHeight / 2 - d) | 0
          ),
          c = this.findClosestDirection(c),
          c = this.schema.directions[c],
          d = c.degrees,
          e = this.getThetaComponents(d),
          b = e[0],
          e = -e[1];
        this.elementDragLine.style.marginLeft = ((77 * b) | 0) + "%";
        this.elementDragLine.style.marginTop = ((77 * e) | 0) + "%";
        this.elementDragShadow.style.top = ((14 + 10 * e) | 0) + "%";
        this.elementDragShadow.style.right = ((14 - 10 * b) | 0) + "%";
        this.elementDragShadow.style.bottom = ((14 - 10 * e) | 0) + "%";
        this.elementDragShadow.style.left = ((14 + 10 * b) | 0) + "%";
        this.setRotation(this.elementDragLine, (d + 450) % 360);
        this.positionDraggerEnable();
        this.setCurrentDirection(c, a);
      }
    };
    a.prototype.getEventCoordinates = function (a) {
      return "touchmove" === a.type
        ? ((a = a.touches[0]), [a.pageX, a.pageY])
        : [a.x, a.y];
    };
    a.prototype.getThetaRaw = function (a, b) {
      return 0 < a
        ? 0 < b
          ? (180 * Math.atan(a / b)) / Math.PI
          : (180 * -Math.atan(b / a)) / Math.PI + 90
        : 0 > b
        ? (180 * Math.atan(a / b)) / Math.PI + 180
        : (180 * -Math.atan(b / a)) / Math.PI + 270;
    };
    a.prototype.getThetaComponents = function (a) {
      a = (a * Math.PI) / 180;
      return [Math.sin(a), Math.cos(a)];
    };
    a.prototype.findClosestDirection = function (a) {
      var b = this.schema.directions,
        c = Math.abs(b[0].degrees - a),
        e = b[0].degrees,
        g = 0,
        n = 0,
        m,
        k;
      for (k = 1; k < b.length; k += 1)
        (m = Math.abs(b[k].degrees - a)),
          m < c && ((c = m), (n = k)),
          b[k].degrees < e && ((e = b[k].degrees), (g = k));
      m = Math.abs(e + 360 - a);
      m < c && (n = g);
      return n;
    };
    a.prototype.setCurrentDirection = function (a, b) {
      if (this.currentDirection !== a) {
        if (
          this.currentDirection &&
          this.currentDirection.pipes &&
          this.currentDirection.pipes.deactivated
        )
          this.onEvent(this.currentDirection.pipes.deactivated, b);
        if (a.pipes && a.pipes.activated) this.onEvent(a.pipes.activated, b);
        this.currentDirection = a;
      }
    };
    a.prototype.onEvent = function (a, b) {
      var c, e;
      for (c in a)
        if (a.hasOwnProperty(c))
          for (e = 0; e < a[c].length; e += 1)
            this.InputWriter.callEvent(c, a[c][e], b);
    };
    return a;
  })(e.Control);
  e.JoystickControl = g;
})(TouchPassr || (TouchPassr = {}));
(function (e) {
  var g = (function () {
    function b(a) {
      if ("undefined" === typeof a)
        throw Error("No settings object given to TouchPassr.");
      if ("undefined" === typeof a.InputWriter)
        throw Error("No InputWriter given to TouchPassr.");
      this.InputWriter = a.InputWriter;
      this.styles = a.styles || {};
      this.resetContainer(a.container);
      this.controls = {};
      a.controls && this.addControls(a.controls);
      (this.enabled = "undefined" === typeof a.enabled ? !0 : a.enabled)
        ? this.enable()
        : this.disable();
    }
    b.prototype.getInputWriter = function () {
      return this.InputWriter;
    };
    b.prototype.getEnabled = function () {
      return this.enabled;
    };
    b.prototype.getStyles = function () {
      return this.styles;
    };
    b.prototype.getControls = function () {
      return this.controls;
    };
    b.prototype.getContainer = function () {
      return this.container;
    };
    b.prototype.getParentContainer = function () {
      return this.parentContainer;
    };
    b.prototype.enable = function () {
      this.enabled = !0;
      this.container.style.display = "block";
    };
    b.prototype.disable = function () {
      this.enabled = !1;
      this.container.style.display = "none";
    };
    b.prototype.setParentContainer = function (a) {
      this.parentContainer = a;
      this.parentContainer.appendChild(this.container);
    };
    b.prototype.addControls = function (a) {
      for (var b in a) a.hasOwnProperty(b) && this.addControl(a[b]);
    };
    b.prototype.addControl = function (a) {
      if (!b.controlClasses.hasOwnProperty(a.control))
        throw Error("Unknown control schema: '" + a.control + "'.");
      var e = new b.controlClasses[a.control](this.InputWriter, a, this.styles);
      this.controls[a.name] = e;
      this.container.appendChild(e.getElement());
    };
    b.prototype.resetContainer = function (a) {
      this.container = e.Control.prototype.createElement("div", {
        className: "touch-passer-container",
        style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
      });
      a && this.setParentContainer(a);
    };
    b.controlClasses = { Button: e.ButtonControl, Joystick: e.JoystickControl };
    return b;
  })();
  e.TouchPassr = g;
})(TouchPassr || (TouchPassr = {}));
