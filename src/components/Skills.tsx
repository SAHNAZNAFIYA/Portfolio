import { motion } from 'framer-motion';
import { 
  Code2, 
  Globe, 
  Brain, 
  Cpu, 
  Blocks,
  Wrench
} from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming Languages',
    color: 'from-blue-500 to-cyan-500',
    skills: ['C', 'C++', 'Java', 'Python', 'TypeScript']
  },
  {
    icon: Globe,
    title: 'Web Development',
    color: 'from-purple-500 to-pink-500',
    skills: ['React (TypeScript)', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Figma (UI/UX)']
  },
  {
    icon: Brain,
    title: 'AI / ML Tools',
    color: 'from-green-500 to-emerald-500',
    skills: ['Hugging Face', 'Python ML Stack', 'ChatGPT', 'Gemini', 'Perplexity', 'Google Colab']
  },
  {
    icon: Cpu,
    title: 'IoT / Embedded Systems',
    color: 'from-orange-500 to-red-500',
    skills: ['ESP32', 'Raspberry Pi', 'Sensors', 'Microcontroller Integration']
  },
  {
    icon: Blocks,
    title: 'Blockchain / Web3',
    color: 'from-indigo-500 to-purple-500',
    skills: ['Solidity', 'Hardhat', 'Web3.js', 'IPFS', 'Pinata']
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    color: 'from-yellow-500 to-orange-500',
    skills: ['Git', 'GitHub', 'MATLAB', 'UI Path', 'VS Code']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground">Tools and technologies I work with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-6 rounded-2xl hover:neon-glow transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    className="px-3 py-1 bg-muted/50 rounded-full text-sm hover:bg-primary/20 hover:text-primary transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
