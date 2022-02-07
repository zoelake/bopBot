import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../comps/Button'
import Switch from '../comps/Switch'
import Slider from '../comps/Slider'
import Radio from '../comps/Radio'

export default function Home() {
  return (
    <div className={'page'}>
 
      <Slider/>
      <Switch/>
      <Radio/>
      
      
    </div>
  )
}
