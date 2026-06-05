'use client';

import { useEffect, useState } from "react";

interface ScrollState {
    progress: number;  // 0 to 100
    scrolled: boolean; // true when scrollY > threshold
    showBtt: boolean;  // true when scrollY > bttThreshold
}

interface Options {
    threshold?: number;    // when to set scrolled to true
    bttThreshold?: number; // when to show back to top button
}

export function useScrollProgress({
    threshold = 50,
    bttThreshold = 400,
}: Options = {}): ScrollState {

    const [state, setState] = useState<ScrollState>({
        progress: 0,
        scrolled: false,
        showBtt: false,
    });

    useEffect(() => {
        const onScroll = () => {
            const s = window.scrollY;
            const h = document.documentElement.scrollHeight - window.innerHeight;

            setState({
                progress: h > 0 ? (s / h) * 100 : 0,
                scrolled: s > threshold,
                showBtt: s > bttThreshold,
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold, bttThreshold]);

    return state;
}
