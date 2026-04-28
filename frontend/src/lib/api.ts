import type { Listing } from "@/types/marketplace";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

type Paginated<T> = {
  results: T[];
};

export const fallbackListings: Listing[] = [
  {
    id: 1,
    seller_type: "dealer",
    status: "active",
    vin: "1HGCV1F34LA000001",
    year: 2022,
    make: "Honda",
    model: "Accord",
    trim: "Sport",
    mileage: 28400,
    price: 26900,
    city: "Austin",
    state: "TX",
    exterior_color: "Platinum White",
    interior_color: "Black",
    drivetrain: "FWD",
    transmission: "Automatic",
    fuel_type: "Gasoline",
    description: "Clean Accord Sport with strong service history.",
    ai_description: "",
    quality_score: 82,
    price_suggestion_low: 25800,
    price_suggestion_high: 27400,
    photos: [],
    ai_assist: {
      generated_description:
        "This 2022 Honda Accord Sport pairs everyday reliability with a polished cabin, efficient performance, and the right equipment for commuters who still care about the drive.",
      quality_score: 82,
      missing_items: ["odometer photo", "tire closeups"],
      photo_checklist: {
        front_three_quarter: true,
        rear_three_quarter: true,
        odometer: false,
        interior_dashboard: true,
        tires: false,
        known_flaws: true
      },
      price_suggestion: { low: 25800, high: 27400 }
    }
  },
  {
    id: 2,
    seller_type: "private",
    status: "active",
    vin: "",
    year: 2021,
    make: "Toyota",
    model: "RAV4",
    trim: "XLE",
    mileage: 36120,
    price: 28950,
    city: "Raleigh",
    state: "NC",
    exterior_color: "Blueprint",
    interior_color: "Ash",
    drivetrain: "AWD",
    transmission: "Automatic",
    fuel_type: "Gasoline",
    description: "",
    ai_description: "",
    quality_score: 64,
    price_suggestion_low: 27600,
    price_suggestion_high: 29400,
    photos: [],
    ai_assist: {
      generated_description:
        "This 2021 Toyota RAV4 XLE AWD is positioned as a practical crossover with confident all-weather traction and the equipment buyers expect in a daily SUV.",
      quality_score: 64,
      missing_items: ["VIN", "description", "8+ photos"],
      photo_checklist: {
        front_three_quarter: true,
        rear_three_quarter: false,
        odometer: false,
        interior_dashboard: true,
        tires: false,
        known_flaws: false
      },
      price_suggestion: { low: 27600, high: 29400 }
    }
  }
];

export async function getListings(): Promise<Listing[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/`, {
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      return fallbackListings;
    }

    const payload = (await response.json()) as Paginated<Listing> | Listing[];
    const listings = Array.isArray(payload) ? payload : payload.results;
    return Array.isArray(listings) ? listings : fallbackListings;
  } catch {
    return fallbackListings;
  }
}
