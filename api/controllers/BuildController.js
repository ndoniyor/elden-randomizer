const build = require('../models/build');


const getRandomMeleeType = () => {
    const meleeTypes = ["powerstance", "dualwield", "singlewield", "shield"];
    return meleeTypes[Math.floor(Math.random() * meleeTypes.length)]
}

const getRandomMagicType = () => {
    const magicTypes = ["sorc", "incant"];
    return magicTypes[Math.floor(Math.random() * magicTypes.length)]
}

//issue here, when i put this all in a function, the response is weird
const getMeleeWeapons = async (meleeType) => {
    let weapons = [];
    const type = (meleeType === "rand") ? getRandomMeleeType() : meleeType
    switch (type) {
        case "powerstance":
            weapons.push(await build.getWepsSameTyped('weapon1."type" = weapon2."type"'));
            break;
        case "dualwield":
            weapons.push(await build.getWepsSameTyped('weapon1."type" != weapon2."type"'));
            break;
        case "shield":
            weapons.push(await build.getItem("shields"));
        case "singlewield":
            weapons.push(await build.getItem("weapons"));
            break;
    }
    console.log("wep1: ", weapons.rows)
    return weapons;
}

exports.generateBuild = async (req, res) => {
    let completedBuild = {};
    const params = req.body;

    //weapon generation
    console.log(params)
    const weapons = await getMeleeWeapons(params.meleeType);
    res.send(weapons)
}
