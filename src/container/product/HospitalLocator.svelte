<script>
    import BaseButton from "../../components/BaseButton.svelte"

    export let info = "Kunjungi rumah sakit rekanan Super You dari lokasi kamu. Daftar rumah sakit kami memberikan perawatan kesehatan sesuai kebutuhan kamu.";
    let lazySrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    export let appUrl = "";
</script>

<style lang="postcss">
    .hospital-locator {
        max-width: 940px;
        margin: 0 auto;
        padding: 40px 0 55px 0;
        
        .locator-item {
            align-items: center;
            margin: 0 auto 37px auto;
            flex-wrap: nowrap;
            @media (min-width: 768px) {
              max-width: 100%;
              display: flex;
            }
            @media (min-width: 1024px) {
              margin-left: 0;
              margin-right: 0;
              display: flex;
            }
            @media (max-width: 600px) {
              padding: 0 20px;
            }
            &__icon {
              margin-right: 16px;
              flex: 1 0 42px;
              max-width: 42px;
    
              @media (min-width: 768px) {
                margin-right: 14px;
                flex: 1 0 50px;
                max-width: 50px;
                & > img {
                  width: 50px;
                  height: 50px;
                }
              }
              @media (min-width: 1024px) {
                flex: 1 0 70px;
                max-width: 70px;
                & > img {
                  width: 70px;
                  height: 70px;
                }
              }

              @media (max-width: 600px) {
                margin: 0 auto;
                max-width: 70px;
                & > img {
                  width: 70px;
                  height: 70px;
                }
              }
            }
            &__desc {
              font-size: 20px;
              color: #0d294a;
              max-width:90%;

              @media (max-width: 600px) {
                text-align: center;
                max-width: 100%;
              }
            }
          }
    }
</style>

<div class="hospital-locator">
  <div class="locator-item">
    <div class="locator-item__icon lazy-image">
      <img
        class="mb-2 sm:mb-0"
        src={lazySrc}
        data-src="../../../icons/hospital-locator/hospital-location.svg"
        width="42"
        height="42"
        alt="hospital-location" />
    </div>
    <h2 class="locator-item__desc text-left font-bold">{@html info}</h2>
  </div>
  <BaseButton 
    bgColor=#00aaae
    style="max-width:314px;font-size:14px;font-weight:bold;margin-bottom:15px;margin:0 auto;"
    on:click={() => {
      window.location.href = `${appUrl}/rumah-sakit-terdekat`;
    }}>
      CEK RUMAH SAKIT TERDEKAT DISINI
  </BaseButton>
</div>
<hr class="footer-line">