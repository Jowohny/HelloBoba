<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText) 

const currentHover = useState('hovering', () => false)

const tabs = [
	{ tabName: 'Home', link: '/'},
	{ tabName: 'News', link: '/news' },
	{ tabName: 'Menu', link: '/menu' },
	{ tabName: 'Locations', link: '/locations' },
	{ tabName: 'Contact Us', link: '/contact' }
]

const navbarRef = ref(null);
const bobaRef = ref(null);
const nameRef = ref(null);
const pageRefs = ref<any[]>([]);
const orderRef = ref(null);

const cursorRef = ref(null);
const cursorFollowerRef = ref(null);

const hasPlayedIntro = useState('playedIntro', () => false)

const getEl = (refValue: any) => refValue?.$el || refValue;

function setPageRef(el: any, index: number) {
	if (el) {
		pageRefs.value[index] = el.$el || el;
	}
}

onMounted(async() => {
	await nextTick();

	if (!navbarRef.value) return;

	const bobaEl = getEl(bobaRef.value);
	const nameEl = getEl(nameRef.value);
	const orderEl = getEl(orderRef.value);
	const linksEls = pageRefs.value;

	const timeline = gsap.timeline({
		onStart: () => { hasPlayedIntro.value = true }
	})

  timeline.fromTo(navbarRef.value, {
    autoAlpha: 0,
    yPercent: -100
  }, {
    autoAlpha: 1,
    yPercent: 0,
    duration: 1.5,
    ease: 'power4.out'
  })

  timeline.fromTo(bobaEl, {
    scale: 0,
    autoAlpha: 0,
		rotate: 50
  }, {
    autoAlpha: 1,
    scale: 1.3,
		rotate: 0,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, '<+=0.5')

  timeline.fromTo([nameEl, linksEls, orderEl], {
		autoAlpha: 0,
		y: -20
	},{
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.1,
		y: 0,
    ease: 'power2.out'
  }, '<+=0.5')

	window.addEventListener('mousemove', moveCursor);
})

const moveCursor = (e: any) => {
	if (!cursorRef.value || !cursorFollowerRef.value) return;
	
	gsap.to(cursorRef.value, { 
		x: e.clientX - 16, 
		y: e.clientY - 16,
		duration: 0 
	});
	
	gsap.to(cursorFollowerRef.value, { 
		x: e.clientX - 8, 
		y: e.clientY - 8, 
		duration: 0.8, 
		ease: "power2.out"
	});
};

watch(currentHover, () => {
	if (cursorRef.value) {		
		if(currentHover.value === true) {
			gsap.to(cursorRef.value, { 
				scale: 1.5, 
				backgroundColor: "#ecfccb", 
				mixBlendMode: "normal", 
				duration: 0.3 
			});
		} else {
			gsap.to(cursorRef.value, { 
				scale: 1, 
				backgroundColor: "#3f6212", 
				mixBlendMode: "multiply", 
				duration: 0.3 
			});
		}
	}
})
</script>

<template>
  <div ref="navbarRef" class="fixed top-4 left-1/2 -translate-x-1/2 z-[999] backdrop-blur-lg flex items-center bg-white/20 justify-between gap-6 w-[80%] h-[10%] px-6 rounded-full border shadow-xl shadow-green-500/20 overflow-hidden opacity-0 cursor-none">
    <div class="flex flex-row">
			<span ref='bobaRef' class="h-9 w-9 shrink-0 overflow-hidden rounded-full opacity-0">
				<NuxtPicture class="h-full w-full object-cover cursor-pointer" src="bobalogo.png"/>
			</span>
			<NuxtLink ref="nameRef" to="/" class="subpixel-antialiased flex items-center gap-2 no-underline font-black text-2xl tracking-tighter text-green-300 opacity-0">
				HELLO <span class="text-amber-800">BOBA</span>
			</NuxtLink>
    </div>

    <div class="flex items-center gap-2">
      <NuxtLink
        v-for="(tab, index) in tabs"
        :key="tab.tabName"
        :ref="(el) => setPageRef(el, index)"
        :to="tab.link"
				@mouseenter="currentHover = true"
				@mouseleave="currentHover = false"
        class="px-4 py-2 rounded-full font-bold text-md text-gray-700 transition-colors hover:bg-green-600/80 duration-400 opacity-0 cursor-none"
        active-class="bg-green-500/70 text-green-800"
      >
        {{ tab.tabName }}
      </NuxtLink>
    </div>

		<NuxtLink ref="orderRef" to="#" class="px-5 py-2 rounded-full font-black text-md text-white cursor-none bg-gradient-to-r from-green-500 to-green-600 shadow-lg opacity-0">
			TBA
		</NuxtLink>
  </div>

  <div class="min-h-screen min-w-full bg-[#f6f6f6] cursor-none">
		<div ref="cursorRef" class="fixed top-0 left-0 w-8 h-8 bg-[#3f6212] rounded-full z-[9999] pointer-events-none mix-blend-multiply opacity-80 flex items-center justify-center text-white text-[10px] font-bold shadow-xl">
      🥝
    </div>
    <div ref="cursorFollowerRef" class="fixed top-0 left-0 w-4 h-4 bg-[#84cc16] rounded-full z-[9998] pointer-events-none opacity-50"/>

    <slot />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>