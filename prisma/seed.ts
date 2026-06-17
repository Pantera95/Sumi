import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const companies = [
  { key: "SUMIGASES", name: "Sumigases", slug: "sumigases" },
  { key: "SUDEMATIN", name: "Sudematin", slug: "sudematin" },
] as const;

const permissions = [
  {
    key: "DASHBOARD_READ",
    name: "Ver dashboard",
    description: "Permite consultar el dashboard administrativo.",
  },
  {
    key: "USERS_READ",
    name: "Ver usuarios",
    description: "Permite consultar usuarios y sus roles.",
  },
  {
    key: "USERS_WRITE",
    name: "Gestionar usuarios",
    description: "Permite crear, editar y desactivar usuarios.",
  },
  {
    key: "PASSWORDS_READ",
    name: "Ver contrasenas",
    description: "Permite ver contrasenas visibles segun decision del proyecto.",
  },
  {
    key: "COMPANIES_SWITCH",
    name: "Cambiar empresa",
    description: "Permite alternar entre Sumigases y Sudematin.",
  },
  {
    key: "SETTINGS_READ",
    name: "Ver configuracion",
    description: "Permite consultar configuracion del sistema.",
  },
  {
    key: "SETTINGS_WRITE",
    name: "Editar configuracion",
    description: "Permite modificar configuracion del sistema.",
  },
  {
    key: "AUDIT_READ",
    name: "Ver auditoria",
    description: "Permite consultar eventos de auditoria.",
  },
] as const;

const roleMatrix = {
  OWNER: [
    "DASHBOARD_READ",
    "USERS_READ",
    "USERS_WRITE",
    "PASSWORDS_READ",
    "COMPANIES_SWITCH",
    "SETTINGS_READ",
    "SETTINGS_WRITE",
    "AUDIT_READ",
  ],
  ADMIN: [
    "DASHBOARD_READ",
    "USERS_READ",
    "USERS_WRITE",
    "PASSWORDS_READ",
    "COMPANIES_SWITCH",
    "SETTINGS_READ",
    "SETTINGS_WRITE",
    "AUDIT_READ",
  ],
  AUDITOR: ["DASHBOARD_READ", "USERS_READ", "AUDIT_READ"],
  CAJERO: ["DASHBOARD_READ"],
  VENDEDOR: ["DASHBOARD_READ"],
  ALMACEN: ["DASHBOARD_READ"],
  COMPRAS: ["DASHBOARD_READ"],
  TECNICO_RECARGA: ["DASHBOARD_READ"],
  DISTRIBUIDOR: ["DASHBOARD_READ"],
} as const;

const roleLabels = {
  OWNER: "Owner",
  ADMIN: "Administrador",
  AUDITOR: "Auditor",
  CAJERO: "Cajero",
  VENDEDOR: "Vendedor",
  ALMACEN: "Almacen",
  COMPRAS: "Compras",
  TECNICO_RECARGA: "Tecnico Recarga",
  DISTRIBUIDOR: "Distribuidor",
} as const;

const users = [
  {
    email: "owner@sumicontrol.local",
    username: "owner",
    fullName: "Owner Demo",
    password: "owner123",
    role: "OWNER",
    defaultCompanyKey: "SUMIGASES",
    companyKeys: ["SUMIGASES", "SUDEMATIN"],
  },
  {
    email: "admin@sumicontrol.local",
    username: "admin",
    fullName: "Admin Demo",
    password: "admin123",
    role: "ADMIN",
    defaultCompanyKey: "SUMIGASES",
    companyKeys: ["SUMIGASES", "SUDEMATIN"],
  },
  {
    email: "auditor@sumicontrol.local",
    username: "auditor",
    fullName: "Auditor Demo",
    password: "audit123",
    role: "AUDITOR",
    defaultCompanyKey: "SUDEMATIN",
    companyKeys: ["SUDEMATIN"],
  },
] as const;

async function main() {
  for (const company of companies) {
    await prisma.company.upsert({
      where: { key: company.key },
      update: {
        name: company.name,
        slug: company.slug,
      },
      create: company,
    });
  }

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      update: {
        name: permission.name,
        description: permission.description,
      },
      create: permission,
    });
  }

  for (const [roleKey, permissionKeys] of Object.entries(roleMatrix)) {
    const role = await prisma.role.upsert({
      where: { key: roleKey as keyof typeof roleLabels },
      update: {
        name: roleLabels[roleKey as keyof typeof roleLabels],
      },
      create: {
        key: roleKey as keyof typeof roleLabels,
        name: roleLabels[roleKey as keyof typeof roleLabels],
      },
    });

    await prisma.rolePermission.deleteMany({
      where: { roleId: role.id },
    });

    for (const permissionKey of permissionKeys) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { key: permissionKey },
      });

      await prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  for (const userData of users) {
    const role = await prisma.role.findUniqueOrThrow({
      where: { key: userData.role },
    });
    const defaultCompany = await prisma.company.findUniqueOrThrow({
      where: { key: userData.defaultCompanyKey },
    });

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        fullName: userData.fullName,
        username: userData.username,
        password: userData.password,
        roleId: role.id,
        defaultCompanyId: defaultCompany.id,
        isActive: true,
      },
      create: {
        fullName: userData.fullName,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        roleId: role.id,
        defaultCompanyId: defaultCompany.id,
      },
    });

    await prisma.userCompany.deleteMany({
      where: { userId: user.id },
    });

    for (const companyKey of userData.companyKeys) {
      const company = await prisma.company.findUniqueOrThrow({
        where: { key: companyKey },
      });

      await prisma.userCompany.create({
        data: {
          userId: user.id,
          companyId: company.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
