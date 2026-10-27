---
layout: section
---

# factorial()

<!--
- 下一題：factorial()，算 n 的階乘
- 先從數學開始，等一下再變成 code
-->

---
layout: figure
clicks: 6
---

# 階乘：一路乘上去

::figure::

<div class="fact-expand">

<v-clicks>

- $1! = 1$
- $2! = 1 \times 2 = 2$
- $3! = 1 \times 2 \times 3 = 6$
- $4! = 1 \times 2 \times 3 \times 4 = 24$
- $5! = 1 \times 2 \times 3 \times 4 \times 5 = 120$

</v-clicks>

<div v-click="6" class="fact-rule">

$n! = 1 \times 2 \times \cdots \times n$，而 $0! = 1$

</div>

</div>

<style>
.fact-expand {
  width: fit-content;
  margin: 0 auto;
  color: var(--google-ink);
  font-size: 1.8rem;
}

.fact-expand ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fact-expand li {
  margin: 0 0 0.4rem;
  padding: 0;
}

.fact-expand li::before {
  content: none;
}

.fact-rule {
  margin-top: 1.4rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  background: var(--google-blue-soft);
  font-size: 1.6rem;
}

.fact-rule p {
  margin: 0;
}
</style>

<!--
- 階乘就是從 1 一路乘到 n
- [click] 1! = 1
- [click] 2! = 1 × 2 = 2
- [click] 3! = 1 × 2 × 3 = 6
- [click] 4! = 24
- [click] 5! = 120
- [click] 一般來說 n! = 1 × 2 × … × n；特別規定 0! = 1
-->

---
layout: figure
clicks: 7
---

# 一次只乘一個

::figure::

<div class="fact-steps">

<v-clicks>

- $\text{result} = 1$
- $\text{result} = 1 \times 1 = 1$
- $\text{result} = 1 \times 2 = 2$
- $\text{result} = 2 \times 3 = 6$
- $\text{result} = 6 \times 4 = 24$
- $\text{result} = 24 \times 5 = 120$

</v-clicks>

<div v-click="7" class="fact-rule">

$\text{result} = \text{result} \times i$

</div>

</div>

<style>
.fact-steps {
  width: fit-content;
  margin: 0 auto;
  color: var(--google-ink);
  font-size: 1.5rem;
}

.fact-steps ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fact-steps li {
  margin: 0 0 0.2rem;
  padding: 0;
}

.fact-steps li::before {
  content: none;
}

.fact-steps .fact-rule {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;
  background: var(--google-blue-soft);
  font-size: 1.4rem;
}

.fact-steps .fact-rule p {
  margin: 0;
}
</style>

<!--
- 電腦一次只能乘一個數，所以我們用一個 result 記住「目前乘到哪」
- [click] result 從 1 開始（不是 0，乘 0 就全部變 0 了）
- [click] × 1
- [click] × 2
- [click] × 3
- [click] × 4
- [click] × 5，得到 120
- [click] 每一步都是：上一步的 result × 下一個數 i，這就是迴圈裡那一行
-->

---
layout: figure
clicks: 14
code: |
  int n = 5;
  int result = 1;
  for (int i = 1; i <= n; i++) {
      result = result * i;
  }
  printf("%d", result);
---

# factorial(5)

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 5]" size="1.3rem">

<StepTable :head="['i', 'result']" :rows="[['開始', 1], [1, 1], [2, 2], [3, 6], [4, 24], [5, 120]]" :steps="[2, 4, 6, 8, 10, 12]" :good="5" />

<p v-click="13" class="fact-exit"><code>6 &lt;= 5</code> ✗</p>

<p v-click="14" class="fact-exit">→ <code>120</code> ✓</p>

</CodeBlock>

<style>
.fact-exit {
  margin-top: 1rem !important;
}
</style>

<!--
- 把剛剛的過程寫成 code，n = 5 跑一次
- [click:2] result = 1，進迴圈前的初始值
- [click:2] i = 1：result = 1
- [click:2] i = 2：result = 2
- [click:2] i = 3：result = 6
- [click:2] i = 4：result = 24
- [click:2] i = 5：result = 120
- [click] i 變成 6，6 <= 5 不成立，離開迴圈
- [click] 印出 120 ✓
-->

