/* шаблон отрисовки маленьких контейнеров c фильмами*/
const movieBox_templ = function(pageName ,id ,   age , posterBig , rating_imdb, time_minutes, 
                            name , engName, budget , poster, trailer , type , description)
                            {
        const temp = `<div class="${pageName}-movie-box movie-box"  data-id="${id}" data-age="${age}" data-big-poster="${posterBig}" data-small-poster="${poster}"
            data-budget = ${budget} data-trailer = "${trailer}" data-type = ${type} data-name-origin="${engName}" data-description = "${description}"
            data-raiting="${rating_imdb}" data-time="${time_minutes}" data-name="${name}"  >
            <div class="age-icon">${age}</div>
            <div class="like-movie"	>
            </div>
            <div class="img-wrapper">
                <img src="${poster}" alt="${engName}" class="movie-img">
            </div>
            <h5 class="movie-title">${name}</h5>
            <p class="movie-description">${description.slice(0 ,100) }...</p>
            </div>`;
            return temp ;
    }
/* шаблон отрисовки больших контейнеров для просмотра фильмов */
const movieWatchPage_template =   function(age, posterBig, engName, name, type, rating_imdb,time , budget, trailer, description){
    return `<div class="movie-page-wrapper">
    <div class="movie-info-wrapper">
        <div class="text-info-wrapper">
        <h4 class="movie-title"> Название :  ${name}</h4>
        <h5 class="movie-type"> Тип :  ${type}</h5>
        <h5 class="age">Возрастное ограничение :  ${age}</h5>
        <h5 class="movie-rating_imdbt"> Рейтинг :  ${rating_imdb}</h5>
        <h5 class="movie-time">Продолжительность : ${time}</h5>
        <h5 class="movie-budjet">Бюджет :  ${budget}</h5>
</div>
<div class="big-img-wrapper">
    <img src="${posterBig}" alt="${engName}" class="movie-big-img">
</div>
    </div>
    <p class="movie-description">${description }</p>
  <div class="iframe-wrapper">
    <iframe src="${trailer}" frameborder="1" class="movie-iframe">Здесь должен быть трэллер фильма ${name}, но Ваш браузер не поддерживает плавающие фреймы!</iframe>
    </div> 
    </div>`
    }
     /*  <div class="iframe-wrapper> *//* </div> */
/* шаблон строки с фильтром */
const selectRow = function(id){ 
    return `<div class="filter-row">
        <select  class = "filter" name="film-filter" id="film-filter">
        <option >Выберите порядок сортировки</option>
            <option value="age">По возрacтному ограничению</option>
            <option value="rating_imdb">По рейтингу</option>
            <option value="time_minutes">По продолжительностиа</option>
        </select>
    </div>`
}

 /* шаблон строки с кнопками прокрутки*/     
const addBtn = function(id){
    return ` <div id="${id}-btn-row" class="btn-row">
    <button id="${id}-btn-start-movieCollection" class="btn-movie"> В начало </button>
    <button id="${id}-btn-bring-back-movie" class="btn-movie">Назад</button>
    <button id="${id}-btn-add-movie" class="btn-movie">Вперед</button>
    <button id="${id}-btn-end-movieCollection" class="btn-movie">В конец</button>
    </div>
    `
} 
/* шаблон страницы с ошибкой*/
const errorPage_template = function(){
    `<p> error</p>`
}
/* шаблон страницы блока смены пользователя*/
const changeUser_template = function(){
    return   `<section  id="changeUser-section" class="changeUser-box">
    <form action="" class="login-form" id="changeUser-form">
    <div class="login-btn_row">
    <input type="submit" id="btn-changeUser" class=" form-btn btn-singIn green" value ="Сменить пользователя" >
    </div>
    </form> 
    </section>`
} 
/* шаблон прелоадера*/
const preloader_template = function(){
    return  `<div class="preloader-main-wrpper">
    <div class="preloader-inner-wrapper">
        <p class="preloader-text">Подождите, идет загрузка данных</p>
        <progress class="preloader-progres" progress-value="25" max="100">
            Загружено <span id="progress-value"></span>%
            </progress>
    </div>
    </div>`
}
/* шаблон страницы блока регистрации/авторизации пользователя*/
const loginForm_template = `<section  id="login-section" class="widht100 login-box">
                <form action="" class="login-form" id="main-login">
                <input  required type="text"  nam ="userName-label" autocomplete="username"class=" form-input" id="name-input" placeholder="Введите email">
                <label for="userName-label" id ="userName-label" class="login-label">Email должен содаржать  от 6 до 32 символов, иметь знак @  и "."</label>
                <input  required type="password" autocomplete="current-password" class=" form-input" id="password-input" placeholder="Введите пароль">
                <label for="userPassword-label" id="userPassword-label" class="login-label">Пароль должен содержать от 6 до 32 символов включительно</label>
                <div class="login-btn_row">
                <input type="submit" id="btn-singIn" class=" form-btn btn-singIn green" value ="Войти" >
                <input type="submit" id="btn-logIn"  class=" form-btn btn-logIn blue" value ="Зарегистрироваться">
                </div>
                </form> 
                </section>`;
