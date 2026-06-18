<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import type { Review } from '~/types'

const props = defineProps<{
  reviews: Review[]
}>()

const duplicated = computed(() => [...props.reviews, ...props.reviews])

const trackRef = ref<HTMLElement | null>(null)
let scrollTween: gsap.core.Tween | null = null

onMounted(() => {
  if (!trackRef.value || usePrefersReducedMotion()) return
  scrollTween = gsap.to(trackRef.value, {
    xPercent: -50,
    duration: 60,
    repeat: -1,
    ease: 'none'
  })
})

const pause = () => scrollTween?.pause()
const resume = () => scrollTween?.resume()

onBeforeUnmount(() => {
  scrollTween?.kill()
  scrollTween = null
})
</script>

<template>
  <div
    class="relative w-full overflow-x-clip py-4"
    @mouseenter="pause"
    @mouseleave="resume"
    @touchstart.passive="pause"
    @touchend.passive="resume"
    @touchcancel.passive="resume"
  >
    <div ref="trackRef" class="flex gap-4 md:gap-6 w-fit will-change-transform">
      <ReviewCard
        v-for="(review, i) in duplicated"
        :key="`review-${i}`"
        :review="review"
      />
    </div>
  </div>
</template>
