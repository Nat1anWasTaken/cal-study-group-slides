---
layout: section
---

# 全域變數是什麼東東？

---
layout: figure
clicks: 2
code: |
  int main(void) {
      int %%1:circle.blue:score%% = 75;
      if (score >= 60) {
          int %%2:circle.red:bonus%% = 5;
          printf("%d", %%1:underline.blue:score%% + %%2:underline.red:bonus%%);
      }
      printf("%d", ~~bonus~~);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p>變數只活在宣告它的 <code>{}</code> 裡</p>

<p v-click="1"><code>score</code> 宣告在 <code>main</code> 的 <code>{}</code>：<code>if</code> 裡面也看得到 ✓</p>

<p v-click="2"><code>bonus</code> 宣告在 <code>if</code> 的 <code>{}</code>：出了 <code>}</code> 就看不到了 ✗</p>

</CodeBlock>

---
layout: figure
transition: view-transition
code: |
  int main(void) {
      for (^^decl-i:int i = 0^^; i < 3; i++) {
          printf("%d", i);
      }
      printf("%d", ~~i~~);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p><code>for</code> 括號裡宣告的 <code>i</code>，只活在這個迴圈裡</p>

<p>迴圈一結束，<code>i</code> 就不見了</p>

</CodeBlock>

---
layout: figure
code: |
  int main(void) {
      ^^decl-i:int i;^^
      for (i = 0; i < 3; i++) {
          printf("%d", i);
      }
      printf("%d", @@i@@);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p>想在迴圈外面用，就宣告在迴圈外面</p>

<p>這次印得出來：<code>3</code></p>

</CodeBlock>

---
layout: figure
transition: view-transition
clicks: 15
code: |
  int main(void) {
      int n = 3;
      while (n > 0) {
          ^^decl-sum:int sum = 0;^^
          sum = sum + n;
          n--;
      }
      printf("%d", ~~sum~~);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 7]">

<StepTable :head="['第幾圈', 'n', 'sum']" :rows="[[1, 3, '0 → 3'], [2, 2, '0 → 2'], [3, 1, '0 → 1']]" :steps="[4, 8, 12]" />

<p v-click="15">每一圈進到 <code>{}</code>，都是一個全新的 <code>sum</code>，而且迴圈外面看不到它</p>

</CodeBlock>

---
layout: figure
clicks: 3
code: |
  int main(void) {
      int n = 3;
      ^^decl-sum:int sum = 0;^^
      while (n > 0) {
          sum = sum + n;
          n--;
      }
      printf("%d", @@sum@@);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<StepTable :head="['第幾圈', 'n', 'sum']" :rows="[[1, 3, '0 → 3'], [2, 2, '3 → 5'], [3, 1, '5 → 6']]" :good="2" />

<p v-click="3">宣告搬到迴圈外面：<code>sum</code> 一路累加，迴圈外也看得到，印出 <code>6</code></p>

</CodeBlock>

---
layout: statement
---

# 變數只活在*宣告它的 {} 裡*

---
layout: figure
clicks: 2
code: |
  %%1:box.blue:int count = 0;%%

  void increase() {
      %%2:underline.blue:count%%++;
  }

  void decrease() {
      %%2:underline.blue:count%%--;
  }

  int main(void) {
      increase();
      printf("%d", %%2:underline.blue:count%%);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click="1">宣告在所有 function 的外面：<strong>全域變數</strong></p>

<p v-click="2">每個 function 都看得到、改得到<strong>同一個</strong> <code>count</code></p>

</CodeBlock>

---
layout: figure
clicks: 4
code: |
  int %%1:circle.blue:count%% = 0;

  void setCount(int value) {
      %%2:underline.blue:count%% = 0;
      int %%3:circle.red:count%%;
      %%4:underline.red:count%% = value;
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" size="1.3rem">

<p v-click="1">全域的 <code>count</code></p>

<p v-click="2">這行改的是全域的 <code>count</code></p>

<p v-click="3">這裡又宣告了一個同名的 <code>count</code>，只活在 <code>setCount</code> 的 <code>{}</code> 裡</p>

<p v-click="4">所以這行改的是這個新的，函式結束就消失了</p>

</CodeBlock>

---
layout: figure
clicks: 15
code: |
  int count = 0;
  void increase() { count++; }
  void decrease() { count--; }
  void setCount(int value) {
      count = 0;
      int count;
      count = value;
  }

  int main(void) {
      for (int i = 0; i < 3; i++) increase();
      setCount(0);
      for (int i = 0; i < 1; i++) decrease();
      printf("%d", count);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[10, 1, 10, 1, 10, 1, 10, 11, 4, 5, 6, 12, 2, 12, 13]" size="0.95rem">

<div class="trace-panel">

<p class="input">輸入 <code>3 1 0</code></p>

<StepTable :head="['執行', '全域 count', '區域 count']" :rows="[['increase()', 1, ''], ['increase()', 2, ''], ['increase()', 3, ''], ['count = 0;', 0, ''], ['int count;', 0, '?'], ['count = value;', 0, 0], ['decrease()', -1, '']]" :steps="[2, 4, 6, 9, 10, 11, 13]" :good="6" />

<p v-click="15">印出 <code>-1</code>，和範例一樣 ✓</p>

</div>

</CodeBlock>

<style>
.trace-panel .steps {
  font-size: 18px;
}

.trace-panel p {
  margin-top: 0.8rem;
}

.trace-panel .input {
  margin: 0 0 0.6rem;
  font-weight: 600;
}
</style>

---
layout: figure
clicks: 9
code: |
  int count = 0;
  void increase() { count++; }
  void decrease() { count--; }
  void setCount(int value) {
      count = 0;
      int count;
      count = value;
  }

  int main(void) {
      for (int i = 0; i < 5; i++) increase();
      setCount(10);
      for (int i = 0; i < 2; i++) decrease();
      printf("%d", count);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[10, 1, 11, 4, 5, 6, 12, 2, 13]" size="0.95rem">

<div class="trace-panel">

<p class="input">輸入 <code>5 2 10</code></p>

<StepTable :head="['執行', '全域 count', '區域 count']" :rows="[['increase() ×5', 5, ''], ['count = 0;', 0, ''], ['int count;', 0, '?'], ['count = value;', 0, 10], ['decrease() ×2', -2, '']]" :steps="[2, 4, 5, 6, 8]" :bad="4" />

<p v-click="9">印出 <code>-2</code>，可是應該要是 <code>8</code> ✗</p>

</div>

</CodeBlock>

<style>
.trace-panel .steps {
  font-size: 18px;
}

.trace-panel p {
  margin-top: 0.8rem;
}

.trace-panel .input {
  margin: 0 0 0.6rem;
  font-weight: 600;
}
</style>

---
layout: statement
---

# 範例過了，*不代表對*

---
layout: figure
transition: view-transition
code: |
  ^^fix-global:int count = 0;^^

  ^^fix-head:void setCount(int value) {^^
      ^^fix-reset:count = 0;^^
      ~~int count;~~
      ^^fix-set:count = value;^^
  ^^fix-close:}^^
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" size="1.3rem">

<p>問題出在這行：它宣告了一個同名的區域 <code>count</code></p>

<p>把它刪掉</p>

</CodeBlock>

---
layout: figure
clicks: 2
steps:
  - |
    ^^fix-global:int %%1:circle.blue:count%% = 0;^^

    ^^fix-head:void setCount(int value) {^^
        ^^fix-reset:%%1:underline.blue:count%% = 0;^^
        ^^fix-set:%%1:underline.blue:count%% = value;^^
    ^^fix-close:}^^
  - |
    ^^fix-global:int %%1:circle.blue:count%% = 0;^^

    ^^fix-head:void setCount(int value) {^^
        ^^fix-reset:%%1:underline.blue:count%% = 0;^^
        ^^fix-set:%%1:underline.blue:count%% = value;^^
    ^^fix-close:}^^
  - |
    ^^fix-global:int %%1:circle.blue:count%% = 0;^^

    ^^fix-head:void setCount(int value) {^^
        ^^fix-set:%%1:underline.blue:count%% = value;^^
    ^^fix-close:}^^
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :steps="$frontmatter.steps" size="1.3rem">

<p class="answer-badge">✓ 正解</p>

<p v-click="1">刪掉之後，這兩行的 <code>count</code> 都是全域的那個</p>

<p v-click="1">輸入 <code>5 2 10</code>：<code>5</code> → <code>0</code> → <code>10</code> → 印出 <code>8</code> ✓</p>

<p v-click="2"><code>count = 0;</code> 也可以刪：下一行馬上就把它改掉了，留著沒用</p>

<p v-click="2">全域變數大家都能改，名字一撞到就會出事，要小心用</p>

</CodeBlock>
