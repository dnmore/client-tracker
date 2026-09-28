"use client";

import { motion } from "motion/react";

const painPoints = [
  {
    number: "01",
    title: "Scattered leads",
    description:
      "Potential clients get lost between email, spreadsheets, and notes.",
  },
  {
    number: "02",
    title: "Unclear pipeline",
    description:
      "You know you're busy—but not exactly which deals are moving forward.",
  },
  {
    number: "03",
    title: "No clear revenue picture",
    description: "It's difficult to see what your pipeline is really worth.",
  },
];

export function PainPoints() {
  return (
    <section className="flex w-full flex-col gap-8 px-4 py-12 md:px-8">
      <h2 className="py-8 text-2xl font-bold md:text-4xl text-center">
        Your client data shouldn't live in five different places.
      </h2>

      <div className="grid auto-rows-min gap-6 md:grid-cols-3">
        {painPoints.map((painPoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex w-full h-full flex-col gap-2 py-6 text-sm   text-card-foreground"
          >
            <div className="flex flex-col gap-1 px-6 font-bold">
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 text-base">
                <p>{painPoint.number}</p>
              </div>

              <p className="text-lg">{painPoint.title}</p>
            </div>

            <p className="px-6">{painPoint.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
