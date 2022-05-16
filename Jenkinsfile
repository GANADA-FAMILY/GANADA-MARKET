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
				 sh "docker rm -f spring"
                	        sh "docker rm -f client"

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
			steps {
				sh "docker run -d spring:latest"
				sh "docker run -d client:latest"
			}

		}

		

	}

}
