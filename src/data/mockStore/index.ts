import type {
  ChatMessage,
  ChatThread,
  Invitation,
  InvitationStatus,
  JobRequest,
  JobRequestStatus,
  Offer,
  Role,
  User
} from "../../domain/types";

type Entity = User | JobRequest | Offer | ChatThread | ChatMessage | Invitation;

type Id = string;

const store = {
  users: [] as User[],
  jobRequests: [] as JobRequest[],
  offers: [] as Offer[],
  chatThreads: [] as ChatThread[],
  chatMessages: [] as ChatMessage[],
  invitations: [] as Invitation[]
};

const delay = (ms = 120) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const clone = <T extends Entity>(value: T): T => JSON.parse(JSON.stringify(value));

const findIndexById = <T extends Entity>(items: T[], id: Id) =>
  items.findIndex((item) => item.id === id);

const makeId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;

export const mockStore = {
  users: {
    async list() {
      await delay();
      return store.users.map(clone);
    },
    async get(id: Id) {
      await delay();
      const item = store.users.find((user) => user.id === id);
      return item ? clone(item) : null;
    },
    async create(input: Omit<User, "id"> & { id?: string }) {
      await delay();
      const user: User = {
        id: input.id ?? makeId("usr"),
        role: input.role,
        name: input.name
      };
      store.users.push(user);
      return clone(user);
    },
    async update(id: Id, patch: Partial<Omit<User, "id">>) {
      await delay();
      const index = findIndexById(store.users, id);
      if (index === -1) return null;
      const updated = { ...store.users[index], ...patch };
      store.users[index] = updated;
      return clone(updated);
    },
    async remove(id: Id) {
      await delay();
      const index = findIndexById(store.users, id);
      if (index === -1) return false;
      store.users.splice(index, 1);
      return true;
    }
  },
  jobRequests: {
    async list() {
      await delay();
      return store.jobRequests.map(clone);
    },
    async get(id: Id) {
      await delay();
      const item = store.jobRequests.find((request) => request.id === id);
      return item ? clone(item) : null;
    },
    async create(input: Omit<JobRequest, "id" | "createdAt"> & { id?: string; createdAt?: string }) {
      await delay();
      const request: JobRequest = {
        id: input.id ?? makeId("req"),
        title: input.title,
        description: input.description,
        budget: input.budget,
        locationText: input.locationText,
        seekerId: input.seekerId,
        assignedProviderId: input.assignedProviderId,
        status: input.status,
        createdAt: input.createdAt ?? new Date().toISOString()
      };
      store.jobRequests.push(request);
      return clone(request);
    },
    async update(id: Id, patch: Partial<Omit<JobRequest, "id" | "createdAt">>) {
      await delay();
      const index = findIndexById(store.jobRequests, id);
      if (index === -1) return null;
      const updated = { ...store.jobRequests[index], ...patch };
      store.jobRequests[index] = updated;
      return clone(updated);
    },
    async transitionStatus(id: Id, role: Role, nextStatus: JobRequestStatus) {
      await delay();
      const index = findIndexById(store.jobRequests, id);
      if (index === -1) return null;

      const current = store.jobRequests[index];
      const allowedByRole =
        (role === "PROVIDER" &&
          ((current.status === "ASSIGNED" && nextStatus === "IN_PROGRESS") ||
            (current.status === "IN_PROGRESS" && nextStatus === "DONE"))) ||
        (role === "SEEKER" &&
          ((current.status === "ASSIGNED" && nextStatus === "CANCELED") ||
            (current.status === "IN_PROGRESS" && nextStatus === "CANCELED")));

      if (!allowedByRole) return null;

      const updated = { ...current, status: nextStatus };
      store.jobRequests[index] = updated;
      return clone(updated);
    },
    async remove(id: Id) {
      await delay();
      const index = findIndexById(store.jobRequests, id);
      if (index === -1) return false;
      store.jobRequests.splice(index, 1);
      return true;
    }
  },
  offers: {
    async list() {
      await delay();
      return store.offers.map(clone);
    },
    async get(id: Id) {
      await delay();
      const item = store.offers.find((offer) => offer.id === id);
      return item ? clone(item) : null;
    },
    async create(input: Omit<Offer, "id" | "createdAt"> & { id?: string; createdAt?: string }) {
      await delay();
      const offer: Offer = {
        id: input.id ?? makeId("ofr"),
        requestId: input.requestId,
        providerId: input.providerId,
        price: input.price,
        message: input.message,
        status: input.status,
        createdAt: input.createdAt ?? new Date().toISOString()
      };
      store.offers.push(offer);
      return clone(offer);
    },
    async update(id: Id, patch: Partial<Omit<Offer, "id" | "createdAt">>) {
      await delay();
      const index = findIndexById(store.offers, id);
      if (index === -1) return null;
      const updated = { ...store.offers[index], ...patch };
      store.offers[index] = updated;
      return clone(updated);
    },
    async remove(id: Id) {
      await delay();
      const index = findIndexById(store.offers, id);
      if (index === -1) return false;
      store.offers.splice(index, 1);
      return true;
    }
  },
  chats: {
    async listThreadsBySeeker(seekerId: Id) {
      await delay();
      return store.chatThreads.filter((thread) => thread.seekerId === seekerId).map(clone);
    },
    async getThreadById(id: Id) {
      await delay();
      const item = store.chatThreads.find((thread) => thread.id === id);
      return item ? clone(item) : null;
    },
    async getThreadBySeekerAndPerformer(seekerId: Id, performerId: Id) {
      await delay();
      const item = store.chatThreads.find(
        (thread) => thread.seekerId === seekerId && thread.performerId === performerId
      );
      return item ? clone(item) : null;
    },
    async ensureThread(seekerId: Id, performerId: Id) {
      await delay();
      const existing = store.chatThreads.find(
        (thread) => thread.seekerId === seekerId && thread.performerId === performerId
      );
      if (existing) return clone(existing);
      const thread: ChatThread = {
        id: makeId("thr"),
        seekerId,
        performerId,
        lastMessageAt: new Date().toISOString()
      };
      store.chatThreads.push(thread);
      return clone(thread);
    },
    async listMessages(threadId: Id) {
      await delay();
      return store.chatMessages.filter((msg) => msg.threadId === threadId).map(clone);
    },
    async sendMessage(threadId: Id, senderId: Id, text: string) {
      await delay();
      const message: ChatMessage = {
        id: makeId("msg"),
        threadId,
        senderId,
        text,
        createdAt: new Date().toISOString()
      };
      store.chatMessages.push(message);
      const threadIndex = findIndexById(store.chatThreads, threadId);
      if (threadIndex !== -1) {
        store.chatThreads[threadIndex] = {
          ...store.chatThreads[threadIndex],
          lastMessageAt: message.createdAt
        };
      }
      return clone(message);
    }
  },
  invitations: {
    async listBySeeker(seekerId: Id) {
      await delay();
      return store.invitations.filter((item) => item.seekerId === seekerId).map(clone);
    },
    async create(input: Omit<Invitation, "id" | "createdAt" | "status"> & { status?: InvitationStatus }) {
      await delay();
      const invitation: Invitation = {
        id: makeId("inv"),
        seekerId: input.seekerId,
        performerId: input.performerId,
        requestId: input.requestId,
        status: input.status ?? "SENT",
        createdAt: new Date().toISOString()
      };
      store.invitations.push(invitation);
      return clone(invitation);
    }
  }
};
