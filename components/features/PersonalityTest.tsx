import React, { useState } from 'react';
import { Activity, Brain, Zap, Fingerprint, ArrowRight, CheckCircle, X, Globe } from 'lucide-react';

type Lang = 'en' | 'ru' | 'uz';

interface QuestionConfig {
  id: number;
  category: 'stimulation' | 'social' | 'processing' | 'focus';
  weight: number; 
}

// Configuration logic remains constant
const QUESTION_CONFIGS: QuestionConfig[] = [
  { id: 1, category: 'social', weight: 2 },
  { id: 2, category: 'social', weight: -2 },
  { id: 3, category: 'social', weight: 2 },
  { id: 4, category: 'stimulation', weight: 1 },
  { id: 5, category: 'stimulation', weight: -2 },
  { id: 6, category: 'processing', weight: -2 },
  { id: 7, category: 'processing', weight: 2 },
  { id: 8, category: 'focus', weight: -2 },
  { id: 9, category: 'focus', weight: 2 },
  { id: 10, category: 'social', weight: 1 },
];

const TRANSLATIONS = {
  en: {
    ui: {
      title: "Neuro-Metric Assessment",
      complete: "Psychometric Analysis Complete",
      enter: "Enter App",
      question: "Question",
      ref: "Ref: Big Five / SPS Scale",
      cognitive: "Cognitive",
      energy: "Energy",
      style: "Style",
      env: "Recommended Environment",
      options: {
        strongAgree: "Strongly Agree",
        agree: "Agree",
        neutral: "Neutral",
        disagree: "Disagree",
        strongDisagree: "Strongly Disagree"
      }
    },
    questions: [
      "I understand complex concepts better when I discuss them out loud with others.",
      "After a day of heavy social interaction at school or work, I feel physically drained.",
      "I prefer working in a group where we can bounce ideas off each other rapidly.",
      "Complete silence makes me anxious; I focus better with background music or noise.",
      "I find it nearly impossible to concentrate if there is movement or conversation nearby.",
      "I prefer to think through an answer fully before I speak up.",
      "I often start speaking to find out what I'm thinking.",
      "I enjoy deep-diving into one specific topic for hours without interruption.",
      "I prefer switching between different tasks or subjects frequently to stay interested.",
      "I am comfortable being put on the spot to answer questions in class."
    ],
    results: {
      anchor: {
        type: "The Anchor",
        title: "Deep Introvert",
        desc: "You possess a high-sensitivity nervous system that processes information deeply. You don't hate people, you hate inefficiency and over-stimulation. Your brain builds complex internal models.",
        traits: ["High Focus Depth", "Low Dopamine Threshold", "Internal Processor"],
        learningStyle: "Solitary Deep Work",
        recommendedMode: "The Sanctuary"
      },
      dynamo: {
        type: "The Dynamo",
        title: "High Extrovert",
        desc: "You feed on external stimuli. Your brain creates dopamine through interaction and action. Passive learning bores you; you need to engage, discuss, and manipulate the data to learn it.",
        traits: ["High Action Bias", "Verbal Processor", "Social Learner"],
        learningStyle: "Collaborative & Gamified",
        recommendedMode: "Interactive Quizzes"
      },
      bridge: {
        type: "The Bridge",
        title: "Ambivert",
        desc: "The chameleon. You have a rare neuroplasticity that allows you to adapt to both quiet focus and social chaos. However, you must balance your energy carefully to avoid burnout from both sides.",
        traits: ["Adaptive Focus", "Context-Dependent Energy", "Balanced Processor"],
        learningStyle: "Mixed Modalities",
        recommendedMode: "Standard Dashboard"
      }
    }
  },
  ru: {
    ui: {
      title: "Нейро-метрическая оценка",
      complete: "Психометрический анализ завершен",
      enter: "Войти в приложение",
      question: "Вопрос",
      ref: "Шкала: Большая пятерка / SPS",
      cognitive: "Когнитивность",
      energy: "Энергия",
      style: "Стиль",
      env: "Рекомендуемая среда",
      options: {
        strongAgree: "Полностью согласен",
        agree: "Согласен",
        neutral: "Нейтрально",
        disagree: "Не согласен",
        strongDisagree: "Полностью не согласен"
      }
    },
    questions: [
      "Я лучше понимаю сложные концепции, когда обсуждаю их вслух с другими.",
      "После дня активного общения в школе или на работе я чувствую себя физически истощенным.",
      "Я предпочитаю работать в группе, где мы можем быстро обмениваться идеями.",
      "Полная тишина вызывает у меня тревогу; я лучше сосредотачиваюсь под фоновую музыку или шум.",
      "Мне почти невозможно сосредоточиться, если рядом есть движение или разговор.",
      "Я предпочитаю полностью обдумать ответ, прежде чем высказаться.",
      "Я часто начинаю говорить, чтобы понять, что я думаю.",
      "Мне нравится часами углубляться в одну конкретную тему без перерывов.",
      "Я предпочитаю часто переключаться между разными задачами или предметами, чтобы сохранять интерес.",
      "Мне комфортно, когда меня неожиданно просят ответить на вопрос в классе."
    ],
    results: {
      anchor: {
        type: "Якорь",
        title: "Глубокий Интроверт",
        desc: "Вы обладаете высокочувствительной нервной системой, которая глубоко обрабатывает информацию. Вы не ненавидите людей, вы ненавидите неэффективность и чрезмерную стимуляцию.",
        traits: ["Глубина фокуса", "Внутренняя обработка", "Аналитик"],
        learningStyle: "Одиночная глубокая работа",
        recommendedMode: "Святилище (The Sanctuary)"
      },
      dynamo: {
        type: "Динамо",
        title: "Экстраверт",
        desc: "Вы питаетесь внешними стимулами. Ваш мозг вырабатывает дофамин через взаимодействие и действие. Пассивное обучение утомляет вас; вам нужно обсуждать и манипулировать данными.",
        traits: ["Тяга к действию", "Вербальное мышление", "Социальное обучение"],
        learningStyle: "Игровой и командный",
        recommendedMode: "Интерактивные квизы"
      },
      bridge: {
        type: "Мост",
        title: "Амбиверт",
        desc: "Хамелеон. Вы обладаете редкой нейропластичностью, позволяющей адаптироваться как к тихой концентрации, так и к социальному хаосу. Баланс энергии критически важен.",
        traits: ["Адаптивный фокус", "Контекстная энергия", "Баланс"],
        learningStyle: "Смешанные методы",
        recommendedMode: "Стандартная панель"
      }
    }
  },
  uz: {
    ui: {
      title: "Neyro-metrik Baholash",
      complete: "Psixometrik Tahlil Yakunlandi",
      enter: "Ilovaga kirish",
      question: "Savol",
      ref: "O'lchov: Katta Beshlik / SPS",
      cognitive: "Kognitiv",
      energy: "Energiya",
      style: "Uslub",
      env: "Tavsiya etilgan muhit",
      options: {
        strongAgree: "Mutlaqo qo'shilaman",
        agree: "Qo'shilaman",
        neutral: "Beto'xtov",
        disagree: "Qo'shilmayman",
        strongDisagree: "Mutlaqo qo'shilmayman"
      }
    },
    questions: [
      "Murakkab tushunchalarni boshqalar bilan ovoz chiqarib muhokama qilganimda yaxshiroq tushunaman.",
      "O'qish yoki ishda ko'p muloqot qilganimdan so'ng, kun oxirida o'zimni jismonan toliqqan his qilaman.",
      "Men guruhda ishlashni afzal ko'raman, u erda biz g'oyalarni tezda almashishimiz mumkin.",
      "To'liq sukunat meni xavotirga soladi; fon musiqasi yoki shovqin bilan diqqatimni yaxshiroq jamlayman.",
      "Agar yonginamda harakat yoki suhbat bo'lsa, diqqatimni jamlashim deyarli imkonsiz.",
      "Gapirishdan oldin javobni to'liq o'ylab olishni afzal ko'raman.",
      "Nima o'ylayotganimni tushunish uchun tez-tez gapirishni boshlayman.",
      "Biror mavzuni soatlab, tanaffussiz chuqur o'rganish menga yoqadi.",
      "Qiziqishni saqlab qolish uchun turli vazifalar yoki fanlar o'rtasida tez-tez almashib turishni afzal ko'raman.",
      "Sinfda kutilmaganda savolga javob berishga to'g'ri kelsa, o'zimni qulay his qilaman."
    ],
    results: {
      anchor: {
        type: "Langar",
        title: "Chuqur Introvert",
        desc: "Siz ma'lumotni chuqur qayta ishlashga moyil yuqori sezgir asab tizimiga egasiz. Siz odamlarni yomon ko'rmaysiz, shunchaki samarasizlik va ortiqcha shovqinni yoqtirmaysiz.",
        traits: ["Chuqur diqqat", "Ichki tahlil", "Mustaqil"],
        learningStyle: "Yakkaxon chuqur ishlash",
        recommendedMode: "The Sanctuary (Sukunat)"
      },
      dynamo: {
        type: "Dinamo",
        title: "Ekstravert",
        desc: "Siz tashqi stimullardan kuch olasiz. Miyangiz o'zaro ta'sir va harakat orqali dofamin ishlab chiqaradi. Passiv o'rganish sizni zeriktiradi; faol ishtirok etish kerak.",
        traits: ["Harakatga moyillik", "Og'zaki fikrlash", "Ijtimoiy o'rganish"],
        learningStyle: "Jamoaviy va O'yin",
        recommendedMode: "Interaktiv Viktorinalar"
      },
      bridge: {
        type: "Ko'prik",
        title: "Ambivert",
        desc: "Xameleon. Sizda ham tinch konsentratsiyaga, ham ijtimoiy xaosga moslashish imkonini beruvchi noyob neyroplastiklik mavjud. Energiyani to'g'ri taqsimlash muhim.",
        traits: ["Moslashuvchan diqqat", "Vaziyatli energiya", "Muvozanat"],
        learningStyle: "Aralash usullar",
        recommendedMode: "Standart Panel"
      }
    }
  }
};

