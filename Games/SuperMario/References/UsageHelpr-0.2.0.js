var UsageHelpr;
(function (f) {
  var g = (function () {
    function c(a) {
      void 0 === a && (a = {});
      this.openings = a.openings || [];
      this.options = a.options || {};
      this.optionHelp = a.optionHelp || "";
      this.aliases = a.aliases || [];
      this.logger = a.logger || console.log.bind(console);
    }
    c.prototype.displayHelpMenu = function () {
      var a = this;
      this.openings.forEach(function (b) {
        return a.logHelpText(b);
      });
    };
    c.prototype.displayHelpOptions = function () {
      var a = this;
      this.logHelpText([this.optionHelp, "code"]);
      Object.keys(this.options).forEach(function (b) {
        return a.displayHelpGroupSummary(b);
      });
      this.logHelpText(["\r\n" + this.optionHelp, "code"]);
    };
    c.prototype.displayHelpGroupSummary = function (a) {
      var b = this.options[a],
        e = 0,
        d;
      this.logger("\r\n%c" + a, c.styles.head);
      for (d = 0; d < b.length; d += 1)
        e = Math.max(e, this.filterHelpText(b[d].title).length);
      for (d = 0; d < b.length; d += 1)
        (a = b[d]),
          this.logger(
            "%c" +
              this.padTextRight(this.filterHelpText(a.title), e) +
              "%c  // " +
              a.description,
            c.styles.code,
            c.styles.comment
          );
    };
    c.prototype.displayHelpOption = function (a) {
      var b = this.options[a],
        e,
        d,
        c;
      this.logHelpText(["\r\n\r\n%c" + a + "\r\n-------\r\n\r\n", "head"]);
      for (d = 0; d < b.length; d += 1) {
        a = b[d];
        this.logHelpText([
          "%c" + a.title + "%c  ---  " + a.description,
          "head",
          "italic",
        ]);
        a.usage &&
          this.logHelpText(["%cUsage: %c" + a.usage, "comment", "code"]);
        if (a.examples)
          for (c = 0; c < a.examples.length; c += 1)
            (e = a.examples[c]),
              this.logger("\r\n"),
              this.logHelpText(["%c// " + e.comment, "comment"]),
              this.logHelpText([
                "%c" + this.padTextRight(this.filterHelpText(e.code), 0),
                "code",
              ]);
        this.logger("\r\n");
      }
    };
    c.prototype.logHelpText = function (a) {
      if ("string" === typeof a) return this.logHelpText([a]);
      var b = a[0];
      a = a
        .slice(1)
        .filter(function (a) {
          return c.styles.hasOwnProperty(a);
        })
        .map(function (a) {
          return c.styles[a];
        });
      this.logger.apply(this, [this.filterHelpText(b)].concat(a, [""]));
    };
    c.prototype.filterHelpText = function (a) {
      if (a.constructor === Array) return this.filterHelpText(a[0]);
      var b;
      for (b = 0; b < this.aliases.length; b += 1)
        a = a.replace(new RegExp(this.aliases[b][0], "g"), this.aliases[b][1]);
      return a;
    };
    c.prototype.padTextRight = function (a, b, c) {
      void 0 === c && (c = " ");
      b = 1 + b - a.length;
      return 0 >= b ? a : a + Array.call(Array, b).join(c);
    };
    c.styles = {
      code: "color: #000077; font-weight: bold; font-family: Consolas, Courier New, monospace;",
      comment: "color: #497749; font-style: italic;",
      head: "font-weight: bold; font-size: 117%;",
      italic: "font-style: italic;",
      none: "",
    };
    return c;
  })();
  f.UsageHelpr = g;
})(UsageHelpr || (UsageHelpr = {}));
