import Image from 'next/image'
import Link from 'next/link'

interface TeamMemberCardProps {
  member: {
    name: string
    role: string
    bio?: string | null
    photo?: {
      url?: string | null
      alt?: string | null
    } | null
    socialLinks?: {
      linkedin?: string | null
      twitter?: string | null
      github?: string | null
    } | null
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photoUrl =
    member.photo && typeof member.photo === 'object' && 'url' in member.photo
      ? member.photo.url
      : null

  return (
    <div className="card-border bg-section-mid p-6">
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={
            member.photo && typeof member.photo === 'object' && 'alt' in member.photo
              ? (member.photo.alt ?? member.name)
              : member.name
          }
          width={80}
          height={80}
          className="mb-4 size-16 rounded-full object-cover grayscale"
        />
      )}
      <h3 className="text-sm font-semibold text-(--color-foreground)">{member.name}</h3>
      <p className="mt-0.5 text-xs text-(--color-muted)">{member.role}</p>
      {member.bio && (
        <p className="mt-3 text-sm text-(--color-muted) leading-relaxed line-clamp-4">{member.bio}</p>
      )}
      {member.socialLinks && (
        <div className="mt-4 flex gap-3">
          {member.socialLinks.linkedin && (
            <Link
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              aria-label="LinkedIn"
            >
              in
            </Link>
          )}
          {member.socialLinks.twitter && (
            <Link
              href={member.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              aria-label="Twitter"
            >
              𝕏
            </Link>
          )}
          {member.socialLinks.github && (
            <Link
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              aria-label="GitHub"
            >
              gh
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
