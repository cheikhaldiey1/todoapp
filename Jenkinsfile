pipeline {

    agent any

    tools {
        nodejs 'node22'
    }

    stages {
        stage('checkout') {
            steps {
                script{
                 git branch: 'main', url: 'https://github.com/cheikhaldiey1/todoapp'
                }
            }
        }
        stage('install') {
            steps {
                 echo "Installation des dependances...."
                 sh "npm install"
            }
        }
    }
}