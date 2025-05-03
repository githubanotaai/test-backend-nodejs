let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

// Nossa suite de teste relacionada a artigos
describe('Artigos', () => { 

    describe('/GET Artigos', () => {
        it('Testando GET todos os Artigos', (done) => {
            chai.request('http://localhost:4000') 
                .get('/artigo') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                  done();
                });
        });
    });

    describe('/POST Artigo', () => {
        it('Verificar o cadastro de Artigo', (done) => {
            let artigo = { 
                title: "Meu Artigo", 
                text: "Esse e o meu Artigo"
            }
              chai.request('http://localhost:4000')
              .post('/artigo')
              .send(artigo) 
              .end((err, res) => {
                  res.should.have.status(201);
                done();
              });
        });

    });
  
});