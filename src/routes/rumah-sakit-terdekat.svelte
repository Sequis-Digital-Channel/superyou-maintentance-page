<script context="module">
	import dataFaqNearestHospital from "../data/json/nearest-hospital/faq.json";
	import emergencyContactData from "../data/json/nearest-hospital/emergency-contact.json";
	import contactUsData from "../data/json/nearest-hospital/contact-us.json";

  export async function preload(page, session) {
    const { API_PRODUCT_CATALOGUE, APP_URL, GMAPS_KEY } = session;
	
    return {
      api_product_url: API_PRODUCT_CATALOGUE,
			app_url : APP_URL,
			gmaps_key : GMAPS_KEY
    };
  }
</script>

<script>
	import { onMount } from "svelte";
	
	import BaseButton from "../components/BaseButton.svelte";
  import IcPdf from "../components/svg/IcPdf.svelte";

  import Faq from "../container/Faq.svelte";
  import Leadgen from "../container/Leadgen.svelte";
  import { loadFlickity } from "../utils/_loadflickity";
	import Analytics from "../components/Analytics.svelte";
	
	import BoxGrid from "../container/nearest-hospital/BoxGrid.svelte";
	import ContactUs from "../container/nearest-hospital/ContactUs.svelte";

	import Map from "../container/nearest-hospital/Map.svelte";

  export let app_url;
	export let api_product_url;
	export let gmaps_key;
	
  let OtherProductsContainer;
  let isFlicktyLoaded = false;
  let otherproductsOrder = [
      'super-life-protection',
      'super-strong-protection',
      'super-care-protection',
      'super-safe-protection',
      'super-well-protection',
      'my-hospital-protection',
		];

  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadOtherProductsContainer = (e) => {
      import(
        "../container/product/OtherProducts/OtherProductsContainer.svelte"
      )
        .then((module) => {
          OtherProductsContainer = module.default;
        })
        .catch(logError);
    };

  onMount( async () => {
    const images = Array.from(document.querySelectorAll(".lazy-image img"));
    if ("IntersectionObserver" in window) {
      // lazyload image observer
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.add("lazyloaded");
            imageObserver.unobserve(image);
          }
        });
      });
      images.forEach((img) => imageObserver.observe(img));

      const otherProd = document.querySelector(".otherproduct-index");
      const otherProdObserver = new IntersectionObserver((entries) => {
        const el = entries[0];
        if(el.isIntersecting) {
          otherProdObserver.unobserve(otherProd);
          if (!isFlicktyLoaded) {
            loadFlickity();
            isFlicktyLoaded = true;
            loadOtherProductsContainer();
          }
        }
      },
      {rootMargin: "-400px 0px 0px 0px",}
      );
      otherProdObserver.observe(otherProd);

    } else {
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
		}
	})
</script>

  <svelte:head> 
    <title>Rumah Sakit Terdekat</title>
		<script src={`https://maps.googleapis.com/maps/api/js?key=${gmaps_key}&libraries=&v=weekly`} />
  </svelte:head>

<section id="superyou-home" class="above-the-fold-wrapper"></section>

<section id="superyou-maps" style="margin-top: 41px;">
	<div class="mx-auto max-w-screen-xl" style="padding-top: 50px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Temukan Rumah Sakit Terdekat dari Lokasi Saya</h2>
		<p class="text-center text-sm text-bluegray mt-4 mx-auto mb-6 lg:max-w-screen-md">
      Cari rumah sakit terdekat dari lokasi kamu sekarang, lengkap beserta peta, alamat, dan nomor telepon menuju rumah sakit terdekat.
    </p>
	</div>

	<Map />

	<div class="mx-auto max-w-screen-xl" style="margin-top: 41px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Download Informasi Rumah Sakit Rekanan Admedika di</h2>
	</div>

	<div style="margin:32px auto 20px;padding: 0 10px; max-width:325px;">
		<a href={`${app_url}`} target="_blank">
		<BaseButton
			style="font-size:14px;
			color: #0d294a;
			height:auto;
			border: 1px solid #0d294a;"
			bgColor={"transparent"}
		>
			<p class="pt-2 pb-2 sm:pt-3 sm:pb-3">
				RINGKASAN INFORMASI PRODUK
			</p>
			<span slot="icon">
				<IcPdf />
			</span>
		</BaseButton>
		</a>
	</div>
</section>

<section class="su_container">
	<div class="mx-auto max-w-screen-xl" style="margin-top: 41px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Sudah Ada Proteksi Kesehatan?</h2>
		<p class="text-center text-sm text-bluegray mt-4 mx-auto mb-6 lg:max-w-screen-md">
      Tagihan perawatan rumah sakit itu tinggi lho. Karena itu, pastikan kamu sudah mengantisipasi kondisi darurat medis dengan mendapatkan perlindungan asuransi kesehatan Super You dari sekarang.
    </p>
	</div>
</section>

<section class="su_container otherproduct-index" style="background-color:#e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component
      this={OtherProductsContainer}
      apiProductUrl={api_product_url}
      appUrl={app_url}
      productsOrder={otherproductsOrder}
			page="rumah-sakit-terdekat"
			slugException="sequis-genius-life-care-insurance" />
  {:else}
    <div class="otherproduct_progress" />
  {/if}
</section>
  
<section class="su_container faq">
  <Faq
    appUrl={app_url}
    FAQtitle="Cara Mudah Klaim di Super You"
    accordionData={dataFaqNearestHospital["faq-nearest-hospital"]}
		type="list"
  />
</section>

<section class="su_container">
	<div class="mx-auto max-w-screen-xl" style="margin-top: 41px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Tips Pertolongan Pertama</h2>
		<p class="text-center text-sm text-bluegray mt-6 mx-auto">
      Jika kamu mengalami gejala atau kondisi medis darurat, segera hubungi rumah sakit terdekat. Disarankan untuk tidak menunda pertolongan medis, karena dapat berakibat fatal bagi jiwa dan kesehatan. 
    </p>
		<h2 class="text-center text-darkblue text-lg md:text-2xl mt-8">Kamu juga bisa membaca lebih lanjut tentang <span style="color: #00aaae">Pertolongan Pertama</span> dengan artikel-artikel ini:</h2>
	</div>
</section>

<section class="su_container emergency">
	<div class="mx-auto max-w-screen-xl" style="margin-top: 41px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Kontak Darurat Medis</h2>
		<p class="text-center text-sm text-bluegray mt-4 mx-auto mb-6">
      Hubungi nomor rumah sakit terdekat yang tertera di peta, atau hubungi nomor layanan darurat berikut:
    </p>

    <BoxGrid data={emergencyContactData["boxes"]} />
	</div>
</section>

<section class="su_container contact-us">
	<div class="mx-auto max-w-screen-xl" style="margin-top: 41px;">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">Hubungi Kami</h2>

    <ContactUs data={contactUsData["boxes"]} />
	</div>
</section>

<Leadgen />

<Analytics
  eventValue="asuransi-online-super-you-murah-mudah-cepat"
  eventGoal="chosing-product"
  pageType="home-page"
  pageTitle="Asuransi Online Super You - Murah, Mudah, Cepat"
/>

<style lang="postcss">
  .su_container {
    padding-left: 10px;
    padding-right: 10px;
    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }

    .otherproduct_progress {
      height: 675px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 38px 0;
      overflow-y: hidden;
    }
  }

  .su_container.faq,
  .su_container.otherproduct-index
  {
    content-visibility: auto;
    contain-intrinsic-size: 700px;
  } 
  
</style>