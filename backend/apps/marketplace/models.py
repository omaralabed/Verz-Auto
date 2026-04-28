from django.db import models


class Dealership(models.Model):
    name = models.CharField(max_length=160)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Listing(models.Model):
    class SellerType(models.TextChoices):
        PRIVATE = "private", "Private seller"
        DEALER = "dealer", "Dealer"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        SOLD = "sold", "Sold"
        ARCHIVED = "archived", "Archived"

    dealership = models.ForeignKey(
        Dealership,
        related_name="listings",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    seller_type = models.CharField(max_length=20, choices=SellerType.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    vin = models.CharField(max_length=17, blank=True)
    year = models.PositiveSmallIntegerField()
    make = models.CharField(max_length=80)
    model = models.CharField(max_length=80)
    trim = models.CharField(max_length=120, blank=True)
    mileage = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    exterior_color = models.CharField(max_length=80, blank=True)
    interior_color = models.CharField(max_length=80, blank=True)
    drivetrain = models.CharField(max_length=80, blank=True)
    transmission = models.CharField(max_length=80, blank=True)
    fuel_type = models.CharField(max_length=80, blank=True)
    description = models.TextField(blank=True)
    ai_description = models.TextField(blank=True)
    quality_score = models.PositiveSmallIntegerField(default=0)
    price_suggestion_low = models.PositiveIntegerField(null=True, blank=True)
    price_suggestion_high = models.PositiveIntegerField(null=True, blank=True)
    photo_checklist = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.year} {self.make} {self.model}"


class ListingPhoto(models.Model):
    listing = models.ForeignKey(Listing, related_name="photos", on_delete=models.CASCADE)
    image_url = models.URLField()
    sort_order = models.PositiveSmallIntegerField(default=0)
    ai_quality_notes = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]


class Lead(models.Model):
    listing = models.ForeignKey(Listing, related_name="leads", on_delete=models.CASCADE)
    name = models.CharField(max_length=140)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.listing}"


class Appointment(models.Model):
    listing = models.ForeignKey(Listing, related_name="appointments", on_delete=models.CASCADE)
    lead = models.ForeignKey(Lead, related_name="appointments", on_delete=models.CASCADE)
    scheduled_for = models.DateTimeField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
