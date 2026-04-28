export type Listing = {
  id: number;
  seller_type: "private" | "dealer";
  status: "draft" | "active" | "sold" | "archived";
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  price: number;
  city: string;
  state: string;
  exterior_color: string;
  interior_color: string;
  drivetrain: string;
  transmission: string;
  fuel_type: string;
  description: string;
  ai_description: string;
  quality_score: number;
  price_suggestion_low: number | null;
  price_suggestion_high: number | null;
  photos: ListingPhoto[];
  ai_assist: ListingAssist;
};

export type ListingPhoto = {
  id: number;
  image_url: string;
  sort_order: number;
};

export type ListingAssist = {
  generated_description: string;
  quality_score: number;
  missing_items: string[];
  photo_checklist: Record<string, boolean>;
  price_suggestion: {
    low: number | null;
    high: number | null;
  };
};
