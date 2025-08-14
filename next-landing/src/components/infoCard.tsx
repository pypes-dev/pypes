"use client"
import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    href?: string;
    id?: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
    icon,
    title,
    subtitle,
    href,
    id,
    className = "",
    children,
    onClick,
}) => {
    const content = (
        <div className={className} id={id} style={{ cursor: "pointer" }} onClick={() => onClick?.()}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {icon}
                <h2 style={{ marginLeft: icon ? "1.2rem" : 0 }}>
                    {title}
                    {subtitle && <div><span style={{ fontSize: "0.95em", color: "#888" }}>{subtitle}</span></div>}
                </h2>
            </div>
            {children}
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={className}
                id={id}
                style={{ textDecoration: "none" }}
            >
                {content.props.children}
            </a>
        );
    }
    return content;
};

export default InfoCard;
