"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  Eye,
  EyeOff,
  Globe,
  LockKeyhole,
  Mail,
  MapPin,
  Save,
  ShieldCheck,
  Store,
  UserRound,
  RotateCcw,
} from "lucide-react";
import { getAdminSettings, saveAdminSettings } from "@/lib/api/admin";
import { authClient } from "@/lib/auth-client";

const DEFAULT_SETTINGS = {
  storeName: "UniTech",
  storeEmail: "support@unitech.com",
  storePhone: "+880 1XXX-XXXXXX",
  storeAddress: "Noakhali, Bangladesh",
  currency: "BDT",
  timezone: "Asia/Dhaka",
  adminName: "Store Administrator",
  adminEmail: "admin@unitech.com",
  language: "English",
  orderNotifications: true,
  lowStockNotifications: true,
  customerMessages: true,
  promotionalEmails: false,
};

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <span className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
          <Icon size={20} />
        </span>
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function FormField({ label, hint, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${checked ? "bg-blue-600" : "bg-slate-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    let active = true;
    getAdminSettings()
      .then((result) => {
        if (!active) return;
        if (result?.success) {
          setSettings({ ...DEFAULT_SETTINGS, ...result.data });
        } else {
          setLoadError(result?.message || "Could not load admin settings.");
        }
      })
      .catch(() => {
        if (active) setLoadError("Could not connect to admin settings.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setLoadError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const result = await saveAdminSettings(settings);
      if (result?.success) {
        setLoadError("");
        toast.success("Settings saved successfully.");
      } else {
        toast.error(result?.message || "Settings could not be saved.");
      }
    } catch {
      toast.error("Settings could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setLoadError("");
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordMessage("New password must contain at least 8 characters.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }
    setIsChangingPassword(true);
    setPasswordMessage("");
    try {
      const result = await authClient.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });
      if (result.error) {
        toast.error(result.error.message || "Password could not be changed.");
        return;
      }
      setPasswords({ current: "", next: "", confirm: "" });
      toast.success("Password changed successfully.");
    } catch {
      toast.error("Password could not be changed.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <Store size={17} />
            Store configuration
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your store details, administrator profile, notifications, and
            security preferences.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetSettings}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Reset defaults
          </button>
          <button
            type="submit"
            form="settings-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </header>

      {loadError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {loadError}
        </div>
      )}

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          Loading settings...
        </div>
      )}

      <form id="settings-form" onSubmit={handleSave} className="space-y-6">
        <SettingSection
          icon={Store}
          title="General Store Settings"
          description="Basic information displayed across your store."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Store Name">
              <TextInput
                value={settings.storeName}
                onChange={(e) => updateSetting("storeName", e.target.value)}
                placeholder="Your store name"
              />
            </FormField>
            <FormField label="Support Email">
              <TextInput
                type="email"
                value={settings.storeEmail}
                onChange={(e) => updateSetting("storeEmail", e.target.value)}
                placeholder="support@example.com"
              />
            </FormField>
            <FormField label="Contact Phone">
              <TextInput
                type="tel"
                value={settings.storePhone}
                onChange={(e) => updateSetting("storePhone", e.target.value)}
                placeholder="+880..."
              />
            </FormField>
            <FormField label="Store Address">
              <div className="relative">
                <MapPin
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-3 text-slate-400"
                />
                <input
                  value={settings.storeAddress}
                  onChange={(e) =>
                    updateSetting("storeAddress", e.target.value)
                  }
                  placeholder="City, country"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </FormField>
            <FormField label="Currency">
              <select
                value={settings.currency}
                onChange={(e) => updateSetting("currency", e.target.value)}
                className={inputClass}
              >
                <option value="BDT">BDT — Bangladeshi Taka</option>
                <option value="USD">USD — US Dollar</option>
                <option value="INR">INR — Indian Rupee</option>
              </select>
            </FormField>
            <FormField label="Time Zone">
              <div className="relative">
                <Globe
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-3 text-slate-400"
                />
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSetting("timezone", e.target.value)}
                  className={`${inputClass} pl-10`}
                >
                  <option value="Asia/Dhaka">Asia/Dhaka (UTC+6)</option>
                  <option value="UTC">UTC</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                </select>
              </div>
            </FormField>
          </div>
        </SettingSection>

        <SettingSection
          icon={UserRound}
          title="Administrator Profile"
          description="Update the profile information used in your admin panel."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Full Name">
              <TextInput
                value={settings.adminName}
                onChange={(e) => updateSetting("adminName", e.target.value)}
                placeholder="Administrator name"
                autoComplete="name"
              />
            </FormField>
            <FormField label="Admin Email">
              <TextInput
                type="email"
                value={settings.adminEmail}
                onChange={(e) => updateSetting("adminEmail", e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </FormField>
          </div>
        </SettingSection>

        <SettingSection
          icon={Bell}
          title="Notification Preferences"
          description="Choose which events should trigger notifications."
        >
          <div className="divide-y divide-slate-100">
            {[
              {
                key: "orderNotifications",
                title: "Order updates",
                description:
                  "Get notified when a new order is placed or its status changes.",
              },
              {
                key: "lowStockNotifications",
                title: "Low-stock alerts",
                description:
                  "Receive an alert when a product's inventory is running low.",
              },
              {
                key: "customerMessages",
                title: "Customer messages",
                description:
                  "Get updates when customers send a question or support request.",
              },
              {
                key: "promotionalEmails",
                title: "Product and promotional emails",
                description:
                  "Receive optional product news and promotional updates.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
                <Toggle
                  checked={settings[item.key]}
                  onChange={(value) => updateSetting(item.key, value)}
                  label={item.title}
                />
              </div>
            ))}
          </div>
        </SettingSection>

        <SettingSection
          icon={ShieldCheck}
          title="Security"
          description="Password-change form UI. Actual password updates require your authentication backend."
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  key: "current",
                  label: "Current Password",
                  autoComplete: "current-password",
                },
                {
                  key: "next",
                  label: "New Password",
                  autoComplete: "new-password",
                },
                {
                  key: "confirm",
                  label: "Confirm New Password",
                  autoComplete: "new-password",
                },
              ].map((item) => (
                <FormField key={item.key} label={item.label}>
                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-3 text-slate-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords[item.key]}
                      onChange={(e) => {
                        setPasswords((current) => ({
                          ...current,
                          [item.key]: e.target.value,
                        }));
                        setPasswordMessage("");
                      }}
                      autoComplete={item.autoComplete}
                      placeholder="••••••••"
                      className={`${inputClass} pl-10 pr-10`}
                    />
                  </div>
                </FormField>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPassword ? "Hide passwords" : "Show passwords"}
              </button>
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LockKeyhole size={16} />
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </button>
            </div>
            {passwordMessage && (
              <p
                role="status"
                className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {passwordMessage}
              </p>
            )}
          </form>
        </SettingSection>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Settings are saved to the UniTech server.
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Save size={17} /> {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </main>
  );
}
