<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const heroImage = ref(null);
const textContent = ref(null);
const logoRef = ref(null);
const bannerRef = ref(null);
const bannerTextRef = ref(null);
const kiwiRef = ref(null);
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

const socialMediaLinks = [
	{
		media: 'Instagram',
		link: 'https://www.instagram.com/hello.boba.boba'
	},
	{
		media: 'TikTok ',
		link: 'https://www.tiktok.com/@hello.bobaelmonte'
	},
	{
		media: 'Facebook',
		link: 'https://www.facebook.com/hellobobaelmonte/'
	}	
]

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

	const startRotation = () => {
		gsap.to(kiwiRef.value, {
			repeat: -1,
			ease: 'none',
			duration: 10,
			rotate: 360,
		})
	}

	watch(hasPlayedIntro, async (isDone) => {
		if (isDone) {

			const timeline = gsap.timeline()

			document.body.style.overflow = 'hidden'

			timeline.fromTo(heroImage.value, {
				scale: 1.2,
				autoAlpha: 0,
				filter: 'blur(20px)'
			}, {
				scale: 1,
				autoAlpha: 1,
				filter: 'blur(0px)',
				duration: 2.5,
				ease: "expo.out"
			});

			timeline.fromTo(textContent.value, {
				y: 20,
				autoAlpha: 0
			},{
				y: 0,
				autoAlpha: 1,
				duration: 1.5,
				stagger: 0.3,
				ease: "power2.out"
			}, "-=1.5");

			timeline.fromTo(logoRef.value, {
				scale: 0.8,
				autoAlpha: 0
			},{
				scale: 1,
				autoAlpha: 1, 
				duration: 1,
				ease: "back.out(1.7)",
				onComplete: () => {
					document.body.style.overflow = '';
				}
			}, "<"); 

			timeline.add(startFloating, "-=1");

			timeline.fromTo(bannerRef.value, {
				y: -40,
				autoAlpha: 0,
				filter: 'blur(10px)'
			},{
				y: 0,
				duration: 1.5,
				ease: 'elastic.out(1,0.5)',
				autoAlpha: 1,
				filter: 'blur(0px)'
			}, '-=1');

			timeline.fromTo(bannerTextRef.value, {
				autoAlpha: 0
			},{
				duration: 2,
				ease: 'sine.out',
				autoAlpha: 1
			}, '<')
			.to(bannerTextRef.value, {
				repeat: -1,
				xPercent: -50,
				duration: 25,
				ease: 'none'
			}, '<');

			timeline.add(startBanner, '<');
			timeline.add(startRotation, '<');

			const footerTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '.hours-text',
					start: 'top 65%'
				},
			})

			footerTimeline.from(['.hours-text', '.visit-text'], {
				autoAlpha: 0,
				duration: 0.6,
				ease: 'expo.out',
				y: -50,
				stagger: 0.1
			})
			.from('.kiwi-circle', {
				autoAlpha: 0,
				duration: 0.8,
				ease: 'elastic.out(1,0.5)',
				scale: 0
			}, '<')
			.from(kiwiRef.value, {
				borderWidth: 0,
				duration: 0.2,
				ease: 'sine.out'
			}, '<')
			.from('.days-text', {
				x: -50,
				autoAlpha: 0,
				duration: 0.5,
				ease: 'sine.out',
				stagger: 0.05
			}, '<+=0.3')
			.from('.location-tag', {
				scale: 0,
				autoAlpha: 0,
				ease: 'elastic.out(1,0.5)',
				duration: 0.7,
				stagger: 0.3
			}, '<+=0.1')
			.from('.address-text', {
				x: 50,
				autoAlpha: 0,
				ease: 'sine.out',
				stagger: 0.07,
				duration: 0.5
			}, '<+=0.2');

			let footerBoba = new SplitText('.footer-boba', { type: 'chars,words', charsClass: 'text-transparent bg-clip-text bg-gradient-to-b from-white to-[#84cc16]' });

			footerTimeline.from(footerBoba.chars, {
				y: 80,                
				rotationX: -90,        
				autoAlpha: 0,
				stagger: 0.05,         
				duration: 0.8,
				ease: 'back.out(1.5)'
			}, '<+=0.2');

			footerTimeline.from('.social-media', {
				stagger: 0.2,
				ease: 'sine.out',
				duration: 0.5,
				autoAlpha: 0,
				y: 10
			}, '<+=0.5');
		}
	}, { immediate: true });

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
    <div ref="heroImage" class="absolute inset-0 z-0 scale-[1.2] blur-[20px]">
      <NuxtPicture 
        src="/HelloHero.png" 
        class="h-full w-full object-cover"
        :img-attrs="{ class: 'h-full w-full object-cover opacity-70' }"
      />
    </div>

    <div ref="textContent" class="relative z-10 text-center px-4 pb-32 mb-10 max-w-2xl opacity-0">
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

	<div ref="bannerRef" class="relative w-full -mt-20 overflow-hidden py-10 -mb-16 z-30 pointer-events-none opacity-0">
    <div class="bg-[#3f6212] py-4 border-y-4 border-[#a3e635] w-full rotate-2 scale-110 relative flex items-center justify-center">
      <div ref="bannerTextRef" class="whitespace-nowrap translate-x-1/4 flex gap-4 text-[#ecfccb] text-4xl font-[900] uppercase italic tracking-tighter">
        <span v-for="n in 10" :key="n">
          boba comes free with any drink &nbsp;•
        </span>
      </div>
    </div>
	</div>

	<div ref="bouncingContainerRef" class="relative">
		<div class="absolute inset-0 w-full bg-white h-full pointer-events-none z-0">
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
		<svg class="absolute -scale-y-100 bottom-0 left-0 w-full text-[#3f6212] fill-current h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
				<path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
		</svg>
	</div>

	<div class="relative bg-[#3f6212] pt-8 pb-12 overflow-hidden text-[#ecfccb]">
		<div class="max-w-7xl mx-auto px-6 text-center relative z-10">
			<div class="grid grid-cols-3 gap-10 items-center w-full max-w-5xl mx-auto mb-12">
  
				<div class="text-right flex flex-col justify-center">
					<h3 class="hours-text text-white font-black font-sans uppercase tracking-widest text-xl mb-4">Hours</h3>
					<ul class="space-y-2 text-sm font-bold tracking-wide">
						<li class="days-text" v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday']">{{ day }}: <span class="font-normal opacity-80">11:00 AM - 9:00 PM</span></li>
						<li class="days-text" v-for="day in ['Friday', 'Saturday', 'Sunday']">{{ day }}: <span class="font-normal opacity-80">11:00 AM - 10:00 PM</span></li>
					</ul>
				</div>

				<div class="kiwi-circle flex justify-center">
					<div ref="kiwiRef" class="w-48 h-48 px-8 py-11 rounded-full bg-[#ecfccb] border-8 border-[#84cc16] shadow-2xl flex items-center justify-center">
						<NuxtPicture class="aspect-square h-full w-full" src="/kiwiboba.png" />
					</div>
				</div>

				<div class="text-left flex flex-col justify-center">
					<h3 class="visit-text text-white font-black font-sans uppercase tracking-widest text-xl mb-4">Visit Us</h3>
					<div class="text-sm gap-6 flex flex-col font-normal opacity-80 space-y-1">
						<div class="flex flex-row gap-4">
							<NuxtPicture :img-attrs="{ class: 'location-tag h-16 w-auto object-cover invert' }" src="/locationpointer.png"/>
							<div class="flex flex-col">
								<NuxtLink
									class="hover:text-green-400 transition-colors duration-300"
									to="https://www.google.com/maps/place/Hello+Boba/data=!4m7!3m6!1s0x80c2d1db6c36bda3:0x1fdf3db0b5303a86!8m2!3d34.062467!4d-118.0311685!16s%2Fg%2F11ftxdfmv7!19sChIJo702bNvRwoARhjowtbA93x8?authuser=0&hl=en&rclk=1"
								>
									<p class="address-text">11230 Garvey Ave #C</p>
									<p class="address-text">El Monte, CA 91733</p>
								</NuxtLink>
								<a href="tel:+16263617058" class="address-text inline-block mt-1 text-sm font-bold tracking-widest text-white hover:text-green-400 transition-colors duration-300">
									+16263617058
								</a>
							</div>
						</div>
						<div class="flex flex-row gap-4">
							<NuxtPicture :img-attrs="{ class: 'location-tag h-16 w-auto object-cover invert' }" src="/locationpointer.png"/>
							<div class="flex flex-col">
								<NuxtLink
									class="hover:text-green-400 transition-colors duration-300"
									to="https://www.google.com/maps/place/Hello+Boba/data=!4m7!3m6!1s0x80c2d91f75934401:0x7f2669691ab068dc!8m2!3d34.0899773!4d-118.0139066!16s%2Fg%2F11y64hq1f9!19sChIJAUSTdR_ZwoAR3GiwGmlpJn8?authuser=0&hl=en&rclk=1"
								>
									<p class="address-text">4788 Peck Rd</p>
									<p class="address-text">El Monte, CA 91732</p>
								</NuxtLink>
								<a href="tel:+16263617055" class="address-text inline-block mt-1 text-sm font-bold tracking-widest text-white hover:text-green-400 transition-colors duration-300">
									+16263617055
								</a>
							</div>
						</div>
					</div>
				</div>

			</div>
			<h2 class="footer-boba text-9xl font-sans font-[900] tracking-tighter mb-8 ">
				Hello Boba
			</h2>
			<div class="flex justify-center gap-8 text-sm font-bold tracking-[0.3em] uppercase opacity-70">
				<NuxtLink 
					v-for="social in socialMediaLinks"
					:key="social.media"
					:to="social.link"
					target="_blank"
					rel="noopenner noreferrer"
					class="social-media text-zinc-400 cursor-pointer transition-colors hover:text-green-400"	
				>{{ social.media }}</NuxtLink>
			</div>
		</div>
		<h1 class="mt-8 font-sans font-[700] text-xl text-zinc-500 tracking-wide text-center">© 2026 Hello Boba. All rights reserved.</h1>
	</div>
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