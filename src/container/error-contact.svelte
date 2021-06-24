<script>
  import BaseInputText from "../components/BaseInputText.svelte";
  import BaseButton from "../components/BaseButton.svelte";
</script>

<div
  id="auth-modal"
  class="bg-white rounded-xl w-full ">
  <div class="py-6 md:px-6 relative px-4">
      <form>
        <BaseInputText
          label="Nama Lengkap"
        />
  
        <br>
        <div class="mt-2">
          <BaseInputText
            label="Email"
          />
        </div>
    
        <br>
        <BaseInputText
          label="No Telpon"
        />
          
        <a href="/maintenance">
          <BaseButton
            style="max-width: 314px; font-size: 14px; margin-top:54px">HUBUNGI SAYA</BaseButton>
      </a>
      </form>
  </div>
</div>

<style lang="postcss">
  #auth-modal {
    z-index: 15;
    box-shadow: 0 3px 5px 5px rgba(187, 204, 236, 0.35);
    
    /* @media (min-width: 768px) {
      transform: translate(-137%, -15%);
      left: 50%;
      top: 50%;
    } */

    /* @media (min-width: 1440px) {
      height: 350px;
      width: 440px;
    } */

    @media (min-width: 1280px) {
      height: 404px;
      width: 465px;
    }
  }
</style>