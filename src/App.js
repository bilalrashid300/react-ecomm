import {react, Component} from 'react';
import Header from './components/header/index';
import Homepage from './pages/Homepage/index';
import Product from './pages/Product/index';
import Login from './pages/Login/index';
import Signup from './pages/Signin/index';
import Recovery from './pages/Recovery/index';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomeLayout from './pages/Layout/index';
import MainLayout from './pages/Layout/index';
import {auth, handleUserProfile} from './firebase/utils'
import './default.css'

const initialState = {
  currentUser: null
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }
  
  authListener = null;

  componentDidMount(){
      this.authListener =  auth.onAuthStateChanged( async userAuth => {
        if(userAuth){
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            this.setState({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            })
          })
        };

        this.setState({
          ...initialState
        })  

      });
  }

  componentWillUnmount() {
    this.authListener()
  }


  render(){
    const {currentUser} = this.state;
    console.log(currentUser)
    return (
      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" render={ () => (
              <MainLayout currentUser={currentUser}>
                <Homepage/>
              </MainLayout>
            )}/>

            <Route  path="/product" render={ () => (
              <MainLayout currentUser={currentUser}>
                <Product/>
              </MainLayout>
            )}/>

            <Route  path="/login" render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login/>
              </MainLayout>
            )}/>

            <Route  path="/recovery" render={() => currentUser ? <Redirect to="/login" /> : (
              <MainLayout currentUser={currentUser}>
                <Recovery/>
              </MainLayout>
            )}/>

            <Route  path="/signup" render={ () =>  currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Signup/>
              </MainLayout>
            )}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
