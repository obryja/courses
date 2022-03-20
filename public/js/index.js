var courses = document.getElementsByClassName('courses__list')[0];
dataFetch("get_all_courses")
    .then(data => {
        for(i = 0; i < data.length; i++){
            courses.innerHTML += "<a href='/course/" + data[i]._id + "'><div class='courses__list__item'><img src='" + data[i].img + "' alt='zdjęcie kursu'><h3>" + data[i].name + "</h3><span>" + data[i].price + " zł</span></div></a>";
        }
        if(i%5 != 0){
            courses.style.justifyContent = "flex-start";
            courses.style.gap = "2.5vw";
        }
    })