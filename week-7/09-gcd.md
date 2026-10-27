---
layout: section
---

# gcd() & gcd() again

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

<p v-click="1">兩邊都有的：<strong>公因數</strong> <code>1</code>、<code>2</code></p>

<div v-click="2" class="gcd-rule">

最大的那個就是<strong>最大公因數</strong>：$\gcd(4, 6) = 2$

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
    <p><code>gcd()</code>：你是<strong>呼叫</strong>的人</p>
  </div>
  <div>
    <CodeSnippet :code="$frontmatter.callee" size="1.05rem" />
    <p><code>gcd() again</code>：你是<strong>實作</strong>的人</p>
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

---
layout: statement
---

# 兩邊只靠 *prototype* 溝通

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

<p>不知道 <code>gcd</code> 裡面怎麼寫，照 prototype 呼叫就好</p>

<p v-click="1">輸入 <code>4 6</code>：<code>a</code> 是 <code>4</code>，<code>b</code> 是 <code>6</code></p>

<p v-click="2">把 <code>a</code>、<code>b</code> 交給 <code>gcd</code></p>

<p v-click="3"><code>gcd</code> 回傳 <code>2</code>，就填進最後一個 <code>%d</code></p>

<p v-click="4">印出 <code>The GCD of 4 and 6 is 2.</code></p>

</CodeBlock>

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

<p><code>gcd</code> 的回傳值可以直接放進 <code>printf</code></p>

<p>不用先存到變數裡</p>

</CodeBlock>

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

<p>輾轉相除法：<code>m</code> 換成 <code>n</code>，<code>n</code> 換成 <code>m % n</code></p>

<StepTable :head="['m', 'n', 'm % n']" :rows="[[80, 48, 32], [48, 32, 16], [32, 16, 0]]" :steps="[3, 7, 11]" />

<p v-click="14" class="gcd-exit"><code>n</code> 變成 <code>0</code>，離開迴圈</p>

<p v-click="15" class="gcd-exit">答案就是 <code>m</code>：印出 <code>16</code> ✓</p>

</CodeBlock>

<style>
.gcd-exit {
  margin-top: 1rem !important;
}
</style>

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

<p>剛剛的程式，只要換掉頭尾</p>

<p v-click="1"><code>scanf</code> 是 input</p>

<p v-click="2"><code>printf</code> 是 output</p>

</CodeBlock>

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

<p>input 變成<strong>參數</strong>：<code>m</code>、<code>n</code> 由呼叫的人給</p>

<p>output 變成 <strong>return</strong></p>

<p>中間算的部分，一行都不用改</p>

</CodeBlock>

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

<p><code>main</code> 和 prototype 題目都給了，只要寫這個 function</p>

<p>藏起來的 <code>main</code> 呼叫 <code>gcd(80, 48)</code>，拿到 <code>16</code></p>

<p>輸入 <code>942 165</code>：印出 <code>The GCD of 942 and 165 is 3.</code></p>

</CodeBlock>
