class ResponseService {
    static return500(response) {
        return this.returnError(response, 500, "Server error");
    }

    static return404(response) {
        return this.returnError(response, 404, "Data not found");
    }

    static return403(response) {
        return this.returnError(response, 403, "Invalid parameters");
    }

    static returnCatchError(response, error) {
        if (error && error.errors) {
            return this.returnError(response, 403, {errors: error.errors});
        }
        return this.return500(response);
    }

    static returnError(response, statusCode, errorMessage) {
        return response.status(statusCode).json({ error: errorMessage });
    }
}

module.exports = { ResponseService }