"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function FeesPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [feesList, setFeesList] = useState<any[]>([]);
  
  // ફોર્મ માટેના સ્ટેટ
  const [selectedStudent, setSelectedStudent] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [loading, setLoading] = useState(false);

  // ડેટા લાવવા માટે
  const fetchData = async () => {
    try {
      // વિદ્યાર્થીઓ લાવો
      const studentQ = query(collection(db, "students"), orderBy("name", "asc"));
      const studentSnap = await getDocs(studentQ);
      const studentsData: any[] = [];
      studentSnap.forEach((doc) => studentsData.push({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);

      // ફી નો રેકોર્ડ લાવો
      const feesQ = query(collection(db, "fees"), orderBy("createdAt", "desc"));
      const feesSnap = await getDocs(feesQ);
      const feesData: any[] = [];
      feesSnap.forEach((doc) => feesData.push({ id: doc.id, ...doc.data() }));
      setFeesList(feesData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ફી સેવ કરવા માટેનું ફંક્શન
  const handleAddFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedStudent) {
      alert("કૃપા કરીને વિદ્યાર્થીનું નામ પસંદ કરો!");
      return;
    }
    
    setLoading(true);
    try {
      const studentInfo = students.find(s => s.id === selectedStudent);
      const currentDate = new Date().toLocaleDateString('en-IN'); // આજની તારીખ (DD/MM/YYYY)
      
      await addDoc(collection(db, "fees"), {
        studentId: selectedStudent,
        studentName: studentInfo.name,
        standard: studentInfo.standard,
        amount: Number(amount),
        paymentMode,
        date: currentDate,
        createdAt: serverTimestamp()
      });
      
      setAmount('');
      fetchData(); // લિસ્ટ અપડેટ કરો
      alert("ફી ની એન્ટ્રી સફળતાપૂર્વક થઈ ગઈ!");
    } catch (error) {
      console.error("Error saving fee: ", error);
      alert("ફી સેવ કરવામાં ભૂલ આવી.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Fees Management</h2>
      
      {/* ફી એન્ટ્રી ફોર્મ */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Collect Fees</h3>
        <form onSubmit={handleAddFee} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-600 mb-1">Select Student</label>
            <select 
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- વિદ્યાર્થી પસંદ કરો --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.standard})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Amount (₹)</label>
            <input 
              type="number" 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Payment Mode</label>
            <select 
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash (રોકડ)</option>
              <option value="UPI / Online">UPI / Online</option>
              <option value="Cheque">Cheque (ચેક)</option>
            </select>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white font-medium p-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
            >
              {loading ? 'Processing...' : 'Submit Fees'}
            </button>
          </div>
        </form>
      </div>

      {/* ફી નો રેકોર્ડ (ટેબલ) */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-600">Date</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Student Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Amount</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Mode</th>
            </tr>
          </thead>
          <tbody>
            {feesList.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">કોઈ ફી ની એન્ટ્રી મળી નથી.</td>
              </tr>
            ) : (
              feesList.map((fee) => (
                <tr key={fee.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-slate-600">{fee.date}</td>
                  <td className="p-4 text-slate-800 font-medium">{fee.studentName} <span className="text-xs text-slate-500">({fee.standard})</span></td>
                  <td className="p-4 text-green-600 font-bold">₹{fee.amount}</td>
                  <td className="p-4 text-slate-600">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${fee.paymentMode === 'Cash' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {fee.paymentMode}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}