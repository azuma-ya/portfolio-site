import type { RefObject } from "react";
import { useEffect } from "react";

import { frame, useMotionValue, useSpring } from "framer-motion";

const spring = { damping: 100, stiffness: 1000, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(pageX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(pageY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { x, y };
}
