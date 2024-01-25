function Players(name,imageSrc,type){
    var obj={}
    obj.name=name
    obj.imageSrc=imageSrc
    obj.type=type
    return obj
}


var player1=Players("Chris Byrd" ,{ src:"img1.webp"},"fire")
var player2=Players("Monte Barrett" ,{src:"img2.jpg"},"water" )
var player3=Players("Andre Berto" , {src:"img3.jpeg"},"earth")
var player4=Players("Henry Armstrong" , {src:"img4.jpg"},"snow")
var player5=Players("Richel Hersisia" , {src:"img5.webp"},"water")
var player6=Players("Rolando Navarrete" , {src:"img6.png"},"fire")


var all=[player1,player2,player3,player4,player5,player6]

var each = function (coll,func){
    if (Array.isArray(coll)){
        for (var i =0;i<coll.length;i++){
        func(coll[i],i)
    }
    }
    else {
        for (var key in coll){
            func(coll[key],key)
        }
    }
}

$(document).ready(function() {
    each(all,function(e,i){
        $(".players").append(`<div class="nameImg">
        <div class="img">
            <img src="./image/${e.imageSrc.src}" style="width: 250px;height: 180px;" alt="">

        </div>

        <div class="name">
            <p>${e.name}</p>
        </div>

    </div>`)
    })
}
)


var audio = document.getElementById('player')
var soundOn = document.getElementById('play')
var soundOff = document.getElementById('pause')
$(audio).hide()

function toggleAudio() {
    
    if (audio.paused) {
      audio.play();
      $(soundOn).show();
      $(soundOff).hide();
    } else {
      audio.pause()} }


      


