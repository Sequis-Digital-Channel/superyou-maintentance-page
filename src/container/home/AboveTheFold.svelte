<script>
  import { onMount } from "svelte";

  let pSlideCenter;

  onMount(() => {
    pSlideCenter.scrollBy({
      top: 0,
      left: 160,
      behavior: 'smooth'
    })
  })
</script>

<div id="home_atf" class="flex">
  <div class="mx-auto max-w-screen-xl mt-auto w-full">
    <div class="atf-meta lg:pr-4 xl:pr-6">
      <h1 class="text-white font-bold text-2xl lg:text-3xl xl:text-4xl leading-snug text-center lg:text-right">ASURANSI ONLINE<br>UNTUK PERLINDUNGAN OPTIMAL</h1>
      <p class="text-darkblue text-sm md:text-base xl:text-xl text-center lg:text-right mt-3 mb-4">
        Bebas pilih asuransi sesuai kebutuhan kamu hanya dalam beberapa klik.
      </p>
    </div>
    <div class="atf_wrapper grid">
      <div class="atf_img">
        <picture class="hero-home">
          <source
            media="(min-width: 801px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-70 1x, https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-95 2x"
          >
          <source
            media="(min-width: 501px) and (max-width: 800px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-75"
          >
          <source
            media="(max-width: 500px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-75"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-70"
            alt="Super Life Hero"
            width="622"
            height="507"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </div>
      <div class="atf_products flex items-end justify-end">
        <div class="atf_products-wrapper overflow-hidden mx-auto lg:mx-0 rounded-xl pb-5 px-6 lg:px-0">
          <div bind:this={pSlideCenter} class="p-boxes overflow-x-scroll lg:overflow-x-hidden flex py-4 px-0 lg:p-5 lg:grid lg:grid-cols-4 lg:gap-3">
            <a class="p-box-link" rel="prefetch" href="/produk/super-care-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-care-protection_45SOWUY6X.svg"
                  width="42px"
                  height="42px"
                  alt="Super Care">
                <span class="text-darkblue font-bold text-center text-tiny">Perawatan Infeksi & Kecelakaan</span>
              </div>
            </a>
            <a class="p-box-link" rel="prefetch" href="/produk/my-hospital-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/my-hospital-protection_IL89WHs9l.svg"
                  width="42px"
                  height="42px"
                  alt="My Hospital">
                <span class="text-darkblue font-bold text-center text-tiny">Santunan<br>Rawat Inap</span>
              </div>
            </a>
            <a class="p-box-link" rel="prefetch" href="/produk/super-strong-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-strong-protection_JIJupTKZSZ.svg"
                  width="42px"
                  height="42px"
                  alt="Super Strong">
                <span class="text-darkblue font-bold text-center text-tiny">Proteksi Jiwa + 3 Penyakit Kritis</span>
              </div>
            </a>
            <a class="p-box-link" rel="prefetch" href="/produk/super-life-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-life-protection_jWgDexeIBJ.svg"
                  width="42px"
                  height="42px"
                  alt="Super Life">
                <span class="text-darkblue font-bold text-center text-tiny">Proteksi<br>Jiwa</span>
              </div>
            </a>
            <a class="p-box-link" rel="prefetch" href="/produk/super-well-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-well-protection_nICWi8R4nF.svg"
                  width="42px"
                  height="42px"
                  alt="Super Well">
                <span class="text-darkblue font-bold text-center text-tiny">Perawatan 10 Penyakit Kritis</span>
              </div>
            </a>
            <a class="p-box-link" rel="external" href="/produk/super-safe-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-holiday-protection_OkWDc8G_he8.svg"
                  width="42px"
                  height="42px"
                  alt="Super Holiday">
                <span class="text-darkblue font-bold text-center text-tiny">Proteksi<br> SaatLiburan</span>
              </div>
            </a>
            <a class="p-box-link" rel="external" href="/produk/super-safe-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-safe-protection_Gnfr4rz7aX5p.svg"
                  width="42px"
                  height="42px"
                  alt="Super Safe">
                <span class="text-darkblue font-bold text-center text-tiny">Proteksi<br>Kecelakaan</span>
              </div>
            </a>
            <a class="p-box-link" rel="external" href="/produk/super-safe-protection">
              <div class="p-box">
                <img
                  src="https://ik.imagekit.io/oc2o82pyjsh/superyou/icons/super-motor-protection_e-b5QAcBRx.svg"
                  width="42px"
                  height="42px"
                  alt="Super Motor">
                <span class="text-darkblue font-bold text-center text-tiny">Proteksi<br>Berkendara</span>
              </div>
            </a>
          </div>

          <a class="start-now relative w-56 block mx-auto bg-darkblue px-5 py-2 mt-4 rounded-xl text-sm xl:text-base text-white font-bold" href="/">MULAI SEKARANG <span class="arr">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  #home_atf {
    /* min-height: 658px; */
    padding: 74px 20px 32px 20px;
    @media (min-width: 1024px) {
      padding: 90px 20px 0 20px;
    }
    @media (min-width: 1280px) {
      padding: 96px 20px 0 20px;
    }
    background: linear-gradient(116deg, #009496 -33%, rgba(0, 220, 223, 0.5) 64%), linear-gradient(114deg, rgba(255, 255, 255, 0) 37%, rgba(255, 255, 255, 0.69)), linear-gradient(to bottom, #00b7ba, #00b7ba);

    .atf-meta {
      @media (min-width: 1024px) {
        margin-bottom: -80px;
      }
      @media (min-width: 1200px) {
        margin-bottom: -122px;
      }
      @media (min-width: 1280px) {
        margin-bottom: -100px;
      }
      h1 {
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
    }

    .atf_wrapper {
      justify-content: center;
      @media (min-width: 1024px) {
        justify-content: flex-start;
        grid-template-columns: 45% 1fr;
      }
      .atf_img {
        max-width: 70.3%;
        margin: 0 auto;
        @media (min-width: 1024px) {
          max-width: 622px;
        }
      }

      .atf_products {
        @media (min-width: 1024px) {
          padding-right: 26px;
        }

        .atf_products-wrapper {
          min-width: 310px;

          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px 0 rgba(170, 170, 170, 0.5);
          background-color: rgba(255, 255, 255, 0.15);

          @media (max-width: 1023px) {
            max-width: 400px;
          }

          @media (max-width: 600px) {
            max-width: 350px;
          }

          @media (min-width: 1024px) {
            margin-bottom: 20px;
          }
          @media (min-width: 1100px) {
            margin-bottom: 30px;
          }
          @media (min-width: 1280px) {
            margin-bottom: 40px;
          }
          .p-boxes {
            
            &::-webkit-scrollbar {
              display: none;
            }
            -ms-overflow-style: none; /* IE 11 */
            scrollbar-width: none; /* Firefox 64 */

            /* scroll-snap-type: x mandatory; */
            scroll-snap-type: x proximity;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;

            .p-box-link {
              display: inline-block;
              scroll-snap-align: center;
              scroll-behavior: smooth;

              @media (max-width: 1023px) {
                padding: 0 4px;
                &:last-child{
                  padding-right: 4px;;
                }
              }
              .p-box {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 74px;
                height: 74px;
                cursor: pointer;

                &::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 100%;
                  width: 100%;
                  border-radius: 12px;
                  /* box-shadow: 2px 2px 3px 0.8px rgb(0 0 0 / 14%); */
                  box-shadow: 0 5px 20px 3px rgb(0 0 0 / 14%);
                }
                @media (min-width: 1280px) {
                  width: 94px;
                  height: 94px;
                  padding-left: 4px;
                  padding-right: 4px;

                  & > img {
                    width: 50px;
                    height: 50px;
                  }

                  & > span {
                    font-size: 9px;
                  }
                }
                border-radius: 12px;
                padding: 3px 0 6px;
                background: radial-gradient(circle at 50% 1%,#fff,#c1f4f7 139%)
              }
            }
          }

          .start-now {
            .arr {
              transition: 0.4s;
              position: absolute;
              right: 22px;
            }

            &:hover {
              .arr {
                right: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>