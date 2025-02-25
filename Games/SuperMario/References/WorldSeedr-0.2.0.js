var WorldSeedr;
(function (l) {
  var m = (function () {
    function k(f, h) {
      this.randomBetween = f;
      this.chooseAmong = h;
    }
    k.prototype.calculateFromSpacing = function (f) {
      if (!f) return 0;
      switch (f.constructor) {
        case Array:
          return f[0].constructor === Number
            ? this.randomBetween(f[0], f[1])
            : this.calculateFromPossibilities(f);
        case Object:
          return this.calculateFromPossibility(f);
        case Number:
          return f;
        default:
          throw Error("Unknown spacing requested: '" + f + "'.");
      }
    };
    k.prototype.calculateFromPossibility = function (f) {
      var h = f.units || 1;
      return this.randomBetween(f.min / h, f.max / h) * h;
    };
    k.prototype.calculateFromPossibilities = function (f) {
      return this.calculateFromPossibility(this.chooseAmong(f).value);
    };
    return k;
  })();
  l.SpacingCalculator = m;
})(WorldSeedr || (WorldSeedr = {}));
(function (l) {
  var m = { top: "bottom", right: "left", bottom: "top", left: "right" },
    k = { top: "height", right: "width", bottom: "height", left: "width" },
    f = ["top", "right", "bottom", "left"],
    h = ["width", "height"],
    n = (function () {
      function e(a) {
        if ("undefined" === typeof a)
          throw Error("No settings object given to WorldSeedr.");
        if ("undefined" === typeof a.possibilities)
          throw Error("No possibilities given to WorldSeedr.");
        this.possibilities = a.possibilities;
        this.random = a.random || Math.random.bind(Math);
        this.onPlacement = a.onPlacement || console.log.bind(console, "Got:");
        this.spacingCalculator = new l.SpacingCalculator(
          this.randomBetween.bind(this),
          this.chooseAmong.bind(this)
        );
        this.clearGeneratedCommands();
      }
      e.prototype.getPossibilities = function () {
        return this.possibilities;
      };
      e.prototype.setPossibilities = function (a) {
        this.possibilities = a;
      };
      e.prototype.getOnPlacement = function () {
        return this.onPlacement;
      };
      e.prototype.setOnPlacement = function (a) {
        this.onPlacement = a;
      };
      e.prototype.clearGeneratedCommands = function () {
        this.generatedCommands = [];
      };
      e.prototype.runGeneratedCommands = function () {
        this.onPlacement(this.generatedCommands);
      };
      e.prototype.generate = function (a, b) {
        var c = this.possibilities[a];
        if (!c) throw Error("No possibility exists under '" + a + "'");
        if (!c.contents)
          throw Error("Possibility '" + a + "' has no possibile outcomes.");
        return this.generateChildren(c, this.objectCopy(b));
      };
      e.prototype.generateFull = function (a) {
        a = this.generate(a.title, a);
        var b, c;
        if (a && a.children)
          for (c = 0; c < a.children.length; c += 1)
            switch (((b = a.children[c]), b.type)) {
              case "Known":
                this.generatedCommands.push(b);
                break;
              case "Random":
                this.generateFull(b);
                break;
              default:
                throw Error("Unknown child type: " + b.type);
            }
      };
      e.prototype.generateChildren = function (a, b, c) {
        var d = a.contents,
          e = d.spacing || 0;
        a = this.objectMerge(a, b);
        c = d.direction || c;
        switch (d.mode) {
          case "Random":
            c = this.generateRandom(d, a, c, e);
            break;
          case "Certain":
            c = this.generateCertain(d, a, c, e);
            break;
          case "Repeat":
            c = this.generateRepeat(d, a, c, e);
            break;
          case "Multiple":
            c = this.generateMultiple(d, a, c, e);
            break;
          default:
            throw Error("Unknown contents mode: " + d.mode);
        }
        return this.wrapChoicePositionExtremes(c);
      };
      e.prototype.generateCertain = function (a, b, c, d) {
        var e = this;
        return a.children
          .map(function (a) {
            if ("Final" === a.type) return e.parseChoiceFinal(a, b, c);
            if ((a = e.parseChoice(a, b, c)))
              "Known" !== a.type && (a.contents = e.generate(a.title, b)),
                e.shrinkPositionByChild(b, a, c, d);
            return a;
          })
          .filter(function (a) {
            return void 0 !== a;
          });
      };
      e.prototype.generateRepeat = function (a, b, c, d) {
        a = a.children;
        for (var e = [], g, f = 0; this.positionIsNotEmpty(b, c); ) {
          g = a[f];
          "Final" === g.type
            ? (g = this.parseChoiceFinal(g, b, c))
            : (g = this.parseChoice(g, b, c)) &&
              "Known" !== g.type &&
              (g.contents = this.generate(g.title, b));
          if (g && this.choiceFitsPosition(g, b))
            this.shrinkPositionByChild(b, g, c, d), e.push(g);
          else break;
          f += 1;
          f >= a.length && (f = 0);
        }
        return e;
      };
      e.prototype.generateRandom = function (a, b, c, d) {
        for (var e = [], f; this.positionIsNotEmpty(b, c); ) {
          f = this.generateChild(a, b, c);
          if (!f) break;
          this.shrinkPositionByChild(b, f, c, d);
          e.push(f);
          if (a.limit && e.length > a.limit) return;
        }
        return e;
      };
      e.prototype.generateMultiple = function (a, b, c, d) {
        var e = this;
        return a.children.map(function (a) {
          a = e.parseChoice(a, e.objectCopy(b), c);
          c && e.movePositionBySpacing(b, c, d);
          return a;
        });
      };
      e.prototype.generateChild = function (a, b, c) {
        return (a = this.chooseAmongPosition(a.children, b))
          ? this.parseChoice(a, b, c)
          : void 0;
      };
      e.prototype.parseChoice = function (a, b, c) {
        var d = a.title,
          e = this.possibilities[d],
          d = {
            title: d,
            type: a.type,
            arguments:
              a.arguments instanceof Array
                ? this.chooseAmong(a.arguments).values
                : a.arguments,
            width: void 0,
            height: void 0,
            top: void 0,
            right: void 0,
            bottom: void 0,
            left: void 0,
          };
        this.ensureSizingOnChoice(d, a, e);
        this.ensureDirectionBoundsOnChoice(d, b);
        d[c] = d[m[c]] + d[k[c]];
        switch (e.contents.snap) {
          case "top":
            d.bottom = d.top - d.height;
            break;
          case "right":
            d.left = d.right - d.width;
            break;
          case "bottom":
            d.top = d.bottom + d.height;
            break;
          case "left":
            d.right = d.left + d.width;
        }
        a.stretch &&
          (d.arguments || (d.arguments = {}),
          a.stretch.width &&
            ((d.left = b.left),
            (d.right = b.right),
            (d.width = d.right - d.left),
            (d.arguments.width = d.width)),
          a.stretch.height &&
            ((d.top = b.top),
            (d.bottom = b.bottom),
            (d.height = d.top - d.bottom),
            (d.arguments.height = d.height)));
        return d;
      };
      e.prototype.parseChoiceFinal = function (a, b, c) {
        c = this.possibilities[a.source];
        return {
          type: "Known",
          title: a.title,
          arguments: a.arguments,
          width: c.width,
          height: c.height,
          top: b.top,
          right: b.right,
          bottom: b.bottom,
          left: b.left,
        };
      };
      e.prototype.chooseAmong = function (a) {
        if (a.length) {
          if (1 === a.length) return a[0];
          var b = this.randomPercentage(),
            c = 0,
            d;
          for (d = 0; d < a.length; d += 1)
            if (((c += a[d].percent), c >= b)) return a[d];
        }
      };
      e.prototype.chooseAmongPosition = function (a, b) {
        var c = b.right - b.left,
          d = b.top - b.bottom,
          e = this;
        return this.chooseAmong(
          a.filter(function (a) {
            return e.choiceFitsSize(e.possibilities[a.title], c, d);
          })
        );
      };
      e.prototype.choiceFitsSize = function (a, b, c) {
        return a.width <= b && a.height <= c;
      };
      e.prototype.choiceFitsPosition = function (a, b) {
        return this.choiceFitsSize(a, b.right - b.left, b.top - b.bottom);
      };
      e.prototype.positionIsNotEmpty = function (a, b) {
        return "right" === b || "left" === b
          ? a.left < a.right
          : a.top > a.bottom;
      };
      e.prototype.shrinkPositionByChild = function (a, b, c, d) {
        void 0 === d && (d = 0);
        switch (c) {
          case "top":
            a.bottom = b.top + this.spacingCalculator.calculateFromSpacing(d);
            break;
          case "right":
            a.left = b.right + this.spacingCalculator.calculateFromSpacing(d);
            break;
          case "bottom":
            a.top = b.bottom - this.spacingCalculator.calculateFromSpacing(d);
            break;
          case "left":
            a.right = b.left - this.spacingCalculator.calculateFromSpacing(d);
        }
      };
      e.prototype.movePositionBySpacing = function (a, b, c) {
        void 0 === c && (c = 0);
        c = this.spacingCalculator.calculateFromSpacing(c);
        switch (b) {
          case "top":
            a.top += c;
            a.bottom += c;
            break;
          case "right":
            a.left += c;
            a.right += c;
            break;
          case "bottom":
            a.top -= c;
            a.bottom -= c;
            break;
          case "left":
            a.left -= c;
            a.right -= c;
            break;
          default:
            throw Error("Unknown direction: " + b);
        }
      };
      e.prototype.wrapChoicePositionExtremes = function (a) {
        var b, c, d;
        if (a && a.length) {
          c = a[0];
          b = {
            title: void 0,
            top: c.top,
            right: c.right,
            bottom: c.bottom,
            left: c.left,
            width: void 0,
            height: void 0,
            children: a,
          };
          if (1 === a.length) return b;
          for (d = 1; d < a.length; d += 1) {
            c = a[d];
            if (!Object.keys(c).length) return b;
            b.top = Math.max(b.top, c.top);
            b.right = Math.max(b.right, c.right);
            b.bottom = Math.min(b.bottom, c.bottom);
            b.left = Math.min(b.left, c.left);
          }
          b.width = b.right - b.left;
          b.height = b.top - b.bottom;
          return b;
        }
      };
      e.prototype.ensureSizingOnChoice = function (a, b, c) {
        var d, e;
        for (e in h)
          h.hasOwnProperty(e) &&
            ((d = h[e]),
            (a[d] =
              b.sizing && "undefined" !== typeof b.sizing[d]
                ? b.sizing[d]
                : c[d]));
      };
      e.prototype.ensureDirectionBoundsOnChoice = function (a, b) {
        for (var c in f) f.hasOwnProperty(c) && (a[f[c]] = b[f[c]]);
      };
      e.prototype.randomPercentage = function () {
        return Math.floor(100 * this.random()) + 1;
      };
      e.prototype.randomBetween = function (a, b) {
        return Math.floor(this.random() * (1 + b - a)) + a;
      };
      e.prototype.objectCopy = function (a) {
        var b = {},
          c;
        for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b;
      };
      e.prototype.objectMerge = function (a, b) {
        var c = this.objectCopy(a),
          d;
        for (d in b)
          b.hasOwnProperty(d) && !c.hasOwnProperty(d) && (c[d] = b[d]);
        return c;
      };
      return e;
    })();
  l.WorldSeedr = n;
})(WorldSeedr || (WorldSeedr = {}));
