pipeline {
	agent none
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			agent any
			steps {
				checkout scm
			}
	
		}
		stage('ps stop') {
			agent any
			steps {
			 sh "docker rm -f spring:latest"
                        sh "docker rm -f client:latest"

			}
		}


			
		stage('build') {
			agent any
			 steps {
           			 echo 'Bulid Gradle'
            				dir ('./BE'){
                				sh "./gradlew clean build --exclude-task test"
               				}
				sh "docker build --tag spring:latest ./BE"
				sh "docker build --tag client:latest ./FE"
        
		  }
		
		}
		stage('ps restart') {
			agent any
			steps {
				sh "docker run -d -p 8080:8080 spring:latest"
				sh "docker run -d -p 3000:3000 client:latest"
				sh "docker rmi -f $(docker images -f "dangling=true" -q)"
			}

		}

		

	}

}
