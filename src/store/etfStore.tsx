import { create } from 'zustand';
import { type Stock } from '../components/stock/StockCard';

export type ETFState = {
    stocks: Stock[],
    addStock: (stock: Stock) => number,
    removeStock: (index: number) => void
}

const useETFStore = create<ETFState>()(set => ({
    stocks: [],
    addStock: (stock: Stock) => {
        let result: number = -1;
        
        set(state => {
            result = state.stocks.length;
            const next = [...state.stocks, stock];
            return { stocks: next };
        });

        return result;
    },
    removeStock: (index: number) =>
        set(state => ({
            stocks: state.stocks.filter((_, i) => i !== index)
        }))
}))

export { useETFStore };
