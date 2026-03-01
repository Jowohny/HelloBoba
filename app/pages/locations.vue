<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

const hasPlayedIntro = useState('playedIntro', () => false);

const headerRef = ref(null);
const card1TextRef = ref<HTMLElement | null>(null);
const card2TextRef = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.to('.text-1', { 
    xPercent: -50, 
    duration: 50, 
    repeat: -1, 
    ease: 'none' 
  });
  
	gsap.set('.text-2', { xPercent: -50 })
  gsap.to('.text-2', { 
    xPercent: 0, 
    duration: 50, 
    repeat: -1, 
    ease: 'none' 
  });

  gsap.to(['.path-1', '.path-3'], { 
    strokeDashoffset: -60, 
    duration: 1.5, 
    repeat: -1, 
    ease: 'none' 
  });
  
  gsap.to(['.path-2', '.path-4'], { 
    strokeDashoffset: 60,
    duration: 2, 
    repeat: -1, 
    ease: 'none' 
  });

  gsap.to('.pin-1', {
    y: -40,
    rotation: -10,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  gsap.to('.pin-2', {
    y: 30,
    rotation: 15,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    delay: 1
  });

	watch(hasPlayedIntro, async (isDone) => {
		if (isDone) {
			await nextTick();
			const timeline = gsap.timeline();

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					timeline.fromTo(headerRef.value, {
						autoAlpha: 0,
						y: -30
					}, {
						y: 0,
						autoAlpha: 1,
						duration: 1,
						ease: 'expo.out'
					})

					timeline.fromTo('.location-card', {
						autoAlpha: 0, 
						y: 60
					}, {
						y: 0,
						autoAlpha: 1,
						duration: 0.8,
						stagger: 0.15,
						ease: 'back.out(1.2)'
					}, '-=0.5')


					timeline.fromTo(['.location1-tag', '.location2-tag'], {
						autoAlpha: 0,
						scale: 0.5
					}, {
						scale: 1,
						autoAlpha: 1,
						duration: 0.8,
						ease: 'elastic.out(1,0.7)'
					}, '-=0.45')
					
					const children1 = card1TextRef.value ? Array.from(card1TextRef.value.children) : [];
					const children2 = card2TextRef.value ? Array.from(card2TextRef.value.children) : [];

					timeline.fromTo([...children1, ...children2], {
						autoAlpha: 0,
						x: -20
					}, {
						autoAlpha: 1,
						x: 0,
						duration: 0.6,
						stagger: 0.08,
						ease: 'power2.out'
					}, "-=0.6")
					.fromTo('.action-button', {
						autoAlpha: 0,
						y: 20,
						scale: 0.95
					}, {
						autoAlpha: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						stagger: 0.1,
						ease: 'back.out(1.5)'
					}, "<+=0.15");
				})
			})
		}
	}, { immediate: true });
});

</script>

