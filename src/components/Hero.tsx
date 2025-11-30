import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from './ui/button';
import NeonRibbonOrb from './NeonRibbonOrb';
import { Suspense, useState, useEffect } from 'react';

const typingTexts = [
  'Full-Stack Development',
  'AI & Machine Learning',
  'IoT Innovation',
  'Web3 & Smart Contracts',
  'Creative Engineering Projects'
];

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = typingTexts[currentText];
      
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        
          if (displayText === current) {
          setTimeout(() => setIsDeleting(true), 600);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentText((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 10 : 15);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentText]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gradient">SAHNAZ NAFIYA J</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Developer & Engineering Student Exploring Web, AI, IoT & Blockchain — 
              Crafting <span className="text-primary font-semibold">Real-World</span>, 
              <span className="text-secondary font-semibold"> Creative</span> & 
              <span className="text-primary font-semibold"> Scalable</span> Solutions Through Code.
            </motion.p>

            <motion.div
              className="h-16 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-2xl font-semibold text-primary">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="bg-primary hover:bg-primary/90 neon-glow group"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white transition-all neon-glow"
              >
                <a 
                  href="https://drive.google.com/file/d/1M9wKd-cfoZD2-YE1hDEtUwqsZVHDAbRT/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FileText className="mr-2 w-5 h-5" />
                  Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Tech Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent blur-3xl" />
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            }>
              <NeonRibbonOrb />
            </Suspense>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
