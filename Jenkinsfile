@Library('shared-lib')
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
        stage('Generate env') {
            steps{
                withCredentials([
                    string(credentialsId:  'APP_ENV', variable:'APP_ENV'),
                    string(credentialsId:  'APP_NAME', variable:'APP_NAME'),
                    string(credentialsId:  'APP_PORT', variable:'PORT')
                ]) {
                    sh '''
                        cat > .env <<EOF

                        APP_NAME=${APP_NAME}
                        APP_ENV=${APP_ENV}
                        PORT=${PORT}

                        EOF
                    '''
                }
            }
        }
        stage('install') {
            steps {
                 echo "Installation des dependances...."
                 echo "ceci a ete trigger via github webhook"
                 sh "npm install"
            }
        }
        stage('test') {
            steps {
                 echo "Execution des tests...."
                 sh "npm test"
            }
        }
        stage('hello') {
            seyHello('Saluuuuuuut')
        }
    }
    post {
        always {
            echo "Nettoyage du workspace terminé"
        }
        success {
            echo "L'app est pret pour la prod"
        }
        failure {
            echo "Nope !! pas pret pour la prod"
        }
    }
}