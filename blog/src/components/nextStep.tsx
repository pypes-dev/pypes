"use client"
import React, { useState, type ReactNode } from "react";

interface NextStepAccordionProps {
    title: ReactNode;
    icon?: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    style?: React.CSSProperties;
}

export const NextStepAccordion: React.FC<NextStepAccordionProps> = ({
    title,
    icon,
    children,
    defaultOpen = false,
    style
}) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div style={{ marginBottom: "1rem", marginTop: "1rem", width: "100%" }}>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    padding: "0.75rem 0",
                    cursor: "pointer",
                    borderRadius: "1rem",
                    background: "#f3f4f6",
                    color: "#1a3458",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    transition: "background 0.2s",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                }}
            >
                {icon}
                <span style={{ padding: '0 0.5rem', flex: 1, textAlign: 'left' }}>{title}</span>
                <span style={{ marginLeft: "auto", transition: "transform 0.2s" }}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s"
                        }}
                    >
                        <path d="M7 10l5 5 5-5" stroke="#1a3458" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            {open && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem 0",
                        background: "#fff",
                        borderRadius: "0.75rem",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                        marginTop: "0.5rem",
                        width: "100%"
                    }}
                >

                    {children}
                </div>
            )}
        </div>
    );
};
