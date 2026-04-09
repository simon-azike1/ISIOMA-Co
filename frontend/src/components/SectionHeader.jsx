export default function SectionHeader({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-xl'}`}>
      {eyebrow && (
        <p className="eyebrow mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
