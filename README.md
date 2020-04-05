# gateway-service

Master device that control multiple peripheral devices

## Technologies Used

- Backend: Node/Express
- MongoDB
- Libaries: Es6, eslint, mocha, express, chai, babel

## To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- Type `npm install` to install all dependencies
- `npm start` to run the app in production environment
- npm run `dev` to run development environment
- npm run `test` to run the test suits on the app

## Features

- Create Gateway
- Create Device
- Get all gateways
- Get all devices
- Remove device
- Get a single gateway

## API Endpoints

| Endpoint                                             | Functionality                      |
| ---------------------------------------------------- | ---------------------------------- |
| POST /create-gateway                                 | Create Gateway                     |
| POST /create-device/\<gateway_id>                    | Create a device                    |
| GET /gateways                                        | Get all gateways                   |
| GET /gateways/\<gateway_id>                          | Get a single gateway               |
| DELETE /remove-gateway/\<gateway_id>?deviceId=<_id>  | Remove a device from a gateway     |

## AUTHOR

[Valentine Ezeh](https://github.com/valentineezeh/gateway-service/)