<script>
  import { goto } from '@sapper/app';
  import { fade } from "svelte/transition";
  import { bodyScroll } from "../stores/bodyscroll";
  import SuperyouColorLogo from "../components/svg/SuperyouColorLogo.svelte";
  import BaseCircleSocmed from "../components/BaseCircleSocmed.svelte";
  import IcLock from "../components/svg/IcLock.svelte";
  export let aside = false;
  export let APP_URL;

  $: if (aside) {
    bodyScroll.update(() => false);
  } else {
    bodyScroll.update(() => true);
  }
</script>

<style lang="postcss">
  aside {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #fff;
    padding: 0 10px;

    @media (min-width: 768px) {
      padding: 0 24px;
    }

    .aside-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;

      .aside-top {
        display: flex;
        justify-content: space-between;
        height: 64px;
        align-items: center;
      }

      .aside-body {
        margin: 30px 0;
        user-select: none;

        .aside-body-wrapper {
          @media (min-width: 1024px) {
            display: grid;
            grid-template-columns: minmax(300px, 400px) minmax(400px, 1fr);
            grid-gap: 0 20px;
          }

          .aside-item {
            margin-top: 20px;
            &.auth {
              display: none;
            }
            
            @media (max-width: 1023px) {
              &.auth {
                display: flex;
              }
              &:not(:first-child) {
                margin-top: 20px;
              }
            }

            h4 {
              color: var(--primary-text-color);
              font-weight: bold;
              font-size: 20px;

              @media (min-width: 1024px) {
                border-bottom: solid 3px #dee9f0;
                padding-bottom: 6px;
                display: inline-block;
                font-size: 36px;
              }
            }

            ul {
              list-style-image: url("/icons/right-arrow-green.svg");
              margin-left: 20px;

              li {
                line-height: 2;
                padding-left: 10px;
                padding-top: 14px;

                a {
                  color: var(--primary-text-color);
                  @media (min-width: 1024px) {
                    font-size: 20px;
                  }
                }
              }
            }
          }
        }
      }

      .aside-bottom {
        border-top: 1px solid #dee9f0;
        padding: 15px 0 !important;
        color: var(--primary-text-color);

        display: flex;
        align-items: center;
        flex-direction: column;

        @media (min-width: 1024px) {
          flex-direction: row;
          justify-content: space-between;
        }

        .socmed {
          @media (min-width: 1024px) {
            order: 3;
          }
        }

        & > p {
          margin: 14px 0 16px;
          font-size: 14px;
        }

        .links {
          font-size: 12px;
          display: inline-flex;

          justify-content: space-around;
          width: 100%;

          @media (min-width: 1024px) {
            font-size: 14px;
            width: auto;

            & > a:first-child {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>

<aside transition:fade={{ duration: 100 }}>
  <div class="aside-container">
    <div class="aside-top">
      <div id="su-logo" aria-label="superyou-logo">
        <a href={`${APP_URL}`}>
          <SuperyouColorLogo color={'#03a3a6'} />
        </a>
      </div>

      <svg
        on:click={() => (aside = false)}
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Group 3</title>
        <desc>Created with Sketch.</desc>
        <defs />
        <g
          id="Desktop_Landing"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round">
          <g
            id="101_Desktop-Landing"
            transform="translate(-1322.000000, -2247.000000)"
            stroke="#1F3958"
            stroke-width="1.6">
            <g id="Group-2" transform="translate(987.000000, 2233.000000)">
              <g id="Group-4">
                <g id="Group-3" transform="translate(336.000000, 15.000000)">
                  <g id="Group">
                    <path
                      d="M13.687093,0.464439109 L0.388888889,13.7626432"
                      id="Line-2" />
                    <path
                      d="M0.402266137,0.553798255 L13.6111111,13.7626432"
                      id="Line-2" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="aside-body">
      <div class="aside-body-wrapper">
        <div class="aside-item auth flex mt-1">
          <span class="inline-block" style="margin-top:2px;">
            <IcLock width="20px" height="20px" fill="#000" />
          </span>
          <h4 class="ml-4" on:click={() => {
            window.location.href = `${APP_URL}/?#modal-login`
          }}>MASUK</h4>
        </div>
        <div class="aside-item">
          <h4 style="display: inline-flex;align-items:center;">
            <img
              src="/icons/sovia/sovia-circle.svg"
              alt="SOVIA ICON"
              width="40"
              height="40"
              style="margin-left: -6px;width: 32px;"
            />
            <span style="display:inline-block;margin-left: 10px;">SOVIA</span>
          </h4>
          <ul>
            <li>
              <a href={`${APP_URL}/sovia?p=general&r=main-sovia`}>Sequis Online
                Virtual Assistant</a>
            </li>
          </ul>
        </div>

        <div class="aside-item">
          <h4>Tentang Super You</h4>
          <ul>
            <li><a href="/">Apa itu Super You</a></li>
            <li>
              <a href="https://superyou.co.id/tentang-kami">Visi & Misi</a>
            </li>
          </ul>
        </div>

        <div class="aside-item">
          <h4>Produk</h4>
          <ul>
            <li>
              <a href={`${APP_URL}/produk/super-safe-protection`}>Super Safe</a>
            </li>
            <li>
              <a href={`${APP_URL}/produk/super-life-protection`}>Super Life</a>
            </li>
            <li>
              <a href={`${APP_URL}/produk/super-strong-protection`}>Super Strong</a>
            </li>
            <li>
              <a href={`${APP_URL}/produk/my-hospital-protection`}>My Hospital</a>
            </li>
            <li>
              <a rel="prefetch" href="/produk/super-care-protection">Super Care</a>
            </li>
            <li>
              <a
                on:click={async () => await goto('/produk/super-well-protection')}
                href="/produk/super-well-protection">Super Well</a>
            </li>
          </ul>
        </div>

        <div class="aside-item">
          <h4>Supports</h4>
          <ul>
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

        <div class="aside-item">
          <h4>Blog</h4>
          <ul>
            <li><a href={`${APP_URL}/blog/category/keuangan/`}>Keuangan</a></li>
            <li>
              <a href={`${APP_URL}/blog/category/kesehatan/`}>Kesehatan</a>
            </li>
            <li>
              <a href={`${APP_URL}/blog/category/gayahidup/`}>Gaya Hidup &
                Keluarga</a>
            </li>
            <li>
              <a href={`${APP_URL}/blog/category/promo/`}>Berita & Promo</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="aside-bottom">
      <div
        class="socmed"
        style="display:inline-flex;justify-content:space-between;width:80px;">
        <BaseCircleSocmed />
        <BaseCircleSocmed>
          <img
            slot="icon"
            src="/icons/socialmedia/twitter.svg"
            width="15"
            height="13"
            alt="Superyou Twitter" />
        </BaseCircleSocmed>
      </div>
      <p class="text-bluegray">Hubungi Kami di <b>(021) 2994 2929</b></p>
      <div class="links">
        <a class="text-bluegray" href={`${APP_URL}/syarat-dan-ketentuan`}>Syarat
          dan Ketentuan</a>
        <a class="text-bluegray" href={`${APP_URL}/kebijakan-privasi`}>Kebijakan
          Privasi</a>
      </div>
    </div>
  </div>
</aside>
