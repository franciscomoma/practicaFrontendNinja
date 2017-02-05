var $ = require('jquery');
var service = require('./services/likes')

$(document).ready(function(e){
    
    function applyLikes(){
        var likes = service.list();

        for( var prop in likes){
            var like = $('#'+prop+' .likes')
            
            if(likes[prop])
            {
                like.addClass('liked')
            }
            else
            {
                like.removeClass('liked')
            }
        }
    }

    applyLikes();

    $('.likes').click(function(item){
        var id = $(this).closest('article.item').attr('id')
        service.create(id)
        applyLikes();
    })
})