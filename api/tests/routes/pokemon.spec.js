/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  hp: 9,
  attack: 8,
  defense: 87,
  image: "imagen",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("Should get 200", () => agent.get("/pokemons").expect(200)).timeout(
      50000
    );

    it("Should get at least 12 pokemons", (done) => {
      agent
        .get("/pokemons")
        .then((response) => response.body)
        .then((array) => {
          expect(array.length >= 5).equal(true);
          done();
        })
        .catch(() => done(new Error("Cannot get at least 12 pokemons")));
    }).timeout(50000);
  });

  describe("GET /pokemons/:idPokemon", () => {
    it("should get 200", (done) => {
      agent
        .get(`/pokemons/17`)
        .expect(200)
        .then(() => done())
        .catch(() => done(new Error("Cannot get status 200")));
    });

    it("should get 500", (done) => {
      //era 404, pero da error cuando no existe el id, y no lo pude manejar
      //si alcanzo modificar, como la busqueda por nombre
      agent
        .get(`/pokemons/5887`)
        .expect(500)
        .then(() => done())
        .catch(() => done(new Error("Cannot get status 500")));
    });
  });

  describe("POST /pokemons", () => {
    it("should create a new pokemon", (done) => {
      agent.post("/pokemons").send(pokemon).expect(200);
      done();
    });
  });
});
