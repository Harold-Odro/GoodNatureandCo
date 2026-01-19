import { FloralLayout } from '../../layouts/FloralLayout';
import { SEO } from '../../components/common/SEO';
import { ContactForm } from '../../components/floral/ContactForm';
import { ContactInfo } from '../../components/floral/ContactInfo';
import { useAnimation } from '../../hooks/useAnimation';

function ContactHero() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [subtitleRef, , subtitleClass] = useAnimation('fade-up', 0.1, 'delay-2');

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1920&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
      </div>

      <div className="container-custom text-center relative z-10">
        <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-display text-ivory-50 mb-4 drop-shadow-lg ${titleClass}`}>
          Let's Connect
        </h1>
        <p ref={subtitleRef} className={`text-lg md:text-xl text-ivory-100 max-w-2xl mx-auto drop-shadow-md ${subtitleClass}`}>
          We'd love to hear about your floral vision
        </p>
      </div>
    </section>
  );
}

function FAQItem({ faq, delay }) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);

  return (
    <div ref={ref} className={`bg-ivory-50 rounded-xl p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-display text-charcoal-800 mb-2">
        {faq.question}
      </h3>
      <p className="text-charcoal-700 leading-relaxed">
        {faq.answer}
      </p>
    </div>
  );
}

function FAQ() {
  const [titleRef, , titleClass] = useAnimation('fade-up');

  const faqs = [
    {
      question: 'What is your service area?',
      answer: 'We primarily serve Reston, Virginia and surrounding areas. For events outside this area, please contact us to discuss possibilities.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'For weddings and large events, we recommend booking 3-6 months in advance. For smaller arrangements, we can often accommodate shorter timelines.'
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes, we offer delivery throughout our service area. Delivery fees vary based on location and order size.'
    },
    {
      question: 'What is your pricing range?',
      answer: 'Our pricing varies based on the type of arrangement, flowers selected, and event size. Contact us for a personalized quote based on your specific needs and vision.'
    }
  ];

  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];

  return (
    <section className="py-16 md:py-24 bg-linen-100">
      <div className="container-custom max-w-4xl">
        <h2 ref={titleRef} className={`text-3xl md:text-4xl font-display text-charcoal-800 mb-12 text-center ${titleClass}`}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} delay={delays[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const [infoRef, , infoClass] = useAnimation('fade-right', 0.1);
  const [formRef, , formClass] = useAnimation('fade-left', 0.1, 'delay-2');

  return (
    <FloralLayout showCart={true}>
      <SEO
        title="Contact | Good Nature Floral Artistry"
        description="Get in touch with Good Nature Floral Artistry for wedding flowers, event arrangements, and more. Serving Reston, Virginia."
        canonical="/floral-artistry/contact"
      />

      <ContactHero />

      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div ref={infoRef} className={infoClass}>
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div ref={formRef} className={formClass}>
              <h3 className="text-2xl font-display text-charcoal-800 mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </FloralLayout>
  );
}
