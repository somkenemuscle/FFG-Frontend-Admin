"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

interface MembershipPlan {
  _id: string;
  name: string;
  type: string;
  durationInMonths: number;
  price: number;
  description: string;
  createdAt: string;
}

function Page() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          "https://ffg-backend-p30k.onrender.com/api/admin/membership-plans"
        );
        setPlans(res.data.data);
      } catch (err) {
        console.error("Error fetching membership plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Delete a plan
  const deletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this membership plan?")) return;

    try {
      await axios.delete(
        `https://ffg-backend-p30k.onrender.com/api/admin/delete-membership-plan/${id}`
      );
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  if (loading) return <p>Loading membership plans...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Membership Plans</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-black text-white">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Duration (Months)</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Date Added</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{plan.name}</td>
              <td className="border px-4 py-2">{plan.type}</td>
              <td className="border px-4 py-2">{plan.durationInMonths}</td>
              <td className="border px-4 py-2">₦{plan.price.toLocaleString()}</td>
              <td className="border px-4 py-2">{plan.description}</td>
              <td className="border px-4 py-2">
                {new Date(plan.createdAt).toISOString().split("T")[0]}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deletePlan(plan._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
