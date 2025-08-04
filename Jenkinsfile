pipeline{
  
  agent any
  
  stages {
    stage("build"){
      steps{
        echo 'Start build'
        sh 'ls'
        echo 'Build success'
        script{
          def result = sh(returnStatus: true, script: './startbuild.sh')
          if (result != 0) {
            echo "Script Exec Error..."
          }
        }
      }
    }

    stage("test"){
      steps{
        echo 'testing the application'        
      }
    }

    stage("deploy"){
      steps{
        echo 'deploying the application'        
      }
    }

  }
  
}