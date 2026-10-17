import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  kannadaQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  century: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which is the earliest officially verified stone inscription in the classical Kannada language?',
    kannadaQuestion: 'ಕನ್ನಡ ಭಾಷೆಯ ಮೊಟ್ಟಮೊದಲ ಅಧಿಕೃತ ಶಿಲಾಶಾಸನ ಯಾವುದು?',
    options: [
      'Halmidi Inscription (c. 450 CE) in Hassan',
      'Maski Minor Rock Edict of Ashoka (c. 250 BCE)',
      'Kappe Arabhatta Cliff Inscription at Badami (c. 700 CE)',
      'Belur Chennakeshava Consecration Slab (1117 CE)'
    ],
    correctIndex: 0,
    explanation: 'Discovered in 1936 by Dr. M. H. Krishna embedded in the village temple wall at Halmidi (Belur Taluk, Hassan), the 16-line sandstone stele is the earliest epigraphical evidence of Old Kannada prose syntax.',
    century: '5th Century CE'
  },
  {
    id: 2,
    question: 'What indigenous poetic meter was inscribed on the Badami cliffside in the Kappe Arabhatta record (c. 700 CE)?',
    kannadaQuestion: 'ಬಾದಾಮಿಯ ಕಪ್ಪೆ ಅರಭಟ್ಟನ ಶಿಲಾಶಾಸನದಲ್ಲಿ ಬಳಸಲಾದ ದೇಸಿ ಛಂದಸ್ಸು ಯಾವುದು?',
    options: [
      'Tripadi (ತ್ರಿಪದಿ – 3-line Moraic Stanza)',
      'Bhamini Shatpadi (ಭಾಮಿನಿ ಷಟ್ಪದಿ – 6 lines)',
      'Kanda Padya (ಕಂದ ಪದ್ಯ)',
      'Vachana Prose (ವಚನ ಗದ್ಯ)'
    ],
    correctIndex: 0,
    explanation: 'The Kappe Arabhatta inscription is the world\'s oldest recorded instance of the melodious Kannada Tripadi meter: "ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ | ಬಾಧಿಪ್ಪ ಕಲಿಯುಗ ಕಲಿಯಂ ಕಲಿಯುಗ ವಿಪರೀತನ್ ||".',
    century: '7th Century CE'
  },
  {
    id: 3,
    question: 'Which major phonological shift is celebrated across the transition from Halegannada to Hosagannada?',
    kannadaQuestion: 'ಹಳೆಗನ್ನಡದಿಂದ ಹೊಸಗನ್ನಡಕ್ಕೆ ಬದಲಾವಣೆಯಾದ ಪ್ರಮುಖ ಧ್ವನಿಮಾ ಬದಲಾವಣೆ ಯಾವುದು?',
    options: [
      'The "P" to "H" consonant shift (ಪಾಲ್ ➔ ಹಾಲು, ಪತ್ತು ➔ ಹತ್ತು)',
      'Total omission of retroflex consonants',
      'Replacement of case markers with Sanskrit vibhaktis',
      'Loss of all geminate consonant clusters (ಒತ್ತಕ್ಷರಗಳು)'
    ],
    correctIndex: 0,
    explanation: 'From the 10th century onwards, initial unvoiced labial "P" (ಪ) gradually softened into the glottal fricative "H" (ಹ), transforming words like "ಪೊಸತು" into "ಹೊಸತು" and "ಪಾಲ್" into "ಹಾಲು".',
    century: '10th – 12th Century CE'
  },
  {
    id: 4,
    question: 'Which historical dynasty of Karnataka developed the iconic "Box-Headed" (ಪೇಟಿಕಾ-ಶೀರ್ಷ) script?',
    kannadaQuestion: 'ವಿಶಿಷ್ಟ "ಪೇಟಿಕಾ-ಶೀರ್ಷ" (Box-headed) ಲಿಪಿಯನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಕರ್ನಾಟಕದ ರಾಜವಂಶ ಯಾವುದು?',
    options: [
      'Kadambas of Banavasi (ಕದಂಬರು)',
      'Hoysalas of Dwarasamudra (ಹೊಯ್ಸಳರು)',
      'Vijayanagara Rayas (ವಿಜಯನಗರ ರಾಯರು)',
      'Wodeyars of Mysuru (ಮೈಸೂರು ಒಡೆಯರು)'
    ],
    correctIndex: 0,
    explanation: 'The Kadambas of Banavasi (4th-6th C. CE) pioneered the elegant square box-headed headmark on consonant stems, directly seen on the Talagunda pillar and Halmidi stele.',
    century: '4th – 6th Century CE'
  }
];

export const EpigraphyQuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Epigraphical Knowledge Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Test Your Ancient Kannada Epigraphy IQ
          </h2>
          <p className="text-xs text-slate-600">
            Can you distinguish between Kadamba steles, Hoysala soapstone poetry, and historical sound shifts?
          </p>
        </div>

        {!isQuizCompleted && (
          <div className="flex items-center gap-2 font-mono text-xs bg-white px-3.5 py-1.5 rounded-lg border border-amber-200 shadow-xs self-start sm:self-auto">
            <span className="text-slate-500">Question:</span>
            <span className="font-bold text-amber-800">
              0{currentQuestionIndex + 1} / 0{QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!isQuizCompleted ? (
        <div className="space-y-5">
          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase bg-amber-200/70 text-amber-950 px-2 py-0.5 rounded font-semibold">
              Period Context: {currentQ.century}
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
            <p className="font-kannada text-sm text-amber-900 font-semibold">
              {currentQ.kannadaQuestion}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionClass = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
                } else if (isSelected && idx !== currentQ.correctIndex) {
                  optionClass = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  optionClass = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                }
              } else if (isSelected) {
                optionClass = 'bg-amber-100 border-amber-500 text-amber-950 font-semibold ring-1 ring-amber-500/40 shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${optionClass}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed font-serif">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold font-mono">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Correct Analysis! ಅದ್ಭುತ ಉತ್ತರ!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-700" />
                    <span>Historical Clarification</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-700">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs font-mono text-slate-500">
              Score: <strong className="text-amber-800">{score}</strong> / {QUIZ_QUESTIONS.length}
            </div>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedOption !== null
                    ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'View Final Result' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-amber-800">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Quiz Completed! ಅಭಿನಂದನೆಗಳು!
            </h3>
            <p className="text-xs text-slate-600">
              You scored <strong className="text-amber-800 font-bold">{score} out of {QUIZ_QUESTIONS.length}</strong> on Kannada Epigraphical History.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-amber-200 text-xs font-serif text-slate-700 leading-relaxed shadow-xs">
            {score === 4 && (
              <span className="text-emerald-800 font-bold">
                🏆 Epigraphia Carnatica Fellow: You possess master-level knowledge of ancient Karnataka steles and linguistic evolution!
              </span>
            )}
            {score === 3 && (
              <span className="text-amber-900 font-semibold">
                ⭐ Senior Paleographer: Impressive understanding of Halmidi, Badami, and historical sound laws!
              </span>
            )}
            {score < 3 && (
              <span className="text-slate-700">
                📖 Historical Explorer: Explore our interactive Script Evolution and Temple Atlas sections to master Karnataka's epigraphy!
              </span>
            )}
          </div>

          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Epigraphy Challenge</span>
          </button>
        </div>
      )}
    </section>
  );
};
