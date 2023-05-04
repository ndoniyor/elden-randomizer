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
        fetch("https://elden-randomizer-api.onrender.com/api", {
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

    useEffect(() => {
        getBuild();
    }, [flags])

    return (
        <div className='App'>
            {/*<h1 className="title">Elden Ring Build Randomizer</h1>*/}
            <FormCard biasFlags={setFlags} />
            {Object.keys(build).length > 0 &&
                <div>
                    <MainCard
                        startingClass={build.class}
                        weapons={build.weapons}
                        ashesOfWar={build.ashesOfWar}
                    />
                    <ArmorCard
                    armor={build.armor} 
                    />
                    {build.magic &&
                        <SpellCard spells={build.magic} />
                    }

                </div>
            }
        </div>
    )
}

export default App;
