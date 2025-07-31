import React from "react";
import nothing from "@/src/picture/nothing.png";

// Helper to format date as "DD MMM YYYY HH:mm"
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} ${time}`;
}

// Map status to utility classes (ensure these exist in index.css)
const statusClasses = {
  Pending: "text-status-pending border-status-pending",
  Cancelled: "text-status-disabled border-status-disabled",
  Paid: "text-status-paid border-status-paid",
  Preparing: "text-status-preparing border-status-preparing",
  Delivered: "text-status-delivered border-status-delivered",
};

export default function PurchaseHistoryPage({ purchases = [] }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* Page Title */}
      <h1 className="text-headlineMedium font-header text-text-primary">
        Purchase History
      </h1>

      {/* Card Container */}
      <div className="bg-paper-elevation-6 shadow-card-3d rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="text-body-2 text-text-secondary uppercase">
              <tr>
                <th className="py-3">ID</th>
                <th className="py-3">Books</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
                <th className="py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length > 0 ? (
                purchases.map((p) => (
                  <tr key={p.id} className="border-t border-neutral-300">
                    <td className="text-body-2 text-text-primary py-4">
                      {p.id}
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        {p.books.map((book) => (
                          <img
                            key={book.isbn}
                            src={book.coverUrl}
                            alt={book.title}
                            className="h-14 w-10 rounded object-cover"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`text-body-3 inline-block rounded-full border px-3 py-1 ${
                          statusClasses[p.status] ||
                          "text-text-primary border-neutral-300"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-body-2 text-text-primary py-4">
                      {formatDate(p.date)}
                    </td>
                    <td className="text-body-2 text-text-primary py-4">
                      {p.total}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16">
                    <div className="text-center">
                      <img
                        src={nothing}
                        alt="No transactions"
                        className="mx-auto h-40 w-40"
                      />
                      <h2 className="text-headlineMedium font-header text-text-primary mt-4">
                        Nothing here
                      </h2>
                      <p className="text-body-2 text-text-secondary mt-2">
                        No transactions were found.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {purchases.length > 0 && (
            <div className="text-body-2 text-text-secondary mt-6 flex items-center justify-end space-x-2">
              <button disabled className="px-2 py-1 disabled:opacity-50">
                &#171;
              </button>
              <button disabled className="px-2 py-1 disabled:opacity-50">
                &#8249;
              </button>
              <span className="bg-primary-main rounded-full px-3 py-1 text-white">
                1
              </span>
              <button className="px-2 py-1">2</button>
              <button className="px-2 py-1">&#8250;</button>
              <button className="px-2 py-1">&#187;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
