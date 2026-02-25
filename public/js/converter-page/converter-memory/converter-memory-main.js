import { initConverter } from "../converter-main.js";

initConverter({
    inputStartId: "memory_start",
    textEndId: "memory_end",
    selectFromId: "memory_from",
    selectToId: "memory_to",

    units: ["B", "KB", "MB", "GB", "TB"],
    factors: {
        B: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
    },

    defaultFrom: "GB",
    defaultTo: "MB"
});

