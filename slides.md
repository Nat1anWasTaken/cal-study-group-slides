---
theme: ./theme
title: cal-study-group
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
layout: cover 
---

# Week 6: Functions

---
layout: figure
transition: view-transition
---

# Functions

::figure::

<div class="fn-hero">

<span class="vt-fx">$f($<span class="vt-x">$x$</span>$)$</span> <span class="vt-rhs">$= ax + b$</span>

</div>

<v-click>

<div class="fn-grid">

- $f(x) = x^2$
- $f(x) = \sqrt{x}$
- $f(x) = |x|$
- $f(x) = 2^x$
- $f(x) = \sin x$
- $f(x) = \log x$
- $f(x) = \frac{1}{x}$
- $f(x) = x^3 - x$

</div>

</v-click>

<style>
.fn-hero {
  font-size: 2.6rem;
  color: var(--google-ink);
}

.vt-fx,
.vt-rhs {
  display: inline-block;
}

.vt-fx {
  view-transition-name: fx;
}

.vt-x {
  display: inline-block;
  view-transition-name: fx-x;
}

.vt-rhs {
  view-transition-name: fx-rhs;
}

.fn-grid ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem 2.4rem;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
  font-size: 1.25rem;
  color: var(--google-muted);
}
</style>

---
layout: statement
transition: view-transition
---

# <span class="vt-fx">$f($<span class="vt-x">$x$</span>$)$</span> <span class="vt-rhs">$= ax + b$</span> *$=$ <span class="vt-y">$y$</span>*

<style>
.vt-fx,
.vt-rhs,
.vt-y {
  display: inline-block;
}

.vt-fx {
  view-transition-name: fx;
}

.vt-x {
  display: inline-block;
  view-transition-name: fx-x;
}

.vt-rhs {
  view-transition-name: fx-rhs;
}

.vt-y {
  view-transition-name: fx-y;
}
</style>

---
layout: figure
---

# Functions

::figure::

<FunctionMachine
  example-input="x = 2"
  example-work="2 · 2 + 3"
  example-output="y = 7"
/>

---
layout: figure
---

# Functions

::figure::

<CodeMath />

---
layout: figure
---

# Functions

::figure::

<CodeMath show-math />

---
layout: figure
transition: view-transition
---

# Functions

::figure::

<CodeMath parts />

---
layout: figure
transition: view-transition
main: |
  int y = linear(5);
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main">

<div v-click class="answer">13</div>

</CodeCall>

<style>
.answer {
  color: var(--google-blue);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
}
</style>

---
layout: figure
transition: view-transition
clicks: 1
main: |
  int y = [[linear(5)|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
main: |
  int y = {{13}};
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 1
main: |
  if ([[linear(5)|13]] > 10) {
      printf("big\n");
  }
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 1
main: |
  printf("%d\n", [[linear(5)|13]]);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int z = [[2:[[1:linear(5)|13]] * 2|26]];
  printf("%d\n", z);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
transition: view-transition
clicks: 2
main: |
  int y = [[2:linear([[1:linear(1)|5]])|13]];
  printf("%d\n", y);
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: figure
clicks: 1
main: |
  for (int i = 0; i < [[linear(1)|5]]; i++) {
      printf("%d\n", i);
  }
---

# Functions

::figure::

<CodeCall :main="$frontmatter.main" dim />

---
layout: statement
---

# function call 在哪裡，*return 的值就放在哪裡*
