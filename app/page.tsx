import Image from 'next/image'
import { Inter } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import getListings, { IListingsParams } from './actions/getListings'
import ListingCard from './components/listing/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })
interface HomeProps {
  searchParams: IListingsParams;
}
const Home = async ({ searchParams }: HomeProps) =>{
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState  showReset/>
      </ClientOnly>
    )
  }
  return (
      <ClientOnly>
        <Container>
          <div className='
           pt-24
           grid
           grid-col-1
           sm:grid-cols-2
           md:grid-cols-3
           lg:grid-cols-4
           xl:grid-cols-5
           xl2:grid-cols-6
           gap-8
          '>
            {listings.map((listing) => {
              return (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                />
              )
            })
            }
          </div>
        </Container>
      </ClientOnly>
  )
}
export default Home;
