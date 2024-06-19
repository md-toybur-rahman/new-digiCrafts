

// var swiper = new Swiper('.swiper', window.innerWidth <= 768 ?{
// 	slidesPerView: 1.5,
// 	direction: getDirection(),
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// 	on: {
// 		resize: function () {
// 			swiper.changeDirection(getDirection());
// 		},
// 	},
// } : {
// 	slidesPerView: 2,
// 	direction: getDirection(),
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// 	on: {
// 		resize: function () {
// 			swiper.changeDirection(getDirection());
// 		},
// 	},
// });

// function getDirection() {
// 	var windowWidth = window.innerWidth;
// 	var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

// 	return direction;
// }



var swiper = new Swiper('#mainCarousel', {
	slidesPerView: window.innerWidth <= 768 ? 1 : 2,
	direction: 'horizontal',
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

var modalSwiper = new Swiper('#modalCarousel', {
	slidesPerView: 1,
	direction: 'horizontal',
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
	slide.addEventListener('click', () => {
		document.getElementById('modal').style.display = 'flex';
		modalSwiper.slideTo(index, 0, false);
	});
});

document.getElementById('modalClose').addEventListener('click', () => {
	document.getElementById('modal').style.display = 'none';
});

window.addEventListener('resize', () => {
	swiper.params.slidesPerView = window.innerWidth <= 768 ? 1 : 2;
	swiper.update();
});