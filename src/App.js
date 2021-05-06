import {react, Component} from 'react';
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions'
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


class App extends Component {  
  authListener = null;

  componentDidMount(){
      const {setCurrentUser} = this.props;
      this.authListener =  auth.onAuthStateChanged( async userAuth => {
        if(userAuth){
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            })
          })
        };

        setCurrentUser(userAuth)

        // this.setState({
        //   ...initialState
        // })  

      });
  }

  componentWillUnmount() {
    this.authListener()
  }


  render(){
    const {currentUser} = this.props;
    console.log(currentUser)
    return (
      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" render={ () => (
              <MainLayout>
                <Homepage/>
              </MainLayout>
            )}/>

            <Route  path="/product" render={ () => (
              <MainLayout >
                <Product/>
              </MainLayout>
            )}/>

            <Route  path="/login" render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login/>
              </MainLayout>
            )}/>

            <Route  path="/recovery" render={() => currentUser ? <Redirect to="/login" /> : (
              <MainLayout>
                <Recovery/>
              </MainLayout>
            )}/>

            <Route  path="/signup" render={ () =>  currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Signup/>
              </MainLayout>
            )}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
