"use client";

import { useState } from "react";
import { CheckCircle2, Building2, Bell, Shield, MapPin, Mail, Phone } from "lucide-react";

export default function SettingsPage() {
  const [attorneyName, setAttorneyName] = useState("MULUALEM DEMISSIE ZERIHUN");
  const [title, setTitle] = useState("LAWYER AND ATTORNEY");
  const [email, setEmail] = useState("mulualemdm66@gmail.com");
  const [phone1, setPhone1] = useState("+251 917 117 939");
  const [phone2, setPhone2] = useState("0909 838 013");
  const [address, setAddress] = useState(
    "Lideta Sub-City, Lideta, Merkato Mall, 1st Floor, Office No. 134, Addis Ababa, Ethiopia"
  );
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Practice Settings
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Configure firm contact details, notification preferences, and practice defaults.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-green-50 text-green-700 text-sm rounded-lg font-medium flex items-center gap-2 border border-green-200">
            <CheckCircle2 size={18} />
            Settings saved successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Card 1: Firm Profile */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#F3F4F6]">
              <Building2 size={20} className="text-[#B8860B]" />
              <h2
                className="text-base font-bold text-[#111827] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Attorney &amp; Firm Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Attorney Full Name
                </label>
                <input
                  type="text"
                  value={attorneyName}
                  onChange={(e) => setAttorneyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Official Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Primary Phone
                </label>
                <input
                  type="tel"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Secondary Phone
                </label>
                <input
                  type="tel"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Office Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C]"
              />
            </div>
          </div>

          {/* Card 2: Notification Preferences */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#F3F4F6]">
              <Bell size={20} className="text-[#B8860B]" />
              <h2
                className="text-base font-bold text-[#111827] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Intake &amp; Alert Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Instant Email Notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive immediate emails when a client submits a consultation request.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-black rounded focus:ring-black"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    SMS Consultation Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Send high-priority SMS alerts to +251 917 117 939 for new appointments.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-black rounded focus:ring-black"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-widest cursor-pointer"
            >
              SAVE SETTINGS
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
