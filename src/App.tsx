import { Routes, Route, Link } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import ETFBuilder from './screens/ETFBuilder';
import ETFCrashing from './screens/ETFCrashing';

const App = (props: any) => {
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
        </Routes>
    );
}

export default App;
