import { Routes, Route, Link } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import ETFBuilder from './screens/ETFBuilder';
import ETFCrashing from './screens/ETFCrashing';
import PortfolioBuilder from './screens/PortfolioBuilder';
import PortfolioCrashing from './screens/PortfolioCrashing';
import CelebrationScreen from './screens/CelebrationScreen';

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<StartScreen />}
            />
            <Route
                path="/phase-one"
                element={<ETFBuilder />}
            />
            <Route
                path="/phase-two"
                element={<ETFCrashing />}
            />
            <Route
                path="/phase-three"
                element={<PortfolioBuilder />}
            />
            <Route
                path="/phase-four"
                element={<PortfolioCrashing />}
            />
            <Route
                path="/finish"
                element={<CelebrationScreen />}
            />
        </Routes>
    );
}

export default App;
