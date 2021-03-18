const request = require(`supertest`);
const {app} = require('../src/server.js');

describe(`POST /api/wizards`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/wizards`).
        send({
          name: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        }).
        expect(200, {
          name: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/wizards`).
        field(`name`, `Гендальф Серый`).
        field(`coatColor`, `rgb(56, 159, 117)`).
        field(`eyeColor`, `red`).
        field(`fireballColor`, `#5ce6c0`).
        expect(200, {
          name: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        });
  });

});
