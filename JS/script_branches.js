function init() {
    const locations = [
        { id: 'map1', coordinates: [58.592346, 49.610836], address: 'ул. Солнечная 19Б' },
        { id: 'map2', coordinates: [58.603179, 49.683813], address: 'ул. Московская 4' },
        { id: 'map3', coordinates: [58.506387, 49.704162], address: 'ул. Молодой Гвардии, 2Д, Нововятский район' },
        { id: 'map4', coordinates: [58.598729, 49.588486], address: 'пр-т Строителей, 9, корпус 1' },
        { id: 'map5', coordinates: [58.628573, 49.627931], address: 'ул. Чернышевского, 7' },
        { id: 'map6', coordinates: [58.569998, 49.651787], address: 'ул. Украинская, 18' },
    ];

    locations.forEach(location => {
        var myMap = new ymaps.Map(location.id, {
            center: location.coordinates,
            zoom: 17
        });

        var myPlacemark = new ymaps.Placemark(location.coordinates, {
            hintContent: location.address,
            balloonContent: location.address
        });

        myMap.geoObjects.add(myPlacemark);
    });
}

ymaps.ready(init);