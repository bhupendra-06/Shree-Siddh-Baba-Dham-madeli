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
} from "@/components/ui/alert-dialog"

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Flame, Search, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Check admin auth on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ Fetch bookings
  useEffect(() => {
    const fetchDevotees = async () => {
      try {
        const res = await fetch(
          "https://siddhbabatemplebackend.onrender.com/api/bookings"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
          console.log(data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Error fetching devotees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevotees();
  }, []);

  // ✅ Approve Payment
  const approvePayment = async (id: string) => {
    setApprovingId(id);
    try {
      const res = await fetch(
        `https://siddhbabatemplebackend.onrender.com/api/bookings/${id}/pay`,
        { method: "PUT" }
      );

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            (b._id || b.id) === id ? { ...b, paymentStatus: "PAID" } : b
          )
        );
      }
    } catch (err) {
      console.error("Error approving payment:", err);
      toast({
        title: "Error",
        description: "Something went wrong while approving the payment.",
      });
    } finally {
      setApprovingId(null);
    }
  };

  // ✅ Delete Booking
  const deleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const res = await fetch(
        `https://siddhbabatemplebackend.onrender.com/api/bookings/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => (b._id || b.id) !== id));
        toast({
          title: "Booking Deleted",
          description: "The booking has been deleted successfully.",
          // variant: "destructive",
        });
      } else {
        const errorMsg = await res.text();
        alert("Error: " + errorMsg);
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  // ✅ Filter
  const filtered = bookings.filter((b) => {
    const query = search.toLowerCase().trim();
    return (
      b.name.toLowerCase().includes(query) ||
      String(b.whatsappNumber).toLowerCase().includes(query) ||
      String(b.contactNumber).toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 mt-14 p-4 px-0">
      {/* Header */}
      <div className="flex items-center justify-between bg-white mb-6 px-4 lg:px-10 gap-3 fixed top-0 w-full z-10 border-b border-border/50 py-2">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-gradient-primary rounded-lg shadow-temple hover:shadow-diya transition-all duration-300">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="rozha-one-regular font-display font-bold text-lg text-foreground">
              श्री सिद्ध बाबा धाम
            </h1>
            <p className="text-xs text-muted-foreground">पावन मंदिर, मड़ेली</p>
          </div>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 ease-in-out hover:shadow-lg active:scale-95">
              <LogOut size={18} className="shrink-0" />
              <span className="hidden sm:inline font-medium tracking-wide">
                Logout
              </span>
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
              <AlertDialogAction onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <h1 className="p-4 text-2xl sm:text-3xl font-bold text-gray-800 text-center">
        Admin Dashboard - Diya Bookings
      </h1>

      {/* Search */}
      <div className="max-w-2xl mx-4 md:mx-auto mb-6 flex items-center gap-2 relative">
        <Input
          placeholder="Search by name or WhatsApp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="text-gray-500 absolute right-2" />
      </div>

      {/* Table */}
      <Card className="overflow-scroll scrollbar-hide min-h-48 shadow-xl rounded-none mb-10 md:rounded-lg lg:mx-10 ">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="p-3 w-10 border-r">No.</th>
              <th className="p-3 px-6 min-w-36">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Contact No.</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3 min-w-28">Diya Type</th>
              <th className="p-3">Payment</th>
              <th className="p-3 min-w-64 md:w-28 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-3 text-center text-gray-500">
                  Loading bookings...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-3 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map((b, index) => (
                <tr
                  key={b._id || b.id}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="p-3 border-x text-center">{index + 1}.</td>
                  <td className="p-3 px-6 font-medium">{b.name}</td>
                  <td className="p-3">{b.address}</td>
                  <td className="p-3 text-blue-600">{b.contactNumber}</td>
                  <td className="p-3 text-blue-600">{b.whatsappNumber}</td>
                  <td className="p-3">{b.diyaType}</td>
                  <td className="p-3">
                    <Badge
                      className={`px-3 py-1 rounded-full text-xs font-semibold hover:bg-transparent ${
                        b.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {b.paymentStatus === "PAID" ? "Approved ✔" : "Pending.. "}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    {b.paymentStatus !== "PAID" ? (
                      <Button
                        onClick={() => approvePayment(b._id || b.id)}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 active:bg-transparent text-white font-medium rounded-sm px-4 shadow-md transition-all"
                      >
                        {approvingId === (b._id || b.id)
                          ? "Waiting..."
                          : "Approve"}
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="bg-gray-200 text-gray-500 font-medium rounded-sm w-24 px-4 shadow-none cursor-not-allowed"
                      >
                        Done
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteBooking(b._id || b.id)}
                      className="ml-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 active:bg-transparent text-white font-medium rounded-sm px-4 shadow-md transition-all"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
