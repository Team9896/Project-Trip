$().ready(function() {
  //맨 왼쪽 글씨 색 변경
  const test = document.querySelector('.section02')
  const elTra = document.querySelector('#tra > a')
  window.addEventListener('scroll', function() {
    if (window.pageYOffset - test.offsetTop + 75 > 0) {
      elTra.style.color = 'black'
      console.log(window.pageYOffset - test.offsetTop)
    } else if (window.pageYOffset - test.offsetTop + 75 < 0) {
      elTra.style.color = 'white'
    }
  })
  var menu_toggle = true;
  $('.hide-menu-icon').click(() => {
      if(menu_toggle) {
          $('.menu').fadeOut(200, ()=> {
              
          }).fadeIn(200);
          menu_toggle = !menu_toggle;
          $('.hide-menu-icon img').fadeOut(200, () => {
              $('.hide-menu-icon img').attr('src', '../svg/flight_takeoff.svg');
          }).fadeIn(200);
      } else {
          $('.menu').fadeIn(200, ()=> {

          }).fadeOut(200);
          menu_toggle = !menu_toggle;
          $('.hide-menu-icon img').fadeOut(200, () => {
              $('.hide-menu-icon img').attr('src', '../svg/flight_land.svg');
          }).fadeIn(400);
      }
  })

  var data = '';
  var html = '';

//json
fetch('../resource/data.json')
.then(function(res) {return res.json()})
.then(function(abc) {
  init(abc.data)

})

//로컬스트로지 값 받오는 변수
let countryKey = localStorage.getItem('num');

//구글 맵
// let contryGps = [
//   {
//     "contry": "brazil",
//     "url" : { lat: -14.142426 ,lng: -53.104981 },
//   },
//   {
//     "contry": "canada",
//     "url" : { lat: 56.00000 ,lng: -96.00000 },
//   },
//   {
//     "contry": "switzerland",
//     "url" : { lat: 46.584747 ,lng: 8.132716 },
//   },
//   {
//     "contry": "italy",
//     "url" : { lat: 41.173286 ,lng: 12.342500 },
//   },
//   {
//     "contry": "mongolia",
//     "url" : { lat: 46.515439 ,lng: 103.50522 },
//   },
//   {
//     "contry": "turkey",
//     "url" : { lat: 38.572643 ,lng: 35.142667 },
//   },
//   {
//     "contry": " vietnam",
//     "url" : { lat: 15.541102 ,lng: 105.482409 }
//   }
// ]
// function initMap() {
//   var map = new google.maps.Map(
//     document.querySelector('.maps'), {
//       zoom: 5,
//       center: contryGps[contryKey].url
//     }
//   );
// }
//큰 제목
window.addEventListener('load',()=>{
  setTimeout(()=>{
    window.scrollTo(0,0);
  },50)

});

function init (a) {

  // this.a = a;
      for(var i=0; i<a.length; i++) {
          html += '<li class="menu-sub">';
          html += `<a>${a[i].country_ko}</a>`;
          html += '</li>';
      }
      
      $('.hide-menu-wrapper ul.menu').html(html);
      
     
  const countryImg = document.querySelectorAll('.section01-contain')

  countryImg.forEach((btn, key)=>{
    btn.innerHTML = `<img src="${a[countryKey].place[key].url}">
    <p class="section01-text">${a[countryKey].place[key].title}</p>`
  })

  //section02
  function dataChange(key){
    const elSec02 = document.querySelector('.section02-contain');
    elSec02.innerHTML = `<div class="maps">
                        <img src="${a[countryKey].country_url}" alt="${a[countryKey].place[key].title}의 지역">
                      </div>
                      <div class="text">
                        <p class="title">${a[countryKey].place[key].title}</p>
                        <p class="detail">${a[countryKey].place[key].detail}</p>
                        <a><p class="more">more</p></a>
                      </div>`;
                      // console.log(a[countryKey].place[key].lodging[key].img_url)
    //popup창
    const elBtn = document.querySelector('.more')
    const elPopup = document.querySelector('.popup')
    var target = $(".popup")

    elBtn.addEventListener('click', () => {
      elPopup.innerHTML = `
      <figure>
        <img src="../img/close.png" alt="닫기" class="img012">
        <img src="${a[countryKey].place[key].url}" alt="${a[countryKey].place[key].title}의 지역">
        <figcaption>
          <p>${a[countryKey].place[key].detail}</p>
        </figcaption>
      </figure>`
      elPopup.classList.add('block')
      const elImg = document.querySelector('.img012')

      elImg.addEventListener('click', ()=> {
        elPopup.classList.remove('block');
      })
    })
    $(elPopup).mouseup('click', function(e)  {
      if(target.has(e.target).length==0) {
        elPopup.classList.remove('block');
      }
    })

    // section 03
    const elSec03Title = document.querySelector('.section03 > div h2');
    const elSec03Text = document.querySelector('.section03 .section03-contain .sidebar p');
    const elSec03Imgs = document.querySelector('.section03 .section03-contain .container .main-slide');
    const elSec03Btns = document.querySelectorAll('.section03 .section03-content-btn button');
    elSec03Btns.forEach((el, key) => {
      el.addEventListener('click', () => {
        switch(key) {
          case 0:
            el.classList.add('set-border');
            break;
          case 1:
            el.classList.add('set-border');
            break;
          case 2:
            el.classList.add('set-border');
            break;
        }
        setSection03Content(key);
      })
    })
// section03 내용 불러오기
    function setSection03Content(i) {
      // 이미지 3, 4, 5개일 때 slider width 지정
      var checklen = a[countryKey].place[key].food[i].img_url.length;
      switch(checklen) {
        case 3:
          elSec03Imgs.style.width = '300%';
          break;
        case 4:
          elSec03Imgs.style.width = '400%'
          break;
        case 5:
          elSec03Imgs.style.width = '500%';
          break;
      }

      // html 설정
      var html_text = '';
      elSec03Title.innerHTML = `<h2>여기는 "<span class="point-color">${a[countryKey].place[key].food[i].title}</span>" 입니다.</h2>`;
      elSec03Text.innerHTML = `${a[countryKey].place[key].food[i].detail}`;
      var len = a[countryKey].place[key].food[i].img_url.length;
      for(let n=0; n<len; n++) {
        html_text += `<div style="`
          + `background-image: url('`
          + `${a[countryKey].place[key].food[i].img_url[n]}`
          + `');"></div>`;
      }
      elSec03Imgs.innerHTML = html_text;
      // border주는 class 초기화
      for(let n=0; n<elSec03Btns.length; n++) {
        elSec03Btns[n].classList.remove('set-border');
      }
      elSec03Btns[i].classList.add('set-border');
      for(let n=0; n<elSec03Btns.length; n++) {
        elSec03Btns[n].style.backgroundImage = `url(${a[countryKey].place[key].food[n].img_url[0]})`;
        elSec03Btns[n].style.backgroundSize = 'cover';
        elSec03Btns[n].style.backgroundRepeat = 'no-repeat';
      }
    }
    setSection03Content(0);

    //section04 클릭 시 이미지 추가
    const elSec04Text = document.querySelector('.section04-text'),
          elSec04Img = document.querySelector('.section04-img'),
          elsec04Num = document.querySelectorAll('.section04-number'),
          elInfo = document.querySelector('.section04-info'),
          elsec04Line = document.querySelector('.section04-line .line');
    
    elsec04Num.forEach((sec,n)=>{
      sec.addEventListener("click",function(){
        image(n)
        // elsec04Line[0].style.width = '30%'
        // elsec04Line[1].style.width = '60%'
        // elsec04Line[2].style.width = '100%'
        if(n==0){
          elsec04Line.style.width='10%'
        }else if(n==1){
          elsec04Line.style.width='42%'
        }else{
          elsec04Line.style.width='82%'
        }
      })
    })
    //
    function image(n){ 
      var exhtml = '';
      try{
        elSec04Text.innerHTML = `<h2>여기는 &nbsp&nbsp<span>${a[countryKey].place[key].lodging[n].title}</span>&nbsp 입니다.<h2>`
        
        exhtml += `<p>${a[countryKey].place[key].lodging[n].detail}</p>
                            <div>
                              <img src="../img/location-icon.png" alt="지역">
                              <p>${a[countryKey].place[key].lodging[n].adr}</p>`
        if(a[countryKey].place[key].lodging[n].tel != '') {
          exhtml += `<img src="../img/call-icon.png" alt="전화">
                      <p>${a[countryKey].place[key].lodging[n].tel}</p>`
        }
        exhtml += `</div>`;
                              
        elInfo.innerHTML = exhtml;
      }catch{}
      elSec04Img.innerHTML = ''
      for(i=0;i<4;i++){
        elSec04Img.innerHTML += `<img src="${a[countryKey].place[key].lodging[n].img_url[i]}" alt="">`;
      }
    }
    //section04 페이지 로드 시 이미지 불러오기
    image(0);           
  }  
  dataChange(0);

  //section1 슬라이드
  var swiper = new Swiper(".mySwiper", {
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on:{
      slideChange:function(e){
        dataChange(e.realIndex);
      }
    }
  });


  
const elLi = document.querySelectorAll('.menu-sub')

elLi.forEach(function(btn, key) {
  btn.addEventListener('click', ()=> {
    event.preventDefault();
    localStorage.setItem('num', key);
    // init();
    location.reload();
  })
})


}
});
