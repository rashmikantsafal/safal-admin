import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, UserPlus, Users, CreditCard, CheckSquare, GraduationCap, BookOpen, Bell, Briefcase, LogOut, GraduationCap as SchoolIcon } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safal Educare Admin",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ફોટા મુજબનું લાઈટ ગ્રે બેકગ્રાઉન્ડ */}
        <div className="flex h-screen bg-[#f3f4f6] text-slate-800">
          
          {/* સાઇડબાર */}
          <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 flex flex-col justify-between">
            <div>
              {/* લોગો એરિયા */}
              <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <SchoolIcon size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 leading-tight">Safal Educare</h1>
                  <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
                </div>
              </div>

              {/* મેનુ */}
              <nav className="px-4 space-y-1 mt-4">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md shadow-blue-200 transition-all">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <Link href="/students" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
                  <UserPlus size={20} />
                  Student Registration
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
                  <Users size={20} />
                  Student Directory
                </Link>
                <Link href="/fees" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
                  <CreditCard size={20} />
                  Fees Management
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
                  <CheckSquare size={20} />
                  Attendance
                </Link>
                <Link href="/marks" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
                  <GraduationCap size={20} />
                  Marks & Exams
                </Link>
              </nav>
            </div>

            {/* સાઈન આઉટ બટન */}
            <div className="p-4 mb-2">
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 font-bold hover:bg-red-50 transition-all">
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </aside>

          {/* મુખ્ય કન્ટેન્ટ એરિયા */}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}