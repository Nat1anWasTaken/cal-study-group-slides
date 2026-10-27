---
layout: section
---

# gcd() & gcd() again

<!--
- 接下來兩題一起講：gcd() 和 gcd() again
- 同一個 function，一題你是呼叫的人，一題你是實作的人
-->

---
layout: figure
clicks: 2
---

# 最大公因數

::figure::

<div class="gcd-def">
  <div class="gcd-row">
    <span class="gcd-label">4 的因數</span>
    <code v-for="d in [1, 2, 4]" :key="d" :class="{ common: $clicks >= 1 && d <= 2, best: $clicks >= 2 && d === 2 }">{{ d }}</code>
  </div>
  <div class="gcd-row">
    <span class="gcd-label">6 的因數</span>
    <code v-for="d in [1, 2, 3, 6]" :key="d" :class="{ common: $clicks >= 1 && d <= 2, best: $clicks >= 2 && d === 2 }">{{ d }}</code>
  </div>

<p v-click="1"><strong>公因數</strong>：<code>1</code>、<code>2</code></p>

<div v-click="2" class="gcd-rule">

$\gcd(4, 6) = 2$

</div>

</div>

<style>
.gcd-def {
  width: fit-content;
  margin: 0 auto;
  color: var(--google-ink);
  font-size: 1.6rem;
}

.gcd-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.gcd-label {
  width: 7rem;
  color: var(--google-muted);
  font-size: 1.3rem;
}

.gcd-row code {
  min-width: 2.6rem;
  text-align: center;
  font-size: 1.5rem;
  transition: background 0.3s, color 0.3s;
}

.gcd-row code.common {
  background: var(--google-blue-soft);
  color: var(--google-blue);
}

.gcd-row code.best {
  background: #e6f4ea;
  color: var(--google-green-dark);
}

.gcd-def > p {
  margin: 1.2rem 0 0;
  font-size: 1.4rem;
}

.gcd-rule {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;
  background: var(--google-blue-soft);
  font-size: 1.4rem;
}

.gcd-rule p {
  margin: 0;
}
</style>

<!--
- 先複習：最大公因數
- 4 的因數是 1、2、4；6 的因數是 1、2、3、6
- [click] 兩邊都有的叫公因數：1 和 2
- [click] 最大的那個就是最大公因數：gcd(4, 6) = 2
-->

---
layout: figure
caller: |
  // 寫好了，藏在 hidden code 裡
  int gcd(int m, int n);

  int main(void) {
      @@// 你寫：讀數字、呼叫、印出來@@
  }
callee: |
  // main() 寫好了，藏起來
  // 它會呼叫 gcd(a, b)

  int gcd(int m, int n) {
      @@// 你寫：算出 GCD 並 return@@
  }
---

# gcd() vs gcd() again

::figure::

<div class="two-sides">
  <div>
    <CodeSnippet :code="$frontmatter.caller" size="1.05rem" />
    <p><code>gcd()</code>：<strong>呼叫</strong></p>
  </div>
  <div>
    <CodeSnippet :code="$frontmatter.callee" size="1.05rem" />
    <p><code>gcd() again</code>：<strong>實作</strong></p>
  </div>
</div>

<style>
.two-sides {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  width: 100%;
}

.two-sides p {
  margin-top: 1rem;
  color: var(--google-ink);
  font-size: 22px;
  text-align: center;
}
</style>

<!--
- 兩題是同一個 gcd，只是你站的位置不一樣
- 左邊 gcd()：gcd 已經寫好、藏在 hidden code 裡，你寫 main：讀數字、呼叫、印出來，你是呼叫的人
- 右邊 gcd() again：main 寫好、藏起來了，它會呼叫 gcd(a, b)，你寫 gcd：算出 GCD 並 return，你是實作的人
-->

---
layout: statement
---

# 兩邊只靠 *prototype* 溝通

<!--
- 兩邊都看不到對方的 code，只靠 prototype：名字、參數、回傳型別
- 先講 gcd()，我們是呼叫的人
-->

---
layout: figure
clicks: 4
code: |
  int gcd(int m, int n);

  int main(void) {
      int a, b;
      scanf("%d%d", &a, &b);
      printf("The GCD of %d and %d is %d.",
             a, b, [[3:gcd([[2:a|4]], [[2:b|6]])|2]]);
      return 0;
  }
---

# gcd()：你是呼叫的人

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[4, 6, 6, 5]" size="1.15rem">

<p v-click="1">輸入 <code>4 6</code></p>

<p v-click="2"><code>gcd(4, 6)</code></p>

<p v-click="3">→ <code>2</code></p>

<p v-click="4"><code>The GCD of 4 and 6 is 2.</code></p>

