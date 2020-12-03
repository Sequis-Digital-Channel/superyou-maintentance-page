<script>
  import BasePrice from "./BasePrice.svelte";
</script>

<style lang="postcss">
  .product-card {
    border-radius: 12px;
    box-shadow: 0 5px 12px 6px rgba(187, 204, 236, 0.35);
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

      .cta-btn {
        margin-top: 34px;
        width: 100%;
        max-width: 314px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 18px;
        padding-right: 18px;
        height: 38px;
        border-radius: 12px;
        color: #fff;
        font-weight: bold;
        border: none;
        cursor: pointer;
        letter-spacing: 0.3px;
        background-color: #00aaae;
        max-width: 330px;
        font-size: 12px;
      }
    }
  }
</style>

<div class="product-card">
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

    <div class="cta-btn-wrapper">
      <button class="cta-btn">LIHAT DETAIL
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="12"
          height="12"
          viewBox="0 0 12 12">
          <defs>
            <path
              id="a"
              d="M3.69 6.997l3.563 3.296a.948.948 0 0 1 0 1.414c-.422.39-1.107.39-1.53 0l-5.406-5a.948.948 0 0 1 0-1.414l5.407-5a1.145 1.145 0 0 1 1.53 0 .948.948 0 0 1 0 1.414l-3.559 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23z" />
          </defs>
          <use
            fill="#fff"
            fill-rule="nonzero"
            transform="rotate(-180 6 6)"
            xlink:href="#a" />
        </svg>
      </button>
    </div>
  </div>
</div>
