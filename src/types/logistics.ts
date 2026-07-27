// ─── Storage ────────────────────────────────────────────────────────────────

export type StorageStatus = "available" | "limited" | "full";
export type BookingStatus = "confirmed" | "cancelled";

export interface StorageFacility {
  id: string;
  name: string;
  location: string;
  capacityTotal: number;
  capacityAvailable: number;
  pricePerUnit: number;
  contactPhone: string;
  operatingHours: string;
  status: StorageStatus;
}

export interface BookStoragePayload {
  quantity: number;
  startDate: string; // ISO date string e.g. "2026-07-28"
  endDate: string;
}

export interface StorageBooking {
  bookingId: string;
  facilityId: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  confirmation: string;
}

// ─── Transport ──────────────────────────────────────────────────────────────

export type TransportStatus = "pending" | "accepted" | "in-transit" | "delivered";

export interface Transporter {
  id: string;
  name: string;
  location: string;
  isAvailable: boolean;
  vehicleType: string;
  capacity: number;
  contactPhone: string;
}

export interface ProduceDetails {
  produce: string;
  quantity: number;
  unit: string;
}

export interface CreateTransportRequestPayload {
  pickupLocation: string;
  dropoffLocation: string;
  produceDetails: ProduceDetails;
}

export interface TransportRequest {
  requestId: string;
  pickupLocation: string;
  dropoffLocation: string;
  produceDetails: ProduceDetails;
  status: TransportStatus;
  transporterId: string | null;
}