const PersonalityTest: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [animating, setAnimating] = useState(false);

  const t = TRANSLATIONS[lang];

  const handleAnswer = (value: number) => {
    const config = QUESTION_CONFIGS[currentQ];
    const impact = config.weight * value; 
    
    setScore(prev => prev + impact);
    setAnimating(true);

    setTimeout(() => {
      if (currentQ < QUESTION_CONFIGS.length - 1) {
        setCurrentQ(prev => prev + 1);
        setAnimating(false);
      } else {
        setIsFinished(true);
      }
    }, 300);
  };

  const getResultKey = () => {
    if (score <= -8) return 'anchor';
    if (score >= 8) return 'dynamo';
    return 'bridge';
  };

  const LangButton = ({ target, label }: { target: Lang, label: string }) => (
    <button 
      onClick={() => setLang(target)}
      className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
        lang === target 
          ? 'bg-indigo-600 text-white border-indigo-500' 
          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
      }`}
    >
      {label}
    </button>
  );

  if (isFinished) {
    const resultKey = getResultKey();
    const result = t.results[resultKey as keyof typeof t.results];
    
    return (
      <div className="fixed inset-0 z-[60] bg-slate-900 text-white flex items-center justify-center p-4 animate-fade-in-up">
        <div className="max-w-2xl w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
           {/* Background Tech Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           
           <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
             <X size={24} />
           </button>

           <div className="relative z-10 text-center">
             <div className="w-20 h-20 bg-slate-900 rounded-full border border-indigo-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
               <Fingerprint size={40} className="text-indigo-400" />
             </div>
             
             <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.3em] mb-2">{t.ui.complete}</p>
             <h2 className="text-4xl font-black text-white mb-1">{result.type}</h2>
             <h3 className="text-xl text-slate-400 font-light mb-6">({result.title})</h3>
             
             <p className="text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto border-l-2 border-indigo-500 pl-4 text-left bg-slate-900/50 p-4 rounded-r-lg">
               {result.desc}
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                   <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                     <Brain size={14} /> {t.ui.cognitive}
                   </div>
                   <p className="text-sm text-slate-300">{result.traits[0]}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                   <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                     <Zap size={14} /> {t.ui.energy}
                   </div>
                   <p className="text-sm text-slate-300">{result.traits[1]}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                   <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                     <Activity size={14} /> {t.ui.style}
                   </div>
                   <p className="text-sm text-slate-300">{result.learningStyle}</p>
                </div>
             </div>

             <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-4 rounded-xl border border-indigo-500/30 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-indigo-300 uppercase font-bold">{t.ui.env}</span>
                  <div className="text-white font-bold">{result.recommendedMode}</div>
                </div>
                <button onClick={onClose} className="bg-white text-indigo-900 px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                  {t.ui.enter}
                </button>
             </div>
           </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQ) / QUESTION_CONFIGS.length) * 100;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4">
       <div className="max-w-xl w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-600 hover:text-slate-400 transition-colors">
             <X size={24} />
          </button>

          {/* Language Switcher */}
          <div className="absolute top-6 left-6 flex gap-2 z-10">
             <LangButton target="en" label="En" />
             <LangButton target="ru" label="Ru" />
             <LangButton target="uz" label="Uz" />
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="mb-8 mt-8">
             <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-widest mb-4">
                <Activity size={12} /> {t.ui.title}
             </div>
             <h2 className={`text-2xl md:text-3xl font-light text-white leading-tight transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
               "{t.questions[currentQ]}"
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
             {[
               { label: t.ui.options.strongAgree, val: 2, color: "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20" },
               { label: t.ui.options.agree, val: 1, color: "bg-emerald-500/5 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10" },
               { label: t.ui.options.neutral, val: 0, color: "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700" },
               { label: t.ui.options.disagree, val: -1, color: "bg-rose-500/5 border-rose-500/30 text-rose-300 hover:bg-rose-500/10" },
               { label: t.ui.options.strongDisagree, val: -2, color: "bg-rose-500/10 border-rose-500/50 text-rose-400 hover:bg-rose-500/20" },
             ].map((opt) => (
               <button
                 key={opt.val}
                 onClick={() => handleAnswer(opt.val)}
                 className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${opt.color}`}
               >
                 <span className="font-medium text-sm">{opt.label}</span>
                 <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </button>
             ))}
          </div>

          <div className="mt-8 flex justify-between items-center text-xs text-slate-500 font-mono">
             <span>{t.ui.question} {currentQ + 1} / {QUESTION_CONFIGS.length}</span>
             <span>{t.ui.ref}</span>
          </div>
       </div>
    </div>
  );
};

export default PersonalityTest;