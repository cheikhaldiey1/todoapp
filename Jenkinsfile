pipeline {

    agent any

    stages {
        stage('checkout') {
            steps {
                script{
                 git branch: 'main', url: 'https://github.com/cheikhaldiey1/todoapp'
                }
            }
        }
    }
}