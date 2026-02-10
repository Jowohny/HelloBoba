<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroImage = ref(null);
const textContent = ref(null);
const logoRef = ref(null);

const hasPlayedIntro = useState('playedIntro', () => false);

onMounted(() => {

  const startFloating = () => {
    gsap.to(logoRef.value, {
      y: -15,       
      duration: 2,  
      repeat: -1,   
      yoyo: true,  
      ease: "sine.inOut" 
    });
  };

  if (!hasPlayedIntro.value) {

    const tl = gsap.timeline({ 
      delay: 3.8,
      onStart: () => { hasPlayedIntro.value = true; } 
    });

    tl.from(heroImage.value, {
      scale: 1.15,
      filter: 'blur(20px)',
      duration: 2.5,
      ease: "expo.out"
    });

    tl.from(textContent.value, {
      y: 20,
      autoAlpha: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.out"
    }, "-=1.5");

    tl.from(logoRef.value, {
      scale: 0.8,
      autoAlpha: 0, 
      duration: 1,
      ease: "back.out(1.7)"
    }, "<"); 

    tl.add(startFloating, "-=1");

  } else {

    startFloating();
  }
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

    <div ref="textContent" class="relative z-10 text-center px-4 pb-32 mb-10 max-w-2xl">

			<div ref="logoRef" class="recolor-logo h-[25vw] w-[30vw]">
				<NuxtPicture
					class="h-full w-full object-cover"
					src="/HelloBobaLogo.png"
					:img-attrs="{ class: 'h-full w-full object-cover' }"
				/>
			</div>

      <div class="inline-block px-4 py-1.5 mb-6 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-xl">
        <span class="text-green-400 font-bold tracking-wide text-sm uppercase">El Monte • Established 2020</span>
      </div>
      
      <h2 class="text-white/80 font-light text-2xl tracking-tight mb-4">
        Crafting <span class="font-black text-green-500 italic">the perfect</span> sip.
      </h2>
      
      <p class="text-zinc-300 text-sm leading-relaxed italic">
        Temporary caption for now because I don't know what to put, <br>
				hopefully something along the length of this.
      </p>
    </div>
  </div>
</template>

<style scoped>
.recolor-logo {
  filter: invert(80%) sepia(160%) saturate(500%) hue-rotate(105deg) brightness(80%) contrast(130%);
}
</style>