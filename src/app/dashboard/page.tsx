'use client';

import React from 'react';
import Link from 'next/link';
import { FaGraduationCap, FaClock, FaLaptopCode, FaCheck } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Gemütlich von Zuhause das Programmieren lernen
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Wir helfen dir dabei, ohne Vorkenntnisse Schritt-für-Schritt in die Programmierung einzusteigen, 
              sodass du deine eigenen Projekte umsetzen kannst. Egal ob für berufliche oder private Zwecke.
            </p>
            <Link 
              href="/courses"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Jetzt Zugriff aktivieren
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Die drei fundamentalen Säulen für deinen Lernerfolg
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600">
                  <FaGraduationCap style={{ width: '32px', height: '32px' }} />
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Konkreter Lernplan</h3>
              <p className="text-gray-600">
                Unsere Kurse sind didaktisch sinnvoll strukturiert, um dir ein solides Fundament zu geben. 
                Keine Informationsflut, sondern ein klarer Weg zum Erfolg.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-600">
                  <FaLaptopCode style={{ width: '32px', height: '32px' }} />
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Hoher Praxisbezug</h3>
              <p className="text-gray-600">
                Praktische Übungen und Projekte helfen dir, das Gelernte direkt anzuwenden. 
                So gewinnst du Sicherheit und Selbstvertrauen in der Programmierung.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-purple-600">
                  <FaClock style={{ width: '32px', height: '32px' }} />
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Eigenes Tempo</h3>
              <p className="text-gray-600">
                Lerne flexibel und ortsunabhängig in deinem eigenen Rhythmus. 
                Unsere Plattform passt sich deinem Alltag an, nicht umgekehrt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Unsere beliebtesten Kurse
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course Cards will be dynamically rendered here */}
            {['Python Grundkurs', 'Web Development', 'JavaScript Masterclass'].map((course, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course}</h3>
                  <p className="text-gray-600 mb-4">
                    Starte deine Reise in die Welt der Programmierung mit unserem praxisorientierten Kurs.
                  </p>
                  <Link 
                    href={`/courses/${index + 1}`}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Mehr erfahren →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/courses"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Alle Kurse ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Jetzt Zugriff auf die Kurse aktivieren
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Du hast 2 Optionen, um den Zugriff auf die Kurse noch heute zu aktivieren
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Membership */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Premium Mitgliedschaft</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="mr-3">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Sofortiger Zugriff auf alle unsere Kurse</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Zugang zur Web-Plattform und mobilen App</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Alle zukünftigen Kurse werden automatisch freigeschaltet</span>
                </li>
              </ul>
              <Link 
                href="/register"
                className="inline-block w-full bg-white text-blue-600 text-center px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Jetzt Account aktivieren
              </Link>
            </div>

            {/* Individual Courses */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Kurse einzeln erwerben</h3>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Sofortiger Zugriff auf einzeln erworbene Kurse</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Zugang zur Web-Plattform und mobilen App</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">
                    <FaCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  <span>Flexible Auswahl der gewünschten Kurse</span>
                </li>
              </ul>
              <Link 
                href="/courses"
                className="inline-block w-full bg-gray-100 text-gray-800 text-center px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
              >
                Zur Kursübersicht
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 