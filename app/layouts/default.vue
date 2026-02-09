<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue'
  import gsap from 'gsap'
	import { SplitText } from "gsap/SplitText";

	gsap.registerPlugin(SplitText) 

  const tabs = [
    { tabName: 'News', link: '/news' },
    { tabName: 'Menu', link: '/menu' },
    { tabName: 'Locations', link: '/locations' },
    { tabName: 'Contact Us', link: '/contact' }
  ]

  const navbarRef = ref(null);
  const bobaRef = ref(null);
  const nameRef = ref(null);
  const pageRefs = ref<any[]>([]);
  const orderRef = ref(null);

	const helloTextRef = ref(null);
	const bobaTextRef = ref(null);

  const getEl = (refValue: any) => refValue?.$el || refValue;

  function setPageRef(el: any, index: number) {
    if (el) {
      pageRefs.value[index] = el.$el || el;
    }
  }

  onMounted(async() => {
    await nextTick();

    if (!navbarRef.value) return;

    const bobaEl = getEl(bobaRef.value);
    const nameEl = getEl(nameRef.value);
    const orderEl = getEl(orderRef.value);
    const linksEls = pageRefs.value;

		let splitHello = new SplitText(helloTextRef.value, { type: 'chars' })
		let splitBoba = new SplitText(bobaTextRef.value, { type: 'chars' })

		const enableHover = () => {
			nameEl.addEventListener('mouseenter', () => {
				gsap.to(nameEl, { 
					scale: 1.2, 
					x: 15, 
					duration: 0.3,
					ease: 'power2.out' 
				});
			});

			nameEl.addEventListener('mouseleave', () => {
				gsap.to(nameEl, { 
					scale: 1, 
					x: 0, 
					duration: 0.3, 
					ease: 'power2.in' 
				});
			});

			bobaEl.addEventListener('mouseenter', () => {
				gsap.to(bobaEl, { 
					scale: 1.6, 
					rotate: 20,
					duration: 0.3,
					ease: 'power2.out' 
				});
			});

			bobaEl.addEventListener('mouseleave', () => {
				gsap.to(bobaEl, { 
					scale: 1.3, 
					rotate: 0,
					duration: 0.3, 
					ease: 'power2.in' 
				});
			});

			orderEl.addEventListener('mouseenter', () => {
				gsap.to(orderEl, { 
					scale: 1.2, 
					duration: 0.3,
					ease: 'power2.out' 
				});
			});

			orderEl.addEventListener('mouseleave', () => {
				gsap.to(orderEl, { 
					scale: 1, 
					duration: 0.3, 
					ease: 'power2.in' 
				});
			});
  	};


    const timeline = gsap.timeline()

    timeline.set([bobaEl, linksEls, orderEl], { 
      autoAlpha: 0 
    })
		.set(nameEl, {
			scale: 4,
			x: '16vw'
		})

    timeline.set(navbarRef.value, { 
      transformOrigin: "center center" ,
			width: '100vw',
			height: '100vh',
			top: '0%',
			left: '50%',
			borderRadius: '100px'
    })
		timeline.set(bobaEl, {
			x: '25vh',
			yPercent: 150,
			xPercent: -50,
			scale: 14
		})
		timeline.set(splitHello.chars, {
      autoAlpha: 0,
      x: -10,
      y: -10
    })
		.set(splitBoba.chars, {
      autoAlpha: 0,
      x: 10,
      y: -10
    })

		timeline.to(navbarRef.value, {
			width: '50vh',
			top: '50%',
			left: '50%',
			xPercent: -50,
			yPercent: -50,
			duration: 0.5,
			ease: 'power4.out',
			delay: 0.2
		})
		.to(navbarRef.value, {
			height: '60vh',
			duration: 2,
			ease: 'elastic.out(1,0.75)'
		}, '-=0.2')

    timeline.to(bobaEl, {  
			autoAlpha: 1,
      duration: 1, 
      ease: 'power4.inOut' 
    }, '-=1.5')
		.to(bobaEl, {
			scale: 5,
			autoAlpha: 0,
			duration: 0.5,
			ease: 'power4.out' 
		}, '-=0.5');

		timeline.to(navbarRef.value, {
			height: '20vh',
			duration: 0.8,
			borderRadius: '75px',
			ease: 'power4.inOut' 
		}, '-=0.7')
		.to(navbarRef.value, {
			width: '50vw',
			duration: 0.7,
			ease: 'power4.inOut' 
		}, '-=0.4');

		timeline.to(splitHello.chars, {
      duration: 1,
      stagger: 0.1,
      autoAlpha: 1,
      x: 0,
      y: 0,
			ease: 'elastic.out(1,1)'
    })
		.to(splitBoba.chars, {
      duration: 1,
      stagger: -0.1,
      autoAlpha: 1,
      x: 0,
      y: 0,
			ease: 'elastic.out(1,1)'
    }, '<');

		timeline.to(navbarRef.value, {
			top: '8vh',
			height: '10vh',
			width: '80vw',
			duration: 1,
			ease: 'power4.inOut'
		}, '-=0.3')

		timeline.to(nameEl, {
			scale: 1,
			x: 0,
			xPercent: 5,
			yPercent: 5
		}, '<')
		.to(bobaEl, {
			scale: 0,
			xPercent: 0,
			yPercent: 0,
			x: 0,
			duration: 0
		}, '-=0.2')
		.to(bobaEl, {
			autoAlpha: 1,
			scale: 1.3,
			duration: 1,
			ease: 'elastic.out(1,0.5)',
			onComplete: () => enableHover()
		}, '<')


		timeline.fromTo(linksEls, {
			y: -10
		}, {
			y: 0,
			stagger: 0.1,
			autoAlpha: 1,
			duration: 0.5
		}, '-=0.3')

		timeline.fromTo(orderEl, {
			scale: 2
		}, {
			autoAlpha: 1,
			scale: 1,
			duration: 2,
			ease: 'elastic.out(1,0.5)'
		})
  })
</script>

<template>
  <div ref="navbarRef" class="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-lg flex items-center bg-white/20 justify-between gap-6 w-[80%] h-[10%] px-6 rounded-full border shadow-xl shadow-green-500/20 overflow-hidden">
    <div class="flex flex-row">
			<span ref='bobaRef' class="h-9 w-9 shrink-0 overflow-hidden rounded-full">
				<NuxtPicture class="h-full w-full object-cover cursor-pointer" src="bobalogo.png"/>
			</span>
			<NuxtLink ref="nameRef" to="/" class="subpixel-antialiased flex items-center gap-2 no-underline font-black text-3xl tracking-tighter text-green-500">
				<span ref="helloTextRef">HELLO</span>
				<span ref="bobaTextRef" class="text-amber-800">BOBA</span>
			</NuxtLink>
    </div>

    <div class="flex items-center gap-2">
      <NuxtLink
        v-for="(tab, index) in tabs"
        :key="tab.tabName"
        :ref="(el) => setPageRef(el, index)"
        :to="tab.link"
        class="px-4 py-2 rounded-full font-bold text-md text-gray-700 transition-colors hover:bg-green-600/80 duration-400"
        active-class="bg-green-500/70 text-green-800"
      >
        {{ tab.tabName }}
      </NuxtLink>
    </div>

		<NuxtLink ref="orderRef" to="#" class="px-5 py-2 rounded-full font-extrabold text-md text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
			TBA
		</NuxtLink>
  </div>

  <div class="min-h-screen min-w-full bg-[#f6f6f6]">
    <slot />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>