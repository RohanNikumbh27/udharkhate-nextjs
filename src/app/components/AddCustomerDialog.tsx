import { useState } from 'react';
import { X, User, Phone } from 'lucide-react';
import { storage } from '@/utils/storage';

interface AddCustomerDialogProps {
  onClose: () => void;
  onAdd: () => void;
}

export function AddCustomerDialog({ onClose, onAdd }: AddCustomerDialogProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      storage.addCustomer({
        name: name.trim(),
        phone: phone.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      onAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card rounded-[var(--radius-card)] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 rounded-t-[var(--radius-card)]">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Add New Customer</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-[0.875rem] bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-foreground mb-2 sm:mb-3">
              Customer Name
            </label>
            <div className="relative">
              <User className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-surface text-foreground placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary transition-all"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-foreground mb-2 sm:mb-3">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-surface text-foreground placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-surface text-foreground hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}