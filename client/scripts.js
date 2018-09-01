var $chirpButton = $('#btn');
var $chirpField = $('#chirpfield');
var $chirpList = $('#chirplist');

$chirpField.on('input', function() {
    var isEmpty = $chirpField.val().length === 0;  //returns true or false
    // if (isEmpty) {
    //     $chirpButton.prop('disabled', true);
    // } else {
    //     $chirpButton.prop('disabled', false);
    // }
    $chirpButton.prop('disabled', isEmpty);
});
$chirpButton.click(postChirp);  //when clicked run this function

function postChirp() {
    var chirp = {
    message: $chirpField.val(), //gets whatever is typed in chirpField
    user: 'Patricia',
    timestamp: new Date().toISOString()   
    }; 
    $.ajax({
        method: 'POST',
        url: `/api/chirps`,
        contentType: 'application/json',
        data: JSON.stringify(chirp)
    }).then(function(success) {
        //successfully posted new data to the server
        //get them all again to add to in case others added chirps
        $chirpField.val('');
        $chirpButton.prop('disabled', true);
        getChirps();
    }, function(err) {   //if rejects will skip above and run 
        console.log(err);
    });         
}

function getChirps() { 
    $.ajax({
        method: 'GET',
        url: `/api/chirps`  //leave off the domain name to make it any
    }).then(function(chirps){
        $chirpList.empty();
        for(var i = 0; i < chirps.length; i++) {
            var $chirpdiv = $('<div class="chirp"></div>');  //cretes div
            var $message = $('<p></p>');
            var $user = $('<h4></h4>');
            var $timestamp = $('<h5></h5>');

            $message.text(chirps[i].message);
            $user.text(chirps[i].user);
            $timestamp.text(new Date(chirps[i].timestamp).toLocaleString());

            $message.appendTo($chirpdiv);
            $user.appendTo($chirpdiv);
            $timestamp.appendTo($chirpdiv);

            $chirpdiv.appendTo($chirpList);

            //$chirpdiv.text(success[i].title); //puts text of chirp in div
            //$('body').append($chirpdiv); //puts div in body
     }
    }, function(err) {
        console.log(err);
    });
}
getChirps();       

// (document).ready(function() {
//      $(':input[type="text"]').prop('disabled', true);
//      $('input[type="text"]').keyup(function() {
//         if($(this).val() != '') {
//            $(':input[type="text"]').prop('disabled', false);
//         }
//      });
//  });

 

// $("button").click(function(){
//     var newChirp = JSON.stringify(sendInfo)
//     $.ajax({
//         method: 'POST',
//         url: `http://localhost:3000/api/chirps`,
//         dataType: "json",
//         success: (function(chirp) {
//             console.log(chirp);
//             $chirpdiv.html(success[i].title);  //put title of that success array into the heading 
//             $('body').append($chirpdiv);  //$heading.appendTo('body')
//         }),
//     }, function(err) {   //if rejects will skip above and run 
//         console.log(err);
//         }); 
// });         
            
                
// var HttpClient = function() {
//     this.get = function(aUrl, aCallback) {
//         var anHttpRequest = new XMLHttpRequest();
//         anHttpRequest.onreadystatechange = function() { 
//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                 aCallback(anHttpRequest.responseText);
//         }

//         anHttpRequest.open( "GET", aUrl, true );            
//         anHttpRequest.send( null );
//     }
// }

// var client = new HttpClient();
// client.get('http://some/thing?with=arguments', function(response) {
//     // do something with response
// });

/*Change the text of a <div> element using an AJAX request:
$("button").click(function(){
    $.ajax({url: "demo_test.txt", success: function(result){
        $("#div1").html(result);
    }});
});

$*/