---
layout: figure
transition: view-transition
clicks: 1
steps:
  - |
    ^^n:int n = 5;^^
    ^^body:int result = 1;
    for (int i = 1; i <= n; i++) {
        result = result * i;
    }^^
    ^^out:printf("%d", result);^^
  - |
    <<int>> factorial(^^n:int n^^) {
    ^^body:    int result = 1;
        for (int i = 1; i <= n; i++) {
            result = result * i;
        }^^
    ^^out:    return result;^^
    }
---

# 把它包成 function

::figure::

<CodeBlock :steps="$frontmatter.steps" size="1.3rem">

<p v-click="1"><code>n</code> → <strong>parameter</strong></p>

<p v-click="1"><code>printf</code> → <strong>return</strong></p>

</CodeBlock>

<!--
- 剛剛算 5! 的程式，換掉頭尾就好，和 isPrime 一樣
- [click] n 不再寫死成 5，變成 parameter，由呼叫的人給
- printf 變成 return，把結果交回去
- 中間的迴圈一行都不用改
-->

---
layout: figure
code: |
  <<int>> factorial(int n) {
      int result = 1;
      for (int i = 1; i <= n; i++) {
          result = result * i;
      }
      return result;
  }
---

# factorial()

::figure::

<CodeBlock :code="$frontmatter.code" size="1.3rem">

<p class="answer-badge">✓ 正解</p>

$0! = 1$ ✓

<p><code>9</code> → <code>362880</code></p>

</CodeBlock>

<!--
- 正解：main 和 prototype 題目都給了，只要寫這個 function
- n = 0 時迴圈一次都不跑，直接回傳 1，剛好就是 0! = 1，不用特別處理
- 輸入 9：印出 362880
-->

---
layout: figure
clicks: 2
code: |
  <<int>> factorial(int n) {
      if (n == 0) {
          return 1;
      }
      return n * @@factorial(n - 1)@@;
  }
---

# 另解：遞迴

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[2, 4]" size="1.3rem">

<p class="answer-badge alt">另解</p>

<v-click at="1">

$0! = 1$

</v-click>

<v-click at="2">

$n! = n \times (n-1)!$

</v-click>

</CodeBlock>

<style>
.answer-badge.alt {
  background: var(--google-blue-soft);
  color: var(--google-blue) !important;
}
</style>

<!--
- 另解：function 也可以呼叫自己，這叫做遞迴
- [click] 0! = 1：碰到 0 就直接回傳 1，這是停下來的條件
- [click] n! = n × (n-1)!：自己只乘一個 n，剩下的交給 factorial(n - 1)
- 沒寫停下來的條件，就會一直呼叫下去
-->

---
layout: figure
clicks: 6
steps:
  - "^^call:@@factorial(4)@@^^"
  - "^^n4:4^^ * ^^call:@@factorial(3)@@^^"
  - "^^n4:4^^ * ^^n3:3^^ * ^^call:@@factorial(2)@@^^"
  - "^^n4:4^^ * ^^n3:3^^ * ^^n2:2^^ * ^^call:@@factorial(1)@@^^"
  - "^^n4:4^^ * ^^n3:3^^ * ^^n2:2^^ * ^^n1:1^^ * ^^call:@@factorial(0)@@^^"
  - "^^n4:4^^ * ^^n3:3^^ * ^^n2:2^^ * ^^n1:1^^ * ^^call:{{1}}^^"
  - "^^call:{{24}}^^"
---

# 另解：factorial(4)

::figure::

<ExprSteps :steps="$frontmatter.steps" size="2.2rem">

<p>一層交給下一層</p>

<p v-click="5"><code>factorial(0)</code> = <code>1</code>，乘回來</p>

</ExprSteps>

<!--
- 用 factorial(4) 看遞迴怎麼展開
- 每一層都把問題交給更小的 factorial
- [click] 4 × factorial(3)
- [click] 4 × 3 × factorial(2)
- [click] 4 × 3 × 2 × factorial(1)
- [click] 4 × 3 × 2 × 1 × factorial(0)
- [click] 碰到 factorial(0) 就停，回傳 1
- [click] 一路乘回來：24
-->
