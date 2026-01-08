import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    category: '🌐 Web Development',
    items: [
      {
        title: 'EventEase Platform',
        tech: 'React (TypeScript), Tailwind CSS',
        description:
          'Functional event vendor marketplace with category filters, vendor listings, and smooth navigation. Built using AI-assisted development with manual customizations.',
        highlights: ['Category Filtering', 'Vendor Marketplace', 'Clean UX']
      },
      {
        title: 'Driving School Web App (Internship)',
        tech: 'React (TypeScript), Tailwind CSS, Figma',
        description:
          'Led frontend team of 3. Designed full UI palette and complete service page. Praised by senior engineer for creativity and execution quality.',
        highlights: ['Team Leadership', 'UI/UX Design', 'Full Service Page']
      },
      {
        title: 'Pastebin Lite',
        tech: 'Next.js, TypeScript, Tailwind CSS',
        description:
          'Pastebin-like web application that allows users to quickly store and share text content via a generated shareable link, with optional expiration based on time or number of views.',
        highlights: ['Shareable Links', 'Content Expiry', 'Server-side Rendering']
      }
    ]
  },
  {
    category: '🤖 AI Projects',
    items: [
      {
        title: 'AI Token Reputation System',
        tech: 'React, Node.js, Gemini API',
        description:
          'AI-powered token reputation scoring system integrating Web3 + AI + analytics APIs including Moralis, CoinGecko, LunarCrush, Etherscan, and Alchemy.',
        highlights: ['Real-time Analysis', 'Multi-API Integration', 'Scoring Pipeline']
      },
      {
        title: 'PDF Embedding & Text Extraction Model',
        tech: 'Python, Hugging Face',
        description:
          'Converted whitepapers into embeddings (text + diagrams) with similarity search and concept extraction using Hugging Face embeddings.',
        highlights: ['Document Processing', 'Semantic Search', 'Custom Pipeline']
      },
      {
        title: 'SmartDine – AI Food Discovery Assistant',
        tech: 'React (TypeScript), AI APIs',
        description:
          'AI-driven web application that recommends restaurants based on user mood, cravings, and budget using conversational input and context-aware AI reasoning.',
        highlights: ['Mood-based AI', 'Conversational UI', 'Personalized Recommendations']
      }
    ]
  },
  {
    category: '🔧 IoT Projects',
    items: [
      {
        title: 'Smart Saline Bottle Monitoring System',
        tech: 'ESP32, Load Cell, Pulse Sensor',
        description:
          'Real-time vitals monitoring and saline-level alert system with wireless IoT dashboard to enhance patient safety.',
        highlights: ['Real-time Monitoring', 'IoT Dashboard', 'Healthcare Safety']
      },
      {
        title: 'Railway Track Obstacle Detection System',
        tech: 'Sensors, Microcontroller',
        description:
          'Real-time obstacle detection system for railway safety with alert mechanisms to prevent collision risks.',
        highlights: ['Safety System', 'Real-time Detection', 'Alert Mechanism']
      }
    ]
  },
  {
    category: '⛓ Blockchain Projects',
    items: [
      {
        title: 'Decentralized Certificate Verification System',
        tech: 'Solidity, Hardhat, IPFS',
        description:
          'Smart-contract-powered certificate storage on IPFS with secure verification dApp and Metamask integration.',
        highlights: ['IPFS Storage', 'Smart Contracts', 'Wallet Integration']
      },
      {
        title: 'Blockchain Voting System',
        tech: 'Solidity, Hardhat, Web3.js',
        description:
          'Ethereum smart-contract voting system with wallet authentication, Metamask support, and transparent real-time results.',
        highlights: ['Secure Voting', 'Metamask Auth', 'Transparent Results']
      }
    ]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Building innovative solutions across multiple domains
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((category, categoryIndex) => {
            const isOdd = category.items.length % 2 !== 0;

            return (
              <div key={categoryIndex}>
                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-6 text-primary"
                >
                  {category.category}
                </motion.h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((project, projectIndex) => {
                    const isLast = projectIndex === category.items.length - 1;
                    const centerLast = isOdd && isLast;

                    return (
                      <motion.div
                        key={projectIndex}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: projectIndex * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`glass-panel p-6 rounded-2xl hover:neon-glow transition-all duration-300 group
                          ${centerLast ? 'md:col-span-2 md:mx-auto md:max-w-xl' : ''}
                        `}
                      >
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>

                        <p className="text-sm text-secondary font-mono mb-3">
                          {project.tech}
                        </p>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
