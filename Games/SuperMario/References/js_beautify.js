(function () {
  function C(v, e) {
    return new ca(v, e).beautify();
  }
  function ca(v, e) {
    function C(a, c) {
      var b = 0;
      a &&
        ((b = a.indentation_level),
        !H() && a.lineIndent_level > b && (b = a.lineIndent_level));
      return {
        mode: c,
        parent: a,
        last_text: a ? a.last_text : "",
        last_word: a ? a.last_word : "",
        declaration_statement: !1,
        declaration_assignment: !1,
        in_html_comment: !1,
        multiline_frame: !1,
        if_block: !1,
        else_block: !1,
        do_block: !1,
        do_while: !1,
        in_case_statement: !1,
        in_case: !1,
        case_body: !1,
        indentation_level: b,
        lineIndent_level: a ? a.lineIndent_level : b,
        start_lineIndex: q.length,
        had_comment: !1,
        ternary_depth: 0,
      };
    }
    function y(a) {
      a = void 0 === a ? !1 : a;
      if (q.length)
        for (
          U(q[q.length - 1]);
          a && 1 < q.length && 0 === q[q.length - 1].text.length;

        )
          q.pop(), U(q[q.length - 1]);
    }
    function U(a) {
      for (
        ;
        a.text.length &&
        (" " === a.text[a.text.length - 1] ||
          a.text[a.text.length - 1] === D ||
          a.text[a.text.length - 1] === I);

      )
        a.text.pop();
    }
    function R(a) {
      return a.replace(/^\s+|\s+$/g, "");
    }
    function H() {
      return 0 === q[q.length - 1].text.length;
    }
    function F(a) {
      a = void 0 === a ? !1 : a;
      if (k.wrap_line_length && !a) {
        var c = q[q.length - 1],
          b = 0;
        0 < c.text.length &&
          ((b = c.text.join("").length + f.length + (g ? 1 : 0)),
          b >= k.wrap_line_length && (a = !0));
      }
      ((k.preserve_newlines && E) || a) && !H() && h(!1, !0);
    }
    function h(m, c) {
      g = !1;
      if (
        !c &&
        ";" !== a.last_text &&
        "," !== a.last_text &&
        "=" !== a.last_text &&
        "TK_OPERATOR" !== d
      )
        for (; a.mode === l.Statement && !a.if_block && !a.do_block; ) A();
      if (1 !== q.length || !H())
        if (m || !H()) (a.multiline_frame = !0), q.push({ text: [] });
    }
    function r(m) {
      m = m || f;
      if (H()) {
        var c = q[q.length - 1];
        if (k.keep_arrayIndentation && a.mode === l.ArrayLiteral && E) {
          c.text.push("");
          for (var b = 0; b < G.length; b += 1) c.text.push(G[b]);
        } else if (
          (I && c.text.push(I), (c = a.indentation_level), 1 < q.length)
        ) {
          b = q[q.length - 1];
          a.lineIndent_level = c;
          for (var d = 0; d < c; d += 1) b.text.push(D);
        }
      }
      c = q[q.length - 1];
      g &&
        c.text.length &&
        ((b = c.text[c.text.length - 1]),
        " " !== b && b !== D && c.text.push(" "));
      g = !1;
      q[q.length - 1].text.push(m);
    }
    function V(a) {
      if (!a.multiline_frame) {
        a = a.start_lineIndex;
        for (var c = 0, b; a < q.length; )
          (b = q[a]),
            a++,
            0 !== b.text.length &&
              ((c = I && b.text[0] === I ? 1 : 0),
              b.text[c] === D && b.text.splice(c, 1));
      }
    }
    function M(b) {
      a ? (P.push(a), (w = a)) : (w = C(null, b));
      a = C(w, b);
    }
    function N(a) {
      return t(a, [l.Expression, l.ForInitializer, l.Conditional]);
    }
    function A() {
      0 < P.length && ((w = a), (a = P.pop()), w.mode === l.Statement && V(w));
    }
    function Q() {
      return (
        a.parent.mode === l.ObjectLiteral &&
        a.mode === l.Statement &&
        ":" === a.last_text &&
        0 === a.ternary_depth
      );
    }
    function J() {
      return ("TK_RESERVED" === d &&
        t(a.last_text, ["var", "let", "const"]) &&
        "TK_WORD" === p) ||
        ("TK_RESERVED" === d && "do" === a.last_text) ||
        ("TK_RESERVED" === d && "return" === a.last_text && !E) ||
        ("TK_RESERVED" === d &&
          "else" === a.last_text &&
          ("TK_RESERVED" !== p || "if" !== f)) ||
        ("TK_END_EXPR" === d &&
          (w.mode === l.ForInitializer || w.mode === l.Conditional)) ||
        ("TK_WORD" === d &&
          a.mode === l.BlockStatement &&
          !a.in_case &&
          "--" !== f &&
          "++" !== f &&
          "TK_WORD" !== p &&
          "TK_RESERVED" !== p) ||
        (a.mode === l.ObjectLiteral &&
          ":" === a.last_text &&
          0 === a.ternary_depth)
        ? (M(l.Statement),
          (a.indentation_level += 1),
          "TK_RESERVED" === d &&
            t(a.last_text, ["var", "let", "const"]) &&
            "TK_WORD" === p &&
            (a.declaration_statement = !0),
          Q() || F("TK_RESERVED" === p && t(f, ["do", "for", "if", "while"])),
          !0)
        : !1;
    }
    function O(a) {
      return t(a, "case return do if throw else".split(" "));
    }
    function t(a, b) {
      for (var d = 0; d < b.length; d += 1) if (b[d] === a) return !0;
      return !1;
    }
    function W() {
      var m;
      z = 0;
      if (b >= u) return ["", "TK_EOF"];
      E = !1;
      G = [];
      var c = n.charAt(b);
      for (b += 1; t(c, S); ) {
        "\n" === c
          ? ((z += 1), (G = []))
          : z && (c === D ? G.push(D) : "\r" !== c && G.push(" "));
        if (b >= u) return ["", "TK_EOF"];
        c = n.charAt(b);
        b += 1;
      }
      if (T.isIdentifierChar(n.charCodeAt(b - 1))) {
        if (b < u)
          for (
            ;
            T.isIdentifierChar(n.charCodeAt(b)) &&
            ((c += n.charAt(b)), (b += 1), b !== u);

          );
        if (
          b !== u &&
          c.match(/^[0-9]+[Ee]$/) &&
          ("-" === n.charAt(b) || "+" === n.charAt(b))
        ) {
          var f = n.charAt(b);
          b += 1;
          var e = W(),
            c = c + (f + e[0]);
          return [c, "TK_WORD"];
        }
        return "TK_DOT" === d ||
          ("TK_RESERVED" === d && t(a.last_text, ["set", "get"])) ||
          !t(c, X)
          ? [c, "TK_WORD"]
          : "in" === c
          ? [c, "TK_OPERATOR"]
          : [c, "TK_RESERVED"];
      }
      if ("(" === c || "[" === c) return [c, "TK_START_EXPR"];
      if (")" === c || "]" === c) return [c, "TK_END_EXPR"];
      if ("{" === c) return [c, "TK_START_BLOCK"];
      if ("}" === c) return [c, "TK_END_BLOCK"];
      if (";" === c) return [c, "TK_SEMICOLON"];
      if ("/" === c) {
        f = "";
        e = !0;
        if ("*" === n.charAt(b)) {
          b += 1;
          if (b < u)
            for (
              ;
              b < u &&
              ("*" !== n.charAt(b) ||
                !n.charAt(b + 1) ||
                "/" !== n.charAt(b + 1));

            ) {
              c = n.charAt(b);
              f += c;
              if ("\n" === c || "\r" === c) e = !1;
              b += 1;
              if (b >= u) break;
            }
          b += 2;
          return e && 0 === z
            ? ["/*" + f + "*/", "TKInLINE_COMMENT"]
            : ["/*" + f + "*/", "TK_BLOCK_COMMENT"];
        }
        if ("/" === n.charAt(b)) {
          for (
            f = c;
            "\r" !== n.charAt(b) &&
            "\n" !== n.charAt(b) &&
            !((f += n.charAt(b)), (b += 1), b >= u);

          );
          return [f, "TK_COMMENT"];
        }
      }
      if (
        "`" === c ||
        "'" === c ||
        '"' === c ||
        (("/" === c ||
          (k.e4x &&
            "<" === c &&
            n
              .slice(b - 1)
              .match(
                /^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/
              ))) &&
          (("TK_RESERVED" === d && O(a.last_text)) ||
            ("TK_END_EXPR" === d &&
              t(w.mode, [l.Conditional, l.ForInitializer])) ||
            t(
              d,
              "TK_COMMENT TK_START_EXPR TK_START_BLOCK TK_END_BLOCK TK_OPERATOR TK_EQUALS TK_EOF TK_SEMICOLON TK_COMMA".split(
                " "
              )
            )))
      ) {
        var f = c,
          g = (e = !1);
        m = c;
        if (b < u)
          if ("/" === f)
            for (c = !1; e || c || n.charAt(b) !== f; ) {
              if (
                ((m += n.charAt(b)),
                e
                  ? (e = !1)
                  : ((e = "\\" === n.charAt(b)),
                    "[" === n.charAt(b)
                      ? (c = !0)
                      : "]" === n.charAt(b) && (c = !1)),
                (b += 1),
                b >= u)
              )
                return [m, "TK_STRING"];
            }
          else if (k.e4x && "<" === f) {
            var e =
                /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g,
              c = n.slice(b - 1),
              h = e.exec(c);
            if (h && 0 === h.index) {
              f = h[2];
              for (m = 0; h; ) {
                var g = !!h[1],
                  p = h[2],
                  r = !!h[h.length - 1] || "![CDATA[" === p.slice(0, 8);
                p !== f || r || (g ? --m : ++m);
                if (0 >= m) break;
                h = e.exec(c);
              }
              f = h ? h.index + h[0].length : c.length;
              b += f - 1;
              return [c.slice(0, f), "TK_STRING"];
            }
          } else
            for (; e || n.charAt(b) !== f; ) {
              m += n.charAt(b);
              if (e) {
                if ("x" === n.charAt(b) || "u" === n.charAt(b)) g = !0;
                e = !1;
              } else e = "\\" === n.charAt(b);
              b += 1;
              if (b >= u) return [m, "TK_STRING"];
            }
        b += 1;
        m += f;
        if (g && k.unescape_strings)
          a: {
            c = m;
            e = !1;
            h = "";
            m = 0;
            g = "";
            for (p = 0; e || m < c.length; )
              if (((r = c.charAt(m)), m++, e)) {
                e = !1;
                if ("x" === r) (g = c.substr(m, 2)), (m += 2);
                else if ("u" === r) (g = c.substr(m, 4)), (m += 4);
                else {
                  h += "\\" + r;
                  continue;
                }
                if (!g.match(/^[0123456789abcdefABCDEF]+$/)) {
                  m = c;
                  break a;
                }
                p = parseInt(g, 16);
                if (0 <= p && 32 > p)
                  h = "x" === r ? h + ("\\x" + g) : h + ("\\u" + g);
                else if (34 === p || 39 === p || 92 === p)
                  h += "\\" + String.fromCharCode(p);
                else if ("x" === r && 126 < p && 255 >= p) {
                  m = c;
                  break a;
                } else h += String.fromCharCode(p);
              } else "\\" === r ? (e = !0) : (h += r);
            m = h;
          }
        if ("/" === f)
          for (; b < u && t(n.charAt(b), Y); ) (m += n.charAt(b)), (b += 1);
        return [m, "TK_STRING"];
      }
      if ("#" === c) {
        if (1 === q.length && 0 === q[0].text.length && "!" === n.charAt(b)) {
          for (m = c; b < u && "\n" !== c; )
            (c = n.charAt(b)), (m += c), (b += 1);
          return [R(m) + "\n", "TK_UNKNOWN"];
        }
        f = "#";
        if (b < u && t(n.charAt(b), Z)) {
          do (c = n.charAt(b)), (f += c), (b += 1);
          while (b < u && "#" !== c && "=" !== c);
          "#" !== c &&
            ("[" === n.charAt(b) && "]" === n.charAt(b + 1)
              ? ((f += "[]"), (b += 2))
              : "{" === n.charAt(b) &&
                "}" === n.charAt(b + 1) &&
                ((f += "{}"), (b += 2)));
          return [f, "TK_WORD"];
        }
      }
      if ("<" === c && "\x3c!--" === n.substring(b - 1, b + 3)) {
        b += 3;
        for (c = "\x3c!--"; "\n" !== n.charAt(b) && b < u; )
          (c += n.charAt(b)), b++;
        a.in_html_comment = !0;
        return [c, "TK_COMMENT"];
      }
      if (
        "-" === c &&
        a.in_html_comment &&
        "--\x3e" === n.substring(b - 1, b + 2)
      )
        return (a.in_html_comment = !1), (b += 2), ["--\x3e", "TK_COMMENT"];
      if ("." === c) return [c, "TK_DOT"];
      if (t(c, K)) {
        for (
          ;
          b < u &&
          t(c + n.charAt(b), K) &&
          !((c += n.charAt(b)), (b += 1), b >= u);

        );
        return "," === c
          ? [c, "TK_COMMA"]
          : "=" === c
          ? [c, "TK_EQUALS"]
          : [c, "TK_OPERATOR"];
      }
      return [c, "TK_UNKNOWN"];
    }
    function aa() {
      J() ||
        !E ||
        N(a.mode) ||
        ("TK_OPERATOR" === d && "--" !== a.last_text && "++" !== a.last_text) ||
        "TK_EQUALS" === d ||
        (!k.preserve_newlines &&
          "TK_RESERVED" === d &&
          t(a.last_text, ["var", "let", "const", "set", "get"])) ||
        h();
      if (a.do_block && !a.do_while) {
        if ("TK_RESERVED" === p && "while" === f) {
          g = !0;
          r();
          g = !0;
          a.do_while = !0;
          return;
        }
        h();
        a.do_block = !1;
      }
      if (a.if_block)
        if (a.else_block || "TK_RESERVED" !== p || "else" !== f) {
          for (; a.mode === l.Statement; ) A();
          a.if_block = !1;
          a.else_block = !1;
        } else a.else_block = !0;
      if (
        "TK_RESERVED" === p &&
        ("case" === f || ("default" === f && a.in_case_statement))
      ) {
        h();
        if (a.case_body || k.jslint_happy)
          0 < a.indentation_level &&
            (!a.parent || a.indentation_level > a.parent.indentation_level) &&
            --a.indentation_level,
            (a.case_body = !1);
        r();
        a.in_case = !0;
        a.in_case_statement = !0;
      } else {
        "TK_RESERVED" === p &&
          "function" === f &&
          (!(
            t(a.last_text, ["}", ";"]) ||
            (H() && !t(a.last_text, ["[", "{", ":", "=", ","]))
          ) ||
            (H() && (1 === q.length || 0 === q[q.length - 2].text.length)) ||
            a.had_comment ||
            (h(), h(!0)),
          "TK_RESERVED" === d || "TK_WORD" === d
            ? "TK_RESERVED" === d &&
              t(a.last_text, ["get", "set", "new", "return"])
              ? (g = !0)
              : h()
            : "TK_OPERATOR" === d || "=" === a.last_text
            ? (g = !0)
            : N(a.mode) || h());
        if (
          "TK_COMMA" === d ||
          "TK_START_EXPR" === d ||
          "TK_EQUALS" === d ||
          "TK_OPERATOR" === d
        )
          Q() || F();
        if ("TK_RESERVED" === p && "function" === f) r(), (a.last_word = f);
        else {
          x = "NONE";
          "TK_END_BLOCK" === d
            ? "TK_RESERVED" === p && t(f, ["else", "catch", "finally"])
              ? "expand" === k.brace_style || "end-expand" === k.brace_style
                ? (x = "NEWLINE")
                : ((x = "SPACE"), (g = !0))
              : (x = "NEWLINE")
            : "TK_SEMICOLON" === d && a.mode === l.BlockStatement
            ? (x = "NEWLINE")
            : "TK_SEMICOLON" === d && N(a.mode)
            ? (x = "SPACE")
            : "TK_STRING" === d
            ? (x = "NEWLINE")
            : "TK_RESERVED" === d ||
              "TK_WORD" === d ||
              ("*" === a.last_text && "function" === B)
            ? (x = "SPACE")
            : "TK_START_BLOCK" === d
            ? (x = "NEWLINE")
            : "TK_END_EXPR" === d && ((g = !0), (x = "NEWLINE"));
          "TK_RESERVED" === p &&
            t(f, L) &&
            ")" !== a.last_text &&
            (x = "else" === a.last_text ? "SPACE" : "NEWLINE");
          if ("TK_RESERVED" === p && t(f, ["else", "catch", "finally"]))
            if (
              "TK_END_BLOCK" !== d ||
              "expand" === k.brace_style ||
              "end-expand" === k.brace_style
            )
              h();
            else {
              y(!0);
              var b = q[q.length - 1];
              "}" !== b.text[b.text.length - 1] && h();
              g = !0;
            }
          else
            "NEWLINE" === x
              ? "TK_RESERVED" === d && O(a.last_text)
                ? (g = !0)
                : "TK_END_EXPR" !== d
                ? ("TK_START_EXPR" === d &&
                    "TK_RESERVED" === p &&
                    t(f, ["var", "let", "const"])) ||
                  ":" === a.last_text ||
                  ("TK_RESERVED" === p &&
                  "if" === f &&
                  "else" === a.last_word &&
                  "{" !== a.last_text
                    ? (g = !0)
                    : h())
                : "TK_RESERVED" === p && t(f, L) && ")" !== a.last_text && h()
              : a.mode === l.ArrayLiteral && "," === a.last_text && "}" === B
              ? h()
              : "SPACE" === x && (g = !0);
          r();
          a.last_word = f;
          "TK_RESERVED" === p && "do" === f && (a.do_block = !0);
          "TK_RESERVED" === p && "if" === f && (a.if_block = !0);
        }
      }
    }
    var n,
      q,
      f,
      p,
      d,
      B,
      D,
      a,
      w,
      P,
      S,
      Y,
      K,
      b,
      L,
      X,
      Z,
      x,
      E,
      g,
      u,
      z,
      G,
      ba,
      l,
      k,
      I = "";
    S = ["\n", "\r", "\t", " "];
    Y =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split(
        ""
      );
    Z = "0123456789".split("");
    K =
      "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>";
    K += " <%= <% %> <?= <? ?>";
    K = K.split(" ");
    L =
      "continue try throw return var let const if switch case default for while break function yield".split(
        " "
      );
    X = L.concat("do in else get set new catch finally typeof".split(" "));
    l = {
      BlockStatement: "BlockStatement",
      Statement: "Statement",
      ObjectLiteral: "ObjectLiteral",
      ArrayLiteral: "ArrayLiteral",
      ForInitializer: "ForInitializer",
      Conditional: "Conditional",
      Expression: "Expression",
    };
    ba = {
      TK_START_EXPR: function () {
        J();
        var b = l.Expression;
        if ("[" === f) {
          if ("TK_WORD" === d || ")" === a.last_text) {
            "TK_RESERVED" === d && t(a.last_text, L) && (g = !0);
            M(b);
            r();
            a.indentation_level += 1;
            k.spaceIn_paren && (g = !0);
            return;
          }
          b = l.ArrayLiteral;
          a.mode !== l.ArrayLiteral ||
            ("[" !== a.last_text &&
              ("," !== a.last_text || ("]" !== B && "}" !== B))) ||
            k.keep_arrayIndentation ||
            h();
        } else
          "TK_RESERVED" === d && "for" === a.last_text
            ? (b = l.ForInitializer)
            : "TK_RESERVED" === d &&
              t(a.last_text, ["if", "while"]) &&
              (b = l.Conditional);
        ";" === a.last_text || "TK_START_BLOCK" === d
          ? h()
          : "TK_END_EXPR" === d ||
            "TK_START_EXPR" === d ||
            "TK_END_BLOCK" === d ||
            "." === a.last_text
          ? F(E)
          : ("TK_RESERVED" === d && "(" === f) ||
            "TK_WORD" === d ||
            "TK_OPERATOR" === d
          ? ("TK_RESERVED" === d &&
              ("function" === a.last_word || "typeof" === a.last_word)) ||
            ("*" === a.last_text && "function" === B)
            ? k.jslint_happy && (g = !0)
            : "TK_RESERVED" !== d ||
              (!t(a.last_text, L) && "catch" !== a.last_text) ||
              (k.space_before_conditional && (g = !0))
          : (g = !0);
        "(" !== f || ("TK_EQUALS" !== d && "TK_OPERATOR" !== d) || Q() || F();
        M(b);
        r();
        k.spaceIn_paren && (g = !0);
        a.indentation_level += 1;
      },
      TK_END_EXPR: function () {
        for (; a.mode === l.Statement; ) A();
        a.multiline_frame &&
          F("]" === f && a.mode === l.ArrayLiteral && !k.keep_arrayIndentation);
        k.spaceIn_paren &&
          ("TK_START_EXPR" !== d || k.spaceIn_empty_paren
            ? (g = !0)
            : (y(), (g = !1)));
        "]" === f && k.keep_arrayIndentation ? (r(), A()) : (A(), r());
        V(w);
        a.do_while &&
          w.mode === l.Conditional &&
          ((w.mode = l.Expression), (a.do_block = !1), (a.do_while = !1));
      },
      TK_START_BLOCK: function () {
        M(l.BlockStatement);
        var m;
        a: {
          m = b;
          for (var c = n.charAt(m); t(c, S) && "}" !== c; ) {
            m++;
            if (m >= u) {
              m = !1;
              break a;
            }
            c = n.charAt(m);
          }
          m = "}" === c;
        }
        m = m && "function" === a.last_word && "TK_END_EXPR" === d;
        "expand" === k.brace_style
          ? "TK_OPERATOR" !== d &&
            (m ||
              "TK_EQUALS" === d ||
              ("TK_RESERVED" === d && O(a.last_text) && "else" !== a.last_text))
            ? (g = !0)
            : h(!1, !0)
          : "TK_OPERATOR" !== d && "TK_START_EXPR" !== d
          ? "TK_START_BLOCK" === d
            ? h()
            : (g = !0)
          : w.mode === l.ArrayLiteral &&
            "," === a.last_text &&
            ("}" === B ? (g = !0) : h());
        r();
        a.indentation_level += 1;
      },
      TK_END_BLOCK: function () {
        for (; a.mode === l.Statement; ) A();
        var b = "TK_START_BLOCK" === d;
        "expand" === k.brace_style
          ? b || h()
          : b ||
            (a.mode === l.ArrayLiteral && k.keep_arrayIndentation
              ? ((k.keep_arrayIndentation = !1),
                h(),
                (k.keep_arrayIndentation = !0))
              : h());
        A();
        r();
      },
      TK_WORD: aa,
      TK_RESERVED: aa,
      TK_SEMICOLON: function () {
        for (
          J() && (g = !1);
          a.mode === l.Statement && !a.if_block && !a.do_block;

        )
          A();
        r();
        a.mode === l.ObjectLiteral && (a.mode = l.BlockStatement);
      },
      TK_STRING: function () {
        J()
          ? (g = !0)
          : "TK_RESERVED" === d || "TK_WORD" === d
          ? (g = !0)
          : "TK_COMMA" === d ||
            "TK_START_EXPR" === d ||
            "TK_EQUALS" === d ||
            "TK_OPERATOR" === d
          ? Q() || F()
          : h();
        r();
      },
      TK_EQUALS: function () {
        J();
        a.declaration_statement && (a.declaration_assignment = !0);
        g = !0;
        r();
        g = !0;
      },
      TK_OPERATOR: function () {
        ":" !== f ||
          a.mode !== l.BlockStatement ||
          "{" !== B ||
          ("TK_WORD" !== d && "TK_RESERVED" !== d) ||
          (a.mode = l.ObjectLiteral);
        J();
        var b = !0,
          c = !0;
        if ("TK_RESERVED" === d && O(a.last_text)) (g = !0), r();
        else if ("*" !== f || "TK_DOT" !== d || B.match(/^\d+$/))
          if (":" === f && a.in_case)
            (a.case_body = !0),
              (a.indentation_level += 1),
              r(),
              h(),
              (a.in_case = !1);
          else if ("::" === f) r();
          else {
            !E || ("--" !== f && "++" !== f) || h(!1, !0);
            "TK_OPERATOR" === d && F();
            if (
              t(f, ["--", "++", "!", "~"]) ||
              (t(f, ["-", "+"]) &&
                (t(d, [
                  "TK_START_BLOCK",
                  "TK_START_EXPR",
                  "TK_EQUALS",
                  "TK_OPERATOR",
                ]) ||
                  t(a.last_text, L) ||
                  "," === a.last_text))
            ) {
              c = b = !1;
              ";" === a.last_text && N(a.mode) && (b = !0);
              if ("TK_RESERVED" === d || "TK_END_EXPR" === d) b = !0;
              (a.mode !== l.BlockStatement && a.mode !== l.Statement) ||
                ("{" !== a.last_text && ";" !== a.last_text) ||
                h();
            } else
              ":" === f
                ? 0 === a.ternary_depth
                  ? (a.mode === l.BlockStatement && (a.mode = l.ObjectLiteral),
                    (b = !1))
                  : --a.ternary_depth
                : "?" === f
                ? (a.ternary_depth += 1)
                : "*" === f &&
                  "TK_RESERVED" === d &&
                  "function" === a.last_text &&
                  (c = b = !1);
            g = g || b;
            r();
            g = c;
          }
        else r();
      },
      TK_COMMA: function () {
        a.declaration_statement
          ? (N(a.parent.mode) && (a.declaration_assignment = !1),
            r(),
            a.declaration_assignment
              ? ((a.declaration_assignment = !1), h(!1, !0))
              : (g = !0))
          : (r(),
            a.mode === l.ObjectLiteral ||
            (a.mode === l.Statement && a.parent.mode === l.ObjectLiteral)
              ? (a.mode === l.Statement && A(), h())
              : (g = !0));
      },
      TK_BLOCK_COMMENT: function () {
        for (
          var a = f, a = a.replace(/\x0d/g, ""), b = [], d = a.indexOf("\n");
          -1 !== d;

        )
          b.push(a.substring(0, d)),
            (a = a.substring(d + 1)),
            (d = a.indexOf("\n"));
        a.length && b.push(a);
        var e,
          d = (a = !1);
        e = G.join("");
        var k = e.length;
        h(!1, !0);
        if (1 < b.length) {
          var g;
          a: {
            g = b.slice(1);
            for (var l = 0; l < g.length; l++)
              if ("*" !== R(g[l]).charAt(0)) {
                g = !1;
                break a;
              }
            g = !0;
          }
          if (g) a = !0;
          else {
            a: {
              g = b.slice(1);
              for (var l = 0, n = g.length, p; l < n; l++)
                if ((p = g[l]) && 0 !== p.indexOf(e)) {
                  e = !1;
                  break a;
                }
              e = !0;
            }
            e && (d = !0);
          }
        }
        r(b[0]);
        for (e = 1; e < b.length; e++)
          h(!1, !0),
            a
              ? r(" " + R(b[e]))
              : d && b[e].length > k
              ? r(b[e].substring(k))
              : q[q.length - 1].text.push(b[e]);
        h(!1, !0);
      },
      TKInLINE_COMMENT: function () {
        g = !0;
        r();
        g = !0;
      },
      TK_COMMENT: function () {
        E ? h(!1, !0) : y(!0);
        g = !0;
        r();
        h(!1, !0);
      },
      TK_DOT: function () {
        J();
        "TK_RESERVED" === d && O(a.last_text)
          ? (g = !0)
          : F(")" === a.last_text && k.break_chained_methods);
        r();
      },
      TK_UNKNOWN: function () {
        r();
        "\n" === f[f.length - 1] && h();
      },
    };
    e = e ? e : {};
    k = {};
    void 0 !== e.spaceAfter_anon_function &&
      void 0 === e.jslint_happy &&
      (e.jslint_happy = e.spaceAfter_anon_function);
    void 0 !== e.braces_on_own_line &&
      (k.brace_style = e.braces_on_own_line ? "expand" : "collapse");
    k.brace_style = e.brace_style
      ? e.brace_style
      : k.brace_style
      ? k.brace_style
      : "collapse";
    "expand-strict" === k.brace_style && (k.brace_style = "expand");
    k.indent_size = e.indent_size ? parseInt(e.indent_size, 10) : 4;
    k.indent_char = e.indent_char ? e.indent_char : " ";
    k.preserve_newlines =
      void 0 === e.preserve_newlines ? !0 : e.preserve_newlines;
    k.break_chained_methods =
      void 0 === e.break_chained_methods ? !1 : e.break_chained_methods;
    k.max_preserve_newlines =
      void 0 === e.max_preserve_newlines
        ? 0
        : parseInt(e.max_preserve_newlines, 10);
    k.spaceIn_paren = void 0 === e.spaceIn_paren ? !1 : e.spaceIn_paren;
    k.spaceIn_empty_paren =
      void 0 === e.spaceIn_empty_paren ? !1 : e.spaceIn_empty_paren;
    k.jslint_happy = void 0 === e.jslint_happy ? !1 : e.jslint_happy;
    k.keep_arrayIndentation =
      void 0 === e.keep_arrayIndentation ? !1 : e.keep_arrayIndentation;
    k.space_before_conditional =
      void 0 === e.space_before_conditional ? !0 : e.space_before_conditional;
    k.unescape_strings =
      void 0 === e.unescape_strings ? !1 : e.unescape_strings;
    k.wrap_line_length =
      void 0 === e.wrap_line_length ? 0 : parseInt(e.wrap_line_length, 10);
    k.e4x = void 0 === e.e4x ? !1 : e.e4x;
    e.indent_with_tabs && ((k.indent_char = "\t"), (k.indent_size = 1));
    for (D = ""; 0 < k.indent_size; ) (D += k.indent_char), --k.indent_size;
    for (; v && (" " === v.charAt(0) || "\t" === v.charAt(0)); )
      (I += v.charAt(0)), (v = v.substring(1));
    n = v;
    u = v.length;
    d = "TK_START_BLOCK";
    B = "";
    q = [{ text: [] }];
    g = !1;
    G = [];
    P = [];
    M(l.BlockStatement);
    b = 0;
    this.beautify = function () {
      for (var b; ; ) {
        b = W();
        f = b[0];
        p = b[1];
        if ("TK_EOF" === p) {
          for (; a.mode === l.Statement; ) A();
          break;
        }
        b = k.keep_arrayIndentation && a.mode === l.ArrayLiteral;
        E = 0 < z;
        if (b) for (b = 0; b < z; b += 1) h(0 < b);
        else if (
          (k.max_preserve_newlines &&
            z > k.max_preserve_newlines &&
            (z = k.max_preserve_newlines),
          k.preserve_newlines && 1 < z)
        )
          for (h(), b = 1; b < z; b += 1) h(!0);
        ba[p]();
        "TKInLINE_COMMENT" !== p &&
          "TK_COMMENT" !== p &&
          "TK_BLOCK_COMMENT" !== p &&
          "TK_UNKNOWN" !== p &&
          ((B = a.last_text), (d = p), (a.last_text = f));
        a.had_comment =
          "TKInLINE_COMMENT" === p ||
          "TK_COMMENT" === p ||
          "TK_BLOCK_COMMENT" === p;
      }
      b = q[0].text.join("");
      for (var c = 1; c < q.length; c++) b += "\n" + q[c].text.join("");
      return (b = b.replace(/[\r\n ]+$/, ""));
    };
  }
  var T = {};
  (function (v) {
    var e = RegExp(
        "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
      ),
      C = RegExp(
        "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"
      );
    v.isIdentifierStart = function (y) {
      return 65 > y
        ? 36 === y
        : 91 > y
        ? !0
        : 97 > y
        ? 95 === y
        : 123 > y
        ? !0
        : 170 <= y && e.test(String.fromCharCode(y));
    };
    v.isIdentifierChar = function (e) {
      return 48 > e
        ? 36 === e
        : 58 > e
        ? !0
        : 65 > e
        ? !1
        : 91 > e
        ? !0
        : 97 > e
        ? 95 === e
        : 123 > e
        ? !0
        : 170 <= e && C.test(String.fromCharCode(e));
    };
  })(T);
  "function" === typeof define && define.amd
    ? define([], function () {
        return { js_beautify: C };
      })
    : "undefined" !== typeof exports
    ? (exports.js_beautify = C)
    : "undefined" !== typeof window
    ? (window.js_beautify = C)
    : "undefined" !== typeof global && (global.js_beautify = C);
})();
