import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireOwner } from "@/lib/auth-guards";
export async function POST() {
  try {
    const session = await requireOwner();
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return Response.json({ error: "User not found" });

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    });
     revalidateTag("dashboard", "max");
    revalidatePath("/dashboard");
    return Response.json({ url: checkoutSession.url });
  } catch (err: any) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
