var $ = require('jquery');

String.prototype.getWordsNumber = function(){
    var regex = /[A-Za-zÑñ_ÁÉÍÓÚáéíóú]+/g
    var result = this.match(regex)

    if(result)
        return result.length;
    return 0;
}

function initValidators(){
    var maxwordsFields = $('*[data-custom-validator=maxwords]');

    function validateWordsNumber(event){
        var words = this.value.getWordsNumber();

        if(this.dataset.maxwords)
        {
            var isValid = words <= parseInt(this.dataset.maxwords);
            if(isValid)
                this.setCustomValidity('');
            else
                this.setCustomValidity('The limit for this field is '+ this.dataset.maxwords + ' word/s')
        }
        else{
            console.error('Missing maxwords parameter. Use data-maxwords parameter in #' + this.id + ' element')
        }

        console.log(this.validity.valid)
    }

    maxwordsFields.on('change', validateWordsNumber);
}

initValidators();