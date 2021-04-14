<script>
  import { moneyFormat, toBillion } from "../utils/_moneyandtobillion";

  export let plan_data;
</script>

<style lang="postcss">
  .result-card {
    max-width: 423px;
    margin: 0 auto;
    box-shadow: 0px 0px 12px 0px rgb(109 131 172 / 26%);
    border-radius: 12px;
    &__header {
      background-color: #0d294a;
      color: #fff;
      padding: 10px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      display: flex;
      flex-wrap: nowrap;
      @media (min-width: 640px) {
        padding: 10px 16px;
        width: 423px;
      }

      .icon {
        margin-right: 8px;
        max-width: 42px;

        @media (max-width: 639px) {
          max-width: 30px;
        }
      }

      .text-sm-white {
        font-size: 10px;
        @media (min-width: 640px) {
          font-size: 12px;
        }
      }
      .text-lg-white {
        font-size: 18px;
        font-weight: bold;
        @media (min-width: 640px) {
          font-size: 22px;
        }
      }
      .name,
      .price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.4;
      }

      .price {
        margin-left: auto;
        text-align: right;
      }
    }
    &__body {
      background-color: #fff;
      padding: 18px 20px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      .bold {
        font-weight: bold;
      }
      .semi-bold {
        font-weight: 600;
      }
      .tx-sm {
        font-size: 14px;
      }
      .tx-xs {
        font-size: 12px;
      }
      .tx-lg {
        font-size: 18px;
      }
      .color-darkblue {
        color: #0d294a;
      }
      .color-lightgray {
        color: #708697;
      }
      .benefit-title {
        margin: 10px 0 12px 0;
      }

      .benefit-group {
        &:not(:last-child) {
          margin-bottom: 32px;
        }
        .benefit-items {
          margin-top: 15px;
          .benefit {
            display: flex;

            &:not(:last-child) {
              border-bottom: 1px solid #d8d6d6;
              margin-bottom: 15px;
              padding-bottom: 15px;
            }

            .left {
              .description {
                display: flex;
                flex-direction: column;
                .info {
                  line-height: 1.4;
                  display: inline-block;
                  margin-top: 5px;
                }
              }
            }

            .right {
              margin-left: auto;
              flex: 1 0 27%;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>

<div class="result-card">
  <div class="result-card__header">
    <div class="icon flex items-center">
      <img
        src={plan_data.icon_svg}
        alt={plan_data.product_name}
        width="42"
        height="42" />
    </div>
    <div class="name">
      <span class="product text-sm-white">{plan_data.product_name}</span>
      <h3 class="plan text-lg-white">{plan_data.name}</h3>
    </div>
    <div class="price">
      <span class="term text-sm-white">Total Pembayaran / bulan</span>
      <h3 class="price text-lg-white">
        {moneyFormat(plan_data.monthly_premium)}
      </h3>
    </div>
  </div>
  <div class="result-card__body">
    <p class="color-darkblue bold tx-sm">Manfaat</p>

    {#each plan_data.benefit_group_categories as { benefits, name, id } (id)}
      <div class="benefit-group">
        <h4 class="benefit-title color-darkblue semi-bold text-sm">{name}</h4>
        <!-- benefit item -->
        <div class="benefit-items">
          <!-- LOOP HERE -->
          {#each benefits as { benefit, benefit_notes, value, id } (id)}
            <div class="benefit">
              <div class="left">
                <div class="description">
                  <p class="color-lightgray tx-sm">{benefit}</p>
                  <span
                    class="info color-lightgray tx-xs">{@html benefit_notes}</span>
                </div>
              </div>
              <div class="right">
                <p class="tx-lg bold color-darkblue">{toBillion(value)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

{#if plan_data.is_cashless}
  <p class="mb-4 text-teal font-semibold text-sm py-4 px-2">
    Metode Klaim:
    <span class="text-darkblue font-normal"><em>Cashless</em></span>
  </p>
{/if}
