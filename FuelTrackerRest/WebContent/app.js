$(document).ready(function() {
	start();
});

var start = function() {
	var myReq = $.ajax({
		type : "GET",
		url : "api/fueltracker",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		console.log(data);
		console.log(status);
		buildList(data);
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
		console.log(error);
	});
}

var create = function(){
	var createButton = $('<button>').text("Create FillUp");
	createButton.on('click', function(){
		var form = $('<form>');
	})
}

var loadQuestions = function(id, name) {
	console.log(id);
	var myReq = $.ajax({
		type : "GET",
		url : "api/fueltracker/" + id + "/fueltracker",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		console.log(status);
		$('#table').empty();
		listQuestions(data, name);
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
		console.log(error);
	});
}

var buildList = function(data) {
	var table = $('<table>');
	var thead = $('<thead>');
	var tbody = $('<tbody>');
	var tr = $('<tr>');
	var tr2 = $('<tr>');
	var th = $('<th>').text("Quiz Name");
	var th2 = $('<th>').text("View");
	tr.append(th);
	tr.append(th2);
	thead.append(tr);
	table.append(thead);
	data.forEach(function(quiz, idx, array) {
		var tr = $('<tr>')
		var td = $('<td>').text(quiz.name);
		var viewButton = $('<button>').text('View').attr('id', quiz.id);
		viewButton.on('click', function() {
			var myReq = $.ajax({
				type : "GET",
				url : "api/quizzes/" + $(this).attr('id'),
				dataType : "json"
			});
			myReq.done(function(data, status) {
				loadQuestions(data.id, data.name)
				console.log(status);
			});
			myReq.fail(function(xhr, status, error) {
				console.log('It blew up again');
				console.log(error);
			});
		});
		tr.append(td);
		tr.append(viewButton);
		tbody.append(tr);
	});
	table.append(tbody);
	$('#table').append(table);
}

var listQuestions = function(data, quizName){
	console.log("data:" + data)
	var list = $('<list>');
	var ol = $('<ol>');
	var h1 = $('<h1>').text(quizName).appendTo('#table');
	data.forEach(function(quest, idx, array){
		var li = $('<li>').text(quest.questionText).appendTo(ol);
	})
	list.append(ol);
	$('#table').append(list);
	var backButton = $('<button>');
	backButton.text('Back To Tracker')
	backButton.on('click', function(){
		$('#table').empty();
		start();
	})
	$('#table').append(backButton);
}