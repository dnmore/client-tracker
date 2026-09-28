"use client";

import { motion } from "motion/react";
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
    <section className="w-full py-12 md:px-8  bg-linear-to-t from-primary/10 to-transparent dark:from-primary/40">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold py-8 text-center "
        >
          Everything in one workspace
        </motion.h2>
      </div>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 p-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex w-full h-full flex-col gap-2 py-6 text-sm border shadow-sm rounded-xl bg-card text-card-foreground px-6"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 text-base">
                <HugeiconsIcon icon={feature.icon} />
              </div>

              <p className="font-bold text-lg">{feature.title}</p>
              <p className="text-sm">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
