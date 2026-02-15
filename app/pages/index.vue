<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroImage = ref(null);
const textContent = ref(null);
const logoRef = ref(null);
const bannerRef = ref(null);
const bannerTextRef = ref(null);
const bouncingContainerRef = ref<HTMLDivElement | null>(null);

const hasPlayedIntro = useState('playedIntro', () => false);

interface BouncingIcon {
  id: number;
  icon: string;
  x: number;
  y: number;
  vx: number; 
  vy: number;
  size: number;
	opacity: number;
	rotation: number;
}

const backgroundIcons = ref<BouncingIcon[]>([])

const top10Drinks = [
	{
		name: 'Hello Boba Special',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Mango Mango',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Horchata Cinnamon Crumbs',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Thai Green Milk Tea',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Creme Brulee Oreo Smoothie',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Creme Brulee Thai Tea',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Vietnamese Iced Coffee',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Creme Brulee Brown Sugar Boba Milk',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Creme Brulee Matcha Smoothie',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	},
	{
		name: 'Butterfly Mango',
		price: '$6.60',
		description: 'Mango Refresher with Aloe Vera & Lychee Jelly (included)',
		image: '/bobalogo.png'
	}
]

const flavorTest = [
	'/flavors/lychee.png',
	'/flavors/mango.png',
	'/flavors/mint.png',
	'/flavors/oreo.png',
	'/flavors/passionfruit.png',
	'/flavors/peach.png',
	'/flavors/strawberry.png',
	'/flavors/watermelon.png'
]

onMounted(() => {
  const startFloating = () => {
    gsap.to(logoRef.value, {
      y: -15,       
      duration: 2,  
      repeat: -1,   
      yoyo: true,  
      ease: "sine.inOut"
    });
  };

	const startBanner = () => {
		gsap.to(bannerTextRef.value, {
			repeat: -1,
			xPercent: -50,
			duration: 25,
			ease: 'none'
		});
	};

  if (!hasPlayedIntro.value) {

		document.body.style.overflow = 'hidden';

    const timeline = gsap.timeline({ 
      delay: 3.8,
      onStart: () => { hasPlayedIntro.value = true; }
    });

    timeline.from(heroImage.value, {
      scale: 1.15,
      filter: 'blur(20px)',
      duration: 2.5,
      ease: "expo.out"
    });

    timeline.from(textContent.value, {
      y: 20,
      autoAlpha: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.out"
    }, "-=1.5");

    timeline.from(logoRef.value, {
      scale: 0.8,
      autoAlpha: 0, 
      duration: 1,
      ease: "back.out(1.7)",
			onComplete: () => {
				document.body.style.overflow = '';
			}
    }, "<"); 

    timeline.add(startFloating, "-=1");

		timeline.from(bannerRef.value, {
			y: -40,
			duration: 1.5,
			ease: 'elastic.out(1,0.5)',
			autoAlpha: 0,
			filter: 'blur(10px)'
		}, '-=1');

		timeline.from(bannerTextRef.value, {
			duration: 2,
			ease: 'sine.out',
			autoAlpha: 0
		}, '<')
		.to(bannerTextRef.value, {
			repeat: -1,
			xPercent: -50,
			duration: 25,
			ease: 'none'
		}, '<')

		timeline.add(startBanner, '<')

  } else {

    startFloating();
		startBanner();

  }

	createAndAnimateIcons();

});

onUnmounted(() => {
	document.body.style.overflow = '';
})

const createAndAnimateIcons = () => {
  const container = bouncingContainerRef.value;
  if (!container) return;

  const bounds = container.getBoundingClientRect();
  const numIcons = 20;

  for (let i = 0; i < numIcons; i++) {
    const iconData: BouncingIcon = {
      id: i,
      icon: flavorTest[Math.floor(Math.random() * flavorTest.length)]!,
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
      vx:	(Math.random() - 0.5) * 300, 
      vy: (Math.random() - 0.5) * 300,
      size: 200 + Math.random() * 100,
			opacity: 0.5 + Math.random() * 0.5,
			rotation: 0
    };
    backgroundIcons.value.push(iconData);
    const reactiveIcon = backgroundIcons.value[i];
    animateIcon(reactiveIcon!, bounds);
  }
}

