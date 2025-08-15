"use client";
import { Check, X } from "lucide-react";

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

export const PricingSection = () => {
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
                            <span>Funnel Internet Traffic</span>
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
export const PricingTierCard = ({ tier }: { tier: PricingTier }) => (
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