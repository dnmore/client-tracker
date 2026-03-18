"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function demoLogin() {
  const demoUser = await prisma.user.findUnique({
    where: { email: process.env.DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    throw new Error("Demo user not found");
  }

  const sessionToken = randomUUID();

  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000); 

  await prisma.session.create({
    data: {
      sessionToken,
      userId: demoUser.id,
      expires,
    },
  });

  const cookieStore = await cookies();

  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  cookieStore.set(cookieName, sessionToken, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
