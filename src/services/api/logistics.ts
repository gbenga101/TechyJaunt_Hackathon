import { api } from "@/lib/axios";
import type {
  StorageFacility,
  BookStoragePayload,
  StorageBooking,
  Transporter,
  CreateTransportRequestPayload,
  TransportRequest,
  TransportStatus,
} from "@/types/logistics";

// ─── Storage ────────────────────────────────────────────────────────────────

export async function listStorageFacilities(): Promise<StorageFacility[]> {
  const { data } = await api.get<StorageFacility[]>("/storage");
  return data;
}

export async function getStorageFacility(facilityId: string): Promise<StorageFacility> {
  const { data } = await api.get<StorageFacility>(`/storage/${facilityId}`);
  return data;
}

export async function bookStorage(
  facilityId: string,
  payload: BookStoragePayload
): Promise<StorageBooking> {
  const { data } = await api.post<StorageBooking>(
    `/storage/${facilityId}/bookings`,
    payload
  );
  return data;
}

export async function cancelBooking(bookingId: string): Promise<StorageBooking> {
  const { data } = await api.patch<StorageBooking>(
    `/storage/bookings/${bookingId}`,
    { status: "cancelled" }
  );
  return data;
}

// ─── Transport ──────────────────────────────────────────────────────────────

export async function listTransporters(): Promise<Transporter[]> {
  const { data } = await api.get<Transporter[]>("/transport");
  return data;
}

export async function listAvailableTransporters(
  pickupLocation?: string
): Promise<Transporter[]> {
  const params = pickupLocation ? { pickupLocation } : {};
  const { data } = await api.get<Transporter[]>("/transport/available", { params });
  return data;
}

export async function createTransportRequest(
  payload: CreateTransportRequestPayload
): Promise<TransportRequest> {
  const { data } = await api.post<TransportRequest>("/transport/requests", payload);
  return data;
}

export async function updateTransportStatus(
  requestId: string,
  status: TransportStatus
): Promise<TransportRequest> {
  const { data } = await api.patch<TransportRequest>(
    `/transport/requests/${requestId}`,
    { status }
  );
  return data;
}
