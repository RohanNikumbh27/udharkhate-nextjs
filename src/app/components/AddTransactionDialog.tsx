import { useState } from 'react';
import { X, FileText, DollarSign } from 'lucide-react';
import { storage } from '@/utils/storage';

interface AddTransactionDialogProps {
  customerId: string;
  onClose: () => void;
  onAdd: () => void;
}

export function AddTransactionDialog({ customerId, onClose, onAdd }: AddTransactionDialogProps) {
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0 && description.trim()) {
      storage.addTransaction(customerId, {
        type,
        amount: amountNum,
        description: description.trim(),
        date: new Date().toISOString(),
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
            <h2 className="text-white">Add Transaction</h2>
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
          {/* Transaction Type Toggle */}
          <div>
            <label className="block text-foreground mb-2 sm:mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setType('credit')}
                className={`py-3.5 sm:py-4 rounded-[var(--radius-button)] transition-all text-sm sm:text-base ${
                  type === 'credit'
                    ? 'bg-gradient-to-br from-success to-success/80 text-white shadow-lg shadow-success/30'
                    : 'bg-surface text-foreground hover:bg-muted'
                }`}
              >
                You Received
              </button>
              <button
                type="button"
                onClick={() => setType('debit')}
                className={`py-3.5 sm:py-4 rounded-[var(--radius-button)] transition-all text-sm sm:text-base ${
                  type === 'debit'
                    ? 'bg-gradient-to-br from-warning to-warning/80 text-white shadow-lg shadow-warning/30'
                    : 'bg-surface text-foreground hover:bg-muted'
                }`}
              >
                You Gave
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-foreground mb-2 sm:mb-3">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-surface text-foreground placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary transition-all text-xl sm:text-2xl font-semibold"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-foreground mb-2 sm:mb-3">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-4 sm:left-5 top-4 sm:top-5 w-5 h-5 text-muted-foreground" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter transaction details..."
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-surface text-foreground placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                rows={3}
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
              className={`flex-1 py-3.5 sm:py-4 rounded-[var(--radius-button)] text-white hover:scale-[1.02] hover:shadow-lg transition-all ${
                type === 'credit'
                  ? 'bg-gradient-to-br from-success to-success/80 hover:shadow-success/30'
                  : 'bg-gradient-to-br from-warning to-warning/80 hover:shadow-warning/30'
              }`}
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}