"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { submitContactMessage } from "@/lib/api/site";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team.",
    value: "+8801604498384",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your questions anytime.",
    value: "unitech24@gmail.com",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Serving students at NSTU.",
    value: "NSTU Campus, Noakhali",
    href: "https://maps.google.com/?q=Noakhali+Science+and+Technology+University",
    color: "text-emerald-600 bg-emerald-50",
  },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, select the items you need, add them to your cart, and place your order. You can provide your contact details and delivery address during the order process.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "UniTech is designed to support Cash on Delivery (COD). You can pay when your order arrives, subject to the delivery arrangements confirmed for your order.",
  },
  {
    question: "Is there a special discount for NSTU students?",
    answer:
      "We aim to provide special offers for NSTU students. Available discounts, eligibility requirements, and promotional terms will be displayed on the relevant offers page.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once order tracking is available for your account, you will be able to view your order status from the My Orders section.",
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer:
      "Contact our support team with your order details and a description of the issue. If possible, keep the original packaging and photographs of the damaged product.",
  },
];

const supportTips = [
  {
    title: "Order ID",
    description:
      "Keep your order number available for order-related questions.",
  },
  {
    title: "Product Details",
    description: "Mention the product name and describe the issue clearly.",
  },
  {
    title: "Delivery Information",
    description:
      "Provide relevant delivery details when requesting assistance.",
  },
];

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

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

    setIsSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please select a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Your message must contain at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    let result;

    try {
      result = await submitContactMessage(formData);
    } catch {
      result = {
        success: false,
        message: "Could not connect to contact support.",
      };
    } finally {
      setIsSubmitting(false);
    }

    if (!result?.success) {
      setErrors({
        submit: result?.message || "Your message could not be sent.",
      });
      return;
    }

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10">
          <nav className="mb-5 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-800">Contact Us</span>
          </nav>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Contact Us
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Have a question about a product or order? Send us a message. We are
            here to help.
          </p>
        </div>

        {/* Contact Information */}
        <section>
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              const content = (
                <div className="flex h-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${method.color}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {method.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {method.description}
                    </p>

                    <p className="mt-3 break-words text-sm font-medium text-slate-700">
                      {method.value}
                    </p>
                  </div>
                </div>
              );

              return method.href ? (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={method.title}>{content}</div>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Replace the placeholder phone number and email with your actual
            support details before publishing.
          </p>
        </section>

        {/* Contact Form */}
        <section
          id="contact-form"
          className="mt-12 grid grid-cols-1 gap-10 border-t border-slate-100 pt-10 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and our team will get back to you.
            </p>

            {isSubmitted && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
              >
                <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Message received
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">
                    Your message has been sent to the UniTech support team.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              {errors.submit && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errors.submit}
                </p>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    aria-invalid={Boolean(errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputClasses} ${
                    !formData.subject ? "text-slate-400" : ""
                  }`}
                  aria-invalid={Boolean(errors.subject)}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order and Delivery">Order and Delivery</option>
                  <option value="Payment and COD">Payment and COD</option>
                  <option value="NSTU Student Discount">
                    NSTU Student Discount
                  </option>
                  <option value="Return and Refund">Return and Refund</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other">Other</option>
                </select>

                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={1000}
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-y`}
                  aria-invalid={Boolean(errors.message)}
                />

                <div className="mt-2 flex justify-between gap-3">
                  {errors.message ? (
                    <p className="text-xs text-red-600">{errors.message}</p>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Minimum 10 characters
                    </p>
                  )}

                  <span className="text-xs text-slate-400">
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Support Information */}
          <aside className="border-t border-slate-100 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Headphones size={22} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Need Help with an Order?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check your order details before contacting our support team.
            </p>

            <Link
              href="/my-orders"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View My Orders
              <ArrowRight size={16} />
            </Link>

            <div className="my-7 border-t border-slate-100" />

            <h4 className="text-sm font-semibold text-slate-900">
              Before contacting us
            </h4>

            <div className="mt-5 space-y-5">
              {supportTips.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
                    {index + 1}
                  </span>

                  <div>
                    <h5 className="text-sm font-medium text-slate-800">
                      {item.title}
                    </h5>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-3xl border-t border-slate-100 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              FAQ
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Find answers to common questions about shopping with UniTech.
            </p>
          </div>

          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-slate-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="max-w-2xl pb-5 text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-7 text-sm text-slate-500">
            Still have questions?{" "}
            <a
              href="#contact-form"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Send us a message.
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
