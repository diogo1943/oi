var defautlKW = document.querySelector('meta[name="keywords"]').content;


render();

var close = document.getElementById("close");
close.addEventListener("click", close_proj);

document.onkeydown = function (evt) {
    evt = evt || window.event;

    //console.log(evt);

    if (evt['key'] == "Escape") {

        var check_zoom = document.getElementById('zoomed');

        if (check_zoom != null) {
            //console.log('ckajdshkah');
            zoom_out();
        } else {
            close_proj();
        }
    }
};

/*
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('oi');
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'red';
}
*/



function render() {

    var i

    for (var i = projs_new.length; i--;) {
        var today = new Date();
        var proj_date = new Date((projs_new[i])['date']);
        var proj_year = proj_date.getFullYear();

        if (today > proj_date) {
            var p = document.createElement('p');
            var a = document.createElement('a');
            a.classList.add("item_links");
            a.setAttribute('alt', 'ioioioioioi');
            a.innerHTML = (projs_new[i])['title_home'] + ' (' + proj_year + ')';
            var img = document.createElement("IMG");
            img.setAttribute("src", "img/work/" + (projs_new[i])['thumbnail']);
            img.setAttribute("alt", '© Diogo lourenço (OI)');
            p.appendChild(a);
            a.appendChild(img);
            a.setAttribute("id", i);
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
    var projKW = defautlKW;

    evt = evt || window.event;
    var i = evt.srcElement.id;
    //console.log(i);
    //console.log((projs[i])[1]);

    var proj_date = new Date((projs_new[i])['date']);
    var proj_year = proj_date.getFullYear();

    document.getElementById("list").classList.add("hidden");
    document.getElementById("proj").classList.remove("hidden");

    //document.getElementById("work_images").src = "contents/" + (projs[i])[2];

    document.getElementById("title").innerHTML = (projs_new[i])['title_full'] + ' (' + proj_year + ')';
    projKW = projKW + ', ' + strip((projs_new[i])['title_full']);


    var services = (projs_new[i])['service'];
    var full_services = '';
    var serviceKW = '';

    for (l = 0; l < services.length; l++) {
        if (l < (services.length - 1)) {
            var full_services = full_services + services[l] + ' / ';
            var serviceKW = serviceKW + services[l] + ', ';
        } else {
            var full_services = full_services + services[l];
            var serviceKW = serviceKW + services[l];
        }
    }

    projKW = projKW + ', ' + serviceKW;
    document.getElementById("service").innerHTML = full_services;

    document.getElementById("work_text").innerHTML = (projs_new[i])['text'];


    var collab_p = document.getElementById('collabs_p');
    collab_p.innerHTML = '';
    var collabs = (projs_new[i])['collaboration'];

    if (collabs.length > 0) {
        collab_p.appendChild(document.createTextNode('collab w/:'));

        var collab_list = document.createElement('ul');

        collab_p.appendChild(collab_list);

        for (p = 0; p < collabs.length; p++) {
            var li = document.createElement('li');
            li.innerHTML = collabs[p];
            collab_list.appendChild(li);
        }
    }


    var images = (projs_new[i])['images'];

    for (v = 0; v < images.length; v++) {
        //console.log('oi');
        var img = document.createElement("IMG");
        var src = images[v];
        //console.log(src);
        img.setAttribute("id", v);
        img.setAttribute("alt", '© Diogo lourenço (OI)');
        img.setAttribute("src", "img/work/" + src);
        img.classList.add('galeria_img');
        img.addEventListener('click', zoom_img);
        document.getElementById("galeria").appendChild(img);
    }

    document.querySelector('meta[name="keywords"]').setAttribute("content", projKW);
}

function close_proj() {
    document.querySelector('meta[name="keywords"]').setAttribute("content", defautlKW);
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

function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}

console.log('Diogo Lourenço™ (OI)\nDesigned and Developed by Diogo Lourenço\n\n이 글을 읽으신다면 저를 한국으로 데려가주세요...');