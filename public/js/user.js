var courses = document.getElementsByClassName('courses__list')[0];

dataFetch("/get_user")
    .then(data => {
        document.getElementById('welcome').innerHTML = "Witaj <span class='username'>" + data[0].username + "</span> !";

        for(i = 0; i < data[0].courses.length; i++){
            dataFetch("/get_course", { "id": "" + data[0].courses[i] + "" })
                .then(data => {
                    courses.innerHTML += "<a href='/course/" + data._id + "'><div class='courses__list__item'><img src='" + data.img + "' alt='zdjęcie kursu'><h3>" + data.name + "</h3><span>" + data.price + " zł</span></div></a>";
                })
        }
        if(i%5 != 0){
            courses.style.justifyContent = "flex-start";
            courses.style.gap = "2.5vw";
        }
    });