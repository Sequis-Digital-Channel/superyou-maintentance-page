<script>
  export let accordionData = [];
</script>

<style lang="postcss">
  .base-list {
    text-align: justify;
    margin-top: 35px;
    margin-bottom: 35px;
    ul {
      list-style: none;
      li {
        line-height: 24px;
        color: #708697;
      }
      li::before {
        font-size: 22px;
        content: "\2022";
        color: #00aaae;
        font-weight: bold;
        display: inline-block;
        width: 1.5em;
        @media (max-width: 639px) {
          width: 1em;
          font-size: 21px;
        }
        vertical-align:middle;
        line-height:20px;
      }
    }
  }
</style>

<div class="base-list px-2">
  <ul class="leading-snug">
    {#each accordionData as item, i (`list-${i}`)}
      <li class="text-sm sm:text-base mb-4">{@html item.text}</li>
    {/each}
  </ul>
</div>