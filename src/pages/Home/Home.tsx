import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Video, ImageIcon, Mic } from 'lucide-react';
import styles from './Home.module.css';

// ── MAGNETIC BUTTON COMPONENT ──
const MagneticButton = ({ children, className, onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
};

const Home: React.FC = () => {
  // ── ANIMATION 1: EXPANDING VIDEO HERO ──
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(heroScroll, [0, 1], [0.4, 1.2]);
  const titleY = useTransform(heroScroll, [0, 1], [0, -200]);
  const titleOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  // ── ANIMATION 2: HORIZONTAL SCROLL HUB ──
  const horizontalRef = useRef(null);
  const { scrollYProgress: hzScroll } = useScroll({ target: horizontalRef });
  const xTransform = useTransform(hzScroll, [0, 1], ["0%", "-66.66%"]);

  // ── ANIMATION 3: SCROLL FILL TEXT ──
  const textRef = useRef(null);
  const { scrollYProgress: textScroll } = useScroll({ target: textRef, offset: ["start start", "end end"] });
  const textWidth = useTransform(textScroll, [0, 1], ["0%", "100%"]);

  return (
    <div className={styles.home}>

      {/* ════ SECTION 1: EXPANDING VIDEO HERO ════ */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.heroSticky}>
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className={styles.heroTitleBox}>
            <div className={styles.heroBadge}>ConvertFlix Engine V3</div>
            <h1>FLAT. FAST.<br/>FLAWLESS.</h1>
          </motion.div>
          
          <motion.div style={{ scale: videoScale }} className={styles.videoWrapper}>
            <video 
              autoPlay muted loop playsInline 
              className={styles.heroVideo}
              poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
            >
              <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay}></div>
          </motion.div>
        </div>
      </section>

      {/* ════ SECTION 2: SCROLL FILL TYPOGRAPHY ════ */}
      <section ref={textRef} className={styles.fillSection}>
        <div className={styles.fillTextSticky}>
          <div className="container">
            <div className={styles.fillTextWrapper}>
              <h2 className={styles.fillTextOutline}>ZERO CLOUD UPLOADS.<br/>100% LOCAL PROCESSING.<br/>NO COMPROMISE.</h2>
              <motion.h2 style={{ width: textWidth }} className={styles.fillTextSolid}>
                ZERO CLOUD UPLOADS.<br/>100% LOCAL PROCESSING.<br/>NO COMPROMISE.
              </motion.h2>
            </div>
          </div>
        </div>
      </section>

      {/* ════ SECTION 3: HORIZONTAL SCROLL MEDIA HUB ════ */}
      <section ref={horizontalRef} className={styles.hzSection}>
        <div className={styles.hzSticky}>
          <motion.div style={{ x: xTransform }} className={styles.hzTrack}>
            
            {/* Slide 1 */}
            <div className={styles.hzSlide}>
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80" alt="Video" className={styles.hzImage} />
              <div className={styles.hzContent}>
                <Video size={48} />
                <h2>VIDEO TRANSCODER</h2>
                <Link to="/tools/compress-video" className={styles.flatBtn}>EXECUTE <ArrowRight size={16}/></Link>
              </div>
            </div>

            {/* Slide 2 */}
            <div className={styles.hzSlide}>
              <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80" alt="Image" className={styles.hzImage} />
              <div className={styles.hzContent}>
                <ImageIcon size={48} />
                <h2>IMAGE ENHANCER</h2>
                <Link to="/tools/compress-image" className={styles.flatBtn}>EXECUTE <ArrowRight size={16}/></Link>
              </div>
            </div>

            {/* Slide 3 */}
            <div className={styles.hzSlide}>
               <img src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=1200&q=80" alt="Audio" className={styles.hzImage} />
              <div className={styles.hzContent}>
                <Mic size={48} />
                <h2>VOICE REDUCER</h2>
                <Link to="/tools/compress-audio" className={styles.flatBtn}>EXECUTE <ArrowRight size={16}/></Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ════ SECTION 4: STACKING DECK CARDS ════ */}
      <section className={styles.stackingSection}>
        <div className="container">
          <div className={styles.stackHeader}>
             <h2>THE WORKFLOW</h2>
          </div>
          <div className={styles.stackContainer}>
            
            <div className={`${styles.stackCard} ${styles.stackCard1}`}>
              <div className={styles.stackNumber}>01</div>
              <div className={styles.stackInfo}>
                <h3>SELECT MEDIA</h3>
                <p>Drag and drop massive files directly into your browser window.</p>
              </div>
            </div>

            <div className={`${styles.stackCard} ${styles.stackCard2}`}>
              <div className={styles.stackNumber}>02</div>
              <div className={styles.stackInfo}>
                <h3>LOCAL PROCESSING</h3>
                <p>WASM engines compress the files using your device's native CPU architecture.</p>
              </div>
            </div>

            <div className={`${styles.stackCard} ${styles.stackCard3}`}>
              <div className={styles.stackNumber}>03</div>
              <div className={styles.stackInfo}>
                <h3>INSTANT EXPORT</h3>
                <p>Download the optimized files with zero server latency or data tracking.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════ SECTION 5: MAGNETIC CTA ════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaLayout}>
            <h2>INITIALIZE THE ENGINE.</h2>
            <MagneticButton className={styles.magneticBtn} onClick={() => window.scrollTo(0,0)}>
              START COMPRESSING <ArrowRight size={24} />
            </MagneticButton>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
