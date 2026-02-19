<script setup lang="ts">
import { onMounted } from 'vue'; 
import gsap from 'gsap';


onMounted(() => {
	gsap.from('.bubble-layer-1', {
		backgroundPosition: '900px 900px',
		ease: 'none',
		duration: 120,
		repeat: -1
	})

	gsap.to('.bubble-layer-2', {
		backgroundPosition: "900px 900px",
		duration: 60,
		ease: "none",
		repeat: -1
	});
})
</script>

<template>
  <div>
    <div class="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#f6f6f6]">
      <div 
				class="bubble-layer-1 absolute inset-0 w-[200%] h-[200%] opacity-40"
				:style="{
					  backgroundImage: 'radial-gradient(circle, #84cc16 4px, transparent 4px)',
						backgroundSize: '40px 40px'
				}"
				/>
      <div 
				class="bubble-layer-2 absolute inset-0 w-[200%] h-[200%] opacity-30 top-[-50%] left-[-50%]"
				:style="{
					  backgroundImage: 'radial-gradient(circle, #84cc16 6px, transparent 6px)',
						backgroundSize: '90px 90px'
				}"/>
    </div>
  </div>
</template>
