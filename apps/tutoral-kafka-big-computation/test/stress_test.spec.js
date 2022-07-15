import http from 'k6/http';
import { check, sleep } from 'k6';

// https://stackoverflow.com/a/1349426
function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },
};

export default function () {
  const res = http.post('http://localhost:3000/encode', {
    password: makeid(15),
  });
  check(res, {
    'status was 200': (r) => r.status == 200,
    'hash is present': (r) => r.json('hash').valueOf() != null,
    'hash is argon2-like': (r) =>
      r.json('hash').valueOf().startsWith('$argon2id'),
  });
  sleep(1);
}
