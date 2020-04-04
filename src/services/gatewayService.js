import GateWayModel from '../model/gatewayModel';

/**
 * @description gate way service
 * @class GatewayService
 */
class GatewayService {

  /**
     * @description create gateway service
     * @param {Object} payload - Http Request body object
     * @returns {Object} return a payload
     */
  static async createGateway(payload) {
    const response = await GateWayModel.create(payload);
    return response;
  }

  /**
     * @description get gateway service using Id
     * @param {Object} id - Http Request body object
     * @returns {Object} return a payload
     */
  static async getGateway(id) {
    const response = await GateWayModel.findOne(id);
    return response;
  }

  /**
     * @description create a device
     * @param {Object} searchQuery - Http Request body object
     * @param {Object} payload - Http Request body object
     * @returns {Object} return a payload
     */
  static async addDevice(searchQuery, payload) {
    const response = await GateWayModel.findOneAndUpdate(
      searchQuery,
      {
        $push: {
          devices: [payload]
        }
      },
      { new: true }
    );
    return response;
  }

  /**
     * @description get all gateways
     * @returns {Object} return a payload
     */
  static async allGateways() {
    const response = await GateWayModel.find().sort({
      updatedAt: -1
    });
    return response;
  }

  /**
     * @description remove a device
     * @param {Object} searchQuery - Http Request body object
     * @param {Object} deviceId - Http Request body object
     * @returns {Object} return a payload
     */
  static async removeDevice(searchQuery, deviceId) {
    const response = await GateWayModel.findByIdAndUpdate(
      searchQuery,
      {
        $pull: {
          devices: { _id: deviceId._id }
        }
      },
      { new: true }
    );
    return response;
  }
}

export default GatewayService;
