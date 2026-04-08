<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
const orderRef = ref(null);
const currentIndex = ref(0);

const displayAmount = ref(3);

const maxIndex = computed(() => (props.items ? props.items.length - displayAmount.value : 0));
const currentHover = useState('hovering', () => false);

const isVisible = (index: number) => {
  return index >= currentIndex.value && index < currentIndex.value + displayAmount.value;
};

const updateDisplayAmount = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      displayAmount.value = 1; 
    } else if (window.innerWidth < 1024) {
      displayAmount.value = 2; 
    } else {
      displayAmount.value = 3;
    }

    if (currentIndex.value > maxIndex.value) {
      currentIndex.value = Math.max(0, maxIndex.value);
    }
    animateCarousel();
  }
};

const animateCarousel = () => {  
  const itemWidthPercent = 100 / displayAmount.value; 
  
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
  updateDisplayAmount();
  window.addEventListener('resize', updateDisplayAmount);

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

  gsap.from([carouselRef.value, orderRef.value] , { 
    scrollTrigger: {
      trigger: carouselRef.value,
      start: 'top 95%',
    },
    stagger: 0.5,
    duration: 0.7,
    opacity: 0,
    rotateX: 90,
    y: 100,
    ease: 'sine.out'
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDisplayAmount);
});
</script>

<template>
  <div class="min-h-screen flex justify-center py-10 md:py-20 px-4 md:px-6 relative z-10 overflow-hidden">
    <div class="max-w-[88rem] w-full">    
      
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 relative z-50 gap-6">
        <div class="text-left">
          <span class="top-text overflow-hidden perspective-[1000px] text-green-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Our Favorites</span>
          <h1 class="top-text overflow-hidden perspective-[1000px] text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-6xl md:text-8xl tracking-tight font-black font-sans">
            Top 10
          </h1>
        </div>

        <div class="top-text flex gap-4 self-end md:self-auto">
          <button @click="decreaseIndexCarousel" class="cursor-pointer h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 text-green-700 flex items-center justify-center hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50">
            <NuxtPicture src="/leftchevron.png"/>
          </button>
          <button @click="increaseIndexCarousel" class="cursor-pointer h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95">
            <NuxtPicture src="/rightchevron.webp"/>
          </button>
        </div>
      </div>

      <div class="w-full py-10 md:py-20 -my-12 md:-my-24 overflow-visible md:overflow-hidden"> 
        <div ref="carouselRef" class="flex w-full will-change-transform">
          
          <div 
            v-for="(drink, index) in items" 
            :key="index"
            class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2 md:px-4 transition-all duration-1000 ease-out"
            :class="{ 'opacity-30 blur-[2px] scale-95': !isVisible(index) }"
          >
            <div class="relative bg-white/95 rounded-lg p-5 md:p-6 shadow-xl shadow-zinc-200 border border-zinc-100 duration-300 h-full flex flex-col">
              
              <div class="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 bg-green-500 text-white font-black tracking-tight text-lg md:text-xl rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
                #{{ index + 1 }}
              </div>

              <div class="relative w-full aspect-square mb-6 bg-zinc-100 rounded-xl overflow-hidden hover:bg-green-100/80 transition-colors">
                  <NuxtPicture 
                    :src="drink.image" 
                    class="w-full" 
                    :img-attrs="{ class: 'w-full -translate-y-[10%]' }"
                  />
              </div>

              <div>
                <div class="flex flex-wrap gap-2 justify-between items-start mb-2">
                  <h3 class="font-black font-sans text-md md:text-lg text-black tracking-tight leading-tight">{{ drink.name }}</h3>
                  <span class="font-semibold font-sans text-green-600 bg-green-100 px-2 py-1 border border-green-300/30 rounded-xl text-xs md:text-sm">{{ drink.price }}</span>
                </div>
                <p class="text-xs md:text-sm text-slate-500 font-semibold">{{ drink.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div 
					ref="orderRef" class="w-full flex justify-center mt-16 md:my-12 pb-10 relative z-50"
					@mouseover="currentHover = true"
					@mouseleave="currentHover = false"
				>
          <NuxtLink 
            to="#" 
            class="group relative px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg shadow-green-700/40 hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <span class="flex items-center gap-2 md:gap-3 text-white font-sans font-black text-lg md:text-xl tracking-tight">
              Order Now
              <span class="px-2 py-1 bg-black/20 rounded-md text-green-100 text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                TBA
              </span>
            </span>
          </NuxtLink>
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