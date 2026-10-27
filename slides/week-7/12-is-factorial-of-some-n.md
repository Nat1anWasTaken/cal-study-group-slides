---
layout: section
---

# isFactorialOfSomeN()

<!--
- 反過來問：給一個數，它是不是某個 n 的階乘？是的話回傳 n
- 這次沒有 n 可以代，要自己從 1 開始往上乘
-->

---
layout: figure
clicks: 23
code: |
  <<int>> isFactorialOfSomeN(int num) {
      int n = 1;
      int result = 1;
      while (result < num) {
          n++;
          result = result * n;
      }
      if (result == num) {
          return n;
      }
      return -999;
  }
---

# isFactorialOfSomeN(5040)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 7, 8]" size="1.15rem">

<StepTable :head="['$n$', 'result', '和 5040 比']" :rows="[[1, 1, '<'], [2, 2, '<'], [3, 6, '<'], [4, 24, '<'], [5, 120, '<'], [6, 720, '<'], [7, 5040, '==']]" :steps="[2, 5, 8, 11, 14, 17, 20]" :good="6" />

<p v-click="21" class="sn-note"><code>5040 &lt; 5040</code> ✗ → 離開</p>

<p v-click="23" class="sn-note">回傳 <code>7</code> ✓</p>

</CodeBlock>

<style>
.sn-note {
  margin-top: 0.8rem !important;
}
</style>

<!--
- 輸入 5040，一圈一圈跟著跑
- n 從 1 開始，result 也從 1 開始
- [click:5] 每一圈：n 加一，result 乘上新的 n
- result 還比 5040 小，就繼續乘：2、6、24、120、720
- [click:15] 乘到 n = 7，result 變成 5040
- [click] 5040 < 5040 不成立，離開迴圈
- [click:2] result 剛好等於 num，回傳 n，也就是 7
-->


---
layout: figure
clicks: 17
code: |
  <<int>> isFactorialOfSomeN(int num) {
      int n = 1;
      int result = 1;
      while (result < num) {
          n++;
          result = result * n;
      }
      if (result == num) {
          return n;
      }
      return -999;
  }
---

# isFactorialOfSomeN(25)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 7, 10]" size="1.15rem">

<StepTable :head="['$n$', 'result', '和 25 比']" :rows="[[1, 1, '<'], [2, 2, '<'], [3, 6, '<'], [4, 24, '<'], [5, 120, '> 超過了']]" :steps="[2, 5, 8, 11, 14]" :bad="4" />

<p v-click="15" class="sn-note"><code>120 &lt; 25</code> ✗ → 離開</p>

<p v-click="16" class="sn-note"><code>120 == 25</code> ✗</p>

<p v-click="17" class="sn-note">回傳 <code>-999</code></p>

</CodeBlock>

<style>
.sn-note {
  margin-top: 0.8rem !important;
}
</style>

<!--
- 換一個不是階乘的數：25
- 一樣從 1 開始乘：1、2、6、24
- [click:14] 再乘一次變 120，一下子就超過 25 了
- [click] 120 < 25 不成立，離開迴圈
- [click] 120 == 25 也不成立：沒有剛好等於
- [click] 找不到，回傳 -999
- 重點：停下來的原因有兩種，剛好等於或是超過，所以出迴圈後要再檢查一次
-->


---
layout: figure
clicks: 3
main: |
  int small = [[isFactorialOfSomeN(25)|-999]];
  if (small != -999) {
      printf("%d", small);
  } else {
      printf("no");
  }
---

# isFactorialOfSomeN()

::figure::

<CodeCall :main="$frontmatter.main" only-main>

<p v-click="2">回傳 <code>n</code> → <code class="type">int</code>，不是 <code class="type">bool</code></p>

<p v-click="3"><code>-999</code> = 找不到</p>

</CodeCall>

<!--
- 從 main 的角度看：呼叫 isFactorialOfSomeN(25)
- [click] 拿回來的是 -999
- [click] 要回傳的是 n 這個數字，所以回傳型別是 int，不能用 bool
- [click] 那「找不到」怎麼表示？-999 不可能是答案，就拿它來代表找不到
- main 看到 -999 就印 no，否則印出那個 n
-->


---
layout: figure
code: |
  <<int>> isFactorialOfSomeN(int num) {
      int n = 1;
      int result = 1;
      while (result < num) {
          n++;
          result = result * n;
      }
      if (result == num) {
          return n;
      }
      return -999;
  }
---

# isFactorialOfSomeN()

::figure::

<CodeBlock :code="$frontmatter.code" size="1.15rem">

<p class="answer-badge">✓ 正解</p>

<p><code>40320</code> → <code>8</code></p>

<p><code>25</code> → <code>no</code></p>

</CodeBlock>

<!--
- n 從 1 開始，result 還比 num 小就繼續乘
- 停下來後：剛好相等就回傳 n，否則回傳 -999
- 輸入 40320：印出 8；輸入 25：印出 no
-->

