<script setup lang="ts">
import { onMounted } from 'vue'; 
import gsap from 'gsap';

const hasPlayedIntro = useState('playedIntro', () => false);

const headerRef = ref(null);
const currentCardsRef = ref<HTMLElement[]>([]);
const pastCardsRef = ref<HTMLElement[]>([]);

const currentNewsItems = [
  {
    title: "Buy One, Get One 50% Off",
    date: "Monday-Friday: 4PM - 7PM",
    category: "Promotion",
    image: "/HappyHour.png",
    description: "During the assigned hours, come in and order 2 drinks from the poster and get 50% off the second drink.",
    featured: true
  },
  {
    title: "We are now Catering!",
    date: "Open Hours, Anyday",
    category: "Events",
    image: "/Catering.png",
    description: "Weddings, birthdays, or corporate events, Hello Boba is hitting the road. Book our mobile setup for your next party.",
    featured: false
  },
  {
    title: "10% Off Any Order",
    date: "Open Hours, Anyday",
    category: "Promotion",
    image: "/Reviews.png",
    description: "To get 10% off your entire order, give us a review on Google and/or Yelp, it helps us get our name around and helps you spend less!",
    featured: false
  },
  {
    title: "Game Night",
    date: "Saturday-Sunday: 7PM - 10PM",
    category: "Promotion",
    image: "/GameNight.png",
    description: "On the weekends, drop by during the final hours and get special discounts and rates on token to play our merchandisers!",
    featured: true
  },
  {
    title: "10% Off Any Order",
    date: "Open Hours, Anyday",
    category: "Promotion",
    image: "/School.png",
    description: "If you are a student, feel free to show us your student ID to get a 10% discount off your entire order!",
    featured: true
  }
];

const previousNewsItems = [
  {
    title: "The Lemon Challenge",
    date: "January 1, 2026 - January 31, 2026",
    category: "Challenge",
    image: "/LemonChallenge.png", 
    description: "Come by and try your luck to balance a quarter on top of a lemon for a free drink. If you succeed in doing so, you get a picture on the wall and a free drink of your choice!"
  },
  {
    title: "Christmas Day Special",
    date: "December 25, 2025",
    category: "Announcement",
    image: "/Christmas.png", 
    description: "Come in on Christmas Day and get 25% off 1 drink on any order of 2 or more drinks from our Matcha Series!"
  },
  {
    title: "Christmas Eve Special",
    date: "December 24, 2025",
    category: "Announcement",
    image: "/ChristmasEve.png", 
    description: "Come in on Christmas Day and get 50% off 1 drink on any order of 2 or more drinks from our Creme Brulee Series!"
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

  watch(hasPlayedIntro, async (isDone) => {
    if (isDone) {
      await nextTick();
      const timeline = gsap.timeline();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timeline.fromTo(headerRef.value, { 
            y: -30, 
            autoAlpha: 0 
          }, 
          { 
            y: 0, 
            autoAlpha: 1, 
            duration: 1, 
            ease: 'expo.out' 
          });

          timeline.fromTo(currentCardsRef.value, { 
            y: 60, 
            autoAlpha: 0 
          }, 
          { 
            y: 0, 
            autoAlpha: 1, 
            duration: 0.8,
            stagger: 0.15, 
            ease: 'back.out(1.2)' 
          }, "-=0.5");

          timeline.fromTo( '.past-tag', {
            scale: 0.5,
            autoAlpha: 0
          },{
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'elastic.out(1,0.7)'
          }, '-=0.5');

          timeline.fromTo(pastCardsRef.value, { 
            y: 60, 
            autoAlpha: 0 
          }, 
          { 
            y: 0, 
            autoAlpha: 0.8, 
            duration: 0.8,
            stagger: 0.15, 
            ease: 'back.out(1.2)' 
          }, "-=1.2")
        })
      })
    }
  }, { immediate: true });
})
</script>

<template>
  <div class="min-h-screen bg-[#f6f6f6] pt-40 pb-24 px-4 md:px-6 relative z-10 overflow-hidden">
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
      
      <div ref="headerRef" class="text-center mb-10 md:mb-16 opacity-0">
        <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm">
          The Latest
        </span>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-5xl md:text-8xl tracking-tighter font-black font-sans pb-2">
          Shop News
        </h1>
        <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto text-sm md:text-base">
          Everything you need to know about new flavor drops, pop-up events, and what's happening behind the counter at Hello Boba.
        </p>
      </div>

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
          ref="currentCardsRef" 
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>