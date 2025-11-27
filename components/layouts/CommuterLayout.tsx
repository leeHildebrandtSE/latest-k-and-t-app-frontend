import { ReactNode, useState } from 'react';
import { Home, Calendar, Bell, User, LogOut, ArrowLeft, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { SidebarLogo } from '../Logo';

interface CommuterLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  notificationCount?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  pageTitle?: string;
  user?: {
    avatar?: string;
    name?: string;
    email?: string;
  };
}

export function CommuterLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout,
  notificationCount = 0,
  showBackButton = false,
  onBack,
  pageTitle,
  user
}: CommuterLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-trips', label: 'My Trips', icon: Calendar },
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
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="flex flex-col flex-1">
          <div className="p-6 border-b border-orange-500">
            <SidebarLogo role="commuter" portalName="Commuter Portal" />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                  activeTab === tab.id
                    ? 'bg-orange-700 text-white shadow-md'
                    : 'text-orange-50 hover:bg-orange-700/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.id === 'notifications' && notificationCount > 0 && (
                  <Badge className="ml-auto bg-red-500">{notificationCount}</Badge>
                )}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-orange-500">
            <Button
              variant="ghost"
              className="w-full justify-start text-orange-50 hover:bg-orange-700 hover:text-white"
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
        <header className="bg-gradient-to-r from-orange-600 to-orange-500 border-b border-orange-400 sticky top-0 z-40" style={{ paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 0.5rem)' }}>
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
                    className="text-white hover:bg-orange-500"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                  <img 
                    src="/k-and-t-logo2-orange.png" 
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
              <Button variant="ghost" size="icon" className="relative lg:hidden text-white hover:bg-orange-500" onClick={() => onTabChange('notifications')}>
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
                      <p className="font-semibold text-gray-900">{user?.name || "Commuter User"}</p>
                      <p className="text-sm text-gray-500">{user?.email || "commuter@yourdomain.com"}</p>
                    </div>
                  </div>
                    <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-orange-50 text-orange-900 font-medium mb-2" onClick={() => onTabChange('profile')}>Edit Profile</button>
                  <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-orange-50 text-orange-900 font-medium mb-2">Account Settings</button>
                  <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-50 text-red-600 font-medium" onClick={onLogout}>Logout</button>
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-700 border-t-2 border-orange-400 shadow-lg z-50" style={{ paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 0.5rem)' }}>
        <div className="flex items-center justify-around py-3">
          {[tabs[0], tabs[3]].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 relative transition-all ${
                activeTab === tab.id
                  ? 'text-white scale-110'
                  : 'text-orange-200 opacity-70'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'drop-shadow-md' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabCommuter"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.id === 'notifications' && notificationCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {/* Simple mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-orange-700 text-white p-4 pt-[calc(var(--safe-area-inset-top,2.5rem)+1rem)] border-r-4 border-white flex flex-col">
            <div className="flex items-center justify-between py-2 px-2">
              <span>Commuter Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-white hover:bg-orange-600">
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
                      ? 'bg-white text-orange-700 shadow-md'
                      : 'text-white hover:bg-orange-700/80'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
              <div className="border-t border-orange-500 my-4" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-orange-50 hover:bg-red-600/20 transition-colors"
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
