var DeviceLayr;
(function (f) {
  (function (d) {
    d[(d.negative = 0)] = "negative";
    d[(d.neutral = 1)] = "neutral";
    d[(d.positive = 2)] = "positive";
  })(f.AxisStatus || (f.AxisStatus = {}));
  var g = f.AxisStatus,
    k = (function () {
      function d(a) {
        if ("undefined" === typeof a)
          throw Error("No settings object given to DeviceLayr.");
        if ("undefined" === typeof a.InputWriter)
          throw Error("No InputWriter given to DeviceLayr.");
        this.InputWritr = a.InputWriter;
        this.triggers = a.triggers || {};
        this.aliases = a.aliases || { on: "on", off: "off" };
        this.gamepads = [];
      }
      d.prototype.getInputWritr = function () {
        return this.InputWritr;
      };
      d.prototype.getTriggers = function () {
        return this.triggers;
      };
      d.prototype.getAliases = function () {
        return this.aliases;
      };
      d.prototype.getGamepads = function () {
        return this.gamepads;
      };
      d.prototype.checkNavigatorGamepads = function () {
        if (
          "undefined" === typeof navigator.getGamepads ||
          !navigator.getGamepads()[this.gamepads.length]
        )
          return 0;
        this.registerGamepad(navigator.getGamepads()[this.gamepads.length]);
        return this.checkNavigatorGamepads() + 1;
      };
      d.prototype.registerGamepad = function (a) {
        this.gamepads.push(a);
        this.setDefaultTriggerStatuses(a, this.triggers);
      };
      d.prototype.activateAllGamepadTriggers = function () {
        for (var a = 0; a < this.gamepads.length; a += 1)
          this.activateGamepadTriggers(this.gamepads[a]);
      };
      d.prototype.activateGamepadTriggers = function (a) {
        var c = d.controllerMappings[a.mapping || "standard"],
          b;
        for (b = Math.min(c.axes.length, a.axes.length) - 1; 0 <= b; --b)
          this.activateAxisTrigger(
            a,
            c.axes[b].name,
            c.axes[b].axis,
            a.axes[b]
          );
        for (b = Math.min(c.buttons.length, a.buttons.length) - 1; 0 <= b; --b)
          this.activateButtonTrigger(a, c.buttons[b], a.buttons[b].pressed);
      };
      d.prototype.activateAxisTrigger = function (a, c, b, d) {
        if ((c = this.triggers[c][b])) {
          a = this.getAxisStatus(a, d);
          if (c.status === a) return !1;
          void 0 !== c.status &&
            void 0 !== c[g[c.status]] &&
            this.InputWritr.callEvent(this.aliases.off, c[g[c.status]]);
          c.status = a;
          void 0 !== c[g[a]] &&
            this.InputWritr.callEvent(this.aliases.on, c[g[a]]);
          return !0;
        }
      };
      d.prototype.activateButtonTrigger = function (a, c, b) {
        a = this.triggers[c];
        if (!a || a.status === b) return !1;
        a.status = b;
        this.InputWritr.callEvent(
          b ? this.aliases.on : this.aliases.off,
          a.trigger
        );
        return !0;
      };
      d.prototype.clearAllGamepadTriggers = function () {
        for (var a = 0; a < this.gamepads.length; a += 1)
          this.clearGamepadTriggers(this.gamepads[a]);
      };
      d.prototype.clearGamepadTriggers = function (a) {
        var c = d.controllerMappings[a.mapping || "standard"],
          b;
        for (b = 0; b < c.axes.length; b += 1)
          this.clearAxisTrigger(a, c.axes[b].name, c.axes[b].axis);
        for (b = 0; b < c.buttons.length; b += 1)
          this.clearButtonTrigger(a, c.buttons[b]);
      };
      d.prototype.clearAxisTrigger = function (a, c, b) {
        this.triggers[c][b].status = g.neutral;
      };
      d.prototype.clearButtonTrigger = function (a, c) {
        this.triggers[c].status = !1;
      };
      d.prototype.setDefaultTriggerStatuses = function (a, c) {
        var b = d.controllerMappings[a.mapping || "standard"],
          h,
          e,
          f;
        for (e = 0; e < b.buttons.length; e += 1)
          (h = c[b.buttons[e]]) && void 0 === h.status && (h.status = !1);
        for (e = 0; e < b.axes.length; e += 1)
          for (f in ((h = c[b.axes[e].name]), h))
            h.hasOwnProperty(f) &&
              void 0 === h[f].status &&
              (h[f].status = g.neutral);
      };
      d.prototype.getAxisStatus = function (a, c) {
        var b = d.controllerMappings[a.mapping || "standard"].joystickThreshold;
        return c > b ? g.positive : c < -b ? g.negative : g.neutral;
      };
      d.controllerMappings = {
        standard: {
          axes: [
            { axis: "x", joystick: 0, name: "leftJoystick" },
            { axis: "y", joystick: 0, name: "leftJoystick" },
            { axis: "x", joystick: 1, name: "rightJoystick" },
            { axis: "y", joystick: 1, name: "rightJoystick" },
          ],
          buttons:
            "a b x y leftTop rightTop leftTrigger rightTrigger select start leftStick rightStick dpadUp dpadDown dpadLeft dpadRight".split(
              " "
            ),
          joystickThreshold: 0.49,
        },
      };
      return d;
    })();
  f.DeviceLayr = k;
})(DeviceLayr || (DeviceLayr = {}));
