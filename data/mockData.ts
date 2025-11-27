// Mock data for K & T Transport App
import { Driver, Vehicle, Trip, TripRequest, Notification, Commuter, AnalyticsData } from '../types';

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'John Mitchell',
    email: 'john.mitchell@email.com',
    phone: '+27 82 345 6789',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1718434114814-a6eb91717c2c?w=400',
    licenseNumber: 'DL-12345678',
    rating: 4.8,
    totalTrips: 245,
    vehicles: []
  },
  {
    id: 'd2',
    name: 'Sarah Thompson',
    email: 'sarah.t@email.com',
    phone: '+27 83 456 7890',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    licenseNumber: 'DL-87654321',
    rating: 4.9,
    totalTrips: 312,
    vehicles: []
  },
  {
    id: 'd3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+27 84 567 8901',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    licenseNumber: 'DL-23456789',
    rating: 4.7,
    totalTrips: 189,
    vehicles: []
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Quantum',
    registrationNumber: 'CA 123-456',
    seats: 14,
    color: 'White',
    year: 2022,
    status: 'active',
    driverId: 'd1'
  },
  {
    id: 'v2',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    registrationNumber: 'CA 234-567',
    seats: 16,
    color: 'Silver',
    year: 2023,
    status: 'active',
    driverId: 'd2'
  },
  {
    id: 'v3',
    make: 'Volkswagen',
    model: 'Crafter',
    registrationNumber: 'CA 345-678',
    seats: 12,
    color: 'Blue',
    year: 2021,
    status: 'maintenance',
    driverId: 'd3'
  }
];

export const mockTrips: Trip[] = [
  {
    id: 't1',
    routeName: 'Century City to Bellville',
    type: 'work',
    driverId: 'd1',
    driverName: 'John Mitchell',
    driverAvatar: 'https://images.unsplash.com/photo-1718434114814-a6eb91717c2c?w=400',
    driverRating: 4.8,
    vehicleId: 'v1',
    pickupLocation: 'Century City Mall',
    destination: 'Bellville Business Park',
    pickupTime: '07:00',
    price: 45,
    totalSeats: 14,
    availableSeats: 3,
    date: '2025-11-13',
    status: 'upcoming',
    passengers: ['c1', 'c2', 'c3']
  },
  {
    id: 't2',
    routeName: 'Woodstock to Tygervalley',
    type: 'work',
    driverId: 'd2',
    driverName: 'Sarah Thompson',
    driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    driverRating: 4.9,
    vehicleId: 'v2',
    pickupLocation: 'Woodstock Exchange',
    destination: 'Tygervalley Shopping Centre',
    pickupTime: '06:45',
    price: 50,
    totalSeats: 16,
    availableSeats: 5,
    date: '2025-11-13',
    status: 'upcoming'
  },
  {
    id: 't3',
    routeName: 'Salt River to Stellenbosch University',
    type: 'school',
    driverId: 'd3',
    driverName: 'Michael Chen',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    driverRating: 4.7,
    vehicleId: 'v3',
    pickupLocation: 'Salt River Station',
    destination: 'Stellenbosch University',
    pickupTime: '07:30',
    price: 65,
    totalSeats: 12,
    availableSeats: 2,
    date: '2025-11-13',
    status: 'upcoming'
  },
  {
    id: 't4',
    routeName: 'Claremont to Cape Town CBD',
    type: 'work',
    driverId: 'd1',
    driverName: 'John Mitchell',
    driverAvatar: 'https://images.unsplash.com/photo-1718434114814-a6eb91717c2c?w=400',
    driverRating: 4.8,
    vehicleId: 'v1',
    pickupLocation: 'Claremont Station',
    destination: 'Cape Town CBD',
    pickupTime: '08:00',
    price: 40,
    totalSeats: 14,
    availableSeats: 6,
    date: '2025-11-13',
    status: 'upcoming'
  },
  {
    id: 't5',
    routeName: 'Mitchells Plain to UWC',
    type: 'school',
    driverId: 'd2',
    driverName: 'Sarah Thompson',
    driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    driverRating: 4.9,
    vehicleId: 'v2',
    pickupLocation: 'Mitchells Plain Town Centre',
    destination: 'University of Western Cape',
    pickupTime: '07:15',
    price: 55,
    totalSeats: 16,
    availableSeats: 8,
    date: '2025-11-13',
    status: 'upcoming'
  },
  {
    id: 't6',
    routeName: 'Observatory to CPUT',
    type: 'school',
    driverId: 'd3',
    driverName: 'Michael Chen',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    driverRating: 4.7,
    vehicleId: 'v3',
    pickupLocation: 'Observatory Station',
    destination: 'Cape Peninsula University of Technology',
    pickupTime: '07:45',
    price: 35,
    totalSeats: 12,
    availableSeats: 0,
    date: '2025-11-13',
    status: 'upcoming'
  }
];

