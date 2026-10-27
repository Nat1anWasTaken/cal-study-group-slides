---
layout: section
---

# Function prototype

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

<p v-click="1">編譯器從上往下，一行一行讀</p>

<p v-click="3">讀到這行時，它還沒看過 <code>printHello</code></p>

<p v-click="4"><code class="type">error: 'printHello' was not declared</code></p>

</CodeBlock>

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

<p>解法一：把整個函式搬到 <code>main</code> 上面</p>

<p v-click="2">這次讀到呼叫時，已經看過 <code>printHello</code> 了 ✓</p>

</CodeBlock>

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

<p v-click="1">可是如果函式之間互相呼叫…</p>

<p v-click="2">讀到 <code>A</code> 裡的 <code>B()</code> 時，<code>B</code> 還沒出現</p>

</CodeBlock>

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

<p>只能倒過來排：<code>D</code>、<code>C</code>、<code>B</code>、<code>A</code></p>

<p>函式一多，順序就很難顧</p>

</CodeBlock>

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

<p>解法二：先在最上面列出每個函式的「名片」</p>

<p>只寫回傳型別、名字、參數，<strong>用分號結束</strong></p>

<p>下面的實作就可以隨便排了</p>

</CodeBlock>

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

<p>把函式頭抄一份到最上面，結尾加上 <code class="type">;</code></p>

<p v-click="1">這就是 <strong>function prototype</strong></p>

<p v-click="2">讀到呼叫時，編譯器已經知道 <code>printHello</code> 長怎樣了 ✓</p>

</CodeBlock>

---
layout: figure
clicks: 3
code: |
  %%1:box.red:int%% %%2:highlight.yellow:gcd%%(%%3:circle.blue:int m, int n%%);
---

# Function prototype

::figure::

<CodeBlock :code="$frontmatter.code" size="2rem">

<p v-click="1"><span class="dot red" />回傳型別：會換回一個 <code class="type">int</code></p>

<p v-click="2"><span class="dot yellow" />名字：<code>gcd</code></p>

<p v-click="3"><span class="dot blue" />參數：要給它兩個 <code>int</code></p>

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

<p>只要在 <code>main</code> 上面加這一行 prototype</p>

<p>輸出 <code>Hello!</code></p>

</CodeBlock>
