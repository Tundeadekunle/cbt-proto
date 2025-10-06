'use client';
import { useEffect } from 'react';

import { Question, Answer } from '@/types';

interface QuestionCardProps {
  question: Question;
  answer: Answer | null;
  onAnswer: (answer: Answer) => void;
  disabled: boolean;
  questionNumber: number;
}

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  disabled,
  questionNumber
}: QuestionCardProps) {
  const handleAnswerChange = (value: string) => {
    if (disabled) return;
    
    onAnswer({
      questionId: question.id,
      answer: value,
      type: question.type
    });
  };

  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(65 + index); // 65 = 'A' in ASCII
  };

  // Keyboard navigation for A, B, C, D keys
  useEffect(() => {
    if (disabled || question.type !== 'multiple-choice') return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key >= 'a' && event.key <= 'd') {
        const optionIndex = event.key.charCodeAt(0) - 97; // 97 = 'a' in ASCII
        if (question.options && question.options[optionIndex]) {
          handleAnswerChange(question.options[optionIndex]);
        }
      }
      // Also handle uppercase A, B, C, D
      if (event.key >= 'A' && event.key <= 'D') {
        const optionIndex = event.key.charCodeAt(0) - 65; // 65 = 'A' in ASCII
        if (question.options && question.options[optionIndex]) {
          handleAnswerChange(question.options[optionIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [disabled, question.type, question.options]);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border-2 ${
      disabled ? 'border-red-300 bg-gray-50' : 'border-transparent'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Question {questionNumber} ({question.marks} mark{question.marks > 1 ? 's' : ''})
        </h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Theory'}
        </span>
      </div>
      
      <p className="text-gray-700 mb-6 text-lg leading-relaxed">{question.question}</p>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionLetter = getOptionLetter(index);
            const isSelected = answer?.answer === option;
            
            return (
              <div
                key={index}
                onClick={() => handleAnswerChange(option)}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-semibold text-sm
                  ${isSelected 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-700'
                  }
                  ${disabled ? 'bg-gray-100 border-gray-300' : ''}
                `}>
                  {optionLetter}
                </div>
                <span className="text-gray-700 text-lg pt-1">{option}</span>
              </div>
            );
          })}
        </div>
      )}

      {question.type === 'theory' && (
        <textarea
          value={answer?.answer || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
          disabled={disabled}
          placeholder="Type your answer here... Be as detailed as possible."
          className={`w-full h-40 p-4 border-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
            disabled ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'border-gray-300'
          }`}
        />
      )}

      {disabled && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-lg font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Time's up! This question is now disabled.
          </p>
        </div>
      )}

      {/* Selected Answer Display */}
      {answer?.answer && question.type === 'multiple-choice' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-lg">
            <strong>Selected:</strong> {answer.answer}
          </p>
        </div>
      )}
    </div>
  );
}