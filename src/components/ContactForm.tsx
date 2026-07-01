"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const initial = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useApp();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setStatus("ok");
      setMessage(data.message);
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const cf = t.contactForm;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{cf.nameLbl}</Label>
          <Input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update}
            placeholder={cf.namePlh}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{cf.emailLbl}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={update}
            placeholder={cf.emailPlh}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{cf.phoneLbl}</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={update}
            placeholder={cf.phonePlh}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">{cf.subjectLbl}</Label>
          <Input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={update}
            placeholder={cf.subjectPlh}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{cf.messageLbl}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={update}
          placeholder={cf.messagePlh}
        />
      </div>
      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? cf.sending : cf.send}
      </Button>
      {message && (
        <div
          className={
            status === "ok"
              ? "flex items-center gap-2 text-sm font-medium text-emerald-600"
              : "flex items-center gap-2 text-sm font-medium text-destructive"
          }
        >
          {status === "ok" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message}
        </div>
      )}
    </form>
  );
}
