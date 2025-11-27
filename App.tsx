/**
 * K & T Transport App
 * 
 * NAVIGATION:
 * - Main sections accessible via sidebar (desktop) / bottom tabs (mobile)
 * - Detail views show contextual back button in header
 * - Tab-based navigation for primary sections
 * - Header back button for drill-down views
 */

import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { RoleSelection } from './components/screens/auth/RoleSelection';
import { Login } from './components/screens/auth/Login';
import { Register, RegisterData } from './components/screens/auth/Register';
import { CommuterLayout } from './components/layouts/CommuterLayout';
import { DriverLayout } from './components/layouts/DriverLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { CommuterHome } from './components/screens/commuter/CommuterHome';
import { TripDetails } from './components/screens/commuter/TripDetails';
import { MyTrips } from './components/screens/commuter/MyTrips';
import { AdminDashboard } from './components/screens/admin/AdminDashboard.tsx';
import { UserManagement } from './components/screens/admin/UserManagement';
import { VehicleManagement } from './components/screens/driver/VehicleManagement';
import { Profile } from './components/screens/shared/Profile';
import { Toaster, toast } from 'sonner';
import { Notifications } from './components/screens/shared/Notifications';
import { UserRole, Trip, Notification, TripRequest, Vehicle } from './types';
import { mockTrips, mockTripRequests, mockNotifications, mockDrivers, mockVehicles, mockAnalytics, mockRevenueData, mockOccupancyData } from './data/mockData';
import { DriverDashboard } from './components/screens/driver/DriverDashboard';
import { TripRequests } from './components/screens/driver/TripRequests';
import { StatusBar, Style } from '@capacitor/status-bar';

