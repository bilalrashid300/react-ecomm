import react from 'react';
import Header from '../../components/header/index'

const MainLayout = props =>{
    return(
        <div>
            <Header {...props}/>
            <div className="main">
                {props.children}
            </div>
        </div>
    )
}



export default MainLayout ;