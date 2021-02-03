	/* Loading web fonts with Font Loading API to avoid multiple repaints. With help by Irina Lipovaya. */
		/* Credit to initial work by Zach Leatherman: https://noti.st/zachleat/KNaZEg/the-five-whys-of-web-font-loading-performance#sWkN4u4 */

		// If the Font Loading API is supported...
		// (If not, we stick to fallback fonts)
		if ("fonts" in document)
		{
			// Create new FontFace objects, one for each font
			let OpenSansSemiBold = new FontFace(
				"Open Sans",
				"url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2) format('woff2')",
				{
					weight: "600"
				}
			);

			let OpenSansBold = new FontFace(
				"Open Sans",
				"url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2) format('woff2')",
				{
					weight: "700"
				}
			);
			// Load all the fonts but render them at once
			// if they have successfully loaded
			let loadedFonts = Promise.all([
				OpenSansSemiBold.load(),
				OpenSansBold.load()
			]).then(result => {
				console.log(result);
				result.forEach(font => document.fonts.add(font));
				// document.documentElement.classList.add('wf-loaded-stage2');

				// Used for repeat views
				sessionStorage.foutFontsStage2Loaded = true;
			}).catch(error => {
				throw new Error(`Error caught: ${error}`);
			});

		}