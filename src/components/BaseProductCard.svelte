<script>
  let benefit_group = [
    {
      title: "Perlindungan untuk Penyakit Menular",
      list_benefit: [
        {
          title: "Biaya Perawatan Rumah Sakit",
          info: "Maks per Penyakit",
          amount: "25 Juta",
        },
        {
          title: "Santunan Tunai Harian Rawat Inap (akibat Covid-19)",
          info: "Maks 30 hari per Tahun Polis. Per hari sebesar ",
          amount: "1 Juta",
        },
        {
          title: "Santunan Kematian",
          info: "",
          amount: "100 Juta",
        },
      ],
    },
    {
      title: "Perlindungan untuk Kecelakaan",
      list_benefit: [
        {
          title: "Biaya Perawatan Rumah Sakit",
          info: "Maks per Kecelakaan",
          amount: "25 Juta",
        },
        {
          title: "Biaya Pembedahan Gigi & Bedah Rekonstruktift",
          info: "Maks per Kecelakaan",
          amount: "5 Juta",
        },
        {
          title: "Biaya Fisioterapi/Pengobatan Tradisional Tiongkok",
          info: "Maks per Kecelakaan",
          amount: "2,5 Juta",
        },
      ],
    },
  ];
</script>

<style lang="postcss">
  .product-card {
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 4px 15px 8px rgba(109, 131, 172, 0.25);
    border-radius: 12px;
    &__header {
      background-color: #0d294a;
      color: #fff;
      padding: 6px 10px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;

      @media (min-width: 650px) {
        padding: 10px;
      }

      display: flex;
      flex-wrap: nowrap;

      .text-sm-white {
        font-size: 10px;
        @media (min-width: 650px) {
          font-size: 12px;
        }
      }
      .text-lg-white {
        font-size: 18px;
        font-weight: bold;
        @media (min-width: 650px) {
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
              border-bottom: 1px solid #979797;
              margin-bottom: 15px;
              padding-bottom: 15px;
            }

            .left {
              /* flex: 1 0 65%; */
            }

            .right {
              margin-left: auto;
              align-self: center;
              flex: 1 0 27%;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>

<div class="product-card">
  <div class="product-card__header">
    <div class="icon">
      <img
        src="/icons/products/care/with-badge/super-care-silver.svg"
        alt="Super Care"
        width="50"
        height="50" />
    </div>
    <div class="name">
      <span class="product text-sm-white">Super Care Protection</span>
      <h3 class="plan text-lg-white">Silver Plan</h3>
    </div>
    <div class="price">
      <span class="term text-sm-white">Total Pembayaran / bulan</span>
      <h3 class="price text-lg-white">Rp 45,000</h3>
    </div>
  </div>
  <div class="product-card__body">
    <p class="color-darkblue bold tx-sm">Manfaat</p>

    {#each benefit_group as benefits (benefits.title)}
      <div class="benefit-group">
        <h4 class="benefit-title color-darkblue semi-bold tx-sm">
          {benefits.title}
        </h4>
        <!-- benefit item -->
        <div class="benefit-items">
          <!-- LOOP HERE -->
          {#each benefits.list_benefit as { title, info, amount } (title)}
            <div class="benefit">
              <div class="left">
                <div class="description">
                  <p class="color-lightgray tx-sm">{title}</p>
                  <span class="color-lightgray tx-xs">{info}</span>
                </div>
              </div>
              <div class="right">
                <p class="tx-lg bold color-darkblue">{amount}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
