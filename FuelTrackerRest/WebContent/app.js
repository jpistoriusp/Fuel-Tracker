$(document).ready(function() {
	start();
});
var currentMiles = 0;
var totalPrice = 0;

var start = function() {
	var myReq = $.ajax({
		type : "GET",
		url : "rest/fueltracker",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		buildList(data);
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
	var tr2 = $('<tr>');
	var th = $('<th>').text("Starting Mileage");
	var th2 = $('<th>').text("Ending Mileage");
	var th3 = $('<th>').text("Gallons");
	var th4 = $('<th>').text("Price");
	tr2.append(th, th2, th3, th4);
	thead.append(tr2);
	table.append(thead);
	data.forEach(function(entry, idx, array) {
		var tr = $('<tr>')
		var td1 = $('<td>').text(entry.startMiles);
		var td2 = $('<td>').text(entry.endMiles);
		var td3 = $('<td>').text(entry.gallons);
		var td4 = $('<td>').text(entry.price);
		var deleteButton = $('<button>').text('Delete').attr('id', entry.id);
		var editButton = $('<button>').text('Edit').attr('id', entry.id);
		deleteButton.on('click', deleteButtonFunction);
		editButton.on('click', loadFillUpEditForm());
		tr.append(td1, td2, td3, td4, editButton, deleteButton);
		tbody.append(tr);
		console.log(entry.price);
	});
	var newEntryButton = $('<button>').text('New Entry');
	newEntryButton.on('click', loadFillUpEntryForm);
	$('#table').append(newEntryButton);
	table.append(tbody);
	$('#table').append(table);
	$('#totals').append("Total Amount Spent: " + totalPrice);
}

var loadFillUpEntryForm = function() {
	$('#table').load('Form.html', function() {
		$(fillUpEntry.submit).on('click', entryForm);
	});
}

var loadFillUpEditForm = function() {
	$('#table').load('editForm.html', function() {
		$(fillUpEdit.submit).on('click', function(e) {
			e.preventDefault();
			var obj = {
				gallons : $(fillUpEntry.gallons).val(),
				price : $(fillUpEntry.price).val(),
				startMiles : currentMiles,
				endMiles : $(fillUpEntry.endMiles).val()
			}
			console.log($(e).attr('id'))
			var myReq = $.ajax({
				type : "POST",
				url : "rest/fueltracker/ " + $(e).attr('id'),
				dataType : "json",
				contentType : 'application/json',
				data : JSON.stringify(obj)
			});
			myReq.done(function(data, status) {
				$('#table').empty();
				start();
			});
			myReq.fail(function(xhr, status, error) {
				console.log('It blew up again');
			});
		});
	});
}

var deleteButtonFunction = function() {
	var myReq = $.ajax({
		type : "DELETE",
		url : "rest/fueltracker/" + $(this).attr('id'),
	});
	myReq.done(function(data, status) {
		$('#table').empty();
		$('#totals').empty();
		start();
	});
	myReq.fail(function(xhr, status, error) {
		console.log(error);
	});
};

var entryForm = function(e) {
	e.preventDefault();
	var obj = {
		gallons : $(fillUpEntry.gallons).val(),
		price : $(fillUpEntry.price).val(),
		startMiles : currentMiles,
		endMiles : $(fillUpEntry.endMiles).val()
	}
	currentMiles = $(fillUpEntry.endMiles).val();
	var myReq = $.ajax({
		type : "POST",
		url : "rest/fueltracker",
		dataType : "json",
		contentType : 'application/json',
		data : JSON.stringify(obj)
	});
	myReq.done(function(data, status) {
		totalPrice = totalPrice + parseInt(data.price);
		$('#table').empty();
		$('#totals').empty();
		start();
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
	});
};
