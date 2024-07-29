import Home
import withSidebar from '../../src/hoc/with-sidebar';
import WithStore from '../../src/hoc/with-store';
import WithAuth from '../../src/hoc/with-auth';

const HomePageWithSidebar = withSidebar(Home ,{ page : 'home'})
const HomePageWithAuth = WithAuth(HomePageWithSidebar);
const HomePageWithStore = WithStore(HomePageWithAuth);

export default HomePageWithStore;