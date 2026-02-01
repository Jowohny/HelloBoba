<script setup lang="ts">
	const tabs = [
		{ tabName: 'News', link: '/news' },
		{ tabName: 'Menu', link: '/menu' },
		{ tabName: 'Locations', link: '/locations' },
		{ tabName: 'Contact Us', link: '/contact' }
	]
</script>

<template>
	<div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 w-[80%] px-6 py-3 rounded-full shadow-xl shadow-green-500/20">
		<NuxtLink to="/" class="flex items-baseline no-underline font-black text-3xl tracking-tighter text-green-500">
			<span>HELLO</span>
			<span class="text-amber-800">BOBA</span>
		</NuxtLink>

		<div class="flex items-center gap-2">
			<NuxtLink
				v-for="tab in tabs"
				:key="tab.tabName"
				:to="tab.link"
				class="px-4 py-2 rounded-full font-bold text-md text-gray-700"
				active-class="bg-green-500/15 text-green-600"
			>
				{{ tab.tabName }}
			</NuxtLink>
		</div>

		<NuxtLink to="#" class="px-5 py-2 rounded-full font-extrabold text-md text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
			TBA
		</NuxtLink>
	</div>
	<div class="pt-28">
		<slot />
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Nunito', sans-serif;
}
</style>