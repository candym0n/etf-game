// TODO: Get rid of this file and make some actual functionality

import { create } from 'zustand';

export type StateMachineState = {
    simulationPlayed: boolean; // Whether or not you already failed the ETF simulation (since you invested in LEHM, BAC)
    playSimulation: () => void;
    resetSimulation: () => void;
}

const useStateStore = create<StateMachineState>()((set) => ({
    simulationPlayed: false,
    playSimulation: () => set(state => {
        state.simulationPlayed = true;
        return state;
    }),
    resetSimulation: () => set(state => {
        state.simulationPlayed = false;
        return state;
    })
}));

export { useStateStore };
