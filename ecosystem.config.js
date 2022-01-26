module.exports = {
apps : [{
    name: 'jobboard',
    script: 'yarn',
    args: 'start',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    },
  }],
  
  deploy : {
    production: {
      user : 'yawik',
      host : 'yawik.org',
      ref  : 'origin/main',
      repo : 'https://gitlab.com/yawik/jobboard.git',
      path : '/home/yawik/production',
      'pre-deploy-local': 'ls -l',
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env production -- --port 3000',
      'pre-setup': 'pm2 ps'
    }
  }
};
