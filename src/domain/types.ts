export type Role = "SEEKER" | "PROVIDER";

export type User = {
  id: string;
  role: Role;
  name?: string;
};

export type JobRequestStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "DONE"
  | "CANCELED";

export type JobRequest = {
  id: string;
  title: string;
  description: string;
  budget?: number;
  locationText?: string;
  seekerId: string;
  assignedProviderId?: string;
  status: JobRequestStatus;
  createdAt: string;
};

export type OfferStatus = "SENT" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";

export type Offer = {
  id: string;
  requestId: string;
  providerId: string;
  price?: number;
  message?: string;
  status: OfferStatus;
  createdAt: string;
};
