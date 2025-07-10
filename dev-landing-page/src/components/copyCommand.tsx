import { useState } from "react";

const CopyCommandButton = ({ command }: { command: string }) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(command);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
            }}
            style={{
                background: copied ? '#059669' : '#374151',
                color: '#fff',
                border: 'none',
                borderRadius: '0.4rem',
                padding: '0.4rem 0.7rem',
                marginLeft: '0.2rem',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
            }}
            aria-label={copied ? "Copied!" : "Copy command"}
            tabIndex={0}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.2rem' }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}

export default CopyCommandButton;
