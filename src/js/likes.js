var $ = require('jquery');

$(document).ready(function(e){
    var storage = localStorage;

    var likes = {};

    if(storage.getItem('likes'))
    {
        likes = JSON.parse(storage.getItem('likes'))
    }

    function applyLikes(){
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

        if(likes[id])
        {
            likes[id] = 0;
        }else{
            likes[id] = 1;
        }

        storage.setItem('likes', JSON.stringify(likes));
        applyLikes();
    })
})