import { initConverter } from "../converter-main.js";

initConverter({
    inputStartId: "mass_start",
    inputEndId: "mass_end",
    selectFromId: "mass_from",
    selectToId: "mass_to",

    units: ["mg", "g", "kg", "t", "lb", "oz"],
    factors: {
        mg: 1,
        g: 1000,
        kg: 1000000,
        t: 1000000000,
        lb: 453592.37,  //pound
        oz: 28349.5,    // ounce
    },

    defaultFrom: "kg",
    defaultTo: "g"
});
