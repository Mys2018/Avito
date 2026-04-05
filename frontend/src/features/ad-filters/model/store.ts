import { create } from "zustand/react";

interface FilterStore {
  page: number,
  q: string,
  categories: string[],
  needRevision: boolean,
  view: 'grid' | 'list',
  sortColumn?: 'title' | 'createdAt',
  sortDirection?: 'asc' | 'desc',

  setPage: (page: number) => void,
  setSearch: (q: string) => void,
  toggleCategory: (category: string) => void,
  toggleNeedRevision: () => void
  setView: (view: 'grid' | 'list') => void,
  setSort: (column: 'title' | 'createdAt', direction: 'asc' | 'desc') => void,

  resetFilters: () => void
}

export const useFiltersStore = create<FilterStore>((set) => ({
  page: 1,
  q: '',
  categories: [],
  needRevision: false,
  view: 'grid',

  setPage: (page) => set({ page }),
  setSearch: (q) => set({ q, page: 1 }),
  toggleCategory: (category) => set((state) => {
    const isSelected = state.categories.includes(category)
    const newCategories = isSelected ? state.categories.filter((c) => c !== category) : [...state.categories, category]
    return { categories: newCategories, page: 1 }
  }),
  toggleNeedRevision: () => set((state) => ({ needRevision: !state.needRevision, page: 1 })),
  setView: (view) => set({ view }),
  setSort: (sortColumn, sortDirection) => set({ sortColumn, sortDirection, page: 1 }),
  resetFilters: () => set({
    page: 1,
    q: '',
    categories: [],
    needRevision: false,
  })
}))