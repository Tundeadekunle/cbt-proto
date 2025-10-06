'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { students, validateStudent, type Student } from '@/lib/students';
// import { getAllSubjects, getSubjectDisplayName, type Subject } from '@/lib/questions';
import { students, validateStudent } from '@/lib/students';
import type { Student, Subject } from '@/types'; // Fixed import
import { getAllSubjects, getSubjectDisplayName } from '@/lib/questions';


export default function LoginPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    subject: '' as Subject | ''
  });
  const [hasExistingResults, setHasExistingResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    studentId: '',
    studentName: '',
    subject: '',
    general: ''
  });
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load students and subjects
    setStudentList(students);
    setAvailableSubjects(getAllSubjects());
    
    // Check for existing results
    const storedResult = localStorage.getItem('examResult');
    setHasExistingResults(!!storedResult);

    // Check for saved student data
    const savedStudentData = localStorage.getItem('studentData');
    if (savedStudentData) {
      try {
        const data = JSON.parse(savedStudentData);
        setFormData(prev => ({
          ...prev,
          studentId: data.studentId || '',
          studentName: data.studentName || ''
        }));
      } catch (error) {
        console.error('Error parsing saved student data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.studentName.length > 1) {
      const filtered = studentList.filter(student =>
        student.name.toLowerCase().includes(formData.studentName.toLowerCase())
      );
      setFilteredStudents(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredStudents([]);
      setShowSuggestions(false);
    }
  }, [formData.studentName, studentList]);

  const validateForm = () => {
    const newErrors = {
      studentId: '',
      studentName: '',
      subject: '',
      general: ''
    };

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Full name is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Validate student exists
    if (formData.studentId.trim() && formData.studentName.trim()) {
      const validation = validateStudent(formData.studentId, formData.studentName);
      if (!validation.isValid) {
        newErrors.general = 'Student ID and name combination not found. Please check your credentials.';
      } else if (formData.subject && !validation.student?.subjects.includes(formData.subject)) {
        newErrors.general = 'You are not registered for this subject.';
      }
    }

    setErrors(newErrors);
    return !newErrors.studentId && !newErrors.studentName && !newErrors.subject && !newErrors.general;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Validate student credentials
      const validation = validateStudent(formData.studentId, formData.studentName);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, general: 'Invalid student credentials.' }));
        setIsLoading(false);
        return;
      }

      if (formData.subject && !validation.student?.subjects.includes(formData.subject)) {
        setErrors(prev => ({ ...prev, general: 'You are not registered for this subject.' }));
        setIsLoading(false);
        return;
      }

      // Clear any previous exam data but keep results
      localStorage.removeItem('studentData');
      localStorage.removeItem('examAnswers');
      localStorage.removeItem('examStartTime');
      
      // Save new student data with subject
      const studentData = {
        studentId: formData.studentId.trim(),
        studentName: formData.studentName.trim(),
        studentClass: validation.student?.class || '',
        subject: formData.subject
      };
      
      localStorage.setItem('studentData', JSON.stringify(studentData));
      
      // Simulate API call or processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/exam');
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ ...prev, general: 'An error occurred during login. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelect = (student: Student) => {
    setFormData({
      studentId: student.id,
      studentName: student.name,
      subject: formData.subject
    });
    setShowSuggestions(false);
    setErrors({ studentId: '', studentName: '', subject: '', general: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleViewResults = () => {
    router.push('/results');
  };

  const handleClearResults = () => {
    localStorage.removeItem('examResult');
    setHasExistingResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9 5m-9-5v8" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ExamPortal
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Student Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
            Select your subject and enter your credentials to start the exam
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Existing Results Notification */}
        {hasExistingResults && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                  Previous Results Available
                </h3>
                <p className="text-sm text-yellow-700 mb-3">
                  You have exam results from a previous session that you can review.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleViewResults}
                    className="bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors shadow-sm"
                  >
                    View Results
                  </button>
                  <button
                    onClick={handleClearResults}
                    className="bg-gray-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-2xl shadow-blue-100/50 rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a subject...</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {getSubjectDisplayName(subject)}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Student ID Field */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.studentId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your student ID (e.g., STU001)"
                />
              </div>
              {errors.studentId && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.studentId}
                </p>
              )}
            </div>

            {/* Student Name Field with Autocomplete */}
            <div className="relative">
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.studentName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Start typing your name..."
                  autoComplete="off"
                />
              </div>

              {/* Autocomplete Suggestions */}
              {showSuggestions && filteredStudents.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => handleStudentSelect(student)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">ID: {student.id} • {student.class}</div>
                      <div className="text-xs text-gray-500">
                        Subjects: {student.subjects.map((sub: Subject) => getSubjectDisplayName(sub)).join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {errors.studentName && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.studentName}
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 text-sm font-medium">{errors.general}</span>
                </div>
              </div>
            )}

            {/* Student Info Preview */}
            {formData.studentId && formData.studentName && formData.subject && !errors.general && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Ready for exam</p>
                    <p className="text-green-700 text-sm">
                      {formData.studentName} (ID: {formData.studentId}) - {getSubjectDisplayName(formData.subject)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Start Exam
                  </>
                )}
              </button>
            </div>

            {/* Quick Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                All exams are 2 hours duration with 70 questions (60 MC + 10 Theory)
              </p>
            </div>
          </form>
        </div>

        {/* Subjects Information */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Available Subjects
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {availableSubjects.map((subject) => (
                <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{getSubjectDisplayName(subject)}</h4>
                    <p className="text-sm text-gray-600">70 questions • 2 hours • 110 total marks</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a href="mailto:support@school.edu" className="text-blue-600 hover:text-blue-500 font-medium">
              Contact administrator
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}