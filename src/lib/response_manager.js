

const respond = (res, data, httpCode) => {
  const response = {
    error: data.error,
    code: httpCode,
    data: data.response,
    message: data.message,
    validationError: data.validationError
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Method', '*');


  res.writeHead(httpCode);
  res.end(JSON.stringify(response));
}

const success = (res, response, status = 200) => {
  const data = response;
  data.error = false;
  respond(res, data, status);
};

const failure = (res, response, httpCode = 503) => {
  const data = response;
  data.error = true;
  respond(res, data, httpCode);
};

export {
  success, failure
};
