import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../comps/Button'
import Switch from '../comps/Switch'
import Slider from '../comps/Slider'
import Checkbox from '../comps/Checkbox'
import ExplantionModal from '../comps/ExplanationModal'

export default function Home() {
  return (
    <div className={'page'}>
 
      <Slider/>
      <Switch/>
      <Checkbox/>
      <ExplantionModal />

      
      
    </div>
  )
}
