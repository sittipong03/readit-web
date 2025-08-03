import React, { useEffect, useState } from "react";
import nothing from "@/src/picture/nothing.png";
import { getMyPurchaseHistory } from "../../../api/orderApi"; // 1. Import API
import { useNavigate } from "react-router-dom";

// ... (ฟังก์ชัน formatDate และ statusClasses เหมือนเดิม) ...

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

const statusClasses = {
  PENDING: "text-yellow-600 border-yellow-500 bg-yellow-100",
  PROCESSING: "text-blue-600 border-blue-500 bg-blue-100",
  SHIPPED: "text-purple-600 border-purple-500 bg-purple-100",
  DELIVERED: "text-green-600 border-green-500 bg-green-100",
  CANCELLED: "text-gray-600 border-gray-500 bg-gray-100",
  REFUNDED: "text-red-600 border-red-500 bg-red-100",
};

export default function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await getMyPurchaseHistory();
        setPurchases(response.data.orders || []);
      } catch (err) {
        setError("ไม่สามารถโหลดประวัติการสั่งซื้อได้");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  if (loading) return <div>Loading purchase history...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const totalPages = Math.ceil(purchases.length / pageSize);
  const paginated = purchases.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="text-headlineMedium font-header text-text-primary">
        Purchase History
      </h1>

      <div className="bg-paper-elevation-6 shadow-card-3d flex min-h-[480px] flex-col rounded-2xl p-6">
        {/* ตารางยืดเต็มพื้นที่บน */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
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
              {paginated.length > 0 ? (
                paginated.map((p) => (
                  <tr
                    key={p.id}
                    className="cursor-pointer border-t border-neutral-300 hover:bg-neutral-100"
                    onClick={() => navigate(`/setting/purchases/${p.id}`)}
                  >
                    <td className="text-body-2 text-text-primary py-4 font-mono text-xs">
                      #{p.id.slice(-8)}
                    </td>
                    <td className="py-4">
                      <div className="flex -space-x-4">
                        {p.items.map((item) => (
                          <img
                            key={item.id}
                            src={
                              item.product.book?.edition[0]?.coverImage ||
                              "https://via.placeholder.com/40x56"
                            }
                            alt={item.product.book?.title}
                            className="h-14 w-10 rounded border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`text-body-3 inline-block rounded-full border px-3 py-1 font-semibold ${
                          statusClasses[p.status] ||
                          "text-text-primary border-neutral-300"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-body-2 text-text-primary py-4">
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="text-body-2 text-text-primary py-4 font-semibold">
                      ฿{parseFloat(p.totalAmount).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : purchases.length === 0 ? (
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
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <div>No orders on this page.</div>
                  </td>
                </tr>
              )}
              {/* เติมช่องว่างเพื่อให้ความสูงขั้นต่ำอยู่ครบ (ถ้าจำเป็น) */}
              {paginated.length > 0 && paginated.length < pageSize && (
                <tr
                  style={{ height: `${(pageSize - paginated.length) * 72}px` }}
                >
                  <td colSpan={5} />
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination อยู่ด้านล่างสุดด้วย mt-auto */}
        {totalPages > 1 && (
          <div className="text-body-2 text-text-secondary mt-auto flex items-center justify-end space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={page === 1}
              className="px-2 py-1 disabled:opacity-50"
            >
              &#171;
            </button>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-2 py-1 disabled:opacity-50"
            >
              &#8249;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                aria-current={page === p ? "page" : undefined}
                className={`cursor-pointer rounded-full px-3 py-1 ${
                  page === p
                    ? "bg-primary-main text-white"
                    : "border border-neutral-300"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-2 py-1 disabled:opacity-50"
            >
              &#8250;
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
              className="px-2 py-1 disabled:opacity-50"
            >
              &#187;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
