"use client";

import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Add image galleries for each service type
const serviceGalleries = {
  "hair-transplant": [
    {
      image: "/hairtranspalta-before-after.jpeg?height=300&width=300",
      title: {
        en: "Before/After Results",
        de: "Vorher/Nachher Ergebnisse",
        ru: "Результаты до/после",
        ar: "النتائج قبل/بعد",
      },
    },
    {
      image: "/clean surgery-room.jpeg?height=100&width=200",
      title: {
        en: "Procedure Room",
        de: "Behandlungsraum",
        ru: "Процедурный кабинет",
        ar: "غرفة العمليات",
      },
    },
    {
      image: "/fui-meterial.avif?height=600&width=800",
      title: {
        en: "Advanced FUE Equipment",
        de: "Fortschrittliche FUE-Ausrüstung",
        ru: "Современное оборудование FUE",
        ar: "معدات FUE المتقدمة",
      },
    },
  ],
  "dental-procedures": [
    {
      image: "/dentistsurgeryroom.jpeg?height=600&width=800",
      title: {
        en: "Modern Dental Facility",
        de: "Moderne Zahnklinik",
        ru: "Современная стоматологическая клиника",
        ar: "مرفق طب الأسنان الحديث",
      },
    },
    {
      image: "/dentmeterial.jpeg?height=600&width=800",
      title: {
        en: "Advanced Dental Equipment",
        de: "Moderne Zahnmedizinische Geräte",
        ru: "Передовое стоматологическое оборудование",
        ar: "معدات طب الأسنان المتقدمة",
      },
    },
    {
      image: "/blog_mili11.png?height=600&width=800",
      title: {
        en: "Example Procedures",
        de: "Beispielbehandlungen",
        ru: "Примеры процедур",
        ar: "أمثلة على الإجراءات",
      },
    },
  ],
  "beauty-operations": [
    {
      image: "/beatyroom.jpg?height=300&width=300",
      title: {
        en: "Treatment Rooms",
        de: "Behandlungsräume",
        ru: "Процедурные кабинеты",
        ar: "غرف العلاج",
      },
    },
    {
      image: "/medicineproducts.jpg?height=200&width=200",
      title: {
        en: "Advanced Beauty Equipment",
        de: "Moderne Schönheitsgeräte",
        ru: "Современное оборудование для красоты",
        ar: "معدات التجميل المتقدمة",
      },
    },
    {
      image: "/estetic-before-after.jpeg?height=600&width=800",
      title: {
        en: "Example Results",
        de: "Beispielergebnisse",
        ru: "Примеры результатов",
        ar: "أمثلة على النتائج",
      },
    },
  ],
  "aesthetic-operations": [
    {
      image: "/surgegical_facilities.jpg?height=300&width=400",
      title: {
        en: "Surgical Facilities",
        de: "Chirurgische Einrichtungen",
        ru: "Хирургические помещения",
        ar: "المرافق الجراحية",
      },
    },
    {
      image: "/Astetic.jpeg?height=600&width=800",
      title: {
        en: "Recovery Areas",
        de: "Aufwachbereiche",
        ru: "Зоны восстановления",
        ar: "مناطق التعافي",
      },
    },
    {
      image: "/astetic-result.jpg?height=600&width=800",
      title: {
        en: "Example Results",
        de: "Beispielergebnisse",
        ru: "Примеры результатов",
        ar: "أمثلة على النتائج",
      },
    },
  ],
  gastroenterology: [
    {
      image: "/endoskobi_1.jpg?height=600&width=800",
      title: {
        en: "Endoscopy Equipment",
        de: "Endoskopie-Ausrüstung",
        ru: "Эндоскопическое оборудование",
        ar: "معدات التنظير الداخلي",
      },
    },
    {
      image: "/endoskobi_2.jpg?height=600&width=800",
      title: {
        en: "Treatment Rooms",
        de: "Behandlungsräume",
        ru: "Процедурные кабинеты",
        ar: "غرف العلاج",
      },
    },
    {
      image: "/endoskobi_3.jpg?height=600&width=800",
      title: {
        en: "Diagnostic Facilities",
        de: "Diagnostische Einrichtungen",
        ru: "Диагностические помещения",
        ar: "مرافق التشخيص",
      },
    },
  ],
} as const;

