// Vue-based osta.ee API connection & logic
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
	el: '#latestAuctions',
	name: 'App',
	data: {
		itemId: '138040303',
		item: {
			title: null,
			imageUrl: null,
			currentPrice: null,
			endDate: null,
			currentBids: null
		},
		dataFetchingError: false,
		loadingData:  true
	},
	methods: {
		fetchUsers: function(id) {
			this.loadingData = true;
			const baseURI = 'https://api.osta.ee/api/items/active/' + id
			this.$http.get(baseURI)
			.then((result) => {
				const data = result.data;
				this.item = {
					title: data.title,
					imageUrl: data.imageUrl,
					currentPrice: data.currentPriceEur,
					endDate: this.formatDate(data.dateEnd),
					currentBids: data.currentBids
				};
				this.loadingData = false;
			}).catch( error => {
				console.log(error);
				this.loadingData = false;
				this.dataFetchingError = true;
			});
		},
		formatDate: function(date) {
			const dateObject = new Date(date);
			const dd = ("0" + dateObject.getDate()).slice(-2);
			const mm  = ("0" + (dateObject.getMonth() + 1)).slice(-2);
			const yyyy = dateObject.getFullYear();
			const hrs = dateObject.getHours();
			const mins = dateObject.getHours();

			return dd +'.'+ mm +'.'+ yyyy  +' '+ hrs +':'+ mins;
		}
	},
	mounted: function() {
		let uri = window.location.search.substring(1);
		let params = new URLSearchParams(uri);
		if (params.get('id')) {
			this.itemId = params.get('id')
		}
		this.fetchUsers(this.itemId);
	}
});


// smooth scrolling fallback in case the browser doesn't support css scroll-behavior: smooth;
document.querySelector('.section__scroll-icon--hero').addEventListener('click', function(e) {
	e.preventDefault();
	document.querySelector('.section--auction').scrollIntoView({
		behavior: 'smooth'
	});
});


// Google maps API connection and settings
var geocoder;
var map;
var address = "maakri 23a, tallinn";
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: {lat: -34.397, lng: 150.644},
		scrollwheel: false,
		disableDoubleClickZoom: true,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#c9c9c9"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			}
		]
	});
	geocoder = new google.maps.Geocoder();
	codeAddress(geocoder, map);
}

function codeAddress(geocoder, map) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}