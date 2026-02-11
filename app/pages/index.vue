<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroImage = ref(null);
const textContent = ref(null);
const logoRef = ref(null);
const bannerRef = ref(null);
const bannerTextRef = ref(null);

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

		document.body.style.overflow = 'hidden';

    const timeline = gsap.timeline({ 
      delay: 3.8,
      onStart: () => { hasPlayedIntro.value = true; }
    });

    timeline.from(heroImage.value, {
      scale: 1.15,
      filter: 'blur(20px)',
      duration: 2.5,
      ease: "expo.out"
    });

    timeline.from(textContent.value, {
      y: 20,
      autoAlpha: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.out"
    }, "-=1.5");

    timeline.from(logoRef.value, {
      scale: 0.8,
      autoAlpha: 0, 
      duration: 1,
      ease: "back.out(1.7)",
			onComplete: () => {
				document.body.style.overflow = '';
			}
    }, "<"); 

    timeline.add(startFloating, "-=1");

		timeline.from(bannerRef.value, {
			y: -40,
			duration: 1.5,
			ease: 'elastic.out(1,0.5)',
			autoAlpha: 0,
			filter: 'blur(10px)'
		}, '-=1');

		timeline.from(bannerTextRef.value, {
			duration: 2,
			ease: 'sine.out',
			autoAlpha: 0
		}, '<')
		.to(bannerTextRef.value, {
			repeat: -1,
			xPercent: -50,
			duration: 25,
			ease: 'none'
		}, '<')

  } else {

    startFloating();
  }
});

onUnmounted(() => {
	document.body.style.overflow = '';
})
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

	<div ref="bannerRef" class="relative w-full z-30 -mt-24 overflow-hidden py-16 pointer-events-none">
		<div class="bg-[#3f6212] py-4 border-y-4 border-[#a3e635] w-full rotate-2 scale-110 shadow-2xl relative flex items-center justify-center">
			<div ref="bannerTextRef" class="whitespace-nowrap translate-x-1/4 flex gap-4 text-[#ecfccb] text-4xl font-[900] uppercase italic tracking-tighter">
				<span v-for="n in 10" :key="n">
					boba comes free with any drink &nbsp;•
				</span>
			</div>

		</div>
	</div>

</template>

<style scoped>
.recolor-logo {
  filter: invert(80%) sepia(160%) saturate(500%) hue-rotate(105deg) brightness(90%) contrast(130%) opacity(80%);
}
</style>