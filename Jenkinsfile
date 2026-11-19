pipeline {
  agent any

  options {
    timeout(time: 20, unit: 'MINUTES')
  }

  parameters {
    choice(
      name: 'RUN_MODE',
      choices: [
        'test:chrome',
        'test:firefox',
        'test:electron',
        'test:browsers:parallel',
        'test:folders:parallel'
      ],
      description: 'Какой npm-скрипт запустить'
    )
  }

  environment {
    PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh "npm run ${params.RUN_MODE}"
      }
    }
  }
}
