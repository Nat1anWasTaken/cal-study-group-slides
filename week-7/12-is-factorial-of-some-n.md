---
layout: section
---

# isFactorialOfSomeN()

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

<p v-click="21" class="sn-note"><code>5040 &lt; 5040</code> 不成立，離開迴圈</p>

<p v-click="23" class="sn-note">剛好等於：回傳 <code>7</code> ✓</p>

</CodeBlock>

<style>
.sn-note {
  margin-top: 0.8rem !important;
}
</style>

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

<p v-click="15" class="sn-note"><code>120 &lt; 25</code> 不成立，離開迴圈</p>

<p v-click="16" class="sn-note"><code>120 == 25</code> 也不成立</p>

<p v-click="17" class="sn-note">找不到：回傳 <code>-999</code></p>

</CodeBlock>

<style>
.sn-note {
  margin-top: 0.8rem !important;
}
</style>

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

<p v-click="2">要回傳的是 <code>n</code>，所以型別是 <code class="type">int</code>，不能用 <code class="type">bool</code></p>

<p v-click="3"><code>-999</code> 不可能是答案，就拿來代表「找不到」</p>

</CodeCall>

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

<p><code>n</code> 從 <code>1</code> 開始，<code>result</code> 還比 <code>num</code> 小就繼續乘</p>

<p>停下來後：剛好相等就回傳 <code>n</code>，否則回傳 <code>-999</code></p>

<p>輸入 <code>40320</code>：印出 <code>8</code></p>

<p>輸入 <code>25</code>：印出 <code>no</code></p>

</CodeBlock>
