// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Hello Boba — El Monte',
      meta: [
        { name: 'description', content: 'Crafting the perfect sip. Freshly brewed teas, milk teas, smoothies, and specialty drinks in El Monte, CA.' }
      ]
    }
  }
})
