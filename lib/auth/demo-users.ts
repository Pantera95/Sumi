import type { RoleKey } from "@/lib/auth/roles";

export type DemoAuthUser = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: RoleKey;
  companyScope: string;
};

export const demoAuthUsers: DemoAuthUser[] = [
  {
    fullName: "Owner Demo",
    email: "owner@sumicontrol.local",
    username: "owner",
    password: "owner123",
    role: "OWNER",
    companyScope: "Sumigases + Sudematin",
  },
  {
    fullName: "Admin Demo",
    email: "admin@sumicontrol.local",
    username: "admin",
    password: "admin123",
    role: "ADMIN",
    companyScope: "Sumigases + Sudematin",
  },
  {
    fullName: "Auditor Demo",
    email: "auditor@sumicontrol.local",
    username: "auditor",
    password: "audit123",
    role: "AUDITOR",
    companyScope: "Sudematin",
  },
];
