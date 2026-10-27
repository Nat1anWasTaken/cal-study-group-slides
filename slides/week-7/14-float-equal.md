---
layout: section
---

# floatEqual()

<!--
- 最後一題：判斷兩個小數是不是「相等」
- 先看一個看起來很簡單的例子
-->

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

$0.3 - 0.2 = 0.1$ → <code>Yes</code>？

<p v-click="1">→ <code>No</code> ✗</p>

</CodeBlock>

<!--
- 0.3 - 0.2 = 0.1，大家覺得會印出什麼？應該是 Yes 吧
- [click] 結果印出來的是 No
- 為什麼？要先看電腦到底存了什麼
-->


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

存的是**近似值**

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

<!--
- 左邊是你寫的，右邊是電腦實際存的
- [click] 0.1 存進去變成 0.10000000149…
- [click] 0.2 也是
- [click] 0.3 也是，紅色的部分就是誤差
- [click] 電腦用二進位存小數，存不下剛好的 0.1，只能存最接近的近似值
- 每個數一存進去，就已經差了一點點
-->


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

近似值 − 近似值 ≠ $0.1$

</v-click>

<p v-click="3">差一點點 → <code class="type">false</code></p>

</CodeExpr>

<!--
- 回到開頭的 b - c == a
- [click] 拿兩個近似值去減，算出來也不是剛好的 0.1
- [click] a 本身也是近似值，兩邊差在很後面的位數
- [click] 只差一點點，== 就是 false，所以印出 No
- 所以小數不能直接用 == 比
-->


---
layout: figure
clicks: 2
---

# floatEqual()

::figure::

<NumberLine :num1="0.7" :num2="0" :delta="1.2" />

<!--
- 那要怎麼比？不要求剛好一樣，而是「夠接近」就好
- [click] 以 num2 為中心，左右各留 delta 的範圍
- [click] num1 落在範圍裡面：差距不超過 delta，就當成相等
-->

---
layout: figure
clicks: 2
---

# floatEqual()

::figure::

<NumberLine :num1="2.2" :num2="0" :delta="1.2" />

<!--
- 換一個離比較遠的 num1
- [click] 一樣的範圍
- [click] num1 跑到範圍外面：差距超過 delta，不相等
-->

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

$|\,\text{num1} - \text{num2}\,| \le \text{delta}$

<p>負的 → 變號</p>

</CodeBlock>

<!--
- 剛剛的圖寫成式子：| num1 - num2 | ≤ delta 就當成相等
- 可是 C 沒有 | | 這種寫法
- 所以先算差，負的就自己變號，得到絕對值
-->


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

<p v-click="3"><code>a</code> = <code>-1</code>，<code>c</code> = <code>0</code></p>

<p v-click="7"><code>diff</code>：<code>-1</code> → <code>1</code></p>

<v-click at="9">

$1 > 0.5$ → <code class="type">false</code>

</v-click>

<p v-click="11"><code>!=</code> ✓</p>

</CodeBlock>

<!--
- 用題目的範例跑一次：輸入 1 2 0 0 0.5
- [click:2] main 先算 a = a - b，變成 -1
- [click] c = c - d，變成 0
- [click] 呼叫 floatEqual(-1, 0, 0.5)
- [click] 進到 function，diff = -1 - 0 = -1
- [click] diff < 0 成立
- [click] 變號，diff 變成 1
- [click] 1 <= 0.5？
- [click] 差太多，回傳 false
- [click] 回到 main
- [click] 走 else，印出 !=
-->


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

$0.3 - 0.2$ vs $0.1$

</v-click>

<p v-click="3"><code>==</code> → <code class="type">false</code></p>

<p v-click="6">不用變號</p>

<p v-click="8"><code>diff</code> ≤ <code>0.00001</code> → <code class="type">true</code></p>

<p v-click="9"><code>==</code> ✓</p>

</CodeBlock>

<!--
- 再拿開頭那題來跑：輸入 0.3 0.2 0.1 0 0.00001
- [click] 其實就是在比 0.3 - 0.2 跟 0.1
- [click] a = 0.3 - 0.2，存的是近似值
- [click] c = 0.1 - 0，也是近似值；如果直接用 ==，這裡會是 false
- [click] 呼叫 floatEqual
- [click] diff 只有 0.0000000075 左右
- [click] diff 不是負的，不用變號
- [click] 0.0000000075 <= 0.00001？
- [click] 差不到 0.00001，回傳 true
- [click] 印出 ==：留一點誤差，就能把它們當成相等
-->


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

<p>差 ≤ <code>delta</code> → <code class="type">true</code></p>

</CodeBlock>

<!--
- 先算差，負的就變號：得到 | num1 - num2 |
- 差不超過 delta 就回傳 true，否則 false
- main 題目已經給了，只要補這個 function
-->

