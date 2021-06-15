<script>
  export let data = [];
</script>

<style lang="postcss">
  .box-grid {
    max-width: 899px;
    margin: 0 auto;
    .wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 251px));
      grid-gap: 1rem 3%;
      justify-content: center;
      @media (max-width: 639px) {
        grid-template-columns: repeat(auto-fill, minmax(260px, 303px));
      }
      .box {
        box-shadow: 0 5px 20px 5px rgba(187, 204, 236, 0.3);
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        max-width: 100%;
        @media (min-width: 1024px) {
          margin-left: 0;
          margin-right: 0;
        }
      }
    }
  }
</style>

<div class="box-grid py-6 flex flex-col justify-center sm:py-12">
  <div class="wrapper px-0 sm:px-4">
    <!-- SMALL CARD ROUNDED -->
    {#each data as val, i (`box-${i}`)}
    <div class="box py-4 px-6 bg-white rounded-2xl mb-5 lazy-image">
      <img class="w-12 h-12 object-contain" srcsrc="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="{val.icon}" alt="" />
      <div class="flex flex-col sm:flex-row w-full pl-4">
        <p class="text-darkblue font-semibold">{@html val.title}</p>
      </div>
    </div>
    {/each}
    <!-- END SMALL CARD ROUNDED -->

  </div>
</div>