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
    description:
      "It's difficult to see what your pipeline is really worth.",
  },
];

export function PainPoints() {
  return (
    <section className="flex w-full flex-col items-center justify-center text-center gap-8 px-4 py-12 md:px-8">
      <h2 className="py-8 text-2xl font-bold md:text-4xl">
        Your client data shouldn't live in five different places.
      </h2>

      <div className="grid grid-cols-1 items-center justify-center gap-8 p-4">
        {painPoints.map((painPoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex w-full flex-col gap-2 p-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">{painPoint.number}</p>
              <p className="text-xl font-bold">{painPoint.title}</p>
            </div>

            <p className="text-sm">{painPoint.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}