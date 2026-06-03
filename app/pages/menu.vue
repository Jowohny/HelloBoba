<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, nextTick, watch } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { menuItems, toppings, bobaOptions, food } from '~/data/menu';

useSeoMeta({
  title: 'Menu — Hello Boba',
  description: 'Our full menu: milk teas, fresh teas, fruit teas, smoothies, slushies, coffee, creme brulee series, mojitos, and seasonal specialties.'
});

const sections = ['drinks', 'toppings', 'boba', 'food'];

const headerRef = ref<{ $el?: HTMLElement } | HTMLElement | null>(null);
const drinksRef = ref<HTMLElement | null>(null);

const currentMenuConfigure = ref<string>('drinks');
const firstTime = ref<boolean>(false);
const scrollCheckL = ref<boolean>(true);
const scrollCheckR = ref<boolean>(true);

const totalBoba = ref<number>(60);
let resizeTimer: ReturnType<typeof setTimeout>;

import type { MenuItem } from '~/types';

const groupedMenu = computed(() => {
  const dictionary: Record<string, MenuItem[]> = {};

  for (const item of menuItems) {
    if (!dictionary[item.type]) {
      dictionary[item.type] = [];
    }
    dictionary[item.type]!.push(item);
  }

  return dictionary;
});

const categories = computed(() => Object.keys(groupedMenu.value));

const activeTab = ref(categories.value[0]);

const bobas = ref<any[]>([]);

const updateDisplayAmount = () => {
  clearTimeout(resizeTimer);
  
  resizeTimer = setTimeout(async () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        totalBoba.value = 10; 
      } else if (window.innerWidth < 1024) {
        totalBoba.value = 20; 
      } else {
        totalBoba.value = 30;
      }
    }
    
    gsap.killTweensOf('.boba-pearl');

    bobas.value = [];
    createRandomBoba();

    await nextTick();
    animateBobaElements();
  }, 250);
};

const slideRight = () => {
  const element = document.getElementById('catBox');
  const innerWidth = element ? element.clientWidth : 0;
  if (element) {
    element.scrollBy({
      left: innerWidth/3,
      behavior: 'smooth'
    })
  }
}

const slideLeft = () => {
  const element = document.getElementById('catBox');
  const innerWidth = element ? element.clientWidth : 0;
  if (element) {
    element.scrollBy({
      left: -innerWidth/3,
      behavior: 'smooth'
    })
  }
}

const checkScrollButtons = () => {
  const element = document.getElementById('catBox') as HTMLElement;

  scrollCheckL.value = element.scrollLeft <= 0;
  scrollCheckR.value = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
}

const createRandomBoba = () => {
  const newBobas = []; 
  
  for (let i = 0; i < totalBoba.value; i++) {
    const sizeClass = ['w-3 h-3', 'w-5 h-5', 'w-8 h-8', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'][i % 5];
    const leftPos = (i * 13) % 100; 
    
    let depthClass = 'opacity-90 z-20 blur-[0.9px]';
    if (i % 3 === 0) depthClass = 'blur-[3px] opacity-40 z-0';
    if (i % 4 === 0) depthClass = 'blur-[1px] opacity-70 z-10'; 
    
    newBobas.push({
      id: Math.random(),
      size: sizeClass,
      left: `${leftPos}%`,
      depth: depthClass
    });
  }

  bobas.value = newBobas;
}

const animateBobaElements = () => {
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
}

const resolveEl = (r: any) => r?.$el ?? r;
let splitSectionTitle: SplitText | null = null;

onMounted(() => {
  const catBox = document.getElementById('catBox');

  if (catBox) {
    checkScrollButtons();
    catBox.addEventListener('scroll', checkScrollButtons);
  }

  updateDisplayAmount();
  createRandomBoba();

  nextTick(() => {
    animateBobaElements();
  });

  window.addEventListener('resize', updateDisplayAmount);
});

useIntroSequence((timeline) => {
  timeline.fromTo(resolveEl(headerRef.value), {
    autoAlpha: 0,
    y: -30
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 1,
    ease: 'expo.out'
  });

  timeline.fromTo(drinksRef.value, {
    autoAlpha: 0,
    yPercent: 20
  }, {
    autoAlpha: 1,
    duration: 1,
    yPercent: 0,
    ease: 'back.out',
    clearProps: 'all',
    onComplete: () => {
      firstTime.value = true;
    }
  }, '<+=0.4');

  const menuSections = gsap.utils.toArray('.menu-section');

  timeline.fromTo(menuSections, {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 0.8,
    ease: 'sine.out',
    stagger: 0.1
  }, '<-=0.5');

  const categorySections = gsap.utils.toArray('.section');

  categorySections.forEach((section: any) => {
    timeline.fromTo(section, {
      autoAlpha: 0,
      x: 40,
      rotate: gsap.utils.random(-5, 5)
    }, {
      autoAlpha: 1,
      rotate: 0,
      x: 0,
      duration: 0.4,
      ease: 'none'
    }, '<+=0.05');
  });

  splitSectionTitle = new SplitText('.drink-section', { type: 'chars,words', charsClass: 'opacity-0' });

  timeline.fromTo(splitSectionTitle.chars, {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.04
  }, '<');

  const drinkItems = gsap.utils.toArray('.drink-item');

  timeline.fromTo(drinkItems, {
    autoAlpha: 0,
    x: 50
  }, {
    x: 0,
    autoAlpha: 1,
    duration: 1,
    stagger: 0.05,
    ease: 'power4.out'
  }, '<+=0.3');
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDisplayAmount);
  const catBox = document.getElementById('catBox');
  catBox?.removeEventListener('scroll', checkScrollButtons);
  gsap.killTweensOf('.boba-pearl');
  splitSectionTitle?.revert();
});


