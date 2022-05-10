pipeline {
	agent any
	options { skipDefaultCheckout(false) }
	environment {
		PATH = "$PATH:/usr/local/bin/docker-compose"
	}

	stages {
		stage('Checkout') {
			steps {
				checkout scm	
			}
	
		}
		stage('FEbuild') {
			steps {
				script {
					sh "ls -al"
					sh "yarn install"
					sh "CI=false yarn build"
				}		
			}
		}
		stage('BEbuild') {
			steps {
				script {
					sh "chmode +x gradlew"
					sh "./gradlew clean build"

				}
			}

		}
			
		stage('Docker build') {
			steps {
				script {


				
					try {
						sh 'docker-compose -f docker-compose.yml build'
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
						sh 'docker-compose -f docker-compose.yml up -d'
					} catch(e) {
						sh 'echo Docker-compose Fail!!!'
					}
				}
			}
		}

	}

}
