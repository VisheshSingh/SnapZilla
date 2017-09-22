var defferedprompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function(){
            console.log('Service Worker registered!');
        });
}

window.addEventListener('beforeinstallprompt', function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedprompt = event;
    return false;
})

var promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        //resolve('This is executed after 3 seconds!');
        reject({code:404, message: 'Error identified!'});
    }, 3000);
});

//AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://httpbin.org/ip', true);
xhr.responseType = 'json';

xhr.onload = function(){
    console.log(xhr.response);
};
xhr.onerror = function(){
    console.log('Error!');
}
xhr.send();

//FETCH API
fetch('http://httpbin.org/ip')
    .then(function(val){
        console.log(val);
        //Very imp to extract the data and convert in into json format before you can use it in the next step 
        return val.json();
    }).then(function(data){
        console.log(data);
    }).catch(function(err){
        console.log(err);
    })

    fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({message: 'This is a message'})
    })
    .then(function(val){
        console.log(val);
        //Very imp to extract the data and convert in into json format before you can use it in the next step 
        return val.json();
    }).then(function(data){
        console.log(data);
    }).catch(function(err){
        console.log(err);
    })

/* promise.then(function(data){
    console.log(data);
}, function(err){
    console.log(err.code, err.message);
}) */

//other way of rejecting error
promise.then(function(data){
    console.log(data);
}).catch(function(err){
    //console.log(err);
    console.log(err.code, err.message);
})

console.log('This will be executed from setTimeout() ');