<script>
  import { createEventDispatcher } from "svelte";

  export let name = "inputtext",
  label = "",
  readonly = false,
  // type = "text",
  value = ""
  // error = {
  //   status: false,
  //   msg: "",
  // };

  // let prevType = type;
  let focused = false;
  // let ref = null;

  // const dispatch = createEventDispatcher();
  
  // function dispatchIconOnClick() {
  //   dispatch("iconclick", {
  //     inputType: type,
  //     icon
  //   });
  // }

  // function typeAction(node) {
  //   node.type = type;
  // }

  function onBlured() {
    focused = false;
  }

  function onFocus() {
    if (!readonly) {
      focused = true;
    }
  }

  // $: if(type !== prevType) {
  //   console.log(type, 'input txt');
  //   ref.type = type;
  //   prevType = type;
  // }
</script>


<div class="base-input-search relative z-0 w-full my-5" class:focused>
  <input
    placeholder=" "
    name={name}
    bind:value
    on:focus={onFocus}
    on:blur={onBlured}
    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent"
  />
  <label for={name} class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 text-xs lg:text-sm">{label}</label>
  <div class="absolute right-0 top-0 pt-3 cursor-pointer">
    <div class="flex items-center">
      <img src="/icons/icon-search.svg" alt="Input Icon">
    </div>
  </div>
</div>

<style lang="postcss">
  .base-input-search {
    .top-3 {
      top: .75rem;
    }

    .-z-1 {
      z-index: -1;
    }

    .origin-0 {
      transform-origin: 0%;
    }

    input:focus ~ label,
    input:not(:placeholder-shown) ~ label {
      /* @apply transform; scale-75; -translate-y-6; */
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
        skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --tw-scale-x: 0.75;
      --tw-scale-y: 0.75;
      --tw-translate-y: -1.5rem;
    }

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
  }
</style>