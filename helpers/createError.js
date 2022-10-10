const messages = {
    400:'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Server Error'
}

const createError = (status = 400, message = messages[status]) => {
    
}

module.exports = createError;