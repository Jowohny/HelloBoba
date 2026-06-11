<script setup lang="ts">
import type { Review } from '~/types'

defineProps<{
  review: Review
}>()
</script>

<template>
  <a
    :href="review.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex flex-col w-[380px] md:w-[480px] shrink-0 bg-white/95 rounded-2xl p-5 shadow-xl shadow-black/10 border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
  >
    <div class="flex items-center gap-3 mb-3 shrink-0">
      <img
        :src="review.pfp"
        :alt="`${review.name} profile picture`"
        loading="lazy"
        referrerpolicy="no-referrer"
        class="w-10 h-10 rounded-full object-cover border-2 border-green-200 shrink-0"
      />
      <h3 class="font-black font-sans text-lg text-zinc-900 tracking-tight truncate">
        {{ review.name }}
      </h3>
			<div class="ml-auto mr-4 flex flex-row justify-center content-center gap-1">
				<span class="sr-only">Rated 5 out of 5 stars</span>
				<img v-for="i in 5" class="h-6 w-6 object-contain" :key="i" src="/star.svg" alt="" aria-hidden="true">
			</div>
    </div>

    <div class="relative">
      <p 
				class="text-md text-zinc-600 font-medium leading-relaxed"
				:class= "[review.images.length ? 'line-clamp-4' : 'line-clamp-[8]']"
			>
        {{ review.message }}
      </p>
      <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/20 to-transparent" aria-hidden="true" />
    </div>

    <div class="mt-auto">
			<div v-if="review.images.length" class="flex gap-2 mt-4 shrink-0">
				<img
					v-for="(image, i) in review.images.slice(0, 3)"
					:key="i"
					:src="image"
					:alt="`Review image ${i + 1} from ${review.name}`"
					loading="lazy"
					referrerpolicy="no-referrer"
					class="w-[30%] h-auto rounded-lg object-cover border border-zinc-200/60"
				/>
			</div>
			<span class="mt-4 text-[10px] font-black tracking-widest uppercase text-green-700 opacity-70 group-hover:opacity-100 transition-opacity">
				Read on Google &rarr;
			</span>
		</div>
  </a>
</template>
