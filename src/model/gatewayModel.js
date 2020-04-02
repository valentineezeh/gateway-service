import mongoose from 'mongoose';

const arrayLimit = val => val.length <= 10;

const gatewaySchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    ipv4: {
      type: String,
      required: true,
      trim: true
    },
    devices: {
      type: [{
        uid: {
          type: Number,
          trim: true
        },
        vendor: {
          type: String,
          trim: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        status: {
          type: String,
          enum: ['online', 'offline'],
          default: 'offline'
        }
      }],
      validate: [arrayLimit, 'Exceeds the limit of 10 devices']
    }
  },
  {
    timestamps: true
  }
);

const GateWayModel = mongoose.model('gateway', gatewaySchema);

export default GateWayModel;
