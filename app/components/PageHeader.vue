<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="text-center mb-10 md:mb-16 opacity-0">
    <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm">
      {{ eyebrow }}
    </span>
    <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-5xl md:text-8xl tracking-tighter font-black font-sans pb-2">
      {{ title }}
    </h1>
    <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto text-sm md:text-base whitespace-pre-line">
      {{ description }}
    </p>
  </div>
</template>