const animateIcon = (icon: BouncingIcon, bounds: DOMRect) => {
  const timeToXWall = icon.vx > 0 ? (bounds.width - icon.x - icon.size) / icon.vx : -icon.x / icon.vx;
  const timeToYWall = icon.vy > 0 ? (bounds.height - icon.y - icon.size) / icon.vy : -icon.y / icon.vy;

  const duration = Math.min(timeToXWall, timeToYWall);

  gsap.to(icon, {
    x: icon.x + icon.vx * duration,
    y: icon.y + icon.vy * duration,
    duration: duration,
    ease: 'none', 
    onComplete: () => {
			let hitWall = false;

			if (duration === timeToXWall) {
				icon.vx *= -1; 
				hitWall = true;
			}

			if (duration === timeToYWall) {
				icon.vy *= -1; 
				hitWall = true;
			}

			if (hitWall) {
				const speed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
				
				const spinDirection = Math.random() > 0.5 ? 1 : -1;
				const spinAmount = speed * 0.8 * spinDirection;

				gsap.to(icon, {
					rotation: `+=${spinAmount}`, 
					duration: 5,      
					ease: 'expo.out',
					overwrite: 'auto'
				});
			}

			animateIcon(icon, bounds);
    }
  });
}
</script>

<template>
  <div class="relative h-screen w-full flex items-end justify-center overflow-hidden bg-zinc-950">
    <div ref="heroImage" class="absolute inset-0 z-0">
      <NuxtPicture 
        src="/HelloHero.png" 
        class="h-full w-full object-cover"
        :img-attrs="{ class: 'h-full w-full object-cover opacity-70' }"
      />
    </div>

    <div ref="textContent" class="relative z-10 text-center px-4 pb-32 mb-10 max-w-2xl">

			<div ref="logoRef" class="recolor-logo h-[25vw] w-[30vw]">
				<NuxtPicture
					class="h-full w-full object-cover"
					src="/HelloBobaLogo.png"
					:img-attrs="{ class: 'h-full w-full object-cover' }"
				/>
			</div>

      <div class="inline-block px-4 py-1.5 mb-6 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-xl">
        <span class="text-green-400 font-bold tracking-wide text-sm uppercase">El Monte • Established 2020</span>
      </div>
      
      <h2 class="text-white/80 font-light text-2xl tracking-tight mb-4">
        Crafting <span class="font-black text-green-500 italic">the perfect</span> sip.
      </h2>
      
      <p class="text-zinc-300 text-sm leading-relaxed italic">
        Temporary caption for now because I don't know what to put, <br>
				hopefully something along the length of this.
      </p>
    </div>
	</div>

	<div ref="bannerRef" class="relative w-full -mt-20 overflow-hidden py-10 -mb-16 z-30 pointer-events-none">
    <div class="bg-[#3f6212] py-4 border-y-4 border-[#a3e635] w-full rotate-2 scale-110 relative flex items-center justify-center">
      <div ref="bannerTextRef" class="whitespace-nowrap translate-x-1/4 flex gap-4 text-[#ecfccb] text-4xl font-[900] uppercase italic tracking-tighter">
        <span v-for="n in 10" :key="n">
          boba comes free with any drink &nbsp;•
        </span>
      </div>
    </div>
	</div>

	<div ref="bouncingContainerRef" class="relative">
		<div class="absolute inset-0 w-full h-full pointer-events-none z-0">
			<img 
				v-for="icon in backgroundIcons" 
				:key="icon.id"
				:name="icon.icon"
				:src="icon.icon"
				class="absolute"
				:style="{
						left: `${icon.x}px`,
						top: `${icon.y}px`,
						width: `${icon.size}px`,
						opacity: icon.opacity,
						transform: `rotate(${icon.rotation}deg)`
				}"
			/>
		</div>
		<Carousel :items="top10Drinks"/>
	</div>
	<div class="min-h-screen"></div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}

.recolor-logo {
  filter: invert(80%) sepia(160%) saturate(500%) hue-rotate(105deg) brightness(90%) contrast(130%) opacity(80%);
}
</style>