"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "./language-provider"

const testimonials = [
  {
    nameKey: "testimonial_1_name",
    textKey: "testimonial_1_text",
    image: "/man_1.jpg?height=100&width=100",
    stars: 5,
  },
  {
    nameKey: "testimonial_2_name",
    textKey: "testimonial_2_text",
    image: "/woman_1.jpg?height=100&width=100",
    stars: 5,
  },
  {
    nameKey: "testimonial_3_name",
    textKey: "testimonial_3_text",
    image: "/man_2.jpg?height=100&width=100",
    stars: 5,
  },
]

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="min-h-screen bg-background py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("testimonials_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground">{t("testimonials_subtitle")}</p>

        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="w-full flex-shrink-0 bg-background/50 backdrop-blur">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={t(testimonial.nameKey)}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <h3 className="mt-4 text-xl font-bold">{t(testimonial.nameKey)}</h3>
                  <div className="mt-2 flex">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">{t(testimonial.textKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-primary" : "bg-primary/20"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

