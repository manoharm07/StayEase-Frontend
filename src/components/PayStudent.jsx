import { useEffect, useState } from "react";
import FeesPayment from "./PayFees";
import PaymentsStudent from "./PaymentsStudent";

const tabs = ["Pay Fees", "Payment History"];

export default function PayStudent() {
  const [activeTab, setActiveTab] = useState("Pay Fees");


return (
    <div className="flex bg-gray-900 justify-center p-6 text-white items-center min-h-screen">
  
        <div className="w-full max-w-4xl">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-700 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center font-semibold transition duration-300
                  ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400 hover:text-white"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
  
          {/* Tab Content */}
          <div className="h-full w-full">
            {activeTab === "Pay Fees" && <FeesPayment />}
            {activeTab === "Payment History" && <PaymentsStudent />}
          </div>
        </div>
    </div>
  );  
}