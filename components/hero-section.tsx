"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen bg-background pt-16">
      <div className="container flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">{t("hero_title")}</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">{t("hero_subtitle")}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="min-w-[200px]" onClick={() => scrollToSection("services")}>
            {t("view_services")}
          </Button>
          <Button size="lg" variant="outline" className="min-w-[200px]" onClick={() => scrollToSection("contact")}>
            {t("contact_us")}
          </Button>
        </div>
      </div>
    </section>
  )
}

