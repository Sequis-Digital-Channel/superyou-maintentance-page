<script>
  import InfoItem from "../../components/BaseInfoItem.svelte";
  export let listTnc = [];
</script>

<style lang="postcss">
  .product_tnc {
    padding: 56px 0 20px;
    max-width: 1220px;
    margin: 0 auto;

    @media (min-width: 768px) {
      padding-bottom: 36px;
    }

    & > h3 {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 32px;
      color: #0d294a;

      @media (min-width: 768px) {
        font-size: 24px;
      }
    }

    &__wrapper {
      margin-bottom: 40px;
      @media (min-width: 640px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 3rem 6%;
      }
    }
  }
</style>

<div class="product_tnc">
  <h3>Ketentuan Super Care Protection</h3>
  <div class="product_tnc__wrapper">
    {#each listTnc as { description, icon, tooltip }, i (description)}
      <InfoItem
        {icon}
        {description}
        tooltipDescription={tooltip}
        key={`tnc-item-${i}`} />
    {/each}
  </div>
</div>
