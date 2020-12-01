import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#superyou')
});

  const images = Array.from(document.querySelectorAll('.lazy-image img'));
	if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries, observer) => {
					entries.forEach(entry => {
							if (entry.isIntersecting) {
									const image = entry.target;
									image.src = image.dataset.src;
									image.classList.add("lazyloaded");
									imageObserver.unobserve(image);
							}
					});
			});

			images.forEach(img => imageObserver.observe(img));
	} else {
		images.forEach(img => {
			img.src = img.dataset.src;
		});
	}
