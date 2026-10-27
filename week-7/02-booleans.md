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

`linear(5)` 換回來的值是一個 <code class="type">int</code>

所以接住它的 `y` 也宣告成 <code class="type">int</code>

</CodeCall>

---
layout: figure
transition: view-transition
fn: |
  <<bool>> is_even(int x) {
      return ^^expr:x % 2 == 0^^;
  }
main: |
  if (is_even(4)) {
      printf("even\n");
  }
---

# Booleans

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main" />

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

<p v-click="1">假設 <code>x</code> 是 <code>4</code></p>

<p v-click="4">算到最後只會剩下 <code class="type">true</code> 或 <code class="type">false</code>，這種值的型別就是 <code class="type">bool</code></p>

</CodeExpr>

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

`if` 括號裡放的，就是一個會算出 <code class="type">bool</code> 的 expression

</CodeCall>

---
layout: figure
transition: view-transition
clicks: 8
---

# Booleans

::figure::

<ForCondition>

`for` 的第二個 expression 也是，每一圈都重新算一次

</ForCondition>

---
layout: figure
clicks: 4
fn: |
  <<bool>> is_even(int x) {
      return [[3:[[2:[[1:x|4]] % 2|0]] == 0|true]];
  }
main: |
  if ([[4!:is_even(4)|true]]) {
      printf("even\n");
  }
---

# Booleans

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<p v-click="3"><code class="type">x % 2 == 0</code> 算出來是 <code class="type">true</code>，所以 return 的就是 <code class="type">true</code></p>

<p v-click="4"><code>is_even(4)</code> 就被換成 <code class="type">true</code></p>

</CodeCall>

---
layout: statement
---

# if 和 for 的條件*其實就是 Boolean！*
