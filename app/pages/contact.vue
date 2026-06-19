<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';

usePageSeo({
  title: 'Contact — Hello Boba',
  description: 'Have a question, feedback, or want to inquire about a job opening? Reach out to Hello Boba in El Monte.'
});

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
const honeypot = ref('');
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const cardRef = ref<HTMLElement | null>(null);
const headerRef = ref<{ $el?: HTMLElement } | HTMLElement | null>(null);

const canSubmit = computed(() =>
  Boolean(name.value && email.value && message.value) && status.value !== 'sending'
);

const submit = async () => {
  if (!canSubmit.value) return;
  status.value = 'sending';
  errorMessage.value = '';
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
        website: honeypot.value
      }
    });
    status.value = 'success';
    name.value = '';
    subject.value = '';
    email.value = '';
    message.value = '';
  } catch (e: any) {
    status.value = 'error';
    errorMessage.value = e?.data?.statusMessage || e?.statusMessage || 'Something went wrong. Please try again.';
  }
};

const resolveEl = (r: any) => r?.$el ?? r;

onMounted(() => {
  const floaters = gsap.utils.toArray('.floater');

  floaters.forEach((floater: any) => {
    const speed = gsap.utils.random(15, 30);
    const drift = gsap.utils.random(-80, 80);
    const startDelay = gsap.utils.random(-speed, 0);

    gsap.fromTo(floater, {
      y: '100vh',
      x: 0,
      rotation: gsap.utils.random(-90, 90)
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

useIntroSequence((timeline) => {
  timeline.fromTo(resolveEl(headerRef.value), {
    autoAlpha: 0,
    y: -30
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 1,
    ease: 'expo.out'
  });

  const contactElements = cardRef.value ? Array.from(cardRef.value.children) : [];

  timeline.fromTo(cardRef.value!, {
    autoAlpha: 0,
    y: 50
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 1,
    ease: 'back.out'
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
  }, '<+=0.4');
});

onBeforeUnmount(() => {
  gsap.killTweensOf('.floater');
});
</script>

<template>
  <div class="min-h-screen pt-40 pb-32 md:pb-48 px-4 md:px-6 relative z-10 overflow-hidden">
    <div class="fixed inset-0 w-full h-full -z-10 overflow-hidden" aria-hidden="true">
      <div
        class="absolute inset-0 z-[5]"
        :style="{
          backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`,
          backgroundSize: `100% 100%`
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
      <PageHeader
        ref="headerRef"
        eyebrow="Reach Out"
        title="Say Hello"
        description="Have a question, feedback, or want to inquire about any job openings? Just send us an email down below about anything you may want to know."
      />
      <div 
        ref="cardRef"
        class="w-full flex flex-col gap-6 text-left mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-green-900/5 border border-zinc-400/50 p-6 md:p-10 shadow-2xl z-20 opacity-0"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0">
          <div class="flex flex-col gap-2">
            <label for="name" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Name</label>
            <input 
              id="name"
              v-model="name" 
              type="text" 
              placeholder="Jane Doe"
              class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-4 py-3 md:px-5 md:py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
            >
          </div>

          <div class="flex flex-col gap-2">
            <label for="subject" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Subject</label>
            <input 
              id="subject"
              v-model="subject" 
              type="text" 
              placeholder="General Inquiry"
              class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-4 py-3 md:px-5 md:py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
            >
          </div>
        </div>

        <div class="flex flex-col col-span-1 md:col-span-2 gap-2 opacity-0">
          <label for="email" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Email</label>
          <input 
            id="email"
            v-model="email"
            type="email"
            placeholder="janedoe123@company.com"
            class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-4 py-3 md:px-5 md:py-3 text-zinc-700 font-semibold outline-none transition-colors shadow-inner"
          >
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" class="text-xs font-black uppercase tracking-widest text-green-700/70 ml-2">Message</label>
          <textarea 
            id="message"
            v-model="message" 
            rows="10"
            placeholder="How can we help you today?"
            class="w-full bg-white/50 border border-green-600/30 focus:border-green-500 rounded-2xl px-4 py-3 md:px-5 md:py-4 text-zinc-700 font-semibold outline-none transition-colors shadow-inner resize-none"
          />
        </div>

        <input
          v-model="honeypot"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          class="absolute -left-[9999px] w-0 h-0 opacity-0"
        >

        <p
          v-if="status === 'success'"
          role="status"
          class="rounded-2xl bg-green-100/80 border border-green-300/70 px-5 py-4 text-green-900 font-semibold text-sm"
        >
          Thanks! Your message is on its way — we'll get back to you soon.
        </p>
        <p
          v-else-if="status === 'error'"
          role="alert"
          class="rounded-2xl bg-red-100/80 border border-red-300/70 px-5 py-4 text-red-900 font-semibold text-sm"
        >
          {{ errorMessage }}
        </p>

        <div class="mt-2 flex justify-end opacity-0">
          <button
            type="button"
            :disabled="!canSubmit"
            :aria-disabled="!canSubmit"
            @click="submit"
            :class="[
              canSubmit
                ? 'bg-gradient-to-r from-[#65a30d] to-[#4d7c0f] text-white shadow-lg shadow-green-600/30 hover:scale-105 cursor-pointer'
                : 'bg-zinc-200/50 text-zinc-400 cursor-not-allowed'
            ]"
            class="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
          >
            {{ status === 'sending' ? 'Sending...' : 'Send Message' }}
            <svg v-if="status !== 'sending'" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

