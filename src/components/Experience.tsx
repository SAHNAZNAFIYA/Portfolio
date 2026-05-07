import { motion } from 'framer-motion';
import { Briefcase, Users, Code, Award, MessageSquare } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground">Leadership, collaboration, and real world project execution</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl neon-glow"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Front End Developer Intern</h3>
                <p className="text-primary font-semibold mb-4">Envidox Solutions</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-muted/30 p-4 rounded-xl"
                >
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Team Leadership</h4>
                  <p className="text-sm text-muted-foreground">Coordinated development tasks, collaboration, and execution within a small team</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-muted/30 p-4 rounded-xl"
                >
                  <Code className="w-8 h-8 text-secondary mb-2" />
                  <h4 className="font-semibold mb-1">Tech Stack</h4>
                  <p className="text-sm text-muted-foreground">React, HTML, CSS, TypeScript</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-muted/30 p-4 rounded-xl"
                >
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Recognition</h4>
                  <p className="text-sm text-muted-foreground">Recognized for creativity, initiative, and execution quality</p>
                </motion.div>
                <motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-muted/30 p-4 rounded-xl"
>
  <MessageSquare className="w-8 h-8 text-secondary mb-2" />
  <h4 className="font-semibold mb-1">Communication</h4>
  <p className="text-sm text-muted-foreground">
    Strong presentation, coordination, and collaborative communication skills
  </p>
</motion.div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-primary">Key Contributions:</h4>
                <ul className="space-y-2">
                  {[
  'Led front end development tasks and collaborated closely with team members during project execution',
  'Built responsive and scalable interfaces using React, TypeScript, HTML, and CSS',
  'Designed reusable UI components and improved overall user experience and workflow efficiency',
  'Contributed to strategic discussions, feature planning, and implementation decisions during development',
  'Enhanced the Envichat platform with cleaner, faster, and more user focused interface improvements',
  'Recognized for leadership, adaptability, communication, creativity, and problem solving abilities'
].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
