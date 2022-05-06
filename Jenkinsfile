pipeline {
	agent any
	options { skipDefaultCheckout(false) }
	stages {

		stage('Docker build') {
			steps {
				try {
					sh 'sudo docker-compose -f docker-compose.yml build'
				} catch(e) {
					sh 'echo Dockerfile build Fail!!!'
					slackSend (channel: '#jenkins-test', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
				}
				
			}		
	
		}
		stage('Docker-compose') {
			steps {
				script {
					try {
						sh 'sudo docker-compose -f docker-compose.yml up -d'
						slackSend (channel: '#jenkins-test', color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")	
					} catch(e) {
						sh 'echo Docker-compose Fail!!!'
						slackSend (channel: '#jenkins-test', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
					}
				}
			}
		}

	}

}
