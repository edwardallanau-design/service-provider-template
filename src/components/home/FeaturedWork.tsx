import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { ButtonLink } from '@/components/custom/ButtonLink'
import { ProjectCard } from '@/components/portfolio/ProjectCard'

interface Project {
  slug: string
  title: string
  client?: string | null
  tagline?: string | null
  tags?: { tag: string }[] | null
  coverImage?: {
    url?: string | null
    alt?: string | null
  } | null
}

interface FeaturedWorkProps {
  projects: Project[]
  eyebrow?: string
  heading?: string
}

export function FeaturedWork({
  projects,
  eyebrow = 'Our Work',
  heading = 'Results we are proud of',
}: FeaturedWorkProps) {
  if (!projects.length) return null

  return (
    <Section className="bg-section-mid">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
              {eyebrow}
            </p>
            <h2 className="text-display font-bold text-(--color-foreground)">{heading}</h2>
          </div>
          <ButtonLink href="/work" variant="outline" size="sm" className="shrink-0">
            All Case Studies →
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
