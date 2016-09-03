const validate = require('validate.js');

class Validator {
  constructor() {
  	this.formName;
  	this.rules = {};
  	this.inputs = {};

    this.initListener(); //start the form submit listener
  }

	/**
	 * initListener
	 *
	 * fires up a listener for form submits
	 *
	 * @return {void}
	 */
  initListener() {
  	// console.log('validate listener');
  	const form = document.querySelector("form");

  	form.addEventListener("submit", (e) => {
  		e.preventDefault();
  		this.formName = e.target.name;
  		this.loadRules(); //load the rules for the form
  		//this.fieldListener();
  		this.handleFormSubmit(form);
  	});
  }

	/**
	 * loadRules
	 *
	 * sets the rules property from a validation constraints oject.
	 * put your rules object in a file inside ./rules named the same as the form.
	 *
	 *
	 * @return {void}
	 */
  loadRules() {
  	this.rules = require('./rules/' + this.formName + '.es6');

  	// console.log(this.rules);
  }

  // Hook up the inputs to validate on the fly
  fieldListener() {

  }

	/**
	 * handleFormSubmit
	 *
	 * @param {Element} form
	 *
	 * @return {void}
	 */
  handleFormSubmit(form) {
  	// console.log(input);
    // validate the form aainst the constraints
    const errors = validate(form, this.rules);
    // then we update the form to reflect the results
    this.showErrors(form, errors || {});
      if (!errors) {
        this.showSuccess();
      }
   }

	/**
	 * showErrors
	 * 
	 * Updates the inputs with the validation errors
	 *
	 * @param {Element} form
	 * @param {object} errors
	 *
	 * @return {void}
	 */
  showErrors(form, errors) {
  	const inputs = form.querySelectorAll("input[name], select[name]");
    // We loop through all the inputs and show the errors for that input
    inputs.forEach( (input) => {
    	// Since the errors can be null if no errors were found we need to handle that
    	this.showErrorsForInput(input, errors && errors[input.name]);
    });
  }

	/**
	 * showErrorsForInput
	 * 
	 * Shows the errors for a specific input
	 *
	 * @param {Element} input
	 * @param {array} errors
	 *
	 * @return {void}
	 */
  showErrorsForInput(input, errors) {
    // This is the root of the input
    const formGroup = this.closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    this.resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      errors.forEach( (error) => {
        this.addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  }

	/**
	 * closestParent
	 * 
	 * Recusively finds the closest parent that has the specified class
	 *
	 * @param {Element} child
	 * @param {string} className
	 *
	 * @return {Element} || null
	 */
  closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return this.closestParent(child.parentNode, className);
    }
  }

	/**
	 * resetFormGroup
	 * 
	 * Resets the error states in form
	 *
	 * @param {Element} formGroup
	 *
	 * @return {void}
	 */
  resetFormGroup(formGroup) {
  	const formGroupError = formGroup.querySelectorAll(".help-block.error")
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    formGroupError.forEach( (el) => {
      el.parentNode.removeChild(el);
    });
  }

	/**
	 * addError
	 * 
	 * Adds the specified error with the following markup
   * <p class="help-block error">[message]</p>
	 *
	 * @param {Element} messages
	 * @param {string} error
	 *
	 * @return {void}
	 */
  //
  addError(messages, error) {
    const block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  showSuccess() {
    // We made it \:D/
    console.log("Success!");
  }

}

module.exports = Validator;