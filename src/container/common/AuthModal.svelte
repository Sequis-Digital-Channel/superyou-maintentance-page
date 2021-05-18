<script>
  import BaseInputText from "../../components/BaseInputText.svelte";
  import BaseInputCheck from "../../components/BaseInputCheck.svelte";
  import { authStore } from "../../stores/auth/store";
  import { actionShowAndCloseModalLogin } from "../../stores/auth/actions"

  export let APP_URL

  let passwordInputType = "password";
  let passwordInputIcon = 'https://superyou.co.id/img/icons/eye.svg';

  let isLoading = false;
  let modalErrorMessage = "";
  let isForgotPassword = false;
  let isLinkResetPasswordHasbeenSent = false;

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
    },
    rememberme: {
      value: false,
      error: false,
      error_msg: ""
    }
  }

  let userForgotPassEmail = {
    value: "",
    error: false,
    error_msg: ""
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

    userLoginData.email.error = false;
    userLoginData.email.error_msg = false;
    userLoginData.password.error = false;
    userLoginData.password.error_msg = false;
    modalErrorMessage = '';
    isLoading = true;

    const payload = {
      username: userLoginData.email.value,
      password: userLoginData.password.value,
      rememberme: userLoginData.rememberme ? 1 : 0,
      locale: 'id'
    }

    try {
      const login_attemp = await fetch('/functions/auth.json', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const auth_res = await login_attemp.json();
      console.log(auth_res);
      if (auth_res.status === '401') {
        modalErrorMessage = auth_res.msg;
      } else if (auth_res.status !== '200' && auth_res.hasOwnProperty('msg')){
        auth_res.msg.forEach(eMsg => {
          if (eMsg[0].includes('username') || eMsg[0].toLowerCase().includes('email')) {
            userLoginData.email.error = true;
            userLoginData.email.error_msg = eMsg[0];
          } else if (eMsg[0].includes('password')) {
            userLoginData.password.error = true;
            userLoginData.password.error_msg = eMsg[0];
          }
        })
      }
      if (auth_res.status === '200') {
        localStorage.setItem('e_u_id', auth_res.encrypted_u_id);
        authStore.update(() => {
          const { access_token } = auth_res.user;
          const { dob, first_name, gender, mobile_number, identity_number, full_name } = auth_res.user.profile;
          const updatedAuth = {
            authorization: {
              access_token
            },
            user_profile: {
              dob, first_name, gender, mobile_number, identity_number, full_name
            }
          }
          return updatedAuth;
        });
        window.location.href = `${APP_URL}/dashboard/profil`;
      }
    } catch (err) {
      console.log(err)
    }
    isLoading = false;
  }

  async function handleForgotPass() {
    userForgotPassEmail.error = false;
    userForgotPassEmail.error_msg = "";
    if (isLoading) return;
    isLoading = true;
    fetch(`${APP_URL}/fe/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userForgotPassEmail.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      if ('data' in data && data['data'] === 'success') {
        isLinkResetPasswordHasbeenSent = true;
      } else if ('errors' in data) {
        userForgotPassEmail.error = true;
        userForgotPassEmail.error_msg = data['errors'];
      } else if ('exception' in data) {
        userForgotPassEmail.error = true;
        userForgotPassEmail.error_msg = 'Email yang anda masukkan tidak terdaftar'
      }
      console.log(data);
      isLoading = false;
    })
    .catch(err => {
      console.log(err)
      isLoading = false;
    })
  }
</script>

<div
  id="auth-modal"
  class="w-full h-full inset-0 md:max-w-screen-sm fixed bg-white md:rounded-xl"
  class:forgot-password={isForgotPassword}>
  <div
    class="absolute right-0 text-darkblue pt-2 pr-3 md:hidden z-20"
    style="font-size: 28px;"
    on:click={() => actionShowAndCloseModalLogin(false)}>&#10005;</div>
  <div class="auth-wrapp py-16 px-6 md:px-12 relative">
    {#if !isForgotPassword}
      <h2 class="text-darkblue font-bold text-2xl">Login</h2>
      <p class="text-bluegray text-sm md:text-base mt-2 mb-6">Selamat datang kembali di Super You! Silakan masukkan e-mail dan password kamu untuk login.</p>
      <form on:submit|preventDefault={handleLogin}>
        <BaseInputText
          label="Email"
          name="user_email"
          bind:value={userLoginData.email.value}
        />
        {#if userLoginData.email.error}
        <span class="text-xs text-red-500 inline-block">{userLoginData.email.error_msg}</span>
        {/if}
        <br>
        <div class="mt-2">
          <BaseInputText
            label="Password"
            name="user_password"
            type={passwordInputType}
            icon={passwordInputIcon}
            on:iconclick={handleToggleInput}
            bind:value={userLoginData.password.value}
          />
        </div>
        {#if userLoginData.password.error}
        <span class="text-xs text-red-500 inline-block">{userLoginData.password.error_msg}</span>
        {/if}
        <br>
        <div class="flex justify-between items-center mt-2">
          <BaseInputCheck
            id="remember-me"
            value={userLoginData.rememberme.value}
            on:input={(e) => {
              userLoginData.rememberme.value = e.target.checked
            }}
          >
            <span class="text-bluegray text-sm">Ingat Saya</span>
          </BaseInputCheck>

          <p
            class="text-sm text-darkblue font-bold hover:underline" style="margin-bottom: -1px;"
            on:click={() => isForgotPassword = !isForgotPassword}
            >Lupa Password</p>
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
        {#if modalErrorMessage}
        <span class="text-red-500 text-xs font-bold inline-block mt-4 md:mt-1">{modalErrorMessage}</span>
        {/if}
      </form>
      <div class="sign-up" class:warning={modalErrorMessage !== ''}>
        <p class="text-base text-bluegray">Belum punya akun ? <a href="/isi-data" class="font-bold text-teal hover:underline">Daftar Sekarang</a></p>
      </div>
    {:else}
      <h2 class="text-darkblue font-bold text-2xl pt-8 sm:pt-0">Lupa Password ?</h2>
      <p class="text-bluegray text-sm md:text-base mt-2 mb-6">
        {#if !isLinkResetPasswordHasbeenSent}
        Jangan khawatir. Silakan masukkan alamat e-mail yang digunakan sewaktu mendaftar akun Super You untuk merubah password anda.
        {:else}
        Password baru sudah dikirimkan ke e-mail. Kamu bisa cek e-mail dan reset password kamu sebelum melanjutkan proses login
        {/if}
      </p>
      {#if !isLinkResetPasswordHasbeenSent}
      <form on:submit|preventDefault={handleForgotPass}>
        <BaseInputText
          label="Email"
          name="user_email"
          bind:value={userForgotPassEmail.value}
        />
        {#if userForgotPassEmail.error}
        <span class="text-xs text-red-500 inline-block">{userForgotPassEmail.error_msg}</span>
        {/if}
        <br>
        <button
          type="submit"
          disabled={isLoading}
          class="btn-login relative w-full md:w-64 block mt-4 bg-teal px-4 py-3 rounded-xl text-sm text-white font-bold text-left">KIRIM
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
      {:else}
      <button
          type="submit"
          on:click={() => actionShowAndCloseModalLogin(false)}
          class="btn-login relative w-full md:w-64 block mt-6 bg-teal px-4 py-3 rounded-xl text-sm text-white font-bold text-left">SELESAI <span class="arr font-bold text-base">&rarr;</span>
        </button>
      {/if}
    {/if}
  </div>
</div>

<style lang="postcss">
  #auth-modal {
    z-index: 15;
    
    @media (min-width: 768px) {
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      max-height: 564px;

      &.forgot-password {
        max-height: 400px;
      }
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

    .sign-up {
      margin-top: 20px;
      &.warning {
        margin-top: 16px;
      }
    }
  }
</style>