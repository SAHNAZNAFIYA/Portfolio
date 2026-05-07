import { motion } from 'framer-motion';
import { Sparkles, Code2, Lightbulb, Rocket } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Technical Expertise',
    description: 'Experience across Web Development, AI, IoT, and Blockchain technologies'
  },
  {
    icon: Lightbulb,
    title: 'Strategic Innovation',
description: 'Focused on solving real world challenges through technology, leadership, and scalable innovation'
  },
  {
    icon: Rocket,
   title: 'Leadership & Problem Solving',
description: 'Quick to adapt, strategic in thinking, and confident in handling complex challenges'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Development',
    description: 'Skilled at efficiently leveraging AI tools like ChatGPT, Gemini, Perplexity, Lovable, and others'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground">Building the future, one project at a time</p>
        </motion.div>

        <div className="flex justify-center items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl"
          >
            <div className="glass-panel p-8 rounded-2xl neon-glow">
              <p className="text-lg leading-relaxed mb-6">
  I'm an <span className="text-primary font-semibold">Electronics & Communication Engineering Graduate </span> 
  passionate about building <span className="text-secondary font-semibold">impactful real world solutions </span> 
  through technology, strategic thinking, and innovation. My experience spans across 
  <span className="text-primary"> Full Stack Development</span>, 
  <span className="text-secondary"> Artificial Intelligence</span>, 
  <span className="text-primary"> IoT</span>, and 
  <span className="text-secondary"> Blockchain</span>, where I enjoy solving practical challenges with creative and scalable approaches.
</p>
              
              <p className="text-lg leading-relaxed">
  Along with my technical background, I bring strong 
  <span className="font-semibold"> leadership</span>, 
  <span className="font-semibold"> communication</span>, and 
  <span className="font-semibold"> strategic problem solving</span> skills to every project and collaborative environment. 

  My internship at <span className="text-primary">Envidox Solutions</span>, leadership experiences, and participation in international hackathons have strengthened my ability to coordinate teams, adapt quickly, and deliver 
  <span className="text-secondary"> innovative, scalable, and user focused solutions</span>.
</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-xl hover:neon-glow transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
