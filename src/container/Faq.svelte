<script>
  import BaseAccordion from "../components/BaseAccordion.svelte";
  import BaseButton from "../components/BaseButton.svelte";

  export let FAQtitle = "";
  export let accordionData = [];
  export let appUrl = "";
</script>

<style lang="postcss">
  .product-faq {
    margin: 0 auto;
    max-width: 1280px;
    padding: 50px 0;
  }
</style>

<div class="product-faq">
  <h2 class="text-xl text-center font-bold mb-6 lg:mb-6">{FAQtitle}</h2>
  <BaseAccordion {accordionData} />

  <BaseButton
    on:click={() => {
      window.location.href = `${appUrl}/faq`;
    }}
    style="max-width: 330px;font-size:14px; color:#0d294a; border: 1px solid #0d294a;margin: 0 auto;"
    bgColor={'transparent'}>
    CEK FAQ SELENGKAPNYA
  </BaseButton>
</div>
