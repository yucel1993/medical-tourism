"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-provider"
import Link from "next/link"

const services = [
  {
    key: "service_hair_transplant",
    slug: "hair-transplant",
    image: "/hair_1.jpg?height=400&width=600",
  },
  {
    key: "service_dental",
    slug: "dental-procedures",
    image: "/blog_mili11.png?height=400&width=600",
  },
  {
    key: "service_beauty",
    slug: "beauty-operations",
    image: "/beatyroom.jpg?height=400&width=600",
  },
  {
    key: "service_aesthetic",
    slug: "aesthetic-operations",
    image: "/recovery-astetic.jpg?height=400&width=600",
  },
  {
    key: "service_gastro",
    slug: "gastroenterology",
    image: "/surgegical_facilities.jpg?height=400&width=600",
  },
]

export function ServicesSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="services" className="min-h-screen bg-primary/5 py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("services_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground">{t("services_subtitle")}</p>

        <div className="relative mt-12">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <Card key={index} className="w-full flex-shrink-0">
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={t(service.key)}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-bold">{t(service.key)}</h3>
                        <Link href={`/services/${service.slug}`}>
                          <Button className="mt-4 w-fit">{t("learn_more")}</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 transform"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 transform"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % services.length)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

