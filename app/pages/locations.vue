<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  gsap.to('.text-1', { 
    xPercent: -50, 
    duration: 50, 
    repeat: -1, 
    ease: 'none' 
  });
  
	gsap.set('.text-2', { xPercent: -50 })
  gsap.to('.text-2', { 
    xPercent: 0, 
    duration: 50, 
    repeat: -1, 
    ease: 'none' 
  });

  gsap.to('.path-1', { 
    strokeDashoffset: -60, 
    duration: 1.5, 
    repeat: -1, 
    ease: 'none' 
  });
  
  gsap.to('.path-2', { 
    strokeDashoffset: 60,
    duration: 2, 
    repeat: -1, 
    ease: 'none' 
  });

	gsap.to('.path-3', { 
    strokeDashoffset: -60, 
    duration: 2.5, 
    repeat: -1, 
    ease: 'none' 
  });

	gsap.to('.path-4', { 
    strokeDashoffset: 60,
    duration: 2, 
    repeat: -1, 
    ease: 'none' 
  });

  gsap.to('.pin-1', {
    y: -40,
    rotation: -10,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  gsap.to('.pin-2', {
    y: 30,
    rotation: 15,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    delay: 1
  });
});
</script>

<template>
  <div class="min-h-screen pt-40 pb-24 px-6 relative z-10 overflow-hidden bg-[#f6f6f6]">
    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden flex flex-col justify-center">
      <div class="absolute inset-0 flex flex-col justify-center gap-16 opacity-[0.06] blur-[1.5px] scale-110 -rotate-[2deg]">
        <div class="text-1 flex whitespace-nowrap text-[12vw] font-black font-sans text-green-900 tracking-tighter uppercase">
          <span v-for="n in 4" :key="'l'+n" class="px-8">Garvey Ave • El Monte •</span>
        </div>
        <div class="text-2 flex whitespace-nowrap text-[12vw] font-black font-sans text-green-900 tracking-tighter uppercase">
          <span v-for="n in 4" :key="'r'+n" class="px-8">Peck Road • El Monte •</span>
        </div>
      </div>
      <div class="pin-1 absolute top-[10%] left-[10%] w-[30vw] max-w-sm opacity-[0.04] filter blur-[1.5px]">
        <NuxtPicture src="/locationpointer.png" class="w-full h-auto object-contain" />
      </div>
      <div class="pin-2 absolute bottom-[5%] right-[5%] w-[40vw] max-w-lg opacity-[0.04] filter blur-[2px]">
        <NuxtPicture src="/locationpointer.png" class="w-full h-auto object-contain" />
      </div>

      <svg class="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 1440 800">
        <path 
          class="path-1" 
          d="M-100,600 C200,600 300,200 600,300 C900,400 1000,100 1500,200" 
          fill="none" 
          stroke="#65a30d" 
          stroke-width="4" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
        <path 
          class="path-2" 
          d="M-100,200 C300,100 400,700 800,600 C1200,500 1300,300 1500,400" 
          fill="none" 
          stroke="#84cc16" 
          stroke-width="6" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
				<path 
          class="path-3" 
          d="M-100,400 C200,800 500,0 800,400 C1100,800 1300,100 1500,300" 
          fill="none" 
          stroke="#a3e635" 
          stroke-width="3" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
				<path 
          class="path-4" 
          d="M-100,600 C400,600 900,800 1100,500 C1300,200 900,100 900,400 C900,700 1300,700 1600,400" 
          fill="none" 
          stroke="#bef264" 
          stroke-width="7" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>