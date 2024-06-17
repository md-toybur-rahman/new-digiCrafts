

var swiper = new Swiper('.swiper', window.innerWidth <= 768 ?{
	slidesPerView: 1.5,
	direction: getDirection(),
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	on: {
		resize: function () {
			swiper.changeDirection(getDirection());
		},
	},
} : {
	slidesPerView: 2,
	direction: getDirection(),
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	on: {
		resize: function () {
			swiper.changeDirection(getDirection());
		},
	},
});

function getDirection() {
	var windowWidth = window.innerWidth;
	var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

	return direction;
}