watch(activeTab, (newTab) => {
	if (newTab) {	
		const activeEl = document.getElementById(`tab-${newTab.replace(/\s+/g, '-')}`);

		if (activeEl) {
			activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}	
});
</script>

<template>
  <div class="min-h-screen pt-32 md:pt-40 pb-32 md:pb-48 px-4 md:px-6 relative z-10 overflow-hidden">
    <div class="fixed inset-0 w-full h-full pointer-events-none overflow-hidden bg-gradient-to-b from-[#18ffe7]/40 to-[#fa1d1c]/30">
      <div
        v-for="boba in bobas"
        :key="boba.id"
        class="boba-pearl absolute top-0 rounded-full bg-[#1a1311]"
        :class="[boba.size, boba.depth]"
        :style="{ left: boba.left }"
      />
    </div>
    <div class="max-w-7xl mx-auto relative z-10">
      <PageHeader
        ref="headerRef"
        eyebrow="Freshly Brewed"
        title="Menu Items"
        description="Take a look at all our freshly brewed teas, milk tea variations, smoothies, and other specialty drinks. For anyone who's hungry, we also have our small selection of cakes and cookies."
      />
      <div class="relative flex flex-wrap lg:flex-nowrap justify-center lg:justify-around px-2 md:px-8 z-5">
        <div
          class="menu-section relative h-32 w-40 md:w-56 z-50 -mb-2 transition-all duration-500 opacity-0 drop-shadow-xl cursor-pointer"
          :class="currentMenuConfigure === section ? '-translate-y-[10%]' : ''"
          @click="[currentMenuConfigure = section]"
          v-for="section in sections"
          :key="section"
        >
          <svg 
            viewBox="0 0 240 140" 
            class="absolute top-0 left-0 w-full h-full transition-colors duration-500 pointer-events-none"
            :class="currentMenuConfigure === section ? 'text-green-300' : 'text-[#f6f6f6]'"
          >
            <circle cx="60" cy="65" r="35" fill="currentColor" />
            <circle cx="120" cy="50" r="45" fill="currentColor" />
            <circle cx="180" cy="65" r="35" fill="currentColor" />
            <ellipse cx="120" cy="75" rx="85" ry="30" fill="currentColor" /> 

            <circle cx="212" cy="105" r="10" fill="currentColor"/>
            <circle cx="230" cy="115" r="6" fill="currentColor"/>
          </svg>
          <h3 class="relative z-10 text-xl md:text-2xl text-transparent -translate-y-[10%] bg-clip-text bg-gradient-to-b from-white to-[#8f1c67] font-[900] w-full h-full font-sans tracking-wide mt-2 flex justify-center uppercase items-center">
            {{ section }}
          </h3>
        </div>
      </div>
      <div class="grid relative w-full mt-8">
        <div
          ref="drinksRef"
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="[firstTime && currentMenuConfigure === 'drinks' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]']"
        >
          <div class="flex flex-row justify-center">
            <button 
              @click="slideLeft" 
              :disabled="scrollCheckL"
              class="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95 p-3 md:p-4 mr-2 disabled:opacity-70"
            >
              <NuxtPicture 
                src="/leftchevron.png"
                :class="scrollCheckL ? 'cursor-not-allowed' : 'cursor-pointer'"
                class="w-full h-full flex items-center justify-center" 
                :img-attrs="{ class: 'w-full h-full object-contain' }" 
              />
            </button>
            <div id="catBox" class="flex overflow-x-auto gap-3 pt-1 pb-8 border-b-2 border-green-500/20 cursor-pointer">
              <button v-for="cat in categories" 
                :key="cat" 
                @click="activeTab = cat" 
                :id="`tab-${cat.replace(/\s+/g, '-')}`" 
                :class="[ 'section px-4 md:px-5 py-2 md:py-2.5 rounded-2xl font-bold text-xs md:text-sm tracking-wide whitespace-nowrap transition-all duration-300 border border-zinc-500/30', activeTab === cat ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/50' : 'bg-white/50 text-zinc-500 border-transparent hover:bg-white hover:text-zinc-800 shadow-md shadow-zinc-500/50', firstTime ? '' : 'opacity-0' ]"
              >
                {{ cat }}
              </button>
            </div>
            <button 
              @click="slideRight" 
              :disabled="scrollCheckR" 
              :class="scrollCheckR ? 'cursor-not-allowed' : 'cursor-pointer'"
              class="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95 p-3 md:p-4 ml-2 disabled:opacity-70"
            >
              <NuxtPicture 
                src="/rightchevron.webp" 
                class="w-full h-full flex items-center justify-center" 
                loading="lazy" 
                :img-attrs="{ class: 'w-full h-full object-contain' }" 
              />
            </button>
          </div>
          <h2 class="drink-section text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2 mt-6">
            {{ activeTab }}
          </h2>
          <div class="grid relative min-h-[500px]">
            <div v-for="category in categories" :key="category" class="col-start-1 row-start-1 flex flex-col gap-2 transition-opacity duration-300 ease-in-out" :class="activeTab === category ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'">
              <div v-for="item in groupedMenu[category]" :key="item.name" class="drink-item group flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-4 lg:gap-0">
                <div class="flex flex-1 items-start md:items-center gap-4 md:gap-5 pr-0 lg:pr-4 w-full">
                  <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                    <img :src="item.image" class="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.1]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-3 mb-2">
                      <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ item.name }}</h3>
                      <div class="flex gap-2 flex-wrap">
                        <span v-if="item.DF" class="px-2 py-1 rounded-md bg-orange-100/80 text-orange-700 text-[10px] font-black tracking-widest border border-orange-200">Dairy Free</span>
                        <span v-if="item.CF" class="px-2 py-1 rounded-md bg-purple-100/80 text-purple-700 text-[10px] font-black tracking-widest border border-purple-200">Caffeine Free</span>
                      </div>
                    </div>
                    <p class="text-xs md:text-sm font-semibold text-zinc-500 max-w-2xl">{{ item.description }}</p>
                  </div>
                </div>
                <div class="flex w-full lg:w-auto justify-center lg:justify-start gap-6 lg:pl-4 mt-2 lg:mt-0 pt-2 lg:pt-0 border-t border-zinc-300 lg:border-t-0">
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Reg (16oz)</span>
                    <span class="font-black text-base md:text-lg text-zinc-800">{{ item.price.R }}</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Lrg (24oz)</span>
                    <span class="font-black text-base md:text-lg text-green-700">{{ item.price.L }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'toppings' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2">Toppings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-min">
            <div v-for="topping in toppings" :key="topping.name" class="group flex flex-row justify-between items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-0">
              <div class="flex flex-1 items-center gap-4 md:gap-5 pr-0 md:pr-4 w-full">
                <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                  <img :src="topping.image" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ topping.name }}</h3>
                  </div>
                  <p class="text-xs md:text-sm font-semibold text-zinc-500 max-w-2xl">{{ topping.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'boba' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2">Boba</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-min">
            <div v-for="b in bobaOptions" :key="b.name" class="group flex flex-row justify-between items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-0">
              <div class="flex items-center gap-4 md:gap-5 w-full">
                <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                  <img v-if="b.image" :src="b.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span v-else class="text-2xl md:text-3xl opacity-50 grayscale">🧋</span>
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ b.name }}</h3>
                  </div>
                  <p class="text-xs md:text-sm font-semibold text-zinc-500">{{ b.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'food' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <div v-for="f in food" :key="f.type" class="mb-12">
            <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-4 pb-2 border-b-2 border-green-500/10">{{ f.type }}</h2>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              <div v-for="flavor in f.items" :key="flavor.name" class="group flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-4">
                <div class="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center shadow-inner">
                  <img v-if="flavor.image" :src="flavor.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span v-else class="text-3xl md:text-4xl opacity-50 grayscale">🍰</span>
                </div>
                <h3 class="text-base md:text-lg font-bold text-center text-zinc-800 group-hover:text-green-700 transition-colors leading-tight">{{ flavor.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

