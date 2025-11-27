import { ReactNode, useState } from 'react';
import { LayoutDashboard, Calendar, Car, Bell, User, LogOut, ClipboardList, ArrowLeft, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SidebarLogo } from '../Logo';

interface DriverLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  notificationCount?: number;
  pendingRequests?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  pageTitle?: string;
  user?: {
    avatar?: string;
    name?: string;
    email?: string;
  };
}

export function DriverLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout,
  notificationCount = 0,
  pendingRequests = 0,
  showBackButton = false,
  onBack,
  pageTitle,
  user
}: DriverLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-trips', label: 'My Trips', icon: Calendar },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleMenuItemClick = (tabId: string) => {
    onTabChange(tabId);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gradient-to-br from-blue-700 to-blue-800 text-white">
        <div className="flex flex-col flex-1">
          <div className="p-6 border-b border-blue-600">
            <SidebarLogo role="driver" portalName="Driver Portal" />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                  activeTab === tab.id
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'text-blue-50 hover:bg-blue-800/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.id === 'notifications' && notificationCount > 0 && (
                  <Badge className="ml-auto bg-red-500">{notificationCount}</Badge>
                )}
                {tab.id === 'requests' && pendingRequests > 0 && (
                  <Badge className="ml-auto bg-amber-500">{pendingRequests}</Badge>
                )}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-blue-600">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-50 hover:bg-blue-800 hover:text-white"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-blue-700 to-blue-600 border-b border-blue-500 sticky top-0 z-40" style={{ paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 0.5rem)' }}>
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              {showBackButton && onBack ? (
                <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="flex items-center gap-3 lg:hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMenuOpen(true)}
                    className="text-white hover:bg-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                  <img 
                    src="/k-and-t-logo2-blue.png" 
                    alt="K&T Logo" 
                    className="w-10 h-10 object-cover rounded-full drop-shadow-md"
                  />
                  <h1 className="font-bold text-white text-lg drop-shadow-sm">K & T Transport</h1>
                </div>
              )}
              {showBackButton && onBack && (
                <h2 className="font-semibold lg:hidden">{pageTitle || 'Details'}</h2>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              {showBackButton && onBack && (
                <Button variant="ghost" onClick={onBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <h2 className="text-xl font-semibold text-white">
                {pageTitle || tabs.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-blue-600" onClick={() => onTabChange('notifications')}>
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-lg" />
                )}
              </Button>
              {/* Profile Avatar Dropdown */}
              <div className="relative group">
                <button className="focus:outline-none" type="button">
                  <img src={user?.avatar || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-4 px-4 z-50 hidden group-hover:block">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={user?.avatar || "/default-avatar.png"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name || "Driver User"}</p>
                      <p className="text-sm text-gray-500">{user?.email || "driver@yourdomain.com"}</p>
                    </div>
                  </div>
                    <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-900 font-medium mb-2" onClick={() => onTabChange('profile')}>Edit Profile</button>
                  <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-900 font-medium mb-2">Account Settings</button>
                  <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-50 text-red-600 font-medium">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8" style={{ paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 6rem)' }}>
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-800 border-t-2 border-blue-500 shadow-lg z-50" style={{ paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 0.5rem)' }}>
        <div className="grid grid-cols-3 py-3">
          {[tabs[0], tabs[1], tabs[5]].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 relative transition-all ${
                activeTab === tab.id
                  ? 'text-white scale-110'
                  : 'text-blue-200 opacity-70'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'drop-shadow-md' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
              {tab.id === 'notifications' && notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              {tab.id === 'requests' && pendingRequests > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              )}
              {/* Removed white indicator for active tab */}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-blue-700 text-white p-4 pt-[calc(var(--safe-area-inset-top,2.5rem)+1rem)] flex flex-col">
            <div className="flex items-center justify-between py-2 px-2">
              <span>Driver Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-white hover:bg-blue-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleMenuItemClick(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-700 shadow-md'
                      : 'text-white hover:bg-blue-700/80'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
              <div className="border-t border-blue-600 my-4" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-50 hover:bg-red-600/20 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
