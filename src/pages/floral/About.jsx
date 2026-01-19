import { FloralLayout } from '../../layouts/FloralLayout';
import { SEO } from '../../components/common/SEO';
import { Button } from '../../components/common/Button';
import { ROUTES, FLORAL_INFO, CONTACT_INFO, SITE_INFO } from '../../utils/constants';
import { useAnimation, useStaggerAnimation } from '../../hooks/useAnimation';

function AboutHero() {
  const [ref, , className] = useAnimation('fade-up');

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&auto=format&fit=crop"
          alt="Beautiful flowers background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-charcoal-900/40 to-charcoal-900/60"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-ivory-100/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-ivory-100/10 rounded-full"></div>

      <div ref={ref} className={`container-custom text-center relative z-10 ${className}`}>
        <p className="text-ivory-300 uppercase tracking-widest text-sm mb-4 font-medium">Our Story</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-ivory-50 mb-6">
          Beauty in Nature, Arranged with Purpose
        </h1>
        <p className="text-lg md:text-xl text-ivory-200 max-w-2xl mx-auto leading-relaxed">
          Turning the beauty of nature into intentional floral moments
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  const [leftRef, , leftClass] = useAnimation('fade-right');
  const [rightRef, , rightClass] = useAnimation('fade-left', 0.1, 'delay-2');

  return (
    <section className="py-20 md:py-28 bg-ivory-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={leftRef} className={`${leftClass}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-sage-200 rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop"
                alt="Florist arranging flowers"
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={rightRef} className={`${rightClass}`}>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal-800 mb-6">
              Soft, Romantic Designs That Feel Alive
            </h2>
            <div className="space-y-4 text-charcoal-700 leading-relaxed">
              <p>
                Good Nature Floral Artistry turns the beauty of nature into intentional floral
                moments — soft, romantic designs that feel thoughtful, expressive, and alive.
              </p>
              <p>
                Our style is elegant and natural, inspired by gardens, sunlight, and the way
                flowers move in the wild. We focus on airy shapes, lush textures, and color
                stories that feel gentle, feminine, and captivating.
              </p>
              <p>
                Every bouquet is made to mean something — to shift the mood of a space,
                celebrate a moment, or remind someone they're deeply cared for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeCreateSection() {
  const [ref, , className] = useAnimation('fade-up');

  return (
    <section className="py-20 md:py-28 bg-linen-100">
      <div className="container-custom">
        <div ref={ref} className={`max-w-4xl mx-auto text-center ${className}`}>
          <p className="text-sage-600 uppercase tracking-widest text-sm mb-3 font-medium">What We Create</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-charcoal-800 mb-8">
            Emotion in Bloom
          </h2>
          <p className="text-lg md:text-xl text-charcoal-700 leading-relaxed mb-8">
            We create bespoke bouquets, statement arrangements, and floral styling for intimate
            celebrations, meaningful gifts, and everyday joy — because flowers aren't just décor,
            they're emotion in bloom.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sage-700 font-medium">
            <span className="px-6 py-2 bg-ivory-50 rounded-full shadow-sm">Bespoke Bouquets</span>
            <span className="px-6 py-2 bg-ivory-50 rounded-full shadow-sm">Statement Arrangements</span>
            <span className="px-6 py-2 bg-ivory-50 rounded-full shadow-sm">Floral Styling</span>
            <span className="px-6 py-2 bg-ivory-50 rounded-full shadow-sm">Intimate Celebrations</span>
            <span className="px-6 py-2 bg-ivory-50 rounded-full shadow-sm">Meaningful Gifts</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const values = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Intentional',
      description: 'Every bouquet is made to mean something — to shift the mood of a space or celebrate a moment.'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Elegant',
      description: 'Inspired by gardens, sunlight, and the way flowers move in the wild — natural and refined.'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Expressive',
      description: 'Airy shapes, lush textures, and color stories that feel gentle, feminine, and captivating.'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Alive',
      description: 'Designs that feel thoughtful and alive — reminding someone they\'re deeply cared for.'
    }
  ];

  const [containerRef, , getItemClass] = useStaggerAnimation(values.length, 150);

  return (
    <section className="py-20 md:py-28 bg-ivory-50">
      <div className="container-custom">
        <div ref={titleRef} className={`text-center mb-16 ${titleClass}`}>
          <p className="text-sage-600 uppercase tracking-widest text-sm mb-3 font-medium">Our Approach</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-charcoal-800">
            What Makes Us Different
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`bg-linen-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ${getItemClass(index)}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ivory-50 text-sage-600 rounded-full mb-6 shadow-sm">
                {value.icon}
              </div>
              <h3 className="text-xl font-display text-charcoal-800 mb-3">{value.title}</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We start with a conversation to understand your vision, style, and the story you want your flowers to tell.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our team creates a custom design concept, selecting the perfect blooms and colors for your occasion.'
    },
    {
      number: '03',
      title: 'Creation',
      description: 'Each arrangement is handcrafted with care, using the freshest seasonal flowers available.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'We deliver your arrangements at the perfect moment, ensuring they arrive fresh and beautiful.'
    }
  ];

  const [containerRef, , getItemClass] = useStaggerAnimation(steps.length, 200);

  return (
    <section className="py-20 md:py-28 bg-ivory-50">
      <div className="container-custom">
        <div ref={titleRef} className={`text-center mb-16 ${titleClass}`}>
          <p className="text-sage-600 uppercase tracking-widest text-sm mb-3 font-medium">How We Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-charcoal-800">
            Our Process
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className={`relative ${getItemClass(index)}`}>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-sage-200 -translate-x-1/2 z-0"></div>
              )}

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-500 text-ivory-50 rounded-full mb-6 text-xl font-display">
                  {step.number}
                </div>
                <h3 className="text-xl font-display text-charcoal-800 mb-3">{step.title}</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const [ref, , className] = useAnimation('scale-up');

  return (
    <section className="py-20 md:py-28 bg-linen-200">
      <div className="container-custom max-w-4xl">
        <div ref={ref} className={`text-center ${className}`}>
          <svg className="w-12 h-12 mx-auto text-sage-400 mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="text-2xl md:text-3xl font-display text-charcoal-800 leading-relaxed mb-8">
            "Working with Good Nature was an absolute dream. They understood exactly what we wanted
            for our wedding and exceeded every expectation. The flowers were breathtaking."
          </blockquote>

          <div>
            <p className="font-medium text-charcoal-800">Sarah & Michael</p>
            <p className="text-charcoal-600 text-sm">Spring Garden Wedding, 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, , className] = useAnimation('fade-up');

  return (
    <section className="py-20 md:py-28 bg-sage-500">
      <div ref={ref} className={`container-custom text-center ${className}`}>
        <p className="text-ivory-300 text-lg mb-4 font-display italic">
          Beauty in nature, arranged with purpose.
        </p>
        <h2 className="text-3xl md:text-4xl font-display text-ivory-50 mb-6">
          Ready to Create Something Beautiful?
        </h2>
        <p className="text-lg text-ivory-200 mb-8 max-w-2xl mx-auto">
          Let's bring your floral vision to life — whether it's an intimate celebration, a meaningful gift, or everyday joy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={ROUTES.floralContact} variant="secondary" size="lg">
            Get in Touch
          </Button>
          <Button href={ROUTES.floralPortfolio} variant="outline" size="lg" className="border-ivory-50 text-ivory-50 hover:bg-ivory-50/10">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <FloralLayout showCart={true}>
      <SEO
        title="About | Good Nature Floral Artistry"
        description="Good Nature Floral Artistry turns the beauty of nature into intentional floral moments — soft, romantic designs that feel thoughtful, expressive, and alive. Serving Reston, Virginia."
        canonical="/floral-artistry/about"
      />

      <AboutHero />
      <StorySection />
      <WhatWeCreateSection />
      <ValuesSection />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
    </FloralLayout>
  );
}
