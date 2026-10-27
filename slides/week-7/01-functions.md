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

<!--
- 今天的主角：function
- 數學課就看過：f(x) = ax + b，丟一個 x 進去，算出一個值
- [click] 長得不一樣的 f(x) 很多，但做的事都一樣：輸入 → 算 → 輸出
-->

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

<!--
- f(x) 算出來的那個值，我們常常叫它 y
- 所以 f(x) 本身就「是」一個值，可以直接寫 = y
-->

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

<!--
- 把 function 想成一台機器：左邊放輸入，右邊吐出輸出
- [click] 例子：f(x) = 2x + 3，丟 x = 2 進去
- [click] 機器裡面算 2 · 2 + 3
- [click] 吐出 y = 7
-->

---
layout: figure
---

# Functions

::figure::

<CodeMath />

<!--
- 這是 C 寫的 function：linear
- 先讓大家猜：它跟哪個數學式長得像？
-->

---
layout: figure
---

# Functions

::figure::

<CodeMath show-math />

<!--
- 揭曉：它就是 f(x) = 2x + 3
- C 的寫法和數學式是同一件事，只是寫法不同
-->

---
layout: figure
transition: view-transition
---

# Functions

::figure::

<CodeMath parts />

<!--
- 一個一個對起來
- [click] linear 就是 f，function 的名字
- [click] int x 就是 x，丟進去的 input，叫 parameter
- [click] return 就是 y，算出來交回去的值
- [click] 最前面的 int 是回傳型別，等一下會專門講
-->

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

<!--
- 怎麼「用」function？寫 linear(5)，這叫 function call
- 問大家：y 會是多少？
- [click] 13：2 × 5 + 3
-->

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

<!--
- 重點來了：function call 算完之後，整個 linear(5) 會被換成它 return 的值
- [click] linear(5) 變成 13
-->

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

<!--
- 所以這行其實就等於 int y = 13;
- 對 main 來說，它只看得到那個值，不用管裡面怎麼算
-->

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

<!--
- 既然 call 會變成一個值，值能放的地方它都能放
- 例如 if 的條件裡
- [click] linear(5) 換成 13，13 > 10 成立，印 big
-->

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

<!--
- 直接丟進 printf 也行
- [click] 換成 13，印出 13
-->

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

<!--
- 放進算式裡也行
- [click] 先算 linear(5) → 13
- [click] 再算 13 * 2 → 26
-->

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

<!--
- 甚至 call 裡面再放 call：裡面的先算
- [click] linear(1) → 5
- [click] 外面變成 linear(5) → 13
-->

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

<!--
- for 的條件裡也可以
- [click] linear(1) → 5，所以這個迴圈跑 5 圈，印 0 到 4
-->

---
layout: statement
---

# function call 在哪裡，*return 的值就放在哪裡*

<!--
- 這頁就是剛剛所有例子的總結
- function call 在哪裡，return 的值就放在哪裡
- 接下來看 return 回來的值有什麼「型別」
-->
