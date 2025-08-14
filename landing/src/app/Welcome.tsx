import landingPageLogo from "../assets/wavy_p.jpg";
import { NextStepAccordion } from "../components/nextStep";
import {
  BadgeCheck,
  Phone,
  Star,
  Calendar,
  Globe,
  TrendingUp,
  Send,
  CloudLightning,
  Heart,
  Github,
  Check,
  X,
} from 'lucide-react';
import "./Welcome.css";
import CopyCommandButton from "../components/copyCommand";
import InfoCard from "../components/infoCard";
import LearningCard from "../components/learningCard";
import { Link } from "react-router-dom";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  recommended: boolean;
  stripeUrl: string;
}

const PricingTierCard = ({ tier }: { tier: PricingTier }) => (
  <div className={`pricing-tier ${tier.recommended ? 'recommended' : ''}`}>
    {tier.recommended && <div className="recommended-badge">Popular</div>}
    <h3>{tier.title}</h3>
    <div className="price">{tier.price}</div>
    <p>{tier.description}</p>
    <ul className="features-list">
      {tier.features.map((feature, index) => (
        <li key={index} className={feature.included ? 'included' : 'excluded'}>
          {feature.included ? <Check size={16} /> : <X size={16} />}
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
    <a href={tier.stripeUrl} target="_blank" rel="noopener noreferrer">
      <button className={`pricing-button ${tier.recommended ? 'recommended' : ''}`}>
        {tier.buttonText}
      </button>
    </a>
  </div>
);

const PricingSection = () => {
  const tiers: PricingTier[] = [
    {
      title: "Starter",
      price: "$250/month",
      description: "Perfect for small businesses getting started with automation.",
      features: [
        { text: "Basic website", included: true },
        { text: "Email support", included: true },
        { text: "Lead capture form", included: true },
        { text: "Google My Business setup", included: true },
      ],
      buttonText: "Get Started",
      stripeUrl: "https://buy.stripe.com/aFaaEQaPKgHZcQs6Wo2oE05",
      recommended: false
    },
    {
      title: "Growth",
      price: "$1000/month",
      description: "For growing businesses ready to scale with AI.",
      features: [
        { text: "Everything in Starter", included: true },
        { text: "AI-generated ads", included: true },
        { text: "Google My Business management", included: true },
        { text: "Advanced analytics dashboard", included: true },
      ],
      buttonText: "Start Growing",
      stripeUrl: "https://buy.stripe.com/bJe00c4rmajBdUw5Sk2oE07",
      recommended: true
    },
    {
      title: "Lead Gen",
      price: "$2000/month",
      description: "Complete lead generation and management solution.",
      features: [
        { text: "Everything in Growth", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom lead generation", included: true },
        { text: "Weekly strategy calls", included: true },
        { text: "24/7 priority support", included: true },
      ],
      buttonText: "Generate Leads",
      stripeUrl: "https://buy.stripe.com/aFa14gf601N503GgwY2oE08",
      recommended: false
    },
    {
      title: "SaaS MVP",
      price: "$5000/month",
      description: "End-to-end SaaS development for your minimum viable product.",
      features: [
        { text: "Custom SaaS development", included: true },
        { text: "UI/UX design", included: true },
        { text: "API integrations", included: true },
        { text: "DevOps & deployment", included: true },
        { text: "Monthly feature updates", included: true },
      ],
      buttonText: "Build Your MVP",
      stripeUrl: "https://buy.stripe.com/3cI6oAf608btdUwdkM2oE0f",
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="funnel-container">
        <div className="funnel">
          <div className="funnel-top">
            <h2>Simple, Transparent Pricing</h2>
            <p className="pricing-subtitle">Choose the perfect plan for your business needs</p>
          </div>
          <div className="funnel-steps">
            <div className="funnel-step">
              <span className="funnel-number">1</span>
              <span>Capture Leads</span>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-step">
              <span className="funnel-number">2</span>
              <span>Convert to Customers</span>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-step">
              <span className="funnel-number">3</span>
              <span>Scale Your Business</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pricing-tiers">
        {tiers.map((tier, index) => (
          <PricingTierCard key={index} tier={tier} />
        ))}
      </div>
    </section>
  );
};

export function NxWelcome() {
  const quizUrl = 'https://quiz.pypes.dev'
  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome to pypes 👋
          </h1>
        </div>

        <div id="hero" className="rounded">
          <div className="text-container">
            <h2>
              <BadgeCheck size={32} color="#10b981" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              <span> Take our quiz to find out what you need to do next</span>
            </h2>
            <Link to={quizUrl}> Take the quiz </Link>
          </div>
          <div className="logo-container">
            <img src={landingPageLogo} width={"80%"} />
          </div>
        </div>

        <div id="middle-content">
          <div id="learning-materials" className="rounded shadow">
            <LearningCard
              href="#"
              icon={
                <TrendingUp size={24} color="#f3b700" />
              }
              title={"AI Generated Ads"}
              description={"Have AI find new customers"}
            />
            <LearningCard
              href="#"
              icon={
                <Phone size={24} color="#8e44ad" />
              }
              title={"24/7 Phone Call Assistant"}
              description={"Automate & answer calls"}
            />
            <LearningCard
              href="#"
              icon={
                <Calendar size={24} color="#f3b700" />
              }
              title={"Home Service Scheduling"}
              description={"Automate Appointment Setting"}
            />

            <LearningCard
              href="#"
              icon={
                <Star size={24} color="#4c5154" />
              }
              title={"AI Business Reviews"}
              description={"Google & Yelp reviews"}
            />

            <LearningCard
              href="#"
              icon={
                <Globe size={24} color="#8e44ad" />
              }
              title={"Advanced Websites"}
              description={"Custom sites & forms"}
            />
            <LearningCard
              href="#"
              icon={
                <CloudLightning size={24} color="#4c5154" />
              }
              title={"Google Biz & Ads Mgmt"}
              description={"Managed GMB & campaigns"}
            />

          </div>
          <div id="other-links">
            <InfoCard
              id="nx-cloud"
              className="rounded shadow"
              onClick={() => window.location.href = quizUrl}
              icon={<CloudLightning size={24} color="#4c5154" />}
              title={"AI moves fast!"}
              subtitle={"move faster"}
            />
            <InfoCard
              id="nx-repo"
              className="button-pill rounded shadow"
              href="https://github.com/pypes-dev"
              icon={<Github size={24} color="#4c5154" />}
              title={"Pypes is open source"}
              subtitle={"Want to support? Give us a star!"}
            />
          </div>
        </div>

        <PricingSection />

        <div id="commands" className="rounded shadow" style={{ display: 'block' }}>
          <h2>Next steps</h2>
          <p>Here are some things you can do</p>
          <NextStepAccordion
            icon={'📝'}
            title={<span style={{ padding: '0 0.3rem' }}>Take the Quiz</span>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', background: '#fff', borderRadius: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.03)', marginTop: '0.5rem', width: '100%' }}>
              <span style={{ fontSize: '1.05rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.5rem' }}>
                Personalize your AI journey and discover new ways to make more money!
              </span>
              <a
                href={quizUrl}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '0.7em 2em',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px 0 #2563eb22',
                  textDecoration: 'none',
                  transition: 'background .15s',
                  marginTop: 8,
                }}
                aria-label="Start the AI Quiz"
              >
                Start the Quiz →
              </a>
            </div>
          </NextStepAccordion>
          <NextStepAccordion
            icon={
              '📱'
            }
            title={<span style={{ padding: '0 0.3rem' }}>Download the Pypes mobile app</span>}
          >

            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <a href="https://apps.apple.com/app/pypes-ai-paper-trail/id6748501122" target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" style={{ height: '44px', maxWidth: '160px', width: '100%' }} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.pypes.ai.papertrail" target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style={{ height: '44px', maxWidth: '160px', width: '100%' }} />
              </a>
            </div>
            <span style={{ fontSize: '0.97rem', color: '#6b7280', marginTop: '0.5rem', textAlign: 'center', maxWidth: '300px' }}>
              Download our mobile app for the best Pypes experience.
            </span>
          </NextStepAccordion>
          <NextStepAccordion
            icon={'👑'}
            title={<span style={{ padding: '0 0.3rem' }}>Find leads matching your Ideal Customer Profile</span>}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 0',
              background: '#fff',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              marginTop: '0.5rem',
              width: '100%'
            }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <span
                  style={{
                    background: '#23272e',
                    color: '#fff',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
                    borderRadius: '0.4rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    display: 'inline-block',
                    minWidth: '180px',
                    textAlign: 'left',
                    letterSpacing: '0.01em',
                    userSelect: 'all',
                    position: 'relative',
                  }}
                  id="leads-command"
                >
                  npx pypes/leads
                </span>
                <CopyCommandButton command="npx pypes/leads" />
              </div>
              <span style={{ fontSize: '0.97rem', color: '#6b7280', marginTop: '0.5rem', textAlign: 'center', maxWidth: '300px' }}>
                Find leads matching your Ideal Customer Profile.
              </span>
            </div>
          </NextStepAccordion>

          <NextStepAccordion
            icon={'🤙'}
            title={<span style={{ padding: '0 0.3rem' }}> Already have an account?</span>}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 0',
              background: '#fff',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              marginTop: '0.5rem',
              width: '100%'
            }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <a
                  href="https://quiz.pypes.dev"
                  style={{
                    display: 'inline-block',
                    background: '#1a3458',
                    color: '#fff',
                    padding: '0.7rem 2rem',
                    borderRadius: '1.2rem',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    textDecoration: 'none',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    letterSpacing: '0.01em',
                    transition: 'background 0.2s',
                    outline: 'none',
                    border: 'none',
                  }}
                  aria-label="Login to your account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login to your account
                </a>
              </div>
            </div>

          </NextStepAccordion>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 1rem 0', width: '100%' }}>
          <a
            href="mailto:jared@pypes.dev"
            style={{
              display: 'inline-block',
              background: '#1a3458',
              color: '#fff',
              padding: '0.9rem 2.2rem',
              borderRadius: '1.2rem',
              fontWeight: 700,
              fontSize: '1.15rem',
              textDecoration: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              letterSpacing: '0.02em',
              transition: 'background 0.2s',
              outline: 'none',
              border: 'none',
            }}
            aria-label="Contact support via email"
          >
            💬 Support
          </a>
        </div>

        <p id="love">
          Carefully crafted with
          <Heart size={20} color="#fca5a5" style={{ display: 'inline', marginTop: '-0.25rem' }} />
        </p >
      </div >
    </div>
  );
}

export default NxWelcome;
