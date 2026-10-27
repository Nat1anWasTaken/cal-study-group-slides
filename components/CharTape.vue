<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// The input as a tape that getchar() reads one cell per click: click k
// reads input[k - 1] and adds its code to the sum, until the `stop` char.
// Needs `clicks: input.length` (the last click reads the stop char).
const props = withDefaults(defineProps<{
  input: string
  stop?: string
}>(), {
  stop: '9',
})

const { $clicks } = useSlideContext()

const cells = computed(() => [...props.input].map((char, i) => ({
  char,
  code: char.charCodeAt(0),
  isStop: char === props.stop,
  read: $clicks.value > i,
  current: $clicks.value === i + 1,
})))

const added = computed(() => cells.value.filter(cell => cell.read && !cell.isStop))
const sum = computed(() => added.value.reduce((total, cell) => total + cell.code, 0))
const stopped = computed(() => cells.value.some(cell => cell.read && cell.isStop))
</script>

<template>
  <div class="char-tape">
    <div class="tape">
      <div
        v-for="(cell, i) in cells"
        :key="i"
        class="cell"
        :class="{ read: cell.read, current: cell.current, stop: cell.isStop && cell.read }"
      >
        <span class="char">'{{ cell.char }}'</span>
        <span class="code">{{ cell.isStop && cell.read ? '停' : cell.code }}</span>
      </div>
    </div>

    <div class="sum">
      <span class="label">sum</span>
      <span class="terms">
        <template v-if="added.length">{{ added.map(cell => cell.code).join(' + ') }} =</template>
      </span>
      <span class="total" :class="{ done: stopped }">{{ sum }}</span>
    </div>
  </div>
</template>

<style scoped>
.char-tape {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
}

.tape {
  display: flex;
  gap: 0.6rem;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 5.2rem;
  padding: 0.8rem 0;
  border: 2px solid var(--google-border);
  border-radius: 0.8rem;
  background: var(--google-surface);
  font-family: var(--slidev-code-font-family, monospace);
  transition: border-color 0.3s, background-color 0.3s, opacity 0.3s;
}

.char {
  color: #b45309;
  font-size: 1.8rem;
}

.code {
  color: var(--google-blue-dark);
  font-size: 1.2rem;
  font-weight: 600;
  visibility: hidden;
}

.cell.read .code {
  visibility: visible;
}

.cell.read {
  opacity: 0.55;
}

.cell.current {
  border-color: var(--google-blue);
  background: var(--google-blue-soft);
  opacity: 1;
}

.cell.stop {
  border-color: var(--google-red);
  background: #fce8e6;
  opacity: 1;
}

.cell.stop .code {
  color: #c5221f;
}

.sum {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
}

.label {
  color: var(--google-muted);
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.terms {
  font-size: 1.3rem;
}

.total {
  padding: 0 0.3em;
  border-radius: 0.35rem;
  font-size: 2.4rem;
  font-weight: 700;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.total.done {
  background: #e6f4ea;
  box-shadow: inset 0 -3px 0 var(--google-green);
}
</style>
