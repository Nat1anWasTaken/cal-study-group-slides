---
layout: section
---

# addSum()

---
layout: figure
clicks: 2
expr: |
  [[2:[[1:'A'|65]] + [[1:'B'|66]]|131]]
---

# addSum()

::figure::

<CodeExpr :expr="$frontmatter.expr">

<p v-click="1">每個字元背後都是一個數字（ASCII）</p>

<p v-click="2">所以字元可以直接拿來加</p>

</CodeExpr>

---
layout: figure
clicks: 6
---

# addSum()

::figure::

<CharTape input="zKmdu9" />

<p class="tape-note"><code>getchar()</code> 一次讀一個字元，讀到 <code>'9'</code> 就停</p>

<style>
.google-figure > .tape-note {
  margin-top: 2rem;
  color: var(--google-ink);
  font-size: 22px;
  text-align: center;
}
</style>

---
layout: figure
clicks: 2
expr: |
  [[2:[[1:'9'|57]] == 9|false]]
---

# addSum()

::figure::

<CodeExpr :expr="$frontmatter.expr">

<p v-click="1">注意：<code>'9'</code> 是字元，它的值是 <code>57</code></p>

<p v-click="2">所以要跟 <code>'9'</code> 比，不是跟 <code>9</code> 比</p>

</CodeExpr>

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

<p><code>addSum()</code> 沒有參數，資料不是從參數傳進來</p>

<p>而是它自己用 <code>getchar()</code> 從輸入讀</p>

</CodeBlock>

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

<p v-click="9" class="as-note"><code>'9' != '9'</code> 不成立，離開迴圈</p>

<p v-click="10" class="as-note">回傳 <code>131</code> ✓</p>

</CodeBlock>

<style>
.as-note {
  margin-top: 0.8rem !important;
}
</style>

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

<p>先讀一個字元，不是 <code>'9'</code> 就加進 <code>sum</code>，再讀下一個</p>

<p>一開始就讀到 <code>'9'</code>：迴圈不跑，回傳 <code>0</code></p>

<p>輸入 <code>zKmdu9</code>：印出 <code>523</code></p>

</CodeBlock>
