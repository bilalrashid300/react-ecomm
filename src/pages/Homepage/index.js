import react from 'react';
import Slider from '../../components/slider'
import Banner from '../../components/banner/index'
import BannerImg from '../../asset/banner.png'


const Homepage = props => {
    return(
        <Banner classTitle="bannerImg" image={BannerImg} />
    )
}

export default Homepage;