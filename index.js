angular.module('Search_input', []).controller('Search_inputListCtrl', function($scope) {
    $scope.Search_input = [
        { name: 'Орлова Роза Сергеевна', Job_title: 'Главный врач', Specialization: "терапия, визуальная диагностика (УЗИ), кардиология, онкология, неврология", Place_of_work: "ул. Солнечная, у д. 19 Б, ул. Московская, д. 4"},
        { name: 'Черемисинова Анастасия Сергеевна', Job_title: 'Главный врач', Specialization: "терапия, онкология", Place_of_work: "пр-т. Строителей, д. 9, к. 1"},
        { name: 'Малышева Ольга Юрьевна', Job_title: 'Ветеринарный врач-хирург', Specialization: "торакальная хирургия, абдоминальная хирургия, косметическая и реконструктивная хирургия", Place_of_work: "ул. Чернышевского, д. 7, ул. Солнечная, у д. 19 Б"},
        { name: 'Жаворонкова Наталия Алексеевна', Job_title: 'Главный врач сети клиник', Specialization: "терапия, визуальная диагностика (УЗИ)", Place_of_work: "  ул. Московская, д. 4"},
        { name: 'Жаворонков Олег Николаевич', Job_title: 'Главный хирург сети клиник', Specialization: "травматология, ортопедия", Place_of_work: "  ул. Московская, д. 4"},
        { name: 'Вавилова Ульяна Юрьевна', Job_title: 'Главный врач', Specialization: "терапия, офтальмология", Place_of_work: "  ул. Московская, д. 4, ул. Молодой Гвардии, д. 2 Д"},
        { name: 'Казанцева Елена Валерьевна', Job_title: 'Ведущий терапевт', Specialization: "терапия, визуальная диагностика (УЗИ), кардиология, анестезиология", Place_of_work: "  ул. Московская, д. 4, пр-т. Строителей, д. 9, к. 1"},
        { name: 'Безденежных Анна Николаевна', Job_title: 'Ветеринарный врач-хирург', Specialization: "абдоминальная, торакальная, косметическая и реконструктивная хирургия", Place_of_work: " ул. Молодой Гвардии, д. 2 Д"},
        { name: 'Гурьева Ольга Вадимовна', Job_title: 'Ветеринарный врач-хирург', Specialization: "терапия, абдоминальная хирургия, косметическая и реконструктивная хирургия", Place_of_work: " пр-т. Строителей, д. 9, к. 1"},
    ];

    // слежу за изменением значения input
    $scope.$watch('query', function (newValue, oldValue) {
        // если в input что-то написали
        if (newValue) {
            // фильтрую Search_input по значению input
            $scope.filteredSearch_input = $scope.Search_input.filter(function (Search_input) {
                // создаем регулярное выражение, которое ищет newValue в Search_input[$scope.orderList]
                var reg = new RegExp(newValue, 'i');
                // если нашлось, то оставляю Search_input
                return reg.test(Search_input[$scope.orderList]);
            });
            // если ничего не нашлось, то выводим сообщение
            if ($scope.filteredSearch_input.length === 0) {
                $scope.filteredSearch_input = [{ name: 'Таких запросов нет' }];
            }
        } else {
            // если input пустой, то выводим весь список
            $scope.filteredSearch_input = $scope.Search_input;
        }
    });
    // изначально выводим весь список
    $scope.filteredSearch_input = $scope.Search_input;
});
