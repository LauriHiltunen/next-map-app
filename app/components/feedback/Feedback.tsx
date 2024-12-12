'use client'
import { useState, FormEvent } from 'react'
import styles from './feedback.module.css'
import axios from 'axios'

const Palaute = () => {
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")
  const [postal_code,setPostal_Code] = useState("")
  const [city,setCity] = useState("")
  const [feedback,setFeedback] = useState("")

  const [feedbackSent, setFeedbackSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await axios.post("/api/feedback", {name:name,phone:phone,email:email,address:address,postal_code:postal_code,city:city,feedback:feedback})

    if(response.status === 200) {
        console.log(await response.data)

      setFeedbackSent(true)
    }
  }
  return (
    <div className={styles.container}>
      <h3>Anna meille palautetta</h3>
      <form className={styles.feedbacks} onSubmit={onSubmit}>
        <div>
          <input type='text' placeholder='Nimi' value={name} onChange={(event) => {setName(event.target.value)}} />
        </div>
        <div>
          <input type='text' placeholder='Puhelin numero' value={phone} onChange={(event) => {setPhone(event.target.value)}} />
        </div>
        <div>
          <input type='text' placeholder='Sähköposti' value={email} onChange={(event) => {setEmail(event.target.value)}} />
        </div>
        <div>
          <input type='text' placeholder='Kotiosoite' value={address} onChange={(event) => {setAddress(event.target.value)}} />
        </div>
        <div>
          <input type='text' placeholder='Postinumero' value={postal_code} onChange={(event) => {setPostal_Code(event.target.value)}} />
        </div>
        <div>
          <input type='text' placeholder='Kaupunki' value={city} onChange={(event) => {setCity(event.target.value)}} />
        </div>
        <div>
          <textarea placeholder='Kirjoita palautteesi tähän' value={feedback} onChange={(event) => {setFeedback(event.target.value)}} />
        </div>
        {!feedbackSent && (
        <div>
          <button type='submit' >Lähetä</button>
        </div>
      )}
      {feedbackSent && (
        <div>
          <button type='submit' className={styles.disabledFeedbackButton} disabled>Lähetä</button>
        </div>
      )}
      </form>
      
      {feedbackSent && (
        <p className={styles.feedbackSent}>Palaute lähetetty</p>
      )}
      
    </div>
  )
}

export default Palaute