export const mockCommuters: Commuter[] = [
  {
    id: 'c1',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+27 81 234 5678',
    role: 'commuter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    pickupArea: 'Century City',
    destination: 'Bellville Business Park'
  },
  {
    id: 'c2',
    name: 'David Brown',
    email: 'david.b@email.com',
    phone: '+27 82 345 6789',
    role: 'commuter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    pickupArea: 'Woodstock',
    destination: 'Tygervalley'
  },
  {
    id: 'c3',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+27 83 456 7890',
    role: 'commuter',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    pickupArea: 'Salt River',
    destination: 'Stellenbosch University'
  }
];

export const mockTripRequests: TripRequest[] = [
  {
    id: 'r1',
    tripId: 't1',
    commuterId: 'c1',
    commuterName: 'Emma Wilson',
    commuterPhone: '+27 81 234 5678',
    status: 'pending',
    requestDate: '2025-11-12T10:30:00',
    seatsRequested: 1
  },
  {
    id: 'r2',
    tripId: 't2',
    commuterId: 'c2',
    commuterName: 'David Brown',
    commuterPhone: '+27 82 345 6789',
    status: 'pending',
    requestDate: '2025-11-12T09:15:00',
    seatsRequested: 1
  },
  {
    id: 'r3',
    tripId: 't1',
    commuterId: 'c3',
    commuterName: 'Lisa Anderson',
    commuterPhone: '+27 83 456 7890',
    status: 'approved',
    requestDate: '2025-11-11T14:20:00',
    seatsRequested: 2
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'c1',
    title: 'Booking Confirmed',
    message: 'Your seat for Century City to Bellville trip has been confirmed.',
    type: 'success',
    read: false,
    date: '2025-11-12T10:30:00'
  },
  {
    id: 'n2',
    userId: 'd1',
    title: 'New Booking Request',
    message: 'Emma Wilson requested a seat on your Century City to Bellville trip.',
    type: 'info',
    read: false,
    date: '2025-11-12T10:30:00'
  },
  {
    id: 'n3',
    userId: 'c2',
    title: 'Trip Reminder',
    message: 'Your trip tomorrow at 06:45 AM from Woodstock to Tygervalley.',
    type: 'info',
    read: true,
    date: '2025-11-12T08:00:00'
  }
];

export const mockAnalytics: AnalyticsData = {
  totalDrivers: 48,
  totalCommuters: 342,
  totalTrips: 1256,
  activeRoutes: 24,
  occupancyRate: 78.5,
  monthlyRevenue: 145280,
  revenueGrowth: 12.3
};

export const mockRevenueData = [
  { month: 'Jun', revenue: 98000 },
  { month: 'Jul', revenue: 112000 },
  { month: 'Aug', revenue: 125000 },
  { month: 'Sep', revenue: 118000 },
  { month: 'Oct', revenue: 135000 },
  { month: 'Nov', revenue: 145280 }
];

export const mockOccupancyData = [
  { route: 'Century City - Bellville', occupancy: 85 },
  { route: 'Woodstock - Tygervalley', occupancy: 92 },
  { route: 'Salt River - Stellenbosch', occupancy: 73 },
  { route: 'Claremont - CBD', occupancy: 68 },
  { route: 'Mitchells Plain - UWC', occupancy: 81 }
];
