/**
 * 
 */

window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
	this.resource('calculator' , {path: '/'});
});


//Controllers


App.CalculatorController = Ember.ArrayController.extend({
	infixNotation: '',
});

App.ButtonsController = Ember.ObjectController.extend({
	actions:{
		buttonEvent: function () {
			if(this.get('model.buttonValue') == '=')
				this.send('evaluate');
			else if(this.get('model.buttonValue') == 'C')
				this.send('clear');
			else 
				this.send('append');
		},
		append: function () {
			var controller = App.__container__.lookup('controller:calculator');
			var space = '';
			if(isNaN(parseInt(this.get('model.buttonValue'))))
				space = " ";
			var value = controller.get('infixNotation') + space + this.get('model.buttonValue') + space;
			controller.set('infixNotation', value);
		},
		clear: function () {
			App.__container__.lookup('controller:calculator').set('infixNotation', '');
		},
		evaluate: function () {
			var controller = App.__container__.lookup('controller:calculator');
			var value = controller.get('infixNotation');
			var tokens = value.trim().split(" ");
			if(tokens.length % 2 == 0 || tokens[0] == '')
				value = 'Wrong Input';
			else {
				var exp = parseInt(tokens[0]);
				for (var i = 1; i < tokens.length; i+=2) {
					if(tokens[i]== '+')
						exp = exp  + parseInt(tokens[i+1]);
					else if(tokens[i]== '-')
						exp = exp  - parseInt(tokens[i+1]);
					else if(tokens[i]== '*')
						exp = exp  * parseInt(tokens[i+1]);
					else if(tokens[i]== '/')
						exp = exp  / parseInt(tokens[i+1]); 
					value = exp;
				}
			}
			controller.set('infixNotation', value);
		}
	}
});





//Models
App.CalculatorRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('buttons');
	}
});

App.Buttons  = DS.Model.extend({
	button: DS.attr('string'),
	buttonValue: DS.attr('string')
});

App.Buttons.FIXTURES = [
                     	{
                     		id: 2,
                     		button: '1',
                     		buttonValue: '1'
                     	},
                     	{
                     		id: 3,
                     		button: '2',
                     		buttonValue: '2'
                     	},
                     	{
                     		id: 4,
                     		button: '3',
                     		buttonValue: '3'
                     	},
                     	{
                     		id: 11,
                     		button: 'Add',
                     		buttonValue: '+'
                     	},
                     	{
                     		id: 5,
                     		button: '4',
                     		buttonValue: '4'
                     	},
                     	{
                     		id: 6,
                     		button: '5',
                     		buttonValue: '5'
                     	},
                     	{
                     		id: 7,
                     		button: '6',
                     		buttonValue: '6'
                     	},
                     	{
                     		id: 12,
                     		button: 'Sub',
                     		buttonValue: '-'
                     	},
                     	{
                     		id: 8,
                     		button: '7',
                     		buttonValue: '7'
                     	},
                     	{
                     		id: 9,
                     		button: '8',
                     		buttonValue: '8'
                     	},
                     	{
                     		id: 10,
                     		button: '9',
                     		buttonValue: '9'
                     	},
                     	{
                     		id: 15,
                     		button: 'Eval',
                     		buttonValue: '='
                     	},
                     	{
                     		id: 13,
                     		button: 'Mul',
                     		buttonValue: '*'
                     	},
                     	{
                     		id: 1,
                     		button: '0',
                     		buttonValue: '0'
                     	},
                     	{
                     		id: 14,
                     		button: 'Div',
                     		buttonValue: '/'
                     	},
                     	{
                     		id: 16,
                     		button: 'Clear',
                     		buttonValue: 'C'
                     	}
                     ];