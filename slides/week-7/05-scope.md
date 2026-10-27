---
layout: section
---

# 全域變數是什麼東東？

<!--
- 下一題在講全域變數
- 在講全域之前，先弄清楚「變數活在哪裡」：scope
-->

---
layout: figure
clicks: 2
code: |
  int main(void) %%1:circle.blue:{%%
      int %%1:circle.blue:score%% = 75;
      if (score >= 60) %%2:circle.red:{%%
          int %%2:circle.red:bonus%% = 5;
          printf("%d", %%1:underline.blue:score%% + %%2:underline.red:bonus%%);
      %%2:circle.red:}%%
      printf("%d", ~~bonus~~);
  %%1:circle.blue:}%%
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p>活在宣告它的 <code>{}</code> 裡</p>

<p v-click="1"><code>score</code>：<code>main</code> 的 <code>{}</code> ✓</p>

<p v-click="2"><code>bonus</code>：<code>if</code> 的 <code>{}</code> ✗</p>

</CodeBlock>

<!--
- 規則只有一條：變數只活在宣告它的 {} 裡
- [click] score 宣告在 main 的 {}，if 在 main 裡面，所以 if 裡面也看得到 ✓
- [click] bonus 宣告在 if 的 {}，出了那個 } 就看不到了，最後一行會編譯錯誤 ✗
-->

---
layout: figure
transition: view-transition
code: |
  int main(void) {
      for (^^decl-i:int i = 0^^; i < 3; i++) %%0:circle.red:{%%
          printf("%d", i);
      %%0:circle.red:}%%
      printf("%d", ~~i~~);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p><code>i</code> 只活在 <code>for</code> 裡</p>

</CodeBlock>

<!--
- for 也一樣：for 括號裡宣告的 i，只活在這個迴圈裡
- 迴圈一結束，i 就不見了，最後一行看不到 i ✗
- 那如果迴圈結束後還想用 i 呢？
-->

---
layout: figure
code: |
  int main(void) %%0:circle.blue:{%%
      ^^decl-i:int i;^^
      for (i = 0; i < 3; i++) {
          printf("%d", i);
      }
      printf("%d", @@i@@);
  %%0:circle.blue:}%%
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<p>宣告搬到外面</p>

<p>→ <code>3</code> ✓</p>

</CodeBlock>

<!--
- 想在迴圈外面用，就宣告在迴圈外面
- 這次 i 活在 main 的 {} 裡，迴圈結束後還在，印得出來：3
-->

---
layout: figure
transition: view-transition
clicks: 15
code: |
  int main(void) {
      int n = 3;
      while (n > 0) %%0:circle.red:{%%
          ^^decl-sum:int sum = 0;^^
          sum = sum + n;
          n--;
      %%0:circle.red:}%%
      printf("%d", ~~sum~~);
  }
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 7]">

<StepTable :head="['第幾圈', 'n', 'sum']" :rows="[[1, 3, '0 → 3'], [2, 2, '0 → 2'], [3, 1, '0 → 1']]" :steps="[4, 8, 12]" />

<p v-click="15">每圈一個新的 <code>sum</code> ✗</p>

</CodeBlock>

<!--
- 再來看 while 的 {}：sum 宣告在迴圈裡面，會發生什麼事？
- [click] 跟著執行一行一行走
- [click:3] 第一圈：進到 {}，宣告一個新的 sum = 0，加上 n 變 3
- [click:4] 第二圈：又是一個全新的 sum = 0，加完變 2，上一圈的 3 沒了
- [click:4] 第三圈：一樣，0 → 1
- [click:3] 走到 printf：每一圈進到 {} 都是全新的 sum，而且迴圈外面根本看不到它，編譯錯誤 ✗
-->

---
layout: figure
clicks: 3
code: |
  int main(void) %%0:circle.blue:{%%
      int n = 3;
      ^^decl-sum:int sum = 0;^^
      while (n > 0) {
          sum = sum + n;
          n--;
      }
      printf("%d", @@sum@@);
  %%0:circle.blue:}%%
