angular.module('notebooks', []).controller('NotebookListCtrl', function($scope) {
    $scope.notebooks = [
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

    $scope.$watch('query', function (newValue, oldValue) {
        if (newValue) {
            $scope.filteredNotebooks = $scope.notebooks.filter(function (notebook) {
                var reg = new RegExp(newValue, 'i');
                return reg.test(notebook[$scope.orderList]);
            });
            if ($scope.filteredNotebooks.length === 0) {
                $scope.filteredNotebooks = [{ name: 'Таких запросов нет' }];
            }
        } else {
            $scope.filteredNotebooks = $scope.notebooks;
        }
    });
    $scope.filteredNotebooks = $scope.notebooks;
});