<script>
  import BaseAccordion from "../components/BaseAccordion.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import BaseList from "../components/BaseList.svelte";

  export let FAQtitle = "";
  export let accordionData = [];
  export let appUrl = "";
  export let type = "";
</script>

<style lang="postcss">
  .product-faq {
    margin: 0 auto;
    max-width: 1280px;
    padding: 50px 0;
  }
</style>

<div class="product-faq">
  {#if type == "list"}
  <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">{FAQtitle}</h2>
  <BaseList {accordionData} />
  {:else}
  <h4 class="text-xl text-center font-bold mb-6 lg:mb-6">{FAQtitle}</h4>
  <BaseAccordion {accordionData} />
  {/if}

  <div class="lg:mt-12">
    <BaseButton
      on:click={() => {
        window.location.href = `${appUrl}/faq`;
      }}
      style="max-width: 330px;font-size:14px; color:#0d294a; border: 1px solid #0d294a;margin: 0 auto;"
      bgColor={'transparent'}>
      CEK FAQ SELENGKAPNYA
    </BaseButton>
  </div>
</div>
