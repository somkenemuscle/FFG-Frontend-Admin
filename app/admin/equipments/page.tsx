"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoaderDark from "@/components/ui/LoaderDark";
import { Trash2 } from "lucide-react";

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
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    // form state
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    // fetch equipments
    const fetchEquipments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://ffg-backend-p30k.onrender.com/api/admin/equipments"
            );
            const data = await res.data.data;
            setEquipments(data);
        } catch (error) {
            console.error("Error fetching equipments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipments();
    }, []);

    // add equipment
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !image) return alert("Please provide both name and image URL");
        try {
            setAdding(true);
            await axios.post(
                "https://ffg-backend-p30k.onrender.com/api/admin/add-equipment",
                { name, image }
            );
            setName("");
            setImage("");
            fetchEquipments();
        } catch (error) {
            console.error("Error adding equipment:", error);
        } finally {
            setAdding(false);
        }
    };

    // delete equipment
    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(
                `https://ffg-backend-p30k.onrender.com/api/admin/delete-equipment/${id}`
            );
            setEquipments((prev) => prev.filter((eq) => eq._id !== id));
        } catch (error) {
            console.error("Error deleting equipment:", error);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Equipments</h1>

            {/* Add equipment form */}
            <form
                onSubmit={handleAdd}
                className="mb-6 p-4 border border-gray-300 rounded-md  flex gap-4 items-end max-w-xl"
            >
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Equipment name"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Image URL"
                    />
                </div>
                <button
                    type="submit"
                    disabled={adding}
                    className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center"
                >
                    {adding ? <LoaderDark /> : "Add"}
                </button>
            </form>

            {/* Equipment table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-200 overflow-hidden">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Date Added</th>
                            <th className="p-3 text-center">Actions</th>
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
                                <td className="p-3 text-center flex justify-center">
                                    {deletingId === equipment._id ? (
                                        <LoaderDark />
                                    ) : (
                                        <button
                                            onClick={() => handleDelete(equipment._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EquipmentsPage;
