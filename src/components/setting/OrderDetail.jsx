// OrderDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail } from "../../api/orderApi";

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return `${d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })} | ${d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;
}

const statusColorMap = {
  PENDING: "border-yellow-500 text-yellow-600 bg-yellow-100",
  PROCESSING: "border-blue-500 text-blue-600 bg-blue-100",
  SHIPPED: "border-purple-500 text-purple-600 bg-purple-100",
  DELIVERED: "border-green-500 text-green-600 bg-green-100",
  CANCELLED: "border-gray-500 text-gray-600 bg-gray-100",
  REFUNDED: "border-red-500 text-red-600 bg-red-100",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getOrderDetail(id);
        setOrder(res.data.order);
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.statusText ||
          "ไม่พบรายละเอียดคำสั่งซื้อ";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading)
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="body-2">Loading order...</div>
      </div>
    );
  if (error)
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="body-2 text-red-500">{error}</div>
      </div>
    );
  if (!order) return null;

  const shipping = order.user?.userAddress;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="h5 font-header text-text-primary">
            Purchase History{" "}
            <span className="text-body-small text-text-secondary font-mono">
              / {order.id.slice(-8)}
            </span>
          </h1>
        </div>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="font-button rounded-full border border-neutral-300 px-4 py-2 text-sm"
            style={{ background: "none" }}
          >
            &larr; Back
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-paper-elevation-6 shadow-card-3d rounded-2xl p-8">
        {/* Top Info */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="grid flex-1 grid-cols-2 gap-6">
            <div>
              <div className="body-2 text-text-secondary">Transaction ID:</div>
              <div className="font-semibold">{order.id.slice(-8)}</div>
            </div>
            <div>
              <div className="body-2 text-text-secondary">Status:</div>
              <div>
                <span
                  className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${
                    statusColorMap[order.status] ||
                    "text-text-primary border-neutral-300 bg-white"
                  }`}
                  style={{ minWidth: 88 }}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-6 text-right">
            <div>
              <div className="body-2 text-text-secondary">Date:</div>
              <div className="font-medium">
                {formatDateTime(order.createdAt)}
              </div>
            </div>
            <div>
              <div className="body-2 text-text-secondary">
                Type of transaction:
              </div>
              <div className="font-semibold">
                {order.payment?.[0]?.paymentMethod || "—"}
              </div>
            </div>
            <div className="col-span-2 mt-2 text-right">
              <div className="body-2 text-text-secondary">Order ID</div>
              <div className="text-lg font-bold">{order.id.slice(-8)}</div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6 rounded-lg border border-neutral-300 p-6">
          <div className="font-header table-header grid grid-cols-6 gap-4 border-b pb-2">
            <div className="col-span-3">Item</div>
            <div className="text-center">Amount</div>
            <div className="text-right">Price Per Unit</div>
            <div className="text-right">Total</div>
          </div>
          {order.items.map((item) => {
            const book = item.product?.book;
            const cover = book?.edition?.[0]?.coverImage;
            return (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center gap-4 border-b py-4 last:border-b-0"
              >
                <div className="col-span-3 flex items-start gap-4">
                  {cover ? (
                    <img
                      src={cover}
                      alt={book?.title}
                      className="h-16 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="h-16 w-12 rounded bg-neutral-200" />
                  )}
                  <div>
                    <div className="font-semibold">
                      {book?.title || "Unknown"}
                    </div>
                    <div className="body-3 text-text-secondary">
                      {book?.Author?.name || "Author"}
                    </div>
                  </div>
                </div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right">
                  ${parseFloat(item.pricePerUnit).toFixed(2)}
                </div>
                <div className="text-right font-semibold">
                  ${(parseFloat(item.pricePerUnit) * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Shipping + Summary */}
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex-1">
            <div className="mb-2 font-semibold">Shipping address:</div>
            <div className="font-semibold">
              {order.name || shipping?.receiverName || "—"}
            </div>
            {order.phoneNumber ? (
              <div className="text-sm">({order.phoneNumber})</div>
            ) : shipping?.phoneNumber ? (
              <div className="text-sm">({shipping.phoneNumber})</div>
            ) : null}
            <div className="mt-2 text-sm">
              {order.address || shipping?.address || "—"}
              {(order.address || shipping) && (
                <>
                  {shipping && (
                    <>
                      , {shipping.city}, {shipping.province}{" "}
                      {shipping.postalCode}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="w-full rounded border p-4 md:w-1/3">
            <div className="mb-1 flex justify-between">
              <div className="body-2 text-text-secondary">Subtotal</div>
              <div className="text-sm">
                ${parseFloat(order.totalAmount || "0").toFixed(2)}
              </div>
            </div>
            <div className="mb-1 flex justify-between">
              <div className="body-2 text-text-secondary">Shipping</div>
              <div className="text-sm">$0.00</div>
            </div>
            <div className="mt-2 flex justify-between text-lg font-bold">
              <div>Total</div>
              <div>${parseFloat(order.totalAmount || "0").toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