const serviceDetails = {
  "hair-transplant": {
    translations: {
      en: {
        title: "Hair Transplant",
        description:
          "Restore your natural hairline with our advanced hair transplant procedures.",
        detailsTitle: "Procedure Details",
        details: ["FUE Method", "DHI Technique", "Natural Results"],
        processTitle: "Our Process",
        process: "Consultation, Extraction, Implantation, Follow-up",
        back: "Back to Services",
      },
      de: {
        title: "Haartransplantation",
        description:
          "Stellen Sie Ihre natürliche Haarlinie mit unseren fortschrittlichen Haartransplantationsverfahren wieder her.",
        detailsTitle: "Verfahrensdetails",
        details: ["FUE-Methode", "DHI-Technik", "Natürliche Ergebnisse"],
        processTitle: "Unser Prozess",
        process: "Beratung, Extraktion, Implantation, Nachsorge",
        back: "Zurück zu den Dienstleistungen",
      },
      ru: {
        title: "Пересадка волос",
        description:
          "Восстановите свою естественную линию роста волос с помощью наших передовых процедур пересадки волос.",
        detailsTitle: "Детали процедуры",
        details: ["Метод FUE", "Техника DHI", "Естественные результаты"],
        processTitle: "Наш процесс",
        process:
          "Консультация, Экстракция, Имплантация, Последующее наблюдение",
        back: "Вернуться к услугам",
      },
      ar: {
        title: "زراعة الشعر",
        description:
          "استعد خط شعرك الطبيعي من خلال إجراءات زراعة الشعر المتقدمة لدينا.",
        detailsTitle: "تفاصيل العملية",
        details: ["طريقة FUE", "تقنية DHI", "نتائج طبيعية"],
        processTitle: "عمليتنا",
        process: "استشارة ، استخراج ، زرع ، متابعة",
        back: "العودة إلى الخدمات",
      },
    },
  },
  "dental-procedures": {
    translations: {
      en: {
        title: "Dental Procedures",
        description:
          "Achieve a perfect smile with our comprehensive dental procedures.",
        detailsTitle: "Procedure Details",
        details: ["Teeth Whitening", "Implants", "Veneers"],
        processTitle: "Our Process",
        process: "Consultation, Examination, Treatment, Follow-up",
        back: "Back to Services",
      },
      de: {
        title: "Zahnärztliche Eingriffe",
        description:
          "Erzielen Sie ein perfektes Lächeln mit unseren umfassenden zahnärztlichen Eingriffen.",
        detailsTitle: "Verfahrensdetails",
        details: ["Zahnaufhellung", "Implantate", "Veneers"],
        processTitle: "Unser Prozess",
        process: "Beratung, Untersuchung, Behandlung, Nachsorge",
        back: "Zurück zu den Dienstleistungen",
      },
      ru: {
        title: "Стоматологические процедуры",
        description:
          "Достигните идеальной улыбки с помощью наших комплексных стоматологических процедур.",
        detailsTitle: "Детали процедуры",
        details: ["Отбеливание зубов", "Имплантаты", "Виниры"],
        processTitle: "Наш процесс",
        process: "Консультация, Обследование, Лечение, Последующее наблюдение",
        back: "Вернуться к услугам",
      },
      ar: {
        title: "إجراءات طب الأسنان",
        description:
          "احصل على ابتسامة مثالية من خلال إجراءات طب الأسنان الشاملة لدينا.",
        detailsTitle: "تفاصيل العملية",
        details: ["تبييض الأسنان", "زراعة الأسنان", "القشرة"],
        processTitle: "عمليتنا",
        process: "استشارة ، فحص ، علاج ، متابعة",
        back: "العودة إلى الخدمات",
      },
    },
  },
  "beauty-operations": {
    translations: {
      en: {
        title: "Beauty Operations",
        description:
          "Enhance your beauty with our safe and effective beauty operations.",
        detailsTitle: "Procedure Details",
        details: ["Lip Augmentation", "Botox", "Facelift"],
        processTitle: "Our Process",
        process: "Consultation, Planning, Operation, Recovery",
        back: "Back to Services",
      },
      de: {
        title: "Schönheitsoperationen",
        description:
          "Verbessern Sie Ihre Schönheit mit unseren sicheren und effektiven Schönheitsoperationen.",
        detailsTitle: "Verfahrensdetails",
        details: ["Lippenvergrößerung", "Botox", "Facelifting"],
        processTitle: "Unser Prozess",
        process: "Beratung, Planung, Operation, Erholung",
        back: "Zurück zu den Dienstleistungen",
      },
      ru: {
        title: "Операции красоты",
        description:
          "Подчеркните свою красоту с помощью наших безопасных и эффективных операций красоты.",
        detailsTitle: "Детали процедуры",
        details: ["Увеличение губ", "Ботокс", "Подтяжка лица"],
        processTitle: "Наш процесс",
        process: "Консультация, Планирование, Операция, Восстановление",
        back: "Вернуться к услугам",
      },
      ar: {
        title: "عمليات التجميل",
        description: "عزز جمالك من خلال عمليات التجميل الآمنة والفعالة لدينا.",
        detailsTitle: "تفاصيل العملية",
        details: ["تكبير الشفاه", "البوتوكس", "شد الوجه"],
        processTitle: "عمليتنا",
        process: "استشارة ، تخطيط ، عملية ، شفاء",
        back: "العودة إلى الخدمات",
      },
    },
  },
  "aesthetic-operations": {
    translations: {
      en: {
        title: "Aesthetic Operations",
        description:
          "Transform your appearance with our advanced aesthetic operations.",
        detailsTitle: "Procedure Details",
        details: ["Rhinoplasty", "Breast Augmentation", "Liposuction"],
        processTitle: "Our Process",
        process: "Consultation, Evaluation, Operation, Aftercare",
        back: "Back to Services",
      },
      de: {
        title: "Ästhetische Operationen",
        description:
          "Verändern Sie Ihr Aussehen mit unseren fortschrittlichen ästhetischen Operationen.",
        detailsTitle: "Verfahrensdetails",
        details: ["Nasenkorrektur", "Brustvergrößerung", "Fettabsaugung"],
        processTitle: "Unser Prozess",
        process: "Beratung, Bewertung, Operation, Nachsorge",
        back: "Zurück zu den Dienstleistungen",
      },
      ru: {
        title: "Эстетические операции",
        description:
          "Преобразите свою внешность с помощью наших передовых эстетических операций.",
        detailsTitle: "Детали процедуры",
        details: ["Ринопластика", "Увеличение груди", "Липосакция"],
        processTitle: "Наш процесс",
        process: "Консультация, Оценка, Операция, Послеоперационный уход",
        back: "Вернуться к услугам",
      },
      ar: {
        title: "العمليات التجميلية",
        description: "حوّل مظهرك من خلال عمليات التجميل المتقدمة لدينا.",
        detailsTitle: "تفاصيل العملية",
        details: ["تجميل الأنف", "تكبير الثدي", "شفط الدهون"],
        processTitle: "عمليتنا",
        process: "استشارة ، تقييم ، عملية ، رعاية ما بعد الجراحة",
        back: "العودة إلى الخدمات",
      },
    },
  },
  gastroenterology: {
    translations: {
      en: {
        title: "Gastroenterology",
        description:
          "Comprehensive care for your digestive health with our expert gastroenterology services.",
        detailsTitle: "Procedure Details",
        details: ["Colonoscopy", "Endoscopy", "Gastric Bypass"],
        processTitle: "Our Process",
        process: "Consultation, Diagnosis, Treatment, Follow-up",
        back: "Back to Services",
      },
      de: {
        title: "Gastroenterologie",
        description:
          "Umfassende Betreuung Ihrer Verdauungsgesundheit mit unseren kompetenten gastroenterologischen Leistungen.",
        detailsTitle: "Verfahrensdetails",
        details: ["Koloskopie", "Endoskopie", "Magenbypass"],
        processTitle: "Unser Prozess",
        process: "Beratung, Diagnose, Behandlung, Nachsorge",
        back: "Zurück zu den Dienstleistungen",
      },
      ru: {
        title: "Гастроэнтерология",
        description:
          "Комплексный уход за вашим пищеварительным здоровьем с помощью наших экспертных гастроэнтерологических услуг.",
        detailsTitle: "Детали процедуры",
        details: ["Колоноскопия", "Эндоскопия", "Желудочное шунтирование"],
        processTitle: "Наш процесс",
        process: "Консультация, Диагностика, Лечение, Последующее наблюдение",
        back: "Вернуться к услугам",
      },
      ar: {
        title: "أمراض الجهاز الهضمي",
        description:
          "رعاية شاملة لصحة الجهاز الهضمي الخاص بك مع خدماتنا المتخصصة في أمراض الجهاز الهضمي.",
        detailsTitle: "تفاصيل العملية",
        details: ["تنظير القولون", "تنظير المعدة", "تجاوز المعدة"],
        processTitle: "عمليتنا",
        process: "استشارة ، تشخيص ، علاج ، متابعة",
        back: "العودة إلى الخدمات",
      },
    },
  },
};

