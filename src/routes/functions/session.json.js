import axios from 'axios';
export async function get(req, res) {
  let superyou_session="";
  const response = await axios.get("https://staging.superyou.co.id/generate-session", {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    }
  });
  superyou_session=response.headers['set-cookie'][1];
  let form_logs = `${superyou_session.replace('superyou_session', 'form_logs')}`;
  response.headers['set-cookie'].push(form_logs);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Set-Cookie': response.headers['set-cookie'],
  });
  res.end(JSON.stringify({
    ...response.data
  }));
}