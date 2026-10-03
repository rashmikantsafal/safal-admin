import React from 'react';
import { Activity, ShieldCheck, Users, UserPlus, CreditCard, Calendar, PlusCircle, Send } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* હેડર */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-3">
            <Activity size={14} />
            Institutional Telemetry Active
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Administrative Headquarters</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time telemetry and operational controls for Safal Educare.</p>
        </div>
        <div className="px-4 py-2 border border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campus Status</span>
          <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm mt-1">
            <ShieldCheck size={16} />
            Normal Operations
          </span>
        </div>
      </div>

      {/* CORE INSTITUTIONAL METRICS */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Core Institutional Metrics</h3>
          <span className="text-blue-600 text-xs font-bold flex items-center gap-1 cursor-pointer">
            <Activity size={12} /> Live Synchronization
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start">
              <h4 className="text-slate-500 font-bold text-sm">Total Students</h4>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Users size={20} /></div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">842</h2>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-slate-700 font-bold">+18 this month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-3.5">Across 14 Standards</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start">
              <h4 className="text-slate-500 font-bold text-sm">Active Inquiries</h4>
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full"><UserPlus size={20} /></div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">14</h2>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-slate-700 font-bold">4 follow-ups due</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-3.5">Admissions Pipeline</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start">
              <h4 className="text-slate-500 font-bold text-sm">Pending Fees</h4>
              <div className="p-2 bg-red-50 text-red-500 rounded-full"><CreditCard size={20} /></div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">₹3,45,000</h2>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-slate-700 font-bold">Term 2 balances</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-3.5">Due by Oct 15</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start">
              <h4 className="text-slate-500 font-bold text-sm">Today's Attendance</h4>
              <div className="p-2 bg-green-50 text-green-600 rounded-full"><Calendar size={20} /></div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">94.6%</h2>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-slate-700 font-bold">796 / 842 Present</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-3.5">Optimal Student Ratio</p>
          </div>
        </div>
      </div>

      {/* ADMINISTRATIVE FAST-ACTIONS */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Administrative Fast-Actions</h3>
        <p className="text-xs text-slate-400 mb-4">Execute critical school operations directly from your workstation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-4">
              <PlusCircle size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900">Add New Student</h4>
            <p className="text-xs text-slate-400 mt-1">Enroll candidate with parent WhatsApp</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-4">
              <CreditCard size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900">Collect Fee</h4>
            <p className="text-xs text-slate-400 mt-1">Record payment & print 2-copy A4 receipt</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900">Mark Attendance</h4>
            <p className="text-xs text-slate-400 mt-1">Instant roll-call with WhatsApp alerts</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-4">
              <Send size={24} />
            </div>
            <h4 className="font-extrabold text-slate-900">Broadcast Notice</h4>
            <p className="text-xs text-slate-400 mt-1">Send school announcements via WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}