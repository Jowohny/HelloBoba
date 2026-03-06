<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

const bobas = Array.from({ length: 60 }).map((_, i) => {
  const sizeClass = ['w-3 h-3', 'w-5 h-5', 'w-8 h-8', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'][i % 5];
  
  const leftPos = (i * 13) % 100; 
  
  let depthClass = 'opacity-90 z-20 blur-[0.9px]';
  if (i % 3 === 0) depthClass = 'blur-[3px] opacity-40 z-0';
  if (i % 4 === 0) depthClass = 'blur-[1px] opacity-70 z-10'; 

  return {
    id: i,
    size: sizeClass,
    left: `${leftPos}%`,
    depth: depthClass
  };
});

onMounted(() => {
  const bobaElements = gsap.utils.toArray('.boba-pearl');

  bobaElements.forEach((boba: any) => {
    const speed = gsap.utils.random(5, 15);    
    const drift = gsap.utils.random(-40, 40);
    
    const startDelay = gsap.utils.random(-speed, 0); 

    gsap.fromTo(boba, {
      y: '-15vh',
      x: 0,
      rotation: gsap.utils.random(0, 360)
    }, {
      y: '115vh',
      x: drift,
      rotation: gsap.utils.random(-180, 180),
      duration: speed,
      repeat: -1,
      ease: 'none',
      delay: startDelay
    });
  });
});
</script>

<template>
  <div class="min-h-screen px-6 relative z-10 overflow-hidden bg-gradient-to-b from-[#18ffe7]/40 to-[#fa1d1c]/30">
    
    <div class="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div
        v-for="boba in bobas"
        :key="boba.id"
        class="boba-pearl absolute top-0 rounded-full bg-[#1a1311]"
        :class="[boba.size, boba.depth]"
        :style="{ left: boba.left }"
      ></div>
    </div>
  </div>
</template>