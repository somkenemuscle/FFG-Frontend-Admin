'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import LoaderDark from '@/components/ui/LoaderDark';

interface Trainer {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  field: string;
  role: string;
  profile_picture?: string;
  createdAt: string;
}

function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // form state
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    field: '',
    role: 'trainer',
    profile_picture: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // fetch trainers
  const fetchTrainers = async () => {
    try {
      const res = await axios.get(
        'https://ffg-backend-p30k.onrender.com/api/admin/trainers'
      );
      setTrainers(res.data.data);
    } catch (err) {
      console.error('Error fetching trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // delete trainer
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(
        `https://ffg-backend-p30k.onrender.com/api/admin/delete-trainer/${id}`
      );
      await fetchTrainers();
    } catch (err) {
      console.error('Error deleting trainer:', err);
      alert('Failed to delete trainer.');
    } finally {
      setDeletingId(null);
    }
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        'https://ffg-backend-p30k.onrender.com/api/admin/add-trainer',
        formData
      );
      setFormData({
        fullname: '',
        email: '',
        phoneNumber: '',
        field: '',
        role: 'trainer',
        profile_picture: '',
      });
      await fetchTrainers();
    } catch (err) {
      console.error('Error adding trainer:', err);
      alert('Failed to add trainer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading Trainers...</p>;

  return (
    <div className="p-6 space-y-8">
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
          {trainers.map((trainer) => (
            <tr key={trainer._id} className="border-b">
              <td className="p-3 border">{trainer.fullname}</td>
              <td className="p-3 border">{trainer.email}</td>
              <td className="p-3 border">{trainer.phoneNumber}</td>
              <td className="p-3 border">{trainer.field}</td>
              <td className="p-3 border capitalize">{trainer.role}</td>
              <td className="p-3 border">
                {new Date(trainer.createdAt).toISOString().split('T')[0]}
              </td>
              <td className="p-3 border">
                <div className="flex justify-center items-center">
                  {deletingId === trainer._id ? (
                    <LoaderDark />
                  ) : (
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
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

      {/* Add Trainer Form */}
      <div className="bg-white shadow p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Trainer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Field"
            value={formData.field}
            onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Profile Picture URL"
            value={formData.profile_picture}
            onChange={(e) =>
              setFormData({ ...formData, profile_picture: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add Trainer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrainersPage;
