import { initConverter } from "../converter-main.js";

    try {
        const response = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        const data = await response.json();

        if (data.result !== "success") {
            throw new Error("API error");
        }

        const units = Object.keys(data.rates);
        const factors = data.rates;

        initConverter({
            inputStartId: "currency_start",
            inputEndId: "currency_end",
            selectFromId: "currency_from",
            selectToId: "currency_to",

            units,
            factors,

            defaultFrom: "USD",
            defaultTo: "EUR",
            precision: 2,
            isCurrency: true,
        });

    } catch (error) {
        console.error("Currency API error:", error);
    }
