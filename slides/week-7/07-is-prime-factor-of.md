---
layout: section
---

# isPrimeFactorOf()

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

<p v-click="1"><code>@param</code>：每個參數是什麼</p>

<p v-click="2"><code>@return</code>：回傳的是什麼</p>

<p v-click="3">呼叫的人照著用，實作的人照著寫</p>

</CodeBlock>

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

<p>先把第 6 週寫過的「是質數嗎？」變成 function</p>

</CodeBlock>

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

<p>印出 yes / no，變成 return <code class="type">true</code> / <code class="type">false</code></p>

<p>所以回傳型別是 <code class="type">bool</code></p>

<p>小心：<code>1</code> 不是質數</p>

</CodeBlock>

---
layout: statement
---

# input 變 *parameter*<br>output 變 *return*

---
layout: figure
clicks: 6
code: |
  <<bool>> isPrimeFactorOf(int test_no, int num) {
      return [[5:[[3!:isPrime([[2:test_no|179]])|true]] && [[4:[[2:num|358]] % [[2:test_no|179]] == 0|true]]|true]];
  }

  int main(void) {
      bool ans = [[6:isPrimeFactorOf(179, 358)|true]];
  }
---

# isPrimeFactorOf(179, 358)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[5, 1, 1, 1, 1, 5]" size="1.05rem">

<p>質因數 = 是質數，<strong>而且</strong>是因數：剛剛的 <code>isPrime</code> 直接拿來用</p>

<p v-click="2">代進去：<code>test_no</code> 是 <code>179</code>，<code>num</code> 是 <code>358</code></p>

<p v-click="5">兩邊都是 <code class="type">true</code>，<code>&amp;&amp;</code> 才是 <code class="type">true</code></p>

<p v-click="6"><code>ans</code> 拿到 <code class="type">true</code></p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 38rem;
}
</style>

---
layout: figure
clicks: 6
code: |
  <<bool>> isPrimeFactorOf(int test_no, int num) {
      return [[5:[[3!:isPrime([[2:test_no|4]])|false]] && [[4:[[2:num|16]] % [[2:test_no|4]] == 0|true]]|false]];
  }

  int main(void) {
      bool ans = [[6:isPrimeFactorOf(4, 16)|false]];
  }
---

# isPrimeFactorOf(4, 16)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[5, 1, 1, 1, 1, 5]" size="1.05rem">

<p v-click="2">代進去：<code>test_no</code> 是 <code>4</code>，<code>num</code> 是 <code>16</code></p>

<p v-click="4"><code>4</code> 是 <code>16</code> 的因數，但不是質數</p>

<p v-click="5">一邊是 <code class="type">false</code>，結果就是 <code class="type">false</code></p>

<p v-click="6"><code>ans</code> 拿到 <code class="type">false</code></p>

</CodeBlock>

<style>
/* keep the card as wide as the unevaluated line, so the panel stays put */
.code-block > .code {
  min-width: 38rem;
}
</style>

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

<p>先寫好 <code>isPrime</code>，記得 <code>n &lt; 2</code> 不是質數</p>

<p>是質數 <code>&amp;&amp;</code> 能整除，就是質因數</p>

</CodeBlock>
