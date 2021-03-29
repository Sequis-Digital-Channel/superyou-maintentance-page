<script context="module">
  import { testimonies } from "../data/json/testimonies.json";
</script>

<script>
  import { onMount } from "svelte";
  const lazySrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

  let container;
  let translatePostion = 0;
  let currentTranslate = 1;
  let nextSlideBtnDisabled = false;

  const handleNextSlide = () => {
    let testimonyEl = document.querySelector(".testimony");
    let testimonyWidth = (
      (testimonyEl.offsetWidth / testimonyEl.offsetParent.offsetWidth) *
      100
    ).toFixed(3);
    let totalContainerWidth = testimonies.length * testimonyWidth;
    let howManyTranslateX = Math.floor(totalContainerWidth / 100);

    if (howManyTranslateX > currentTranslate) {
      translatePostion += 100;
      currentTranslate += 1;
      container.style.transform = `translateX(-${translatePostion}%)`;
    } else {
      translatePostion = totalContainerWidth - 100;
      container.style.transform = `translateX(-${totalContainerWidth - 100}%)`;
      nextSlideBtnDisabled = true;
    }
  };

  const handlePreviousSlide = () => {
    if (translatePostion >= 100) {
      translatePostion -= 100;
      currentTranslate -= 1;
      container.style.transform = `translateX(-${translatePostion}%)`;
    } else {
      translatePostion = 0;
      currentTranslate = 1;
      container.style.transform = `translateX(-${translatePostion}%)`;
    }
    nextSlideBtnDisabled = false;
  };

  onMount(() => {
    container = document.querySelector(".testimony_wrapper");
  });
</script>

<style lang="postcss">
  #testimony {
    margin: 0 auto;
    max-width: 1280px;
    padding: 30px 0 50px;
    position: relative;

    .testimony_wrapper {
      position: relative;
      display: flex;
      overflow-x: auto;
      flex-wrap: nowrap;
      white-space: nowrap;
      transition: -ms-transform 0.5s ease 0s, -webkit-transform 0.5s ease 0s,
        transform 0.5s ease 0s;

      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE 11 */
      scrollbar-width: none; /* Firefox 64 */

      @media (min-width: 1410px) {
        overflow: visible;
      }

      .testimony {
        /* width: 100%; */
        display: inline-block;
        flex: 0 0 auto;
        scroll-snap-align: center;
        scroll-behavior: smooth;
        width: 94%;
        @media (min-width: 640px) {
          width: 48%;
        }
        @media (min-width: 768px) {
          width: 48%;
        }

        @media (min-width: 1024px) {
          width: 42%;
        }
        @media (min-width: 1280px) {
          width: 32%;
        }
        @media (min-width: 1410px) {
          width: 33.3333%;
        }
        .testimony_card {
          width: 100%;
          height: 100%;
          white-space: normal;

          .testimony_content {
            min-height: 136px;
            @media (min-width: 1024px) {
              min-height: 128px;
            }
          }
        }
      }
    }
  }

  .arrow-chevron {
    display: none;
    @media (min-width: 1410px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.disabled {
      opacity: 0.5;
      user-select: none;
    }
    top: 50%;
    &.left {
      left: -50px;
    }
    &.right {
      right: -50px;
    }
  }
</style>

<div id="testimony">
  <h2 class="md:text-xl text-white text-center font-bold mb-6 lg:mb-6">
    Apa Kata Mereka Tentang Super You
  </h2>

  <div class="-ml-2 -mr-2">
    <div class="my-0 overflow-hidden">
      <div class="testimony_wrapper">
        {#each testimonies as testimony, i (i)}
          <div class="testimony">
            <div class="pl-2 pr-2">
              <div class="testimony_card bg-white rounded-lg p-6">
                <div class="testimony_product mb-4">
                  <h3 class="text-darkblue md:text-xl font-bold">
                    {testimony.product_name}
                  </h3>
                  <span
                    class="text-bluegray text-sm">{testimony.insurance_type}</span>
                </div>
                <div class="testimony_content mb-3 md:mb-4">
                  <h5 class="text-teal font-bold md:text-xl mb-2 text-ita">
                    "{testimony.caption}"
                  </h5>
                  <p class="testimony-content text-bluegray text-sm">
                    {testimony.body}
                  </p>
                </div>

                <div class="testimony-user flex">
                  <div class="lazy-image mr-2">
                    <img
                      class="rounded-full object-cover"
                      src={lazySrc}
                      data-src={testimony.person.avatar_url}
                      alt="User Testimony"
                      width="48"
                      height="48"
                      style="height:48px" />
                  </div>
                  <div class="flex flex-col">
                    <p class="text-darkblue font-bold text-lg">Stephanie</p>
                    <p class="text-bluegray text-xs">Karyawan Swasta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div
    class="arrow-chevron w-10 h-10 bg-teal rounded-full absolute shadow-lg left"
    class:disabled={translatePostion === 0}
    on:click={handlePreviousSlide}>
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style="display: block; fill: none; height: 16px; width: 16px; stroke: #fff; stroke-width: 4; overflow: visible;"><g
        fill="none">
        <path
          d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932" />
      </g></svg>
  </div>
  <div
    class="arrow-chevron w-10 h-10 bg-teal rounded-full absolute shadow-lg right"
    class:disabled={nextSlideBtnDisabled}
    on:click={handleNextSlide}>
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style="display: block; fill: none; height: 16px; width: 16px; stroke: #fff; stroke-width: 4; overflow: visible;"><g
        fill="none">
        <path
          d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932" />
      </g></svg>
  </div>
</div>
