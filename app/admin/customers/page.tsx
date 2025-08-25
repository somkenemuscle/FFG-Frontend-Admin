'use client';

import { useEffect, useState } from "react";

type Customer = {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("https://ffg-backend-p30k.onrender.com/api/admin/customers");
        const json = await res.json();
        setCustomers(json.data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Customers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone Number</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="text-center odd:bg-gray-50 even:bg-gray-100">
                  <td className="p-3 border">{customer.fullname}</td>
                  <td className="p-3 border">{customer.email}</td>
                  <td className="p-3 border">{customer.phoneNumber}</td>
                  <td className="p-3 border capitalize">{customer.role}</td>
                  <td className="p-3 border">
                    {new Date(customer.createdAt).toISOString().split("T")[0]}
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
