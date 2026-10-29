---
theme: ./theme
title: cal-study-group
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
layout: cover 
---

# About this Study Group

---
src: ./slides/week-7/00-study-plan.md
---

---
layout: cover
---

# Week 7: Functions

<!--
- 今天的主題是 function
- 先從數學的 f(x) 開始，接到 C 的寫法
-->

---
layout: default
---

# 今天的流程

1. **Functions**：從數學的 f(x) 到 C
2. **Booleans**：true / false 與條件
3. **回傳型別**：`bool`、`int`、`void`
4. 休息
5. **題目**：一題一題講，每題附正解
6. **Recap**

<!--
- 先看一下今天會做什麼
- 前半段講觀念：function、boolean、回傳型別
- 休息完開始寫題目，每題最後都會講正解
- 最後回顧今天學到的東西
-->

---
src: ./slides/week-7/01-functions.md
---

---
src: ./slides/week-7/02-booleans.md
---

---
src: ./slides/week-7/03-return-types.md
---

---
layout: section
---

# Take a break!

<!--
- 休息一下
-->

---
layout: section
---

# Let's move on to <br> the real problems!

<!--
- 休息完，開始寫今天的題目
-->

---
layout: figure
---

# Problems

::figure::

<LinkQr url="https://cycu-cal.nath.tw" />

<!--
- 題目都在這個網站，掃 QR code 打開
- 接下來一題一題講，每題最後都有正解
-->

---
src: ./slides/week-7/04-prototype.md
---

---
src: ./slides/week-7/05-scope.md
---

---
src: ./slides/week-7/06-nonsense.md
---

---
src: ./slides/week-7/07-is-prime-factor-of.md
---

---
src: ./slides/week-7/08-factorial.md
---

---
src: ./slides/week-7/09-gcd.md
---

---
src: ./slides/week-7/11-is-factorial-of.md
---

---
src: ./slides/week-7/12-is-factorial-of-some-n.md
---

---
src: ./slides/week-7/13-add-sum.md
---

---
src: ./slides/week-7/14-float-equal.md
---

---
layout: section
---

# Yay!

<!--
- 今天的題目全部講完了！
- 最後回顧一下今天學到的東西
-->

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

<p v-click><strong>function</strong> ≈ f(x)</p>

<p v-click><strong>parameter</strong> <code>x</code> → <strong>return</strong></p>

<p v-click>call 的位置 ← return 的值</p>

</CodeBlock>

<!--
- [click] function 就像數學的 f(x)
- [click] 給它 input（parameter x），它算出 output（return）
- [click] function call 在哪裡，return 的值就放在哪裡：linear(5) 直接變成 13
-->

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

<p v-click><strong>回傳型別</strong></p>

<p v-click><code>bool</code> → true / false　<code>int</code> → 整數</p>

<p v-click><code>void</code> → 不回傳</p>

</CodeBlock>

<!--
- [click] 函式名稱前面的回傳型別，決定回傳什麼
- [click] bool 回傳 true / false，int 回傳整數
- [click] void 不回傳，只做事
-->

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

<p v-click>呼叫前要先「看過」</p>

<p v-click><strong>prototype</strong> 放 <code>main</code> 上面</p>

<p v-click>定義放後面 ✓</p>

</CodeBlock>

<!--
- [click] function 要在呼叫之前先「看過」，否則 compiler 不認得
- [click] 所以把 prototype 放在 main 上面
- [click] 真正的定義寫在後面也沒關係
-->

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

<p v-click>變數只活在它的 <code>{}</code></p>

<p v-click>全域變數：大家都能改 ⚠</p>

</CodeBlock>

<!--
- [click] 變數只活在宣告它的 {} 裡：for 的 i 出了迴圈就不見
- [click] 全域變數宣告在所有 function 外面，大家都能改，名字一撞到就會被偷改，要小心
-->

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

<p v-click>程式 → function</p>

<p v-click>input → <strong>parameter</strong></p>

<p v-click><code>printf</code> → <code>return m;</code></p>

</CodeBlock>

<!--
- gcd 那題的重點
- [click] 把寫好的程式包成 function
- [click] 原本 scanf 讀的 input 變成 parameter：m、n 由呼叫的人給
- [click] 原本 printf 的 output 變成 return：printf 換成 return m;
-->

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

<p v-click>function 可以重複用</p>

<p v-click><code>isFactorialOf</code> → <code>factorial</code></p>

<p v-click>不用再寫一次</p>

</CodeBlock>

<!--
- [click] 寫好的 function 可以重複用
- [click] isFactorialOf 直接呼叫 factorial
- [click] 同樣的邏輯不用再寫一次
-->

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

<p v-click>字元 = 整數</p>

<p v-click><code>'A'</code> = <code>65</code></p>

</CodeBlock>

<!--
- [click] 字元其實就是整數
- [click] 'A' 就是 65，所以可以直接加進 sum
-->

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

<p v-click>小數 = 近似值，別用 <code>==</code></p>

<p v-click>差距 ≤ <code>delta</code> → 相等</p>

</CodeBlock>

<!--
- [click] 小數存的是近似值，0.1 存進去其實不是 0.1，所以不能直接用 ==
- [click] 比較時要留一點誤差：差距 ≤ delta 就當成相等
-->

---
layout: section
---

# Congrats!

<!--
- 恭喜大家完成第七週！
-->
