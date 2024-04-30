const app = angular.module('book-app', [])

app.controller('BookController', ($scope, $http)=>{
    $scope.title = "Biblioteca Digital"

    $scope.bookName = ''
    $scope.autorName = ''
    $scope.yearBook = ''
    $scope.bookList = []

    $scope.addBook = () => {
        if(!$scope.bookName){
            return alert('Digite um titulo para o próximo livro!')
        }

        $http.post('http://localhost:8080/api/books', 
        {name: $scope.bookName, autor: $scope.autorName, year: $scope.yearBook}
        ).then(()=>{
            $scope.loadBookList()
        }, () => {
            alert("Ops, aconteceu algum erro!")
        })
    }

    $scope.deleteBook = (id) =>{
        $http.delete('http://localhost:8080/api/books/' + id).then(()=>{
            $scope.loadBookList()
        }, (error) => {
            console.error("Erro ao excluir o livro:", error);
            alert("Ops, aconteceu algum erro ao excluir o livro!")
        })
    }    

    $scope.loadBookList = async () => {
        const { data } = await $http.get('http://localhost:8080/api/books')
        $scope.bookList = data;
        $scope.$apply()
    }

    $scope.loadBookList()

})