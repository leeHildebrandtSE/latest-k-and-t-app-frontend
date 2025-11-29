import { ReactNode, useState } from 'react';
import { LayoutDashboard, Users, Car, Calendar, Settings, LogOut, ArrowLeft, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { SidebarLogo } from '../Logo';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  pageTitle?: string;
  user?: {
    avatar?: string;
    name?: string;
    email?: string;
  };
}

export function AdminLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout,
  showBackButton = false,
  onBack,
  pageTitle,
  user
}: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false); // For sidebar navigation
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // For avatar dropdown
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'trips', label: 'Trips', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: Calendar },
    { id: 'settings', label: 'Profile', icon: Settings }
  ];

  const handleMenuItemClick = (tabId: string) => {
    onTabChange(tabId);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="flex flex-col flex-1">
          <div className="p-6 border-b border-green-600">
            <SidebarLogo role="admin" portalName="Admin Portal" />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-800 text-white shadow-md'
                    : 'text-green-50 hover:bg-green-800/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-green-600">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-50 hover:bg-green-800 hover:text-white"
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
        <header className="bg-gradient-to-r from-green-600 to-green-500 border-b border-green-400 sticky top-0 z-40" style={{ paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 0.5rem)' }}>
          <div className="flex items-center justify-between px-4 lg:px-8 py-3 relative">
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
                    className="text-white hover:bg-green-500"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                  <img 
                    src="/k-and-t-logo2-green.png" 
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
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
              </div>
              {/* Bell Notification Button */}
              <Button variant="ghost" size="icon" className="relative text-green-700 hover:bg-green-100" onClick={() => onTabChange('notifications')}>
                <Calendar className="h-5 w-5" />
                {/* If you have a notificationCount prop, add badge here */}
                {/* {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-lg" />
                )} */}
              </Button>
              {/* Profile Avatar Dropdown - Improved */}
              <div className="relative">
                <button className="focus:outline-none" type="button" onClick={() => setProfileMenuOpen((open) => !open)}>
                  <img src={user?.avatar || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl py-6 px-6 z-50 flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={user?.avatar || "/default-avatar.png"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover" />
                      <div className="flex flex-col justify-center min-w-0">
                        <p className="font-bold text-base text-gray-900 leading-tight mb-1 truncate">{user?.name || "Admin User"}</p>
                        <p className="text-xs text-gray-500 leading-tight truncate max-w-[140px] overflow-hidden">{user?.email || "admin@yourdomain.com"}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-green-50 text-green-900 font-medium transition-all text-sm" onClick={() => { setProfileMenuOpen(false); onTabChange('settings'); }}>
                        <span className="material-icons text-base align-middle" aria-hidden="true">edit</span>
                        <span className="align-middle">Edit Profile</span>
                      </button>
                      <button className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-green-50 text-green-900 font-medium transition-all text-sm" onClick={() => { setProfileMenuOpen(false); onTabChange('account-settings'); }}>
                        <span className="material-icons text-base align-middle" aria-hidden="true">settings</span>
                        <span className="align-middle">Account Settings</span>
                      </button>
                      <button className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-all text-sm" onClick={() => { setProfileMenuOpen(false); onLogout(); }}>
                        <span className="material-icons text-base align-middle" aria-hidden="true">logout</span>
                        <span className="align-middle">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 border-t-2 border-green-400 shadow-lg z-50" style={{ paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 0.5rem)' }}>
        <div className="grid grid-cols-2 py-3">
          {[tabs[0], tabs[5]].map((tab) => (
            tab ? (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 relative transition-all ${
                  activeTab === tab.id
                    ? 'text-white scale-110'
                    : 'text-green-200 opacity-70'
                }`}
              >
                {tab.icon ? <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'drop-shadow-md' : ''}`} /> : <span className="h-5 w-5" />}
                <span className="text-xs font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabAdmin"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ) : null
          ))}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-green-700 text-white p-4 pt-[calc(var(--safe-area-inset-top,2.5rem)+1rem)] border-r-4 border-white flex flex-col">
            <div className="flex items-center justify-between py-2 px-2">
              <span>Admin Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-white hover:bg-green-600">
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
                      ? 'bg-white text-green-700 shadow-md'
                      : 'text-white hover:bg-green-700/80'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
              <div className="border-t border-green-600 my-4" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-50 hover:bg-red-600/20 transition-colors"
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
