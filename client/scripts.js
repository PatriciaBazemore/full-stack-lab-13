var $chirpButton = $('#btn');
var $chirpField = $('#chirpfield');
var $chirpList = $('#chirplist');
var $userField = $('#userfield');

$chirpField.on('input', function() {
    var isEmpty = $chirpField.val().length === 0; // || $userField.val().length === 0;
    // var chirpisEmpty = $chirpField.val().length === 0;  //returns true or false
    // var userisEmpty = $userField.val().length === 0;
    // if ($chirpField.val().length === 0) {
    //     $chirpButton.prop('disabled', true);
    // } else if ($userField.val().length === 0) {
    //     $chirpButton.prop('disabled', true);
    // } else {
    //     $chirpButton.prop('disabled', false);
    // }
    $chirpButton.prop('disabled', isEmpty);
    // $chirpButton.prop('disabled', chirpisEmpty);
    // $chirpButton.prop('disabled', userisEmpty);
});


// $userField.on('input', function() {
//     var isEmpty = $userField.val().length === 0;
//     $chirpButton.prop('disabled', isEmpty);
// });

$chirpButton.click(postChirp);  //when clicked run this function

function postChirp() {
    var chirp = {
    message: $chirpField.val(), //gets whatever is typed in chirpField
    // user: 'Patricia',
    user: $userField.val(),
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
        $userField.val('');
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
        $userField.empty();
        // for(var i = 0; i < chirps.length ; i++) { put the newest at the bottom
        for(var i = chirps.length-1; 0 < i ; i--) {    //reversed it to make the most recent be at the top 
            var $chirpdiv = $('<div class="chirp"></div>');  //creates div
            var $message = $('<h1></h1>');
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
};
getChirps();  



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