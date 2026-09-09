import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  ExternalLink,
  KeyRound,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wifi,
  X,
} from "lucide-react";

const images = {
  hero: "/images/hero-bedroom.jpeg",
  room: "/images/double-room.jpeg",
  bathroom: "/images/bathroom.jpeg",
  lounge: "/images/sitting-area.jpeg",
};

const essentials = [
  {
    number: "01",
    icon: Sparkles,
    title: "A spa bathroom",
    copy: "A private bathroom with the small luxuries that make a night away feel unhurried.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Parking, sorted",
    copy: "Arrive with ease. Secure on-site parking is ready when you are.",
  },
  {
    number: "03",
    icon: Wifi,
    title: "Wi-Fi included",
    copy: "Stay connected when you need to, then switch off when you do not.",
  },
  {
    number: "04",
    icon: Utensils,
    title: "Make it your own",
    copy: "A practical kitchen in the guesthouse gives you space to keep your own rhythm.",
  },
];

const faqs = [
  {
    question: "Where is Marie’s Guesthouse?",
    answer: "You will find us on Mika Shimbuli Street in Katutura, Windhoek — a convenient, lived-in corner of the city with a warm local pulse.",
  },
  {
    question: "How do I book a room?",
    answer: "Send an enquiry with your dates and preferred room. We will check availability and reply directly. You can also call 081 400 5332 for a quicker conversation.",
  },
  {
    question: "What does self-catering mean here?",
    answer: "The guesthouse kitchen is available for you to prepare simple meals, breakfast, or a cup of coffee on your own schedule.",
  },
  {
    question: "Do you offer single and double rooms?",
    answer: "Yes. Single rooms are N$350.00 per night and double rooms are N$400.00 per night, subject to availability.",
  },
];

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label--light" : ""}`}>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  );
}

