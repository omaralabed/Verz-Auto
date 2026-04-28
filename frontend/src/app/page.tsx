import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CarFront,
  Gauge,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Wand2
} from "lucide-react";
import { fallbackListings, getListings } from "@/lib/api";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatMiles(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default async function Home() {
  const listingsFromApi = await getListings();
  const listings = listingsFromApi.length > 0 ? listingsFromApi : fallbackListings;
  const featured = listings[0];
  const activeListings = listings.filter((listing) => listing.status === "active");
  const averageScore =
    listings.reduce((total, listing) => total + listing.quality_score, 0) / listings.length;
  const bestValue = listings.reduce((best, listing) =>
    listing.quality_score > best.quality_score ? listing : best
  );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Verz home">
          <span className="brand-mark">V</span>
          <span>Verz</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#inventory">Shop Cars</a>
          <a href="#sell">Sell</a>
          <a href="#dealer">Dealers</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI car marketplace</p>
          <h1>Find the right car with better listing intelligence</h1>
          <p>
            Verz helps buyers compare price, condition, photos, and seller quality while giving
            private sellers and dealers tools to create listings people can trust.
          </p>
          <form className="search-panel">
            <Search size={20} aria-hidden />
            <input aria-label="Search inventory" placeholder="Search make, model, trim, or VIN" />
            <button type="submit">Search</button>
          </form>
          <div className="quick-filters" aria-label="Popular filters">
            <button type="button">SUVs</button>
            <button type="button">Under $30k</button>
            <button type="button">AWD</button>
            <button type="button">Low mileage</button>
          </div>
        </div>
        <aside className="deal-panel" aria-label="Featured deal analysis">
          <div className="deal-media">
            <span>Best match</span>
          </div>
          <div className="deal-content">
            <p className="eyebrow">AI value read</p>
            <h2>
              {bestValue.year} {bestValue.make} {bestValue.model}
            </h2>
            <strong>{formatCurrency(bestValue.price)}</strong>
            <div className="deal-grid">
              <span>{formatMiles(bestValue.mileage)} mi</span>
              <span>
                {bestValue.city}, {bestValue.state}
              </span>
              <span>{bestValue.quality_score}/100 score</span>
              <span>{bestValue.seller_type === "dealer" ? "Dealer" : "Private seller"}</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="filter-strip" aria-label="Search filters">
        <div className="filter-control">
          <CarFront size={18} aria-hidden />
          <span>Any make</span>
        </div>
        <div className="filter-control">
          <MapPin size={18} aria-hidden />
          <span>Nationwide</span>
        </div>
        <div className="filter-control">
          <SlidersHorizontal size={18} aria-hidden />
          <span>$15k - $45k</span>
        </div>
        <div className="filter-control">
          <Gauge size={18} aria-hidden />
          <span>Under 60k mi</span>
        </div>
      </section>

      <section className="section" id="inventory">
        <div className="section-heading">
          <p className="eyebrow">Live inventory</p>
          <h2>Compare cars by more than price</h2>
          <p>
            Each listing carries a quality score, missing-item checks, and pricing context so weak
            listings stand out before a buyer wastes time.
          </p>
        </div>
        <div className="inventory-grid">
          {listings.map((listing) => (
            <article className="listing-card" key={listing.id}>
              <div className="vehicle-art">
                <span>{listing.make}</span>
              </div>
              <div className="listing-body">
                <div className="listing-title-row">
                  <div>
                    <h3>
                      {listing.year} {listing.make} {listing.model}
                    </h3>
                    <p>
                      {listing.trim} · {formatMiles(listing.mileage)} mi · {listing.city},{" "}
                      {listing.state}
                    </p>
                  </div>
                  <strong>{formatCurrency(listing.price)}</strong>
                </div>
                <div className="listing-tags">
                  <span>{listing.seller_type === "dealer" ? "Dealer" : "Private"}</span>
                  <span>{listing.drivetrain || "Drivetrain TBD"}</span>
                  <span>{listing.transmission || "Transmission TBD"}</span>
                </div>
                <div className="score-row">
                  <Gauge size={18} aria-hidden />
                  <span>{listing.quality_score}/100 listing quality</span>
                </div>
                <div className="card-actions">
                  <button type="button">View details</button>
                  <button className="ghost-button" type="button">
                    Save
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-band">
        <div>
          <BadgeCheck size={26} aria-hidden />
          <strong>{activeListings.length} active listings</strong>
          <span>Inventory connected to seller quality signals.</span>
        </div>
        <div>
          <ShieldCheck size={26} aria-hidden />
          <strong>{Math.round(averageScore)}/100 avg quality</strong>
          <span>Scores reward complete photos, VINs, descriptions, and fair pricing.</span>
        </div>
        <div>
          <Sparkles size={26} aria-hidden />
          <strong>AI deal checks</strong>
          <span>Price ranges and listing gaps help buyers ask better questions.</span>
        </div>
      </section>

      <section className="seller-section" id="sell">
        <div className="seller-copy">
          <p className="eyebrow">Seller assistant</p>
          <h2>Create a stronger listing before it goes live</h2>
          <p>{featured.ai_assist.generated_description}</p>
        </div>
        <div className="assistant-panel">
          <div className="panel-header">
            <Wand2 size={20} aria-hidden />
            <span>
              {featured.year} {featured.make} {featured.model} listing review
            </span>
          </div>
          <div className="quality-meter">
            <span style={{ width: `${featured.quality_score}%` }} />
          </div>
          <div className="assistant-grid">
            <div>
              <strong>Missing items</strong>
              <ul>
                {featured.ai_assist.missing_items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Suggested range</strong>
              <p>
                {formatCurrency(featured.ai_assist.price_suggestion.low ?? 0)} -{" "}
                {formatCurrency(featured.ai_assist.price_suggestion.high ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dealer-desk" id="dealer">
        <div className="section-heading">
          <p className="eyebrow">Dealer desk</p>
          <h2>Give dealerships a better daily command center</h2>
        </div>
        <div className="ops-grid">
          <div className="ops-item">
            <Store size={24} aria-hidden />
            <strong>Inventory health</strong>
            <span>Find weak listings and fix them before they lose leads.</span>
          </div>
          <div className="ops-item">
            <Camera size={24} aria-hidden />
            <strong>Photo QA</strong>
            <span>Track missing odometer, tire, interior, and damage photos.</span>
          </div>
          <div className="ops-item">
            <CalendarDays size={24} aria-hidden />
            <strong>Lead appointments</strong>
            <span>Move buyers from inquiry to test drive with less back-and-forth.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
