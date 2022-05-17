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
			 sh "docker rm -f springContainer"
                         sh "docker rm -f clientContaienr"



			}
		}
		stage('docker image delete') {
			agent any
			steps {
				sh "docker rmi -f spring"
				sh "docker rmi -f client"
			}
		}
	
		stage('build') {
			agent any
			 steps {
           			 echo 'Bulid Gradle'
            				dir ('./BE'){
                				sh "./gradlew clean build --exclude-task test"
               				}
				sh "docker build --tag spring ./BE"
				sh "docker build --tag client ./FE"
 
		  }
		
		}
		stage('ps restart') {
			agent any
			steps	{
				sh "docker run --name springContainer -d -p 8080:8080 spring"
				sh "docker run --name clientContainer -d -p 3000:3000 client"
			}


		}

		

	}

}
