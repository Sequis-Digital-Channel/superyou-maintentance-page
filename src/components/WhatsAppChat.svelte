<script>
import { onMount } from "svelte";
import { fade, scale } from "svelte/transition"

let whatsAppShowing = false;
let windowNotifShowing = false;
let userClosedWindowNotif = false;

function getDeviceType() {
  let deviceType = "desktop";
  if (/Mobi|Android/i.test(navigator.userAgent)) {
      deviceType = "mobile";
  }
  return deviceType;
}

onMount(() => {
  const deviceType = getDeviceType();
  const aboveTheFoldWrapper = document.querySelector(".above-the-fold-wrapper");
  const whatsAppChatObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
            whatsAppShowing = true;
          } else {
            whatsAppShowing = false;
          }
    })
  }, {
    rootMargin: "0px 0px 0px 0px"
  });
  whatsAppChatObserver.observe(aboveTheFoldWrapper)

  const premiCalcSection = document.querySelector(".premi-calculation");
  const windowNotifObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !userClosedWindowNotif && deviceType === 'desktop') {
        windowNotifShowing = true;
      } else if (windowNotifShowing) {
        windowNotifShowing = false;
      }
    })
  }, {
    rootMargin: "-300px 0px -300px 0px"
  });

  windowNotifObserver.observe(premiCalcSection);

})
</script>

{#if whatsAppShowing}
  <div in:fade={{ duration: 500 }} out:fade={{ duration: 500, delay: 300 }} class="whatsapp_chat">
    <img
      on:click={() => {
        windowNotifShowing = !windowNotifShowing;
      }}
      src="/icons/whatsapp.svg"
      alt="WhatsApp"
      width="65"
      height="65">
  </div>
{/if}

{#if windowNotifShowing && whatsAppShowing }
  <div in:scale={{ duration: 500, delay: 200 }} out:scale={{ duration: 500 }} class="window-notification" style="transform-origin: bottom right;">
    <svg
      on:click={() => {
        windowNotifShowing = false;
        userClosedWindowNotif = true;
      }}
      class="notif-window-closed cursor-pointer"
      width="14px"
      height="14px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Group 3</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id="Desktop_Landing"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round">
        <g
          id="101_Desktop-Landing"
          transform="translate(-1322.000000, -2247.000000)"
          stroke="#1F3958"
          stroke-width="1.6">
          <g id="Group-2" transform="translate(987.000000, 2233.000000)">
            <g id="Group-4">
              <g id="Group-3" transform="translate(336.000000, 15.000000)">
                <g id="Group">
                  <path
                    d="M13.687093,0.464439109 L0.388888889,13.7626432"
                    id="Line-2" />
                  <path
                    d="M0.402266137,0.553798255 L13.6111111,13.7626432"
                    id="Line-2" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <div class="content">
      <p class="text-darkblue text-sm relative mb-5">Masih bingung menentukan proteksi Super You untukmu?</p>
      <a class="btn-chat-now bg-teal relative text-xs text-white font-bold w-full flex justify-between items-center" href="https://wa.me/628992325566" target="_blank">
        CHAT KAMI SEKARANG

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="10"
          height="10"
          viewBox="0 0 12 12">
          <defs>
            <path
              id="a"
              d="M3.69 6.997l3.563 3.296a.948.948 0 0 1 0 1.414c-.422.39-1.107.39-1.53 0l-5.406-5a.948.948 0 0 1 0-1.414l5.407-5a1.145 1.145 0 0 1 1.53 0 .948.948 0 0 1 0 1.414l-3.559 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23z" />
          </defs>
          <use
            fill="#FFF"
            fill-rule="nonzero"
            transform="rotate(-180 6 6)"
            xlink:href="#a" />
        </svg>
      </a>
    </div>
  </div>
{/if}

<style lang="postcss">
  .whatsapp_chat {
    content-visibility: auto;
    position: fixed;
    right: 20px;
    bottom: 12%;
    cursor: pointer;
    z-index: 3;
    @media (max-width: 639px) {
      bottom: 9%;
      right: 1px;

      & > img {
        width: 60px;
        height: 60px;
      }
    }
  }
  .window-notification {
    width: 350px;
    height: 154px;
    position: fixed;
    right: 50px;
    content-visibility: auto;
    padding: 23px 60px 23px 23px;
    z-index: 2;
    bottom: 9%;
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
    border-radius: 12px;
    box-shadow: 0px 2px 15px 0px rgba(143, 143, 143, 0.8);

    @media (max-width: 639px) {
      width: 90%;
      right: 5%;
    }

    &:before {
      content: "";
      border-radius: 12px;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: hsla(0,0%,100%,.8);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }

    .notif-window-closed {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .content {
      .btn-chat-now {
        padding: 10px 20px;
        border-radius: 12px;
        &:hover {
          background-color: #00c4c7;
        }
      }
    }
  }
</style>