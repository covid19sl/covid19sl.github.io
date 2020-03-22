$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'https://covid-19sl.s3-ap-northeast-1.amazonaws.com/data.json',
		dataType: 'json',
		success: function (data) {
			$('#cases-loader').hide();
			$('#cases-count').show();
			$('#cases-count').html(data.prefectures[0]['cases']);

			$('#recover-loader').hide();
			$('#recover-count').show();
			$('#recover-count').html(data.prefectures[0]['recovered']);

			$('#deaths-loader').hide();
			$('#deaths-count').show();
			$('#deaths-count').html(data.prefectures[0]['deaths']);

			$('#last-updated').html('Last Updated @ '+data.updated[0]['lastupdated']);
		}
	});

	drawLineChart();

	$.ajax({
		type: 'GET',
		url: 'https://covid-19sl.s3-ap-northeast-1.amazonaws.com/data.json',
		dataType: 'json',
		success: function (data) {
			var districtdata = data.prefectures;
			var datahtml = '';
			districtdata.shift();

			function compare( a, b ) {
				return ( b.cases - a.cases );
			}

			districtdata.sort(compare);

			districtdata.forEach(function(item){
				if( item.cases != 0 ){
					datahtml +='<tr>';
						datahtml +='<td>'+item.prefecture+'</td>';
						datahtml +='<td>'+item.cases+'</td>';
						datahtml +='<td>'+item.recovered+'</td>';
						datahtml +='<td>'+item.deaths+'</td>';
					datahtml +='</tr>';
				}
			});

			$('tbody').html(datahtml);
		}
	});
});

function drawLineChart() {

	$.ajax({
		type: 'GET',
		url: 'https://covid-19sl.s3-ap-northeast-1.amazonaws.com/data.json',
		dataType: 'json',
		success: function (data) {
			var srilankanData = data.daily;

			var labels = [], confirmed=[], recovered=[], deaths=[], critical=[];

			srilankanData.forEach(function(item){
				labels.push(item.date);
				confirmed.push(item.confirmed);
				recovered.push(item.recovered);
				deaths.push(item.deceased);
				critical.push(item.critical);
			});

			// Get the context of the canvas element we want to select
			var ctx = document.getElementById("coronachartsl").getContext("2d");

			// Instantiate a new chart
			var coronachartsl = new Chart(ctx, {
				responsive: true,
				type: 'line',
				data: {
					labels: labels,
					// Information about the dataset
			    	datasets:
			    		[
			    			{
			    				label: 'Confirmed',
								backgroundColor: 'rgba(0, 0, 0, 0)',
								borderColor: 'rgba(220, 53, 69, 1)',
								data: confirmed,
							},
							{
								label: 'Recovered',
								backgroundColor: 'rgba(0, 0, 0, 0)',
								borderColor: 'rgba(40, 167, 69, 1)',
								data: recovered,
							},
							{
								label: 'Deaths',
								backgroundColor: 'rgba(0, 0, 0, 0)',
								borderColor: 'rgba(108, 117, 125, 1)',
								data: deaths,
							},
							{
								label: 'Critical',
								backgroundColor: 'rgba(0, 0, 0, 0)',
								borderColor: 'rgba(253, 79, 0, 1)',
								data: critical,
							}
						]
				},
			});
		}
	});
}