pipeline{
  
  agent any
  
  stages {
    stage("build"){
      steps{
        echo 'Start build'
        sh 'ls'
        echo 'Build success'
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