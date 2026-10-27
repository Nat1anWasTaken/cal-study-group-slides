<script setup lang="ts">
defineProps<{
  showMath?: boolean
  parts?: boolean
}>()
</script>

<template>
  <div class="code-math" :class="{ linked: showMath && !parts, revealed: showMath || parts }">
    <pre v-if="parts" class="code"><code><span v-mark.box.red="4" class="kw">int</span> <span class="pair fn"><span v-mark.highlight.yellow="1">linear</span>(<span v-mark.circle.blue="2"><span class="kw">int</span> x</span>)</span> {
    <span v-mark.box.green="3" class="kw">return</span> <span class="pair body">2 * x + 3</span>;
}</code></pre>
    <pre v-else class="code"><code><span class="kw">int</span> <span class="pair fn">linear(<span class="kw">int</span> x)</span> {
    <span class="kw">return</span> <span class="pair body">2 * x + 3</span>;
}</code></pre>

    <div class="bridge">
      <span class="bridge-line" />
      <span class="bridge-label">等價</span>
      <span class="bridge-line" />
    </div>

    <div v-if="parts" class="math">
      <span class="pair fn"><span v-mark.highlight.yellow="1"><i>f</i></span>(<span v-mark.circle.blue="2"><i>x</i></span>)</span>
      <span class="eq">=</span>
      <span v-mark.box.green="3"><i>y</i></span>
      <span class="eq">=</span>
      <span class="pair body">2<i>x</i> + 3</span>
    </div>
    <div v-else class="math">
      <span class="pair fn"><i>f</i>(<i>x</i>)</span>
      <span class="eq">=</span>
      <i>y</i>
      <span class="eq">=</span>
      <span class="pair body">2<i>x</i> + 3</span>
    </div>

    <div class="legend">
      <template v-if="parts">
        <span v-click="1"><i class="dot yellow" /><code>linear</code> 就是 f</span>
        <span v-click="2"><i class="dot blue" /><code>int x</code> 就是 x</span>
        <span v-click="3"><i class="dot green" /><code>return</code> 就是 y</span>
        <span v-click="4"><i class="dot red" /><code>int</code> 回傳型別</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.code-math {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.code {
  margin: 0;
  padding: 1.2rem 1.8rem;
  border: 1px solid var(--google-border);
  border-radius: 0.9rem;
  background: var(--google-surface);
  box-shadow: 0 3px 12px rgba(60, 64, 67, 0.08);
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 1.4rem;
  line-height: 1.5;
  view-transition-name: code-block;
}

.kw {
  color: #a0414c;
}

.pair {
  padding: 0.05em 0.2em;
  border-radius: 0.35rem;
  transition: background-color 0.4s, box-shadow 0.4s;
}

.code .kw {
  transition: color 0.4s;
}

.bridge,
.math {
  visibility: hidden;
}

.revealed .bridge,
.revealed .math {
  visibility: visible;
}

.linked .pair.fn {
  background: #fef7e0;
  box-shadow: inset 0 -3px 0 var(--google-yellow);
}

.linked .pair.body {
  background: var(--google-blue-soft);
  box-shadow: inset 0 -3px 0 var(--google-blue);
}

.bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.bridge-line {
  width: 3px;
  height: 0.9rem;
  border-radius: 99px;
  background: var(--google-border);
}

.bridge-label {
  color: var(--google-muted);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.math {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  color: var(--google-ink);
  font-family: KaTeX_Main, 'Times New Roman', serif;
  font-size: 2.6rem;
}

.legend {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 2rem;
  color: var(--google-ink);
  font-size: 19px;
  font-weight: 500;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 99px;
}

.dot.red { background: var(--google-red); }
.dot.yellow { background: var(--google-yellow); }
.dot.blue { background: var(--google-blue); }
.dot.green { background: var(--google-green); }
</style>
