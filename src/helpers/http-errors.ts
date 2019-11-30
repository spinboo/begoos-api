const makeHttpError = ( { statusCode, errorMessage }: { statusCode: number, errorMessage: string } ) => ({
    headers: {
        'Content-Type': 'application/json'
    },
    statusCode,
    data: JSON.stringify({
        success: false,
        error: errorMessage
    })
});

export default makeHttpError;