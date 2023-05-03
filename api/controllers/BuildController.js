const build = require('../models/build');

const getRandomBuildType = () => {
    const buildTypes = ["melee", "magic"];
    return buildTypes[Math.floor(Math.random() * buildTypes.length)]
}

const getRandomMeleeType = () => {
    const meleeTypes = ["powerstance", "dualwield", "singlewield", "shield"];
    return meleeTypes[Math.floor(Math.random() * meleeTypes.length)]
}

const getRandomMagicType = () => {
    const magicTypes = ["sorc", "incant"];
    return magicTypes[Math.floor(Math.random() * magicTypes.length)]
}

const getMeleeWeapons = async (meleeType) => {
    let weaponsList = [];
    const type = (meleeType === "rand") ? getRandomMeleeType() : meleeType
    switch (type) {
        case "powerstance":
            console.log("ps")
            weaponsList = await build.getWepsSameTyped('weapon1."type" = weapon2."type"');
            break;
        case "dualwield":
            console.log("dw")
            weaponsList = await build.getWepsSameTyped('weapon1."type" != weapon2."type"');
            break;
        case "shield":
            console.log("sh");
            weaponsList = await build.getItemsDiffTable("weapons", "shields");
            break;
        case "singlewield":
            console.log("sw");
            weaponsList[0] = await build.getItem("weapons");
            break;
    }
    return weaponsList;
}

const generateBuild = async (req, res) => {
    let completedBuild = {};
    let ashesOfWar = [];
    let buildType, meleeType, magicType, weapons, armor, magic;
    const params = req.body;

    const startingClass = await build.getItem("classes")
    completedBuild["class"] = startingClass;

    const spiritAsh = (await build.getItem("spirits"))
    completedBuild["spiritAsh"] = spiritAsh;

    buildType = (params.buildType === "rand") ? getRandomBuildType() : params.buildType;
    meleeType = (params.meleeType)
    if (buildType === "magic" && params.buildType === "rand")
        params["magicType"] = "rand";

    if (buildType === "melee")
        meleeType = (params.meleeType === "rand") ? getRandomMeleeType() : params.meleeType;
    else
        meleeType = "singlewield";
    weapons = await getMeleeWeapons(meleeType);
    console.log(weapons);
    completedBuild["weapons"] = weapons;

    for (const [i, weapon] of weapons.entries()) {
        console.log("index: ", weapon.name)
        if (weapon.aow) {
            console.log("looking")
            ashesOfWar[i] = (await build.getWhere("ashes", `"type" LIKE '%${weapon.type}%'`, 1))[0]
            delete ashesOfWar[i].type;
        }
    }
    completedBuild["ashesOfWar"] = ashesOfWar;

    armor = (params.armorSets) ? (await build.getItem("armor_sets")) : (await build.getDiffArmors());
    completedBuild["armor"] = armor;

    if (buildType === "magic") {
        magicType = (params.magicType === "rand") ? getRandomMagicType() : params.magicType;
        magic = await build.getWhere("spells", `"type"='${magicType}'`, "5");
        completedBuild["magic"] = magic;
    }
    res.send(completedBuild)
}

module.exports = { generateBuild }