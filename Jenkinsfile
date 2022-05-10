pipeline {
	agent any
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			steps {
				checkout scm	
			}
	
		}
			
		stage('Docker build') {
			steps {
				script {


				
					try {
						sh 'docker-compose -f /home/ubuntu/complete/S06P31D204
docker-compose.yml build'
					} catch(e) {
						sh 'echo Dockerfile build Fail!!!'
					}

				}
				
			}		
	
		}
		stage('Docker-compose') {
			steps {
				script {
					try {
						sh 'docker-compose -f 
/home/ubuntu/complete/S06P31D204
/docker-compose.yml up -d'
					} catch(e) {
						sh 'echo Docker-compose Fail!!!'
					}
				}
			}
		}

	}

}
