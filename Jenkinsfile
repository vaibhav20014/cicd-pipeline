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
                sh 'docker run -d --name nginx-container -p 8000:80 nginx-server'
            }
        }
        stage('Copy Files to Running Container') {
            steps {
                script {
                    def container_id = sh(script: 'docker ps --filter "status=running" --format "{{.ID}}"', returnStdout: true).trim()
                    if (container_id) {
                        // Use the correct path
                        sh "docker cp . ${container_id}:/usr/share/nginx/html"
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}
