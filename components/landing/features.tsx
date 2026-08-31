"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Agreement02Icon,
  CreditCardIcon,
  Chart03Icon,
  Search01Icon,
  AccessIcon,
} from "@hugeicons/core-free-icons";

const features = [
  {
    icon: UserGroupIcon,
    title: "Lead Management",
    description: "Capture and organize prospects",
  },
  {
    icon: Agreement02Icon,
    title: "Deal Tracking",
    description: "Monitor deal progress and status",
  },
  {
    icon: Chart03Icon,
    title: "Revenue analytics",
    description: "Understand performance at a glance",
  },
  {
    icon: Search01Icon,
    title: "Search & filtering",
    description: "Find exactly what you need",
  },
  {
    icon: AccessIcon,
    title: "Team permissions",
    description: "Control Owner and Viewer access",
  },
  {
    icon: CreditCardIcon,
    title: "Billing",
    description: "Manage Free and Pro subscriptions",
  },
];

export function Features() {
  return (
    <Card className="w-full py-12 md:px-8 bg-zinc-50 dark:bg-neutral-900 text-center">
      <CardHeader>
        <CardTitle>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold py-8"
          >
            Everything in one workspace
          </motion.h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center gap-4 p-8"
            >
              <HugeiconsIcon icon={feature.icon} />
              <p className="font-bold text-lg">{feature.title}</p>
              <p className="text-sm">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