</CodeBlock>

<!--
- 不知道 gcd 裡面怎麼寫也沒關係，照 prototype 呼叫就好
- [click] 輸入 4 6：a 是 4，b 是 6
- [click] 把 a、b 交給 gcd，也就是 gcd(4, 6)
- [click] gcd 回傳 2，就填進最後一個 %d
- [click] 印出 The GCD of 4 and 6 is 2.
-->

---
layout: figure
code: |
  #include <stdio.h>

  int gcd(int m, int n);

  int main(void) {
      int a, b;
      scanf("%d%d", &a, &b);
      printf("The GCD of %d and %d is %d.",
             a, b, @@gcd(a, b)@@);
      return 0;
  }
---

# gcd()

::figure::

<CodeBlock :code="$frontmatter.code" size="1.15rem">

<p class="answer-badge">✓ 正解</p>

<p>回傳值直接放進 <code>printf</code></p>

</CodeBlock>

<!--
- 正解：gcd 的回傳值可以直接放進 printf
- 不用先存到變數裡（存也可以）
- 接下來換邊：gcd() again，我們是實作的人
-->

---
layout: figure
clicks: 15
code: |
  int main(void) {
      int m, n;
      scanf("%d%d", &m, &n);
      while (n != 0) {
          int r = m % n;
          m = n;
          n = r;
      }
      printf("%d", m);
  }
---

# gcd() again：先回想第 5 週

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[2, 3, 4, 5, 6, 3, 4, 5, 6, 3, 4, 5, 6, 3, 8]" size="1.2rem">

<p><code>m</code> ← <code>n</code>，<code>n</code> ← <code>m % n</code></p>

<StepTable :head="['m', 'n', 'm % n']" :rows="[[80, 48, 32], [48, 32, 16], [32, 16, 0]]" :steps="[3, 7, 11]" />

<p v-click="14" class="gcd-exit"><code>n == 0</code></p>

<p v-click="15" class="gcd-exit"><code>m</code> → <code>16</code> ✓</p>

</CodeBlock>

<style>
.gcd-exit {
  margin-top: 1rem !important;
}
</style>

<!--
- 要實作 gcd，先回想第 5 週寫過的輾轉相除法
- 每一圈：m 換成 n，n 換成 m % n
- [click:3] 輸入 80 48：80 % 48 = 32
- [click:4] 48 % 32 = 16
- [click:4] 32 % 16 = 0
- [click:3] n 變成 0，離開迴圈
- [click] 答案就是 m：印出 16 ✓
-->

---
layout: figure
transition: view-transition
clicks: 2
code: |
  int main(void) {
      int m, n;
      ^^in:%%1:box.blue:@@scanf("%d%d", &m, &n);@@%%^^
  ^^body:    while (n != 0) {
          int r = m % n;
          m = n;
          n = r;
      }^^
      ^^out:%%2:box.green:{{printf("%d", m);}}%%^^
  }
---

# 把程式變成 function

::figure::

<CodeBlock :code="$frontmatter.code" size="1.25rem">

<p v-click="1"><code>scanf</code>：input</p>

<p v-click="2"><code>printf</code>：output</p>

</CodeBlock>

<!--
- 和 isPrime、factorial 一樣：剛剛的程式，只要換掉頭尾
- [click] scanf 是 input
- [click] printf 是 output
-->

---
layout: figure
code: |
  int gcd(^^in:@@int m, int n@@^^) {
  ^^body:    while (n != 0) {
          int r = m % n;
          m = n;
          n = r;
      }^^
      ^^out:{{return m;}}^^
  }
---

# 把程式變成 function

::figure::

<CodeBlock :code="$frontmatter.code" size="1.25rem">

<p>input → <strong>parameter</strong></p>

<p>output → <strong>return</strong></p>

</CodeBlock>

<!--
- input 變成參數：m、n 由呼叫的人給，不用 scanf 了
- output 變成 return：return m;
- 中間算的部分，一行都不用改
-->

---
layout: figure
code: |
  <<int>> gcd(int m, int n) {
      while (n != 0) {
          int r = m % n;
          m = n;
          n = r;
      }
      return m;
  }
---

# gcd() again

::figure::

<CodeBlock :code="$frontmatter.code" size="1.25rem">

<p class="answer-badge">✓ 正解</p>

<p><code>gcd(80, 48)</code> → <code>16</code></p>

<p><code>942 165</code> → <code>3</code></p>

</CodeBlock>

<!--
- 正解：main 和 prototype 題目都給了，只要寫這個 function
- 藏起來的 main 呼叫 gcd(80, 48)，拿到 16
- 輸入 942 165：印出 The GCD of 942 and 165 is 3.
-->
