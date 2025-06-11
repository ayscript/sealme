import React, { useState } from "react";
import confetti from "canvas-confetti";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}


interface BuyMeCoffeeProps {
  setShowPopup: (show: boolean) => void;
}

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({ setShowPopup }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState<"full" | "half">("full");
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [reference, setReference] = useState<string | null>(null);

  const calculateAmount = (): number => {
    const pricePerCup = type === "full" ? 1000 : 500;
    return pricePerCup * quantity;
  };

  const handlePayment = (): void => {
    const amountInKobo = calculateAmount() * 100;

    const handler = window.PaystackPop.setup({
      key: "pk_live_dac2734a7a59146fb3e4a67439b91238b7331786",
      email: "olaleye349@gmail.com",
      amount: amountInKobo,
      currency: "NGN",
      callback: (response: { reference: string }) => {
        setReference(response.reference);
        setShowThankYou(true);
        triggerConfetti();
      },
      onClose: () => {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="absolute bg-[#33333356] backdrop-blur-md top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <div className="p-4 bg-white text-gray-800 rounded-xl shadow-md w-full max-w-md mx-auto mt-8">
        <h2 className="text-lg font-bold mb-4">☕ Buy Me Coffee</h2>
        <p className="text-sm text-gray-400">You can support me 🙏 by buying me a coffee, I would be grateful 😊.</p>
        <br />
        <div className="mb-4">
          <label className="block mb-2">Type of Coffee:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "full" | "half")}
            className="w-full p-2 border rounded"
          >
            <option value="full">1 Cup – ₦1,000</option>
            <option value="half">Half Cup – ₦500</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-800 font-semibold">
            Total: ₦{calculateAmount().toLocaleString()}
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Pay with Paystack
        </button>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-800">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center relative overflow-hidden">
            <h3 className="text-xl font-bold mb-2">🎉 Thank You!</h3>
            <p className="mb-4">
              We appreciate your support!
              <br />
              Payment Ref:{" "}
              <span className="text-sm text-gray-800">{reference}</span>
            </p>

            <button
              onClick={() => setShowThankYou(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>

            {/* ☕ Floating Coffee Emojis */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-2xl animate-floating"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                >
                  ☕
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Coffee Animation Style */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-150%);
            opacity: 0;
          }
        }

        .animate-floating {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-3 right-3 text-white"
      >
        <svg
          fill="currentColor"
          width={24}
          height={24}
          viewBox="-3.5 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
          className="cf-icon-svg"
        >
          <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
        </svg>
      </button>
    </div>
  );
};

export default BuyMeCoffee;
