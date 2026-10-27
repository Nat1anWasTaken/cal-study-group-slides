---
layout: section
---

# 回到 Functions！

<!--
- 知道 bool 是什麼之後，回到 function，把回傳型別講清楚
-->

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

<p v-click="1"><strong>回傳型別</strong></p>

<p v-click="1"><code class="type">bool</code></p>

<p v-click="2">return → <code class="type">true</code> / <code class="type">false</code></p>

<p v-click="3"><code>is_even(4)</code> → <code class="type">bool</code></p>

</CodeCall>

<!--
- 還記得 is_even 嗎？
- [click] 函式名稱前面寫的 bool，就是回傳型別
- [click] 它保證 return 出來的值，一定是 true 或 false
- [click] 所以 is_even(4) 換回來的，就是一個 bool
-->

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

<p v-click="1"><code class="type">int</code></p>

<p v-click="2">return → 整數</p>

<p v-click="3"><code>linear(5)</code> → <code>13</code>（<code class="type">int</code>）</p>

</CodeCall>

<!--
- 同樣看 linear
- [click] 這次函式名稱前面寫的是 int
- [click] 代表 return 出來的值，一定是一個整數
- [click] 所以 linear(5) 換回來的 13，就是一個 int
-->

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

不能當值用 ✗

</CodeCall>

<!--
- 還有一種：void，代表沒有回傳值
- hello() 只負責印東西，做完就結束
- 沒有值可以放回呼叫的位置，所以不能拿它當值用：int y = hello(); 是錯的
-->

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

<!--
- 三種並排比較
- bool 回傳 true / false
- int 回傳整數
- void 啥也不回傳，只做事
-->

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

- function ≈ f(x)
- call 的位置 ← return 的值
- 回傳型別：<code class="type">bool</code> / <code class="type">int</code> / <code class="type">void</code>

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

<!--
- 早上的部分 recap 一下
- function 就像數學的 f(x)：給它輸入，它算出輸出
- function call 在哪裡，return 的值就放在哪裡
- 函式名稱前面的回傳型別決定回傳什麼：bool、int，或 void 不回傳
-->
