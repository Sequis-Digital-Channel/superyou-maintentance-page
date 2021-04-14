<script context="module">
  import introduceData from "../data/json/home/superyou-introduce.json";
</script>

<script>
  import AboveTheFold from "../container/home/AboveTheFold.svelte";
  import BoxMobileAccordion from "../container/home/BoxMobileAccordion.svelte";
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

<style lang="postcss">
  .superyou-introduce {
    .excerpt {
      @media (max-width: 375px) {
        max-width: 320px;
      }
    }
  }
</style>