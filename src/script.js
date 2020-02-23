class StepperForm {
	constructor() {
		this.nextBtn = document.querySelector('#btn-next');
		this.submitBtn = document.querySelector('#btn-submit');
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
		// Update screen state
		this.toggleActive(); // Remove current active
		this.screenCounter++; // Next screen number
		this.toggleActive(); // Add new active
		this.moveCircle('next'); // Move the active dot

		// Update buttons state
		this.prevBtn.disabled = false;
		if (this.screenCounter >= 3) {
			this.nextBtn.disabled = true;
			this.nextBtn.style.visibility = 'hidden';
			this.submitBtn.style.visibility = 'visible';
			this.submitBtn.disabled = false;
		}
	}

	prev() {
		// Update screen state
		this.moveCircle('prev'); // Move the active dot
		this.toggleActive(); // Remove current active
		this.screenCounter--; // Prev screen number
		this.toggleActive(); // Add new active

		// Update buttons state
		this.nextBtn.disabled = false;
		if (this.screenCounter <= 0) {
			this.prevBtn.disabled = true;
		}
		if (this.screenCounter < 3) {
			this.nextBtn.disabled = false;
			this.nextBtn.style.visibility = 'visible';
			this.submitBtn.style.visibility = 'hidden';
			this.submitBtn.disabled = true;
		}
	}

	toggleActive() {
		this.circles[this.screenCounter].classList.toggle('active-circle');
		this.formScreens[this.screenCounter].classList.toggle('active-form-screen');
	}

	moveCircle(direction) {
		if (this.screenCounter > 0 && this.screenCounter < this.circles.length - 1) {
			if (direction === 'next') {
				this.circles[this.screenCounter].classList.add('circle-go-left');
				this.circles[this.screenCounter].classList.remove('circle-go-right');
			} else if (direction === 'prev') {
				this.circles[this.screenCounter].classList.add('circle-go-right');
				this.circles[this.screenCounter].classList.remove('circle-go-left');
			}
		}
	}
}

new StepperForm();
