class StepperForm {
	constructor() {
		this.formContainer = document.getElementById('form-container');
		this.nextBtn = this.formContainer.querySelector('#btn-next');
		this.submitBtn = this.formContainer.querySelector('#btn-submit');
		this.prevBtn = this.formContainer.querySelector('#btn-prev');

		this.formScreens = Array.from(this.formContainer.querySelectorAll('.form-screen'));
		this.circles = Array.from(this.formContainer.querySelectorAll('.circle'));
		this.screenCounter = 0;

		this.nextBtn.addEventListener('click', () => {
			this.next();
		});

		this.prevBtn.addEventListener('click', () => {
			this.prev();
		});

		this.submitBtn.addEventListener('click', () => {
			this.submit();
		});

		document.onkeydown = (e) => {
			e = e || window.event;
			// Right arrow key
			if (e.keyCode == '39') {
				if (this.screenCounter >= 0 && this.screenCounter < 3) {
					this.next();
				}
			}
			// Left arrow key
			if (e.keyCode == '37') {
				if (this.screenCounter > 0 && this.screenCounter <= 3) {
					this.prev();
				}
			}
			// Submit on enter
			if (e.keyCode == '13' && !this.submitBtn.disabled) this.submit();
		};
	}

	next() {
		if (this.validate()) {
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

	validateEmail(input) {
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return input.value.match(mailFormat);
	}

	validate() {
		const shownInputs = Array.from(this.formScreens[this.screenCounter].querySelectorAll('input'));
		let validationFlag = false;
		shownInputs.forEach((input) => {
			if (!input.checkValidity()) {
				if (this.formScreens[this.screenCounter].querySelectorAll('.message').length < shownInputs.length) {
					const message = document.createElement('SPAN');
					message.classList.add('message');
					message.innerText = input.validationMessage;
					this.formScreens[this.screenCounter].insertBefore(message, input);
				}
				validationFlag = false;
			} else {
				validationFlag = true;
			}
		});
		return validationFlag;
	}

	submit() {
		if (this.validate()) {
			alert(`🎉Successful submit!🎉\nHave a nice day!☺️`);
			this.formContainer.querySelector('form').submit();
		}
	}
}

new StepperForm();
