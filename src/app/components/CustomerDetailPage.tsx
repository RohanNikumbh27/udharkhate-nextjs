"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Phone,
  Trash2,
  TrendingUp,
  TrendingDown,
  Receipt,
  Calendar
} from 'lucide-react';
import { storage, Customer, Transaction } from '@/utils/storage';
import { AddTransactionDialog } from '@/app/components/AddTransactionDialog';

export function CustomerDetailPage() {
  const params = useParams();
  const customerId = params?.customerId as string;
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  const loadCustomer = () => {
    if (customerId) {
      const customers = storage.getCustomers();
      const found = customers.find(c => c.id === customerId);
      setCustomer(found || null);
    }
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (customerId && confirm('Are you sure you want to delete this transaction?')) {
      storage.deleteTransaction(customerId, transactionId);
      loadCustomer();
    }
  };

  const handleAddTransaction = () => {
    loadCustomer();
    setShowAddDialog(false);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground mb-4">Customer not found</h2>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 rounded-[var(--radius-button)] bg-primary text-primary-foreground"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isPositive = customer.balance >= 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-primary to-primary/95 text-primary-foreground px-4 sm:px-6 pt-6 sm:pt-8 pb-5 sm:pb-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-[0.875rem] bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all mb-5 sm:mb-6"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          {/* Customer Info */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] overflow-hidden bg-white/10 backdrop-blur-sm p-1">
              <div className="w-full h-full bg-card rounded-[1.4rem] overflow-hidden flex items-center justify-center">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-white mb-2 truncate">{customer.name}</h1>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">{customer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Balance Card */}
        <div className={`-mt-5 sm:-mt-6 mb-6 sm:mb-8 rounded-[var(--radius-card)] p-6 sm:p-8 shadow-xl ${isPositive
          ? 'bg-gradient-to-br from-success to-success/80'
          : 'bg-gradient-to-br from-warning to-warning/80'
          } text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-white/80 text-sm sm:text-base mb-2">
                {isPositive ? 'You will give' : 'You will get'}
              </div>
              <div className="font-bold text-3xl sm:text-4xl mb-1">
                {formatAmount(Math.abs(customer.balance))}
              </div>
              <div className="text-white/70 text-xs sm:text-sm">Current balance</div>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[1.125rem] bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              {isPositive ? (
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </div>
          </div>
        </div>

        {/* Transactions Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-foreground mb-1">Transaction History</h2>
            <p className="text-muted-foreground">
              {customer.transactions.length} {customer.transactions.length === 1 ? 'transaction' : 'transactions'}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        {customer.transactions.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-surface mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <Receipt className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
            </div>
            <h3 className="text-foreground mb-2">No transactions yet</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Add your first transaction to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {customer.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="group bg-card rounded-[var(--radius-card)] p-4 sm:p-6 border border-border hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[0.875rem] flex items-center justify-center flex-shrink-0 ${transaction.type === 'credit'
                    ? 'bg-success-light text-success'
                    : 'bg-warning-light text-warning'
                    }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm sm:text-base text-foreground mb-1 break-words">
                          {transaction.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                      <div className={`font-bold text-lg sm:text-xl flex-shrink-0 ${transaction.type === 'credit' ? 'text-success' : 'text-warning'
                        }`}>
                        {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className={`text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[0.625rem] ${transaction.type === 'credit'
                        ? 'bg-success-light text-success'
                        : 'bg-warning-light text-warning'
                        }`}>
                        {transaction.type === 'credit' ? 'Payment Received' : 'Payment Given'}
                      </span>

                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="opacity-0 group-hover:opacity-100 w-8 h-8 sm:w-9 sm:h-9 rounded-[0.625rem] bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300"
      >
        <Plus className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      {/* Add Transaction Dialog */}
      {showAddDialog && customerId && (
        <AddTransactionDialog
          customerId={customerId}
          onClose={() => setShowAddDialog(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
}