<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import gsap from 'gsap'
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText) 

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

const hamburgerRef = ref(null);

const openMobileMenu = ref(false);

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
  const hamburgerEl = getEl(hamburgerRef.value);

  gsap.set('.mobile-link', { autoAlpha: 0, y: -20 });

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

  timeline.fromTo([nameEl, linksEls, orderEl, hamburgerEl], {
    autoAlpha: 0,
    y: -20
  },{
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.1,
    y: 0,
    ease: 'power2.out'
  }, '<+=0.5')
})

watch(openMobileMenu, (isOpen) => {
  const tl = gsap.timeline();
  const mobileLinks = gsap.utils.toArray('.mobile-link');
  const hamburgerEl = getEl(hamburgerRef.value);

  if (isOpen) {
    gsap.to(hamburgerEl, { rotation: 90, duration: 0.4, ease: 'power2.out' });

    tl.to(navbarRef.value, {
			borderRadius: '40px',
			duration: 2,
			ease: 'power4.out'
		}, '<-=1')
		.to(navbarRef.value, {
      height: '60vh',
      duration: 0.6,
      ease: 'expo.inOut'
    }, '<+=1')
    .to(mobileLinks, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power1.out'
    }, "-=0.7")
  } else {
    gsap.to(hamburgerEl, { rotation: 0, duration: 0.4, ease: 'power2.out' });

    tl.to(mobileLinks, {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
			stagger: 0.05,
      ease: 'power1.in'
    }, '-=0.2')
		.to(navbarRef.value, {
			height: '10vh',
			duration: 0.6,
      ease: 'expo.inOut'
		}, '-=0.3')
		.to(navbarRef.value, {
			borderRadius: '100px',
			duration: 1,
			ease: 'power4.out'
    }, "-=0.2")
  }
})
</script>

<template>
  <div ref="navbarRef" class="fixed top-4 left-1/2 -translate-x-1/2 z-[999] backdrop-blur-lg flex flex-col bg-white/20 w-[80%] h-[10vh] px-6 rounded-[100px] border shadow-xl shadow-green-500/20 overflow-hidden opacity-0">
    
    <div class="flex items-center justify-between w-full h-[10vh] shrink-0">
      <div class="flex flex-row items-center">
        <span ref='bobaRef' class="h-9 w-9 shrink-0 overflow-hidden rounded-full opacity-0">
          <NuxtPicture class="h-full w-full object-cover cursor-pointer" src="bobalogo.png"/>
        </span>
        <NuxtLink ref="nameRef" to="/" class="subpixel-antialiased flex items-center gap-2 no-underline font-black text-2xl tracking-tighter text-green-300 opacity-0 pl-2">
          HELLO <span class="text-amber-800">BOBA</span>
        </NuxtLink>
      </div>

      <div class="hidden lg:flex items-center gap-2">
        <NuxtLink
          v-for="(tab, index) in tabs"
          :key="tab.tabName"
          :ref="(el) => setPageRef(el, index)"
          :to="tab.link"
          class="px-4 py-2 rounded-full font-bold text-md text-gray-700 transition-colors hover:bg-green-600/80 duration-400 opacity-0"
          active-class="bg-green-500/70 text-green-800"
        >
          {{ tab.tabName }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink ref="orderRef" to="#" class="hidden lg:block px-5 py-2 rounded-full font-black text-md text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg opacity-0">
          TBA
        </NuxtLink>
        <NuxtPicture 
          ref="hamburgerRef"
          src="/hamburgericon.png"
          class="w-8 h-8 lg:hidden opacity-0"
          @click="openMobileMenu = !openMobileMenu"
          :img-attrs="{ class: 'h-full w-full object-contain' }"
        />
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-6 grow lg:hidden pb-6">
      <NuxtLink
        v-for="tab in tabs"
        :key="'mobile-' + tab.tabName"
        :to="tab.link"
        @click="openMobileMenu = false"
        class="mobile-link text-2xl font-black text-green-900 uppercase font-sans hover:bg-white/30 px-4 py-2 rounded-full duration-200 transition-colors"
      >
        {{ tab.tabName }}
      </NuxtLink>
        <NuxtLink to="#" class="mobile-link lg:block px-5 py-2 rounded-full font-black text-md text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg opacity-0">
          TBA
        </NuxtLink>
    </div>

  </div>

  <div class="min-h-screen min-w-full bg-[#f6f6f6]">
    <slot />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>