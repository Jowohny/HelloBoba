import type { MenuItem, Topping, BobaOption, FoodCategory } from '~/types'

export const menuItems: MenuItem[] = [
  { type: 'Creme Brulee Series', name: 'Creme Brulee Oreo Smoothie', price: { R: '—', L: '$7.85' }, description: 'A cream based smoothie blended with oreo crumbs, vanilla syrup, and creamer powder, topped with whipped cream and oreo crumbs with creme brulee around the cup.', DF: false, CF: true, image: '/drinks/CBOS.webp' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Matcha Smoothie', price: { R: '—', L: '$7.85' }, description: 'A cream based smoothie blended with matcha, creamer powder, and vanilla syrup, topped with whipped cream and matcha powder with creme brulee around the cup.', DF: false, CF: false, image: '/drinks/CBMS.webp' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Thai Tea', price: { R: '—', L: '$6.85' }, description: 'A milk based drink using our classic Thai Iced Tea as its base, with creme brulee around the cup as well as on top.', DF: false, CF: false, image: '/drinks/CBTT.webp' },
  { type: 'Creme Brulee Series', name: 'Creme Brulee Brown Sugar Boba Milk', price: { R: '—', L: '$6.85' }, description: 'A milk based drink containing sweetened milk and a layer of creme brulee on top, finished with brown sugar syrup around the cup.', DF: false, CF: true, image: '/drinks/CBBSBM.webp' },

  { type: 'Mojito', name: 'Original Mojito', price: { R: '$4.95', L: '$5.45' }, description: 'A lemonade-like beverage that contains mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Mango Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of mango syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Strawberry Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of strawberry syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Honeydew Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of honeydew syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Watermelon Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of watermelon syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Passion Fruit Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of passion fruit syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Lychee Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of lychee syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },
  { type: 'Mojito', name: 'Peach Mojito', price: { R: '$5.20', L: '$5.70' }, description: 'A lemonade-like beverage that contains a hint of peach syrup and some mint leaves for the extra kick of freshness.', DF: true, CF: true, image: '' },

  { type: 'Fresh Tea', name: 'Jasmine Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Freshly brewed floral jasmine green tea, served perfectly chilled.', DF: true, CF: false, image: '/drinks/JGT.webp' },
  { type: 'Fresh Tea', name: 'Honey Jasmine Green Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Floral jasmine green tea lightly sweetened with pure, natural honey.', DF: true, CF: false, image: '' },
  { type: 'Fresh Tea', name: 'Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Deeply aromatic oolong tea with a rich, roasted flavor profile.', DF: true, CF: false, image: '/drinks/ROT.webp' },
  { type: 'Fresh Tea', name: 'Sea Cream Green Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Our classic green tea topped with a thick, savory-sweet sea salt cheese foam.', DF: false, CF: false, image: '/drinks/SCGT.webp' },
  { type: 'Fresh Tea', name: 'Sea Cream Roasted Oolong Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Roasted oolong tea crowned with our signature whipped sea cream.', DF: false, CF: false, image: '/drinks/SCOT.webp' },
  { type: 'Fresh Tea', name: 'Black Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Robust, full-bodied premium black tea brewed fresh daily.', DF: true, CF: false, image: '' },

  { type: 'Fruit Tea', name: 'Mango Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Refreshing green tea shaken with sweet, tropical mango puree.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Strawberry Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Jasmine green tea infused with the bright, tart flavor of real strawberries.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Honeydew Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Light green tea mixed with the mellow, refreshing taste of honeydew melon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Watermelon Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Summer in a cup—green tea shaken with crisp watermelon.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Passion Fruit Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'A tropical delight blending green tea with tangy passion fruit.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Lychee Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Floral lychee perfectly balances the earthy notes of our green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Peach Green Tea', price: { R: '$4.85', L: '$5.35' }, description: 'Sweet, juicy peach flavors mixed with our signature green tea.', DF: true, CF: false, image: '' },
  { type: 'Fruit Tea', name: 'Pink Lychee', price: { R: '$5.45', L: '$5.95' }, description: 'A beautiful, refreshing blend of lychee and secret floral notes.', DF: true, CF: false, image: '' },

  { type: 'Milk Tea Classic', name: 'Roasted Oolong Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Our deeply roasted oolong tea blended with creamy, rich milk.', DF: false, CF: false, image: '/drinks/ROMT.webp' },
  { type: 'Milk Tea Classic', name: 'Honey Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Floral jasmine milk tea sweetened naturally with rich honey.', DF: false, CF: false, image: '/drinks/HJGMT.webp' },
  { type: 'Milk Tea Classic', name: 'Royal Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Our premium house black tea blended with rich cream for a luxurious texture.', DF: false, CF: false, image: '/drinks/RoyalMT.webp' },
  { type: 'Milk Tea Classic', name: 'Caramel Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Classic milk tea layered with deep, buttery caramel notes.', DF: false, CF: false, image: '/drinks/CMT.webp' },
  { type: 'Milk Tea Classic', name: 'Jasmine Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'A delicate, floral milk tea made from our premium jasmine green tea leaves.', DF: false, CF: false, image: '/drinks/JGMT.webp' },
  { type: 'Milk Tea Classic', name: 'Thai Iced Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Authentic, sweet, and spiced Thai tea topped with a float of cream.', DF: false, CF: false, image: '/drinks/TIT.webp' },
  { type: 'Milk Tea Classic', name: 'Thai Green Milk Tea', price: { R: '$5.85', L: '$6.35' }, description: 'A floral, vibrant green tea variation of our classic sweet Thai iced tea.', DF: false, CF: false, image: '/drinks/TGMT.webp' },
  { type: 'Milk Tea Classic', name: 'Earl Grey Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Fragrant black tea infused with bergamot orange and blended with milk.', DF: false, CF: false, image: '/drinks/EGMT.webp' },
  { type: 'Milk Tea Classic', name: 'Taro Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Creamy milk tea blended with the sweet, starchy goodness of taro.', DF: true, CF: false, image: '/drinks/TMT.webp' },
  { type: 'Milk Tea Classic', name: 'Rose Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'A beautifully floral milk tea infused with delicate rose syrup.', DF: false, CF: false, image: '/drinks/RoseMT.webp' },
  { type: 'Milk Tea Classic', name: 'Oreo Garden Milk Tea', price: { R: '—', L: '$6.10' }, description: 'A decadent milk tea topped with crushed Oreo cookies for a dessert-like treat.', DF: false, CF: false, image: '/drinks/OGMT.webp' },

  { type: 'Slushie', name: 'Mango Mango', price: { R: '—', L: '$6.60' }, description: 'An icy, refreshing slushie bursting with double the tropical mango flavor.', DF: true, CF: true, image: '/drinks/MM.webp' },
  { type: 'Slushie', name: 'Very Strawberry', price: { R: '—', L: '$6.60' }, description: 'A perfectly blended, ice-cold strawberry slushie that is sweet and tart.', DF: true, CF: true, image: '/drinks/VS.webp' },
  { type: 'Slushie', name: 'Chamango Mango', price: { R: '—', L: '$6.60' }, description: 'A sweet and spicy mango slushie swirled with savory chamoy and Tajín.', DF: true, CF: true, image: '/drinks/CM.webp' },

  { type: 'Smoothie', name: 'Taro Taro', price: { R: '—', L: '$6.60' }, description: 'A rich, thick, and creamy smoothie packed with sweet taro flavor.', DF: false, CF: true, image: '/drinks/TT.webp' },
  { type: 'Smoothie', name: 'Horchata', price: { R: '—', L: '$6.60' }, description: 'A creamy, cinnamon-spiced smoothie inspired by the classic Mexican drink.', DF: false, CF: true, image: '/drinks/HCC.webp' },
  { type: 'Smoothie', name: 'Nana Berry', price: { R: '—', L: '$6.60' }, description: 'A smooth, classic blend of ripe bananas and sweet strawberries.', DF: false, CF: true, image: '/drinks/NB.webp' },
  { type: 'Smoothie', name: 'Caramel Macchiato', price: { R: '—', L: '$6.60' }, description: 'An icy, blended coffee smoothie layered with rich caramel drizzle.', DF: false, CF: false, image: '/drinks/CaramelM.webp' },
  { type: 'Smoothie', name: 'Caramel Thai', price: { R: '—', L: '$6.60' }, description: 'Sweet Thai tea blended into a frosty smoothie and swirled with caramel.', DF: false, CF: true, image: '/drinks/CTT.webp' },

  { type: 'Coffee', name: 'Coffee Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'The perfect pick-me-up combining our classic milk tea with a shot of strong coffee.', DF: false, CF: false, image: '/drinks/CMT.webp' },
  { type: 'Coffee', name: 'Chocolate Cream Mocha', price: { R: '$5.85', L: '$6.35' }, description: 'Rich chocolate and robust coffee blended with milk for a decadent treat.', DF: false, CF: false, image: '/drinks/CCM.webp' },
  { type: 'Coffee', name: 'Vietnamese Coffee (Iced)', price: { R: '$5.85', L: '$6.35' }, description: 'Strong, traditional slow-dripped robusta coffee mixed with sweetened condensed milk. (No Ice, +$3)', DF: false, CF: false, image: '/drinks/VIC.webp' },
  { type: 'Coffee', name: 'Vanilla Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, description: 'Smooth espresso and chilled milk sweetened with aromatic vanilla.', DF: false, CF: false, image: '/drinks/C&VCL.webp' },
  { type: 'Coffee', name: 'Caramel Coffee Latte (Iced)', price: { R: '$5.95', L: '$6.45' }, description: 'Iced coffee and milk perfectly balanced with buttery caramel syrup.', DF: false, CF: false, image: '/drinks/C&VCL.webp' },

  { type: 'Matcha Series', name: 'Mango Matcha Latte', price: { R: '—', L: '$6.60' }, description: 'Earthy, premium matcha layered over sweet, tropical mango puree and milk.', DF: false, CF: false, image: '/drinks/MML.webp' },
  { type: 'Matcha Series', name: 'Creme Brulee Matcha Smoothie', price: { R: '—', L: '$7.85' }, description: 'A cream based smoothie blended with matcha, creamer powder, and vanilla syrup, topped with whipped cream and matcha powder with creme brulee around the cup.', DF: false, CF: false, image: '/drinks/CBMS.webp' },
  { type: 'Matcha Series', name: 'Matcha Boba Milk Tea', price: { R: '$5.85', L: '$6.35' }, description: 'Earthy matcha and creamy milk perfectly paired with our signature boba.', DF: false, CF: false, image: '/drinks/MBMT.webp' },
  { type: 'Matcha Series', name: 'Strawberry Matcha Latte', price: { R: '—', L: '$6.60' }, description: 'A beautiful layered drink of ceremonial matcha, milk, and fresh strawberry puree.', DF: false, CF: false, image: '/drinks/SML.webp' },

  { type: 'Butterfly Series', name: 'Butterfly Mango', price: { R: '—', L: '$6.60' }, description: 'A mesmerizing, color-changing butterfly pea flower tea layered with sweet mango.', DF: false, CF: false, image: '/drinks/BM.webp' },
  { type: 'Butterfly Series', name: 'Butterfly Strawberry', price: { R: '—', L: '$6.60' }, description: 'Vibrant butterfly pea tea poured over a refreshing strawberry base.', DF: false, CF: false, image: '/drinks/BS.webp' },
  { type: 'Butterfly Series', name: 'Butterfly Lychee', price: { R: '—', L: '$6.60' }, description: 'A magical, color-changing floral tea perfectly paired with sweet lychee.', DF: false, CF: false, image: '/drinks/BL.webp' },
  { type: 'Butterfly Series', name: 'Butterfly Coconut', price: { R: '—', L: '$6.60' }, description: 'Tropical coconut milk layered with our striking, deep blue butterfly pea tea.', DF: false, CF: false, image: '/drinks/BC.webp' },

  { type: 'Boba Milk', name: 'Brown Sugar Boba Milk', price: { R: '$5.35', L: '$5.95' }, description: 'Warm, slow-cooked brown sugar boba swirled with ice-cold organic milk.', DF: false, CF: true, image: '/drinks/BSBM.webp' },
  { type: 'Boba Milk', name: 'Brown Sugar Boba Milk Tea', price: { R: '$5.60', L: '$6.10' }, description: 'Our classic black milk tea elevated with rich, roasted brown sugar boba.', DF: false, CF: false, image: '/drinks/BSBMT.webp' },
  { type: 'Boba Milk', name: 'Strawberry Boba Milk', price: { R: '$5.85', L: '$6.35' }, description: 'Creamy, caffeine-free milk mixed with sweet strawberry puree and boba.', DF: false, CF: true, image: '/drinks/SBM.webp' },
  { type: 'Boba Milk', name: 'Matcha Boba Milk Tea', price: { R: '$5.85', L: '$6.35' }, description: 'Earthy matcha and creamy milk perfectly paired with our signature boba.', DF: false, CF: false, image: '/drinks/MBMT.webp' },
  { type: 'Boba Milk', name: 'Brown Sugar Roasted Oolong Milk Tea', price: { R: '$5.70', L: '$6.20' }, description: 'Deeply roasted oolong milk tea enhanced with our warm brown sugar boba.', DF: false, CF: false, image: '/drinks/BSROMT.webp' }
]

export const toppings: Topping[] = [
  { name: 'Mango Jelly', description: 'A chewy, gel-based topping infused with sweet tropical mango flavor.', image: '/toppings/MangoJelly.webp' },
  { name: 'Lychee Jelly', description: 'Translucent, firm jelly bits with a delicate, floral grape-like sweetness.', image: '/toppings/LycheeJelly.webp' },
  { name: 'Coffee Jelly', description: 'Robust and slightly bitter cubes made from real coffee to balance sweet milk teas.', image: '/toppings/CoffeeJelly.webp' },
  { name: 'Grass Jelly', description: 'A traditional, herbal jelly with a mild minty undertone and a silky texture.', image: '/toppings/GrassJelly.webp' },
  { name: 'Rainbow Jelly', description: 'Colorful, multi-flavored coconut strips that offer a firm and playful chew.', image: '/toppings/RainbowJelly.webp' },
  { name: 'Aloe Vera', description: 'Refreshing, juicy cubes of real aloe plant that are light and naturally sweet.', image: '/toppings/AloeVera.webp' },
  { name: 'Egg Pudding', description: 'A smooth, custard-like topping with a rich vanilla and caramelized sugar taste.', image: '/toppings/EggPudding.webp' },
  { name: 'Sea Salt Cream', description: 'A thick, frothy milk foam layer with a savory saltiness that cuts through sweetness.', image: '/toppings/SeaCream.webp' },
  { name: 'Creme Brulee', description: 'A decadent, creamy swirl inspired by the classic French dessert with hints of toasted sugar.', image: '/toppings/CremeBrulee.webp' }
]

export const bobaOptions: BobaOption[] = [
  { name: 'Brown Sugar Boba', description: 'Our base boba choice, made with tapioca starch, flavored with brown sugar and chewy in texture.', image: '' },
  { name: 'Strawberry Popping Boba', description: 'Liquid-filled balls with the essence and goodness of strawberry with a juicy burst of flavor.', image: '' },
  { name: 'Peach Popping Boba', description: 'Liquid-filled balls with the essence and goodness of peach with a juicy burst of flavor.', image: '' },
  { name: 'Black & White Boba', description: 'A half & half mix of our crystal and brown sugar boba, for people who are indecisive.', image: '' },
  { name: 'Crystal Boba', description: 'A clear, agar-based topping known for its light, crunchy texture.', image: '' }
]

export const food: FoodCategory[] = [
  {
    type: 'Macarons',
    items: [
      { name: 'Vanilla', image: '' },
      { name: 'Chocolate', image: '' },
      { name: 'Raspberry', image: '' },
      { name: 'Birthday Cake', image: '' }
    ]
  },
  {
    type: 'Cakes',
    items: [
      { name: 'Cheesecake', image: '' },
      { name: 'Chocolate', image: '' },
      { name: 'Tiramisu', image: '' }
    ]
  }
]
