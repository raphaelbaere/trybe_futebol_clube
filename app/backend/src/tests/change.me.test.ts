import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { mockTeams, mockSingleTeam  } from '../mocks/Teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do model Teams', () => {
   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Teams, "findAll")
      .resolves(mockTeams as Teams[]);
   });

   it('Testa o findAllTeams', async () => {
     const { body, status } = await chai
       .request(app).get('/teams');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(mockTeams);
  });

  it('Testa o getTeamById', async () => {
    const { body, status } = await chai
    .request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.an('object');
    expect(body).to.be.deep.equal(mockSingleTeam);
  });

  afterEach(sinon.restore);
});
