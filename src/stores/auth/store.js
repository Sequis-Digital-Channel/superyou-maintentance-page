import { writable, derived } from "svelte/store";

// export const authStore = writable({
//   user_profile: null,
//   authorization: null,
// });

export const authStore = writable(null);
export const showModalLogin = writable(false);
export const session_id = writable(null);
export const is_gtm_ready = writable(false);

if(typeof window !== 'undefined') {
  const authdataFromLocalStorage = localStorage.getItem('auth');
  if (authdataFromLocalStorage) {
    authStore.update($authStore => JSON.parse(authdataFromLocalStorage))
  }
}

export const isUserLoggedIn = derived(authStore, $authStore => (
  user_profile.full_name && authorization.access_token
))

authStore.subscribe($authStore => {
  if(typeof window !== 'undefined') {
    localStorage.setItem('auth', JSON.stringify($authStore));
  }
})