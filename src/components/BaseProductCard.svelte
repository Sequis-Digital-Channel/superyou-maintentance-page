<script>
  import { beforeUpdate } from "svelte";
  import BasePrice from "./BasePrice.svelte";

  export let detail;
  export let appUrl;

  let listBenefits = []

  function normalizationBenefit() {
    const arrBene = [];
    if (detail && detail.benefit_groups) {
      detail.benefit_groups.forEach(group => {
        group.benefits.forEach(benefit => {
          if (arrBene.length <= 2) {
            arrBene.push(benefit)
          }
        })
      })
    }

    return arrBene;
  }

  beforeUpdate(() => {
    listBenefits = normalizationBenefit();
  });
</script>

<style lang="postcss">
  .product-card {
    border-radius: 12px;
    box-shadow: 0 5px 12px 6px rgba(187, 204, 236, 0.35);
    background-color: #fff;
    position: relative;
    max-width: 300px;

    &__top {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0 16px;
      border-bottom: 1px solid #979797;
      .product-card__feature {
        color: var(--primary-text-color);
        font-weight: bold;
        max-width: 240px;
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
          /* min-height: 268px; */
          height: 130px;
          /* overflow: auto; */

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
    <div class="icon p-2">
      <img
        src={detail.icon_svg}
        alt={detail.name}
        width="55"
        height="55"
        style="max-height:55px;min-height:50px;height:55px;"/>
    </div>
    <h6 class="product-card__feature text-center whitespace-no-wrap overflow-ellipsis overflow-hidden">{detail.subheading}</h6>
    <span class="product-card__name">{detail.name}</span>
  </div>
  <div class="product-card__bottom">
    <span class="start-from">Mulai dari</span><br />
    <BasePrice amount={35000} />

    <div class="benefit-summary">
      <p>Memberi manfaat berupa :</p>
      <ul>
        {#each listBenefits as {name, id} (id)}
          <li>
            <span>✓</span>
            <span>{name}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div class="cta-btn-wrapper">
      <a href={`${appUrl}/produk/${detail.slug}`}>
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
      </a>
    </div>
  </div>
</div>
