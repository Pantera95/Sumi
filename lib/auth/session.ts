import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

const SESSION_COOKIE_NAME =
  process.env.AUTH_SESSION_NAME || "sumi_session";
const SESSION_DURATION_HOURS = 12;

type SessionUserSnapshot = {
  fullName: string;
  email: string;
  username: string;
  role: string;
  defaultCompany: string | null;
  source: "database" | "demo";
};

type DemoSessionPayload = {
  fullName: string;
  email: string;
  username: string;
  role: string;
  defaultCompany: string | null;
};

function getSessionExpiryDate() {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);
  return expiresAt;
}

function encodeDemoSession(payload: DemoSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodeDemoSession(value: string): DemoSessionPayload | null {
  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    return JSON.parse(decoded) as DemoSessionPayload;
  } catch {
    return null;
  }
}

async function writeSessionCookie(value: string, expiresAt: Date) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function createDatabaseSession(
  token: string,
  userId: string,
): Promise<Date> {
  if (!prisma) {
    throw new Error("Prisma no esta disponible para crear sesion.");
  }

  const expiresAt = getSessionExpiryDate();

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  await writeSessionCookie(`db:${token}`, expiresAt);

  return expiresAt;
}

export async function createDemoSession(payload: DemoSessionPayload) {
  const expiresAt = getSessionExpiryDate();
  const encoded = encodeDemoSession(payload);

  await writeSessionCookie(`demo:${encoded}`, expiresAt);

  return expiresAt;
}

export async function clearSession() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (cookieValue?.startsWith("db:") && prisma) {
    await prisma.session.deleteMany({
      where: {
        token: cookieValue.slice(3),
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentSessionUser(): Promise<SessionUserSnapshot | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  if (cookieValue.startsWith("demo:")) {
    const payload = decodeDemoSession(cookieValue.slice(5));

    if (!payload) {
      return null;
    }

    return {
      ...payload,
      source: "demo",
    };
  }

  if (cookieValue.startsWith("db:") && prisma) {
    const token = cookieValue.slice(3);
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            role: true,
            defaultCompany: true,
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return {
      fullName: session.user.fullName,
      email: session.user.email,
      username: session.user.username,
      role: session.user.role.key,
      defaultCompany: session.user.defaultCompany?.name ?? null,
      source: "database",
    };
  }

  return null;
}
