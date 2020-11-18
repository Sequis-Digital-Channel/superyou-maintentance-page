<script>
  import InfoItem from "../InfoItem.svelte";
  import BaseButton from "../BaseButton.svelte";
  import IcPdf from "../svg/IcPdf.svelte";
  export let listTnc = [];
  let btnStyle = `
    max-width: 314px;
    font-size:14px;
    margin:0 auto 20px;
    background: transparent;
    color: #0d294a;
    border: 1px solid #0d294a;
    margin-top: 30px;
  `;
</script>

<style lang="postcss">
  .product_tnc {
    padding: 56px 0 36px;
    max-width: 1220px;
    margin: 0 auto;

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
      margin-bottom: 60px;
      @media (min-width: 640px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 3rem 8%;
      }
    }

    &__more-info {
      text-align: center;
      color: #0d294a;
      font-size: 14px;
    }
  }
</style>

<div class="product_tnc">
  <h3>Ketentuan Super Care Protection</h3>
  <div class="product_tnc__wrapper">
    {#each listTnc as { description, icon } (description)}
      <InfoItem {icon} {description} />
    {/each}
  </div>

  <p class="product_tnc__more-info">
    Baca dan download informasi selengkapnya mengenai produk ini di
  </p>

  <BaseButton style={btnStyle}>
    RINGKASAN INFORMASI PRODUK
    <IcPdf />
  </BaseButton>
</div>
