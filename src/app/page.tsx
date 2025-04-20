'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Fachinformatiker werden - Dein Weg zum IT-Profi
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Wir begleiten dich auf deinem Weg zum Fachinformatiker. Mit unserer strukturierten Lernplattform 
            meisterst du die Programmierung und alle wichtigen IT-Konzepte - perfekt auf die IHK-Prüfung abgestimmt.
          </p>
          <Link 
            href="/auth/register" 
            className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Kostenlos starten
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image 
                  src="/icons/users.svg" 
                  alt="Users" 
                  width={32} 
                  height={32} 
                  className="mr-2"
                />
                <span className="text-3xl font-bold">1.000+</span>
              </div>
              <p>Aktive Lernende</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image 
                  src="/icons/certificate.svg" 
                  alt="Certificates" 
                  width={32} 
                  height={32} 
                  className="mr-2"
                />
                <span className="text-3xl font-bold">95%</span>
              </div>
              <p>Erfolgsquote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Pillars Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Die drei Säulen deiner IT-Ausbildung
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto">
            Basierend auf der Erfahrung erfolgreicher Fachinformatiker haben wir ein Lernkonzept entwickelt, 
            das dich optimal auf deinen Berufsalltag und die IHK-Prüfung vorbereitet:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Konkreter Lernplan */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 mx-auto">
                <Image 
                  src="/icons/learning-path.svg" 
                  alt="Lernplan" 
                  width={64} 
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Strukturiertes Lernen</h3>
              <p className="text-gray-600">
                Unser Lehrplan orientiert sich am offiziellen IHK-Rahmenlehrplan und bereitet dich Schritt für Schritt 
                auf die Prüfung vor. Klar strukturierte Module bauen aufeinander auf und vermitteln dir alle 
                notwendigen Kompetenzen für deinen Erfolg als Fachinformatiker.
              </p>
            </div>

            {/* Hoher Praxisbezug */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 mx-auto">
                <Image 
                  src="/icons/practice.svg" 
                  alt="Praxisbezug" 
                  width={64} 
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Praxisorientiert</h3>
              <p className="text-gray-600">
                Lerne anhand realer Projektbeispiele aus dem IT-Alltag. Unsere praxisnahen Übungen und 
                Projektaufgaben bereiten dich optimal auf deine zukünftigen Aufgaben als Fachinformatiker vor 
                und helfen dir, das Gelernte direkt anzuwenden.
              </p>
            </div>

            {/* Eigenes Tempo */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 mx-auto">
                <Image 
                  src="/icons/self-paced.svg" 
                  alt="Eigenes Tempo" 
                  width={64} 
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Flexibles Lernen</h3>
              <p className="text-gray-600">
                Lerne wann und wo du willst - perfekt neben der Ausbildung oder dem Beruf. Alle Kursinhalte 
                sind jederzeit verfügbar und können beliebig oft wiederholt werden. Mit unseren Lernstandskontrollen 
                behältst du deinen Fortschritt immer im Blick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Top-Kurse für Fachinformatiker</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <CourseCard 
              title="Grundlagen der Programmierung"
              image="/courses/python.jpg"
              price="Kostenlos"
            />
            <CourseCard 
              title="Webentwicklung"
              image="/courses/javascript.jpg"
              price="Kostenlos"
            />
            <CourseCard 
              title="Softwareentwicklung"
              image="/courses/csharp.jpg"
              price="Kostenlos"
            />
          </div>
          <div className="text-center">
            <Link 
              href="/courses" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Alle Kurse entdecken
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CourseCard({ title, image, price }: { title: string; image: string; price: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{price}</p>
      </div>
    </div>
  );
} 