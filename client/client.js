const http = require('http');

const appOptions = {
  hostname: process.env.APP_HOST,
  port: process.env.APP_PORT,
  path: '/',
  method: 'GET'
};

console.log('App Container Configuration: ', appOptions);

const request1 = http.request(appOptions, response => {
  console.log(`statusCode: ${response.statusCode}`);

  response.on('data', d => {
    process.stdout.write(d);
  });
});

request1.on('error', error => {
  console.error(error);
});

request1.end();

const dappOptions = {
  hostname: process.env.DAPP_HOST,
  port: process.env.DAPP_PORT,
  path: '/',
  method: 'GET'
};

console.log('DApp Container Configuration: ', dappOptions);

const request2 = http.request(dappOptions, response => {
  console.log(`statusCode: ${response.statusCode}`);

  response.on('data', d => {
    process.stdout.write(d);
  });
});

request2.on('error', error => {
  console.error(error);
});

request2.end();

const wssOptions = {
  hostname: process.env.WSS_HOST,
  port: process.env.WSS_PORT,
  path: '/',
  method: 'GET'
};

console.log('WebSocket Server Configuration: ', wssOptions);

const request3 = http.request(wssOptions, response => {
  console.log(`statusCode: ${response.statusCode}`);

  response.on('data', d => {
    process.stdout.write(d);
  });
});

request3.on('error', error => {
  console.error(error);
});

request3.end();
