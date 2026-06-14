interface PageSeoOptions {
  title: string
  description: string
}

export function usePageSeo({ title, description }: PageSeoOptions) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const path = useRoute().path

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: `${siteUrl}/og-image.jpg`,
    ogUrl: siteUrl ? `${siteUrl}${path}` : undefined,
    twitterCard: 'summary_large_image'
  })

  if (siteUrl) {
    useHead({
      link: [{ rel: 'canonical', href: `${siteUrl}${path}` }]
    })
  }
}
