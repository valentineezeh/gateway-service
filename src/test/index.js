import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import chai from 'chai';
import app from '../index';
import GatewayModel from '../model/gatewayModel';

const { expect } = chai;
dotenv.config();


before(() => mongoose.connect(process.env.MONGO_DB_URL_TEST, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}));

describe('Gateways', () => {
  beforeEach((done) => {
    GatewayModel.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET gateways', () => {
    it('it should get all gateways', async () => {
      try {
        const res = await request(app).get('/gateways');
        expect(res.status).equal(200);
        expect(res.body).have.property('data');
        expect(res.body.message).equal('Successfully retrieved all gateways');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST gateways', () => {
    it('it should throw an error when require fields are not inputted', async () => {
      const gatewayPayload = {
        serialNumber: '236489025',
        name: 'sarah doe',
        ipv4: ''
      };
      try {
        const res = await request(app).post('/create-gateway')
          .send(gatewayPayload);
        expect(res.status).equal(400);
        expect(res.body.error[0]).equal('ipv4 is required.');
        expect(res.body).have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('/POST gateways', () => {
    it('it should throw an error when an invalid ipv4 is inputted', async () => {
      const gatewayPayload = {
        serialNumber: '236489025',
        name: 'sarah doe',
        ipv4: '8.9.9.0.0'
      };
      try {
        const res = await request(app).post('/create-gateway')
          .send(gatewayPayload);
        expect(res.status).equal(400);
        expect(res.body.message).equal('Invalid ipv4 format');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('/POST gateways', () => {
    it('it should create a new gateway', async () => {
      const gatewayPayload = {
        serialNumber: '236489025',
        name: 'sarah doe',
        ipv4: '192.168.0.1'
      };
      try {
        const res = await request(app).post('/create-gateway')
          .send(gatewayPayload);
        expect(res.status).equal(201);
        expect(res.body.message).equal('Gateway created successfully');
        expect(res.body).have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('/POST device', () => {
    it('it should throw an error when invalid status is inputted', async () => {
      try {
        const gatewayPayload = {
          serialNumber: '236489036',
          name: 'val doe',
          ipv4: '192.0.2.1'
        };
        const devicePayload = {
          uid: 629856340,
          vendor: 'Great',
          status: 'blank'
        };

        const gateway = await GatewayModel.create(gatewayPayload);
        const res = await request(app).post(`/create-device/${gateway._id}`)
          .send(devicePayload);
        expect(res.status).equal(400);
        expect(res.body.message).equal('Status can either be "online" or "offline"');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('/POST device', () => {
    it('it should create a new device', async () => {
      try {
        const gatewayPayload = {
          serialNumber: '236489036',
          name: 'val doe',
          ipv4: '192.0.2.1'
        };
        const devicePayload = {
          uid: 629856340,
          vendor: 'Great',
          status: 'online'
        };

        const gateway = await GatewayModel.create(gatewayPayload);
        const res = await request(app).post(`/create-device/${gateway._id}`)
          .send(devicePayload);
        expect(res.status).equal(201);
        expect(res.body.message).equal('Device creation was a success');
        expect(res.body).have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });

/*
  * Test the /DELETE route
  */
  describe('/DELETE device', () => {
    it('it should throw an error when invalid status is inputted', async () => {
      try {
        const gatewayPayload = {
          serialNumber: '236489036',
          name: 'val doe',
          ipv4: '192.0.2.1'
        };
        const devicePayload = {
          uid: 629856340,
          vendor: 'Great',
          status: 'blank'
        };

        const gateway = await GatewayModel.create(gatewayPayload);
        const res = await request(app).post(`/create-device/${gateway._id}`)
          .send(devicePayload);
        expect(res.status).equal(400);
        expect(res.body.message).equal('Status can either be "online" or "offline"');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
