render();

var close = document.getElementById("close");
close.addEventListener("click", close_proj);

document.onkeydown = function (evt) {
    evt = evt || window.event;

    //console.log(evt);

    if (evt['key'] == "Escape") {

        var check_zoom = document.getElementById('zoomed');

        if (check_zoom != null) {
            console.log('ckajdshkah');
            zoom_out();
        } else {
            close_proj();
        }
    }
};


function render() {

    var i

    for (var i = projs_new.length; i--;) {
        var today = new Date();
        var proj_date = new Date((projs_new[i])['date']);

        if (today > proj_date) {
            var p = document.createElement('p');
            var a = document.createElement('a');
            a.classList.add("item_links");
            //console.log((projs_new[i])['title_home']);
            a.appendChild(document.createTextNode((projs_new[i])['title_home']));
            var img = document.createElement("IMG");
            img.setAttribute("src", "img/work/" + (projs_new[i])['thumbnail']);
            p.appendChild(a);
            a.appendChild(img);
            a.setAttribute("id", (projs_new[i])['index']);
            document.getElementById("list").appendChild(p);
            a.addEventListener("click", openproj);

            var proj_date_new = new Date((projs_new[i])['date']);
            proj_date_new.setDate(proj_date_new.getDate() + 15);

            if (today < proj_date_new) {
                var sup = document.createElement('sup');
                var newtext = document.createTextNode(' NEW!')
                sup.appendChild(newtext);
                sup.classList.add('new')
                p.appendChild(sup)
            }
        }
    }
}

function openproj(evt) {

    evt = evt || window.event;
    var i = evt.srcElement.id;
    //console.log(i);
    //console.log((projs[i])[1]);

    document.getElementById("list").classList.add("hidden");
    document.getElementById("proj").classList.remove("hidden");

    //document.getElementById("work_images").src = "contents/" + (projs[i])[2];

    document.getElementById("title").innerHTML = (projs_new[i])['title_full'];
    document.getElementById("service").innerHTML = (projs_new[i])['service'];
    document.getElementById("work_text").innerHTML = (projs_new[i])['text'];

    /* experimentar carregar os conteudos diretamente daqui */

    document.getElementById("collabs").innerHTML = (projs_new[i])['collaboration'];

    var images = (projs_new[i])['images']

    for (v = 0; v < images.length; v++) {
        //console.log('oi');
        var img = document.createElement("IMG");
        var src = images[v];
        //console.log(src);
        img.setAttribute("id", v);
        img.setAttribute("src", "img/work/" + src);
        img.classList.add('galeria_img');
        img.addEventListener('click', zoom_img);
        document.getElementById("galeria").appendChild(img);
    }
}

function close_proj() {
    document.getElementById("list").classList.remove("hidden");
    document.getElementById("galeria").innerHTML = '';
    document.getElementById("proj").classList.add("hidden");
    window.scrollTo(0, 0);
}

function zoom_img(evt) {
    //console.log('zoom in');

    evt = evt || window.event;

    var i = evt.srcElement.src;
    var id = evt.srcElement.id;
    //console.log(i);

    var dark_back = document.createElement('div');
    dark_back.setAttribute('id', 'zoomed');
    dark_back.addEventListener('click', zoom_out);

    var zoomed_img = document.createElement('img');
    zoomed_img.setAttribute('src', i);
    zoomed_img.setAttribute('id', id);

    dark_back.appendChild(zoomed_img);

    var esc = document.createElement('p');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        esc.appendChild(document.createTextNode('Touch anywhere to close'));
    } else {
        esc.appendChild(document.createTextNode('x'));
    }

    esc.addEventListener('click', zoom_out);
    dark_back.appendChild(esc);

    document.body.appendChild(dark_back);

}

function zoom_out() {
    document.body.removeChild(document.getElementById('zoomed'));
}
