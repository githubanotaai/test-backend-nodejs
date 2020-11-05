//var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3333/";

describe("Teste API-korb",function(){
    it("todos produtos",function(){
      request.get(
        {
          url : urlBase + "products"
        },
        function(error, response, body){
  
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }

          expect(response.statusCode).to.equal(200);
  
          done();
        }
      );
    });
})

describe("Teste API-korb",function(){
  it("produtos especifico",function(){
    request.get(
      {
        url : urlBase + "products/2"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        done();
      }
    );
  });
})
