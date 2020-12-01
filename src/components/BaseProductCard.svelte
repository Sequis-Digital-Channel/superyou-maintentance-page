<script>
  import BaseButton from "./BaseButton.svelte";
  import BasePrice from "./BasePrice.svelte";
</script>

<style lang="postcss">
  .product-card {
    border-radius: 12px;
    box-shadow: 0 5px 20px 10px rgba(187, 204, 236, 0.35);
    max-width: 308px;
    background-color: #fff;
    position: relative;

    &__top {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0 16px;
      border-bottom: 1px solid #979797;
      .product-card__feature {
        color: var(--primary-text-color);
        font-weight: bold;
      }

      .product-card__name {
        color: var(--primary-text-color);
        font-size: 14px;
      }
    }

    &__bottom {
      padding: 10px 16px 20px;
      .start-from {
        color: var(--secondary-text-color);
        font-size: 12px;
      }
      .benefit-summary {
        color: var(--secondary-text-color);
        font-size: 14px;
        & > p {
          margin: 14px 0 12px 0;
          font-weight: 600;
        }
        & ul {
          li {
            display: inline-grid;
            grid-template-columns: 10px 1fr;
            grid-gap: 8px;

            &:not(:first-child) {
              margin-top: 10px;
            }
            span:first-child {
              font-weight: 600;
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
</style>

<div class="product-card" style="margin: 0 auto;">
  <div class="product-card__top">
    <div class="icon lazy-image">
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        data-src="/icons/products/strong/super-strong.svg"
        alt="super strong"
        width="70"
        height="70" />
    </div>
    <h6 class="product-card__feature">Proteksi Jiwa + 3 Penyakit Kritis</h6>
    <span class="product-card__name">Super Strong Protection</span>
  </div>
  <div class="product-card__bottom">
    <span class="start-from">Mulai dari</span><br />
    <BasePrice />

    <div class="benefit-summary">
      <p>Memberi manfaat berupa :</p>
      <ul>
        <li>
          <span>✓</span>
          <span>Santunan saat terdiagnosa kanker, stroke, atau serangan jantung</span>
        </li>
        <li>
          <span>✓</span>
          <span>Santunan kematian karena apapun yang tidak disebabkan oleh
            kecelakaan</span>
        </li>
      </ul>
    </div>

    <div class="cta-btn">
      <BaseButton style="max-width: 330px;font-size:14px;margin:30px auto 0;">
        LIHAT DETAIL
      </BaseButton>
    </div>
  </div>
</div>
