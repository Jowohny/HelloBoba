// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.hello-boba.com'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Hello Boba — El Monte',
      meta: [
        { name: 'description', content: 'Crafting the perfect sip. Freshly brewed teas, milk teas, smoothies, and specialty drinks in El Monte, CA.' },
        { name: 'theme-color', content: '#4d7c0f' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
})
