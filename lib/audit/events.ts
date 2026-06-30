export const auditEvents = {
  PASSWORD_VIEWED: "PASSWORD_VIEWED",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_CREATED: "USER_CREATED",
  USER_UPDATED: "USER_UPDATED",
} as const;

export type AuditEvent = keyof typeof auditEvents;
