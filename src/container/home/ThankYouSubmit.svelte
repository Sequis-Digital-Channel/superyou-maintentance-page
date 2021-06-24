<script>
    import ErrorContact from "../ErrorContact.svelte";
  
  </script>
  
  <div id="home_err" class="flex">
    <div class="mx-auto max-w-screen-xl mt-auto w-full h-full">
      <div class="err_wrapper grid">
        <div class="flex items-start justify-start">
          <div class="err-meta lg:pr-4 xl:pr-6">
            <h1 class="font-bold leading-snug text-center lg:text-left">Terima kasih..</h1>
            <p class="text-center lg:text-left mt-3 mb-4">
                Tim Super kami akan segera menghubungi kamu.
            </p>
          </div>
        </div>
        <div class="err_img">
          <picture>
            <img
              class="inside_img"
              src="img/error-500.png"
              alt="Super You Error"
              style="max-height: 100%; max-width: 100%;"
            > 
          </picture>
        </div>
      </div>
    </div>
  </div>
  
  <style lang="postcss">
    #home_err {
      background: linear-gradient(134deg, #ffffff, #ffffff 39%, #c3c3c3 109%);
      /* min-height: 658px; */
      height: 100vh;
      @media (min-width: 1024px) {
        padding: 90px 20px 0 20px;
      }
      @media (min-width: 1280px) {
        padding: 96px 20px 0 20px;
      }
  
      .err-meta {
        width: 630px;
  
        @media (min-width: 1440px) {
          margin-top: 80px;
        }
        @media (min-width: 1500px) {
          margin-top: 270px;
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
          line-height: 1.6;
          @media (min-width: 768px) {
            width: 630px;
            font-size: 20px;
          }
        }
      }
  
      .err_wrapper {
        justify-content: center;
        max-height: 100%;
  
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
          float: right;
  
  
          .inside_img {
            /* @media (min-width: 1440px) {
              height: 94%;
            } */
  
            @media (min-width: 1500px) {
              height: 100%;
              margin-left: 200px;
            }
          }
        }
      }
    }
  </style>