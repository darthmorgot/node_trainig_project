const request = require(`supertest`);
const assert = require(`assert`);
const router = require('../../../src/server/wizards/route.js');
const app = require(`express`)();

app.use('/api/wizards', router);

describe(`GET /api/wizards`, function () {

  it(`respond with json`, () => {
    return request(app)
        .get(`/api/wizards`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;
          assert.equal(page.total, 17);
          assert.equal(page.data.length, 17);
          assert.equal(Object.keys(page.data[0]).length, 5);
        });
  });

  it(`find wizard by name`, () => {
    return request(app)
        .get(`/api/wizards/${encodeURIComponent(`дамблдор`)}`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const wizard = response.body;
          assert.equal(wizard.name, `Дамблдор`);
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/wizardsaaa`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });

});
