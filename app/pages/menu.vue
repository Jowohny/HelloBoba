<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

const menuItems = [
  { type: 'Creme Brulee Series', name: 'Creme Brulee Oreo Smoothie', price: { R: '🚫', L: '$7.85' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: false, CF: true, image: '/drinks/CBOS.png' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Matcha Smoothie', price: { R: '🚫', L: '$7.85' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: false, CF: false, image: '/drinks/CBMS.png' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Thai Tea', price: { R: '🚫', L: '$6.85' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: false, CF: false, image: '/drinks/CBTT.png' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Brown Sugar Boba Milk', price: { R: '🚫', L: '$6.85' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: false, CF: true, image: '/drinks/CBBSBM.png' },

  { type: 'Mojito', name: 'Original Mojito', price: { R: '$4.95', L: '$5.45' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Mango Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of mango syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Strawberry Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of strawberry syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Honeydew Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of honeydew syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Watermelon Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of watermelon syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Passion Fruit Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of passion fruit syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Lychee Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of lychee syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Peach Mojito', price: { R: '$5.20', L: '$5.70' }, desc: 'A lemonade-like beverage that contains a hint of peach syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },

  { type: 'Fresh Tea', name: 'Jasmine Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Freshly brewed floral jasmine green tea, served perfectly chilled.', DF: true, CF: false, image: '/drinks/JGT.png' },
  { type: 'Fresh Tea', name: 'Honey Jasmine Green Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Floral jasmine green tea lightly sweetened with pure, natural honey.', DF: true, CF: false, image: '/drinks/HJGT.png' },
  { type: 'Fresh Tea', name: 'Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Deeply aromatic oolong tea with a rich, roasted flavor profile.', DF: true, CF: false, image: '/drinks/ROT.png' },
  { type: 'Fresh Tea', name: 'Sea Cream Green Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our classic green tea topped with a thick, savory-sweet sea salt cheese foam.', DF: false, CF: false, image: '/drinks/SCGT.png' },
  { type: 'Fresh Tea', name: 'Sea Cream Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Roasted oolong tea crowned with our signature whipped sea cream.', DF: false, CF: false, image: '/drinks/SCOT.png' },
  { type: 'Fresh Tea', name: 'Black Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Robust, full-bodied premium black tea brewed fresh daily.', DF: true, CF: false, image: '' },

  { type: 'Fruit Tea', name: 'Mango Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Refreshing green tea shaken with sweet, tropical mango puree.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Strawberry Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Jasmine green tea infused with the bright, tart flavor of real strawberries.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Honeydew Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Light green tea mixed with the mellow, refreshing taste of honeydew melon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Watermelon Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Summer in a cup—green tea shaken with crisp watermelon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Passion Fruit Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'A tropical delight blending green tea with tangy passion fruit.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Lychee Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Floral lychee perfectly balances the earthy notes of our green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Peach Green Tea', price: { R: '$4.85', L: '$5.35' }, desc: 'Sweet, juicy peach flavors mixed with our signature green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Pink Lychee', price: { R: '$5.45', L: '$5.95' }, desc: 'A beautiful, refreshing blend of lychee and secret floral notes.', DF: true, CF: false, image: '' },

  { type: 'Milk Tea Classic', name: 'Roasted Oolong Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our deeply roasted oolong tea blended with creamy, rich milk.', DF: false, CF: false, image: '/drinks/ROMT.png' },
  { type: 'Milk Tea Classic', name: 'Honey Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Floral jasmine milk tea sweetened naturally with rich honey.', DF: false, CF: false, image: '/drinks/HJGMT.png' },
  { type: 'Milk Tea Classic', name: 'Royal Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our premium house black tea blended with rich cream for a luxurious texture.', DF: false, CF: false, image: '/drinks/RoyalMT.png' },
  { type: 'Milk Tea Classic', name: 'Caramel Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Classic milk tea layered with deep, buttery caramel notes.', DF: false, CF: false, image: '/drinks/CMT.png' },
  { type: 'Milk Tea Classic', name: 'Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'A delicate, floral milk tea made from our premium jasmine green tea leaves.', DF: false, CF: false, image: '/drinks/JGMT.png' },
  { type: 'Milk Tea Classic', name: 'Thai Iced Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Authentic, sweet, and spiced Thai tea topped with a float of cream.', DF: false, CF: false, image: '/drinks/TIT.png' },
  { type: 'Milk Tea Classic', name: 'Thai Green Milk Tea', price: { R: '$5.85', L: '$6.35' }, desc: 'A floral, vibrant green tea variation of our classic sweet Thai iced tea.', DF: false, CF: false, image: '/drinks/TGMT.png' },
  { type: 'Milk Tea Classic', name: 'Earl Grey Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Fragrant black tea infused with bergamot orange and blended with milk.', DF: false, CF: false, image: '/drinks/EGMT.png' },
  { type: 'Milk Tea Classic', name: 'Taro Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Creamy milk tea blended with the sweet, starchy goodness of taro.', DF: true, CF: false, image: '/drinks/TMT.png' },
  { type: 'Milk Tea Classic', name: 'Rose Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'A beautifully floral milk tea infused with delicate rose syrup.', DF: false, CF: false, image: '/drinks/RoseMT.png' },
  { type: 'Milk Tea Classic', name: 'Oreo Garden Milk Tea', price: { R: '🚫', L: '$6.10' }, desc: 'A decadent milk tea topped with crushed Oreo cookies for a dessert-like treat.', DF: false, CF: false, image: '/drinks/OGMT.png' },

  { type: 'Slushie', name: 'Mango Mango', price: { R: '🚫', L: '$6.60' }, desc: 'An icy, refreshing slushie bursting with double the tropical mango flavor.', DF: true, CF: true, image: '/drinks/MM.png' },
  { type: 'Slushie', name: 'Very Strawberry', price: { R: '🚫', L: '$6.60' }, desc: 'A perfectly blended, ice-cold strawberry slushie that is sweet and tart.', DF: true, CF: true, image: '/drinks/VS.png' },
  { type: 'Slushie', name: 'Chamango Mango', price: { R: '🚫', L: '$6.60' }, desc: 'A sweet and spicy mango slushie swirled with savory chamoy and Tajín.', DF: true, CF: true, image: '/drinks/CM.png' },

  { type: 'Smoothie', name: 'Taro Taro', price: { R: '🚫', L: '$6.60' }, desc: 'A rich, thick, and creamy smoothie packed with sweet taro flavor.', DF: false, CF: true, image: '/drinks/TT.png' },
  { type: 'Smoothie', name: 'Horchata', price: { R: '🚫', L: '$6.60' }, desc: 'A creamy, cinnamon-spiced smoothie inspired by the classic Mexican drink.', DF: false, CF: true, image: '/drinks/HCC.png' },
  { type: 'Smoothie', name: 'Nana Berry', price: { R: '🚫', L: '$6.60' }, desc: 'A smooth, classic blend of ripe bananas and sweet strawberries.', DF: false, CF: true, image: '/drinks/NB.png' },
  { type: 'Smoothie', name: 'Caramel Macchiato', price: { R: '🚫', L: '$6.60' }, desc: 'An icy, blended coffee smoothie layered with rich caramel drizzle.', DF: false, CF: false, image: '/drinks/CaramelM.png' },
  { type: 'Smoothie', name: 'Caramel Thai', price: { R: '🚫', L: '$6.60' }, desc: 'Sweet Thai tea blended into a frosty smoothie and swirled with caramel.', DF: false, CF: true, image: '/drinks/CTT.png' },

  { type: 'Coffee', name: 'Coffee Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'The perfect pick-me-up combining our classic milk tea with a shot of strong coffee.', DF: false, CF: false, image: '/drinks/CMT.png' },
  { type: 'Coffee', name: 'Chocolate Cream Mocha', price: { R: '$5.85', L: '$6.35' }, desc: 'Rich chocolate and robust coffee blended with milk for a decadent treat.', DF: false, CF: false, image: '/drinks/CCM.png' },
  { type: 'Coffee', name: 'Vietnamese Coffee (Iced)', price: { R: '$5.85', L: '$6.35' }, desc: 'Strong, traditional slow-dripped robusta coffee mixed with sweetened condensed milk. (No Ice, +$3)', DF: false, CF: false, image: '/drinks/VIC.png' },
  { type: 'Coffee', name: 'Vanilla Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, desc: 'Smooth espresso and chilled milk sweetened with aromatic vanilla.', DF: false, CF: false, image: '/drinks/C&VCL.png' },
  { type: 'Coffee', name: 'Caramel Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, desc: 'Iced coffee and milk perfectly balanced with buttery caramel syrup.', DF: false, CF: false, image: '/drinks/C&VCL.png' },

  { type: 'Matcha Series', name: 'Mango Matcha Latte', price: { R: '🚫', L: '$6.60' }, desc: 'Earthy, premium matcha layered over sweet, tropical mango puree and milk.', DF: false, CF: false, image: '/drinks/MML.png' },
  { type: 'Matcha Series', name: 'Creme Brulee Matcha Smoothie', price: { R: '🚫', L: '$7.85' }, desc: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: false, CF: false, image: '/drinks/CBMS.png' },
  { type: 'Matcha Series', name: 'Matcha Boba Milk Tea', price: { R: '$5.85', L: '$6.35' }, desc: 'Earthy matcha and creamy milk perfectly paired with our signature boba.', DF: false, CF: false, image: '/drinks/MBMT.png' },
  { type: 'Matcha Series', name: 'Strawberry Matcha Latte', price: { R: '🚫', L: '$6.60' }, desc: 'A beautiful layered drink of ceremonial matcha, milk, and fresh strawberry puree.', DF: false, CF: false, image: '/drinks/SML.png' },

  { type: 'Butterfly Series', name: 'Butterfly Mango', price: { R: '🚫', L: '$6.60' }, desc: 'A mesmerizing, color-changing butterfly pea flower tea layered with sweet mango.', DF: false, CF: false, image: '/drinks/BM.png' },
  { type: 'Butterfly Series', name: 'Butterfly Strawberry', price: { R: '🚫', L: '$6.60' }, desc: 'Vibrant butterfly pea tea poured over a refreshing strawberry base.', DF: false, CF: false, image: '/drinks/BS.png' },
  { type: 'Butterfly Series', name: 'Butterfly Lychee', price: { R: '🚫', L: '$6.60' }, desc: 'A magical, color-changing floral tea perfectly paired with sweet lychee.', DF: false, CF: false, image: '/drinks/BL.png' },
  { type: 'Butterfly Series', name: 'Butterfly Coconut', price: { R: '🚫', L: '$6.60' }, desc: 'Tropical coconut milk layered with our striking, deep blue butterfly pea tea.', DF: false, CF: false, image: '/drinks/BC.png' },

  { type: 'Boba Milk', name: 'Brown Sugar Boba Milk', price: { R: '$5.35', L: '$5.95' }, desc: 'Warm, slow-cooked brown sugar boba swirled with ice-cold organic milk.', DF: false, CF: true, image: '/drinks/BSBM.png' },
  { type: 'Boba Milk', name: 'Brown Sugar Boba Milk Tea', price: { R: '$5.60', L: '$6.10' }, desc: 'Our classic black milk tea elevated with rich, roasted brown sugar boba.', DF: false, CF: false, image: '/drinks/BSBMT.png' },
  { type: 'Boba Milk', name: 'Strawberry Boba Milk', price: { R: '$5.85', L: '$6.35' }, desc: 'Creamy, caffeine-free milk mixed with sweet strawberry puree and boba.', DF: false, CF: true, image: '/drinks/SBM.png' },
  { type: 'Boba Milk', name: 'Matcha Boba Milk Tea', price: { R: '$5.85', L: '$6.35' }, desc: 'Earthy matcha and creamy milk perfectly paired with our signature boba.', DF: false, CF: false, image: '/drinks/MBMT.png' },
  { type: 'Boba Milk', name: 'Brown Sugar Roasted Oolong Milk Tea', price: { R: '$5.70', L: '$6.20' }, desc: 'Deeply roasted oolong milk tea enhanced with our warm brown sugar boba.', DF: false, CF: false, image: '/drinks/BSROMT.png' },
];

const toppings = [
  { name: 'Mango Jelly', desc: 'A chewy, gel-based topping infused with sweet tropical mango flavor.', image: '/toppings/MangoJelly.png'},
  { name: 'Lychee Jelly', desc: 'Translucent, firm jelly bits with a delicate, floral grape-like sweetness.', image: '/toppings/LycheeJelly.png'},
  { name: 'Coffee Jelly', desc: 'Robust and slightly bitter cubes made from real coffee to balance sweet milk teas.', image: '/toppings/CoffeeJelly.png'},
  { name: 'Grass Jelly', desc: 'A traditional, herbal jelly with a mild minty undertone and a silky texture.', image: '/toppings/GrassJelly.png'},
  { name: 'Rainbow Jelly', desc: 'Colorful, multi-flavored coconut strips that offer a firm and playful chew.', image: '/toppings/RainbowJelly.png'},
  { name: 'Aloe Vera', desc: 'Refreshing, juicy cubes of real aloe plant that are light and naturally sweet.', image: '/toppings/AloeVera.png'},
  { name: 'Egg Pudding', desc: 'A smooth, custard-like topping with a rich vanilla and caramelized sugar taste.', image: '/toppings/EggPudding.png'},
  { name: 'Sea Salt Cream', desc: 'A thick, frothy milk foam layer with a savory saltiness that cuts through sweetness.', image: '/toppings/SeaCream.png'},
  { name: 'Creme Brulee', desc: 'A decadent, creamy swirl inspired by the classic French dessert with hints of toasted sugar.', image: '/toppings/CremeBrulee.png'}
];

const boba = [
  { name: 'Brown Sugar Boba', desc: 'Our base boba choice, made with tapioca starch, flavored with brown sugar and chewy in texture.', image: ''},
  { name: 'Strawberry Popping Boba', desc: 'Liquid-filled balls with the essence and goodness of strawberry with a juicy burst of flavor.', image: ''},
  { name: 'Peach Popping Boba', desc: 'Liquid-filled balls with the essence and goodness of peach with a juicy burst of flavor.', image: ''},
  { name: 'Black & White Boba', desc: 'A half & half mix of our crystal and brown sugar boba, for people who are indecisive.', image: ''},
  { name: 'Crystal Boba', desc: 'A clear, agar-based topping known for its light, crunchy texture.', image: ''}
];

const food = [
  {
    type: 'Macarons',
    items: [
      { name: 'Vanilla', image: '' },
      { name: 'Chocolate', image: '' },
      { name: 'Raspberry', image: '' },
      { name: 'Birthday Cake', image: '' },
      { name: 'Taro', image: '' },
      { name: 'Strawberrys n Cream', image: '' },
      { name: 'Cookies n Cream', image: '' },
      { name: 'Coffee', image: '' }
    ]
  },
  {
    type: 'Cakes',
    items: [
      { name: 'Cheesecake', image: '' },
      { name: 'Chocolate', image: '' },
      { name: 'Tres Leches', image: '' },
      { name: 'Tiramisu', image: '' }
    ]
  }
];

const sections = [ 'drinks', 'toppings', 'boba', 'food' ]

const headerRef = ref(null);
const drinksRef = ref(null);

const hasPlayedIntro = useState('playedIntro', () => false);
const currentHover = useState('hovering', () => false);

const currentMenuConfigure = ref<string>('drinks');
const firstTime = ref<boolean>(false);
const scrollCheckL = ref<boolean>(true);
const scrollCheckR = ref<boolean>(true);

const totalBoba = ref<number>(60);
let resizeTimer: ReturnType<typeof setTimeout>;

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

const bobas = ref<any[]>([]);

const updateDisplayAmount = () => {
  clearTimeout(resizeTimer);
  
  resizeTimer = setTimeout(async () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        totalBoba.value = 10; 
      } else if (window.innerWidth < 1024) {
        totalBoba.value = 20; 
      } else {
        totalBoba.value = 30;
      }
    }
    
    gsap.killTweensOf('.boba-pearl');

    bobas.value = [];
    createRandomBoba();

    await nextTick();
    animateBobaElements();
  }, 250);
};

const slideRight = () => {
  const element = document.getElementById('catBox');
  const innerWidth = element ? element.clientWidth : 0;
  if (element) {
    element.scrollBy({
      left: innerWidth/3,
      behavior: 'smooth'
    })
  }
}

const slideLeft = () => {
  const element = document.getElementById('catBox');
  const innerWidth = element ? element.clientWidth : 0;
  if (element) {
    element.scrollBy({
      left: -innerWidth/3,
      behavior: 'smooth'
    })
  }
}

const checkScrollButtons = () => {
  const element = document.getElementById('catBox') as HTMLElement;

  scrollCheckL.value = element.scrollLeft <= 0;
  scrollCheckR.value = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
}

const createRandomBoba = () => {
  const newBobas = []; 
  
  for (let i = 0; i < totalBoba.value; i++) {
    const sizeClass = ['w-3 h-3', 'w-5 h-5', 'w-8 h-8', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'][i % 5];
    const leftPos = (i * 13) % 100; 
    
    let depthClass = 'opacity-90 z-20 blur-[0.9px]';
    if (i % 3 === 0) depthClass = 'blur-[3px] opacity-40 z-0';
    if (i % 4 === 0) depthClass = 'blur-[1px] opacity-70 z-10'; 
    
    newBobas.push({
      id: Math.random(),
      size: sizeClass,
      left: `${leftPos}%`,
      depth: depthClass
    });
  }

  bobas.value = newBobas;
}

const animateBobaElements = () => {
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
}

onMounted(() => {
  const catBox = document.getElementById('catBox') as HTMLElement;

  if (catBox) {
    checkScrollButtons();
    catBox.addEventListener('scroll', checkScrollButtons)
  }

  updateDisplayAmount();
  createRandomBoba();
  
  nextTick(() => {
    animateBobaElements();
  });

  window.addEventListener('resize', updateDisplayAmount);

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
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out'
          })

          timeline.fromTo(drinksRef.value, {
            autoAlpha: 0,
            yPercent: 20
          }, {
            autoAlpha: 1,
            duration: 1,
            yPercent: 0,
            ease: 'back.out',
            clearProps: 'all',
            onComplete: () => {
              firstTime.value = true;
            }
          }, '<+=0.4')

          const menuSections = gsap.utils.toArray('.menu-section');

          timeline.fromTo(menuSections, {
            autoAlpha: 0,
          }, {
            autoAlpha: 1,
            duration: 0.8,
            ease: 'sine.out',
            stagger: 0.1
          }, '<-=0.5')

          const sections = gsap.utils.toArray('.section');

          sections.forEach((section: any) => {
            timeline.fromTo(section, {
              autoAlpha: 0,
              x: 40,
              rotate: gsap.utils.random(-5,5)
            }, {
              autoAlpha: 1,
              rotate: 0,
              x: 0,
              duration: 0.4,
              ease: 'none',
            }, '<+=0.05')
          })

          const splitSectionTitle = new SplitText('.drink-section', { type: 'chars,words', charsClass: 'opacity-0' });

          timeline.fromTo(splitSectionTitle.chars, {
            autoAlpha: 0,
          }, {
            autoAlpha: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.04
          }, '<')

          const drinkItems = gsap.utils.toArray('.drink-item');

          timeline.fromTo(drinkItems, {
            autoAlpha: 0,
            x: 50
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out'
          }, '<+=0.3')  
        })
      })
    } 
  }, { immediate: true })
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDisplayAmount);
})


