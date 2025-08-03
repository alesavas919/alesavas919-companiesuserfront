pipeline{
  
  agent any
  
  stages {
    stage("build"){
      steps{
        echo 'Start build'
        sh 'aws configure'
        sh ''
        sh ''
        sh ''
        sh ''
        sh ''
        sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 656362079083.dkr.ecr.us-east-1.amazonaws.com'
        sh 'aws ecr create-repository --repository-name alejo101_companies_front --region us-east-1'
        sh 'docker build --no-cache -t alejo101_companies_front .'
        sh 'docker tag alejo101_companies_front:latest 656362079083.dkr.ecr.us-east-1.amazonaws.com/alejo101_companies_front:latest'
        sh 'docker build -t alejo101_companies_front .'
        sh 'docker push 656362079083.dkr.ecr.us-east-1.amazonaws.com/alejo101_companies_front:latest'
        sh 'docker pull 656362079083.dkr.ecr.us-east-1.amazonaws.com/alejo101_companies_front:latest'
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