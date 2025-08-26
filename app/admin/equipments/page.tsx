"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";


interface Equipment {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

function EquipmentsPage() {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const res = await axios.get("https://ffg-backend-p30k.onrender.com/api/admin/equipments");
                const data = await res.data.data;
                setEquipments(data);
            } catch (error) {
                console.error("Error fetching equipments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipments();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Equipments</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-200 overflow-hidden">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.map((equipment) => (
                            <tr
                                key={equipment._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="p-3">
                                    <img
                                        src={equipment.image}
                                        alt={equipment.name}
                                        className="h-16 w-16 object-cover rounded-md"
                                    />
                                </td>
                                <td className="p-3 font-medium">{equipment.name}</td>
                                <td className="p-3">{formatDate(equipment.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EquipmentsPage;
