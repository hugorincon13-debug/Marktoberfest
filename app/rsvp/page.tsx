import { event } from "@/lib/config";
import { RsvpForm } from "@/components/RsvpForm";

export const metadata = { title: `RSVP · ${event.title}` };

export default function RsvpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="section-title">RSVP</h1>
      <p className="mt-2 text-pine-700">
        Let us know if you can make it. The travel questions help us match up
        carpools — fill them in if you&apos;re coming.
      </p>
      <div className="mt-8">
        <RsvpForm />
      </div>
    </div>
  );
}
