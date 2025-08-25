"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";


interface User {
    fullname: string;
    email: string;
    phoneNumber: string;
}

interface MembershipPlan {
    name: string;
    type: string;
    durationInMonths: number;
    price: number;
    description: string;
}

interface Booking {
    user: User;
    membershipPlan: MembershipPlan;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("https://ffg-backend-p30k.onrender.com/api/admin/bookings");
                const result = await res.data;

                if (result.success) {
                    // Sometimes API may return a single object or an array
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setBookings(data);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="p-4">Loading bookings...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Bookings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="p-3 border">Customer Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Phone</th>
                            <th className="p-3 border">Membership Plan</th>
                            <th className="p-3 border">Type</th>
                            <th className="p-3 border">Duration (months)</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Start Date</th>
                            <th className="p-3 border">End Date</th>
                            <th className="p-3 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking, idx) => (
                                <tr key={idx} className="text-center">
                                    <td className="p-3 border">{booking.user.fullname}</td>
                                    <td className="p-3 border">{booking.user.email}</td>
                                    <td className="p-3 border">{booking.user.phoneNumber}</td>
                                    <td className="p-3 border">{booking.membershipPlan.name}</td>
                                    <td className="p-3 border">{booking.membershipPlan.type}</td>
                                    <td className="p-3 border">{booking.membershipPlan.durationInMonths}</td>
                                    <td className="p-3 border">₦{booking.membershipPlan.price.toLocaleString()}</td>
                                    <td className="p-3 border">{formatDate(booking.startDate)}</td>
                                    <td className="p-3 border">{formatDate(booking.endDate)}</td>
                                    <td className="p-3 border">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${booking.status === "active"
                                                    ? "bg-green-500"
                                                    : booking.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="p-4 border text-center">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
