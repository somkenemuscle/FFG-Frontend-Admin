'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; // icon library

interface Trainer {
    _id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    field: string;
    role: string;
    createdAt: string;
}

function TrainersPage() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    // fetch trainers
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await axios.get("https://ffg-backend-p30k.onrender.com/api/admin/trainers");
                setTrainers(res.data.data);
            } catch (err) {
                console.error("Error fetching trainers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    // delete trainer
    const handleDelete = async (id: string) => {

        try {
            await axios.delete(`https://ffg-backend-p30k.onrender.com/api/admin/delete-trainer/${id}`);
            // remove from state
            const res = await axios.get("https://ffg-backend-p30k.onrender.com/api/admin/trainers");
            setTrainers(res.data.data);
        } catch (err) {
            console.error("Error deleting trainer:", err);
            alert("Failed to delete trainer.");
        }
    };

    if (loading) return <p className="p-4">Loading Trainers...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Trainers</h1>
            <table className="min-w-full bg-white text-black shadow overflow-hidden text-center">
                <thead>
                    <tr className="bg-black text-white text-center p-3">
                        <th className="p-3 border">Full Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Phone</th>
                        <th className="p-3 border">Field</th>
                        <th className="p-3 border">Role</th>
                        <th className="p-3 border">Date Joined</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map(trainer => (
                        <tr key={trainer._id} className="border-b">
                            <td className="p-3 border">{trainer.fullname}</td>
                            <td className="p-3 border">{trainer.email}</td>
                            <td className="p-3 border">{trainer.phoneNumber}</td>
                            <td className="p-3 border">{trainer.field}</td>
                            <td className="p-3 border capitalize">{trainer.role}</td>
                            <td className="p-3 border">{new Date(trainer.createdAt).toISOString().split("T")[0]}</td>
                            <td className="p-3 border">
                                <button
                                    onClick={() => handleDelete(trainer._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {trainers.length === 0 && (
                        <tr>
                            <td colSpan={7} className="py-4 text-center text-gray-500">
                                No trainers found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TrainersPage;
