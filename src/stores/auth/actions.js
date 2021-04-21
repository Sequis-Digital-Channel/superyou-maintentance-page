import { showModalLogin } from "./store";

export function actionShowAndCloseModalLogin(isShowing) {
  showModalLogin.update(() => isShowing);
}

export function actionLogout() {
  if(typeof window !== 'undefined') {
    window.localStorage.removeItem('auth');
    window.location.href = "/logout"
  }
}