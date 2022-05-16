pipeline {
	agent any
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
	
		}
		stage('ps shutDown') {
			steps {
				sh "docker rm -f $(docker ps -a -q)"
				sh "docker volume rm $(docker volume ls -q)
			}

		}

			
		stage('build') {
			 steps {
           			 echo 'Bulid Gradle'
            			dir ('./BE'){
                		sh "./gradlew clean build --exclude-task test"
                
            			}
        		  }
		
		}
		stage('ps restart') {
			steps {
				sh 'docker-compose -f docker-compose.yml up -d'
			}

		}

		

	}

}
