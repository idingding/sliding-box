'use strict'

// Stylesheets
require('../sass/app.scss')

// View Model
const Vue = require('vue')
var app = new Vue({
  el: '#app',
  data: {
    busy: false,
    tramEta: [],
    tramData: require('./tramStopsData.js'),
    userCoords: []
  },
  computed: {
    stationOptions: function () {
      var self = this
      var options = []
      for (let key in self.tramData) {
        options.push(
          [key, self.tramData[key]['Names'][0]]
        )
      }
      options.sort((a, b) => {
        if (a[1] > b[1]) return 1
        return -1
      })
      return options
    }
  },
  methods: {
    loadSelected: function (evt) {
      setAppBusy()
      app.tramEta = []
      if (evt.target.value) requestData(evt.target.value)
    },
    loadNearest: function (evt) {
      if (!('geolocation' in navigator)) return

      setAppBusy()
      navigator.geolocation.getCurrentPosition(ok, err, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000 // Cache coords
      })

      function ok (position) {
        var lat = position.coords.latitude
        var lng = position.coords.longitude

        app.userCoords = [lat, lng]
        app.tramEta = []

        calculateNearestStops(lat, lng).forEach((stopData) => {
          if (stopData[0]) requestData(stopData[0])
        })
      }

      function err (err) {
        setAppFree()
        console.warn(`Geolocation failed: ${err.code} / ${err.message}`)
      }
    }
  }
})

function setAppBusy () {
  app.busy = true
}

function setAppFree () {
  app.busy = false
}

function requestData (stopCodeName) {
  var xhr = new window.XMLHttpRequest()
  xhr.open('GET',
    `https://53tbcx200c.execute-api.ap-northeast-1.amazonaws.com/prod/get_tram_eta?stop=${stopCodeName}`
  )
  xhr.onreadystatechange = function () {
    if (xhr.readyState === window.XMLHttpRequest.DONE) {
      var resData = JSON.parse(xhr.responseText)
      if (resData.root) {
        app.tramEta.push([stopCodeName, resData.root.metadata])
      }
      setAppFree()
    }
  }
  xhr.send()
}

function calculateNearestStops (lat, lng) {
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
  }).splice(2)

  return stopDists
}
