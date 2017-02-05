var $ = require('jquery');

function getLikes(){
    var likes = {}
    if(localStorage.getItem('likes'))
    {
        likes = JSON.parse(localStorage.getItem('likes'))
    }
    return likes
}

module.exports = {

    list: function() {
    
        return getLikes();
    },

    create: function(id) {

        var likes = getLikes()

        if(likes[id])
        {
            likes[id] = 0;
        }else{
            likes[id] = 1;
        }

        localStorage.setItem('likes', JSON.stringify(likes));

    }

};