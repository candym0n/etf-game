import { Routes, Route, Link } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import ETFBuilder from './screens/ETFBuilder';

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
        </Routes>
    );
}

export default App;
