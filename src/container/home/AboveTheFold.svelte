<script>
  import ErrorContact from "../ErrorContact.svelte";
  let contactHasbeenSubmited = false;

  function handleSubmitSuccess() {
    contactHasbeenSubmited = true;
  }
</script>

<div id="home_err" class="flex">
  <div class="mx-auto max-w-screen-xl w-full h-full">
    <div class="err_wrapper lg:grid md:mt-10 lg:mt-0 lg:grid-cols-2">
      <div class="flex md:items-start md:justify-start flex-col items-center justify-center lg:ml-12">
          <div class="err-meta mx-auto lg:pr-4 xl:pr-6">
            {#if !contactHasbeenSubmited}
            <h1 class="font-bold leading-snug text-center lg:text-left">Oops..</h1>
            <p class="text-darkblue text-center lg:text-left mt-3 mb-4">
              Mohon maaf, kami sedang melakukan peningkatan layanan  pembelian di website Super You dan kamu dapat berdansa sebentar sambil menunggu kami. Jika kamu membutuhkan bantuan hubungi Customer Service kami di <strong>021 2994 2929</strong>, chat nomor Whatsapp di <strong>0899 2325 566</strong> atau tinggalkan kontak untuk kami hubungi.
            </p>
            {:else}
            <h1 class="font-bold leading-snug text-center lg:text-left lg:mt-32">Terima Kasih</h1>
            <p class="text-darkblue text-center lg:text-left mt-3 mb-4">
              Tim Super kami akan segera menghubungi kamu.
            </p>
            {/if}
          </div>
          {#if !contactHasbeenSubmited}
          <div class="mx-auto lg:mx-0 rounded-xl pb-5 px-5 lg:px-0 w-full mt-4">
            <ErrorContact on:submit-success={handleSubmitSuccess}/>
          </div>
          {/if}
            <p
            style="display:flex;align-items:center;text-align:center;justify-content:center;font-weight:bold;color:#0d294a;margin:10px 0;font-size:14px;margin-right:165px"
          >
            <svg
                class="mobile_button"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="12"
                height="12"
                viewBox="0 0 12 12">
                <defs>
                  <path
                    id="xopfgbdqwa"
                    d="M7.253.293c.423.39.423 1.024 0 1.414l-3.558 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23l3.564 3.296c.423.39.423 1.024 0 1.414-.422.39-1.107.39-1.53 0l-5.406-5c-.423-.39-.423-1.024 0-1.414l5.407-5c.422-.39 1.107-.39 1.53 0z"
                  />
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <g>
                    <g transform="translate(-20 -42) translate(20 42)">
                      <use
                        fill="#0D294A"
                        fill-rule="nonzero"
                        transform="matrix(1 0 0 -1 0 12)"
                        xlink:href="#xopfgbdqwa"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            <span class="mobile_button ml-4">
                KEMBALI KE HOME</span>
            </p>
      </div>
      <div class="err_img">
        <picture>
          <source
            srcset="img/error-500-mobile@2x.png"
            media="(max-width: 600px)"
          >
          <source
            srcset="img/error-500.png"
            media="(min-width: 601px)"
          >
          <source
            srcset="img/error-500@3x.png"
            media="(min-width: 2480px)"
          >
          <img
            class="inside_img"
            src="img/error-500-mobile.png"
            alt="Super You Error"
          > 
        </picture>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  #home_err {
    background: linear-gradient(134deg, #ffffff, #ffffff 39%, #c3c3c3 109%);
    min-height: 100vh;
    height: 100%;
    width: 100%;
    overflow: hidden;
    @media (min-width: 1024px) {
      padding: 90px 20px 0 20px;
      max-height: 100vh;
    }
    @media (min-width: 1280px) {
      padding: 96px 20px 0 20px;
    }

    .err-meta {
      max-width: 630px;

      @media (max-width: 640px) {
        margin-top: 80px;
        max-width: 330px;
        align-items: center;
        justify-items: center;
      }

      @media (max-width: 375px){
        max-width: 306px;
      }
      @media (min-width: 1500px) {
        margin-top: 50px;
      }
      h1 {
        color: #708697;
        @media (max-width: 600px) {
          font-size: 32px;
        }
        @media (min-width:768px) {
          font-size: 48px;
        }
      }

      p {
        color:#0d294a;
        @media (min-width:1280px) {
          width: 630px;
          font-size: 16px;
        }
      }
    }

    .err_wrapper {
      justify-content: center;
      max-height: 100%;
      min-height: 100vh;

      .mobile_button {
        @media (max-width: 640px) {
          display: inline-block;
        }

        @media (min-width: 1280px) {
          display: none;
        }
      }

      @media (max-width: 640px) {
        justify-content: center;
      }

      @media (min-width: 1440px) {
        justify-content: flex-start;
        grid-template-columns: 45% 1fr;
        height: 94%;        
      }

      @media (min-width: 1500px) {
        justify-content: flex-start;
        grid-template-columns: 45% 1fr;
        height: 100%;
      }

      .err_img {
        max-width: 110%;
        max-height: 100%;
        justify-content: center;
        display: flex;

        @media (max-width: 600px) {
          min-height: 58vh;
          padding-top: 55px;
        }


        .inside_img {
          @media (max-width: 600px) {
            max-width: 106%;
            margin-left: -5px;
          }

          @media (min-width: 1280px) {
            height: 91%;
            margin-left: 100px;
          }

          @media (min-width: 2480px) {
            height: 93%;
            max-width: 190% !important;
          }
        }
      }
    }
  }
</style>