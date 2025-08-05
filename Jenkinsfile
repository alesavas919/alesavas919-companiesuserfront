pipeline{
  
  agent any
  
  stages {
    stage("docker build"){
      steps{
        echo 'Start build'
        sh 'ls'
        withCredentials([
            usernamePassword(credentialsId: 'ctestus', usernameVariable: 'THEUSER', passwordVariable: 'THEPASSWORD')
        ]) {
            sh 'echo "User: $THEUSUARIO, Password: $THEPASSWORD"'
        }
        script{
          def result = sh(returnStatus: true, script: './dockerbuild.sh')
          if (result != 0) {
              error "Script falló con código ${result}"
          } else {
              echo 'Build success'
          }
        }
      }
    }

    stage("aws build"){
      steps{
        echo 'Start build'
        sh 'ls'
        echo 'Build success'
        script{
          def result = sh(returnStatus: true, script: './awsbuild.sh')
          if (result != 0) {
              error "Script falló con código ${result}"
          } else {
              echo 'Build success'
          }
        }
      }
    }

    stage("deploy"){
      steps{
        echo 'deploying the application'        
      }
    }

  }
  
}