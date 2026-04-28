from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment, Dealership, Lead, Listing
from .serializers import (
    AppointmentSerializer,
    DealershipSerializer,
    LeadSerializer,
    ListingSerializer,
)
from .services import build_listing_assist


class DealershipViewSet(viewsets.ModelViewSet):
    queryset = Dealership.objects.all().order_by("name")
    serializer_class = DealershipSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "city", "state"]


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.prefetch_related("photos").select_related("dealership")
    serializer_class = ListingSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["make", "model", "trim", "vin", "city", "state"]
    ordering_fields = ["price", "mileage", "year", "created_at", "quality_score"]

    @action(detail=True, methods=["post"])
    def assist(self, request, pk=None):
        listing = self.get_object()
        return Response(build_listing_assist(listing))


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.select_related("listing")
    serializer_class = LeadSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("listing", "lead")
    serializer_class = AppointmentSerializer
