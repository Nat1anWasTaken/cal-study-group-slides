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

回傳 <code class="type">int</code> → 這裡用 <code class="type">int</code> 接

</CodeCall>

<!--
- 回到 linear：它回傳的 13 是一個整數
- [click] linear(5) 換成 13
- 換回來的值是 int，這個例子的 y 也宣告成 int；不代表只能用同一型別接，其他型別可能發生轉換
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

<!--
- 看另一個 function：isEven，判斷是不是偶數
- 前面寫的不是 int，是 bool
- 若使用 C99～C17，要先 #include <stdbool.h> 才能使用 bool、true、false；這裡省略標頭
- 先看 return 後面那串 expression 到底算出什麼
-->

---
layout: figure
transition: view-transition
clicks: 4
expr: |
  [[4:[[3:[[2:x|4]] % 2|0]] == 0|1]]
---

# Booleans

::figure::

<CodeExpr :expr="$frontmatter.expr" name="expr">

<p v-click="1"><code>x</code> = <code>4</code></p>

<p v-click="4">比較結果：<code>1</code>（真）或 <code>0</code>（假）</p>

<p v-click="4">在 C 中，型別是 <code class="type">int</code></p>

</CodeExpr>

<!--
- 把 return 後面的 expression 拿出來算
- [click] 假設 x 是 4
- [click] x 換成 4
- [click] 4 % 2 → 0
- [click] 0 == 0 → 1，表示真；C 的比較運算產生 int 型別的 1 或 0，不是 bool
-->

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int score = 75;
  if ([[2:[[1:score|75]] >= 60|1]]) {
      printf("pass\n");
  }
---

# Booleans

::figure::

<CodeCall :main="$frontmatter.main" only-main>

<p><code>if</code>：<code>0</code> 為假，非 <code>0</code> 為真</p>

<p>條件不一定是 <code class="type">bool</code></p>

</CodeCall>

<!--
- 其實大家早就在判斷條件的真假了
- if 的條件不一定是 bool；數值為 0 時是假，非 0 時是真，例如 if (2) 也成立
- [click] score 換成 75
- [click] 75 >= 60 → 1，非 0，所以進去印 pass
-->

---
layout: figure
transition: view-transition
clicks: 8
---

# Booleans

::figure::

<ForCondition>

每次進入迴圈前，重算條件：<code>0</code> 就停

</ForCondition>

<!--
- for 的第二個 expression 是條件，不一定是 bool
- 每次進入迴圈前都重新算一次：非 0 就繼續，0 就停
- 一路點下去，看 i < 3 每圈算出什麼
-->

---
layout: figure
clicks: 4
fn: |
  <<bool>> isEven(int x) {
      return [[3:[[2:[[1:x|4]] % 2|0]] == 0|1]];
  }
main: |
  if ([[4!:isEven(4)|true]]) {
      printf("even\n");
  }
---

# Booleans

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<p v-click="3">比較結果：<code>1</code>（<code class="type">int</code>）</p>

<p v-click="4">回傳時轉成 <code class="type">bool</code></p>

<p v-click="4"><code>isEven(4)</code> → <code class="type">true</code></p>

</CodeCall>

<!--
- 把 isEven(4) 整個跑一次
- [click] x 換成 4
- [click] 4 % 2 → 0
- [click] 0 == 0 → 1，這個比較結果的型別是 int
- [click] 函式的回傳型別是 bool，所以回傳時把 1 轉成 bool 的真值；main 裡的 isEven(4) 換成 true，if 成立，印 even
-->

---
layout: statement
---

# if 和 for 判斷條件*0 為假，非 0 為真*

<!--
- 結論：條件不一定是 bool，判斷的是它是否為 0
- 比較運算的結果是 int 的 0 或 1；bool 則用來表達真或假
- 會回傳 bool 的 function 也可以直接放進 if 裡，因為假是 0，真是 1
-->
