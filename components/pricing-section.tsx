"use client"

import { useLanguage } from "./language-provider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  {
    procedure: "Hair Transplant",
    MedHealth: 3000,
    "Other Firms": 5000,
  },
  {
    procedure: "Dental Implants",
    MedHealth: 2500,
    "Other Firms": 4200,
  },
  {
    procedure: "Cosmetic Surgery",
    MedHealth: 4000,
    "Other Firms": 6800,
  },
  {
    procedure: "Beauty Operations",
    MedHealth: 3500,
    "Other Firms": 5800,
  },
  {
    procedure: "Gastroenterology",
    MedHealth: 4500,
    "Other Firms": 7500,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-background p-4 shadow-lg ring-1 ring-black/5">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: €{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PricingSection() {
  const { t } = useLanguage()

  return (
    <section id="pricing" className="min-h-screen bg-primary/5 py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("pricing_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground">{t("pricing_subtitle")}</p>

        <div className="mt-12 h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="procedure" />
              <YAxis
                tickFormatter={(value) => `€${value.toLocaleString()}`}
                label={{ value: t("pricing_currency"), angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="MedHealth" name="MedHealth" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Firms" name="Other Firms" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

