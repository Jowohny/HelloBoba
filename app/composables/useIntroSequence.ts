import gsap from 'gsap'

type IntroBuilder = (timeline: gsap.core.Timeline) => void

export function useIntroSequence(build: IntroBuilder) {
  const hasPlayedIntro = useState('playedIntro', () => false)
  let timeline: gsap.core.Timeline | null = null

  const stopWatch = watch(
    hasPlayedIntro,
    async (isDone) => {
      if (!isDone) return
      await nextTick()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timeline = gsap.timeline()
          build(timeline)
        })
      })
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    stopWatch()
    timeline?.kill()
    timeline = null
  })
}
