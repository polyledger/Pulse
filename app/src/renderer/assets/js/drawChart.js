import $ from 'jquery'

var Charts = {

  _cleanAttr: function (obj) {
    delete obj["chart"]
    delete obj["value"]
    delete obj["labels"]
  },

  'spark-line': function (element) {
    var attrData = $.extend({}, $(element).data())

    var data = {
      labels   : eval(attrData.labels),
      datasets : eval(attrData.value).map(function (set) {
        return $.extend({
          fillColor: 'rgba(255,255,255,.3)',
          strokeColor: '#fff',
          pointStrokeColor: '#fff'
        }, set)
      })
    }

    Charts._cleanAttr(attrData)

    var options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false,
            tickMarkLength: 0
          },
          offsetGridLines: true
        }],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false,
            tickMarkLength: 0
          },
          offsetGridLines: true
        }]
      },
      elements: {
        point: {
          radius: 0
        }
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    }

    new Chart(element.getContext('2d'), {
      type: "line",
      data: data,
      options: options
    })
  }
}

let drawChart = () => {
  $(`[data-chart]`).each(function () {
    Charts[$(this).attr('data-chart')](this)
  })
}

export default drawChart
