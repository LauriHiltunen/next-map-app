import { NextRequest, NextResponse } from "next/server";
import Feedback from "@/shared/libs/Feedback";

export async function POST(request:NextRequest) {
    
    try {
        let newFeedback = await request.json()
        if (!(Feedback.validateObject(newFeedback))) {
            throw (new SyntaxError)
        }
        let newRecord = await Feedback.add(newFeedback)
        if(!newRecord) {
            throw (new Error())
        }
        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        let statusCode = 500

        if (error instanceof SyntaxError) {
            statusCode = 400
        }

        return NextResponse.json({
            error: error
        }, { status: statusCode })
    }
}