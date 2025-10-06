import { Question, Subject } from '@/types';
import { mathematicsQuestions } from './mathematics';
import { englishQuestions } from './english';
import { scienceQuestions } from './science';
import { socialStudiesQuestions } from './social-studies';

export const getQuestionsBySubject = (subject: Subject): Question[] => {
  switch (subject) {
    case 'mathematics':
      return mathematicsQuestions;
    case 'english':
      return englishQuestions;
    case 'science':
      return scienceQuestions;
    case 'social-studies':
      return socialStudiesQuestions;
    default:
      return mathematicsQuestions;
  }
};

export const getExamDurationBySubject = (subject: Subject): number => {
  // All subjects have 2-hour duration
  return 120; // 2 hours in minutes
};

export const getSubjectDisplayName = (subject: Subject): string => {
  switch (subject) {
    case 'mathematics':
      return 'Mathematics';
    case 'english':
      return 'English Studies';
    case 'science':
      return 'Basic Science';
    case 'social-studies':
      return 'Social Studies';
    default:
      return 'Mathematics';
  }
};

export const getAllSubjects = (): Subject[] => {
  return ['mathematics', 'english', 'science', 'social-studies'];
};