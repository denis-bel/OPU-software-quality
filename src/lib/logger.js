import winston from 'winston';
const colorizer = winston.format.colorize();

const alignColorsAndTime = winston.format.combine(
	winston.format.timestamp({
		format: 'YY-MM-DD HH:MM:SS'
	}),
	winston.format.printf(msg =>
		colorizer.colorize(msg.level, `[${msg.timestamp}][${msg.level}]: ${msg.message}`)
	)
);

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YY-MM-DD HH:MM:SS'
		}),
		winston.format.printf(msg =>
			`[${msg.timestamp}][${msg.level}] ${msg.message}`
		)
	),
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' }),
		new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' })
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: alignColorsAndTime
	}));
}

export default logger