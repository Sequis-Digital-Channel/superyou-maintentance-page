<script>
  import productNavItems from "../data/json/product-nav-items-exclude-care-well.json";
  import BaseCircleSocmed from "./BaseCircleSocmed.svelte";
  export let APP_URL;
  let outerWidth;
  let footerNav = {
    about: false,
    products: false,
    support: false,
    blog: false,
  };

  const handleToggleFooterNav = (type) => {
    if (outerWidth < 1024) {
      footerNav[type] = !footerNav[type];
    }
  };

  let lazySrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
</script>

<style lang="postcss">
  footer {
    content-visibility: auto;
    contain-intrinsic-size: 420px; /* Explained in the next section. */
    padding: 0 10px;
    @media (min-width: 768px) {
      padding: 0 24px;
    }

    .footer-wrapper {
      padding: 20px 0;
      max-width: 1280px;
      margin: 0 auto;
      border-bottom: 1px solid #7086975e;

      @media (min-width: 1024px) {
        display: grid;
        /* grid-template-columns: repeat(6, minmax(140px, 1fr)); */
        grid-template-columns:
          minmax(140px, 1fr) minmax(80px, 1fr) minmax(152px, 1fr)
          minmax(240px, 1fr) minmax(80px, 1fr) minmax(80px, 1fr);
        grid-template-rows: auto auto;
        grid-gap: 1.5%;
      }

      .logo {
        display: none;
        @media (min-width: 1024px) {
          display: block;
        }
      }

      .f-item {
        padding: 2px 0;

        &.mobile-center {
          @media (max-width: 1023px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-bottom: 16px;
          }
        }
        &.contact-us {
          @media (min-width: 1024px) {
            grid-column: 1 / 3;
          }
        }
        &.social-media {
          @media (min-width: 1024px) {
            grid-column: 5 / 7;
          }
        }

        .f-title {
          color: var(--primary-text-color);
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 8px;
          padding-right: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
          .arrow-down {
            transition: transform 0.2s ease-in-out;
            &.opened {
              transform: rotate(180deg);
            }
          }
          .desktop-hide {
            @media (min-width: 1024px) {
              display: none;
            }
          }
        }
        ul {
          display: none;
          @media (min-width: 1024px) {
            display: block;
          }
          &.show {
            display: block;
          }
          li {
            margin-bottom: 8px;
          }
          a {
            font-size: 14px;
            color: var(--secondary-text-color);
          }
        }

        .contact {
          font-size: 14px;
          color: var(--secondary-text-color);
          &:last-child {
            margin-top: 10px;
          }
          p:last-child {
            color: var(--primary-text-color);
            font-weight: bold;
          }
        }

        .payment-logo-wrapper {
          display: inline-grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          max-width: 240px;
          width: 88%;
          grid-gap: 18px 0;
          align-items: center;

          @media (min-width: 1024px) {
            width: auto;
            grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
            display: grid;
            justify-items: start;
            height: 74%;
          }

          & > div {
            justify-self: center;
            img {
              max-width: 50px;
            }
          }
        }
        .secure-transaction-wrapper {
          width: 88%;
          max-width: 240px;
          display: inline-grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          grid-gap: 4px 0;
          align-items: center;

          @media (max-width: 600px) {
            margin-left: 30px;
          }

          & > div {
            display: flex;
            align-items: center;

            img {
              max-width: 50px;
            }
          }
          @media (min-width: 1024px) {
            width: 100%;
            display: grid;
            grid-template-columns: 60px 60px 60px;
            grid-gap: 8px 8px;
            justify-items: start;
          }
        }

        .socmed-wrapper {
          display: flex;
        }
      }
    }
    .footer-bottom-text {
      margin: 0 auto;
      padding: 20px 0;
      text-align: center;
      max-width: 80%;

      @media (min-width: 1024px) {
        display: flex;
        max-width: 1280px;
      }
      p,
      a {
        color: var(--secondary-text-color);
        font-size: 12px;
      }
      p:first-child {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;

        @media (min-width: 1024px) {
          order: 1;
          margin-left: 4%;
          width: 33%;
        }
      }
    }
  }
