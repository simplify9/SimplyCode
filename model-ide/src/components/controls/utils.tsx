export interface ChildProps {
    className: string
    style: React.CSSProperties
}

export const classes = (...classList: (string | undefined)[]) => classList.map(c => c || '').join(' ');