watch(activeTab, (newTab) => {
	if (newTab) {	
		const activeEl = document.getElementById(`tab-${newTab.replace(/\s+/g, '-')}`);

		if (activeEl) {
			activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}	
});
</script>

<template>
  <div class="min-h-screen pt-32 md:pt-40 pb-24 px-4 md:px-6 relative z-10 overflow-hidden">
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
      <div ref="headerRef" class="text-center mb-8 opacity-0">
        <span class="inline-block px-4 py-1.5 mb-4 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 font-bold tracking-widest text-xs md:text-sm uppercase backdrop-blur-sm">
          Freshly Brewed
        </span>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-[#65a30d] to-[#3f6212] text-5xl md:text-8xl tracking-tighter font-black font-sans pb-2">
          Menu Items
        </h1>
        <p class="text-zinc-500 font-semibold mt-4 max-w-lg mx-auto text-sm md:text-base">
          Take a look at all our freshly brewed teas, milk tea variations, smoothies, and other specialty drinks. For
          anyone who's hungry, we also have our small selection of cakes and cookies.
        </p>
      </div>
      <div class="relative flex flex-wrap lg:flex-nowrap justify-center lg:justify-around px-2 md:px-8 z-5">
        <div
          class="menu-section relative h-32 w-40 md:w-56 z-50 -mb-2 transition-all duration-500 opacity-0 cursor-none drop-shadow-xl"
          :class="currentMenuConfigure === section ? '-translate-y-[10%]' : ''"
          @mouseenter="currentHover = true"
          @mouseleave="currentHover = false"
          @click="[currentMenuConfigure = section]"
          v-for="section in sections"
          :key="section"
        >
          <svg 
            viewBox="0 0 240 140" 
            class="absolute top-0 left-0 w-full h-full transition-colors duration-500 pointer-events-none"
            :class="currentMenuConfigure === section ? 'text-green-300' : 'text-[#f6f6f6]'"
          >
            <circle cx="60" cy="65" r="35" fill="currentColor" />
            <circle cx="120" cy="50" r="45" fill="currentColor" />
            <circle cx="180" cy="65" r="35" fill="currentColor" />
            <ellipse cx="120" cy="75" rx="85" ry="30" fill="currentColor" /> 

            <circle cx="212" cy="105" r="10" fill="currentColor"/>
            <circle cx="230" cy="115" r="6" fill="currentColor"/>
          </svg>
          <h3 class="relative z-10 text-xl md:text-2xl text-transparent -translate-y-[10%] bg-clip-text bg-gradient-to-b from-white to-[#8f1c67] font-[900] w-full h-full font-sans tracking-wide mt-2 flex justify-center uppercase items-center">
            {{ section }}
          </h3>
        </div>
      </div>
      <div class="grid relative w-full mt-8">
        <div
          ref="drinksRef"
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="[firstTime && currentMenuConfigure === 'drinks' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]']"
        >
          <div class="flex flex-row justify-center">
            <button 
              @click="slideLeft" 
              :disabled="scrollCheckL"
              class="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95 p-3 md:p-4 mr-2 disabled:opacity-70 cursor-none"
            >
              <NuxtPicture 
                src="/leftchevron.png"
                class="w-full h-full flex items-center justify-center" 
                :img-attrs="{ class: 'w-full h-full object-contain' }" 
              />
            </button>
            <div id="catBox" class="flex overflow-x-auto gap-3 pt-1 pb-8 border-b-2 border-green-500/20">
              <button v-for="cat in categories" :key="cat" @click="activeTab = cat" :id="`tab-${cat.replace(/\s+/g, '-')}`" @mouseenter="currentHover = true" @mouseleave="currentHover = false" :class="[ 'section px-4 md:px-5 py-2 md:py-2.5 rounded-2xl font-bold text-xs md:text-sm tracking-wide whitespace-nowrap transition-all duration-300 border border-zinc-500/30', activeTab === cat ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/50' : 'bg-white/50 text-zinc-500 border-transparent hover:bg-white hover:text-zinc-800 shadow-md shadow-zinc-500/50', firstTime ? '' : 'opacity-0' ]">
                {{ cat }}
              </button>
            </div>
            <button 
              @click="slideRight" 
              :disabled="scrollCheckR" 
              class="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all active:scale-95 p-3 md:p-4 ml-2 disabled:opacity-70 cursor-none"
            >
              <NuxtPicture 
                src="/rightchevron.webp" 
                class="w-full h-full flex items-center justify-center" 
                loading="lazy" 
                :img-attrs="{ class: 'w-full h-full object-contain' }" 
              />
            </button>
          </div>
          <h2 class="drink-section text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2 mt-6">
            {{ activeTab }}
          </h2>
          <div class="grid relative min-h-[500px]">
            <div v-for="category in categories" :key="category" class="col-start-1 row-start-1 flex flex-col gap-2 transition-opacity duration-300 ease-in-out" :class="activeTab === category ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'">
              <div v-for="item in groupedMenu[category]" :key="item.name" class="drink-item group flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-4 lg:gap-0">
                <div class="flex flex-1 items-start md:items-center gap-4 md:gap-5 pr-0 lg:pr-4 w-full">
                  <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                    <img :src="item.image" class="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.1]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-3 mb-2">
                      <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ item.name }}</h3>
                      <div class="flex gap-2 flex-wrap">
                        <span v-if="item.DF" class="px-2 py-1 rounded-md bg-orange-100/80 text-orange-700 text-[10px] font-black tracking-widest border border-orange-200">Dairy Free</span>
                        <span v-if="item.CF" class="px-2 py-1 rounded-md bg-purple-100/80 text-purple-700 text-[10px] font-black tracking-widest border border-purple-200">Caffeine Free</span>
                      </div>
                    </div>
                    <p class="text-xs md:text-sm font-semibold text-zinc-500 max-w-2xl">{{ item.desc }}</p>
                  </div>
                </div>
                <div class="flex w-full lg:w-auto justify-center lg:justify-start gap-6 lg:pl-4 mt-2 lg:mt-0 pt-2 lg:pt-0 border-t border-zinc-300 lg:border-t-0">
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Reg (16oz)</span>
                    <span class="font-black text-base md:text-lg text-zinc-800">{{ item.price.R }}</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Lrg (24oz)</span>
                    <span class="font-black text-base md:text-lg text-green-700">{{ item.price.L }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'toppings' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2">Toppings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-min">
            <div v-for="topping in toppings" :key="topping.name" class="group flex flex-row justify-between items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-0">
              <div class="flex flex-1 items-center gap-4 md:gap-5 pr-0 md:pr-4 w-full">
                <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                  <img :src="topping.image" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ topping.name }}</h3>
                  </div>
                  <p class="text-xs md:text-sm font-semibold text-zinc-500 max-w-2xl">{{ topping.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'boba' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-3 pb-2">Boba</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-min">
            <div v-for="b in boba" :key="b.name" class="group flex flex-row justify-between items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-0">
              <div class="flex items-center gap-4 md:gap-5 w-full">
                <div class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center">
                  <img v-if="b.image" :src="b.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span v-else class="text-2xl md:text-3xl opacity-50 grayscale">🧋</span>
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <h3 class="text-lg md:text-xl font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{{ b.name }}</h3>
                  </div>
                  <p class="text-xs md:text-sm font-semibold text-zinc-500">{{ b.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-start-1 row-start-1 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-12 shadow-2xl shadow-green-900/10 transition-all duration-500"
          :class="firstTime && currentMenuConfigure === 'food' ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none opacity-0 translate-y-[20%]'"
        >
          <div v-for="f in food" :key="f.type" class="mb-12">
            <h2 class="text-3xl md:text-4xl font-black text-center font-sans text-green-800 mb-4 pb-2 border-b-2 border-green-500/10">{{ f.type }}</h2>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              <div v-for="flavor in f.items" :key="flavor.name" class="group flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-green-500/10 hover:shadow-sm gap-4">
                <div class="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center shadow-inner">
                  <img v-if="flavor.image" :src="flavor.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span v-else class="text-3xl md:text-4xl opacity-50 grayscale">🍰</span>
                </div>
                <h3 class="text-base md:text-lg font-bold text-center text-zinc-800 group-hover:text-green-700 transition-colors leading-tight">{{ flavor.name }}</h3>
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