---
layout: section
---

# factorial()

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

每一步都是：上一步的 $\text{result}$ $\times$ 下一個數 $i$

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

<p v-click="13" class="fact-exit"><code>6 &lt;= 5</code> 不成立，離開迴圈</p>

<p v-click="14" class="fact-exit">印出 <code>120</code> ✓</p>

</CodeBlock>

<style>
.fact-exit {
  margin-top: 1rem !important;
}
</style>

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

剛剛算 $5!$ 的程式，換掉頭尾就好

<p v-click="1"><code>n</code> 不再寫死，變成 <strong>parameter</strong></p>

<p v-click="1"><code>printf</code> 變成 <strong>return</strong></p>

</CodeBlock>

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

<p><code>main</code> 和 prototype 題目都給了，只要寫這個 function</p>

$n = 0$ 時迴圈一次都不跑，直接回傳 $1$，剛好就是 $0! = 1$

<p>輸入 <code>9</code>：印出 <code>362880</code></p>

</CodeBlock>

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

<p>function 也可以呼叫自己，這叫做<strong>遞迴</strong></p>

<v-click at="1">

$0! = 1$：直接回傳 $1$

</v-click>

<v-click at="2">

$n! = n \times (n-1)!$：剩下的交給 <code>factorial(n - 1)</code>

</v-click>

</CodeBlock>

<style>
.answer-badge.alt {
  background: var(--google-blue-soft);
  color: var(--google-blue) !important;
}
</style>

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

<p>每一層都把問題交給更小的 <code>factorial</code></p>

<p v-click="5">碰到 <code>factorial(0)</code> 就停，一路乘回來</p>

</ExprSteps>
