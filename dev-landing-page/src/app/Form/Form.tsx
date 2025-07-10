import React from 'react';
import { Stepper } from '../Stepper';
import type { StepConfig } from '../Stepper';
import { useNavigate } from 'react-router-dom';

export enum CustomerType {
    GET_A_HIGH_PAYING_JOB = 'Get a High Paying Job',
    START_A_BUSINESS = 'Start a business',
    GROW_YOUR_EXISTING_BUSINESS = 'Grow your existing business',
}

export enum ExperienceLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    EXPERT = 'Expert',
}


const steps: StepConfig[] = [
    {
        id: 'welcome',
        question: 'Welcome! What do you want to do?',
        type: 'options',
        options: [CustomerType.GET_A_HIGH_PAYING_JOB, CustomerType.START_A_BUSINESS, CustomerType.GROW_YOUR_EXISTING_BUSINESS],
        onNext: (answer) => (answer ? 'experience' : null),
    },
    {
        id: 'experience',
        question: 'How would you describe your experience level?',
        type: 'options',
        options: [ExperienceLevel.BEGINNER, ExperienceLevel.INTERMEDIATE, ExperienceLevel.EXPERT],
        onNext: (answer) => {
            if (answer === ExperienceLevel.BEGINNER) return 'beginner';
            if (answer === ExperienceLevel.INTERMEDIATE) return 'intermediate';
            if (answer === ExperienceLevel.EXPERT) return 'expert';
            return null;
        },
    },
    {
        id: 'beginner',
        question: 'Would you like a guided tour?',
        type: 'yesno',
        onNext: () => null,
    },
    {
        id: 'intermediate',
        question: 'Would you like to see advanced features?',
        type: 'yesno',
        onNext: () => null,
    },
    {
        id: 'expert',
        question: 'Would you like to skip the onboarding?',
        type: 'yesno',
        onNext: () => null,
    },
];

export const Form: React.FC = () => {
    const navigate = useNavigate();

    const handleComplete = (state: Record<string, any>) => {
        const customerType = state.welcome;
        const experienceLevel = state.experience;
        const guidedTour =
            state.beginner === true ||
            state.intermediate === true ||
            state.expert === true;
        navigate(`/targeted?customerType=${encodeURIComponent(customerType)}&experienceLevel=${encodeURIComponent(experienceLevel)}&guidedTour=${guidedTour}`);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f8fafc', // subtle slate background
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: '#fff',
                    border: '1.5px solid #2563eb',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px 0 #2563eb0a',
                    padding: '2.5rem 1.5rem',
                    maxWidth: 480,
                    width: '100%',
                    margin: '2rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Stepper steps={steps} onComplete={handleComplete} />
            </div>
            <style>{`
                @media (max-width: 600px) {
                    div[role='group'] button {
                        width: 100% !important;
                        margin-bottom: 10px !important;
                    }
                    div[style*='maxWidth: 480px'] {
                        padding: 1.2rem 0.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};
