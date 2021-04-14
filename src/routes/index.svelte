<script context="module">
  import introduceData from "../data/json/home/superyou-introduce.json";
  import stepsToBuy from "../data/json/home/steps-to-buy.json";
</script>

<script>
  import { onMount } from "svelte";

  import AboveTheFold from "../container/home/AboveTheFold.svelte";
  import BoxMobileAccordion from "../container/home/BoxMobileAccordion.svelte";

  onMount(() => {
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
    } else {
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  })
</script>

<section id="superyou-home" class="above-the-fold-wrapper">
  <AboveTheFold />
</section>

<section class="superyou-introduce py-10 px-3 xl:px-12">
  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-center text-darkblue font-bold text-2xl lg:text-3xl leading-snug">
      Gaya Baru Kamu dalam Berasuransi Online
    </h2>
    <p class="excerpt text-center text-sm text-bluegray mt-4 mx-auto mb-6">
      Super You by Sequis Online adalah produk asuransi jiwa dan kesehatan online yang berkomitmen dalam memberikan pengalaman terbaik dalam berasuransi digital demi memenuhi semua kebutuhan finansial kamu.
    </p>

    <div class="mx-auto mt-8 md:mt-12 md:max-w-3/4 md:grid lg:max-w-full lg:grid-cols-4 lg:gap-x-4 md:grid-cols-2 md:justify-items-center md:gap-5">
      {#each introduceData.boxes as {icon, title, content}, i (`${i}-${icon}`) }
        <BoxMobileAccordion {icon} {title} {content} />
      {/each}
    </div>

  </div>
</section>

<!-- FAQ -->

<section class="steps-to-buy py-8 px-3 xl:px-12">
  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">4 Langkah Mudah Pembelian <br class="sm:hidden">Asuransi di Super You</h2>

    <p class="text-center text-sm text-bluegray mt-4 mx-auto mb-6">
      Kamu bisa membeli asuransi online Super You dengan mengikuti langkah-langkah berikut:
    </p>

    <div class="stb-wrapper mt-12 md:grid md:grid-cols-4 md:gap-x-12">
      {#each stepsToBuy.data as { icon, title, content }, i (icon)}
        <div class="each-step flex flex-no-wrap md:flex-col mb-2">
          <div class="flex flex-no-wrap flex-none">
            <div class="w-5 h-5 md:w-8 md:h-8 bg-darkblue rounded-full flex justify-center items-center">
              <span class="text-xxs text-white md:text-base md:font-bold">{i + 1}</span>
            </div>

            <div class="img-wrapper ml-1 md:ml-0 lazy-image flex flex-col items-center md:flex-row md:justify-center">
              <img
                class={`stb-img-${i} md:ml-auto`}
                srcsrc="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                data-src="{icon}"
                alt="Step One"
                width="75px"
                height="75px"
              >
              {#if (i + 1) < stepsToBuy.data.length}
              <span class="text-black mt-2 text-xl md:hidden">&darr;</span>
              <span class="text-black mt-2 text-3xl hidden md:inline-block font-bold ml-auto">&rarr;</span>
              {/if}
            </div>
          </div>

          <div class="stb-content pl-4 md:pl-0">
            <h4 class="text-darkblue font-bold text-base md:text-center md:mt-6">{title}</h4>
            <p class="text-bluegray text-sm md:mt-3 md:text-center">{content}</p>
          </div>
        </div>
      {/each}
    </div>

    <a class="get-now relative w-64 block mt-8 mx-auto bg-teal px-4 py-3 rounded-xl text-sm text-white font-bold" rel="external" href="/isi-data">DAPATKAN SEKARANG <span class="arr">&rarr;</span></a>
  </div>
</section>

<style lang="postcss">
  .superyou-introduce {
    .excerpt {
      @media (max-width: 375px) {
        max-width: 320px;
      }
    }
  }

  .steps-to-buy{
    .img-wrapper {
      width: 75px;
      @media (min-width: 768px) {
        width: 84%;
        img {
          width: 80px;
          height: 80px;

          &.stb-img-3 {
            margin-right: auto;
          }
        }
      }
    }
    .get-now {
        .arr {
          transition: 0.4s;
          position: absolute;
          right: 16px;
        }

        &:hover {
          .arr {
            right: 12px;
          }
        }
      }
  }  
  
</style>