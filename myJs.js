let i = 0;
function punch()
{
    create_grid();

    let main_button = document.getElementById('main_button');
    main_button.textContent = 'ЕБАААААААААШ!';
}

function create_grid()
{
    //setTimeout(() => document.body.style.background = '', 10000); // вернуть назад*/

    let rectange = document.createElement('div');
    rectange.id = 'punch'

    rectange.style.position = 'absolute';
    rectange.style.alignItems = 'normal';
    rectange.style.height = '100px';
    rectange.style.width = '100px';
    rectange.style.background = 'red';
    rectange.style.borderRadius = '50px';

    rectange.style.textAlign = 'center';

    rectange.onclick = function () { change_margin(rectange) };

/*    rectange.style.marginTop = '-40%';// -40 40
    rectange.style.marginLeft = '0%';// 1 94*/

    let text = document.createElement('h2');
    text.style.marginTop = '25%';
    text.textContent = 'Пузо)';



    rectange.append(text);

    document.body.append(rectange);
}
function change_margin(myRectangle)
{
    myRectangle.style.marginTop = getRandomInt(-40, 40)+'%';// -40 40
    myRectangle.style.marginLeft = getRandomInt(1, 94)+'%';// 1 94

    let score = document.getElementById('score');
    let bbb = 'Ударов отработано: ';
    score.textContent = bbb+i;
    i++;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}