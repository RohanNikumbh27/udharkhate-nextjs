export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
  transactions: Transaction[];
  avatar: string;
}

const STORAGE_KEY = 'khatabook_data';

export const storage = {
  getCustomers: (): Customer[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveCustomers: (customers: Customer[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  addCustomer: (customer: Omit<Customer, 'id' | 'balance' | 'transactions'>): Customer => {
    const customers = storage.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      balance: 0,
      transactions: [],
    };
    customers.push(newCustomer);
    storage.saveCustomers(customers);
    return newCustomer;
  },

  updateCustomer: (customerId: string, updates: Partial<Customer>): void => {
    const customers = storage.getCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updates };
      storage.saveCustomers(customers);
    }
  },

  deleteCustomer: (customerId: string): void => {
    const customers = storage.getCustomers().filter(c => c.id !== customerId);
    storage.saveCustomers(customers);
  },

  addTransaction: (
    customerId: string,
    transaction: Omit<Transaction, 'id'>
  ): void => {
    const customers = storage.getCustomers();
    const customer = customers.find(c => c.id === customerId);

    if (customer) {
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
      };

      customer.transactions.unshift(newTransaction);

      // Update balance
      if (transaction.type === 'credit') {
        customer.balance += transaction.amount;
      } else {
        customer.balance -= transaction.amount;
      }

      storage.saveCustomers(customers);
    }
  },

  deleteTransaction: (customerId: string, transactionId: string): void => {
    const customers = storage.getCustomers();
    const customer = customers.find(c => c.id === customerId);

    if (customer) {
      const transaction = customer.transactions.find(t => t.id === transactionId);
      if (transaction) {
        // Reverse the balance change
        if (transaction.type === 'credit') {
          customer.balance -= transaction.amount;
        } else {
          customer.balance += transaction.amount;
        }

        customer.transactions = customer.transactions.filter(t => t.id !== transactionId);
        storage.saveCustomers(customers);
      }
    }
  },

  initializeSampleData: (): void => {
    const customers = storage.getCustomers();
    if (customers.length === 0) {
      const sampleCustomers: Customer[] = [
        {
          id: '1',
          name: 'Rahul Sharma',
          phone: '+91 98765 43210',
          balance: 2500,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
          transactions: [
            {
              id: '1',
              type: 'credit',
              amount: 2500,
              description: 'Payment received',
              date: new Date(2026, 0, 28).toISOString(),
            },
            {
              id: '2',
              type: 'debit',
              amount: 1500,
              description: 'Product delivered',
              date: new Date(2026, 0, 25).toISOString(),
            },
          ],
        },
        {
          id: '2',
          name: 'Priya Patel',
          phone: '+91 98123 45678',
          balance: -1200,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
          transactions: [
            {
              id: '3',
              type: 'debit',
              amount: 1200,
              description: 'Service provided',
              date: new Date(2026, 0, 30).toISOString(),
            },
          ],
        },
        {
          id: '3',
          name: 'Amit Kumar',
          phone: '+91 99887 76655',
          balance: 5000,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
          transactions: [
            {
              id: '4',
              type: 'credit',
              amount: 5000,
              description: 'Advance payment',
              date: new Date(2026, 0, 29).toISOString(),
            },
          ],
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          phone: '+91 97654 32109',
          balance: 0,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
          transactions: [],
        },
      ];
      storage.saveCustomers(sampleCustomers);
    }
  },
};
