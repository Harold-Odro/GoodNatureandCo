import { SectionHeading } from '../common/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { services } from '../../data/services';

export function ServicesPreview() {
  const delays = ['delay-1', 'delay-2', 'delay-3'];

  return (
    <section className="py-16 md:py-24 bg-linen-100">
      <div className="container-custom">
        <SectionHeading title="Our Services" animated />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={delays[index] || ''} />
          ))}
        </div>
      </div>
    </section>
  );
}
