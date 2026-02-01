"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';
import { Customer } from '@/utils/storage';

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const router = useRouter();
  const isPositive = customer.balance >= 0;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <div
      onClick={() => router.push(`/customer/${customer.id}`)}
      className="group relative bg-card rounded-[var(--radius-card)] p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 border border-border"
      style={{
        background: 'linear-gradient(135deg, var(--card) 0%, var(--surface) 100%)',
      }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="relative flex items-center gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-0.5">
            <div className="w-full h-full bg-card rounded-[1.2rem] overflow-hidden flex items-center justify-center">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Status indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-card ${isPositive ? 'bg-success' : 'bg-warning'
            }`} />
        </div>

        {/* Customer Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 truncate">
            {customer.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">{customer.phone}</span>
          </div>
        </div>

        {/* Balance and Arrow */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-0.5 sm:mb-1 whitespace-nowrap">
              {isPositive ? 'You will give' : 'You will get'}
            </div>
            <div className={`font-bold text-lg sm:text-xl ${isPositive ? 'text-success' : 'text-warning'
              }`}>
              {formatAmount(customer.balance)}
            </div>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[0.875rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Transaction count badge */}
      {customer.transactions.length > 0 && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">
              {customer.transactions.length} {customer.transactions.length === 1 ? 'transaction' : 'transactions'}
            </span>
            <span className="text-xs text-muted-foreground">
              Last: {new Date(customer.transactions[0].date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}