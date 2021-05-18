import { session_id } from '../stores/auth/store';

export function getSuperyouLaravelSession() {
  fetch("/functions/session.json", {
    credential: 'true'
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    const tr_s_id = {
      val: data.session_id,
      expiry: new Date().getTime() + 30 * 60 * 1000 // set for 30 minutes
    }
    localStorage.setItem('tr_s_id', JSON.stringify(tr_s_id));
    // connecting session to Auth Store
    session_id.update(() => tr_s_id);
  })
  .catch(err => {
    console.log(err, 'error');
  });
}

export function manageSessionTracker() {
  let isSessionHasBeenRemoved = false;
  const tr_s_id = localStorage.getItem('tr_s_id');
  const s_data = JSON.parse(tr_s_id);
  if (s_data && typeof(s_data.val) === 'string') {
    session_id.update(() => s_data);
    isSessionHasBeenRemoved = clearExpiredSession(s_data, 'tr_s_id');
  }

  if (!s_data || isSessionHasBeenRemoved ) {
    getSuperyouLaravelSession();
  }
}

function clearExpiredSession(data, key) {
  if(typeof window !== 'undefined') {
    const nowTime = new Date();
    if (nowTime > data.expiry) {
      localStorage.removeItem(key);
      session_id.update(() => null);
      return true;
    }

    return false;
  }
}