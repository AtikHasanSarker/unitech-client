"use client";

import { useMemo, useState } from "react";
import {
  X,
  MapPin,
  Phone,
  User,
  Package,
  Truck,
  Banknote,
  CheckCircle2,
  Copy,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";

const DELIVERY_OPTIONS = [
  {
    id: "campus",
    title: "NSTU Campus Delivery",
    description: "Delivery within NSTU campus",
    fee: 30,
    estimatedTime: "1–2 days",
  },
  {
    id: "outside",
    title: "Outside Campus",
    description: "Delivery outside NSTU campus",
    fee: 100,
    estimatedTime: "2–4 days",
  },
];

export default function OrderPlacementModal({
  isOpen,
  onClose,
  cartItems = [],
  subtotal = 0,
  onOrderPlaced,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryOption: "campus",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const selectedDelivery = DELIVERY_OPTIONS.find(
    (option) => option.id === formData.deliveryOption,
  );

  const deliveryFee = selectedDelivery?.fee ?? 0;
  const total = subtotal + deliveryFee;

  const itemCount = useMemo(
    () =>
      cartItems.reduce(
        (totalItems, item) => totalItems + Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    // Bangladesh mobile number validation
    const normalizedPhone = formData.phone.replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

    if (!normalizedPhone) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (!phoneRegex.test(normalizedPhone)) {
      newErrors.phone = "Enter a valid Bangladeshi mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (cartItems.length === 0) {
      newErrors.cart = "Your cart is empty.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      /*
       * FRONTEND DEMO:
       * This creates a temporary order in the browser.
       *
       * For production, send the order to your backend API.
       * The server must calculate the final price, validate
       * product availability and generate the Order ID.
       */

      const orderId = `UT-${new Date().toString().slice(-8)}`;

      const order = {
        orderId,
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        },
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
          image: item.image,
        })),
        delivery: {
          option: formData.deliveryOption,
          fee: deliveryFee,
          estimatedTime: selectedDelivery.estimatedTime,
        },
        paymentMethod: "Cash on Delivery",
        subtotal,
        total: subtotal + deliveryFee,
        note: formData.note.trim(),
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      // Demo delay to show the loading state.
      await new Promise((resolve) => setTimeout(resolve, 700));

      setConfirmedOrder(order);

      // Optional callback for the parent component.
      onOrderPlaced?.(order);
    } catch (error) {
      console.error("Order placement failed:", error);
      setErrors({
        submit: "Unable to place your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = async () => {
    if (!confirmedOrder?.orderId) return;

    try {
      await navigator.clipboard.writeText(confirmedOrder.orderId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setCopySuccess(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setFormData({
      name: "",
      phone: "",
      address: "",
      deliveryOption: "campus",
      note: "",
    });

    setErrors({});
    setConfirmedOrder(null);
    setCopySuccess(false);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              UniTech Store
            </p>

            <h2
              id="order-modal-title"
              className="text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {confirmedOrder ? "Order Confirmed" : "Place Your Order"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {confirmedOrder
                ? "Your order details are shown below."
                : "Complete your information to place your order."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close order modal"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {confirmedOrder ? (
            /* Success State */
            <div className="px-5 py-8 sm:px-10 sm:py-12">
              <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={42} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Thank you for your order!
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your order has been prepared in this demo. In production, you
                  should receive confirmation after the backend saves the order
                  successfully.
                </p>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Order ID
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="break-all text-lg font-bold text-slate-900">
                      {confirmedOrder.orderId}
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Copy size={14} />
                      {copySuccess ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Customer</span>
                      <span className="text-right font-medium text-slate-900">
                        {confirmedOrder.customer.name}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Phone</span>
                      <span className="text-right font-medium text-slate-900">
                        {confirmedOrder.customer.phone}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Payment</span>
                      <span className="text-right font-medium text-emerald-700">
                        Cash on Delivery
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Delivery</span>
                      <span className="text-right font-medium text-slate-900">
                        {selectedDelivery.title}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
                      <span className="font-semibold text-slate-700">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ৳{confirmedOrder.total.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-blue-50 p-4 text-left text-sm leading-6 text-blue-800">
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="mt-1">
                    Please pay ৳{confirmedOrder.total.toLocaleString("en-BD")}{" "}
                    when your order is delivered.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto sm:min-w-52"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr]">
                {/* Customer Form */}
                <div className="space-y-7 p-5 sm:p-7 lg:border-r lg:border-slate-100">
                  {/* Customer Information */}
                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          Customer Information
                        </h3>
                        <p className="text-xs text-slate-500">
                          Enter your contact details
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="customer-name" className={labelClass}>
                          Full Name <span className="text-red-500">*</span>
                        </label>

                        <input
                          id="customer-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputClass}
                        />

                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="customer-phone" className={labelClass}>
                          Mobile Number <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <Phone
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="customer-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="01XXXXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`${inputClass} pl-11`}
                          />
                        </div>

                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Delivery Address */}
                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <MapPin size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          Delivery Address
                        </h3>
                        <p className="text-xs text-slate-500">
                          Where should we deliver your order?
                        </p>
                      </div>
                    </div>

                    <label htmlFor="delivery-address" className={labelClass}>
                      Complete Address <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="delivery-address"
                      name="address"
                      rows={3}
                      autoComplete="street-address"
                      placeholder="Hall name, room number, department, area..."
                      value={formData.address}
                      onChange={handleChange}
                      className={`${inputClass} resize-y`}
                    />

                    {errors.address && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </section>

                  {/* Delivery Options */}
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Truck size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          Delivery Option
                        </h3>
                        <p className="text-xs text-slate-500">
                          Choose your preferred delivery location
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {DELIVERY_OPTIONS.map((option) => {
                        const selected = formData.deliveryOption === option.id;

                        return (
                          <label
                            key={option.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                              selected
                                ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/10"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.id}
                              checked={selected}
                              onChange={handleChange}
                              className="mt-1 accent-blue-600"
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <p className="text-sm font-bold text-slate-900">
                                  {option.title}
                                </p>

                                <p className="text-sm font-bold text-blue-600">
                                  ৳{option.fee}
                                </p>
                              </div>

                              <p className="mt-1 text-xs text-slate-500">
                                {option.description}
                              </p>

                              <p className="mt-2 text-xs font-medium text-slate-600">
                                Estimated delivery: {option.estimatedTime}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </section>

                  {/* Optional Note */}
                  <section>
                    <label htmlFor="order-note" className={labelClass}>
                      Order Note{" "}
                      <span className="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="order-note"
                      name="note"
                      rows={2}
                      placeholder="Any special instructions?"
                      value={formData.note}
                      onChange={handleChange}
                      className={`${inputClass} resize-y`}
                    />
                  </section>
                </div>

                {/* Order Summary */}
                <aside className="bg-slate-50/70 p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Package size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Order Summary
                      </h3>
                      <p className="text-xs text-slate-500">
                        {itemCount} {itemCount === 1 ? "item" : "items"} in your
                        cart
                      </p>
                    </div>
                  </div>

                  {errors.cart && (
                    <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {errors.cart}
                    </p>
                  )}

                  <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id ?? item.productId ?? index}
                        className="flex gap-3"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <Package className="text-slate-300" size={24} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Qty: {item.quantity || 1}
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ৳
                            {(
                              Number(item.price) * Number(item.quantity || 1)
                            ).toLocaleString("en-BD")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="my-6 border-t border-dashed border-slate-300" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium text-slate-900">
                        ৳{subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Delivery Fee</span>
                      <span className="font-medium text-slate-900">
                        ৳{deliveryFee.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-bold text-slate-900">
                          Total Amount
                        </span>

                        <span className="text-2xl font-extrabold text-blue-600">
                          ৳{total.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* COD Payment */}
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
                        <Banknote size={22} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs leading-5 text-emerald-800">
                          Pay in cash when your order arrives. No advance
                          payment is required.
                        </p>
                      </div>
                    </div>
                  </div>

                  {errors.submit && (
                    <p className="mt-4 text-sm text-red-600">{errors.submit}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Confirm Order
                        <ArrowLeft className="rotate-180" size={18} />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                    By confirming, you agree to the order details and delivery
                    information.
                  </p>
                </aside>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
