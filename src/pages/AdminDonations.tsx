import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, MessageCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

interface Donation {
  _id?: string;
  id?: string;
  donorName: string;
  contactNumber: string;
  amount: number;
  purpose: string;
  date?: string | number | Date;
  createdAt?: string | number | Date;
  created_at?: string | number | Date;
}

const API_BASE = "https://siddhbabatemplebackend.onrender.com/api";
const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    amount,
  );
const getWhatsAppNumber = (contactNumber: string) => {
  const digits = contactNumber.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};
const getDonationDate = (donation: Donation) => {
  const value = donation.date ?? donation.createdAt ?? donation.created_at;
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const AdminDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("all");
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const [editValues, setEditValues] = useState({
    donorName: "",
    contactNumber: "",
    amount: "",
    purpose: "",
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
      return;
    }

    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_BASE}/donations`);
        if (!response.ok) throw new Error("Unable to load donation records.");
        const data: unknown = await response.json();
        if (!Array.isArray(data))
          throw new Error("Unexpected donation response.");
        setDonations(data as Donation[]);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load donation records.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [navigate]);

  const addDonation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      donorName: String(formData.get("donorName")).trim(),
      contactNumber: String(formData.get("contactNumber")).trim(),
      amount: Number(formData.get("amount")),
      purpose: String(formData.get("purpose")).trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Unable to add donation.");
      }

      const listResponse = await fetch(`${API_BASE}/donations`);
      if (listResponse.ok) {
        const data: unknown = await listResponse.json();
        if (Array.isArray(data)) setDonations(data as Donation[]);
      }
      form.reset();
      setFormMessage("Donation added successfully.");
      formOpen && setFormOpen(false); // Close the form after successful submission
    } catch (submitError) {
      setFormMessage(
        submitError instanceof Error
          ? submitError.message
          : "Unable to add donation.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDonation = (donation: Donation) => {
    setEditingDonation(donation);
    setEditValues({
      donorName: donation.donorName,
      contactNumber: donation.contactNumber,
      amount: String(donation.amount),
      purpose: donation.purpose,
    });
    setActionMessage("");
  };

  const saveDonationEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = editingDonation?._id ?? editingDonation?.id;
    if (!id) return;
    setIsSavingEdit(true);
    setActionMessage("");
    const payload = {
      donorName: editValues.donorName.trim(),
      contactNumber: editValues.contactNumber.trim(),
      amount: Number(editValues.amount),
      purpose: editValues.purpose.trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/donations/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Unable to update donation.");
      }
      setDonations((current) => current.map((donation) =>
        (donation._id ?? donation.id) === id ? { ...donation, ...payload } : donation,
      ));
      setEditingDonation(null);
      setActionMessage("Donation updated successfully.");
    } catch (updateError) {
      setActionMessage(updateError instanceof Error ? updateError.message : "Unable to update donation.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const deleteDonation = async (donation: Donation) => {
    const id = donation._id ?? donation.id;
    if (!id) return;
    setActionMessage("");
    try {
      const response = await fetch(`${API_BASE}/donations/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Unable to delete donation.");
      }
      setDonations((current) => current.filter((item) => (item._id ?? item.id) !== id));
      setActionMessage("Donation deleted successfully.");
    } catch (deleteError) {
      setActionMessage(deleteError instanceof Error ? deleteError.message : "Unable to delete donation.");
    }
  };

  const totalDonations = donations.reduce(
    (total, donation) => {
      const matchesYear = selectedYear === "all"
        || String(getDonationDate(donation)?.getFullYear()) === selectedYear;
      return matchesYear ? total + Number(donation.amount || 0) : total;
    },
    0,
  );
  const donationYears = Array.from(
    new Set(
      donations
        .map(getDonationDate)
        .filter((date): date is Date => date !== null)
        .map((date) => date.getFullYear()),
    ),
  ).sort((a, b) => b - a);
  const filteredDonations = donations.filter(
    (donation) => selectedYear === "all"
      || String(getDonationDate(donation)?.getFullYear()) === selectedYear,
  );

  const exportDonationsToExcel = () => {
    const rows = filteredDonations.map((donation) => ({
      Donor: donation.donorName,
      "Contact Number": donation.contactNumber,
      Purpose: donation.purpose,
      Date: getDonationDate(donation)?.toLocaleDateString("en-IN") ?? "",
      "Amount (INR)": Number(donation.amount || 0),
    }));
    const headers = ["Donor", "Contact Number", "Purpose", "Date", "Amount (INR)"];
    const worksheet = XLSX.utils.json_to_sheet(rows);

    if (rows.length === 0) {
      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    }
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["", "", "", "Total", totalDonations]],
      { origin: `A${rows.length + 2}` },
    );
    headers.forEach((_, columnIndex) => {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: columnIndex })];
      if (cell) {
        cell.s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "F97316" } },
        };
      }
    });
    worksheet[XLSX.utils.encode_cell({ r: rows.length + 1, c: 3 })].s = {
      font: { bold: true },
    };
    worksheet[XLSX.utils.encode_cell({ r: rows.length + 1, c: 4 })].s = {
      font: { bold: true },
      numFmt: '"₹"#,##0.00',
    };
    worksheet["!cols"] = [
      { wch: 24 },
      { wch: 18 },
      { wch: 30 },
      { wch: 16 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");
    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `Donations_${selectedYear === "all" ? "All_Years" : selectedYear}_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50">
      <AdminNavbar />
      <main className="mx-auto max-w-5xl px-4 py-5">
        <Card className="mb-6 p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Add a donation
            </h2>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={
                formOpen ? "Close donation form" : "Open donation form"
              }
              aria-expanded={formOpen}
              aria-controls="add-donation-form"
              title={formOpen ? "Close donation form" : "Add donation"}
              onClick={() => setFormOpen((open) => !open)}
            >
              {formOpen ? <X /> : <Plus />}
            </Button>
          </div>
          {formOpen && (
            <form
              id="add-donation-form"
              onSubmit={addDonation}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <label className="grid gap-1.5 text-sm font-medium">
                Donor name
                <Input
                  name="donorName"
                  placeholder="Asha Sharma"
                  required
                  maxLength={120}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Contact number
                <Input
                  name="contactNumber"
                  type="tel"
                  inputMode="numeric"
                  placeholder="9876543210"
                  required
                  maxLength={20}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Amount (INR)
                <Input
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="501"
                  required
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Purpose
                <Textarea
                  name="purpose"
                  placeholder="Temple donation"
                  required
                  maxLength={500}
                />
              </label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Adding..." : "Add donation"}
                </Button>
                {formMessage && (
                  <p role="status" className="text-sm text-muted-foreground">
                    {formMessage}
                  </p>
                )}
              </div>
            </form>
          )}
        </Card>
        {formMessage && (
          <p role="status" className="mt-2 text-sm text-muted-foreground">
            {formMessage}
          </p>
        )}
        {actionMessage && (
          <p role="status" className="mb-3 text-sm text-muted-foreground">
            {actionMessage}
          </p>
        )}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
          <label htmlFor="donation-year" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            Year
            <select
              id="donation-year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="min-h-10 rounded-md border border-input bg-background px-3 text-foreground"
            >
              <option value="all">All years</option>
              {donationYears.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
          <div className="text-right">
            <span className="block text-xs font-medium text-muted-foreground">
              Total donations ({filteredDonations.length})
            </span>
            <strong className="text-lg text-foreground">{formatAmount(totalDonations)}</strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={exportDonationsToExcel}
            disabled={loading || Boolean(error)}
            className="w-full shrink-0 border border-border bg-white text-foreground hover:bg-muted sm:w-auto"
          >
            <Download aria-hidden="true" />
            Export Excel
          </Button>
        </div>
        <Card className="overflow-x-auto shadow-lg">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-orange-100 text-gray-700">
              <tr>
                <th className="p-4">Donor</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-muted-foreground"
                  >
                    Loading donations…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No donation records found for this year.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((donation, index) => (
                  <tr
                    key={
                      donation._id ??
                      donation.id ??
                      `${donation.donorName}-${index}`
                    }
                    className="border-t even:bg-orange-50/60"
                  >
                    <td className="p-4 font-medium">{donation.donorName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${donation.contactNumber}`}
                          className="whitespace-nowrap text-foreground hover:text-primary hover:underline"
                          aria-label={`Call ${donation.donorName} at ${donation.contactNumber}`}
                        >
                          {donation.contactNumber}
                        </a>
                        <a
                          href={`https://wa.me/${getWhatsAppNumber(donation.contactNumber)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-green-700 transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                          aria-label={`Message ${donation.donorName} on WhatsApp`}
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                    <td className="p-4">{donation.purpose}</td>
                    <td className="whitespace-nowrap p-4">
                      {getDonationDate(donation)?.toLocaleDateString("en-IN") ?? "—"}
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatAmount(donation.amount)}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="Edit donation"
                          aria-label={`Edit donation from ${donation.donorName}`}
                          disabled={!(donation._id ?? donation.id)}
                          onClick={() => openEditDonation(donation)}
                        >
                          <Pencil aria-hidden="true" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              title="Delete donation"
                              aria-label={`Delete donation from ${donation.donorName}`}
                              disabled={!(donation._id ?? donation.id)}
                              className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 aria-hidden="true" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete donation?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the donation from {donation.donorName}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteDonation(donation)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
        <Dialog
          open={Boolean(editingDonation)}
          onOpenChange={(open) => !open && setEditingDonation(null)}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit donation</DialogTitle>
              <DialogDescription>Update the donation details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={saveDonationEdit} className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-medium">
                Donor name
                <Input
                  value={editValues.donorName}
                  onChange={(event) => setEditValues({ ...editValues, donorName: event.target.value })}
                  required
                  maxLength={120}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Contact number
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={editValues.contactNumber}
                  onChange={(event) => setEditValues({ ...editValues, contactNumber: event.target.value })}
                  required
                  maxLength={20}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Amount (INR)
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={editValues.amount}
                  onChange={(event) => setEditValues({ ...editValues, amount: event.target.value })}
                  required
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Purpose
                <Textarea
                  value={editValues.purpose}
                  onChange={(event) => setEditValues({ ...editValues, purpose: event.target.value })}
                  required
                  maxLength={500}
                />
              </label>
              <DialogFooter>
                <Button type="submit" disabled={isSavingEdit}>
                  {isSavingEdit ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDonations;
