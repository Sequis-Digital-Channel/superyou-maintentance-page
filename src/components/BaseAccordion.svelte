<script>
  export let accordionData = [];

  let accordionState = accordionData.map(() => ({
    isOpen: false,
  }));
  const toggleAccordionItem = (index) => {
    accordionState[index].isOpen = !accordionState[index].isOpen;
  };
</script>

<style lang="postcss">
  .base-accordion {
    margin-bottom: 36px;
    &__item {
      overflow: hidden;
      &__header {
        border-bottom: 1px solid lightgrey;
        padding: 20px 10px 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > h2 {
          font-size: 16px;
          color: #0d294a;
          font-weight: bold;
        }

        & > svg {
          transition: 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
          &.open {
            transform: rotate(180deg);
          }
        }
      }

      &__body {
        font-size: 14px;
        color: #708697;
        transition: max-height 0.3s ease-in-out;
        max-height: 0;

        &.open {
          max-height: 820px;
          @media (min-width: 1024px) {
            max-height: 500px;
          }
        }

        .body__wrapper {
          padding: 10px 0;
          :global(p) {
            margin-bottom: 14px;
          }
        }
      }
    }
  }
</style>

<div class="base-accordion">
  {#each accordionData as item, i (`accordion-${i}`)}
    <div class="base-accordion__item">
      <div
        class="base-accordion__item__header"
        on:click={() => toggleAccordionItem(i)}>
        <h2 class="flex nowrap">{@html item.title}</h2>
        <svg
          class:open={accordionState[i].isOpen}
          style="margin-right: 2px;"
          width="12px"
          height="7px"
          viewBox="0 0 12 7"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Path 3 Copy</title>
          <desc>Created with Sketch.</desc>
          <defs />
          <g
            id="Mobile_Landing"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round">
            <g
              id="101_Mobile-Landing"
              transform="translate(-344.000000, -4810.000000)"
              fill-rule="nonzero"
              stroke="#091b30"
              stroke-width="2">
              <g id="Footer" transform="translate(0.000000, 4766.000000)">
                <polyline
                  id="Path-3-Copy"
                  points="345 45 349.86184 50 355 45" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div
        class="base-accordion__item__body"
        class:open={accordionState[i].isOpen}>
        <div class="body__wrapper">
          {@html item.body}
        </div>
      </div>
    </div>
  {/each}
</div>
