var total_layers = 9;

var showing = 9;

render(total_layers);



function render(a) {

    var base = document.getElementById('parallax-base');

    for (i = 1; i <= a; i++) {

        var layer = document.createElement('div');
        layer.setAttribute("id", 'layer' + i)
        layer.classList.add('layer');


        var img = document.createElement('img');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            img.setAttribute("src", 'layers/layer' + i + '-01.png')
        } else {
            img.setAttribute("src", 'layers/layer' + i + '-01.png')
        }

        layer.appendChild(img);
        base.appendChild(layer);

    }

}

function see_tru(a) {



    if (a == -1) {
        if (showing <= 0) {
            showing = 1;
        }
        document.getElementById('layer' + showing).classList.remove('show');
        document.getElementById('layer' + showing).classList.add('none');
        showing = showing - 1

    }



    if (a == +1) {
        showing = showing + 1
        if (showing > total_layers) {
            showing = total_layers;
        }
        document.getElementById('layer' + showing).classList.toggle('none');
        document.getElementById('layer' + showing).classList.add('show');
    }




    return showing

}


document.onkeydown = function (evt) {
    evt = evt || window.event;

    //console.log(evt);

    if (evt['key'] == "ArrowUp") {
        see_tru(+1);
        //console.log(showing);
    }
    if (evt['key'] == "ArrowDown") {
        see_tru(-1);
        //console.log(showing);
    }
};