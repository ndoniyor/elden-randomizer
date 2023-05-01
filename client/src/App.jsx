import { useState, useEffect } from 'react'
import './App.css'

import FormCard from './components/FormCard';
import ArmorCard from './components/ArmorCard';
import SpellCard from './components/SpellCard';
import MainCard from './components/MainCard';


function App() {
    const [flags, setFlags] = useState([]);
    const [build, setBuild] = useState({});

    useEffect(() => {
        console.log(build)
    }, [build])

    const getBuild = async () => {
        fetch("http://localhost:3000/api", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flags)
        })
            .then(response => response.json())
            .then(data => {
                setBuild(data)
            })
    }
    useEffect(()=>{
        getBuild();
    },[flags])

    return (
        <div className='App'>
            <h1 className="title">Elden Ring Build Randomizer</h1>
            <FormCard biasFlags={setFlags} />
            {/* <MainCard />
            <ArmorCard />
            <SpellCard /> */}
        </div>
    )
}

export default App;
