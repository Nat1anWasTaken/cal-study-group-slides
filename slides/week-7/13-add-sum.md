---
layout: section
---

# addSum()

<!--
- 下一題：把讀到的字元全部加起來
- 先問大家：字元要怎麼「加」？
-->

---
layout: figure
clicks: 2
expr: |
  [[2:[[1:'A'|65]] + [[1:'B'|66]]|131]]
---

# addSum()

::figure::

<CodeExpr :expr="$frontmatter.expr">

<p v-click="1">字元 = 數字（ASCII）</p>

<p v-click="2">→ 可以直接加</p>

</CodeExpr>

<!--
- 'A' + 'B' 是多少？
- [click] 每個字元背後都是一個數字，這張對照表叫 ASCII：'A' 是 65，'B' 是 66
- [click] 所以字元可以直接拿來加，65 + 66 = 131
-->


---
layout: figure
clicks: 6
---

# addSum()

::figure::

<CharTape input="zKmdu9" />

<p class="tape-note"><code>getchar()</code>：一次一個，到 <code>'9'</code> 停</p>

<style>
.google-figure > .tape-note {
  margin-top: 2rem;
  color: var(--google-ink);
  font-size: 22px;
  text-align: center;
}
</style>

<!--
- 輸入是一串字元，要怎麼一個一個拿？
- getchar() 一次讀一個字元
- [click] 每按一下就往後讀一個：z、K、m、d、u
- [click:5] 讀到 '9' 就停，'9' 本身不加
-->


---
layout: figure
clicks: 2
expr: |
  [[2:[[1:'9'|57]] == 9|false]]
---

# addSum()

::figure::

<CodeExpr :expr="$frontmatter.expr">

<p v-click="1"><code>'9'</code> = <code>57</code></p>

<p v-click="2">比 <code>'9'</code>，不是 <code>9</code></p>

</CodeExpr>

<!--
- 停下來的條件要怎麼寫？很多人會寫 c == 9
- [click] 注意：'9' 是字元，它的值是 57，不是 9
- [click] 所以 '9' == 9 是 false，要跟 '9' 比，不是跟 9 比
-->


---
layout: figure
code: |
  int addSum();

  int main(void) {
      printf("%d", addSum());
      return 0;
  }
---

# addSum()

::figure::

<CodeBlock :code="$frontmatter.code">

<p>沒有參數 → 自己 <code>getchar()</code></p>

</CodeBlock>

<!--
- 看一下題目給的 main：addSum() 括號裡什麼都沒有
- 沒有參數，資料不是從參數傳進來
- 而是 addSum 自己用 getchar() 從輸入讀
-->


---
layout: figure
clicks: 10
code: |
  <<int>> addSum() {
      int sum = 0;
      char c = getchar();
      while (c != '9') {
          sum = sum + c;
          c = getchar();
      }
      return sum;
  }
---

# addSum()：輸入 AB9

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[1, 2, 3, 4, 5, 3, 4, 5, 3, 7]" size="1.3rem">

<StepTable :head="['c', '數值', 'sum']" :rows="[[`'A'`, 65, 65], [`'B'`, 66, 131], [`'9'`, 57, '停']]" :steps="[4, 7, 9]" :bad="2" />

<p v-click="9" class="as-note"><code>'9' != '9'</code> ✗ → 離開</p>

<p v-click="10" class="as-note">回傳 <code>131</code> ✓</p>

</CodeBlock>

<style>
.as-note {
  margin-top: 0.8rem !important;
}
</style>

<!--
- 用短一點的輸入 AB9 跑一次
- 先讀第一個字元，再進迴圈
- [click:4] 讀到 'A'，不是 '9'，sum 加上 65
- [click:3] 讀到 'B'，sum 加上 66，變成 131
- [click:2] 讀到 '9'：'9' != '9' 不成立，離開迴圈，'9' 不會被加進去
- [click] 回傳 131
-->


---
layout: figure
code: |
  int addSum();

  int main(void) {
      printf("%d", addSum());
      return 0;
  }

  <<int>> addSum() {
      int sum = 0;
      char c = getchar();
      while (c != '9') {
          sum = sum + c;
          c = getchar();
      }
      return sum;
  }
---

# addSum()

::figure::

<CodeBlock :code="$frontmatter.code" size="1.05rem">

<p class="answer-badge">✓ 正解</p>

<p><code>zKmdu9</code> → <code>523</code></p>

</CodeBlock>

<!--
- 先讀一個字元，不是 '9' 就加進 sum，再讀下一個
- 一開始就讀到 '9'：迴圈一次都不跑，回傳 0
- 輸入 zKmdu9：印出 523
-->

