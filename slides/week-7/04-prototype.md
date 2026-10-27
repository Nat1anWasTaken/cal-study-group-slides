---
layout: section
---

# Function prototype

<!--
- 第一題：function prototype
- 先看一個「看起來沒問題」但編譯會失敗的程式
-->

---
layout: figure
transition: view-transition
clicks: 4
code: |
  #include <stdio.h>

  ^^fn-main:int main(void) {
      printHello();
      return 0;
  }^^

  ^^fn-hello:void printHello() {
      printf("Hello!");
  }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" :scan="[0, 2, 3]" size="1.3rem">

<p v-click="1">由上往下讀 ↓</p>

<p v-click="3">還沒看過 <code>printHello</code>？</p>

<p v-click="4"><code class="type">error: 'printHello' was not declared</code></p>

</CodeBlock>

<!--
- 先問：這個程式能跑嗎？看起來 printHello 有寫啊
- [click] 編譯器是從上往下、一行一行讀的
- [click] 讀到 main
- [click] 讀到這行呼叫時，它還沒看過 printHello，不知道這是什麼
- [click] 所以就報錯：printHello 沒有宣告
-->

---
layout: figure
clicks: 2
code: |
  #include <stdio.h>

  ^^fn-hello:void printHello() {
      printf("Hello!");
  }^^

  ^^fn-main:int main(void) {
      printHello();
      return 0;
  }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" :scan="[2, 7]" size="1.3rem">

<p>解法一：搬上去</p>

<p v-click="2">已經看過了 ✓</p>

</CodeBlock>

<!--
- 解法一：把整個 printHello 搬到 main 上面
- [click] 編譯器先讀到 printHello 的定義
- [click] 這次讀到呼叫時，已經看過 printHello 了，可以編譯 ✓
-->

---
layout: figure
transition: view-transition
clicks: 2
code: |
  ^^fa:void A() { B(); }^^
  ^^fb:void B() { C(); }^^
  ^^fc:void C() { D(); }^^
  ^^fd:void D() { }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" :scan="[0]">

<p v-click="1">互相呼叫…</p>

<p v-click="2"><code>B</code> 還沒出現 ✗</p>

</CodeBlock>

<!--
- 但搬位置不是每次都行得通
- [click] 如果函式之間互相呼叫：A 叫 B、B 叫 C、C 叫 D
- [click] 讀到 A 裡面的 B() 時，B 還沒出現，又報錯了
-->

---
layout: figure
transition: view-transition
code: |
  ^^fd:void D() { }^^
  ^^fc:void C() { D(); }^^
  ^^fb:void B() { C(); }^^
  ^^fa:void A() { B(); }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code">

<p>倒過來排：<code>D</code> <code>C</code> <code>B</code> <code>A</code></p>

</CodeBlock>

<!--
- 用解法一，就只能倒過來排：D、C、B、A，被呼叫的要先出現
- 四個還好，函式一多、呼叫關係一複雜，順序就很難顧
- 有沒有不用管順序的方法？
-->

---
layout: figure
transition: view-transition
code: |
  <<void A();>>
  <<void B();>>
  <<void C();>>
  <<void D();>>

  ^^fa:void A() { B(); }^^
  ^^fb:void B() { C(); }^^
  ^^fc:void C() { D(); }^^
  ^^fd:void D() { }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code">

<p>解法二：先列「名片」</p>

<p>型別 + 名字 + 參數 + <strong>;</strong></p>

</CodeBlock>

<!--
- 解法二：先在最上面列出每個函式的「名片」
- 名片只寫回傳型別、名字、參數，最後用分號結束，沒有 {}
- 編譯器先看過所有名片，下面的實作就可以隨便排了
-->

---
layout: figure
transition: view-transition
code: |
  <<void A();>>
  <<void B();>>
  <<void C();>>
  <<void D();>>

  ^^fa:void A() { B(); }^^
  ^^fb:void B() { C(); }^^
  ^^fc:void C() { D(); }^^
  ^^fd:void D() { }^^
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code">

<div class="term">
  <span><strong>Function</strong><small>函式</small></span>
  <span class="proto"><strong>prototype</strong><small>原型</small></span>
</div>

</CodeBlock>

<style>
.term {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.term span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.term strong {
  color: var(--google-ink);
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.1;
}

.term .proto strong {
  color: var(--google-blue);
}

.term small {
  color: var(--google-muted);
  font-size: 20px;
  font-weight: 500;
}
</style>

<!--
- 這種「名片」有個正式的名字：function prototype，函式原型
-->

---
layout: figure
transition: view-transition
code: |
  #include <stdio.h>

  int main(void) {
      printHello();
      return 0;
  }

  ^^proto:void printHello()^^ {
      printf("Hello!");
  }
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" size="1.3rem">

<p>回到 <code>printHello</code></p>

</CodeBlock>

<!--
- 回到一開始編譯失敗的 printHello，用 prototype 來修
- 注意函式頭 void printHello() 這一段，等一下它會被抄到上面
-->

---
layout: figure
clicks: 2
code: |
  #include <stdio.h>

  ^^proto:void printHello()^^<<;>>

  int main(void) {
      printHello();
      return 0;
  }

  void printHello() {
      printf("Hello!");
  }
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" :scan="[2, 5]" size="1.3rem">

<p>函式頭 + <code class="type">;</code></p>

<p v-click="1"><strong>function prototype</strong></p>

<p v-click="2">已經知道它長怎樣 ✓</p>

</CodeBlock>

<!--
- 把函式頭抄一份到最上面，結尾加上分號
- [click] 這一行就是 function prototype
- [click] 讀到 main 裡的呼叫時，編譯器已經知道 printHello 長怎樣了，可以編譯 ✓
- 定義留在下面也沒關係
-->

---
layout: figure
clicks: 3
code: |
  %%1:box.red:int%% %%2:highlight.yellow:gcd%%(%%3:circle.blue:int m, int n%%);
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" size="2rem">

<p v-click="1"><span class="dot red" />回傳型別</p>

<p v-click="2"><span class="dot yellow" />名字</p>

<p v-click="3"><span class="dot blue" />參數</p>

</CodeBlock>

<style>
.dot {
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.6rem;
  border-radius: 99px;
}

.dot.red { background: var(--google-red); }
.dot.yellow { background: var(--google-yellow); }
.dot.blue { background: var(--google-blue); }
</style>

<!--
- 拆開一個 prototype 來看，它告訴編譯器三件事
- [click] 回傳型別：呼叫它會換回一個 int
- [click] 名字：gcd
- [click] 參數：要給它兩個 int
- 有這三樣，編譯器就能檢查你的呼叫寫得對不對
-->

---
layout: figure
code: |
  #include <stdio.h>

  <<void printHello();>>

  int main(void) {
      printHello();
      return 0;
  }

  void printHello() {
      printf("Hello!");
  }
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" size="1.25rem">

<p class="answer-badge">✓ 正解</p>

<p>+ 一行 prototype</p>

<p>→ <code>Hello!</code></p>

</CodeBlock>

<!--
- 這題的正解：只要在 main 上面加這一行 prototype
- 其他都不用動，輸出 Hello!
-->
