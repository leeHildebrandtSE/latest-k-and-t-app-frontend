// Type definitions for K & T Transport App

export type UserRole = 'commuter' | 'driver' | 'admin';

export type TripType = 'work' | 'school';

export type TripStatus = 'upcoming' | 'completed' | 'cancelled';

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Commuter extends User {
  pickupArea: string;
  destination: string;
}

export interface Driver extends User {
  licenseNumber: string;
  rating: number;
  totalTrips: number;
  vehicles: Vehicle[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  registrationNumber: string;
  seats: number;
  color: string;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  driverId: string;
}

export interface Trip {
  id: string;
  routeName: string;
  type: TripType;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverRating: number;
  vehicleId: string;
  pickupLocation: string;
  destination: string;
  pickupTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  date: string;
  status: TripStatus;
  passengers?: string[];
}

export interface TripRequest {
  id: string;
  tripId: string;
  commuterId: string;
  commuterName: string;
  commuterPhone: string;
  status: RequestStatus;
  requestDate: string;
  seatsRequested: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}

export interface AnalyticsData {
  totalDrivers: number;
  totalCommuters: number;
  totalTrips: number;
  activeRoutes: number;
  occupancyRate: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}
