import { trust } from '@/lib/content';
import Card from './ui/Card';
import { AwardIcon, InspectIcon, ReturnIcon, ShieldCheckIcon, ShieldShape } from './ui/Icons';

const icons = {
  award: AwardIcon,
  returns: ReturnIcon,
  shield: ShieldCheckIcon,
  inspect: InspectIcon,
};

export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <h2 id="trust-heading" className="sr-only">
          {trust.heading}
        </h2>
        <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Card
                as="li"
                key={item.title}
                className="flex items-start gap-16 p-16 lg:flex-col lg:p-24"
              >
                <span className="relative flex h-48 w-48 shrink-0 items-center justify-center">
                  <ShieldShape size={48} className="absolute inset-0 text-chip" />
                  <Icon size={24} className="relative text-ink" />
                </span>
                <div>
                  <h3 className="text-16 font-semibold">{item.title}</h3>
                  <p className="mt-4 text-14 text-muted">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
