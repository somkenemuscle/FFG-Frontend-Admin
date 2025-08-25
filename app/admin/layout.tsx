// import Navbar from "@/components/shared/Navbar"
import Sidebar from "@/components/shared/Sidebar"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content on the right */}
            <main className="flex-1 p-6 bg-gray-50">
                {children}
            </main>
        </div>
    )
}

export default Layout
