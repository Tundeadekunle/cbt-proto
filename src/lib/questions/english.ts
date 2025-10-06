import { Question } from '@/types';

export const englishQuestions: Question[] = [
  // Section A: Multiple Choice Questions (60 Questions)
  {
    id: 1,
    type: 'multiple-choice',
    subject: 'english',
    question: "Which of these is a noun?",
    options: [
      "Run",
      "Beautiful",
      "School",
      "Quickly"
    ],
    correctAnswer: "School",
    marks: 1
  },
  {
    id: 2,
    type: 'multiple-choice',
    subject: 'english',
    question: "What is the past tense of 'go'?",
    options: [
      "Goed",
      "Went",
      "Gone",
      "Going"
    ],
    correctAnswer: "Went",
    marks: 1
  },
  {
    id: 3,
    type: 'multiple-choice',
    subject: 'english',
    question: "Which word is an adjective?",
    options: [
      "Happiness",
      "Beautiful",
      "Run",
      "Quickly"
    ],
    correctAnswer: "Beautiful",
    marks: 1
  },
  {
    id: 4,
    type: 'multiple-choice',
    subject: 'english',
    question: "What is the synonym of 'happy'?",
    options: [
      "Sad",
      "Joyful",
      "Angry",
      "Tired"
    ],
    correctAnswer: "Joyful",
    marks: 1
  },
  {
    id: 5,
    type: 'multiple-choice',
    subject: 'english',
    question: "Which sentence is correct?",
    options: [
      "She don't like apples.",
      "She doesn't likes apples.",
      "She doesn't like apples.",
      "She don't likes apples."
    ],
    correctAnswer: "She doesn't like apples.",
    marks: 1
  },
  {
    id: 6,
    type: 'multiple-choice',
    subject: 'english',
    question: "What is the plural of 'child'?",
    options: [
      "Childs",
      "Children",
      "Childes",
      "Childern"
    ],
    correctAnswer: "Children",
    marks: 1
  },
  {
    id: 7,
    type: 'multiple-choice',
    subject: 'english',
    question: "Which word is a verb?",
    options: [
      "Beautiful",
      "Happiness",
      "Running",
      "Quickly"
    ],
    correctAnswer: "Running",
    marks: 1
  },
  {
    id: 8,
    type: 'multiple-choice',
    subject: 'english',
    question: "What is the antonym of 'begin'?",
    options: [
      "Start",
      "Commence",
      "Initiate",
      "End"
    ],
    correctAnswer: "End",
    marks: 1
  },
  {
    id: 9,
    type: 'multiple-choice',
    subject: 'english',
    question: "Which punctuation mark is used at the end of a question?",
    options: [
      "Period (.)",
      "Comma (,)",
      "Question mark (?)",
      "Exclamation mark (!)"
    ],
    correctAnswer: "Question mark (?)",
    marks: 1
  },
  {
    id: 10,
    type: 'multiple-choice',
    subject: 'english',
    question: "What is the correct spelling?",
    options: [
      "Recieve",
      "Receive",
      "Recieve",
      "Receeve"
    ],
    correctAnswer: "Receive",
    marks: 1
  },
  // Add 50 more English MC questions...

  // Section B: Theory Questions (10 Questions)
  {
    id: 61,
    type: 'theory',
    subject: 'english',
    question: "Write a letter to your friend describing your last birthday celebration.",
    marks: 5
  },
  {
    id: 62,
    type: 'theory',
    subject: 'english',
    question: "Write a composition on 'The Importance of Education'.",
    marks: 5
  },
  {
    id: 63,
    type: 'theory',
    subject: 'english',
    question: "Explain the difference between 'their', 'there', and 'they're' with examples.",
    marks: 5
  },
  {
    id: 64,
    type: 'theory',
    subject: 'english',
    question: "Write a short story that ends with 'And that's how I learned my lesson'.",
    marks: 5
  },
  {
    id: 65,
    type: 'theory',
    subject: 'english',
    question: "Describe your favorite teacher and explain why you admire him/her.",
    marks: 5
  },
  // Add 5 more English theory questions...
];