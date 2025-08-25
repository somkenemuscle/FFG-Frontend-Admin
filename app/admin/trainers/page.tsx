"use client";

import { useEffect, useState } from "react";

interface Trainer {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  field: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile_picture: string;
}

function Page() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(
          "https://ffg-backend-p30k.onrender.com/api/admin/trainers"
        );
        const json = await res.json();
        setTrainers(json.data || []);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Trainers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm text-left text-white bg-black">
            <thead className="bg-gray-900 text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Field</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3">{trainer.fullname}</td>
                  <td className="px-4 py-3">{trainer.email}</td>
                  <td className="px-4 py-3">{trainer.phoneNumber}</td>
                  <td className="px-4 py-3">{trainer.field}</td>
                  <td className="px-4 py-3 capitalize">{trainer.role}</td>
                  <td className="px-4 py-3">
                    {new Date(trainer.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Page;
