import { motion } from 'framer-motion';
import { Truck, MapPin, Users, ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onSkip?: () => void;
}

export function SplashScreen({ onSkip }: SplashScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: 'var(--safe-area-inset-top)',
        paddingBottom: 'var(--safe-area-inset-bottom)',
      }}
    >
      {/* Role selection background: image and gradient overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/bg-driver-dashboard.jpg"
          alt="Driving dashboard background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 opacity-90" />
      </div>
      {/* Main splash content: centered logo and animated dots */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-10" style={{ width: '320px', height: '320px' }}>
            {/* Larger animated doughnut spinner with bigger center */}
            <svg width="320" height="320" viewBox="0 0 320 320" className="absolute top-0 left-0">
              <motion.circle
                cx="160" cy="160" r="140"
                stroke="#f59e42" strokeWidth="18" fill="none"
                strokeDasharray="880"
                strokeDashoffset="0"
                animate={{
                  strokeDashoffset: [880, 0, 880],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
              />
              <motion.circle
                cx="160" cy="160" r="110"
                stroke="#3b82f6" strokeWidth="18" fill="none"
                strokeDasharray="690"
                strokeDashoffset="0"
                animate={{
                  strokeDashoffset: [690, 0, 690],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              <motion.circle
                cx="160" cy="160" r="80"
                stroke="#22c55e" strokeWidth="18" fill="none"
                strokeDasharray="502"
                strokeDashoffset="0"
                animate={{
                  strokeDashoffset: [502, 0, 502],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
            </svg>
            <img src="/k-and-t-logo2-blue.png" alt="K&T Transport Logo" className="w-48 h-48 object-contain drop-shadow-xl" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
