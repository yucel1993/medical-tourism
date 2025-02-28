"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de" | "ru" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const defaultTranslations = {
  // Hero Section
  hero_title: {
    en: "Secure and Affordable Medical Procedures",
    de: "Sichere und kostengünstige medizinische Eingriffe",
    ru: "Безопасные и доступные медицинские процедуры",
    ar: "إجراءات طبية آمنة وبأسعار معقولة",
  },
  hero_subtitle: {
    en: "Expert medical procedures at affordable prices. World-class hospitals and surgeons committed to your care.",
    de: "Medizinische Eingriffe von Experten zu erschwinglichen Preisen. Erstklassige Krankenhäuser und Chirurgen, die sich Ihrer Behandlung widmen.",
    ru: "Экспертные медицинские процедуры по доступным ценам. Больницы мирового класса и хирурги, преданные вашему здоровью.",
    ar: "إجراءات طبية متخصصة بأسعار معقولة. مستشفيات وجراحون على مستوى عالمي ملتزمون برعايتك.",
  },

  // Navigation
  nav_services: {
    en: "Services",
    de: "Dienstleistungen",
    ru: "Услуги",
    ar: "الخدمات",
  },
  nav_why_us: {
    en: "Why Us",
    de: "Warum Wir",
    ru: "Почему Мы",
    ar: "لماذا نحن",
  },
  nav_pricing: {
    en: "Pricing",
    de: "Preise",
    ru: "Цены",
    ar: "الأسعار",
  },
  nav_testimonials: {
    en: "Testimonials",
    de: "Bewertungen",
    ru: "Отзывы",
    ar: "التوصيات",
  },
  nav_contact: {
    en: "Contact",
    de: "Kontakt",
    ru: "Контакты",
    ar: "اتصل بنا",
  },

  // Services Section
  services_title: {
    en: "Our Services",
    de: "Unsere Dienstleistungen",
    ru: "Наши Услуги",
    ar: "خدماتنا",
  },
  services_subtitle: {
    en: "Discover our range of medical procedures performed by expert surgeons in state-of-the-art facilities.",
    de: "Entdecken Sie unser Angebot an medizinischen Eingriffen, die von erfahrenen Chirurgen in hochmodernen Einrichtungen durchgeführt werden.",
    ru: "Откройте для себя наш спектр медицинских процедур, выполняемых опытными хирургами в современных учреждениях.",
    ar: "اكتشف مجموعة إجراءاتنا الطبية التي يقوم بها جراحون خبراء في مرافق حديثة.",
  },
  learn_more: {
    en: "Learn More",
    de: "Mehr Erfahren",
    ru: "Узнать Больше",
    ar: "اعرف المزيد",
  },

  // Services
  service_hair_transplant: {
    en: "Hair Transplant",
    de: "Haartransplantation",
    ru: "Пересадка волос",
    ar: "زراعة الشعر",
  },
  service_dental: {
    en: "Dental Procedures",
    de: "Zahnbehandlungen",
    ru: "Стоматологические процедуры",
    ar: "إجراءات الأسنان",
  },
  service_beauty: {
    en: "Beauty Operations",
    de: "Schönheitsoperationen",
    ru: "Операции красоты",
    ar: "عمليات التجميل",
  },
  service_aesthetic: {
    en: "Aesthetic Operations",
    de: "Ästhetische Operationen",
    ru: "Эстетические операции",
    ar: "العمليات التجميلية",
  },
  service_gastro: {
    en: "Gastroenterology Surgeries",
    de: "Gastroenterologische Operationen",
    ru: "Гастроэнтерологические операции",
    ar: "جراحات الجهاز الهضمي",
  },

  // Why Us Section
  why_us_title: {
    en: "Why Choose Us",
    de: "Warum Uns Wählen",
    ru: "Почему Выбирают Нас",
    ar: "لماذا تختارنا",
  },
  why_us_subtitle: {
    en: "Experience world-class medical care at a fraction of the cost without compromising on quality.",
    de: "Erleben Sie medizinische Versorgung auf Weltklasse-Niveau zu einem Bruchteil der Kosten ohne Qualitätseinbußen.",
    ru: "Получите медицинское обслуживание мирового класса за часть стоимости без ущерба для качества.",
    ar: "احصل على رعاية طبية عالمية المستوى بتكلفة أقل دون المساس بالجودة.",
  },
  why_us_hospitals: {
    en: "Recognized Hospitals",
    de: "Anerkannte Krankenhäuser",
    ru: "Признанные больницы",
    ar: "مستشفيات معترف بها",
  },
  why_us_hospitals_desc: {
    en: "Partner with internationally accredited hospitals and clinics",
    de: "Partner von international akkreditierten Krankenhäusern und Kliniken",
    ru: "Партнерство с международно аккредитованными больницами и клиниками",
    ar: "شراكة مع مستشفيات وعيادات معتمدة دولياً",
  },
  why_us_team: {
    en: "Experienced Team",
    de: "Erfahrenes Team",
    ru: "Опытная команда",
    ar: "فريق متمرس",
  },
  why_us_team_desc: {
    en: "Our medical professionals have decades of combined experience",
    de: "Unsere medizinischen Fachkräfte verfügen über jahrzehntelange Erfahrung",
    ru: "Наши медицинские специалисты имеют десятилетия совместного опыта",
    ar: "يتمتع متخصصونا الطبيون بعقود من الخبرة المشتركة",
  },
  why_us_family: {
    en: "Family Friendly Support",
    de: "Familienfreundliche Unterstützung",
    ru: "Поддержка для всей семьи",
    ar: "دعم مناسب للعائلة",
  },
  why_us_family_desc: {
    en: "Comprehensive support for patients and their families throughout the journey",
    de: "Umfassende Unterstützung für Patienten und ihre Familien während der gesamten Reise",
    ru: "Всесторонняя поддержка пациентов и их семей на протяжении всего пути",
    ar: "دعم شامل للمرضى وعائلاتهم طوال الرحلة",
  },
  why_us_communication: {
    en: "Post-Surgery Communication",
    de: "Kommunikation nach der Operation",
    ru: "Связь после операции",
    ar: "التواصل بعد العملية",
  },
  why_us_communication_desc: {
    en: "Dedicated follow-up care and continuous communication after procedures",
    de: "Engagierte Nachsorge und kontinuierliche Kommunikation nach den Eingriffen",
    ru: "Специальный последующий уход и постоянное общение после процедур",
    ar: "رعاية متابعة مخصصة وتواصل مستمر بعد الإجراءات",
  },

  // Pricing Section
  pricing_title: {
    en: "Competitive Pricing",
    de: "Wettbewerbsfähige Preise",
    ru: "Конкурентные Цены",
    ar: "أسعار تنافسية",
  },
  pricing_subtitle: {
    en: "Compare our prices with competitors and see how much you can save",
    de: "Vergleichen Sie unsere Preise mit denen der Konkurrenz und sehen Sie, wie viel Sie sparen können",
    ru: "Сравните наши цены с конкурентами и узнайте, сколько вы можете сэкономить",
    ar: "قارن أسعارنا مع المنافسين وانظر كم يمكنك أن توفر",
  },
  pricing_currency: {
    en: "Price in EUR",
    de: "Preis in EUR",
    ru: "Цена в EUR",
    ar: "السعر باليورو",
  },

  // Contact Section
  contact_title: {
    en: "Contact Us",
    de: "Kontaktieren Sie Uns",
    ru: "Свяжитесь с Нами",
    ar: "اتصل بنا",
  },
  contact_subtitle: {
    en: "Get in touch with us to learn more about our services or schedule a consultation",
    de: "Kontaktieren Sie uns, um mehr über unsere Dienstleistungen zu erfahren oder einen Beratungstermin zu vereinbaren",
    ru: "Свяжитесь с нами, чтобы узнать больше о наших услугах или записаться на консультацию",
    ar: "تواصل معنا لمعرفة المزيد عن خدماتنا أو جدولة استشارة",
  },
  form_name: {
    en: "Your Name",
    de: "Ihr Name",
    ru: "Ваше имя",
    ar: "اسمك",
  },
  form_email: {
    en: "Your Email",
    de: "Ihre E-Mail",
    ru: "Ваш email",
    ar: "بريدك الإلكتروني",
  },
  form_message: {
    en: "Your Message",
    de: "Ihre Nachricht",
    ru: "Ваше сообщение",
    ar: "رسالتك",
  },
  form_submit: {
    en: "Send Message",
    de: "Nachricht Senden",
    ru: "Отправить сообщение",
    ar: "إرسال الرسالة",
  },
  form_sending: {
    en: "Sending...",
    de: "Wird gesendet...",
    ru: "Отправка...",
    ar: "جاري الإرسال...",
  },

  // Testimonials Section
  testimonials_title: {
    en: "Patient Testimonials",
    de: "Patientenbewertungen",
    ru: "Отзывы пациентов",
    ar: "آراء المرضى",
  },
  testimonials_subtitle: {
    en: "Read what our patients say about their experience",
    de: "Lesen Sie, was unsere Patienten über ihre Erfahrungen berichten",
    ru: "Прочитайте, что говорят наши пациенты о своем опыте",
    ar: "اقرأ ما يقوله مرضانا عن تجربتهم",
  },
  // Add testimonials for each language
  testimonial_1_name: {
    en: "John Smith",
    de: "Johannes Schmidt",
    ru: "Иван Смирнов",
    ar: "أحمد محمد",
  },
  testimonial_1_text: {
    en: "I couldn't be happier with the results. The staff was professional and caring throughout my journey.",
    de: "Ich könnte mit den Ergebnissen nicht zufriedener sein. Das Personal war während meiner gesamten Behandlung professionell und fürsorglich.",
    ru: "Я очень доволен результатами. Персонал был профессиональным и заботливым на протяжении всего моего пути.",
    ar: "لا يمكنني أن أكون أكثر سعادة بالنتائج. كان الطاقم محترفاً ومهتماً طوال رحلتي.",
  },
  testimonial_2_name: {
    en: "Maria Garcia",
    de: "Maria Weber",
    ru: "Мария Иванова",
    ar: "مريم عبدالله",
  },
  testimonial_2_text: {
    en: "Excellent service and amazing results at a fraction of the cost I would have paid in my home country.",
    de: "Ausgezeichneter Service und erstaunliche Ergebnisse zu einem Bruchteil der Kosten, die ich in meinem Heimatland gezahlt hätte.",
    ru: "Отличный сервис и потрясающие результаты за часть той стоимости, которую я бы заплатила в своей стране.",
    ar: "خدمة ممتازة ونتائج مذهلة بجزء بسيط من التكلفة التي كنت سأدفعها في بلدي.",
  },
  testimonial_3_name: {
    en: "David Wilson",
    de: "David Wagner",
    ru: "Дмитрий Волков",
    ar: "خالد العزيز",
  },
  testimonial_3_text: {
    en: "The whole experience was smooth and professional. I highly recommend their services.",
    de: "Die gesamte Erfahrung war reibungslos und professionell. Ich empfehle ihre Dienste sehr.",
    ru: "Весь процесс прошел гладко и профессионально. Я настоятельно рекомендую их услуги.",
    ar: "كانت التجربة بأكملها سلسة واحترافية. أوصي بشدة بخدماتهم.",
  },
  view_services: {
    en: "View Services",
    de: "Dienste anzeigen",
    ru: "Посмотреть услуги",
    ar: "عرض الخدمات",
  },
  contact_us: {
    en: "Contact Us",
    de: "Kontaktiere uns",
    ru: "Свяжитесь с нами",
    ar: "اتصل بنا",
  },
  contact_success: {
    en: "Thank you for reaching us. We will contact you soon!",
    de: "Vielen Dank, dass Sie uns kontaktiert haben. Wir werden uns bald bei Ihnen melden!",
    ru: "Спасибо, что связались с нами. Мы свяжемся с вами в ближайшее время!",
    ar: "شكراً لتواصلك معنا. سنتصل بك قريباً!",
  },
  form_name_label: {
    en: "Your Name",
    de: "Ihr Name",
    ru: "Ваше имя",
    ar: "اسمك",
  },
  form_email_label: {
    en: "Email Address",
    de: "E-Mail-Adresse",
    ru: "Электронная почта",
    ar: "البريد الإلكتروني",
  },
  form_message_label: {
    en: "Your Message",
    de: "Ihre Nachricht",
    ru: "Ваше сообщение",
    ar: "رسالتك",
  },
  form_submit: {
    en: "Send Message",
    de: "Nachricht senden",
    ru: "Отправить сообщение",
    ar: "إرسال الرسالة",
  },
} as const

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "preferred-language"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize with stored language or default to English
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load saved language preference on mount
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language
    if (savedLanguage && ["en", "de", "ru", "ar"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }

  const t = (key: string): string => {
    const translation = (defaultTranslations as any)[key]
    if (!translation) {
      console.warn(`Missing translation key: ${key}`)
      return key
    }
    return translation[language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

