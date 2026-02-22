<script setup lang="ts">
import { onMounted } from 'vue'; 
import gsap from 'gsap';

const newsItems = [
  {
    title: "Buy One, Get One 50% Off",
    date: "Monday-Friday: 4PM - 7PM",
    category: "Promotion",
    image: "/flavors/watermelon.png",
    description: "",
    featured: 'col-span-6 row-span-1',
		vertical: true
  },
  {
    title: "We are now Catering!",
    date: "Open Hours, Anyday",
    category: "Events",
    image: "/kiwiboba.png",
    description: "Weddings, birthdays, or corporate events—Hello Boba is hitting the road. Book our mobile setup for your next party.",
    featured: 'col-span-4 row-span-1',
		vertical: false
  },
  {
    title: "Game Night",
    date: "Saturday-Sunday: 7PM - 10PM",
    category: "Promotion",
    image: "/bobalogo.png",
    description: "Just a heads up! We will be closing early at 5:00 PM this Friday for a team building event. Normal hours resume Saturday.",
    featured: 'col-span-3 row-span-1',
		vertical: false
  },
  {
    title: "The Lemon Challenge",
    date: "January 1, 2026 - Present",
    category: "Challenge",
    image: "/kiwiboba.png", 
    description: "You asked, we delivered. The official Hello Boba heavy-cotton oversized tees are now in stock behind the register.",
    featured: 'col-span-4 row-span-1',
		vertical: false
  }
];


onMounted(() => {
	gsap.from('.bubble-layer-1', {
		backgroundPosition: '900px 900px',
		ease: 'none',
		duration: 120,
		repeat: -1
	})

	gsap.to('.bubble-layer-2', {
		backgroundPosition: "900px 900px",
		duration: 120,
		ease: "none",
		repeat: -1
	});
})
</script>

<template>
  <div class="min-h-screen bg-[#f6f6f6] pt-40 pb-24 px-6 relative z-10 overflow-hidden">
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
      
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm">
          The Latest
        </span>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-6xl md:text-8xl tracking-tighter font-black font-sans pb-2">
          Shop News
        </h1>
        <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto">
          Everything you need to know about new flavor drops, pop-up events, and what's happening behind the counter at Hello Boba.
        </p>
      </div>

      <div class="grid grid-cols-10 auto-rows-[400px] gap-8">
        
        <div 
          v-for="(item, index) in newsItems" 
          :key="index"
          class="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 p-6 flex"
          :class="[item.featured, item.vertical ? 'flex-row' : 'flex-col']"
        >
          <div 
						class="relative bg-zinc-50 rounded-2xl overflow-hidden shrink-0 border"
						:class="item.vertical ? 'h-full w-1/2' : 'w-full h-1/2'"
					>
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <NuxtPicture 
              :src="item.image" 
              class="w-full h-full"
              :img-attrs="{ class: 'w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out' }"
            />
          </div>

          <div 
						class="flex flex-col flex-grow justify-start"
						:class="item.vertical ? 'pl-6 w-1/2' : 'pt-6 h-1/2'"
					>
            <div class="flex items-center mb-4 gap-3">
              <span class="bg-green-100 text-green-700 px-3 py-1 border border-green-200 rounded-full text-[10px] shrink-0 font-black uppercase tracking-widest">
                {{ item.category }}
              </span>
              <span class="text-xs text-zinc-400 font-bold tracking-wide">
                {{ item.date }}
              </span>
            </div>
            <h3 class="font-black font-sans text-2xl text-zinc-900 tracking-tight leading-tight mb-3 group-hover:text-[#65a30d] transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-sm text-zinc-500 font-semibold leading-relaxed mb-6">
              {{ item.description }}
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
