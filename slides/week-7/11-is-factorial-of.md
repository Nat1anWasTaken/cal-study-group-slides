---
layout: section
---

# isFactorialOf()

---
layout: figure
transition: view-transition
clicks: 2
steps:
  - |
    ^^fact:int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result = result * i;
        }
        return result;
    }^^

    ^^caller:int main(void) {^^
        int n;
        scanf("%d", &n);
        printf("%d", ^^call:@@factorial(n)@@^^);
    ^^close:}^^
  - |
    ^^fact:int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result = result * i;
        }
        return result;
    }^^

    ^^caller:<<bool>> isFactorialOf(int first, int second) {^^
        return ^^call:@@factorial(second)@@^^ == first;
    ^^close:}^^
---

# 寫好的 function，搬過來就能用

::figure::

<CodeBlock :steps="$frontmatter.steps" size="1rem">

<p>上一題寫好的 <code>factorial</code>，是 <code>main</code> 在呼叫它</p>

<p v-click="1">整個複製過來，換 <code>isFactorialOf</code> 呼叫它：只要一行</p>

<p v-click="2">同樣的邏輯不用再寫一次：這就是 function 的好處</p>

</CodeBlock>

---
layout: figure
transition: view-transition
clicks: 6
code: |
  ^^fact:int factorial(int n) {
      int result = 1;
      for (int i = 1; i <= n; i++) {
          result = result * i;
      }
      return result;
  }^^

  ^^caller:<<bool>> isFactorialOf(int first, int second) {^^
      return [[4:[[3:factorial([[2:second|8]])|40320]] == [[2:first|40320]]|true]];
  ^^close:}^^

  ^^main:int main(void) {
      if ([[5:isFactorialOf(40320, 8)|true]]) printf("yes");
      else printf("no");
  }^^
---

# isFactorialOf(40320, 8)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[13, 9, 9, 9, 13, 13]" size="1rem">

<p><code>first</code> 是不是 <code>second</code> 的階乘？</p>

<p v-click="2">代進去：<code>second</code> 是 <code>8</code>，<code>first</code> 是 <code>40320</code></p>

<v-click at="3">

交給上面的 <code>factorial</code> 算<br>$8! = 40320$

</v-click>

<p v-click="4">兩邊一樣，<code>==</code> 是 <code class="type">true</code></p>

<p v-click="6">印出 <code>yes</code> ✓</p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 29rem;
}
</style>

---
layout: figure
transition: view-transition
clicks: 6
code: |
  ^^fact:int factorial(int n) {
      int result = 1;
      for (int i = 1; i <= n; i++) {
          result = result * i;
      }
      return result;
  }^^

  ^^caller:<<bool>> isFactorialOf(int first, int second) {^^
      return [[4:[[3:factorial([[2:second|7]])|5040]] == [[2:first|720]]|false]];
  ^^close:}^^

  ^^main:int main(void) {
      if ([[5:isFactorialOf(720, 7)|false]]) printf("yes");
      else printf("no");
  }^^
---

# isFactorialOf(720, 7)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[13, 9, 9, 9, 13, 14]" size="1rem">

<p v-click="2">代進去：<code>second</code> 是 <code>7</code>，<code>first</code> 是 <code>720</code></p>

<v-click at="3">

交給上面的 <code>factorial</code> 算<br>$7! = 5040$

</v-click>

<p v-click="4"><code>5040</code> 不等於 <code>720</code>，<code>==</code> 是 <code class="type">false</code></p>

<p v-click="6">走 <code>else</code>，印出 <code>no</code> ✓</p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 29rem;
}
</style>

---
layout: figure
transition: view-transition
code: |
  ^^fact:int factorial(int n) {
      int result = 1;
      for (int i = 1; i <= n; i++) {
          result = result * i;
      }
      return result;
  }^^

  ^^caller:<<bool>> isFactorialOf(int first, int second) {^^
      return @@factorial(second)@@ == first;
  ^^close:}^^
---

# isFactorialOf()

::figure::

<CodeBlock :code="$frontmatter.code" size="1rem">

<p class="answer-badge">✓ 正解</p>

<p>上一題的 <code>factorial</code> 原封不動複製過來</p>

<p><code>isFactorialOf</code> 只要一行：<code>factorial(second)</code> 跟 <code>first</code> 一樣就是 <code class="type">true</code></p>

小心：<code>int</code> 最大大約 21 億，$13!$ 就裝不下了

</CodeBlock>
