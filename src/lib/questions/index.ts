import { Question, Subject } from '@/types';
import { scienceQuestions } from './science';
import { socialStudiesQuestions } from './social-studies';
import { historyQuestions } from './history';
import { computerQuestions } from './computer';
import { preVocationQuestions } from './preVocation';
import { pheQuestions } from './phe';
import { crsQuestions } from './crs';
import {ccaQuestions} from './cca';
import {yorubaQuestions} from './yoruba';

export const getQuestionsBySubject = (subject: Subject): Question[] => {
  switch (subject) {
    case 'history':
      return historyQuestions;
      case 'preVocation':
      return preVocationQuestions;
    case 'computer':
      return computerQuestions;
      case 'crs':
      return crsQuestions;
      case 'phe':
      return pheQuestions;
      case 'cca':
      return ccaQuestions;
      case 'yoruba':
      return yorubaQuestions;
    case 'science':
      return scienceQuestions;
    case 'social-studies':
      return socialStudiesQuestions;
    default:
      return historyQuestions;
  }
};

export const getExamDurationBySubject = (subject: Subject): number => {
  // All subjects have 20-minute duration
  return 60; // 60 minutes in minutes
};

// // In your lib/questions.ts file
// export const getExamDurationBySubject = (subject: Subject): number => {
//   // Return 1 hour for all subjects
//   return 60; // 1 hour
// }

export const getSubjectDisplayName = (subject: Subject): string => {
  switch (subject) {
    case 'history':
      return 'History';
    case 'computer':
      return 'Computer Studies';
    case 'science':
      return 'Basic Science';
    case 'social-studies':
      return 'Social Studies';
      case 'crs':
      return 'Christian Religious Studies';
      case 'phe':
      return 'Physical and Health Education';
      case 'cca':
      return 'Cultural and Creative Arts';
      case 'yoruba':
      return 'Ede Yoruba';
      case 'preVocation':
      return 'Pre - Vocation';
    default:
      return 'Mathematics';
  }
};

export const getAllSubjects = (): Subject[] => {
  return ['history', 'computer', 'science', 'social-studies', 'crs', 'phe', 'preVocation' , 'cca', 'yoruba' ];
};