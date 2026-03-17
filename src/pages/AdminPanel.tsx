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

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Flame, Search, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
// import * as XLSXStyle from "xlsx-style";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [season, setSeason] = useState("CHAITRA");

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
          if (data.length > 0) {
            const latestYear = Math.max(...data.map((b) => b.year));
            setYear((prevYear) => (prevYear ? prevYear : String(latestYear)));
          }
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
    const interval = setInterval(fetchDevotees, 5000);
    return () => clearInterval(interval);
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
      (b.name.toLowerCase().includes(query) ||
        String(b.whatsappNumber).toLowerCase().includes(query) ||
        String(b.contactNumber).toLowerCase().includes(query)) &&
      (year ? b.year == year : true) &&
      (season ? b.season === season : true)
    );
  });

  const uniqueYears = Array.from(new Set(bookings.map((b) => b.year))).sort(
    (a, b) => b - a
  );
  const uniqueSeasons = Array.from(new Set(bookings.map((b) => b.season)));


  const exportToExcel = () => {
    const rows = filtered.map((b, i) => ({
      "No.": i + 1,
      Name: b.name,
      Address: b.address,
      "Contact No.": b.contactNumber,
      WhatsApp: b.whatsappNumber,
      "Diya Type": b.diyaType,
      Season: b.season,
      Year: b.year,
      Payment: b.paymentStatus === "PAID" ? "Approved" : "Pending",
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Title
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [[`Diya Bookings Report for ${season} ${year}`]],
      {
        origin: "A1",
      }
    );
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: Object.keys(rows[0]).length - 1 } },
    ];

    // Style Title
    worksheet["A1"].s = {
      font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "FF6600" } },
    };

    // Style Headers
    Object.keys(rows[0]).forEach((key, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: 1, c: colIndex });
      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "FFA500" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
    });

    // Auto column widths
    worksheet["!cols"] = Object.keys(rows[0]).map((key) => ({
      wch:
        Math.max(
          key.length,
          ...rows.map((row) => String(row[key] || "").length)
        ) + 2,
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    // Save
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Bookings_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

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
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded-md"
        >
          {uniqueYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Seasons</option>
          {uniqueSeasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {/* <Search className="text-gray-500 absolute right-2" /> */}
      </div>

      <div className="flex justify-center md:justify-end gap-2 mb-4 lg:mx-10">
        <Button
          onClick={exportToExcel}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
        >
          Export to Excel
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-scroll scrollbar-hide min-h-48 shadow-xl rounded-none mb-10 md:rounded-lg lg:mx-10 ">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="p-4 w-10 border-r">No.</th>
              <th className="p-4 px-6 min-w-36">Name</th>
              <th className="p-4">Address</th>
              <th className="p-4">Contact No.</th>
              <th className="p-4">WhatsApp</th>
              <th className="p-4 min-w-28">Diya Type</th>
              <th className="p-4">Payment</th>
              <th className="p-4 min-w-52 md:w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  <div className="grid gap-4 p-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-12 text-xl p-2 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
                      ></div>
                    ))}
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-4 text-center text-xl text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map((b, index) => (
                <tr
                  key={b._id || b.id}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="p-4 border-x text-center">{index + 1}.</td>
                  <td className="p-4 px-6 font-medium">{b.name}</td>
                  <td className="p-4">{b.address}</td>
                  <td className="p-4 text-blue-600">
                    <a
                      href={`tel:+91${b.contactNumber}`}
                      className="hover:underline"
                    >
                      {b.contactNumber}
                    </a>
                  </td>

                  <td className="p-4 text-green-600">
                    <a
                      href={`https://wa.me/91${b.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {b.whatsappNumber}
                    </a>
                  </td>

                  <td className="p-4">{b.diyaType}</td>
                  <td className="p-4">
                    <Badge
                      className={`px-3 py-1 whitespace-nowrap rounded-full text-xs font-semibold hover:bg-transparent ${
                        b.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {b.paymentStatus === "PAID" ? "Approved ✔" : "Pending.. "}
                    </Badge>
                  </td>
                  <td className="p-4 text-center flex">
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
                    {/* DELETE BUTTON */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="flex items-center gap-2 ml-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 active:bg-transparent text-white">
                          <span className=" font-medium tracking-wide">
                            Delete
                          </span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This Booking will be deleted parmanently.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteBooking(b._id || b.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