/* класс создания простых элементов ДОМ*/
class TemplateElement {
    constructor(tag , className ){
        this.tag = tag ;
        this.className =className ;
    }
    doElement(){
            let element = document.createElement(this.tag);
            element.classList.add( this.className);
            return element;
        }
}
    

const myApp =  (function(){

/* ------------------------------------- begin controller ----------------------- */
    function ControllerSpa(){
        let container = null;
        let model = null;
        let mainFilterValue;///* значение главного фильтра */
       
        this.init = function(box , myModel){ /* инициализация контейнера и модели */
            container = box ;
            model = myModel ;
      
            window.addEventListener("hashchange", this.drawPage);  /* запуск определения хэша страницы */
            this.initUser();//начинаем авторизацию
            this.drawPage();//отрисовка страницы по хэшу
            this.addEvent();// обработчик событий
        }
       /* запускаем отображение регистрационной формы */
        this.initUser = function(){
            model.initUser();
        }
        
        /* передем имя хэша в модель для отрисовки страницы */
        this.drawPage = function(){
            const hashPageName = location.hash.slice(1).toLowerCase();
            model.drawPage(hashPageName);// передаем значение хэша в модель
        }
        /* обработчики событий на странице */
         this.addEvent =  function(){
            document.addEventListener('DOMContentLoaded', this.startAnimation);//запуск анимации
           
            
           
           
            document.addEventListener('input', function(e){ /* отслеживаем событие ввода данных на странице */
                e.preventDefault();
                e.stopPropagation();
                const emailEl = document.getElementById('name-input') ;
                const passwordEL = document.getElementById('password-input') ;
                switch(e.target.id){
                    /* для поля с e-mail запускаем валидацию e-mail 
                    *смену стиля поля ввода*/
                    case('name-input'): 
                         if( /.+@.+\..+/i .test(e.target.value)){
                            model.doBorderInputGreen(e.target);
                            }
                        else{ model.doBorderInputRed(e.target)  }
                    break;
                    /* для поля с паролем запускаем валидацию пароля
                    *смену стиля поля ввода*/
                    case('password-input'): 
                        if(e.target.value.length <6 || e.target.value.length >32){
                            model.doBorderInputRed(e.target) 
                        }
                        else{ model.doBorderInputGreen(e.target)  }   
                    break;
                }
            });
            document.addEventListener('change', function(e){/*отслеживаем изменение в фильтре(select) и запускаем фильтрацию эл-тов */
                switch(e.target.id){
                    case('film-filter'): 
                    model.filterContentOnPage(e.target.value);
                    break;
                }
            })
            /* обрабатываем события клика */
            document.addEventListener('click' , function(e){
                e.stopPropagation();
                let target = e.target
                /* если существует форма авторизации и ее инпуты, считывем значения с инпутов
                *по клику кнопки "войти" отправляем данные формы  в модель на проверку есть ли пользователь
                *по клику кнопки "зарегистрироваться" отправляем данные формы  в модель на регистрацию 
                *очищаем данные из поля "пароль" на случай ошибки
                */
                if( document.getElementById('name-input') && document.getElementById('password-input')){
                const email = document.getElementById('name-input').value ;
                const password = document.getElementById('password-input').value ;
                switch(target.id){
                    case('btn-singIn') : //кнопка "войти"  
                        model.singInUser(email , password);// передаем данные в модель на регистрацию
                        document.getElementById('password-input').value = '';  //очищаем поле ввода
                        model.doBorderInputNone(document.getElementById('name-input')); //изменяем стили элемента
                        model.doBorderInputNone(document.getElementById('password-input'));//изменяем стили элемента
                    break;
                    case('btn-logIn') : //кнопка "зарегистрироваться"
                        model.logInUser(email , password);// передаем данные в модель на регистрацию
                        model.doBorderInputNone(document.getElementById('name-input'));//изменяем стили элемента
                        model.doBorderInputNone(document.getElementById('password-input'));//изменяем стили элемента
                        document.getElementById('password-input').value  = '';//очищаем поле ввода
                    break;
                   
                    };
                }

                switch(target.id){
                    /* кнопки пролистывания главной страницы */
                    /* кнопка возвращения на 1 главную страницу  */
                    case('main-btn-start-movieCollection'):
                    model.updateMainPageCount('0');
                    break;
                    /* кнопка листает пагинацию главной страницы назад */
                    case('main-btn-bring-back-movie'):
                    model.updateMainPageCount('-1');
                    break;
                    /* кнопка листает пагинацию главной страницы вперед */
                    case('main-btn-add-movie'):
                    model.updateMainPageCount('+1');
                    break;
                     /* кнопка возвращения на последнюю главную страницу  */
                    case('main-btn-end-movieCollection'):
                    model.updateMainPageCount('11');
                    break;
                    case('btn-changeUser') : //кнопка "сменить пользователя"  
                    model.singOutUser();// даем сигнал осмене пользователя в модель
                    model.initUser();// запускаем инициализирующее окно
                break;
                case('canvas') : //canvas остновка анимации
                model.stopAnimation();
            break;
                }
               
                switch( target.className){
                    /* клик иконке "нравится", передает id и data этого фильма в модель
                    *для формирования массива понравившихся фильмов ,
                    *изменяем стиль иконки*/
                    case('like-movie') : 
                   
                        const likedMovie = target.closest('.main-movie-box') ;
                      /* собираем данные из датаатрибутов в массив, который передадим на сервер */
                        const likedMovie_description = {};
                    likedMovie_description['id'] =likedMovie.dataset.id;
                    likedMovie_description['age_restriction'] =likedMovie.dataset.age;
                    likedMovie_description['big_poster']=likedMovie.dataset.bigPoster;
                    likedMovie_description['rating_imdb'] =likedMovie.dataset.rating;
                    likedMovie_description['time_minutes'] =likedMovie.dataset.time;
                    likedMovie_description['name_russian'] =likedMovie.dataset.name;
                    likedMovie_description['name_original'] =likedMovie.dataset.nameOrigin;
                    likedMovie_description['budget']=likedMovie.dataset.budget;
                    likedMovie_description['small_poster'] =likedMovie.dataset.smallPoster;
                    likedMovie_description['trailer']=likedMovie.dataset.trailer;
                    likedMovie_description['type']= likedMovie.dataset.type;
                    likedMovie_description['description'] = likedMovie.dataset.description;
                        model.addMovieToLikedArr( likedMovie_description); /* отправляем объект фильма на в модель */    
                        model.updateLikeMovieIcon(target); /* запускаем изменение стиля отмеченной иконки */
                    break;
                    /* клик отмеченной иконке "нравится", передает id этого фильма в модель
                    *для формирования массива понравившихся фильмов 
                     *изменяем стиль иконки*/
                    case('like-movie like-it') : /* формирование коллекции понравившихся фильмов */
                         const unLikedMovie = e.target.closest('.main-movie-box') ;
                         const unLikedMovie_id = unLikedMovie.dataset.id;//получаем id непонравившегося фильма
                          model.updateLikeMovieIcon(target);/* запускаем изменение стиля отмеченной иконки */
                          model.removeMovieFromLikedArr(unLikedMovie_id  ); /* запускаем изменение стиля отмеченной иконки */
                    break;
                    case('movie-title') : /* открытие индивидуального окна */
                        const  movieBox = e.target.closest('.main-movie-box');
                        const movie_name = movieBox.dataset.name;//получаем name-rus понравившегося фильма
                        const movie_nameOrig = movieBox.dataset.nameOrigin;//получаем name-0rig понравившегося фильма
                        model.createNewHashPage(movie_name ,movie_nameOrig);//создаем новый пункт меню
                        model.drawMoviePage(movieBox );// отрисовка страницы с фильмом
                    break;
                    
                    case("close-link") : //закрыть вкладку индивидуального окна
                    e.preventDefault();
                    e.stopPropagation();
                     const  activeLink = e.target.closest('.header-menu-item');
                     model.deleteActiveLink(activeLink );//удаляем вкладку, 
                     model.drawPage('main');//иициируем главную страницу
                    break;
                   

                }
                
            })
        } 
        /* запуск анимации */
       this.startAnimation = function(){
        model.startAnimation()
       }
       
       
    }
    /* ------------------------------------- end controller ----------------------- */
    /* ------------------------------------- begin model ----------------------- */
    function ModelSpa(){
        let view = null;
        let userStatus ;// отображает статус авторизации пользователя на сайте
        let likedMovieArr =[];// массив понравившихся фильмов
        let userName  ;// имя авторизовавшегося пользователя
        let mainPageCount = 1//счетчик главной страницы
       /* база данных для запроса контента */
       const urlBase ={
            main : `https://kinobd.ru/api/films?page=`
        }
          this.init = function( myView){
            view = myView;
        }
        /* запуск инициализации пользователя */
        this.initUser= function(){
            view.initUser();
        }
        /* по клику на кнопке "войти" осуществляеться проверка наличия  пользователя в firebase и вход в проложение */
        this.singInUser = function(email, password){
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // ...
                    /* при успешной авторизации осуществляем переход на главную страницу
                    **/
                    if(user){
                    userStatus = true;//пользователь авторизовался, статус стал положительным
                    userName = email+password; // задаем имя вошедшего пользователя
                    view.hideLogInPage();
                        this.getContent(urlBase.main, 1 );//запускаем первую главную страницу
                    }
                })
                .catch((error) => {
                    view.printErrorMessage();//запуск ошибки отображения сообщения об ошибке ввода данных
         });
        }
        /* по клику на кнопке "регистрация" осуществляеться проверка регистрация пользователя в firebase и вход в проложение */
        this.logInUser = function(email , password){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // ...
                    if(user) {
                        userStatus = true;//пользователь авторизовался, статус стал положительным
                        userName =email_password; // задаем имя вошедшего пользователя
                        this.getContent(urlBase.main, 1 );//запускаем первую главную страницу
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    view.printErrorMessage();
                });
        }
        /* по клику на кнопке "сменить пользователя" осуществляеться выход из приложение 
        имя и статус сбрасывваются, запускаеться страница авторизации*/

        this.singOutUser = function(){
            firebase.auth().signOut().then(() => {
                 userStatus = false;
                 userName = null;
              }).catch((error) => {
                console.log('sing OUT error')
              });
        }
        
        /* функция отправляет данные массива "понравившихся фильмов" на сервере */
        this.sendContentToServer =  function(value){ // отправляет массив нпонравившихся фильмов на сервер//перезаписывает его
            
            value= JSON.stringify(value)
            db.collection(`${userName}`).doc("movieArr").set({
                arr : value,
            })
            .then(() => {
                console.log("Данные успешно сохранены");
            })
            .catch((error) => {
                console.error("Произошла ошибка записи данных: ", error);
            });
        
        }




        /* запрс данных с Firebase */
        this.getDataFromFirestore = async function(userName , hashPageName){
            let content = await this.requestContentFromFirestore(userName , hashPageName);
        
        }

        /* функция запрашивает данные в Firebase , ключ коллекции = имя+пароль пользователя */
        this.requestContentFromFirestore = async function(userName , hashPageName){
            var docRef = db.collection(`${userName}`).doc("movieArr");
             await docRef.get().then((doc) => {
                if (doc.exists) {
                    let data = doc.data();
                   view.drawPageWitDataFromFirebase(data , hashPageName );
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Нет такого документа");
                }
            }).catch((error) => {
                console.log("Ошибка получения данных с сервера:", error);
            });
        }

        
   
        /* запускаем отрисовки контента на странице
        *при условии истинного значения инициализации пользователя
        * */
        this.drawPage = function(hashPageName , pageCount=1){
            if(!hashPageName){ hashPageName = 'main'};
            let urlName = hashPageName;//по хэшу будем выбирать URL в объекте urlName
            if(userStatus ===true){
                switch(hashPageName ){
                  case('user'):
                    this.drawPageWitoutUrl(hashPageName);
                 break;
                 case('like'):
                    this.getDataFromFirestore(userName, hashPageName);
                 break;
                 case('main'):
                 this.getContent( urlBase[`${urlName}`],pageCount, hashPageName) ;// запрашиваем контент
                 break;
               //  default : 
                }
            }
        }
        /* функция запроса данных на сервере с помощью fetch запроса */
        this.getDataFromServer = async function(url,page){
            let DB = await fetch(`${url}${page}`).then(resp => resp.json()).then(resp => {return resp = resp.data});
            return DB;
        }
        /* функция вызывает асинхронный запрос на сервер 
        *полученный контент отправляеться во вью на отрисовку*/
        this.getContent = async function( url ,page , hashPageName ){
            let content = await this.getDataFromServer( url , page );
            view.drawPage(content , hashPageName);
        }



         /* функция инициализирует отрисовку страницы, в которой нет необходимости в сетевом запросе данных*/
        this.drawPageWitoutUrl= function(hashPageName){
            view.drawPageWitoutUrl( hashPageName)
        }
       
       
        /* добавляем понравившийся фильм в массив
        *запускаем обновление массива на сервере */
        this.addMovieToLikedArr = function(  value ){
            likedMovieArr.push( value);
            this.sendContentToServer(likedMovieArr);
        }
        /* убираем  фильм из массива понравившихся фильмов*/
        this.removeMovieFromLikedArr =  function(id ){
             for( let i =0; i < likedMovieArr.length ; i++){
                if(likedMovieArr[i][id]) {  likedMovieArr.splice(i, 1)}
               } 
           this.sendContentToServer(likedMovieArr);// отправляем обновленный массив на сервер
        }
       
        this.startAnimation = function(){ /* запуск анимации во вью */
            view.startAnimation()
        }
        /* при клике на кнопки прокрутки контента главной страницы("пагинация")
        *обновляет значение номера страницы и 
        *запускает запрос новых данных с сервера*/
        this.updateMainPageCount =  function(arg){
            console.log( arg+' arg')
            console.log(mainPageCount+" mainPageCount")
            if(mainPageCount>=1 || mainPageCount <=11){
                if(arg ==='0'){ mainPageCount = 1}
                else if (arg ==='11'){mainPageCount = 11}
                else {mainPageCount = mainPageCount + Number(arg);}
                
                this.drawPage('main' , mainPageCount );
                return mainPageCount;
            }
            else return
        };
        /* запуск стилизации иконки "нравится" */
        this.updateLikeMovieIcon =  function(element){
            view.updateLikeMovieIcon(element)
        };
        /* обрабатываем контент согласно выбранному фильтру */
        this.filterContentOnPage = function (filterValue){
            let contentCollection = document.getElementsByClassName('movie-box');
            const contentArr = Array.from(contentCollection) ;
            let  filterContentArr ;
        /* в зависимости от значения фильтра возвращаеться новая коллекция */
            switch(filterValue){
                case('age'):  
                function sortByAge(a, b) {
                    return a.dataset.age > b.dataset.age ? 1 : b.dataset.age > a.dataset.age  ? -1 : 0;
                    };
                filterContentArr = contentArr.sort(sortByAge)
                break;
                case('rating_imdb') : 
                function sortByRating(a, b) {
                    return b.dataset.raiting > a.dataset.raiting ? 1 : a.dataset.raiting > b.dataset.raiting  ? -1 : 0;
                    }
                    filterContentArr = contentArr.sort(sortByRating);
                break;
                
                case('time_minutes'):
                filterContentArr = contentArr.sort(function(a, b) {
                    return a.dataset.time - b.dataset.time ;
                });
                break;
            }
            /* отфильтрованный массив отправляеться во вью для отрисовки  */
            view.drawFiltredPage(filterContentArr);
        }
       /*  this.printEmailError = function(){
            view.printEmailError()
        }  
        this.printEPasswordError= function() {
            view.printEPasswordError() 
        }
 */
        /* создаем новый пункт меню просмотра отдельно-выбранного фильма  */
        this.createNewHashPage = function(name, newHashName){
            view.createNewHashPage(name, newHashName)
        }
        /* удаляем пункт меню просмотра отдельно-выбранного фильма */
        this.deleteActiveLink = function(activeLink ){
            view.deleteActiveLink(activeLink);
           }
    
        /* отрисовк страницы просмотра отдельно-выбранного фильма */
        this.drawMoviePage = function( element ){
            view.drawMoviePage(element )
        }
       
        /* окрашиваем границу элемента в зеленый цвет */
       this.doBorderInputGreen = function(element){
        view.doBorderInputGreen(element);
       }
       
         /* окрашиваем границу элемента в красный цвет */
       this.doBorderInputRed = function(element){
        view.doBorderInputRed(element);
       }
         /*убираем цвет границы элемента */
       this.doBorderInputNone =  function(element){
        view.doBorderInputNone(element);
       }
       /* остановка анимции */
        this.stopAnimation = function(){
            view.stopAnimation();
        }
    }
    /* ------------------------------------- end model ----------------------- */


    /* ------------------------------------------ begin view ------------------------- */
    function ViewSpa(){
        let container = null;
        let contentContainer = null;
        let animation = true;

        const MainPageData = {
            render : function( content , hashPageName){
                let mainPage_selectRow = selectRow(hashPageName);
                let mainPade_addBtn = addBtn(hashPageName);
                let text='';
                Object.entries(content).forEach( value =>{
                    text +=   movieBox_templ(
                    hashPageName,
                    value[1]['id'] ,
                    value[1]['age_restriction'] ,
                    value[1]['big_poster'],
                    value[1]['rating_imdb'] ,
                    value[1]['time_minutes'] ,
                    value[1]['name_russian'] ,
                    value[1]['name_original'] ,
                    value[1]['budget'],
                    value[1]['small_poster'], 
                    value[1]['trailer'],
                    value[1]['type'] ,
                    value[1]['description'],
                   
                    ) 
                })
                let innerMainPage = mainPage_selectRow + '<div class="movie-wrapper">'+ text +'</div>'+ mainPade_addBtn /*+ mainPreloader; */
            return innerMainPage;
            }
        }

       
    const LikePageData = {
        render : function( value , hashPageName){
            console.log(value)
            let likePage_selectRow = selectRow(hashPageName);
            let text='';
             let collection = JSON.parse(value['arr']); //распечатываем полученные с сервера данные
             collection = Array.from(collection);// превращаем данные в массив
             /* циклом применяем данные из массива в шаблоне для отсировки контейнеров-фильмов */
             for(let i=0; i <collection.length; i++){
                text += movieBox_templ(
                    hashPageName,
                    collection[i]['id'] ,
                    collection[i]['age_restriction'] ,
                    collection[i]['big_poster'],
                    collection[i]['rating_imdb'] ,
                    collection[i]['time_minutes'] ,
                    collection[i]['name_russian'] ,
                    collection[i]['name_original'] ,
                    collection[i]['budget'],
                    collection[i]['small_poster'], 
                    collection[i]['trailer'],
                    collection[i]['type'] ,
                    collection[i]['description']
                    )
             }
               let innerLikePage = likePage_selectRow + '<div class="movie-wrapper">'+ text +'</div>' /* +likePreloader; */
              return innerLikePage;
            }
        }

   
        const LoginPageData ={
           
            render : function(){
               return changeUser_template()
            } 
        }
        const ErrorPageData = {
            render : function(){
                return errorPage_template();
            }
        }
        const initUserData = {
            render : function(){
                return loginForm_template
            }
        }

        const movieWatchData = { /* отрисовка контента страницы для просмора фильма */
            render : function( element){
             //   let movieWatchPreloader = preloader_template();
                let text =''
                        text += movieWatchPage_template(
                            element.dataset.age,
                            element.dataset.bigPoster,
                            element.dataset.nameOrigin,
                            element.dataset.name,
                            element.dataset.type,
                            element.dataset.budget,
                            element.dataset.raiting,
                            element.dataset.time,
                            element.dataset.trailer,
                            element.dataset.description,
                            element.dataset.raiting
                        )
                    return text /* + movieWatchPreloader; */
                }
        }
            

        const router = {
            main : MainPageData ,
            like : LikePageData , 
            user : LoginPageData ,
            default : MainPageData ,
            error : ErrorPageData,
            movie : movieWatchData,
        }
        /* инициализация вью и контейнеров в ней */
        this.init = function(box ){
            container = box ;
            contentContainer = container.querySelector('#content-box');
        }
        /* функция заполняет контент бокс формой для авторизации из  initUserData */
        this.initUser =  function(){
            let mainWrapper = document.getElementById('spa')
            contentContainer.innerHTML = initUserData.render()
        }
        this.hideLogInPage= function(){
           const logoSection =  document.getElementById('login-section');
           logoSection.classList.add('hidden')
        };
       
        /* отрисовка страницы в хависимости от имени хэша */
        this.drawPage = function( content, hashPageName='main' ){
            let routerName ='default';/* //данные отрисовки по умолчанию для роутера */
            /* если хэш считан, у него есть значение, меняем имя роутера для отрисовки */
            if (hashPageName.length > 0) {
                routerName = hashPageName in router ? hashPageName : "error";
              }
              /* заполняем контент-бокс в зависимости от хэша */
            contentContainer.innerHTML = router[routerName].render(content , hashPageName);
        }

        this.drawPageWitoutUrl= function(hashPageName){
            let routerName ='default';/* //данные отрисовки по умолчанию для роутера */
            /* если хэш считан, у него есть значение, меняем имя роутера для отрисовки */
            if (hashPageName.length > 0) {
                routerName = hashPageName in router ? hashPageName : "error";
              }
                /* заполняем контент-бокс в зависимости от хэша */
            contentContainer.innerHTML = router[routerName].render(hashPageName)
        }
         /* функция инициализирует отрисовку страницы, c данными , хранящимися в firebase*/
        this.drawPageWitDataFromFirebase = function(content, hashPageName){
            let routerName = hashPageName;/* //данные отрисовки по умолчанию для роутера */
            /* если хэш считан, у него есть значение, меняем имя роутера для отрисовки */
            if (hashPageName.length > 0) {
                routerName = hashPageName in router ? hashPageName : "error";
              }
                /* заполняем контент-бокс в зависимости от хэша */
            contentContainer.innerHTML = router[routerName].render(content,hashPageName)
        }

        this.drawFiltredPage = function( content){
            let wrapper  = document.querySelector('.movie-wrapper');
            console.log(wrapper)
            wrapper.innerHTML ='';
            for( let i =0; i<content.length ; i++){
                    wrapper.append(content[i]);
                  }
            }
        
   /* отрисовка анимации снежинки */
        this.startAnimation = function(){
      /* создаем элемент канваса в контейнере приложения */
            const spaWrapper = document.getElementById('spa');
            const animateWrapperEL = new TemplateElement('canvas' , "canvas");
            const animateWrapper =animateWrapperEL.doElement();
            /* назначение стилей */
            animateWrapper.setAttribute('id' , 'canvas');
            let canvasSize = window.innerWidth/6;
            animateWrapper.style.width = canvasSize +'px';
            animateWrapper.style.height = canvasSize/2+'px';
            animateWrapper.style.position = 'fixed';
          
            animateWrapper.style.zIndex ='100';
            animateWrapper.style.transform = 'translateZ(1px)';
            spaWrapper.prepend(animateWrapper)
            /* создаем картинку, отображаемую в канвасе */
            let angleRotation = 0.1;
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img .style.width = canvasSize +'px';
            img .style.height = canvasSize+'px';
            img.src = './img/flake.png' ;
            img.addEventListener('load', drawFlake);
        

/* функция анимирующая холст */
        function drawFlake (){
            let imgWidth = parseInt(img.width);
            let imgHeight = parseInt(img.height);
            ctx.save();
            ctx.clearRect(0 , 0 , canvas.width , canvas.height);
            ctx.translate(canvas.width/2 , canvas.height/2 );
            ctx.rotate(angleRotation);
            ctx.drawImage(img, -imgWidth/2 , -imgWidth/2 );
            angleRotation += 0.01;
            ctx.restore();
            if(animation === true){
        requestAnimationFrame(drawFlake);
            }

   }
 
        this.stopAnimation = function(){
            animation =false;
        }
    
 
    }
    /* по нажатию на иконку нравиться добавляем класс like-it */
    this.updateLikeMovieIcon= function(element){
        element.classList.toggle('like-it')
    }
    /* отображение ошибки ввода данных пользователям */
    this.printErrorMessage =  function(){
        let logoSection = document.getElementById('main-login');
        let messageWrapper = document.createElement('div');
        messageWrapper.classList.add('mistake-message-wrapper')
        logoSection.prepend(messageWrapper);
        messageWrapper.textContent ='Ошибка авторизации. Проверьте правильность заполнения полей формы.'
    };
 /* ошибка ввода email */
    this.printEmailError = function(){
        let labelEmail = document.getElementById("userName-label");
        labelEmail.textContent = "Email введен неверно"
    } 
     /* ошибка ввода пароля */
    this.printEPasswordError= function() {
        let labelPassword = document.getElementById("userPassword-label");
        labelPassword.textContent = "Пароль введен неверно"
    }

    /* создаем новый пункт меню-вкладку для просмотра фильмов */
    this.createNewHashPage = function(name, newHashName){
        const newLinkEl = new TemplateElement('li','header-menu-item');
        const newLink = newLinkEl.doElement();
        const headerMenu = document.querySelector('.header-menu')
        console.log(newLink)
        newLink.innerHTML = `<a href="#${newHashName}" class="header-link">${name}</a><span class="close-link">&#10006;</span>`
        headerMenu.insertBefore(newLink , headerMenu.lastChild );
    }
    /* удаляем активную вкладку */
    this.deleteActiveLink = function(activeLink ){
        activeLink.remove();
       }
    /* отрисовка  страницы просмотра фильмов*/
    this.drawMoviePage = function(element){
        console.log(element)
        let routerName ='movie';/* //данные отрисовки по умолчанию для роутера */
            /* заполняем контент-бокс  */
        contentContainer.innerHTML = router[routerName].render(element )
    }
   
    /* окрашиваем границу элемента в зеленый цвет */
    this.doBorderInputGreen = function(element){
        element.style.border ="2px solid green";
       }
    /* окрашиваем границу элемента в красный цвет */
     this.doBorderInputRed= function(element){
        element.style.border ="2px solid red"
     }
      /*убираем цвет границы элемента */
      this.doBorderInputNone =  function(element){
        element.style.border ="none"
       }

       
    }
  /* ------------------------------------------ end view ------------------------- */
   return {
    init: function(container) {
        const SPA_container = document.getElementById(container);
        //SPA_container.innerHTML = header_SPA;
  
        const view = new ViewSpa();
        const model = new ModelSpa();
        const controller = new ControllerSpa();
  
        //связываем части модуля
        view.init(SPA_container);
        model.init(view);
        controller.init( SPA_container, model);
       
      }
   }
}())

myApp.init('spa');