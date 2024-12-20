var QuadsKeepr;
(function (g) {
  var h = (function () {
    function e(a) {
      if (!a) throw Error("No settings object given to QuadsKeepr.");
      if (!a.ObjectMaker) throw Error("No ObjectMaker given to QuadsKeepr.");
      if (!a.numRows) throw Error("No numRows given to QuadsKeepr.");
      if (!a.numCols) throw Error("No numCols given to QuadsKeepr.");
      if (!a.quadrantWidth)
        throw Error("No quadrantWidth given to QuadsKeepr.");
      if (!a.quadrantHeight)
        throw Error("No quadrantHeight given to QuadsKeepr.");
      if (!a.groupNames) throw Error("No groupNames given to QuadsKeepr.");
      this.ObjectMaker = a.ObjectMaker;
      this.numRows = a.numRows | 0;
      this.numCols = a.numCols | 0;
      this.quadrantWidth = a.quadrantWidth | 0;
      this.quadrantHeight = a.quadrantHeight | 0;
      this.groupNames = a.groupNames;
      this.onAdd = a.onAdd;
      this.onRemove = a.onRemove;
      this.startLeft = a.startLeft | 0;
      this.startTop = a.startTop | 0;
      this.keyTop = a.keyTop || "top";
      this.keyLeft = a.keyLeft || "left";
      this.keyBottom = a.keyBottom || "bottom";
      this.keyRight = a.keyRight || "right";
      this.keyNumQuads = a.keyNumQuads || "numquads";
      this.keyQuadrants = a.keyQuadrants || "quadrants";
      this.keyChanged = a.keyChanged || "changed";
      this.keyToleranceX = a.keyToleranceX || "tolx";
      this.keyToleranceY = a.keyToleranceY || "toly";
      this.keyGroupName = a.keyGroupName || "group";
      this.keyOffsetX = a.keyOffsetX;
      this.keyOffsetY = a.keyOffsetY;
    }
    e.prototype.getQuadrantRows = function () {
      return this.quadrantRows;
    };
    e.prototype.getQuadrantCols = function () {
      return this.quadrantCols;
    };
    e.prototype.getNumRows = function () {
      return this.numRows;
    };
    e.prototype.getNumCols = function () {
      return this.numCols;
    };
    e.prototype.getQuadrantWidth = function () {
      return this.quadrantWidth;
    };
    e.prototype.getQuadrantHeight = function () {
      return this.quadrantHeight;
    };
    e.prototype.resetQuadrants = function () {
      var a = this.startLeft,
        b = this.startTop,
        c,
        d,
        e;
      this.top = this.startTop;
      this.right = this.startLeft + this.quadrantWidth * this.numCols;
      this.bottom = this.startTop + this.quadrantHeight * this.numRows;
      this.left = this.startLeft;
      this.quadrantRows = [];
      this.quadrantCols = [];
      for (d = this.offsetY = this.offsetX = 0; d < this.numRows; d += 1)
        this.quadrantRows.push({ left: this.startLeft, top: b, quadrants: [] }),
          (b += this.quadrantHeight);
      for (e = 0; e < this.numCols; e += 1)
        this.quadrantCols.push({ left: a, top: this.startTop, quadrants: [] }),
          (a += this.quadrantWidth);
      b = this.startTop;
      for (d = 0; d < this.numRows; d += 1) {
        a = this.startLeft;
        for (e = 0; e < this.numCols; e += 1)
          (c = this.createQuadrant(a, b)),
            this.quadrantRows[d].quadrants.push(c),
            this.quadrantCols[e].quadrants.push(c),
            (a += this.quadrantWidth);
        b += this.quadrantHeight;
      }
      if (this.onAdd)
        this.onAdd("xInc", this.top, this.right, this.bottom, this.left);
    };
    e.prototype.shiftQuadrants = function (a, b) {
      void 0 === a && (a = 0);
      void 0 === b && (b = 0);
      var c, d;
      a |= 0;
      b |= 0;
      this.offsetX += a;
      this.offsetY += b;
      this.top += b;
      this.right += a;
      this.bottom += b;
      this.left += a;
      for (c = 0; c < this.numRows; c += 1)
        (this.quadrantRows[c].left += a), (this.quadrantRows[c].top += b);
      for (d = 0; d < this.numCols; d += 1)
        (this.quadrantCols[d].left += a), (this.quadrantCols[d].top += b);
      for (c = 0; c < this.numRows; c += 1)
        for (d = 0; d < this.numCols; d += 1)
          this.shiftQuadrant(this.quadrantRows[c].quadrants[d], a, b);
      this.adjustOffsets();
    };
    e.prototype.pushQuadrantRow = function (a) {
      var b = this.createQuadrantRow(this.left, this.bottom),
        c;
      this.numRows += 1;
      this.quadrantRows.push(b);
      for (c = 0; c < this.quadrantCols.length; c += 1)
        this.quadrantCols[c].quadrants.push(b.quadrants[c]);
      this.bottom += this.quadrantHeight;
      if (a && this.onAdd)
        this.onAdd(
          "yInc",
          this.bottom,
          this.right,
          this.bottom - this.quadrantHeight,
          this.left
        );
      return b;
    };
    e.prototype.pushQuadrantCol = function (a) {
      var b = this.createQuadrantCol(this.right, this.top),
        c;
      this.numCols += 1;
      this.quadrantCols.push(b);
      for (c = 0; c < this.quadrantRows.length; c += 1)
        this.quadrantRows[c].quadrants.push(b.quadrants[c]);
      this.right += this.quadrantWidth;
      if (a && this.onAdd)
        this.onAdd(
          "xInc",
          this.top,
          this.right - this.offsetY,
          this.bottom,
          this.right - this.quadrantWidth - this.offsetY
        );
      return b;
    };
    e.prototype.popQuadrantRow = function (a) {
      for (var b = 0; b < this.quadrantCols.length; b += 1)
        this.quadrantCols[b].quadrants.pop();
      --this.numRows;
      this.quadrantRows.pop();
      if (a && this.onRemove)
        this.onRemove(
          "yInc",
          this.bottom,
          this.right,
          this.bottom - this.quadrantHeight,
          this.left
        );
      this.bottom -= this.quadrantHeight;
    };
    e.prototype.popQuadrantCol = function (a) {
      for (var b = 0; b < this.quadrantRows.length; b += 1)
        this.quadrantRows[b].quadrants.pop();
      --this.numCols;
      this.quadrantCols.pop();
      if (a && this.onRemove)
        this.onRemove(
          "xDec",
          this.top,
          this.right - this.offsetY,
          this.bottom,
          this.right - this.quadrantWidth - this.offsetY
        );
      this.right -= this.quadrantWidth;
    };
    e.prototype.unshiftQuadrantRow = function (a) {
      var b = this.createQuadrantRow(this.left, this.top - this.quadrantHeight),
        c;
      this.numRows += 1;
      this.quadrantRows.unshift(b);
      for (c = 0; c < this.quadrantCols.length; c += 1)
        this.quadrantCols[c].quadrants.unshift(b.quadrants[c]);
      this.top -= this.quadrantHeight;
      if (a && this.onAdd)
        this.onAdd(
          "yDec",
          this.top,
          this.right,
          this.top + this.quadrantHeight,
          this.left
        );
      return b;
    };
    e.prototype.unshiftQuadrantCol = function (a) {
      var b = this.createQuadrantCol(this.left - this.quadrantWidth, this.top),
        c;
      this.numCols += 1;
      this.quadrantCols.unshift(b);
      for (c = 0; c < this.quadrantRows.length; c += 1)
        this.quadrantRows[c].quadrants.unshift(b.quadrants[c]);
      this.left -= this.quadrantWidth;
      if (a && this.onAdd)
        this.onAdd(
          "xDec",
          this.top,
          this.left,
          this.bottom,
          this.left + this.quadrantWidth
        );
      return b;
    };
    e.prototype.shiftQuadrantRow = function (a) {
      for (var b = 0; b < this.quadrantCols.length; b += 1)
        this.quadrantCols[b].quadrants.shift();
      --this.numRows;
      this.quadrantRows.pop();
      if (a && this.onRemove)
        this.onRemove(
          "yInc",
          this.top,
          this.right,
          this.top + this.quadrantHeight,
          this.left
        );
      this.top += this.quadrantHeight;
    };
    e.prototype.shiftQuadrantCol = function (a) {
      for (var b = 0; b < this.quadrantRows.length; b += 1)
        this.quadrantRows[b].quadrants.shift();
      --this.numCols;
      this.quadrantCols.pop();
      if (a && this.onRemove)
        this.onRemove(
          "xInc",
          this.top,
          this.left + this.quadrantWidth,
          this.bottom,
          this.left
        );
      this.left += this.quadrantWidth;
    };
    e.prototype.determineAllQuadrants = function (a, b) {
      var c, d;
      for (c = 0; c < this.numRows; c += 1)
        for (d = 0; d < this.numCols; d += 1)
          this.quadrantRows[c].quadrants[d].numthings[a] = 0;
      b.forEach(this.determineThingQuadrants.bind(this));
    };
    e.prototype.determineThingQuadrants = function (a) {
      var b = a[this.keyGroupName],
        c = this.findQuadrantRowStart(a),
        d = this.findQuadrantColStart(a),
        e = this.findQuadrantRowEnd(a),
        g = this.findQuadrantColEnd(a),
        f;
      a[this.keyChanged] && this.markThingQuadrantsChanged(a);
      for (a[this.keyNumQuads] = 0; c <= e; c += 1)
        for (f = d; f <= g; f += 1)
          this.setThingInQuadrant(a, this.quadrantRows[c].quadrants[f], b);
      a[this.keyChanged] = !1;
    };
    e.prototype.setThingInQuadrant = function (a, b, c) {
      a[this.keyQuadrants][a[this.keyNumQuads]] = b;
      a[this.keyNumQuads] += 1;
      b.things[c][b.numthings[c]] = a;
      b.numthings[c] += 1;
      a[this.keyChanged] && (b[this.keyChanged] = !0);
    };
    e.prototype.adjustOffsets = function () {
      for (; -this.offsetX > this.quadrantWidth; )
        this.shiftQuadrantCol(!0),
          this.pushQuadrantCol(!0),
          (this.offsetX += this.quadrantWidth);
      for (; this.offsetX > this.quadrantWidth; )
        this.popQuadrantCol(!0),
          this.unshiftQuadrantCol(!0),
          (this.offsetX -= this.quadrantWidth);
      for (; -this.offsetY > this.quadrantHeight; )
        this.unshiftQuadrantRow(!0),
          this.pushQuadrantRow(!0),
          (this.offsetY += this.quadrantHeight);
      for (; this.offsetY > this.quadrantHeight; )
        this.popQuadrantRow(!0),
          this.unshiftQuadrantRow(!0),
          (this.offsetY -= this.quadrantHeight);
    };
    e.prototype.shiftQuadrant = function (a, b, c) {
      a.top += c;
      a.right += b;
      a.bottom += c;
      a.left += b;
      a[this.keyChanged] = !0;
    };
    e.prototype.createQuadrant = function (a, b) {
      var c = this.ObjectMaker.make("Quadrant"),
        d;
      c[this.keyChanged] = !0;
      c.things = {};
      c.numthings = {};
      for (d = 0; d < this.groupNames.length; d += 1)
        (c.things[this.groupNames[d]] = []),
          (c.numthings[this.groupNames[d]] = 0);
      c.left = a;
      c.top = b;
      c.right = a + this.quadrantWidth;
      c.bottom = b + this.quadrantHeight;
      return c;
    };
    e.prototype.createQuadrantRow = function (a, b) {
      void 0 === a && (a = 0);
      void 0 === b && (b = 0);
      var c = { left: a, top: b, quadrants: [] },
        d;
      for (d = 0; d < this.numCols; d += 1)
        c.quadrants.push(this.createQuadrant(a, b)), (a += this.quadrantWidth);
      return c;
    };
    e.prototype.createQuadrantCol = function (a, b) {
      var c = { left: a, top: b, quadrants: [] },
        d;
      for (d = 0; d < this.numRows; d += 1)
        c.quadrants.push(this.createQuadrant(a, b)), (b += this.quadrantHeight);
      return c;
    };
    e.prototype.getTop = function (a) {
      return this.keyOffsetY
        ? a[this.keyTop] - Math.abs(a[this.keyOffsetY])
        : a[this.keyTop];
    };
    e.prototype.getRight = function (a) {
      return this.keyOffsetX
        ? a[this.keyRight] + Math.abs(a[this.keyOffsetX])
        : a[this.keyRight];
    };
    e.prototype.getBottom = function (a) {
      return this.keyOffsetX
        ? a[this.keyBottom] + Math.abs(a[this.keyOffsetY])
        : a[this.keyBottom];
    };
    e.prototype.getLeft = function (a) {
      return this.keyOffsetX
        ? a[this.keyLeft] - Math.abs(a[this.keyOffsetX])
        : a[this.keyLeft];
    };
    e.prototype.markThingQuadrantsChanged = function (a) {
      for (var b = 0; b < a[this.keyNumQuads]; b += 1)
        a[this.keyQuadrants][b][this.keyChanged] = !0;
    };
    e.prototype.findQuadrantRowStart = function (a) {
      return Math.max(
        Math.floor((this.getTop(a) - this.top) / this.quadrantHeight),
        0
      );
    };
    e.prototype.findQuadrantRowEnd = function (a) {
      return Math.min(
        Math.floor((this.getBottom(a) - this.top) / this.quadrantHeight),
        this.numRows - 1
      );
    };
    e.prototype.findQuadrantColStart = function (a) {
      return Math.max(
        Math.floor((this.getLeft(a) - this.left) / this.quadrantWidth),
        0
      );
    };
    e.prototype.findQuadrantColEnd = function (a) {
      return Math.min(
        Math.floor((this.getRight(a) - this.left) / this.quadrantWidth),
        this.numCols - 1
      );
    };
    return e;
  })();
  g.QuadsKeepr = h;
})(QuadsKeepr || (QuadsKeepr = {}));
