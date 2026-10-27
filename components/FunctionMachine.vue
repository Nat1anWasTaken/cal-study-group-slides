<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { h } from 'vue'

// Typesets a short expression like "f(x)" or "y = 7" in the KaTeX fonts:
// letters as italic variables, everything else upright.
const MathText: FunctionalComponent<{ text: string }> = props =>
  h('span', { class: 'math' }, props.text.split(/([a-z]+)/).filter(Boolean).map(part =>
    /^[a-z]+$/.test(part) ? h('span', { class: 'mi' }, part) : h('span', { class: 'mn' }, part)))

withDefaults(defineProps<{
  input?: string
  name?: string
  caption?: string
  output?: string
  exampleInput?: string
  exampleWork?: string
  exampleOutput?: string
}>(), {
  input: 'x',
  name: 'f(x)',
  caption: 'function',
  output: 'y',
})
</script>

<template>
  <div class="machine">
    <div class="end">
      <div class="end-label">輸入</div>
      <div class="chip in"><MathText class="vt-x" :text="input" /></div>
    </div>

    <div class="pipe">
      <span class="packet" />
    </div>

    <div class="box">
      <div class="box-name"><MathText class="vt-fx" :text="name" /></div>
      <div class="box-caption">{{ caption }}</div>
    </div>

    <div class="pipe">
      <span class="packet late" />
    </div>

    <div class="end">
      <div class="end-label">輸出</div>
      <div class="chip out"><MathText class="vt-y" :text="output" /></div>
    </div>

    <template v-if="exampleInput">
      <div v-click="1" class="example"><MathText :text="exampleInput" /></div>
      <div />
      <div v-click="2" class="example"><MathText :text="exampleWork!" /></div>
      <div />
      <div v-click="3" class="example out"><MathText :text="exampleOutput!" /></div>
    </template>
  </div>
</template>

<style scoped>
.machine {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
  align-items: center;
  row-gap: 1.4rem;
  width: 100%;
}

.end {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.end-label {
  color: var(--google-muted);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.chip {
  display: grid;
  width: 6.5rem;
  height: 6.5rem;
  place-items: center;
  border-radius: 50%;
  color: white;
  font-size: 2.8rem;
  font-weight: 700;
}

.chip.in {
  background: var(--google-blue);
}

.chip.out {
  background: var(--google-green);
}

.pipe {
  position: relative;
  height: 6px;
  margin: 1.9rem 0.9rem 0 0.9rem;
  border-radius: 99px;
  background: var(--google-border);
}

.pipe::after {
  position: absolute;
  top: 50%;
  right: -4px;
  width: 18px;
  height: 18px;
  border-top: 6px solid var(--google-border);
  border-right: 6px solid var(--google-border);
  content: '';
  transform: translateY(-50%) rotate(45deg);
}

.packet {
  position: absolute;
  top: 50%;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--google-blue);
  transform: translate(-50%, -50%);
  animation: flow 2.4s ease-in-out infinite;
}

.packet.late {
  background: var(--google-green);
  animation-delay: 1.2s;
}

@keyframes flow {
  0% { left: 0; opacity: 0; }
  15% { opacity: 1; }
  45% { left: 100%; opacity: 1; }
  55%, 100% { left: 100%; opacity: 0; }
}

.box {
  margin-top: 1.9rem;
  padding: 1.6rem 2.4rem;
  border: 3px solid var(--google-yellow);
  border-radius: 1.2rem;
  background: #fef7e0;
  box-shadow: var(--google-shadow);
  text-align: center;
}

.box-name {
  color: var(--google-ink);
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.1;
}

.box-caption {
  margin-top: 0.4rem;
  color: var(--google-muted);
  font-size: 20px;
  font-weight: 500;
}

.example {
  color: var(--google-blue-dark);
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.example.out {
  color: var(--google-green-dark);
}

.machine :deep(.math) {
  display: inline-block;
  font-family: KaTeX_Main, 'Times New Roman', serif;
  font-weight: 400;
  white-space: pre;
}

.machine :deep(.mi) {
  font-family: KaTeX_Math, 'Times New Roman', serif;
  font-style: italic;
}

.vt-fx {
  view-transition-name: fx;
}

.vt-x {
  view-transition-name: fx-x;
}

.vt-y {
  view-transition-name: fx-y;
}
</style>
