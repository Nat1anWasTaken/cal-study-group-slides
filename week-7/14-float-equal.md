---
layout: section
---

# floatEqual()

---
layout: figure
clicks: 1
code: |
  float a = 0.1, b = 0.3, c = 0.2;

  if (b - c == a) {
      printf("Yes");
  } else {
      printf("No");
  }
---

# floatEqual()

::figure::

<CodeBlock :code="$frontmatter.code">

$0.3 - 0.2 = 0.1$，應該印出 <code>Yes</code>？

<p v-click="1">結果印出來的是 <code>No</code></p>

</CodeBlock>

---
layout: figure
clicks: 4
---

# floatEqual()

::figure::

<div class="fe-stored">

<table>
<thead><tr><th>你寫的</th><th>電腦實際存的</th></tr></thead>
<tbody>
<tr v-click="1"><td><code>0.1</code></td><td><code>0.1<span class="fe-err">0000000149011612</span></code></td></tr>
<tr v-click="2"><td><code>0.2</code></td><td><code>0.2<span class="fe-err">0000000298023224</span></code></td></tr>
<tr v-click="3"><td><code>0.3</code></td><td><code>0.3<span class="fe-err">0000001192092896</span></code></td></tr>
</tbody>
</table>

<v-click at="4">

電腦用二進位存小數，存不下剛好的 $0.1$，只能存**最接近的近似值**<br>每個數一存進去，就已經差了一點點

</v-click>

</div>

<style>
.fe-stored {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.fe-stored table {
  width: auto;
  margin: 0;
  font-size: 26px;
}

.fe-stored th {
  font-size: 17px;
}

.fe-stored td code {
  font-size: 1.1em;
}

.fe-stored .fe-err {
  color: #c5221f;
}

.fe-stored p {
  margin: 0;
  font-size: 22px;
}
</style>

---
layout: figure
clicks: 3
expr: |
  [[3:[[1:b - c|0.10000000894069672]] == [[2:a|0.10000000149011612]]|false]]
---

# floatEqual()

::figure::

<CodeExpr :expr="$frontmatter.expr" size="1.9rem">

<v-click at="1">

拿兩個近似值去減，算出來也不是剛好的 $0.1$

</v-click>

<p v-click="3">差一點點，<code>==</code> 就是 <code class="type">false</code></p>

</CodeExpr>

---
layout: figure
clicks: 2
---

# floatEqual()

::figure::

<NumberLine :num1="0.7" :num2="0" :delta="1.2" />

---
layout: figure
clicks: 2
---

# floatEqual()

::figure::

<NumberLine :num1="2.2" :num2="0" :delta="1.2" />

---
layout: figure
code: |
  float diff = num1 - num2;
  if (diff < 0) {
      diff = -diff;
  }
---

# floatEqual()

::figure::

<CodeBlock :code="$frontmatter.code">

$|\,\text{num1} - \text{num2}\,| \le \text{delta}$ 就當成相等

<p>C 沒有 <code>| |</code> 這種寫法：負的就自己變號</p>

</CodeBlock>

---
layout: figure
transition: view-transition
clicks: 11
code: |
  ^^fn:<<bool>> floatEqual(float num1, float num2, float delta) {
      float diff = [[5:num1 - num2|-1]];
      if ([[6:diff < 0|true]]) {
          diff = [[7:-diff|1]];
      }
      return [[9:[[8:diff <= delta|1 <= 0.5]]|false]];
  }^^

  ^^main:int main(void) {
      float a, b, c, d, delta;
      scanf("%f%f%f%f%f", &a, &b, &c, &d, &delta);
      a = [[2:a - b|-1]];
      c = [[3:c - d|0]];
      if ([[10:floatEqual([[4:a, c, delta|-1, 0, 0.5]])|false]]) printf("==");
      else printf("!=");
  }^^
---

# floatEqual()：輸入 1 2 0 0 0.5

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[10, 11, 12, 13, 1, 2, 3, 5, 5, 13, 14]" size="0.9rem">

<p v-click="3"><code>a</code> 是 <code>-1</code>，<code>c</code> 是 <code>0</code></p>

<p v-click="7"><code>diff</code> 是負的：變號成 <code>1</code></p>

<v-click at="9">

$1 > 0.5$：差太多，回傳 <code class="type">false</code>

</v-click>

<p v-click="11">走 <code>else</code>，印出 <code>!=</code> ✓</p>

</CodeBlock>

---
layout: figure
transition: view-transition
clicks: 9
code: |
  ^^fn:<<bool>> floatEqual(float num1, float num2, float delta) {
      float diff = [[5:num1 - num2|0.0000000075]];
      if ([[6:diff < 0|false]]) {
          diff = -diff;
      }
      return [[8:[[7:diff <= delta|0.0000000075 <= 0.00001]]|true]];
  }^^

  ^^main:int main(void) {
      float a, b, c, d, delta;
      scanf("%f%f%f%f%f", &a, &b, &c, &d, &delta);
      a = [[2:a - b|0.1000000089]];
      c = [[3:c - d|0.1000000015]];
      if ([[9:floatEqual(a, c, delta)|true]]) printf("==");
      else printf("!=");
  }^^
---

# floatEqual()：輸入 0.3 0.2 0.1 0 0.00001

::figure::

<CodeBlock :code="$frontmatter.code" :trace="[10, 11, 12, 13, 1, 2, 5, 5, 13]" size="0.9rem">

<v-click at="1">

開頭那題：$0.3 - 0.2$ 跟 $0.1$

</v-click>

<p v-click="3">差一點點，<code>==</code> 會是 <code class="type">false</code></p>

<p v-click="6"><code>diff</code> 不是負的，不用變號</p>

<p v-click="8">差不到 <code>0.00001</code>：回傳 <code class="type">true</code></p>

<p v-click="9">印出 <code>==</code> ✓</p>

</CodeBlock>

---
layout: figure
transition: view-transition
code: |
  ^^fn:<<bool>> floatEqual(float num1, float num2, float delta) {
      float diff = num1 - num2;
      if (diff < 0) {
          diff = -diff;
      }
      return @@diff <= delta@@;
  }^^
---

# floatEqual()

::figure::

<CodeBlock :code="$frontmatter.code" size="0.9rem">

<p class="answer-badge">✓ 正解</p>

先算差，負的就變號：得到 $|\,\text{num1} - \text{num2}\,|$

<p>差不超過 <code>delta</code> 就回傳 <code class="type">true</code></p>

<p><code>main</code> 題目給了，只要補這個 function</p>

</CodeBlock>
