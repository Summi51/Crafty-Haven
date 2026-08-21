export const label = (value = "") => String(value).replace(/_/g, " ");

export const isSameDay = (date) => {
  if (!date) return false;
  return new Date(date).toDateString() === new Date().toDateString();
};

export const overlayFor = (order) => {
  if (order.paymentStatus === "refunded") return { text: "Refunded", color: "green.500" };
  if (order.paymentStatus === "refund_requested") return { text: "Refunding", color: "orange.400" };
  if (order.status === "cancelled") return { text: "Cancelled", color: "red.500" };
  if (order.status === "delivered") return { text: "Delivered", color: "green.500" };
  if (order.status === "out_for_delivery" || isSameDay(order.estimatedDelivery)) {
    return { text: "Arriving today", color: "#7F508B" };
  }
  if (order.status === "shipped") return { text: "On the way", color: "orange.400" };
  if (order.status === "packed") return { text: "Packed", color: "cyan.600" };
  if (order.status === "confirmed") return { text: "Confirmed", color: "blue.500" };
  return { text: "Placed", color: "purple.500" };
};

export const badgeColor = {
  placed: "purple",
  confirmed: "blue",
  packed: "cyan",
  shipped: "orange",
  out_for_delivery: "yellow",
  delivered: "green",
  cancelled: "red",
  refund_requested: "orange",
  refunded: "green",
};

export const displayBadge = (order) => {
  if (order.paymentStatus === "refunded") return { text: "Refunded", color: "green" };
  if (order.paymentStatus === "refund_requested") return { text: "Refund in progress", color: "orange" };
  return {
    text: overlayFor(order).text,
    color: badgeColor[order.status] || "gray",
  };
};

const stepAt = (order, status) => {
  const step = (order.timeline || []).find((entry) => entry.status === status);
  return step?.at ? new Date(step.at) : null;
};

const formatDay = (date) =>
  date
    ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

export const statusLine = (kind, order) => {
  if (kind === "refunded") {
    return { text: `Refund completed${formatDay(stepAt(order, "refunded")) ? ` on ${formatDay(stepAt(order, "refunded"))}` : ""}`, color: "green.600" };
  }
  if (kind === "refund_requested") return { text: "Refund in progress", color: "orange.500" };
  if (kind === "cancelled") {
    return { text: `Cancelled${formatDay(stepAt(order, "cancelled")) ? ` on ${formatDay(stepAt(order, "cancelled"))}` : ""}`, color: "red.500" };
  }
  if (kind === "delivered") {
    return { text: `Delivered on ${formatDay(stepAt(order, "delivered") || new Date(order.updatedAt || order.createdAt))}`, color: "green.600" };
  }
  if (kind === "out_for_delivery") return { text: "Arriving today", color: "#7F508B" };
  if (kind === "shipped") return { text: "On the way", color: "orange.500" };
  if (kind === "packed") return { text: "Packed", color: "cyan.700" };
  if (kind === "confirmed") return { text: "Confirmed", color: "blue.600" };
  return { text: "Order placed", color: "purple.600" };
};

export const listRows = (order) => {
  const refundKind =
    order.paymentStatus === "refunded" || order.paymentStatus === "refund_requested"
      ? order.paymentStatus
      : null;

  if (order.status === "delivered" && refundKind) {
    return [
      { key: `${order.orderId}-delivered`, kind: "delivered", order },
      { key: `${order.orderId}-${refundKind}`, kind: refundKind, order },
    ];
  }
  if (order.status === "cancelled" && refundKind) {
    return [
      { key: `${order.orderId}-cancelled`, kind: "cancelled", order },
      { key: `${order.orderId}-${refundKind}`, kind: refundKind, order },
    ];
  }
  return [{ key: order.orderId, kind: refundKind || order.status, order }];
};

export const FALLBACK_STEPS = [
  { status: "placed", note: "Payment received and order placed." },
  { status: "confirmed", note: "Seller confirmed your order." },
  { status: "packed", note: "Items packed and ready to ship." },
  { status: "shipped", note: "Order handed to the courier." },
  { status: "out_for_delivery", note: "Courier is out for delivery." },
  { status: "delivered", note: "Order delivered." },
];
