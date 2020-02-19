/*! amex-gbt-portal v0.0.1 | (c) 2020 Lewis | MIT License | https://bitbucket.org/mishaosinovskiy/amex-gbt-portal/src/master/ */
/* Create Scope for Form*/

;(function() {

	  /* Toggle Between Sections */

	  function toggleActiveSection() {
	  	var sectionHeaders = document.getElementsByClassName("form-section-header");
	  	for ( var g = 0; g < sectionHeaders.length; g++) {

	  		/*Temporary code to show all sections while Building Page */
			// sectionHeaders[g].classList.add("active-section");
			// sectionHeaders[g].nextElementSibling.classList.add("active-section");
			/* End Temporary while Building Page */

			sectionHeaders[g].addEventListener("click", (function() {

				this.classList.toggle("active-section");
				var sectionContainer = this.nextElementSibling;

				if (sectionContainer.classList.contains('active-section')) {
					sectionContainer.classList.remove('active-section');
				} else {
					sectionContainer.classList.add('active-section');
				}
			}));
		} 
	}

	toggleActiveSection();


	/* Next Button Moves Form Forward to Next Section */

	function advanceNextSection() {
		var nextButtons = document.getElementsByClassName('next');
		for (var b = 0; b < nextButtons.length; b++) {
			nextButtons[b].addEventListener('click', (function(event){
				event.preventDefault();
				this.parentElement.classList.remove('active-section');
				this.parentElement.previousElementSibling.classList.remove('active-section');
				var nextSection = this.parentElement.parentElement.nextElementSibling.children;
				for ( var n = 0; n < nextSection.length; n++) {
					nextSection[n].classList.add('active-section');
				}
			}));
		}
	}

	advanceNextSection();


	/* Edit All Sections Button */

	function EditAllSectionsButton() {
		var editButton = document.getElementById("edit-details");
		editButton.addEventListener('click', (function(event) {
			event.preventDefault();
			var sectionHeaders = document.getElementsByClassName("form-section-header");
			for ( var g = 0; g < sectionHeaders.length; g++) {
				sectionHeaders[g].classList.add("active-section");
				sectionHeaders[g].nextElementSibling.classList.add("active-section");
			} 

			var formDistanceFromTop = isItemInView(topOfTabs);

			console.log(formDistanceFromTop);
			window.scrollTo(0,formDistanceFromTop);
		}));
	}

	EditAllSectionsButton();


	/* Switch Between Tabs*/

	function switchBetweenTabs() {

		/*Switch by Clicking Tabs*/

		var tabElement = document.getElementById('nav-tab');
		tabElement.addEventListener('click', onTabClick, false);

		function onTabClick(event) {
			event.preventDefault();
			var activeTabs = document.querySelectorAll('.active');

			activeTabs.forEach((function(tab) {
				tab.className = tab.className.replace(' active', '');
			}));

			event.target.parentElement.className += ' active';
			document.getElementById(event.target.href.split('#')[1]).className += ' active';
		}

		/*Switch via Next Buttons*/

		var nextTabButtons = document.getElementsByClassName('next-tab');

		for( i = 0; i < nextTabButtons.length; i++) {
			nextTabButtons[i].addEventListener('click', onNextTabButtonClick, false);
		}

		function onNextTabButtonClick(event) {
			event.preventDefault();

			var currentTabContent = event.target.parentElement;
			currentTabContent.className = currentTabContent.className.replace('active', '');

			var activeTab = document.querySelectorAll('li.active');

			activeTab.forEach((function(tab) {
				tab.className = tab.className.replace('active', '');
				tab.nextElementSibling.classList.add('active');
			}));

			var nextTabContent = event.target.parentElement.nextElementSibling;
			nextTabContent.className += ' active';

		}
	}

	switchBetweenTabs();


	// Global Form Variables

	var formFields = document.getElementById('form').elements;
	var formData = [];

	function scanPageforFormValues() {
		for(var i = 0; i < formFields.length; i++) {
			/* Select Fields */
			if (formFields[i].localName === 'select') {
				var singleSelectFieldData = {
					name: formFields[i].name,
					label: formFields[i].dataset.name,
					value: formFields[i].value,
					type: formFields[i].type,

				};
				formData.push(singleSelectFieldData);
			}
			/* Input Fields */
			if (formFields[i].localName === 'input' ) {
				var singleInputFieldData = {
					name: formFields[i].name,
					label: formFields[i].dataset.name,
					value: formFields[i].value,
					type: formFields[i].type,
				};
				formData.push(singleInputFieldData);
			}
		}
	}

	scanPageforFormValues();


	function buildConfirmationTable() {
		document.getElementById('details-target').innerHTML = '';
		for(var i = 0; i < formData.length; i++) {

			if(formData[i].type === 'hidden') {
				var rowTitle = document.createElement('div');
				rowTitle.classList.add('table-header');

				var titleValue = document.createTextNode(formData[i].value);

				rowTitle.appendChild(titleValue);
				document.getElementById('details-target').appendChild(rowTitle);

			}
			else{
				/*ROW */
				var row = document.createElement('div');
				row.classList.add('table-row');
				/*Description*/
				var desc = document.createElement('div');
				desc.classList.add('row-desc');

				/*Value*/
				var value = document.createElement('div');
				value.classList.add('row-value');

				var fieldName = document.createTextNode(formData[i].label);
				var fieldValue = document.createTextNode(formData[i].value);

				desc.appendChild(fieldName);
				value.appendChild(fieldValue);

				row.appendChild(desc);
				row.appendChild(value);

				document.getElementById('details-target').appendChild(row);
			}
		}
	}

	buildConfirmationTable();


	/* Validate Fields and Push to Confirmation */

	function validateFieldAndPushIntoArray() {
		var form = document.getElementById('form');
		form.addEventListener('change', (function (event) {
			if(!event.target.value) {
				event.target.nextElementSibling.classList.remove('valid');  
			}
			else {
				event.target.nextElementSibling.classList.add('valid');  
			}
			for(var i = 0; formData.length > i; i++) { 
				if (formData[i].name == event.target.name) {
					formData[i].value = event.target.value;
					if ( event.target.type === 'checkbox' && event.target.checked === true) {
						formData[i].value = "Yes";
					}
					buildConfirmationTable();
				}
			}
		}), true);
	}

	validateFieldAndPushIntoArray();


	/* Toggle Return Trip Show Hide */

	function showReturnTripDates() {
		var returnTripFields = document.getElementsByClassName('input-return-trip');
		for (i = 0; i < returnTripFields.length; i++) {
			returnTripFields[i].classList.add('hidden');
		}

		var typeOfReservation = document.getElementById('typeOfReso');

		typeOfReservation.addEventListener('change', (function(event) {
			if (typeOfReservation.value === "Round Trip") {
				for (i = 0; i < returnTripFields.length; i++) {
					returnTripFields[i].classList.remove('hidden');
				}	
			}
			if (typeOfReservation.value === "One Way") {
				for (i = 0; i < returnTripFields.length; i++) {
					returnTripFields[i].classList.add('hidden');
				}	
			}
		}));
	}

	showReturnTripDates();

})();