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
    let weaponsList = [];
    let weapons = [];
    const type = (meleeType === "rand") ? getRandomMeleeType() : meleeType
    switch (type) {
        case "powerstance":
            console.log("ps")
            weaponsList.push(await build.getWepsSameTyped('weapon1."type" = weapon2."type"'));
            break;
        case "dualwield":
            console.log("dw")
            weaponsList.push(await build.getWepsSameTyped('weapon1."type" != weapon2."type"'));
            break;
        case "shield":
            weaponsList.push(await build.getItemsDiffTable("weapons", "shields"));
            break
        case "singlewield":
            weaponsList.push(await build.getItem("weapons"));
            break;
    }
    return weaponsList;
}

const generateBuild = async (req, res) => {
    let completedBuild = {};
    const params = req.body;

    //weapon generation
    const weapons = await getMeleeWeapons(params.meleeType);
    const armor = (params.armorSets) ? (await build.getItem("armor_sets")) : (await build.getDiffArmors());
    //console.log(weapons)
    res.send(weapons)
}


module.exports = {generateBuild}