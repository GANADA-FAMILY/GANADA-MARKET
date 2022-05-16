pipeline {
	agent any
	options { skipDefaultCheckout(false) }

	stages {
		stage('Checkout') {
			steps {
				checkout scm
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
				sh 'docker-compose restart'
			}

		}

		

	}

}
