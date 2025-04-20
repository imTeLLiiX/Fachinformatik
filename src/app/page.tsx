'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Fachinformatiker werden - Dein Weg zum IT-Profi
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Wir begleiten dich auf deinem Weg zum Fachinformatiker. Mit unserer strukturierten
          Lernplattform meisterst du die Programmierung und alle wichtigen IT-Konzepte - perfekt
          auf die IHK-Prüfung abgestimmt.
        </p>
        <Link
          href="/auth/register"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Kostenlos starten
        </Link>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-16">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1.000+</div>
              <div className="text-gray-400">Aktive Lernende</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-gray-400">Erfolgsquote</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Die drei Säulen deiner IT-Ausbildung
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Basierend auf der Erfahrung erfolgreicher Fachinformatiker haben wir ein Lernkonzept entwickelt, das dich optimal auf
          deinen Berufsalltag und die IHK-Prüfung vorbereitet.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/icons/structured-learning.svg"
                alt="Strukturiertes Lernen"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Strukturiertes Lernen</h3>
            <p className="text-gray-600">
              Unser Lehrplan orientiert sich am offiziellen IHK-Rahmenlehrplan und bereitet dich Schritt für Schritt auf die Prüfung vor.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/icons/practice.svg"
                alt="Praxisorientiert"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Praxisorientiert</h3>
            <p className="text-gray-600">
              Lerne anhand von Praxisbeispielen aus dem IT-Alltag. Unsere praxisnahen Übungen bereiten dich optimal vor.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/icons/flexible.svg"
                alt="Flexibles Lernen"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Flexibles Lernen</h3>
            <p className="text-gray-600">
              Lerne wann und wo du willst. Alle Kursinhalte sind jederzeit verfügbar und können beliebig oft wiederholt werden.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Unsere Top-Kurse für Fachinformatiker
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-video relative mb-4">
              <Image
                src="/courses/programming-basics.jpg"
                alt="Grundlagen der Programmierung"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Grundlagen der Programmierung</h3>
            <p className="text-gray-500 mb-4">Kostenlos</p>
            <Link
              href="/courses/programming-basics"
              className="text-blue-600 hover:text-blue-700"
            >
              Zum Kurs →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-video relative mb-4">
              <Image
                src="/courses/web-development.jpg"
                alt="Webentwicklung"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Webentwicklung</h3>
            <p className="text-gray-500 mb-4">Kostenlos</p>
            <Link
              href="/courses/web-development"
              className="text-blue-600 hover:text-blue-700"
            >
              Zum Kurs →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-video relative mb-4">
              <Image
                src="/courses/software-development.jpg"
                alt="Softwareentwicklung"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Softwareentwicklung</h3>
            <p className="text-gray-500 mb-4">Kostenlos</p>
            <Link
              href="/courses/software-development"
              className="text-blue-600 hover:text-blue-700"
            >
              Zum Kurs →
            </Link>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/courses"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Alle Kurse entdecken
          </Link>
        </div>
      </section>
    </main>
  );
} 