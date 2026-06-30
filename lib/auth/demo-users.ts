import type { RoleKey } from "@/lib/auth/roles";

export type SessionCompanyOption = {
  id: string;
  name: string;
  slug: string;
};

export type DemoAuthUser = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: RoleKey;
  companies: SessionCompanyOption[];
  activeCompanyId: string | null;
};

const demoCompanies = {
  sumigases: {
    id: "demo-sumigases",
    name: "Sumigases",
    slug: "sumigases",
  },
  sudematin: {
    id: "demo-sudematin",
    name: "Sudematin",
    slug: "sudematin",
  },
} satisfies Record<string, SessionCompanyOption>;

export const demoAuthUsers: DemoAuthUser[] = [
  {
    fullName: "Owner Demo",
    email: "owner@sumicontrol.local",
    username: "owner",
    password: "owner123",
    role: "OWNER",
    companies: [demoCompanies.sumigases, demoCompanies.sudematin],
    activeCompanyId: demoCompanies.sumigases.id,
  },
  {
    fullName: "Admin Demo",
    email: "admin@sumicontrol.local",
    username: "admin",
    password: "admin123",
    role: "ADMIN",
    companies: [demoCompanies.sumigases, demoCompanies.sudematin],
    activeCompanyId: demoCompanies.sumigases.id,
  },
  {
    fullName: "Auditor Demo",
    email: "auditor@sumicontrol.local",
    username: "auditor",
    password: "audit123",
    role: "AUDITOR",
    companies: [demoCompanies.sudematin],
    activeCompanyId: demoCompanies.sudematin.id,
  },
];
