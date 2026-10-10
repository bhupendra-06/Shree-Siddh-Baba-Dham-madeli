import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Plus, X } from "lucide-react";
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

interface Expense {
  _id?: string;
  id?: string;
  title: string;
  amount: number;
  description: string;
  date?: string | number | Date;
  createdAt?: string | number | Date;
  created_at?: string | number | Date;
}

const API_BASE = "https://siddhbabatemplebackend.onrender.com/api";
const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    amount,
  );
const getExpenseDate = (expense: Expense) => {
  const value = expense.date ?? expense.createdAt ?? expense.created_at;
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("all");

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
      return;
    }

    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${API_BASE}/expenses`);
        if (!response.ok) throw new Error("Unable to load expense records.");
        const data: unknown = await response.json();
        if (!Array.isArray(data))
          throw new Error("Unexpected expenses response.");
        setExpenses(data as Expense[]);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load expense records.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  const addExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      title: String(formData.get("title")).trim(),
      amount: Number(formData.get("amount")),
      description: String(formData.get("description")).trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Unable to add expense.");
      }

      const listResponse = await fetch(`${API_BASE}/expenses`);
      if (listResponse.ok) {
        const data: unknown = await listResponse.json();
        if (Array.isArray(data)) setExpenses(data as Expense[]);
      }
      form.reset();
      setFormMessage("Expense added successfully.");
      formOpen && setFormOpen(false); // Close the form after successful submission
    } catch (submitError) {
      setFormMessage(
        submitError instanceof Error
          ? submitError.message
          : "Unable to add expense.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => {
      const matchesYear = selectedYear === "all"
        || String(getExpenseDate(expense)?.getFullYear()) === selectedYear;
      return matchesYear ? total + Number(expense.amount || 0) : total;
    },
    0,
  );
  const expenseYears = Array.from(
    new Set(
      expenses
        .map(getExpenseDate)
        .filter((date): date is Date => date !== null)
        .map((date) => date.getFullYear()),
    ),
  ).sort((a, b) => b - a);
  const filteredExpenses = expenses.filter(
    (expense) => selectedYear === "all"
      || String(getExpenseDate(expense)?.getFullYear()) === selectedYear,
  );

  const exportExpensesToExcel = () => {
    const rows = filteredExpenses.map((expense) => ({
      Title: expense.title,
      Description: expense.description,
      Date: getExpenseDate(expense)?.toLocaleDateString("en-IN") ?? "",
      "Amount (INR)": Number(expense.amount || 0),
    }));
    const headers = ["Title", "Description", "Date", "Amount (INR)"];
    const worksheet = XLSX.utils.json_to_sheet(rows);

    if (rows.length === 0) {
      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    }
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["", "", "Total", totalExpenses]],
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
    worksheet[XLSX.utils.encode_cell({ r: rows.length + 1, c: 2 })].s = {
      font: { bold: true },
    };
    worksheet[XLSX.utils.encode_cell({ r: rows.length + 1, c: 3 })].s = {
      font: { bold: true },
      numFmt: '"₹"#,##0.00',
    };
    worksheet["!cols"] = [
      { wch: 24 },
      { wch: 40 },
      { wch: 16 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `Expenses_${selectedYear === "all" ? "All_Years" : selectedYear}_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50">
      <AdminNavbar />
      <main className="mx-auto max-w-5xl px-4 py-5">
        <Card className="mb-6 p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Add an expense
            </h2>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={formOpen ? "Close expense form" : "Open expense form"}
              aria-expanded={formOpen}
              aria-controls="add-expense-form"
              title={formOpen ? "Close expense form" : "Add expense"}
              onClick={() => setFormOpen((open) => !open)}
            >
              {formOpen ? <X /> : <Plus />}
            </Button>
          </div>
          {formOpen && (
            <form
              id="add-expense-form"
              onSubmit={addExpense}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                Title
                <Input
                  name="title"
                  placeholder="Flower purchase"
                  required
                  maxLength={120}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Amount (INR)
                <Input
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="250"
                  required
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                Description
                <Textarea
                  name="description"
                  placeholder="Flowers for the temple"
                  required
                  maxLength={1000}
                />
              </label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Adding..." : "Add expense"}
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
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
          <label htmlFor="expense-year" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            Year
            <select
              id="expense-year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="min-h-10 rounded-md border border-input bg-background px-3 text-foreground"
            >
              <option value="all">All years</option>
              {expenseYears.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
          <div className="text-right">
            <span className="block text-xs font-medium text-muted-foreground">
              Total expenses ({filteredExpenses.length})
            </span>
            <strong className="text-lg text-foreground">{formatAmount(totalExpenses)}</strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={exportExpensesToExcel}
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
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-muted-foreground"
                  >
                    Loading expenses…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredExpenses.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No expense records found for this year.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense, index) => (
                  <tr
                    key={
                      expense._id ?? expense.id ?? `${expense.title}-${index}`
                    }
                    className="border-t even:bg-orange-50/60"
                  >
                    <td className="p-4 font-medium">{expense.title}</td>
                    <td className="p-4">{expense.description}</td>
                    <td className="whitespace-nowrap p-4">
                      {getExpenseDate(expense)?.toLocaleDateString("en-IN") ?? "—"}
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatAmount(expense.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
};

export default Expenses;
