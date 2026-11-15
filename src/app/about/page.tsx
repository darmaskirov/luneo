import Image from "next/image";
export const metadata = { title: "The world of LUNEO" };
export default function Page() {
  return (
    <section className="section">
      <p className="eyebrow">THE WORLD OF LUNEO</p>
      <h1>
        The beauty of being <i>yourself.</i>
      </h1>
      <div className="story">
        <div>
          <h2>
            Quiet confidence.
            <br />
            Distinctive form.
          </h2>
          <p>
            LUNEO is a fictional premium brand, created as an independent demo
            by NULLEXWEB. It explores contemporary fashion commerce, from the
            first impression to the final step of checkout.
          </p>
          <p>
            Our visual language is natural light, tactile materials, ivory tones
            and deep burgundy. All imagery is AI-generated. Products are not for
            sale; manufacturing scenes and specifications are part of the
            concept.
          </p>
        </div>
        <div className="story-image">
          <Image
            src="/images/editorial-2.webp"
            alt="Materials and colours of the LUNEO concept"
            fill
            sizes="50vw"
          />
        </div>
      </div>
      <div className="campaign">
        <Image
          src="/images/banner-3.webp"
          alt="LUNEO accessories on architectural steps"
          fill
          sizes="100vw"
        />
      </div>
    </section>
  );
}
