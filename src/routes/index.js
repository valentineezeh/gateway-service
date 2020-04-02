import express from 'express';
import serviceLocate from '../config/di';
import verifyUserInput from '../middlewares/verifyInputs';

const router = express.Router();
const GatewayController = serviceLocate.get('GatewayController');

router.get('/gateways',
  (req, res) => GatewayController.getAllGateways(req, res));

router.post('/create-gateWay',
  (req, res, next) => verifyUserInput.validateGatewayInput(req, res, next),
  (req, res) => GatewayController.createGateWay(req, res));

router.post('/create-device/:_id',
  (req, res, next) => verifyUserInput.validateDeviceInput(req, res, next),
  (req, res) => GatewayController.createDevice(req, res));

router.get('/gateway/:_id',
  (req, res) => GatewayController.getSingleGateway(req, res));

router.delete('/remove-gateway/:_id',
  (req, res) => GatewayController.removeDevice(req, res));

export default router;
