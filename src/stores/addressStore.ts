import { create } from 'zustand';
import { Address } from '@/types';

interface AddressState {
  addresses: Address[];
  defaultAddress: Address | null;
  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  addresses: [],
  defaultAddress: null,
  setAddresses: (addresses) => set({ addresses }),
  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, address]
  })),
  updateAddress: (id, updatedAddress) => set((state) => ({
    addresses: state.addresses.map(addr => 
      addr.id === id ? { ...addr, ...updatedAddress } : addr
    )
  })),
  removeAddress: (id) => set((state) => ({
    addresses: state.addresses.filter(addr => addr.id !== id)
  })),
  setDefaultAddress: (id) => set((state) => ({
    addresses: state.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })),
    defaultAddress: state.addresses.find(addr => addr.id === id) || null
  }))
}));