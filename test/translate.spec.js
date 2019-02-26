var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');

// Fixtures the translate function inside an object
var paramJson = {};
var supportedLang = "german";
var resultJson; 
var wrongJson = null;
var wrongLang = null;
var errorMessage = "";
// Code in the service layer:

// Code in the middleware layer:

// First version of the  valueObject:
/*
var valueObject =  {
    
    translate: function(paramJson){
        if(!paramJson){
           throw "the parameter is not defined";
        }
        return null;
    }
};
*/
// Service
var resultObject =  {
    translatedWord:"",
    resolve: function(lang,word){
        return this.translatedWord;
    }
};
// Middleware:
var valueObject =  {
    language: "default",
    translate: function(lang, paramJson){
        var result = {'lang':'german'};
        if(!paramJson||!lang){
            throw "the parameter is not defined";
        }
        if (lang!=supportedLang){
            return "not supported";
        }else{
            Object.keys(paramJson).forEach(function(key) {
                result.push(resultObject.resolve(lang, paramJson[key])); 
             });
        }
        return result;
    }
};

var sandbox;
beforeEach(function () {
    sandbox = sinon.createSandbox();
});

afterEach(function () {
    sandbox.restore();
});


// Testing in the middleware

describe('Middleware Testing', function () {
        it('should read the json parameter ', function () {
            expect(paramJson).to.be.a('object');
        });
        it('should read the valueObject ', function () {
            expect(valueObject).to.be.a('object');
        });
        it('should read the translate function ', function () {
            expect(valueObject.translate).to.be.a('function');
        });
        it('should the translate function throw an exception if the parameter Json is not defined ', function () {
            var translateStub = sandbox.stub(valueObject, 'translate'); 
            // using the stub (a replacement of the function)
            translateStub.withArgs(wrongJson).throws("");
            // 1: this expectation fails
            // expect(translateStub.withArgs(wrongJson)).not.to.throw();
            // 2: this expectation passes proving that the exception is thrown
            expect(translateStub.withArgs(wrongJson)).to.throw();
            // translateStub.reset();
        });
        // Refactoring: introducing the lang-param in the method and 
        // and lang in the exception
        it('should the translate function throw an exception if the parameter lang or the parameter Json is not defined ', function () {
            var translateStub = sandbox.stub(valueObject, 'translate'); 
            translateStub.withArgs(wrongLang,wrongJson).throws("");
            // 1: this expectation fails
            // expect(translateStub.withArgs(wrongLang,wrongJson)).not.to.throw();
            // 2: this expectation passes proving that the exception is thrown
            expect(translateStub.withArgs(wrongLang,wrongJson)).to.throw();
            // translateStub.reset();
        });
        // Refactoring: We are supporting only german translation in this first 
        // introducing the language property inside the value object
        it('should the language property be defined ', function () {
            var translateStub = sandbox.stub(valueObject, 'translate'); 
            // 1: this expectation fails
            // expect(valueObject.language).to.be.a('function');
       
            // 2: this expectation is a success
            expect(valueObject.language).to.be.a('string');
            // translateStub.reset();
        });

        it('should the translate return the expected object ', function () {
            // Other style in quick:
            
            var actualValue = valueObject.translate(supportedLang,paramJson);
            console.log("returned value = " + actualValue.lang);
            // (1) expecting failure 
            var expectedValue = 'french';
            expect(actualValue.lang).to.equal(expectedValue);
            // (2) fix this problem
        }); 
       
             
});

// TODO Service test
// var resolveMock = sinon.mock(resultObject);
// resolveMock.expects("xxxx").withArgs(yyyy).once().resolves(expectedValue);

describe('Service Testing', function () {
    it('    ', function () {
        // expect(paramJson).to.be.a('object');
    });
});
