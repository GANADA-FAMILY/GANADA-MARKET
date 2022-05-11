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
			
		stage(' build') {
			steps {
				sh '/BE/gradlew build'

		
			}
		}


	}

}
