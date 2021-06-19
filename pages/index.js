import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState } from 'react'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Realistic from '../components/confetti'
export default function TimerApp() {
  const [enabled, setEnabled] = useState(false)
  const [questions, setQuestions] = useState("")
  const [minutes, setMinutes] = useState("")
  const [duration, setDuration] = useState("")
  function displayTime(remainingTime){
    if(!duration){
      return(<h1>...</h1>)
    }
    if(remainingTime==0){
      return(
      <div className={styles.done}>
        <h1>Congrats!</h1>
        <Realistic/>
      </div>)
    }
    else{
      let questionsPerSecond = questions/duration
      let value = questions-Math.floor(questionsPerSecond*remainingTime)
      return(
        <div className={styles.time}>
          <h1>Question #{value>0?value:1}</h1>
          <h2>{fancyTimeFormat(remainingTime)}</h2>
        </div>
      )
    }
  }
  return (
      <div className={styles.container}>
        <Head>
          <title>Exam Timer</title>
          <link rel="icon" href="/logo-svg.svg" />
          <meta name="description" content="A question aware timer for students to keep track of their exam time. A new way to do exam timing." />
          <meta property="og:title" content="Exam Timer"/>
          <meta property="og:description" content="A question aware timer for students to keep track of their exam time. A new way to do exam timing."/>
          <meta property="og:type" content="website"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta hrefLang="en-us"/>
        </Head>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>A New Way to Do Exam Timing.</h1>
          <h2 className={styles.heroSubhead}>Built by Students, for Students.</h2>
        </div>
        <div className={styles.timer}>
        <CountdownCircleTimer
          key={duration}
          isPlaying={enabled}
          duration={duration}
          size={320}
          colors={[["#312E2E", 1]]}
          //true when it is time to continue
          onComplete={() => [false]}>
            {({ remainingTime }) => displayTime(remainingTime)}
        </CountdownCircleTimer>
        </div>
        <div className={styles.information}>
          <span className={styles.error}/>
          <form>
            <label name="questions"># of Questions</label>
            <input name="questions" type="number" value={questions} onChange={(value)=>setQuestions(value?value.target.value:"")}/>
            <label name="minutes"># of Minutes</label>
            <input name="minutes" type="number" value={minutes} onChange={(value)=>setMinutes(value?value.target.value:"")}/>
          </form>
          <ToastProvider >
            <Cta setDuration={setDuration} setEnabled={setEnabled} enabled={enabled} minutes={minutes} questions={questions}/>
          </ToastProvider>
        </div>
        </div>
  )
}

const Cta = ({setDuration, setEnabled, enabled, questions, minutes}) => {
  const { addToast } = useToasts();
  return(<div onClick={()=>{
    if(!questions || !minutes){
      addToast("Please fill out all fields.", {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setEnabled(prev=>!prev);
      setDuration(minutes*60)
    }
  }
    } className={styles.cta}>
    {enabled?"Stop":"Start"} Timer
  </div>)
}

function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}