import { Student } from '@/types';

export const students: Student[] = [
  { 
    id: 'MTH001STU', 
    name: 'Sodipe Emmanuel', 
    class: 'Basic VI', 
    email: 'sodim@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH002STU', 
    name: 'Ibrahim Salam', 
    class: 'Basic VI', 
    email: 'salam@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH003STU', 
    name: 'Alamu Olayinka', 
    class: 'Basic VI', 
    email: 'alamuy@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH004STU', 
    name: 'Malaolu Victoria', 
    class: 'Basic VI', 
    email: 'sarah.davis@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH005STU', 
    name: 'Adeniran Olaife', 
    class: 'Basic VI', 
    email: 'ife@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH006STU', 
    name: 'Adebayo Dolabomi', 
    class: 'Basic VI', 
    email: 'dollybom@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH007STU', 
    name: 'Odesina Timileyin', 
    class: 'Basic VI', 
    email: 'timmyode@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH008STU', 
    name: 'Oyeneye Juwon', 
    class: 'Basic VI', 
    email: 'juwon@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH009STU', 
    name: 'Tella Iredele', 
    class: 'Basic VI', 
    email: 'tellai@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0010STU', 
    name: 'Akinbode Farhan', 
    class: 'Basic VI', 
    email: 'frhn@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0011STU', 
    name: 'Ogunmekan Samuel', 
    class: 'Basic VI', 
    email: 'sodim@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0012STU', 
    name: 'Ekundayo Eniola', 
    class: 'Basic VI', 
    email: 'ennyek@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0013STU', 
    name: 'Ogunbesan Marvelous', 
    class: 'Basic VI', 
    email: 'marvvy@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0014STU', 
    name: 'Olumuyiwa Temitope', 
    class: 'Basic VI', 
    email: 'temmyol@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0015STU', 
    name: 'Erinoso Abigail', 
    class: 'Basic VI', 
    email: 'abg@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0016STU', 
    name: 'Farredha', 
    class: 'JSS1', 
    email: 'farredha@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  { 
    id: 'MTH0017STU', 
    name: 'Gbolahun', 
    class: 'JSS1', 
    email: 'gbolly@school.edu',
    subjects: ['mathematics', 'english', 'science', 'social-studies']
  },
  
  // Add more students...
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};

export const getStudentByName = (name: string): Student | undefined => {
  return students.find(student => 
    student.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const validateStudent = (id: string, name: string): { isValid: boolean; student?: Student } => {
  const student = getStudentById(id);
  if (student && student.name.toLowerCase() === name.toLowerCase()) {
    return { isValid: true, student };
  }
  return { isValid: false };
};