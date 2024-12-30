pipeline {
    agent any
    tools {
        nodejs 'nodejs-20.11.0' // Name of the Node.js installation in Jenkins
    }

    environment {
        NODEJS_HOME = 'C:/Program Files/nodejs' // Set the Node.js path
        SONAR_SCANNER_PATH = 'C:/Users/ADMIN/Downloads/sonar-scanner-cli-6.2.1.4610-windows-x64/sonar-scanner-6.2.1.4610-windows-x64/bin'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend - Install Dependencies') {
            steps {
                dir('backend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm install
                    '''
                }
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm install
                    '''
                }
            }
        }

        stage('Backend - Lint') {
            steps {
                dir('backend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm run lint
                    '''
                }
            }
        }

        stage('Frontend - Lint') {
            steps {
                dir('frontend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm run lint
                    '''
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm run build
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('Sonarqube-token') // Accessing the SonarQube token stored in Jenkins credentials
            }
            steps {
                bat '''
                set PATH=%SONAR_SCANNER_PATH%;%PATH%
                where sonar-scanner || echo "SonarQube scanner not found. Please install it."
                sonar-scanner -Dsonar.projectKey=mern-app ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.token=%SONAR_TOKEN% 2>&1
                '''
            }
        }

        stage('Backend - Deploy') {
            steps {
                dir('backend') {
                    bat '''
                    set PATH=%NODEJS_HOME%;%PATH%
                    npm start
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
        always {
            echo 'This runs regardless of the result.'
        }
    }
}
