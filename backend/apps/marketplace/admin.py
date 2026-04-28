from django.contrib import admin

from .models import Appointment, Dealership, Lead, Listing, ListingPhoto


class ListingPhotoInline(admin.TabularInline):
    model = ListingPhoto
    extra = 1


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ("year", "make", "model", "price", "status", "seller_type", "quality_score")
    list_filter = ("status", "seller_type", "make", "state")
    search_fields = ("vin", "make", "model", "trim", "city")
    inlines = [ListingPhotoInline]


admin.site.register(Dealership)
admin.site.register(Lead)
admin.site.register(Appointment)
