<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

const backgroundItems = [
	{ 
		symbol: '@', 
		position: 'left-[5%]', 
		size: 'text-[15vw]'
	},
	{ 
		symbol: '!', 
		position: 'left-[85%]', 
		size: 'text-[12vw]'
	},
	{ 
		symbol: '?', 
		position: 'left-[35%]', 
		size: 'text-[20vw]'
	},
	{ 
		symbol: '&', 
		position: 'left-[60%]', 
		size: 'text-[10vw]'
	},
	{ 
		symbol: '#', 
		position: 'left-[20%]', 
		size: 'text-[8vw]'
	},
	{ 
		symbol: '$', 
		position: 'left-[75%]', 
		size: 'text-[14vw]'
	},
	{ 
		symbol: '%', 
		position: 'left-[50%]', 
		size: 'text-[16vw]'
	},
	{ 
		symbol: '~', 
		position: 'left-[10%]', 
		size: 'text-[11vw]'
	},
	{ 
		symbol: '+', 
		position: 'left-[90%]', 
		size: 'text-[18vw]'
	},
	{ 
		symbol: 'ß', 
		position: 'left-[41%]', 
		size: 'text-[18vw]'
	},
	{ 
		symbol: 'ƒ', 
		position: 'left-[15%]', 
		size: 'text-[14vw]'
	},
	{ 
		symbol: '√', 
		position: 'left-[55%]', 
		size: 'text-[21vw]'
	}
]

const backgroundBalls = [
	{
		size: 'w-16 h-16',
		color: 'bg-zinc-900/15',
		position: 'left-[18%]'
	},
	{
		size: 'w-24 h-24',
		color: 'bg-zinc-900/10',
		position: 'left-[82%]'
	},
	{
		size: 'w-12 h-12',
		color: 'bg-green-900/5',
		position: 'left-[42%]'
	},
	{
		size: 'w-20 h-20',
		color: 'bg-zinc-900/20',
		position: 'left-[65%]'
	},
	{
		size: 'w-10 h-10',
		color: 'bg-green-900/10',
		position: 'left-[28%]'
	},
	{
		size: 'w-32 h-32',
		color: 'bg-zinc-900/5',
		position: 'left-[55%]'
	},
	{
		size: 'w-28 h-28',
		color: 'bg-green-900/15',
		position: 'left-[75%]'
	},
	{
		size: 'w-32 h-32',
		color: 'bg-zinc-900/5',
		position: 'left-[86%]'
	}
]

onMounted(() => {
  const floaters = gsap.utils.toArray('.floater');
  
  floaters.forEach((floater: any) => {
    const speed = gsap.utils.random(15, 30); 
    const drift = gsap.utils.random(-80, 80);
    
    const startDelay = gsap.utils.random(-speed, 0); 

    gsap.fromTo(floater, {
      y: '100vh',
      x: 0,
      rotation: gsap.utils.random(-90, 90),
    }, {
      y: '-50vh',
      x: drift,
      rotation: gsap.utils.random(-180, 180),
      duration: speed,
      repeat: -1,
      ease: 'none',
      delay: startDelay 
    });
  });
});
</script>

<template>
  <div class="min-h-screen pt-40 pb-24 px-6 relative z-10 overflow-hidden bg-[#f6f6f6]">
    
    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">

			<div
				className="absolute inset-0 z-0"
				:style="{
					backgroundImage: `
						radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
					`,
					backgroundSize: `100% 100%`,
				}"
			/>

      <div 
				v-for="item in backgroundItems"
				class="floater absolute top-0 font-black font-sans text-green-700/15 leading-none"
				:key="item.symbol"
				:class="[item.size, item.position]"
			>
				{{ item.symbol }}
			</div>
      
      <div 
				v-for="ball in backgroundBalls"
				class="floater absolute top-0 backdrop-blur-sm rounded-full shadow-inner border border-zinc-900/5"
				:class="[ball.color, ball.position, ball.size]"
				:key="ball.position"
			/>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>