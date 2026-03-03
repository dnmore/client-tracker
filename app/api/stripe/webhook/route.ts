import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }
  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(
        event.data.object as Stripe.Checkout.Session,
      );
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    default:
      break;
  }

  return new Response(null, { status: 200 });
}



async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const subscriptionId = session.subscription as string | null;
  const customerId = session.customer as string | null;

  if (!subscriptionId || !customerId) {
    throw new Error("Missing subscription or customer ID");
  }

  const [subscription, user] = await Promise.all([
    stripe.subscriptions.retrieve(subscriptionId),
    prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    }),
  ]);

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      plan: subscription.status === "active" ? "PRO" : "FREE",
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string | null;
  if (!customerId) {
    throw new Error("Missing customer ID");
  }

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;
  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: "FREE",
      subscriptionStatus: "canceled",
      stripeSubscriptionId: null,
    },
  });
}
