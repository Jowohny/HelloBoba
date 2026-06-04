<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import gsap from 'gsap';
import { topDrinks } from '~/data/topDrinks';

useSeoMeta({
  title: 'Hello Boba — El Monte',
  description: 'Crafting the perfect sip. Boba, milk tea, smoothies, and more in El Monte, CA.'
});

const heroImage = ref<HTMLElement | null>(null);
const textContent = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const bannerRef = ref<HTMLElement | null>(null);
const bannerTextRef = ref<HTMLElement | null>(null);

const hasPlayedIntro = useState('playedIntro', () => false);
const heroIntroPlayed = useState('homeHeroIntroPlayed', () => false);

let heroTimeline: gsap.core.Timeline | null = null;
let logoFloatTween: gsap.core.Tween | null = null;
let bannerScrollTween: gsap.core.Tween | null = null;

const startFloating = () => {
	logoFloatTween = gsap.to(logoRef.value, {
		y: -15,
		duration: 2,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut'
	});
};

const startBanner = () => {
	bannerScrollTween = gsap.to(bannerTextRef.value, {
		repeat: -1,
		xPercent: -50,
		duration: 25,
		ease: 'none'
	});
};

useIntroSequence((timeline) => {
	heroTimeline = timeline
	const isFirstPaint = !heroIntroPlayed.value
	heroIntroPlayed.value = true

	if (isFirstPaint) {
		document.body.style.overflow = 'hidden'
	}

	timeline.fromTo(heroImage.value, {
		scale: 1.2,
		autoAlpha: 0,
		filter: 'blur(20px)'
	}, {
		scale: 1,
		autoAlpha: 1,
		filter: 'blur(0px)',
		duration: 2.5,
		ease: 'expo.out'
	});

	timeline.fromTo(textContent.value, {
		y: 20,
		autoAlpha: 0
	}, {
		y: 0,
		autoAlpha: 1,
		duration: 1.5,
		stagger: 0.3,
		ease: 'power2.out'
	}, '-=1.5');

	timeline.fromTo(logoRef.value, {
		scale: 0.8,
		autoAlpha: 0
	}, {
		scale: 1,
		autoAlpha: 1,
		duration: 1,
		ease: 'back.out(1.7)',
		onComplete: () => {
			document.body.style.overflow = '';
		}
	}, '<');

	timeline.add(startFloating, '-=1');

	timeline.fromTo(['.top-banner-bar', '.bottom-banner-bar', bannerRef.value], {
		y: -40,
		autoAlpha: 0,
		filter: 'blur(10px)'
	}, {
		y: 0,
		duration: 1.5,
		ease: 'elastic.out(1,0.5)',
		autoAlpha: 1,
		filter: 'blur(0px)'
	}, '-=1');

	timeline.fromTo(bannerTextRef.value, {
		autoAlpha: 0
	}, {
		duration: 2,
		ease: 'sine.out',
		autoAlpha: 1
	}, '<')
	.to(bannerTextRef.value, {
		repeat: -1,
		xPercent: -50,
		duration: 25,
		ease: 'none'
	}, '<');

	timeline.add(startBanner, '<');
});

onBeforeUnmount(() => {
	document.body.style.overflow = '';
	heroTimeline?.kill();
	logoFloatTween?.kill();
	bannerScrollTween?.kill();
});

</script>

<template>
  <div class="relative h-[100svh] pt-40 md:h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 z-40">
    <div ref="heroImage" class="absolute inset-0 z-0 scale-[1.2] blur-[20px]" aria-hidden="true">
      <NuxtPicture
        src="/HelloHero.png"
        class="h-full w-full object-cover"
        :img-attrs="{ class: 'h-full w-full object-cover opacity-70', alt: '' }"
      />
    </div>

    <div ref="textContent" class="relative z-10 text-center px-4 pb-20 md:pb-32 mb-10 max-w-4xl opacity-0">
      <div ref="logoRef" class="recolor-logo h-[45vw] w-[50vw] md:h-[25vw] md:w-[30vw] mx-auto">
        <NuxtPicture
          class="h-full w-full"
          src="/HelloBobaLogo.png"
          :img-attrs="{ class: 'h-full w-full object-cover', alt: 'Hello Boba' }"
        />
      </div>

      <div class="inline-block px-4 py-1.5 mb-6 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-xl">
        <span class="text-green-400 font-bold tracking-wide text-xs md:text-sm uppercase">El Monte • Established 2020</span>
      </div>
      
      <h2 class="text-white/80 font-light text-xl md:text-2xl tracking-tight mb-4">
        Crafting <span class="font-black text-green-500 italic">the perfect</span> sip.
      </h2>
      
      <p class="text-zinc-300 text-xs md:text-sm leading-relaxed italic">
        Temporary caption for now because I don't know what to put, <br class="hidden md:block">
        hopefully something along the length of this.
      </p>
    </div>

		<WaveDivider class="top-banner-bar absolute -scale-x-100 -scale-y-[0.5] bottom-0 left-0 w-full text-[#a3e635] fill-current h-16 md:h-32 z-0 rotate-[2.5deg] opacity-0" />
  </div>

  <div ref="bannerRef" class="relative w-full -mt-16 md:-mt-20 overflow-hidden py-10 -mb-20 z-30 pointer-events-none opacity-0 z-50">
    <div class="bg-[#3f6212] py-4 border-y-4 border-[#a3e635] w-full rotate-2 scale-110 relative flex items-center justify-center">
      <div ref="bannerTextRef" class="whitespace-nowrap translate-x-1/4 flex gap-4 text-[#ecfccb] text-2xl md:text-4xl font-[900] uppercase italic tracking-tighter">
        <span v-for="n in 10" :key="n">
          boba comes free with any drink&nbsp;&nbsp;•
        </span>
      </div>
    </div>
  </div>

	<div class="relative bg-white overflow-hidden pb-32 md:pb-48">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 opacity-[0.2]"
			:style="{
				backgroundImage: `linear-gradient(45deg, transparent 49%, #00cc00 49%, #00cc00 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #00cc00 49%, #00cc00 51%, transparent 51%)`,
				backgroundSize: '40px 40px'
			}"
		/>

		<WaveDivider class="bottom-banner-bar absolute top-0 left-0 w-full text-[#a3e635] fill-current h-16 md:h-28 z-0 rotate-[2.5deg]" />

		<Carousel :items="topDrinks"/>
	</div>
</template>

<style scoped>
.recolor-logo {
  filter: invert(80%) sepia(160%) saturate(500%) hue-rotate(105deg) brightness(90%) contrast(130%) opacity(80%);
}
</style>