import { showModalLogin } from "./store";

export function actionShowAndCloseModalLogin(isShowing) {
  showModalLogin.update(() => isShowing);
}

export function actionLogout() {
  if(typeof window !== 'undefined') {
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('e_u_id');
    window.location.href = "/logout"
  }
}