import { Question } from '@/types';

export const scienceQuestions: Question[] = [
  // Section A: Multiple Choice Questions (60 Questions)
  {
    id: 1,
    type: 'multiple-choice',
    subject: 'science',
    question: "Which of these is a living thing?",
    options: [
      "Rock",
      "Water",
      "Plant",
      "Air"
    ],
    correctAnswer: "Plant",
    marks: 1
  },
  {
    id: 2,
    type: 'multiple-choice',
    subject: 'science',
    question: "What do plants need for photosynthesis?",
    options: [
      "Water only",
      "Sunlight only",
      "Water and sunlight",
      "Water, sunlight, and carbon dioxide"
    ],
    correctAnswer: "Water, sunlight, and carbon dioxide",
    marks: 1
  },
  {
    id: 3,
    type: 'multiple-choice',
    subject: 'science',
    question: "Which organ pumps blood throughout the body?",
    options: [
      "Lungs",
      "Heart",
      "Liver",
      "Brain"
    ],
    correctAnswer: "Heart",
    marks: 1
  },
  {
    id: 4,
    type: 'multiple-choice',
    subject: 'science',
    question: "What is the main function of roots in plants?",
    options: [
      "To make food",
      "To absorb water and minerals",
      "To attract insects",
      "To produce flowers"
    ],
    correctAnswer: "To absorb water and minerals",
    marks: 1
  },
  {
    id: 5,
    type: 'multiple-choice',
    subject: 'science',
    question: "Which of these is a source of energy?",
    options: [
      "Water",
      "Sun",
      "Soil",
      "Air"
    ],
    correctAnswer: "Sun",
    marks: 1
  },
  {
    id: 6,
    type: 'multiple-choice',
    subject: 'science',
    question: "What do we call animals that eat both plants and other animals?",
    options: [
      "Carnivores",
      "Herbivores",
      "Omnivores",
      "Insectivores"
    ],
    correctAnswer: "Omnivores",
    marks: 1
  },
  {
    id: 7,
    type: 'multiple-choice',
    subject: 'science',
    question: "Which gas do plants give out during photosynthesis?",
    options: [
      "Carbon dioxide",
      "Oxygen",
      "Nitrogen",
      "Hydrogen"
    ],
    correctAnswer: "Oxygen",
    marks: 1
  },
  {
    id: 8,
    type: 'multiple-choice',
    subject: 'science',
    question: "What is the smallest unit of life?",
    options: [
      "Organ",
      "Tissue",
      "Cell",
      "Molecule"
    ],
    correctAnswer: "Cell",
    marks: 1
  },
  {
    id: 9,
    type: 'multiple-choice',
    subject: 'science',
    question: "Which of these is a renewable energy source?",
    options: [
      "Coal",
      "Natural gas",
      "Solar power",
      "Petroleum"
    ],
    correctAnswer: "Solar power",
    marks: 1
  },
  {
    id: 10,
    type: 'multiple-choice',
    subject: 'science',
    question: "What do we call the change from liquid to gas?",
    options: [
      "Freezing",
      "Melting",
      "Evaporation",
      "Condensation"
    ],
    correctAnswer: "Evaporation",
    marks: 1
  },
  // Add 50 more Science MC questions...

  // Section B: Theory Questions (10 Questions)
  {
    id: 61,
    type: 'theory',
    subject: 'science',
    question: "Explain the process of photosynthesis and its importance to living things.",
    marks: 5
  },
  {
    id: 62,
    type: 'theory',
    subject: 'science',
    question: "Describe the water cycle with a labeled diagram.",
    marks: 5
  },
  {
    id: 63,
    type: 'theory',
    subject: 'science',
    question: "What are the differences between living and non-living things? Give three examples of each.",
    marks: 5
  },
  {
    id: 64,
    type: 'theory',
    subject: 'science',
    question: "Explain why it is important to conserve energy and suggest three ways to save energy at home.",
    marks: 5
  },
  {
    id: 65,
    type: 'theory',
    subject: 'science',
    question: "Describe the main parts of a plant and their functions.",
    marks: 5
  },
  // Add 5 more Science theory questions...
];