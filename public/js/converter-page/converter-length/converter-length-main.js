import { initConverter } from "../converter-main.js";

initConverter({
    inputStartId: "length_start",
    inputEndId: "length_end",
    selectFromId: "length_from",
    selectToId: "length_to",

    units: ["mm", "cm", "dm", "m", "km", "yard", "au", "ly"],
    factors: {
        mm: 1,
        cm: 10,
        dm: 100,
        m: 1000,
        km: 1000000,
        yard: 914.4,
        au: 1.496e+14,
        ly: 9.461e+18
    },

    defaultFrom: "m",
    defaultTo: "km"
});