<template>
  <div class="min-h-screen pt-40 pb-24 px-6 relative z-10 overflow-hidden bg-[#f6f6f6]">
    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden flex flex-col justify-center">
      <div class="absolute inset-0 flex flex-col justify-center gap-16 opacity-[0.06] blur-[1.5px] scale-110 -rotate-[2deg]">
        <div class="text-1 flex whitespace-nowrap text-[12vw] font-black font-sans text-green-900 tracking-tighter uppercase">
          <span v-for="n in 4" :key="'l'+n" class="px-8">Garvey Ave • El Monte •</span>
        </div>
        <div class="text-2 flex whitespace-nowrap text-[12vw] font-black font-sans text-green-900 tracking-tighter uppercase">
          <span v-for="n in 4" :key="'r'+n" class="px-8">Peck Road • El Monte •</span>
        </div>
      </div>
      <div class="pin-1 absolute top-[10%] left-[10%] w-[30vw] max-w-sm opacity-[0.04] filter blur-[1.5px]">
        <NuxtPicture src="/locationpointer.png" class="w-full h-auto object-contain" />
      </div>
      <div class="pin-2 absolute bottom-[5%] right-[5%] w-[40vw] max-w-lg opacity-[0.04] filter blur-[2px]">
        <NuxtPicture src="/locationpointer.png" class="w-full h-auto object-contain" />
      </div>

      <svg class="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 1440 800">
        <path 
          class="path-1" 
          d="M-100,600 C200,600 300,200 600,300 C900,400 1000,100 1500,200" 
          fill="none" 
          stroke="#65a30d" 
          stroke-width="4" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
        <path 
          class="path-2" 
          d="M-100,200 C300,100 400,700 800,600 C1200,500 1300,300 1500,400" 
          fill="none" 
          stroke="#84cc16" 
          stroke-width="6" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
				<path 
          class="path-3" 
          d="M-100,400 C200,800 500,0 800,400 C1100,800 1300,100 1500,300" 
          fill="none" 
          stroke="#a3e635" 
          stroke-width="3" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
				<path 
          class="path-4" 
          d="M-100,600 C400,600 900,800 1100,500 C1300,200 900,100 900,400 C900,700 1300,700 1600,400" 
          fill="none" 
          stroke="#bef264" 
          stroke-width="7" 
          stroke-dasharray="30 30" 
          stroke-linecap="round"
        />
      </svg>
    </div>

		<div class="max-w-7xl mx-auto relative z-10">
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm">
          Visit Us
        </span>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-8xl tracking-tighter font-black font-sans pb-2">
          Our Locations
        </h1>
        <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto">
          Two spots in El Monte to get your boba fix. Find our hours of operation, directions to either location, as well as any contact info you may need below.
        </p>
      </div>
    </div>

		<div class="w-3/4 relative z-10 grid grid-cols-2 mx-auto gap-8">
			<div class="location-card text-center bg-[#f6f6f6] p-5 shadow-xl border border-zinc-300/30 rounded-3xl opacity-0">
				<iframe 
					class="w-full" 
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1301.133246728493!2d-118.03310547593489!3d34.06255790259282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d1db6c36bda3%3A0x1fdf3db0b5303a86!2sHello%20Boba!5e0!3m2!1sen!2sus!4v1772080070106!5m2!1sen!2sus" 
					width="600" 
					height="450" 
					:style="{
						border: '2px solid #000',
						borderRadius: '15px'
					}" 
					loading="lazy" 
					referrerpolicy="no-referrer-when-downgrade"
				/>
				<div class="flex flex-row justify-between">
					<div>
						<div class="location1-tag rounded-full w-fit bg-green-300 border border-2 border-green-600/40 uppercase px-2 py-1 my-3 font-sans tracking-wide text-sm leading-none font-extrabold opacity-0">
							Location 01
						</div>
						<div ref="card1TextRef" class="flex flex-col text-start">
							<p class="uppercase text-3xl font-sans tracking-tight font-black">Garvey Avenue</p>
							<div class="my-2 opacity-0">
								<p class="text-zinc-600/70 font-sans font-bold text-sm">11230 Garvey Ave #C</p>
								<p class="text-zinc-600/70 font-sans font-bold text-sm">El Monte, CA 91733</p>
							</div>
							<div class="opacity-0">
								<p class="text-black font-sans font-black text-md tracking-wide leading-tight">Monday-Thursday: <span class="text-zinc-600/80 font-bold tracking-none">11:00AM-9:00PM</span></p>
								<p class="text-black font-sans font-black text-md tracking-wide leading-tight">Friday-Sunday: <span class="text-zinc-600/80 font-bold tracking-none">11:00AM-10:00PM</span></p>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-3 justify-end shrink-0">
						<a 
							href="tel:+16263617058" 
							class="action-button opacity-0 flex items-center justify-center w-auto px-8 py-4 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 font-bold text-md transition-colors shadow-lg border border-zinc-300"
						>
							Call Store
						</a>
						<a 
							href="https://maps.google.com/maps/dir//Hello+Boba+11230+Garvey+Ave+%23C+El+Monte,+CA+91733/@34.062467,-118.0311685,18z/data=!4m5!4m4!1m0!1m2!1m1!1s0x80c2d1db6c36bda3:0x1fdf3db0b5303a86" 
							target="_blank" 
							class="action-button opacity-0 flex items-center justify-center w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#65a30d] to-[#4d7c0f] hover:from-[#4d7c0f] hover:to-[#3f6212] text-white font-bold text-md transition-colors shadow-lg shadow-green-600/50"
						>
							Get Directions
						</a>
					</div>
				</div>
			</div>
			<div class="location-card text-center bg-[#f6f6f6] p-5 shadow-xl border border-zinc-300/30 rounded-3xl opacity-0">
				<iframe 
					class="w-full" 
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13216.80613067854!2d-118.03296101284182!3d34.08997730000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d91f75934401%3A0x7f2669691ab068dc!2sHello%20Boba!5e0!3m2!1sen!2sus!4v1772089565821!5m2!1sen!2sus" 
					width="600" 
					height="450" 
					:style="{
						border: '2px solid #000',
						borderRadius: '15px'
					}" 
					loading="lazy" 
					referrerpolicy="no-referrer-when-downgrade"
				/>
				<div class="flex flex-row justify-between">
					<div>
						<div class="location2-tag rounded-full w-fit bg-green-300 border border-2 border-green-600/40 uppercase px-2 py-1 my-3 font-sans tracking-wide text-sm leading-none font-extrabold opacity-0">
							Location 02
						</div>
						<div ref="card2TextRef" class="flex flex-col text-start">
							<p class="uppercase text-3xl font-sans tracking-tight font-black">Peck Road</p>
							<div class="my-2 opacity-0">
								<p class="text-zinc-600/70 font-sans font-bold text-sm">4788 Peck Rd</p>
								<p class="text-zinc-600/70 font-sans font-bold text-sm">El Monte, CA 91732</p>
							</div>
							<div class="opacity-0">
								<p class="text-black font-sans font-black text-md tracking-wide leading-tight">Monday-Thursday: <span class="text-zinc-600/80 font-bold tracking-none">11:00AM-9:00PM</span></p>
								<p class="text-black font-sans font-black text-md tracking-wide leading-tight">Friday-Sunday: <span class="text-zinc-600/80 font-bold tracking-none">11:00AM-10:00PM</span></p>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-3 justify-end shrink-0">
						<a 
							href="tel:+16263617055" 
							class="action-button opacity-0 flex items-center justify-center w-auto px-8 py-4 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 font-bold text-md transition-colors shadow-lg border border-zinc-300"
						>
							Call Store
						</a>
						<a 
							href="https://www.google.com/maps/dir//Hello+Boba,+11230+Garvey+Ave+%23C,+El+Monte,+CA+91733/@34.062467,-118.0311685,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x80c2d1db6c36bda3:0x1fdf3db0b5303a86!2m2!1d-118.0311685!2d34.062467?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D"
							target="_blank" 
							class="action-button opacity-0 flex items-center justify-center w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#65a30d] to-[#4d7c0f] hover:from-[#4d7c0f] hover:to-[#3f6212] text-white font-bold text-md transition-colors shadow-lg shadow-green-600/50"
						>
							Get Directions
						</a>
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