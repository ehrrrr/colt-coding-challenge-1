class StepperForm {
	constructor() {
		this.nextBtn = document.querySelector('#btn-next');
		this.prevBtn = document.querySelector('#btn-prev');

		this.formScreens = Array.from(document.querySelectorAll('.form-screen'));
		this.circles = Array.from(document.querySelectorAll('.circle'));
		this.screenCounter = 0;

		this.nextBtn.addEventListener('click', () => {
			this.next();
		});

		this.prevBtn.addEventListener('click', () => {
			this.prev();
		});
	}

	next() {
		this.toggleActive();
		this.screenCounter++;
		this.toggleActive();
		this.prevBtn.disabled = false;
		if (this.screenCounter >= 3) {
			this.nextBtn.disabled = true;
		}
	}

	prev() {
		this.toggleActive();
		this.screenCounter--;
		this.toggleActive();
		this.nextBtn.disabled = false;
		if (this.screenCounter <= 0) {
			this.prevBtn.disabled = true;
		}
	}

	toggleActive() {
		this.circles[this.screenCounter].classList.toggle('active-circle');
		this.formScreens[this.screenCounter].classList.toggle('active-form-screen');
	}
}

new StepperForm();
