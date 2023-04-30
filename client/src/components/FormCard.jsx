import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormCard({ biasFlags }) {
    const [isPure, setPure] = useState(false);
    const [isArmorSets, setArmorSets] = useState(false);
    const [buildType, setBuild] = useState("");
    const [meleeType, setMeleeType] = useState("");
    const [magicType, setMagicType] = useState("");

    const handleSubmit = () => {
        const flagObj = {};
        if (isPure) {
            flagObj["pure"] = isPure;
        }
        else {
            flagObj["armorSets"] = isArmorSets;
            flagObj["buildType"] = buildType;
            switch(buildType){
                case "melee":
                    flagObj["meleeType"] = meleeType;
                    break;
                case "magic":
                    flagObj["magicType"] = magicType;
                    break;
            }
        }
        biasFlags(flagObj)
    }

    useEffect(()=>{
        console.log(buildType)
    },[buildType])

    return (
        <div>
            <Form>
                <Form.Check
                    type="switch"
                    id="pure-check"
                    label="Pure Randomize"
                    onChange={(e) => { setPure(e.target.checked) }}
                />
                <p>Build Flags</p>
                <Form.Check
                    disabled={isPure}
                    type="switch"
                    id="armor-check"
                    label="Armor Sets Only"
                    onChange={(e) => { setArmorSets(e.target.checked) }}
                />
                
                <p>Build type</p>
                <Form.Check
                    disabled={isPure}
                    type="radio"
                    name="build-type-radio"
                    id="choose-build-radio"
                    label="Choose for me"
                    onChange={(e) => { setBuild("rand") }}
                />
                <br/>
                {/*---------------------------------------------------------------------*/}
                <Form.Check
                    disabled={isPure}
                    type="radio"
                    name="build-type-radio"
                    id="melee-only-radio"
                    label="Melee Only"
                    onChange={(e) => { setBuild("melee") }}
                />
                <Form.Check
                    disabled={isPure || buildType!=="melee"}
                    type="radio"
                    name="melee-radio"
                    id="choose-melee-radio"
                    label="Choose for me"
                    onChange={(e) => { setMeleeType("rand") }}
                    checked={!isPure && buildType==="melee" && meleeType === "rand"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="melee"}
                    type="radio"
                    name="melee-radio"
                    id="powerstance-radio"
                    label="Powerstance"
                    onChange={(e) => { setMeleeType("powerstance") }}
                    checked={!isPure && buildType==="melee" && meleeType === "powerstance"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="melee"}
                    type="radio"
                    name="melee-radio"
                    id="dual-wield-radio"
                    label="Dual Wield"
                    onChange={(e) => { setMeleeType("dualwield") }}
                    checked={!isPure && buildType==="melee" && meleeType === "dualwield"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="melee"}
                    type="radio"
                    name="melee-radio"
                    id="single-wield-radio"
                    label="Single Wield"
                    onChange={(e) => { setMeleeType("singlewield") }}
                    checked={!isPure && buildType==="melee" && meleeType === "singlewield"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="melee"}
                    type="radio"
                    name="melee-radio"
                    id="shield-radio"
                    label="Shield"
                    onChange={(e) => { setMeleeType("shield") }}
                    checked={!isPure && buildType==="melee" && meleeType === "shield"}
                />
                <br/>
                {/*---------------------------------------------------------------------*/}
                <Form.Check
                    disabled={isPure}
                    type="radio"
                    name="build-type-radio"
                    id="magic-only-radio"
                    label="Magic Type"
                    onChange={(e) => { setBuild("magic") }}
                />
                <Form.Check
                    disabled={isPure || buildType!=="magic"}
                    type="radio"
                    name="magic-radio"
                    id="choose-magic-radio"
                    label="Choose for me"
                    onChange={(e) => { setMagicType("rand") }}
                    checked={!isPure && buildType==="magic" && magicType === "rand"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="magic"}
                    type="radio"
                    name="magic-radio"
                    id="sorceries-radio"
                    label="Sorceries"
                    onChange={(e) => { setMagicType("sorc") }}
                    checked={!isPure && buildType==="magic" && magicType === "sorc"}
                />
                <Form.Check
                    disabled={isPure || buildType!=="magic"}
                    type="radio"
                    name="magic-radio"
                    id="incantations-radio"
                    label="Incantations"
                    onChange={(e) => { setMagicType("incant") }}
                    checked={!isPure && buildType==="magic" && magicType === "incant"}
                />
                <div className="d-grid gap-2">
                    <Button onClick={handleSubmit} variant="primary" size="lg">Randomize</Button>
                </div>

            </Form>

        </div>
    )
}
