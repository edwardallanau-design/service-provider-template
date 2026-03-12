import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { HeroSection } from '@/components/home/HeroSection'
import { SocialProofBar } from '@/components/home/SocialProofBar'
import { ProblemSolution } from '@/components/home/ProblemSolution'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedTestimonial } from '@/components/home/FeaturedTestimonial'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { CtaBanner } from '@/components/home/CtaBanner'
import type { Media } from '@/payload-types'

const getHomeData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [hero, settings, featuredServices, featuredProjects, featuredTestimonial] =
      await Promise.all([
        payload.findGlobal({ slug: 'hero-section' }),
        payload.findGlobal({ slug: 'site-settings' }),
        payload.find({
          collection: 'services',
          where: { and: [{ featured: { equals: true } }, { status: { equals: 'published' } }] },
          sort: 'order',
          limit: 3,
        }),
        payload.find({
          collection: 'projects',
          where: { and: [{ featured: { equals: true } }, { status: { equals: 'published' } }] },
          sort: 'order',
          limit: 3,
          depth: 1,
        }),
        payload.find({
          collection: 'testimonials',
          where: { featured: { equals: true } },
          sort: 'order',
          limit: 1,
          depth: 1,
        }),
      ])
    return { hero, settings, featuredServices, featuredProjects, featuredTestimonial }
  },
  ['home-page'],
  {
    tags: [
      CACHE_TAGS.hero,
      CACHE_TAGS.settings,
      CACHE_TAGS.services,
      CACHE_TAGS.projects,
      CACHE_TAGS.testimonials,
    ],
    revalidate: 300,
  },
)

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const ogImage = settings.seo?.ogImage as Media | null | undefined
  return {
    title: settings.seo?.metaTitle ?? settings.branding?.companyName ?? 'Home',
    description: settings.seo?.metaDescription ?? undefined,
    openGraph: {
      images: ogImage && typeof ogImage === 'object' && ogImage.url ? [ogImage.url] : [],
    },
  }
}

export default async function HomePage() {
  const { hero, settings, featuredServices, featuredProjects, featuredTestimonial } =
    await getHomeData()

  const clientLogos = (settings.clientLogos ?? []).map((l) => {
    const logoMedia = l.logo as Media | null | undefined
    return {
      name: l.name,
      logo:
        logoMedia && typeof logoMedia === 'object' && logoMedia.url
          ? { url: logoMedia.url, alt: logoMedia.alt }
          : null,
    }
  })

  const services = featuredServices.docs.map((s) => ({
    slug: s.slug ?? '',
    title: s.title,
    shortDescription: s.shortDescription,
    iconName: s.iconName ?? null,
  }))

  const projects = featuredProjects.docs.map((p) => {
    const coverImage = p.coverImage as Media | null | undefined
    return {
      slug: p.slug ?? '',
      title: p.title,
      client: p.client ?? null,
      tagline: p.tagline ?? null,
      tags: p.tags ?? null,
      coverImage:
        coverImage && typeof coverImage === 'object' && coverImage.url
          ? { url: coverImage.url, alt: coverImage.alt }
          : null,
    }
  })

  const testimonial = featuredTestimonial.docs[0]
  const testimonialPhoto = testimonial?.photo as Media | null | undefined

  const problemPoints = (settings.problemPoints ?? []).map((p) => ({
    title: p.title,
    description: p.description ?? null,
  }))

  const howItWorksSteps = (settings.howItWorksSteps ?? []).map((s) => ({
    stepNumber: s.stepNumber,
    title: s.title,
    description: s.description ?? null,
  }))

  return (
    <>
      <HeroSection
        badgeText={hero.badgeText ?? null}
        heading={hero.heading}
        headingHighlight={hero.headingHighlight ?? null}
        subheading={hero.subheading ?? null}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />

      {clientLogos.length > 0 && <SocialProofBar logos={clientLogos} />}

      {problemPoints.length > 0 && (
        <ProblemSolution
          problemPoints={problemPoints}
          pivotStatement={settings.pivotStatement ?? null}
        />
      )}

      {howItWorksSteps.length > 0 && <HowItWorks steps={howItWorksSteps} />}

      {testimonial && (
        <FeaturedTestimonial
          quote={testimonial.quote}
          clientName={testimonial.clientName}
          clientRole={testimonial.clientRole ?? null}
          clientCompany={testimonial.clientCompany ?? null}
          measurableResult={testimonial.measurableResult ?? null}
          photo={
            testimonialPhoto && typeof testimonialPhoto === 'object' && testimonialPhoto.url
              ? { url: testimonialPhoto.url, alt: testimonialPhoto.alt }
              : null
          }
        />
      )}

      {services.length > 0 && <ServicesPreview services={services} />}

      {projects.length > 0 && <FeaturedWork projects={projects} />}

      <CtaBanner
        heading={settings.branding?.tagline ? `Ready to ${settings.branding.tagline.toLowerCase()}?` : undefined}
      />
    </>
  )
}
