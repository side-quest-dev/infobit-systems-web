import Link from "next/link";
import styles from "./Button.module.scss";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "small" | "medium" | "large";

interface Props {
    href?: string;
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    showArrow?: boolean;
    external?: boolean;
}

export default function Button({
    href,
    onClick,
    variant = "primary",
    size = "medium",
    children,
    className,
    type = "button",
    disabled = false,
    showArrow = false,
    external = false,
}: Props) {
    const classes = clsx(
        styles.button,
        styles[variant],
        size !== "medium" && styles[size],
        className,
    );

    const content = (
        <>
            {children}
            {showArrow && <span className={styles.arrow} aria-hidden="true">→</span>}
        </>
    );

    if (href) {
        const linkProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {}

        return (
            <Link href={href} className={classes} onClick={onClick} {...linkProps}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
        >
            {content}
        </button>
    );
}