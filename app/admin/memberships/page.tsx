"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import LoaderDark from "@/components/ui/LoaderDark";
import toast from "react-hot-toast";


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
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [type, setType] = useState("monthly");
  const [durationInMonths, setDurationInMonths] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  // fetch plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchPlans();
  }, []);

  // add plan
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !durationInMonths || !price) {
      toast.error("Please fill in all required fields.");
    }
    try {
      setAdding(true);
      await axios.post(
        "https://ffg-backend-p30k.onrender.com/api/admin/membership-plans",
        {
          name,
          type,
          durationInMonths,
          price,
          description,
        }
      );
      setName("");
      setType("monthly");
      setDurationInMonths(1);
      setPrice(0);
      setDescription("");
      fetchPlans();
    } catch (err) {
      console.error("Error adding membership plan:", err);
    } finally {
      setAdding(false);
    }
  };

  // delete plan
  const deletePlan = async (id: string) => {

    try {
      setDeletingId(id);
      await axios.delete(
        `https://ffg-backend-p30k.onrender.com/api/admin/delete-membership-plan/${id}`
      );
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error("Error deleting plan:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading membership plans...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Membership Plans</h1>

      {/* Add Plan Form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 p-4 border border-gray-300 rounded-md grid grid-cols-2 gap-4 max-w-xl"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2"
            placeholder="Plan name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          >
            <option value="monthly">Monthly</option>
            <option value="half-year">Half-Year</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (Months)
          </label>
          <input
            type="number"
            value={durationInMonths}
            onChange={(e) => setDurationInMonths(Number(e.target.value))}
            className="w-full border border-gray-400 rounded-md p-2"
            min={1}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-400 rounded-md p-2"
            min={0}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2"
            rows={2}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            disabled={adding}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            {adding ? <LoaderDark /> : "Add Plan"}
          </button>
        </div>
      </form>

      {/* Plans Table */}
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
              <td className="border px-4 py-2 capitalize">{plan.type}</td>
              <td className="border px-4 py-2">{plan.durationInMonths}</td>
              <td className="border px-4 py-2">₦{plan.price.toLocaleString()}</td>
              <td className="border px-4 py-2">{plan.description}</td>
              <td className="border px-4 py-2">
                {new Date(plan.createdAt).toISOString().split("T")[0]}
              </td>
              <td className="border px-4 py-2 text-center flex justify-center">
                {deletingId === plan._id ? (
                  <LoaderDark />
                ) : (
                  <button
                    onClick={() => deletePlan(plan._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
