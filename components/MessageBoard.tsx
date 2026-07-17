import { event } from "@/lib/config";
import type { Message } from "@/lib/db";
import { MessageForm } from "@/components/MessageForm";

export function MessageBoard({ messages, dbError }: { messages: Message[]; dbError: boolean }) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="section-title text-center">🍁 Messages for {event.guestOfHonor}</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-pine-700">
        Leave a birthday note — it&apos;ll show up on the wall below.
      </p>

      <div className="mt-8">
        <MessageForm />
      </div>

      {dbError ? (
        <p className="mt-8 rounded-xl bg-ember-50 px-4 py-3 text-center text-ember-700">
          The message board isn&apos;t connected to a database yet. Add a Postgres store on
          Vercel (see the README) and messages will appear here.
        </p>
      ) : messages.length === 0 ? (
        <p className="mt-8 text-center text-pine-500">Be the first to leave a message.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {messages.map((m) => (
            <div key={m.id} className="card">
              <p className="whitespace-pre-line text-pine-800">{m.message}</p>
              <p className="mt-3 font-display font-semibold text-pine-900">— {m.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
