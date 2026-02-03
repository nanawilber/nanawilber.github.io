"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { usePaystackPayment } from "react-paystack";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number; // Price in GHS
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  price,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // You can replace this with your actual public key from env
  // const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  // For now using a placeholder or checking if it exists
  const publicKey =
    process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_placeholder";

  // Debugging: Check if key is loaded
  // console.log("Paystack Public Key Loaded:", publicKey);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: price * 100, // Paystack expects amount in kobo (lowest currency unit)
    publicKey: publicKey,
    currency: "GHS",
  };

  const initializePayment = usePaystackPayment(config);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (publicKey === "pk_test_placeholder" || !publicKey) {
      alert("Please set NEXT_PUBLIC_PAYSTACK_KEY in your .env.local file");
      return;
    }

    const onSuccessCallback = (reference: any) => {
      // Implementation for whatever you do with reference
      console.log(reference);
      setLoading(false);
      onSuccess();
      onClose();
    };

    const onCloseCallback = () => {
      // Implementation for whatever you do when the Paystack dialog closed.
      console.log("closed");
      setLoading(false);
    };

    setLoading(true);
    initializePayment({
      onSuccess: onSuccessCallback,
      onClose: onCloseCallback,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-zinc-800 p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-wider">
          Complete Purchase
        </h3>
        <p className="text-zinc-400 mb-6">
          Enter your email to receive your receipt and download link.
        </p>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-2 uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-4 text-sm text-zinc-400 border-t border-zinc-800 pt-4">
              <span>Item</span>
              <span>Exclusive Release</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-xl font-bold text-white">
              <span>Total</span>
              <span>GHS {price.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-[#183128] hover:bg-[#1f4034] text-[#cfdcd6] py-3 px-6 text-lg font-bold uppercase tracking-widest transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "monospace" }}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                `Pay GHS ${price.toFixed(2)}`
              )}
            </button>
            <p className="text-xs text-center text-zinc-500 mt-4">
              Secured by Paystack
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
