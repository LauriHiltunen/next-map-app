import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        
        return NextResponse.json({nimi:"nimi"})
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}