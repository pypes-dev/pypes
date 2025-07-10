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
        question: 'What do you want to do?',
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
        <main
            aria-label="Personalized AI Quiz"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <section
                style={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: 20,
                    boxShadow: '0 6px 32px 0 #2563eb18',
                    padding: '2.5rem 2rem',
                    maxWidth: 420,
                    width: '100%',
                    margin: '2rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <header style={{ width: '100%', textAlign: 'center', marginBottom: '2.2rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#2563eb',
                        margin: 0,
                        letterSpacing: '-0.02em',
                    }}>
                        Personalize Your AI Journey
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#64748b',
                        margin: '1rem 0 0 0',
                        fontWeight: 500,
                        lineHeight: 1.6,
                    }}>
                        Answer a few quick questions and get a custom roadmap to help you make more money, grow your business, or find your next big opportunity.
                    </p>
                </header>
                <Stepper steps={steps} onComplete={handleComplete} />
            </section>
            <style>{`
                @media (max-width: 600px) {
                    section {
                        padding: 1.2rem 0.5rem !important;
                    }
                    div[role='group'] button {
                        width: 100% !important;
                        margin-bottom: 10px !important;
                    }
                }
            `}</style>
        </main>
    );
};
