import { MapPin, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MapPreviewProps {
  pickupLocation: string;
  destination: string;
  className?: string;
}

export function MapPreview({ pickupLocation, destination, className = '' }: MapPreviewProps) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* Map background image */}
      <div className="relative h-64 bg-gray-100">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1532594722383-b75fb8381b55?w=800"
          alt="Route map"
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Overlay with route info */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="bg-white rounded-lg p-3 shadow-md inline-flex items-start gap-2 self-start">
            <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="font-medium">{pickupLocation}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-md inline-flex items-start gap-2 self-end">
            <Navigation className="h-5 w-5 text-blue-900 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="font-medium">{destination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
