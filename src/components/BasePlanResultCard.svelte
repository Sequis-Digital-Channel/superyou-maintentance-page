<script>
  import { moneyFormat, toBillion } from "../utils/_moneyandtobillion";

  export let plan_data;
  export let selected_riders_slug = [];
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
    .bene-rider:last-child {
      border-bottom: none;
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
    <p class="text-darkblue bold text-sm">Manfaat</p>

    {#each plan_data.benefit_group_categories as { benefits, name, id } (id)}
      <div class="benefit-group">
        <h4 class="benefit-title text-darkblue semi-bold text-sm">{name}</h4>
        <!-- benefit item -->
        <div class="benefit-items">
          <!-- LOOP HERE -->
          {#each benefits as { benefit, benefit_notes, value, id } (id)}
            <div class="benefit">
              <div class="left">
                <div class="description">
                  <p class="text-bluegray text-sm">{@html benefit}</p>
                  <span
                    class="info text-bluegray text-xs">{@html benefit_notes}</span>
                </div>
              </div>
              <div class="right">
                <p class="text-lg bold text-darkblue">{toBillion(value)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  {#if selected_riders_slug.length}
    <div class="result-card__riders">
    {#each plan_data.riders as rider (rider.id) }
      {#if selected_riders_slug.includes(rider.product_slug)}
      <div class="bg-darkblue text-white py-2 px-4 flex justify-between">
        <div class="flex items-center">
          <img src={`https://superyou.co.id/${rider.icon_svg}`} alt="Rider Icon" width="30x" height=30px; class="transform scale-125">
          <span class="inline-block ml-2 sm:ml-3">{rider.product_name}</span>
        </div>
        <p class="text-right font-bold text-lg self-center">{moneyFormat(rider.monthly_premium)}</p>
      </div>
      <div class="benefits-rider px-4 pt-1">
        {#each rider.benefits as benefit (benefit.id)}
        <div class="bene-rider flex justify-between py-3 border-b border-gray-400">
          <div class="max-w-3/4">
            <p class="text-bluegray text-sm mb-2">{@html benefit.benefit}</p>
            <p class="text-bluegray text-xs">{@html benefit.benefit_notes}</p>
          </div>
          <div class="benefit-value text-darkblue text-lg font-bold">{toBillion(benefit.value)}</div>
        </div>
        {/each}
      </div>
      {/if}
    {/each}
    </div>
  {/if}
</div>

{#if plan_data.is_cashless}
  <p class="mb-4 text-teal font-semibold text-sm py-4 px-2">
    Metode Klaim:
    <span class="text-darkblue font-normal"><em>Cashless</em></span>
  </p>
{/if}
