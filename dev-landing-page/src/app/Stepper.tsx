import React, { useState } from 'react';

export type StepConfig =
    | {
        id: string;
        question: string;
        type: 'yesno';
        onNext: (answer: boolean, state: Record<string, any>) => string | null;
    }
    | {
        id: string;
        question: string;
        type: 'options';
        options: string[];
        onNext: (answer: string, state: Record<string, any>) => string | null;
    };

interface StepperProps {
    steps: StepConfig[];
    onComplete: (state: Record<string, any>) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, onComplete }) => {
    const [currentStepId, setCurrentStepId] = useState(steps[0].id);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const currentStep = steps.find((step) => step.id === currentStepId);
    if (!currentStep) return null;

    const handleAnswer = (answer: any) => {
        const nextAnswers = { ...answers, [currentStep.id]: answer };
        setAnswers(nextAnswers);
        //@ts-ignore
        const nextStepId = currentStep.onNext(answer, nextAnswers);
        if (nextStepId) {
            setCurrentStepId(nextStepId);
        } else {
            onComplete(nextAnswers);
        }
    };

    return (
        <div
            style={{
                background: '#fff',
                border: '1.5px solid #e5e7eb',
                borderRadius: 12,
                boxShadow: '0 2px 8px 0 #2563eb0a',
                padding: '2rem 1.5rem',
                maxWidth: 480,
                margin: '0 auto',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {currentStep.type === 'yesno' ? (
                <YesNoQuestion question={currentStep.question} onAnswer={handleAnswer} />
            ) : currentStep.type === 'options' ? (
                <OptionsQuestion question={currentStep.question} options={currentStep.options} onAnswer={handleAnswer} />
            ) : null}
            <style>{`
                @media (max-width: 600px) {
                    div[role='group'] button {
                        width: 100% !important;
                        margin-bottom: 10px !important;
                    }
                }
            `}</style>
        </div>
    );
};

interface YesNoQuestionProps {
    question: string;
    onAnswer: (answer: boolean) => void;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ question, onAnswer }) => (
    <div style={{ margin: '1.5rem 0', width: '100%' }}>
        <h2 style={{
            color: '#2563eb',
            fontWeight: 700,
            fontSize: '1.2rem',
            marginBottom: 24,
            textAlign: 'center',
        }}>{question}</h2>
        <div role="group" style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button
                onClick={() => onAnswer(true)}
                style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.7em 2.2em',
                    fontWeight: 600,
                    fontSize: '1em',
                    cursor: 'pointer',
                    marginRight: 8,
                    boxShadow: '0 1px 4px 0 #2563eb22',
                    transition: 'background .15s',
                }}
                aria-label="Yes"
            >
                Yes
            </button>
            <button
                onClick={() => onAnswer(false)}
                style={{
                    background: '#fff',
                    color: '#2563eb',
                    border: '2px solid #2563eb',
                    borderRadius: 8,
                    padding: '0.7em 2.2em',
                    fontWeight: 600,
                    fontSize: '1em',
                    cursor: 'pointer',
                    marginLeft: 8,
                    boxShadow: '0 1px 4px 0 #2563eb11',
                    transition: 'background .15s',
                }}
                aria-label="No"
            >
                No
            </button>
        </div>
    </div>
);

interface OptionsQuestionProps {
    question: string;
    options: string[];
    onAnswer: (answer: string) => void;
}

const OptionsQuestion: React.FC<OptionsQuestionProps> = ({ question, options, onAnswer }) => (
    <div style={{ margin: '1.5rem 0', width: '100%' }}>
        <h2 style={{
            color: '#2563eb',
            fontWeight: 700,
            fontSize: '1.2rem',
            marginBottom: 24,
            textAlign: 'center',
        }}>{question}</h2>
        <div role="group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {options.map((opt) => {
                const toTitleCase = (str: string) =>
                    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
                return (
                    <button
                        key={opt}
                        onClick={() => onAnswer(opt)}
                        style={{
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '0.7em 2.2em',
                            fontWeight: 600,
                            fontSize: '1em',
                            cursor: 'pointer',
                            marginBottom: 8,
                            boxShadow: '0 1px 4px 0 #2563eb22',
                            width: '100%',
                            maxWidth: 320,
                            transition: 'background .15s',
                        }}
                        aria-label={toTitleCase(opt)}
                    >
                        {toTitleCase(opt)}
                    </button>
                );
            })}
        </div>
    </div>
);
