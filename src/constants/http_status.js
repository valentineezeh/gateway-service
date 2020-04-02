/* eslint-disable require-jsdoc */

class HTTPStatus {

}

Object.defineProperty(HTTPStatus, 'OK', {
  value: 200,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(HTTPStatus, 'CREATED', {
  value: 201,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(HTTPStatus, 'ACCEPTED', {
  value: 202,
  writable: false,
  enumerable: true,
  configurable: false,
});


Object.defineProperty(HTTPStatus, 'BAD_REQUEST', {
  value: 400,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(HTTPStatus, 'NOT_FOUND', {
  value: 404,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(HTTPStatus, 'INTERNAL_SERVER_ERROR', {
  value: 500,
  writable: false,
  enumerable: true,
  configurable: false,
});

export default HTTPStatus;
