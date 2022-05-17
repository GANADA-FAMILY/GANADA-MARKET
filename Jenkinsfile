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
		stage('docker image delete') {
			agent any
			steps {
				sh "docker rmi -f now20412041/spring"
				sh "docker rmi -f now20412041/client"
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
			steps	{
				sh "docker run --name spring:latest -d -p 8080:8080 spring:latest"
				sh "docker run --name client:latest -d -p 3000:3000 client:latest"
				sh "docker system prune -af --volumes"
			}

		}

		

	}

}
