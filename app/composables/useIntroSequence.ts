import gsap from 'gsap'

type IntroBuilder = (timeline: gsap.core.Timeline) => void

export function useIntroSequence(build: IntroBuilder) {
  const hasPlayedIntro = useState('playedIntro', () => false)
  let timeline: gsap.core.Timeline | null = null

  const buildIntroTimeline = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timeline = gsap.timeline()
        build(timeline)
      })
    })
  }

  onMounted(async () => {
    await nextTick()
    if (hasPlayedIntro.value) {
      buildIntroTimeline()
    } else {
      const stop = watch(hasPlayedIntro, (isDone) => {
        if (!isDone) return
        stop()
        buildIntroTimeline()
      })
    }
  })

  onBeforeUnmount(() => {
    timeline?.kill()
    timeline = null
  })
}
