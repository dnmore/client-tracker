import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function POST() {
  const session = await verifySession();

  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.stripeCustomerId) {
    return new Response("No Stripe customer found", { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return Response.json({ url: portalSession.url });
}