"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../Lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('Class 10');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Firebase માંથી વિદ્યાર્થીઓનું લિસ્ટ લાવવા માટેનું ફંક્શન
  const fetchStudents = async () => {
    try {
      const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const studentsList: any[] = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  // પેજ ખુલે ત્યારે લિસ્ટ લોડ કરવા માટે
  useEffect(() => {
    fetchStudents();
  }, []);

  // નવો વિદ્યાર્થી એડ કરવા માટેનું ફંક્શન
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "students"), {
        name,
        standard,
        phone,
        createdAt: serverTimestamp()
      });
      setName('');
      setPhone('');
      fetchStudents(); // ડેટા સેવ થયા પછી લિસ્ટ અપડેટ કરો
      alert("વિદ્યાર્થીની માહિતી સફળતાપૂર્વક સેવ થઈ ગઈ!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("માહિતી સેવ કરવામાં ભૂલ આવી. તમારું Firebase કનેક્શન ચેક કરો.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Students Management</h2>
      
      {/* ડેટા એન્ટ્રી ફોર્મ */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Add New Student</h3>
        <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Student Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Rahul Patel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Standard / Batch</label>
            <select 
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Foundational (Std 6-8)">Foundational (Std 6-8)</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11 Science">Class 11 Science</option>
              <option value="Class 12 Science">Class 12 Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Mobile Number</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10 digit number"
            />
          </div>
          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {loading ? 'Saving...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>

      {/* વિદ્યાર્થીઓનું લિસ્ટ (ટેબલ) */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-600">Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Standard / Batch</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-slate-500">No students found. Add one above!</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-slate-800 font-medium">{student.name}</td>
                  <td className="p-4 text-slate-600">{student.standard}</td>
                  <td className="p-4 text-slate-600">{student.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}