import { motion } from 'framer-motion';
import { Trophy, FileText, Users, Award } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'L1X AI + Web3 International Hackathon',
    subtitle: 'Finalist (2025)',
    description: 'Competed internationally in cutting-edge AI and Web3 technologies',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: FileText,
    title: 'Research Publication',
    subtitle: 'Ultrasonic Gloves for Visually Impaired',
    description: 'Published research on assistive technology for accessibility',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'IETE Coordinator',
    subtitle: 'Campus Ambassador',
    description: 'Leadership role in technical organization and community building',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Award,
    title: 'Professional Certifications',
    subtitle: 'Multiple Domains',
    description: 'IBM AI, DeFi, 5G, Cryptography, Embedded Systems certifications',
    color: 'from-green-500 to-emerald-500'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Achievements & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="text-xl text-muted-foreground">Milestones and accomplishments</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-panel p-6 rounded-2xl hover:neon-glow transition-all duration-300 text-center group"
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <achievement.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              
              <p className="text-sm text-secondary font-semibold mb-3">
                {achievement.subtitle}
              </p>
              
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline representation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto max-w-2xl"
        />
      </div>
    </section>
  );
}
