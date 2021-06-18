<script>
  export let data = [];
</script>

<style lang="postcss">
  .box-grid {
    max-width: 899px;
    margin: 0 auto;
  }
</style>

<div class="box-grid py-6 flex flex-row flex-1 justify-center sm:py-12 space-x-4 px-1">
  <!-- <div class="wrapper px-0 sm:px-4"> -->
    <!-- SMALL CARD ROUNDED -->
    {#each data as val, i (`box-${i}`)}
    <div class="flex flex-col sm:flex-row items-center shadow-lg py-2 sm:py-4 px-2 sm:px-6 bg-white rounded-2xl mb-5 lazy-image w-full">
      <img class="{`w-12 sm:w-16 h-12 sm:h-16 object-contain mx-auto ${i == 0 || i == 1 ? 'mt-4 sm:mt-0' : ''}`}" srcsrc="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="{val.icon}" alt="" />
      <div class="flex flex-col sm:flex-row w-full sm:pl-4 text-center sm:text-left pt-2 sm:pt-0">
        <p class="text-darkblue font-semibold text-xs sm:text-sm">{@html val.title}</p>
      </div>
    </div>
    {/each}
    <!-- END SMALL CARD ROUNDED -->

  <!-- </div> -->
</div>