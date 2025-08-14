"use client"
import React from "react";

interface LearningCardProps {
    icon: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    href: string;
    className?: string;
}

const LearningCard: React.FC<LearningCardProps> = ({
    icon,
    title,
    description,
    href,
    className = "list-item-link",
}) => (
    <div className={className}>
        {icon}
        <span>
            {title}
            {description && <span>{description}</span>}
        </span>
    </div>
);

export default LearningCard;