</style>

<svelte:window bind:outerWidth />

<footer>
  <div class="footer-wrapper">
    <div class="logo lazy-image">
      <img
        src={lazySrc}
        data-src="/icons/superyou-logo-color.svg"
        alt="Super You Logo"
        width="170px"
        height="45px">
    </div>

    <div class="f-item">
      <div class="f-title">
        <p>Sovia</p>
      </div>
    </div>

    <div class="f-item">
      <div class="f-title" on:click={() => handleToggleFooterNav('about')}>
        <p>Tentang Super you</p>
        <span
          class="lazy-image arrow-down desktop-hide"
          class:opened={footerNav.about}>
          <img
            src={lazySrc}
            data-src="/icons/down-arrow-green.svg"
            alt="Bantuan Navigasi"
            width="14px"
            height="10px" />
        </span>
      </div>

      <ul class:show={footerNav.about}>
        <li><a href={`${APP_URL}/tentang-kami`}>Visi & Misi</a></li>
      </ul>
    </div>

    <div class="f-item">
      <div class="f-title" on:click={() => handleToggleFooterNav('support')}>
        <p>Bantuan</p>
        <span
          class="lazy-image arrow-down desktop-hide"
          class:opened={footerNav.support}>
          <img
            src={lazySrc}
            data-src="/icons/down-arrow-green.svg"
            alt="Bantuan Navigasi"
            width="14px"
            height="10px" />
        </span>
      </div>

      <ul class:show={footerNav.support}>
        <li><a href={`${APP_URL}/hubungi-kami`}>Hubungi Kami</a></li>
        <li><a href={`${APP_URL}/faq`}>FAQ</a></li>
        <li>
          <a href={`${APP_URL}/rumah-sakit-terdekat`}>Rumah Sakit Terdekat</a>
        </li>
        <li>
          <a href={`${APP_URL}/kalkulator-bmi-berat-badan-ideal`}>Kalkulator
            Berat Badan Ideal</a>
        </li>
      </ul>
    </div>

    <div class="f-item">
      <div class="f-title" on:click={() => handleToggleFooterNav('blog')}>
        <p>Blog</p>
        <span
          class="lazy-image arrow-down desktop-hide"
          class:opened={footerNav.blog}>
          <img
            src={lazySrc}
            data-src="/icons/down-arrow-green.svg"
            alt="Bantuan Navigasi"
            width="14px"
            height="10px" />
        </span>
      </div>
      <ul class:show={footerNav.blog}>
        <li><a href={`${APP_URL}/blog/category/keuangan/`}>Keuangan</a></li>
        <li><a href={`${APP_URL}/blog/category/kesehatan/`}>Kesehatan</a></li>
        <li>
          <a href={`${APP_URL}/blog/category/gayahidup/`}>Gaya Hidup & Keluarga</a>
        </li>
        <li><a href={`${APP_URL}/blog/category/promo/`}>Berita & Promo</a></li>
      </ul>
    </div>

    <div class="f-item">
      <div class="f-title" on:click={() => handleToggleFooterNav('products')}>
        <p>Produk</p>
        <span
          class="lazy-image arrow-down desktop-hide"
          class:opened={footerNav.products}>
          <img
            src={lazySrc}
            data-src="/icons/down-arrow-green.svg"
            alt="Bantuan Navigasi"
            width="14px"
            height="10px" />
        </span>
      </div>

      <ul class:show={footerNav.products}>
        {#each productNavItems.health as navItem, i (navItem.icon)}
          <li>
            <a rel="external" href={navItem.url}>{navItem.name.replace('Protection', '')}</a>
          </li>
        {/each}
        {#each productNavItems.life as navItem, i (navItem.icon)}
          <li>
            <a rel="external" href={navItem.url}>{navItem.name.replace('Protection', '')}</a>
          </li>
        {/each}
        <!-- <li>
          <a rel="prefetch" href="/produk/super-safe-protection">Super Safe</a>
        </li>
        <li>
          <a rel="prefetch" href="/produk/super-life-protection">Super Life</a>
        </li>
        <li>
          <a rel="prefetch" href="/produk/super-strong-protection">Super Strong</a>
        </li>
        <li>
          <a rel="prefetch" href="/produk/super-care-protection">Super Care</a>
        </li>
        <li>
          <a rel="prefetch" href="/produk/super-well-protection">Super Well</a>
        </li>
        <li>
          <a rel="prefetch" href="/produk/my-hospital-protection">My Hospital</a>
        </li> -->
      </ul>
    </div>

    <div class="f-item contact-us mobile-center">
      <div class="contact">
        <p>Hubungi Kami di</p>
        <p>(021) 2994 2929 / superyou@sequislife.com</p>
      </div>

      <div class="contact">
        <p>Layanan Pengaduan</p>
        <p>
          <a href="https://www.sequis.co.id/whistle/" target="_blank">
            https://www.sequis.co.id/whistle/
          </a>
        </p>
      </div>
    </div>

    <div class="f-item mobile-center">
      <div class="f-title">
        <p>Keamanan Transaksi</p>
      </div>
      <div class="secure-transaction-wrapper">
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/verified_by_visa.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/mastersecurecode.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/iso-iec.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/norton-secured.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/ojk.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            data-src={`${APP_URL}/img/footer/security-payment/admedika.png`}
            alt="Keamanan Transaksi"
            width="64px"
            height="34px" />
        </div>
      </div>
    </div>

    <div class="f-item mobile-center">
      <div class="f-title">
        <p>Pembayaran</p>
      </div>
      <div class="payment-logo-wrapper">
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="44"
            height="22"
            data-src="https://superyou.co.id/img/icons/payment/visa-card.png"
            alt="Pembayaran Visa" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="44"
            height="22"
            data-src={`${APP_URL}/img/icons/payment/master-card.png`}
            alt="Pembayaran Master Card" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="68"
            height="22"
            data-src="https://superyou.co.id/img/icons/payment/gopay.png"
            alt="Pembayaran Gopay" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="64"
            height="22"
            data-src="https://superyou.co.id/img/icons/payment/indomaret.png"
            alt="Pembayaran Indomaret" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="64"
            height="22"
            data-src="https://superyou.co.id/img/icons/payment/atm-mandiri.png"
            alt="Pembayaran Atm-Mandiri" />
        </div>
        <div class="lazy-image">
          <img
            src={lazySrc}
            width="64"
            height="22"
            data-src="https://superyou.co.id/img/icons/payment/atm-permata.png"
            alt="Pembayaran Atm-Permata" />
        </div>
      </div>
    </div>

    <div class="f-item social-media mobile-center">
      <div class="f-title">
        <p>Tetap Terhubung dengan Kami di</p>
      </div>

      <div class="socmed-wrapper">
        <div class="lazy-image">
          <BaseCircleSocmed>
            <img
              slot="icon"
              src={lazySrc}
              data-src="/icons/socialmedia/facebook.svg"
              width="8"
              height="17"
              alt="Superyou Facebook" />
          </BaseCircleSocmed>
        </div>
        <div class="lazy-image" style="margin-left:10px;">
          <BaseCircleSocmed>
            <img
              slot="icon"
              src={lazySrc}
              data-src="/icons/socialmedia/instagram.svg"
              width="15"
              height="13"
              alt="Superyou Twitter" />
          </BaseCircleSocmed>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom-text">
    <p>
      <a href={`${APP_URL}/syarat-dan-ketentuan`}>Syarat dan Ketentuan</a>
      <a href={`${APP_URL}/kebijakan-privasi`}>Kebijakan Privasi</a>
    </p>
    <p>
      © 2018-2020. PT Asuransi Jiwa Sequis Life terdaftar dan diawasi oleh
      Otoritas Jasa Keuangan.
    </p>
  </div>
</footer>
