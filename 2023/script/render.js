var total_layers = 9;

render(total_layers);

console.log('Quero-te <3');



function render(a) {

    var base = document.getElementById('parallax-base');

    for (i = 1; i <= a; i++) {

        var layer = document.createElement('div');
        layer.setAttribute("id", 'layer' + i)
        layer.classList.add('layer');


        var img = document.createElement('img');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            img.setAttribute("src", 'layers/2023_0' + i + '-01.png')
        } else {
            img.setAttribute("src", 'layers/2023_0' + i + '-01.png')
        }

        layer.appendChild(img);
        base.appendChild(layer);

    }

}
