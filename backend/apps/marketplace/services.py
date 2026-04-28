from .models import Listing


def build_listing_assist(listing: Listing) -> dict:
    missing = []
    if not listing.vin:
        missing.append("VIN")
    if not listing.description and not listing.ai_description:
        missing.append("description")
    if listing.photos.count() < 8:
        missing.append("8+ photos")
    if not listing.exterior_color:
        missing.append("exterior color")

    photo_checklist = {
        "front_three_quarter": False,
        "rear_three_quarter": False,
        "odometer": False,
        "interior_dashboard": False,
        "tires": False,
        "known_flaws": False,
    }
    photo_checklist.update(listing.photo_checklist or {})

    generated_description = listing.ai_description or (
        f"This {listing.year} {listing.make} {listing.model} "
        f"has {listing.mileage:,} miles and is listed in {listing.city}, {listing.state}. "
        "Add service history, ownership highlights, options, and condition notes to make it stand out."
    )

    return {
        "generated_description": generated_description,
        "quality_score": listing.quality_score,
        "missing_items": missing,
        "photo_checklist": photo_checklist,
        "price_suggestion": {
            "low": listing.price_suggestion_low,
            "high": listing.price_suggestion_high,
        },
    }
