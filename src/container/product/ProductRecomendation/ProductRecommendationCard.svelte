<script>
</script>

<style lang="postcss">
  .product-rec-card {
    position: relative;
    border-radius: 12px;
    box-shadow: 0 5px 20px 10px rgba(187, 204, 236, 0.35);
    background-color: #ffffff;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    max-width: 90%;
    display: grid;

    grid-template-columns: 50px 1fr;
    grid-template-rows: auto;
    grid-gap: 10px 15px;

    @media (min-width: 640px) {
      max-width: 1017px;
    }

    @media (min-width: 768px) {
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto;
      grid-gap: 6px 20px;
    }

    .product-icon {
      @media (min-width: 768px) {
        grid-row: 1 / 3;
        margin-top: 6px;
      }
    }

    .title {
      color: #0d294a;
      font-size: 16px;
      font-weight: bold;
      @media (min-width: 768px) {
        grid-column: 2 / span 2;
      }
    }
    .description {
      font-size: 14px;
      color: #708697;
      grid-column: 1 / 3;
      grid-row: 2 / 3;

      @media (min-width: 768px) {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
    }

    .see-detail {
      font-size: 14px;
      color: #03a3a6;
      grid-column: 1 / 3;
      grid-row: 3 / 4;
      margin-top: 20px;
      @media (min-width: 768px) {
        grid-column: 2;
        grid-row: 3 / 4;
      }
    }

    .price {
      display: flex;
      flex-wrap: nowrap;
      line-height: 1;
      max-height: 28px;
      grid-column: 1 / 3;

      @media (min-width: 768px) {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
        align-self: end;
      }

      & > p {
        font-size: 26px;
        font-weight: bold;
        color: #0d294a;
      }

      & > span {
        font-size: 12px;
        color: #708697;
        margin-left: 2px;
        display: flex;
        align-items: flex-end;
      }
    }

    .add-product {
      position: absolute;
      width: 36px;
      height: 36px;
      font-size: 32px;
      color: #fff;
      background-color: #00aaae;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      right: -10px;
      bottom: -20px;
      &:focus {
        outline: none;
      }
    }
  }
</style>

<div class="product-rec-card">
  <div class="product-icon lazy-image">
    <img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      data-src="https://superyou.co.id/img/icons/prod-umbrella.svg"
      alt="Super Safe"
      width="50"
      height="50" />
  </div>
  <h4 class="title">Tambahkan Super Safe Protection</h4>
  <p class="description">
    untuk pemberian santunan saat kamu terdiagnosa kanker, stroke, atau serangan
    jantung dan santunan kematian karena apapun yang tidak disebabkan oleh
    kecelakaan termasuk karena COVID-19.
  </p>
  <a class="see-detail" href="/">Lihat Detail</a>

  <div class="price">
    <p>Rp 36,500</p>
    <span>/ bulan</span>
  </div>

  <button
    class="add-product"
    role="button"
    aria-label="add-to-cart">&plus;</button>
</div>
