from rest_framework import serializers

from .models import Appointment, Dealership, Lead, Listing, ListingPhoto
from .services import build_listing_assist


class ListingPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingPhoto
        fields = ["id", "image_url", "sort_order", "ai_quality_notes", "created_at"]
        read_only_fields = ["id", "created_at"]


class DealershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealership
        fields = ["id", "name", "website", "phone", "city", "state", "created_at"]
        read_only_fields = ["id", "created_at"]


class ListingSerializer(serializers.ModelSerializer):
    photos = ListingPhotoSerializer(many=True, required=False)
    ai_assist = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = [
            "id",
            "dealership",
            "seller_type",
            "status",
            "vin",
            "year",
            "make",
            "model",
            "trim",
            "mileage",
            "price",
            "city",
            "state",
            "exterior_color",
            "interior_color",
            "drivetrain",
            "transmission",
            "fuel_type",
            "description",
            "ai_description",
            "quality_score",
            "price_suggestion_low",
            "price_suggestion_high",
            "photo_checklist",
            "photos",
            "ai_assist",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "ai_assist", "created_at", "updated_at"]

    def create(self, validated_data):
        photos_data = validated_data.pop("photos", [])
        listing = Listing.objects.create(**validated_data)
        for photo_data in photos_data:
            ListingPhoto.objects.create(listing=listing, **photo_data)
        return listing

    def update(self, instance, validated_data):
        photos_data = validated_data.pop("photos", None)
        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)
        instance.save()

        if photos_data is not None:
            instance.photos.all().delete()
            for photo_data in photos_data:
                ListingPhoto.objects.create(listing=instance, **photo_data)

        return instance

    def get_ai_assist(self, listing: Listing) -> dict:
        return build_listing_assist(listing)


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "listing", "name", "email", "phone", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "listing", "lead", "scheduled_for", "notes", "created_at"]
        read_only_fields = ["id", "created_at"]
