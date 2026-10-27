---
theme: ./theme
title: cal-study-group
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
layout: cover 
---

# Week 6: Functions

---
layout: figure
transition: view-transition
---

# Functions

::figure::

<div class="fn-hero">

<span class="vt-fx">$f($<span class="vt-x">$x$</span>$)$</span> <span class="vt-rhs">$= ax + b$</span>

</div>

<v-click>

<div class="fn-grid">

- $f(x) = x^2$
- $f(x) = \sqrt{x}$
- $f(x) = |x|$
- $f(x) = 2^x$
- $f(x) = \sin x$
- $f(x) = \log x$
- $f(x) = \frac{1}{x}$
- $f(x) = x^3 - x$

</div>

</v-click>

<style>
.fn-hero {
  font-size: 2.6rem;
  color: var(--google-ink);
}

.vt-fx,
.vt-rhs {
  display: inline-block;
}

.vt-fx {
  view-transition-name: fx;
}

.vt-x {
  display: inline-block;
  view-transition-name: fx-x;
}

.vt-rhs {
  view-transition-name: fx-rhs;
}

.fn-grid ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem 2.4rem;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
  font-size: 1.25rem;
  color: var(--google-muted);
}
</style>

---
layout: statement
transition: view-transition
---

# <span class="vt-fx">$f($<span class="vt-x">$x$</span>$)$</span> <span class="vt-rhs">$= ax + b$</span> *$=$ <span class="vt-y">$y$</span>*

<style>
.vt-fx,
.vt-rhs,
.vt-y {
  display: inline-block;
}

.vt-fx {
  view-transition-name: fx;
}

.vt-x {
  display: inline-block;
  view-transition-name: fx-x;
}

.vt-rhs {
  view-transition-name: fx-rhs;
}

.vt-y {
  view-transition-name: fx-y;
}
</style>

---
layout: figure
---

# Functions

::figure::

<FunctionMachine
  example-input="x = 2"
  example-work="2 · 2 + 3"
  example-output="y = 7"
/>

---
layout: figure
---

# Functions

::figure::

<CodeMath />

---
layout: figure
---

# Functions

::figure::

<CodeMath show-math />

---
layout: figure
transition: view-transition
---

# Functions

::figure::

<CodeMath parts />

---
layout: figure
transition: view-transition
main: |
  int y = linear(5);
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main">

<div v-click class="answer">13</div>

</CodeCall>

<style>
.answer {
  color: var(--google-blue);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
}
</style>

---
layout: figure
transition: view-transition
clicks: 1
main: |
  int y = [[linear(5)|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
main: |
  int y = {{13}};
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 1
main: |
  if ([[linear(5)|13]] > 10) {
      printf("big\n");
  }
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 1
main: |
  printf("%d\n", [[linear(5)|13]]);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int z = [[2:[[1:linear(5)|13]] * 2|26]];
  printf("%d\n", z);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int y = [[2:linear([[1:linear(1)|5]])|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
clicks: 1
main: |
  for (int i = 0; i < [[linear(1)|5]]; i++) {
      printf("%d\n", i);
  }
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: statement
---

# function call 在哪裡，*return 的值就放在哪裡*

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

---
layout: section
---

# 回到 Functions！

---
layout: figure
transition: view-transition
clicks: 3
fn: |
  %%1:box.red:bool%% is_even(int x) {
      return %%2:box.red:<<x % 2 == 0>>%%;
  }
main: |
  if ([[3!:is_even(4)|true]]) {
      printf("even\n");
  }
---

# Functions

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<p v-click="1">還記得嗎？</p>

<p v-click="1">函式名稱前面寫的 <code class="type">bool</code>，就是<strong>回傳型別</strong></p>

<p v-click="2">代表 return 出來的值，一定是 <code class="type">true</code> 或 <code class="type">false</code></p>

<p v-click="3">所以 <code>is_even(4)</code> 換回來的，就是一個 <code class="type">bool</code></p>

</CodeCall>

---
layout: figure
clicks: 3
fn: |
  %%1:box.red:int%% linear(int x) {
      return %%2:box.red:2 * x + 3%%;
  }
main: |
  int y = [[3:linear(5)|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<p v-click="1">這次函式名稱前面寫的是 <code class="type">int</code></p>

<p v-click="2">代表 return 出來的值，一定是一個整數</p>

<p v-click="3">所以 <code>linear(5)</code> 換回來的 <code>13</code>，就是一個 <code class="type">int</code></p>

</CodeCall>

---
layout: figure
fn: |
  <<void>> hello(void) {
      printf("hello\n");
  }
main: |
  hello();
  ~~int y = hello();~~
---


# Functions

::figure::

<CodeCall :fn="$frontmatter.fn" :main="$frontmatter.main">

<code class="type">void</code>：沒有回傳值

沒有值可以放回呼叫的位置，所以不能當成值來用

</CodeCall>

---
layout: figure
boolFn: |
  <<bool>> is_even(int x) {
      return x % 2 == 0;
  }
intFn: |
  <<int>> linear(int x) {
      return 2 * x + 3;
  }
voidFn: |
  <<void>> hello(void) {
      printf("hello\n");
  }
---

# Functions

::figure::

<div class="return-types">
  <div>
    <CodeSnippet :code="$frontmatter.boolFn" />
    <p>回傳 <code class="type">bool</code></p>
  </div>
  <div>
    <CodeSnippet :code="$frontmatter.intFn" />
    <p>回傳 <code class="type">int</code></p>
  </div>
  <div>
    <CodeSnippet :code="$frontmatter.voidFn" />
    <p>啥也不回傳</p>
  </div>
</div>

<style>
.return-types {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  width: 100%;
}

.return-types p {
  margin-top: 1rem;
  color: var(--google-ink);
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.return-types code.type {
  background: #fce8e6;
  color: #c5221f;
}
</style>

---
example: |
  <<int>> linear(int x) {
      return 2 * x + 3;
  }

  int y = @@linear(5)@@; // 13
---

# Recap

<div class="recap">
<div>

- function 就像數學的 f(x)：給它輸入，它算出輸出
- function call 在哪裡，return 的值就放在哪裡
- 函式名稱前面的回傳型別，決定回傳什麼：<code class="type">bool</code>、<code class="type">int</code>，或 <code class="type">void</code> 不回傳

</div>

<CodeSnippet :code="$frontmatter.example" />

</div>

<style>
/* Match the title size of the figure layout used by the other pages */
h1 {
  margin-bottom: 0.45rem;
  font-size: 34px;
}

.recap {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

code.type {
  background: #fce8e6;
  color: #c5221f;
}
</style>

---
layout: section
---

# Rest!

---
layout: section
---

# Let's move on to <br> the real problems!
