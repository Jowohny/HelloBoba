<script setup lang="ts">
import { ref, computed } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

interface Drink {
  name: string;
  price: string;
  description: string;
  image: string;
}

const props = defineProps<{
  items: Drink[]
}>();

const carouselRef = ref(null);
const currentIndex = ref(0);
const displayAmount = 3;

const maxIndex = computed(() => (props.items ? props.items.length - displayAmount : 0));

const isVisible = (index: number) => {
  return index >= currentIndex.value && index < currentIndex.value + displayAmount;
};

const animateCarousel = () => {  
  const itemWidthPercent = 100 / displayAmount; 
  
  if (carouselRef.value) {
    gsap.to(carouselRef.value, {
      xPercent: -(currentIndex.value * itemWidthPercent),
      duration: 0.7,
      ease: "power3.inOut"
    });
  }
}

const increaseIndexCarousel = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  animateCarousel();
}

const decreaseIndexCarousel = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = maxIndex.value;
  }
  animateCarousel();
}

onMounted(() => {
  gsap.from('.top-text', {
    scrollTrigger: {
      trigger: '.text-left', 
      start: 'top 65%',      
    },
    y: '100%',               
    rotationX: -90,          
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,           
    ease: 'back.out(1.5)', 
  });

  gsap.from(carouselRef.value , { 
    scrollTrigger: {
      trigger: carouselRef.value,
      start: 'top 95%',
    },
    duration: 0.7,
    opacity: 0,
		rotateX: 90,
    y: 100,
    ease: 'sine.out'
  });
});
</script>

<template>
  <div class="min-h-screen flex justify-center py-20 px-4 relative z-10">
    <div class="max-w-7xl">    
      <div class="flex items-end justify-between mb-12 relative z-50">
        <div class="text-left">
          <span class="top-text overflow-hidden perspective-[1000px] text-green-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Favorites</span>
          <h1 class="top-text overflow-hidden perspective-[1000px] text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-8xl tracking-tight font-black font-sans">
            Top 10
          </h1>
        </div>

        <div class="flex gap-4">
          <button @click="decreaseIndexCarousel" class="cursor-pointer h-12 w-12 rounded-full bg-green-600 text-green-700 flex items-center justify-center hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50">
						<NuxtPicture src="/leftchevron.png"/>
          </button>
          <button @click="increaseIndexCarousel" class="cursor-pointer h-12 w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95">
						<NuxtPicture src="/rightchevron.webp"/>
          </button>
        </div>
      </div>

      <div class="w-full py-20 -my-24 overflow-hidden"> 
        <div ref="carouselRef" class="flex w-full will-change-transform">
          
					<div 
						v-for="(drink, index) in items" 
						:key="index"
						class="flex-shrink-0 w-1/3 px-4 transition-all duration-1000 ease-out"
						:class="{ 'opacity-30 blur-[2px] scale-95': !isVisible(index) }"
					>
            <div class=" relative bg-white/95 rounded-lg p-6 shadow-xl shadow-zinc-200 border border-zinc-100 duration-300 h-full flex flex-col">
              
              <div class="absolute -top-4 -left-4 w-12 h-12 bg-green-500 text-white font-black tracking-tight text-xl rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
                #{{ index + 1 }}
              </div>

              <div class="relative w-full aspect-square mb-6 bg-zinc-100 rounded-xl overflow-hidden hover:bg-green-100/80 transition-colors">
                  <NuxtPicture 
                    :src="drink.image" 
                    class="w-full h-full object-contain" 
                    :img-attrs="{ class: 'w-full h-full transition-all hover:scale-110 duration-500 object-contain' }"
                  />
              </div>

              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-black font-sans text-xl text-black tracking-tight leading-tight">{{ drink.name }}</h3>
                  <span class="font-semibold font-sans text-green-600 bg-green-100 px-2 py-1 border border-green-300/30 rounded-xl text-sm">{{ drink.price }}</span>
                </div>
                <p class="text-sm text-slate-500 font-semibold">{{ drink.description }}</p>
              </div>
            </div>
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