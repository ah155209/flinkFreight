"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

export default function NewsletterForm() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setStatus("ok");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const nl = t.newsletter;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-white">
        {nl.heading}
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={nl.placeholder}
          className="border-white/15 bg-white/10 text-white placeholder:text-slate-400"
        />
        <Button
          type="submit"
          variant="accent"
          size="sm"
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? nl.joining : nl.join}
        </Button>
      </div>
      {message && (
        <p
          className={
            status === "ok" ? "text-xs text-emerald-400" : "text-xs text-red-400"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
