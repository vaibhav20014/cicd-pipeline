pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/vaibhav20014/cicd-pipeline.git', branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nginx-server .'
            }
        }
        stage('Run Docker Container') {
            steps {
                sh 'docker stop nginx-container || true'
                sh 'docker rm nginx-container || true'
                sh 'docker run -d --name nginx-container -p 9090:80 nginx-server'
            }
        }
    }
    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}
