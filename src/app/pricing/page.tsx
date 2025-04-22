import { Pricing } from '@/components/Pricing';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Wählen Sie Ihren Plan
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Investieren Sie in Ihre Zukunft mit unserem umfassenden IT-Lernprogramm
            </p>
          </div>
          <Pricing />
        </div>
      </main>
    </div>
  );
} 