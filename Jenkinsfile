pipeline {
    agent any

    environment {
        DOCKER_TAG = "001"
        IMAGE_NAME = "suraj7340/text-app"
        AWS_REGION = "us-east-1"
        CLUSTER_NAME = "project-cluster"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sooraj7340/Complete-CICD-project.git'
            }
        }

        stage('Build & Tag Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Docker Image Scan') {
            steps {
                script {
                    sh "trivy image --format table -o trivy-image-report.html ${IMAGE_NAME}:${DOCKER_TAG}"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push ${IMAGE_NAME}:${DOCKER_TAG}"
                }
            }
        }
        
        stage('Updating the Cluster') {
            steps {
                script {
                    sh "aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}"
                }
            }
        }
        
        stage('Deploy To Kubernetes') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'project-cluster', contextName: '', credentialsId: 'kube', namespace: 'project', restrictKubeConfigAccess: false, serverUrl: 'https://1121A9729D93F73A00B34D4100FB65ED.gr7.us-east-1.eks.amazonaws.com') {
                    sh "kubectl get pods -n project"
                    sh "kubectl apply -f deployment.yml -n project"
                }
            }
        }

        stage('Verify the Deployment') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'project-cluster', contextName: '', credentialsId: 'kube', namespace: 'project', restrictKubeConfigAccess: false, serverUrl: 'https://1121A9729D93F73A00B34D4100FB65ED.gr7.us-east-1.eks.amazonaws.com') {
                    sh "kubectl get pods -n project"
                    sh "kubectl get svc -n project"
                }
            }
        }
    }
}