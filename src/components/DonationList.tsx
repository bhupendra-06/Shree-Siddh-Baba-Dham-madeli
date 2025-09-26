import React from "react";

// Donation list
const donations = [
  {
    name: "Chumman Dhruw",
    address: "Madeli",
    phone: "8463051414",
    donation: "151 ₹",
  },
  {
    name: "Komal Sahu",
    address: "Bamhani",
    phone: "9981072975",
    donation: "751 ₹",
  },
  {
    name: "Semamtika, Ishita Diwan",
    address: "Khadma",
    phone: "9098361861",
    donation: "1100 ₹",
  },
  {
    name: "Bhanupratap Dhruw",
    address: "Korasi",
    phone: "9669978059",
    donation: "551 ₹",
  },
  {
    name: "Bhupendra Dhruw",
    address: "Korasi",
    phone: "9202337515",
    donation: "751 ₹",
  },
  {
    name: "Akash Vani Sahu",
    address: "Patharri, Rajim",
    phone: "7000966997",
    donation: "2001 ₹",
  },
  {
    name: "Pallavi Dhruw",
    address: "Nayapara, Madeli",
    phone: "6260878356",
    donation: "501 ₹",
  },
  {
    name: "Kanha Nishad",
    address: "Dhaneli, Raipur",
    phone: "8109671567",
    donation: "501 ₹",
  },
    {
    name: "Hitesh Patel",
    address: "Onwa",
    phone: "6265644983",
    donation: "2100 ₹",
  },
];

const DonationsList = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">दानकर्ता सूची</h2>

      {/* Scrollable table for all screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-orange-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2 min-w-32 text-left">नाम</th>
              <th className="border px-4 py-2 min-w-32 text-left">पता</th>
              <th className="border px-4 py-2 min-w-32 text-left">दान</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donor, index) => (
              <tr key={index} className="even:bg-orange-50">
                <td className="border px-4 py-2">{donor.name}</td>
                <td className="border px-4 py-2">{donor.address}</td>
                <td className="border px-4 py-2">{donor.donation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationsList;
