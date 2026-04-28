# Generated for the initial Verz marketplace scaffold.

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Dealership",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=160)),
                ("website", models.URLField(blank=True)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("city", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=2)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Listing",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "seller_type",
                    models.CharField(
                        choices=[("private", "Private seller"), ("dealer", "Dealer")],
                        max_length=20,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("draft", "Draft"),
                            ("active", "Active"),
                            ("sold", "Sold"),
                            ("archived", "Archived"),
                        ],
                        default="draft",
                        max_length=20,
                    ),
                ),
                ("vin", models.CharField(blank=True, max_length=17)),
                ("year", models.PositiveSmallIntegerField()),
                ("make", models.CharField(max_length=80)),
                ("model", models.CharField(max_length=80)),
                ("trim", models.CharField(blank=True, max_length=120)),
                ("mileage", models.PositiveIntegerField()),
                ("price", models.PositiveIntegerField()),
                ("city", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=2)),
                ("exterior_color", models.CharField(blank=True, max_length=80)),
                ("interior_color", models.CharField(blank=True, max_length=80)),
                ("drivetrain", models.CharField(blank=True, max_length=80)),
                ("transmission", models.CharField(blank=True, max_length=80)),
                ("fuel_type", models.CharField(blank=True, max_length=80)),
                ("description", models.TextField(blank=True)),
                ("ai_description", models.TextField(blank=True)),
                ("quality_score", models.PositiveSmallIntegerField(default=0)),
                ("price_suggestion_low", models.PositiveIntegerField(blank=True, null=True)),
                ("price_suggestion_high", models.PositiveIntegerField(blank=True, null=True)),
                ("photo_checklist", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "dealership",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="listings",
                        to="marketplace.dealership",
                    ),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Lead",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=140)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("message", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="leads",
                        to="marketplace.listing",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ListingPhoto",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image_url", models.URLField()),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("ai_quality_notes", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="photos",
                        to="marketplace.listing",
                    ),
                ),
            ],
            options={"ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="Appointment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("scheduled_for", models.DateTimeField()),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lead",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to="marketplace.lead",
                    ),
                ),
                (
                    "listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to="marketplace.listing",
                    ),
                ),
            ],
        ),
    ]
