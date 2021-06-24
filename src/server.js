require("dotenv").config();

import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { json } from "body-parser";

const {
	PORT,
	NODE_ENV,
	APP_URL,
	LEADGEN_URL,
	APP_ENV,
	GTM_ID,
} = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		json(),
		sirv("static", { dev }),
		sapper.middleware({
			session: () => ({
				APP_URL,
				LEADGEN_URL,
				NODE_ENV,
				APP_ENV,
				GTM_ID,
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log("error", err);
	});
