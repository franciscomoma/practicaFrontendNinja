var Scrollpoints = require('scrollpoints');
var service = require('./services/comments');
var $ = require('jquery');
var dates = require('./dates');

function loadCommentsList(){
    var post = $('.detail-view').attr('id');
    var list = $('.comments-list');
        list.html('');

    service.list(post,
    function(comments){

        if(comments.length){
            for(var index in comments){
                $('.comments-list').append(getCommentListItem(comments[index]));
                dates.calculateDates();
            }
        }else{
            $('.comments-list').append(getVoidList());
        }

    },function(error){
        $('.comments-list').append(getError());
    })
}

function getError(){
    var html =  '<article class="comment-error">'
        html +=     'An error ocurred. Please, try again in a few minutes'
        html += '</article>'
    
    return html
}

function getVoidList(){
    var html =  '<article class="comment-void-item">'
        html +=     'This post doesn\'t have any comments yet. Send the first!'
        html += '</article>'
    
    return html
}

function getLoading(){
    var html =  '<article class="comment-loading-list">'
        html +=     'Loading...'
        html += '</article>'
    
    return html
}

function getCommentListItem(comment){
    var html =  '<article class="comment-item" id="'+comment.id+'">'
        html += '   <section class="comment-item-info">'
        html += '       <span class="comment-item-published-on" data-timestamp="'+comment.timestamp+'">20 minutes ago</span>'
        html += '       <span class="comment-item-author"><a class="comment-item-author-link" href="mailto:'+comment.email+'">'+comment.name+' '+comment.surname+'</a> said:</span>'
        html += '   </section>'
        html += '   <section class="comment-item-text">'
        html += comment.comment
        html += '   </section>'
        html += '</article>'
    
    return html
}

$(document).ready(function(){

    var elem = document.querySelector('.comments-view');

    Scrollpoints.add(elem, function(domElement) {
        loadCommentsList();
    });
    

    $('.comments-form').submit(function(e){
        e.preventDefault();

        $('.comments-list').html(getLoading());

        var post = $('.detail-view').attr('id')
        
        var comment = {}

        comment.name = this.name.value;
        comment.surname = this.surname.value;
        comment.email = this.email.value;
        comment.comment = this.comment.value;
        comment.post = post;
        comment.timestamp = new Date().getTime() / 1000; 

        service.create(JSON.stringify(comment),
        function(data){
            loadCommentsList()
            this.reset()
        },
        function(error){
            $('.comments-list').html(getError());
        })
    })
})