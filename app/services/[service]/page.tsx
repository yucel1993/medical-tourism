import { notFound } from "next/navigation"
import { ServiceContent } from "./service-content"

export default function ServicePage({
  params: { service },
}: {
  params: { service: string }
}) {
  // Validate service parameter
  const validServices = [
    "hair-transplant",
    "dental-procedures",
    "beauty-operations",
    "aesthetic-operations",
    "gastroenterology",
  ]

  if (!validServices.includes(service)) {
    notFound()
  }

  return <ServiceContent service={service} />
}

