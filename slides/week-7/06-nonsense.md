---
layout: section
---

# Nonsense!

---
layout: figure
---

# Nonsense!

::figure::

<FunctionMachine name="nonsense(n)" caption="hidden code" input="n" output="?" />

<p v-click class="machine-note">只知道：丟一個 <code>int</code> 進去，會換回一個 <code>int</code></p>

<style>
.google-figure > .machine-note {
  margin-top: 2rem;
  color: var(--google-ink);
  font-size: 22px;
  text-align: center;
}
</style>

---
layout: figure
clicks: 5
code: |
  int main(void) {
      printf("%d\n", nonsense(2));
      printf("%d\n", nonsense(3));
      printf("%d\n", nonsense(4));
      return 0;
  }
---

# Nonsense!

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3]">

<p>不知道裡面在做什麼？那就呼叫看看</p>

<StepTable :head="['n', 'nonsense(n)']" :rows="[[2, 4], [3, 9], [4, 16], ['n', 'n * n']]" :good="3" />

<p v-click="5">再對照範例：18 要印出 325</p>

</CodeBlock>

---
layout: figure
clicks: 2
expr: |
  printf("%d", [[2:[[1:nonsense(18)|324]] + 1|325]]);
---

# Nonsense!

::figure::

<CodeExpr :expr="$frontmatter.expr" size="2.4rem">

<p v-click="2">和範例的 <code>325</code> 一樣 ✓</p>

</CodeExpr>

---
layout: figure
main: |
  int num = nonsense(765);
  nonsense(765);
---

# Nonsense!

::figure::

<CodeCall :main="$frontmatter.main" only-main>

<p>有回傳值的函式，呼叫的人也可以不接</p>

<p>值照樣算出來，只是直接被丟掉</p>

</CodeCall>

---
layout: figure
code: |
  int nonsense(int n);   // hidden code

  int main(void) {
      int n1, n2;
      scanf("%d", &n1);
      n2 = @@nonsense(n1)@@;
      printf("%d", n2 + 1);
      return 0;
  }
---

# Nonsense!

::figure::

<CodeBlock :code="$frontmatter.code" size="1.25rem">

<p class="answer-badge">✓ 正解</p>

<p>用 <code>n2</code> 接住 <code>nonsense(n1)</code> 的回傳值，再加 1</p>

<p>輸入 <code>18</code>：<code>324</code> → 印出 <code>325</code></p>

</CodeBlock>
