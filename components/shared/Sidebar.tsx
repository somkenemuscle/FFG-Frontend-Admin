"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

const links = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Trainers", url: "/admin/trainers" },
    { name: "Customers", url: "/admin/customers" },
    { name: "Bookings", url: "/admin/bookings" },
    { name: "Settings", url: "/admin/settings" },
];

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            {/* Mobile Toggle */}
            <div className="md:hidden p-4 bg-black text-white w-full flex justify-between items-center">
                <h1 className="font-bold text-lg">Admin Panel</h1>
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`
          bg-black text-white w-64 h-screen p-6 fixed md:static top-0 left-0
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >
                <h2 className="text-xl font-bold mb-6 hidden md:block">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    {links.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className="hover:bg-gray-800 px-3 py-2 rounded-md transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
