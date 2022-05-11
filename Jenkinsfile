pipeline {
	agent any
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			steps {
				git branch: 'develop',
				credentialsId: 'scar',
				url: 'https://lab.ssafy.com/s06-final/S06P31D204.git'
			}
	
		}
			
		stage('Docker build') {
			steps {
				script {			
					try {
						sh 'docker-compose -f down'
						sh 'docker-compose -f docker-compose.yml build'
					} catch(e) {
						sh 'echo Dockerfile build Fail'
					}

				}
				
			}		
	
		}
		stage('Docker-compose') {
			steps {
				script {
					try {
						sh 'docker-compose -f docker-compose.yml up -d'
					} catch(e) {
						sh 'echo Docker-compose Fail!!!'
					}
				}
			}
		}

	}

}
