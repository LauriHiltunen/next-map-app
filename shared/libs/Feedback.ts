import pool from "@/shared/libs/mysql";

export interface IFeedback {
    name:string, 
    phone:string, 
    email:string, 
    address:string, 
    postal_code:string, 
    city:string, 
    feedback:string
}

const Feedback = {
    add: async function (feedback:IFeedback) {
        let result
        try {
            const db = await pool.getConnection()
            const query = 'insert into palautteet (name, phone, email, address, postal_code, city, feedback) values (:name, :phone, :email, :address, :postal_code, :city, :feedback)'
            result = await db.query(query,feedback)
            db.release()
        }
        catch(error) {
            console.log(error)
            return 
        }
        return result
    },
    validateObject: function (object:IFeedback) {

        return object && object.name && object.phone && object.email && object.address
         && object.postal_code && object.city && object.feedback && typeof object.name === "string" && typeof object.phone === "string" 
         && typeof object.email === "string" && typeof object.address === "string" && typeof object.postal_code === "string"
         && typeof object.city === "string" && typeof object.feedback === "string";
    }
}
export default Feedback