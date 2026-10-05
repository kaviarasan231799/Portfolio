import { useEffect, useRef } from 'react';
import styles from './Cursor.module.scss';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    // Only run custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x - 18) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y - 18) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    // Event delegation so all dynamic elements, tabs, and buttons get hover automatically
    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select');
      if (target) {
        dotRef.current?.classList.add(styles.hover);
        ringRef.current?.classList.add(styles.hover);
      }
    };

    const onOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select');
      if (target) {
        dotRef.current?.classList.remove(styles.hover);
        ringRef.current?.classList.remove(styles.hover);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
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
