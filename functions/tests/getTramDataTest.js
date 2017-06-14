var expect = require('chai').expect
var sinon = require('sinon')
var getTramData = require('../src/getTramData.js')

describe('getTramData', function () {
    it('expect to check request header for "origin"', function () {
        var context = {
            res: {},
            done: function () {}
        }
        var req = {
            headers: {}
        }

        getTramData(context, req)
        expect(context.res.status).to.equal(400)
        expect(context.res.body).to.equal('"origin" is required in the header')
    })

    it('expect to call "context.done" once', function () {
        var context = {
            done: function () {}
        }
        var req = {
            headers: {}
        }
        var done = sinon.spy(context, 'done')
        
        getTramData(context, req)
        sinon.assert.calledOnce(done)
    })
})