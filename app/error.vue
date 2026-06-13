<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)

const headline = computed(() =>
  is404.value ? 'Looks like this cup is empty.' : 'Something went wrong on our end.'
)

const subline = computed(() =>
  is404.value
    ? "The page you're looking for doesn't exist — maybe it got slurped up."
    : 'An unexpected error occurred. Heading back home usually fixes it.'
)

useHead({
  title: is404.value ? 'Page Not Found — Hello Boba' : 'Something Went Wrong — Hello Boba'
})

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-white to-green-50">
      <div class="relative z-10 text-center max-w-2xl pt-24 pb-16">
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-[9rem] md:text-[13rem] leading-none tracking-tight font-black font-sans">
          {{ error?.statusCode || 500 }}
        </h1>
        <p class="text-2xl md:text-3xl font-black font-sans text-zinc-900 tracking-tight mb-3">
          {{ headline }}
        </p>
        <p class="text-zinc-500 font-semibold mb-10">
          {{ subline }}
        </p>
        <button
          type="button"
          class="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg shadow-green-700/40 text-white font-sans font-black text-lg md:text-xl tracking-tight cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          @click="goHome"
        >
          Back to Home
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>