import { useAnimation } from '../../hooks/useAnimation';

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
  animated = false
}) {
  const [ref, , animClass] = useAnimation('fade-up', 0.1);

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div
      ref={animated ? ref : null}
      className={`mb-12 ${alignClasses[align]} ${className} ${animated ? animClass : ''}`}
    >
      {subtitle && (
        <p className="text-sage-600 uppercase tracking-widest text-sm mb-3 font-body font-medium">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-charcoal-800 font-light">
        {title}
      </h2>
    </div>
  );
}
