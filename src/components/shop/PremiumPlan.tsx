interface PremiumPlanProps {
  plan: {
    id: string;
    name: string;
    price: number;
    duration: number;
    features: string[];
    popular?: boolean;
  };
  onPurchase: (planId: string) => void;
}

export default function PremiumPlan({ plan, onPurchase }: PremiumPlanProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        plan.popular ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {plan.popular && (
        <div className="bg-blue-500 text-white text-center py-2">
          Beliebteste Wahl
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {plan.name}
        </h2>
        <div className="mb-6">
          <span className="text-4xl font-bold">€{plan.price}</span>
          <span className="text-gray-600">/{plan.duration} Tage</span>
        </div>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={() => onPurchase(plan.id)}
          className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
            plan.popular
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-800 hover:bg-gray-900'
          }`}
        >
          Jetzt kaufen
        </button>
      </div>
    </div>
  );
} 