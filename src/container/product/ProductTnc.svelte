<script>
  import InfoItem from "../../components/BaseInfoItem.svelte";
  export let listTnc = [];
  export let productName = "Super Care Protection"
  export let column = 4;
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
        &.col-grid-3 {
          grid-template-columns: repeat(auto-fill, minmax(20%, 25%));
          justify-content: center;
          grid-gap: 2rem 60px;
        }
      }
    }
  }
</style>

<div class="product_tnc">
  <h3>Ketentuan {productName}</h3>
  <div class="product_tnc__wrapper" class:col-grid-3={column === 3}>
    {#each listTnc as { description, icon, tooltip }, i (description)}
      <InfoItem
        {icon}
        {description}
        tooltipDescription={tooltip}
        key={`tnc-item-${i}`} />
    {/each}
  </div>
</div>
