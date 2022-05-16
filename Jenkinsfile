pipeline {
	agent any
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
	
		}
		stage('ps stop') {
			steps {
				  sh "docker rm -f spring"
                	        sh "docker rm -f client"

			}
		}


			
		stage('build') {
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
