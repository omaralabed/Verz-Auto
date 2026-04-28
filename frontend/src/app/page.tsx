import { CalendarDays, Camera, Gauge, Search, Sparkles, Store, Wand2 } from "lucide-react";
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

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V</span>
          <span>Verz</span>
        </div>
        <nav aria-label="Primary navigation">
          <a href="#inventory">Inventory</a>
          <a href="#assistant">AI Assistant</a>
          <a href="#dealer">Dealer Desk</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI-powered car marketplace</p>
          <h1>Verz</h1>
          <p>
            A sharper marketplace for buyers, private sellers, and dealerships, with listing
            intelligence built into the workflow from the first VIN scan.
          </p>
          <form className="search-panel">
            <Search size={20} aria-hidden />
            <input aria-label="Search inventory" placeholder="Search make, model, body style, VIN" />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="market-snapshot" aria-label="Marketplace snapshot">
          <div>
            <span>{activeListings.length}</span>
            <p>Active listings</p>
          </div>
          <div>
            <span>{Math.round(averageScore)}</span>
            <p>Avg quality score</p>
          </div>
          <div>
            <span>24h</span>
            <p>Lead response target</p>
          </div>
        </div>
      </section>

      <section className="section" id="inventory">
        <div className="section-heading">
          <p className="eyebrow">Buyer inventory</p>
          <h2>Listings that are easier to trust</h2>
        </div>
        <div className="inventory-grid">
          {listings.map((listing) => (
            <article className="listing-card" key={listing.id}>
              <div className="vehicle-art">
                <span>{listing.make}</span>
              </div>
              <div className="listing-body">
                <div>
                  <h3>
                    {listing.year} {listing.make} {listing.model}
                  </h3>
                  <p>
                    {listing.trim} · {formatMiles(listing.mileage)} mi · {listing.city},{" "}
                    {listing.state}
                  </p>
                </div>
                <div className="listing-meta">
                  <strong>{formatCurrency(listing.price)}</strong>
                  <span>{listing.seller_type === "dealer" ? "Dealer" : "Private"}</span>
                </div>
                <div className="score-row">
                  <Gauge size={18} aria-hidden />
                  <span>{listing.quality_score}/100 listing quality</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="assistant-band" id="assistant">
        <div className="assistant-copy">
          <p className="eyebrow">Seller AI assistant</p>
          <h2>Turn incomplete drafts into stronger listings</h2>
          <p>{featured.ai_assist.generated_description}</p>
        </div>
        <div className="assistant-panel">
          <div className="panel-header">
            <Wand2 size={20} aria-hidden />
            <span>
              {featured.year} {featured.make} {featured.model}
            </span>
          </div>
          <div className="quality-meter">
            <span style={{ width: `${featured.quality_score}%` }} />
          </div>
          <ul>
            {featured.ai_assist.missing_items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="price-range">
            <Sparkles size={18} aria-hidden />
            <span>
              Suggested range: {formatCurrency(featured.ai_assist.price_suggestion.low ?? 0)} -{" "}
              {formatCurrency(featured.ai_assist.price_suggestion.high ?? 0)}
            </span>
          </div>
        </div>
      </section>

      <section className="dealer-desk" id="dealer">
        <div className="section-heading">
          <p className="eyebrow">Dealer dashboard</p>
          <h2>Inventory, leads, appointments, and listing quality in one view</h2>
        </div>
        <div className="ops-grid">
          <div className="ops-item">
            <Store size={24} aria-hidden />
            <strong>Inventory health</strong>
            <span>Score drafts before publishing.</span>
          </div>
          <div className="ops-item">
            <Camera size={24} aria-hidden />
            <strong>Photo checklist</strong>
            <span>Spot missing views and condition details.</span>
          </div>
          <div className="ops-item">
            <CalendarDays size={24} aria-hidden />
            <strong>Appointments</strong>
            <span>Convert buyer leads into scheduled visits.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
