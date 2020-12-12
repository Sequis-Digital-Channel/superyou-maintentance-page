<script>
  import { clickOutside } from "../utils/_clickoutside";
  import Tooltip from "../components/BaseTooltip.svelte";

  export let items = [];
  export let selectedItem = {
    name: "",
    value: "",
  };
  export let error = {
    status: false,
    msg: "Plan wajib di isi",
  };
  export let label;
  export let withtooltip = false;
  export let tooltiptext = "";

  let focused = false;
  let isMenuShowing = false;

  function handleSelectedItem(selectedItem) {
    items.forEach((item, i) => {
      items[i].selected = false;
      if (selectedItem.value === item.value) {
        items[i] = { ...selectedItem, selected: true };
      }
    });

    focused = false;
    isMenuShowing = false;
  }

  function handleFocused() {
    focused = true;
  }
  function handleBlured(e) {
    focused = false;
  }

  function handleClickInput(e) {
    e.preventDefault();
    isMenuShowing = true;
    focused = true;
  }

  function handleKeyboardEvent(e) {
    const { key } = e;
    const elMenu = document.querySelector(".listbox-item.option-selected");
    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        if (elMenu) {
          if (!elMenu.nextSibling) return;
          elMenu.classList.remove("option-selected");
          elMenu.nextSibling.classList.add("option-selected");
        } else {
          document
            .querySelectorAll(".listbox-item")[0]
            .classList.add("option-selected");
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (elMenu) {
          if (!elMenu.previousSibling) return;
          elMenu.classList.remove("option-selected");
          elMenu.previousSibling.classList.add("option-selected");
        } else {
          document
            .querySelectorAll(".listbox-item")[0]
            .classList.add("option-selected");
        }
        break;
      case "Escape":
        e.preventDefault();
        focused = false;
        isMenuShowing = false;
        break;
      case "Enter":
        e.preventDefault();
        if (elMenu) {
          const selectedMenuIndex = elMenu.getAttribute("index-value");
          handleSelectedItem(items[selectedMenuIndex]);
        }
    }
  }

  $: if (items) {
    const filteredSelectedItem = items.filter(
      (items) => items.selected === true
    );
    selectedItem = { ...filteredSelectedItem[0] };
  }
</script>

<style lang="postcss">
  .base-select-menu {
    position: relative;
    label {
      font-size: 14px;
      color: #708697;
    }
    .input-box {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &::before,
      &::after {
        content: "";
        bottom: 0px;
        left: 0;
        position: absolute;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        width: 100%;
        height: 1px;
      }

      &::before {
        background-color: rgba(0, 0, 0, 0.3);
      }
      &::after {
        height: 2px;
        background-color: rgb(0, 170, 174);
        transform: scaleX(0);
      }

      &.focused {
        &::after {
          transform: scaleX(1);
          z-index: 2;
        }
      }

      &.error {
        &::after {
          transform: scaleX(1);
          z-index: 2;
          background-color: #e54b4b;
        }
      }

      & > .btn-select-menu {
        padding: 8px 0;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        min-height: 40px;
        padding-right: 34px;

        &:focus {
          outline: none;
        }
      }

      & > svg {
        position: absolute;
        right: 8px;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

        &.focused {
          transform: rotate(-180deg);
        }
      }

      .select-menu-options {
        max-height: 224px;
        z-index: 3;
        overflow-y: auto;
        display: flex;
        padding: 10px 0;
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        border-radius: 0.375rem;
        background-color: #fff;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
          0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);

        & > ul {
          width: 100%;
          .listbox-item {
            padding: 8px;
            position: relative;
            &:hover {
              background-color: #efefef;
            }

            &.option-selected {
              background-color: rgba(0, 170, 174, 0.7);
              color: #fff;
            }

            .item-wrapper {
              position: relative;
              display: flex;
              justify-content: space-between;
              .item-checked {
                width: 30px;
                padding-top: 1.7px;
              }
            }
          }
        }
      }
    }

    .msg {
      span {
        font-size: 11px;
        color: #0d294a;
      }
      &.error {
        span {
          color: #e54b4b;
        }
      }
    }
  }
</style>

<div class="base-select-menu">
  <label for="select-menu">
    {label}
    {#if withtooltip}
      <Tooltip indentifier={label.split(' ').join('')}>{tooltiptext}</Tooltip>
    {/if}
  </label>
  <div
    class={`input-box${focused ? ' focused' : ''}`}
    class:error={error.status}>
    <button
      class="btn-select-menu"
      name="select-menu"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      on:click={handleClickInput}
      on:focus={handleFocused}
      on:blur={handleBlured}
      on:keydown={handleKeyboardEvent}>
      {selectedItem.hasOwnProperty('name') ? selectedItem.name : ''}
    </button>
    <svg
      class:focused={isMenuShowing}
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
            <polyline id="Path-3-Copy" points="345 45 349.86184 50 355 45" />
          </g>
        </g>
      </g>
    </svg>

    <!-- SELECT OPTIONS MENU -->
    {#if isMenuShowing}
      <div
        class={`select-menu-options`}
        use:clickOutside
        on:click_outside={() => {
          isMenuShowing = false;
          focused = false;
        }}>
        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label">
          {#each items as item, i (item.value)}
            <li
              id={`listbox-item-${i}`}
              class="listbox-item"
              role="option"
              tabindex="0"
              index-value={i}
              on:click={() => handleSelectedItem(item)}>
              <div class="item-wrapper">
                <span>{item.name}</span>
                {#if selectedItem.value === item.value}
                  <span class="item-checked">
                    <svg
                      width="22"
                      height="22"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      fill="#00aaae"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  <div class="msg" class:error={error.status}>
    {#if error.status}<span>{error.msg}</span>{/if}
  </div>
</div>
