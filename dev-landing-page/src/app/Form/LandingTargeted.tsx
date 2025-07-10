import { useState } from "react";
import { ExperienceLevel, CustomerType } from "./Form";
import { useNavigate } from "react-router-dom";

const services = [
    {
        title: 'AI Generated Ads',
        description: 'Have AI find new customers',
        longDescription:
            'Harness the power of artificial intelligence to create, optimize, and manage advertising campaigns across Google, Facebook, Instagram, and more. Our AI-driven platform continuously learns from your results, targeting the right audience, writing compelling ad copy, and adjusting spend to maximize your return on investment. Perfect for businesses looking to scale customer acquisition with minimal manual effort.',
        key: 'ai_ads',
        tags: ['grow', 'start', 'market'],
    },
    {
        title: '24/7 Phone Call Assistant',
        description: 'Eliminate Phone Tag',
        longDescription:
            'Never miss a business opportunity again. Our AI-powered phone assistant answers calls around the clock, qualifies leads, books appointments, and provides customer support—all with a natural, human-like voice. Free up your staff and ensure every caller receives prompt, professional service, day or night.',
        key: 'phone_assist',
        tags: ['grow', 'start', 'market'],
    },
    {
        title: 'Appointment Scheduling',
        description: 'Book More, Stress Less',
        longDescription:
            'Streamline your operations with automated online scheduling. Clients can book appointments 24/7, receive reminders, and reschedule with ease. Our system integrates with your calendar, reduces no-shows, and helps you manage your time efficiently so you can focus on delivering quality service.',
        key: 'scheduling',
        tags: ['grow'],
    },
    {
        title: 'Interview Scheduling',
        description: 'Book More, Stress Less',
        longDescription:
            'Streamline your interview process with automated online scheduling. Interviewers can book appointments 24/7, receive reminders, and reschedule with ease. Our system integrates with your calendar, reduces no-shows, and helps you manage your time efficiently so you can focus on delivering quality service.',
        key: 'interview_scheduling',
        tags: ['grow'],
    },
    {
        title: 'AI Business Reviews',
        description: 'Google & Yelp reviews',
        longDescription:
            'Grow your reputation and attract new customers with automated review generation and management. Our AI requests reviews from your clients, monitors your online reputation, and helps you respond to feedback on Google, Yelp, and other platforms—building trust and credibility for your business.',
        key: 'reviews',
        tags: ['grow', 'start', 'market'],
    },
    {
        title: 'Advanced Websites',
        description: 'Custom sites & forms',
        longDescription:
            'Get a custom-designed, high-converting website built for your business goals. We combine professional design with AI-powered analytics, lead capture, and seamless integrations. Your site will look great on any device and drive real results, from brand awareness to sales.',
        key: 'websites',
        tags: ['grow', 'start', 'market'],
    },
    {
        title: 'Google Biz & Ads Mgmt',
        description: 'Managed GMB & campaigns',
        longDescription:
            'Let our experts and AI tools manage your Google Business Profile and ad campaigns. We optimize your listings, run targeted ads, monitor performance, and manage reviews—ensuring your business stands out and attracts more local customers.',
        key: 'google_mgmt',
        tags: ['grow', 'start', 'market'],
    },
    {
        title: 'Build a fancy resume',
        description: 'Customize your resume',
        longDescription:
            'Pick a job you want. Go to google docs, pick a resume template. Ask ChatGpt to provide bullet points to make you an attractive candidate for that job.',
        key: 'resume',
        tags: ['job'],
    },
    {
        title: 'Auto-Apply Bot',
        description: 'Automate Job Applications',
        longDescription:
            'Searching for a new job? Our Auto-Apply Bot finds relevant job openings, customizes your resume and cover letter, and submits applications on your behalf. Track your progress, get interview tips, and land your next high-paying role faster and with less effort.',
        key: 'job_bot',
        tags: ['job'],
    },
];

