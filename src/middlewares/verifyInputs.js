import handleValidations from './errorHandler';

const verifyUserInput = {
  validateGatewayInput: (req, res, next) => {
    req.check('serialNumber', 'serialNumber is required.').trim().notEmpty();
    req.check('name', 'name is required.').trim().notEmpty();
    req.check('ipv4', 'ipv4 is required.').trim().notEmpty();
    req.check('devices', 'devices is required.').trim().optional();
    handleValidations(req, res, next);
  },
  validateDeviceInput: (req, res, next) => {
    req.check('uid', 'uid is required').trim().isNumeric().notEmpty();
    req.check('vendor', 'vendor is required.').trim().notEmpty();
    req.check('status', 'status is required.').trim().notEmpty();
    handleValidations(req, res, next);
  }
};

export default verifyUserInput;
