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

export type ChatThread = {
  id: string;
  seekerId: string;
  performerId: string;
  lastMessageAt: string;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type InvitationStatus = "SENT" | "ACCEPTED" | "DECLINED";

export type Invitation = {
  id: string;
  seekerId: string;
  performerId: string;
  requestId: string;
  status: InvitationStatus;
  createdAt: string;
};
