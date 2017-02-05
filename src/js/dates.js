var $ = require('jquery');

var moment = require('moment');

module.exports = {

    calculateDates: function(){

        var elements = $('*[data-timestamp]');

        for(var e = 0; e < elements.length; e++){
            
            var element = $(elements[e])[0];

            var date = new Date(element.dataset.timestamp*1000);

            var dateMoment = moment(date);
            var nowMoment = moment(Date.now());

            var numDays = nowMoment.diff(dateMoment,'days');

            if(numDays == 0){
                $(elements[e]).html(moment(date).fromNow());
            }else{
                $(elements[e]).html(moment(date).calendar());
            }
        }
    }
}