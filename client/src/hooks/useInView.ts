import { useEffect, useRef, useState } from 'react';



const useInView = (threshold: number = 0.5): [React.RefObject<HTMLElement>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
        setIsVisible(entries[0].isIntersecting);
        }, { threshold });

        if (ref.current) {
        observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold]);

    return [ref, isVisible];
};

export default useInView;
