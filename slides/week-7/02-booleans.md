---
layout: figure
transition: view-transition
clicks: 1
fn: |
  <<int>> linear(int x) {
      return 2 * x + 3;
  }
main: |
  <<int>> y = [[linear(5)|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

回傳 <code class="type">int</code> → 用 <code class="type">int</code> 接

</CodeCall>

::source::

註：不一定要用同一個型別接；型別不同時，C 會自動轉換，例如 <code>double y = linear(5);</code> 會得到 <code>13.0</code>。詳見 <a href="https://en.cppreference.com/w/c/language/conversion" target="_blank">cppreference</a>

<!--
- 回到 linear：它回傳的 13 是一個整數
- [click] linear(5) 換成 13
- 換回來的值是 int，所以接住它的 y 也要宣告成 int
- 值是有型別的，那有沒有不是整數的回傳值？
-->

---
layout: figure
transition: view-transition
fn: |
  <<bool>> isEven(int x) {
      return ^^expr:x % 2 == 0^^;
  }
main: |
  if (isEven(4)) {
      printf("even\n");
  }
---

# Booleans

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main" />

::source::

註：C99～C17 要先 <code>#include &lt;stdbool.h&gt;</code> 才能使用 <code class="type">bool</code>、<code class="type">true</code>、<code class="type">false</code>（C23 起內建），這裡省略標頭。詳見 <a href="https://en.cppreference.com/w/c/types/boolean" target="_blank">cppreference</a>

<!--
- 看另一個 function：isEven，判斷是不是偶數
- 前面寫的不是 int，是 bool
- 先看 return 後面那串 expression 到底算出什麼
-->

---
layout: figure
transition: view-transition
clicks: 4
expr: |
  [[4:[[3:[[2:x|4]] % 2|0]] == 0|true]]
---

# Booleans

::figure::

<CodeExpr :expr="$frontmatter.expr" name="expr">

<p v-click="1"><code>x</code> = <code>4</code></p>

<p v-click="4"><code class="type">true</code> / <code class="type">false</code> → <code class="type">bool</code></p>

</CodeExpr>

::source::

註：C 的比較運算其實算出 <code>int</code> 的 <code>1</code> 或 <code>0</code>；就算 <code>#include &lt;stdbool.h&gt;</code>，<code>bool</code> 也只是存 <code>0</code>、<code>1</code> 的整數型別，<code>true</code>、<code>false</code> 就是 <code>1</code>、<code>0</code>。詳見 <a href="https://en.cppreference.com/w/c/language/operator_comparison" target="_blank">cppreference</a>

<!--
- 把 return 後面的 expression 拿出來算
- [click] 假設 x 是 4
- [click] 4 % 2 → 0
- [click] 0 == 0 → true
- [click] 算到最後只會剩下 true 或 false，這種值的型別就叫 bool
-->

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int score = 75;
  if ([[2:[[1:score|75]] >= 60|true]]) {
      printf("pass\n");
  }
---

# Booleans

::figure::

<CodeCall :main="$frontmatter.main" only-main>

<code>if</code> 的條件 = <code class="type">bool</code>

</CodeCall>

::source::

註：C 的 <code>if</code> 其實只看條件是不是 <code>0</code>：<code>0</code> 為假，非 <code>0</code> 為真，所以 <code>bool</code> 的 <code>false</code>、<code>true</code> 就是 <code>0</code>、<code>1</code>。詳見 <a href="https://en.cppreference.com/w/c/language/if" target="_blank">cppreference</a>

<!--
- 其實大家早就在用 bool 了
- if 括號裡放的，就是一個會算出 bool 的 expression
- [click] score 換成 75
- [click] 75 >= 60 → true，所以進去印 pass
-->

---
layout: figure
transition: view-transition
clicks: 8
---

# Booleans

::figure::

<ForCondition>

每一圈重算一次 <code class="type">bool</code>

</ForCondition>

<!--
- for 的第二個 expression 也是 bool
- 每一圈都重新算一次：true 就繼續，false 就停
- 一路點下去，看 i < 3 每圈算出什麼
-->

---
layout: figure
clicks: 4
fn: |
  <<bool>> isEven(int x) {
      return [[3:[[2:[[1:x|4]] % 2|0]] == 0|true]];
  }
main: |
  if ([[4!:isEven(4)|true]]) {
      printf("even\n");
  }
---

# Booleans

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<p v-click="3">return <code class="type">true</code></p>

<p v-click="4"><code>isEven(4)</code> → <code class="type">true</code></p>

</CodeCall>

<!--
- 把 isEven(4) 整個跑一次
- [click] x 換成 4
- [click] 4 % 2 → 0
- [click] 0 == 0 → true，所以 return 的就是 true
- [click] main 裡的 isEven(4) 被換成 true，if 成立，印 even
-->

---
layout: statement
---

# if 和 for 的條件*其實就是 Boolean！*

<!--
- 結論：if 和 for 的條件其實就是 bool
- 會回傳 bool 的 function，就可以直接放進 if 裡
-->
