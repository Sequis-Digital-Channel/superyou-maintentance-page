require("dotenv").config();

import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { json } from "body-parser";

const {
	PORT,
	NODE_ENV,
	API_PRODUCT_CATALOGUE,
	APP_URL,
	SUPER_API_URL,
	LEADGEN_CLIENT_KEY,
	APP_ENV,
	GTM_ID,
	GMAPS_KEY
} = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		json(),
		sirv("static", { dev }),
		sapper.middleware({
			session: () => ({
				API_PRODUCT_CATALOGUE,
				APP_URL,
				SUPER_API_URL,
				LEADGEN_CLIENT_KEY,
				NODE_ENV,
				APP_ENV,
				GTM_ID,
				GMAPS_KEY
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log("error", err);
	});
