"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { CustomerCard } from '@/app/components/CustomerCard';
import { AddCustomerDialog } from '@/app/components/AddCustomerDialog';
import { ModeToggle } from '@/app/components/mode-toggle';
import { storage, Customer } from '@/utils/storage';

export function HomePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [activeTab, setActiveTab] = useState<'people' | 'summary'>('people');
  const [isLoading, setIsLoading] = useState(true);

  // Auto-switch to people tab when searching
  useEffect(() => {
    if (searchQuery) {
      setActiveTab('people');
    }
  }, [searchQuery]);

  useEffect(() => {
    // Simulate a small delay for smoother transition and to ensure hydration matches
    const init = async () => {
      storage.initializeSampleData();
      loadCustomers();
      setIsLoading(false);
    };
    init();
  }, []);

  const loadCustomers = () => {
    setCustomers(storage.getCustomers());
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const totalToGive = customers.reduce((sum, c) => sum + (c.balance > 0 ? c.balance : 0), 0);
  const totalToGet = customers.reduce((sum, c) => sum + (c.balance < 0 ? Math.abs(c.balance) : 0), 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddCustomer = () => {
    loadCustomers();
    setShowAddDialog(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-b from-primary to-primary/95 px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-lg rounded-b-[2rem]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between mb-6">
              <div className="h-14 w-40 bg-white/20 rounded animate-pulse" />
              <div className="h-14 w-14 bg-white/20 rounded-[1.125rem] animate-pulse" />
            </div>
            <div className="h-14 w-full bg-white/20 rounded-[var(--radius-button)] animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="h-32 bg-card rounded-[var(--radius-card)] animate-pulse" />
            <div className="h-32 bg-card rounded-[var(--radius-card)] animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-card rounded-[var(--radius-card)] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-lg rounded-b-[2rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-1">Khatabook</h1>
              <p className="text-primary-foreground/80 text-sm sm:text-base">
                Manage your business accounts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[1.125rem] bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-[var(--radius-button)] bg-card text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-ring shadow-lg transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Tabs */}
        <div className="flex p-1 bg-muted/50 rounded-[1.25rem] mt-6 mb-6 relative">
          <button
            onClick={() => setActiveTab('people')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1rem] text-sm font-medium transition-all duration-300 ${activeTab === 'people'
              ? 'bg-primary/50 text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Users className="w-4 h-4" />
            People
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1rem] text-sm font-medium transition-all duration-300 ${activeTab === 'summary'
              ? 'bg-primary/50 text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <TrendingUp className="w-4 h-4" />
            Summary
          </button>
        </div>

        {/* Summary Content */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* You will get */}
            <div className="bg-gradient-to-br from-success to-success/80 rounded-[var(--radius-card)] p-5 sm:p-6 text-white shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[0.875rem] bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs sm:text-sm mb-1">You will get</div>
                  <div className="font-bold text-2xl sm:text-3xl">{formatAmount(totalToGet)}</div>
                </div>
              </div>
              <div className="text-white/70 text-xs sm:text-sm mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                Total receivable amount
              </div>
            </div>

            {/* You will give */}
            <div className="bg-gradient-to-br from-warning to-warning/80 rounded-[var(--radius-card)] p-5 sm:p-6 text-white shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[0.875rem] bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs sm:text-sm mb-1">You will give</div>
                  <div className="font-bold text-2xl sm:text-3xl">{formatAmount(totalToGive)}</div>
                </div>
              </div>
              <div className="text-white/70 text-xs sm:text-sm mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                Total payable amount
              </div>
            </div>
          </div>
        )}

        {/* People Content */}
        {activeTab === 'people' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Customers List */}
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-[1.5rem] bg-surface mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-foreground mb-2">No customers found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? 'Try a different search term' : 'Add your first customer to get started'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredCustomers.map(customer => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 group"
      >
        <Plus className="w-7 h-7 sm:w-8 sm:h-8" />
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success animate-pulse" />
      </button>

      {/* Add Customer Dialog */}
      {showAddDialog && (
        <AddCustomerDialog
          onClose={() => setShowAddDialog(false)}
          onAdd={handleAddCustomer}
        />
      )}
    </div>
  );
}