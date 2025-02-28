"use client"

import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "./language-provider"

export function ContactSection() {
  const { t } = useLanguage()
  const formspreeToken = process.env.NEXT_PUBLIC_FORMSPREE_TOKEN || "";
  const [state, handleSubmit] = useForm(formspreeToken);

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-primary/5 py-20">
        <div className="container">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-2xl font-bold">{t("contact_success")}</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="contact" className="min-h-screen bg-primary/5 py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("contact_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground">{t("contact_subtitle")}</p>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("form_name_label")}
            </label>
            <Input id="name" name="name" required className="w-full" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("form_email_label")}
            </label>
            <Input id="email" name="email" type="email" required className="w-full" />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-500" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("form_message_label")}
            </label>
            <Textarea id="message" name="message" required className="min-h-[150px] w-full" />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-500" />
          </div>

          <Button type="submit" className="w-full" disabled={state.submitting}>
            {t("form_submit")}
          </Button>
        </form>
      </div>
    </section>
  )
}

