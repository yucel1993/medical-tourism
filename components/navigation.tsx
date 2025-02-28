"use client"

import { useState } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"

const languages = [
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
]

export function Navigation() {
  const { setTheme, theme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="text-xl font-bold">MedHealth</div>

        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection("services")} className="hover:text-primary">
            {t("nav_services")}
          </button>
          <button onClick={() => scrollToSection("why-us")} className="hover:text-primary">
            {t("nav_why_us")}
          </button>
          <button onClick={() => scrollToSection("pricing")} className="hover:text-primary">
            {t("nav_pricing")}
          </button>
          <button onClick={() => scrollToSection("testimonials")} className="hover:text-primary">
            {t("nav_testimonials")}
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-primary">
            {t("nav_contact")}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-2"
            >
              <span>{languages.find((l) => l.code === language)?.flag}</span>
              <span>{languages.find((l) => l.code === language)?.code.toUpperCase()}</span>
            </Button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any)
                        setIsLanguageMenuOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-4 px-4 pb-4 pt-2">
            <button onClick={() => scrollToSection("services")} className="block w-full text-left hover:text-primary">
              {t("nav_services")}
            </button>
            <button onClick={() => scrollToSection("why-us")} className="block w-full text-left hover:text-primary">
              {t("nav_why_us")}
            </button>
            <button onClick={() => scrollToSection("pricing")} className="block w-full text-left hover:text-primary">
              {t("nav_pricing")}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left hover:text-primary"
            >
              {t("nav_testimonials")}
            </button>
            <button onClick={() => scrollToSection("contact")} className="block w-full text-left hover:text-primary">
              {t("nav_contact")}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