// Matrix mapping for customerType/experienceLevel to service keys
const matrix: Record<string, Record<string, string[]>> = {
    [CustomerType.GROW_YOUR_EXISTING_BUSINESS]: {
        [ExperienceLevel.BEGINNER]: ['ai_ads', 'phone_assist', 'scheduling', 'reviews'],
        [ExperienceLevel.INTERMEDIATE]: ['ai_ads', 'phone_assist', 'scheduling', 'reviews', 'websites'],
        [ExperienceLevel.EXPERT]: ['ai_ads', 'phone_assist', 'scheduling', 'reviews', 'websites', 'google_mgmt'],
    },
    [CustomerType.START_A_BUSINESS]: {
        [ExperienceLevel.BEGINNER]: ['websites', 'ai_ads', 'reviews'],
        [ExperienceLevel.INTERMEDIATE]: ['websites', 'ai_ads', 'reviews', 'google_mgmt'],
        [ExperienceLevel.EXPERT]: ['websites', 'ai_ads', 'reviews', 'google_mgmt', 'phone_assist'],
    },
    [CustomerType.GET_A_HIGH_PAYING_JOB]: {
        [ExperienceLevel.BEGINNER]: ['resume', 'job_bot'],
        [ExperienceLevel.INTERMEDIATE]: ['resume', 'job_bot', 'phone_assist'],
        [ExperienceLevel.EXPERT]: ['job_bot', 'phone_assist', 'interview_scheduling'],
    },
};


