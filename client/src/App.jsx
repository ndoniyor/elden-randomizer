import { useState, useEffect } from 'react'
import './App.css'

import FormCard from './components/FormCard';
import ArmorCard from './components/ArmorCard';
import SpellCard from './components/SpellCard';
import MainCard from './components/MainCard';


function App() {
    const [flags, setFlags] = useState([]);

    const getBuild = async () => {
        console.log({
            method: 'POST',
            body: JSON.stringify(flags)
          })
        fetch("http://localhost:3000/api", {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(flags)
        })
    }

    useEffect(() => {
        getBuild();
    }, [flags])

    return (
        <div className='App'>
            <FormCard biasFlags={setFlags} />
            {/* <MainCard />
            <ArmorCard />
            <SpellCard /> */}
        </div>
    )
}

export default App;
