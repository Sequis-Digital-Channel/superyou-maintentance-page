import axios from 'axios';

export async function post(req, res) {
  const { username, password, locale, rememberme } = req.body;
  try {
    const user_login = await axios.post(`${process.env.APP_URL}/fe/login`, {
      username,
      password,
      locale,
      rememberme
    });
    if (user_login.data === "") {
      user_login.data = {};
      user_login.data.msg = "Terjadi kesalahan pada penulisan email atau password kamu, harap periksa kembali";
      user_login.data.status = '401';
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': user_login.headers['set-cookie'],
    });
    res.end(JSON.stringify(user_login.data))
  } catch (error) {
    console.log(error)
  }
}