export const LandingTargeted = () => {
    const navigate = useNavigate();
    // Go Back to Quiz Button
    const GoBackButton = () => (
        <button
            onClick={() => navigate('/form')}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.7em 1.5em',
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 1px 6px 0 #2563eb22',
                cursor: 'pointer',
                margin: '1.2rem 0',
                transition: 'background .15s',
            }}
            aria-label="Back to Quiz"
        >
            ← Back to Quiz
        </button>
    );

    const params = new URLSearchParams(window.location.search);
    const customerType = params.get('customerType') ?? CustomerType.GET_A_HIGH_PAYING_JOB as CustomerType;
    const experienceLevel = params.get('experienceLevel') ?? ExperienceLevel.BEGINNER as ExperienceLevel;
    const guidedTour = params.get('guidedTour') === 'true';

    const serviceKeys = customerType && experienceLevel ? matrix[customerType]?.[experienceLevel] : undefined;
    const targetedServices = serviceKeys
        ? serviceKeys.map(key => services.find(svc => svc.key === key)).filter(Boolean)
        : [];

    const [currentIdx, setCurrentIdx] = useState(0);
    const [checked, setChecked] = useState<boolean[]>(Array(targetedServices.length).fill(false));
    const allChecked = checked.length > 0 && checked.every(Boolean);

    const handleCheck = () => {
        const updated = [...checked];
        updated[currentIdx] = !updated[currentIdx];
        setChecked(updated);
    };

    const handleNext = () => {
        if (currentIdx + 1 < targetedServices.length) {
            setCurrentIdx(currentIdx + 1);
        }
    };

    const [showAll, setShowAll] = useState(guidedTour);

    return (
        <>
            <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 0, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ color: '#2563eb', background: '#fff', borderRadius: 12, padding: '0.5em 1.2em', fontWeight: 800, fontSize: '2rem', marginBottom: 12, boxShadow: '0 2px 8px 0 #2563eb0a', border: '1px solid #e5e7eb' }}>🤑 AI Paper Trail</h1>
                    <div style={{ background: '#fff', borderRadius: 8, padding: '0.7em 1.2em', marginBottom: 24, boxShadow: '0 1px 4px 0 #2563eb0a', color: '#1e293b', fontWeight: 500, fontSize: '1.1em', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, border: '1px solid #e5e7eb' }}>
                        <span style={{ color: '#64748b' }}>For:</span>
                        <span style={{ color: '#2563eb', fontWeight: 700 }}>{customerType}</span>
                        <span style={{ color: '#64748b' }}>/</span>
                        <span style={{ color: '#2563eb', fontWeight: 700 }}>{experienceLevel}</span>
                    </div>
                    {targetedServices.length > 0 ? (
                        allChecked ? (
                            <div style={{ background: '#fff', border: '1.5px solid #2563eb', borderRadius: 10, color: '#2563eb', padding: '1.5em 1.2em', fontWeight: 600, textAlign: 'center', marginTop: 20, boxShadow: '0 2px 8px 0 #2563eb22' }}>
                                🎉 You’ve completed your personalized guided tour!
                            </div>
                        ) : (
                            <>
                                <div
                                    style={{
                                        width: '100%',
                                        maxWidth: 700,
                                        minHeight: 340,
                                        margin: '0 auto',
                                        background: '#fff',
                                        border: '2.5px solid #e5e7eb',
                                        borderLeft: '7px solid #2563eb',
                                        borderRadius: 18,
                                        padding: '2.2em 1.5em 4.5em 1.5em',
                                        boxShadow: '0 6px 32px 0 #2563eb18',
                                        marginBottom: 32,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                                        <input
                                            type="checkbox"
                                            checked={checked[currentIdx]}
                                            onChange={handleCheck}
                                            style={{ marginRight: 18, width: 28, height: 28, accentColor: '#2563eb', borderRadius: 6 }}
                                            aria-label={`Mark ${targetedServices[currentIdx]?.title} as complete`} />
                                        <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '1.25em', letterSpacing: 0.2 }}>{targetedServices[currentIdx]?.title}</span>
                                    </div>
                                    <span style={{ color: '#1e293b', fontSize: '1.11em', marginBottom: 32, lineHeight: 1.6 }}>{targetedServices[currentIdx]?.longDescription}</span>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'flex-end', alignItems: 'center', position: 'absolute', right: 32, bottom: 32, width: 'calc(100% - 64px)' }}>
                                        <button
                                            style={{
                                                background: '#e5e7eb',
                                                color: '#2563eb',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '0.85em 1.6em',
                                                fontWeight: 700,
                                                fontSize: '1.05em',
                                                cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                                                opacity: currentIdx === 0 ? 0.5 : 1,
                                                boxShadow: '0 1px 4px 0 #2563eb22',
                                                transition: 'background 0.2s',
                                            }}
                                            onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
                                            disabled={currentIdx === 0}
                                            aria-label={`Back to ${targetedServices[currentIdx - 1]?.title || 'first step'}`}
                                        >
                                            Back
                                        </button>
                                        <button
                                            style={{
                                                background: '#2563eb',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '0.85em 1.6em',
                                                fontWeight: 700,
                                                fontSize: '1.05em',
                                                cursor: checked[currentIdx] ? 'pointer' : 'not-allowed',
                                                boxShadow: '0 1px 4px 0 #2563eb33',
                                                transition: 'background 0.2s',
                                                opacity: checked[currentIdx] ? 1 : 0.6,
                                            }}
                                            onClick={handleNext}
                                            disabled={!checked[currentIdx]}
                                            aria-label={`Next: ${targetedServices[currentIdx + 1]?.title || 'Finish'}`}
                                        >
                                            {currentIdx + 1 < targetedServices.length ? 'Next' : 'Finish'}
                                        </button>
                                    </div>
                                    <div style={{ marginTop: 12, color: '#64748b', fontSize: '1.02em', textAlign: 'left', fontWeight: 500 }}>
                                        Step {currentIdx + 1} of {targetedServices.length}
                                    </div>
                                    <style>{`
                                        @media (max-width: 700px) {
                                            div[style*='max-width: 700px'] {
                                                padding: 1.2em 0.5em 3em 0.5em !important;
                                            }
                                        }
                                        @media (max-width: 500px) {
                                            div[style*='max-width: 700px'] {
                                                min-height: 220px !important;
                                                padding: 0.7em 0.1em 2.5em 0.1em !important;
                                            }
                                            .tour-cta-row {
                                                flex-direction: column !important;
                                                gap: 10px !important;
                                                align-items: stretch !important;
                                                right: 8px !important;
                                                bottom: 8px !important;
                                                width: calc(100% - 16px) !important;
                                            }
                                        }
                                    `}</style>
                                </div>
                                <button
                                    style={{
                                        marginBottom: showAll ? 10 : 28,
                                        background: showAll ? '#e5e7eb' : '#2563eb',
                                        color: showAll ? '#2563eb' : '#fff',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '0.85em 1.6em',
                                        fontWeight: 700,
                                        fontSize: '1.05em',
                                        cursor: 'pointer',
                                        boxShadow: '0 1px 4px 0 #2563eb22',
                                        transition: 'background 0.2s',
                                        width: '100%',
                                        maxWidth: 360,
                                        alignSelf: 'center',
                                        marginTop: -18
                                    }}
                                    onClick={() => setShowAll((v) => !v)}
                                    aria-expanded={showAll}
                                >
                                    {showAll ? 'Hide List' : 'See All'}
                                </button>
                                {showAll && (
                                    <div
                                        style={{
                                            width: '100%',
                                            maxWidth: 700,
                                            margin: '0 auto',
                                            background: '#f8fafc',
                                            borderRadius: 14,
                                            boxShadow: '0 2px 12px 0 #2563eb10',
                                            padding: '1.3em 1em 1.1em 1em',
                                            marginBottom: 18,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 18,
                                            border: '1.5px solid #e5e7eb',
                                        }}
                                    >
                                        {targetedServices.map((svc, idx) => (
                                            <label
                                                key={svc?.key}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 14,
                                                    background: idx === currentIdx ? '#dbeafe' : '#fff',
                                                    borderRadius: 8,
                                                    padding: '1.1em 1em',
                                                    border: idx === currentIdx ? '2px solid #2563eb' : '1.5px solid #e5e7eb',
                                                    boxShadow: idx === currentIdx ? '0 2px 8px 0 #2563eb22' : '0 1px 4px 0 #2563eb0a',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    fontSize: '1.03em',
                                                    transition: 'background 0.2s, border 0.2s',
                                                }}
                                                onClick={(e) => { e.preventDefault(); setCurrentIdx(idx) }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked[idx]}
                                                    onChange={() => {
                                                        const updated = [...checked];
                                                        updated[idx] = !updated[idx];
                                                        setChecked(updated);
                                                    }}
                                                    style={{ marginRight: 10, width: 22, height: 22, accentColor: '#2563eb', borderRadius: 4, marginTop: 2 }}
                                                    aria-label={`Mark ${svc?.title} as complete`}
                                                    onClick={ev => ev.stopPropagation()}
                                                />
                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.06em', marginBottom: 2 }}>{svc?.title}</span>
                                                    <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.98em', marginTop: 2 }}>{svc?.description}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </>
                        )
                    ) : (
                        <div style={{ background: '#fff', borderRadius: 8, color: '#64748b', padding: '1em 1.5em', marginTop: 20, fontWeight: 500, textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px 0 #2563eb0a' }}>
                            No targeted services found for your selection.
                        </div>
                    )}
                </div>
                <style>{`
                    @media (max-width: 700px) {
                        h1 {
                            font-size: 1.3rem !important;
                            padding: 0.4em 0.7em !important;
                        }
                    }
                    @media (max-width: 600px) {
                        h1 {
                            font-size: 1.1rem !important;
                            padding: 0.3em 0.6em !important;
                        }
                        div[style*='max-width: 700px'] {
                            padding: 0.7em 0.1em 2.5em 0.1em !important;
                        }
                        label {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            padding: 0.8em 0.5em !important;
                        }
                    }
                `}</style>
            </div>
            <div style={{ textAlign: 'center' }}>
                <GoBackButton />
            </div>
        </>
    );
};
