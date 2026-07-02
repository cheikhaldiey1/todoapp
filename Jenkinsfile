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
                WithCredentials([
                    string(credentialsId:  'app_env', variable:'APP_ENV')
                    string(credentialsId:  'app_name', variable:'APP_NAME')
                    string(credentialsId:  'app_port', variable:'PORT')
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
                 sh "npm install"
            }
        }
        stage('test') {
            steps {
                 echo "Execution des tests...."
                 sh "npm test"
            }
        }
    }
}