<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

const menuItems = [
  { type: 'Mojito', name: 'Original Mojito', price: { R: '$4.95', L: '$5.45' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Mango Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of mango syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Strawberry Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of strawberry syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Honeydew Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of honeydew syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Watermelon Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of watermelon syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Passion Fruit Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of passion fruit syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Lychee Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of lychee syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Peach Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of peach syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },

	{ type: 'Fresh Tea', name: 'Jasmine Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Freshly brewed floral jasmine green tea, served perfectly chilled.', DF: true, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Honey Jasmine Green Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Floral jasmine green tea lightly sweetened with pure, natural honey.', DF: true, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Deeply aromatic oolong tea with a rich, roasted flavor profile.', DF: true, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Sea Cream Green Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our classic green tea topped with a thick, savory-sweet sea salt cheese foam.', DF: false, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Sea Cream Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Roasted oolong tea crowned with our signature whipped sea cream.', DF: false, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Black Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Robust, full-bodied premium black tea brewed fresh daily.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Mango Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Refreshing green tea shaken with sweet, tropical mango puree.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Strawberry Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Jasmine green tea infused with the bright, tart flavor of real strawberries.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Honeydew Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Light green tea mixed with the mellow, refreshing taste of honeydew melon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Watermelon Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Summer in a cup—green tea shaken with crisp watermelon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Passion Fruit Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'A tropical delight blending green tea with tangy passion fruit.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Lychee Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Floral lychee perfectly balances the earthy notes of our green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Peach Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Sweet, juicy peach flavors mixed with our signature green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Pink Lychee', price: { R: '$5.45', L: '$5.95' }, desc: 'A beautiful, refreshing blend of lychee and secret floral notes.', DF: true, CF: false, image: '' },

	{ type: 'Milk Tea Classic', name: 'Roasted Oolong Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our deeply roasted oolong tea blended with creamy, rich milk.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Honey Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Floral jasmine milk tea sweetened naturally with rich honey.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Royal Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our premium house black tea blended with rich cream for a luxurious texture.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Caramel Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Classic milk tea layered with deep, buttery caramel notes.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'A delicate, floral milk tea made from our premium jasmine green tea leaves.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Thai Iced Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Authentic, sweet, and spiced Thai tea topped with a float of cream.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Thai Green Milk Tea', price: { R: '$5.85', L: '$6.35' }, desc: 'A floral, vibrant green tea variation of our classic sweet Thai iced tea.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Earl Grey Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Fragrant black tea infused with bergamot orange and blended with milk.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Taro Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Creamy milk tea blended with the sweet, starchy goodness of taro.', DF: true, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Rose Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'A beautifully floral milk tea infused with delicate rose syrup.', DF: false, CF: false, image: '' },
  { type: 'Milk Tea Classic', name: 'Oreo Garden Milk Tea', price: { R: '🚫', L: '$6.10' }, desc: 'A decadent milk tea topped with crushed Oreo cookies for a dessert-like treat.', DF: false, CF: false, image: '' },

	{ type: 'Slushie', name: 'Mango Mango', price: { R: '🚫', L: '$6.60' }, desc: 'An icy, refreshing slushie bursting with double the tropical mango flavor.', DF: true, CF: true, image: '' },
  { type: 'Slushie', name: 'Very Strawberry', price: { R: '🚫', L: '$6.60' }, desc: 'A perfectly blended, ice-cold strawberry slushie that is sweet and tart.', DF: true, CF: true, image: '' },
  { type: 'Slushie', name: 'Chamango Mango', price: { R: '🚫', L: '$6.60' }, desc: 'A sweet and spicy mango slushie swirled with savory chamoy and Tajín.', DF: true, CF: true, image: '' },

	{ type: 'Smoothie', name: 'Taro Taro', price: { R: '🚫', L: '$6.60' }, desc: 'A rich, thick, and creamy smoothie packed with sweet taro flavor.', DF: false, CF: true, image: '' },
  { type: 'Smoothie', name: 'Horchata', price: { R: '🚫', L: '$6.60' }, desc: 'A creamy, cinnamon-spiced smoothie inspired by the classic Mexican drink.', DF: false, CF: true, image: '' },
  { type: 'Smoothie', name: 'Nana Berry', price: { R: '🚫', L: '$6.60' }, desc: 'A smooth, classic blend of ripe bananas and sweet strawberries.', DF: false, CF: true, image: '' },
  { type: 'Smoothie', name: 'Caramel Macchiato', price: { R: '🚫', L: '$6.60' }, desc: 'An icy, blended coffee smoothie layered with rich caramel drizzle.', DF: false, CF: false, image: '' },
  { type: 'Smoothie', name: 'Caramel Thai', price: { R: '🚫', L: '$6.60' }, desc: 'Sweet Thai tea blended into a frosty smoothie and swirled with caramel.', DF: false, CF: true, image: '' },

	{ type: 'Coffee', name: 'Coffee Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'The perfect pick-me-up combining our classic milk tea with a shot of strong coffee.', DF: false, CF: false, image: '' },
  { type: 'Coffee', name: 'Chocolate Cream Mocha', price: { R: '$5.85', L: '$6.35' }, desc: 'Rich chocolate and robust coffee blended with milk for a decadent treat.', DF: false, CF: false, image: '' },
  { type: 'Coffee', name: 'Vietnamese Coffee (Iced)', price: { R: '$5.85', L: '$6.35' }, desc: 'Strong, traditional slow-dripped robusta coffee mixed with sweetened condensed milk. (No Ice, +$3)', DF: false, CF: false, image: '' },
  { type: 'Coffee', name: 'Vanilla Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, desc: 'Smooth espresso and chilled milk sweetened with aromatic vanilla.', DF: false, CF: false, image: '' },
  { type: 'Coffee', name: 'Caramel Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, desc: 'Iced coffee and milk perfectly balanced with buttery caramel syrup.', DF: false, CF: false, image: '' },

	{ type: 'Matcha Series', name: 'Mango Matcha Latte', price: { R: '🚫', L: '$6.60' }, desc: 'Earthy, premium matcha layered over sweet, tropical mango puree and milk.', DF: false, CF: false, image: '' },
  { type: 'Matcha Series', name: 'Strawberry Matcha Latte', price: { R: '🚫', L: '$6.60' }, desc: 'A beautiful layered drink of ceremonial matcha, milk, and fresh strawberry puree.', DF: false, CF: false, image: '' },

	{ type: 'Butterfly Series', name: 'Butterfly Mango', price: { R: '🚫', L: '$6.60' }, desc: 'A mesmerizing, color-changing butterfly pea flower tea layered with sweet mango.', DF: false, CF: false, image: '' },
  { type: 'Butterfly Series', name: 'Butterfly Strawberry', price: { R: '🚫', L: '$6.60' }, desc: 'Vibrant butterfly pea tea poured over a refreshing strawberry base.', DF: false, CF: false, image: '' },
  { type: 'Butterfly Series', name: 'Butterfly Lychee', price: { R: '🚫', L: '$6.60' }, desc: 'A magical, color-changing floral tea perfectly paired with sweet lychee.', DF: false, CF: false, image: '' },
  { type: 'Butterfly Series', name: 'Butterfly Coconut', price: { R: '🚫', L: '$6.60' }, desc: 'Tropical coconut milk layered with our striking, deep blue butterfly pea tea.', DF: false, CF: false, image: '' },

	{ type: 'Boba Milk', name: 'Brown Sugar Boba Milk', price: { R: '$5.35', L: '$5.95' }, desc: 'Warm, slow-cooked brown sugar boba swirled with ice-cold organic milk.', DF: false, CF: true, image: '' },
  { type: 'Boba Milk', name: 'Brown Sugar Boba Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our classic black milk tea elevated with rich, roasted brown sugar boba.', DF: false, CF: false, image: '' },
  { type: 'Boba Milk', name: 'Strawberry Boba Milk', price: { R: '$5.85', L: '$6.35' }, desc: 'Creamy, caffeine-free milk mixed with sweet strawberry puree and boba.', DF: false, CF: true, image: '' },
  { type: 'Boba Milk', name: 'Matcha Boba Milk Tea', price: { R: '$5.85', L: '$6.35' }, desc: 'Earthy matcha and creamy milk perfectly paired with our signature boba.', DF: false, CF: false, image: '' },
  { type: 'Boba Milk', name: 'Brown Sugar Roasted Oolong Milk Tea', price: { R: '$5.70', L: '$6.20' }, desc: 'Deeply roasted oolong milk tea enhanced with our warm brown sugar boba.', DF: false, CF: false, image: '' }
];

const groupedMenu = computed(() => {
  const dictionary: Record<string, typeof menuItems> = {};
  
  for (const item of menuItems) {
    if (!dictionary[item.type]) {
      dictionary[item.type] = [];
    }
    dictionary[item.type]!.push(item);
  }
  
  return dictionary;
});

const categories = computed(() => Object.keys(groupedMenu.value));

const activeTab = ref(categories.value[0]);

const currentDrinks = computed(() => groupedMenu.value[activeTab.value!] || []);

const bobas = Array.from({ length: 60 }).map((_, i) => {
  const sizeClass = ['w-3 h-3', 'w-5 h-5', 'w-8 h-8', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'][i % 5];
  
  const leftPos = (i * 13) % 100; 
  
  let depthClass = 'opacity-90 z-20 blur-[0.9px]';
  if (i % 3 === 0) depthClass = 'blur-[3px] opacity-40 z-0';
  if (i % 4 === 0) depthClass = 'blur-[1px] opacity-70 z-10'; 

  return {
    id: i,
    size: sizeClass,
    left: `${leftPos}%`,
    depth: depthClass
  };
});

onMounted(() => {
  const bobaElements = gsap.utils.toArray('.boba-pearl');

  bobaElements.forEach((boba: any) => {
    const speed = gsap.utils.random(5, 15);    
    const drift = gsap.utils.random(-40, 40);
    
    const startDelay = gsap.utils.random(-speed, 0); 

    gsap.fromTo(boba, {
      y: '-15vh',
      x: 0,
      rotation: gsap.utils.random(0, 360)
    }, {
      y: '115vh',
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
  <div class="min-h-screen pt-40 pb-24 px-6 relative z-10 overflow-hidden">
    <div class="fixed inset-0 w-full h-full pointer-events-none overflow-hidden bg-gradient-to-b from-[#18ffe7]/40 to-[#fa1d1c]/30">
      <div
        v-for="boba in bobas"
        :key="boba.id"
        class="boba-pearl absolute top-0 rounded-full bg-[#1a1311]"
        :class="[boba.size, boba.depth]"
        :style="{ left: boba.left }"
     	/>
    </div>
		<div class="max-w-7xl mx-auto relative z-10">
      <div ref="headerRef" class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs uppercase backdrop-blur-sm">
          Freshly Brewed
        </span>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-8xl tracking-tighter font-black font-sans pb-2">
          Menu Items
        </h1>
        <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto">
          Take a look at all our freshly brewed teas, milk tea variations, smoothies, and other specialty drinks. For
					anyone who's hungry, we also have our small selection of cakes and cookies.
        </p>
      </div>
			<div class="w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl shadow-green-900/10">
        <div class="flex overflow-x-auto gap-3 pb-6 mb-6 border-b-2 border-green-500/20">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeTab = cat"
            :class="[
              'px-5 py-2.5 rounded-2xl font-bold text-sm tracking-wide whitespace-nowrap transition-all duration-300 border border-zinc-500/30',
              activeTab === cat
                ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/30'
                : 'bg-white/50 text-zinc-500 border-transparent hover:bg-white hover:text-zinc-800'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <h2 class="text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2">
          {{ activeTab }}
        </h2>

				<div class="flex flex-col gap-2 min-h-[500px]">
          <div 
            v-for="item in currentDrinks" 
            :key="item.name" 
            class="group flex flex-row justify-between items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-0"
          >
            <div class="flex flex-1 items-center gap-5 pr-4 w-full">
              <div class="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                <img v-if="item.image" :src="item.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span v-else class="text-3xl opacity-50 grayscale">🧋</span>
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <h3 class="text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">
                    {{ item.name }}
                  </h3>
                  <div class="flex gap-2">
                    <span v-if="item.DF" class="px-2 py-1 rounded-md bg-orange-100/80 text-orange-700 text-[10px] font-black tracking-widest border border-orange-200">Dairy Free</span>
                    <span v-if="item.CF" class="px-2 py-1 rounded-md bg-purple-100/80 text-purple-700 text-[10px] font-black tracking-widest border border-purple-200">Caffeine Free</span>
                  </div>
                </div>
                <p class="text-sm font-semibold text-zinc-500 max-w-2xl">
                  {{ item.desc }}
                </p>
              </div>
            </div>
            <div class="flex gap-6 self-auto pl-4">
              <div class="flex flex-col items-center">
                <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Reg (16oz)</span>
                <span class="font-black text-lg text-zinc-800">
                  {{ item.price.R }}
                </span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Lrg (24oz)</span>
                <span class="font-black text-lg text-green-700">
                  {{ item.price.L }}
                </span>
              </div>
            </div>
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