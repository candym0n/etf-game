import { create } from 'zustand';
import { type ETF } from '../components/etfs/ETFCard';

export type ETFState = {
    equityETFs: ETF[],
    bondETFs: ETF[],
    addEquityETF: (etf: ETF) => number,
    removeEquityETF: (index: number) => void
    addBondETF: (etf: ETF) => number,
    removeBondETF: (index: number) => void
}

const usePortfolioStore = create<ETFState>()(set => ({
    equityETFs: [],
    bondETFs: [],
    addEquityETF: (etf: ETF) => {
        let result: number = -1;
        
        set(state => {
            result = state.equityETFs.length;
            const next = [...state.equityETFs, etf];
            return { equityETFs: next };
        });

        return result;
    },
    removeEquityETF: (index: number) =>
        set(state => ({
            equityETFs: state.equityETFs.filter((_, i) => i !== index)
        })),
    addBondETF: (etf: ETF) => {
        let result: number = -1;
        
        set(state => {
            result = state.bondETFs.length;
            const next = [...state.bondETFs, etf];
            return { bondETFs: next };
        });

        return result;
    },
    removeBondETF: (index: number) =>
        set(state => ({
            bondETFs: state.bondETFs.filter((_, i) => i !== index)
        }))
}));

export { usePortfolioStore };