function ImageGallery({
  service,
  language,
}: {
  service: keyof typeof serviceGalleries;
  language: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const gallery = serviceGalleries[service];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-lg">
      <div className="aspect-[4/3] w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {gallery.map((item, index) => (
            <div key={index} className="relative min-w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title[language as keyof typeof item.title] || ""}
                width={400}
                height={300}
                quality={100} // Increases image quality
                priority={true} // Ensures better loading priority
                sizes="(max-width: 800px) 100vw, 800px" // Responsive sizes
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <p className="text-center text-lg font-semibold">
                  {item.title[language as keyof typeof item.title]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
        {gallery.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Update the ServiceContent component to include the ImageGallery
export function ServiceContent({ service }: { service: string }) {
  const { language } = useLanguage();

  const serviceData = serviceDetails[service as keyof typeof serviceDetails];
  if (!serviceData) {
    return null;
  }

  const content =
    serviceData.translations[language] || serviceData.translations.en;

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4 md:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {content.back}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 text-muted-foreground">{content.description}</p>
            <div className="mt-8">
              <h2 className="text-xl font-semibold">{content.detailsTitle}</h2>
              <ul className="mt-4 grid gap-3">
                {content.details.map((detail, i) => (
                  <li key={i} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ImageGallery
              service={service as keyof typeof serviceGalleries}
              language={language}
            />
            <div className="mt-8">
              <h2 className="text-xl font-semibold">{content.processTitle}</h2>
              <p className="mt-4 text-muted-foreground">{content.process}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
