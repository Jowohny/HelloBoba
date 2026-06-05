<script setup lang="ts">
import { computed } from 'vue'
import type { Review } from '~/types'

const props = defineProps<{
  reviews: Review[]
}>()

const duplicated = computed(() => [...props.reviews, ...props.reviews])
</script>

<template>
  <div class="relative w-full overflow-x-clip py-4">
    <div class="flex gap-4 md:gap-6 w-fit will-change-transform">
      <ReviewCard
        v-for="(review, i) in duplicated"
        :key="`review-${i}`"
        :review="review"
      />
    </div>
  </div>
</template>
