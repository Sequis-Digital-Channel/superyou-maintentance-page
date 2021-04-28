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
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': user_login.headers['set-cookie'],
    });
    res.end(JSON.stringify(user_login.data))
  } catch (error) {
    console.log(error)
  }
}