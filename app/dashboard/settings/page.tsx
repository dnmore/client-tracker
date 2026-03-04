import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Setting',
};

export default function Page() {
  return <h1 className="text-2xl font-semibold">Settings</h1>;
}