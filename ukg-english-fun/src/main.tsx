import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './routes/Home'
import EnglishHome from './pages/EnglishHome'
import AlphabetTreasureHunt from './pages/AlphabetTreasureHunt'
import PhonicsPopBubbles from './pages/PhonicsPopBubbles'
import MathHome from './pages/MathHome'
import NumberTrainRide from './pages/NumberTrainRide'
import ScienceHome from './pages/ScienceHome'
import LivingNonLivingSort from './pages/LivingNonLivingSort'
import NepaliHome from './pages/NepaliHome'
import NepaliAlphabetMatch from './pages/NepaliAlphabetMatch'
import Reward from './routes/Reward'
import { RewardsProvider } from './state/RewardsContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'english', element: <EnglishHome /> },
      { path: 'english/treasure', element: <AlphabetTreasureHunt /> },
      { path: 'english/phonics', element: <PhonicsPopBubbles /> },
      { path: 'math', element: <MathHome /> },
      { path: 'math/train', element: <NumberTrainRide /> },
      { path: 'science', element: <ScienceHome /> },
      { path: 'science/living-sort', element: <LivingNonLivingSort /> },
      { path: 'nepali', element: <NepaliHome /> },
      { path: 'nepali/alphabet-match', element: <NepaliAlphabetMatch /> },
      { path: 'reward', element: <Reward /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RewardsProvider>
      <RouterProvider router={router} />
    </RewardsProvider>
  </StrictMode>
)
