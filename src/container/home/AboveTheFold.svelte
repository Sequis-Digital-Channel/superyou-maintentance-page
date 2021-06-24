<script>
  import ErrorContact from "../error-contact.svelte";
</script>

<div id="home_err" class="flex">
  <div class="mx-auto max-w-screen-xl w-full h-full">
    <div class="err_wrapper grid">
      <div class="flex md:items-start md:justify-start flex-col items-center justify-center ml-12">
        
          <div class="err-meta lg:pr-4 xl:pr-6 mt-10">
            <h1 class="font-bold leading-snug text-center lg:text-left">Oops..</h1>
            <p class="text-darkblue text-center lg:text-left mt-3 mb-4">
              Mohon maaf, kami sedang melakukan peningkatan layanan  pembelian di website Super You dan kamu dapat berdansa sebentar sambil menunggu kami. Jika kamu membutuhkan bantuan hubungi Customer Service kami di <strong>021 2994 2929</strong>, chat nomor Whatsapp di <strong>0899 2325 566</strong> atau tinggalkan kontak untuk kami hubungi.
            </p>
          </div>
          <div class="mx-auto lg:mx-0 rounded-xl pb-5 px-5 lg:px-0 w-full mt-4">
            <ErrorContact />
          </div>

      </div>
      <div class="err_img">
        <picture>
          <img
            class="inside_img"
            src="img/error-500.png"
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
    max-height: 100vh;
    height: 100%;
    width: 100%;
    overflow: hidden;
    @media (min-width: 1024px) {
      padding: 90px 20px 0 20px;
    }
    @media (min-width: 1280px) {
      padding: 96px 20px 0 20px;
    }

    .err-meta {
      max-width: 630px;

      
      @media (max-width: 640px) {
        margin-top: 100px;
        max-width: 306px;
        align-items: center;
        justify-items: center;
      }

      /* @media (min-width: 1440px) {
        margin-top: 80px;
      } */
      @media (min-width: 1500px) {
        margin-top: 50px;
      }
      h1 {
        color: #708697;
        @media (max-width: 375px) {
          font-size: 20px;
        }
        @media (min-width:740px) {
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
        max-width: 100%;
        max-height: 100%;
        justify-content: center;
        display: flex;


        .inside_img {

          @media (min-width: 1280px) {
            height: 100%;
            margin-left: 100px;
          }
        }
      }
    }
  }
</style>