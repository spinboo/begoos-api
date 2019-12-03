export interface apiResponse {
    headers: string,
    statusCode: number,
    data: object;
};

export interface apiRequest {
    path?: string,
    method?: string,
    params?: string,
    query?: string,
    body?: any
}

export interface standardApiRequest {
    path?: string,
    method?: string,
    pathParams?: any,
    queryParams?: any,
    body?: any
}

const adaptRequest = ( req: apiRequest = {} ): standardApiRequest => {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body
    });
}

export default adaptRequest;