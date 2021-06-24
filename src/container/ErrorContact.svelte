<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from "@sapper/app";
  import BaseInputText from "../components/BaseInputText.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import validator from 'validator';

  const dispatch = createEventDispatcher();
  const { session } = stores();
  let LEADGEN_URL;
  session.subscribe((value) => {
    LEADGEN_URL = value.LEADGEN_URL;
  })

  let name = {
    val: '',
    error: {
      status: false,
      msg: '',
    }
  }

  let email = {
    val: '',
    error: {
      status: false,
      msg: '',
    }
  }

  let telp = {
    val: '',
    error: {
      status: false,
      msg: '',
    }
  }

  function handleFormSubmit() {
    if (name.val === '') {
      name.error.status = true;
      name.error.msg = 'Nama tidak boleh kosong'
    } else {
      name.error.status = false;
      name.error.msg = '';
    }
    if (!validator.isEmail(email.val)) {
      email.error.status = true;
      if (email.val === '') {
        email.error.msg = 'Email tidak boleh kosong'
      } else {
        email.error.msg = 'Invalid email'
      }
    } else {
      email.error.status = false;
      email.error.msg = '';
    }

    if (!validator.isNumeric(telp.val)) {
      telp.error.status = true;
      if (telp.val === '') {
        telp.error.msg = 'No telpon tidak boleh kosong'
      } else {
        telp.error.msg = 'Invalid No telpon'
      }
    } else if (telp.val.length <= 10) {
      telp.error.status = true;
      telp.error.msg = 'Invalid No telpon'
    } 
    else {
      telp.error.status = false;
      telp.error.msg = '';
    }

    if (!name.error.status && !email.error.status && !telp.error.status) {
      fetch(`${LEADGEN_URL}`, {
        method: 'POST',
        body: JSON.stringify({
          full_name: name.val,
          mobile_number: telp.val,
          email: email.val,
          entrance_channel: "superyou",
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => {
        if (response.status == 200) {
          dispatch('submit-success')
        }
      }).catch(error => {
        console.error('Failed to POST', error);
      })
    }
  }
</script>

<div
  id="auth-modal"
  class="bg-white rounded-xl w-full ">
  <div class="py-6 md:px-6 relative px-4">
      <form on:submit|preventDefault={handleFormSubmit}>
        <BaseInputText
          label="Nama Lengkap"
          bind:value={name.val}
          bind:error={name.error}
        />
        <br>
        
        <BaseInputText
          label="Email"
          bind:value={email.val}
          bind:error={email.error}
        />
        
        <br>
        <BaseInputText
          label="No Telpon"
          bind:value={telp.val}
          bind:error={telp.error}
        />
        
        <BaseButton
          style="max-width: 314px; font-size: 14px; margin-top:40px">HUBUNGI SAYA</BaseButton>
      </form>
  </div>
</div>

<style lang="postcss">
  #auth-modal {
    z-index: 15;
    box-shadow: 0 3px 5px 5px rgba(187, 204, 236, 0.35);
    
    /* @media (min-width: 768px) {
      transform: translate(-137%, -15%);
      left: 50%;
      top: 50%;
    } */

    /* @media (min-width: 1440px) {
      height: 350px;
      width: 440px;
    } */

    @media (min-width: 1280px) {
      height: 350px;
      width: 460px;
    }
  }
</style>