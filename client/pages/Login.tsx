import { useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import { loginWithPhone, getCurrentUserId } from "@/lib/localDB";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!phone) return alert("Enter phone number");
    setSent(true);
    // In a real app, trigger Supabase OTP here. For MVP we accept any OTP.
    setTimeout(() => alert("OTP sent (stub). Enter 000000 to verify."), 300);
  };

  const verify = (otp: string) => {
    if (otp !== "000000") return alert("Invalid OTP in stub. Use 000000");
    const user = loginWithPhone(phone, name || undefined);
    alert(`Logged in as ${user.name}`);
    navigate("/");
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Sign in / Sign up</h1>
        <div className="space-y-2">
          <label className="text-xs">Name (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={sendOtp}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Send OTP
          </button>
          <button
            onClick={() => verify("000000")}
            className="rounded-md border px-4 py-2 hover:bg-neutral-50"
          >
            Verify (stub)
          </button>
        </div>
        <div>
          <p className="text-xs text-neutral-500">
            This is a local OTP stub. When Supabase is connected we'll replace
            this with real OTP flow.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
