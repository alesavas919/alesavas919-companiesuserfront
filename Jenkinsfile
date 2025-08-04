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
            echo "Error al ejecutar el script"
          }
        }
        sh 'chmod +x ./startbuild.sh'
        sh './startbuild.sh'
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