export function App() {
  // State declarations (must be first)
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips] = useState(mockTrips);
  const [requests, setRequests] = useState(mockTripRequests);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Admin user object
  const currentUser = {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@knt.com',
    phone: '+27 82 000 0000',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  };

  // Auto-hide splash screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Configure status bar when user role changes
  useEffect(() => {
    const configureStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        const roleColors = {
          commuter: '#ea580c',
          driver: '#1d4ed8',
          admin: '#16a34a'
        };
        const color = selectedRole ? roleColors[selectedRole] : '#ea580c';
        await StatusBar.setBackgroundColor({ color });
      } catch (_error) {
        console.log('StatusBar API not available');
      }
    };
    if (isAuthenticated && selectedRole) {
      configureStatusBar();
    }
  }, [isAuthenticated, selectedRole, activeTab]);

  // Handler for splash skip
  const handleSkipSplash = () => {
    setShowSplash(false);
  };

  // Handler for role selection
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setAuthScreen('login');
  };

  // Handler for login
  const handleLogin = (_email: string, _password: string) => {
    toast.success(`Welcome back! Logged in as ${selectedRole}`);
    setIsAuthenticated(true);
    setActiveTab(selectedRole === 'commuter' ? 'home' : 'dashboard');
    setTimeout(() => {
      const navTip = selectedRole === 'commuter'
        ? 'Tip: Use the tabs below to navigate. Tap any trip to view details!'
        : selectedRole === 'driver'
        ? 'Tip: Navigate using the bottom tabs. Check your dashboard for trip stats!'
        : 'Tip: Use the sidebar to navigate between sections.';
      toast.info(navTip, { duration: 4000 });
    }, 1500);
  };

  // Handler for register
  const handleRegister = (_data: RegisterData) => {
    toast.success('Account created successfully!');
    setIsAuthenticated(true);
    setActiveTab('home');
  };

  // Handler for logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen('role-selection');
    setSelectedRole(null);
    setActiveTab('home');
    toast.info('Logged out successfully');
  };

  // Trip handlers
  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    setActiveTab('trip-details');
  };

  const handleBackToTrips = () => {
    setSelectedTrip(null);
    setActiveTab('home');
  };

  const handleBookTrip = (trip: Trip) => {
    toast.success(`Seat requested for ${trip.routeName}`);
    setActiveTab('my-trips');
  };

  // Request handlers
  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map((r: TripRequest) =>
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    ));
    toast.success('Request approved');
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map((r: TripRequest) =>
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));
    toast.error('Request rejected');
  };

  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map((n: Notification) =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen onSkip={handleSkipSplash} />;
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authScreen === 'role-selection') {
      return <RoleSelection onSelectRole={handleSelectRole} />;
    }
    if (authScreen === 'login' && selectedRole) {
      return (
        <Login
          onLogin={handleLogin}
          onBack={() => {
            setAuthScreen('role-selection');
            setSelectedRole(null);
          }}
          onRegister={() => setAuthScreen('register')}
        />
      );
    }
    if (authScreen === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onBack={() => setAuthScreen('login')}
        />
      );
    }
  }

  // Commuter Portal
  if (selectedRole === 'commuter') {
    const unreadCount = notifications.filter((n: Notification) => !n.read && n.userId === currentUser.id).length;
    const isDetailView = activeTab === 'trip-details';

    return (
      <>
        <CommuterLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          notificationCount={unreadCount}
          showBackButton={isDetailView}
          onBack={isDetailView ? handleBackToTrips : undefined}
          pageTitle={isDetailView && selectedTrip ? selectedTrip.routeName : undefined}
        >
          {activeTab === 'home' && (
            <CommuterHome trips={trips} onTripSelect={handleTripSelect} />
          )}
          {activeTab === 'trip-details' && selectedTrip && (
            <TripDetails
              trip={selectedTrip}
              onBack={handleBackToTrips}
              onBookTrip={handleBookTrip}
            />
          )}
          {activeTab === 'my-trips' && (
            <MyTrips trips={trips.slice(0, 3)} />
          )}
          {activeTab === 'notifications' && (
            <Notifications
              notifications={notifications.filter((n: Notification) => n.userId === currentUser.id)}
              onMarkAsRead={handleMarkAsRead}
            />
          )}
          {activeTab === 'profile' && (
            <Profile user={currentUser} onLogout={handleLogout} />
          )}
        </CommuterLayout>
        <Toaster position="top-right" />
      </>
    );
  }

  // Driver Portal
  if (selectedRole === 'driver') {
    const driverTrips = trips.filter((t: Trip) => t.driverId === currentUser.id);
    const driverRequests = requests.filter((r: TripRequest) =>
      driverTrips.some((t: Trip) => t.id === r.tripId)
    );
    const unreadCount = notifications.filter((n: Notification) => !n.read && n.userId === currentUser.id).length;
    const pendingRequests = driverRequests.filter((r: TripRequest) => r.status === 'pending').length;

    return (
      <>
        <DriverLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          notificationCount={unreadCount}
          pendingRequests={pendingRequests}
        >
          {activeTab === 'dashboard' && (
            <DriverDashboard trips={driverTrips} requests={driverRequests} />
          )}
          {activeTab === 'my-trips' && (
            <MyTrips trips={driverTrips} />
          )}
          {activeTab === 'requests' && (
            <TripRequests
              requests={driverRequests}
              trips={trips}
              onApprove={handleApproveRequest}
              onReject={handleRejectRequest}
            />
          )}
          {activeTab === 'vehicles' && (
            <VehicleManagement
              vehicles={mockVehicles.filter((v: Vehicle) => v.driverId === currentUser.id)}
              onAddVehicle={() => toast.info('Add vehicle feature')}
            />
          )}
          {activeTab === 'notifications' && (
            <Notifications
              notifications={notifications.filter((n: Notification) => n.userId === currentUser.id)}
              onMarkAsRead={handleMarkAsRead}
            />
          )}
          {activeTab === 'profile' && (
            <Profile user={currentUser} onLogout={handleLogout} />
          )}
        </DriverLayout>
        <Toaster position="top-right" />
      </>
    );
  }

  // Admin Portal
  if (selectedRole === 'admin') {
    // Only allow valid admin tabs
    const validAdminTabs = [
      'dashboard', 'drivers', 'vehicles', 'trips', 'settings'
    ];
    const safeTab = validAdminTabs.includes(activeTab) ? activeTab : 'dashboard';
    return (
      <>
        <AdminLayout
          activeTab={safeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        >
          {safeTab === 'dashboard' && (
            <AdminDashboard
              analytics={mockAnalytics}
              revenueData={mockRevenueData}
              occupancyData={mockOccupancyData}
            />
          )}
          {safeTab === 'drivers' && (
            <UserManagement users={mockDrivers} userType="drivers" />
          )}
          {safeTab === 'vehicles' && (
            <VehicleManagement
              vehicles={mockVehicles}
              onAddVehicle={() => toast.info('Add vehicle feature')}
            />
          )}
          {safeTab === 'trips' && (
            <MyTrips trips={trips} />
          )}
          {/* Financials tab removed as requested */}
          {safeTab === 'settings' && (
            <Profile user={currentUser} onLogout={handleLogout} />
          )}
        </AdminLayout>
        <Toaster position="top-right" />
      </>
    );
  }

  // Fallback UI if nothing matches
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}>
      Something went wrong. Please refresh or check console for errors.
    </div>
  );
}

export default App;
