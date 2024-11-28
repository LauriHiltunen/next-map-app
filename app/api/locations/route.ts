import { NextRequest, NextResponse } from "next/server";
import Locations from "@/shared/libs/Locations";

export async function POST(request:NextRequest) {
    try {
        let newLocation = await request.json()
        if (!(Locations.validateObject(newLocation))) {
            throw (new SyntaxError)
        }
        let newRecord = await Locations.add(newLocation)
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

export async function DELETE(request:NextRequest) {
    try {
        let location = await request.json()
        if (!(Locations.validateObject(location)) || !location['index'] || typeof location['index'] !== "number" || location['index'] < 0) {
            throw (new SyntaxError)
        }
        let record = await Locations.remove(location, location['index'])
        if(!record) {
            throw (new Error())
        }
        console.log(await record)
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