"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { submitContactMessage } from "@/lib/api/site";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team.",
    value: "Add your phone number",
    href: null,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your questions anytime.",
    value: "Add your support email",
    href: null,
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Serving students at NSTU.",
    value: "NSTU Campus, Noakhali",
    href: "https://maps.google.com/?q=Noakhali+Science+and+Technology+University",
    color: "bg-emerald-50 text-emerald-600",
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
      "Keep your order number available if your question is about an order.",
  },
  {
    title: "Product Details",
    description: "Mention the product name and describe the issue clearly.",
  },
  {
    title: "Delivery Information",
    description:
      "Provide relevant delivery details when requesting order assistance.",
  },
];

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

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
      {/* 1. Minimal Hero */}
      <section className="border-b border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MessageCircle size={27} strokeWidth={1.8} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
            Contact UniTech
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How Can We Help You?
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Have a question about a product or order? Get in touch with our
            team. We are here to help.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send a Message
              <ArrowRight size={16} />
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <ShoppingBag size={16} />
              Explore Products
            </Link>
          </div>

          {/* Small Support Highlights */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                icon: Headphones,
                title: "Customer Support",
                description: "Help with your questions",
              },
              {
                icon: Truck,
                title: "Order Assistance",
                description: "Delivery and order queries",
              },
              {
                icon: Clock,
                title: "Student Friendly",
                description: "Designed for NSTU students",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 px-5 py-4 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Contact Information */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Get In Touch
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Contact Information
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose a contact method that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            const content = (
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md sm:p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.color}`}
                >
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {method.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {method.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-800">
                    {method.value}
                  </span>

                  {method.href && (
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-blue-600 transition group-hover:translate-x-1"
                    />
                  )}
                </div>
              </div>
            );

            return method.href ? (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={method.title}>{content}</div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Replace the placeholder phone number and email with your actual
          customer support details before publishing.
        </p>
      </section>

      {/* 3. Contact Form */}
      <section
        id="contact-form"
        className="border-y border-slate-100 bg-slate-50/60"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-5 lg:gap-10 lg:px-8">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 lg:col-span-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Contact Form
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below with your question or concern.
              </p>
            </div>

            {isSubmitted && (
              <div
                role="status"
                className="mt-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
              >
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Message received
                  </p>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Your message has been sent to the UniTech support team.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              {errors.submit && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errors.submit}
                </p>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
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
                    <p className="mt-2 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
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
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
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
                  <p className="mt-2 text-xs text-red-600">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
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

                <div className="mt-2 flex items-center justify-between gap-3">
                  {errors.message ? (
                    <p className="text-xs text-red-600">{errors.message}</p>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Minimum 10 characters
                    </p>
                  )}

                  <span className="shrink-0 text-xs text-slate-400">
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}

                <Send size={17} />
              </button>

              <p className="text-xs leading-5 text-slate-400">
                Your information should only be submitted through a properly
                secured and configured contact form.
              </p>
            </form>
          </div>

          {/* Support Information */}
          <aside className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Headphones size={25} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Need Help with an Order?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Whether you have a question about an accessory or need help
                understanding your order, start by checking your order details.
              </p>

              <Link
                href="/my-orders"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View My Orders
                <ArrowRight size={17} />
              </Link>

              <div className="my-7 border-t border-slate-100" />

              <h4 className="text-sm font-bold text-slate-900">
                Before contacting us
              </h4>

              <div className="mt-5 space-y-5">
                {supportTips.map((item, index) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h5>

                      <p className="mt-1 text-xs leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-sm font-semibold text-blue-800">
                  Built for NSTU Students
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  UniTech aims to make finding and ordering mobile accessories
                  easier for the university community.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            FAQ
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Find answers to common questions about shopping with UniTech.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border bg-white transition ${
                  isOpen
                    ? "border-blue-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-sm leading-7 text-slate-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">Still have questions?</p>

          <a
            href="#contact-form"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Send us a message
            <ArrowDown size={16} />
          </a>
        </div>
      </section>

      {/* 5. Minimal Bottom CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Ready to Find Your Next Accessory?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Explore our collection of mobile accessories and find the products
              that fit your needs.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Shop Now
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
