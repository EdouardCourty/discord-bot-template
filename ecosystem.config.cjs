require('dotenv').config();

module.exports = {
    apps: [{
        name: 'discord-bot',
        script: './app.js',
        instances: 1,
        watch: false,
        max_memory_restart: '150M'
    }],
    env_production: {
        NODE_ENV: 'production'
    },
    deploy: {
        production: {
            'user': process.env.PM2_DEPLOY_USER,
            'host': process.env.PM2_DEPLOY_IP,
            'port': process.env.PM2_DEPLOY_PORT,
            'ref': 'origin/master',
            'repo': 'git@github.com:EdouardCourty/discord-bot',
            'path': '/var/www/discord-bot',
            'post-deploy': 'yarn install && cp /var/www/discord-bot/.env /var/www/discord-bot/current/.env && pm2 startOrRestart ecosystem.config.cjs --env production'
        }
    }
}
