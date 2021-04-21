<script>
  import BaseInputText from "../../components/BaseInputText.svelte";
  import BaseInputCheck from "../../components/BaseInputCheck.svelte";
  import { authStore } from "../../stores/auth/store";
  import { actionShowAndCloseModalLogin } from "../../stores/auth/actions"

  export let SUPER_API_URL

  let passwordInputType = "password";
  let passwordInputIcon = 'https://superyou.co.id/img/icons/eye.svg';

  let isLoading = false;

  let userLoginData = {
    email: {
      value: "",
      error: false,
      error_msg: ""
    },
    password: {
      value: "",
      error: false,
      error_msg: ""
    }
  }

  function handleToggleInput(e) {
    if (e.detail.inputType === "text") {
      passwordInputType = "password";
      passwordInputIcon = "https://superyou.co.id/img/icons/eye.svg";
    } else {
      passwordInputType = "text";
      passwordInputIcon = "https://superyou.co.id/img/icons/edit-gray.svg";
    }
  }

  async function handleLogin(e) {
    if(isLoading) return;
    isLoading = true;
    const payload = {
      username: userLoginData.email.value,
      password: userLoginData.password.value
    }

    try {
      // get bearer token
      const login_attemp = await fetch(`${SUPER_API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      const auth_res = await login_attemp.json();
      const get_user_profile = await fetch(`${SUPER_API_URL}/api/v1/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth_res.data.access_token}`
        }
      });

      const profile = await get_user_profile.json();
      authStore.update(() => {
        const { access_token, refresh_token, expires_in } = auth_res.data
        const { dob, first_name, gender, mobile_number, identity_number, full_name } = profile.data;
        const updatedAuth = {
          authorization: {
            access_token, refresh_token, expires_in
          },
          user_profile: {
            dob, first_name, gender, mobile_number, identity_number, full_name
          }
        }
        return updatedAuth;
      });
      window.location.reload();
    } catch (error) {
      console.log(console.error())
    }
    isLoading = false;
  }
</script>

<div id="auth-modal" class="w-full h-full inset-0 md:max-w-screen-sm fixed bg-white md:rounded-xl">
  <div
    class="absolute right-0 text-darkblue pt-2 pr-3 md:hidden"
    style="font-size: 28px;"
    on:click={() => actionShowAndCloseModalLogin(false)}>&#10005;</div>
  <div class="auth-wrapp py-16 px-6 md:px-12">
    <h2 class="text-darkblue font-bold text-2xl">Login</h2>
    <p class="text-bluegray text-sm md:text-base mt-2 mb-6">Selamat datang kembali di Super You !</p>
    <form on:submit|preventDefault={handleLogin}>
      <BaseInputText
        label="Email"
        name="user_email"
        bind:value={userLoginData.email.value}
      />
      <br>
      <BaseInputText
        label="Password"
        name="user_password"
        type={passwordInputType}
        icon={passwordInputIcon}
        on:iconclick={handleToggleInput}
        bind:value={userLoginData.password.value}
      />
      <br>
      <div class="flex justify-between items-center">
        <BaseInputCheck
          id="remember-me"
          value={null}
          on:input={(e) => {console.log("remember me")}}
        >
          <span class="text-bluegray text-sm">Ingat Saya</span>
        </BaseInputCheck>

        <p class="text-sm text-darkblue font-bold hover:underline" style="margin-bottom: -1px;">Lupa Password</p>
      </div>
      <br>
      <button
        type="submit"
        class="btn-login relative w-full md:w-64 block mt-4 bg-teal px-4 py-3 rounded-xl text-sm text-white font-bold text-left">LOGIN
        {#if isLoading}
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white arr arr-onload" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        {:else}
          <span class="arr font-bold text-base">&rarr;</span>
        {/if}
      </button>
    </form>
    <div class="sign-up mt-5">
      <p class="text-base text-bluegray">Belum punya akun ? <a href="/isi-data" class="font-bold text-teal hover:underline">Daftar Sekarang</a></p>
    </div>
  </div>
</div>

<style lang="postcss">
  #auth-modal {
    z-index: 15;
    
    @media (min-width: 768px) {
      transform: translate(-50%, -50%);
      min-width: 45%;
      left: 50%;
      top: 50%;
      max-height: 540px;
    }

    .btn-login {
      .arr {
        transition: 0.4s;
        position: absolute;
        right: 16px;
        &.arr-onload {
          right: 16px;
          top: 11px;
          width: 24px;
          height: 24px;
        }
      }

      &:hover {
        .arr {
          right: 12px;
          &.arr-onload {
            right: 16px;
          }
        }
      }
    }
  }
</style>