require('normalize.css')
require('../sass/app.scss')

var Vue = require('vue')

var app = new Vue({
  el: '#app',
  data: {
    tramEta: [],
    tramData: require('./tramStopsData.js'),
    userCoords: []
  }
})

var stopCodeIpt = document.getElementById('stopCodeIpt')
var checkInputBtn = document.getElementById('checkInputBtn')
var checkNearestBtn = document.getElementById('checkNearestBtn')

checkInputBtn.addEventListener('click', function (el, ev) {
  var stopCode = stopCodeIpt.value
  var xhr = new window.XMLHttpRequest()
  xhr.open('GET',
        `https://53tbcx200c.execute-api.ap-northeast-1.amazonaws.com/prod/get_tram_eta?stop=${stopCode}`
    )
  app.tramEta = []
  xhr.onreadystatechange = function () {
    if (xhr.readyState === window.XMLHttpRequest.DONE) {
      var resData = JSON.parse(xhr.responseText)
      if ('metadata' in resData.root) { app.tramEta.push([stopCode, resData.root.metadata]) }
    }
  }
  xhr.send()
})

checkNearestBtn.addEventListener('click', function (el, ev) {
  if (!('geolocation' in navigator)) return

  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    app.userCoords = [lat, lng]
    loadNearestStops(lat, lng)
  })

  function loadNearestStops (lat, lng) {
    if (!app.tramData) return

    var stopDists = []
    for (let tramStopCode in app.tramData) {
      var coords = app.tramData[tramStopCode]['Coordinates']
      var roughDist = Math.sqrt(
                Math.pow(lat - coords[0], 2) + Math.pow(lng - coords[1], 2)
            )
      stopDists.push([tramStopCode, roughDist])
    }

    stopDists.sort((a, b) => {
      return a[1] - b[1]
    })

    stopDists.splice(2)

    stopDists.forEach((stopDist) => {
      var stopCode = stopDist[0]
      var xhr = new window.XMLHttpRequest()
      xhr.open('GET',
                `https://53tbcx200c.execute-api.ap-northeast-1.amazonaws.com/prod/get_tram_eta?stop=${stopCode}`
            )
      app.tramEta = []
      xhr.onreadystatechange = function () {
        if (xhr.readyState === window.XMLHttpRequest.DONE) {
          var resData = JSON.parse(xhr.responseText)
          if ('metadata' in resData.root) { app.tramEta.push([stopCode, resData.root.metadata]) }
        }
      }
      xhr.send()
    })
  }
})
