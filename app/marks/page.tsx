"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../Lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function MarksPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [marksList, setMarksList] = useState<any[]>([]);
  
  // ફોર્મ માટેના સ્ટેટ
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [examName, setExamName] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('50');
  const [loading, setLoading] = useState(false);

  // વિદ્યાર્થીઓ અને માર્ક્સનો ડેટા લાવવા માટે
  const fetchData = async () => {
    try {
      // વિદ્યાર્થીઓ લાવો
      const studentQ = query(collection(db, "students"), orderBy("name", "asc"));
      const studentSnap = await getDocs(studentQ);
      const studentsData: any[] = [];
      studentSnap.forEach((doc) => studentsData.push({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);

      // માર્ક્સ લાવો
      const marksQ = query(collection(db, "marks"), orderBy("createdAt", "desc"));
      const marksSnap = await getDocs(marksQ);
      const marksData: any[] = [];
      marksSnap.forEach((doc) => marksData.push({ id: doc.id, ...doc.data() }));
      setMarksList(marksData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // માર્ક્સ સેવ કરવા માટેનું ફંક્શન
  const handleAddMarks = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedStudent) {
      alert("કૃપા કરીને વિદ્યાર્થીનું નામ પસંદ કરો!");
      return;
    }
    
    setLoading(true);
    try {
      const studentInfo = students.find(s => s.id === selectedStudent);
      
      await addDoc(collection(db, "marks"), {
        studentId: selectedStudent,
        studentName: studentInfo.name,
        standard: studentInfo.standard,
        subject,
        examName,
        obtainedMarks: Number(obtainedMarks),
        totalMarks: Number(totalMarks),
        createdAt: serverTimestamp()
      });
      
      setExamName('');
      setObtainedMarks('');
      fetchData(); // લિસ્ટ અપડેટ કરો
      alert("માર્ક્સ સફળતાપૂર્વક સેવ થઈ ગયા!");
    } catch (error) {
      console.error("Error saving marks: ", error);
      alert("માર્ક્સ સેવ કરવામાં ભૂલ આવી.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Marks Entry</h2>
      
      {/* માર્ક્સ એન્ટ્રી ફોર્મ */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Add Student Marks</h3>
        <form onSubmit={handleAddMarks} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
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
            <label className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mathematics">Mathematics (ગણિત)</option>
              <option value="Science">Science (વિજ્ઞાન)</option>
              <option value="English">English (અંગ્રેજી)</option>
              <option value="Social Science">Social Science (સા. વિજ્ઞાન)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Exam Name (e.g. Unit Test 1)</label>
            <input 
              type="text" 
              required
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Obtained Marks</label>
            <input 
              type="number" 
              required
              value={obtainedMarks}
              onChange={(e) => setObtainedMarks(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Total Marks</label>
            <input 
              type="number" 
              required
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {loading ? 'Saving...' : 'Save Marks'}
            </button>
          </div>
        </form>
      </div>

      {/* સેવ કરેલા માર્ક્સનું ટેબલ */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-600">Student Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Exam</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Subject</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marksList.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">કોઈ માર્ક્સ એન્ટ્રી મળી નથી.</td>
              </tr>
            ) : (
              marksList.map((mark) => (
                <tr key={mark.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-slate-800 font-medium">{mark.studentName} <span className="text-xs text-slate-500">({mark.standard})</span></td>
                  <td className="p-4 text-slate-600">{mark.examName}</td>
                  <td className="p-4 text-slate-600">{mark.subject}</td>
                  <td className="p-4 text-blue-600 font-bold">{mark.obtainedMarks} / {mark.totalMarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}