import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flame, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navItems = [
  { label: "Bookings", path: "/admin-dashboard" },
  { label: "Donation Records", path: "/admin-donations" },
  { label: "Expenses", path: "/admin-expenses" },
];

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const renderLogoutButton = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-white shadow-sm transition-all hover:from-red-600 hover:to-red-700">
          <LogOut size={18} className="shrink-0" />
          <span className="font-medium tracking-wide">Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out from the Admin panel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl px-4 py-2 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="rounded-xl bg-gradient-primary p-2 shadow-temple">
              <Flame className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="rozha-one-regular truncate text-base font-bold text-foreground sm:text-lg">
                श्री सिद्ध बाबा धाम
              </h1>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                पावन मंदिर, मड़ेली
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={mobileOpen}
            aria-controls="admin-navigation-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-foreground shadow-sm transition hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="admin-navigation-menu"
            aria-label="Admin navigation"
            className="absolute right-4 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] space-y-1 rounded-xl border border-border bg-white p-3 shadow-xl sm:right-6"
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-orange-100 text-primary"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {renderLogoutButton()}
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
