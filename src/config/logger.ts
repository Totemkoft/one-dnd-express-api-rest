import winston from 'winston'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    //winston.format.align(),
    winston.format.splat(),
    winston.format.json(),
    winston.format.simple(),
    winston.format.printf((info) => `${info.timestamp} [${info.service}] [${(info.requestId) ? 'TX: ' + info.requestId : ''}] [${(info.serviceName) ? info.serviceName : ''}] [${(info.id) ? 'UserId: ' + info.id + ' - UserName: ' + info.userName : ''}] ${info.level}: ${info.message}`)
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    })
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
    defaultMeta: {
        service: 'one-dnd-api-rest',
    },
})

export default Logger
