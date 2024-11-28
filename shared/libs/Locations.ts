import {ResultSetHeader} from 'mysql2'
import pool from "@/shared/libs/mysql";

export interface ILocation {
    uid:string,
    lat:string,
    lng:string,
}

export interface ILocations {
    id:number,
    uid:string
}

var Locations = {
    // Sijainnit linkitetään uid-tunnisteen avulla
    add: async function (location:ILocation) {
        let result
        let db = null
        try {
            db = await pool.getConnection()

            // Tarkistaan löytyykö uidtä vastaavaa tietuetta
            const selectLocationsQuery = "SELECT * FROM sijainnit WHERE uid = :uid"
            const record = await db.query(selectLocationsQuery, location)
            console.log(record)
            if (Object.values(record[0]).length === 0) {
                result = 'Sijainteja ei ole olemassa'
            }
            else {
                const insertLocationQuery = 'INSERT INTO sijainti (sijainnit_uid, lat, lng) values (:uid, :lat, :lng)'
                const resultsetheader = await db.query<ResultSetHeader>(insertLocationQuery, location)
                result = resultsetheader[0]
            }
            db.release()
        }
        catch(error) {
            console.log(error)
            result = false
        }
        return result
    },
    // Poistaa sijainnin
    remove: async function(location:ILocation, index:number) {
        let result
        let db = null
        try {
            db = await pool.getConnection()

            // Haetaan kaikki markkerit listaan

            const selectAll = "SELECT * FROM sijainti"

            const records = await db.query(selectAll)

            if (Object.values(records[0]).length) {
                const data = <ILocations[]>records[0]

                if(data.length > index) {
                    let id = null

                    // Tähän binary search
                    for(let i = 0;i<data.length;i++) {
                        if(index === i) {
                            id = data[i]
                            break
                        }
                    }

                    const query = 'DELETE from sijainti WHERE id = :id'
                    await db.query(query, {})
                    result = true
                }
                else {
                    result = false
                }
            }
        }
        catch(error) {
            console.log(error)
            result = false
        }
        finally {
            if(db) {
                db.release()
            }
        }
        return result
    },
    // Palauttaa uid 
    newLocationsRecord:async function () {
        let result
        let db = null
        try {
            db = await pool.getConnection()
            const query = 'INSERT INTO sijainnit () VALUES ()'
            const resultsetheader = await db.query<ResultSetHeader>(query)

            if (resultsetheader[0]) {
                const id = resultsetheader[0].insertId

                const selectNewUid = "SELECT uid from sijainnit WHERE id = ?"

                const records = await db.query(selectNewUid, [id])

                if (Object.values(records[0]).length) {
                    const data = <ILocations[]>records[0]

                    result = data[0].uid
                }
            }
            db.release()
        }
        catch(error) {
            console.log(error)
            return false
        }
        return result
    } ,
    // Tarkistaa onko objekti kelvollinen
    validateObject: function (object:ILocation) {
        return object && object.uid && object.lat && object.lng  && typeof object.uid === "string" && typeof object.lat === "number" && typeof object.lng === "number";
    }
}
export default Locations