---

# 全域變數是什麼東東？

::figure::

<CodeBlock :code="$frontmatter.code">

<StepTable :head="['第幾圈', 'n', 'sum']" :rows="[[1, 3, '0 → 3'], [2, 2, '3 → 5'], [3, 1, '5 → 6']]" :good="2" />

<p v-click="3">一路累加 → <code>6</code> ✓</p>

</CodeBlock>

<!--
- 把 sum 的宣告搬到迴圈外面
- [click] 第一圈 0 → 3
- [click] 第二圈 3 → 5，這次 sum 接著上一圈的值
- [click] 第三圈 5 → 6；sum 一路累加，迴圈外也看得到，印出 6 ✓
-->

---
layout: statement
---

# 變數只活在*宣告它的 {} 裡*

<!--
- 小結：變數只活在宣告它的 {} 裡
- 那如果宣告在所有 {} 的外面呢？→ 全域變數
-->

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

<p v-click="1"><strong>全域變數</strong></p>

<p v-click="2">共用<strong>同一個</strong> <code>count</code></p>

</CodeBlock>

<!--
- [click] count 宣告在所有 function 的外面，這就是全域變數
- [click] increase、decrease、main 每個 function 都看得到、改得到同一個 count
-->

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

<p v-click="1">全域 <code>count</code></p>

<p v-click="2">→ 改全域</p>

<p v-click="3">同名的區域 <code>count</code></p>

<p v-click="4">→ 改區域，結束就消失</p>

</CodeBlock>

<!--
- 這是題目給的 setCount，仔細看它在改哪個 count
- [click] 最上面是全域的 count
- [click] 第一行 count = 0：這時還沒有別的 count，改的是全域的
- [click] 接著又宣告了一個同名的 count，它只活在 setCount 的 {} 裡
- [click] 所以 count = value 改的是這個新的區域 count，函式一結束它就消失了，全域的根本沒被設到
-->

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

<!--
- 把整個程式跑一次，輸入 3 1 0：increase 3 次、decrease 1 次、setCount(0)
- [click] 從 main 開始
- [click] increase() 三次，全域 count 變 1、2、3
- [click:6] 呼叫 setCount(0)
- [click] count = 0：改的是全域的，變 0
- [click] int count;：宣告一個新的區域 count，值未知
- [click] count = value：改的是區域的 0，全域還是 0
- [click:2] decrease() 一次，全域變 -1
- [click:2] 印出 -1，和範例一樣 ✓
- 範例過了，可是……
-->

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

<!--
- 換一組輸入：5 2 10，increase 5 次、decrease 2 次、setCount(10)
- [click:2] increase() 五次，全域 count = 5
- [click:2] count = 0：全域變 0
- [click] int count;：新的區域 count
- [click] count = value：10 給了區域的那個，全域還是 0 ← 錯在這裡
- [click:2] decrease() 兩次，全域變 -2
- [click] 印出 -2，可是正確答案應該是 10 - 2 = 8 ✗
-->

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

<p>同名的區域 <code>count</code> → 刪掉</p>

</CodeBlock>

<!--
- 問題出在 int count; 這行：它宣告了一個同名的區域 count，把全域的擋住了
- 解法：把它刪掉
-->

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

<p v-click="1">都是全域的 <code>count</code></p>

<p v-click="1"><code>5 2 10</code>：<code>5</code> → <code>0</code> → <code>10</code> → <code>8</code> ✓</p>

<p v-click="2"><code>count = 0;</code> 也可以刪</p>

<p v-click="2">全域變數：小心撞名</p>

</CodeBlock>

<!--
- [click] 刪掉之後，這兩行的 count 都是全域的那個
- 再跑一次 5 2 10：increase 五次 5 → 歸零 0 → 設成 10 → decrease 兩次，印出 8 ✓
- [click] count = 0; 也可以刪：下一行馬上就把它改掉了，留著沒用
- 提醒：全域變數大家都能改，名字一撞到就會出事，要小心用
-->
