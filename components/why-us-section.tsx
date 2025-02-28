"use client"

import { Users, Heart, MessageCircle, Hospital } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-provider"

export function WhyUsSection() {
  const { t } = useLanguage()

  return (
    <section id="why-us" className="min-h-screen bg-background py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("why_us_title")}</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground">{t("why_us_subtitle")}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <Hospital className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t("why_us_hospitals")}</h3>
              <p className="mt-2 text-muted-foreground">{t("why_us_hospitals_desc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t("why_us_team")}</h3>
              <p className="mt-2 text-muted-foreground">{t("why_us_team_desc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t("why_us_family")}</h3>
              <p className="mt-2 text-muted-foreground">{t("why_us_family_desc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t("why_us_communication")}</h3>
              <p className="mt-2 text-muted-foreground">{t("why_us_communication_desc")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

