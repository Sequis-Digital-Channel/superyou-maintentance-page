<script>
  export let data = [];
</script>

<style lang="postcss">
  .box-grid {
    max-width: 1280px;
    margin: 0 auto;
    
    &__wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px, 333px));
      grid-gap: 3rem 7%;
      justify-content: center;
      align-items: flex-start;

      .box {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        max-width: 100%;
        @media (min-width: 1024px) {
          margin-left: 0;
          margin-right: 0;
        }

        .content {
          &__body {
            color: #708697;
            line-height: 24px;
          }
        }
      }
    }
  }
</style>

<div class="box-grid py-10 flex flex-col justify-center">
  <div class="box-grid__wrapper px-0 sm:px-4">
    <!-- SMALL CARD ROUNDED -->
    {#each data as val, i (`box-${i}`)}
    <div class="box bg-white rounded-2xl mb-5 lazy-image">
      <img class="w-12 h-12 object-contain" srcsrc="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="{val.icon}" alt="" />
      <div class="flex flex-col w-full pl-4 content">
        <h3 class="text-lg text-darkblue font-bold">{@html val.title}</h3>
        <p class="text-sm content__body">{@html val.content}</p>
      </div>
    </div>
    {/each}
    <!-- END SMALL CARD ROUNDED -->

  </div>
</div>