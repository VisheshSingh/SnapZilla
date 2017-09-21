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
        resolve('This is executed after 3 seconds!')
    }, 3000);
});
promise.then(function(data){
    console.log(data);
})