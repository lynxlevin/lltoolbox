import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CountLetters from './pages/CountLetters';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <br />
                            <Link to='/count-letters' style={{ fontSize: '24px' }}>
                                文字数計測
                            </Link>
                        </>
                    }
                />
                <Route path='/count-letters' element={<CountLetters />} />
            </Routes>
        </div>
    );
}

export default App;
