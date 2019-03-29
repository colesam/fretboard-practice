import Dashboard from '@/views/Dashboard'
import Fretboard from '@/testViews/Fretboard'
import GeneralTesting from '@/testViews/General'

export default [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/testing', name: 'General Testing', component: GeneralTesting },
  { path: '/testing/fretboard', name: 'Fretboard', component: Fretboard }
]