function Home() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const scrollToEnquire = () => document.querySelector("#enquire")?.scrollIntoView({ behavior: "smooth" });

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, String(value)));
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    }
  };

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__image" src={images.hero} alt="A warm, sunlit guesthouse bedroom with ochre cushions" />
        <div className="hero__veil" />
        <div className="hero__grain" />
        <div className="hero__content container">
          <div className="hero__eyebrow"><span /> Mika Shimbuli Street, Katutura</div>
          <h1 id="hero-title">A softer place<br /><em>to land.</em></h1>
          <p className="hero__copy">A welcoming guesthouse in the heart of Katutura — made for good rest, easy mornings, and staying a little longer.</p>
          <div className="hero__actions">
            <button className="button button--gold" type="button" onClick={scrollToEnquire}>Plan your stay <ArrowRight size={17} /></button>
            <a className="text-link text-link--light" href="#stay">Explore the guesthouse <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="hero__note">Marie’s Guesthouse <span>·</span> Windhoek, Namibia</div>
        <div className="hero__scroll">Scroll to settle in <ArrowDown size={16} /></div>
      </section>

      <section className="intro section-pad" id="stay">
        <div className="container intro__grid">
          <div className="intro__title reveal-up">
            <SectionLabel>01 / The guesthouse</SectionLabel>
            <h2>Come as you are.<br /><em>Make yourself at home.</em></h2>
          </div>
          <div className="intro__body reveal-up">
            <p className="lede">Marie’s Guesthouse is a small, thoughtful base in Katutura. Clean rooms, warm details, and the freedom to keep your own pace.</p>
            <p>Whether you are in town for work, passing through Windhoek, or looking for a quiet reset, there is room here for the everyday things that matter: a good shower, fresh linen, a cup of coffee, and an easy welcome.</p>
            <a className="text-link" href="#rooms">See the rooms <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad section-pad--topless" id="rooms">
        <div className="container">
          <div className="gallery-heading reveal-up">
            <div>
              <SectionLabel>02 / Selective gallery</SectionLabel>
              <h2>A closer look<br /><em>at the stay.</em></h2>
            </div>
            <p>Spaces designed to feel calm, useful, and quietly considered.</p>
          </div>
          <div className="gallery-grid">
            <button className="gallery-card gallery-card--large reveal-up" type="button" onClick={() => setActiveImage(images.room)} aria-label="View the room gallery image">
              <img src={images.room} alt="Single guest room with white linen and warm ochre throw" />
              <span className="gallery-card__caption"><span>01</span> The room <ArrowUpRight size={17} /></span>
            </button>
            <button className="gallery-card gallery-card--small reveal-up" type="button" onClick={() => setActiveImage(images.bathroom)} aria-label="View the bathroom gallery image">
              <img src={images.bathroom} alt="Guest bathroom with wall-mounted television and clean modern finishes" />
              <span className="gallery-card__caption"><span>02</span> Spa bathroom <ArrowUpRight size={17} /></span>
            </button>
            <button className="gallery-card gallery-card--small gallery-card--courtyard reveal-up" type="button" onClick={() => setActiveImage(images.lounge)} aria-label="View the guesthouse lounge gallery image">
              <img src={images.lounge} alt="Bright guesthouse sitting area with chairs and a small window" />
              <span className="gallery-card__caption"><span>03</span> Sitting area <ArrowUpRight size={17} /></span>
            </button>
          </div>
        </div>
      </section>

      <section className="rooms-band section-pad" aria-labelledby="rooms-title">
        <div className="container rooms-band__grid">
          <div className="rooms-band__intro reveal-up">
            <SectionLabel light>03 / Stay your way</SectionLabel>
            <h2 id="rooms-title">Simple rooms.<br /><em>Good value.</em></h2>
            <p>Choose a quiet single room for one, or share the comfort of a double room. Both come with the essentials, and nothing you do not need.</p>
            <a className="text-link text-link--light" href="#enquire">Check availability <ArrowRight size={15} /></a>
          </div>
          <div className="room-options reveal-up">
            <article className="room-option">
              <div className="room-option__top"><span className="room-option__type">01 / Single room</span><span className="room-option__price">N$350 <small>/ night</small></span></div>
              <h3>For one, with space to breathe.</h3>
              <div className="room-option__meta"><span><Check size={14} /> Spa bathroom</span><span><Check size={14} /> Wi-Fi included</span></div>
            </article>
            <article className="room-option room-option--featured">
              <div className="room-option__top"><span className="room-option__type">02 / Double room</span><span className="room-option__price">N$400 <small>/ night</small></span></div>
              <h3>For two, with the easy comforts.</h3>
              <div className="room-option__meta"><span><Check size={14} /> Spa bathroom</span><span><Check size={14} /> Parking included</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="essentials section-pad" id="essentials">
        <div className="container">
          <div className="essentials__heading reveal-up">
            <div>
              <SectionLabel>04 / Good to know</SectionLabel>
              <h2>The essentials,<br /><em>covered.</em></h2>
            </div>
            <p>Thoughtful, practical details for a stay that feels easy from the moment you arrive.</p>
          </div>
          <div className="essentials-grid">
            {essentials.map(({ number, icon: Icon, title, copy }) => (
              <article className="essential-card reveal-up" key={number}>
                <span className="essential-card__number">{number}</span>
                <Icon className="essential-card__icon" size={27} strokeWidth={1.2} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq section-pad section-pad--topless">
        <div className="container faq__grid">
          <div className="faq__title reveal-up">
            <SectionLabel>05 / Before you arrive</SectionLabel>
            <h2>A few useful<br /><em>things to know.</em></h2>
            <p>Still wondering about something? Call and we will be happy to help.</p>
            <a className="text-link" href="tel:0814005332"><Phone size={15} /> 081 400 5332</a>
          </div>
          <div className="faq-list reveal-up">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.question}>
                  <button type="button" className="faq-item__trigger" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span>{faq.question}</span><ChevronDown size={18} />
                  </button>
                  <div className="faq-item__answer"><p>{faq.answer}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="location section-pad" id="find-us">
        <div className="container location__grid">
          <div className="location__image-wrap reveal-up">
            <img src={images.lounge} alt="Bright guesthouse sitting area" />
            <div className="location__stamp"><span>Stay<br />softly</span><Sparkles size={15} /></div>
          </div>
          <div className="location__body reveal-up">
            <SectionLabel>06 / Find us</SectionLabel>
            <h2>Call ahead.<br /><em>Arrive easy.</em></h2>
            <p className="lede">A calm little base in Katutura, with the city close by and a warm welcome waiting.</p>
            <div className="location__details">
              <div><MapPin size={19} /><span>Mika Shimbuli Street<br />Katutura, Windhoek</span></div>
              <div><Clock3 size={19} /><span>Check-in by arrangement<br />Call before you arrive</span></div>
            </div>
            <div className="location__actions"><a className="button button--ink" href="tel:0814005332">Call 081 400 5332 <Phone size={16} /></a><a className="text-link" href="https://wa.me/264814005332?text=Hello%20Marie%27s%20Guesthouse%2C%20I%27d%20like%20to%20ask%20about%20booking%20a%20room." target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={15} /></a></div>
          </div>
        </div>
      </section>

      <section className="enquiry section-pad" id="enquire">
        <div className="container enquiry__grid">
          <div className="enquiry__intro reveal-up">
            <SectionLabel light>07 / Make an enquiry</SectionLabel>
            <h2>Plan your<br /><em>stay.</em></h2>
            <p>Tell us when you would like to arrive. We will check availability and reply directly.</p>
            <div className="enquiry__callout"><Phone size={18} /><span>Prefer to speak first?<br /><a href="tel:0814005332">081 400 5332</a></span></div>
          </div>
          <form className="enquiry-form reveal-up" name="booking-enquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submitEnquiry}>
            <input type="hidden" name="form-name" value="booking-enquiry" />
            <p className="hidden"><label>Don’t fill this out if you're human: <input name="bot-field" /></label></p>
            <div className="form-row"><label>Name<input name="name" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="Email address" required /></label></div>
            <div className="form-row"><label>Phone<input name="phone" type="tel" placeholder="Phone number" required /></label><label>Guests<select name="guests" defaultValue="2 guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></label></div>
            <div className="form-row"><label>Arrival date<input name="arrival" type="date" required /></label><label>Departure date<input name="departure" type="date" required /></label></div>
            <label>Room preference<select name="room" defaultValue="Any available room"><option>Single room</option><option>Double room</option><option>Any available room</option></select></label>
            <label>Anything we should know?<textarea name="message" rows={3} placeholder="A late arrival, a question, or a little context..." /></label>
            {submitted && <div className="form-success" role="status"><Check size={17} /> Thank you — your enquiry has been sent to Marie’s team. We’ll be in touch shortly.</div>}
            <button className="button button--gold button--wide" type="submit">{submitted ? "Enquiry sent" : "Send booking enquiry"} <ArrowUpRight size={17} /></button>
            <a className="button button--whatsapp button--wide" href="https://wa.me/264814005332?text=Hello%20Marie%27s%20Guesthouse%2C%20I%27d%20like%20to%20ask%20about%20booking%20a%20room." target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowUpRight size={17} /></a>
            <p className="form-note">Your details are used only to respond to this booking enquiry.</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container site-footer__top">
          <a className="brand-mark brand-mark--footer" href="#top"><span className="brand-mark__name">Marie’s</span><span className="brand-mark__descriptor">Guesthouse</span></a>
          <p>Meeting your stay<br /><span>Katutura, Windhoek</span></p>
          <a className="footer-phone" href="tel:0814005332">081 400 5332 <ArrowUpRight size={15} /></a>
        </div>
        <div className="container site-footer__bottom"><span>© 2026 Marie’s Guesthouse</span><span>Stay a while. Make it yours.</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery image" onClick={() => setActiveImage(null)}>
          <button className="lightbox__close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image"><X size={22} /></button>
          <img src={activeImage} alt="Expanded guesthouse gallery view" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

export default Home;
