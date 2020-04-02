import isIp from 'is-ip';
import { success, failure } from '../lib/response_manager';
import GatewayService from '../services/gatewayService';
import HTTPStatus from '../constants/http_status';

/**
 * @description gate way controller
 * @class GatewayController
 */
class GatewayController {
/**
     *
     * @param {*} logger Logger Object
     * @param {*} GatewayService Object
     */
  constructor(logger) {
    this.logger = logger;
  }

  /**
     * @description create a new gateway
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns a payload of created gateway
     */
  async createGateWay(req, res) {
    try {
      const {
        serialNumber,
        name,
        ipv4,
      } = req.body;

      // validate ipv4 input
      if (isIp.v4(ipv4) === false) {
        return failure(res, {
          message: 'Invalid ipv4 format'
        }, HTTPStatus.BAD_REQUEST);
      }

      // Create new gateway if all validation has been checked
      const data = await GatewayService.createGateway({ serialNumber, name, ipv4 });
      return success(res, {
        message: 'Gateway created successfully',
        response: data
      }, HTTPStatus.CREATED);
    } catch (error) {
      this.logger.error('Error from creating gateway ', error);
      return failure(res, {
        message: 'Could not create gateway',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description create add a new device
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns a payload of created device
     */
  async createDevice(req, res) {
    try {
      const {
        _id
      } = req.params;

      const {
        uid,
        vendor,
        status
      } = req.body;

      // validate _id input
      if (!_id || _id.trim().length === 0 || _id === '') {
        return failure(res, {
          message: 'Gateway ID is required'
        }, HTTPStatus.BAD_REQUEST);
      }

      // find if gateway exist
      const findGateway = await GatewayService.getGateway({ _id });

      // If gateway is not found return this error
      if (!findGateway) {
        return failure(res, {
          message: 'Gateway not found',
        }, HTTPStatus.NOT_FOUND);
      }

      // If gateway device length is greater than 10 return this error with bad request
      if (findGateway.devices.length > 10) {
        return failure(res, {
          message: 'Device has exceeded the required limits'
        }, HTTPStatus.BAD_REQUEST);
      }

      // If every things goes on well add the device.
      const data = await GatewayService.addDevice({ _id }, { uid, vendor, status });

      return success(res, {
        message: 'Device creation was a success',
        response: data
      }, HTTPStatus.CREATED);
    } catch (error) {
      this.logger.error('Error from creating a device', error);
      return failure(res, {
        message: 'Could not create device',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description get all gateways
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns a payload of all gateways
     */
  async getAllGateways(req, res) {
    try {
      // get all gateways
      const data = await GatewayService.allGateways();
      //  If a empty array is return throw this error
      if (data.length === 0) {
        return failure(res, {
          message: 'Gateway is yet to be created.'
        }, HTTPStatus.NOT_FOUND);
      }
      // return success if everything goes as plan
      return success(res, {
        message: 'Successfully retrieved all gateways',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error retrieving gateways', error);
      return failure(res, {
        message: 'Could not retrieve all gateways',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description get a single gateways
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns a payload of a single gateway
     */
  async getSingleGateway(req, res) {
    try {
      const { _id } = req.params;

      // validate _id input
      if (!_id || _id.trim().length === 0 || _id === '') {
        return failure(res, {
          message: 'Gateway ID is required'
        }, HTTPStatus.BAD_REQUEST);
      }

      // Find data using an id
      const data = await GatewayService.getGateway({ _id });

      // If data is not found return an error
      if (!data) {
        return failure(res, {
          message: 'Gateway is yet to be created',
        }, HTTPStatus.NOT_FOUND);
      }

      // If every thing goes on as plan return success message
      return success(res, {
        message: 'Successfully retrieve Gateway',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error retrieving a single gateway', error);
      return failure(res, {
        message: 'Could not retrieve a single gateway',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description remove a device from a gateway
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns a success message
     */
  async removeDevice(req, res) {
    try {
      const { _id } = req.params;
      const { deviceId } = req.body;

      if (!_id || _id.trim().length === 0 || _id === '') {
        return failure(res, {
          message: 'Gateway ID is required'
        }, HTTPStatus.BAD_REQUEST);
      }
      await GatewayService.removeDevice({ _id }, { _id: deviceId });

      return success(res, {
        message: 'Device removal was successful',
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error retrieving a single gateway', error);
      return failure(res, {
        message: 'Could not retrieve a single gateway',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default GatewayController;
