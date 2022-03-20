//style
document.getElementsByClassName('admin__nav__a')[0].style.borderRight = '1px solid rgba(0,0,0,0.25)';
document.getElementsByClassName('admin__nav__a')[1].style.borderRight = '1px solid rgba(0,0,0,0.25)';

// action
var btn = document.getElementsByClassName('sub')[0];

btn.onclick = function(){action()}

function action(){
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var length = document.getElementById('length').value;
    var price = document.getElementById('price').value;
    var img = document.getElementById('img').value;
    var type = document.getElementsByClassName('sub')[0].id;

    if(type == 'add'){
        dataFetch('/add_course', {"name": name, "description": description, "category": category, "length": length, "price": price, "img": img});
        location.reload();
    }
    if(type == 'delete'){
        var choosen = document.getElementById('choosen').value;
        dataFetch('/delete_course', {"id": choosen})
        location.reload();
    }
    if(type == 'update'){
        var choosen = document.getElementById('choosen').value;
        dataFetch('/update_course', {"id": choosen, "name": name, "description": description, "category": category, "length": length, "price": price, "img": img})
        location.reload();
    }
}