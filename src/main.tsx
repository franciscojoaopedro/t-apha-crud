import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/GlobalStyles.css"
import RootApp from './routes/routes.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >

    <RootApp/>

    </QueryClientProvider>
  </React.StrictMode>,
)
