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

const name = ref('');
const subject = ref('');
const email = ref('');
const message = ref('');
const destinationEmail = 'jvu1009@gmail.com';

const cardRef = ref<HTMLElement>();
const headerRef = ref('');

const mailtoLink = computed(() => {
  const formattedBody = `Hi Hello Boba team,%0D%0A%0D%0A${message.value}%0D%0A%0D%0AFrom: ${name.value}%0D%0A${email.value}`;
  return `mailto:${destinationEmail}?subject=${encodeURIComponent(subject.value)}&body=${formattedBody}`;
});

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

	const timeline = gsap.timeline();

	timeline.fromTo(headerRef.value, {
		autoAlpha: 0,
		y: -30
	}, {
		autoAlpha: 1,
		y: 0,
		duration: 1,
		ease: 'expo.out'
	})

	const contactElements = cardRef.value ? Array.from(cardRef.value.children) : []

	timeline.fromTo(cardRef.value!, {
		autoAlpha: 0,
		scale: 0
	}, {
		autoAlpha: 1,
		scale: 1,
		duration: 1.8,
		ease: 'elastic.out(1,0.7)'
	}, '<+=0.5')
	.fromTo(contactElements, {
		autoAlpha: 0,
		y: -30
	}, {
		autoAlpha: 1,
		y: 0,
		duration: 0.6,
		ease: 'sine.out',
		stagger: 0.1
	}, '<+=0.8')
});
</script>

<template>
  <div class="min-h-screen pt-40 pb-24 px-6 relative z-10 overflow-hidden">
    <div class="fixed inset-0 w-full h-full -z-10 overflow-hidden">
			<div
				className="absolute inset-0 z-[5]"
				:style="{
					backgroundImage: `
						radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
					`,
					backgroundSize: `100% 100%`,
				}"
			/>
      <div 
				v-for="item in backgroundItems"
				class="floater absolute top-0 font-black font-sans text-green-700/15 leading-none z-10"
				:key="item.symbol"
				:class="[item.size, item.position]"
			>
				{{ item.symbol }}
			</div>
      <div 
				v-for="ball in backgroundBalls"
				class="floater absolute top-0 backdrop-blur-sm rounded-full shadow-inner border border-zinc-900/5 z-10"
				:class="[ball.color, ball.position, ball.size]"
				:key="ball.position"
			/>
    </div>
		<div class="max-w-4xl mx-auto relative z-50">      
			<div
				ref="headerRef" 
				class="text-center mb-16 opacity-0"
			>
				<span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm shadow-sm">
					Reach Out
				</span>
				<h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-8xl tracking-tighter font-black font-sans pb-2">
					Say Hello
				</h1>
				<p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto">
					Have a question, feedback, or want to inquire about any job openings? Just send us an email down below about anything you may want to know.
				</p>
			</div>
			<div 
				ref="cardRef"
				class="w-full flex flex-col gap-6 text-left mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-green-900/5 border border-3 border-zinc-400/50 p-10 shadow-2xl z-20"
			>
				<div class="grid grid-cols-2 gap-6">
					<div class="flex flex-col gap-2">
						<label for="name" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Name</label>
						<input 
							id="name"
							v-model="name" 
							type="text" 
							placeholder="Jane Doe"
							class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-5 py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
						>
					</div>

					<div class="flex flex-col gap-2">
						<label for="subject" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Subject</label>
						<input 
							id="subject"
							v-model="subject" 
							type="text" 
							placeholder="General Inquiry"
							class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-5 py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
						>
					</div>
				</div>

				<div class="flex flex-col col-span-2 gap-2">
					<label for="email" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Email</label>
					<input 
						id="email"
						v-model="email" 
						type="text" 
						placeholder="janedoe123@company.com"
						class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-5 py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
					>
				</div>

				<div class="flex flex-col gap-2">
					<label for="message" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Message</label>
					<textarea 
						id="message"
						v-model="message" 
						rows="10"
						placeholder="How can we help you today?"
						class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-5 py-4 text-zinc-700 font-semibold outline-none transition-colors shadow-inner resize-none"
					/>
				</div>

				<div class="mt-2 flex justify-end">
					<a 
						:href="name && message ? mailtoLink : 'javascript:void(0)'"
						:class="[
							'inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300',
							name && message 
								? 'bg-gradient-to-r from-[#65a30d] to-[#4d7c0f] text-white shadow-lg shadow-green-600/30 hover:scale-105 cursor-pointer' 
								: 'bg-zinc-200/50 text-zinc-400 cursor-not-allowed'
						]"
					>
						Open in Mail App
						<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
					</a>
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