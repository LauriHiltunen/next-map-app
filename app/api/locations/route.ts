import { NextRequest, NextResponse } from "next/server";
import Locations from "@/shared/libs/Locations";


export async function GET() {
    try {
        const uid = await Locations.newLocationsRecord()
        return NextResponse.json({uid:uid}, { status: 200 })
    }
    catch (error) {
        const statusCode = 500

        return NextResponse.json({
            error: error
        }, { status: statusCode })
    }
}
export async function POST(request:NextRequest) {
    try {
        const newLocation = await request.json()
        if (!(Locations.validateObject(newLocation))) {
            throw (new SyntaxError)
        }
        const newRecord = await Locations.add(newLocation)
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
        const location = await request.json()
        console.log(!(location?.index > -1) , location)
        if (!(Locations.validateObject(location)) || !(location?.index > -1)) {
            throw (new SyntaxError)
        }
        const record = await Locations.remove(location, location.index)
        if(!record) {
            throw (new Error)
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