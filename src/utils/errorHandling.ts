import AbsError from "@/models/error/abstruct";


export default async function errorHandling(
    request: Request,
    callback: (request: Request) => Promise<Response>
): Promise<Response> {
    try {
        return await callback(request);
    } catch(error: unknown) {
        console.log(error);
        if (error instanceof AbsError) {
            return Response.json(
                {
                    message: error.message,
                    data: error.data,
                    level: error.level
                }, {
                    status: error.code
                }
            )
        } else {
            return Response.json(
                {
                    message: error instanceof Error ? error.message : '不明なエラーが発生しました'
                }, {
                    status: 500
                }
            )
        }
    }

}