---
layout: section
---

# Nonsense!

<!--
- 下一題：Nonsense!
- 這題的函式看不到裡面的 code
-->

---
layout: figure
---

# Nonsense!

::figure::

<FunctionMachine name="nonsense(n)" caption="hidden code" input="n" output="?" />

<p v-click class="machine-note"><code>int</code> 進 → <code>int</code> 出</p>

<style>
.google-figure > .machine-note {
  margin-top: 2rem;
  color: var(--google-ink);
  font-size: 22px;
  text-align: center;
}
</style>

<!--
- nonsense(n) 是個黑盒子，題目把程式碼藏起來了
- [click] 我們只知道：丟一個 int 進去，會換回一個 int
- 那要怎麼知道它在做什麼？
-->

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

<StepTable :head="['n', 'nonsense(n)']" :rows="[[2, 4], [3, 9], [4, 16], ['n', 'n * n']]" :good="3" />

<p v-click="5">範例：<code>18</code> → <code>325</code></p>

</CodeBlock>

<!--
- 不知道裡面在做什麼？那就呼叫看看，寫個 main 丟幾個值進去
- [click] nonsense(2) 回傳 4
- [click] nonsense(3) 回傳 9
- [click] nonsense(4) 回傳 16
- [click] 看出規律了嗎？n 進去，n * n 出來
- [click] 再對照題目範例：輸入 18 要印出 325
-->

---
layout: figure
clicks: 2
expr: |
  printf("%d", [[2:[[1:nonsense(18)|324]] + 1|325]]);
---

# Nonsense!

::figure::

<CodeExpr :expr="$frontmatter.expr" size="2.4rem">

<p v-click="2">範例 <code>325</code> ✓</p>

</CodeExpr>

<!--
- 用剛剛的猜測算算看
- [click] nonsense(18) = 18 * 18 = 324
- [click] 再加 1 是 325，和範例一樣 ✓
- 所以題目要的是：把回傳值加 1 再印出來
-->

---
layout: figure
main: |
  int num = nonsense(765);
  nonsense(765);
---

# Nonsense!

::figure::

<CodeCall :main="$frontmatter.main" only-main>

<p>不接 → 丟掉</p>

</CodeCall>

<!--
- 補充：有回傳值的函式，呼叫的人也可以不接
- 第一行把回傳值存進 num
- 第二行沒人接，值照樣算出來，只是直接被丟掉
- 這題要用到回傳值，所以要接住
-->

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

<p><code>n2</code> 接住，再 + 1</p>

<p><code>18</code> → <code>324</code> → <code>325</code></p>

</CodeBlock>

<!--
- 正解：用 n2 接住 nonsense(n1) 的回傳值，印的時候再加 1
- 輸入 18：nonsense 回傳 324，印出 325 ✓
-->
