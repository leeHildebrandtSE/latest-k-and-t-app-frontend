import { cn } from './ui/utils';
import { UserRole } from '../types';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'square' | 'rounded' | 'circle';
  showText?: boolean;
  className?: string;
  role?: UserRole | 'default';
  logoStyle?: '1' | '2';
  useImage?: boolean;
}

const sizeMap = {
  xs: 'w-8 h-8 text-sm',
  sm: 'w-10 h-10 text-base',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-20 h-20 text-3xl',
  xl: 'w-32 h-32 text-5xl',
};

const radiusMap = {
  square: 'rounded-none',
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
};

// Role-based color mapping
const roleColorMap = {
  commuter: 'bg-orange-500',
  driver: 'bg-blue-600',
  admin: 'bg-green-600',
  default: 'bg-amber-500'
};

const roleImageMap = {
  commuter: (style: string) => `/k-and-t-logo${style}-orange.png`,
  driver: (style: string) => `/k-and-t-logo${style}-blue.png`,
  admin: (style: string) => `/k-and-t-logo${style}-green.png`,
  default: (style: string) => `/k-and-t-logo${style}-orange.png`
};

export function Logo({ 
  size = 'md', 
  variant = 'rounded',
  showText = false,
  className,
  role = 'default',
  logoStyle = '2',
  useImage = false
}: LogoProps) {
  const bgColor = roleColorMap[role];
  
  if (useImage) {
    const imgSrc = roleImageMap[role](logoStyle);
    return (
      <div className="inline-flex flex-col items-center gap-2">
        {imgSrc ? (
          <img 
            src={imgSrc}
            alt="K&T Transport Logo"
            className={cn(
              sizeMap[size],
              radiusMap[variant],
              'object-contain',
              className
            )}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div className={cn(
            'flex items-center justify-center',
            sizeMap[size],
            radiusMap[variant]
          )}>
            <span className="font-bold text-blue-700">K&T</span>
          </div>
        )}
        {showText && (
          <div className="text-center">
            <p className={cn(
              'font-bold text-gray-900',
              size === 'xs' && 'text-xs',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg',
              size === 'xl' && 'text-2xl'
            )}>
              K & T Transport
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div 
        className={cn(
          bgColor,
          'flex items-center justify-center flex-shrink-0',
          sizeMap[size],
          radiusMap[variant],
          className
        )}
      >
        <span className={cn(
          'font-bold text-white',
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-xl',
          size === 'lg' && 'text-2xl',
          size === 'xl' && 'text-4xl'
        )}>
          K&T
        </span>
      </div>
      {showText && (
        <div className="text-center">
          <p className={cn(
            'font-bold text-gray-900',
            size === 'xs' && 'text-xs',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-base',
            size === 'lg' && 'text-lg',
            size === 'xl' && 'text-2xl'
          )}>
            K & T Transport
          </p>
        </div>
      )}
    </div>
  );
}

// Specialized logo variants
export function LogoWithTagline({ 
  size = 'lg',
  role = 'default',
  useImage = true 
}: { 
  size?: 'md' | 'lg' | 'xl';
  role?: UserRole | 'default';
  useImage?: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center gap-3">
      <Logo size={size} variant="rounded" role={role} useImage={useImage} logoStyle="2" />
      <div className="text-center">
        <h1 className={cn(
          'font-bold text-white',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-4xl',
          size === 'xl' && 'text-5xl'
        )}>
          K & T Transport
        </h1>
        <p className={cn(
          'text-blue-100',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-xl'
        )}>
          Your Trusted Commute Partner
        </p>
      </div>
    </div>
  );
}

export function SidebarLogo({ 
  collapsed = false,
  role = 'commuter',
  portalName = 'Commuter Portal'
}: { 
  collapsed?: boolean;
  role?: UserRole | 'default';
  portalName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Logo size="sm" variant="rounded" className="flex-shrink-0" role={role} useImage={true} logoStyle="2" />
      {!collapsed && (
        <div>
          <h1 className="font-bold text-sm">K & T Transport</h1>
          <p className="text-xs text-blue-200">{portalName}</p>
        </div>
      )}
    </div>
  );
}
