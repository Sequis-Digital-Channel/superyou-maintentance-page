<script>
  import { imask } from "svelte-imask";
  import { getYearsFromPast } from "../utils/_date";

  export let name = "dob";
  export let minAge = 1;
  export let maxAge = 65;

  export let value = "";

  export let error = {
    status: false,
    msg: "",
  };

  export let label = "";

  let focused = false;
  let isDateComplete = false;
  const options = {
    mask: "DD/MM/YYYY",
    blocks: {
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      YYYY: {
        mask: IMask.MaskedRange,
        from: new Date(getYearsFromPast(maxAge)).getFullYear(),
        to: new Date(getYearsFromPast(minAge)).getFullYear(),
      },
    },
    autofix: true,
    lazy: true,
    overwrite: true,
  };

  function onAccept({ detail: imask }) {
    isDateComplete = false;
  }

  function onComplete({ detail: imask }) {
    value = imask._value;
    isDateComplete = true;

    error.msg = "";
    error.status = false;
  }

  function onBlured() {
    focused = false;
    if (!isDateComplete) {
      error.msg = "Tanggal lahir tidak valid";
      error.status = true;
    }
  }

  function onFocus() {
    focused = true;
  }
</script>

<div class="base-input-date" class:focused class:error={error.status}>
  <label for={name}>{label}</label>
  <input
    class="input-date"
    id={name}
    {name}
    {value}
    placeholder="dd/mm/yyyy"
    use:imask={options}
    on:accept={onAccept}
    on:complete={onComplete}
    on:focus={onFocus}
    on:blur={onBlured}
    type="tel"
    autocomplete="off"
  />

  <div class="ic-calendar">
    <svg
      width="20px"
      height="22px"
      viewBox="0 0 24 25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Group</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id="Symbols"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <g
          id="Icon/Iput-textCalendar"
          transform="translate(1.000000, 0.000000)">
          <g id="Group">
            <g id="Group-3">
              <path
                d="M21.397619,6.10753247 L21.397619,21.7885714 C21.397619,22.9948052 20.5546825,24 19.452381,24 L1.9452381,24 C0.842936508,24 0,22.9948052 0,21.7885714 L0,6.10753247 C0,4.9012987 0.842936508,3.8961039 1.9452381,3.8961039 L19.452381,3.8961039 C20.5546825,3.8961039 21.397619,4.9012987 21.397619,6.10753247 Z"
                id="Shape"
                stroke="#0D294A"
                stroke-width="1.57090909"
                fill-rule="nonzero"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="3.77142857"
                y="11.7142857"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="9.40238095"
                y="11.7142857"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="15.0333333"
                y="11.7142857"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="3.77142857"
                y="17.2987013"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="9.40238095"
                y="17.2987013"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <rect
                id="Rectangle-path"
                fill="#0D294A"
                fill-rule="nonzero"
                x="15.0333333"
                y="17.2987013"
                width="2.25238095"
                height="2.23376623"
                rx="0.218181821"
              />
              <path
                d="M5.36596639,3.94194041 L3.37857143,3.94194041 L3.37857143,0.985485103 C3.37857143,0.459893048 3.84229692,0 4.37226891,0 C4.9022409,0 5.36596639,0.459893048 5.36596639,0.985485103 L5.36596639,3.94194041 Z"
                id="Shape"
                fill="#0D294A"
                fill-rule="nonzero"
              />
              <path
                d="M18.3659664,3.94194041 L16.3785714,3.94194041 L16.3785714,0.985485103 C16.3785714,0.459893048 16.8422969,0 17.3722689,0 C17.9022409,0 18.3659664,0.459893048 18.3659664,0.985485103 L18.3659664,3.94194041 Z"
                id="Shape"
                fill="#0D294A"
                fill-rule="nonzero"
              />
              <path
                d="M20.402381,9.27272727 L0.47393632,9.27272727"
                id="Line-2"
                stroke="#0D294A"
                stroke-width="1.63636364"
                stroke-linecap="square"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
  <div class="msg" class:error={error.status}>
    {#if error.status}<span>{error.msg}</span>{/if}
  </div>
</div>

<style lang="postcss">
  .base-input-date {
    position: relative;
    height: 64px;
    & > label {
      display: block;
      font-size: 14px;
      color: #708697;
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

    &.error {
      & > label {
        color: #e54b4b;
      }
      &::after {
        transform: scaleX(1);
        z-index: 2;
        background-color: #e54b4b;
      }
    }

    .input-date {
      display: flex;
      width: 100%;
      min-height: 40px;
      padding: 8px 0;
      letter-spacing: 0.6px;
    }

    .ic-calendar {
      position: absolute;
      right: 8px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
    }

    .msg {
      position: absolute;

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
