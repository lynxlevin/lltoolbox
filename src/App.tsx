import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CountLetters from './pages/CountLetters';
import WeatherReports from './pages/WeatherReports';
import DilutionCalculator from './pages/DilutionCalculator';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <br />
                            <Link to='/dilution-calculator' style={{ fontSize: '24px' }}>
                                希釈計算
                            </Link>
                            <br />
                            <Link to='/count-letters' style={{ fontSize: '24px' }}>
                                文字数計測
                            </Link>
                            <br />
                            <Link to='/weather-reports' style={{ fontSize: '24px' }}>
                                天気予報
                            </Link>
                        </>
                    }
                />
                <Route path='/count-letters' element={<CountLetters />} />
                <Route path='/weather-reports' element={<WeatherReports />} />
                <Route path='/dilution-calculator' element={<DilutionCalculator />} />
            </Routes>
        </div>
    );
}

export default App;
