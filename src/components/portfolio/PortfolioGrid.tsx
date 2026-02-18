import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioProjects } from '@/data/portfolioData';

interface PortfolioGridProps {
  limit?: number;
}

export function PortfolioGrid({ limit }: PortfolioGridProps) {
  const { language } = useLanguage();
  const projects = limit ? portfolioProjects.filter(p => p.image).slice(0, limit) : portfolioProjects.filter(p => p.image);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -6 }}
        >
          <Link
            to={`/portfolio/${project.slug}`}
            className="group block rounded-2xl overflow-hidden border-2 border-border/50 bg-background hover:shadow-xl transition-shadow"
          >
            {/* Desktop + Mobile mockup */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              {/* Desktop screenshot */}
              <img
                src={project.image}
                alt={`${project.name} desktop`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Mobile screenshot overlay */}
              {project.imageMobile && (
                <div className="absolute bottom-2 right-3 w-[18%] rounded-lg overflow-hidden shadow-xl border-2 border-white/80">
                  <img
                    src={project.imageMobile}
                    alt={`${project.name} mobile`}
                    className="w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-[17px] font-bold text-foreground mb-1">{project.name}</h3>
              <span
                className="inline-block text-[12px] font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: '#8BC34A20', color: '#6d9a2b' }}
              >
                {project.industry[language]}
              </span>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                {project.description[language]}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
