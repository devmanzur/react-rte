import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FetchTopQuotes } from './components/FetchTopQuotes'
import { ToastContainer } from 'react-toastify'
import UpdateQuotes from './components/UpdateQuotes';
import PaginatedQuotes from './components/PaginatedQuotes';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <div className="App mx-auto max-w-6xl text-center my-8">
            <h1 className="font-semibold text-2xl">
              React - The Road To Enterprise
            </h1>
            <UpdateQuotes />
            <PaginatedQuotes />
          </div>
        </QueryClientProvider>
      </>
    </div>
  )
}

export default App
