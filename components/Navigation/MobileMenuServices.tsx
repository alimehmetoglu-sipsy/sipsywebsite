'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Service } from '@/lib/types';
import { ChevronDown } from 'lucide-react';

interface MobileMenuServicesProps {
  services: (Service & { id: number })[];
  onClose: () => void;
}

export default function MobileMenuServices({
  services,
  onClose,
}: MobileMenuServicesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-2">
      {/* Services Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-lg font-medium text-neutral-dark hover:text-cyan-500 py-2 transition-colors"
        aria-expanded={isExpanded}
      >
        Services
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Nested Services List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isExpanded ? 'visible' : 'hidden'}
        className="overflow-hidden"
      >
        <div className="space-y-1 pl-4 border-l-2 border-cyan-500">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/services/${service.id}`}
                onClick={() => {
                  setIsExpanded(false);
                  onClose();
                }}
                className="block text-base font-medium text-neutral-dark hover:text-cyan-500 py-2 transition-colors"
              >
                {service.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
