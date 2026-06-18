<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { locations } from '~/data/locations'
import { socialMediaLinks } from '~/data/social'

const kiwiRef = ref<HTMLElement | null>(null)

const weekdayDays = ['Monday', 'Tuesday', 'Wednesday']
const weekendDays = ['Thursday', 'Friday', 'Saturday', 'Sunday']
const hours = {
  weekday: locations[0]!.weekdayHours,
  weekend: locations[0]!.weekendHours
}

let kiwiTween: gsap.core.Tween | null = null
let footerTimeline: gsap.core.Timeline | null = null
let footerBobaSplit: SplitText | null = null

onMounted(() => {
  if (kiwiRef.value && !usePrefersReducedMotion()) {
    kiwiTween = gsap.to(kiwiRef.value, {
      repeat: -1,
      ease: 'none',
      duration: 10,
      rotate: 360
    })
  }

  footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.hours-text',
      start: 'top 65%'
    }
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
  }, '<+=0.2')

  footerBobaSplit = new SplitText('.footer-boba', {
    type: 'chars,words',
    charsClass: 'text-transparent bg-clip-text bg-gradient-to-b from-white to-[#84cc16]'
  })

  footerTimeline.from(footerBobaSplit.chars, {
    y: 80,
    rotationX: -90,
    autoAlpha: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, '<+=0.2')

  footerTimeline.from('.social-media', {
    stagger: 0.2,
    ease: 'sine.out',
    duration: 0.5,
    autoAlpha: 0,
    y: 10
  }, '<+=0.5')
})

onBeforeUnmount(() => {
  kiwiTween?.kill()
  footerTimeline?.scrollTrigger?.kill()
  footerTimeline?.kill()
  footerBobaSplit?.revert()
})
</script>

<template>
  <div class="relative bg-[#3f6212] pt-8 pb-12 text-[#ecfccb] z-50">
    <WaveDivider class="pointer-events-none absolute -top-16 md:-top-32 left-0 w-full h-16 md:h-32 -scale-y-100 text-[#3f6212] fill-current z-0" />
    <div class="max-w-7xl mx-auto px-6 text-center relative z-10">

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center w-full max-w-5xl mx-auto mb-12">

        <div class="text-center lg:text-right flex flex-col justify-center order-2 lg:order-1">
          <h3 class="hours-text text-white font-black font-sans uppercase tracking-widest text-xl mb-4">Hours</h3>
          <ul class="space-y-2 text-sm font-bold tracking-wide">
            <li class="days-text" v-for="day in weekdayDays" :key="day">{{ day }}: <span class="font-normal opacity-80">{{ hours.weekday }}</span></li>
            <li class="days-text" v-for="day in weekendDays" :key="day">{{ day }}: <span class="font-normal opacity-80">{{ hours.weekend }}</span></li>
          </ul>
        </div>

        <div class="kiwi-circle flex justify-center order-1 lg:order-2">
          <div ref="kiwiRef" class="w-32 h-32 md:w-48 md:h-48 px-4 py-6 md:px-8 md:py-11 rounded-full bg-[#ecfccb] border-8 border-[#84cc16] shadow-2xl flex items-center justify-center">
            <NuxtPicture class="aspect-square h-full w-full" src="/kiwiboba.png" alt="" />
          </div>
        </div>

        <div class="text-center lg:text-left flex flex-col justify-center items-center lg:items-start order-3">
          <h3 class="visit-text text-white font-black font-sans uppercase tracking-widest text-xl mb-4">Visit Us</h3>
          <div class="text-sm gap-6 flex flex-col font-normal opacity-80 space-y-1">
            <div
              v-for="location in locations"
              :key="location.id"
              class="flex flex-row justify-center lg:justify-start gap-4 text-left"
            >
              <NuxtPicture
                :img-attrs="{ class: 'location-tag h-12 md:h-16 w-auto object-cover invert', alt: '' }"
                src="/locationpointer.png"
              />
              <div class="flex flex-col">
                <NuxtLink
                  class="hover:text-green-400 transition-colors duration-300"
                  :to="location.directionsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p class="address-text" v-for="line in location.addressLines" :key="line">{{ line }}</p>
                </NuxtLink>
                <a
                  :href="`tel:${location.phone}`"
                  class="address-text inline-block mt-1 text-sm font-bold tracking-widest text-white hover:text-green-400 transition-colors duration-300"
                >
                  {{ location.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <h2 class="footer-boba text-6xl md:text-9xl font-sans font-[900] tracking-tighter mb-8">
        Hello Boba
      </h2>

      <div class="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
        <NuxtLink
          v-for="social in socialMediaLinks"
          :key="social.media"
          :to="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="social-media text-zinc-400 transition-colors hover:text-green-400"
        >{{ social.media }}</NuxtLink>
      </div>
    </div>
    <p class="mt-8 font-sans font-[700] text-sm md:text-xl text-zinc-500 tracking-wide text-center">© 2026 Hello Boba. All rights reserved.</p>
  </div>
</template>
