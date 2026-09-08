import { treatmentOffers, type TreatmentOffer, type TreatmentProduct } from "@/lib/treatment-offers";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function packageLabel(product: TreatmentProduct) {
  if (product.count === 6 && product.duration === null) return "Complete Experience";
  return product.count === 1 ? "Single Treatment" : `${product.count}-Treatment Series`;
}

function packageDetail(offer: TreatmentOffer, product: TreatmentProduct) {
  if (product.count === 6 && product.duration === null) {
    return "Six signature treatments, designed as one complete experience";
  }

  if (product.count === 1) return `${product.duration}-minute treatment`;

  const packageAdjustment = offer.key === "lymphatic" ? 50 : 0;
  return `${money((product.price - packageAdjustment) / product.count)} per ${product.duration}-minute treatment`;
}

function purchaseLabel(offer: TreatmentOffer, product: TreatmentProduct) {
  if (offer.key === "ultimate") return 'Choose the Ultimate "YOU" Experience';
  return product.count === 1 ? "Choose 1 Treatment" : `Choose ${product.count} Treatments`;
}

function PricingOption({ offer, product }: { offer: TreatmentOffer; product: TreatmentProduct }) {
  const isSingle = product.count === 1;

  return (
    <article className={`flex min-h-[186px] flex-col rounded-[14px] border p-3.5 ${isSingle ? "border-stone bg-white" : "border-purple/20 bg-purple/[0.025]"}`}>
      <p className="section-label mb-2 text-[10px]">{packageLabel(product)}</p>
      <p className="font-serif text-3xl font-light text-purple md:text-4xl">{money(product.price)}</p>
      <p className="mt-1.5 min-h-9 font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.05em] text-muted">{packageDetail(offer, product)}</p>
      <a href={product.href} className={isSingle ? "btn-secondary mt-auto w-full px-2 py-2.5 text-[9px]" : "btn-primary mt-auto w-full px-2 py-2.5 text-[9px]"}>
        {purchaseLabel(offer, product)}
      </a>
    </article>
  );
}

function TreatmentRow({ offer }: { offer: TreatmentOffer }) {
  return (
    <section id={offer.key} className="section-anchor rounded-[20px] border border-purple/15 bg-white p-4 shadow-[0_8px_24px_rgba(60,40,80,.05)] md:p-5">
      <div className="xl:grid xl:grid-cols-[245px_1fr] xl:gap-6">
        <header className="border-b border-stone pb-4 xl:border-b-0 xl:border-r xl:pr-6">
          <p className="section-label mb-2 text-[10px]">Treatment Series</p>
          <h2 className="font-serif text-2xl font-light leading-tight text-[#2c1f14] md:text-3xl">{offer.name}</h2>
          <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{offer.description}</p>
          {offer.key === "ultimate" && <p className="mt-3 rounded-[12px] border border-gold/25 bg-gold/5 p-3 font-sans text-xs font-light leading-relaxed text-muted">Six signature treatments intended as one complete starting experience.</p>}
        </header>
        <div className={`mt-4 grid gap-3 ${offer.products.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"} xl:mt-0`}>
          {offer.products.map((product) => <PricingOption key={`${offer.key}-${product.count}`} offer={offer} product={product} />)}
        </div>
      </div>
    </section>
  );
}

export default function TreatmentPricingHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="mb-6 flex flex-wrap justify-center gap-2 md:mb-8">
        {treatmentOffers.map((offer) => (
          <a key={offer.key} href={`#${offer.key}`} className="rounded-full border border-purple/20 bg-white px-3 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-purple transition hover:border-purple hover:bg-purple hover:text-white">
            {offer.short}
          </a>
        ))}
      </div>
      <div className="space-y-5">
        {treatmentOffers.map((offer) => <TreatmentRow key={offer.key} offer={offer} />)}
      </div>
    </section>
  );
}
