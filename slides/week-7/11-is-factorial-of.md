---
layout: section
---

# isFactorialOf()

<!--
- 下一題：判斷 first 是不是 second 的階乘
- 剛剛才寫過 factorial，看看能不能直接拿來用
-->

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

<p>呼叫的人：<code>main</code></p>

<p v-click="1">→ <code>isFactorialOf</code>：一行</p>

<p v-click="2">不用再寫一次 ✓</p>

</CodeBlock>

<!--
- 這是上一題寫好的 factorial，現在是 main 在呼叫它
- [click] 把 factorial 整個複製過來，換成 isFactorialOf 呼叫它：只要一行 return
- factorial(second) 算出來，跟 first 比一下就好
- [click] 同樣的邏輯不用再寫一次，這就是 function 的好處：寫一次、到處用
-->


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

$40320 \overset{?}{=} 8!$

<p v-click="2"><code>second</code> = <code>8</code>，<code>first</code> = <code>40320</code></p>

<v-click at="3">

$8! = 40320$

</v-click>

<p v-click="4"><code>==</code> → <code class="type">true</code></p>

<p v-click="6"><code>yes</code> ✓</p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 29rem;
}
</style>

<!--
- 實際跑一次：main 呼叫 isFactorialOf(40320, 8)，問 40320 是不是 8 的階乘
- [click] 跳進 isFactorialOf
- [click] 參數代進去：second 是 8，first 是 40320
- [click] factorial(second) 交給上面的 factorial 去算，8! = 40320
- [click] 兩邊一樣，== 是 true
- [click] 回到 main，if 拿到 true
- [click] 印出 yes，跟範例一樣
-->

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

<p v-click="2"><code>second</code> = <code>7</code>，<code>first</code> = <code>720</code></p>

<v-click at="3">

$7! = 5040$

</v-click>

<p v-click="4"><code>5040 ≠ 720</code> → <code class="type">false</code></p>

<p v-click="6"><code>else</code> → <code>no</code> ✓</p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 29rem;
}
</style>

<!--
- 再跑一個答案是 no 的：isFactorialOf(720, 7)
- [click] 跳進 isFactorialOf
- [click] 代進去：second 是 7，first 是 720
- [click] factorial 算出 7! = 5040
- [click] 5040 不等於 720，== 是 false
- [click] 回到 main，if 拿到 false
- [click] 走 else，印出 no
- 720 其實是 6!，但題目問的是 7，所以是 no
-->

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

⚠ <code>int</code> 裝不下 $13!$

</CodeBlock>

<!--
- 上一題的 factorial 原封不動複製過來
- isFactorialOf 只要一行：factorial(second) 跟 first 一樣就是 true，不一樣就是 false
- 小心：int 最大大約 21 億，13! 就裝不下了，會溢位算錯
-->

