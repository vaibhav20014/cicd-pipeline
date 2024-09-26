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
                script {
                    def containerId = sh(script: 'docker ps --filter "status=running" --format "{{.ID}}"', returnStdout: true).trim()
                    
                    if (containerId) {
                        sh "docker cp /var/lib/jenkins/workspace/devops-project/. \"$containerId\":/usr/share/nginx/html"
                    } else {
                        sh 'docker run -d --name nginx-container -p 8000:80 nginx-server'
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
