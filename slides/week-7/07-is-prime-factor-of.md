---
layout: section
---

# isPrimeFactorOf()

<!--
- 下一題：isPrimeFactorOf()
- 先看題目給的註解，它告訴我們這個 function 要做什麼
-->

---
layout: figure
clicks: 3
code: |
  /**
   * 檢查 test_no 是否是 num 的質因數
   * @param %%1:underline.blue:test_no an integer%%
   * @param %%1:underline.blue:num an integer%%
   * @return %%2:underline.red:true if test_no is the prime factor of num%%
   *         %%2:underline.red:otherwise return false%%
   */
  %%2:box.red:bool%% isPrimeFactorOf(%%1:circle.blue:int test_no%%, %%1:circle.blue:int num%%);
---

# Block comments

::figure::

<CodeBlock :code="$frontmatter.code" size="0.95rem">

<p v-click="1"><code>@param</code>：參數</p>

<p v-click="2"><code>@return</code>：回傳值</p>

<p v-click="3">呼叫的人 ⇄ 實作的人</p>

</CodeBlock>

<!--
- 題目在 prototype 上面放了一段 block comment（/** ... */），說明這個 function 要做什麼
- [click] @param：每個參數是什麼，test_no 和 num 都是整數
- [click] @return：回傳的是什麼，是質因數就回傳 true，不然就回傳 false，所以回傳型別是 bool
- [click] 呼叫的人照著註解用，實作的人照著註解寫，兩邊不用看對方的 code
-->

---
layout: figure
transition: view-transition
code: |
  int main(void) {
      int n;
      ^^pin:@@scanf("%d", &n);@@^^
      for (int i = 2; i < n; i++) {
          if (n % i == 0) {
              ^^pno:{{printf("no");}}^^
              return 0;
          }
      }
      ^^pyes:{{printf("yes");}}^^
  }
---

# 把程式變成 function

::figure::

<CodeBlock :code="$frontmatter.code" size="1.2rem">

<p>第 6 週：是質數嗎？</p>

</CodeBlock>

<!--
- 「質因數」= 是質數，而且是因數
- 「是質數嗎？」第 6 週已經寫過了，就是這支程式
- 先把它變成 function，等一下直接拿來用
- 注意它現在是讀 input、印出 yes / no
-->

---
layout: figure
code: |
  <<bool>> isPrime(^^pin:@@int n@@^^) {
      for (int i = 2; i < n; i++) {
          if (n % i == 0) {
              ^^pno:{{return false;}}^^
          }
      }
      ^^pyes:{{return true;}}^^
  }
---

# 把程式變成 function

::figure::

<CodeBlock :code="$frontmatter.code" size="1.2rem">

<p>yes / no → <code class="type">true</code> / <code class="type">false</code></p>

<p>→ <code class="type">bool</code></p>

</CodeBlock>

<!--
- scanf 讀進來的 n 變成參數
- 印出 yes / no，變成 return true / false
- 回傳的是 true / false，所以回傳型別是 bool
- 小心：1 不是質數，這個版本還沒處理，正解會補上 n < 2 的檢查
-->

---
layout: statement
---

# input 變 *parameter*<br>output 變 *return*

<!--
- 這就是剛剛做的事：input 變 parameter，output 變 return
- 等一下 gcd 也會再做一次一樣的事
-->

---
layout: figure
clicks: 6
code: |
  <<bool>> isPrimeFactorOf(int test_no, int num) {
      return [[5:[[3!:isPrime([[2:test_no|179]])|true]] && [[4:[[2:num|358]] % [[2:test_no|179]] == 0|1]]|1]];
  }

  int main(void) {
      bool ans = [[6:isPrimeFactorOf(179, 358)|true]];
  }
---

# isPrimeFactorOf(179, 358)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[5, 1, 1, 1, 1, 5]" size="1.05rem">

<p>質因數 = <code>isPrime</code> <code>&amp;&amp;</code> 整除</p>

<p v-click="2"><code>test_no</code> = <code>179</code><br><code>num</code> = <code>358</code></p>

<p v-click="5"><code class="type">true</code> <code>&amp;&amp;</code> <code>1</code> → <code>1</code></p>

<p v-click="6"><code>ans</code> = <code class="type">true</code></p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 38rem;
}
</style>

<!--
- 直接看一個例子
- 質因數 = 是質數，而且是因數，剛剛的 isPrime 直接拿來用，因數就是 num % test_no == 0
- [click] 從 main 開始：呼叫 isPrimeFactorOf(179, 358)
- [click] 跳進 function，代進去：test_no 是 179，num 是 358
- [click] isPrime(179)：179 是質數，true
- [click] 左側為真，才繼續算右側：358 % 179 == 0，得到 int 的 1
- [click] 兩邊都非 0，&& 的結果是 int 的 1
- [click] 回傳時轉成 bool，回到 main，ans 拿到 true
-->

---
layout: figure
clicks: 6
code: |
  <<bool>> isPrimeFactorOf(int test_no, int num) {
      return [[5:[[3!:isPrime([[2:test_no|4]])|false]] && %%4:underline.red:[[2:num|16]] % [[2:test_no|4]] == 0%%|0]];
  }

  int main(void) {
      bool ans = [[6:isPrimeFactorOf(4, 16)|false]];
  }
---

# isPrimeFactorOf(4, 16)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[5, 1, 1, 1, 1, 5]" size="1.05rem">

<p v-click="2"><code>test_no</code> = <code>4</code><br><code>num</code> = <code>16</code></p>

<p v-click="4"><code>&amp;&amp;</code> 左側為假<br>右側不執行（短路）</p>

<p v-click="5">整個條件 → <code>0</code></p>

<p v-click="6"><code>ans</code> = <code class="type">false</code></p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 38rem;
}
</style>

<!--
- 再一個：isPrimeFactorOf(4, 16)
- [click] main 呼叫 isPrimeFactorOf(4, 16)
- [click] 跳進 function，代進去：test_no 是 4，num 是 16
- [click] isPrime(4)：4 = 2 × 2，不是質數，false
- [click] && 由左往右算，左側已經是假，所以短路：右側的 16 % 4 == 0 不會執行；底線標出被跳過的部分
- [click] 不必算右側，&& 的結果就確定是 int 的 0
- [click] 回傳時轉成 bool 的假，ans 拿到 false
-->

---
layout: figure
code: |
  <<bool>> isPrime(int n) {
      if (n < 2) {
          return false;
      }
      for (int i = 2; i < n; i++) {
          if (n % i == 0) {
              return false;
          }
      }
      return true;
  }

  <<bool>> isPrimeFactorOf(int test_no, int num) {
      return @@isPrime(test_no)@@ && num % test_no == 0;
  }
---

# isPrimeFactorOf()

::figure::

<CodeBlock :code="$frontmatter.code" size="1.05rem">

<p class="answer-badge">✓ 正解</p>

<p><code>n &lt; 2</code> → <code class="type">false</code></p>

<p>質數 <code>&amp;&amp;</code> 整除</p>

</CodeBlock>

<!--
- 正解：先寫好 isPrime，記得 n < 2（0、1）不是質數，要直接 return false
- isPrimeFactorOf 只有一行：是質數 && 能整除，就是質因數
- test_no 小於 2 時，isPrime 先回傳 false，&& 會跳過右側；test_no 是 0 時，也就不會執行除以 0 的取餘數運算
- main 和 prototype 題目都給了，只要寫 function
-->
