var sending_kudo = false;

function sendKudoInfoToServer(element_id){
    // strip any unnecessary characters from the element_id
    // to make it match the id of the post on your server
    // send an ajax call to your server that the kudo for that 
    // post has been incremented.
    if (! sending_kudo){
        sending_kudo = true;
        $element = $("#"+element_id);

        var command = $element.hasClass('deletable') ? 'unlike' : 'like';
        $("#my-like-frame").attr('src', 'http://www.tumblr.com/' + command + '/' + $element.attr('data-reblog').slice(-8) + '?id=' + $element.attr('data-id'));
        if (command=='unlike') {
            $element.removeClass("complete deletable").addClass("kudoable");
            var count = parseInt($element.find("span.num").text().replace(/,/g, "")) - 1;
            $element.find("span.num").text(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        } else if (command=='like') {
            var count = parseInt($element.find("span.num").text().replace(/,/g, "")) + 1;
            $element.find("span.num").text(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $element.children(".counter").children("span.txt").html("Notes");
            $element.children(".counter").children("span.num").show();
            $element.removeClass("kudoable active").addClass("complete deletable");
        }

            // just to guarantee you don't accidentally send two 
            // right after each other.
        console.log("kudo sent");
        setTimeout("sending_kudo = false;", 50);
    }
}

function startKudoing(element) {
    element.addClass("active");
    element.oldKudoText = element.children(".counter").children("span.txt").html();
    element.children(".counter").children("span.num").hide();
    element.children(".counter").children("span.txt").html("Don&rsquo;t move");
    element_id = element.attr('id');
    setTimeout("sendKudo('" + element_id +"')", 1000 );
}

function endKudoing(element) {
    if (element.hasClass("kudoable")){
        element.children(".counter").children("span.txt").html("Notes");
        element.children(".counter").children("span.num").show();
        element.removeClass("active");
    }
}

// whatever it is.
function sendKudo(element_id) {
    var element = $("#"+element_id);
    if (element.hasClass('kudoable') && element.hasClass("active") ){
        element.flag = true;
        element.article = element.closest("article").attr("id");
        sendKudoInfoToServer(element_id);
    }
}


$(function() {
    /*$("aside.kudo").each(function(e) {
        // test if they've already left a kudo for each article by 
        // checking their cookies. 
        // TODO: this WILL fail when you hit the max number of cookies for a site.
        // remove their ability to give it a kudo if they've already done so.
        var id = $(this).attr("data-id");
        var base_url = $('<a>').prop('href', url).prop('hostname');
        var url = "http://api.tumblr.com/v2/blog/"+base_url+"/posts?api_key="+$(this).attr('data-reblog').slice(-8)+"&id="+id;
        if ($.cookie(id)){
            $(this).removeClass("kudoable").addClass("completed deletable");
        } // otherwise the cookie is null and they haven't given a kudo
    });*/
    $.kudo = {};
    $.kudo.flag = false; 
    $.kudo.article = false;
    
    $("aside.kudo a.kudobject").click(function(e) {
            sendKudoInfoToServer(e.parent().attr('id'));
            e.preventDefault();
            return false;
        });
    
    $("aside.kudo a.kudobject").mouseenter(function() {
            var k = $(this).parent();
            if (k.hasClass("kudoable")){
                startKudoing(k);
            }
        }).mouseleave(function() {
                var k = $(this).parent();
                endKudoing(k);
            });
    $("aside.kudo a.kudobject").live("touchstart", function(b) {
            var k = $(this).parent();
            if (k.hasClass("kudoable")){
                startKudoing(k);
            }
            b.preventDefault();
            return false;
        });
    //TODO replace b with the event
    $("aside.kudo a.kudobject").live("touchend", function(b) {
            var k = $(this).parent();
            endKudoing(k); 
            b.preventDefault();
            return false;
        });
    }
);