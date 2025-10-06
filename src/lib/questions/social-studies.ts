import { Question } from '@/types';

export const socialStudiesQuestions: Question[] = [
  // Section A: Multiple Choice Questions (60 Questions)
  {
    id: 1,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "What is the capital of Nigeria?",
    options: [
      "Lagos",
      "Abuja",
      "Kano",
      "Port Harcourt"
    ],
    correctAnswer: "Abuja",
    marks: 1
  },
  {
    id: 2,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "Who was the first president of Nigeria?",
    options: [
      "Nnamdi Azikiwe",
      "Obafemi Awolowo",
      "Ahmadu Bello",
      "Tafawa Balewa"
    ],
    correctAnswer: "Nnamdi Azikiwe",
    marks: 1
  },
  {
    id: 3,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "Which of these is a natural resource?",
    options: [
      "Car",
      "Computer",
      "Crude oil",
      "Building"
    ],
    correctAnswer: "Crude oil",
    marks: 1
  },
  {
    id: 4,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "What is the main occupation of people in the northern part of Nigeria?",
    options: [
      "Fishing",
      "Trading",
      "Farming",
      "Mining"
    ],
    correctAnswer: "Farming",
    marks: 1
  },
  {
    id: 5,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "Which continent is Nigeria located in?",
    options: [
      "Asia",
      "Europe",
      "Africa",
      "South America"
    ],
    correctAnswer: "Africa",
    marks: 1
  },
  {
    id: 6,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "What is democracy?",
    options: [
      "Rule by the military",
      "Rule by a king",
      "Government of the people, by the people, for the people",
      "Rule by a small group of people"
    ],
    correctAnswer: "Government of the people, by the people, for the people",
    marks: 1
  },
  {
    id: 7,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "Which of these is a civic responsibility?",
    options: [
      "Owning a car",
      "Paying taxes",
      "Watching television",
      "Shopping"
    ],
    correctAnswer: "Paying taxes",
    marks: 1
  },
  {
    id: 8,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "What is the name of the Nigerian currency?",
    options: [
      "Dollar",
      "Pound",
      "Naira",
      "Euro"
    ],
    correctAnswer: "Naira",
    marks: 1
  },
  {
    id: 9,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "Which of these is a means of transportation?",
    options: [
      "Radio",
      "Bicycle",
      "Book",
      "Computer"
    ],
    correctAnswer: "Bicycle",
    marks: 1
  },
  {
    id: 10,
    type: 'multiple-choice',
    subject: 'social-studies',
    question: "What is the full meaning of NYSC?",
    options: [
      "National Youth Service Corps",
      "Nigerian Youth Service Commission",
      "National Young Students Corps",
      "Nigerian Young Service Corps"
    ],
    correctAnswer: "National Youth Service Corps",
    marks: 1
  },
  // Add 50 more Social Studies MC questions...

  // Section B: Theory Questions (10 Questions)
  {
    id: 61,
    type: 'theory',
    subject: 'social-studies',
    question: "Explain the importance of education in national development.",
    marks: 5
  },
  {
    id: 62,
    type: 'theory',
    subject: 'social-studies',
    question: "Describe three major ethnic groups in Nigeria and their locations.",
    marks: 5
  },
  {
    id: 63,
    type: 'theory',
    subject: 'social-studies',
    question: "What are the duties of a good citizen? List and explain five important duties.",
    marks: 5
  },
  {
    id: 64,
    type: 'theory',
    subject: 'social-studies',
    question: "Explain the concept of culture and give three examples of cultural practices in your community.",
    marks: 5
  },
  {
    id: 65,
    type: 'theory',
    subject: 'social-studies',
    question: "Describe the main economic activities in Nigeria and their importance to the nation.",
    marks: 5
  },
  // Add 5 more Social Studies theory questions...
];