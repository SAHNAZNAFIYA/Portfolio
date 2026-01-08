import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { Button } from './ui/button';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sahnaznafiya@gmail.com',
    href: 'mailto:sahnaznafiya@gmail.com',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'SAHNAZNAFIYA',
    href: 'https://github.com/SAHNAZNAFIYA',
    color: 'from-gray-500 to-gray-700'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'sahnaz-nafiya-j',
    href: 'https://www.linkedin.com/in/sahnaz-nafiya-j-7528ab356/',
    color: 'from-blue-500 to-blue-700'
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground">Let's connect and build something amazing</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12 rounded-2xl neon-glow"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-muted/30 p-6 rounded-xl hover:bg-muted/50 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {link.label}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground break-all">
                    {link.value}
                  </p>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold transition-all neon-glow"
              >
                <a 
                  href="https://drive.google.com/drive/folders/1VVq7xS82f1MJpoDI8Jh__zFOt9vr3In-?usp=sharing"
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
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center text-muted-foreground"
      >
        <p>© 2025 SAHNAZ NAFIYA J</p>
      </motion.footer>
    </section>
  );
}
