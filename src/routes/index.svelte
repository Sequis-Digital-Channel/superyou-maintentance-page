<script>
  import AboveTheFold from "../components/AboveTheFold.svelte";
  import ProductBenefits from "../components/ProductBenefits/ProductBenefits.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import RightArrow from "../components/svg/RightArrow.svelte";

  const backgroudColor = `
  linear-gradient(151deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 100%), linear-gradient(143deg, #f7b500 22%, #e8d556 87%), linear-gradient(321deg, #fff546 95%, #e8d556 57%);
  `;
</script>

<style lang="postcss">
  .container {
    padding-left: 10px;
    padding-right: 10px;

    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<AboveTheFold bgGradient={backgroudColor} />

<section class="container">
  <ProductBenefits />

  <BaseButton style="max-width: 294px;font-size:14px;margin:0 auto 20px;">
    CEK MANFAAT & DETAIL PLAN
    <RightArrow />
  </BaseButton>
</section>
