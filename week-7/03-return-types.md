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
