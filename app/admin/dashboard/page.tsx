'use client';

import { useEffect, useState } from "react";

type Stat = {
  title: string;
  count: number;
};

export default function Page() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const endpoints = [
          { title: "Total Users", url: "https://ffg-backend-p30k.onrender.com/api/admin/customers" },
          { title: "Total Trainers", url: "https://ffg-backend-p30k.onrender.com/api/admin/trainers" },
          { title: "Total Bookings", url: "https://ffg-backend-p30k.onrender.com/api/admin/bookings" },
          { title: "Total Equipments", url: "https://ffg-backend-p30k.onrender.com/api/admin/equipments" },
        ];

        const results = await Promise.all(
          endpoints.map(async ({ title, url }) => {
            const res = await fetch(url);
            const json = await res.json();
            return { title, count: json?.data?.length ?? 0 };
          })
        );

        setStats(results);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-black text-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-medium">{stat.title}</h2>
              <p className="text-3xl font-bold mt-2">{stat.count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
