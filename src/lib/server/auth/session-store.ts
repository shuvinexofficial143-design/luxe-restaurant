export type ServerSessionRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt: string | null;
  createdAt: string;
};

export interface SessionStore {
  create(record: ServerSessionRecord): Promise<void>;
  getByTokenHash(tokenHash: string): Promise<ServerSessionRecord | null>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}

export class PendingDatabaseSessionStore implements SessionStore {
  async create(
    _record: ServerSessionRecord
  ): Promise<void> {
    void _record;
    throw new Error("session_store_not_connected");
  }

  async getByTokenHash(
    _tokenHash: string
  ): Promise<ServerSessionRecord | null> {
    void _tokenHash;
    throw new Error("session_store_not_connected");
  }

  async revoke(
    _id: string
  ): Promise<void> {
    void _id;
    throw new Error("session_store_not_connected");
  }

  async revokeAllForUser(
    _userId: string
  ): Promise<void> {
    void _userId;
    throw new Error("session_store_not_connected");
  }
}

export const serverSessionStore = new PendingDatabaseSessionStore();
