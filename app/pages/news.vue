<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import gsap from 'gsap';
import { currentNewsItems, previousNewsItems } from '~/data/news';

useSeoMeta({
  title: 'News & Promotions — Hello Boba',
  description: "What's happening at Hello Boba: promotions, events, and seasonal specials in El Monte."
});

const headerRef = ref<{ $el?: HTMLElement } | HTMLElement | null>(null);
const currentCardsRef = ref<HTMLElement[]>([]);
const pastCardsRef = ref<HTMLElement[]>([]);

let bubbleLayer1Tween: gsap.core.Tween | null = null;
let bubbleLayer2Tween: gsap.core.Tween | null = null;

onMounted(() => {
  bubbleLayer1Tween = gsap.from('.bubble-layer-1', {
    backgroundPosition: '900px 900px',
    ease: 'none',
    duration: 120,
    repeat: -1
  });

  bubbleLayer2Tween = gsap.to('.bubble-layer-2', {
    backgroundPosition: '900px 900px',
    duration: 120,
    ease: 'none',
    repeat: -1
  });
});

const resolveEl = (r: any) => r?.$el ?? r;

useIntroSequence((timeline) => {
  timeline.fromTo(resolveEl(headerRef.value), {
    y: -30,
    autoAlpha: 0
  }, {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'expo.out'
  });

  timeline.fromTo(currentCardsRef.value, {
    y: 60,
    autoAlpha: 0
  }, {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.2)'
  }, '-=0.5');

  timeline.fromTo('.past-tag', {
    scale: 0.5,
    autoAlpha: 0
  }, {
    y: 0,
    scale: 1,
    autoAlpha: 1,
    duration: 1.5,
    ease: 'elastic.out(1,0.7)'
  }, '-=0.5');

  timeline.fromTo(pastCardsRef.value, {
    y: 60,
    autoAlpha: 0
  }, {
    y: 0,
    autoAlpha: 0.8,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.2)'
  }, '-=1.2');
});

onBeforeUnmount(() => {
  bubbleLayer1Tween?.kill();
  bubbleLayer2Tween?.kill();
});
</script>

<template>
  <div class="min-h-screen bg-[#f6f6f6] pt-40 pb-32 md:pb-48 px-4 md:px-6 relative z-10 overflow-hidden">
    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#f6f6f6]">
      <div 
        class="bubble-layer-1 absolute inset-0 w-[200%] h-[200%] opacity-40"
        :style="{
            backgroundImage: 'radial-gradient(circle, #84cc16 4px, transparent 4px)',
            backgroundSize: '40px 40px'
        }"
        />
      <div 
        class="bubble-layer-2 absolute inset-0 w-[200%] h-[200%] opacity-30 top-[-50%] left-[-50%]"
        :style="{
            backgroundImage: 'radial-gradient(circle, #84cc16 6px, transparent 6px)',
            backgroundSize: '90px 90px'
        }"/>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <PageHeader
        ref="headerRef"
        eyebrow="The Latest"
        title="Shop News"
        description="Everything you need to know about new flavor drops, pop-up events, and what's happening behind the counter at Hello Boba."
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 gap-8">
        <div 
          v-for="(item, index) in currentNewsItems" 
          :key="index"
          ref="currentCardsRef" 
          class="opacity-0 group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col overflow-hidden h-full"
        >
          <div class="relative bg-zinc-50 shrink-0 border-b border-zinc-200 w-full aspect-[9/11] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
            <NuxtPicture 
              :src="item.image" 
              class="w-full h-full"
              :img-attrs="{ class: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out' }"
            />
          </div>

          <div class="flex flex-col flex-grow justify-start p-6">
            <div class="flex items-center mb-3 gap-3 shrink-0">
              <span class="bg-green-100 text-green-700 px-3 py-1 border border-green-200 rounded-full text-[10px] font-black uppercase tracking-widest">
                {{ item.category }}
              </span>
              <span class="text-xs text-zinc-400 font-bold tracking-wide truncate">
                {{ item.date }}
              </span>
            </div>
            <h3 class="font-black font-sans text-xl md:text-2xl text-zinc-900 tracking-tight leading-tight mb-2 group-hover:text-[#65a30d] transition-colors line-clamp-2">
              {{ item.title }}
            </h3>
            <p class="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <span class="past-tag opacity-0 flex w-fit mx-auto px-4 py-2 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-extrabold tracking-widest text-lg md:text-xl uppercase backdrop-blur-sm">
        Past Events
      </span>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 gap-8 opacity-50">
        <div
          v-for="(item, index) in previousNewsItems"
          :key="index"
          ref="pastCardsRef"
          class="opacity-0 group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col overflow-hidden h-full"
        >
          <div class="relative bg-zinc-50 shrink-0 border-b border-zinc-200 w-full aspect-[4/5] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
            <NuxtPicture 
              :src="item.image" 
              class="w-full h-full"
              :img-attrs="{ class: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out' }"
            />
          </div>

          <div class="flex flex-col flex-grow justify-start p-6">
            <div class="flex items-center mb-3 gap-3 shrink-0">
              <span class="bg-green-100 text-green-700 px-3 py-1 border border-green-200 rounded-full text-[10px] font-black uppercase tracking-widest">
                {{ item.category }}
              </span>
              <span class="text-xs text-zinc-400 font-bold tracking-wide truncate">
                {{ item.date }}
              </span>
            </div>
            <h3 class="font-black font-sans text-xl md:text-2xl text-zinc-900 tracking-tight leading-tight mb-2 group-hover:text-[#65a30d] transition-colors line-clamp-2">
              {{ item.title }}
            </h3>
            <p class="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

