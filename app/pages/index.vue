<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroImage = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ delay: 3.8 });

  tl.from(heroImage.value, {
    scale: 1.15,
    filter: 'blur(20px)',
    duration: 2.5,
    ease: "expo.out"
  });
});
</script>

<template>
  <div class="relative h-screen w-full flex items-end justify-center overflow-hidden bg-zinc-950">
    <div ref="heroImage" class="absolute inset-0 z-0">
      <NuxtPicture 
        src="/HelloHero.png" 
        class="h-full w-full object-cover"
        :img-attrs="{ class: 'h-full w-full object-cover opacity-70' }"
      />
    </div>
  </div>
</template>