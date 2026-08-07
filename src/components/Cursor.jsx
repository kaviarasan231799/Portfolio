import { useEffect, useRef } from 'react';
import styles from './Cursor.module.scss';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x - 18) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y - 18) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dotRef.current?.classList.add(styles.hover);
      ringRef.current?.classList.add(styles.hover);
    };
    const onLeave = () => {
      dotRef.current?.classList.remove(styles.hover);
      ringRef.current?.classList.remove(styles.hover);
    };

    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
