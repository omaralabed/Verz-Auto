from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.marketplace.views import (
    AppointmentViewSet,
    DealershipViewSet,
    LeadViewSet,
    ListingViewSet,
)

router = DefaultRouter()
router.register("dealerships", DealershipViewSet)
router.register("listings", ListingViewSet)
router.register("leads", LeadViewSet)
router.register("appointments", AppointmentViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
