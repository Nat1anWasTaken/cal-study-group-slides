---
theme: ./theme
title: cal-study-group
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
layout: cover 
---

# Week 7: Functions

---
src: ./week-7/01-functions.md
---

---
src: ./week-7/02-booleans.md
---

---
src: ./week-7/03-return-types.md
---

---
layout: section
---

# Take a break!

---
layout: section
---

# Let's move on to <br> the real problems!

---
layout: figure
---

# Problems

::figure::

<LinkQr url="https://cycu-cal.nath.tw" />

---
src: ./week-7/04-prototype.md
---

---
src: ./week-7/05-scope.md
---

---
src: ./week-7/06-nonsense.md
---

---
src: ./week-7/07-is-prime-factor-of.md
---

---
src: ./week-7/08-factorial.md
---

---
src: ./week-7/09-gcd.md
---

---
src: ./week-7/11-is-factorial-of.md
---

---
src: ./week-7/12-is-factorial-of-some-n.md
---

---
src: ./week-7/13-add-sum.md
---

---
src: ./week-7/14-float-equal.md
---

---
layout: section
---

# Yay!

---
layout: figure
code: |
  <<int>> linear(int x) {
      return 2 * x + 3;
  }

  int y = @@linear(5)@@;   // y 拿到 13
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click><strong>function</strong> 就像數學的 f(x)</p>

<p v-click>給它 input（<strong>parameter</strong> <code>x</code>），它算出 output（<strong>return</strong>）</p>

<p v-click>function call 在哪裡，return 的值就放在哪裡</p>

</CodeBlock>

---
layout: figure
code: |
  <<bool>> isEven(int n) {
      return n % 2 == 0;
  }

  <<int>> square(int n) {
      return n * n;
  }

  <<void>> printHello() {
      printf("Hello!");
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>函式名稱前面的<strong>回傳型別</strong>，決定回傳什麼</p>

<p v-click><code>bool</code> 回傳 true / false，<code>int</code> 回傳整數</p>

<p v-click><code>void</code>：不回傳，只做事</p>

</CodeBlock>

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

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>呼叫之前要先「看過」</p>

<p v-click>把 <strong>prototype</strong> 放在 <code>main</code> 上面</p>

<p v-click>定義寫在後面也沒關係</p>

</CodeBlock>

---
layout: figure
code: |
  int count = 0;   // 全域變數

  void setCount() {
      count = 10;
  }

  int main(void) {
      for (int i = 0; i < 3; i++) {
          printf("%d", i);
      }
      // 這裡已經沒有 i 了
      setCount();      // count 被改成 10
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>變數只活在宣告它的 <code>{}</code> 裡</p>

<p v-click>全域變數大家都能改，小心被偷改</p>

</CodeBlock>

---
layout: figure
code: |
  int gcd(int m, int n) {
      while (n != 0) {
          int r = m % n;
          m = n;
          n = r;
      }
      return m;
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>把寫好的程式變成 function</p>

<p v-click>input 變 <strong>parameter</strong>：<code>m</code>、<code>n</code> 由呼叫的人給</p>

<p v-click>output 變 <strong>return</strong>：<code>printf</code> 換成 <code>return m;</code></p>

</CodeBlock>

---
layout: figure
code: |
  int factorial(int n) {
      int result = 1;
      for (int i = 1; i <= n; i++) {
          result = result * i;
      }
      return result;
  }

  bool isFactorialOf(int first, int second) {
      return @@factorial(second)@@ == first;
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>寫好的 function 可以重複用</p>

<p v-click><code>isFactorialOf</code> 直接呼叫 <code>factorial</code></p>

<p v-click>同樣的邏輯不用再寫一次</p>

</CodeBlock>

---
layout: figure
code: |
  int addSum() {
      int sum = 0;
      char c = getchar();
      while (c != '9') {
          sum = sum + c;   // 'A' 就是 65
          c = getchar();
      }
      return sum;
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>字元其實是整數</p>

<p v-click><code>'A'</code> 就是 <code>65</code>，可以直接加進 <code>sum</code></p>

</CodeBlock>

---
layout: figure
code: |
  bool floatEqual(float num1, float num2,
                  float delta) {
      float diff = num1 - num2;
      if (diff < 0) diff = -diff;
      return diff <= delta;
  }
---

# Recap

::figure::

<CodeBlock :code="$frontmatter.code" size="1.1rem">

<p v-click>小數存的是近似值，不能直接用 <code>==</code></p>

<p v-click>比較時要留一點誤差 <code>delta</code></p>

</CodeBlock>


---
layout: section
---

# Congrats!
